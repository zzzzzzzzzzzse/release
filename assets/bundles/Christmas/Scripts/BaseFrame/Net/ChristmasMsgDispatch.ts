import { MessageType } from "../Const/ChristmasCommonDefine";
import ChristmasLogManager from "../Manager/ChristmasLogManager";
import ChristmasProtocolManager from "../Manager/ChristmasProtocolManager";
import ChristmasTimerManager from "../Manager/ChristmasTimerManager";

export default class ChristmasMsgDispatch {
    private static _instance: ChristmasMsgDispatch = null;
    private msgList: Array<{ msgId: number, buffer: any }> = [];
    private _needDispatch: boolean = true;
    /**
     * 获取单例
     */
    public static get instance(): ChristmasMsgDispatch {
        if (!this._instance) {
            this._instance = new ChristmasMsgDispatch();
        }
        return this._instance;
    }

    /**
     * 准备派发消息
     */
    public preDispatch(msgId: number, buffer: any) {
        if (!this._needDispatch) {
            this.msgList.push({ msgId: msgId, buffer: buffer });
            return;
        }
        this.dispatchMsg(msgId, buffer);
    }

    /**
     * 派发消息
     */
    private dispatchMsg(msgId: number, buffer: any): void {
        let msgType = this.getMsgType(msgId);
        let protocol = ChristmasProtocolManager.instance.getProtocolByType(msgType);
        if (!protocol) {
            ChristmasLogManager.instance.warn(msgType + '消息类型未注册');
            return;
        }
        protocol.recvMsg(msgId, buffer);
    }

    /**
     * 获取消息的大类型
     */
    public getMsgType(msgId: number): MessageType {
        let msgType = msgId.toString().substr(0, 3) as MessageType;
        return msgType;
    }

    public startDispatch(): void {
        this._needDispatch = true;
        for (let i = 0; i < this.msgList.length; i++) {
            const msg = this.msgList[i];
            ChristmasTimerManager.instance.setTimeOut(() => {
                this.dispatchMsg(msg.msgId, msg.buffer);
            }, i * 0.01);
        }
        this.msgList = [];
    }

    public stopDispatch(): void {
        this._needDispatch = false;
    }
}
