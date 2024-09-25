import { BundleType, CommonTopStatus, SoundsType, SpinBtnStatus, TurntableStatus } from "./BaseFrame/Const/ChristmasCommonDefine";
import { ChristmasEventDefine } from "./BaseFrame/Const/ChristmasEventDefine";
import ChristmasLogManager from "./BaseFrame/Manager/ChristmasLogManager";
import { ChristmasSlotAudioManager } from "./BaseFrame/Manager/ChristmasSlotAudioManager";
import ChristmasSlotEventManager from "./BaseFrame/Manager/ChristmasSlotEventManager";
import ChristmasComponentBase from "./BaseFrame/UI/ComponentBase/ChristmasComponentBase";
import ChristmasUtil from "./BaseFrame/Util/ChristmasUtil";
import ChristmasCommonTop from "./Common/ChristmasCommonTop";
import SlotsBottomBtn from "./Common/ChristmasSlotsBottomBtn";
// import HallProxy from "../../../HallBundle/Scripts/Proxy/HallProxy";
import ChristmasAcitonManager from "./ChristmasAcitonManager";
import { ChristmasActionType, ChristmasGameType, ChristmasSoundsType, ChristmasWinType } from "./ChristmasDefine";
import ChristmasItem from "./ChristmasItem";
import ChristmasProxy from "./ChristmasProxy";
import ChristmasScroll from "./ChristmasScroll";
import ChristmasView from "./ChristmasView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ChristmasTurnTable extends ChristmasComponentBase {
    @property(cc.Node)
    resultMaskArr: Array<cc.Node> = [];//展示赔付线相关时候的遮罩
    @property(cc.Node)
    particleNode: cc.Node = null;//粒子父节点
    @property(cc.Node)
    particleOneNode: cc.Node = null;//粒子节点1
    @property(cc.Node)
    particleTwoNode: cc.Node = null;//粒子节点2
    @property(cc.Node)
    graphicsLineNode: cc.Node = null;//画线工具
    @property(cc.Node)
    scrollNodeArr: Array<cc.Node> = [];//每个轴的第一个周期轴
    @property(ChristmasScroll)
    listScroll: Array<ChristmasScroll> = [];//每个轴
    @property(cc.Node)
    viewRootNode: cc.Node = null;//机台根节点
    @property(cc.Node)
    iconAnimNode: cc.Node = null;//icon动画父节点
    @property(cc.Node)
    animCon: cc.Node = null;//用于挂载动画
    @property(SlotsBottomBtn)
    tsSlotsBottomBtn: SlotsBottomBtn = null;

    private linesDataArr: Array<{
        linePoints: Array<cc.Vec2>,
        colorHex: number,
        rectArr: Array<{ colorHex: number, isPrize: boolean, node: cc.Node }>,
        targetId: number
    }> = [];//处理好的赔付线数据
    private lineShowTime: number = 1.6;//赔付线每个周期展示总时间,单位：s（淡入淡出总和）
    private everyLineShowTime: number = 2.1;//每条线单独展示的时候，一个周期的总时间，单位：s
    public rowGridNum: number = 5;//一行有多少个格子
    private tweenObj: { opacity: number } = { opacity: 0 };//赔付线动画专用对象
    private currScrollStopCount: number = 0;//当前有多少个转轴停止
    private scrollAnimTimestamp: number = 0;//最后一列符号动画播放完毕的时间戳
    private currScrollChangeImgCount: number = 0;//当前有多少个转轴进入换清晰图状态
    private delayResultTimerId: number = -1;//因为播放免费转动画导致延迟结算的计时器ID
    private turntableStatus: TurntableStatus = TurntableStatus.STOP;//转盘状态
    private tsChristmasView: ChristmasView = null;
    onLoad() {
        this.tsChristmasView = this.node.getComponent("ChristmasView");
    }

    start() {
        this.addEvent();
    }

    onDestroy() {
        super.onDestroy();
        cc.Tween.stopAllByTarget(this.tweenObj);
        cc.Tween.stopAllByTarget(this.particleNode);
        cc.Tween.stopAllByTarget(this.particleOneNode);
        cc.Tween.stopAllByTarget(this.particleTwoNode);
    }

    private addEvent() {
        ChristmasSlotEventManager.instance.on(ChristmasEventDefine.SLOTS_CHANGE_ICON_IMAGE, (data: { id: number, isDim: boolean }) => {
            this.changeIconImg(data);
        }, this);

        ChristmasSlotEventManager.instance.on(ChristmasEventDefine.UPDATE_CIRCLE, (data: { index: number, times: number }) => {
            this.updateCircle(data);
        }, this);

        ChristmasSlotEventManager.instance.on(ChristmasEventDefine.WIN_DIALOG_CLOSE_CALLBACK, () => {
            this.tsSlotsBottomBtn.setWinNum({
                num: ChristmasProxy.instance.gameOverData.totalPay,
                isChange: false
            });
            this.tsSlotsBottomBtn.setWinTitle(false);
        }, this);
        ChristmasSlotEventManager.instance.on(ChristmasEventDefine.WIN_DIALOG_OPEN_CALLBACK, () => {
            this.bigWinOpenCallback();
        }, this);
        ChristmasSlotEventManager.instance.on(ChristmasEventDefine.CHECK_SERVER_SLOT_DATA, this.checkServerBetData, this);
        ChristmasSlotEventManager.instance.on(ChristmasEventDefine.WHEEL_COLLIDE_BOTTOM, this.collideBottom, this);
        ChristmasSlotEventManager.instance.on(ChristmasEventDefine.SLOTS_SPEED_UP_START, this.turnStageSpeedUp, this);
    }

    /**
     * 某一列转轴撞底
     * event.id  转轴下标
     */
    private collideBottom(event) {
        ChristmasSlotAudioManager.instance.playSound(BundleType.RESOURCES, SoundsType.END_ROLL);
    }

    private checkServerBetData() {
    }

    private drawPayAlllineTwo(callback: Function) {
        let tsChristmasView: ChristmasView = <ChristmasView>this.viewRootNode.getComponent("ChristmasView");
        if (null != ChristmasProxy.instance.gameOverData && ChristmasProxy.instance.gameOverData.totalPay > 0 && ChristmasProxy.instance.gameOverData.winType <= ChristmasWinType.WIN) {
            this.tsSlotsBottomBtn.setWinNum({ num: ChristmasProxy.instance.gameOverData.totalPay, isChange: true });
            this.tsSlotsBottomBtn.setWinTitle(false);
        }
        tsChristmasView.updateSelfMoney();
        ChristmasLogManager.instance.info("开始绘制所有赔付线");
        this.tweenObj.opacity = 0;
        if (0 == this.linesDataArr.length) {
            if (callback) {
                callback();
            }
        }
        else {
            this.setResultMask(false)
            let lineTween = cc.tween(this.tweenObj)
                .to(this.lineShowTime / 2, { opacity: 255 }, {
                    onUpdate: () => {
                        this.drawLine(this.linesDataArr, this.tweenObj.opacity);
                    },
                    easing: "sineOut"
                })
                .to(this.lineShowTime / 2, { opacity: 0 }, {
                    onUpdate: () => {
                        this.drawLine(this.linesDataArr, this.tweenObj.opacity);
                    },
                    easing: "sineIn"
                });
            cc.tween(this.tweenObj).then(lineTween).repeat(2).call(() => {
                if (callback) {
                    callback();
                }
            }).start();
        }
    }

    /**
     * 结算流程中途检测是否要放开按钮限制
     */
    public checkIsClick() {
        let tsCommonTop: ChristmasCommonTop = <ChristmasCommonTop>this.tsChristmasView.topNode.getComponent(ChristmasCommonTop);
        let isJump = tsCommonTop.checkShowLevelRoad(false);
        if (ChristmasProxy.instance.gameOverData.free == 0
            && !ChristmasProxy.instance.gameOverData.freeGameSettle
            && !isJump) {
            this.tsChristmasView.isCanClick();
        }
    }

    /**
    * 结算流程前检测是否要放开按钮限制
    */
    public checkIsClickFront() {
        let tsCommonTop: ChristmasCommonTop = <ChristmasCommonTop>this.tsChristmasView.topNode.getComponent(ChristmasCommonTop);
        let isJump = tsCommonTop.checkShowLevelRoad(false);
        if (null != ChristmasProxy.instance.gameOverData
            && ChristmasProxy.instance.gameOverData.free == 0
            && !ChristmasProxy.instance.gameOverData.freeGameSettle
            && !isJump
            && ChristmasProxy.instance.gameOverData.winType <= ChristmasWinType.WIN
        ) {
            this.tsChristmasView.isCanClick();
        }
    }

    /**
     * 绘制所有赔付线
     */
    public drawPayAllline(callback: Function) {
        this.drawPayAlllineTwo(callback);
    }

    /**
     * 播放每条中奖线的动画时，区分动物音效
     * @param id 符号id
     */
    private playEveryOneSound(id: number) {
        let path = ChristmasSoundsType.EVERY_LINE;
        // switch (id) {
        //     case ChristmasIconType.FREE:
        //         path = ChristmasSoundsType.FREE;
        //         break;
        // }
        ChristmasSlotAudioManager.instance.playSound(BundleType.STONE_AGE, path);
    }

    /**
     * 分别绘制每一条赔付线相关内容（粒子，框，动画）
     */
    public drawPayEveryOneLine(callbackYes: Function) {
        if (this.tsSlotsBottomBtn.getIsAutoBet()
            || ChristmasProxy.instance.gameOverData.gameType == ChristmasGameType.FREE
            || ChristmasProxy.instance.freeSpinCount != 0) {
            if (callbackYes) {
                callbackYes();
            }
        }
        else {
            this.tsChristmasView.isCanClick();
            ChristmasLogManager.instance.info("开始分别绘制每条赔付线");
            let linesDataArr = this.handlePayLinesData();
            this.setResultMask(0 == linesDataArr.length ? false : true)
            //挨个详细展示
            let particleTime = 0.5;//每个周期粒子展示时间
            let delayTimeRect = particleTime / (this.rowGridNum - 1);//每个框的间隔时间，减1是因为第一个框没有间隔
            for (let index = 0; index < linesDataArr.length; index++) {
                const oneLine = linesDataArr[index];
                this.tweenObj.opacity = 0;
                let particleSystem = this.particleOneNode.getComponent(cc.ParticleSystem);
                let particleSystemTwo = this.particleTwoNode.getComponent(cc.ParticleSystem);
                cc.tween(this.particleNode)
                    .delay(this.everyLineShowTime * index + 0.01)
                    .call(() => {
                        this.playEveryOneSound(oneLine.targetId);
                        //每条线的第一个点需要设置粒子的起点
                        particleSystem.resetSystem();
                        particleSystemTwo.resetSystem();
                        this.particleOneNode.setPosition(oneLine.linePoints[0]);
                        this.particleTwoNode.setPosition(oneLine.linePoints[0]);
                    })
                    .call(() => {
                        //每一条线都有多个点，每个点都需要绘制框
                        let rectArr: Array<{ colorHex: number, node: cc.Node }> = [];
                        for (let j = 0; j < oneLine.rectArr.length; j++) {
                            if (oneLine.rectArr[j].isPrize) {
                                rectArr.push({ node: oneLine.rectArr[j].node, colorHex: oneLine.rectArr[j].colorHex });
                            }
                        }
                        //放格子动画
                        this.playGridAnim(rectArr, oneLine.targetId);
                        //粒子移动
                        for (let i = 0; i < oneLine.linePoints.length - 1; i++) {
                            const node = oneLine.rectArr[i + 1].node;
                            let vec2 = this.particleOneNode.parent.convertToNodeSpaceAR(node.parent.convertToWorldSpaceAR(node.getPosition()));
                            cc.tween(this.particleOneNode)
                                .delay(delayTimeRect * i)
                                .call(() => {
                                    //每条线的第一个点需要设置粒子的起点
                                    if (0 == i) {
                                        particleSystem.resetSystem();
                                        particleSystemTwo.resetSystem();
                                        let nodeOne = oneLine.rectArr[0].node;
                                        let vec2One = this.particleOneNode.parent.convertToNodeSpaceAR(nodeOne.parent.convertToWorldSpaceAR(nodeOne.getPosition()));
                                        this.particleOneNode.setPosition(vec2One);
                                    }
                                })
                                .to(delayTimeRect, { position: new cc.Vec3(vec2.x, vec2.y) })
                                .call(() => {
                                    //如果已经跑到了最后一条线的最后一个框就清空
                                    if (index == linesDataArr.length - 1 && oneLine.linePoints.length - 2 == i) {
                                        this.schedule(() => {
                                            if (callbackYes) {
                                                callbackYes();
                                            }
                                        }, 1.5, 0)
                                    }
                                })
                                .start();
                            cc.tween(this.particleTwoNode)
                                .delay(delayTimeRect * i)
                                .call(() => {
                                    //每条线的第一个点需要设置粒子的起点
                                    if (0 == i) {
                                        particleSystem.resetSystem();
                                        particleSystemTwo.resetSystem();
                                        let nodeOne = oneLine.rectArr[0].node;
                                        let vec2One = this.particleTwoNode.parent.convertToNodeSpaceAR(nodeOne.parent.convertToWorldSpaceAR(nodeOne.getPosition()));
                                        this.particleTwoNode.setPosition(vec2One);
                                    }
                                })
                                .to(delayTimeRect, { position: new cc.Vec3(vec2.x, vec2.y) })
                                .start();
                        }
                    })
                    .start();
            }
            if (0 == linesDataArr.length) {
                ChristmasLogManager.instance.info("没有赔付线");
                if (callbackYes) {
                    callbackYes();
                }
            }
        }

    }

    /**
     * 画线（只管绘制）
     * @param linesDataArr 线数据
     * @param opacity 透明度
     */
    private drawLine(linesDataArr: Array<{ linePoints: Array<cc.Vec2>, colorHex: number }>, opacity: number) {
        let graphics = this.graphicsLineNode.getComponent(cc.Graphics);
        graphics.lineWidth = 10;
        graphics.clear();
        for (let index = 0; index < linesDataArr.length; index++) {
            const lineOne: { linePoints: Array<cc.Vec2>, colorHex: number } = linesDataArr[index];
            graphics.moveTo(lineOne.linePoints[0].x, lineOne.linePoints[0].y);
            let colorRGB: { r: number, g: number, b: number } = ChristmasUtil.hexToRGB(lineOne.colorHex);
            graphics.strokeColor = cc.color(colorRGB.r, colorRGB.g, colorRGB.b, opacity)
            for (let i = 1; i < lineOne.linePoints.length; ++i) {
                graphics.lineTo(lineOne.linePoints[i].x, lineOne.linePoints[i].y);
            }
            graphics.stroke();
        }
    }

    /**
     * 画空心矩形
     * @param rectArr 矩形数组
     * @param opacity 透明度
     */
    private drawRect(rectArr: Array<{ colorHex: number, node: cc.Node }>, opacity: number) {
        let graphics = this.graphicsLineNode.getComponent(cc.Graphics);
        graphics.lineWidth = 7;
        graphics.clear();
        for (let index = 0; index < rectArr.length; index++) {
            const rectOne: { colorHex: number, node: cc.Node } = rectArr[index];
            let tsLuckyCloverItem: ChristmasItem = <ChristmasItem>rectOne.node.getComponent("ChristmasItem");
            let node = tsLuckyCloverItem.getSpriteNode();
            let vec2: cc.Vec2 = this.graphicsLineNode.convertToNodeSpaceAR(node.parent.convertToWorldSpaceAR(node.getPosition()));
            let colorRGB: { r: number, g: number, b: number } = ChristmasUtil.hexToRGB(rectOne.colorHex);
            graphics.strokeColor = cc.color(colorRGB.r, colorRGB.g, colorRGB.b, opacity);
            graphics.rect(
                vec2.x - 76,
                vec2.y - 65.5,
                152,
                131
            );
        }
        graphics.stroke();
    }

    /**
     * 清理结算动画相关
     */
    public cleanResultAnim() {
        ChristmasLogManager.instance.info("清空所有动画");
        cc.Tween.stopAllByTarget(this.tweenObj);
        cc.Tween.stopAllByTarget(this.particleNode);
        cc.Tween.stopAllByTarget(this.particleOneNode);
        cc.Tween.stopAllByTarget(this.particleTwoNode);
        cc.Tween.stopAllByTarget(this.animCon);
        //清空线
        let graphics = this.graphicsLineNode.getComponent(cc.Graphics);
        graphics.clear();
        //清空粒子
        let particleSystem = this.particleOneNode.getComponent(cc.ParticleSystem);
        particleSystem.stopSystem();
        let particleSystemTwo = this.particleTwoNode.getComponent(cc.ParticleSystem);
        particleSystemTwo.stopSystem();
        //隐藏蒙版
        this.setResultMask(false);
        //清空动画节点
        this.iconAnimNode.destroyAllChildren();
        //讲隐藏的图片透明度还原
        this.tsChristmasView.setOpacityFull();
        this.tsSlotsBottomBtn.setNotOperationAnim();
        let tsChristmasView: ChristmasView = <ChristmasView>this.viewRootNode.getComponent("ChristmasView");
        tsChristmasView.tsChristmasOperate.updateBet(false, false);
    }

    public clearDelayResultTimerId() {
        this.clearTimeout(this.delayResultTimerId);
    }

    /**
     * 隐藏每一列转盘的上轴
     */
    private hideScroll() {
        for (let index = 0; index < this.listScroll.length; index++) {
            const listOne = this.listScroll[index];
            listOne.node.children[1].active = false;
        }
    }

    /**
     * 展示每一列转盘的上轴
     */
    public showScroll() {
        for (let index = 0; index < this.listScroll.length; index++) {
            const listOne = this.listScroll[index];
            listOne.node.children[1].active = true;
        }
    }


    /**
     * 检查一下是否收到服务器数据
     */
    public checkServerData(callbackYes: Function, callbackNo: Function) {
        // this.hideScrollOne();
        if (ChristmasProxy.instance.gameOverData == null) {
            ChristmasLogManager.instance.log("未收到服务器数据");
            if (ChristmasProxy.instance.freeSpinCount == 0) {
                let tsChristmasView: ChristmasView = <ChristmasView>this.viewRootNode.getComponent("ChristmasView");
                this.tsSlotsBottomBtn.setIsAutoBet(false);
                if (!this.tsSlotsBottomBtn.getIsAutoBet()) {
                    tsChristmasView.tsChristmasOperate.setButtonCanClick();
                }
                this.tsSlotsBottomBtn.setSpinStatus(SpinBtnStatus.SPIN);
            }
            else {
                this.tsSlotsBottomBtn.setSpinStatus(SpinBtnStatus.FREE);
            }
            let tsChristmasView: ChristmasView = <ChristmasView>this.viewRootNode.getComponent("ChristmasView");
            tsChristmasView.restoreSelfMoney();
            ChristmasProxy.instance.initAddCircleStartIndex();
            if (callbackNo) {
                callbackNo();
            }
        }
        else {
            // this.linesDataArr = this.handlePayLinesData();
            // if (callbackYes) {
            //     callbackYes();
            // }
            this.tsSlotsBottomBtn.setSpinStatus(SpinBtnStatus.SPIN);
        }
    }

    /**
     * 放每个格子的动画
     */
    private playGridAnim(rectArr: {
        colorHex: number,
        node: cc.Node
    }[], targetId: number) {
        for (let index = 0; index < rectArr.length; index++) {
            const rect = rectArr[index];
            this.playOneWinAnim(rect.node);
        }
        this.drawOutInRect(rectArr);
    }

    /**
     * 画渐入渐出的框
     */
    private drawOutInRect(rectArr: Array<{
        colorHex: number,
        node: cc.Node
    }>) {
        //画框
        // cc.tween(this.tweenObj)
        //     .call(() => {
        //         this.tweenObj.opacity = 0;
        //     })
        //     .to(this.everyLineShowTime / 2, { opacity: 255 }, {
        //         onUpdate: () => {
        //             this.drawRect(rectArr, this.tweenObj.opacity);
        //         }
        //     })
        //     .to(this.everyLineShowTime / 2, { opacity: 0 }, {
        //         onUpdate: () => {
        //             this.drawRect(rectArr, this.tweenObj.opacity);
        //         }
        //     })
        //     .start();
    }

    /**
     * 播放某个节点的中奖动画
     */
    private playOneWinAnim(node: cc.Node) {
        let tsLuckyCloverItem: ChristmasItem = <ChristmasItem>node.getComponent("ChristmasItem");
        tsLuckyCloverItem.playSpineAnim();
    }

    /**
     * 通过服务器位置取对应节点
     * @param row 行下标
     * @param col 列下标
     */
    public getNodeByIndex(row: number, col: number): cc.Node {
        return this.scrollNodeArr[col].children[row];
    }

    /**
     * 判断是否是自动转，会设置对应的状态（结算流程）
     */
    public isAutoSpin() {
        if (this.tsSlotsBottomBtn.getIsAutoBet()) {
            ChristmasLogManager.instance.info("进入自动转");
            this.tsSlotsBottomBtn.setSpinStatus(SpinBtnStatus.AUTO);
            this.spin()
            this.setResultMask(false);
        }
        else {
            ChristmasLogManager.instance.info("没有自动转");
            this.tsSlotsBottomBtn.setSpinStatus(SpinBtnStatus.SPIN);
            if (ChristmasProxy.instance.gameOverData != null && !ChristmasProxy.instance.gameOverData.freeGameSettle) {
                ChristmasLogManager.instance.info("开始分别画线");
                // this.drawPayEveryOneLine();
            }
            else {
                ChristmasLogManager.instance.info("进入清理阶段");
                this.cleanResultAnim();
            }

        }
    }

    /**
     * 仅仅判断是否是自动转
     */
    public isAutoSpinOnly() {
        if (this.tsSlotsBottomBtn.getIsAutoBet()) {
            ChristmasLogManager.instance.info("进入自动转");
            this.tsSlotsBottomBtn.setSpinStatus(SpinBtnStatus.AUTO);
            this.spin()
        }
        else {
            ChristmasLogManager.instance.info("没有自动转");
            this.tsSlotsBottomBtn.setSpinStatus(SpinBtnStatus.SPIN);
        }
    }

    /**
     * 投注
     */
    private spin() {
        this.tsSlotsBottomBtn.onClickSpin();
    }

    /**
     * 处理赔付线数据并返回结果
     * @returns 
     */
    private handlePayLinesData(): Array<{
        linePoints: Array<cc.Vec2>,
        colorHex: number,
        rectArr: Array<{ colorHex: number, isPrize: boolean, node: cc.Node }>,
        targetId: number
    }> {
        // let linesArr = ChristmasProxy.instance.getPayLinesData();
        // let interval: number = 10;//同一个起点，线的间距
        // let offsetX: number;//x方向偏移
        // let offsetY: number;//y方向偏移
        // let factorX: number;//x方向正负系数
        // let factorY: number;//y方向正负系数
        // let map: { [key: number]: { num: number, linesArr: Lines[] } } = {} //存储每个起点有多少条线
        // let size: cc.Size = this.scrollNodeArr[0].children[0].getContentSize();//一个节点的尺寸
        // let row: number = (size.width / interval) - 1;//一行多少个起点
        // let linePosArr: Array<{
        //     linePoints: Array<cc.Vec2>,
        //     colorHex: number,
        //     rectArr: Array<{ colorHex: number, isPrize: boolean, node: cc.Node }>,
        //     targetId: number
        // }> = [];//存储每条线的数据
        // //计算每个起点有多少条线 并把起点相同的线归类
        // for (let index = 0; index < linesArr.length; index++) {
        //     const line = linesArr[index];
        //     if (null == map[line.lines[0]]) {
        //         map[line.lines[0]] = { num: 0, linesArr: [] };
        //     }
        //     map[line.lines[0]].num = map[line.lines[0]] == null ? 1 : ++map[line.lines[0]].num;
        //     map[line.lines[0]].linesArr.push(line);
        // }
        // //得到每条线的数据
        // for (const key in map) {
        //     const elementMap = map[key];
        //     for (let index = 0; index < elementMap.linesArr.length; index++) {
        //         const line = elementMap.linesArr[index];//拿到某一条赔付线的数据
        //         let _linePosArr: Array<cc.Vec2> = []; //存储一条线的每个转折点
        //         let _rectArr: Array<{ colorHex: number, isPrize: boolean, node: cc.Node }> = [];//存储每条线的每个矩形数据
        //         let combo = ChristmasProxy.instance.getComboByLinesId(line.id);
        //         let num = combo;
        //         for (let i = 0; i < this.rowGridNum; i++) {
        //             const childrenIndex = line.lines[i];//从上往下数的节点下标
        //             let node = this.scrollNodeArr[i].children[childrenIndex];//拿到某个轴的某个节点
        //             let vec2: cc.Vec2 = new cc.Vec2();
        //             factorX = index % 2 == 0 ? 1 : -1;
        //             factorY = index / row % 2 == 0 ? 1 : -1;
        //             offsetX = index % row / 2 * interval * factorX;
        //             offsetY = index / row / 2 * interval * factorY;
        //             let localVec2: cc.Vec2 = this.graphicsLineNode.convertToNodeSpaceAR(node.parent.convertToWorldSpaceAR(node.getPosition()));//转化为局部坐标
        //             vec2.x = localVec2.x + offsetX;
        //             vec2.y = localVec2.y + offsetY;
        //             _linePosArr.push(vec2);
        //             let isPrize = true;
        //             if (i >= num) {
        //                 isPrize = false;
        //             }
        //             _rectArr.push({ colorHex: line.color, isPrize: isPrize, node: node });
        //         }
        //         linePosArr.push({ linePoints: _linePosArr, colorHex: line.color, rectArr: _rectArr, targetId: ChristmasProxy.instance.getTargetIdByLinesId(line.id) });
        //     }
        // }
        // return linePosArr;
        return null;
    }

    /**
     * 某一列转轴停下来后执行的逻辑
     * @param index 转轴下标
     */
    public scrollStopOne(index: number) {
        this.hideScrollOne(index);
        this.currScrollStopCount++;
        let tsChristmasScroll: ChristmasScroll = <ChristmasScroll>this.listScroll[index].getComponent("ChristmasScroll");
        //停止当前加圈动画
        tsChristmasScroll.stopAddCircleSpine();
        if (index >= ChristmasProxy.instance.getAddCircleStartIndex() - 1 &&
            -1 != ChristmasProxy.instance.getAddCircleStartIndex() &&
            index != this.scrollNodeArr.length - 1 &&
            ChristmasProxy.instance.gameOverData != null) {
            ChristmasSlotAudioManager.instance.playSound(BundleType.RESOURCES, SoundsType.EXTEND_ROLL);
            let tsNextLuckyCloverScroll: ChristmasScroll = <ChristmasScroll>this.listScroll[index + 1].getComponent("ChristmasScroll");
            if (null != tsNextLuckyCloverScroll) {
                //播放下一个轴的加圈动画
                tsNextLuckyCloverScroll.playAddCircleSpine();
            }
        }
        let luckyCloverTimestamp = tsChristmasScroll.playFreeAnim();
        this.scrollAnimTimestamp = this.scrollAnimTimestamp > luckyCloverTimestamp ? this.scrollAnimTimestamp : luckyCloverTimestamp;
        //如果最后一列也停了下来
        if (this.currScrollStopCount == this.scrollNodeArr.length) {
            ChristmasSlotEventManager.instance.emit(ChristmasEventDefine.SLOTS_TURN_ALL_END);
            // this.setScrollStatus(TurntableStatus.STOP);
            //将上方看不见的转轴设置为模糊图片
            for (let index = 0; index < this.listScroll.length; index++) {
                const listOne = this.listScroll[index];
                listOne.setDimImage(1);
            }
            //播结束动画
            this.currScrollStopCount = 0;
            let currTimestamp = new Date().getTime();
            if (currTimestamp >= this.scrollAnimTimestamp) {
                ChristmasAcitonManager.instance.addAction({ type: ChristmasActionType.RESULT });
            }
            else {
                //等待免费转动画自然播完再结算
                this.delayResultTimerId = this.setTimeOut(() => { ChristmasAcitonManager.instance.addAction({ type: ChristmasActionType.RESULT }); }, (this.scrollAnimTimestamp - currTimestamp) / 1000);
            }
            this.checkIsClickFront();
        }
    }

    /**
    * 改变图标
    * @param data.id 转轴下标
    * @param data.isDim 是否模糊
    */
    private changeIconImg(data: { id: number, isDim: boolean }) {
        if (data.isDim) {
            this.listScroll[data.id].setDimImage(0);
        }
        else {
            this.listScroll[data.id].setClearnessImage();
            this.currScrollChangeImgCount++;
            if (this.currScrollChangeImgCount == this.scrollNodeArr.length) {
                this.currScrollChangeImgCount = 0;
                // if (null == ChristmasProxy.instance.gameOverData) {
                //     TipsManager.instance.showTips("pop_detals_disconnect");
                // }
            }
        }
    }

    /**
     * 更改某列的圈数
     * @param data.index 转轴下标
     * @param data.times 系数 
     */
    private updateCircle(data: { index: number, times: number }) {

    }

    /**
     * 大奖弹框打开回调
     */
    private bigWinOpenCallback() {
        this.setWinNum();
    }

    /**
     * 设置底部和左上角钱的数量
     */
    public setWinNum() {
        let time: number;
        switch (ChristmasProxy.instance.gameOverData.winType) {
            case ChristmasWinType.BIG_WIN:
                time = 4.7;
                break;
            case ChristmasWinType.MEGA_WIN:
                time = 4.7;
                break;
            case ChristmasWinType.SUPER_WIN:
                time = 4.7;
                break;
            case ChristmasWinType.HUGE_WIN:
                time = 4.7;
                break;
        }
        this.tsSlotsBottomBtn.setWinNum({ num: ChristmasProxy.instance.gameOverData.totalPay, isChange: true, isBigWin: true, bigWinTime: time });
        this.tsSlotsBottomBtn.setWinTitle(false);
        let tsChristmasView: ChristmasView = <ChristmasView>this.viewRootNode.getComponent("ChristmasView");
        tsChristmasView.updateSelfMoney();
    }

    /**
     * 设置转盘转动状态
     */
    public setScrollStatus(status: TurntableStatus) {
        this.turntableStatus = status;
    }

    /**
    * 获得转盘转动状态
    */
    public getScrollStatus() {
        return this.turntableStatus;
    }

    /**
     * 播放表盘里某种id的所有item动画
     * @param tableId 
     */
    public playAllItemAnim(tableId: number) {
        for (let index = 0; index < this.scrollNodeArr.length; index++) {
            const scrollNode = this.scrollNodeArr[index];
            for (let i = 0; i < scrollNode.children.length; i++) {
                const item = scrollNode.children[i];
                let tsLuckyCloverItem: ChristmasItem = <ChristmasItem>item.getComponent("ChristmasItem");
                if (tableId == tsLuckyCloverItem.getTableId()) {
                    tsLuckyCloverItem.playSpineAnim();
                }
            }
        }
    }

    /**
     * 检查是否有升级奖励
     * @param callback 没有升级奖励的时候会执行这个回调
     * @returns true表示没有升级奖励 false表示有升级奖励
     */
    public checkLevelRoad(callback: Function): boolean {
        let tsChristmasView: ChristmasView = <ChristmasView>this.viewRootNode.getComponent("ChristmasView");
        let tsCommonTop: ChristmasCommonTop = <ChristmasCommonTop>tsChristmasView.topNode.getComponent(ChristmasCommonTop);
        if (!tsCommonTop.checkShowLevelRoad()) {
            if (callback) {
                callback();
            }
            return true;
        }
        else {
            ChristmasSlotEventManager.instance.emit(ChristmasEventDefine.COMMON_TOP_STATUS_CHANGE, CommonTopStatus.NORMAL);
            return false;
        }
    }

    /**
     * 显示所有符号
     */
    private showAllIconSpriteEx() {
        for (let index = 0; index < this.scrollNodeArr.length; index++) {
            const scrollNode = this.scrollNodeArr[index];
            for (let i = 0; i < scrollNode.children.length; i++) {
                const item = scrollNode.children[i];
                let tsLuckyCloverItem: ChristmasItem = <ChristmasItem>item.getComponent("ChristmasItem");
                tsLuckyCloverItem.getSpriteNode().active = true;
            }
        }
    }

    /**
     * 设置蒙版展示状态
     * @param isShow 是否展示
     */
    public setResultMask(isShow: boolean) {
        this.resultMaskArr.forEach(node => {
            node.active = isShow;
        })
    }

    /**
* 转盘转到开始加速时
*/
    private turnStageSpeedUp(event) {
        this.showScrollOne(event.index);
    }

    /**
    * 隐藏某一列转盘的上轴
    */
    private hideScrollOne(index: number) {
        this.listScroll[index].node.children[1].active = false;
    }

    /**
     * 展示某一列转盘的上轴
     */
    private showScrollOne(index: number) {
        this.listScroll[index].node.children[1].active = true;
    }

}
