import { UIManagernew } from "../UIManagernew";
import { BaseUI } from "./common/BaseUI";
import { EventBus, EventBusEnum } from "./common/EventBus";
import LoginUserSession from "./common/LoginUserSession";
import { ResLoader } from "./common/ResLoader";
import AnalyticsBridge from "./common/bridge/AnalyticsBridge";
import NativeBridge from "./common/bridge/NativeBridge";
import AppPlatformConfig, { AppPlatformType } from "./configs/AppPlatformConfig";
import { NativeEvent } from "./configs/ConstDefine";
import { CrptyConfig } from "./configs/CrptyConfig";
import { EventMgr } from "./framework/mgr/EventManager";
import ClientShieldInfo from "./models/ClientShieldInfo";
import NativeBridgeModel from "./models/NativeBridgeModel";
import ShopGoodsModel, { DataTypeEnum } from "./models/ShopGoodsModel";
import { SlotGameModel } from "./models/SlotGameModel";
import UserSelfInfo from "./models/UserSelfInfo";
import { SlotGameListParam } from "./models/param/SlotGameListParam";
import ThirdPartyLoginParam from "./models/param/ThirdPartyLoginParam";
import { UserLoginParam } from "./models/param/UserLoginParam";
import ValidateOrderParams from "./models/param/ValidateOrderParams";
import { SlotPushLogin } from "./models/socket/SlotPushLogin";
import { HttpHost } from "./net/HttpHost";
import { SlotApi } from "./net/apis/SlotApi";
import UserApi from "./net/apis/UserApi";
import { WalletApi } from "./net/apis/WalletApi";
import { GameHub } from "./net/socket/GameHub";
import { HallHub } from "./net/socket/HallHub";
import { SocketHost } from "./net/socket/SocketHost";
import BetKeyConfig from "./tools/BetKeyConfig";
import { StringUtil } from "./tools/StringUtil";
import { LocalStorageTool } from "./tools/storage/LocalStorageTool";

const EVENT_BUS = new EventBus();
const NATIVE_INTERFACE = new NativeBridge(EVENT_BUS);
(cc as any).ni = NATIVE_INTERFACE;
/**
 * 全局对象
 */
export class Constants {
    /** 单实例全局对象 */
    private static m_instance: Constants;
    /** 邮件条数*/
    public emailcount: number = 0

    public static getInstance() {
        if (!this.m_instance) {
            this.m_instance = new Constants();
            //注册监听事件
            this.m_instance.eventBusCallBack();
        }
        return this.m_instance;
    }
    /** 登录用户session */
    public m_LoginUserSession: LoginUserSession = new LoginUserSession();

    /** 原生平台调用  */
    public readonly native = NATIVE_INTERFACE;
    /** 统计使用  */
    public readonly analytics = new AnalyticsBridge();
    public m_phoneModel = new NativeBridgeModel();

    /** 资源加载器 */
    public readonly resLoader = new ResLoader(NATIVE_INTERFACE);

    /** 事件总线，实现跨模块事件传递分发 */
    public readonly eventBus = EVENT_BUS;

    /** api地址 */
    public m_httpHost: HttpHost = new HttpHost();

    /** key */
    public crptyConfig = CrptyConfig;

    public readonly NATIVE_IOS: boolean = cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS;
    public readonly NATIVE_ANDROID: boolean = cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID;

    /** 商品列表 */
    public _coinsGoodsListData: Array<ShopGoodsModel> = new Array<ShopGoodsModel>();
    public _diamondGoodsListData: Array<ShopGoodsModel> = new Array<ShopGoodsModel>();
    public _vipGoodsListData: Array<ShopGoodsModel> = new Array<ShopGoodsModel>();
    /** @description 当前请求商品信息 */
    public _serverOrderID: string = "";
    /** 是否是刘海屏 */
    public _isLHP: boolean = false;

    /** socket链接 */
    public m_slotSocketHost: SocketHost = new SocketHost();
    public m_hallSocketHost: SocketHost = new SocketHost();
    public readonly slotSocket = new GameHub(EVENT_BUS);
    public readonly hallSocket = new HallHub(EVENT_BUS);
    private m_contentHallSocket: boolean = false;
    private m_contentGameSocket: boolean = false;
    /** 游戏列表 */
    private _gameListData: Array<SlotGameModel> = new Array<SlotGameModel>();
    /** 用户正在玩的游戏 */
    public m_userPlayingGame: SlotGameModel;
    public m_betNumber: number;

    /** 正在执行的Bundle */
    public m_hallBundle: cc.AssetManager.Bundle;
    public m_gameBundle: cc.AssetManager.Bundle;

    /** 游戏 */
    public m_betKeyConfig: BetKeyConfig = new BetKeyConfig();

    /** 游戏状态 */
    public IsGameStart: boolean = false;
    public IsGameEnd: boolean = true;

    public isloginCollect: boolean = false;
    //第一次打开大厅
    public m_firstOpenHall: boolean = true;

    public GameConnectSuccessData: SlotPushLogin = null

    //是否是facebook登陆
    public isfacebook: boolean = false;

    //是否是整数等级奖励
    public iszhengji: boolean = false;

    /**
     * 客户端的屏蔽信息对像
     */
    private g_clientShiedInfo: ClientShieldInfo = null;
    /**
     * 获取屏蔽信息对像
     *
     * @return
     */
    public getClientShieldInfo(): ClientShieldInfo {
        if (this.g_clientShiedInfo == null) {
            this.g_clientShiedInfo = LocalStorageTool.getShield();
            if (!this.g_clientShiedInfo) {
                this.g_clientShiedInfo = new ClientShieldInfo();
            }
        }
        return this.g_clientShiedInfo;
    }

    /**
     * 重置屏蔽信息
     */
    public resetClientShieldInfo() {
        this.g_clientShiedInfo = null;
    }

    /**
     * 链接大厅socket
     */
    public contentHallSocket() {
        if (!this.m_contentHallSocket) {
            this.hallSocket.connect();
        }
    }

    /**
     * 链接游戏socket
     */
    public contentGameSocket(gameid: number) {
        if (!this.m_contentGameSocket) {
            this.slotSocket.connect(gameid);
        }
    }

    /**
     * 进入游戏获取登陆数据
     */
    public getGameSocketSuccess() {
        return this.GameConnectSuccessData;
    }

    /**
     * 获取游戏列表
     * @returns 
     */
    public async gameListData() {
        if (!this._gameListData || this._gameListData.length < 1) {
            let param: SlotGameListParam = new SlotGameListParam();
            param.setAllMode();
            param.m_offset = 0;
            let result = await SlotApi.getGameList(param);
            // cc.log("gameListData==", result)
            this._gameListData = result.data;
            return this._gameListData;
        }
        return this._gameListData;
    }

    /**
     * 发送HTTP get请求
     */
    public SendHttpGets(url: string, params: string) {
        if (AppPlatformConfig.platformType == AppPlatformType.FORMAL || AppPlatformConfig.platformType == AppPlatformType.TEST) {
            return
        }
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var respones = xhr.response;

            }
        };
        if (params != null && params != "") {
            xhr.open("GET", url + "?" + params, true);
        }
        else {
            xhr.open("GET", url, true);
        }
        xhr.responseType = 'json';
        xhr.timeout = 5000;
        xhr.send();
    };

    /**
     * 获取商品列表
     */
    public async shopGoodsListData() {
        if (!this._coinsGoodsListData || this._coinsGoodsListData.length < 1) {
            let result = await WalletApi.getProductSkuList(DataTypeEnum.DataType_Recharge);
            if (result.succ) {
                this._coinsGoodsListData = result.data;
            }
        }
        if (!this._diamondGoodsListData || this._diamondGoodsListData.length < 1) {
            let result = await WalletApi.getProductSkuList(DataTypeEnum.DataType_GoldCoin);
            if (result.succ) {
                this._diamondGoodsListData = result.data;
            }
        }
        // if (!this._vipGoodsListData || this._vipGoodsListData.length < 1) {
        //     let result = await WalletApi.getProductSkuList(DataTypeEnum.DataType_VIP);
        //     if (result.succ) {
        //         this._vipGoodsListData = result.data;
        //     }
        // }

    }

    /**
     * 后台登录
     */
    public async backLogin(): Promise<boolean> {
        return new Promise<boolean>(async resolve => {
            let params = new UserLoginParam();
            let loginUserInfo: UserSelfInfo = LocalStorageTool.getLoginserInfo();
            if (loginUserInfo && !StringUtil.isEmpty(loginUserInfo.m_userName) && !StringUtil.isEmpty(loginUserInfo.m_password)) {
                params.m_name = loginUserInfo.m_userName;
                params.setSysuidModel();
                params.m_pwd = loginUserInfo.m_password;
                params.m_udid = Constants.getInstance().m_phoneModel.UDID;
                params.m_idfa = Constants.getInstance().m_phoneModel.IDFA;
                params.m_bgAuth = true;
                let result = await UserApi.userLogin(params);
                if (result.succ) {
                    resolve(true);
                } else {
                    LocalStorageTool.setLoginserInfo(null);
                    resolve(false);
                }
            } else {
                LocalStorageTool.setLoginserInfo(null);
                resolve(false);
            }
        });
    }

    /**
     * 用户重新登录
     * @returns 
     */
    public async userReLogin() {
        let params = new UserLoginParam();
        params.m_name = this.m_LoginUserSession.getUserId();
        params.setSysuidModel();
        params.m_pwd = this.m_LoginUserSession.m_authToken;
        params.m_udid = Constants.getInstance().m_phoneModel.UDID;
        params.m_idfa = Constants.getInstance().m_phoneModel.IDFA;
        params.m_bgAuth = true;
        let result = await UserApi.userLogin(params);
        if (result.succ) {
            return 1;
        } else {
            //todo 退出登录
            return 2;
        }
    }

    private async iosTransactionFaild(code: string) {
        BaseUI.removeNetLoading();
    }

    private async iosTransaction(jsonStr: string) {
        const obj = JSON.parse(jsonStr);
        let params: ValidateOrderParams = new ValidateOrderParams();
        params.m_key = obj['key'];
        params.m_payGateway = obj['payGateway'];
        params.m_receipt = obj['receipt'];
        params.m_transSign = obj['transSign'];
        params.m_transAt = obj["transAt"];
        let result = await WalletApi.validateOrder(params);
        BaseUI.removeNetLoading();
        if (result.succ) {
            // let msg = {
            //     name: "MessageBoxView",
            //     bundleIndex: "gameprefab",
            //     btnOkText: "",
            //     btnCount: 1,
            //     zorder: 10000
            // }
            // UIManagernew.openUI(msg);
            // let data = {
            //     num:10000,
            //     time:2,
            // }
            // EventMgr.dispatch(EVENT.EVENT_SHOP_PAYSUC,data);
            return;
        } else {
            let msg = {
                name: "MessageBoxView",
                bundleIndex: "gameprefab",
                btnOkText: "faild",
                btnCount: 1,
                zorder: 10000
            }
            UIManagernew.openUI(msg);
            return;
        }
    }

    /**
     * 订单上传服务器
     * @param key 
     * @param orderId 
     * @param payGateway 
     * @param token 
     * @param time 
     */
    private async GPOrdUpdateServer(key: string, orderId: string, payGateway: string, token: string, time: string) {
        let param: ValidateOrderParams = new ValidateOrderParams();
        param.m_key = key;
        param.m_payGateway = payGateway;
        param.m_receipt = token;
        param.m_transSign = orderId;
        param.m_transAt = time;

        await WalletApi.validateOrder(param);
    }

    /**
     * 搜索订单上传服务器
     * @param serverid 
     * @param gpId 
     * @param payGateway 
     * @param token 
     * @param time 
     */
    private async queryOrdUpdateServer(serverid: string, gpId: string, payGateway: string, token: string, time: string) {
        let param: ValidateOrderParams = new ValidateOrderParams();
        param.m_key = serverid;
        param.m_payGateway = payGateway;
        param.m_receipt = token;
        param.m_transSign = gpId;
        param.m_transAt = time;

        await WalletApi.validateOrder(param);
    }

    private async iosBind(jsonStr: string) {
        let json: JSON = JSON.parse(jsonStr);
        let code: string = json['code'];
        if (code === "200") {
            let thirdPartyLoginParam: ThirdPartyLoginParam = new ThirdPartyLoginParam();
            thirdPartyLoginParam.m_oaType = json['oaType'];
            thirdPartyLoginParam.m_method = json['method'];
            thirdPartyLoginParam.m_openId = json['token'];
            thirdPartyLoginParam.m_fullName = "";
            thirdPartyLoginParam.m_valAppId = "";
            thirdPartyLoginParam.m_valCode = "";
            let result = await UserApi.bindingThirdParty(thirdPartyLoginParam);
            if (result.succ) {
                let msg = {
                    name: "MessageBoxView",
                    bundleIndex: "gameprefab",
                    btnOkText: "bind success",
                    btnCount: 1,
                    zorder: 10000
                }

                Constants.getInstance().eventBus.post(EventBusEnum.app_user_login_succes);
                Constants.getInstance().m_LoginUserSession.userInfo.m_userSafeAuth.m_appleBindStatus = 1;
                UIManagernew.openUI(msg);
                return;
            } else {
                if (result.code === 1000125 || result.code === 1000126 || result.code === 1000127 || result.code === 1000102) {
                    //走登录流程
                    this.thirdPartyLogin(thirdPartyLoginParam);
                    return;
                }
                let msg = {
                    name: "MessageBoxView",
                    bundleIndex: "gameprefab",
                    btnOkText: "Login server err:" + result.msg,
                    btnCount: 1,
                    zorder: 10000
                }
                // Constants.getInstance().eventBus.post(EventBusEnum.app_user_login_err);
                UIManagernew.openUI(msg);
                return;
            }
        }
    }

    private async iosLogin(jsonStr: string) {
        let json: JSON = JSON.parse(jsonStr);
        let code: string = json['code'];
        if (code === "200") {
            let thirdPartyLoginParam: ThirdPartyLoginParam = new ThirdPartyLoginParam();
            thirdPartyLoginParam.m_oaType = json['oaType'];
            thirdPartyLoginParam.m_method = json['method'];
            thirdPartyLoginParam.m_openId = json['token'];
            thirdPartyLoginParam.m_fullName = "";
            thirdPartyLoginParam.m_valAppId = "";
            thirdPartyLoginParam.m_valCode = "";
            let result = await UserApi.thirdPartyLogin(thirdPartyLoginParam);
            if (result.succ) {
                // let msg = {
                //     name: "MessageBoxView",
                //     bundleIndex: "gameprefab",
                //     btnOkText: "bind success",
                //     btnCount: 1,
                //     zorder: 10000
                // }
                // Constants.getInstance().m_LoginUserSession.userInfo.m_userSafeAuth.m_appleBindStatus = 1;
                Constants.getInstance().eventBus.post(EventBusEnum.ios_user_login_succes);
                Constants.getInstance().eventBus.post(EventBusEnum.app_user_login_succes);
                // UIManagernew.openUI(msg);
                return;
            } else {

                let msg = {
                    name: "MessageBoxView",
                    bundleIndex: "gameprefab",
                    btnOkText: "Login server err:" + result.msg,
                    btnCount: 1,
                    zorder: 10000
                }
                // Constants.getInstance().eventBus.post(EventBusEnum.app_user_login_err);
                UIManagernew.openUI(msg);
                return;
            }
        }
    }

    /**
     * 第三方登录登录
     * @param jsonStr
     */
    private async thirdLogin(jsonStr: string) {
        let json: JSON = JSON.parse(jsonStr);
        let code: number = json['code'];
        if (code === 200) {
            let m_thirdPartyLoginParam = new ThirdPartyLoginParam();
            m_thirdPartyLoginParam.m_oaType = json['appOaType'];
            m_thirdPartyLoginParam.m_method = json['mothod'];
            m_thirdPartyLoginParam.m_openId = json['openId'];
            m_thirdPartyLoginParam.m_valCode = json['valCode'];
            m_thirdPartyLoginParam.m_valAppId = json['valAppId'];

            m_thirdPartyLoginParam.m_headerUrl = json['headerUrl'];


            //获取地域信息
            let fullName: string = json['name'];
            if (!StringUtil.isEmpty(fullName)) {
                m_thirdPartyLoginParam.m_fullName = fullName;
            }
            let email: string = json['email'];
            if (!StringUtil.isEmpty(email)) {
                m_thirdPartyLoginParam.m_email = email;
            }
            BaseUI.addNetLoading();
            let result = await UserApi.thirdPartyLogin(m_thirdPartyLoginParam);
            if (result.succ) {
                Constants.getInstance().eventBus.post(EventBusEnum.user_cocos_login_succes);
                return;
            } else {
                BaseUI.removeNetLoading();
                let msg = {
                    name: "MessageBoxView",
                    bundleIndex: "gameprefab",
                    btnOkText: "Login server err:" + result.msg,
                    btnCount: 1,
                    zorder: 10000
                }
                Constants.getInstance().eventBus.post(EventBusEnum.app_user_login_err);
                UIManagernew.openUI(msg);
                return;
            }
        }
        let tipsMsg: string = "Login err";
        if (code === 300) {
            tipsMsg = "Cancel Login";
        } else if (code === 400) {
            tipsMsg = "Login error!";
        } else {
            tipsMsg = "Login err:" + code
        }
        let msg = {
            name: "MessageBoxView",
            bundleIndex: "gameprefab",
            btnOkText: tipsMsg,
            btnCount: 1,
            zorder: 10000
        }
        Constants.getInstance().eventBus.post(EventBusEnum.app_user_login_err);
        UIManagernew.openUI(msg);
    }


    /**
     * 第三方绑定
     * @param jsonStr
     */
    private async thirdLoginBind(jsonStr: string) {
        let json: JSON = JSON.parse(jsonStr);
        let code: number = json['code'];
        if (code === 200) {
            let m_thirdPartyLoginParam = new ThirdPartyLoginParam();
            m_thirdPartyLoginParam.m_oaType = json['appOaType'];
            m_thirdPartyLoginParam.m_method = json['mothod'];
            m_thirdPartyLoginParam.m_openId = json['openId'];
            m_thirdPartyLoginParam.m_valCode = json['valCode'];
            m_thirdPartyLoginParam.m_valAppId = json['valAppId'];

            m_thirdPartyLoginParam.m_headerUrl = json['headerUrl'];
            //获取地域信息
            let fullName: string = json['name'];
            if (!StringUtil.isEmpty(fullName)) {
                m_thirdPartyLoginParam.m_fullName = fullName;
            }
            let email: string = json['email'];
            if (!StringUtil.isEmpty(email)) {
                m_thirdPartyLoginParam.m_email = email;
            }
            let result = await UserApi.bindingThirdParty(m_thirdPartyLoginParam);
            if (result.succ) {
                let msg = {
                    name: "MessageBoxView",
                    bundleIndex: "gameprefab",
                    btnOkText: "Bind success",
                    btnCount: 1,
                    zorder: 10000
                }
                Constants.getInstance().m_LoginUserSession.userInfo.m_userSafeAuth.m_facebookBindStatus = 1;
                Constants.getInstance().eventBus.post(EventBusEnum.app_user_login_succes);
                UIManagernew.openUI(msg);
                return;
            } else {
                if (result.code === 1000125 || result.code === 1000126 || result.code === 1000127 || result.code === 1000102) {
                    //走登录流程
                    this.thirdPartyLogin(m_thirdPartyLoginParam);
                    return;
                }
                let msg = {
                    name: "MessageBoxView",
                    bundleIndex: "gameprefab",
                    btnOkText: "Login server err:" + result.msg,
                    btnCount: 1,
                    zorder: 10000
                }
                Constants.getInstance().eventBus.post(EventBusEnum.app_user_login_err);
                UIManagernew.openUI(msg);
                return;
            }
        }
        let tipsMsg: string = "Login err";
        if (code === 300) {
            tipsMsg = "Cancel Login";
        } else if (code === 400) {
            tipsMsg = "Login error!";
        } else {
            tipsMsg = "Login err:" + code
        }
        let msg = {
            name: "MessageBoxView",
            bundleIndex: "gameprefab",
            btnOkText: tipsMsg,
            btnCount: 1,
            zorder: 10000
        }
        Constants.getInstance().eventBus.post(EventBusEnum.app_user_login_err);
        UIManagernew.openUI(msg);
    }

    /**
     * 第三方登陆
     * @param param 
     */
    private async thirdPartyLogin(param: ThirdPartyLoginParam) {
        let result = await UserApi.thirdPartyLogin(param);
        if (result.succ) {
            let msg = {
                name: "MessageBoxView",
                bundleIndex: "gameprefab",
                btnOkText: "thirdPartyLogin bind success",
                btnCount: 1,
                zorder: 10000
            }
            Constants.getInstance().m_LoginUserSession.userInfo.m_userSafeAuth.m_facebookBindStatus = 1;
            Constants.getInstance().eventBus.post(EventBusEnum.app_user_login_succes);
            UIManagernew.openUI(msg);
            return;
        } else {
            let msg = {
                name: "MessageBoxView",
                bundleIndex: "gameprefab",
                btnOkText: "thirdPartyLogin server err:" + result.msg,
                btnCount: 1,
                zorder: 10000
            }
            UIManagernew.openUI(msg);
            Constants.getInstance().eventBus.post(EventBusEnum.app_user_login_err);
        }
    }

    /**
     * 注册监听事件
     */
    private eventBusCallBack() {
        Constants.getInstance().eventBus.register("app_update_server", this.GPOrdUpdateServer.bind(this));
        Constants.getInstance().eventBus.register("app_query_ord", this.queryOrdUpdateServer.bind(this));
        Constants.getInstance().eventBus.register("Event_userLogin", this.thirdLoginBind.bind(this));
        Constants.getInstance().eventBus.register("Event_userLoginCocos", this.thirdLogin.bind(this));

        EventMgr.register(NativeEvent.EVENT_IOS_LOGIN, this.iosLogin, this);
        EventMgr.register(NativeEvent.EVENT_IOS_BIND, this.iosBind, this);
        EventMgr.register(NativeEvent.EVENT_IOS_TRANSACTION, this.iosTransaction, this);
        EventMgr.register(NativeEvent.EVENT_IOS_TRANSACTIONFAILD, this.iosTransactionFaild, this);
    }
} 