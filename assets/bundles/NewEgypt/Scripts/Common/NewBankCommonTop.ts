import { Constants } from "../../../../Script/Constants";
import { BundleType, CommonTopStatus, FunctionKey, OperateTypeEnum, ViewCloseAnimType, ViewOpenAnimType } from "../BaseFrame/Const/NewBankCommonDefine";
import { NewBankEventDefine } from "../BaseFrame/Const/NewBankEventDefine";
import NewBankDialogManager from "../BaseFrame/Manager/NewBankDialogManager";
import NewBankSlotEventManager from "../BaseFrame/Manager/NewBankSlotEventManager";
import NewBankTipsManager from "../BaseFrame/Manager/NewBankTipsManager";
import NewBankViewManager from "../BaseFrame/Manager/NewBankViewManager";
import ButtonEx from "../BaseFrame/UI/Component/NewBankButtonEx";
import NewBankLabelEx from "../BaseFrame/UI/Component/NewBankLabelEx";
import ProgressBarEx, { ProgressBarEvent } from "../BaseFrame/UI/Component/NewBankProgressBarEx";
import SpriteEx from "../BaseFrame/UI/Component/NewBankSpriteEx";
import NewBankComponentBase from "../BaseFrame/UI/ComponentBase/NewBankComponentBase";
import NewBankUtil from "../BaseFrame/Util/NewBankUtil";
import PlayerProxy from "./NewBankPlayerProxy";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewBankCommonTop extends NewBankComponentBase {
    @property(ButtonEx)
    private avatarBtn: ButtonEx = null;//头像按钮
    @property(ButtonEx)
    private shopBtn: ButtonEx = null;//商城按钮
    @property(ButtonEx)
    private vipBtn: ButtonEx = null;//vip按钮
    @property(ButtonEx)
    private saveMoneyBtn: ButtonEx = null;//存钱罐按钮
    @property(ButtonEx)
    private menuBtn: ButtonEx = null;//菜单按钮

    @property(NewBankLabelEx)
    private goldLabel: NewBankLabelEx = null;//金币
    @property(NewBankLabelEx)
    private levelLabel: NewBankLabelEx = null;//等级

    @property(ProgressBarEx)
    private expProgressBar: ProgressBarEx = null;//等级
    @property(cc.Node)
    private menuCloseBtn: cc.Node = null;//等级
    @property(cc.Node)
    private btnNode: cc.Node = null;
    @property(cc.Node)
    private expMaxNode: cc.Node = null;//经验条满级时候显示的图片
    @property(cc.Node)
    private particleMask: cc.Node = null;//经验条粒子遮罩节点
    @property(SpriteEx)
    private avatarIcon: SpriteEx = null;
    @property(cc.Node)
    private particleNode: cc.Node = null;//经验条增加时，右侧粒子的父节点
    @property(cc.Prefab)
    private particlePrefab: cc.Prefab = null;///经验条增加时，右侧粒子预制

    @property
    private isHall: boolean = false;///判断是在大厅还是游戏
    @property
    private tipKey: string = 'tips_cant_click';///不能操作时的key值

    private showMenu: boolean = false;
    private status: CommonTopStatus = CommonTopStatus.NORMAL;//按钮状态

    // private upLevelAward: UpLevelAward = null;

    protected onLoad(): void {
        this.addHandler();
        this.updateExpInfo();
        this.updatePlayerGold(false);
        this.updateAvatar();
    }

    private addHandler(): void {
        this.avatarBtn && (this.avatarBtn.clickCallback = this.onAvatar.bind(this));
        this.shopBtn.clickCallback = this.onShop.bind(this);
        this.vipBtn.clickCallback = this.onVip.bind(this);
        this.saveMoneyBtn.clickCallback = this.onSaveMoney.bind(this);
        this.menuBtn.clickCallback = this.onMenu.bind(this);
        this.expProgressBar.node.on(ProgressBarEvent.PROGRESS_TWEEN_UPDATE, this.setParticleMaskPos, this);
        NewBankSlotEventManager.instance.on(NewBankEventDefine.CLOSE_MENU_DIALOG, this.onMenuClose, this);
        NewBankSlotEventManager.instance.on(NewBankEventDefine.USERINFO_CHANGED, this.updateAvatar, this);
        NewBankSlotEventManager.instance.on(NewBankEventDefine.UPDATE_PLAYER_GOLD, this.playGoldChanged, this);
        NewBankSlotEventManager.instance.on(NewBankEventDefine.COMMON_TOP_STATUS_CHANGE, (status: CommonTopStatus) => {
            this.setStatus(status);
        }, this);
    }

    private async checkShowUpLevelAward() {
        // const playerVO = PlayerProxy.instance.playerVO;
        // if (!playerVO.levelUp) {
        //     return;
        // }
        // const config = ConfigProxy.instance.getConfigData('Upgrade');
        // const lv = playerVO.lv;
        // const upLevelInfo = config[lv] as Upgrade;
        // if (!upLevelInfo || upLevelInfo.active == -1) {
        //     return;
        // }
        // if (!this.upLevelAward) {
        //     const prefab: cc.Prefab = await ResManager.instance.loadByBundle(BundleType.RESOURCES, 'Prefabs/Common/UpLevelAward', cc.Prefab);
        //     const node = cc.instantiate(prefab);
        //     this.node.addChild(node);
        //     node.setSiblingIndex(0);
        //     this.upLevelAward = node.getComponent(UpLevelAward);
        // }
        // this.upLevelAward.show();
    }

    /**
     * 金币发生变化
     */
    private playGoldChanged(data: { operateType: OperateTypeEnum }): void {
        if (!data) {
            this.updatePlayerGold();
            return;
        }
        switch (data.operateType) {
            //游戏下注
            case OperateTypeEnum.GAMING_BETTING:
            //卡包奖励
            case OperateTypeEnum.PACK_REWARD:
            //卡包碎片奖励
            case OperateTypeEnum.PACK_FRAGMENT_REWARD:
            //周任务奖励
            case OperateTypeEnum.WEEKLY_ASSIGNMENT_AWARD:
            //免费奖励
            case OperateTypeEnum.REWARD_FREE_AWARD:
            //连续登录奖励
            case OperateTypeEnum.CONTINUOUS_LOGIN_AWARD:
            //破产礼包免费奖励
            case OperateTypeEnum.BANKRUPTCY_ASSISTANCE_FREE:
            //小鸡农场
            case OperateTypeEnum.CHICKEN_FARM:
            //游戏结算
            case OperateTypeEnum.GAMING_SETTLE: return;
            default: this.updatePlayerGold();
        }
    }

    /**
     * 更新经验条
     */
    public async updateExpInfo(isAni: boolean = false) {
        // const playerVO = PlayerProxy.instance.playerVO;
        // const lv = playerVO.lv;
        // const lastLv = playerVO.lastLv;
        // let time = 0;
        // if (isAni) {
        //     const node = cc.instantiate(this.particlePrefab);
        //     this.particleNode.addChild(node);
        //     this.particleNode.x = this.particleMask.width - 10;
        // }
        // if (lv != lastLv) {
        //     const lastTotalExp = PlayerProxy.instance.getTotalExpByLv(lastLv);
        //     time = isAni ? 1 : 0;
        //     this.expProgressBar.setProgress({ current: lastTotalExp, total: lastTotalExp, isTween: isAni, time: time });
        // }
        // this.setTimeOut(() => {
        //     this.levelLabel.label.string = '' + playerVO.lv;
        //     const isMax = PlayerProxy.instance.checkLvIsMax(lv);
        //     this.particleMask && (this.particleMask.active = !isMax);
        //     this.expMaxNode.active = isMax;
        //     this.expProgressBar.node.active = !isMax;
        //     if (isMax) {
        //         return;
        //     }
        //     const totalExp = PlayerProxy.instance.getTotalExpByLv(lv);
        //     const exp = playerVO.exp;
        //     this.expProgressBar.setProgress({ current: exp, total: totalExp, isTween: isAni });
        //     !isAni && this.setParticleMaskPos();
        // }, time);
    }

    /**
     *设置经验条粒子动画遮罩节点的位置
     */
    private setParticleMaskPos(): void {
        const width = this.expProgressBar.getCurrWidth();
        this.particleMask && (this.particleMask.width = width);
        this.particleNode.x = width - 10;
    }

    /**
     * 更新玩家金币
     */
    public updatePlayerGold(isDigit: boolean = true, descGold: number = -1): void {
        const gold = descGold == -1 ? Constants.getInstance().gold : descGold;
        console.log('updatePlayerGold gold:', gold);
        if (descGold != -1) {
            Constants.getInstance().gold = gold;
        }
        if (isDigit) {
            this.goldLabel.digitEffect({
                score: gold,
                time: 0.5,
                isCoin: true,
                bit: 0
            });
            return;
        }
        this.goldLabel.label.string = NewBankUtil.formateCoinStr(gold);
    }

    /**
     * 头像点击事件
     */
    private onAvatar(): void {
        if (PlayerProxy.instance.playerVO.gameState == CommonTopStatus.BAN) {
            NewBankTipsManager.instance.showTips(this.tipKey);
        }
        else {
            NewBankDialogManager.instance.openDialog(BundleType.HALL, 'Prefabs/Dialog/InformationDialog');
        }
    }


    /**
     * shop按钮点击事件
     */
    private onShop(): void {
        if (PlayerProxy.instance.playerVO.gameState == CommonTopStatus.BAN) {
            NewBankTipsManager.instance.showTips(this.tipKey);
        }
        else {
            NewBankViewManager.instance.openView(BundleType.HALL, 'Prefabs/View/ShopView', null, this.isHall, ViewCloseAnimType.ONE, ViewOpenAnimType.ONE);
        }
    }

    /**
     * prime按钮点击事件
     */
    private onVip(): void {
        if (PlayerProxy.instance.playerVO.gameState == CommonTopStatus.BAN) {
            NewBankTipsManager.instance.showTips(this.tipKey);
        }
        else {
            NewBankDialogManager.instance.openDialog(BundleType.HALL, 'Prefabs/Dialog/PrimeDialog');
        }
        // TipsManager.instance.showTips('This system is not closed now.');
    }

    /**
     * 存钱罐按钮点击事件
     */
    private onSaveMoney(): void {
        if (PlayerProxy.instance.playerVO.gameState == CommonTopStatus.BAN) {
            NewBankTipsManager.instance.showTips(this.tipKey);
            return;
        }
        const unlock = NewBankUtil.checkFunctionOpen(FunctionKey.BANK_PIG);
        if (!unlock) {
            return;
        }
        NewBankViewManager.instance.openView(BundleType.HALL, 'Prefabs/View/BankView', null, this.isHall);
    }

    /**
     * 菜单按钮点击事件
     */
    private onMenu(): void {
        this.showMenu = true;
        NewBankDialogManager.instance.openDialog(BundleType.HALL, 'Prefabs/Dialog/MenuDialog', this.tipKey);
        this.changeMenuState();
    }

    /**
     * 关闭菜单
     */
    private onMenuClose(): void {
        this.showMenu = false;
        this.changeMenuState();
    }

    /**
     * 改变菜单状态
     */
    private changeMenuState(): void {
        this.showMenu ? this.showMenuAni() : this.hideMenuAni();
    }

    private updateAvatar(): void {
        // const playerVO = PlayerProxy.instance.playerVO;
        // //系统头像
        // if (playerVO.headType == 1) {
        //     this.avatarIcon.sprite.sizeMode = cc.Sprite.SizeMode.RAW;
        //     const icon = PlayerProxy.instance.getInformationPageAvatar(+playerVO.headImg);
        //     this.avatarIcon.setImage(BundleType.RESOURCES, icon);
        // }
        // //三方头像
        // else {
        //     this.avatarIcon.sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        //     this.avatarIcon.loadRemoteImage(playerVO.headImg, 192, 192);
        // }
    }

    /**
     * 显示菜单时按钮的动画
     */
    private showMenuAni(): void {
        cc.tween(this.menuCloseBtn)
            .to(0.2, { opacity: 255 }, { easing: 'quartOut' })
            .start();
        cc.tween(this.menuBtn.node)
            .to(0.2, { opacity: 0 }, { easing: 'quartIn' })
            .start();
    }

    /**
     * 隐藏菜单时按钮的动画
     */
    private hideMenuAni(): void {
        cc.tween(this.menuCloseBtn)
            .to(0.2, { opacity: 0 }, { easing: 'quartIn' })
            .start();
        cc.tween(this.menuBtn.node)
            .to(0.2, { opacity: 255 }, { easing: 'quartOut' })
            .start();
    }

    private setStatus(status: CommonTopStatus) {
        this.status = status;
        PlayerProxy.instance.setGameState(status);
    }

    public playBig() {
        cc.tween(this.btnNode)
            .to(0.2, { y: 120 }, {
                easing: 'sineOut'
            })
            .call(() => {
                this.btnNode.active = false;
            }).start();
    }

    public playSmall() {
        this.btnNode.active = true;
        cc.tween(this.btnNode)
            .to(0.2, { y: 0 }, {
                easing: 'sineOut'
            })
            .start();
    }

    /**
     * 获得状态
     * @returns 
     */
    public getStatus() {
        return this.status;
    }

    /**
     * 判断是否自动打开等级解锁界面
     */
    public checkShowLevelRoad(isJump: boolean = true): boolean {
        // this.checkShowUpLevelAward();
        // //判断是否触发解锁特殊功能或者奖励
        // const playerVO = PlayerProxy.instance.playerVO;
        // const lv = playerVO.lv;
        // const lastLv = playerVO.lastLv;
        // const config = ConfigProxy.instance.getConfigData('Levelroad');
        // const levelRoadInfo = config[lv] as Levelroad;
        // const isSpecial = levelRoadInfo && levelRoadInfo.unlockType != -1;
        // const jumpLv = LocalStorageManager.instance.getLocalData(LocalStorageType.LEVELROAD, '0', true);
        // const needShowLevelRoad = lv != lastLv && isSpecial && jumpLv != lv;
        // if (isJump) {
        //     needShowLevelRoad && ViewManager.instance.openView(BundleType.HALL, 'Prefabs/View/LevelRoadView', null, false);
        // }
        return false;
    }
}
