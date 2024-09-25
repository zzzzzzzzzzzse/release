import RichDialogManager from "../../Manager/RichDialogManager";
import RichLogManager from "../../Manager/RichLogManager";
import RichComponentBase from "../ComponentBase/RichComponentBase";
/**
 * 弹框基类
 */
const { ccclass, property } = cc._decorator;
@ccclass
export default class RichDialogBase extends RichComponentBase {

    @property({ type: cc.Node, tooltip: "需要触发点击关闭弹框的节点" })
    maskNodeArr: Array<cc.Node> = [];
    @property(cc.Node)
    conNode: cc.Node = null;
    @property(cc.Node)
    maskNode: cc.Node = null;
    @property
    public openAnimTime: number = 0.3;//打开动画时间
    @property
    public closeAnimTime: number = 0.3;//关闭动画时间
    private data: any = null;
    private path: string = "";
    private abName: string = "";
    private isDestroy: boolean = true;//是否要销毁
    private closeAnimCompleteCb: Function;//关闭动画播完后执行的回调


    start() {
        // 方便widget对齐
        this.node.width = cc.view.getVisibleSize().width;
        this.node.height = cc.view.getVisibleSize().height;

    }

    public open() {
        RichLogManager.instance.log("打开弹框:", this.path);
        //初始化遮罩图片为true, mask监听触摸结束事件
        for (let index = 0; index < this.maskNodeArr.length; index++) {
            const element = this.maskNodeArr[index];
            element.active = true;
            element.off(cc.Node.EventType.TOUCH_END, this.onTouchEndMask, this);
            element.on(cc.Node.EventType.TOUCH_END, this.onTouchEndMask, this);
        }
        cc.Tween.stopAllByTarget(this.node);
        this.node.opacity = 255;
        this.openAnimation();
    }

    /**
    * 打开动画，如果子类要重写这个动画，则子类自己负责调用打开回调
    */
    public openAnimation() {
        if (this.openAnimTime <= 0) {
            this.onOpen();
        }
        else {
            if (null != this.conNode) {
                const height = this.node.height;
                const delta = (height - this.conNode.height) / 2;
                this.conNode.y = this.conNode.height + delta;
                cc.tween(this.conNode)
                    .to(this.openAnimTime, { y: 0 }, {
                        easing: 'backOut'
                    })
                    .start();
            }
            if (null != this.maskNode) {
                let opacity = this.maskNode.opacity;
                this.maskNode.opacity = 0;
                cc.tween(this.maskNode)
                    .to(this.openAnimTime, { opacity: opacity }, {
                        easing: 'backOut'
                    })
                    .start();
            }
            cc.tween(this.node)
                .delay(this.openAnimTime)
                .call(() => {
                    this.onOpen();
                })
                .start();
        }
    }

    /**
     * 打开回调，默认是播放了打开动画后执行
     */
    public onOpen() {
    }

    /**
     * 关闭弹框
     * @param isDestroy 
     */
    public close(isDestroy: boolean = true) {
        RichDialogManager.instance.closeDialog(this.getPath(), isDestroy);
    }

    /**
     * 触摸mask关闭弹框
     */
    private onTouchEndMask() {
        this.close();
    }

    /**
     * 关闭动画(如果重写了这个方法则需要手动调用关闭回调closeCallback)
     */
    public closeAnimation() {
        if (this.closeAnimTime <= 0) {
            this.node.opacity = 255;
            this.closeCallback();
            return;
        }
        if (this.maskNode) {
            cc.tween(this.maskNode).to(this.closeAnimTime, { opacity: 0 }, { easing: 'backOut' }).call(() => {
                this.closeCallback();
            }).start();
        }

        if (this.conNode) {
            const height = this.node.height;
            const delta = (height - this.conNode.height) / 2;
            cc.tween(this.conNode).to(this.closeAnimTime, { y: height + delta }, { easing: 'backIn' }).start();
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

    /**
   * 关闭回调(播放完关闭动画后调用)
   */
    public closeCallback() {
        if (this.isDestroy) {
            this.node.destroy();
        }
        else {
            this.node.removeFromParent();
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

    /**
     * 关闭之前做一些准备工作
     * @param isDestroy 
     * @param callback 
     */
    public setClose(isDestroy: boolean = true, callback?: Function) {
        this.isDestroy = isDestroy;
        this.closeAnimCompleteCb = callback;
        //遮罩图片为false
        for (let index = 0; index < this.maskNodeArr.length; index++) {
            const element = this.maskNodeArr[index];
            element.active = false;
        }
        this.closeAnimation();
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

    public getAbName() {
        return this.abName;
    }

    /**
     * 存ab
     * @param value 
     */
    public setAbName(value: string) {
        this.abName = value;
    }
}
