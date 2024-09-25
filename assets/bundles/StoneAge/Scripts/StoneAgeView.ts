import { BundleType, CommonTopStatus, SpinBtnStatus, TurntableStatus } from "./BaseFrame/Const/StoneAgeCommonDefine";
import { StoneAgeEventDefine } from "./BaseFrame/Const/StoneAgeEventDefine";
import StoneAgeDialogManager from "./BaseFrame/Manager/StoneAgeDialogManager";
import StoneAgeLogManager from "./BaseFrame/Manager/StoneAgeLogManager";
import { StoneAgeSlotAudioManager } from "./BaseFrame/Manager/StoneAgeSlotAudioManager";
import StoneAgeSlotEventManager from "./BaseFrame/Manager/StoneAgeSlotEventManager";
import SpriteEx from "./BaseFrame/UI/Component/StoneAgeSpriteEx";
import StoneAgeViewBase from "./BaseFrame/UI/View/StoneAgeViewBase";
import StoneAgeCommonTop from "./Common/StoneAgeCommonTop";
import PlayerProxy from "./Common/StoneAgePlayerProxy";
import SlotsBottomBtn from "./Common/StoneAgeSlotsBottomBtn";
import StoneAgeAcitonManager from "./StoneAgeAcitonManager";
import StoneAgeAction from "./StoneAgeAction";
import StoneAgeAnimation from "./StoneAgeAnimation";
import { StoneAgeGameType, StoneAgeSceneStatus, StoneAgeSoundsType, StoneAgeWinType } from "./StoneAgeDefine";
import StoneAgeItem from "./StoneAgeItem";
import StoneAgeOperate from "./StoneAgeOperate";
import StoneAgeProxy from "./StoneAgeProxy";
import StoneAgeScroll from "./StoneAgeScroll";
import StoneAgeTurnTable from "./StoneAgeTurnTable";
const { ccclass, property } = cc._decorator;

@ccclass
export default class StoneAgeView extends StoneAgeViewBase {
    @property(cc.Node)
    bgMask: cc.Node = null;//背景蒙版
    @property(cc.Node)
    topNode: cc.Node = null;
    @property(cc.Node)
    midNode: cc.Node = null;
    @property(cc.Node)
    bottomNode: cc.Node = null;
    @property(cc.Node)
    rightNode: cc.Node = null;
    @property(StoneAgeAnimation)
    tsStoneAgeAnimation: StoneAgeAnimation = null;
    @property(cc.Node)
    conNode: cc.Node = null;//除开背景之外的节点父节点
    @property(SlotsBottomBtn)
    tsSlotsBottomBtn: SlotsBottomBtn = null;
    @property(StoneAgeOperate)
    tsStoneAgeOperate: StoneAgeOperate = null;
    @property(StoneAgeScroll)
    listScroll: Array<StoneAgeScroll> = [];//每个轴

    @property(SpriteEx)
    bgNormalSpriteEx: SpriteEx = null;//背景
    @property(SpriteEx)
    turntableBgSpriteEx: SpriteEx = null;//转盘底

    @property(cc.Node)
    bgNode: cc.Node = null;//背景父节点

    private tsStoneAgeAction: StoneAgeAction = null;//动作执行类
    private spinTs: number;//点击Spin的时间戳
    public tsStoneAgeTurntable: StoneAgeTurnTable = null;

    onDestroy() {
        cc.Tween.stopAllByTarget(this.node);
        this.node.setPosition(0, 0);
        StoneAgeAcitonManager.instance.clean();
        super.onDestroy();
    }

    onLoad() {
        this.tsStoneAgeTurntable = this.node.getComponent("StoneAgeTurnTable");
        this.tsStoneAgeAction = new StoneAgeAction();
        this.tsStoneAgeAction.init(this);
        this.addEvent();
    }

    start() {
        super.start();
    }

    update() {
        this.playAction();
    }

    /**
    *从动作队列里取一个动作来执行
    */
    private playAction() {
        //取出队列里的第一个元素
        let action = StoneAgeAcitonManager.instance.getNextAction();
        //如果该动作为空就直接返回
        if (action == null) {
            return;
        }
        //如果没有帧 就添加一个帧元素
        if (action.frame == null || action.frame == undefined) {
            action.frame = 1;
        }
        this.tsStoneAgeAction.playAction(action);
    }

    preOpen() {
        StoneAgeProxy.instance.clean();
        this.updateSelfMoney();
        this.tsStoneAgeOperate.setButtonCanNotClick();
        this.setAsset();
        this.playBGM();
    }

    onOpen() {
        this.tsSlotsBottomBtn.setNotOperationAnim();
        this.testFreeOrAutoSpin();
    }

    public openAnimation() {
        this.topNode.opacity = 0;
        this.bottomNode.opacity = 0;
        this.rightNode.opacity = 0;
        // this.midNode.opacity = 0;
        this.bgNode.opacity = 0;
        this.midNode.y = 1100;
        let appearTime = 1;
        cc.tween(this.bgNode)
            .to(appearTime, { opacity: 255 }, { easing: "sineIn" })
            .start();
        cc.tween(this.midNode)
            .to(appearTime / 2, { y: 0 }, { easing: 'bounceOut' })
            .start();

        function play() {
            let ts = 0.4;
            this.topNode.y += this.topNode.height;
            this.bottomNode.y -= this.bottomNode.height;
            this.rightNode.x += this.rightNode.width;
            cc.tween(this.topNode)
                .by(ts, { y: -this.topNode.height, opacity: 255 }, { easing: "sineOut" })
                .start();
            cc.tween(this.bottomNode)
                .by(ts, { y: +this.bottomNode.height, opacity: 255 }, { easing: "sineOut" })
                .start();
            cc.tween(this.rightNode)
                .by(ts, { x: -this.rightNode.width, opacity: 255 }, { easing: "sineOut" })
                .call(() => {
                    this.animCompleteCallback();
                })
                .start();
            this.bgMask.opacity = 255;
            cc.tween(this.bgMask)
                .to(ts, { opacity: 0 }, {
                    easing: 'fade'
                })
                .start();
        }
        this.schedule(play, 0.4, 0);//因为widget还没有刷新最新数据
    }

    public onClose() {
        StoneAgeSlotEventManager.instance.off(this);
        this.tsStoneAgeOperate.onClickStopAutoSpin();
        let tsSlotsBtnAnimtion: SlotsBottomBtn = <SlotsBottomBtn>this.tsSlotsBottomBtn.getComponent("SlotsBottomBtn");
        tsSlotsBtnAnimtion.stopSpinSpineAnim();
        StoneAgeAcitonManager.instance.clean();
        this.tsStoneAgeTurntable.cleanResultAnim();
        this.tsSlotsBottomBtn.cancleNotOperationAnim();
    }

    private playBGM() {
        if (!StoneAgeSlotAudioManager.instance.musicOpen) {
            return;
        }
        if (StoneAgeProxy.instance.freeSpinCount != 0) {
            StoneAgeSlotAudioManager.instance.playMusic(BundleType.STONE_AGE, StoneAgeSoundsType.FREE_BGM);
        }
        else {
            StoneAgeSlotAudioManager.instance.playMusic(BundleType.STONE_AGE, StoneAgeSoundsType.BGM);
        }

    }

    /**
     * 注册事件
     */
    private addEvent() {
        StoneAgeSlotEventManager.instance.on(StoneAgeEventDefine.EXIT_ROOM_SUCCESS,
            this.close, this);
        StoneAgeSlotEventManager.instance.on(StoneAgeEventDefine.MUSIC_SWITCH, this.playBGM, this);
        // StoneAgeSlotEventManager.instance.on(StoneAgeEventDefine.RECONNECTION, () => {
        //     this.tsSlotsBottomBtn.setIsAutoBet(false);
        //     this.tsSlotsBottomBtn.setSpinStatus(SpinBtnStatus.SPIN);
        //     if (StoneAgeProxy.instance.freeSpinCount != 0 || (null != StoneAgeProxy.instance.gameOverData && StoneAgeProxy.instance.gameOverData.gameType == StoneAgeGameType.FREE)) {
        //         this.tsSlotsBottomBtn.setSpinStatus(SpinBtnStatus.FREE);
        //     }
        //     this.tsSlotsBottomBtn.setNotOperationAnim();
        //     if (this.tsStoneAgeTurntable.getScrollStatus() == TurntableStatus.STOP) {
        //         this.tsStoneAgeOperate.setButtonCanClick();
        //     }
        // }, this);
        // StoneAgeSlotEventManager.instance.on(StoneAgeEventDefine.UPDATE_START_DATA, () => {

        // }, this);
        // StoneAgeSlotEventManager.instance.on(StoneAgeEventDefine.SOCKET_CONNECT_SUCCESS, () => {
        //     // CommonDeal.instance.syncGameRoomInfo();
        // }, this);
        // StoneAgeSlotEventManager.instance.on(StoneAgeEventDefine.START_SPIN, () => {
        //     // StoneAgeAcitonManager.instance.addAction({ type: StoneAgeActionType.RESULT });
        // }, this);
        StoneAgeSlotEventManager.instance.on(StoneAgeEventDefine.QUIE_SLOTS_ONE_STOP, ({ index, isCopy }) => {
            // StoneAgeAcitonManager.instance.addAction({ type: StoneAgeActionType.STOP_ONE, data: { index: index } });
            this.tsSlotsBottomBtn.setButtonCanClick()
            this.tsSlotsBottomBtn.setWinNum({
                num: StoneAgeProxy.instance.gameOverData.totalPay,
                isChange: false
            });
            // PlayerProxy.instance.gold += StoneAgeProxy.instance.gameOverData.totalPay;
            this.updateSelfMoney();
        }, this);
    }

    /**
     * 更新左上角自己的钱
     * @param num 
     */
    public updateSelfMoney(num: number = -1) {
        let tsCommonTop: StoneAgeCommonTop = <StoneAgeCommonTop>this.topNode.getComponent(StoneAgeCommonTop);
        tsCommonTop.updatePlayerGold(true, num);
    }

    /**
     * 修改部分资源为正常状态资源
     */
    public setNormalSpinAsset() {
        if (StoneAgeProxy.instance.sceneStatus == StoneAgeSceneStatus.NORMAL) {
            return;
        }
        StoneAgeProxy.instance.sceneStatus = StoneAgeSceneStatus.NORMAL;
        this.bgNormalSpriteEx.setImage(BundleType.RESOURCES, "Textures/GameLoading/StoneAge/stone_bg_nor");
        this.turntableBgSpriteEx.setImage(BundleType.STONE_AGE, "Textures/Bg/stone_machine_bg_nor");
        this.tsStoneAgeAnimation.playNormalSpine();
        StoneAgeSlotAudioManager.instance.playMusic(BundleType.STONE_AGE, StoneAgeSoundsType.BGM);
    }

    /**
     * 修改部分资源为免费转资源
     */
    public setFreeSpinAsset() {
        if (StoneAgeProxy.instance.sceneStatus == StoneAgeSceneStatus.FREE) {
            return;
        }
        StoneAgeProxy.instance.sceneStatus = StoneAgeSceneStatus.FREE;
        this.bgNormalSpriteEx.setImage(BundleType.STONE_AGE, "Textures/Bg/stone_bg_free");
        this.turntableBgSpriteEx.setImage(BundleType.STONE_AGE, "Textures/Bg/stone_machine_bg_free");
        this.tsStoneAgeAnimation.playFreeSpine();
        StoneAgeSlotAudioManager.instance.playMusic(BundleType.STONE_AGE, StoneAgeSoundsType.FREE_BGM);
    }

    /**
     * 根据情况设置资源
     */
    public setAsset() {
        if (StoneAgeProxy.instance.freeSpinCount == 0) {
            this.setNormalSpinAsset();
        }
        else {
            this.setFreeSpinAsset();
        }
    }

    /**
     * 转场
     */
    public changeScene(callback: Function) {
        if (StoneAgeProxy.instance.freeSpinCount == 0) {
            if (StoneAgeProxy.instance.sceneStatus != StoneAgeSceneStatus.NORMAL) {
                this.changeSceneAnim(() => {
                    this.setNormalSpinAsset();
                }, () => {
                    if (callback) {
                        callback();
                    }
                })
            }
            else {
                if (callback) {
                    callback();
                }
            }
        }
        else {
            if (StoneAgeProxy.instance.sceneStatus != StoneAgeSceneStatus.FREE) {
                this.changeSceneAnim(() => {
                    this.setFreeSpinAsset();
                }, () => {
                    if (callback) {
                        callback();
                    }
                })
            }
            else {
                if (callback) {
                    callback();
                }
            }
        }
    }

    /**
     *  转场动画
     * @param callback 换资源
     * @param callbackEnd 下一个动作
     */
    public changeSceneAnim(callback: Function, callbackEnd: Function) {
        let disAppearTime = 0.5;
        let appearTime = 1;
        cc.tween(this.bgNode)
            .to(disAppearTime, { opacity: 0 }, { easing: "sineOut" })
            .call(() => {
                if (callback) {
                    callback();
                }
            })
            .to(appearTime, { opacity: 255 }, { easing: "sineIn" })
            .start();
        cc.tween(this.midNode)
            .to(disAppearTime / 2, { y: -1100 }, { easing: "backIn" })
            .call(() => {
                this.midNode.y = 1100;
            })
            .delay(disAppearTime / 2)
            .to(appearTime / 2, { y: 0 }, { easing: "bounceOut" })
            .call(() => {
                if (callbackEnd) {
                    callbackEnd();
                }
            })
            .start();
    }

    /**
     * 判断是否是自动转，会设置对应的状态
     */
    public isAutoSpin() {
        if (this.tsSlotsBottomBtn.getIsAutoBet()) {
            StoneAgeLogManager.instance.info("进入自动转");
            this.tsSlotsBottomBtn.setSpinStatus(SpinBtnStatus.AUTO);
            this.tsSlotsBottomBtn.onClickSpin()
        }
        else {
            this.tsSlotsBottomBtn.setSpinStatus(SpinBtnStatus.SPIN);
        }
    }



    /**
     * 播放大奖动画
     */
    public playBigWinAnim(callback: Function) {
        if (null != StoneAgeProxy.instance.gameOverData && StoneAgeProxy.instance.gameOverData.winType > StoneAgeWinType.WIN) {
            StoneAgeDialogManager.instance.openDialog(BundleType.STONE_AGE, "Prefabs/WinDialog/StoneAgeWinDialog", {
                winNum: StoneAgeProxy.instance.gameOverData.totalPay,
                callback: () => {
                    if (callback) {
                        callback();
                    }
                }
            });
        }
        else {
            if (callback) {
                callback();
            }
        }
    }

    /**
     * 播放获得免费转动画
     */
    public playGetFreeAnim(callback: Function) {
        if (null != StoneAgeProxy.instance.gameOverData && StoneAgeProxy.instance.gameOverData.free > 0) {
            StoneAgeDialogManager.instance.openDialog(BundleType.STONE_AGE, "Prefabs/FreeDialog/StoneAgeFreeDialog", {
                num: StoneAgeProxy.instance.gameOverData.free,
                callback: () => {
                    if (callback) {
                        callback();
                    }
                }
            });
        }
        else {
            if (callback) {
                callback();
            }
        }
    }

    /**
     * 播放免费转结算动画
     */
    public playFreeResultAnim(callback: Function) {
        if (null != StoneAgeProxy.instance.gameOverData && StoneAgeProxy.instance.gameOverData.freeGameSettle) {
            StoneAgeDialogManager.instance.openDialog(BundleType.STONE_AGE, "Prefabs/FreeDialog/StoneAgeFreeResultDialog", {
                num: StoneAgeProxy.instance.gameOverData.freeGameSettleAmount,
                callback: () => {
                    if (callback) {
                        callback();
                    }
                }
            });
        }
        else {
            if (callback) {
                callback();
            }
        }
    }

    /**
     * 检测有无免费转
     */
    public testFreeOrAutoSpin() {
        if (StoneAgeProxy.instance.freeSpinCount != 0) {
            this.tsSlotsBottomBtn.setSpinStatus(SpinBtnStatus.FREE);
            this.tsSlotsBottomBtn.freeSpin();
        }
        else {
            this.isAutoSpinOnly();
        }
    }

    /**
     * 仅仅判断是否是自动转
     */
    public isAutoSpinOnly() {
        if (this.tsSlotsBottomBtn.getIsAutoBet()) {
            StoneAgeLogManager.instance.info("进入自动转");
            this.tsSlotsBottomBtn.setSpinStatus(SpinBtnStatus.AUTO);
            this.tsSlotsBottomBtn.onClickSpin();
        }
        else {
            StoneAgeLogManager.instance.info("没有自动转");
            this.tsStoneAgeOperate.setButtonCanClick();
            this.tsSlotsBottomBtn.setSpinStatus(SpinBtnStatus.SPIN);
        }
    }

    /**
     * 检查是否有升级奖励
     * @param callback 没有升级奖励的时候会执行这个回调
     * @returns true表示没有升级奖励 false表示有升级奖励
     */
    public checkLevelRoad(callback: Function): boolean {
        let tsCommonTop: StoneAgeCommonTop = <StoneAgeCommonTop>this.topNode.getComponent(StoneAgeCommonTop);
        if (!tsCommonTop.checkShowLevelRoad()) {
            if (callback) {
                callback();
            }
            return true;
        }
        else {
            StoneAgeSlotEventManager.instance.emit(StoneAgeEventDefine.COMMON_TOP_STATUS_CHANGE, CommonTopStatus.NORMAL);
            return false;
        }
    }

    /**
     * 增加每局间隔
     */
    public addInterval(callback: Function) {
        let delay = 0.5;
        this.setTimeOut(() => {
            if (callback) {
                callback();
            }
        }, delay);
    }

    /**
     * 转轴转动
     */
    public startWheel() {
        this.spinTs = new Date().getTime();
        let tsLuckyCloverTurnTable: StoneAgeTurnTable = <StoneAgeTurnTable>this.node.getComponent("StoneAgeTurnTable");
        let interval = 0;
        for (let index = 0; index < this.listScroll.length; index++) {
            const element = this.listScroll[index];
            this.setTimeOut(() => {
                element.startWheel(0);
            }, interval * index);
        }
        tsLuckyCloverTurnTable.setScrollStatus(TurntableStatus.SCROLLING);
    }

    /**
     * 获取点击spin的时间戳
     */
    public getSpinTs() {
        return this.spinTs;
    }

    /**
    * 错误的时候把提前扣的钱加回去
    */
    public restoreSelfMoney() {
        let tsCommonTop: StoneAgeCommonTop = <StoneAgeCommonTop>this.topNode.getComponent(StoneAgeCommonTop);
        tsCommonTop.updatePlayerGold(true, PlayerProxy.instance.playerVO.gold);
    }

    /**
     * 根据情况设置按钮是否为可点击状态
     */
    public isCanClick() {
        if (!this.tsSlotsBottomBtn.getIsAutoBet() && StoneAgeProxy.instance.nextGameType == StoneAgeGameType.NORMAL) {
            this.tsStoneAgeOperate.setButtonCanClick();
        }
    }

    /**
     * 设置每个符号的透明度为满值
     */
    public setOpacityFull() {
        for (let index = 0; index < this.listScroll.length; index++) {
            const row = this.listScroll[index];
            const nodeList = row.node.children[0];
            for (let i = 0; i < nodeList.children.length; i++) {
                const node = nodeList.children[i];
                let tsStoneAgeItem: StoneAgeItem = <StoneAgeItem>node.getComponent("StoneAgeItem");
                tsStoneAgeItem.setOpacityFull();
            }
        }
    }

}
