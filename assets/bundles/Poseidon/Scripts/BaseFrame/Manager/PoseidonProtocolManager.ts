import { MessageType } from "../Const/PoseidonCommonDefine";
import PoseidonProtocolBase from "../Net/PoseidonProtocolBase";
import PoseidonLogManager from "./PoseidonLogManager";

export default class PoseidonProtocolManager {
    private static _instance: PoseidonProtocolManager = null;
    private protocolDic: { [key: string]: PoseidonProtocolBase } = {};
    private protocolNameDic: { [key: string]: string } = {};

    /**
     * 获取单例
     */
    public static get instance(): PoseidonProtocolManager {
        if (!this._instance) {
            this._instance = new PoseidonProtocolManager();
        }
        return this._instance;
    }

    /**
     * 注册协议
     */
    public registerProtocol(name: string, protocol: PoseidonProtocolBase): void {
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
    public getProtocolByName(name: string): PoseidonProtocolBase {
        const protocol = this.protocolDic[name];
        if (!protocol) {
            PoseidonLogManager.instance.err(name + '协议未注册');
            return null;
        }
        return protocol;
    }

    /**
     * 通过消息类型获取协议
     */
    public getProtocolByType(msgType: MessageType): PoseidonProtocolBase {
        const name = this.protocolNameDic[msgType];
        if (!name) {
            PoseidonLogManager.instance.err(msgType + '消息类型未注册');
            return null;
        }
        return this.getProtocolByName(name);
    }
}
