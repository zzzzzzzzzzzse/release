// import pbkiller = require('../../libs/pbkiller/src/pbkiller');
import StoneAgeLogManager from "../Manager/StoneAgeLogManager";

export default abstract class StoneAgeProtocolBase {
    protected pb: any = null;//pb数据
    protected pbPackageName: string = "";//当前协议包名
    protected pbName: string = "";//pb文件名，不带扩展名
    protected protocolName: string = '';//协议名，默认设置为脚本名称

    private bundleName: string = "resources";//Bundle名称

    /**
     * 
     * @param pbPath pb文件路径
     */
    protected async loadProtoFile() {
        if (this.pb) {
            return;
        }
        // let assets = await ResManager.instance.loadByBundle(this.bundleName, this.pbName);
        // this.pb = pbkiller.loadFromFile(assets, this.pbName + '.proto', this.pbPackageName);
    }

    /**
     * 序列化数据
     */
    public async encode(data: any, msgName: string, needLog: boolean = true): Promise<any> {
        if (!this.pb) {
            await this.loadProtoFile();
        }
        if (!this.pb || !this.pb[msgName]) {
            StoneAgeLogManager.instance.log(msgName + '协议未定义');
        }
        let msg = new this.pb[msgName];
        let keys = Object.getOwnPropertyNames(data);
        keys.forEach(key => {
            msg[key] = data[key];
        });
        needLog && StoneAgeLogManager.instance.log('send===============' + msgName + '===============', data);
        return msg.toArrayBuffer();
    }

    /**
     * 反序列化数据
     */
    public async decode(buffer: any, msgName: string, needLog: boolean = true) {
        if (!this.pb) {
            await this.loadProtoFile();
        }
        if (!this.pb || !this.pb[msgName]) {
            StoneAgeLogManager.instance.log(msgName + '协议未定义');
        }
        let data = this.pb[msgName].decode(buffer);
        needLog && StoneAgeLogManager.instance.log('recv===============' + msgName + '===============', data);
        return data;
    }

    //接受消息 处理方法，子类必须重写
    abstract recvMsg(msgId: number, buffer: any): any;
    //将协议注册到协议管理器中，子类必须重写
    abstract registerProtocol(): any;
}
