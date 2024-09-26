import { Constants } from "../../../../Script/Constants";
import CoinFlyPool from "../../../../Script/UI/dialog/CoinFlyPool";
import { BaseUI } from "../../../../Script/common/BaseUI";
import { EventBusEnum } from "../../../../Script/common/EventBus";
import AppBundleConfig from "../../../../Script/configs/AppBundleConfig";
import AppLanguageConfig from "../../../../Script/configs/AppLanguageConfig";
import AppPlatformConfig, { AppPlatformType } from "../../../../Script/configs/AppPlatformConfig";
import { EVENT } from "../../../../Script/configs/ConstDefine";
import { AudioMgr } from "../../../../Script/framework/mgr/AudioManager";
import { EventMgr } from "../../../../Script/framework/mgr/EventManager";
import SlotTipsManager from "../../../../Script/framework/mgr/SlotTipsManager";
import OpenMoneyInfo from "../../../../Script/models/OpenMoneyInfo";
import SignItemModel from "../../../../Script/models/SignItemModel";
import SignModel from "../../../../Script/models/SignModel";
import { SlotGameModel } from "../../../../Script/models/SlotGameModel";
import { SlotGoldPoolInfo } from "../../../../Script/models/SlotGoldPoolInfo";
import { UserInfoModel } from "../../../../Script/models/UserInfoModel";
import UserSelfInfo from "../../../../Script/models/UserSelfInfo";
import { CoreApi } from "../../../../Script/net/apis/CoreApi";
import { SlotApi } from "../../../../Script/net/apis/SlotApi";
import UserApi from "../../../../Script/net/apis/UserApi";
import { WalletApi } from "../../../../Script/net/apis/WalletApi";
import DateTimerUtil from "../../../../Script/tools/DateTimerUtil";
import ResourcesLoader from "../../../../Script/tools/ResourcesLoder";
import { StringUtil } from "../../../../Script/tools/StringUtil";
import UserLevelConfig from "../../../../Script/tools/UserLevelConfig";
import { CoreUpdate } from "../../../../Script/tools/coreupdate/Coreupdate";
import { CoreupdateManager } from "../../../../Script/tools/coreupdate/CoreupdateManager";
import AnalyticsTool, { AnalyticsEventEnmu } from "../../../../Script/tools/log/AnalyticsTool";
import { LocalStorageTool } from "../../../../Script/tools/storage/LocalStorageTool";
import { UIManagernew } from "../../../../UIManagernew";
import ResourcesConfig from "../../config/ResourcesConfig";
import { SlotGameConfigModel } from "../../config/SlotGameConfig";
import CollectTool from "../tool/CollectTool";
import { ClickEvent, DialogSelect, GameSettingPage, LobbyPages, ProfilePage, ViewType } from "./LobbyPages";
import { Dialog_gameSelect } from "./dialog/Dialog_gameSelect";
import LobbyLeaderboardView from "./view/LobbyLeaderboardView";
import LobbyShopView from "./view/LobbyShopView";
import LobbySignInView from "./view/LobbySignInView";
import ViewConnectTips from "./view/ViewConnectTips";
import ScrollViewPlus from "./widget/lobbylistview/ScrollViewPlus";
import ScrollViewPlusItem from "./widget/lobbylistview/ScrollViewPlusItem";
import GamePrefab, { GamePrefabItem } from "./widget/lobbylistview/prefab/GamePrefab";

const { ccclass, property } = cc._decorator;
/**
 * 大厅场景
 */
@ccclass
export default class LobbyScene extends cc.Component {
    //签到item的prefab
    @property(cc.Prefab)
    signInItem: cc.Prefab = null;

    //游戏ScrollView
    @property(ScrollViewPlus)
    gameScrollViewPlus: ScrollViewPlus = null;
    //游戏item
    @property(cc.Prefab)
    gameScrollViewItemPrefab: cc.Prefab = null;

    //游戏长item
    @property(cc.Prefab)
    gameScrollViewChangItemPrefab: cc.Prefab = null;

    //游戏kong
    @property(cc.Prefab)
    gameScrollViewkongItemPrefab: cc.Prefab = null;

    /** 商店视图 */
    @property(ScrollViewPlus)
    coinsScrollViewPlus: ScrollViewPlus = null;
    @property(ScrollViewPlus)
    diamondScrollViewPlus: ScrollViewPlus = null;
    @property(ScrollViewPlus)
    vipScrollViewPlus: ScrollViewPlus = null;
    /** 商品item */
    @property(cc.Prefab)
    goodsScrollViewItemPrefab: cc.Prefab = null;

    @property(cc.Node)
    guanggaonod: cc.Node = null;

    @property(cc.Node)
    masknod: cc.Node = null;



    /**
     * 弹窗页管理
     */
    public pages: LobbyPages = null;

    /**
     * 用户设置界面
     */
    private profileView: UserProfileView;
    //飞金币动画
    public m_anim_coin_fly: CoinFlyPool;

    //游戏选择弹窗
    private m_dialog_gameSelect: Dialog_gameSelect;
    private m_slotsList: Array<SlotGameModel>;
    //facebook提示
    private m_ViewConnectTips: ViewConnectTips;
    //在线奖励
    private btn_collectTime: cc.Node;
    private label_collectTime: cc.Node;
    private img_collectTime: cc.Node;
    private dibu: cc.Node;
    private dibu2: cc.Node;
    /** 在线签到奖励时间 */
    private m_userCollectTime;
    private m_userCollectNextTime: number;

    /**
     * 是否打开游戏
     */
    private isOpenGame: boolean = false;
    /**
     * 已下载哪些游戏
     */
    private downlaodedGame: number[] = [];

    private deReg_HotLoad = () => { };
    private deReg_backBtnPressed = () => { };
    private deReg_userLoginSuccess = () => { };
    private deReg_userLoginErr = () => { };
    private deReg_giveResult = () => { };
    private deReg_depositSuccess = () => { };
    private istouch: boolean = false;
    private loadingbg: cc.Node;
    private backnod: cc.Node;
    private istouchdaily: boolean = false;

    //奖励动画
    private m_playColletAnim: boolean = false;
    private zhujue1: cc.Node;
    private zhujue2: cc.Node;
    private zhujue3: cc.Node;
    private iscanhide: boolean = false;
    issendbetbol: boolean = false;
    sendbetTime: NodeJS.Timeout = null;
    waitingbetTime: NodeJS.Timeout = null;
    isfitbol: boolean = true;
    hallVersion: cc.Label;
    allgamenode: cc.Node[] = [];
    GAME_WAITTIME: number = 10;
    CurGameTime: number = 0;
    isrecordtime: boolean = false;
    isplaying: boolean = false;
    curgamenode: cc.Node = null;
    ani_idarr: number[] = [];
    svBBoxRect: any = null;
    shownum: number = 8
    giftani: cc.Node;
    giftimg: cc.Node;
    CollectTimeshop: NodeJS.Timeout;
    rewardtips: cc.Node;
    settingbutton: cc.Node;
    diamond_ani: cc.Node;
    coin_ani: cc.Node;
    btn_buy_b_ani: cc.Node;
    item_n_stamps_ani: cc.Node;
    item_mission_ani: cc.Node;
    item_vip_ani: cc.Node;
    item_n_inbox_ani: cc.Node;
    item_n_events_ani: cc.Node;
    guangbg1: cc.Node;
    guangbg2: cc.Node;
    guangnod: cc.Node;


    onLoad() {
        this.init();
    }

    start() {
        this.scheduleOnce(() => {
            this.fitview();
            this.updateUserProfile(Constants.getInstance().m_LoginUserSession.userInfo);
            this.isplaying = true
            console.error("uuid", Constants.getInstance().m_LoginUserSession.m_uid);
        }, 1)
    }

    private init() {
        // cc.log("hallscene!")        
        if (this.isfitbol) {
            this.isfitbol = false
            this.resetSize(this.node);
        }
        // if(Constants.getInstance().isloginCollect == true){
        //     Constants.getInstance().isloginCollect = false;
        //     this.getCollectReward()
        // }
        // this.node.getComponent(cc.Widget).enabled = false
        this.istouchdaily = false
        this.initView();
        this.initData();
        this.initListener();
        this.eventBusCallBack();
        AudioMgr.playMusic("public_slot/audio/lobby_bg", "resources")


    }

    private initView() {
        this.profileView = new UserProfileView(this.node.getChildByName("menu_top"));

        this.pages = new LobbyPages(this.node.getChildByName("ui_pages"), this.signInItem);
        this.pages.getPage(ViewType.view_profile_edit).node.on(ClickEvent.click_editUserName, this.editUserName.bind(this));

        this.backnod = this.node.getChildByName("back")
        //版本号
        this.hallVersion = this.node.getChildByName("verison").getComponent(cc.Label)
        if (this.hallVersion) {
            this.hallVersion.string = "Version: " + Manager.localStorage.getItem("hall_Version", 1)
        }
        if (AppPlatformConfig.platformType == AppPlatformType.KAIFA || AppPlatformConfig.platformType == AppPlatformType.TEST) {
            this.hallVersion.node.active = true
        } else {
            this.hallVersion.node.active = false
        }

        // this.giftani = this.node.getChildByName("menu_top").getChildByName("menu_top_middle").getChildByName("layout_buy").getChildByName("btn_middle_buy").getChildByName("giftbox")
        this.giftimg = this.node.getChildByName("menu_top").getChildByName("menu_top_middle").getChildByName("layout_buy").getChildByName("btn_middle_buy").getChildByName("gift_img")

        this.rewardtips = this.node.getChildByName("menu_top").getChildByName("user_exp").getChildByName("rewardtips")

        //动画
        this.settingbutton = this.node.getChildByName("menu_top").getChildByName("btn_setting").getChildByName("settingbutton")
        this.diamond_ani = this.node.getChildByName("menu_top").getChildByName("user_diamonds").getChildByName("diamond")
        this.coin_ani = this.node.getChildByName("menu_top").getChildByName("user_chips").getChildByName("coin")

        this.btn_buy_b_ani = this.node.getChildByName("menu_top").getChildByName("menu_top_middle").getChildByName("layout_buy").getChildByName("btn_middle_buy").getChildByName("btn_buy_b")

        this.item_n_stamps_ani = this.node.getChildByName("menu_btm").getChildByName("item_n_stamps").getChildByName("btn").getChildByName("suoani")
        this.item_mission_ani = this.node.getChildByName("menu_btm").getChildByName("item_mission").getChildByName("btn").getChildByName("suoani")
        this.item_vip_ani = this.node.getChildByName("menu_btm").getChildByName("item_vip").getChildByName("btn").getChildByName("suoani")

        this.item_n_inbox_ani = this.node.getChildByName("menu_btm").getChildByName("item_n_inbox").getChildByName("btn").getChildByName("suoani")
        this.item_n_events_ani = this.node.getChildByName("menu_btm").getChildByName("item_n_events").getChildByName("btn").getChildByName("suoani")

        this.onrequestrewardshop();

        //游戏选择初始化
        this.m_dialog_gameSelect = new Dialog_gameSelect();
        this.m_dialog_gameSelect.init(this.node.getChildByName('ui_pages').getChildByName('dialog_gameSelect'));
        //facebook提示
        this.m_ViewConnectTips = new ViewConnectTips(this.node.getChildByName('ui_pages').getChildByName('page_connect_tips'), this.onProfileBtnClick.bind(this));
        //在线奖励
        this.btn_collectTime = this.node.getChildByName('menu_btm').getChildByName('menu_middle').getChildByName('bg_collect');
        this.img_collectTime = this.node.getChildByName('menu_btm').getChildByName('menu_middle').getChildByName('img_collect');
        this.label_collectTime = this.node.getChildByName('menu_btm').getChildByName('menu_middle').getChildByName('label_collect');
        this.dibu = this.node.getChildByName('menu_btm').getChildByName('menu_middle').getChildByName('dibu');
        this.dibu2 = this.node.getChildByName('menu_btm').getChildByName('menu_middle').getChildByName('dibu2');

        this.guangnod = this.node.getChildByName('menu_btm').getChildByName('menu_middle').getChildByName("guangmask")
        this.guangbg1 = this.node.getChildByName('menu_btm').getChildByName('menu_middle').getChildByName("guangmask").getChildByName('guangbg');
        this.guangbg2 = this.node.getChildByName('menu_btm').getChildByName('menu_middle').getChildByName("guangmask").getChildByName('guangbg2');
        cc.tween(this.guangbg1)
            .by(3.1, { angle: 360 })
            .repeatForever()
            .start();
        cc.tween(this.guangbg2)
            .by(3.1, { angle: -360 })
            .repeatForever()
            .start();

        console.log("_isLHP", Constants.getInstance()._isLHP)
        if (Constants.getInstance()._isLHP == true) {
            this.guanggaonod.x = 150
        }

        this.m_anim_coin_fly = this.node.getChildByName('ui_pages').getChildByName('animCoinFly').getChildByName('anim_coin_fly').getComponent(CoinFlyPool);

        let loginUserInfo: UserSelfInfo = LocalStorageTool.getLoginserInfo();
        if (loginUserInfo.m_method == "oafb" && AppPlatformConfig.ISOPENFBIMG) {
            Constants.getInstance().isfacebook = true;
            ResourcesConfig.m_userHeaderImgUrl = [
                loginUserInfo.m_headurl,
                "res/userImg/icon_1",
                "res/userImg/icon_2",
                "res/userImg/icon_3",
                "res/userImg/icon_4",
                "res/userImg/icon_5",
                "res/userImg/icon_6",
                "res/userImg/icon_7",
                "res/userImg/icon_8",
                "res/userImg/icon_9",
                "res/userImg/icon_10",
                "res/userImg/icon_11",
                "res/userImg/icon_12",
                "res/userImg/icon_13",
                "res/userImg/icon_14",
                "res/userImg/icon_15",
                "res/userImg/icon_16",
                "res/userImg/icon_17",
                "res/userImg/icon_18",
                "res/userImg/icon_19",
                "res/userImg/icon_20",
                "res/userImg/icon_21",
                "res/userImg/icon_22",
                "res/userImg/icon_23",
                "res/userImg/icon_24",
                "res/userImg/icon_25",
                "res/userImg/icon_26",
                "res/userImg/icon_27",
                "res/userImg/icon_28",
                "res/userImg/icon_29"
            ]
        } else {
            Constants.getInstance().isfacebook = false;
            ResourcesConfig.m_userHeaderImgUrl = [
                "res/userImg/icon_1",
                "res/userImg/icon_2",
                "res/userImg/icon_3",
                "res/userImg/icon_4",
                "res/userImg/icon_5",
                "res/userImg/icon_6",
                "res/userImg/icon_7",
                "res/userImg/icon_8",
                "res/userImg/icon_9",
                "res/userImg/icon_10",
                "res/userImg/icon_11",
                "res/userImg/icon_12",
                "res/userImg/icon_13",
                "res/userImg/icon_14",
                "res/userImg/icon_15",
                "res/userImg/icon_16",
                "res/userImg/icon_17",
                "res/userImg/icon_18",
                "res/userImg/icon_19",
                "res/userImg/icon_20",
                "res/userImg/icon_21",
                "res/userImg/icon_22",
                "res/userImg/icon_23",
                "res/userImg/icon_24",
                "res/userImg/icon_25",
                "res/userImg/icon_26",
                "res/userImg/icon_27",
                "res/userImg/icon_28",
                "res/userImg/icon_29"
            ]
        }

        //播放动画
        this.playdonghua()
    }

    private enterGame(event: cc.Event, customStr: string): void {
        console.log('bundle %s', customStr)
        let btn = event.target.getComponent(cc.Button);
        btn.interactable = false;
        btn.scheduleOnce(() => {
            btn.interactable = true;
        }, 0.5)
        cc.assetManager.loadBundle(customStr, (err, bundle: cc.AssetManager.Bundle) => {
            if (err) {
                return;
            }
            bundle.load(`Prefabs/${customStr}View`, cc.Prefab, (err, prefab: cc.Prefab) => {
                if (err) {
                    return;
                }
                const node = cc.instantiate(prefab);
                this.node.addChild(node);
            })
        })
    }

    playdonghua() {
        this.settingbutton.getComponent(sp.Skeleton).setAnimation(0, "animation", false);
        this.settingbutton.getComponent(sp.Skeleton).setCompleteListener(() => {
            setTimeout(() => {
                if (this.settingbutton) {
                    this.settingbutton.getComponent(sp.Skeleton).setAnimation(0, "animation", false);
                }
            }, 4000);
        });
        this.diamond_ani.getComponent(sp.Skeleton).setAnimation(0, "idle", false);
        this.diamond_ani.getComponent(sp.Skeleton).setCompleteListener(() => {
            setTimeout(() => {
                if (this.diamond_ani) {
                    this.diamond_ani.getComponent(sp.Skeleton).setAnimation(0, "idle", false);
                }
            }, 4000);
        });
        this.coin_ani.getComponent(sp.Skeleton).setAnimation(0, "animation", false);
        this.coin_ani.getComponent(sp.Skeleton).setCompleteListener(() => {
            setTimeout(() => {
                if (this.coin_ani) {
                    this.coin_ani.getComponent(sp.Skeleton).setAnimation(0, "animation", false);
                }

            }, 4000);
        });

        this.btn_buy_b_ani.getComponent(sp.Skeleton).setAnimation(0, "animation", false);
        this.btn_buy_b_ani.getComponent(sp.Skeleton).setCompleteListener(() => {
            setTimeout(() => {
                if (this.btn_buy_b_ani) {
                    this.btn_buy_b_ani.getComponent(sp.Skeleton).setAnimation(0, "animation", false);
                }

            }, 3000);
        });

        this.item_n_stamps_ani.getComponent(sp.Skeleton).setAnimation(0, "idle", false);
        this.item_n_stamps_ani.getComponent(sp.Skeleton).setCompleteListener(() => {
            setTimeout(() => {
                if (this.item_n_stamps_ani) {
                    this.item_n_stamps_ani.getComponent(sp.Skeleton).setAnimation(0, "idle", false);
                }

            }, 4000);
        });
        this.item_mission_ani.getComponent(sp.Skeleton).setAnimation(0, "idle", false);
        this.item_mission_ani.getComponent(sp.Skeleton).setCompleteListener(() => {
            setTimeout(() => {
                if (this.item_mission_ani) {
                    this.item_mission_ani.getComponent(sp.Skeleton).setAnimation(0, "idle", false);
                }

            }, 4000);
        });
        this.item_vip_ani.getComponent(sp.Skeleton).setAnimation(0, "idle", false);
        this.item_vip_ani.getComponent(sp.Skeleton).setCompleteListener(() => {
            setTimeout(() => {
                if (this.item_vip_ani) {
                    this.item_vip_ani.getComponent(sp.Skeleton).setAnimation(0, "idle", false);
                }

            }, 4000);
        });

        this.item_n_inbox_ani.getComponent(sp.Skeleton).setAnimation(0, "idle", false);
        this.item_n_inbox_ani.getComponent(sp.Skeleton).setCompleteListener(() => {
            setTimeout(() => {
                if (this.item_n_inbox_ani) {
                    this.item_n_inbox_ani.getComponent(sp.Skeleton).setAnimation(0, "idle", false);
                }

            }, 4000);
        });
        this.item_n_events_ani.getComponent(sp.Skeleton).setAnimation(0, "idle", false);
        this.item_n_events_ani.getComponent(sp.Skeleton).setCompleteListener(() => {
            setTimeout(() => {
                if (this.item_n_events_ani) {
                    this.item_n_events_ani.getComponent(sp.Skeleton).setAnimation(0, "idle", false);
                }

            }, 4000);
        });

    }

    //客服
    private onkefuclick() {
        // let paydata = {
        //     type:1,
        //     num:1000,
        //     time:0,
        // }
        // EventMgr.dispatch(EVENT.EVENT_SHOP_PAYSUC,paydata);
        // EVENT.EVENT_SHOP_PAYSUC

        AnalyticsTool.logEvent(AnalyticsEventEnmu.lobby_help)
        Constants.getInstance().native.initFreshchatUser();
        Constants.getInstance().native.showConversations();

        // let msg1 = {
        //     name: "MessageBoxView",
        //     bundleIndex: "gameprefab",
        //     btnOkText: "Disconnect, please login again.",
        //     btnCount: 1,
        //     zorder: 10000,
        //     code:0
        // }
        // UIManagernew.openUI(msg1)
    }

    //客服
    private onkefuclick2() {
        let paydata = {
            type: 2,
            num: 1000,
            time: 100,
        }
        EventMgr.dispatch(EVENT.EVENT_SHOP_PAYSUC, paydata);
        // EVENT.EVENT_SHOP_PAYSUC

        // AnalyticsTool.logEvent(AnalyticsEventEnmu.lobby_help)
        // Constants.getInstance().native.initFreshchatUser();
        // Constants.getInstance().native.showConversations();
    }

    async onrequestrewardshop() {
        let result = await WalletApi.receiveOnlineList(2, "0");
        if (result.succ) {
            //获取奖励
            let rewardList: OpenMoneyInfo[] = result.data2;
            let time = result.data
            clearInterval(this.CollectTimeshop);
            this.CollectTimeshop = setInterval(() => {
                let newTime = Math.floor(new Date().getTime() / 1000);
                if (time > newTime) {
                    // if (this.giftani.active == true) {
                    //     this.giftani.active = false
                    //     // this.giftimg.active = true
                    // }

                } else {
                    //可以领取
                    // if (this.giftani.active == false) {
                    //     this.giftani.active = true
                    //     // this.giftimg.active = true
                    // }
                    // if(this.giftimg.active == true){
                    // this.giftani.active = true
                    // this.giftimg.active = false
                    // }
                    clearInterval(this.CollectTimeshop);
                }

            }, 0);
            // if(rewardList.length>0){
            //     this.giftani.active = true
            //     this.giftimg.active = false
            // }else{
            //     this.giftani.active = false
            //     this.giftimg.active = true
            // }
        }
    }

    private fitview() {
        // let menu_top_left = this.node.getChildByName("menu_top")
        // let menu_btm = this.node.getChildByName("menu_btm")
        // let user_head = menu_top_left.getChildByName("user_head")
        // let user_diamonds = menu_top_left.getChildByName("user_diamonds")
        // let user_chips = menu_top_left.getChildByName("user_chips")
        // let menu_top_middle = menu_top_left.getChildByName("menu_top_middle")
        // let user_exp = menu_top_left.getChildByName("user_exp")
        // let btn_setting = menu_top_left.getChildByName("btn_setting")

        // let item_n_stamps = menu_btm.getChildByName("item_n_stamps")
        // let item_mission = menu_btm.getChildByName("item_mission")
        // let item_vip = menu_btm.getChildByName("item_vip")

        // let item_n_inbox = menu_btm.getChildByName("item_n_inbox")
        // let item_n_events = menu_btm.getChildByName("item_n_events")
        // let item_n_signin = menu_btm.getChildByName("item_n_signin")

        // let frameSize = cc.view.getDesignResolutionSize();
        // let width = frameSize.width
        // let height = frameSize.height;
        // if (user_head.x > 70) {//左
        //     user_head.x = 70
        //     user_diamonds.x = user_head.x + 44
        //     user_chips.x = user_diamonds.getContentSize().width + 10 + user_diamonds.x - 80
        //     let wid = menu_top_middle.x - user_chips.x - 185
        //     let layout_bg = user_chips.getChildByName("layout_bg")
        //     let add = user_chips.getChildByName("add")
        //     let label_chips = user_chips.getChildByName("label_chips")
        //     user_chips.setContentSize(wid, 61)
        //     layout_bg.setContentSize(wid, 61)
        //     add.x = wid - 34
        //     label_chips.setContentSize(wid - 50, 25)
        // }

        // let d = width - btn_setting.x - 34
        // if (d > 70) {//右
        //     btn_setting.x = width - 70;
        //     let wid = menu_top_middle.x + 185 + 20
        //     let d2 = btn_setting.x - 34 - 20
        //     let newwid = d2 - wid
        //     let layout_exp = user_exp.getChildByName("layout_exp")
        //     layout_exp.setContentSize(newwid, 61)
        //     user_exp.x = menu_top_middle.x + 185 + 20
        //     let layout_bg = layout_exp.getChildByName("layout_bg")

        //     layout_bg.setContentSize(newwid, 61)
        //     let barmask = layout_exp.getChildByName('barmask');
        //     barmask.setContentSize(440, 61)
        //     let label_exp = user_exp.getChildByName("label_exp")
        //     label_exp.x = layout_exp.getContentSize().width / 2 - 10
        // }

        // let zuowid = width / 2 - 200;
        // let zuowidyou = width / 2 + 200;
        // let ddd = (zuowid - 123 * 3) / 3
        // if (ddd > 60) {
        //     item_vip.x = zuowid - 60
        //     item_mission.x = item_vip.x - 123 - ddd
        //     item_n_stamps.x = item_mission.x - 123 - ddd

        //     item_n_inbox.x = zuowidyou + 60
        //     item_n_events.x = item_n_inbox.x + 123 + ddd
        //     item_n_signin.x = item_n_events.x + 123 + ddd

        //     let widn = item_vip.x - item_mission.x - 123
        //     if (100 < widn) {//平均
        //         let kongyu = zuowid
        //         let jiange = kongyu / 3
        //         item_vip.x = jiange * 3
        //         item_mission.x = jiange * 2
        //         item_n_stamps.x = jiange * 1
        //     }

        //     if (100 < widn) {//平均
        //         let kongyu = width - zuowidyou
        //         let jiange = kongyu / 3
        //         item_n_inbox.x = zuowidyou + jiange
        //         item_n_events.x = item_n_inbox.x + jiange * 2
        //         item_n_signin.x = item_n_inbox.x + jiange * 3
        //     }
        // }
    }

    protected update(dt: number): void {
        this.fitview();

        if (this.allgamenode.length > 2 && this.isplaying == true) {
            if (this.isrecordtime == false) {
                let curgameview = []
                for (let i: number = 0; i < this.allgamenode.length; i++) {
                    let isshowing = this.allgamenode[i].getComponent(ScrollViewPlusItem).isShowing;
                    if (isshowing == true) {
                        curgameview.push(i);
                    }
                }

                let ismanle = true
                let you = false
                for (let i: number = 0; i < curgameview.length; i++) {
                    you = false
                    for (let j: number = 0; j < this.ani_idarr.length; j++) {
                        if (curgameview[i] == this.ani_idarr[j]) {
                            you = true
                            break
                        }

                    }
                    if (you == false) {
                        break
                    }
                }
                if (you) {
                    this.ani_idarr = []
                }

                if (curgameview.length > 0) {
                    const callback: () => void = (() => {
                        let ran = Math.floor(Math.random() * curgameview.length);
                        let id = curgameview[ran]
                        for (let i: number = 0; i < this.ani_idarr.length; i++) {
                            if (this.ani_idarr[i] == id) {
                                callback()
                                return
                            }
                        }

                        if (this.allgamenode[id]) {
                            if (this.curgamenode) {
                                this.curgamenode.getComponent(GamePrefab).hideGameaction();
                            }
                            this.allgamenode[id].getComponent(GamePrefab).showGameaction();
                            this.curgamenode = this.allgamenode[id];
                            this.ani_idarr.push(id);
                        }
                    });
                    callback()

                }

            }

            if (this.isrecordtime == false && this.isplaying == true) {
                this.isrecordtime = true
                this.CurGameTime = new Date().getTime();
            }

            if (new Date().getTime() - this.CurGameTime > this.GAME_WAITTIME * 1000 && this.isplaying == true) {
                this.CurGameTime = 0;
                this.isrecordtime = false
            }
        }

        if (this.svBBoxRect && this.curgamenode) {
            let curBox = this.curgamenode.getBoundingBoxToWorld();
            if (!curBox.intersects(this.svBBoxRect)) {
                this.CurGameTime = 0;
                this.isrecordtime = false
            }
        }

    }

    private async initData() {
        this.downlaodedGame = LocalStorageTool.getDownloadedGame();
        //获取用户列表
        this.getUserInfo();
        this.iscanhide = false
        //加载游戏
        this.addGameList();
        // //显示签到信息

        this.showSignIn();
        //加载商品列表
        Constants.getInstance().shopGoodsListData();
        //链接大厅socket
        Constants.getInstance().contentHallSocket();
        //初始化收集
        this.initCollect();
        this.loadingbg = this.node.getChildByName("loadingbg")
        this.zhujue1 = this.loadingbg.getChildByName("zhujue1")
        this.zhujue2 = this.loadingbg.getChildByName("zhujue2")
        this.zhujue3 = this.loadingbg.getChildByName("zhujue3")
        // this.loadingbg.active = true

        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS) {
            this.zhujue1.active = false
        } else {
            this.zhujue1.active = true
        }

        // this.zhujue1.active = true
        this.zhujue2.active = false
        this.zhujue3.active = false
        this.zhujue1.getComponent(sp.Skeleton).setAnimation(0, "welcom", false);
        this.zhujue1.getComponent(sp.Skeleton).setCompleteListener(() => {
            this.iscanhide = true
            // if(this.issendbetbol == true){
            this.zhujue1.active = false

            if (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS) {
                this.zhujue3.active = false
            } else {
                this.zhujue3.active = true
            }

            // this.zhujue3.active = true
            this.zhujue3.getComponent(sp.Skeleton).setAnimation(0, "cheer", true);
            // }

            // this.zhujue1.active = false
            // zhujue2.active = true
            // zhujue2.getComponent(sp.Skeleton).setAnimation(0, "win", false);
            // zhujue2.getComponent(sp.Skeleton).setCompleteListener(()=>{
            // cc.tween(this.loadingbg).to(0.2, { scale: 0 }).call(async () => {
            //     this.loadingbg.active = false;
            //     //第一次打开大厅
            //     if (Constants.getInstance().m_firstOpenLobby) {
            //         //显示签到信息
            //         this.showSignIn();
            //         //facebook登录判断
            //         if (!Constants.getInstance().m_LoginUserSession.userInfo.m_userSafeAuth) {
            //             await UserApi.getUserSafeAuth();
            //             if (!Constants.getInstance().m_LoginUserSession.userInfo.getFacebookStatus()) {
            //                 this.m_ViewConnectTips.showNode();
            //             }
            //         }
            //         Constants.getInstance().m_firstOpenLobby = false;
            //     }
            // }).start();
            // })
        });

    }

    private initListener() {
        EventMgr.register(EVENT.EVENT_OPEN_SHOP, this._openShop, this);

        EventMgr.register(EVENT.EVENT_UPDATAICONS_SUB, this.updateUserProfile, this);

        EventMgr.register(EVENT.EVENT_FLYICONS_SUB, this.onflyicons, this);
        EventMgr.register(EVENT.EVENT_SHOPFLYICONS_SUB, this.onshopflyicons, this);

        EventMgr.register(EVENT.EVENT_SHOP_PAYSUC, this.onshoppaysuc, this);
    }

    onshoppaysuc(data: any) {
        cc.log("onshoppaysuc=", data)
        let goodstype = data.type;
        let goodsnum = data.num;
        let timenum = data.time;
        let frameSize = cc.view.getFrameSize();
        let width = frameSize.width;
        let height = frameSize.height;
        var _gameScene = cc.director.getScene()
        var _canvas = cc.find("Canvas", _gameScene)
        if (width > height) {
            Constants.getInstance().m_hallBundle.load(ResourcesConfig.m_horcollectShopView, cc.Prefab, (err, prefab: cc.Prefab) => {
                if (prefab) {
                    let itemNode = cc.instantiate(prefab);
                    itemNode.getComponent("HorcollectShopView").setData(goodstype, goodsnum, timenum)
                    itemNode.parent = _canvas;
                    itemNode.zIndex = 10000
                }
            });
        } else {
            Constants.getInstance().m_hallBundle.load(ResourcesConfig.m_vercollectShopView, cc.Prefab, (err, prefab: cc.Prefab) => {
                if (prefab) {
                    let itemNode = cc.instantiate(prefab);
                    itemNode.getComponent("HorcollectShopView").setData(goodstype, goodsnum, timenum)
                    itemNode.parent = _canvas;
                    itemNode.zIndex = 10000
                }
            });
        }
    }

    onflyicons() {
        this.playCoinFly(null, true)
    }

    onshopflyicons() {
        // this.giftani.active = false
        // this.giftimg.active = true
        this.playShopCoinFly(null, true)
    }

    /**
     * 手机屏幕适配
     * @param cav 
     */
    resetSize(cav) {
        cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
        let frameSize = cc.view.getFrameSize();
        let designSize = cc.view.getDesignResolutionSize();

        if (frameSize.width / frameSize.height > designSize.width / designSize.height) {
            cav.width = designSize.height * frameSize.width / frameSize.height;
            cav.height = designSize.height;
            cav.getComponent(cc.Canvas).designResolution = cc.size(cav.width, cav.height);
        } else {
            cav.width = designSize.width;
            cav.height = designSize.width * frameSize.height / frameSize.width;
            cav.getComponent(cc.Canvas).designResolution = cc.size(cav.width, cav.height);
        }
        // this.fitview();
    }

    /**
     * 邮件
     * @param event
     */
    protected async onEmailclick(event: any) {
        AudioMgr.play("public_slot/audio/button_click", "resources")
        let _gameScene = cc.director.getScene()
        let _canvas = cc.find("Canvas", _gameScene)
        Constants.getInstance().m_hallBundle.load("prefabs/hallemail_view", cc.Prefab, (err, prefab: cc.Prefab) => {
            if (prefab) {
                let itemNode = cc.instantiate(prefab);
                // itemNode.getComponent("LobbyEmailView").setData(data)
                itemNode.parent = _canvas;
                itemNode.zIndex = 10000
            }
        });
    }

    /**
     * 打开用户界面
     */
    protected onProfileBtnClick() {
        AudioMgr.play("public_slot/audio/button_click", "resources")
        let page = this.pages.getPage(ViewType.view_profile) as ProfilePage;
        page.open();
        page.bindViewData(Constants.getInstance().m_LoginUserSession.userInfo);
        AnalyticsTool.logEvent(AnalyticsEventEnmu.user_photo);
        // this.showCommonimgSoon();
    }

    private _openShop(index: number) {
        // this.onShopBtnClick(null, index.toString());
        // this.showCommonimgSoon();
        this.showCommonimgSoon();
    }

    onaddDiamonds() {
        // AnalyticsTool.logEvent(AnalyticsEventEnmu.store_diamond)
        // EventMgr.dispatch(EVENT.EVENT_OPEN_SHOP, 1);
        // this.showCommonimgSoon();
        // this.showCommonimgSoon();
    }

    onaddCoin() {
        // AnalyticsTool.logEvent(AnalyticsEventEnmu.store_coin)
        // EventMgr.dispatch(EVENT.EVENT_OPEN_SHOP, 0);
        // this.showCommonimgSoon();
        // this.showCommonimgSoon();
    }

    private showCommonimgSoon(): void {
        SlotTipsManager.instance.showTips('Commoning soon');
    }

    /**
      * 打开下一级经验奖励
      * @param index 索引
      */
    protected async onLevelBtnClick(event: any, index: string) {
        if (this.rewardtips.active == false) {
            AudioMgr.play("public_slot/audio/button_click", "resources")
            let result = await UserApi.userNextLevelReward();
            // cc.log("onLevelBtnClick=",result)
            if (result.succ) {
                let coinsnum = result.data[0].m_valueA;
                this.rewardtips.getChildByName("num").getComponent(cc.Label).string = StringUtil.showMoneyType(Number(coinsnum))
                // if(this.rewardtips.active == false){
                this.rewardtips.active = true;
                cc.tween(this.rewardtips).to(0.2, { scale: 1 }).delay(3).to(0.2, { scale: 0.1 }).call(() => {
                    this.rewardtips.active = false;
                }).start();
                // }
            }
        }

    }


    /**
      * 打开商店
      * @param index 索引
      */
    protected onShopBtnClick(event: any, index: string) {
        // AudioMgr.play("public_slot/audio/button_click", "resources")
        // let page = this.pages.getPage(ViewType.view_shops) as LobbyShopView;
        // page.open();
        // page.setView(this.coinsScrollViewPlus, this.diamondScrollViewPlus, this.vipScrollViewPlus, this.goodsScrollViewItemPrefab);
        // page.bindViewData();
        // page.showView(parseInt(index));
        // EventMgr.dispatch(EVENT.EVENT_OPEN_SHOP, 0);

        this.showCommonimgSoon();
    }

    /**
     * 打开设置界面
     */
    protected onSettingsClick() {
        AudioMgr.play("public_slot/audio/button_click", "resources")
        let page = this.pages.getPage(ViewType.view_settings) as GameSettingPage;
        page.initData();
        page.openDialog();
        AnalyticsTool.logEvent(AnalyticsEventEnmu.lobby_setting)
    }

    /**
     * 每日签到
     * @param event
     */
    protected async onDailyBonus(event: any) {
        if (this.istouchdaily == true) {
            return
        }
        BaseUI.addNetLoading()
        this.istouchdaily = true
        setTimeout(() => {
            this.istouchdaily = false
        }, 1500);
        AudioMgr.play("public_slot/audio/button_click", "resources")
        let result = await UserApi.getSignIn();
        if (result.succ) {
            let data: SignModel = result.data;
            if (data) {
                let page = this.pages.getPage(ViewType.view_signIn) as LobbySignInView;
                page.bindData(data);
                page.openDialog();
            }
        }
        BaseUI.removeNetLoading()
        //this.showCommonimgSoon();
    }

    /**
     * stamps
     * @param event
     */
    protected async onStamps(event: any) {

    }

    /**
     * 在线奖励
     * @param event 
     */
    protected onCollect(event: any) {
        if (this.istouch) {
            return
        }
        // if(Constants.getInstance().isloginCollect == true){
        //     return
        // }
        this.istouch = true
        // BaseUI.addNetLoading()
        // setTimeout(() => {
        //     this.istouch = false
        // }, 3000);
        AudioMgr.play("public_slot/audio/button_click", "resources")
        this.getCollectReward();
    }

    protected onLeaderboradsBtnClick() {
        let page = this.pages.getPage(ViewType.view_leaderborads) as LobbyLeaderboardView;
        page.open();
        page.bindViewData();
        page.showView(0);
    }

    /**
     * 更改用户名
     * @param name 
     * @returns 
     */
    private async editUserName(name: string) {
        if (StringUtil.isEmpty(name)) {
            return;
        }
        let result = await UserApi.setNickName(name);
        if (result.succ) {
            Constants.getInstance().m_LoginUserSession.userInfo.m_nickName = name;
            this.profileView.bindViewData();
            //更新信息
            let profile = this.pages.getPage(ViewType.view_profile) as ProfilePage;
            profile.bindViewData(Constants.getInstance().m_LoginUserSession.userInfo);
        } else {
        }
    }

    /**
     * 获取用户信息
     */
    private async getUserInfo() {
        await WalletApi.getBaseAccounts();
        this.updateUserProfile(Constants.getInstance().m_LoginUserSession.userInfo);
        // let result = await UserApi.getBaseInfo();
        // if (!result.succ) {
        // } else if (cc.isValid(this.node)) {
        //     let walletData = await WalletApi.getBaseAccounts();
        //     this.updateUserProfile(Constants.getInstance().m_LoginUserSession.userInfo);
        // }
    }

    /**
     * 更新用户信息
     * @param profile 用户信息
     */
    private updateUserProfile(profile: UserInfoModel) {
        this.profileView.bindViewData();
        // Constants.gameHub.updateUid(profile.m_uid);
        //Constants.facebook.setUserID(String(profile.m_uid));
    }

    //重置玩家消息状态
    onResettingStatus() {
        if (this.sendbetTime) {
            clearTimeout(this.sendbetTime);
        }
        if (this.waitingbetTime) {
            clearTimeout(this.waitingbetTime);
        }
    }

    //发送消息状态
    onStatusTimeFun() {
        //玩家下注50s没有收到回调弹框
        this.issendbetbol = true
        this.sendbetTime = setTimeout(() => {
            clearTimeout(this.sendbetTime);
            if (this.issendbetbol == true) {
                BaseUI.removeNetLoading();
                let sureCallback = (() => {
                    // cc.log("sureCallback!!!")
                    Constants.getInstance().hallSocket.onDestroy();
                    Constants.getInstance().hallSocket.resetstatus();
                    cc.director.loadScene("CoreLoadScene")
                })
                let msg1 = {
                    name: "MessageBoxView",
                    sureCallback: sureCallback,
                    bundleIndex: AppBundleConfig.BUNDLE_HALL,
                    btnOkText: "Disconnect, please login again.",
                    btnCount: 1,
                    zorder: 10000
                }
                UIManagernew.openUI(msg1)
            }
        }, 50000);

        this.waitingbetTime = setTimeout(() => {
            clearTimeout(this.waitingbetTime);
            BaseUI.addNetLoading();
        }, 30000);
    }

    private async getAllGameBounds() {
        let timerer = setInterval(async () => {
            clearTimeout(timerer);
            let result = await SlotApi.gamebounds();
            if (result.succ) {
                let dataList: Array<SlotGoldPoolInfo> = result.data;
                this.issendbetbol = false
                this.onResettingStatus();
                BaseUI.removeNetLoading();
                this.zhujue3.active = false;
                let hidetime = 0
                if (this.iscanhide == true) {
                    hidetime = 0
                } else {
                    hidetime = 500
                }
                if (!this.zhujue1) {
                    return
                }
                setTimeout(() => {
                    this.zhujue1.active = false
                    if (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS) {
                        this.zhujue2.active = false
                        cc.tween(this.loadingbg).to(0.2, { scale: 0 }).call(async () => {
                            this.loadingbg.active = false;
                            //第一次打开大厅
                            if (Constants.getInstance().m_firstOpenLobby) {
                                //显示签到信息
                                this.showSignIn();
                                //facebook登录判断
                                if (!Constants.getInstance().m_LoginUserSession.userInfo.m_userSafeAuth) {
                                    await UserApi.getUserSafeAuth();
                                    if (cc.sys.isNative) {
                                        if (cc.sys.os === cc.sys.OS_ANDROID) {
                                            if (!Constants.getInstance().m_LoginUserSession.userInfo.getFacebookStatus()) {
                                                this.m_ViewConnectTips.showNode();
                                            }
                                        } else if (cc.sys.os === cc.sys.OS_IOS) {
                                            if (!Constants.getInstance().m_LoginUserSession.userInfo.getIOSStatus()) {
                                                this.m_ViewConnectTips.showNode();
                                            }
                                        }
                                    }
                                }
                                Constants.getInstance().m_firstOpenLobby = false;
                            }
                            // if(Constants.getInstance().isloginCollect == true){
                            //     Constants.getInstance().isloginCollect = false;
                            //     this.getCollectReward()
                            // }
                        }).start();
                    } else {
                        this.zhujue2.active = true

                        // this.zhujue2.active = true
                        this.zhujue3.active = false;
                        this.zhujue2.getComponent(sp.Skeleton).setAnimation(0, "win", false);
                        this.zhujue2.getComponent(sp.Skeleton).setCompleteListener(() => {
                            cc.tween(this.loadingbg).to(0.2, { scale: 0 }).call(async () => {
                                this.loadingbg.active = false;
                                //第一次打开大厅
                                if (Constants.getInstance().m_firstOpenLobby) {
                                    //显示签到信息
                                    this.showSignIn();
                                    //facebook登录判断
                                    if (!Constants.getInstance().m_LoginUserSession.userInfo.m_userSafeAuth) {
                                        await UserApi.getUserSafeAuth();
                                        if (cc.sys.isNative) {
                                            if (cc.sys.os === cc.sys.OS_ANDROID) {
                                                if (!Constants.getInstance().m_LoginUserSession.userInfo.getFacebookStatus()) {
                                                    this.m_ViewConnectTips.showNode();
                                                }
                                            } else if (cc.sys.os === cc.sys.OS_IOS) {
                                                if (!Constants.getInstance().m_LoginUserSession.userInfo.getIOSStatus()) {
                                                    this.m_ViewConnectTips.showNode();
                                                }
                                            }
                                        }
                                    }
                                    Constants.getInstance().m_firstOpenLobby = false;
                                }
                                // if(Constants.getInstance().isloginCollect == true){
                                //     Constants.getInstance().isloginCollect = false;
                                //     this.getCollectReward()
                                // }
                            }).start();
                        })
                    }
                }, hidetime);


                // dataList.forEach(item => {
                //     if (this.gameScrollViewPlus) {
                //         this.gameScrollViewPlus.content.children.forEach(itemNode => {
                //             let itemData = itemNode.getComponent(GamePrefab).itemData();
                //             if (itemData && itemData.gameConfig) {
                //                 if (itemData.gameConfig.gameID === item.gameId) {
                //                     itemNode.getComponent(GamePrefab).startPoolView(item.pool_1);
                //                 }
                //             }
                //         });
                //     }
                // });
            }
        }, 2000);

    }

    private async addGameList() {
        // BaseUI.addNetLoading();
        this.onResettingStatus();
        this.onStatusTimeFun();
        Constants.getInstance().gameListData().then(data => {
            if (!this.node) {
                return
            }
            //查找推荐的游戏
            let newdata = []
            for (let i: number = 0; i < data.length; i++) {
                if (data[i].m_isComm == 1) {
                    newdata.push(data[i]);
                }
            }
            let changedata = data
            let kong = [];
            for (let i: number = 0; i < changedata.length; i = i + this.shownum) {
                if (i + this.shownum < changedata.length) {
                    kong.push(changedata.slice(i, i + this.shownum))
                } else {
                    kong.push(changedata.slice(i))
                }
            }

            let gameitem: SlotGameModel = null;
            gameitem = new SlotGameModel();
            gameitem.m_id = -1;
            gameitem.m_superIcoUrl = "kong";
            kong.forEach(function (item) {
                return item.length === 8 ? item.push(
                    gameitem
                ) : item;
            })
            let resdata = [].concat.apply([], kong);

            let datasuc = newdata.concat(resdata)

            if (datasuc[datasuc.length - 1].m_id == -1) {
                datasuc.pop()
            }

            this.m_slotsList = datasuc;
            if (this.m_slotsList && this.m_slotsList.length > 0) {
                this.addg(this.m_slotsList);
                this.getAllGameBounds();
            }
        });

    }

    private async addg(dataList: Array<SlotGameModel>) {
        this.gameScrollViewPlus.content.removeAllChildren();
        // await this.executePreFrame(this._getItemGenerator(dataList), 1);
        // 在创建好子节点之后，先手动调用一次DC优化，触发当前在可视区域内的节点的进入逻辑
        // 后续的ScrollView滚动时，内部自动回调
        let sureCallback = ((svBBoxRect) => {
            this.svBBoxRect = svBBoxRect
        })
        this.gameScrollViewPlus.getComponent(ScrollViewPlus).scrollToLeft(0)
        this.gameScrollViewPlus.optDc(sureCallback);
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

    private *_getItemGenerator(data: Array<SlotGameModel>) {
        // console.log("slotgamedata",JSON.stringify(data));
        for (let i = 0; i < data.length; i++) {
            yield this._initScrollViewItemPrefab({
                index: i,
                picPath: data[i].m_superIcoUrl,
                SlotGameData: data[i],
                gameConfig: null,
                canPlay: true
            });
        }
    }
    private _initScrollViewItemPrefab(data: GamePrefabItem) {
        let itemNode = cc.instantiate(this.gameScrollViewItemPrefab);
        let ischang = false
        if (data.index == 0 || data.index == 1) {
            itemNode = cc.instantiate(this.gameScrollViewChangItemPrefab);
            ischang = true
        }
        if (data.SlotGameData.m_id == -1) {
            itemNode = cc.instantiate(this.gameScrollViewkongItemPrefab);
        }

        itemNode.parent = this.gameScrollViewPlus.content;
        // if (data.SlotGameData.m_id == -1) {
        //     itemNode.getComponent(GamePrefab).bindData(data);
        // } else {
        //     itemNode.getComponent(GamePrefab).bindData(data, this.downlaodedGame, this.openGame.bind(this), ischang);
        //     this.allgamenode.push(itemNode);
        // }

        // itemNode.getComponent(ScrollViewPlusItem).isShowing
    }

    /**
     * 打开游戏
     * @param gameData 游戏数据
     * @param config 游戏配置
     */
    private async openGame(gameData: SlotGameModel, config: SlotGameConfigModel) {
        // let mainResult = await CoreApi.coreMain();
        if (AppPlatformConfig.ISOLDVERSION || config.loadingScence == false) {
            if (!this.isOpenGame) {
                // if (!isShowLoad) {
                //     BaseUI.addNetLoading()
                // }


                let result = await CoreApi.coreCheckUpdate(config.gameID, "game");
                if (result.succ) {
                    let packageUrlstr: string = result.data.packageUrl;
                    let oldpackageUrlstr = LocalStorageTool.getBaseHotHost();
                    CoreupdateManager.Instance().commonCoreUpdateUrl = oldpackageUrlstr + packageUrlstr
                }

                this.isOpenGame = true;
                //确定版本
                let versionInfo: CoreUpdate.BundleConfig = new CoreUpdate.BundleConfig(config.gameBundle, config.gameBundle);
                CoreupdateManager.Instance().checkUpdate((code, state) => {
                    BaseUI.removeNetLoading();
                    if (code == CoreUpdate.Code.NEW_VERSION_FOUND) {
                        //有新版本
                        this.itemStartCoreUpdate(versionInfo.name);
                        CoreupdateManager.Instance().CoreUpdate();
                    } else if (state == CoreUpdate.State.TRY_DOWNLOAD_FAILED_ASSETS) {
                        //尝试重新下载之前下载失败的文件
                        // this.itemStartCoreUpdate(versionInfo.name);
                        // CoreupdateManager.Instance().CoreUpdate();
                        CoreupdateManager.Instance().downloadFailedAssets();
                    } else if (code == CoreUpdate.Code.ALREADY_UP_TO_DATE) {
                        //已经是最新版本
                        this.isOpenGame = false;
                        this.m_dialog_gameSelect.setGameShow(gameData, config);
                    } else if (code == CoreUpdate.Code.ERROR_DOWNLOAD_MANIFEST ||
                        code == CoreUpdate.Code.ERROR_NO_LOCAL_MANIFEST ||
                        code == CoreUpdate.Code.ERROR_PARSE_MANIFEST) {
                        //下载manifest文件失败
                        this.isOpenGame = false;
                    } else if (code == CoreUpdate.Code.CHECKING) {
                        //当前正在检测更新
                    } else {
                    }
                }, versionInfo.name);
            }
        } else {
            this.m_dialog_gameSelect.setGameShow(gameData, config);
        }


    }

    /**
     * 开始热更
     */
    private itemStartCoreUpdate(bundleName: string) {
        this.gameScrollViewPlus.content.children.forEach(itemNode => {
            let itemData = itemNode.getComponent(GamePrefab).itemData();
            if (itemData && itemData.gameConfig && !StringUtil.isEmpty(itemData.gameConfig.gameBundle)) {
                if (itemData.gameConfig.gameBundle === bundleName) {
                    itemNode.getComponent(GamePrefab).showDownloadPro(true);
                }
            }
        });
    }

    /**
     * 热更进行中
     * @param CoreUpdateData 热更进度文件
     */
    private CoreUpdateLoading(CoreUpdateData: CoreUpdate.DownLoadInfo) {
        if (CoreUpdateData) {
            if (CoreUpdateData.needRestart) {
                this.gameScrollViewPlus.content.children.forEach(itemNode => {
                    let itemData = itemNode.getComponent(GamePrefab).itemData();
                    if (itemData && itemData.gameConfig && !StringUtil.isEmpty(itemData.gameConfig.gameBundle)) {
                        if (itemData.gameConfig.gameBundle === CoreUpdateData.bundleName) {
                            if (this.downlaodedGame.indexOf(itemData.gameConfig.gameID) < 0) {
                                this.downlaodedGame.push(itemData.gameConfig.gameID);
                                LocalStorageTool.setDownloadedGame(this.downlaodedGame);
                            }
                            itemNode.getComponent(GamePrefab).successDownload();
                            this.isOpenGame = false;
                        }
                    }
                });
            } else {
                //设置下载进度
                let proNum = CoreUpdateData.downloadedFiles / CoreUpdateData.totalFiles;
                this.gameScrollViewPlus.content.children.forEach(itemNode => {
                    let itemData = itemNode.getComponent(GamePrefab).itemData();
                    if (itemData && itemData.gameConfig && !StringUtil.isEmpty(itemData.gameConfig.gameBundle)) {
                        if (itemData.gameConfig.gameBundle === CoreUpdateData.bundleName) {
                            itemNode.getComponent(GamePrefab).setDownloadPro(proNum);
                        }
                    }
                });
            }

        }
    }

    /**
     * 显示签到信息
     */
    public async showSignIn() {
        let timefun = setTimeout(() => {
            BaseUI.addNetLoading()
        }, 500);
        let result = await UserApi.getSignIn();
        cc.log("showSignIn", result)
        if (result.succ) {
            clearTimeout(timefun)
            BaseUI.removeNetLoading();
            let data: SignModel = result.data;
            if (data) {
                //是否可以签到
                if (data.checkSign()) {
                    let page = this.pages.getPage(ViewType.view_signIn) as LobbySignInView;
                    page.bindData(data);
                    page.openDialog();
                    //领取签到奖励
                    let dataDataModel: SignItemModel = data.m_signList[data.m_weekDay];
                    if (dataDataModel) {
                        let key = dataDataModel.m_id;
                        let tranSign = dataDataModel.m_tranSign;
                        result = await UserApi.submitSignIn(key, tranSign);
                        if (result.succ) {
                            // cc.log("领取签到奖励result=",result)
                            page.checkDay(data.m_weekDay, data, result);
                        }
                    }

                }
            }
        }
    }

    /**
     * 初始化收集
     */
    private initCollect() {
        let newTime = Math.floor(new Date().getTime() / 1000);
        if (CollectTool.nextTime > newTime) {
            this.label_collectTime.active = true;
            this.img_collectTime.active = false;
            this.btn_collectTime.getComponent(cc.Button).interactable = false;
            this.label_collectTime.getComponent(cc.Label).string = DateTimerUtil.timeCountDown(CollectTool.nextTime - newTime);
            this.startCollectInterval();
            this.dibu.active = true
            this.dibu2.active = false
            this.guangnod.active = false

        } else {
            clearInterval(this.m_userCollectTime);
            this.label_collectTime.active = false;
            this.img_collectTime.active = true;
            this.btn_collectTime.getComponent(cc.Button).interactable = true;
            this.dibu.active = false
            this.dibu2.active = true
            this.guangnod.active = true

        }
        cc.director.getScheduler().enableForTarget(this);
        cc.director.getScheduler().schedule(this.onplayani, this, 3, cc.macro.REPEAT_FOREVER, 0, false);
    }

    onplayani() {
        if (this.dibu.active) {
            this.dibu.getComponent(sp.Skeleton).setAnimation(0, "jingzheng", false);
        }

    }

    /**
     * 获取在线奖励报酬
     */
    public async getCollectReward(updatatime: boolean = false) {
        let timefun = setTimeout(() => {
            BaseUI.addNetLoading()
        }, 500);
        let result = await WalletApi.receiveOnlineList(1);
        if (result.succ) {
            clearTimeout(timefun)
            BaseUI.removeNetLoading();
            AnalyticsTool.logEvent(AnalyticsEventEnmu.bonus_collect);
            this.dibu.active = true
            this.dibu2.active = false
            this.guangnod.active = false
            //获取奖励
            let rewardList: OpenMoneyInfo[] = result.data2;
            if (rewardList && rewardList.length > 0 && rewardList[0].m_value > 0) {
                this.masknod.active = true
                this.playCoinFly(() => {
                    if (!this.node) {
                        return
                    }
                    Constants.getInstance().m_LoginUserSession.userWalletInfo.m_gameCoin += BigInt(rewardList[0].m_value);
                    this.masknod.active = false

                    let gold = Number(cc.sys.localStorage.getItem('gold')) || 10000000;
                    gold += 1000;
                    cc.sys.localStorage.setItem('gold', gold);
                    console.log('getCollectReward gold:', gold);
                    this.profileView.bindViewData();
                });
            }
            //重新计时
            CollectTool.nextTime = result.data + 2;
            this.startCollectInterval();
        }
        this.istouch = false
    }

    private startCollectInterval() {
        clearInterval(this.m_userCollectTime);
        this.m_userCollectTime = setInterval(() => {
            let newTime = Math.floor(new Date().getTime() / 1000);
            if (!this.node) {
                clearInterval(this.m_userCollectTime);
                return
            }
            if (CollectTool.nextTime > newTime) {
                this.label_collectTime.active = true;
                this.img_collectTime.active = false;
                this.btn_collectTime.getComponent(cc.Button).interactable = false;
                this.label_collectTime.getComponent(cc.Label).string = DateTimerUtil.timeCountDown(CollectTool.nextTime - newTime);
            } else {
                clearInterval(this.m_userCollectTime);
                this.label_collectTime.active = false;
                this.img_collectTime.active = true;
                this.btn_collectTime.getComponent(cc.Button).interactable = true;
                this.dibu.active = false
                this.dibu2.active = true
                this.guangnod.active = true
            }

        }, 0);
    }

    /**
     * 返回键监听
     */
    private backBtnPressed() {
        let page = this.pages.getPage(ViewType.view_dialog_select) as DialogSelect;
        if (page) {
            page.initData(AppLanguageConfig.app_exit, null, () => {
                //退出游戏
                Constants.getInstance().native.ExitApp();
            });
            page.openDialog();
        }

    }

    /**
     * 播放飞金币动画
     * @param callBack 
     */
    public playCoinFly(callBack: Function, issign: boolean = false) {//this.backnod
        let startNode: cc.Node
        if (issign == true) {
            startNode = this.backnod
        } else {
            startNode = this.node.getChildByName('menu_btm').getChildByName('menu_middle').getChildByName('dibu');
        }
        let endNode: cc.Node = this.node.getChildByName('menu_top').getChildByName('user_chips').getChildByName('img_chips');
        this.m_anim_coin_fly.flushItems(30, 0.07, 1.3, startNode, endNode, () => {
            if (callBack) {
                callBack();
            }
        });
    }

    /**
     * 播放商城飞金币动画
     * @param callBack 
     */
    public playShopCoinFly(callBack: Function, issign: boolean = false) {//this.backnod
        let startNode: cc.Node
        startNode = this.node.getChildByName('ui_pages').getChildByName('page_shop').getChildByName('layout_activity');
        let endNode: cc.Node = this.node.getChildByName('ui_pages').getChildByName('page_shop').getChildByName('layout_top').getChildByName('user_chips');
        this.m_anim_coin_fly.flushItems(30, 0.07, 1.3, startNode, endNode, () => {
            if (callBack) {
                callBack();
            }
            if (this.node) {
                EventMgr.dispatch(EVENT.EVENT_UPDATAICONS_SUB)
            }
            // EventMgr.dispatch(EVENT.EVENT_UPDATAICONS_SUB)
        });
    }

    /**
     * 用户登录成功
     */
    private async userLoginSuccess() {
        await UserApi.getUserSafeAuth();
        if (Constants.getInstance().m_LoginUserSession.userInfo && Constants.getInstance().m_LoginUserSession.userInfo.m_userSafeAuth) {
            Constants.getInstance().m_LoginUserSession.userInfo.m_userSafeAuth.m_facebookBindStatus = 1;
        }

        if (Constants.getInstance().m_LoginUserSession.userInfo && Constants.getInstance().m_LoginUserSession.userInfo.m_userSafeAuth) {
            Constants.getInstance().m_LoginUserSession.userInfo.m_userSafeAuth.m_appleBindStatus = Constants.getInstance().m_LoginUserSession.userInfo.m_userSafeAuth.m_appleBindStatus;
        }
        console.log("papapapapap", Constants.getInstance().m_LoginUserSession.userInfo.m_userSafeAuth.m_appleBindStatus);
        let page = this.pages.getPage(ViewType.view_profile) as ProfilePage;
        page.close();
        if (!this.m_playColletAnim) {
            this.m_ViewConnectTips.closeNode();
        }

        //获取用户基本信息
        let result = await UserApi.getBaseInfo();
        if (result.succ) {
            // await UserApi.getUserSafeAuth();
            this.getUserInfo();
            // this.profileView.bindViewData();
        } else {
            let msg = {
                name: "MessageBoxView",
                bundleIndex: AppBundleConfig.BUNDLE_HALL,
                btnOkText: "thirdPartyLogin server err:1000 plese login again",
                btnCount: 1,
                zorder: 10000
            }
            UIManagernew.openUI(msg);
        }
    }

    /**
     * 登录失败
     */
    private userLoginErr() {
        // this.m_ViewConnectTips.resetBtn();
    }

    /**
     * 奖励解析
     */
    private giveResult() {
        this.m_playColletAnim = true;
        let endNode: cc.Node = this.node.getChildByName('menu_top').getChildByName('user_chips').getChildByName('img_chips');
        this.m_anim_coin_fly.flushItems(30, 0.07, 1.3, this.m_ViewConnectTips.getLabelNode(), endNode, () => {
            Constants.getInstance().m_LoginUserSession.userWalletInfo.m_gameCoin += BigInt(20000000);

            this.m_playColletAnim = false;
            this.m_ViewConnectTips.closeNode();
        });
    }

    private depositSuccess() {
        this.profileView.bindViewData();
        let page = this.pages.getPage(ViewType.view_shops) as LobbyShopView;
        if (page) {
            page.bindViewData();
        }
    }

    /**
     * 注册回调
     */
    private eventBusCallBack() {
        Constants.getInstance().eventBus.register(CoreUpdate.Event.CoreUpdate_DOWNLOAD, this.CoreUpdateLoading.bind(this));
        Constants.getInstance().eventBus.register(EventBusEnum.app_back_btn_pressed, this.backBtnPressed.bind(this));
        Constants.getInstance().eventBus.register(EventBusEnum.app_user_login_succes, this.userLoginSuccess.bind(this));
        Constants.getInstance().eventBus.register(EventBusEnum.app_user_login_err, this.userLoginErr.bind(this));
        Constants.getInstance().eventBus.register(EventBusEnum.app_give_result, this.giveResult.bind(this));
        Constants.getInstance().eventBus.register(EventBusEnum.app_deposit_success, this.depositSuccess.bind(this));
    }

    /**
     * 注销回调
     */
    private eventDeRegister() {
        Constants.getInstance().eventBus.deregister(CoreUpdate.Event.CoreUpdate_DOWNLOAD, this.deReg_HotLoad.bind(this));
        Constants.getInstance().eventBus.deregister(EventBusEnum.app_back_btn_pressed, this.deReg_backBtnPressed.bind(this));
        Constants.getInstance().eventBus.deregister(EventBusEnum.app_user_login_succes, this.deReg_userLoginSuccess.bind(this));
        Constants.getInstance().eventBus.deregister(EventBusEnum.app_user_login_err, this.deReg_userLoginErr.bind(this));
        Constants.getInstance().eventBus.deregister(EventBusEnum.app_give_result, this.deReg_giveResult.bind(this));
        Constants.getInstance().eventBus.deregister(EventBusEnum.app_deposit_success, this.deReg_depositSuccess.bind(this));
    }

    onDestroy() {
        cc.director.getScheduler().unschedule(this.onplayani, this);
        clearInterval(this.CollectTimeshop);
        EventMgr.targetOff(this);
        EventMgr.unRegister('goldChanged')
        this.eventDeRegister();
        SlotTipsManager.release();
    }
}

/**
 * 用户设置
 */
class UserProfileView {

    private headImg: cc.Sprite;
    private coinText: cc.Label;
    private bg_exp: cc.Node;
    private diamondText: cc.Label;
    private levelText: cc.Label;
    private levelBar: cc.Node = null;
    private barmask: cc.Node = null;

    public constructor(node: cc.Node) {
        this.headImg = node.getChildByName("user_head").getChildByName("img_user_head").getChildByName("img").getComponent(cc.Sprite);
        this.coinText = node.getChildByName("user_chips").getChildByName('label_chips').getComponent(cc.Label);
        let layout_exp = node.getChildByName("user_exp").getChildByName("layout_exp");
        this.bg_exp = layout_exp.getChildByName('layout_bg');
        this.diamondText = node.getChildByName("user_diamonds").getChildByName('label_diamonds').getComponent(cc.Label);
        this.levelText = node.getChildByName("user_exp").getChildByName('label_exp').getComponent(cc.Label);
        this.barmask = layout_exp.getChildByName('barmask');
        this.levelBar = layout_exp.getChildByName('barmask').getChildByName('bar');
        EventMgr.register('goldChanged', this.updateGold, this);
    }


    private updateGold(gold: number): void {
        Constants.getInstance().gold = gold;
        this.coinText.string = StringUtil.showMoneyType(+gold);
    }

    public async bindViewData() {
        this.levelBar.setContentSize(this.bg_exp.width, 39)
        this.levelBar.x = -this.bg_exp.width;
        if (Constants.getInstance().m_LoginUserSession.userWalletInfo) {
            // this.coinText.string = StringUtil.showMoneyType(Constants.getInstance().m_LoginUserSession.userWalletInfo.m_gameCoin);
            const gold = cc.sys.localStorage.getItem('gold') || 10000000;
            cc.sys.localStorage.setItem('gold', gold);
            Constants.getInstance().gold = gold;
            this.coinText.string = StringUtil.showMoneyType(+gold);
            this.diamondText.string = StringUtil.showMoneyType(Constants.getInstance().m_LoginUserSession.userWalletInfo.m_goldCoin);
        }
        // unshift
        this.levelText.string = Constants.getInstance().m_LoginUserSession.userInfo.m_level + '';
        cc.log("ddddd=", LocalStorageTool.getUserHeaderId())
        let headindex = LocalStorageTool.getUserHeaderId()
        if (headindex == 0 && Constants.getInstance().isfacebook && AppPlatformConfig.ISOPENFBIMG) {
            cc.assetManager.loadRemote<cc.Texture2D>(ResourcesConfig.m_userHeaderImgUrl[LocalStorageTool.getUserHeaderId()], { ext: ".png" }, (err, texture) => {
                if (texture) {
                    let spriteframe = new cc.SpriteFrame(texture)
                    this.headImg.spriteFrame = spriteframe;
                }
            });
        } else {
            ResourcesLoader.bundleImgLoader(Constants.getInstance().m_hallBundle, ResourcesConfig.m_userHeaderImgUrl[LocalStorageTool.getUserHeaderId()]).then(asset => {
                if (asset) {
                    this.headImg.spriteFrame = asset;
                }
            });
        }

        cc.log("Ddd===", Constants.getInstance().m_LoginUserSession.userInfo.m_level)
        //设置布局
        let thisExp = Constants.getInstance().m_LoginUserSession.userInfo.m_expValue - UserLevelConfig.getUserLevelFullExp(Constants.getInstance().m_LoginUserSession.userInfo.m_level) * UserLevelConfig.expMultiple;
        let nextExp = UserLevelConfig.getUserLevelRectExp(Constants.getInstance().m_LoginUserSession.userInfo.m_level + 1) * UserLevelConfig.expMultiple;
        let layoutWidth = Number(thisExp) / Number(nextExp) * this.bg_exp.width;

        // layoutWidth = layoutWidth*n;
        // if (layoutWidth > (this.bg_exp.width-26)) {
        //     layoutWidth = this.bg_exp.width;
        // }
        this.levelBar.x = -this.bg_exp.width + layoutWidth;


        if (!Constants.getInstance().m_LoginUserSession.userInfo.m_userSafeAuth) {
            await UserApi.getUserSafeAuth();
        }

        // if (Constants.getInstance().m_LoginUserSession.userInfo.m_nextExpValue && Constants.getInstance().m_LoginUserSession.userInfo.m_nextExpValue.length === 2) {
        //     let nextExp = Constants.getInstance().m_LoginUserSession.userInfo.m_nextExpValue[1];
        //     let layoutWidth = Number(Constants.getInstance().m_LoginUserSession.userInfo.m_expValue - UserLevelConfig.getUserLevelFullExp(Constants.getInstance().m_LoginUserSession.userInfo.m_level) * UserLevelConfig.expMultiple) / Number(nextExp) * this.bg_exp.width;
        //     if (layoutWidth > this.bg_exp.width) {
        //         layoutWidth = this.bg_exp.width;
        //     }
        //     this.levelBar.width = layoutWidth;
        // }
    }

}