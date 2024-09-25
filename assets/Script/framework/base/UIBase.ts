import { UIManagernew } from "../../../UIManagernew";
import { EventMgr } from "../mgr/EventManager";
import { UIMgr } from "../mgr/UIManager";

/** @description UI基类 */
const { ccclass, property } = cc._decorator;
@ccclass
export default class UIBase extends cc.Component {


    /**@description 是否自动进行销毁 */
    public isDestroy: boolean = true;
    /**@description 唯一标识符 */
    public uid: string;
    /**@description 所在路径 */
    public url: string;
    /**@description 获取原型对象 */
    private _protoType: Object = Object.getPrototypeOf(this);

    /** @description 自动注册事件 */
    private _autoRegister(): void {
        try {
            if (!this._protoType) {
                throw (new Error("fail!"));
            }
            const buttons: Array<cc.Button> = this.node.getComponentsInChildren(cc.Button);
            for (const btn of buttons) {
                console.log("register Touch Event", btn.node.name);
                btn.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEvent, this);
            }
        } catch (e) {
            console.error(e);
        }
    }

    init(data?: any) {

    }

    /** 统一点击事件处理 */
    private _onTouchEvent(e: cc.Event.EventTouch): void {
        /** @description 缺少点击音效 */
        const node: cc.Node = e.target;
        const name: string = node.name;
        const functionName: string = `onTouch_${name}`;
        console.log(functionName);
        if (this._protoType[functionName]) {
            this._protoType[functionName].bind(this)(e);
        }
    }

    /** 定义自定义生命周期 preInit -> init -> preLoad -> onLoad -> onEnble -> start */

    /** @description 预初始化 */
    public async _preInit(): Promise<void> {
        this._autoRegister();
        this._register();
        await this._init();
        await this._preLoad();
        await this._onDisPlay();
    }
    /** @description 关闭 */
    protected async close(): Promise<void> {
        await this._onHide();
        UIMgr.close(this);
    }

    /** @description 注册事件 */
    protected _register(): void { }
    /**
     * 自定义消息
     * @param args 消息列表
     */
    public message(...args: any): void { }
    /**@description 初始化 */
    protected async _init(): Promise<void> { };
    /**@description 资源预加载 */
    protected async _preLoad(): Promise<void> { };
    /**@description 自定义展示逻辑 */
    protected async _onDisPlay(): Promise<void> { };
    /**@description 自定义隐藏逻辑 */
    protected async _onHide(): Promise<void> { };
    /**@description 销毁前释放注册事件和停止所有动画 */
    protected onDestroy(): void {
        cc.log("<<<<<<<<<< onDestroy  >>>>>>>>>", this.node.name)
        if (this.name && this.name != "") {
            UIManagernew.removeUIName(this.node.name)
        }
        this.unscheduleAllCallbacks();
        EventMgr.targetOff(this);
        if (this.node.isValid) {
            this.node.stopAllActions();
            cc.tween(this.node).stop();
        }
    }

}
