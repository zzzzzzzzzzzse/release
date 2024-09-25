import PoseidonLogManager from "./PoseidonLogManager";

/**
 * 事件管理
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class PoseidonSlotEventManager {
    private static _instance: PoseidonSlotEventManager
    public static get instance() {
        if (PoseidonSlotEventManager._instance == null) {
            PoseidonSlotEventManager._instance = new PoseidonSlotEventManager();
        }
        return PoseidonSlotEventManager._instance;
    }

    private constructor() {
    }

    /**
     * key表示事件类型 value存了所有监听该事件的目标
     */
    private eventMap: { [key: string]: Array<{ type: string, callback: Function, target: any }> } = {};


    /**
     * 监听事件
     * @param type 事件类型
     * @param callback 回调
     * @param target 调用回调的目标
     */
    public on(type: string, callback: Function, target: any) {
        if (null == this.eventMap[type]) {
            this.eventMap[type] = [];
        }
        //有相同的就替换
        for (let index = 0; index < this.eventMap[type].length; index++) {
            const element = this.eventMap[type][index];
            if (element.target == target) {
                this.eventMap[type][index].callback = callback;
                return;
            }
        }
        //没有相同的就增加
        this.eventMap[type].push({
            type: type,
            callback: callback,
            target: target
        })
    }

    /**
     * 取消监听
     * @param target 调用回调的目标
     * @param type 事件类型 如果为空，则干掉target所有事件
     */
    public off(target: any, type?: string) {
        if (null == type) {
            for (const key in this.eventMap) {
                const eventDataArr = this.eventMap[key];
                for (let index = 0; index < eventDataArr.length; index++) {
                    const element = eventDataArr[index];
                    if (element.target == target) {
                        eventDataArr.splice(index, 1);
                        index--;
                        break;
                    }
                }

            }
        }
        else {
            let eventArr = this.eventMap[type];
            for (let index = 0; index < eventArr.length; index++) {
                const eventData = eventArr[index];
                if (target == eventData.target) {
                    eventArr.splice(index, 1);
                    index--;
                    break;
                }
            }
        }
    }

    /**
     * 发送事件
     * @param type 事件类型
     * @param data 传递的数据
     */
    public emit(type: string, data?: any) {
        let eventArr = this.eventMap[type];
        if (null == eventArr) {
            PoseidonLogManager.instance.err(type, "event is null");
            return;
        }
        for (let index = 0; index < eventArr.length; index++) {
            const element = eventArr[index];
            element.callback.apply(element.target, data == 0 || data ? [data] : [null]);
        }
    }
}
