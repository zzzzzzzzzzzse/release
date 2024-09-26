import { Error, PushHeartBeat, ReqHeartBeat, SubCmd } from "../../../resources/proto/common";
import { TransportData } from "../../../resources/proto/Packet";
import { Slot_PushAcceptCollectAward, Slot_PushBetResult, Slot_PushChooseSubGame, Slot_PushCollectShopExchangeAward, Slot_PushJackpotAmount, Slot_PushLogin, Slot_PushSettlementBounsSuccess, Slot_ReqAcceptCollectAward, Slot_ReqBet, Slot_ReqChooseSubGame, Slot_ReqJackpotAmount, Slot_ReqLogin, Slot_ReqSettlementBounsSuccess } from "../../../resources/proto/slot";
import { UIManagernew } from "../../../UIManagernew";
import { BaseUI } from "../../common/BaseUI";
import { EventBus } from "../../common/EventBus";
import AppBundleConfig from "../../configs/AppBundleConfig";
import AppPlatformConfig from "../../configs/AppPlatformConfig";
import { EVENT } from "../../configs/ConstDefine";
import { Constants } from "../../Constants";
import { EventMgr } from "../../framework/mgr/EventManager";
import { UIMgr } from "../../framework/mgr/UIManager";
import { BetResultModel } from "../../models/BetResultModel";
import { SlotPushAcceptCollectAward } from "../../models/socket/SlotPushAcceptCollectAward";
import { SlotPushBetResult } from "../../models/socket/SlotPushBetResult";
import SlotPushChooseSubGame from "../../models/socket/SlotPushChooseSubGame";
import { SlotPushCollectShopExchangeAward } from "../../models/socket/SlotPushCollectShopExchangeAward";
import { SlotPushJackpotAmount } from "../../models/socket/SlotPushJackpotAmount";
import { SlotPushLogin } from "../../models/socket/SlotPushLogin";
import SlotPushSettlementBonusSuccess from "../../models/socket/SlotPushSettlementBonusSuccess";
import { SocketReqSlotLogin } from "../../models/socket/SocketReqSlotLogin";
import AppLog from "../../tools/AppLog";
import { BaseHub } from "./BaseHub";
import { SocketDataFormat } from "./SocketDataFormat";

/**
 * 游戏集线器
 */
export class GameHub extends BaseHub {
    // 连接socket计时
    connectingTime = 0;
    // socket重连次数
    reconnectCount = 0;

    // socket重连间隔
    SOCKET_RECONNECT_TIME = 1.5;
    // socket重连次数
    SOCKET_RECONNECT_COUNT = 5;

    // 标记网络是否连接上
    isConnect = false;
    // 消息回复等待时间
    SOCKET_MSG_WAITTIME = 20;
    // 心跳间隔
    SOCKET_HEARTBEAT_TIME = 10;

    SOCKET_MSG_REPEAT_NUM = 10

    isLogin: boolean = false;
    sendTime: number = 0;
    receiveTime: number = 0;
    starttime: boolean = false;
    showalertbol: boolean = false;

    //socket游戏id
    private m_SlotGameId: number = 0;
    hidetimes: number | null = null;
    maxTimes: number = 55000;//25000
    showtipsbol: boolean = false;
    msgArr: any = {};
    Lastbetbol: boolean = false;
    reconbol: boolean = false;
    issendbetbol: boolean = false;
    sendbetTime: NodeJS.Timeout = null;
    iswaiting: boolean = false;
    waitingbetTime: NodeJS.Timeout = null;

    /**
     * 获取slot游戏id
     */
    public get slotGameId() {
        return this.m_SlotGameId;
    }

    /**
     * 构造方法
     * @param eventBus 
     */
    public constructor(eventBus: EventBus) {
        super(eventBus);
        //绑定消息分发
        this.m_messageHandlers.set(SlotEventBusEnum.SLOT_Player_Login_Result, this.onPlayerJoinGame.bind(this));
        this.m_messageHandlers.set(SlotEventBusEnum.SLOT_Player_leavel_Result, this.onPlayerLeaveGame.bind(this));
        this.m_messageHandlers.set(SlotEventBusEnum.SLOT_BetResult, this.onPlayerBetResult.bind(this));

        cc.game.on(cc.game.EVENT_SHOW, this.gameshow.bind(this));
        cc.game.on(cc.game.EVENT_HIDE, this.gamehide.bind(this));
    }

    gameshow() {
        let hideTime = this.hidetimes
        this.hidetimes = null
        if (this.isConnect == false || Constants.getInstance().IsGameEnd == true || hideTime == null) {
            return
        }
        cc.log("game_show")

        cc.game.resume();

        let curr = new Date().getTime();
        cc.log("gameshowtime=", curr - hideTime)
        if (curr - hideTime >= this.maxTimes) {
            cc.log("long time！")
            this.closeSocket()
            // BaseUI.addNetLoading()
            // this.connect(this.m_SlotGameId);
            this.showAlert()

        } else {
            this.sendPing();
        }
    }


    gamehide() {
        if (this.isConnect == false || Constants.getInstance().IsGameEnd == true) {
            return
        }
        cc.log("game_hide")
        this.sendPing();
        this.hidetimes = new Date().getTime();
        cc.game.pause();
    }

    /**
     * 连接socket
     * @param url socket的url
     */
    public async connect(gameId: number) {
        this.m_SlotGameId = gameId;
        console.warn("net status", this.starttime);
        // 检测网络状态
        if (this.starttime == false) {
            cc.director.getScheduler().enableForTarget(this);
            cc.director.getScheduler().schedule(this.update, this, 1, cc.macro.REPEAT_FOREVER, 0, false);
            this.starttime = true
        }

        // this.deleteSocket()
        this.connectingTime = new Date().getTime();
        //test123123
        // return this.connectSocket("ws://192.168.3.251:9527/ws", this.socketOnOpen.bind(this), this.socketOnMessage.bind(this), this.socketOnError.bind(this), this.socketOnClose.bind(this));
        return this.connectSocket(Constants.getInstance().m_slotSocketHost.getHostUrl(), this.socketOnOpen.bind(this), this.socketOnMessage.bind(this), this.socketOnError.bind(this), this.socketOnClose.bind(this));
    }

    onbackHall() {
        let SceneName = cc.director.getScene().name
        if (SceneName.localeCompare("CoreLoadScene") != 0) {
            // cc.director.loadScene("CoreLoadScene") 
            // this.starttime  = false
            this.closeSocket();
            Constants.getInstance().hallSocket.closeSocket();
            // cc.game.restart();
            Constants.getInstance().resLoader.setOrientation(1)
            cc.director.loadScene("CoreLoadScene")
        }

    }

    deleteSocket() {
        // if (this.socket) {
        //     this.socket.close();
        // }
        this.onDestroy()
        this.isConnect = false;
    }


    update(dt: number) {
        // cc.log("game dt=",dt)
        if ((this.connectingTime != 0) && !this.isConnect) {
            // 连接socket超时Z
            if (new Date().getTime() - this.connectingTime > this.SOCKET_MSG_WAITTIME * 1000) {
                cc.log('long');
                this.connectingTime = 0;
                this.reconnect();
            }
        }

        if (this.isConnect && this.socket && this.socket.readyState == WebSocket.OPEN) {
            if (this.isLogin) {
                // 发送心跳
                if (new Date().getTime() - this.sendTime > this.SOCKET_HEARTBEAT_TIME * 1000) {
                    this.sendTime = new Date().getTime();
                    this.sendPing()
                }
                // cc.log("this.receiveTime : " + this.receiveTime);
                // 心跳回调检测
                if (new Date().getTime() - this.receiveTime > this.SOCKET_MSG_WAITTIME * 1000) {
                    // 服务器长时间没有回复,重连
                    cc.log('long');
                    this.receiveTime = new Date().getTime();
                    this.reconnect();
                }


                if (this.msgArr["playerbet"]) {
                    if (new Date().getTime() - this.msgArr["playerbet"].time > 10 * 1000) {
                        // 超时，重发
                        if (this.msgArr["playerbet"].repeatNum >= this.SOCKET_MSG_REPEAT_NUM) {
                            this.socketError();
                        } else {
                            this.m_socket.send(this.msgArr["playerbet"].data);
                            this.msgArr["playerbet"].time = new Date().getTime()
                            this.msgArr["playerbet"].repeatNum = this.msgArr["playerbet"].repeatNum + 1
                        }
                    }
                }
            }
        }
    }

    closeSocket() {
        cc.log("gameclose")
        this.starttime = false
        this.reconbol = false;
        this.isLogin = false;
        this.deleteSocket();
        cc.director.getScheduler().unschedule(this.update, this);
        // Constants.getInstance().hallSocket.closeSocket();
    }

    //重置重连状态
    resetstatus() {
        this.reconbol = false;
        this.closeSocket()

    }

    // 重连
    reconnect() {
        if (this.showtipsbol == true || Constants.getInstance().IsGameEnd == true) {
            return
        }
        cc.log("======reconnect=====");
        if (this.reconnectCount >= this.SOCKET_RECONNECT_COUNT) {
            cc.log('socket connect no');
            this.socketError();
        } else {
            cc.log('restart connect  ' + this.reconnectCount);
            this.reconnectCount = this.reconnectCount + 1;
            this.reconbol = true;
            this.connect(this.m_SlotGameId);
            // if (this.isLogin) {

            // } else {
            if (this.showalertbol == false) {
                BaseUI.addNetLoading();
            }

            // }
        }
    }

    // 连接出错
    socketError() {
        if (this.reconnectCount >= this.SOCKET_RECONNECT_COUNT) {
            // 断开socket，等待手动重连
            //this.deleteSocket();
            this.reconnectCount = 0;
            cc.log("socketError!")
            this.showAlert();

        }
    }

    showAlert(str: string = "") {
        cc.log("showAlert")
        this.showtipsbol = true
        // this.m_eventBus.post(HallEventBusEnum.Hall_PushGameMessage,true);
        Constants.getInstance().hallSocket.onshowtips(true);
        BaseUI.removeNetLoading()
        let sureCallback = (() => {
            cc.log("sureCallback!!!")
            this.showalertbol = false
            this.showtipsbol = false
            cc.director.resume()
            Constants.getInstance().hallSocket.onshowtips(false);
            Constants.getInstance().IsGameEnd = true
            this.onbackHall()
        })
        let msg1 = {
            name: "MessageBoxView",
            sureCallback: sureCallback,
            bundleIndex: AppBundleConfig.BUNDLE_HALL,
            btnOkText: "Disconnect, please login again." + str,
            btnCount: 1,
            zorder: 10000
        }
        UIManagernew.openUI(msg1)
        this.showalertbol = true
    }


    /**
     * socket连接打开
     * @param evt 回调
     */
    public socketOnOpen(evt: Event) {
        AppLog.writeLog("socket123123_connect open", this.m_SlotGameId);
        this.SOCKET_RECONNECT_TIME = 1.5
        BaseUI.removeNetLoading();
        // cc.director.resume()
        this.isConnect = true;
        this.m_eventBus.post(SlotEventBusEnum.Slot_ReConnectSuccess);
        this.connectingTime = 0;
        EventMgr.dispatch(EVENT.EVENT_CONNECT_OPEN);
        // 重置重连次数
        this.reconnectCount = 0;
        // 重置发送消息的时间
        this.sendTime = new Date().getTime();
        // 重置收到消息的时间
        this.receiveTime = new Date().getTime();

        if (this.msgArr["playerbet"]) {
            this.msgArr["playerbet"].repeatNum = 0
        }

        this.m_eventBus.post(SlotEventBusEnum.SOCKET_Connect_Success);
        //连接成功发送登录socket
        let socketReqSlotLogin = new SocketReqSlotLogin();
        if (Constants.getInstance().m_LoginUserSession && Constants.getInstance().m_LoginUserSession.m_userToken) {
            socketReqSlotLogin.m_pid = Constants.getInstance().m_LoginUserSession.m_uid;
            socketReqSlotLogin.m_token = Constants.getInstance().m_LoginUserSession.m_userToken;
            socketReqSlotLogin.m_gameId = this.m_SlotGameId;
            socketReqSlotLogin.m_version = "1.0.0";
            socketReqSlotLogin.m_maskingKey = 10;
            this.sendMsgPlayerLogin(socketReqSlotLogin);
        }
    }

    isConnecting() {
        return this.isConnect;
    }

    reLoadGame() {

    }


    /**
     * socket连接回调
     * @param evt 
     */
    public socketOnMessage(evt: MessageEvent) {
        if (!this.socket) {
            return;
        }
        this.isLogin = true;
        // 记录收到消息的时间
        this.receiveTime = new Date().getTime();

        // if (this.msgArr["playerbet"]) {
        //     delete this.msgArr["playerbet"];
        // }

        this.parseProtoBufId(evt, this.distrubuteMsg.bind(this));
    }

    /**
     * socket连接错误
     * @param evt 
     */
    public socketOnError(evt: Event) {
        AppLog.writeLog("socket123123_err", evt);
        this.socketError();
    }

    /**
     * socket连接关闭
     * @param evt 
     */
    public socketOnClose(evt: Event) {
        AppLog.writeLog("socket123123_close", evt);
        // cc.director.pause()
        this.isConnect = false;
        EventMgr.dispatch(EVENT.EVENT_CONNECT_CLOSE);
        // 断socket写死登出
        // this.socketError();
        // BaseUI.addNetLoading()
        // 连接断开，开始重连
        setTimeout(() => {
            this.reconnect();
            this.SOCKET_RECONNECT_TIME = this.SOCKET_RECONNECT_TIME + 1
        }, this.SOCKET_RECONNECT_TIME * 1000);

    }



    /**
     * 发送玩家登录socket
     */
    public sendMsgPlayerLogin(slotData: SocketReqSlotLogin) {
        this.onResettingStatus()
        if (this.m_socket) {
            Constants.getInstance().IsGameEnd = false
            //统计请求次数
            this.addRequestCount();
            let reqLogin = new Slot_ReqLogin({
                // pid: slotData.m_pid,
                // token: slotData.m_token,
                pid: slotData.m_pid,
                token: slotData.m_token,
                gameId: slotData.m_gameId,
                version: slotData.m_version,
                maskingKey: slotData.m_maskingKey
            });
            let sendData = Slot_ReqLogin.encode(reqLogin).finish();
            let transportData: TransportData = {
                cmd: SubCmd.Cmd_Slot_ReqLogin,
                sessionData: 10,
                sendData: sendData
            }
            let sendMessage = this.m_protoProcessor.encode(transportData);
            this.m_socket.send(sendMessage);
        }

        let str = "code:30004";
        if (AppPlatformConfig.platformType == 1) {//测试服
            str = "code:30004 login no msg"
        }
        this.onStatusTimeFun(str)
    }

    /**
     * 发送玩家下注socket
     * @param point 金额
     * @param subGameType 当前游戏类型
     * @param roomLevel 房间等级
     */
    public sendMsgPlayerBet(betKey: number, subGameType: number) {
        this.onResettingStatus()
        if (Constants.getInstance().IsGameStart == true || this.msgArr["playerbet"]) {
            return
        }

        this.reconbol = false
        AppLog.writeLog("socket123123_user start play", betKey, subGameType);
        //统计请求次数
        this.addRequestCount();
        let reqBet = new Slot_ReqBet({
            betKey: betKey,
            subGameType: subGameType,
        });
        let sendData = Slot_ReqBet.encode(reqBet).finish();

        let transportData: TransportData = {
            cmd: SubCmd.Cmd_Slot_ReqBet,
            sessionData: 10,
            sendData: sendData
        }
        let sendMessage = this.m_protoProcessor.encode(transportData);
        AppLog.writeLog("socket send msg", sendMessage);
        this.m_socket.send(sendMessage);

        if (!this.msgArr["playerbet"]) {
            this.msgArr["playerbet"] = { data: sendMessage, time: new Date().getTime(), repeatNum: 0 };
        }
        Constants.getInstance().IsGameStart = true

        let str = "code:30001";
        if (AppPlatformConfig.platformType == 1) {//测试服
            str = "code:30001 play msg no result"
        }
        this.onStatusTimeFun(str)
    }

    //重置玩家消息状态
    onResettingStatus() {
        if (this.sendbetTime) {
            clearTimeout(this.sendbetTime);
        }
        if (this.waitingbetTime) {
            clearTimeout(this.waitingbetTime);
        }
    }

    //玩家发送消息状态
    onStatusTimeFun(str: string) {
        //玩家下注50s没有收到回调弹框
        this.issendbetbol = true
        this.sendbetTime = setTimeout(() => {
            clearTimeout(this.sendbetTime);
            if (this.issendbetbol == true) {
                this.showAlert(str);
            }
        }, 50000);

        this.iswaiting = true;
        this.waitingbetTime = setTimeout(() => {
            clearTimeout(this.waitingbetTime);
            BaseUI.addNetLoading();
        }, 30000);
    }

    /**
     * 发送游戏服务器奖池
     * @param betKey betkey
     * @param poolTypes 奖池类型
     */
    public sendServerGoldPool(betKey: number, poolTypes: number[]) {
        //统计请求次数
        this.addRequestCount();
        let reqBet = new Slot_ReqJackpotAmount({
            betKey: betKey,
            poolTypes: poolTypes,
        });
        let sendData = Slot_ReqJackpotAmount.encode(reqBet).finish();

        let transportData: TransportData = {
            cmd: SubCmd.Cmd_Slot_ReqJackpotAmount,
            sessionData: 10,
            sendData: sendData
        }
        let sendMessage = this.m_protoProcessor.encode(transportData);
        this.m_socket.send(sendMessage);
    }

    /**
     * 游戏选择
     * @param data 
     */
    public onPlayerChooseEgyptGame(data: SlotPushChooseSubGame) {
        this.m_eventBus.post(SlotEventBusEnum.Slot_PushChooseSubGame, data);
    }

    /**
     * 请求领取收集玩法奖励
     * @param data 
     */
    public onAcceptCollectAward(data: SlotPushAcceptCollectAward) {
        this.m_eventBus.post(SlotEventBusEnum.Slot_PushAcceptCollectAward, data);
    }

    /**
     * 收集玩法中，用积分兑换商店里的奖励返回
     * @param data 
     */
    public onCollectShopExchangeAward(data: SlotPushCollectShopExchangeAward) {
        this.m_eventBus.post(SlotEventBusEnum.Slot_PushCollectShopExchangeAward, data);
    }

    /**
     * 埃及游戏选择进入的游戏类型
     * @param betKey 
     * @param subGameType 
     */
    public sendMsgChooseSubGame(betKey: number, subGameType: number) {
        this.addRequestCount();
        let reqBet = new Slot_ReqChooseSubGame({
            betKey: betKey,
            subGameType: subGameType,
        });
        let sendData = Slot_ReqChooseSubGame.encode(reqBet).finish();

        let transportData: TransportData = {
            cmd: SubCmd.Cmd_Slot_ReqChooseSubGame,
            sessionData: 10,
            sendData: sendData
        }
        let sendMessage = this.m_protoProcessor.encode(transportData);
        this.m_socket.send(sendMessage);
    }

    /**
     * 发送心跳
     */
    public sendPing() {
        this.addRequestCount();
        let sendData = ReqHeartBeat.encode(new ReqHeartBeat()).finish();
        let transportData: TransportData = {
            cmd: SubCmd.Cmd_ReqHeartBeat,
            sessionData: 10,
            sendData: sendData
        }
        let sendMessage = this.m_protoProcessor.encode(transportData);
        if (this.m_socket) {
            this.m_socket.send(sendMessage);
        }
        // this.m_socket.send(sendMessage);
    }

    /**
     * 请求结算bounsGame完成
     * @param betKey 下注值
     */
    public reqSettlementBounsSuccess(betKey: number) {
        this.onResettingStatus();
        this.addRequestCount();
        let sendData = Slot_ReqSettlementBounsSuccess.encode(new Slot_ReqSettlementBounsSuccess({ betKey: betKey })).finish();
        let transportData: TransportData = {
            cmd: SubCmd.Cmd_Slot_ReqSettlementBounsSuccess,
            sessionData: 10,
            sendData: sendData
        }
        let sendMessage = this.m_protoProcessor.encode(transportData);
        this.m_socket.send(sendMessage);

        //结算回调
        let str = "code:30002";
        if (AppPlatformConfig.platformType == 1) {//测试服
            str = "code:30002 jies no msg result"
        }

        this.onStatusTimeFun(str)
    }

    /**
     * 请求结算bounsGame完成
     * @param betKey 下注值
     */
    public reqAcceptCollectAward(betKey: number) {
        this.onResettingStatus();
        this.addRequestCount();
        let sendData = Slot_ReqAcceptCollectAward.encode(new Slot_ReqAcceptCollectAward({ betKey: betKey })).finish();
        let transportData: TransportData = {
            cmd: SubCmd.Cmd_Slot_ReqAcceptCollectAward,
            sessionData: 10,
            sendData: sendData
        }
        let sendMessage = this.m_protoProcessor.encode(transportData);
        this.m_socket.send(sendMessage);

        //收集玩法
        let str = "code:30003";
        if (AppPlatformConfig.platformType == 1) {//测试服
            str = "code:30003 collect no msg result"
        }
        this.onStatusTimeFun(str)
    }

    /**
     * 玩家加入slot游戏
     * @param gameId slot游戏id
     */
    private onPlayerJoinGame(slotPushLogin: SlotPushLogin) {
        if (AppPlatformConfig.ISOLDVERSION) {
            this.m_eventBus.post(SlotEventBusEnum.SLOT_Player_Login_Result, slotPushLogin);
        } else {
            this.m_eventBus.post(SlotEventBusEnum.Slot_ServerConnectSuccess, slotPushLogin);
        }
        // this.m_eventBus.post(SlotEventBusEnum.SLOT_Player_Login_Result, slotPushLogin);
        // this.m_eventBus.post(SlotEventBusEnum.Slot_ServerConnectSuccess, slotPushLogin);

    }

    /**
     * 玩家离开游戏
     */
    private onPlayerLeaveGame() {
        this.m_eventBus.post(SlotEventBusEnum.SLOT_Player_leavel_Result, Constants.getInstance().m_LoginUserSession.m_uid);
    }

    /**
     * 玩家下注回调
     */
    private onPlayerBetResult(pushBetResult: any[]) {
        //格式化结果
        if (pushBetResult) {
            if (pushBetResult.length > 0) {
                let betResultArr: Array<BetResultModel> = new Array<BetResultModel>();
                let item: BetResultModel = null;
                for (let i in pushBetResult) {
                    item = new BetResultModel();
                    item.m_betAmount = pushBetResult[i].betAmount;
                    item.m_winAmount = pushBetResult[i].winAmount;
                    item.m_extraReardAmount = pushBetResult[i].extraReardAmount;
                    item.m_currGoldPoolPoint = pushBetResult[i].currGoldPoolPoint;
                    item.m_freeTimes = pushBetResult[i].freeTimes;
                    item.m_slotSubjectsArr = pushBetResult[i].slotSubjects;
                    item.m_lineIdsArr = pushBetResult[i].lineIds;
                    item.m_rollColsArr = pushBetResult[i].rollCols;
                    betResultArr.push(item);
                }
                this.m_eventBus.post(SlotEventBusEnum.SLOT_BetResult, betResultArr);
            }
        }
    }

    /**
     * 结算回调
     * @param data 结算回调
     */
    public slotPushSettlementBonusSuccess(data: SlotPushSettlementBonusSuccess) {
        if (data) {
            this.m_eventBus.post(SlotEventBusEnum.Slot_PushSettlementBounsSuccess, data);
        }
    }

    /**
     * 收集回调
     * @param data 收集回调
     */
    public slotPushAcceptCollectAward(data: SlotPushSettlementBonusSuccess) {
        if (data) {
            this.m_eventBus.post(SlotEventBusEnum.Slot_PushAcceptCollectAward, data);
        }
    }

    /**
     * 游戏服务器奖池
     * @param gameId slot游戏id
     */
    private onServerGoldPool(slotPushLogin: SlotPushJackpotAmount) {
        this.m_eventBus.post(SlotEventBusEnum.Slot_ServerGoldPool, slotPushLogin);
    }

    /**
     * 回调处理
     * @param id 
     * @param data 
     */
    private distrubuteMsg(id, data) {
        switch (id) {
            case SubCmd.Cmd_Error: {
                //错误回调
                let errInfo = Error.decode(data);
                console.log("aaaaaaaaaaaaaaaaaa_err", errInfo)
                if (errInfo) {
                    if (AppPlatformConfig.platformType == 2) {
                        if (errInfo && errInfo.args) {
                            errInfo.args = [];
                        }
                    }
                    UIMgr.open('prefab/UITips', cc.director.getScene().children[0]).then((uibase) => {
                        uibase.message(errInfo.args[0]);
                    });
                    this.m_eventBus.post(SlotEventBusEnum.Slot_ErrTips, errInfo);
                }
                break;
            }
            case SubCmd.Cmd_PushHeartBeat: {
                //心跳pong
                PushHeartBeat.decode(data);
                break;
            }
            case SubCmd.Cmd_Slot_PushLogin: {
                this.issendbetbol = false
                BaseUI.removeNetLoading();
                this.onResettingStatus();
                //请求最后依次下注信息
                if (Constants.getInstance().IsGameStart == true) {
                    if (this.msgArr["playerbet"]) {
                        this.m_socket.send(this.msgArr["playerbet"].data);
                        this.msgArr["playerbet"].time = new Date().getTime()
                        this.msgArr["playerbet"].repeatNum = this.msgArr["playerbet"].repeatNum + 1
                    } else {
                        this.Lastbetbol = true
                        let sendData = ReqHeartBeat.encode(new ReqHeartBeat()).finish();
                        let transportData: TransportData = {
                            cmd: SubCmd.Cmd_Slot_ReqLastBetInfo,
                            sessionData: 10,
                            sendData: sendData
                        }
                        let sendMessage = this.m_protoProcessor.encode(transportData);
                        this.m_socket.send(sendMessage);
                    }

                } else {
                    //登录回调
                    if (this.reconbol == true) {
                        cc.log("reconnect!!")
                        return
                    }
                    let pushLoginData = Slot_PushLogin.decode(data);
                    if (pushLoginData) {
                        let slotPushLogin: SlotPushLogin = SocketDataFormat.slotPushLoginFormat(pushLoginData);
                        this.onPlayerJoinGame(slotPushLogin);
                    }
                }
                break;
            }
            case SubCmd.Cmd_Slot_PushBetResult: {
                //下注回调
                this.issendbetbol = false
                BaseUI.removeNetLoading();
                this.onResettingStatus();
                if (this.msgArr["playerbet"]) {
                    delete this.msgArr["playerbet"];
                }
                Constants.getInstance().IsGameStart = false
                this.reconbol = false
                // let betResultData = Slot_PushBetResult.decode(data);
                // let betResultArr = betResultData.betResults;
                // this.onPlayerBetResult(betResultArr);
                if (this.Lastbetbol == true) {
                    return
                }
                let betResultData = Slot_PushBetResult.decode(data);
                if (betResultData) {
                    AppLog.writeLog("socket123123_play result", betResultData);
                    let slotPushBetResult: SlotPushBetResult = SocketDataFormat.slotPushBetResultFormat(betResultData);
                    cc.log(slotPushBetResult)
                    this.m_eventBus.post(SlotEventBusEnum.SLOT_BetResult, slotPushBetResult);
                }
                break;
            }
            case SubCmd.Cmd_Slot_PushSettlementBounsSuccess: {
                //结算回调
                this.issendbetbol = false
                BaseUI.removeNetLoading();
                this.onResettingStatus();
                let pushLoginData = Slot_PushSettlementBounsSuccess.decode(data);
                if (pushLoginData) {
                    AppLog.writeLog("socket123123_collect result", pushLoginData);
                    let slotPushLogin: SlotPushSettlementBonusSuccess = SocketDataFormat.slotPushSettlementBonusSuccess(pushLoginData);
                    this.slotPushSettlementBonusSuccess(slotPushLogin);
                }
                break;
            }
            case SubCmd.Cmd_Slot_PushChooseSubGame: {
                //埃及选择游戏类型回调
                let pushData = Slot_PushChooseSubGame.decode(data);
                if (pushData) {
                    let slotPushLogin: SlotPushChooseSubGame = SocketDataFormat.slotPushChooseSubGame(pushData);
                    this.onPlayerChooseEgyptGame(slotPushLogin);
                }
                break;
            }
            case SubCmd.Cmd_Slot_PushAcceptCollectAward: {
                //请求领取收集玩法奖励返回
                this.issendbetbol = false
                BaseUI.removeNetLoading();
                this.onResettingStatus();
                let pushData = Slot_PushAcceptCollectAward.decode(data);
                console.log("aaaaaaaaaaaaaaaaaa", pushData)
                if (pushData) {
                    let acceptCollectAward: SlotPushAcceptCollectAward = SocketDataFormat.slotPushAcceptCollectAward(pushData);
                    this.slotPushAcceptCollectAward(acceptCollectAward);
                }
                break;
            }
            case SubCmd.Cmd_Slot_PushCollectShopExchangeAward: {
                //收集玩法中，用积分兑换商店里的奖励返回
                let pushData = Slot_PushCollectShopExchangeAward.decode(data);
                if (pushData) {
                    let acceptCollectAward: SlotPushCollectShopExchangeAward = SocketDataFormat.slotPushCollectShopExchangeAward(pushData);
                }
                break;
            }
            case SubCmd.Cmd_Slot_PushJackpotAmount: {
                //服务器奖池
                let decodeData = Slot_PushJackpotAmount.decode(data);
                if (decodeData) {
                    let slotPushJackpotAmount: SlotPushJackpotAmount = SocketDataFormat.slotPushJackpotAmount(decodeData);
                    this.onServerGoldPool(slotPushJackpotAmount);
                }
                break;
            }
            case SubCmd.Cmd_Slot_PushLastBetInfo: {
                //服务器下注数据
                Constants.getInstance().IsGameStart = false
                this.Lastbetbol = false
                if (data) {
                    let betResultData = Slot_PushBetResult.decode(data);
                    if (betResultData) {
                        let slotPushBetResult: SlotPushBetResult = SocketDataFormat.slotPushBetResultFormat(betResultData);
                        cc.log(slotPushBetResult)
                        this.m_eventBus.post(SlotEventBusEnum.SLOT_BetResult, slotPushBetResult);
                    }
                }
                break;
            }
        }
    }
}


/**
 * slot专用枚举
 */
export enum SlotEventBusEnum {
    //链接成功
    SOCKET_Connect_Success = "socket_connect_success",
    //心跳pong
    Slot_HeartBeat_Result = "Slot_HeartBeat_Result",
    //玩家登录游戏
    SLOT_Player_Login_Result = "SLOT_Player_Login_Result",
    //玩家离开
    SLOT_Player_leavel_Result = "SLOT_Player_Leavel_Result",
    //玩家下注
    SLOT_BetResult = "SLOT_BetResult",
    //请求结果
    Slot_PushSettlementBounsSuccess = "Slot_PushSettlementBounsSuccess",
    //错误提示
    Slot_ErrTips = "SlotErrTips",
    //选择游戏
    Slot_PushChooseSubGame = "SLotPushChooseSubGame",
    //请求领取收集玩法奖励返回
    Slot_PushAcceptCollectAward = "SlotPushAcceptCollectAward",
    //收集玩法中，用积分兑换商店里的奖励返回
    Slot_PushCollectShopExchangeAward = "SlotPushCollectShopExchangeAward",
    //游戏服务器奖池
    Slot_ServerGoldPool = "SlotServerGoldPool",
    //游戏服务器连接成功
    Slot_ServerConnectSuccess = "SlotServerConnectSuccess",
    //游戏重连成功
    Slot_ReConnectSuccess = "SlotReConnectSuccess"
}