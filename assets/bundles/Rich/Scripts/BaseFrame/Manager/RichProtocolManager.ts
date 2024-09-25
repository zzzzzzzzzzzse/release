import { MessageType } from "../Const/RichCommonDefine";
import RichProtocolBase from "../Net/RichProtocolBase";
import RichLogManager from "./RichLogManager";

export default class RichProtocolManager {
    private static _instance: RichProtocolManager = null;
    private protocolDic: { [key: string]: RichProtocolBase } = {};
    private protocolNameDic: { [key: string]: string } = {};

    /**
     * 获取单例
     */
    public static get instance(): RichProtocolManager {
        if (!this._instance) {
            this._instance = new RichProtocolManager();
        }
        return this._instance;
    }

    /**
     * 注册协议
     */
    public registerProtocol(name: string, protocol: RichProtocolBase): void {
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
    public getProtocolByName(name: string): RichProtocolBase {
        const protocol = this.protocolDic[name];
        if (!protocol) {
            RichLogManager.instance.err(name + '协议未注册');
            return null;
        }
        return protocol;
    }

    /**
     * 通过消息类型获取协议
     */
    public getProtocolByType(msgType: MessageType): RichProtocolBase {
        const name = this.protocolNameDic[msgType];
        if (!name) {
            RichLogManager.instance.err(msgType + '消息类型未注册');
            return null;
        }
        return this.getProtocolByName(name);
    }
}
