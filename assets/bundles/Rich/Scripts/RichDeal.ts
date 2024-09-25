import { MessageType } from "./BaseFrame/Const/RichCommonDefine";
import RichProtocolManager from "./BaseFrame/Manager/RichProtocolManager";
import RichProtocolBase from "./BaseFrame/Net/RichProtocolBase";
// import { RichBetRequest, RichBetResponse, RichCmdType, RichGameOverNotify, RichGameStartNotify, RichSyncNotify } from "../../../../Script/PBClass/RichGame";
import RichProxy from "./RichProxy";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RichDeal extends RichProtocolBase {
    private static _instance: RichDeal = new RichDeal();//协议必须采用饿汉单例，为了避免服务器主动推送时，协议还未注册的情况
    protected pbPackageName: string = "com.islet.game.proto.stoneage";//当前协议包名
    protected pbName: string = "PB/RichGame";//pb文件名，不带扩展名
    protected protocolName: string = 'RichDeal';//协议名，默认设置为脚本名称

    private constructor() {
        super();
        this.registerProtocol();
    }

    /**
     * 获取单例
     */
    public static get instance(): RichDeal {
        if (!this._instance) {
            this._instance = new RichDeal();
        }
        return this._instance;
    }

    /**
     * 注册协议相关
     */
    public registerProtocol(): void {
        //脚本加载时注册到协议管理器中
        RichProtocolManager.instance.registerProtocol(this.protocolName, this);
        RichProtocolManager.instance.registerMsgType(MessageType.STONE_AGE, this.protocolName);
    }

    /**
     * 向服务器发送下注消息
     */
    public async sendBet(betGold: number, testData?: string) {
        //结算数据清空
        RichProxy.instance.gameOverData = null;
        // let request = new RichBetRequest();
        // request.betGold = betGold;
        // request.times = RichProxy.instance.times;
        // if (null != testData) {
        //     request.testTable = testData;
        // }
        // let buffer = await this.encode(request, 'RichBetRequest');
        // SocketManager.instance.sendBuffer(RichCmdType.C_S_STONEAGE_BET_REQUEST, buffer, "Game");
    }

    /**
     * 收到服务器消息
     * msgId：消息id，buffer：数据
     */
    public recvMsg(msgId: number, buffer: any): void {
        // switch (msgId) {
        //     case RichCmdType.S_C_STONEAGE_BET_RESPONSE:
        //         this.recvBetResponse(buffer);
        //         break;
        //     case RichCmdType.S_C_STONEAGE_GAME_OVER_NOTIFY:
        //         this.recvGameOverNotify(buffer);
        //         break;
        //     case RichCmdType.S_C_STONEAGE_GAME_START_NOTIFY:
        //         this.recvGameStartNotify(buffer);
        //         break;
        //     case RichCmdType.S_C_STONEAGE_SYNC_NOTIFY:
        //         this.recvSyncNotify(buffer);
        //         break;


        //     default:
        //         LogManager.instance.warn(msgId + '消息未进行处理');
        //         break;
        // }
    }

    // /**
    //  * 收到服务器下注消息
    //  */
    // private async recvBetResponse(buffer: any) {
    //     let response = await this.decode(buffer, 'RichBetResponse') as RichBetResponse;
    //     RichProxy.instance.betResponse = response;
    //     if (response.errorCode != 0) {
    //         Util.printErrorCode(response.errorCode);
    //         EventManager.instance.emit(RichEventDefine.BET_ERROR);
    //     }
    // }

    // /**
    //  * 收到服务器游戏结束消息
    //  */
    // private async recvGameOverNotify(buffer: any) {
    //     let response = await this.decode(buffer, 'RichGameOverNotify') as RichGameOverNotify;
    //     RichProxy.instance.gameOverData = response;
    // }

    // /**
    //  * 收到服务器游戏开始消息
    //  */
    // private async recvGameStartNotify(buffer: any) {
    //     let response = await this.decode(buffer, 'RichGameStartNotify') as RichGameStartNotify;
    //     RichProxy.instance.times = response.times;
    //     RichProxy.instance.freeSpinCount = response.freeTimes;
    //     RichProxy.instance.nextGameType = response.gameType;
    //     if (0 != response.freeTimes) {
    //         RichProxy.instance.freeBet = response.freeBet;
    //     }
    //     EventManager.instance.emit(RichEventDefine.UPDATE_START_DATA);
    // }

    // private async recvSyncNotify(buffer: any) {
    //     let response = await this.decode(buffer, 'RichSyncNotify') as RichSyncNotify;
    //     RichProxy.instance.times = response.times;
    //     RichProxy.instance.freeSpinCount = response.freeTimes;
    //     RichProxy.instance.nextGameType = response.gameType;
    //     if (0 != response.freeTimes) {
    //         RichProxy.instance.freeBet = response.freeBet;
    //     }
    //     EventManager.instance.emit(RichEventDefine.RECONNECTION);
    //     EventManager.instance.emit(EventDefine.GAME_PRELOAD_COMPLETE);
    // }
}
