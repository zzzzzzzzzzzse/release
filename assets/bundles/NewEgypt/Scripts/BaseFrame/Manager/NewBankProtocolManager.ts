import { MessageType } from "../Const/NewBankCommonDefine";
import NewBankProtocolBase from "../Net/NewBankProtocolBase";
import NewBankLogManager from "./NewBankLogManager";

export default class NewBankProtocolManager {
    private static _instance: NewBankProtocolManager = null;
    private protocolDic: { [key: string]: NewBankProtocolBase } = {};
    private protocolNameDic: { [key: string]: string } = {};

    /**
     * 获取单例
     */
    public static get instance(): NewBankProtocolManager {
        if (!this._instance) {
            this._instance = new NewBankProtocolManager();
        }
        return this._instance;
    }

    /**
     * 注册协议
     */
    public registerProtocol(name: string, protocol: NewBankProtocolBase): void {
        this.protocolDic[name] = protocol;
    }

    /**
     * 注册消息类型
     */
    public registerMsgType(msgType: MessageType, name: string): void {
        this.protocolNameDic[msgType] = name;
    }

    /**
     * 通过协议名获取协议
     */
    public getProtocolByName(name: string): NewBankProtocolBase {
        const protocol = this.protocolDic[name];
        if (!protocol) {
            NewBankLogManager.instance.err(name + '协议未注册');
            return null;
        }
        return protocol;
    }

    /**
     * 通过消息类型获取协议
     */
    public getProtocolByType(msgType: MessageType): NewBankProtocolBase {
        const name = this.protocolNameDic[msgType];
        if (!name) {
            NewBankLogManager.instance.err(msgType + '消息类型未注册');
            return null;
        }
        return this.getProtocolByName(name);
    }
}
