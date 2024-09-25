/**
 * 日志封装 4种规格 log info warn err
 */
const { ccclass, property } = cc._decorator;
let isOpen = CC_DEBUG;
@ccclass
export default class PoseidonLogManager {
    private static _instance: PoseidonLogManager;
    private logList: string[] = [];
    private maxCount: number = 1000;

    public static get instance() {
        if (PoseidonLogManager._instance == null) {
            PoseidonLogManager._instance = new PoseidonLogManager();
        }
        return PoseidonLogManager._instance;
    }

    private constructor() {

    }
    /**
     * 获取时间，时：分：秒：毫秒
     * @returns 
     */
    private getDateString(): string {
        let d = new Date();
        let str = d.getHours().toString();
        let timeStr = "";
        timeStr += (str.length == 1 ? "0" + str : str) + ":";
        str = d.getMinutes().toString();
        timeStr += (str.length == 1 ? "0" + str : str) + ":";
        str = d.getSeconds().toString();
        timeStr += (str.length == 1 ? "0" + str : str) + ":";
        str = d.getMilliseconds().toString();
        if (str.length == 1) str = "00" + str;
        if (str.length == 2) str = "0" + str;
        timeStr += str;
        timeStr = "[" + timeStr + "]";
        return timeStr;
    }

    public log(msg: any, ...args: any[]) {
        this.addLog(msg, args);
        var backLog = console.log || cc.log;
        if (isOpen) {
            backLog.call(this, "%s:", this.getDateString(), msg, ...args);
        }
    }

    public info(msg: any, ...args: any[]) {
        this.addLog(msg, args);
        var backLog = console.log || cc.log;
        if (isOpen) {
            backLog.call(this, "%c%s:", "color:#00CD00;", this.getDateString(), msg, ...args);
        }
    }

    public warn(msg: any, ...args: any[]) {
        this.addLog(msg, args);
        var backLog = console.log || cc.log;
        if (isOpen) {
            backLog.call(this, "%c%s:", "color:#ee7700;", this.getDateString(), msg, ...args);
            //cc.warn
        }
    }

    public err(msg: any, ...args: any[]) {
        this.addLog(msg, args);
        var backLog = console.log || cc.log;
        if (isOpen) {
            backLog.call(this, "%c%s:", "color:red", this.getDateString(), msg, ...args);
        }
    }

    /**
     * 添加一条日志到内存里面
     */
    private addLog(msg: any, ...args: any[]): void {
        let str = this.getDateString() + ':' + msg + ' ';
        for (let i = 0; i < args.length; i++) {
            const arg = args[i];
            if (!arg || arg.length <= 0) {
                continue;
            }
            if (typeof arg == 'object') {
                str += JSON.stringify(arg);
                continue;
            }
            str += args[i];
        }
        this.logList.push(str);
        if (this.logList.length > this.maxCount) {
            this.logList.shift();
        }
    }

    /**
     * 获取上传的日志
     */
    public getUploadLog(): string {
        let str = '';
        for (let i = 0; i < this.logList.length; i++) {
            str += this.logList[i] + '\r\n';
        }
        return str;
    }
}
