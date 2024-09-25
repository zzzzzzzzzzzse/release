import { MessageType } from "./BaseFrame/Const/NewBankCommonDefine";
import NewBankProtocolManager from "./BaseFrame/Manager/NewBankProtocolManager";
import NewBankProtocolBase from "./BaseFrame/Net/NewBankProtocolBase";
// import { NewBankBetRequest, NewBankBetResponse, NewBankCmdType, NewBankGameOverNotify, NewBankGameStartNotify, NewBankSyncNotify } from "../../../../Script/PBClass/NewBankGame";
import NewBankProxy from "./NewBankProxy";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewBankDeal extends NewBankProtocolBase {
    private static _instance: NewBankDeal = new NewBankDeal();//协议必须采用饿汉单例，为了避免服务器主动推送时，协议还未注册的情况
    protected pbPackageName: string = "com.islet.game.proto.stoneage";//当前协议包名
    protected pbName: string = "PB/NewBankGame";//pb文件名，不带扩展名
    protected protocolName: string = 'NewBankDeal';//协议名，默认设置为脚本名称

    private constructor() {
        super();
        this.registerProtocol();
    }

    /**
     * 获取单例
     */
    public static get instance(): NewBankDeal {
        if (!this._instance) {
            this._instance = new NewBankDeal();
        }
        return this._instance;
    }

    /**
     * 注册协议相关
     */
    public registerProtocol(): void {
        //脚本加载时注册到协议管理器中
        NewBankProtocolManager.instance.registerProtocol(this.protocolName, this);
        NewBankProtocolManager.instance.registerMsgType(MessageType.STONE_AGE, this.protocolName);
    }

    /**
     * 向服务器发送下注消息
     */
    public async sendBet(betGold: number, testData?: string) {
        //结算数据清空
        NewBankProxy.instance.gameOverData = null;
        // let request = new NewBankBetRequest();
        // request.betGold = betGold;
        // request.times = NewBankProxy.instance.times;
        // if (null != testData) {
        //     request.testTable = testData;
        // }
        // let buffer = await this.encode(request, 'NewBankBetRequest');
        // SocketManager.instance.sendBuffer(NewBankCmdType.C_S_STONEAGE_BET_REQUEST, buffer, "Game");
    }

    /**
     * 收到服务器消息
     * msgId：消息id，buffer：数据
     */
    public recvMsg(msgId: number, buffer: any): void {
        // switch (msgId) {
        //     case NewBankCmdType.S_C_STONEAGE_BET_RESPONSE:
        //         this.recvBetResponse(buffer);
        //         break;
        //     case NewBankCmdType.S_C_STONEAGE_GAME_OVER_NOTIFY:
        //         this.recvGameOverNotify(buffer);
        //         break;
        //     case NewBankCmdType.S_C_STONEAGE_GAME_START_NOTIFY:
        //         this.recvGameStartNotify(buffer);
        //         break;
        //     case NewBankCmdType.S_C_STONEAGE_SYNC_NOTIFY:
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
    //     let response = await this.decode(buffer, 'NewBankBetResponse') as NewBankBetResponse;
    //     NewBankProxy.instance.betResponse = response;
    //     if (response.errorCode != 0) {
    //         Util.printErrorCode(response.errorCode);
    //         EventManager.instance.emit(NewBankEventDefine.BET_ERROR);
    //     }
    // }

    // /**
    //  * 收到服务器游戏结束消息
    //  */
    // private async recvGameOverNotify(buffer: any) {
    //     let response = await this.decode(buffer, 'NewBankGameOverNotify') as NewBankGameOverNotify;
    //     NewBankProxy.instance.gameOverData = response;
    // }

    // /**
    //  * 收到服务器游戏开始消息
    //  */
    // private async recvGameStartNotify(buffer: any) {
    //     let response = await this.decode(buffer, 'NewBankGameStartNotify') as NewBankGameStartNotify;
    //     NewBankProxy.instance.times = response.times;
    //     NewBankProxy.instance.freeSpinCount = response.freeTimes;
    //     NewBankProxy.instance.nextGameType = response.gameType;
    //     if (0 != response.freeTimes) {
    //         NewBankProxy.instance.freeBet = response.freeBet;
    //     }
    //     EventManager.instance.emit(NewBankEventDefine.UPDATE_START_DATA);
    // }

    // private async recvSyncNotify(buffer: any) {
    //     let response = await this.decode(buffer, 'NewBankSyncNotify') as NewBankSyncNotify;
    //     NewBankProxy.instance.times = response.times;
    //     NewBankProxy.instance.freeSpinCount = response.freeTimes;
    //     NewBankProxy.instance.nextGameType = response.gameType;
    //     if (0 != response.freeTimes) {
    //         NewBankProxy.instance.freeBet = response.freeBet;
    //     }
    //     EventManager.instance.emit(NewBankEventDefine.RECONNECTION);
    //     EventManager.instance.emit(EventDefine.GAME_PRELOAD_COMPLETE);
    // }
}
