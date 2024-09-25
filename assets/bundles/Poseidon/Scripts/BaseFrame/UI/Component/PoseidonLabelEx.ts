import PoseidonLogManager from "../../Manager/PoseidonLogManager";
import PoseidonSlotResManager from "../../Manager/PoseidonSlotResManager";
import PoseidonUtil from "../../Util/PoseidonUtil";
import PoseidonComponentBase from "../ComponentBase/PoseidonComponentBase";
interface RadianData { str: string, radis: number, intervalAngle: number, startAngle?: number, isOverturn?: boolean, font?: { aBName: string, path: string }, specialSymbol?: { specialIntervalAngle: number, symbol: string } };
const { ccclass, property, menu } = cc._decorator;
@ccclass
@menu('自定义组件/PoseidonLabelEx')
export default class PoseidonLabelEx extends PoseidonComponentBase {

    private time: number;//倒计时的时间，单位为秒
    private _ticker: Function;//倒计时每秒回调
    private _label: cc.Label = null;//label组件
    private digitEffectObj: { num: number } = {
        num: 0
    }
    private oldNum: number = 0;//旧数值
    private currDifferenceAngle: number = 0;//当前已经减去的差值角度

    /**
     * 开始倒计时
     * time倒计时的时间
     * interVal时间间隔，默认为1
     */
    public startTick(time: number, interVal: number = 1): number {
        this.time = time;
        this.onTicker();
        return this.setInterval(this.onTicker.bind(this), interVal, this.time);
    }

    /**
     * 设置回调请在startTick之前进行
     */
    public set ticker(value: Function) {
        this._ticker = value;
    }

    /**
     * 设置每秒回调
     */
    private onTicker(): void {
        const label = this.node.getComponent(cc.Label);
        if (!label) {
            PoseidonLogManager.instance.log('请将此节点挂在Label组建下');
            return;
        }
        if (this._ticker) {
            this._ticker(this.time);
        }
        else {
            label.string = this.time + '';
        }
        this.time--;
    }

    /**
     * 滚动数字效果
     * @param data.score 目标值
     * @param data.time 持续时间
     * @param data.isCoin 是否用货币表示法(默认不是)
     * @param data.bit 展示多少位小数
     * @param data.isScale 是否要缩放
     * @param data.initNum 初始值
     * @param data.callback 完成回调
     * @param data.bigScaleTime 放大时间
     * @param data.smallScaleTime 缩小时间
     * @param data.bigScale 放大倍数
     * @param data.digitEffectEasing 数字变化曲线
     * @param data.isShowZero — 是否要展示小数位最后的零（默认不展示）
     * @param data.unitBit — 展示货币单位的最小位数(默认4位)
     * @param data.isShowSeparator — 是否展示货币分割符(默认不展示)
     * @param data.isAbbr -是否要展示缩写（默认不展示）
     */
    public digitEffect(data: {
        score: number,
        time?: number,
        isCoin?: boolean,
        bit?: number,
        isScale?: boolean,
        initNum?: number,
        callback?: Function,
        bigScaleTime?: number,
        smallScaleTime?: number,
        bigScale?: number,
        digitEffectEasing?: string,
        isShowZero?: boolean,
        unitBit?: number,
        isShowSeparator?: boolean
        isAbbr?: boolean
    }): void {
        if (null == data.time)
            data.time = 0.8;
        if (null == data.isCoin)
            data.isCoin = false;
        if (null == data.bit)
            data.bit = 2;
        if (null == data.isScale)
            data.isScale = false;
        if (null == data.initNum) {
            data.initNum = this.oldNum;// parseFloat(this.label.string.replace(/[^0-9]/ig, ""));
        }

        if (null == data.bigScale)
            data.bigScale = 1.2;
        if (null == data.bigScaleTime)
            data.bigScaleTime = data.time / 2;
        if (null == data.smallScaleTime)
            data.smallScaleTime = data.time / 2;
        if (null == data.digitEffectEasing) {
            data.digitEffectEasing = 'sineOut'
        }
        if (null == data.isShowZero) {
            data.isShowZero = false;
        }
        if (null == data.unitBit) {
            data.unitBit = 4;
        }
        if (null == data.isShowSeparator) {
            data.isShowSeparator = false;
        }
        if (null == data.isAbbr) {
            data.isAbbr = false;
        }
        //数字变化
        this.digitEffectObj.num = data.initNum;
        cc.tween(this.digitEffectObj)
            .to(data.time,
                { num: data.score },
                {
                    onUpdate: () => {
                        let showNum = PoseidonUtil.getFloatToFixed(this.digitEffectObj.num, 0);
                        this.oldNum = showNum;
                        this.label.string = data.isCoin ?
                            data.isAbbr ? PoseidonUtil.formateCoinStrTwo(showNum.toString(), data.bit, data.isShowZero, data.unitBit, data.isShowSeparator) :
                                PoseidonUtil.formateCoinStr(showNum)
                            : showNum.toString();;
                    },
                    easing: data.digitEffectEasing
                })
            .call(() => {
                if (data.callback) {
                    data.callback();
                }
            })
            .start()
        //节点缩放
        if (data.isScale) {
            cc.tween(this.label.node)
                .to(data.bigScaleTime, { scale: data.bigScale }, { easing: 'sineOut' })
                .to(data.smallScaleTime, { scale: 1 }, { easing: 'sineIn' })
                .start()
        }
    }



    /**
     * 停止数字滚动效果
     */
    public stopDigitEffect(): void {
        this.label.node.setScale(1);
        cc.Tween.stopAllByTarget(this.label.node);
        cc.Tween.stopAllByTarget(this.digitEffectObj);
    }

    /**
     * 打字机效果
     * @param text 文本
     * @param interval 总时间
     */
    public typerEffect(text: string, interval: number): void {
        let curStr = '';
        let index = 0;
        this.setInterval(() => {
            curStr += text[index];
            this.label.string = curStr;
            index++;
        }, interval / text.length, text.length - 1);
    }


    /**
     * 获取Label组件
     */
    public get label(): cc.Label {
        if (!this._label) {
            this._label = this.node.getComponent(cc.Label);
        }
        return this._label;
    }

    public onDestroy() {
        super.onDestroy();
        cc.Tween.stopAllByTarget(this.label.node);
        cc.Tween.stopAllByTarget(this.digitEffectObj);
    }

    /**
     * 设置旧数值
     */
    public setOldNum(value: number) {
        this.oldNum = value;
    }

    /**
     * 给文字设置弧度(默认圆心正下方为0度，左边为正方向)
     * @param data.str 数值
     * @param data.radis 半径
     * @param data.intervalAngle 间隔圆心角
     * @param data.startAngle 起始角度（默认为圆底部水平中心对称）
     * @param data.isOverturn 是否翻转（默认翻转）
     * @param data.font 美术字
     * @param data.specialIntervalAngle 特殊间隔圆心角
     */
    public setRadian(data: RadianData) {
        if (null == data.isOverturn) {
            data.isOverturn = true;
        }
        if (null != this.label) {
            this.label.string = "";
        }
        this.currDifferenceAngle = 0;
        this.initRadianItem(data);
    }

    /**
     * 初始化子项列表
     */
    private initRadianItem(data: RadianData): void {
        this.node.removeAllChildren();
        const num = data.str.length;
        for (let i = 0; i < num; i++) {
            this.createItem(i, data);
        }
    }

    /**
     * 创建子项
     */
    private async createItem(index: number, data: RadianData): Promise<void> {
        const node = new cc.Node('richTextNode');
        node.parent = this.node;
        let label: cc.Label = node.addComponent(cc.Label);
        if (null != data.font) {
            let atlas: cc.BitmapFont = await PoseidonSlotResManager.instance.loadByBundle(data.font.aBName, data.font.path, cc.BitmapFont);
            label.font = atlas;
            //@ts-ignore
            label.fontSize = label._bmFontOriginalSize;
            label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
            label.verticalAlign = cc.Label.VerticalAlign.TOP;
            //@ts-ignore
            label.lineHeight = label._frame._originalSize.height;
        }
        label.cacheMode = cc.Label.CacheMode.CHAR;
        label.string = data.str[index];
        let angle = this.getItemAngle(index, data);
        let pos = this.calcItemPos(data.radis, angle);
        if (data.isOverturn) {
            node.angle = -angle + 180;
        }
        else {
            node.angle = -angle;
        }

        node.x = pos.x;
        node.y = pos.y;
    }

    /**
     * 计算子项坐标
     */
    private calcItemPos(radis: number, angle: number): cc.Vec2 {
        let rad = this.angleToRad(angle);
        let posX = Math.abs(radis * Math.sin(rad));
        let posY = Math.sqrt(radis * radis - posX * posX) - radis;
        let flag = this.getFlag(angle);
        posX *= flag.x;
        posY *= flag.y;
        return new cc.Vec2(posX, posY);
    }

    /**
    * 逆时针方向为正方向
    */
    private getItemAngle(index: number, data: RadianData): number {
        let currAngle: number = null;//当前角度
        const num = data.str.length;
        if (null != data.startAngle) {
            currAngle = data.startAngle - index * data.intervalAngle;
        }
        else {
            let isDouble = (num % 2) == 0;//是否为偶数个元素
            let maxAngle = Math.floor((isDouble ? num : (num - 1)) / 2) * data.intervalAngle;//最大角度值
            //最大角度值需要加上特殊符号的差值
            if (null != data.specialSymbol) {
                let specialSymbolCount = PoseidonUtil.getCharCount(data.str, data.specialSymbol.symbol);
                maxAngle = maxAngle + data.specialSymbol.specialIntervalAngle * specialSymbolCount;
                if (data.str[0] == data.specialSymbol.symbol) {
                    maxAngle -= data.specialSymbol.specialIntervalAngle;
                }
                else if (data.str[data.str.length - 1] == data.specialSymbol.symbol) {
                    maxAngle -= data.specialSymbol.specialIntervalAngle;
                }
            }
            if (isDouble) {
                currAngle = maxAngle - index * data.intervalAngle - data.intervalAngle / 2;
            }
            else {
                currAngle = maxAngle - index * data.intervalAngle;
            }
        }


        //如果上一个符号是特殊符号或者当前符号是特殊符号，则需要减去差值
        if (null != data.specialSymbol) {
            if (((data.str[index] == data.specialSymbol.symbol && 0 != index) || (0 != index && data.str[index - 1] == data.specialSymbol.symbol))) {
                this.currDifferenceAngle += data.specialSymbol.specialIntervalAngle;
            }
        }
        currAngle -= this.currDifferenceAngle;
        //整体翻转
        currAngle += 180;

        return currAngle;
    }

    /**
     * 角度转弧度
     */
    private angleToRad(angle: number): number {
        return angle * Math.PI / 180;
    }

    /**
     * 获取象限符号
     */
    private getFlag(angle: number): cc.Vec2 {
        let pos = new cc.Vec2();
        angle = this.getRealAngle(angle);
        //一项限
        if (angle >= 0 && angle < 90) {
            pos.x = 1;
            pos.y = 1;
        }
        //二项限
        else if (angle >= 90 && angle < 180) {
            pos.x = 1;
            pos.y = -1;
        }
        //三项限
        else if (angle >= 180 && angle < 270) {
            pos.x = -1;
            pos.y = -1;
        }
        //四项限
        else {
            pos.x = -1;
            pos.y = 1;
        }
        return pos;
    }

    /**
     * 获取真实的角度，0-360
     */
    private getRealAngle(angle: number): number {
        if (angle < 0) {
            return 360 + angle;
        }
        return angle % 360;
    }
}
