import { BundleType, CommonTopStatus, SpinBtnStatus, TurntableStatus } from "./BaseFrame/Const/RichCommonDefine";
import { RichEventDefine } from "./BaseFrame/Const/RichEventDefine";
import RichDialogManager from "./BaseFrame/Manager/RichDialogManager";
import RichLogManager from "./BaseFrame/Manager/RichLogManager";
import { RichSlotAudioManager } from "./BaseFrame/Manager/RichSlotAudioManager";
import RichSlotEventManager from "./BaseFrame/Manager/RichSlotEventManager";
import SpriteEx from "./BaseFrame/UI/Component/RichSpriteEx";
import RichViewBase from "./BaseFrame/UI/View/RichViewBase";
import RichCommonTop from "./Common/RichCommonTop";
import PlayerProxy from "./Common/RichPlayerProxy";
import SlotsBottomBtn from "./Common/RichSlotsBottomBtn";
import RichAcitonManager from "./RichAcitonManager";
import RichAction from "./RichAction";
import RichAnimation from "./RichAnimation";
import { RichGameType, RichSceneStatus, RichSoundsType, RichWinType } from "./RichDefine";
import RichItem from "./RichItem";
import RichOperate from "./RichOperate";
import RichProxy from "./RichProxy";
import RichScroll from "./RichScroll";
import RichTurnTable from "./RichTurnTable";
const { ccclass, property } = cc._decorator;

@ccclass
export default class RichView extends RichViewBase {
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
    @property(RichAnimation)
    tsRichAnimation: RichAnimation = null;
    @property(cc.Node)
    conNode: cc.Node = null;//除开背景之外的节点父节点
    @property(SlotsBottomBtn)
    tsSlotsBottomBtn: SlotsBottomBtn = null;
    @property(RichOperate)
    tsRichOperate: RichOperate = null;
    @property(RichScroll)
    listScroll: Array<RichScroll> = [];//每个轴

    @property(SpriteEx)
    bgNormalSpriteEx: SpriteEx = null;//背景
    @property(SpriteEx)
    turntableBgSpriteEx: SpriteEx = null;//转盘底

    @property(cc.Node)
    bgNode: cc.Node = null;//背景父节点

    private tsRichAction: RichAction = null;//动作执行类
    private spinTs: number;//点击Spin的时间戳
    public tsRichTurntable: RichTurnTable = null;

    onDestroy() {
        cc.Tween.stopAllByTarget(this.node);
        this.node.setPosition(0, 0);
        RichAcitonManager.instance.clean();
        super.onDestroy();
    }

    onLoad() {
        this.tsRichTurntable = this.node.getComponent("RichTurnTable");
        this.tsRichAction = new RichAction();
        this.tsRichAction.init(this);
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
        let action = RichAcitonManager.instance.getNextAction();
        //如果该动作为空就直接返回
        if (action == null) {
            return;
        }
        //如果没有帧 就添加一个帧元素
        if (action.frame == null || action.frame == undefined) {
            action.frame = 1;
        }
        this.tsRichAction.playAction(action);
    }

    preOpen() {
        RichProxy.instance.clean();
        this.updateSelfMoney();
        this.tsRichOperate.setButtonCanNotClick();
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
        RichSlotEventManager.instance.off(this);
        this.tsRichOperate.onClickStopAutoSpin();
        let tsSlotsBtnAnimtion: SlotsBottomBtn = <SlotsBottomBtn>this.tsSlotsBottomBtn.getComponent("SlotsBottomBtn");
        tsSlotsBtnAnimtion.stopSpinSpineAnim();
        RichAcitonManager.instance.clean();
        this.tsRichTurntable.cleanResultAnim();
        this.tsSlotsBottomBtn.cancleNotOperationAnim();
    }

    private playBGM() {
        if (!RichSlotAudioManager.instance.musicOpen) {
            return;
        }
        if (RichProxy.instance.freeSpinCount != 0) {
            RichSlotAudioManager.instance.playMusic(BundleType.STONE_AGE, RichSoundsType.FREE_BGM);
        }
        else {
            RichSlotAudioManager.instance.playMusic(BundleType.STONE_AGE, RichSoundsType.BGM);
        }

    }

    /**
     * 注册事件
     */
    private addEvent() {
        RichSlotEventManager.instance.on(RichEventDefine.EXIT_ROOM_SUCCESS,
            this.close, this);
        RichSlotEventManager.instance.on(RichEventDefine.MUSIC_SWITCH, this.playBGM, this);
        // RichSlotEventManager.instance.on(RichEventDefine.RECONNECTION, () => {
        //     this.tsSlotsBottomBtn.setIsAutoBet(false);
        //     this.tsSlotsBottomBtn.setSpinStatus(SpinBtnStatus.SPIN);
        //     if (RichProxy.instance.freeSpinCount != 0 || (null != RichProxy.instance.gameOverData && RichProxy.instance.gameOverData.gameType == RichGameType.FREE)) {
        //         this.tsSlotsBottomBtn.setSpinStatus(SpinBtnStatus.FREE);
        //     }
        //     this.tsSlotsBottomBtn.setNotOperationAnim();
        //     if (this.tsRichTurntable.getScrollStatus() == TurntableStatus.STOP) {
        //         this.tsRichOperate.setButtonCanClick();
        //     }
        // }, this);
        // RichSlotEventManager.instance.on(RichEventDefine.UPDATE_START_DATA, () => {

        // }, this);
        // RichSlotEventManager.instance.on(RichEventDefine.SOCKET_CONNECT_SUCCESS, () => {
        //     // CommonDeal.instance.syncGameRoomInfo();
        // }, this);
        // RichSlotEventManager.instance.on(RichEventDefine.START_SPIN, () => {
        //     // RichAcitonManager.instance.addAction({ type: RichActionType.RESULT });
        // }, this);
        RichSlotEventManager.instance.on(RichEventDefine.QUIE_SLOTS_ONE_STOP, ({ index, isCopy }) => {
            // RichAcitonManager.instance.addAction({ type: RichActionType.STOP_ONE, data: { index: index } });
            this.tsSlotsBottomBtn.setButtonCanClick()
            this.tsSlotsBottomBtn.setWinNum({
                num: RichProxy.instance.gameOverData.totalPay,
                isChange: false
            });
            // PlayerProxy.instance.gold += RichProxy.instance.gameOverData.totalPay;
            this.updateSelfMoney();
        }, this);
    }

    /**
     * 更新左上角自己的钱
     * @param num 
     */
    public updateSelfMoney(num: number = -1) {
        let tsCommonTop: RichCommonTop = <RichCommonTop>this.topNode.getComponent(RichCommonTop);
        tsCommonTop.updatePlayerGold(true, num);
    }

    /**
     * 修改部分资源为正常状态资源
     */
    public setNormalSpinAsset() {
        if (RichProxy.instance.sceneStatus == RichSceneStatus.NORMAL) {
            return;
        }
        RichProxy.instance.sceneStatus = RichSceneStatus.NORMAL;
        this.bgNormalSpriteEx.setImage(BundleType.RESOURCES, "Textures/GameLoading/Rich/stone_bg_nor");
        this.turntableBgSpriteEx.setImage(BundleType.STONE_AGE, "Textures/Bg/stone_machine_bg_nor");
        this.tsRichAnimation.playNormalSpine();
        RichSlotAudioManager.instance.playMusic(BundleType.STONE_AGE, RichSoundsType.BGM);
    }

    /**
     * 修改部分资源为免费转资源
     */
    public setFreeSpinAsset() {
        if (RichProxy.instance.sceneStatus == RichSceneStatus.FREE) {
            return;
        }
        RichProxy.instance.sceneStatus = RichSceneStatus.FREE;
        this.bgNormalSpriteEx.setImage(BundleType.STONE_AGE, "Textures/Bg/stone_bg_free");
        this.turntableBgSpriteEx.setImage(BundleType.STONE_AGE, "Textures/Bg/stone_machine_bg_free");
        this.tsRichAnimation.playFreeSpine();
        RichSlotAudioManager.instance.playMusic(BundleType.STONE_AGE, RichSoundsType.FREE_BGM);
    }

    /**
     * 根据情况设置资源
     */
    public setAsset() {
        if (RichProxy.instance.freeSpinCount == 0) {
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
        if (RichProxy.instance.freeSpinCount == 0) {
            if (RichProxy.instance.sceneStatus != RichSceneStatus.NORMAL) {
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
            if (RichProxy.instance.sceneStatus != RichSceneStatus.FREE) {
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
            RichLogManager.instance.info("进入自动转");
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
        if (null != RichProxy.instance.gameOverData && RichProxy.instance.gameOverData.winType > RichWinType.WIN) {
            RichDialogManager.instance.openDialog(BundleType.STONE_AGE, "Prefabs/WinDialog/RichWinDialog", {
                winNum: RichProxy.instance.gameOverData.totalPay,
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
        if (null != RichProxy.instance.gameOverData && RichProxy.instance.gameOverData.free > 0) {
            RichDialogManager.instance.openDialog(BundleType.STONE_AGE, "Prefabs/FreeDialog/RichFreeDialog", {
                num: RichProxy.instance.gameOverData.free,
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
        if (null != RichProxy.instance.gameOverData && RichProxy.instance.gameOverData.freeGameSettle) {
            RichDialogManager.instance.openDialog(BundleType.STONE_AGE, "Prefabs/FreeDialog/RichFreeResultDialog", {
                num: RichProxy.instance.gameOverData.freeGameSettleAmount,
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
        if (RichProxy.instance.freeSpinCount != 0) {
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
            RichLogManager.instance.info("进入自动转");
            this.tsSlotsBottomBtn.setSpinStatus(SpinBtnStatus.AUTO);
            this.tsSlotsBottomBtn.onClickSpin();
        }
        else {
            RichLogManager.instance.info("没有自动转");
            this.tsRichOperate.setButtonCanClick();
            this.tsSlotsBottomBtn.setSpinStatus(SpinBtnStatus.SPIN);
        }
    }

    /**
     * 检查是否有升级奖励
     * @param callback 没有升级奖励的时候会执行这个回调
     * @returns true表示没有升级奖励 false表示有升级奖励
     */
    public checkLevelRoad(callback: Function): boolean {
        let tsCommonTop: RichCommonTop = <RichCommonTop>this.topNode.getComponent(RichCommonTop);
        if (!tsCommonTop.checkShowLevelRoad()) {
            if (callback) {
                callback();
            }
            return true;
        }
        else {
            RichSlotEventManager.instance.emit(RichEventDefine.COMMON_TOP_STATUS_CHANGE, CommonTopStatus.NORMAL);
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
        let tsLuckyCloverTurnTable: RichTurnTable = <RichTurnTable>this.node.getComponent("RichTurnTable");
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
        let tsCommonTop: RichCommonTop = <RichCommonTop>this.topNode.getComponent(RichCommonTop);
        tsCommonTop.updatePlayerGold(true, PlayerProxy.instance.playerVO.gold);
    }

    /**
     * 根据情况设置按钮是否为可点击状态
     */
    public isCanClick() {
        if (!this.tsSlotsBottomBtn.getIsAutoBet() && RichProxy.instance.nextGameType == RichGameType.NORMAL) {
            this.tsRichOperate.setButtonCanClick();
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
                let tsRichItem: RichItem = <RichItem>node.getComponent("RichItem");
                tsRichItem.setOpacityFull();
            }
        }
    }

}
