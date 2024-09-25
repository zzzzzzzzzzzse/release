import { MessageType } from "./BaseFrame/Const/ChristmasCommonDefine";
import ChristmasProtocolManager from "./BaseFrame/Manager/ChristmasProtocolManager";
import ChristmasProtocolBase from "./BaseFrame/Net/ChristmasProtocolBase";
// import { ChristmasBetRequest, ChristmasBetResponse, ChristmasCmdType, ChristmasGameOverNotify, ChristmasGameStartNotify, ChristmasSyncNotify } from "../../../../Script/PBClass/ChristmasGame";
import ChristmasProxy from "./ChristmasProxy";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ChristmasDeal extends ChristmasProtocolBase {
    private static _instance: ChristmasDeal = new ChristmasDeal();//协议必须采用饿汉单例，为了避免服务器主动推送时，协议还未注册的情况
    protected pbPackageName: string = "com.islet.game.proto.stoneage";//当前协议包名
    protected pbName: string = "PB/ChristmasGame";//pb文件名，不带扩展名
    protected protocolName: string = 'ChristmasDeal';//协议名，默认设置为脚本名称

    private constructor() {
        super();
        this.registerProtocol();
    }

    /**
     * 获取单例
     */
    public static get instance(): ChristmasDeal {
        if (!this._instance) {
            this._instance = new ChristmasDeal();
        }
        return this._instance;
    }

    /**
     * 注册协议相关
     */
    public registerProtocol(): void {
        //脚本加载时注册到协议管理器中
        ChristmasProtocolManager.instance.registerProtocol(this.protocolName, this);
        ChristmasProtocolManager.instance.registerMsgType(MessageType.STONE_AGE, this.protocolName);
    }

    /**
     * 向服务器发送下注消息
     */
    public async sendBet(betGold: number, testData?: string) {
        //结算数据清空
        ChristmasProxy.instance.gameOverData = null;
        // let request = new ChristmasBetRequest();
        // request.betGold = betGold;
        // request.times = ChristmasProxy.instance.times;
        // if (null != testData) {
        //     request.testTable = testData;
        // }
        // let buffer = await this.encode(request, 'ChristmasBetRequest');
        // SocketManager.instance.sendBuffer(ChristmasCmdType.C_S_STONEAGE_BET_REQUEST, buffer, "Game");
    }

    /**
     * 收到服务器消息
     * msgId：消息id，buffer：数据
     */
    public recvMsg(msgId: number, buffer: any): void {
        // switch (msgId) {
        //     case ChristmasCmdType.S_C_STONEAGE_BET_RESPONSE:
        //         this.recvBetResponse(buffer);
        //         break;
        //     case ChristmasCmdType.S_C_STONEAGE_GAME_OVER_NOTIFY:
        //         this.recvGameOverNotify(buffer);
        //         break;
        //     case ChristmasCmdType.S_C_STONEAGE_GAME_START_NOTIFY:
        //         this.recvGameStartNotify(buffer);
        //         break;
        //     case ChristmasCmdType.S_C_STONEAGE_SYNC_NOTIFY:
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
    //     let response = await this.decode(buffer, 'ChristmasBetResponse') as ChristmasBetResponse;
    //     ChristmasProxy.instance.betResponse = response;
    //     if (response.errorCode != 0) {
    //         Util.printErrorCode(response.errorCode);
    //         EventManager.instance.emit(ChristmasEventDefine.BET_ERROR);
    //     }
    // }

    // /**
    //  * 收到服务器游戏结束消息
    //  */
    // private async recvGameOverNotify(buffer: any) {
    //     let response = await this.decode(buffer, 'ChristmasGameOverNotify') as ChristmasGameOverNotify;
    //     ChristmasProxy.instance.gameOverData = response;
    // }

    // /**
    //  * 收到服务器游戏开始消息
    //  */
    // private async recvGameStartNotify(buffer: any) {
    //     let response = await this.decode(buffer, 'ChristmasGameStartNotify') as ChristmasGameStartNotify;
    //     ChristmasProxy.instance.times = response.times;
    //     ChristmasProxy.instance.freeSpinCount = response.freeTimes;
    //     ChristmasProxy.instance.nextGameType = response.gameType;
    //     if (0 != response.freeTimes) {
    //         ChristmasProxy.instance.freeBet = response.freeBet;
    //     }
    //     EventManager.instance.emit(ChristmasEventDefine.UPDATE_START_DATA);
    // }

    // private async recvSyncNotify(buffer: any) {
    //     let response = await this.decode(buffer, 'ChristmasSyncNotify') as ChristmasSyncNotify;
    //     ChristmasProxy.instance.times = response.times;
    //     ChristmasProxy.instance.freeSpinCount = response.freeTimes;
    //     ChristmasProxy.instance.nextGameType = response.gameType;
    //     if (0 != response.freeTimes) {
    //         ChristmasProxy.instance.freeBet = response.freeBet;
    //     }
    //     EventManager.instance.emit(ChristmasEventDefine.RECONNECTION);
    //     EventManager.instance.emit(EventDefine.GAME_PRELOAD_COMPLETE);
    // }
}
