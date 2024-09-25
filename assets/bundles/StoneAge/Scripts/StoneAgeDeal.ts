import { MessageType } from "./BaseFrame/Const/StoneAgeCommonDefine";
import StoneAgeProtocolManager from "./BaseFrame/Manager/StoneAgeProtocolManager";
import StoneAgeProtocolBase from "./BaseFrame/Net/StoneAgeProtocolBase";
// import { StoneAgeBetRequest, StoneAgeBetResponse, StoneAgeCmdType, StoneAgeGameOverNotify, StoneAgeGameStartNotify, StoneAgeSyncNotify } from "../../../../Script/PBClass/StoneAgeGame";
import StoneAgeProxy from "./StoneAgeProxy";

const { ccclass, property } = cc._decorator;

@ccclass
export default class StoneAgeDeal extends StoneAgeProtocolBase {
    private static _instance: StoneAgeDeal = new StoneAgeDeal();//协议必须采用饿汉单例，为了避免服务器主动推送时，协议还未注册的情况
    protected pbPackageName: string = "com.islet.game.proto.stoneage";//当前协议包名
    protected pbName: string = "PB/StoneAgeGame";//pb文件名，不带扩展名
    protected protocolName: string = 'StoneAgeDeal';//协议名，默认设置为脚本名称

    private constructor() {
        super();
        this.registerProtocol();
    }

    /**
     * 获取单例
     */
    public static get instance(): StoneAgeDeal {
        if (!this._instance) {
            this._instance = new StoneAgeDeal();
        }
        return this._instance;
    }

    /**
     * 注册协议相关
     */
    public registerProtocol(): void {
        //脚本加载时注册到协议管理器中
        StoneAgeProtocolManager.instance.registerProtocol(this.protocolName, this);
        StoneAgeProtocolManager.instance.registerMsgType(MessageType.STONE_AGE, this.protocolName);
    }

    /**
     * 向服务器发送下注消息
     */
    public async sendBet(betGold: number, testData?: string) {
        //结算数据清空
        StoneAgeProxy.instance.gameOverData = null;
        // let request = new StoneAgeBetRequest();
        // request.betGold = betGold;
        // request.times = StoneAgeProxy.instance.times;
        // if (null != testData) {
        //     request.testTable = testData;
        // }
        // let buffer = await this.encode(request, 'StoneAgeBetRequest');
        // SocketManager.instance.sendBuffer(StoneAgeCmdType.C_S_STONEAGE_BET_REQUEST, buffer, "Game");
    }

    /**
     * 收到服务器消息
     * msgId：消息id，buffer：数据
     */
    public recvMsg(msgId: number, buffer: any): void {
        // switch (msgId) {
        //     case StoneAgeCmdType.S_C_STONEAGE_BET_RESPONSE:
        //         this.recvBetResponse(buffer);
        //         break;
        //     case StoneAgeCmdType.S_C_STONEAGE_GAME_OVER_NOTIFY:
        //         this.recvGameOverNotify(buffer);
        //         break;
        //     case StoneAgeCmdType.S_C_STONEAGE_GAME_START_NOTIFY:
        //         this.recvGameStartNotify(buffer);
        //         break;
        //     case StoneAgeCmdType.S_C_STONEAGE_SYNC_NOTIFY:
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
    //     let response = await this.decode(buffer, 'StoneAgeBetResponse') as StoneAgeBetResponse;
    //     StoneAgeProxy.instance.betResponse = response;
    //     if (response.errorCode != 0) {
    //         Util.printErrorCode(response.errorCode);
    //         EventManager.instance.emit(StoneAgeEventDefine.BET_ERROR);
    //     }
    // }

    // /**
    //  * 收到服务器游戏结束消息
    //  */
    // private async recvGameOverNotify(buffer: any) {
    //     let response = await this.decode(buffer, 'StoneAgeGameOverNotify') as StoneAgeGameOverNotify;
    //     StoneAgeProxy.instance.gameOverData = response;
    // }

    // /**
    //  * 收到服务器游戏开始消息
    //  */
    // private async recvGameStartNotify(buffer: any) {
    //     let response = await this.decode(buffer, 'StoneAgeGameStartNotify') as StoneAgeGameStartNotify;
    //     StoneAgeProxy.instance.times = response.times;
    //     StoneAgeProxy.instance.freeSpinCount = response.freeTimes;
    //     StoneAgeProxy.instance.nextGameType = response.gameType;
    //     if (0 != response.freeTimes) {
    //         StoneAgeProxy.instance.freeBet = response.freeBet;
    //     }
    //     EventManager.instance.emit(StoneAgeEventDefine.UPDATE_START_DATA);
    // }

    // private async recvSyncNotify(buffer: any) {
    //     let response = await this.decode(buffer, 'StoneAgeSyncNotify') as StoneAgeSyncNotify;
    //     StoneAgeProxy.instance.times = response.times;
    //     StoneAgeProxy.instance.freeSpinCount = response.freeTimes;
    //     StoneAgeProxy.instance.nextGameType = response.gameType;
    //     if (0 != response.freeTimes) {
    //         StoneAgeProxy.instance.freeBet = response.freeBet;
    //     }
    //     EventManager.instance.emit(StoneAgeEventDefine.RECONNECTION);
    //     EventManager.instance.emit(EventDefine.GAME_PRELOAD_COMPLETE);
    // }
}
