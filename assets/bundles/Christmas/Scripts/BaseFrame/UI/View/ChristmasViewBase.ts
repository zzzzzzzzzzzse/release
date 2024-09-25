import { ViewCloseAnimType, ViewLevel, ViewOpenAnimType } from "../../Const/ChristmasCommonDefine";
import ChristmasViewManager from "../../Manager/ChristmasViewManager";
import ChristmasComponentBase from "../ComponentBase/ChristmasComponentBase";
/**
 * 子游戏基类
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class ChristmasViewBase extends ChristmasComponentBase {
    @property
    public level: number = ViewLevel.LEVEL_TWO;//界面等级
    private data: any = null;
    private path: string = "";
    private isDestroy: boolean = true;//是否要销毁
    private closeAnimCompleteCb: Function;//关闭动画播完后执行的回调
    private openAnimCompleteCallback: Function;//打开动画播放完毕后的回调
    public openAnimTime: number = 0.2;//打开动画时间
    public closeAnimTime: number = 0.2;//关闭动画时间
    public openAnimTimeTwo: number = 1;//打开动画时间2
    public closeAnimTimeTwo: number = 1;//关闭动画时间2
    start() {
        // 方便widget对齐
        this.node.width = cc.view.getVisibleSize().width;
        this.node.height = cc.view.getVisibleSize().height;
    }

    /**
     * 打开弹框
     */
    public open(openAnimType: ViewOpenAnimType) {
        this.preOpen();
        switch (openAnimType) {
            case ViewOpenAnimType.ONE:
                this.openAnimation();
                break;
            case ViewOpenAnimType.TWO:
                this.openAnimationTwo();
                break;
        }
    }

    /**
    * 打开动画，如果子类要重写这个动画，则子类自己负责调用打开回调
    */
    public openAnimation() {
        if (this.openAnimTime <= 0) {
            this.animCompleteCallback();
        }
        else {
            this.node.opacity = 0;
            cc.tween(this.node)
                .to(this.openAnimTime, { opacity: 255 }, {
                    easing: 'backIn'
                }).call(() => {
                    this.animCompleteCallback();
                })
                .start();
        }
    }

    /**
   * 打开动画，如果子类要重写这个动画，则子类自己负责调用打开回调
   */
    public openAnimationTwo() {
        this.node.opacity = 0;
        this.node.y = this.node.height;
        cc.tween(this.node)
            .to(this.openAnimTimeTwo, { y: 0, opacity: 255 }, {
                easing: 'circOut'
            }).call(() => {
                this.animCompleteCallback();
            })
            .start();
    }

    /**
     * 打开动画播完后必须执行
     */
    protected animCompleteCallback() {
        if (this.openAnimCompleteCallback) {
            this.openAnimCompleteCallback();
            this.openAnimCompleteCallback = null;
        }
        this.onOpen();
    }

    /**
     * 打开动画之前的回调（用于子类重写）
     */
    public preOpen() {

    }

    /**
     *   打开回调，播放了打开动画后执行(用于子类重写)
     */
    public onOpen() { }

    /**
     * 设置打开动画播放完毕后要做的一些事情
     * @param callback 
     */
    public setOpenAnimCompleteCallback(callback) {
        this.openAnimCompleteCallback = callback;
    }

    public getAnimTime() {
        return this.openAnimTime;
    }

    public getAnimTimeTwo() {
        return this.openAnimTimeTwo;
    }

    public preClose(): void {

    }

    /**
     * 返回上一个View
     */
    public close(closeAnimType: ViewCloseAnimType = ViewCloseAnimType.ONE,
        openAnimType: ViewOpenAnimType = ViewOpenAnimType.ONE,
        isOpenLast: boolean = true) {
        ChristmasViewManager.instance.back(closeAnimType, openAnimType, isOpenLast);
    }

    /**
     * 关闭动画(如果重写了这个方法则需要手动调用关闭回调onClose)
     */
    public closeAnimation() {
        if (this.closeAnimTime <= 0) {
            this.node.opacity = 255;
            this.closeCallback();
        }
        else {
            cc.tween(this.node)
                .to(this.closeAnimTime, { opacity: 0 }, {
                    easing: 'fade'
                }).call(() => {
                    this.node.opacity = 255;
                    this.closeCallback();
                })
                .start();
        }
    }

    public closeAnimationTwo() {
        this.node.opacity = 255;
        cc.tween(this.node)
            .to(this.closeAnimTimeTwo, { y: -this.node.height, opacity: 0 }, {
                easing: 'circOut'
            }).call(() => {
                this.closeCallback();
                this.node.y = 0;
            })
            .start();
    }

    /**
     * 关闭回调(播放完关闭动画后必须调用)
     */
    public closeCallback() {
        if (this.isDestroy) {
            this.node.destroy();
        }
        else {
            // this.node.removeFromParent();
            this.node.active = false;
        }
        if (this.closeAnimCompleteCb) {
            this.closeAnimCompleteCb();
        }
        this.onClose();
    }

    /**
     * 供子类重写的关闭回调
     */
    public onClose() { }

    public setClose(isDestroy: boolean = true, callback: Function, closeAnimType: ViewCloseAnimType) {
        this.isDestroy = isDestroy;
        this.closeAnimCompleteCb = callback;
        this.preClose();
        switch (closeAnimType) {
            case ViewCloseAnimType.ONE:
                this.closeAnimation();
                break;
            case ViewCloseAnimType.TWO:
                this.closeAnimationTwo();
                break;
        }

    }

    /**
     * 获取传入的子游戏数据
     * @returns 
     */
    public getData() {
        return this.data;
    }

    /**
     * 设置子游戏数据
     * @param value 
     */
    public setData(value) {
        this.data = value;
    }

    public getPath() {
        return this.path;
    }

    /**
     * 存资源路径
     * @param value 
     */
    public setPath(value) {
        this.path = value;
    }

    /**
     * 获得界面等级
     * @returns 
     */
    public getLevel(): ViewLevel {
        return this.level;
    }
}
