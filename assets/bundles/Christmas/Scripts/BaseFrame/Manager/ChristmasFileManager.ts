import ChristmasHttpManager from "./ChristmasHttpManager";
import ChristmasLogManager from "./ChristmasLogManager";

export default class ChristmasFileManager {
    private static _instance: ChristmasFileManager = null;

    private requestList: { [key: string]: Function } = {};
    private waitList: [{ url: string, callback: Function, timeOut: number, isBinary: boolean }] = [{ url: '', callback: null, timeOut: 3000, isBinary: false }];
    private maxCount: number = 10;

    /**
     * 获取单例
     */
    public static get instance(): ChristmasFileManager {
        if (!this._instance) {
            this._instance = new ChristmasFileManager();
        }
        return this._instance;
    }

    /**
     * 下载文件（XMLHttpRequest下载方式，一般用于下载二进制文件）
     * @param url url地址
     * @param fileName 文件名
     * @param callback 成功后回调函数
     */
    public downloadBinaryFile(url: string, callback?: Function, timeOut: number = 30000): void {
        if (!CC_JSB) {
            return;
        }
        const count = Object.keys(this.requestList).length;
        if (count > this.maxCount) {
            this.waitList.push({ url: url, callback: callback, timeOut: timeOut, isBinary: true });
            ChristmasLogManager.instance.log('达到最大下载数量，进入排队队列');
            return;
        }
        this.requestList[url] = callback;
        const download = url => {
            //是否超时
            let isTimeOut = true;
            const xhr = new XMLHttpRequest();
            xhr.timeout = timeOut;
            xhr.onreadystatechange = () => {
                const callback = this.requestList[url];
                if (xhr.readyState == 4) {
                    isTimeOut = false;
                    if (xhr.status === 200) {
                        if (xhr.response) {
                            const u8a = new Uint8Array(xhr.response);
                            callback && callback(u8a);
                            delete this.requestList[url];
                            this.downloadWaitList();

                        } else {
                            callback && callback('failed');
                            delete this.requestList[url];
                            this.downloadWaitList();
                        }
                    } else {
                        callback && callback('failed');
                        delete this.requestList[url];
                        this.downloadWaitList();
                    }
                }
            }
            setTimeout(() => {
                if (isTimeOut) {
                    xhr.abort();
                }
            }, xhr.timeout);
            xhr.responseType = "arraybuffer";
            xhr.open("GET", url, true);
            xhr.send();
        }
        download(url);
    }

    /**
     * 下载文件（XMLHttpRequest下载方式，一般用于下载文本文件）
     * @param url 
     * @param callback 
     */
    public downloadTxtFile(url: string, callback?: Function, timeOut: number = 30000): void {
        if (!CC_JSB) {
            return;
        }
        const count = Object.keys(this.requestList).length;
        if (count > this.maxCount) {
            this.waitList.push({ url: url, callback: callback, timeOut: timeOut, isBinary: false });
            ChristmasLogManager.instance.log('达到最大下载数量，进入排队队列');
            return;
        }
        this.requestList[url] = callback;
        const download = url => {
            ChristmasHttpManager.instance.sendRequestGet(url, response => {
                const callback = this.requestList[url];
                callback && callback(response);
                delete this.requestList[url];
                this.downloadWaitList();
            }, timeOut);
        }
        download(url);
    }

    private downloadWaitList(): void {
        if (this.waitList.length <= 0) {
            return;
        }
        const info = this.waitList.pop();
        ChristmasLogManager.instance.log('从队列中下载文件:', info.url);
        if (info.isBinary) {
            this.downloadBinaryFile(info.url, info.callback, info.timeOut);
        }
        else {
            this.downloadTxtFile(info.url, info.callback, info.timeOut);
        }
    }
}
