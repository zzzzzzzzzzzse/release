import { Constants } from "../../../../../Script/Constants";
import { UserInfoModel } from "../../../../../Script/models/UserInfoModel";
import ResourcesLoader from "../../../../../Script/tools/ResourcesLoder";
import { StringUtil } from "../../../../../Script/tools/StringUtil";
import ResourcesConfig from "../../../config/ResourcesConfig";
import { NormalPage } from "../pages/PageStack";
import { SwitchBox } from "../widget/SwitchBox";

/**
 * 排行榜界面
 */
export default class LobbyLeaderboardView extends NormalPage {
    private baseNode: cc.Node;
    //金币
    private m_label_coin: cc.Node;
    //钻石
    private m_label_diamonds: cc.Node;
    //菜单
    private m_menuSwitch: SwitchBox;
 
    //界面
    private viewList: cc.Node[] = [];
    private currentView: cc.Node = null;
 
    //排行榜积分容器
    private view_leaderboradsScore: LeaderboradsScoreView;
    //排行榜金币容器
    private view_leaderboradsGold: LeaderboradsGoldView;
 
 
    private scoreUserList: UserInfoModel[] = [];
    private goldUserList: UserInfoModel[] = [];
    //选中样式
    private itemSelect: cc.SpriteFrame;
    //未选中样式
    private itemUnSelect: cc.SpriteFrame;
 
    constructor(node: cc.Node) {
        super(node);
        this.baseNode = node;
 
        this.m_label_coin = this.baseNode.getChildByName('layout_top').getChildByName('user_chips').getChildByName('label_chips');
        this.m_label_diamonds = this.baseNode.getChildByName('layout_top').getChildByName('user_diamonds').getChildByName('label_diamonds');
 
        //界面
        this.viewList = this.baseNode.getChildByName('layout_container').children;
        //菜单
        this.m_menuSwitch = node.getChildByName("layout_left").getComponent(SwitchBox);
 
        this.view_leaderboradsScore = new LeaderboradsScoreView(this.viewList[0], this.scoreUserList);
        this.view_leaderboradsGold = new LeaderboradsGoldView(this.viewList[1], this.goldUserList);
 
        ResourcesLoader.bundleImgLoader(Constants.getInstance().m_hallBundle, ResourcesConfig.m_shopItemSelect).then(asset => {
            this.itemSelect = asset;
            ResourcesLoader.bundleImgLoader(Constants.getInstance().m_hallBundle, ResourcesConfig.m_shopItemUnSelect).then(asset => {
                this.itemUnSelect = asset;
                this.m_menuSwitch.node.on("switch-change", this.onMenuSwitchChange.bind(this));
                this.m_menuSwitch.switch(0);
            });
        });
    }
 
    /**
     * 绑定视图
     */
     public bindViewData() {
        if(Constants.getInstance().m_LoginUserSession.userWalletInfo) {
            this.m_label_coin.getComponent(cc.Label).string = StringUtil.showMoneyType(Constants.getInstance().m_LoginUserSession.userWalletInfo.m_gameCoin);
            this.m_label_diamonds.getComponent(cc.Label).string = StringUtil.showMoneyType(Constants.getInstance().m_LoginUserSession.userWalletInfo.m_goldCoin);
        }
    }
 
    /**
     * 显示视图
     * @param index 索引
     */
     public showView(index: number) {
        this.m_menuSwitch.switch(index);
    }
 
    private onMenuSwitchChange(index: number) {
        if (this.currentView){
            this.currentView.active = false;
        }
        //显示按钮
        for(let i = 0; i < 2; i++) {
            this.m_menuSwitch.menus[i].getChildByName('bg').getComponent(cc.Sprite).spriteFrame = this.itemUnSelect;
            this.setItemSelectLabelType(0, this.m_menuSwitch.menus[i].getChildByName('label'));
        }
        this.m_menuSwitch.menus[index].getChildByName('bg').getComponent(cc.Sprite).spriteFrame = this.itemSelect;
        this.setItemSelectLabelType(1, this.m_menuSwitch.menus[index].getChildByName('label'));
        //显示界面
        this.currentView = this.viewList[index];
        this.currentView.active = true;
    }
 
    /**
     * 设置按钮样式
     * @param type 0：未选中；1：选中
     * @param labelNode 文本控件
     */
    public setItemSelectLabelType(type: number, labelNode: cc.Node) {
        if (type === 0) {
            labelNode.color = cc.color(144, 114, 220);
            labelNode.getComponent(cc.Label).fontSize = 30;
            labelNode.getComponent(cc.LabelOutline).color = cc.color(46, 7, 103);
        } else if (type === 1) {
            labelNode.color = cc.color(255, 255, 255);
            labelNode.getComponent(cc.Label).fontSize = 36;
            labelNode.getComponent(cc.LabelOutline).color = cc.color(51, 61, 187);
        }
    }
}
 
/**
 * 排行榜积分容器
 */
 class LeaderboradsScoreView {
    public node: cc.Node = null;
 
    constructor(node: cc.Node, dataList: any[]) {
        this.node = node;
    }
}
/**
 * 排行榜金币容器
 */
class LeaderboradsGoldView {
    public node: cc.Node = null;
 
    constructor(node: cc.Node, dataList: any[]) {
        this.node = node;
    }
}