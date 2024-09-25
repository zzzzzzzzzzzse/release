import { BaseUI } from "../common/BaseUI";
import { EventBusEnum } from "../common/EventBus";
import AppBundleConfig from "../configs/AppBundleConfig";
import AppLanguageConfig from "../configs/AppLanguageConfig";
import AppPlatformConfig, { AppPlatformType } from "../configs/AppPlatformConfig";
import { Constants } from "../Constants";
import { AudioMgr } from "../framework/mgr/AudioManager";
import TouristLoginParam from "../models/param/TouristLoginParam";
import { CoreApi } from "../net/apis/CoreApi";
import UserApi from "../net/apis/UserApi";
import { CoreUpdate } from "../tools/coreupdate/Coreupdate";
import { CoreupdateManager } from "../tools/coreupdate/CoreupdateManager";
import AnalyticsTool, { AnalyticsEventEnmu } from "../tools/log/AnalyticsTool";
import { LocalStorageTool } from "../tools/storage/LocalStorageTool";

const { ccclass, property } = cc._decorator;

/**
 * 大厅场景
 */
@ccclass
export default class CoreLoadScene extends cc.Component {

    /** 进度 */
    private progressBar: cc.Node = null;

    /** 提示内容 */
    private tipsNodeStr: cc.Label;

    /** 处理中 */
    private m_isProcessing: boolean = true;

    private deReg_HotLoad = () => { };


    //登录
    private loginSignName: string;
    private loginUdid: string;
    private loginIdfa: string;

    private m_isRestart: boolean = false;
    private versionLabel: cc.Label;
    private gamelogin: cc.Node = null;
    private barbg: cc.Node;
    private progressBarbg: cc.Node;
    private progresstxt: cc.Node;

    onLoad() {
        cc.debug.setDisplayStats(false);
        this.init();
        if (Constants.getInstance().NATIVE_IOS) {
            this.node.getChildByName("anim").active = false;
        }

    }

    private init() {
        this.initView();
        this.initData();
        this.initListener();
        this.eventBusCallBack();
        this.m_isProcessing = false;

        //读取json
        Constants.getInstance().m_betKeyConfig.readJson();
        cc.game.addPersistRootNode(cc.find("LoadingNode"))

        AudioMgr.playMusic("public_slot/audio/lobby_bg", "resources")
    }

    private initView() {
        this.progressBarbg = this.node.getChildByName("bar_progress");
        this.progressBar = this.progressBarbg.getChildByName("value");
        this.progresstxt = this.progressBarbg.getChildByName("progresstxt");
        this.progressBar.x = -1012;
        this.progressBarbg.active = true
        this.tipsNodeStr = this.node.getChildByName("text_info").getComponent(cc.Label);
        this.versionLabel = this.node.getChildByName("version").getComponent(cc.Label);
        this.gamelogin = this.node.getChildByName("gamelogin");
        this.barbg = this.node.getChildByName("barbg");
    }

    private initData() {
        Constants.getInstance().m_phoneModel.setData();
        this.checkPlatform();
    }

    private initListener() {
    }

    /**
 * 确定平台
 */
    private async checkPlatform() {
        Constants.getInstance().analytics.logEvent("check_platform", "");
        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
            Constants.getInstance().analytics.logEvent("check_android", "");
            //android系统
            // Constants.getInstance().analytics.logEvent("check_android_api", "");
            let BaseApi = LocalStorageTool.getBaseApiHost()
            let aesGateway2 = LocalStorageTool.getBaseJavaApiHost();
            if (BaseApi == "" || aesGateway2 == "") {
                LocalStorageTool.setBaseApiHost(AppPlatformConfig.getHttpUrl());
                Constants.getInstance().m_httpHost.m_hostList[0] = AppPlatformConfig.getHttpUrl();
                Constants.getInstance().analytics.logEvent("core_rout_post", "");
                let coreRoutResult = await CoreApi.coreRout();
                if (coreRoutResult.succ) {
                    Constants.getInstance().analytics.logEvent("core_rout_suc", "");
                    this.checkMainVersion();
                } else {
                    Constants.getInstance().analytics.logEvent("core_rout_err", "");
                    // this.errCallback();
                }
            } else {
                console.log("start BaseApiHost")
                Constants.getInstance().analytics.logEvent("core_rout_suc", "");
                let aesGateway2 = LocalStorageTool.getBaseJavaApiHost();
                AppPlatformConfig.TEST_HTTPURLJAVA = aesGateway2;
                this.checkMainVersion();
            }
        } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
            console.log("aaaa")
            //ios系统
            let BaseApi = LocalStorageTool.getBaseApiHost()
            let aesGateway2 = LocalStorageTool.getBaseJavaApiHost();
            if (BaseApi == "" || aesGateway2 == "") {
                LocalStorageTool.setBaseApiHost(AppPlatformConfig.getHttpUrl());
                Constants.getInstance().m_httpHost.m_hostList[0] = AppPlatformConfig.getHttpUrl();
                Constants.getInstance().analytics.logEvent("core_rout_post", "");
                let coreRoutResult = await CoreApi.coreRout();
                if (coreRoutResult.succ) {
                    Constants.getInstance().analytics.logEvent("core_rout_suc", "");
                    this.checkMainVersion();
                } else {
                    // this.errCallback();
                    Constants.getInstance().analytics.logEvent("core_rout_err", "");
                    //todo:清理缓存,重新连接
                }
            } else {
                console.log("start BaseApiHost")
                Constants.getInstance().analytics.logEvent("core_rout_suc", "");
                let aesGateway2 = LocalStorageTool.getBaseJavaApiHost();
                AppPlatformConfig.TEST_HTTPURLJAVA = aesGateway2;
                this.checkMainVersion();
            }
        } else {
            Constants.getInstance().analytics.logEvent("check_other", "");
            //web系统
            LocalStorageTool.setBaseApiHost(AppPlatformConfig.getWebTestUrl());
            Constants.getInstance().m_httpHost.m_hostList[0] = AppPlatformConfig.getWebTestUrl();
            AppPlatformConfig.TEST_HTTPURLJAVA = "http://192.168.42.120:9011/v01/apps/";
            this.node.getChildByName('test').active = true;
            if (cc.sys.os == cc.sys.OS_OSX) {
                //mac 直接连接正式服,网页测试
                AppPlatformConfig.TEST_HTTPURLJAVA = "";
                let baseApi: string = LocalStorageTool.getBaseApiHost();
                console.log("baseApisss ", baseApi);
                LocalStorageTool.setBaseApiHost(AppPlatformConfig.getHttpUrl());
                Constants.getInstance().m_httpHost.m_hostList[0] = AppPlatformConfig.getHttpUrl();

                let coreRoutResult = await CoreApi.coreRout();
                if (coreRoutResult.succ) {
                    //网页不检测大版本更新,直接进入大厅.
                    this.loginSignName = "testSign12";
                    this.loginUdid = "a51223a7311ad033f50";
                    this.loginIdfa = "84ca45c4-5356-4acd-a8b8-03362bffc7e2";
                    this.goToHall();
                } else {
                    this.setShowTips("Init err! Pleaser restart game");
                }
            }
        }

        // Constants.getInstance().UserPoint = true
        // //上传数据
        // let batchPointInfo = Constants.getInstance().analytics.batchPointInfo
        // console.log("batchPointInfo=", batchPointInfo)
        // if (batchPointInfo.length > 0) {
        //     UserApi.senduserPointInfo("", "0", "", JSON.stringify(batchPointInfo));
        // }
    }

    /**
     * 主版本检测
     */
    private async checkMainVersion() {
        CoreupdateManager.Instance().commonCoreUpdateUrl = LocalStorageTool.getBaseHotHost();
        cc.log("commonCoreUpdateUrl=2222", CoreupdateManager.Instance().commonCoreUpdateUrl)
        let result = await CoreApi.coreCheckUpdate(100, "core");
        if (result.succ) {
            let packageUrlstr: string = result.data.packageUrl;
            CoreupdateManager.Instance().commonCoreUpdateUrl = CoreupdateManager.Instance().commonCoreUpdateUrl + packageUrlstr
        }
        cc.log("commonCoreUpdateUrl=", CoreupdateManager.Instance().commonCoreUpdateUrl)
        this.setShowTips("Please wait, loading now...");
        let versionInfo: CoreUpdate.BundleConfig = new CoreUpdate.BundleConfig("", "");
        CoreupdateManager.Instance().checkUpdate((code, state) => {
            console.log("load ManifestCode", code);
            console.log("load ManifestState", state);
            if (code == CoreUpdate.Code.NEW_VERSION_FOUND) {
                //有新版本
                CoreupdateManager.Instance().CoreUpdate();
                this.m_isRestart = true;
            } else if (state == CoreUpdate.State.TRY_DOWNLOAD_FAILED_ASSETS) {
                //尝试重新下载之前下载失败的文件
                // CoreupdateManager.Instance().CoreUpdate();
                CoreupdateManager.Instance().downloadFailedAssets()
                this.m_isRestart = true;
            } else if (code == CoreUpdate.Code.ALREADY_UP_TO_DATE) {
                //已经是最新版本
                this.setShowTips(AppLanguageConfig.Tips_Load_NewVer);
                let timeout = setTimeout(() => {
                    clearTimeout(timeout);
                    this.checkGameprefabVersion();
                }, 100);
            } else if (code == CoreUpdate.Code.ERROR_DOWNLOAD_MANIFEST ||
                code == CoreUpdate.Code.ERROR_NO_LOCAL_MANIFEST ||
                code == CoreUpdate.Code.ERROR_PARSE_MANIFEST) {
                //下载manifest文件失败
            } else if (code == CoreUpdate.Code.CHECKING) {

                //当前正在检测更新
            } else {
            }
        }, versionInfo.name);
    }

    /**
     * 加入游戏
     */
    private async joinGame() {
        //正常登录流程
        this.loginUdid = Constants.getInstance().m_phoneModel.UDID;
        this.loginSignName = this.loginUdid;
        this.loginIdfa = Constants.getInstance().m_phoneModel.IDFA;
        this.checkHallVersion();
    }

    /**
     * 设置提示内容
     * @param str 
     */
    private setShowTips(str: string) {
        this.tipsNodeStr.string = "Please wait, loading now...";
    }

    /**
     * 设置进度
     * @param num 进度 0-1
     */
    private setProgress(num: number) {
        let new_num = num * 1015;
        let bainum = Math.floor(num * 100);
        this.progresstxt.getComponent(cc.Label).string = bainum + "%"
        // this.progressBar.width = new_num;
        this.progressBar.x = new_num - 1012
    }



    /**
     * 主版本检测
     */
    private async checkGameprefabVersion() {
        if (!AppPlatformConfig.OPEN_HOTLOAD) {
            this.checkHallVersion();
            return;
        }
        CoreupdateManager.Instance().commonCoreUpdateUrl = LocalStorageTool.getBaseHotHost();
        let result = await CoreApi.coreCheckUpdate(101, "comm");
        if (result.succ) {
            let packageUrlstr: string = result.data.packageUrl;
            console.log("ioscheckMain", CoreupdateManager.Instance().commonCoreUpdateUrl);
            console.log("ioscheckMain", packageUrlstr);
            CoreupdateManager.Instance().commonCoreUpdateUrl = CoreupdateManager.Instance().commonCoreUpdateUrl + packageUrlstr
        }
        this.setShowTips("check Game core version");
        let versionInfo: CoreUpdate.BundleConfig = new CoreUpdate.BundleConfig(AppBundleConfig.BUNDLE_GamePrefab, AppBundleConfig.BUNDLE_GamePrefab);
        CoreupdateManager.Instance().checkUpdate((code, state) => {
            if (code == CoreUpdate.Code.NEW_VERSION_FOUND) {
                //有新版本
                CoreupdateManager.Instance().CoreUpdate();
                this.m_isRestart = true;
            } else if (state == CoreUpdate.State.TRY_DOWNLOAD_FAILED_ASSETS) {
                //尝试重新下载之前下载失败的文件
                // CoreupdateManager.Instance().CoreUpdate();
                CoreupdateManager.Instance().downloadFailedAssets()
                this.m_isRestart = true;
            } else if (code == CoreUpdate.Code.ALREADY_UP_TO_DATE) {
                //已经是最新版本
                this.setShowTips(AppLanguageConfig.Tips_Load_NewVer);
                let timeout = setTimeout(() => {
                    clearTimeout(timeout);
                    this.joinGame();
                }, 100);
            } else if (code == CoreUpdate.Code.ERROR_DOWNLOAD_MANIFEST ||
                code == CoreUpdate.Code.ERROR_NO_LOCAL_MANIFEST ||
                code == CoreUpdate.Code.ERROR_PARSE_MANIFEST) {
                //下载manifest文件失败
            } else if (code == CoreUpdate.Code.CHECKING) {
                //当前正在检测更新
            } else {
            }
        }, versionInfo.name);
    }

    /**
     * 检测大厅版本
     */
    private async checkHallVersion() {
        this.setProgress(0.2);
        this.setShowTips(AppLanguageConfig.Tips_Load_checkVer);
        if (!AppPlatformConfig.OPEN_HOTLOAD) {
            this.goToLogin();
            return;
        }
        CoreupdateManager.Instance().commonCoreUpdateUrl = LocalStorageTool.getBaseHotHost();
        let result = await CoreApi.coreCheckUpdate(102, "service");
        if (result.succ) {
            let packageUrlstr: string = result.data.packageUrl;
            CoreupdateManager.Instance().commonCoreUpdateUrl = CoreupdateManager.Instance().commonCoreUpdateUrl + packageUrlstr
        }
        let versionInfo: CoreUpdate.BundleConfig = new CoreUpdate.BundleConfig(AppBundleConfig.BUNDLE_HALL, AppBundleConfig.BUNDLE_HALL);
        CoreupdateManager.Instance().checkUpdate((code, state) => {
            if (code == CoreUpdate.Code.NEW_VERSION_FOUND) {
                //有新版本
                CoreupdateManager.Instance().CoreUpdate();
                this.m_isRestart = true;
            } else if (state == CoreUpdate.State.TRY_DOWNLOAD_FAILED_ASSETS) {
                //尝试重新下载之前下载失败的文件
                // CoreupdateManager.Instance().CoreUpdate();
                CoreupdateManager.Instance().downloadFailedAssets()
                this.m_isRestart = true;
            } else if (code == CoreUpdate.Code.ALREADY_UP_TO_DATE) {
                //已经是最新版本
                this.setShowTips(AppLanguageConfig.Tips_Load_NewVer);
                // this.goToHall();
                this.goToLogin();
            } else if (code == CoreUpdate.Code.ERROR_DOWNLOAD_MANIFEST ||
                code == CoreUpdate.Code.ERROR_NO_LOCAL_MANIFEST ||
                code == CoreUpdate.Code.ERROR_PARSE_MANIFEST) {
                //下载manifest文件失败
            } else if (code == CoreUpdate.Code.CHECKING) {
                //当前正在检测更新
            } else {
            }
        }, versionInfo.name);
    }

    /**
     * 热更进行中
     * @param CoreUpdateData 热更进度文件
     */
    private CoreUpdateLoading(CoreUpdateData: CoreUpdate.DownLoadInfo) {
        if (CoreUpdateData) {
            if (CoreUpdateData.bundleName === AppBundleConfig.BUNDLE_HALL) {
                //大厅
                if (CoreUpdateData.needRestart) {
                    cc.sys.localStorage.setItem("app_hallVersion", CoreUpdateData.newVersion);
                    //下载完成
                    // this.goToHall();
                    this.goToLogin();
                } else {
                    //设置下载进度
                    let proNum = CoreUpdateData.downloadedFiles / CoreUpdateData.totalFiles * 0.5;
                    this.setProgress(0.2 + proNum);
                    this.setShowTips(AppLanguageConfig.Tips_Load_loading + CoreUpdateData.downloadedFiles + "/" + CoreUpdateData.totalFiles);
                }
            } else if (CoreUpdateData.bundleName === AppBundleConfig.BUNDLE_GamePrefab) {
                //游戏核心
                if (CoreUpdateData.needRestart) {
                    cc.sys.localStorage.setItem("app_gameCoreVersion", CoreUpdateData.newVersion);
                    //下载完成
                    this.joinGame();
                }
            } else {
                //主包
                if (CoreUpdateData.needRestart) {
                    cc.sys.localStorage.setItem("app_coreVersion", CoreUpdateData.newVersion);
                    //下载完成
                    this.checkGameprefabVersion();
                } else {
                    //设置下载进度
                    let proNum = CoreUpdateData.downloadedFiles / CoreUpdateData.totalFiles * 0.2;
                    this.setProgress(proNum);
                    this.setShowTips("Core update： " + CoreUpdateData.downloadedFiles + "/" + CoreUpdateData.totalFiles);
                }
            }
        }
    }

    /**
     * 登录大厅
     */
    private async goToHall() {
        if (this.m_isRestart) {
            //有更新重启游戏
            cc.game.restart();
            return;
        }
        let mainResult = await CoreApi.coreMain();
        if (mainResult.succ) {
            this.setProgress(0.75);
            this.setShowTips(AppLanguageConfig.Tips_Load_getUserInfo);

            let params2 = new TouristLoginParam();
            params2.m_signName = this.loginSignName;
            params2.m_udid = this.loginUdid;
            params2.m_idfa = this.loginIdfa;
            let result1 = await UserApi.touristLogin(params2);
            this.setProgress(0.8);
            if (result1.succ) {
                this.setProgress(0.85);
                this.loginSuccessToHall();
            }
        }
    }

    /**
     * 游戏登陆
     */
    private async goToLogin() {
        if (this.m_isRestart) {
            //有更新重启游戏
            cc.game.restart();
            return;
        }

        this.setProgress(0.75);
        let mainResult = await CoreApi.coreMain();
        if (mainResult.succ) {
            this.setProgress(1);
            // this.setShowTips(AppLanguageConfig.Tips_Load_getUserInfo);
            this.barbg.active = false
            this.progressBarbg.active = false
            // this.onGuestLogin();

            let backLogin: boolean = await Constants.getInstance().backLogin();
            if (backLogin) {
                //后台登录成功
                this.loginSuccessToHall(false);
            } else {
                this.tipsNodeStr.node.active = false;
                //正常登录流程
                if (this.gamelogin) {
                    this.gamelogin.active = true
                    let facebookbtn = this.gamelogin.getChildByName("btn_facebook");
                    let applebtn = this.gamelogin.getChildByName("btn_apple");
                    let googlebtn = this.gamelogin.getChildByName("btn_google");
                    let guestbtn = this.gamelogin.getChildByName("btn_guest");
                    if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
                        applebtn.active = false
                        facebookbtn.active = false
                        // googlebtn.active = true
                        // facebookbtn.x = -220;
                        guestbtn.x = 0;
                    } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
                        applebtn.active = true
                        googlebtn.active = false
                        facebookbtn.active = false
                        applebtn.x = -220;
                        guestbtn.x = 220;
                    } else {

                    }
                }
            }
        }
    }

    /**
     * facebook登陆
     */
    private async onThirdLoginSuccess() {
        // this.setShowTips(AppLanguageConfig.Tips_Load_loadingSuccess);
        this.loginSuccessToHall();
    }

    private async onIosLoginSucces() {
        // this.setShowTips(AppLanguageConfig.Tips_Load_loadingSuccess);
        this.loginSuccessToHall();
    }

    //客服
    private onkefuclick() {
        AnalyticsTool.logEvent(AnalyticsEventEnmu.lobby_help)
        Constants.getInstance().native.initFreshchatUser();
        Constants.getInstance().native.showConversations();
    }

    /**
     * 游客登陆
     */
    private async onGuestLogin() {
        BaseUI.addNetLoading();
        let params2 = new TouristLoginParam();
        params2.m_signName = this.loginSignName;
        params2.m_udid = this.loginUdid;
        params2.m_idfa = this.loginIdfa;
        let result1 = await UserApi.touristLogin(params2);
        if (result1.succ) {
            this.loginSuccessToHall();
        }
    }

    /**
     * 登录成功
     */
    private async loginSuccessToHall(showLoadingView: boolean = true) {
        //请求socket
        await CoreApi.getWsclist();
        if (showLoadingView) {
            this.setProgress(0.9);
        }
        //获取用户基本信息
        let result = await UserApi.getBaseInfo();
        if (result.succ) {
            if (showLoadingView) {
                this.setProgress(1);
            }
            this.setShowTips(AppLanguageConfig.Tips_Load_loadingSuccess);
            cc.assetManager.loadBundle(AppBundleConfig.BUNDLE_HALL, (err, sucBundle) => {
                if (!showLoadingView) {
                    BaseUI.removeNetLoading();
                }

                if (err) {
                } else {
                    if (sucBundle) {
                        Constants.getInstance().m_hallBundle = sucBundle;
                        Constants.getInstance().resLoader.loadBundleScene(sucBundle, AppBundleConfig.BUNDLE_HALLSceneUrl, 1);
                    } else {
                    }
                }
            });
        }
    }

    /**
     * google登陆
     */
    private onGooleLogin() {
        AnalyticsTool.logEvent(AnalyticsEventEnmu.login_google);
        Constants.getInstance().native.googleLogin();
    }

    private onFacebookLogin() {
        AnalyticsTool.logEvent(AnalyticsEventEnmu.login_facebook);
        Constants.getInstance().native.facebookLogin();
    }

    /**
     * 苹果登陆
     */
    private onAppleLogin() {
        console.log('lickIos');
        AnalyticsTool.logEvent(AnalyticsEventEnmu.login_ios);
        Constants.getInstance().native.iosLogin();
    }

    /**
     * 注册回调
     */
    private eventBusCallBack() {
        Constants.getInstance().eventBus.register(EventBusEnum.user_cocos_login_succes, this.onThirdLoginSuccess.bind(this));
        Constants.getInstance().eventBus.register(EventBusEnum.ios_user_login_succes, this.onIosLoginSucces.bind(this));
        Constants.getInstance().eventBus.register(CoreUpdate.Event.CoreUpdate_DOWNLOAD, this.CoreUpdateLoading.bind(this));
    }

    /**
     * 注销回调
     */
    private eventDeRegister() {
        Constants.getInstance().eventBus.deregister(CoreUpdate.Event.CoreUpdate_DOWNLOAD, this.deReg_HotLoad.bind(this));
    }

    /**
     * 销毁
     */
    onDestroy() {
        this.eventDeRegister();
    }

    // update (dt) {}

    /**
     * 进入游戏
     * @param event 
     * @param customEventData 
     */
    public async aTestJoinGame(event: Event, str: string) {
        if (this.m_isProcessing) {
            return;
        }
        this.m_isProcessing = true;
        // event.stopPropagation();
        let userId = Number(str);
        if (userId === 1) {
            // var msg = {
            //     name: "uitestlayer",
            //     bResize: true,
            // }
            // UIManager.openUI(msg)
            this.loginSignName = "testSign61";
            this.loginUdid = "a102a7311ad1d6f1";
            this.loginIdfa = "84ca45c4-5996-4acd-a8b8-13362bffc8e1";
            this.goToHall();
        } else if (userId === 2) {
            this.loginSignName = "testSign11";
            this.loginUdid = "a6222a7311ad033f2"; //a202a7311ad033f2//1  a102a7311ad033f2  a723a7311ad033f2  a7902a7311ad033f2//1  a122a7311ad033f2 a221a7311ad033f2 a7952a7311ad033f2
            this.loginIdfa = "84ca45c4-5356-4acd-a8b8-03362bffc7e2";
            this.goToHall();
        } else if (userId === 3) {
            this.loginSignName = "testSign12";
            this.loginUdid = "a102a73jlk6gf354";
            this.loginIdfa = "84ca17c4-5994-4acd-a812-0566234f11e3";
            this.goToHall();
        } else if (userId === 4) {
            this.loginSignName = "testSign13";
            this.loginUdid = "a102825j8j6hq8k7";
            this.loginIdfa = "84ca45c4-4594-4acd-a8b8-01262bffc7e4";
            this.goToHall();
        } else if (userId === 5) {
            // if (AppPlatformConfig.ISOLDVERSION) {
            //     this.loginSignName = "testSign14";
            //     this.loginUdid = "a420a7311ad033f2";//a411a7311ad033f2
            //     this.loginIdfa = "84ca45c4-5994-4acd-a8b8-03362bffc7e5";
            //     this.goToHall();
            // } else {
            LocalStorageTool.setBaseApiHost(AppPlatformConfig.KAIFA_HTTPURL);
            Constants.getInstance().m_httpHost.m_hostList[0] = AppPlatformConfig.KAIFA_HTTPURL;
            let coreRoutResult = await CoreApi.coreRout();
            cc.log("coreRoutResult", coreRoutResult)
            if (coreRoutResult.succ) {
                this.checkMainVersion();
            } else {
                this.setShowTips("Init err! Pleaser restart game");
            }
            // }


        } else if (userId === 6) {
            //测试服
            AppPlatformConfig.platformType = AppPlatformType.TEST;
            LocalStorageTool.setBaseApiHost(AppPlatformConfig.getHttpUrl());
            Constants.getInstance().m_httpHost.m_hostList[0] = AppPlatformConfig.getHttpUrl();
            let coreRoutResult = await CoreApi.coreRout();
            if (coreRoutResult.succ) {
                this.checkMainVersion();
            } else {
                this.setShowTips("Init err! Pleaser restart game");
            }
        } else if (userId === 7) {
            //开发服
            AppPlatformConfig.platformType = AppPlatformType.KAIFA;
            LocalStorageTool.setBaseApiHost(AppPlatformConfig.getHttpUrl());
            Constants.getInstance().m_httpHost.m_hostList[0] = AppPlatformConfig.getHttpUrl();
            let coreRoutResult = await CoreApi.coreRout();
            if (coreRoutResult.succ) {
                this.checkMainVersion();
            } else {
                this.setShowTips("Init err! Pleaser restart game");
            }
        }
    }
}

/**
 * 确定版本状态码
 */
enum CheckVersionStatus {
    /** 最新版本 */
    Status_none = 0,
    /** 最新版本 */
    Status_new = 1,
    /** 需要下载 */
    Status_download = 2,
    /** 正在检测更新 */
    Status_checking = 3,
    /** 错误 */
    Status_err = 4,
}


