import { BundleType, CommonTopStatus, SpinBtnStatus, TurntableStatus } from "./BaseFrame/Const/StoneAgeCommonDefine";
import { StoneAgeEventDefine } from "./BaseFrame/Const/StoneAgeEventDefine";
import StoneAgeDialogManager from "./BaseFrame/Manager/StoneAgeDialogManager";
import StoneAgeSlotEventManager from "./BaseFrame/Manager/StoneAgeSlotEventManager";
// import GuideManager from "../../../../Script/BaseFrame/Manager/GuideManager";
import StoneAgeLogManager from "./BaseFrame/Manager/StoneAgeLogManager";
import StoneAgeTipsManager from "./BaseFrame/Manager/StoneAgeTipsManager";
import ButtonEx from "./BaseFrame/UI/Component/StoneAgeButtonEx";
import StoneAgeComponentBase from "./BaseFrame/UI/ComponentBase/StoneAgeComponentBase";
import StoneAgeCommonTop from "./Common/StoneAgeCommonTop";
import PlayerProxy from "./Common/StoneAgePlayerProxy";
import SlotsBottomBtn from "./Common/StoneAgeSlotsBottomBtn";
import StoneAgeAcitonManager from "./StoneAgeAcitonManager";
import { StoneAgeActionType } from "./StoneAgeDefine";
import StoneAgeProxy from "./StoneAgeProxy";
import StoneAgeTurnTable from "./StoneAgeTurnTable";
import StoneAgeView from "./StoneAgeView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class StoneAgeOperate extends StoneAgeComponentBase {
    @property(ButtonEx)
    spinSmallButtonEx: ButtonEx = null;//缩小状态Spin按钮
    @property(ButtonEx)
    smallAutoButtonEx: ButtonEx = null;//缩小状态auto按钮
    @property(ButtonEx)
    returnButtonEx: ButtonEx = null;//返回按钮
    @property(ButtonEx)
    smallAddButtonEx: ButtonEx = null;//缩小状态加注
    @property(ButtonEx)
    smallSubButtonEx: ButtonEx = null;//缩小状态减注
    @property(ButtonEx)
    maxBetSmallButton: ButtonEx = null;//缩小状态的满注按钮
    @property(ButtonEx)
    maxedBetSmallButton: ButtonEx = null;//缩小状态的已满注按钮
    @property(ButtonEx)
    ruleButton: ButtonEx = null;//规则按钮

    @property(cc.Node)
    topNode: cc.Node = null;
    @property(cc.Node)
    topXPStarNode: cc.Node = null;//顶部经验星星
    @property(cc.Node)
    freeCountLabelNode: cc.Node = null;//免费转剩余次数

    @property(SlotsBottomBtn)
    tsSlotsBottomBtn: SlotsBottomBtn = null;
    private tsStoneAgeView: StoneAgeView = null;
    private tsStoneAgeTurntable: StoneAgeTurnTable = null;
    private currGold: number = 0;//当前应该展示的金币余额

    @property(ButtonEx)
    testBtn: ButtonEx = null;
    @property(ButtonEx)
    testBtnTwo: ButtonEx = null;

    onLoad() {
        this.tsStoneAgeView = this.node.getComponent("StoneAgeView");
        this.tsStoneAgeTurntable = this.node.getComponent("StoneAgeTurnTable");
        let lv = PlayerProxy.instance.playerVO.lv;
        // let playerConfig = ConfigProxy.instance.getConfigData('Player')[lv] as Player;
        this.tsSlotsBottomBtn.currBetRangeIndex = 1000;//playerConfig.betRange.length - 2;
    }

    start() {
        this.addEvent();
        this.updateBet(false, false);
        this.testBtn.node.active = false;//Util.test && LoginDeal.instance.getURL() != URL_IP.INTERNET_RELEASE;
        this.testBtnTwo.node.active = false;//Util.test && LoginDeal.instance.getURL() != URL_IP.INTERNET_RELEASE;
    }

    private addEvent() {
        this.tsSlotsBottomBtn.onClickSpinCallback = this.onClickSpin.bind(this);
        this.tsSlotsBottomBtn.onClickAddBetCallback = this.onClickAddBet.bind(this);
        this.tsSlotsBottomBtn.onLongPressAddBetCallback = this.onLongPressAddBet.bind(this);
        this.tsSlotsBottomBtn.onClickSubBetCallback = this.onClickSubBet.bind(this);
        this.tsSlotsBottomBtn.onLongPressSubBetCallback = this.onLongPressSubBet.bind(this);
        this.tsSlotsBottomBtn.onClickMaxBetCallback = this.onClickMaxBet.bind(this);
        this.tsSlotsBottomBtn.onClickMaxedBetCallback = this.onClickMaxedBet.bind(this);

        this.tsSlotsBottomBtn.onLongPressSpinCallback = this.onLongPressSpin.bind(this);
        this.tsSlotsBottomBtn.onLongPressSpinEndCallbackCallback = this.onLongPressSpinEndCallback.bind(this);
        this.tsSlotsBottomBtn.onClickOuterSpinCallback = this.onClickOuterSpin.bind(this);
        this.tsSlotsBottomBtn.onClickInsideSpinCallback = this.onClickInsideSpin.bind(this);
        this.returnButtonEx.clickCallback = this.onClickReturn.bind(this);
        this.smallAutoButtonEx.clickCallback = this.onClickStopAutoSpin.bind(this);
        this.ruleButton.clickCallback = this.onClickRule.bind(this);
        StoneAgeSlotEventManager.instance.on(StoneAgeEventDefine.STOP_AUTO_SPIN, this.onClickStopAutoSpin, this);
        StoneAgeSlotEventManager.instance.on(StoneAgeEventDefine.BET_ERROR, () => {
            this.setButtonCanClick();
            this.onClickStopAutoSpin();
        }, this);
        StoneAgeSlotEventManager.instance.on(StoneAgeEventDefine.UPDATE_FREE_COUNT, () => {
            this.freeCountLabelNode.getComponent(cc.Label).string = StoneAgeProxy.instance.freeSpinCount.toString();
        }, this);

        this.testBtn.clickCallback = () => {
            //免费转
            let data = "[[151101,151106,151101,151108,151301],[151104,151107,151102,151102,151301],[151106,151108,151103,151105,151301]]"
            //大奖
            // let data = "[[151106,151105,151104,151108,151108],[151106,151201,151101,151106,151105],[151103,151107,151106,151102,151108]]"
            this.tsSlotsBottomBtn.onClickSpin(data);
            // DialogManager.instance.openDialog(BundleType.STONE_AGE, "Prefabs/FreeDialog/StoneAgeFreeResultDialog", {
            //     num: 500,
            //     callback: () => {
            //         // this.close();
            //     }
            // });
            // ViewManager.instance.openView(BundleType.STONE_AGE, 'Prefabs/MiniGameView/StoneAgeMiniView', { data: {}, isKill: false }, false, ViewCloseAnimType.ONE, ViewOpenAnimType.ONE);
            // DialogManager.instance.openDialog(BundleType.STONE_AGE, "Prefabs/FreeDialog/StoneAgeFreeDialog", {
            //     num: 5,
            //     callback: () => {
            //     }
            // });
        }
        this.testBtnTwo.clickCallback = () => {
            //大奖
            let data = "[[151106,151106,151106,151106,151106],[151106,151106,151106,151106,151105],[151106,151106,151106,151102,151108]]"
            this.tsSlotsBottomBtn.onClickSpin(data);
        }
    }

    /**
     * 投注
     */
    public onClickSpin(testData?: string) {
        //设置lastwin
        if (StoneAgeProxy.instance.gameOverData && StoneAgeProxy.instance.gameOverData.totalPay && 0 != StoneAgeProxy.instance.gameOverData.totalPay) {
            // this.tsSlotsBottomBtn.setWinNum({
            //     num: StoneAgeProxy.instance.gameOverData.totalPay,
            //     isChange: false
            // });
            // this.tsSlotsBottomBtn.setWinTitle(true);
        }
        //清除上一次的动画
        this.tsStoneAgeTurntable.cleanResultAnim();
        this.tsSlotsBottomBtn.cancleNotOperationAnim();
        //清除因上一次彩金展示导致的延迟结算产生的计时器
        this.tsStoneAgeTurntable.clearDelayResultTimerId();
        let action = StoneAgeAcitonManager.instance.getNextAction();
        if (null != action && action.type == StoneAgeActionType.RESULT) {
            StoneAgeAcitonManager.instance.deleteFirstAction();
        }
        if (StoneAgeProxy.instance.freeSpinCount == 0) {
            this.setCurrGold(PlayerProxy.instance.gold);
        }
        //转盘转动
        this.tsStoneAgeView.startWheel();
    }

    /**
     * 长按投注
     */
    public onLongPressSpin() {
    }

    /**
     * 长按投注结束回调
     */
    public onLongPressSpinEndCallback() {
    }

    private onClickOuterSpin() {
    }

    private onClickInsideSpin() {
    }

    /**
    * 停止自动投注
    */
    public onClickStopAutoSpin() {
        this.tsSlotsBottomBtn.setIsAutoBet(false);
        this.tsSlotsBottomBtn.setSpinStatus(SpinBtnStatus.SPIN);
        this.tsSlotsBottomBtn.stopSpinSpineAnim();
        if (this.tsStoneAgeView.tsStoneAgeTurntable.getScrollStatus() == TurntableStatus.STOP) {
            this.setButtonCanClick()
        };
    }

    /**
    * 返回大厅
    */
    private onClickReturn() {
        let tsCommonTop: StoneAgeCommonTop = <StoneAgeCommonTop>this.topNode.getComponent(StoneAgeCommonTop);
        if (tsCommonTop.getStatus() == CommonTopStatus.BAN) {
            StoneAgeTipsManager.instance.showTips('tips_cant_click');
        }
        else {
            // RoomDeal.instance.sendExitRoom();
            // DialogManager.instance.openCommonDialog("level_quit", () => { RoomDeal.instance.sendExitRoom(); });
            this.node.destroy();
            // const bundle = cc.assetManager.getBundle('StoneAge')
            // bundle.releaseAll();
        }
    }

    private onClickRule() {
        StoneAgeDialogManager.instance.openDialog(BundleType.STONE_AGE, "Prefabs/RuleDialog/StoneAgeRuleDialog");
    }

    /**
    * 点击加注
    */
    private onClickAddBet() {
        this.updateBet();
    }

    /**
     * 点击减注
     */
    private onClickSubBet() {
        this.updateBet();
    }

    /**
     * 点击满注
     */
    private onClickMaxBet() {
        this.updateBet();
    }

    /**
     * 长按加注
     */
    private onLongPressAddBet() {
        this.updateBet();
    }

    /**
     * 长按减注
     */
    private onLongPressSubBet() {
        this.updateBet();
    }

    /**
   * 点击已满注按钮
   */
    private onClickMaxedBet() {
    }

    /**
     * 投注后，某些按钮设置为不可点击状态：加、减注，spin，满注
     */
    public setButtonCanNotClick() {
        this.tsSlotsBottomBtn.setButtonCanNotClick();
        StoneAgeSlotEventManager.instance.emit(StoneAgeEventDefine.COMMON_TOP_STATUS_CHANGE, CommonTopStatus.BAN);
    }

    /**
     * 适当的时机将某些按钮变为可点击状态
     */
    public setButtonCanClick() {
        this.tsSlotsBottomBtn.setButtonCanClick();
        StoneAgeSlotEventManager.instance.emit(StoneAgeEventDefine.COMMON_TOP_STATUS_CHANGE, CommonTopStatus.NORMAL);
    }

    /**
     * 更新下注数量
     * @param isChange 是否滚动增长（默认要否）
     * @param isPlaySound 是否播放声音（默认要播）
     */
    public updateBet(isChange: boolean = false, isPlaySound: boolean = true) {
        let bet = null;
        if (StoneAgeProxy.instance.freeSpinCount != 0) {
            bet = StoneAgeProxy.instance.freeBet;
        }
        this.tsSlotsBottomBtn.updateBet({
            currBetRangeIndex: this.tsSlotsBottomBtn.currBetRangeIndex,
            isChange: isChange,
            isPlaySound: isPlaySound,
            bet: bet
        });
    }

    /**
     * 设置当前应该展示的金币余额
     */
    public setCurrGold(num: number) {
        this.currGold = num;
        StoneAgeLogManager.instance.info("设置gold：", this.currGold);
    }

    /**
     * 获得当前应该展示的金币余额
     */
    public getCurrGold(): number {
        return this.currGold;
    }

    /**
     * 点击不能点得按钮时的提示
     * @returns 
     */
    public btnCanNotTips() {
        if (this.tsSlotsBottomBtn.getIsCanClick() && !this.tsSlotsBottomBtn.getIsAutoBet()) {
            return true;
        }
        StoneAgeTipsManager.instance.showTips('tips_cant_click');
        return false;
    }




}
