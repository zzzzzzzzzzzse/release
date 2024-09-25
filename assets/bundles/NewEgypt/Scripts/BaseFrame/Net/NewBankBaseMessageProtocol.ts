// import { BaseMessage, InnerMessage } from "../../PBClass/BaseMessage";
import NewBankProtocolBase from "./NewBankProtocolBase";

export default class NewBankBaseMessageProtocol extends NewBankProtocolBase {
    protected pbPackageName: string = "com.islet.game.proto";//当前协议包名
    protected pbName: string = "PB/BaseMessage";//pb文件名，不带扩展名

    private static _instance: NewBankBaseMessageProtocol = null;

    //基础消息协议目前可以不用注册
    public registerProtocol() {

    }

    /**
     * 获取单例
     */
    public static get instance(): NewBankBaseMessageProtocol {
        if (!this._instance) {
            this._instance = new NewBankBaseMessageProtocol();
        }
        return this._instance;
    }

    /**
     * 序列化成基础消息数据
     */
    public async encodeMsg(dataBuffer: any, msgId: number, msgType: 'Hall' | 'Game' = 'Hall'): Promise<any> {
        // let baseMsg = new BaseMessage();
        // baseMsg.command = msgId;
        // baseMsg.body = dataBuffer;
        // let innerMessage = new InnerMessage();
        // const serverVO = PlayerProxy.instance.serverVO;
        // const serverId = msgType == 'Hall' ? serverVO.hallServerId : serverVO.gameServerId;
        // if (!serverId) {
        //     return;
        // }
        // innerMessage.serverId = serverId;
        // innerMessage.body = await this.encode(baseMsg, 'BaseMessage', false);
        // let buffer = await this.encode(innerMessage, 'InnerMessage', false);
        // return buffer;
        return null
    }

    /**
     * 反序列化基础消息数据
     */
    public async decodeMsg(buffer: any): Promise<any> {
        // let innerMessage = await this.decode(buffer, 'InnerMessage', false) as InnerMessage;
        // let baseMessage = await this.decode(innerMessage.body, 'BaseMessage', false);
        // return baseMessage;
        return null
    }

    public recvMsg(msgId: number, buffer: any): void {

    }
}
