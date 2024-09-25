import { MessageType } from "./BaseFrame/Const/PoseidonCommonDefine";
import PoseidonProtocolManager from "./BaseFrame/Manager/PoseidonProtocolManager";
import PoseidonProtocolBase from "./BaseFrame/Net/PoseidonProtocolBase";
// import { PoseidonBetRequest, PoseidonBetResponse, PoseidonCmdType, PoseidonGameOverNotify, PoseidonGameStartNotify, PoseidonSyncNotify } from "../../../../Script/PBClass/PoseidonGame";
import PoseidonProxy from "./PoseidonProxy";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PoseidonDeal extends PoseidonProtocolBase {
    private static _instance: PoseidonDeal = new PoseidonDeal();//协议必须采用饿汉单例，为了避免服务器主动推送时，协议还未注册的情况
    protected pbPackageName: string = "com.islet.game.proto.stoneage";//当前协议包名
    protected pbName: string = "PB/PoseidonGame";//pb文件名，不带扩展名
    protected protocolName: string = 'PoseidonDeal';//协议名，默认设置为脚本名称

    private constructor() {
        super();
        this.registerProtocol();
    }

    /**
     * 获取单例
     */
    public static get instance(): PoseidonDeal {
        if (!this._instance) {
            this._instance = new PoseidonDeal();
        }
        return this._instance;
    }

    /**
     * 注册协议相关
     */
    public registerProtocol(): void {
        //脚本加载时注册到协议管理器中
        PoseidonProtocolManager.instance.registerProtocol(this.protocolName, this);
        PoseidonProtocolManager.instance.registerMsgType(MessageType.STONE_AGE, this.protocolName);
    }

    /**
     * 向服务器发送下注消息
     */
    public async sendBet(betGold: number, testData?: string) {
        //结算数据清空
        PoseidonProxy.instance.gameOverData = null;
        // let request = new PoseidonBetRequest();
        // request.betGold = betGold;
        // request.times = PoseidonProxy.instance.times;
        // if (null != testData) {
        //     request.testTable = testData;
        // }
        // let buffer = await this.encode(request, 'PoseidonBetRequest');
        // SocketManager.instance.sendBuffer(PoseidonCmdType.C_S_STONEAGE_BET_REQUEST, buffer, "Game");
    }

    /**
     * 收到服务器消息
     * msgId：消息id，buffer：数据
     */
    public recvMsg(msgId: number, buffer: any): void {
        // switch (msgId) {
        //     case PoseidonCmdType.S_C_STONEAGE_BET_RESPONSE:
        //         this.recvBetResponse(buffer);
        //         break;
        //     case PoseidonCmdType.S_C_STONEAGE_GAME_OVER_NOTIFY:
        //         this.recvGameOverNotify(buffer);
        //         break;
        //     case PoseidonCmdType.S_C_STONEAGE_GAME_START_NOTIFY:
        //         this.recvGameStartNotify(buffer);
        //         break;
        //     case PoseidonCmdType.S_C_STONEAGE_SYNC_NOTIFY:
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
    //     let response = await this.decode(buffer, 'PoseidonBetResponse') as PoseidonBetResponse;
    //     PoseidonProxy.instance.betResponse = response;
    //     if (response.errorCode != 0) {
    //         Util.printErrorCode(response.errorCode);
    //         EventManager.instance.emit(PoseidonEventDefine.BET_ERROR);
    //     }
    // }

    // /**
    //  * 收到服务器游戏结束消息
    //  */
    // private async recvGameOverNotify(buffer: any) {
    //     let response = await this.decode(buffer, 'PoseidonGameOverNotify') as PoseidonGameOverNotify;
    //     PoseidonProxy.instance.gameOverData = response;
    // }

    // /**
    //  * 收到服务器游戏开始消息
    //  */
    // private async recvGameStartNotify(buffer: any) {
    //     let response = await this.decode(buffer, 'PoseidonGameStartNotify') as PoseidonGameStartNotify;
    //     PoseidonProxy.instance.times = response.times;
    //     PoseidonProxy.instance.freeSpinCount = response.freeTimes;
    //     PoseidonProxy.instance.nextGameType = response.gameType;
    //     if (0 != response.freeTimes) {
    //         PoseidonProxy.instance.freeBet = response.freeBet;
    //     }
    //     EventManager.instance.emit(PoseidonEventDefine.UPDATE_START_DATA);
    // }

    // private async recvSyncNotify(buffer: any) {
    //     let response = await this.decode(buffer, 'PoseidonSyncNotify') as PoseidonSyncNotify;
    //     PoseidonProxy.instance.times = response.times;
    //     PoseidonProxy.instance.freeSpinCount = response.freeTimes;
    //     PoseidonProxy.instance.nextGameType = response.gameType;
    //     if (0 != response.freeTimes) {
    //         PoseidonProxy.instance.freeBet = response.freeBet;
    //     }
    //     EventManager.instance.emit(PoseidonEventDefine.RECONNECTION);
    //     EventManager.instance.emit(EventDefine.GAME_PRELOAD_COMPLETE);
    // }
}
