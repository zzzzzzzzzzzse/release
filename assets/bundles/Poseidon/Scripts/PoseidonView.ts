import { BundleType, CommonTopStatus, SpinBtnStatus, TurntableStatus } from "./BaseFrame/Const/PoseidonCommonDefine";
import { PoseidonEventDefine } from "./BaseFrame/Const/PoseidonEventDefine";
import PoseidonDialogManager from "./BaseFrame/Manager/PoseidonDialogManager";
import PoseidonLogManager from "./BaseFrame/Manager/PoseidonLogManager";
import { PoseidonSlotAudioManager } from "./BaseFrame/Manager/PoseidonSlotAudioManager";
import PoseidonSlotEventManager from "./BaseFrame/Manager/PoseidonSlotEventManager";
import SpriteEx from "./BaseFrame/UI/Component/PoseidonSpriteEx";
import PoseidonViewBase from "./BaseFrame/UI/View/PoseidonViewBase";
import PoseidonCommonTop from "./Common/PoseidonCommonTop";
import PlayerProxy from "./Common/PoseidonPlayerProxy";
import SlotsBottomBtn from "./Common/PoseidonSlotsBottomBtn";
import PoseidonAcitonManager from "./PoseidonAcitonManager";
import PoseidonAction from "./PoseidonAction";
import PoseidonAnimation from "./PoseidonAnimation";
import { PoseidonGameType, PoseidonSceneStatus, PoseidonSoundsType, PoseidonWinType } from "./PoseidonDefine";
import PoseidonItem from "./PoseidonItem";
import PoseidonOperate from "./PoseidonOperate";
import PoseidonProxy from "./PoseidonProxy";
import PoseidonScroll from "./PoseidonScroll";
import PoseidonTurnTable from "./PoseidonTurnTable";
const { ccclass, property } = cc._decorator;

@ccclass
export default class PoseidonView extends PoseidonViewBase {
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
    @property(PoseidonAnimation)
    tsPoseidonAnimation: PoseidonAnimation = null;
    @property(cc.Node)
    conNode: cc.Node = null;//除开背景之外的节点父节点
    @property(SlotsBottomBtn)
    tsSlotsBottomBtn: SlotsBottomBtn = null;
    @property(PoseidonOperate)
    tsPoseidonOperate: PoseidonOperate = null;
    @property(PoseidonScroll)
    listScroll: Array<PoseidonScroll> = [];//每个轴

    @property(SpriteEx)
    bgNormalSpriteEx: SpriteEx = null;//背景
    @property(SpriteEx)
    turntableBgSpriteEx: SpriteEx = null;//转盘底

    @property(cc.Node)
    bgNode: cc.Node = null;//背景父节点

    private tsPoseidonAction: PoseidonAction = null;//动作执行类
    private spinTs: number;//点击Spin的时间戳
    public tsPoseidonTurntable: PoseidonTurnTable = null;

    onDestroy() {
        cc.Tween.stopAllByTarget(this.node);
        this.node.setPosition(0, 0);
        PoseidonAcitonManager.instance.clean();
        super.onDestroy();
    }

    onLoad() {
        this.tsPoseidonTurntable = this.node.getComponent("PoseidonTurnTable");
        this.tsPoseidonAction = new PoseidonAction();
        this.tsPoseidonAction.init(this);
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
        let action = PoseidonAcitonManager.instance.getNextAction();
        //如果该动作为空就直接返回
        if (action == null) {
            return;
        }
        //如果没有帧 就添加一个帧元素
        if (action.frame == null || action.frame == undefined) {
            action.frame = 1;
        }
        this.tsPoseidonAction.playAction(action);
    }

    preOpen() {
        PoseidonProxy.instance.clean();
        this.updateSelfMoney();
        this.tsPoseidonOperate.setButtonCanNotClick();
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
        PoseidonSlotEventManager.instance.off(this);
        this.tsPoseidonOperate.onClickStopAutoSpin();
        let tsSlotsBtnAnimtion: SlotsBottomBtn = <SlotsBottomBtn>this.tsSlotsBottomBtn.getComponent("SlotsBottomBtn");
        tsSlotsBtnAnimtion.stopSpinSpineAnim();
        PoseidonAcitonManager.instance.clean();
        this.tsPoseidonTurntable.cleanResultAnim();
        this.tsSlotsBottomBtn.cancleNotOperationAnim();
    }

    private playBGM() {
        if (!PoseidonSlotAudioManager.instance.musicOpen) {
            return;
        }
        if (PoseidonProxy.instance.freeSpinCount != 0) {
            PoseidonSlotAudioManager.instance.playMusic(BundleType.STONE_AGE, PoseidonSoundsType.FREE_BGM);
        }
        else {
            PoseidonSlotAudioManager.instance.playMusic(BundleType.STONE_AGE, PoseidonSoundsType.BGM);
        }

    }

    /**
     * 注册事件
     */
    private addEvent() {
        PoseidonSlotEventManager.instance.on(PoseidonEventDefine.EXIT_ROOM_SUCCESS,
            this.close, this);
        PoseidonSlotEventManager.instance.on(PoseidonEventDefine.MUSIC_SWITCH, this.playBGM, this);
        // PoseidonSlotEventManager.instance.on(PoseidonEventDefine.RECONNECTION, () => {
        //     this.tsSlotsBottomBtn.setIsAutoBet(false);
        //     this.tsSlotsBottomBtn.setSpinStatus(SpinBtnStatus.SPIN);
        //     if (PoseidonProxy.instance.freeSpinCount != 0 || (null != PoseidonProxy.instance.gameOverData && PoseidonProxy.instance.gameOverData.gameType == PoseidonGameType.FREE)) {
        //         this.tsSlotsBottomBtn.setSpinStatus(SpinBtnStatus.FREE);
        //     }
        //     this.tsSlotsBottomBtn.setNotOperationAnim();
        //     if (this.tsPoseidonTurntable.getScrollStatus() == TurntableStatus.STOP) {
        //         this.tsPoseidonOperate.setButtonCanClick();
        //     }
        // }, this);
        // PoseidonSlotEventManager.instance.on(PoseidonEventDefine.UPDATE_START_DATA, () => {

        // }, this);
        // PoseidonSlotEventManager.instance.on(PoseidonEventDefine.SOCKET_CONNECT_SUCCESS, () => {
        //     // CommonDeal.instance.syncGameRoomInfo();
        // }, this);
        // PoseidonSlotEventManager.instance.on(PoseidonEventDefine.START_SPIN, () => {
        //     // PoseidonAcitonManager.instance.addAction({ type: PoseidonActionType.RESULT });
        // }, this);
        PoseidonSlotEventManager.instance.on(PoseidonEventDefine.QUIE_SLOTS_ONE_STOP, ({ index, isCopy }) => {
            // PoseidonAcitonManager.instance.addAction({ type: PoseidonActionType.STOP_ONE, data: { index: index } });
            this.tsSlotsBottomBtn.setButtonCanClick()
            this.tsSlotsBottomBtn.setWinNum({
                num: PoseidonProxy.instance.gameOverData.totalPay,
                isChange: false
            });
            // PlayerProxy.instance.gold += PoseidonProxy.instance.gameOverData.totalPay;
            this.updateSelfMoney();
        }, this);
    }

    /**
     * 更新左上角自己的钱
     * @param num 
     */
    public updateSelfMoney(num: number = -1) {
        let tsCommonTop: PoseidonCommonTop = <PoseidonCommonTop>this.topNode.getComponent(PoseidonCommonTop);
        tsCommonTop.updatePlayerGold(true, num);
    }

    /**
     * 修改部分资源为正常状态资源
     */
    public setNormalSpinAsset() {
        if (PoseidonProxy.instance.sceneStatus == PoseidonSceneStatus.NORMAL) {
            return;
        }
        PoseidonProxy.instance.sceneStatus = PoseidonSceneStatus.NORMAL;
        this.bgNormalSpriteEx.setImage(BundleType.RESOURCES, "Textures/GameLoading/Poseidon/stone_bg_nor");
        this.turntableBgSpriteEx.setImage(BundleType.STONE_AGE, "Textures/Bg/stone_machine_bg_nor");
        this.tsPoseidonAnimation.playNormalSpine();
        PoseidonSlotAudioManager.instance.playMusic(BundleType.STONE_AGE, PoseidonSoundsType.BGM);
    }

    /**
     * 修改部分资源为免费转资源
     */
    public setFreeSpinAsset() {
        if (PoseidonProxy.instance.sceneStatus == PoseidonSceneStatus.FREE) {
            return;
        }
        PoseidonProxy.instance.sceneStatus = PoseidonSceneStatus.FREE;
        this.bgNormalSpriteEx.setImage(BundleType.STONE_AGE, "Textures/Bg/stone_bg_free");
        this.turntableBgSpriteEx.setImage(BundleType.STONE_AGE, "Textures/Bg/stone_machine_bg_free");
        this.tsPoseidonAnimation.playFreeSpine();
        PoseidonSlotAudioManager.instance.playMusic(BundleType.STONE_AGE, PoseidonSoundsType.FREE_BGM);
    }

    /**
     * 根据情况设置资源
     */
    public setAsset() {
        if (PoseidonProxy.instance.freeSpinCount == 0) {
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
        if (PoseidonProxy.instance.freeSpinCount == 0) {
            if (PoseidonProxy.instance.sceneStatus != PoseidonSceneStatus.NORMAL) {
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
            if (PoseidonProxy.instance.sceneStatus != PoseidonSceneStatus.FREE) {
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
            PoseidonLogManager.instance.info("进入自动转");
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
        if (null != PoseidonProxy.instance.gameOverData && PoseidonProxy.instance.gameOverData.winType > PoseidonWinType.WIN) {
            PoseidonDialogManager.instance.openDialog(BundleType.STONE_AGE, "Prefabs/WinDialog/PoseidonWinDialog", {
                winNum: PoseidonProxy.instance.gameOverData.totalPay,
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
        if (null != PoseidonProxy.instance.gameOverData && PoseidonProxy.instance.gameOverData.free > 0) {
            PoseidonDialogManager.instance.openDialog(BundleType.STONE_AGE, "Prefabs/FreeDialog/PoseidonFreeDialog", {
                num: PoseidonProxy.instance.gameOverData.free,
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
        if (null != PoseidonProxy.instance.gameOverData && PoseidonProxy.instance.gameOverData.freeGameSettle) {
            PoseidonDialogManager.instance.openDialog(BundleType.STONE_AGE, "Prefabs/FreeDialog/PoseidonFreeResultDialog", {
                num: PoseidonProxy.instance.gameOverData.freeGameSettleAmount,
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
        if (PoseidonProxy.instance.freeSpinCount != 0) {
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
            PoseidonLogManager.instance.info("进入自动转");
            this.tsSlotsBottomBtn.setSpinStatus(SpinBtnStatus.AUTO);
            this.tsSlotsBottomBtn.onClickSpin();
        }
        else {
            PoseidonLogManager.instance.info("没有自动转");
            this.tsPoseidonOperate.setButtonCanClick();
            this.tsSlotsBottomBtn.setSpinStatus(SpinBtnStatus.SPIN);
        }
    }

    /**
     * 检查是否有升级奖励
     * @param callback 没有升级奖励的时候会执行这个回调
     * @returns true表示没有升级奖励 false表示有升级奖励
     */
    public checkLevelRoad(callback: Function): boolean {
        let tsCommonTop: PoseidonCommonTop = <PoseidonCommonTop>this.topNode.getComponent(PoseidonCommonTop);
        if (!tsCommonTop.checkShowLevelRoad()) {
            if (callback) {
                callback();
            }
            return true;
        }
        else {
            PoseidonSlotEventManager.instance.emit(PoseidonEventDefine.COMMON_TOP_STATUS_CHANGE, CommonTopStatus.NORMAL);
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
        let tsLuckyCloverTurnTable: PoseidonTurnTable = <PoseidonTurnTable>this.node.getComponent("PoseidonTurnTable");
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
        let tsCommonTop: PoseidonCommonTop = <PoseidonCommonTop>this.topNode.getComponent(PoseidonCommonTop);
        tsCommonTop.updatePlayerGold(true, PlayerProxy.instance.playerVO.gold);
    }

    /**
     * 根据情况设置按钮是否为可点击状态
     */
    public isCanClick() {
        if (!this.tsSlotsBottomBtn.getIsAutoBet() && PoseidonProxy.instance.nextGameType == PoseidonGameType.NORMAL) {
            this.tsPoseidonOperate.setButtonCanClick();
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
                let tsPoseidonItem: PoseidonItem = <PoseidonItem>node.getComponent("PoseidonItem");
                tsPoseidonItem.setOpacityFull();
            }
        }
    }

}
