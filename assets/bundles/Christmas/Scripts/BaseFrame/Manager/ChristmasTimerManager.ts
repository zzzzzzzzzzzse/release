import ChristmasLogManager from "./ChristmasLogManager";

/**
 * 计时器
 */
export default class ChristmasTimerManager {
    private static _instance: ChristmasTimerManager
    public static get instance() {
        if (ChristmasTimerManager._instance == null) {
            ChristmasTimerManager._instance = new ChristmasTimerManager();
        }
        return ChristmasTimerManager._instance;
    }

    private constructor() {
    }

    /**
     * 设置一个计时器
     * @param callback 回调函数
     * @param interval 间隔时间，单位 s
     * @param repeat  重复次数 repeat + 1，默认无限次
     */
    public setInterval(callback: Function, interval: number = 0, repeat: number = null): number {
        let count = 0;
        if (repeat < 0) {
            ChristmasLogManager.instance.err("Repeat must be equal or greater than 0");
            return;
        }
        if (null == repeat) {
            repeat = -1;
        }
        let funcInterval = () => {
            if (null != callback) {
                callback();
            }
            count++;
            if (count == repeat + 1) {
                this.clearInterval(intervalId);
            }
        }
        let intervalId = setInterval(funcInterval, interval * 1000);
        return intervalId;
    }

    /**
     * 设置一个延时调用
     * @param callback  回调函数
     * @param delay 延迟调用，单位 s
     * @returns 
     */
    public setTimeOut(callback: Function, delay: number): number {
        let id = setTimeout(callback, delay * 1000);
        return id;
    }

    /**
     * 注销一个计时器
     * @param id 设置计时器时传出的id
     */
    public clearInterval(id: number) {
        clearInterval(id);
    }

    /**
     * 注销一个延时调用
     * @param id 设置延时调用时传出的id
     */
    public clearTimeout(id: number) {
        clearTimeout(id);
    }
}
