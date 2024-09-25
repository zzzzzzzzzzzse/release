import { BtnExStatus, ButtonMoveStatus } from "../../Const/ChristmasCommonDefine";
import ChristmasLogManager from "../../Manager/ChristmasLogManager";
import { ChristmasSlotAudioManager } from "../../Manager/ChristmasSlotAudioManager";
import ChristmasTimerManager from "../../Manager/ChristmasTimerManager";
import ChristmasUtil from "../../Util/ChristmasUtil";
import ChristmasComponentBase from "../ComponentBase/ChristmasComponentBase";

const { ccclass, property, menu } = cc._decorator;
/**
 * 按钮
 */
var LongPressMode = cc.Enum({
    NOT_CONTINUE: 1,
    CONTINUE: 2
});

@ccclass
@menu('自定义组件/ChristmasButtonEx')
export default class ChristmasButtonEx extends ChristmasComponentBase {
    @property({ tooltip: "连续点击响应延迟" })
    private delay: number = 0.1;
    @property({ tooltip: "长按时间线，用以判断是否触发长按（单位：s）" })
    private longTimeLine: number = 0.5;
    @property({ tooltip: "音频文件名" })
    protected soundName: string = "click";
    @property({ tooltip: "音频文件包名" })
    private aBName: string = "resources";
    @property({
        type: cc.Enum(LongPressMode),
        tooltip: "CONTINUE:长按连续触发\n NOT_CONTINUE:只触发一次",
    })
    private longPressMode = LongPressMode.NOT_CONTINUE;
    @property({
        tooltip: "连续触发的间隔",
        visible() {
            return this.longPressMode == LongPressMode.CONTINUE;
        }
    })

    private continueInterval: number = 0.2;//连续触发的间隔（单位：s）
    @property({ tooltip: "点击缩放" })
    scale: boolean = false;
    @property({
        tooltip: "按钮缩放变化的过渡时间",
        visible() {
            return this.scale;
        }
    })
    private duration: number = 0.1;
    @property({
        tooltip: "当用户点击按钮后，按钮会缩放到一个值，这个值等于按钮原始scale * zoomScale",
        visible() {
            return this.scale;
        }
    })
    private zoomScale: number = 1.2;
    @property({
        tooltip: "按钮缩放过程中的曲线",
        visible() {
            return this.scale;
        }
    })
    private easingScale: string = "smooth";
    @property({ tooltip: "是否为多边形按钮\n注意：勾选了这个选项，需要手动添加 cc.PolygonCollider组件并手动点击一次RegeneratePoints按钮获取顶点" })
    private isPolygon: boolean = false;
    @property({ tooltip: "是否有需要置灰的内容" })
    gray: boolean = false;
    @property({
        type: cc.Node, tooltip: "按钮禁用的时候需要置灰的图片节点",
        visible() {
            return this.gray;
        }
    })
    private graySpriteArr: cc.Node[] = [];
    @property({
        type: cc.Node, tooltip: "按钮禁用的时候需要置灰的文字节点\n需要与颜色数组一一对应",
        visible() {
            return this.gray;
        }
    })
    private grayLabelArr: cc.Node[] = [];
    @property({
        type: cc.String, tooltip: "按钮禁用的时候需要置灰的文字节点的颜色\n需要与文字数组一一对应",
        visible() {
            return this.gray;
        }
    })
    private grayLabelColorArr: Array<string> = [];

    @property({ tooltip: "是否有需要偏移的节点" })
    offset: boolean = false;
    @property({
        type: cc.Node, tooltip: "按钮处于按下状态时候需要偏移的节点\n需要与坐标数组一一对应",
        visible() {
            return this.offset;
        }
    })
    private offsetNodeArr: cc.Node[] = [];
    @property({
        type: cc.Integer, tooltip: "按钮处于按下状态时候需要偏移的节点的横向偏移量\n需要与偏移节点数组一一对应",
        visible() {
            return this.offset;
        }
    })
    private offsetXArr: number[] = [];
    @property({
        type: cc.Integer, tooltip: "按钮处于按下状态时候需要偏移的节点的纵向偏移量\n需要与偏移节点数组一一对应",
        visible() {
            return this.offset;
        }
    })
    private offsetYArr: number[] = [];

    @property({ tooltip: "是否有需要在抬起和按下之间切换图片的节点" })
    changeSprite: boolean = false;
    @property({
        type: cc.Node, tooltip: "按钮处于按下状态时候需要换图的节点\n需要与图片数组一一对应",
        visible() {
            return this.changeSprite;
        }
    })
    private changeSpriteNodeArr: Array<cc.Node> = [];
    @property({
        type: cc.SpriteFrame, tooltip: "按钮处于按下状态时候需要换的图\n需要与节点数组一一对应",
        visible() {
            return this.changeSprite;
        }
    })
    private changeSpriteFrameArr: Array<cc.SpriteFrame> = [];

    @property({ type: cc.Component.EventHandler, tooltip: "某个节点在按钮抬起和按下时需要更改的属性：\n组件,属性,抬起的值,按下的值" })
    normalOrDownPropertyChange: Array<cc.Component.EventHandler> = [];

    private continueTimerId: number = -1;//长按连续触发事件计时器id
    private longPressTimerId: number = -1;//长按连续触发事件计时器id
    protected _clickCallback: Function = null;//短点击回调
    private _longPressCallback: Function = null;//长按回调
    private _longPressEndCallback: Function = null;//长按结束回调
    private _outerCallback: Function = null;//手指移出约束框回调
    private _insideCallback: Function = null;//手指移入约束框回调
    private cd: boolean = true;

    private startTime: number;//开始按下的时间
    private isLongPressRun: boolean = false;//本次点击周期内是否触发过长按事件
    private leftTop: cc.Vec2;//矩形左上角的世界坐标
    private leftBottom: cc.Vec2;//矩形左下角的世界坐标
    private rightTop: cc.Vec2;//矩形右上角的世界坐标
    private rightBottom: cc.Vec2;//矩形右下角的世界坐标
    private _moveStatus: ButtonMoveStatus;//按钮触摸时的移动状态
    private isGray: boolean = false;//按钮是否置灰
    private offsetNodeNormalPosArr: cc.Vec2[] = [];//偏移节点的原始位置
    private normalLabelColorArr: Array<string> = [];//正常状态下字体颜色数组
    private normalChangeSpriteFrameArr: Array<cc.SpriteFrame> = [];//换图节点正常状态下的图片
    private _status: BtnExStatus = BtnExStatus.NORMAL;//按钮状态
    private _initScale: number;//原始缩放值

    private set status(state: BtnExStatus) {
        this._status = state;
        this.playScale();
        this.updateBtn();
    }

    private get status() {
        return this._status;
    }

    private set initScale(scale: number) {
        this._initScale = scale;
    }

    private get initScale() {
        return this._initScale;
    }

    /**
     * 设置手指移动状态，约束框内还是外
     */
    private set moveStatus(status: ButtonMoveStatus) {
        this._moveStatus = status;
        switch (this._moveStatus) {
            case ButtonMoveStatus.INSIDE:
                this.status = BtnExStatus.PRESSED;
                this.startTime = new Date().getTime();
                this.setLongPressTimer();
                this.checkInsideCallback();
                break;
            case ButtonMoveStatus.OUTER:
                this.status = BtnExStatus.NORMAL;
                this.cleanTimer();
                this.checkOuterCallback();
                break;
        }
    }

    private get moveStatus() {
        return this._moveStatus;
    }

    /**
     * 设置短按点击回调
     */
    public set clickCallback(vaule: Function) {
        this._clickCallback = vaule;
    }

    /**
     * 设置长按回调
     */
    public set longPressCallback(vaule: Function) {
        this._longPressCallback = vaule;
    }

    /**
     * 设置长按结束回调
     */
    public set longPressEndCallback(vaule: Function) {
        this._longPressEndCallback = vaule;
    }

    /**
     * 设置手指移出约束框回调
     */
    public set outerCallback(vaule: Function) {
        this._outerCallback = vaule;
    }

    /**
     * 设置手指移入约束框回调
     */
    public set insideCallback(vaule: Function) {
        this._insideCallback = vaule;
    }

    onLoad() {
        for (let index = 0; index < this.offsetNodeArr.length; index++) {
            const node = this.offsetNodeArr[index];
            this.offsetNodeNormalPosArr.push(new cc.Vec2(node.x, node.y));
        }
        for (let index = 0; index < this.grayLabelArr.length; index++) {
            const node = this.grayLabelArr[index];
            this.normalLabelColorArr.push("0x" + node.color.toHEX());
        }
        for (let index = 0; index < this.changeSpriteNodeArr.length; index++) {
            const node = this.changeSpriteNodeArr[index];
            this.normalChangeSpriteFrameArr.push(node.getComponent(cc.Sprite).spriteFrame);
        }
        this.initScale = this.node.scale;
        if (this.isPolygon) {
            //@ts-ignore 重写触摸检测函数为多边形检测
            this.node._hitTest = this.polygonHitTest.bind(this);
        }
    }

    start() {
        this.addEvent();
    }

    onEnable() {
        this.status = BtnExStatus.NORMAL;
    }

    onDisable() {
        this.moveStatus = ButtonMoveStatus.OUTER;
        this.onTouchCancel();
    }


    private addEvent() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }

    private onTouchStart(touch: cc.Event.EventTouch) {
        if (this.isGray) {
            return;
        }
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.isLongPressRun = false;
        this.computePoint();
        this.startTime = new Date().getTime();
        this.moveStatus = ButtonMoveStatus.INSIDE;
    }

    private onTouchMove(touch: cc.Event.EventTouch) {
        if (this.isGray) {
            return;
        }
        //判断手指是否在约束框内
        if (this.isPointInMatrix(touch.getLocation())) {
            if (this.moveStatus == ButtonMoveStatus.INSIDE) {
                return;
            }
            this.moveStatus = ButtonMoveStatus.INSIDE;
        }
        else {
            if (this.moveStatus == ButtonMoveStatus.OUTER) {
                return;
            }
            this.moveStatus = ButtonMoveStatus.OUTER;
        }
    }

    private onTouchEnd() {
        this.cleanTimer();
        if (this.isGray) {
            return;
        }
        //如果没有执行过长按事件，则执行点击事件
        if (!this.isLongPressRun) {
            this.onClick();
        }

        this.checkLongPressEndCallback();
        this.moveStatus = ButtonMoveStatus.OUTER;
        this.isLongPressRun = false;
    }

    private onTouchCancel() {
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.setTimeOut(() => {
            //移除的原因是隐藏后会调用一次cancle，手指移开后依然会调用end，导致end和cancle同时调用
            //延迟执行的原因是新手引导继承了这个脚本，导致移除后，函数没执行
            this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        }, 0)
        this.cleanTimer();
        if (this.isGray) {
            return;
        }
        this.checkLongPressEndCallback();
        this.moveStatus = ButtonMoveStatus.OUTER;
        this.isLongPressRun = false;
    }

    /**
    * 设置长按和连续长按
    */
    private setLongPressTimer() {
        if (null != this._longPressCallback && !this.isLongPressRun) {
            this.longPressTimerId = ChristmasTimerManager.instance.setInterval(() => {
                if (null == this._longPressCallback) {
                    return;
                }

                if (this.longPressMode == LongPressMode.CONTINUE) {
                    this.continueTimerId = ChristmasTimerManager.instance.setInterval(() => {
                        this._longPressCallback();
                        this.isLongPressRun = true;
                    }, this.continueInterval);
                }
                else {
                    this._longPressCallback();
                    this.isLongPressRun = true;
                }
            }, this.longTimeLine, 0)
        }
        else if (this.longPressMode == LongPressMode.CONTINUE) {
            this.continueTimerId = ChristmasTimerManager.instance.setInterval(this._longPressCallback, this.continueInterval);
        }
    }

    /**
     * 点击事件
     */
    protected onClick() {
        if (this.cd) {
            this.cd = false;
            ChristmasTimerManager.instance.setTimeOut(() => { this.cd = true; }, this.delay);
            if ("" != this.soundName) {
                ChristmasSlotAudioManager.instance.playSound(this.aBName, this.soundName);
            }
            if (this._clickCallback) {
                this._clickCallback();
            }
        }
    }

    /**
     * 启用
     */
    public setEnable() {
        this.isGray = false;
        let buttonComponent = this.node.getComponent(cc.Button);
        buttonComponent.interactable = true;
        this.graySpriteArr.forEach(node => {
            if (null != node) {
                node.getComponent(cc.Sprite).setMaterial(0, buttonComponent.normalMaterial);
            }
        });
        for (let index = 0; index < this.grayLabelArr.length; index++) {
            const node = this.grayLabelArr[index];
            if (null != node) {
                let color = ChristmasUtil.hexToRGB(parseInt(this.normalLabelColorArr[index]));
                node.color = new cc.Color(color.r, color.g, color.b)
            }
        }
    }

    /**
     * 禁用
     */
    public setDisable() {
        this.cleanTimer();
        this.isGray = true;
        let buttonComponent = this.node.getComponent(cc.Button);
        buttonComponent.interactable = false;
        this.graySpriteArr.forEach(node => {
            if (null != node) {
                node.getComponent(cc.Sprite).setMaterial(0, buttonComponent.grayMaterial);
            }
        });
        for (let index = 0; index < this.grayLabelArr.length; index++) {
            const node = this.grayLabelArr[index];
            if (null != node) {
                let color = ChristmasUtil.hexToRGB(parseInt(this.grayLabelColorArr[index]));
                node.color = new cc.Color(color.r, color.g, color.b)
            }
        }
    }

    /**
     * 计算按钮约束框的4个点
     */
    private computePoint() {
        let centerWorldPos = this.node.parent.convertToWorldSpaceAR(this.node.getPosition());
        let anchor = this.node.getAnchorPoint();
        let size = this.node.getContentSize();
        this.leftTop = new cc.Vec2(centerWorldPos.x - size.width * anchor.x, centerWorldPos.y + size.height * (1 - anchor.y));
        this.leftBottom = new cc.Vec2(centerWorldPos.x - size.width * anchor.x, centerWorldPos.y - size.height * anchor.y);
        this.rightTop = new cc.Vec2(centerWorldPos.x + size.width * (1 - anchor.x), centerWorldPos.y + size.height * (1 - anchor.y));
        this.rightBottom = new cc.Vec2(centerWorldPos.x + size.width * (1 - anchor.x), centerWorldPos.y - size.height * anchor.y);
    }

    /**
     * 判断手指触点p是否在按钮矩形约束框内
     */
    private isPointInMatrix(p: cc.Vec2) {
        if (this.isPolygon) {
            let polygonCollider = this.getComponent(cc.PolygonCollider);
            return cc.Intersection.pointInPolygon(p, polygonCollider.points);
        }
        else {
            this.computePoint();
            return cc.Intersection.pointInPolygon(p, [this.leftTop, this.leftBottom, this.rightBottom, this.rightTop]);
        }
    }

    /**
     * 更新按钮————节点偏移、图片变换
     */
    private updateBtn() {
        switch (this.moveStatus) {
            case ButtonMoveStatus.INSIDE:
                for (let index = 0; index < this.offsetNodeArr.length; index++) {
                    const node = this.offsetNodeArr[index];
                    node.setPosition(this.offsetXArr[index], this.offsetYArr[index]);
                }
                for (let index = 0; index < this.changeSpriteNodeArr.length; index++) {
                    const node = this.changeSpriteNodeArr[index];
                    node.getComponent(cc.Sprite).spriteFrame = this.changeSpriteFrameArr[index];
                }
                this.pressedExtend();
                this.downPropertyChange();
                break;
            case ButtonMoveStatus.OUTER:
                for (let index = 0; index < this.offsetNodeArr.length; index++) {
                    const node = this.offsetNodeArr[index];
                    node.setPosition(this.offsetNodeNormalPosArr[index]);
                }
                for (let index = 0; index < this.changeSpriteNodeArr.length; index++) {
                    const node = this.changeSpriteNodeArr[index];
                    node.getComponent(cc.Sprite).spriteFrame = this.normalChangeSpriteFrameArr[index];
                }
                this.normalExtend();
                this.normalPropertyChange();
                break;
        }
    }

    /**
     * 清理计时器
     */
    private cleanTimer() {
        ChristmasTimerManager.instance.clearInterval(this.continueTimerId);
        ChristmasTimerManager.instance.clearInterval(this.longPressTimerId);
    }

    /**
     * 检查是否触发长按结束回调
     */
    private checkLongPressEndCallback() {
        let currTime = new Date().getTime();
        if ((currTime - this.startTime) / 1000 >= this.longTimeLine && null != this._longPressCallback && null != this._longPressEndCallback) {
            this._longPressEndCallback();
        }
    }

    /**
     * 检查是否触发手指移出回调
     */
    private checkOuterCallback() {
        if (null != this._longPressCallback && this.isLongPressRun && null != this._outerCallback) {
            this._outerCallback();
        }
    }

    /**
     * 检查是否触发手指移入回调
     */
    private checkInsideCallback() {
        if (null != this._longPressCallback && this.isLongPressRun && null != this._insideCallback) {
            this._insideCallback();
        }
    }

    /**
     * 缩放效果
     */
    private playScale() {
        if (!this.scale) {
            return;
        }
        switch (this._status) {
            case BtnExStatus.NORMAL:
                this.scaleLeave();
                break;
            case BtnExStatus.PRESSED:
                this.scaleTouch();
                break;
        }
    }

    /**
     * 触摸缩放
     */
    private scaleTouch() {
        cc.Tween.stopAllByTarget(this.node);
        let targetScale = this.zoomScale * this.initScale;
        if (1 == this.zoomScale) {
            ChristmasLogManager.instance.err("[ButtonEx] 除数不能为0，无法缩放");
            return;
        }
        let currScale = this.node.scale;
        let remainPercent = 1 - (currScale - this.initScale) / (targetScale - this.initScale);
        let time = this.duration * remainPercent;
        cc.tween(this.node)
            .to(time, { scale: targetScale })
            .start();
    }

    /**
     * 未触摸缩放
     */
    private scaleLeave() {
        cc.Tween.stopAllByTarget(this.node);
        let targetScale = this.zoomScale * this.initScale;
        let currScale = this.node.scale;
        let remainPercent = (currScale - this.initScale) / (targetScale - this.initScale);
        let time = this.duration * remainPercent;
        cc.tween(this.node)
            .to(time, { scale: this.initScale })
            .start();
    }

    /**
     * 供外部重写的正常状态下的表现扩展
     */
    public normalExtend() {

    }

    /**
     * 供外部重写的按下状态的表现扩展
     */
    public pressedExtend() {

    }

    /**
     * 不规则多边形触摸测试
     * @param {触摸点} point 
     * @param {监听} listener 
     */
    polygonHitTest(point, listener) {
        var polygonCollider = this.node.getComponent(cc.PolygonCollider);
        if (polygonCollider) {
            //@ts-ignore
            point = this.node.convertToNodeSpaceAR(point);
            return cc.Intersection.pointInPolygon(point, polygonCollider.points);
        }
    }

    /**
     * 抬起状态时属性的改变
     */
    private normalPropertyChange() {
        for (let index = 0; index < this.normalOrDownPropertyChange.length; index++) {
            const element = this.normalOrDownPropertyChange[index];
            let arr = element.customEventData.split(",")
            let comp = null;
            if (arr[0] == "cc.Node") {
                comp = element.target;
            }
            else {
                comp = element.target.getComponent(arr[0]);
            }
            if (null == comp) {
                ChristmasLogManager.instance.warn("[ButtonEx] normalPropertyChange ", arr[0], " is null");
                continue;
            }
            switch (arr[1]) {
                case "color":
                    let rgb = ChristmasUtil.hexToRGB(parseInt(arr[2]));
                    comp[arr[1]] = new cc.Color(rgb.r, rgb.g, rgb.b);
                    break;
                default:
                    comp[arr[1]] = arr[2];
                    break;
            }
        }
    }

    /**
     * 按下状态时属性的改变
     */
    private downPropertyChange() {
        for (let index = 0; index < this.normalOrDownPropertyChange.length; index++) {
            const element = this.normalOrDownPropertyChange[index];
            let arr = element.customEventData.split(",")
            let comp = null;
            if (arr[0] == "cc.Node") {
                comp = element.target;
            }
            else {
                comp = element.target.getComponent(arr[0]);
            }
            if (null == comp) {
                ChristmasLogManager.instance.warn("[ButtonEx] downPropertyChange ", arr[0], " is null");
                continue;
            }
            switch (arr[1]) {
                case "color":
                    let rgb = ChristmasUtil.hexToRGB(parseInt(arr[3]));
                    comp[arr[1]] = new cc.Color(rgb.r, rgb.g, rgb.b);
                    break;
                default:
                    comp[arr[1]] = arr[3];
                    break;
            }
        }
    }
}


