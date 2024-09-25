import PoseidonLogManager from "./PoseidonLogManager";

export default class PoseidonHttpManager {
    private static _instance: PoseidonHttpManager = null;

    /**
     * 获取单例
     */
    public static get instance(): PoseidonHttpManager {
        if (!this._instance) {
            this._instance = new PoseidonHttpManager();
        }
        return this._instance;
    }

    /**
     * get请求Url
     * @param url 地址
     * @param data object数据
     * @param callback 回调函数 status:状态 success or fail  response：回调数据
     */
    public sendRequestGet(url: string, callback?: (response: string) => void, timeOut: number = 3000) {
        //是否超时
        let isTimeOut = true;
        let xhr = new XMLHttpRequest();
        xhr.timeout = timeOut;
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                isTimeOut = false;
                if (xhr.status >= 200 && xhr.status < 400) {
                    callback && callback(xhr.responseText);
                } else {
                    PoseidonLogManager.instance.err(url + '请求失败, 内容为:', xhr.responseText);
                    callback && callback('failed');
                }
            }
        };

        xhr.open('GET', url, true);
        xhr.send();
        setTimeout(() => {
            if (isTimeOut) {
                xhr.abort();
            }
        }, xhr.timeout);
        return xhr;
    }

    /**
     * get请求Url
     * @param url 地址
     * @param data object数据
     * @param callback 回调函数 status:状态 success or fail  response：回调数据
     */
    public sendRequestPost(url: string, data: any, callback?: (response: string) => void, timeOut: number = 3000) {
        //是否超时
        let isTimeOut = true;
        let xhr = new XMLHttpRequest();
        xhr.timeout = timeOut;
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                isTimeOut = false;
                if (xhr.status >= 200 && xhr.status < 400) {
                    callback && callback(xhr.responseText);
                } else {
                    PoseidonLogManager.instance.err(url + '请求失败, 内容为:', xhr.responseText);
                    callback && callback('failed');
                }
            }
        };

        xhr.open('POST', url, true);
        xhr.send(data);
        setTimeout(() => {
            if (isTimeOut) {
                PoseidonLogManager.instance.err(url + '请求超时失败');
                xhr.abort();
            }
        }, xhr.timeout);
        return xhr;
    }
}
