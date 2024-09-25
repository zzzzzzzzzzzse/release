import { MessageType } from "../Const/ChristmasCommonDefine";
import ChristmasProtocolBase from "../Net/ChristmasProtocolBase";
import ChristmasLogManager from "./ChristmasLogManager";

export default class ChristmasProtocolManager {
    private static _instance: ChristmasProtocolManager = null;
    private protocolDic: { [key: string]: ChristmasProtocolBase } = {};
    private protocolNameDic: { [key: string]: string } = {};

    /**
     * 获取单例
     */
    public static get instance(): ChristmasProtocolManager {
        if (!this._instance) {
            this._instance = new ChristmasProtocolManager();
        }
        return this._instance;
    }

    /**
     * 注册协议
     */
    public registerProtocol(name: string, protocol: ChristmasProtocolBase): void {
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
    public getProtocolByName(name: string): ChristmasProtocolBase {
        const protocol = this.protocolDic[name];
        if (!protocol) {
            ChristmasLogManager.instance.err(name + '协议未注册');
            return null;
        }
        return protocol;
    }

    /**
     * 通过消息类型获取协议
     */
    public getProtocolByType(msgType: MessageType): ChristmasProtocolBase {
        const name = this.protocolNameDic[msgType];
        if (!name) {
            ChristmasLogManager.instance.err(msgType + '消息类型未注册');
            return null;
        }
        return this.getProtocolByName(name);
    }
}
