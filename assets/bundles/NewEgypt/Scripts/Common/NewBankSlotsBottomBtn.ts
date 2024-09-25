
import { BundleType, CommonTopStatus, GuideGroup, MaxStatus, SlotsViewScaleStatus, SoundsType, SpinAnimStatus, SpinBtnStatus } from "../BaseFrame/Const/NewBankCommonDefine";
import { NewBankEventDefine } from "../BaseFrame/Const/NewBankEventDefine";
import NewBankDeviceManager from "../BaseFrame/Manager/NewBankDeviceManager";
import { NewBankSlotAudioManager } from "../BaseFrame/Manager/NewBankSlotAudioManager";
import NewBankSlotEventManager from "../BaseFrame/Manager/NewBankSlotEventManager";
// import GuideManager from "../BaseFrame/Manager/GuideManager";
import NewBankLogManager from "../BaseFrame/Manager/NewBankLogManager";
import NewBankSlotResManager from "../BaseFrame/Manager/NewBankSlotResManager";
import NewBankTipsManager from "../BaseFrame/Manager/NewBankTipsManager";
import ButtonEx from "../BaseFrame/UI/Component/NewBankButtonEx";
import NewBankLabelEx from "../BaseFrame/UI/Component/NewBankLabelEx";
import SpineEx, { SPINE_END } from "../BaseFrame/UI/Component/NewBankSpineEx";
import NewBankComponentBase from "../BaseFrame/UI/ComponentBase/NewBankComponentBase";
import NewBankProxy from "../NewBankProxy";
import NewBankCommonTop from "./NewBankCommonTop";
// import GuideProxy from "./GuideProxy";
import PlayerProxy from "./NewBankPlayerProxy";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewBankSlotsBottomBtn extends NewBankComponentBase {
    @property(ButtonEx)
    spinBigButtonEx: ButtonEx = null;//放大状态的spin按钮
    @property(ButtonEx)
    spinSmallButtonEx: ButtonEx = null;//缩小状态的spin按钮
    @property(cc.Node)
    spinBigSpriteNode: cc.Node = null;//放大状态的spin图片
    @property(cc.Node)
    spinSmallSpriteNode: cc.Node = null;//缩小状态的spin图片

    @property(ButtonEx)
    bigAutoButtonEx: ButtonEx = null;//放大状态的自动按钮
    @property(ButtonEx)
    smallAutoButtonEx: ButtonEx = null;//缩小状态的自动按钮
    @property(cc.Node)
    bigAutoSpriteNode: cc.Node = null;//放大状态的自动图片
    @property(cc.Node)
    smallAutoSpriteNode: cc.Node = null;//缩小状态的自动图片

    @property(ButtonEx)
    bigFreeButtonEx: ButtonEx = null;//放大状态的免费转按钮
    @property(ButtonEx)
    smallFreeButtonEx: ButtonEx = null;//缩小状态的免费转按钮
    @property(cc.Node)
    bigFreeSpriteNode: cc.Node = null;//放大状态的免费转图片
    @property(cc.Node)
    smallFreeSpriteNode: cc.Node = null;//缩小状态的免费转图片

    @property(ButtonEx)
    maxBetSmallButton: ButtonEx = null;//缩小状态的满注按钮
    @property(ButtonEx)
    maxBetBigButton: ButtonEx = null;//放大状态的满注按钮
    @property(cc.Node)
    maxSmallSpriteNode: cc.Node = null;//缩小状态的满注标识
    @property(cc.Node)
    maxBigSpriteNode: cc.Node = null;//放大状态的满注标识
    @property(cc.Node)
    maxBetSpriteNode: cc.Node = null;//放大状态的下注标识

    @property(ButtonEx)
    maxedBetSmallButton: ButtonEx = null;//缩小状态且满注时的满注按钮
    @property(ButtonEx)
    maxedBetBigButton: ButtonEx = null;//放大状态且满注时的满注按钮
    @property(cc.Node)
    maxMSmallSpriteNode: cc.Node = null;//缩小状态且满注时的满注标识
    @property(cc.Node)
    maxMBigSpriteNode: cc.Node = null;//放大状态且满注时的满注标识
    @property(cc.Node)
    maxMBetSpriteNode: cc.Node = null;//放大状态且满注时的下注标识



    @property(ButtonEx)
    bigAddButtonEx: ButtonEx = null;//放大状态加注
    @property(ButtonEx)
    bigSubButtonEx: ButtonEx = null;//放大状态减注
    @property(ButtonEx)
    smallAddButtonEx: ButtonEx = null;//缩小状态加注
    @property(ButtonEx)
    smallSubButtonEx: ButtonEx = null;//缩小状态减注
    @property(cc.Node)
    betTitleNode: cc.Node = null;//下注标题
    @property(cc.Node)
    bigBetBgNode: cc.Node = null;//放大状态下注背景
    @property(cc.Node)
    smallBetBgNode: cc.Node = null;//缩小状态下注背景

    @property(cc.Node)
    bigWinBgNode: cc.Node = null;//放大状态Win背景
    @property(cc.Node)
    smallWinBgNode: cc.Node = null;//缩小状态Win背景
    @property(cc.Node)
    winTitleNode: cc.Node = null;//Win标题
    @property(cc.Node)
    winNumLabelNode: cc.Node = null;//赢得钱
    @property(cc.Node)
    winLight: cc.Node = null;//赢钱光效
    @property(cc.Node)
    goldConNode: cc.Node = null;//金币动画父节点
    @property(cc.Prefab)
    goldPrefab: cc.Prefab = null;//金币预制

    @property(cc.Node)
    spinNode: cc.Node = null;//spin按钮父节点
    @property(cc.Node)
    autoNode: cc.Node = null;//auto按钮父节点
    @property(cc.Node)
    freeNode: cc.Node = null;//free按钮父节点
    @property(cc.Node)
    maxNode: cc.Node = null;//未满注Max按钮父节点
    @property(cc.Node)
    maxMNode: cc.Node = null;//已满注Max按钮父节点

    @property(SpineEx)
    spinSpineEx: SpineEx = null;//缩小状态spin按钮动画

    @property(cc.Node)
    spinParticleNode: cc.Node = null;//spin经验粒子父节点
    @property(cc.Node)
    spinParticleOneNode: cc.Node = null;//spin经验粒子
    @property(cc.Node)
    spinParticleTwoNode: cc.Node = null;//spin经验粒子2

    @property(cc.Node)
    betLabelNode: cc.Node = null;//下注金额

    @property(cc.Node)
    topNode: cc.Node = null;
    @property(cc.Node)
    topXPStarNode: cc.Node = null;//顶部经验星星

    private currScaleStatus: SlotsViewScaleStatus = SlotsViewScaleStatus.SMALL;//当前放大缩小状态
    private currSpinStatus: SpinBtnStatus = SpinBtnStatus.SPIN;//spin按钮状态
    private currSpinSpineStatus: SpinAnimStatus = SpinAnimStatus.NULL;//spin动画状态
    private isCanClick: boolean = true;//是否能点击
    private isOpen: boolean = true;//界面是否打开
    private isAutoBet: boolean = false;//是否是自动投注状态
    private notOperationAnimTimerId: number = -1;//无操作动画事件ID
    private _currBetRangeIndex: number = 0;//当前投注范围下标
    private _onClickSpinCallback: Function = null;//spin按钮点击回调
    private _onClickAddBetCallback: Function = null;//spin按钮点击回调
    private _onLongPressAddBetCallback: Function = null;//spin按钮点击回调
    private _onClickSubBetCallback: Function = null;//spin按钮点击回调
    private _onLongPressSubBetCallback: Function = null;//spin按钮点击回调
    private _onClickMaxBetCallback: Function = null;//spin按钮点击回调
    private _onClickMaxedBetCallback: Function = null;//spin按钮点击回调

    private _onLongPressSpinCallback: Function = null;//spin按钮长按回调
    private _onLongPressSpinEndCallbackCallback: Function = null;//spin按钮长按结束回调
    private _onClickOuterSpinCallback: Function = null;//spin按钮移出回调
    private _onClickInsideSpinCallback: Function = null;//spin按钮移入回调   

    private freeRewardProxy: any = null;
    private bankruptcyProxy: any = null;
    private roomDeal: any = null;

    public get currBetRangeIndex() {
        return this._currBetRangeIndex;
    }

    public set currBetRangeIndex(num: number) {
        this._currBetRangeIndex = num;
    }



    public get onClickSpinCallback() {
        return this._onClickSpinCallback;
    }

    public set onClickSpinCallback(func: Function) {
        this._onClickSpinCallback = func;
    }

    public get onClickAddBetCallback() {
        return this._onClickAddBetCallback;
    }

    public set onClickAddBetCallback(func: Function) {
        this._onClickAddBetCallback = func;
    }

    public get onLongPressAddBetCallback() {
        return this._onLongPressAddBetCallback;
    }

    public set onLongPressAddBetCallback(func: Function) {
        this._onLongPressAddBetCallback = func;
    }

    public get onClickSubBetCallback() {
        return this._onClickSubBetCallback;
    }

    public set onClickSubBetCallback(func: Function) {
        this._onClickSubBetCallback = func;
    }

    public get onLongPressSubBetCallback() {
        return this._onLongPressSubBetCallback;
    }

    public set onLongPressSubBetCallback(func: Function) {
        this._onLongPressSubBetCallback = func;
    }

    public get onClickMaxBetCallback() {
        return this._onClickMaxBetCallback;
    }

    public set onClickMaxBetCallback(func: Function) {
        this._onClickMaxBetCallback = func;
    }

    public get onClickMaxedBetCallback() {
        return this._onClickMaxedBetCallback;
    }

    public set onClickMaxedBetCallback(func: Function) {
        this._onClickMaxedBetCallback = func;
    }

    public get onLongPressSpinCallback() {
        return this._onLongPressSpinCallback;
    }

    public set onLongPressSpinCallback(func: Function) {
        this._onLongPressSpinCallback = func;
    }

    public get onLongPressSpinEndCallbackCallback() {
        return this._onLongPressSpinEndCallbackCallback;
    }

    public set onLongPressSpinEndCallbackCallback(func: Function) {
        this._onLongPressSpinEndCallbackCallback = func;
    }
    public get onClickOuterSpinCallback() {
        return this._onClickOuterSpinCallback;
    }

    public set onClickOuterSpinCallback(func: Function) {
        this._onClickOuterSpinCallback = func;
    }
    public get onClickInsideSpinCallback() {
        return this._onClickInsideSpinCallback;
    }

    public set onClickInsideSpinCallback(func: Function) {
        this._onClickInsideSpinCallback = func;
    }

    protected onLoad(): void {
        this.loadDymicScript();
    }

    private async loadDymicScript() {
        // this.freeRewardProxy = await (await import("../../Bundle/HallBundle/Scripts/Proxy/FreeRewardProxy")).default;
        // this.bankruptcyProxy = await (await import("../../Bundle/HallBundle/Scripts/Proxy/BankruptcyProxy")).default;
        // this.roomDeal = await (await import("../../Bundle/HallBundle/Scripts/Deal/RoomDeal")).default;
    }

    start() {
        this.addEvent();
        this.updateBetGold();
    }

    private updateBetGold(): void {
        this.betLabelNode.getComponent(cc.Label).string = '' + NewBankProxy.instance.betGold;
    }

    onDisable() {
        NewBankLogManager.instance.log('清理SlotsBottomBtn的所有延迟调用');
        this.clearAllEvent();
        this.goldConNode.destroyAllChildren();
        this.isOpen = false;
    }

    onEnable() {
        this.isOpen = true;
    }

    private addEvent() {
        this.spinBigButtonEx.clickCallback = this.onClickSpin.bind(this);
        this.spinSmallButtonEx.clickCallback = this.onClickSpin.bind(this);
        this.smallAddButtonEx.clickCallback = this.onClickAddBet.bind(this);
        this.bigAddButtonEx.clickCallback = this.onClickAddBet.bind(this);
        this.smallAddButtonEx.longPressCallback = this.onLongPressAddBet.bind(this);
        this.bigAddButtonEx.longPressCallback = this.onLongPressAddBet.bind(this);
        this.smallSubButtonEx.clickCallback = this.onClickSubBet.bind(this);
        this.bigSubButtonEx.clickCallback = this.onClickSubBet.bind(this);
        this.smallSubButtonEx.longPressCallback = this.onLongPressSubBet.bind(this);
        this.bigSubButtonEx.longPressCallback = this.onLongPressSubBet.bind(this);
        this.maxBetSmallButton.clickCallback = this.onClickMaxBet.bind(this);
        this.maxBetBigButton.clickCallback = this.onClickMaxBet.bind(this);
        this.maxedBetSmallButton.clickCallback = this.onClickMaxedBet.bind(this);
        this.maxedBetBigButton.clickCallback = this.onClickMaxedBet.bind(this);
        this.spinBigButtonEx.longPressCallback = this.onLongPressSpin.bind(this);
        this.spinBigButtonEx.longPressEndCallback = this.onLongPressSpinEndCallback.bind(this);
        this.spinBigButtonEx.outerCallback = this.onClickOuterSpin.bind(this);
        this.spinBigButtonEx.insideCallback = this.onClickInsideSpin.bind(this);
        this.spinSmallButtonEx.longPressCallback = this.onLongPressSpin.bind(this);
        this.spinSmallButtonEx.longPressEndCallback = this.onLongPressSpinEndCallback.bind(this);
        this.spinSmallButtonEx.outerCallback = this.onClickOuterSpin.bind(this);
        this.spinSmallButtonEx.insideCallback = this.onClickInsideSpin.bind(this);
    }

    /**
     * 设置是否是自动状态
     * @param isAuto 
     */
    public setIsAutoBet(isAuto: boolean) {
        this.isAutoBet = isAuto;
    }

    /**
     * 获得是否是自动状态
     * @param isAuto 
     */
    public getIsAutoBet() {
        return this.isAutoBet;
    }

    /**
    * 检测新手引导
    */
    public checkGuide(groupIds: number[] = [GuideGroup.GUIDE_GOLD_NOT_ENOUGH]): boolean {
        // for (let i = 0; i < groupIds.length; i++) {
        //     const groupId = groupIds[i];
        //     const needGuide = GuideProxy.instance.checkGroupNeedGuide(groupId);
        //     if (needGuide) {
        //         GuideManager.instance.showGuide(groupId);
        //         this.setTimeOut(() => {
        //             LockScreenManager.instance.unlockScreen();
        //         }, 0.3);
        //         return true;
        //     }
        // }
        // LockScreenManager.instance.unlockScreen();
        return false;
    }

    /**
    * 设置无操作动画倒计时
    */
    public setNotOperationAnim() {
        // this.cancleNotOperationAnim();
        // LogManager.instance.log("[SlotsBottomBtn] setNotOperationAnim");
        // let configData = ConfigProxy.instance.getConfigData('ConfigData') as { [key: number]: ConfigData }
        // this.notOperationAnimTimerId = this.setTimeOut(() => {
        //     this.playSpinSpineAnim(SpinAnimStatus.PROMPT);
        // }, configData["time_prompt"].data1);
    }

    /**
     * 取消无操作动画倒计时
     */
    public cancleNotOperationAnim() {
        NewBankLogManager.instance.log("[SlotsBottomBtn] cancleNotOperationAnim");
        this.clearTimeout(this.notOperationAnimTimerId);
    }

    private onClickAddBet() {
        if (!this.btnCanNotTips()) {
            return;
        }
        // this.currBetRangeIndex++;
        // let lv = PlayerProxy.instance.playerVO.lv;
        // let playerConfig = ConfigProxy.instance.getConfigData('Player')[lv] as Player;
        // if (this.currBetRangeIndex > playerConfig.betRange.length - 1) {
        //     this.currBetRangeIndex = 0;
        // }
        // EventManager.instance.emit(EventDefine.BET_GOLD_CHANGE, { index: this.currBetRangeIndex });
        if (this.onClickAddBetCallback) {
            this.onClickAddBetCallback();
        }
        if (NewBankProxy.instance.betGold >= 10000) {
            NewBankProxy.instance.betGold = 1000;
            this.updateBetGold();
            return;
        }
        NewBankProxy.instance.betGold += 1000;
        this.updateBetGold();
    }

    private onLongPressAddBet() {
        // if (!this.btnCanNotTips()) {
        //     return;
        // }
        // this.currBetRangeIndex++;
        // let lv = PlayerProxy.instance.playerVO.lv;
        // let playerConfig = ConfigProxy.instance.getConfigData('Player')[lv] as Player;
        // if (this.currBetRangeIndex > playerConfig.betRange.length - 1) {
        //     this.currBetRangeIndex = playerConfig.betRange.length - 1;
        //     return;
        // }
        // EventManager.instance.emit(EventDefine.BET_GOLD_CHANGE, { index: this.currBetRangeIndex });
        // if (this.onLongPressAddBetCallback) {
        //     this.onLongPressAddBetCallback();
        // }
    }

    private onClickSubBet() {
        if (NewBankProxy.instance.betGold <= 1000) {
            NewBankProxy.instance.betGold = 10000;
            this.updateBetGold();
            return;
        }
        NewBankProxy.instance.betGold -= 1000;
        this.updateBetGold();

        // if (!this.btnCanNotTips()) {
        //     return;
        // }
        // this.currBetRangeIndex--;
        // let lv = PlayerProxy.instance.playerVO.lv;
        // let playerConfig = ConfigProxy.instance.getConfigData('Player')[lv] as Player;
        // if (this.currBetRangeIndex < 0) {
        //     this.currBetRangeIndex = playerConfig.betRange.length - 1;
        // }
        // EventManager.instance.emit(EventDefine.BET_GOLD_CHANGE, { index: this.currBetRangeIndex });
        // if (this.onClickSubBetCallback) {
        //     this.onClickSubBetCallback();
        // }
    }

    private onLongPressSubBet() {
        if (!this.btnCanNotTips()) {
            return;
        }
        this.currBetRangeIndex--;
        if (this.currBetRangeIndex < 0) {
            this.currBetRangeIndex = 0;
            return;
        }
        NewBankSlotEventManager.instance.emit(NewBankEventDefine.BET_GOLD_CHANGE, { index: this.currBetRangeIndex });
        if (this.onLongPressSubBetCallback) {
            this.onLongPressSubBetCallback();
        }
    }

    private onClickMaxBet() {
        // if (!this.btnCanNotTips()) {
        //     return;
        // }

        // let lv = PlayerProxy.instance.playerVO.lv;
        // let playerConfig = ConfigProxy.instance.getConfigData('Player')[lv] as Player;
        // if (this.currBetRangeIndex == playerConfig.betRange.length - 1) {
        //     return;
        // }
        // this.currBetRangeIndex = playerConfig.betRange.length - 1;
        // EventManager.instance.emit(EventDefine.BET_GOLD_CHANGE, { index: this.currBetRangeIndex });
        // if (this.onClickMaxBetCallback) {
        //     this.onClickMaxBetCallback();
        // }
    }

    private onClickMaxedBet() {
        if (!this.btnCanNotTips()) {
            return;
        }
        if (this.onClickMaxedBetCallback) {
            this.onClickMaxedBetCallback();
        }
    }

    public onClickSpin(testData?: string) {
        NewBankLogManager.instance.log("[SlotsBottomBtn] onClickSpin")
        if (!PlayerProxy.instance.roomId) {
            NewBankLogManager.instance.err("房间已销毁，不能投注")
            return;
        }
        if (PlayerProxy.instance.gold < NewBankProxy.instance.betGold) {
            return;
        }
        // const guideInfo = GuideProxy.instance.getCurrGuideInfo();
        // //引导切换自动的投注的时候不执行下面的逻辑
        // if (guideInfo && guideInfo.group == GuideGroup.GUIDE_SCALE_BTN) {
        //     return;
        // }
        // //引导下注时，进行锁屏，等待本轮游戏结束之后解锁
        // if (guideInfo && guideInfo.group == GuideGroup.GUIDE_PLAY_GAME) {
        //     LockScreenManager.instance.lockScreen();
        // }
        // //播放音效
        // AudioManager.instance.playSound(BundleType.RESOURCES, SoundsType.SPIN);
        // if (this.getSpinStatus() == SpinBtnStatus.SPIN) {
        //     this.stopSpinSpineAnim();
        // }
        this.cancleNotOperationAnim();
        //检测余额
        // let lv = PlayerProxy.instance.playerVO.lv;
        // let playerConfig = ConfigProxy.instance.getConfigData('Player')[lv] as Player;
        // if (playerConfig.betRange[this.currBetRangeIndex] > PlayerProxy.instance.playerVO.gold) {
        //     this.setSpinStatus(SpinBtnStatus.SPIN);
        //     this.setNotOperationAnim();
        //     this.setIsAutoBet(false);
        //     this.setButtonCanClick();
        //     if (this.freeRewardProxy.instance.checkCanFreeReward() && this.checkGuide()) {
        //         return;
        //     }
        //     if (this.bankruptcyProxy.instance.canGetFree || this.bankruptcyProxy.instance.canBuy) {

        //         DialogManager.instance.openDialog(BundleType.HALL, 'Prefabs/Dialog/BankruptcyDialog');
        //         return;
        //     }
        //     //弹通用提示框
        //     DialogManager.instance.openCommonDialog('coin_not_enough', () => {
        //         ViewManager.instance.openView(BundleType.HALL, 'Prefabs/View/ShopView', null, false, ViewCloseAnimType.ONE, ViewOpenAnimType.ONE);
        //     });
        //     return;
        // }
        //播放spin飞向经验条的粒子动画
        let xpWorldPos: cc.Vec2 = this.topXPStarNode.parent.convertToWorldSpaceAR(this.topXPStarNode.getPosition()); //new cc.Vec2();
        this.playSpinParticle(xpWorldPos, () => {
            let tsCommonTop: NewBankCommonTop = <NewBankCommonTop>this.topNode.getComponent(NewBankCommonTop);
            tsCommonTop.updateExpInfo(true);
        });
        //某些按钮变为不可点击状态
        this.setButtonCanNotClick();
        //先把钱扣了
        let tsCommonTop: NewBankCommonTop = <NewBankCommonTop>this.topNode.getComponent(NewBankCommonTop);
        PlayerProxy.instance.gold -= NewBankProxy.instance.betGold;
        tsCommonTop.updatePlayerGold(true, PlayerProxy.instance.gold);
        NewBankProxy.instance.randGameOverData();
        PlayerProxy.instance.gold += NewBankProxy.instance.gameOverData.totalPay;
        this.setWinNum({
            num: 0,
            isChange: false
        });
        //回调
        if (this.onClickSpinCallback) {
            this.onClickSpinCallback(testData);
        }
    }

    /**
     *免费spin 
     * @returns 
     */
    public freeSpin() {
        if (!PlayerProxy.instance.roomId) {
            NewBankLogManager.instance.err("房间已销毁，不能投注")
            return;
        }
        //播放音效
        NewBankSlotAudioManager.instance.playSound(BundleType.RESOURCES, SoundsType.SPIN);
        if (this.getSpinStatus() == SpinBtnStatus.SPIN) {
            this.stopSpinSpineAnim();
        }
        this.cancleNotOperationAnim();
        //播放spin飞向经验条的粒子动画
        let xpWorldPos: cc.Vec2 = this.topXPStarNode.parent.convertToWorldSpaceAR(this.topXPStarNode.getPosition()); //new cc.Vec2();
        this.playSpinParticle(xpWorldPos, () => {
            let tsCommonTop: NewBankCommonTop = <NewBankCommonTop>this.topNode.getComponent(NewBankCommonTop);
            tsCommonTop.updateExpInfo(true);
        });
        //某些按钮变为不可点击状态
        this.setButtonCanNotClick();
        //回调
        if (this.onClickSpinCallback) {
            this.onClickSpinCallback();
        }
    }

    /**
   * 长按投注
   */
    private onLongPressSpin() {
        // LogManager.instance.log("[SlotsBottomBtn] onLongPressSpin");
        // if (PlayerProxy.instance.gameId == parseInt(MessageType.CLASSIC777_MSG)) {
        //     LogManager.instance.log("[SlotsBottomBtn] onLongPressSpin,", parseInt(MessageType.CLASSIC777_MSG))
        //     const guideInfo = GuideProxy.instance.getCurrGuideInfo();
        //     if (guideInfo && guideInfo.group == GuideGroup.GUIDE_PLAY_GAME) {
        //         return;
        //     }
        // }
        // DeviceManager.instance.shake(0.5);
        // this.stopSpinSpineAnim();
        // this.playSpinSpineAnim(SpinAnimStatus.HOLD, 1, () => {
        //     this.setIsAutoBet(true);
        //     if (this.getIsAutoBet()) {
        //         this.roomDeal.instance.sendPointByType(PointType.BEGIN_AUTO_SPIN);
        //         AudioManager.instance.playSound(BundleType.RESOURCES, SoundsType.SPIN_AUTO);
        //         this.setSpinStatus(SpinBtnStatus.AUTO);
        //         if (PlayerProxy.instance.gameId == parseInt(MessageType.CLASSIC777_MSG)) {
        //             const guideInfo = GuideProxy.instance.getCurrGuideInfo();
        //             if (guideInfo && guideInfo.group == GuideGroup.GUIDE_SCALE_BTN) {
        //                 GuideManager.instance.nextStep();
        //             }
        //         }
        //         this.onClickSpin();
        //     }
        // });
        // //回调
        // if (this.onLongPressSpinCallback) {
        //     this.onLongPressSpinCallback();
        // }
    }

    /**
    * 长按投注结束回调
    */
    private onLongPressSpinEndCallback() {
        NewBankLogManager.instance.log("[SlotsBottomBtn] onLongPressSpinEndCallback");
        // if (PlayerProxy.instance.gameId == parseInt(MessageType.CLASSIC777_MSG)) {
        //     const guideInfo = GuideProxy.instance.getCurrGuideInfo();
        //     if (guideInfo && guideInfo.group == GuideGroup.GUIDE_PLAY_GAME) {
        //         return;
        //     }
        // }
        this.stopSpinSpineAnim();
        this.setNotOperationAnim();
        NewBankDeviceManager.instance.stopShake();
        //回调
        if (this.onLongPressSpinEndCallbackCallback) {
            this.onLongPressSpinEndCallbackCallback();
        }
    }

    private onClickOuterSpin() {
        // LogManager.instance.log("[SlotsBottomBtn] onClickOuterSpin");
        // if (PlayerProxy.instance.gameId == parseInt(MessageType.CLASSIC777_MSG)) {
        //     const guideInfo = GuideProxy.instance.getCurrGuideInfo();
        //     if (guideInfo && guideInfo.group == GuideGroup.GUIDE_PLAY_GAME) {
        //         return;
        //     }
        // }
        // this.stopSpinSpineAnim();
        // DeviceManager.instance.stopShake();
        // //回调
        // if (this.onClickOuterSpinCallback) {
        //     this.onClickOuterSpinCallback();
        // }
    }

    private onClickInsideSpin() {
        // LogManager.instance.log("[SlotsBottomBtn] onClickInsideSpin");
        // if (PlayerProxy.instance.gameId == parseInt(MessageType.CLASSIC777_MSG)) {
        //     const guideInfo = GuideProxy.instance.getCurrGuideInfo();
        //     if (guideInfo && guideInfo.group == GuideGroup.GUIDE_PLAY_GAME) {
        //         return;
        //     }
        // }
        // DeviceManager.instance.shake(0.5);
        // this.playSpinSpineAnim(SpinAnimStatus.HOLD, 1, () => {
        //     this.setIsAutoBet(true);
        //     if (this.getIsAutoBet()) {
        //         AudioManager.instance.playSound(BundleType.RESOURCES, SoundsType.SPIN_AUTO);
        //         this.setSpinStatus(SpinBtnStatus.AUTO);
        //         if (PlayerProxy.instance.gameId == parseInt(MessageType.CLASSIC777_MSG)) {
        //             const guideInfo = GuideProxy.instance.getCurrGuideInfo();
        //             if (guideInfo && guideInfo.group == GuideGroup.GUIDE_SCALE_BTN) {
        //                 GuideManager.instance.nextStep();
        //             }
        //         }
        //         this.onClickSpin();
        //     }
        // });
        // //回调
        // if (this.onClickInsideSpinCallback) {
        //     this.onClickInsideSpinCallback();
        // }
    }


    /**
     * 放大
     */
    public playBig() {
        this.currScaleStatus = SlotsViewScaleStatus.BIG;
        this.playBigSpin();
        this.playBigMax();
        this.playBigBet();
        this.playBigWin();
        this.playBigSpinAnim();
    }

    /**
     * 缩小
     */
    public playSmall() {
        this.currScaleStatus = SlotsViewScaleStatus.SMALL;
        this.playSmallSpin();
        this.playSmallMax();
        this.playSmallBet();
        this.playSmallWin();
        this.playSmallSpinAnim();
    }

    /**
     * spin按钮动画的放大变化
     */
    private playBigSpinAnim() {
        this.playSpinSpineAnim();
    }

    /**
     * spin按钮动画的缩小变化
     */
    private playSmallSpinAnim() {
        this.playSpinSpineAnim();
    }

    /**
     * 停止spin按钮的spine动画
     */
    public stopSpinSpineAnim() {
        this.currSpinSpineStatus = SpinAnimStatus.NULL;
        this.spinSpineEx.spineSkeleton.clearTracks();
        this.spinSpineEx.node.active = false;
        this.spinSpineEx.node.off(SPINE_END);
    }

    /**
     * 播放spin按钮的spine动画
     * @param animStatus SPIN按钮动画状态
     * @param repeat 播放次数（0表示无限次）
     * @param callback 播放完成回调
     */
    public playSpinSpineAnim(animStatus?: SpinAnimStatus, repeat: number = 0, callback?: Function) {
        let name: string;
        let name2: string;
        let scaleStatus = this.getCurrScaleStatus();
        if (null == animStatus) {
            animStatus = this.currSpinSpineStatus;
        }

        if (animStatus == SpinAnimStatus.NULL) {
            NewBankLogManager.instance.log("stopBtnNull");
            this.stopSpinSpineAnim();
            return;
        }
        this.currSpinSpineStatus = animStatus;
        switch (scaleStatus) {
            case SlotsViewScaleStatus.SMALL:
                name = "small_";
                break;
            case SlotsViewScaleStatus.BIG:
                name = "big_";
                break;
        }
        switch (animStatus) {
            case SpinAnimStatus.AUTO:
                name2 = "auto";
                break;
            case SpinAnimStatus.HOLD:
                name2 = "hold";
                break;
            case SpinAnimStatus.PROMPT:
                name2 = "prompt";
                break;
            case SpinAnimStatus.FREE:
                name2 = "free";
                break;
        }

        this.spinSpineEx.playSpineAnim({
            aBName: BundleType.RESOURCES,
            path: "Spines/sp_btn_spin",
            animName: name + name2,
            repeat: repeat,
            callback: () => {
                this.spinSpineEx.node.active = true;
            }
        });
        this.spinSpineEx.node.once(SPINE_END, () => {
            if (callback) {
                callback();
            }
        }, this);
    }

    /**
     * 获得当前缩放状态
     * @returns 
     */
    public getCurrScaleStatus() {
        return this.currScaleStatus;
    }

    /**
     * 设置spin按钮状态
     * @param status 
     */
    public setSpinStatus(status: SpinBtnStatus) {
        if (this.currSpinStatus == status) {
            return;
        }
        NewBankLogManager.instance.log("设置按钮状态为：", status);
        this.currSpinStatus = status;
        switch (status) {
            case SpinBtnStatus.SPIN:
                this.spinNode.active = true;
                this.autoNode.active = false;
                this.freeNode.active = false;
                this.stopSpinSpineAnim();
                break;
            case SpinBtnStatus.AUTO:
                this.spinNode.active = false;
                this.autoNode.active = true;
                this.freeNode.active = false;
                this.playSpinSpineAnim(SpinAnimStatus.AUTO);
                break;
            case SpinBtnStatus.FREE:
                this.spinNode.active = false;
                this.autoNode.active = false;
                this.freeNode.active = true;
                this.playSpinSpineAnim(SpinAnimStatus.FREE);
                break;
        }
    }

    /**
     * 获得spin按钮状态
     * @returns 
     */
    public getSpinStatus() {
        return this.currSpinStatus;
    }

    /**
     * 设置满注状态
     * @param status 
     */
    public async setMaxBetStatus(status: MaxStatus) {
        let betRes: cc.SpriteFrame = null;
        switch (status) {
            case MaxStatus.MAX:
                this.maxNode.active = false;
                this.maxMNode.active = true;
                betRes = await NewBankSlotResManager.instance.loadByBundle(BundleType.RESOURCES, "Textures/Common/SlotsBottom/s_bet_txt_max", cc.SpriteFrame);
                if (null != this.betTitleNode && this.betTitleNode.isValid) {
                    this.betTitleNode.getComponent(cc.Sprite).spriteFrame = betRes;
                }

                break;
            case MaxStatus.NOT_MAX:
                this.maxNode.active = true;
                this.maxMNode.active = false;
                betRes = await NewBankSlotResManager.instance.loadByBundle(BundleType.RESOURCES, "Textures/Common/SlotsBottom/s_bet_txt", cc.SpriteFrame);
                if (null != this.betTitleNode && this.betTitleNode.isValid) {
                    this.betTitleNode.getComponent(cc.Sprite).spriteFrame = betRes;
                }
                break;
        }
    }

    /**
     * 投注后，某些按钮设置为不可点击状态：加、减注，spin，满注
     */
    public setButtonCanNotClick() {
        NewBankLogManager.instance.log("[SlotsBottomBtn] setButtonCanNotClick");
        this.isCanClick = false;
        this.spinBigButtonEx.setDisable();
        this.spinSmallButtonEx.setDisable();
        NewBankSlotEventManager.instance.emit(NewBankEventDefine.COMMON_TOP_STATUS_CHANGE, CommonTopStatus.BAN);
    }

    /**
     * 适当的时机将某些按钮变为可点击状态
     */
    public setButtonCanClick() {
        NewBankLogManager.instance.log("[SlotsBottomBtn] setButtonCanClick");
        this.isCanClick = true;
        this.spinBigButtonEx.setEnable();
        this.spinSmallButtonEx.setEnable();
        NewBankSlotEventManager.instance.emit(NewBankEventDefine.COMMON_TOP_STATUS_CHANGE, CommonTopStatus.NORMAL);
    }

    /**
     * 设置赢得钱数量
     * @param data.num 数量
     * @param data.isChange 是否要数字滚动效果
     * @param data.isBigWin 是否是大奖
     * @param data.bigWinTime 大奖时间
     * @param data.initNum 初始数量
     */
    public setWinNum(data: { num: number, isChange: boolean, isBigWin?: boolean, bigWinTime?: number, initNum?: number }) {
        if (!this.isOpen) {
            return;
        }
        if (null == data.isBigWin) {
            data.isBigWin = false;
        }
        if (null == data.initNum) {
            data.initNum = 0;
        }
        let self = this;
        function flyWinGold() {
            cc.director.getPhysicsManager().enabled = true;//开启物理
            var goldNum = 7
            let count = 0;
            for (var i = 0; i < goldNum; i++) {
                self.setTimeOut(() => {
                    var _gold = cc.instantiate(self.goldPrefab);
                    _gold.parent = self.goldConNode;
                    _gold.y = 0
                    _gold.scale = 0.3
                    _gold.getComponent(cc.RigidBody).gravityScale = 7
                    var jumpY = 600 + Math.random() * 100
                    _gold.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, jumpY)
                    _gold.x = -100 + Math.random() * 200

                    self.setTimeOut(() => {
                        cc.tween(_gold)
                            .to(0.2, { opacity: 0 }, { easing: 'sineOut' })
                            .start()
                    }, 0.3)

                    self.setTimeOut(() => {
                        count++;
                        _gold.destroy()
                        if (count == goldNum) {
                            // cc.director.getPhysicsManager().enabled = false;//关闭物理
                        }
                    }, 0.5)

                }, i * 80 / 1000);
            }
        }
        if (data.isChange) {
            let time = 1;
            if (!data.isBigWin) {
                this.winLight.opacity = 0;
                cc.tween(this.winLight)
                    .to(time / 2, { opacity: 255 }, { easing: 'sineOut' })
                    .to(time / 2, { opacity: 0 }, { easing: 'sineIn' })
                    .start()
                NewBankSlotAudioManager.instance.playSound(BundleType.RESOURCES, SoundsType.MONEY_END);
                flyWinGold();
            }
            else {
                time = data.bigWinTime;
            }
            this.winNumLabelNode.getComponent(NewBankLabelEx).digitEffect({ score: data.num, time: time, bit: 0, isScale: true, initNum: data.initNum });
        }
        else {
            this.winNumLabelNode.getComponent(NewBankLabelEx).stopDigitEffect();
            this.winNumLabelNode.getComponent(cc.Label).string = data.num.toString();
        }
    }

    /**
     * 设置赢钱标题
     * @param isLast 
     */
    public async setWinTitle(isLast: boolean) {
        // let resStr: string;
        // if (isLast) {
        //     resStr = "s_win_txt_last";
        // }
        // else {
        //     resStr = "s_win_txt";
        // }
        // let res: cc.SpriteFrame = await ResManager.instance.loadByBundle("resources", "Textures/Common/SlotsBottom/" + resStr, cc.SpriteFrame);
        // if (null != this.winTitleNode && this.winTitleNode.isValid) {
        //     this.winTitleNode.getComponent(cc.Sprite).spriteFrame = res;
        // }
    }

    /**
     * 点击spin后播放的经验粒子动画
     * @param endPos 终点位置的世界坐标
     */
    public playSpinParticle(endPos: cc.Vec2, callback?: Function) {

    }

    /**
     * 更新下注数量和按钮
     * @param obj.currBetRangeIndex 当前下注等级下标
     * @param obj.isChange 是否滚动增长
     * @param obj.isPlaySound 是否播放声音
     * @param obj.callback 最后要执行的逻辑
     * @param obj.bet 下注金额
     */
    public updateBet(obj: {
        currBetRangeIndex: number,
        isChange?: boolean,
        isPlaySound?: boolean,
        callback?: Function,
        bet?: number
    }) {
        // let lv = PlayerProxy.instance.playerVO.lv;
        // let playerConfig = ConfigProxy.instance.getConfigData('Player')[lv] as Player;
        // if (null == obj.isChange) {
        //     obj.isChange = false;
        // }
        // if (null == obj.isPlaySound) {
        //     obj.isPlaySound = true;
        // }
        // if (null == obj.bet) {
        //     obj.bet = playerConfig.betRange[obj.currBetRangeIndex];
        // }
        // if (obj.isPlaySound) {
        //     AudioManager.instance.playSound(BundleType.RESOURCES, SoundsType.BET + (obj.currBetRangeIndex + 1));
        // }
        // if (obj.bet == playerConfig.betRange[playerConfig.betRange.length - 1]) {
        //     this.currBetRangeIndex = playerConfig.betRange.length - 1;
        //     obj.currBetRangeIndex = this.currBetRangeIndex;
        // }
        // this.betLabelNode.getComponent(cc.Label).string = obj.bet.toString();
        // if (obj.currBetRangeIndex == playerConfig.betRange.length - 1) {
        //     this.setMaxBetStatus(MaxStatus.MAX);
        // }
        // else {
        //     this.setMaxBetStatus(MaxStatus.NOT_MAX);
        // }
        // if (obj.callback) {
        //     obj.callback();
        // }
    }

    /**
        * max按钮的放大变化
        */
    private playBigMax() {
        function play(smallBtnNode: cc.Node, bigBtnNode: cc.Node, smallSpriteNode: cc.Node, bigSpriteNode: cc.Node, betSpriteNode: cc.Node) {
            cc.Tween.stopAllByTarget(smallBtnNode);
            cc.Tween.stopAllByTarget(bigBtnNode);
            cc.Tween.stopAllByTarget(smallSpriteNode);
            cc.Tween.stopAllByTarget(bigSpriteNode);
            cc.Tween.stopAllByTarget(betSpriteNode);

            bigSpriteNode.active = false;
            smallSpriteNode.active = true;
            cc.tween(smallSpriteNode)
                .parallel(
                    cc.tween(smallSpriteNode)
                        .to(0.2, { y: 40 }, {
                            easing: 'quartOut'
                        }),
                    cc.tween(smallSpriteNode)
                        .to(0.2, { scaleY: 0.755, scaleX: 0.755 }, {
                            easing: 'quartOut'
                        })
                )
                .call(() => {
                    bigSpriteNode.active = true;
                    smallSpriteNode.active = false;
                    smallSpriteNode.y = 70;
                    smallSpriteNode.setScale(1, 1);
                })
                .start();

            cc.tween(smallBtnNode)
                .parallel(
                    cc.tween(smallBtnNode)
                        .to(0.05, { opacity: 0 }, {
                            easing: 'quartIn'
                        }),
                    cc.tween(smallBtnNode)
                        .to(0.2, { scaleY: 0.755, scaleX: 0.755 }, {
                            easing: 'quartOut'
                        }),

                )
                .call(() => {
                    smallBtnNode.active = false;
                    smallBtnNode.setScale(1, 1);

                })
                .start();

            bigBtnNode.active = true;
            bigBtnNode.opacity = 0;
            bigBtnNode.setScale(1, 1);
            cc.tween(bigBtnNode)
                .parallel(
                    cc.tween(bigBtnNode)
                        .to(0.05, { opacity: 255 }, {
                            easing: 'quartIn'
                        }),
                    cc.tween(bigBtnNode)
                        .to(0.2, { scaleX: 0.755, scaleY: 0.755 }, {
                            easing: 'quartOut'
                        }),
                )
                .start();
            cc.tween(betSpriteNode)
                .parallel(
                    cc.tween(betSpriteNode)
                        .to(0.2, { y: 6 }, {
                            easing: 'quartOut'
                        }),
                    cc.tween(betSpriteNode)
                        .to(0.2, { scaleY: 0.755, scaleX: 0.755 }, {
                            easing: 'quartOut'
                        }),
                    cc.tween(betSpriteNode)
                        .to(0.2, { opacity: 0 }, { easing: 'quartIn' })
                )
                .start();
        }
        play(this.maxBetSmallButton.node, this.maxBetBigButton.node, this.maxSmallSpriteNode, this.maxBigSpriteNode, this.maxBetSpriteNode);
        play(this.maxedBetSmallButton.node, this.maxedBetBigButton.node, this.maxMSmallSpriteNode, this.maxMBigSpriteNode, this.maxMBetSpriteNode);
    }

    /**
     * max按钮的缩小变化
     */
    private playSmallMax() {
        function play(smallBtnNode: cc.Node, bigBtnNode: cc.Node, smallSpriteNode: cc.Node, bigSpriteNode: cc.Node, betSpriteNode: cc.Node) {
            cc.Tween.stopAllByTarget(smallBtnNode);
            cc.Tween.stopAllByTarget(bigBtnNode);
            cc.Tween.stopAllByTarget(smallSpriteNode);
            cc.Tween.stopAllByTarget(bigSpriteNode);
            cc.Tween.stopAllByTarget(betSpriteNode);

            smallSpriteNode.active = false;
            bigSpriteNode.active = true;
            cc.tween(bigSpriteNode)
                .parallel(
                    cc.tween(bigSpriteNode)
                        .to(0.2, { y: 70 }, {
                            easing: 'quartOut'
                        }),
                    cc.tween(bigSpriteNode)
                        .to(0.2, { scaleY: 1, scaleX: 1 }, {
                            easing: 'quartOut'
                        })
                )
                .call(() => {
                    smallSpriteNode.active = true;
                    bigSpriteNode.active = false;
                    bigSpriteNode.y = 40;
                    bigSpriteNode.setScale(0.755, 0.755);
                })
                .start();

            cc.tween(bigBtnNode)
                .parallel(
                    cc.tween(bigBtnNode)
                        .to(0.05, { opacity: 0 }, {
                            easing: 'quartIn'
                        }),
                    cc.tween(bigBtnNode)
                        .to(0.2, { scaleY: 1 }, {
                            easing: 'quartOut'
                        }),
                )
                .call(() => {
                    bigBtnNode.active = false;
                    bigBtnNode.setScale(0.755, 0.755);
                })
                .start();

            smallBtnNode.active = true;
            smallBtnNode.opacity = 0;
            smallBtnNode.setScale(0.755, 0.755);
            cc.tween(smallBtnNode)
                .parallel(
                    cc.tween(smallBtnNode)
                        .to(0.05, { opacity: 255 }, {
                            easing: 'quartIn'
                        }),
                    cc.tween(smallBtnNode)
                        .to(0.2, { scaleX: 1, scaleY: 1 }, {
                            easing: 'quartOut'
                        }),
                )
                .start();
            cc.tween(betSpriteNode)
                .parallel(
                    cc.tween(betSpriteNode)
                        .to(0.2, { y: 36 }, {
                            easing: 'quartOut'
                        }),
                    cc.tween(betSpriteNode)
                        .to(0.2, { scaleY: 1, scaleX: 1 }, {
                            easing: 'quartOut'
                        }),
                    cc.tween(betSpriteNode)
                        .to(0.05, { opacity: 255 }, { easing: 'quartIn' })
                )
                .start();
        }
        play(this.maxBetSmallButton.node, this.maxBetBigButton.node, this.maxSmallSpriteNode, this.maxBigSpriteNode, this.maxBetSpriteNode);
        play(this.maxedBetSmallButton.node, this.maxedBetBigButton.node, this.maxMSmallSpriteNode, this.maxMBigSpriteNode, this.maxMBetSpriteNode);
    }
    /**
       * spin按钮在界面变为放大状态时的变化
       */
    private playBigSpin() {
        function play(bigSpriteNode: cc.Node, smallSpriteNode: cc.Node, bigBtnNode: cc.Node, smallBtnNode: cc.Node) {
            cc.Tween.stopAllByTarget(bigSpriteNode);
            cc.Tween.stopAllByTarget(smallSpriteNode);
            cc.Tween.stopAllByTarget(bigBtnNode);
            cc.Tween.stopAllByTarget(smallBtnNode);

            bigSpriteNode.active = false;
            smallSpriteNode.active = true;
            cc.tween(smallSpriteNode)
                .to(0.2, { y: 52 }, {
                    easing: 'quartOut'
                })
                .call(() => {
                    bigSpriteNode.active = true;
                    smallSpriteNode.active = false;
                    smallSpriteNode.y = 121;
                })
                .start();

            cc.tween(smallBtnNode)
                .parallel(
                    cc.tween(smallBtnNode)
                        .to(0.05, { opacity: 0 }, {
                            easing: 'quartIn'
                        }),
                    cc.tween(smallBtnNode)
                        .to(0.2, { scaleY: 0.6 }, {
                            easing: 'quartOut'
                        }),

                )
                .call(() => {
                    smallBtnNode.active = false;
                    smallBtnNode.setScale(1, 1);

                })
                .start();

            bigBtnNode.active = true;
            bigBtnNode.opacity = 0;
            bigBtnNode.setScale(1, 1.66);
            cc.tween(bigBtnNode)
                .parallel(
                    cc.tween(bigBtnNode)
                        .to(0.05, { opacity: 255 }, {
                            easing: 'quartIn'
                        }),
                    cc.tween(bigBtnNode)
                        .to(0.2, { scaleX: 1, scaleY: 1 }, {
                            easing: 'quartOut'
                        }),
                )
                .start();
        }
        play(this.spinBigSpriteNode, this.spinSmallSpriteNode, this.spinBigButtonEx.node, this.spinSmallButtonEx.node);
        play(this.bigAutoSpriteNode, this.smallAutoSpriteNode, this.bigAutoButtonEx.node, this.smallAutoButtonEx.node);
        play(this.bigFreeSpriteNode, this.smallFreeSpriteNode, this.bigFreeButtonEx.node, this.smallFreeButtonEx.node);
    }

    /**
     * spin按钮在界面变为缩小状态时的变化
     */
    private playSmallSpin() {
        function play(bigSpriteNode: cc.Node, smallSpriteNode: cc.Node, bigBtnNode: cc.Node, smallBtnNode: cc.Node) {
            cc.Tween.stopAllByTarget(smallSpriteNode);
            cc.Tween.stopAllByTarget(bigSpriteNode);
            cc.Tween.stopAllByTarget(smallBtnNode);
            cc.Tween.stopAllByTarget(bigBtnNode);

            smallSpriteNode.active = false;
            bigSpriteNode.active = true;
            cc.tween(bigSpriteNode)
                .to(0.2, { y: 121 }, {
                    easing: 'quartOut'
                })
                .call(() => {
                    smallSpriteNode.active = true;
                    bigSpriteNode.active = false;
                    bigSpriteNode.y = 52;
                })
                .start();

            cc.tween(bigBtnNode)
                .parallel(
                    cc.tween(bigBtnNode)
                        .to(0.05, { opacity: 0 }, {
                            easing: 'quartIn'
                        }),
                    cc.tween(bigBtnNode)
                        .to(0.2, { scaleY: 1.66 }, {
                            easing: 'quartOut'
                        }),
                )
                .call(() => {
                    bigBtnNode.active = false;
                    bigBtnNode.setScale(1, 1);
                })
                .start();

            smallBtnNode.active = true;
            smallBtnNode.opacity = 0;
            smallBtnNode.setScale(1, 0.6);
            cc.tween(smallBtnNode)
                .parallel(
                    cc.tween(smallBtnNode)
                        .to(0.05, { opacity: 255 }, {
                            easing: 'quartIn'
                        }),
                    cc.tween(smallBtnNode)
                        .to(0.2, { scaleX: 1, scaleY: 1 }, {
                            easing: 'quartOut'
                        }),
                )
                .start();
        }
        play(this.spinBigSpriteNode, this.spinSmallSpriteNode, this.spinBigButtonEx.node, this.spinSmallButtonEx.node);
        play(this.bigAutoSpriteNode, this.smallAutoSpriteNode, this.bigAutoButtonEx.node, this.smallAutoButtonEx.node);
        play(this.bigFreeSpriteNode, this.smallFreeSpriteNode, this.bigFreeButtonEx.node, this.smallFreeButtonEx.node);
    }

    private playBigBet() {
        cc.tween(this.betTitleNode)
            .to(0.2, { opacity: 0 })
            .start();
        cc.tween(this.smallSubButtonEx.node)
            .parallel(
                cc.tween(this.smallSubButtonEx.node)
                    .to(0.05, { opacity: 0 }, {
                        easing: 'quartIn'
                    }),
                cc.tween(this.smallSubButtonEx.node)
                    .to(0.2, { scaleX: 1, scaleY: 0.726 }, {
                        easing: 'quartOut'
                    })
            )
            .call(() => {
                this.smallSubButtonEx.node.active = false;
                this.smallSubButtonEx.node.setScale(1, 1);
            })
            .start();

        this.bigSubButtonEx.node.active = true;
        this.bigSubButtonEx.node.opacity = 0;
        this.bigSubButtonEx.node.setScale(1, 1.377);
        cc.tween(this.bigSubButtonEx.node)
            .parallel(
                cc.tween(this.bigSubButtonEx.node)
                    .to(0.05, { opacity: 255 }, {
                        easing: 'quartIn'
                    }),
                cc.tween(this.bigSubButtonEx.node)
                    .to(0.2, { scaleX: 1, scaleY: 1 }, {
                        easing: 'quartOut'
                    }),
            )
            .start();

        cc.tween(this.smallAddButtonEx.node)
            .parallel(
                cc.tween(this.smallAddButtonEx.node)
                    .to(0.05, { opacity: 0 }, {
                        easing: 'quartIn'
                    }),
                cc.tween(this.smallAddButtonEx.node)
                    .to(0.2, { scaleX: 1, scaleY: 0.726 }, {
                        easing: 'quartOut'
                    })
            )
            .call(() => {
                this.smallAddButtonEx.node.active = false;
                this.smallAddButtonEx.node.setScale(1, 1);
            })
            .start();

        this.bigAddButtonEx.node.active = true;
        this.bigAddButtonEx.node.opacity = 0;
        this.bigAddButtonEx.node.setScale(1, 1.377);
        cc.tween(this.bigAddButtonEx.node)
            .parallel(
                cc.tween(this.bigAddButtonEx.node)
                    .to(0.05, { opacity: 255 }, {
                        easing: 'quartIn'
                    }),
                cc.tween(this.bigAddButtonEx.node)
                    .to(0.2, { scaleX: 1, scaleY: 1 }, {
                        easing: 'quartOut'
                    }),
            )
            .start();

        cc.tween(this.smallBetBgNode)
            .parallel(
                cc.tween(this.smallBetBgNode)
                    .to(0.05, { opacity: 0 }, {
                        easing: 'quartIn'
                    }),
                cc.tween(this.smallBetBgNode)
                    .to(0.2, { scaleX: 1, scaleY: 0.755 }, {
                        easing: 'quartOut'
                    })
            )
            .call(() => {
                this.smallBetBgNode.active = false;
                this.smallBetBgNode.setScale(1, 1);
            })
            .start();

        this.bigBetBgNode.active = true;
        this.bigBetBgNode.opacity = 0;
        this.bigBetBgNode.setScale(1, 1.325);
        cc.tween(this.bigBetBgNode)
            .parallel(
                cc.tween(this.bigBetBgNode)
                    .to(0.05, { opacity: 255 }, {
                        easing: 'quartIn'
                    }),
                cc.tween(this.bigBetBgNode)
                    .to(0.2, { scaleX: 1, scaleY: 1 }, {
                        easing: 'quartOut'
                    }),
            )
            .start();
    }

    private playSmallBet() {
        cc.tween(this.betTitleNode)
            .to(0.2, { opacity: 255 })
            .start();
        cc.tween(this.bigSubButtonEx.node)
            .parallel(
                cc.tween(this.bigSubButtonEx.node)
                    .to(0.05, { opacity: 0 }, {
                        easing: 'quartIn'
                    }),
                cc.tween(this.bigSubButtonEx.node)
                    .to(0.2, { scaleX: 1, scaleY: 1.377 }, {
                        easing: 'quartOut'
                    })
            )
            .call(() => {
                this.bigSubButtonEx.node.active = false;
                this.bigSubButtonEx.node.setScale(1, 1);
            })
            .start();

        this.smallSubButtonEx.node.active = true;
        this.smallSubButtonEx.node.opacity = 0;
        this.smallSubButtonEx.node.setScale(1, 0.726);
        cc.tween(this.smallSubButtonEx.node)
            .parallel(
                cc.tween(this.smallSubButtonEx.node)
                    .to(0.05, { opacity: 255 }, {
                        easing: 'quartIn'
                    }),
                cc.tween(this.smallSubButtonEx.node)
                    .to(0.2, { scaleX: 1, scaleY: 1 }, {
                        easing: 'quartOut'
                    }),
            )
            .start();

        cc.tween(this.bigAddButtonEx.node)
            .parallel(
                cc.tween(this.bigAddButtonEx.node)
                    .to(0.05, { opacity: 0 }, {
                        easing: 'quartIn'
                    }),
                cc.tween(this.bigAddButtonEx.node)
                    .to(0.2, { scaleX: 1, scaleY: 1.377 }, {
                        easing: 'quartOut'
                    })
            )
            .call(() => {
                this.bigAddButtonEx.node.active = false;
                this.bigAddButtonEx.node.setScale(1, 1);
            })
            .start();

        this.smallAddButtonEx.node.active = true;
        this.smallAddButtonEx.node.opacity = 0;
        this.smallAddButtonEx.node.setScale(1, 0.726);
        cc.tween(this.smallAddButtonEx.node)
            .parallel(
                cc.tween(this.smallAddButtonEx.node)
                    .to(0.05, { opacity: 255 }, {
                        easing: 'quartIn'
                    }),
                cc.tween(this.smallAddButtonEx.node)
                    .to(0.2, { scaleX: 1, scaleY: 1 }, {
                        easing: 'quartOut'
                    }),
            )
            .start();

        cc.tween(this.bigBetBgNode)
            .parallel(
                cc.tween(this.bigBetBgNode)
                    .to(0.05, { opacity: 0 }, {
                        easing: 'quartIn'
                    }),
                cc.tween(this.bigBetBgNode)
                    .to(0.2, { scaleX: 1, scaleY: 1.325 }, {
                        easing: 'quartOut'
                    })
            )
            .call(() => {
                this.bigBetBgNode.active = false;
                this.bigBetBgNode.setScale(1, 1);
            })
            .start();

        this.smallBetBgNode.active = true;
        this.smallBetBgNode.opacity = 0;
        this.smallBetBgNode.setScale(1, 0.755);
        cc.tween(this.smallBetBgNode)
            .parallel(
                cc.tween(this.smallBetBgNode)
                    .to(0.05, { opacity: 255 }, {
                        easing: 'quartIn'
                    }),
                cc.tween(this.smallBetBgNode)
                    .to(0.2, { scaleX: 1, scaleY: 1 }, {
                        easing: 'quartOut'
                    }),
            )
            .start();
    }

    private playSmallWin() {
        cc.tween(this.winTitleNode)
            .to(0.2, { opacity: 255 })
            .start();
        cc.tween(this.bigWinBgNode)
            .parallel(
                cc.tween(this.bigWinBgNode)
                    .to(0.05, { opacity: 0 }, {
                        easing: 'quartIn'
                    }),
                cc.tween(this.bigWinBgNode)
                    .to(0.2, { scaleX: 1, scaleY: 1.325 }, {
                        easing: 'quartOut'
                    })
            )
            .call(() => {
                this.bigWinBgNode.active = false;
                this.bigWinBgNode.setScale(1, 1);
            })
            .start();

        this.smallWinBgNode.active = true;
        this.smallWinBgNode.opacity = 0;
        this.smallWinBgNode.setScale(1, 0.755);
        cc.tween(this.smallWinBgNode)
            .parallel(
                cc.tween(this.smallWinBgNode)
                    .to(0.05, { opacity: 255 }, {
                        easing: 'quartIn'
                    }),
                cc.tween(this.smallWinBgNode)
                    .to(0.2, { scaleX: 1, scaleY: 1 }, {
                        easing: 'quartOut'
                    }),
            )
            .start();
    }

    private playBigWin() {
        cc.tween(this.winTitleNode)
            .to(0.2, { opacity: 0 })
            .start();
        cc.tween(this.smallWinBgNode)
            .parallel(
                cc.tween(this.smallWinBgNode)
                    .to(0.05, { opacity: 0 }, {
                        easing: 'quartIn'
                    }),
                cc.tween(this.smallWinBgNode)
                    .to(0.2, { scaleX: 1, scaleY: 0.755 }, {
                        easing: 'quartOut'
                    })
            )
            .call(() => {
                this.smallWinBgNode.active = false;
                this.smallWinBgNode.setScale(1, 1);
            })
            .start();

        this.bigWinBgNode.active = true;
        this.bigWinBgNode.opacity = 0;
        this.bigWinBgNode.setScale(1, 1.325);
        cc.tween(this.bigWinBgNode)
            .parallel(
                cc.tween(this.bigWinBgNode)
                    .to(0.05, { opacity: 255 }, {
                        easing: 'quartIn'
                    }),
                cc.tween(this.bigWinBgNode)
                    .to(0.2, { scaleX: 1, scaleY: 1 }, {
                        easing: 'quartOut'
                    }),
            )
            .start();
    }

    /**
     * 获得按钮是否能点击
     * @returns 
     */
    public getIsCanClick() {
        return this.isCanClick;
    }

    /**
     * 点击不能点得按钮时的提示
     * @returns 
     */
    public btnCanNotTips() {
        if (this.getIsCanClick() && !this.getIsAutoBet()) {
            return true;
        }
        NewBankTipsManager.instance.showTips('tips_cant_click');
        return false;
    }
}
