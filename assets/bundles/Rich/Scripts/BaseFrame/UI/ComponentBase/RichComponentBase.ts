import RichSlotEventManager from "../../Manager/RichSlotEventManager";
import RichTimerManager from "../../Manager/RichTimerManager";


const { ccclass, property } = cc._decorator;
/**
 * 组件的基类
 */
@ccclass
export default class RichComponentBase extends cc.Component {
    private timerIdArr: Array<number> = [];
    private timerOutIdArr: Array<number> = [];

    onDestroy() {
        RichSlotEventManager.instance.off(this);
        this.clearAllEvent();
    }

    /**
     * 计时器
     * @param callback 回调函数
     * @param interval 间隔时间，单位 s
     * @param repeat 重复次数 repeat + 1，默认无限次
     * @param delay 延迟调用，单位 s
     * @returns 
     */
    public setInterval(callback: Function, interval: number = 0, repeat: number = null): number {
        let id = RichTimerManager.instance.setInterval(callback, interval, repeat);
        this.timerIdArr.push(id);
        return id;
    }

    /**
     * 取消计时器
     * @param id 设置计时器时传出的id
     */
    public clearInterval(id) {
        RichTimerManager.instance.clearInterval(id);
    }

    /**
     * 设置一个延时调用
     * @param callback  回调函数
     * @param delay 延迟调用，单位 s
     * @returns 
     */
    public setTimeOut(callback: Function, delay: number): number {
        let id = RichTimerManager.instance.setTimeOut(callback, delay);
        this.timerOutIdArr.push(id);
        return id;
    }

    /**
     * 注销一个延时调用
     * @param id 设置延时调用时传出的id
     */
    public clearTimeout(id: number) {
        RichTimerManager.instance.clearTimeout(id);
    }

    /**
     * 清理所有延时调用
     */
    public clearAllEvent() {
        this.timerIdArr.forEach(element => {
            this.clearInterval(element);
        });
        this.timerOutIdArr.forEach(element => {
            this.clearTimeout(element);
        });
    }
}
