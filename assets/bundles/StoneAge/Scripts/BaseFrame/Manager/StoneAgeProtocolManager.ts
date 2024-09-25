import { MessageType } from "../Const/StoneAgeCommonDefine";
import StoneAgeProtocolBase from "../Net/StoneAgeProtocolBase";
import StoneAgeLogManager from "./StoneAgeLogManager";

export default class StoneAgeProtocolManager {
    private static _instance: StoneAgeProtocolManager = null;
    private protocolDic: { [key: string]: StoneAgeProtocolBase } = {};
    private protocolNameDic: { [key: string]: string } = {};

    /**
     * 获取单例
     */
    public static get instance(): StoneAgeProtocolManager {
        if (!this._instance) {
            this._instance = new StoneAgeProtocolManager();
        }
        return this._instance;
    }

    /**
     * 注册协议
     */
    public registerProtocol(name: string, protocol: StoneAgeProtocolBase): void {
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
    public getProtocolByName(name: string): StoneAgeProtocolBase {
        const protocol = this.protocolDic[name];
        if (!protocol) {
            StoneAgeLogManager.instance.err(name + '协议未注册');
            return null;
        }
        return protocol;
    }

    /**
     * 通过消息类型获取协议
     */
    public getProtocolByType(msgType: MessageType): StoneAgeProtocolBase {
        const name = this.protocolNameDic[msgType];
        if (!name) {
            StoneAgeLogManager.instance.err(msgType + '消息类型未注册');
            return null;
        }
        return this.getProtocolByName(name);
    }
}
