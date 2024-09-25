/**@description 事件注册参数列表接口 */
interface IEventRegsiterArgs {
    eventName: string | number;
    cb: Function;
    target: any;
}
/**@description 事件派发参数列表接口 */
interface IEventDispatchArgs {
    eventName: string;
    data: any;
}
/**@description 观察者 */
class ObServer {
    /**@description 回调函数 */
    private _cb: Function;
    /**@description 目标对象 */
    private _target: any;
    /**@description 构造方法 */
    public constructor(cb: Function, target: any) {
        this._cb = cb;
        this._target = target;
    }
    /**@description 目标比较 */
    compare(target: any): boolean {
        return this._target === target;
    }
    /**@description 事件通知 */
    notify(data: any): void {
        this._cb.call(this._target, data);
    }
}
/**@description 全局通用事件管理类 */
class EventManager {
    /**@description 单列对象 */
    private static _instance: EventManager;
    /**@description 全局唯一,私有构造函数,防止外部new操作 */
    private constructor() { };
    /**@description 公开调用接口 */
    public static get instance() {
        if (!this._instance) {
            this._instance = new EventManager();
        }
        return this._instance;
    }
    /**@description 事件监听列表 */
    private _eventListener: { [key: string]: Array<ObServer> } = cc.js.createMap();
    /**@description 事件缓存列表 */
    private _eventCache: { [key: string]: any } = cc.js.createMap();
    /**
     * @description 注册事件
     * @param eventName 事件名字   
     * @param cb 回调函数
     * @param target 目标
     */
    public register(eventName: number, cb: Function, target: any): void;
    /**
     * @description 注册事件
     * @param eventName 事件名字   
     * @param cb 回调函数
     * @param target 目标
    */
    public register(eventName: string, cb: Function, target: any): void;
    public register(): void {
        const args: IEventRegsiterArgs = this._createRegisterArgs.apply(this, arguments);
        // console.error(arguments[0], arguments[1]);
        if (!args.eventName) {
            console.error(args.eventName);
        }
        let observers: Array<ObServer> = this._eventListener[args.eventName];
        if (!observers) {
            observers = new Array<ObServer>();
            this._eventListener[args.eventName] = observers;
        } else {
            observers.forEach((v, k) => {
                if (v.compare(args.target)) {
                    console.error("repeat", args.target, args.eventName, args.cb)
                    return;
                }
            })
        }
        observers.push(new ObServer(args.cb, args.target));
        const data: any = this._eventCache[args.eventName];
        if (data) {
            for (const observer of observers) {
                observer.notify(data);
            }
            this._eventCache[args.eventName] = null;
            delete this._eventCache[args.eventName];
        }
    }
    /**
     * @description 派发事件
     * @param eventName 事件名字 
     * @param data 发送的参数
     */
    public dispatch(eventName: number, data?: any): void;
    /**
     * @description 派发事件
     * @param eventName 事件名字 
     * @param data 发送的参数
     */
    public dispatch(eventName: string, data?: any): void;
    public dispatch(): void {
        const args: IEventDispatchArgs = this._createDispatchArgs.apply(this, arguments);

        if (!args.eventName) {
            throw new Error(args.eventName.toString());
        }
        const observers: Array<ObServer> = this._eventListener[args.eventName];
        if (observers) {
            for (const observer of observers) {
                observer.notify(args.data);
            }
        } else {
            this._eventCache[args.eventName, args.data];
        }
    }
    /** 
     * @description 移除目标上所有注册事件
     * @param target 需要移除注册事件的目标
     */
    public targetOff(target: any): void {
        Object.keys(this._eventListener).map(key => {
            let observers: Array<ObServer> = this._eventListener[key];
            for (let index: number = 0; index < observers.length; index++) {
                if (observers && observers[index] && observers[index].compare(target)) {
                    this._eventListener[key].splice(index, 1);

                }
            }
            if (this._eventListener[key].length == 0) {
                this._eventListener[key] = null;
                delete this._eventListener[key];
            }
        })
    }

    /**
     * @description 移除已注册事件
     * @param eventName 事件名
     */
    public unRegister(eventName: number): void;
    /**
     * @description 移除已注册事件
     * @param eventName 事件名
     */
    public unRegister(eventName: string): void;
    public unRegister(): void {
        if (arguments.length > 1) return;
        const eventName: number | string = arguments[0];
        const observers: Array<ObServer> = this._eventListener[eventName];
        if (observers) {
            delete this._eventListener[eventName];
        }
    }


    /**@description 构建派发事件参数 */
    private _createDispatchArgs(): IEventDispatchArgs {
        const args: IArguments = arguments;
        if ((typeof args[0] === "string" || typeof args[0] === "number")) {
            return <IEventDispatchArgs>{
                eventName: args[0],
                data: args[1]
            }
        }
    }
    /**@description 构建注册事件参数  */
    private _createRegisterArgs(): IEventRegsiterArgs {
        const args: IArguments = arguments;
        if (args.length == 3 && (typeof args[0] === "string" || typeof args[0] === "number") && typeof args[1] === "function" && args[2]) {
            return <IEventRegsiterArgs>{
                eventName: args[0],
                cb: args[1],
                target: args[2]
            }
        }
    }

    /** @description 销毁该单例模式 */
    public destroy(): void {
        Object.keys(this._eventListener).map(key => {
            delete this._eventListener[key];
        })
        Object.keys(this._eventCache).map(key => {
            delete this._eventCache[key];
        })
        this._eventCache = null;
        this._eventListener = null;
        if (EventManager._instance) {
            EventManager._instance = null;
        }
    }
}
export const EventMgr: EventManager = EventManager.instance;