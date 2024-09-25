import { LocalStorageTool } from "./storage/LocalStorageTool";

/**
 * app日志打印
 */
export default class AppLog {
    /**
     * 是否是写入本地
     */
    private static readonly m_isWrite: boolean = false;

    /**
     * 写出日志
     * @param content 内容共
     */
    public static writeLog(...data: any[]) {
        if (data) {
            cc.log(data);
        }
        if (this.m_isWrite) {
            let logStr: string = "";
            for (let i = 0; i < data.length; i++) {
                try {
                    logStr += JSON.stringify(data[i]) + ", ";
                } catch (e) {
                    logStr += e + ", ";
                }
            }
            let str = "time:" + new Date().getTime() + ";err info" + logStr;
            this.logLocation(str);
        }
    }

    /**
     * 记录本地
     */
    public static logLocation(data: string) {
        LocalStorageTool.setAPPLog(data);
    }
}