import AppPlatformConfig from "../../../../Script/configs/AppPlatformConfig";
import { EVENT } from "../../../../Script/configs/ConstDefine";
import { Constants } from "../../../../Script/Constants";
import { AudioMgr } from "../../../../Script/framework/mgr/AudioManager";
import { EventMgr } from "../../../../Script/framework/mgr/EventManager";
import { UserInfoModel } from "../../../../Script/models/UserInfoModel";
import AnalyticsTool, { AnalyticsEventEnmu } from "../../../../Script/tools/log/AnalyticsTool";
import ResourcesLoader from "../../../../Script/tools/ResourcesLoder";
import { LocalStorageTool } from "../../../../Script/tools/storage/LocalStorageTool";
import { StringUtil } from "../../../../Script/tools/StringUtil";
import UserLevelConfig from "../../../../Script/tools/UserLevelConfig";
import { CheckBox } from "../../../../Script/UI/widget/CheckBox";
import ResourcesConfig from "../../config/ResourcesConfig";
import CollectTool from "../tool/CollectTool";
import { NormalPage, PageStack } from "./pages/PageStack";
import LobbyLeaderboardView from "./view/LobbyLeaderboardView";
import LobbyShopView from "./view/LobbyShopView";
import LobbySignInView from "./view/LobbySignInView";
import UserHeaderPrefab, { UserHeaderPrefabItem } from "./widget/lobbylistview/prefab/UserHeaderPrefab";
import ScrollViewPlus from "./widget/lobbylistview/ScrollViewPlus";

/**
 * lobby场景的界面
 */
export class LobbyPages extends PageStack {

    public constructor(node: cc.Node, signPrefabs: cc.Prefab) {
        super(node);
        this.addPage(ViewType.view_profile, new ProfilePage(node.getChildByName("page_profile"), this));
        this.addPage(ViewType.view_profile_edit, new ProfileEditPage(node.getChildByName("page_profile_edit"), this));
        this.addPage(ViewType.view_settings, new GameSettingPage(node.getChildByName("page_settings"), this));
        this.addPage(ViewType.view_shops, new LobbyShopView(node.getChildByName("page_shop")));
        this.addPage(ViewType.view_leaderborads, new LobbyLeaderboardView(node.getChildByName("page_leaderboard")));
        this.addPage(ViewType.view_signIn, new LobbySignInView(node.getChildByName("page_signIn"), signPrefabs));
        this.addPage(ViewType.view_dialog_tips, new DialogTips(node.getChildByName("dialog_tips"), this));
        this.addPage(ViewType.view_dialog_select, new DialogSelect(node.getChildByName("dialog_select"), this));
    }
}

/**
 * 用户信息界面
 */
export class ProfilePage extends NormalPage {
    private m_node: cc.Node;
    private pages: PageStack = null;

    private m_img_userHeader: cc.Node;//用户头像

    private m_label_totalWinnings: cc.Node;//下注赢的钱
    private m_label_biggestWin: cc.Node;//最大赢得钱
    private m_label_totalSpins: cc.Node;//下注值
    private m_label_spinsWin: cc.Node;//下注赢的钱

    private m_label_userName: cc.Node;//用户名
    private m_label_userCoin: cc.Node;//用户金币
    private m_label_userDiamonds: cc.Node;//用户钻石
    private m_label_level: cc.Node;//用户等级

    private m_btn_edit: cc.Node;//修改
    private m_btn_addCoin: cc.Node;//加钱
    private m_btn_addDiamonds: cc.Node;//加钻石
    private m_layout_facebook: cc.Node;//facebook登录
    private m_btn_facebook: cc.Node;//facebook登录
    private m_btn_mask: cc.Node;//头像遮罩点击按钮
    private m_layout_ios: cc.Node;//ios登陆
    private m_btn_ios: cc.Node;//ios登陆
    private m_label_useruuid: cc.Node;
    private m_mask_bar: cc.Node;
    private m_edit_btn: cc.Node;
    private m_layout_logout: cc.Node;
    private m_btn_logout: cc.Node;

    public constructor(node: cc.Node, pages: PageStack) {
        super(node);
        this.m_node = node;
        this.pages = pages;

        this.m_img_userHeader = this.m_node.getChildByName('layout_left').getChildByName('layout_header').getChildByName('mask').getChildByName('img_header');

        this.m_label_totalWinnings = this.m_node.getChildByName('layout_left').getChildByName('layout_total_winnings').getChildByName('layout_label').getChildByName('label');
        this.m_label_biggestWin = this.m_node.getChildByName('layout_left').getChildByName('layout_biggest_win').getChildByName('layout_label').getChildByName('label');
        this.m_label_totalSpins = this.m_node.getChildByName('layout_left').getChildByName('layout_total_spins').getChildByName('layout_label').getChildByName('label');
        this.m_label_spinsWin = this.m_node.getChildByName('layout_left').getChildByName('layout_spins_win').getChildByName('layout_label').getChildByName('label');

        this.m_label_userName = this.m_node.getChildByName('layout_left').getChildByName('layout_id').getChildByName('label');
        this.m_label_useruuid = this.m_node.getChildByName('layout_left').getChildByName('layout_uuid').getChildByName('label');
        this.m_label_userCoin = this.m_node.getChildByName('layout_right').getChildByName('layout_coin').getChildByName('label');
        this.m_label_userDiamonds = this.m_node.getChildByName('layout_right').getChildByName('layout_diamonds').getChildByName('label');
        this.m_label_level = this.m_node.getChildByName('layout_left').getChildByName('layout_exp').getChildByName('label');
        this.m_mask_bar = this.m_node.getChildByName('layout_left').getChildByName('layout_exp').getChildByName('mask').getChildByName('bar');
        this.m_mask_bar.x = -250;

        this.m_btn_edit = this.m_node.getChildByName('layout_left').getChildByName('layout_header').getChildByName('img_edit');
        this.m_btn_mask = this.m_node.getChildByName('layout_left').getChildByName('layout_header').getChildByName('mask');
        this.m_btn_addCoin = this.m_node.getChildByName('layout_right').getChildByName('layout_coin').getChildByName('btn_add');
        this.m_btn_addDiamonds = this.m_node.getChildByName('layout_right').getChildByName('layout_diamonds').getChildByName('btn_add');
        this.m_layout_facebook = this.m_node.getChildByName('layout_right').getChildByName('layout').getChildByName('layout_facebook');
        this.m_btn_facebook = this.m_layout_facebook.getChildByName('btn_facebook');
        this.m_layout_ios = this.m_node.getChildByName('layout_right').getChildByName('layout').getChildByName('layout_ios');
        this.m_btn_ios = this.m_layout_ios.getChildByName('btn_ios');

        this.m_edit_btn = this.m_node.getChildByName('layout_left').getChildByName('edit_btn')
        this.m_layout_logout = this.m_node.getChildByName('layout_right').getChildByName('layout').getChildByName('layout_logout');
        this.m_btn_logout = this.m_layout_logout.getChildByName('btn_logout');

        this.m_btn_mask.on("click", this.clickEdit.bind(this));
        this.m_btn_edit.on("click", this.clickEdit.bind(this));
        this.m_btn_addCoin.on("click", this.clickAddCoin.bind(this));
        this.m_btn_addDiamonds.on("click", this.clickAddDiamonds.bind(this));
        this.m_btn_facebook.on("click", this.clickFacebook.bind(this));
        this.m_btn_ios.on("click", this.clickIos.bind(this));
        this.m_edit_btn.on("click", this.clickEdit.bind(this));

        this.m_btn_logout.on("click", this.clicklogout.bind(this));
    }

    public async clicklogout() {
        console.log('clicklogout');
        LocalStorageTool.setLoginserInfo(null);
        Constants.getInstance().hallSocket.closeSocket();
        cc.director.loadScene("CoreLoadScene")
        CollectTool.nextTime = -1;
        Constants.getInstance().m_firstOpenLobby = true
    }


    /**
     * 绑定用户信息
     * @param userInfo 用户信息
     */
    public async bindViewData(userInfo: UserInfoModel) {
        if (userInfo) {
            //头像
            let headindex = LocalStorageTool.getUserHeaderId()
            if (headindex == 0 && Constants.getInstance().isfacebook && AppPlatformConfig.ISOPENFBIMG) {
                cc.assetManager.loadRemote<cc.Texture2D>(ResourcesConfig.m_userHeaderImgUrl[LocalStorageTool.getUserHeaderId()], { ext: ".png" }, (err, texture) => {
                    if (texture) {
                        let spriteframe = new cc.SpriteFrame(texture)
                        this.m_img_userHeader.getComponent(cc.Sprite).spriteFrame = spriteframe;
                    }
                });
            } else {
                ResourcesLoader.bundleImgLoader(Constants.getInstance().m_hallBundle, ResourcesConfig.m_userHeaderImgUrl[LocalStorageTool.getUserHeaderId()]).then(asset => {
                    if (asset) {
                        this.m_img_userHeader.getComponent(cc.Sprite).spriteFrame = asset;
                    }
                });
            }

            //用户名字
            this.m_label_userName.getComponent(cc.Label).string = userInfo.m_nickName;
            this.m_label_useruuid.getComponent(cc.Label).string = "ID:" + userInfo.m_uid;
            if (Constants.getInstance().m_LoginUserSession.userWalletInfo) {
                //用户金币
                this.m_label_userCoin.getComponent(cc.Label).string = StringUtil.showMoneyType(Constants.getInstance().m_LoginUserSession.userWalletInfo.m_gameCoin);
                //用户钻石
                this.m_label_userDiamonds.getComponent(cc.Label).string = StringUtil.showMoneyType(Constants.getInstance().m_LoginUserSession.userWalletInfo.m_goldCoin);

            }

            //用户等级
            this.m_label_level.getComponent(cc.Label).string = userInfo.m_level + '';

            if (Constants.getInstance().NATIVE_ANDROID) {
                this.m_layout_ios.active = false;
                // if (Constants.getInstance().m_LoginUserSession.userInfo.getFacebookStatus()) {
                //     this.m_layout_facebook.active = false;
                // } else {
                //     this.m_layout_facebook.active = true;
                // }
                this.m_layout_facebook.active = false;
                this.m_layout_logout.active = true;
            } else if (Constants.getInstance().NATIVE_IOS) {
                this.m_layout_facebook.active = false;
                if (Constants.getInstance().m_LoginUserSession.userInfo.getIOSStatus()) {
                    this.m_layout_ios.active = false;
                } else {
                    this.m_layout_ios.active = true;
                }
            }
            // if (this.m_layout_facebook.active || this.m_layout_ios.active) {
            //     this.m_layout_logout.active = false;
            // } else {
            //     this.m_layout_logout.active = true;
            // }
            this.m_layout_ios.active = false;
            this.m_layout_facebook.active = false;
            this.m_layout_logout.active = true;

            let thisExp = Constants.getInstance().m_LoginUserSession.userInfo.m_expValue - UserLevelConfig.getUserLevelFullExp(Constants.getInstance().m_LoginUserSession.userInfo.m_level) * UserLevelConfig.expMultiple;
            let nextExp = UserLevelConfig.getUserLevelRectExp(Constants.getInstance().m_LoginUserSession.userInfo.m_level + 1) * UserLevelConfig.expMultiple;
            let layoutWidth = Number(thisExp) / Number(nextExp) * 240;
            this.m_mask_bar.x = -250 + layoutWidth;
        }


    }

    /**
     * 点击设置
     */
    public clickEdit() {
        let page = this.pages.getPage(ViewType.view_profile_edit) as ProfileEditPage;
        page.open();
        page.initData();
        AnalyticsTool.logEvent(AnalyticsEventEnmu.user_info)
    }

    /**
     * 充值金币
     */
    public clickAddCoin() {
        EventMgr.dispatch(EVENT.EVENT_OPEN_SHOP, 0);
        AnalyticsTool.logEvent(AnalyticsEventEnmu.user_coin)
    }

    /**
     * 充值钻石
     */
    public clickAddDiamonds() {
        EventMgr.dispatch(EVENT.EVENT_OPEN_SHOP, 1);
        AnalyticsTool.logEvent(AnalyticsEventEnmu.user_diamond)
    }

    /**
     * facebook登录
     */
    public async clickFacebook() {
        AnalyticsTool.logEvent(AnalyticsEventEnmu.login_facebook);
        Constants.getInstance().native.faceBookBind();
    }

    public async clickIos() {
        console.log('lickIos');
        AnalyticsTool.logEvent(AnalyticsEventEnmu.login_ios);
        Constants.getInstance().native.iosBind();
    }
}


/**
 * 修改用户头像
 */
export class ProfileEditPage extends NormalPage {
    private m_node: cc.Node;
    private pages: PageStack = null;

    private m_label_userName: cc.Node;//用户名

    private m_btn_edit;//设置
    private m_btn_save;//保存

    private m_userHeader_list: ScrollViewPlus;
    private m_userHeader_item: cc.Prefab;

    private m_init: boolean = false;

    private m_iconIndex: number = 0;
    private m_editBox: cc.EditBox;
    private oldname: string = "";

    public constructor(node: cc.Node, pages: PageStack) {
        super(node);
        this.m_node = node;
        this.pages = pages;

        this.m_label_userName = this.m_node.getChildByName('layout_name').getChildByName('layout_edit_name').getChildByName('editBox');
        this.m_editBox = this.m_label_userName.getComponent(cc.EditBox);

        this.m_btn_edit = this.m_node.getChildByName('layout_name').getChildByName('btn_edit');
        this.m_btn_save = this.m_node.getChildByName('layout_btn').getChildByName('btn_save');

        this.m_userHeader_list = this.m_node.getChildByName('layout_container').getChildByName('img_list').getComponent(ScrollViewPlus);
        ResourcesLoader.bundlePrefabsLoder(Constants.getInstance().m_hallBundle, "prefabs/userHeader_item").then(asset => {
            this.m_userHeader_item = asset;
        });

        if (this.m_init == false) {
            this.m_userHeader_list.node.opacity = 0
            setTimeout(() => {
                this.m_userHeader_list.node.opacity = 255
            }, 2000);
        }

        this.m_iconIndex = LocalStorageTool.getUserHeaderId();

        this.m_btn_edit.on("click", this.clickEdit.bind(this));
        this.m_btn_save.on("click", this.clickSave.bind(this));
    }

    private async addg(dataList: Array<string>) {
        this.m_userHeader_list.content.removeAllChildren();
        // await this.executePreFrame(this._getItemGenerator(dataList), 0.1);
        // 在创建好子节点之后，先手动调用一次DC优化，触发当前在可视区域内的节点的进入逻辑
        // 后续的ScrollView滚动时，内部自动回调
        this.ItemGenerator(dataList)
        this.m_userHeader_list.getComponent(ScrollViewPlus).scrollToTop(0)
        this.m_userHeader_list.optDc();
        this.itemClick(this.m_iconIndex);
    }

    /**
     * 分帧执行 Generator 逻辑
     *
     * @param generator 生成器
     * @param duration 持续时间（ms），每次执行 Generator 的操作时，最长可持续执行时长。假设值为8ms，那么表示1帧（总共16ms）下，分出8ms时间给此逻辑执行
     */
    private executePreFrame(generator: Generator, duration: number) {
        return new Promise<void>((resolve, reject) => {
            let gen = generator;
            // 创建执行函数
            let execute = () => {
                // 执行之前，先记录开始时间
                let startTime = new Date().getTime();

                // 然后一直从 Generator 中获取已经拆分好的代码段出来执行
                for (let iter = gen.next(); ; iter = gen.next()) {
                    // 判断是否已经执行完所有 Generator 的小代码段，如果是的话，那么就表示任务完成
                    if (iter == null || iter.done) {
                        resolve();
                        return;
                    }

                    // 每执行完一段小代码段，都检查一下是否已经超过我们分配的本帧，这些小代码端的最大可执行时间
                    if (new Date().getTime() - startTime > duration) {
                        // 如果超过了，那么本帧就不在执行，开定时器，让下一帧再执行
                        this.scheduleOnce(() => {
                            execute();
                        });
                        return;
                    }
                }
            };

            // 运行执行函数
            execute();
        });
    }

    private *_getItemGenerator(data: Array<string>) {
        for (let i = 0; i < data.length; i++) {
            yield this._initScrollViewItemPrefab({
                index: i,
                picPath: data[i]
            });
        }
    }
    private _initScrollViewItemPrefab(data: UserHeaderPrefabItem) {
        let itemNode = cc.instantiate(this.m_userHeader_item);
        itemNode.parent = this.m_userHeader_list.content;
        itemNode.getComponent(UserHeaderPrefab).bindData(data, this.itemClick.bind(this));
    }

    private ItemGenerator(data: Array<string>) {
        for (let i = 0; i < data.length; i++) {
            this.ScrollViewItemPrefab({
                index: i,
                picPath: data[i]
            });
        }
    }

    private ScrollViewItemPrefab(data: UserHeaderPrefabItem) {
        let itemNode = cc.instantiate(this.m_userHeader_item);
        itemNode.parent = this.m_userHeader_list.content;
        itemNode.getComponent(UserHeaderPrefab).bindData(data, this.itemClick.bind(this));
    }

    /**
     * item点击
     */
    private itemClick(index: number) {
        this.m_iconIndex = index;
        LocalStorageTool.setUserHeaderId(String(index));
        this.m_userHeader_list.content.children.forEach(itemNode => {
            let itemData = itemNode.getComponent(UserHeaderPrefab);
            itemData.showClickBtn(itemData.itemData().index === index);
        });
    }

    /**
     * 绑定用户信息
     * @param userInfo 用户信息
     */
    public initData() {
        if (Constants.getInstance().m_LoginUserSession.userInfo) {
            //用户名字
            this.m_label_userName.getComponent(cc.EditBox).string = Constants.getInstance().m_LoginUserSession.userInfo.m_nickName;
            this.oldname = this.m_label_userName.getComponent(cc.EditBox).string
        }
        if (!this.m_init) {
            this.addg(ResourcesConfig.m_userHeaderImgUrl);
            this.m_init = true;
        }
        if (this.m_init) {
            this.m_userHeader_list.getComponent(ScrollViewPlus).scrollToTop(0)
            this.m_userHeader_list.optDc();
        }

        this.itemClick(this.m_iconIndex);
    }

    /**
     * 修改
     */
    public clickEdit() {
        this.m_editBox.focus();
        // AnalyticsTool.logEvent(AnalyticsEventEnmu.user_edit)
    }

    /**
     * 保存
     */
    public clickSave() {
        let userName = this.m_label_userName.getComponent(cc.EditBox).string;
        if (this.oldname != userName) {
            AnalyticsTool.logEvent(AnalyticsEventEnmu.user_edit)
        }
        this.node.emit(ClickEvent.click_editUserName, userName);
        this.node.active = false;
    }
}

/**
 * 修改用户头像
 */
export class GameSettingPage extends NormalPage {
    private m_node: cc.Node;
    private pages: PageStack = null;

    private m_checkBox_sounds: cc.Node;//音效
    private m_checkBox_music: cc.Node;//背景音乐
    private m_checkBox_vibration: cc.Node;//震动
    private m_checkBox_systemNotify: cc.Node;//系统通知
    private m_checkBox_jackpotNotify: cc.Node;//游戏通知

    private m_btn_help: cc.Node;//帮助
    private m_btn_rateUs: cc.Node;//评价我们
    private m_btn_contactUs: cc.Node;//联系我们
    private m_btn_Terms: cc.Node;//团队
    private m_btn_privacyPollcy: cc.Node;//隐私
    private m_btn_about: cc.Node;//关于我们
    private m_btn_delete: cc.Node;//注销

    private m_label_version: cc.Label;//版本

    public constructor(node: cc.Node, pages: PageStack) {
        super(node);
        this.m_node = node;
        this.pages = pages;

        this.m_label_version = this.node.getChildByName('bg').getChildByName('label_version').getComponent(cc.Label);

        this.m_checkBox_sounds = this.m_node.getChildByName('layout_content').getChildByName('item_sounds').getChildByName('btn_checkbox');
        this.m_checkBox_music = this.m_node.getChildByName('layout_content').getChildByName('item_music').getChildByName('btn_checkbox');
        this.m_checkBox_vibration = this.m_node.getChildByName('layout_content').getChildByName('item_vibration').getChildByName('btn_checkbox');
        this.m_checkBox_systemNotify = this.m_node.getChildByName('layout_content').getChildByName('item_systemNotifications').getChildByName('btn_checkbox');
        this.m_checkBox_jackpotNotify = this.m_node.getChildByName('layout_content').getChildByName('item_jackpotNotifications').getChildByName('btn_checkbox');

        this.m_btn_help = this.m_node.getChildByName('layout_content').getChildByName('layout_container').getChildByName('item_help');
        this.m_btn_rateUs = this.m_node.getChildByName('layout_content').getChildByName('layout_container').getChildByName('item_rateUs');
        this.m_btn_contactUs = this.m_node.getChildByName('layout_content').getChildByName('layout_container').getChildByName('item_contactUs');
        this.m_btn_Terms = this.m_node.getChildByName('layout_content').getChildByName('layout_container').getChildByName('item_terms');
        this.m_btn_privacyPollcy = this.m_node.getChildByName('layout_content').getChildByName('layout_container').getChildByName('item_privacyPollcy');
        this.m_btn_about = this.m_node.getChildByName('layout_content').getChildByName('layout_container').getChildByName('item_about');
        this.m_btn_delete = this.m_node.getChildByName('layout_content').getChildByName('layout_container').getChildByName('item_delete');

        if (cc.sys.isNative) {
            if (cc.sys.os === cc.sys.OS_ANDROID) {
                this.m_btn_delete.active = false
            } else if (cc.sys.os === cc.sys.OS_IOS) {
                this.m_btn_delete.active = true
            }
        }

        //测试
        // this.m_btn_delete.active = true

        //开关事件
        this.m_checkBox_sounds.on("check-change", this.checkBoxSound.bind(this));
        this.m_checkBox_music.on("check-change", this.checkBoxMusic.bind(this));
        this.m_checkBox_vibration.on("check-change", this.checkBoxVibration.bind(this));
        this.m_checkBox_systemNotify.on("check-change", this.checkBoxSystemNotify.bind(this));
        this.m_checkBox_jackpotNotify.on("check-change", this.checkBoxJackpotNotify.bind(this));
        if (StringUtil.isEmpty(AppPlatformConfig.rateUsUrl)) {
            this.m_btn_rateUs.active = false;
        } else {
            // this.m_btn_rateUs.active = true;
        }
        // if (StringUtil.isEmpty(AppPlatformConfig.contactUsUrl)) {
        //     this.m_btn_contactUs.active = false;
        // } else {
        //     this.m_btn_contactUs.active = true;
        // }
        if (StringUtil.isEmpty(AppPlatformConfig.termUrl)) {
            this.m_btn_Terms.active = false;
        } else {
            // this.m_btn_Terms.active = true;
        }
        if (StringUtil.isEmpty(AppPlatformConfig.privateUrl)) {
            this.m_btn_privacyPollcy.active = false;
        } else {
            // this.m_btn_privacyPollcy.active = true;
        }
        if (StringUtil.isEmpty(AppPlatformConfig.aboutUrl)) {
            this.m_btn_about.active = false;
        } else {
            // this.m_btn_about.active = true;
        }
        //按钮事件
        this.m_btn_help.on("click", this.clickHelp.bind(this));
        this.m_btn_rateUs.on("click", this.openUrl.bind(this, AppPlatformConfig.rateUsUrl));
        // this.m_btn_contactUs.on("click", this.openUrl.bind(this, AppPlatformConfig.contactUsUrl));
        this.m_btn_contactUs.on("click", this.clickcontactUs.bind(this));
        this.m_btn_Terms.on("click", this.openUrl.bind(this, AppPlatformConfig.termUrl));
        this.m_btn_privacyPollcy.on("click", this.openUrl.bind(this, AppPlatformConfig.privateUrl));
        this.m_btn_about.on("click", this.openUrl.bind(this, AppPlatformConfig.aboutUrl));
        //注销
        this.m_btn_delete.on("click", this.clickdelete.bind(this));
    }

    clickcontactUs() {
        AnalyticsTool.logEvent(AnalyticsEventEnmu.lobby_help)
        Constants.getInstance().native.initFreshchatUser();
        Constants.getInstance().native.showConversations();
    }

    public initData() {
        let coreVersion = cc.sys.localStorage.getItem('app_coreVersion');
        let gameCoreVersion = cc.sys.localStorage.getItem('app_gameCoreVersion');
        let hallVersion = cc.sys.localStorage.getItem('app_hallVersion');
        this.m_label_version.string = 'version: ' + coreVersion + '.' + gameCoreVersion + "." + hallVersion;

        var music_set = parseInt(Manager.localStorage.getItem("music_save", 1));
        var sound_set = parseInt(Manager.localStorage.getItem("sound_save", 1));


        var systemmgs_set = parseInt(Manager.localStorage.getItem("systemmgs_set", 1));
        var jackpotmgs_set = parseInt(Manager.localStorage.getItem("jackpotmgs_set", 1));

        let musicisChecked = false
        let soundisChecked = false

        let systemmgsisChecked = false
        let jackpotmgsisChecked = false
        if (music_set == 1 || isNaN(music_set)) {
            musicisChecked = true;
        } else {
            musicisChecked = false;
        }

        if (sound_set == 1 || isNaN(sound_set)) {
            soundisChecked = true;
        } else {
            soundisChecked = false;
        }

        if (systemmgs_set == 1 || isNaN(systemmgs_set)) {
            systemmgsisChecked = true;
        } else {
            systemmgsisChecked = false;
        }

        if (jackpotmgs_set == 1 || isNaN(jackpotmgs_set)) {
            jackpotmgsisChecked = true;
        } else {
            jackpotmgsisChecked = false;
        }


        this.m_checkBox_sounds.getComponent(CheckBox).setCheck(soundisChecked);
        this.m_checkBox_music.getComponent(CheckBox).setCheck(musicisChecked);
        this.m_checkBox_vibration.getComponent(CheckBox).setCheck(LocalStorageTool.getVibrationStatus());
        this.m_checkBox_systemNotify.getComponent(CheckBox).setCheck(systemmgsisChecked);
        this.m_checkBox_jackpotNotify.getComponent(CheckBox).setCheck(jackpotmgsisChecked);
    }

    /**
     * 改变音效开关
     * @param check 开关
     */
    public checkBoxSound(check: boolean) {
        // LocalStorageTool.setSoundStatus(check);
        if (check) {
            AudioMgr.openeffect()
            AnalyticsTool.logEvent(AnalyticsEventEnmu.lobby_sound, "open")
        } else {
            AudioMgr.closeeffect()
            AnalyticsTool.logEvent(AnalyticsEventEnmu.lobby_sound, "close")
        }
    }
    /**
     * 改变音乐开关
     * @param check 开关
     */
    public checkBoxMusic(check: boolean) {
        // LocalStorageTool.setMusicStatus(check);
        if (check) {
            AudioMgr.openMusic("resources")
            AnalyticsTool.logEvent(AnalyticsEventEnmu.lobby_music, "open")
        } else {
            AudioMgr.closeMusic()
            AnalyticsTool.logEvent(AnalyticsEventEnmu.lobby_music, "close")
        }
    }
    /**
     * 改变震动开关
     * @param check 开关
     */
    public checkBoxVibration(check: boolean) {
        LocalStorageTool.setVibrationStatus(check);

        if (check) {
            AnalyticsTool.logEvent(AnalyticsEventEnmu.lobby_vibration, "open")
        } else {
            AnalyticsTool.logEvent(AnalyticsEventEnmu.lobby_vibration, "close")
        }
    }
    /**
     * 改变系统通知开关
     * @param check 开关
     */
    public checkBoxSystemNotify(check: boolean) {
        // LocalStorageTool.setSystemNotifyStatus(check);
        if (check) {
            Manager.localStorage.setItem("systemmgs_set", 1)
            AnalyticsTool.logEvent(AnalyticsEventEnmu.lobby_system, "open")
        } else {
            Manager.localStorage.setItem("systemmgs_set", 0)
            AnalyticsTool.logEvent(AnalyticsEventEnmu.lobby_system, "close")
        }
    }
    /**
     * 改变游戏通知开关
     * @param check 开关
     */
    public checkBoxJackpotNotify(check: boolean) {
        // LocalStorageTool.setGameNotifyStatus(check);
        if (check) {
            Manager.localStorage.setItem("jackpotmgs_set", 1)
            AnalyticsTool.logEvent(AnalyticsEventEnmu.lobby_jackpot, "open")
        } else {
            Manager.localStorage.setItem("jackpotmgs_set", 0)
            AnalyticsTool.logEvent(AnalyticsEventEnmu.lobby_jackpot, "close")
        }
    }

    /**
     * 打开网站
     * @param urlString 地址
     */
    public openUrl(urlString: string) {
        AnalyticsTool.logEvent(AnalyticsEventEnmu.lobby_pollcy)
        cc.sys.openURL(urlString);
    }

    public clickHelp() {
        AnalyticsTool.logEvent(AnalyticsEventEnmu.lobby_help)
        Constants.getInstance().native.initFreshchatUser();
        Constants.getInstance().native.showConversations();
    }

    public clickdelete() {
        cc.log("clickdelete")
        cc.sys.localStorage.setItem('gold', '');
        var _gameScene = cc.director.getScene()
        var _canvas = cc.find("Canvas", _gameScene)
        Constants.getInstance().m_hallBundle.load(ResourcesConfig.m_deleteAccountView, cc.Prefab, (err, prefab: cc.Prefab) => {
            if (prefab) {
                let itemNode = cc.instantiate(prefab);
                itemNode.parent = _canvas;
                itemNode.zIndex = 10000
            }
        });


        // UserApi.deleteAccount();
    }
}

/**
 * 提示弹窗
 */
export class DialogTips extends NormalPage {
    private m_node: cc.Node;
    private pages: PageStack = null;

    private m_label_content: cc.Node;//用户名

    private m_btn_ok;//确定
    private m_callBack: Function;

    public constructor(node: cc.Node, pages: PageStack) {
        super(node);
        this.m_node = node;
        this.pages = pages;

        this.m_label_content = this.m_node.getChildByName('content').getChildByName('label');

        this.m_btn_ok = this.m_node.getChildByName('btn');

        this.m_btn_ok.on("click", this.clickOk.bind(this));
    }

    /**
     * 设置内容
     * @param userInfo 用户信息
     */
    public initData(content: string, callBack: Function) {
        this.m_label_content.getComponent(cc.Label).string = content;
        this.m_callBack = callBack;
    }

    /**
     * 确定
     */
    public clickOk() {
        if (this.m_callBack) {
            this.m_callBack()
        }
        this.close();
    }
}

/**
 * 提示弹窗
 */
export class DialogSelect extends NormalPage {
    private m_node: cc.Node;
    private pages: PageStack = null;

    private m_label_content: cc.Node;//用户名

    private m_btn_cancel;// 取消
    private m_btn_ok;//确定
    private m_callBack1: Function;
    private m_callBack2: Function;

    public constructor(node: cc.Node, pages: PageStack) {
        super(node);
        this.m_node = node;
        this.pages = pages;

        this.m_label_content = this.m_node.getChildByName('content').getChildByName('label');

        this.m_btn_cancel = this.m_node.getChildByName('btn1');
        this.m_btn_ok = this.m_node.getChildByName('btn2');

        this.m_btn_cancel.on("click", this.clickCancel.bind(this));
        this.m_btn_ok.on("click", this.clickOk.bind(this));
    }

    /**
     * 设置内容
     * @param userInfo 用户信息
     */
    public initData(content: string, callBack1: Function, callBack2: Function) {
        this.m_label_content.getComponent(cc.Label).string = content;
        this.m_callBack1 = callBack1;
        this.m_callBack2 = callBack2;
    }

    /**
     * 取消
     */
    public clickCancel() {
        if (this.m_callBack1) {
            this.m_callBack1()
        }
        this.close();
    }
    /**
     * 确定
     */
    public clickOk() {
        if (this.m_callBack2) {
            this.m_callBack2()
        }
        this.close();
    }
}

/**
 * 界面类型
 */
export enum ViewType {
    //用户信息界面
    view_profile = "profile",
    //用户修改信息系界面
    view_profile_edit = "profile_edit",
    //设置界面
    view_settings = "settings",
    //商店界面
    view_shops = "viewShop",
    //排行榜界面
    view_leaderborads = "viewLeaderborads",
    //签到界面
    view_signIn = "viewSignIn",
    //提示弹窗
    view_dialog_tips = "viewDialogTips",
    //选择弹窗
    view_dialog_select = "viewDialogSelect",
}

/**
 * 点击事件
 */
export enum ClickEvent {
    click_editUserName = 'click_editUserName',
}
