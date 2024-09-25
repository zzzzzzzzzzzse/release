import ChristmasUtil from "../../Util/ChristmasUtil";
import ChristmasComponentBase from "../ComponentBase/ChristmasComponentBase";
const { ccclass, property, menu } = cc._decorator;
var ProgressMode = cc.Enum({
    MOVE: 1,
    SLICED: 2,
    TILED: 3,
    RADIAL: 4
});
var LabelMode = cc.Enum({
    NONE: 1,
    PERCENT: 2,
    CURRENT_OR_TOTAL: 3
});

export var ProgressBarEvent = cc.Enum({
    PROGRESS_TWEEN_UPDATE: "PROGRESS_TWEEN_UPDATE",
    PROGRESS_TWEEN_END: "PROGRESS_TWEEN_END"
});


@ccclass
@menu('自定义组件/ChristmasProgressBarEx')
export default class ChristmasProgressBarEx extends ChristmasComponentBase {
    @property({
        type: cc.Enum(ProgressMode),
        tooltip: "进度条增长模式:\n MOVE:平移进入\n SLICED:九宫格拉伸\n TILED:平铺",
    })
    public progressMode = ProgressMode.TILED;
    @property({
        type: cc.Enum(LabelMode),
        tooltip: "NONE:无文字\n PERCENT:百分比\n CURRENT_OR_TOTAL:当前值/总值",
    })
    public labelMode = LabelMode.NONE;
    @property({
        type: cc.Label,
        visible() {
            return this.labelMode != LabelMode.NONE;
        }
    })
    public txtLabel: cc.Label = null;
    @property(cc.Node)
    public barSpriteNode: cc.Node = null;
    @property(cc.Node)
    public maskNode: cc.Node = null;
    @property({ tooltip: "bar总长度" })
    totalLength: number = 142;


    private lastCurrent: number;//上一次的进度
    private obj: { curr: number } = { curr: 0 };//用来做缓动
    private barSprite: cc.Sprite = null;

    onLoad() {
        this.barSprite = this.barSpriteNode.getComponent(cc.Sprite);
        switch (this.progressMode) {
            case ProgressMode.MOVE:
                this.barSprite.sizeMode = cc.Sprite.SizeMode.RAW;
                this.maskNode.getComponent(cc.Mask).enabled = true;
                this.maskNode.getComponent(cc.Mask).spriteFrame = this.barSprite.spriteFrame;
                break;
            case ProgressMode.SLICED:
                this.barSprite.type = cc.Sprite.Type.SLICED;
                this.barSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                this.maskNode.getComponent(cc.Mask).enabled = false;
                break;
            case ProgressMode.TILED:
                this.barSprite.type = cc.Sprite.Type.TILED;
                this.barSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                this.maskNode.getComponent(cc.Mask).enabled = false;
                break;
            case ProgressMode.RADIAL:
                this.barSprite.type = cc.Sprite.Type.FILLED;
                this.barSprite.fillType = cc.Sprite.FillType.RADIAL;
                this.barSprite.sizeMode = cc.Sprite.SizeMode.RAW;
                this.maskNode.getComponent(cc.Mask).enabled = false;
                break;
        }
    }

    onDestroy() {
        super.onDestroy();
        cc.Tween.stopAllByTarget(this.obj);
    }

    /**
     * 设置进度
     * @param current 当前值
     * @param total 总值
     * @param isTween 是否缓动(默认不缓动)
     * @param time 缓动时间（默认1s）
     * @param overMaxIsClean 当设置的当前值达到最大值后是否清零当前值（默认清零）
     * @param easing 曲线
     * 
     */
    public setProgress(data: { current: number, total: number, isTween?: boolean, time?: number, overMaxIsClean?: boolean, easing?: string }) {
        if (null == data.isTween) {
            data.isTween = false;
        }
        if (null == data.time) {
            data.time = 1;
        }
        if (null == data.overMaxIsClean) {
            data.overMaxIsClean = true;
        }
        data.current = ChristmasUtil.getFloatToFixed(data.current, 0, false);
        this.dispose(data.current, data.total, data.time, data.isTween, data.overMaxIsClean, data.easing);
    }

    /**
     * 设置进度
     * @param percent 百分比
     * @param isTween 是否缓动(默认不缓动)
     * @param time 缓动时间（默认0.5s）
     * @param overMaxIsClean 当设置的当前值达到最大值后是否清零当前值（默认清零）
     * @param easing 曲线
     */
    public setProgressPercent(data: { percent: number, isTween?: boolean, time?: number, overMaxIsClean?: boolean, easing?: string }) {
        if (null == data.isTween) {
            data.isTween = false;
        }
        if (null == data.time) {
            data.time = 1;
        }
        if (null == data.overMaxIsClean) {
            data.overMaxIsClean = true;
        }
        let current = ChristmasUtil.getFloatToFixed(data.percent * 100, 0, false);
        let total = 100;
        this.dispose(current, total, data.time, data.isTween, data.overMaxIsClean, data.easing);
    }

    /**
     * 获得bar节点当前宽度
     * @returns 
     */
    public getCurrWidth(): number {
        return this.progressMode == ProgressMode.MOVE ? this.barSpriteNode.width + this.barSpriteNode.x : this.barSpriteNode.width;
    }

    /**
     * 处理数据
     * @param current 当前值
     * @param total 总值
     * @param time 缓动时间(单位s)
     * @param isTween 是否缓动
     * @param overMaxIsClean 当设置的当前值达到最大值后是否清零当前值（默认清零）
     * @param easing 曲线
     */
    private dispose(current: number, total: number, time: number, isTween: boolean, overMaxIsClean: boolean, easing?: string) {
        let width = this.totalLength;// 获取 SpriteFrame 的纹理矩形宽
        if (current >= total) {
            current = total;
        }
        if (isTween) {
            this.tween(current, time, (curr: number) => {
                this.handle(width, curr, total);
            }, easing)
        }
        else {
            this.handle(width, current, total);
        }
        this.lastCurrent = current;
        if (this.lastCurrent == total && overMaxIsClean) {
            this.lastCurrent = 0;
        }
    }

    /**
     * 设置进度条相关展示
     * @param width 进度条的宽
     * @param curr 当前值
     * @param total 总值
     */
    private handle(width: number, curr: number, total: number) {
        switch (this.progressMode) {
            case ProgressMode.MOVE:
                this.barSpriteNode.x = -width + (width * curr / total);
                break;
            case ProgressMode.SLICED:
            case ProgressMode.TILED:
                this.barSpriteNode.width = width * curr / total;
                break;
            case ProgressMode.RADIAL:
                this.barSprite.fillRange = curr / total;
                break;
        }
        switch (this.labelMode) {
            case LabelMode.PERCENT:
                this.txtLabel.string = ChristmasUtil.getFloatToFixed(curr / total * 100, 0, false) + "%";
                break;
            case LabelMode.CURRENT_OR_TOTAL:
                this.txtLabel.string = ChristmasUtil.getFloatToFixed(curr, 0, false) + "/" + total;
                break;
        }
    }

    /**
     * 缓动
     * @param target 目标值
     * @param time 时间
     * @param callbackTween 
     * @param easing 曲线
     */
    private tween(target: number, time: number, callbackTween: Function, easing: string = "expoOut") {
        let obj = {
            curr: null == this.lastCurrent ? 0 : this.lastCurrent
        };
        this.obj = obj;
        cc.tween(this.obj)
            .to(time,
                { curr: target },
                {
                    onUpdate: () => {
                        callbackTween(obj.curr);
                        this.node.emit(ProgressBarEvent.PROGRESS_TWEEN_UPDATE);
                    },
                    easing: easing
                })
            .call(() => {
                this.node.emit(ProgressBarEvent.PROGRESS_TWEEN_END);
            })
            .start();
    }

    /**
     * 设置bar纹理长度
     * @param length 纹理长度
     */
    public setTotalLength(length: number) {
        this.totalLength = length;
        this.barSpriteNode.width = length;
        this.maskNode.width = length;
    }
}
