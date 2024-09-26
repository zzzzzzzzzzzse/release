import { UIManagernew } from "../../../UIManagernew";
import { TransportData } from "../../../resources/proto/Packet";
import { Error, PushHeartBeat, ReqHeartBeat, SubCmd } from "../../../resources/proto/common";
import { Hall_PushApiCallBackMessage, Hall_PushLogin, Hall_ReqLogin } from "../../../resources/proto/hall";
import { Constants } from "../../Constants";
import { BaseUI } from "../../common/BaseUI";
import { EventBus } from "../../common/EventBus";
import AppBundleConfig from "../../configs/AppBundleConfig";
import { SocketReqSlotLogin } from "../../models/socket/SocketReqSlotLogin";
import { StringUtil } from "../../tools/StringUtil";
import ImMessageDataUtil from "../im/ImMessageDataUtil";
import ImMessageInfo from "../im/ImMessageInfo";
import { BaseHub } from "./BaseHub";
// var GameType = require("GameType")

/**
 * 大厅集线器
 */
export class HallHub extends BaseHub {

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


    isLogin: boolean = false;
    sendTime: number = 0;
    receiveTime: number = 0;
    starttime: boolean = false;
    showalertbol: boolean = false;
    showtipsbol: boolean = false;
    iscannect: boolean = true;

    /**
     * 构造方法
     * @param eventBus 
     */
    public constructor(eventBus: EventBus) {
        super(eventBus);
        //绑定消息分发
        this.m_messageHandlers.set(HallEventBusEnum.Hall_Player_Login_Result, this.onPlayerJoinHall.bind(this));
        this.m_messageHandlers.set(HallEventBusEnum.Hall_PushApiCallBackMessage, this.onPushMsg.bind(this));
        // this.m_messageHandlers.set(HallEventBusEnum.Hall_PushGameMessage, this.onshowtips.bind(this));

        cc.game.on(cc.game.EVENT_SHOW, this.gameshow.bind(this));
        cc.game.on(cc.game.EVENT_HIDE, this.gamehide.bind(this));
        // 检测网络状态
        // cc.director.getScheduler().schedule(this.update, this, 1, cc.macro.REPEAT_FOREVER, 0, false);
    }

    onshowtips(bol: boolean) {
        this.showtipsbol = bol
        if (bol = true) {
            this.starttime = false
        }
    }

    gameshow() {
        cc.log("hall_show")
        cc.game.resume();



    }


    gamehide() {
        cc.log("hall_hide")
        if (this.isConnect == false) {
            return
        }
        this.sendPing();
        // this.hidetimes = new Date().getTime();
        cc.game.pause();
    }

    private closeSocketWhenHideTooLong() {

    }

    /**
     * 连接socket
     * @param url socket的url
     */
    public connect() {
        // BaseUI.addNetLoading();
        // 检测网络状态
        if (this.starttime == false) {
            cc.director.getScheduler().enableForTarget(this);
            cc.director.getScheduler().schedule(this.update, this, 1, cc.macro.REPEAT_FOREVER, 0, false);
            this.starttime = true
        }

        // this.deleteSocket()
        this.connectingTime = new Date().getTime();

        return this.connectSocket(Constants.getInstance().m_hallSocketHost.getHostUrl(), this.socketOnOpen.bind(this), this.socketOnMessage.bind(this), this.socketOnError.bind(this), this.socketOnClose.bind(this));
        // return this.connectSocket("ws://slotcenter20200.fanyouonline.cloud:8081/ws", this.socketOnOpen.bind(this), this.socketOnMessage.bind(this), this.socketOnError.bind(this), this.socketOnClose.bind(this));
    }


    onbackHall() {
        let SceneName = cc.director.getScene().name
        if (SceneName.localeCompare("CoreLoadScene") != 0) {
            // cc.director.loadScene("CoreLoadScene") 

            // this.starttime  = false
            this.closeSocket();
            // cc.game.restart();
            cc.director.loadScene("CoreLoadScene")
        }

    }

    deleteSocket() {
        this.onDestroy()

        this.isConnect = false;
        // if (this.socket) {
        //     this.socket.close();
        // }

        // this.isConnect = false;
    }


    update(dt: number) {
        // cc.log("hall dt=",dt)
        if ((this.connectingTime != 0) && !this.isConnect) {
            // 连接socket超时Z
            if (new Date().getTime() - this.connectingTime > this.SOCKET_MSG_WAITTIME * 1000) {
                this.connectingTime = 0;
                cc.log("update111")
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
                console.log("this.receiveTime : " + this.receiveTime);
                // 心跳回调检测
                if (new Date().getTime() - this.receiveTime > this.SOCKET_MSG_WAITTIME * 1000) {
                    // 服务器长时间没有回复,重连
                    this.receiveTime = new Date().getTime();
                    this.reconnect();
                    cc.log("update2222")
                }


            }
        }
    }

    closeSocket() {
        this.isLogin = false;
        this.deleteSocket();
        this.starttime = false
        cc.director.getScheduler().unschedule(this.update, this);
    }

    //重置重连状态
    resetstatus() {
        this.iscannect = false;
        this.closeSocket()

    }

    // 重连
    reconnect() {
        if (this.showtipsbol == true) {
            this.starttime = false
            this.closeSocket()
            this.isConnect = false
            return
        }
        cc.log("======reconnect=====");
        if (this.reconnectCount >= this.SOCKET_RECONNECT_COUNT) {
            cc.log('socketconnect no up');
            this.socketError();
        } else {
            cc.log('reconnect  ' + this.reconnectCount);
            this.reconnectCount = this.reconnectCount + 1;
            this.connect();
            // if (this.isLogin) {

            // } else {
            if (this.showalertbol == false && Constants.getInstance().IsGameEnd == true) {
                BaseUI.addNetLoading();
            }

            // }
        }
    }

    // 连接出错
    socketError() {
        if (this.reconnectCount >= this.SOCKET_RECONNECT_COUNT && Constants.getInstance().IsGameEnd == true) {
            // 断开socket，等待手动重连
            //this.deleteSocket();
            this.reconnectCount = 0;

            this.showAlert();

        }
    }

    showAlert() {
        this.showtipsbol = true
        let SceneName = cc.director.getScene().name
        if (SceneName.localeCompare("CoreLoadScene") != 0) {
            let sureCallback = (() => {
                cc.log("sureCallback!!!")
                this.showalertbol = false
                this.showtipsbol = false
                this.onbackHall()
            })
            let msg1 = {
                name: "MessageBoxView",
                sureCallback: sureCallback,
                bundleIndex: AppBundleConfig.BUNDLE_HALL,
                btnOkText: "Disconnect, please login again.",
                btnCount: 1,
                zorder: 10000
            }
            UIManagernew.openUI(msg1)
        }
        BaseUI.removeNetLoading()

        this.showalertbol = true
    }

    /**
     * socket连接打开
     * @param evt 回调
     */
    public socketOnOpen(evt: Event) {
        BaseUI.removeNetLoading();
        this.isConnect = true;
        this.connectingTime = 0;
        this.iscannect = true
        // 重置重连次数
        this.reconnectCount = 0;
        // 重置发送消息的时间
        this.sendTime = new Date().getTime();
        // 重置收到消息的时间
        this.receiveTime = new Date().getTime();

        //连接成功发送登录socket
        if (Constants.getInstance().m_LoginUserSession && Constants.getInstance().m_LoginUserSession.m_userToken) {
            let socketReqSlotLogin = new SocketReqSlotLogin();
            socketReqSlotLogin.m_pid = Constants.getInstance().m_LoginUserSession.m_uid;
            socketReqSlotLogin.m_token = Constants.getInstance().m_LoginUserSession.m_userToken;
            socketReqSlotLogin.m_version = "1.0.0";
            socketReqSlotLogin.m_maskingKey = 10;
            this.sendMsgUserLogin(socketReqSlotLogin);
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
        this.parseProtoBufId(evt, this.distrubuteMsg.bind(this));
    }

    /**
     * socket连接错误
     * @param evt 
     */
    public socketOnError(evt: Event) {
        cc.log("socket connect err")
        this.socketError();
    }

    /**
     * socket连接关闭
     * @param evt 
     */
    public socketOnClose(evt: Event) {
        this.isConnect = false;

        if (this.iscannect == false) {
            return
        }
        // 断socket写死登出
        // this.socketError();
        // BaseUI.addNetLoading()
        // 连接断开，开始重连
        setTimeout(() => {
            this.reconnect();
        }, this.SOCKET_RECONNECT_TIME * 1000);
    }

    /**
      * 发送玩家登录socket
      */
    public sendMsgUserLogin(slotData: SocketReqSlotLogin) {
        //统计请求次数
        this.m_requestCount++;
        let reqLogin = new Hall_ReqLogin({
            pid: slotData.m_pid,
            token: slotData.m_token,
            version: slotData.m_version,
            maskingKey: slotData.m_maskingKey
        });
        let sendData = Hall_ReqLogin.encode(reqLogin).finish();
        let transportData: TransportData = {
            cmd: SubCmd.Cmd_Hall_ReqLogin,
            sessionData: 10,
            sendData: sendData
        }
        let sendMessage = this.m_protoProcessor.encode(transportData);
        this.m_socket.send(sendMessage);
    }

    /**
     * 玩家加入大厅
     * @param gameId slot游戏id
     */
    private onPlayerJoinHall() {
        this.m_eventBus.post(HallEventBusEnum.Hall_Player_Login_Result, Constants.getInstance().m_LoginUserSession.m_uid);
    }

    /**
     * 推送回调
     */
    private onPushMsg(data: Hall_PushApiCallBackMessage) {
        if (!StringUtil.isEmpty(data.jsondata)) {
            let imMessageInfo: ImMessageInfo = new ImMessageInfo();
            imMessageInfo.m_imMsgBody = data.jsondata;
            // ImMessageHelper.getInstance().sendMessage(BridgeDataType.SERVER_IM, imMessageInfo);
            ImMessageDataUtil.formatCustomMessgeOrderItem(imMessageInfo);
            // this.m_eventBus.post(HallEventBusEnum.Hall_PushApiCallBackMessage, Constants.getInstance().m_LoginUserSession.m_uid);
        }
    }

    /**
     * 发送心跳
     */
    public async sendPing() {
        this.m_requestCount++;
        let sendData = ReqHeartBeat.encode(new ReqHeartBeat()).finish();
        let transportData: TransportData = {
            cmd: SubCmd.Cmd_ReqHeartBeat,
            sessionData: 10,
            sendData: sendData
        }
        let sendMessage = this.m_protoProcessor.encode(transportData);
        this.m_socket.send(sendMessage);
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
                if (errInfo) {
                    cc.log("hall err", errInfo);
                }
                break;
            }
            case SubCmd.Cmd_PushHeartBeat: {
                //心跳pong
                PushHeartBeat.decode(data);
                break;
            }
            case SubCmd.Cmd_Hall_PushLogin: {
                //登录回调
                let pushLoginData = Hall_PushLogin.decode(data);
                if (pushLoginData) {
                    this.onPlayerJoinHall();
                }
                break;
            }
            case SubCmd.Cmd_Hall_PushApiCallBackMessage: {
                //推送回调
                let pushLoginData = Hall_PushApiCallBackMessage.decode(data);
                if (pushLoginData) {
                    this.onPushMsg(pushLoginData);
                }
                break;
            }
        }
    }
}

/**
 * 大厅专用枚举
 */
export enum HallEventBusEnum {
    //心跳pong
    Hall_HeartBeat_Result = "Hall_HeartBeat_Result",
    //玩家登录游戏
    Hall_Player_Login_Result = "Hall_Player_Login_Result",
    //推送回调
    Hall_PushApiCallBackMessage = "Hall_PushApiCallBackMessage",
    //推送通知
    Hall_PushGameMessage = "Hall_PushGameMessage",
    //经验值变化
    Hall_Exp_Change = "Hall_Exp_Change",
    //升级奖励
    Hall_Uplevel_Reward = "Hall_Uplevel_Reward",
}