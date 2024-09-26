import AppBundleConfig from "../../../../Script/configs/AppBundleConfig";
import AppLanguageConfig from "../../../../Script/configs/AppLanguageConfig";
import AppPlatformConfig, { AppPlatformType } from "../../../../Script/configs/AppPlatformConfig";
import { Constants } from "../../../../Script/Constants";
import GameMainController from "../../../../Script/framework/controller/GameMainController";
import { SlotGameModel } from "../../../../Script/models/SlotGameModel";
import { SlotPushLogin } from "../../../../Script/models/socket/SlotPushLogin";
import { CoreApi } from "../../../../Script/net/apis/CoreApi";
import { SlotEventBusEnum } from "../../../../Script/net/socket/GameHub";
import { CoreUpdate } from "../../../../Script/tools/coreupdate/Coreupdate";
import { CoreupdateManager } from "../../../../Script/tools/coreupdate/CoreupdateManager";
import { LocalStorageTool } from "../../../../Script/tools/storage/LocalStorageTool";
import { UIManagernew } from "../../../../UIManagernew";
import { SlotGameConfigModel } from "../../config/SlotGameConfig";

/**
 * 加载界面
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class LoadingScene extends cc.Component {

    @property(cc.Label)
    progressText: cc.Label = null;

    @property(cc.Label)
    tipsLabel: cc.Label = null;

    @property(cc.Node)
    mask: cc.Node = null;

    @property(cc.Node)
    Container: cc.Node = null;

    @property(cc.Node)
    maskwidnode: cc.Node = null;

    @property(cc.Label)
    gameVersion: cc.Label = null;


    /**
     * 游戏配置
     */
    private gameConfig: SlotGameConfigModel
    private rannum: number = 0
    private _width: number;
    private deReg_HotLoad = () => { };
    private deReg_onServerConnectSuccess = () => { };
    versionid: number;
    gameid: number;
    gamelist: SlotGameModel[];
    beforenum: number = 0;
    beforewidth: number = 0;

    onLoad() {
        this._width = 560;
        this.rannum = Math.random() * 0.2 + 0.6

        this.initData();
    }



    private initData() {

        //注册
        this._registerEvent();

        this.gameConfig = Constants.getInstance().resLoader.loadOpts;

        if (this.gameConfig.gameOrientation === 1) {
            //屏幕方向 (1=横屏 2=竖屏)
            cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
        } else {
            cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
        }

        let frameSize = cc.view.getFrameSize();
        let designSize = cc.view.getDesignResolutionSize();
        if (frameSize.width / frameSize.height > designSize.width / designSize.height) {
            this.node.width = designSize.height * frameSize.width / frameSize.height;
            this.node.height = designSize.height;
            this.node.getComponent(cc.Canvas).designResolution = cc.size(this.node.width, this.node.height);
        } else {
            this.node.width = designSize.width;
            this.node.height = designSize.width * frameSize.height / frameSize.width;
            this.node.getComponent(cc.Canvas).designResolution = cc.size(this.node.width, this.node.height);
        }



        this.gameid = this.gameConfig.gameID
        let self = this
        var _prefabPath = "prefab/" + this.gameConfig.gameBundle + "loading"
        cc.assetManager.loadBundle("resources", (err, bundle) => {
            bundle.load(_prefabPath, cc.Prefab, function (err, prefab: cc.Prefab) {
                if (prefab) {
                    var _newUIRoot = cc.instantiate(prefab)
                    _newUIRoot.parent = self.Container;
                    // self.updatagame()
                    // self.getcoreupdate()

                    if (AppPlatformConfig.ISOLDVERSION) {
                        self.rannum = Math.random() * 0.2 + 0.1
                        self.loadBundle();
                    } else {
                        self.getcoreupdate()
                    }

                } else {
                    let sureCallback = (() => {
                        Constants.getInstance().resLoader.setOrientation(1)
                        cc.director.loadScene("hall")
                    })

                    let msg1 = {
                        name: "MessageBoxView",
                        sureCallback: sureCallback,
                        bundleIndex: AppBundleConfig.BUNDLE_HALL,
                        btnOkText: "error",
                        btnCount: 1,
                        zorder: 1000
                    }
                    UIManagernew.openUI(msg1)
                }

            })
        });

        //版本号
        if (AppPlatformConfig.platformType == AppPlatformType.KAIFA) {
            this.gameVersion.node.active = true
        }
        // Constants.getInstance().SendHttpGets(AppPlatformConfig.KAIFA_LOGURL, "isError=1&uid="+Constants.getInstance().m_LoginUserSession.m_uid+"&msg="+"gameBundle="+this.gameConfig.gameBundle+"_Version="+Manager.localStorage.getItem(this.gameConfig.gameBundle+"_Version", 1))
        this.gameVersion.string = "Version: " + Manager.localStorage.getItem(this.gameConfig.gameBundle + "_Version", 1)
    }

    public _registerEvent(): void {
        Constants.getInstance().eventBus.register(CoreUpdate.Event.CoreUpdate_DOWNLOAD, this.CoreUpdateLoading.bind(this));
        Constants.getInstance().eventBus.register(SlotEventBusEnum.Slot_ServerConnectSuccess, this.onplayerLoginSuccess.bind(this));

    }

    public _unRegisterEvent(): void {
        Constants.getInstance().eventBus.deregister(CoreUpdate.Event.CoreUpdate_DOWNLOAD, this.deReg_HotLoad.bind(this));
        Constants.getInstance().eventBus.deregister(SlotEventBusEnum.Slot_ServerConnectSuccess, this.deReg_onServerConnectSuccess.bind(this));
    }


    //获取更新地址
    private async getcoreupdate() {
        let namestr: string = this.gameConfig.gameBundle
        let gameversion: number = parseInt(Manager.localStorage.getItem(namestr, -1));

        Constants.getInstance().gameListData().then(data => {
            this.gamelist = data
            let serverversion = -1
            for (let i: number = 0; i < this.gamelist.length; i++) {
                if (this.gameid == this.gamelist[i].m_id) {
                    serverversion = this.gamelist[i].m_version
                }
            }
            if (serverversion > gameversion) {
                this.getcoreupdateaddress();
            } else {
                this.updatagame();
                // this.loadBundle();
            }

        });



        // let result = await CoreApi.coreCheckUpdate(this.gameConfig.gameID);
        // cc.log("getcoreupdate=",result)
        // if(result.succ){
        //     let packageUrlstr:string = result.data.packageUrl;
        //     this.versionid = result.data.version;
        //     this.gameid = result.data.clientId;

        //     let oldpackageUrlstr = LocalStorageTool.getBaseHotHost();
        //     let lastindex = oldpackageUrlstr.lastIndexOf("/")
        //     let newstr = oldpackageUrlstr.substring(0,lastindex)+"/"
        //     cc.log("packageUrlstr=",newstr)
        //     if(this.versionid>gameversion){
        //         CoreupdateManager.Instance().commonCoreUpdateUrl = newstr + packageUrlstr
        //         this.updatagame()
        //     }else{
        //         this.updatagame()
        //     }

        // }else{
        //     let sureCallback = (() => {
        //         Constants.getInstance().resLoader.setOrientation(1)
        //         cc.director.loadScene("hall")
        //     })
        //     let msg1 = {
        //         name: "MessageBoxView",
        //         sureCallback: sureCallback,
        //         bundleIndex: "gameprefab",
        //         btnOkText: "core error",
        //         btnCount: 1,
        //         zorder: 1000
        //     }
        //     UIManagernew.openUI(msg1)
        // }
    }

    //更新地址
    private async getcoreupdateaddress() {
        let namestr: string = this.gameConfig.gameBundle
        let gameversion: number = parseInt(Manager.localStorage.getItem(namestr, -1));
        let result = await CoreApi.coreCheckUpdate(this.gameConfig.gameID, "game");
        console.log("getcoreupdate=", JSON.stringify(result));
        if (result.succ) {
            let packageUrlstr: string = result.data.packageUrl;
            this.versionid = result.data.version;
            this.gameid = result.data.clientId;

            let oldpackageUrlstr = LocalStorageTool.getBaseHotHost();
            let lastindex = oldpackageUrlstr.lastIndexOf("/")
            let newstr = oldpackageUrlstr
            cc.log("packageUrlstr=", newstr)
            CoreupdateManager.Instance().commonCoreUpdateUrl = newstr + packageUrlstr
            // if(this.versionid>gameversion){
            // CoreupdateManager.Instance().commonCoreUpdateUrl = newstr + packageUrlstr
            this.updatagame()
            // }else{
            //     this.updatagame()
            //     // this.loadBundle();
            // }

        } else {
            let sureCallback = (() => {
                Constants.getInstance().resLoader.setOrientation(1)
                cc.director.loadScene("hall")
            })
            let msg1 = {
                name: "MessageBoxView",
                sureCallback: sureCallback,
                bundleIndex: AppBundleConfig.BUNDLE_HALL,
                btnOkText: "core error",
                btnCount: 1,
                zorder: 1000
            }
            UIManagernew.openUI(msg1)
        }
    }

    /**
     * 更新游戏
     */
    private updatagame() {
        //确定版本
        let versionInfo: CoreUpdate.BundleConfig = new CoreUpdate.BundleConfig(this.gameConfig.gameBundle, this.gameConfig.gameBundle);
        CoreupdateManager.Instance().checkUpdate((code, state) => {
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
                this.rannum = Math.random() * 0.3 + 0.2
                this.loadBundle();

            } else if (code == CoreUpdate.Code.ERROR_DOWNLOAD_MANIFEST ||
                code == CoreUpdate.Code.ERROR_NO_LOCAL_MANIFEST ||
                code == CoreUpdate.Code.ERROR_PARSE_MANIFEST) {
                //下载manifest文件失败

            } else if (code == CoreUpdate.Code.CHECKING) {
                //当前正在检测更新
            } else if (code == CoreUpdate.Code.UPDATE_FINISHED) {
                //更新完成
                // this.loadBundle();
            } else {
            }
        }, versionInfo.name);

    }

    /**
     * 开始热更
     */
    private itemStartCoreUpdate(bundleName: string) {

    }


    /**
     * 热更进行中
     * @param CoreUpdateData 热更进度文件
     */
    private CoreUpdateLoading(CoreUpdateData: CoreUpdate.DownLoadInfo) {
        if (CoreUpdateData) {
            if (CoreUpdateData.needRestart) {
                let namestr: string = this.gameConfig.gameBundle
                Manager.localStorage.setItem(namestr, this.versionid)
                Manager.localStorage.setItem(CoreUpdateData.bundleName + "_Version", CoreUpdateData.newVersion)
                this.rannum = 0.7
                this.loadBundle();
            } else {
                //设置下载进度 0-1
                let proNum = CoreUpdateData.downloadedFiles / CoreUpdateData.totalFiles;
                let proNumnew = proNum * 0.7;
                let kuang = this._width * proNumnew - 540;
                if (kuang >= this.mask.x) {
                    this.mask.x = this._width * proNumnew - 540;
                }
                // this.mask.x = this._width * proNumnew-540;
                this.progressText.string = Math.round(proNumnew * 100) + "%"
            }

        }
    }

    /**
     * 加载bundle
     */
    private loadBundle() {
        cc.assetManager.loadBundle("gameprefab", async (err, prefabBundle) => {
            if (err) {
                this.setTips(AppLanguageConfig.Bundle_loading_err);
            } else {
                if (prefabBundle) {

                    await this.loadprefabRes(prefabBundle);
                } else {

                }
            }
        });

        //版本号
        if (AppPlatformConfig.platformType == AppPlatformType.KAIFA) {
            this.gameVersion.node.active = true
        }
        // Constants.getInstance().SendHttpGets(AppPlatformConfig.KAIFA_LOGURL, "isError=1&uid="+Constants.getInstance().m_LoginUserSession.m_uid+"&msg="+"gameBundle="+this.gameConfig.gameBundle+"_Version="+Manager.localStorage.getItem(this.gameConfig.gameBundle+"_Version", 1))
        this.gameVersion.string = "Version: " + Manager.localStorage.getItem(this.gameConfig.gameBundle + "_Version", 1)

    }

    /**
         * 加载功能资源
         */
    private loadprefabRes(prefabBundle: cc.AssetManager.Bundle) {
        prefabBundle.loadDir("prefabs", cc.Prefab, function (completedCount: number, totalCount: number, item: any) {
            //更新进度条
            let percent: number = completedCount / totalCount;
            if (percent < this.rannum) {
                let kuangdu = this._width * percent - 540;
                if (kuangdu >= this.mask.x) {
                    this.mask.x = this._width * percent - 540;
                }
                // this.mask.x = this._width * percent-540;
            }
            if (percent > this.rannum) {
                percent = this.rannum
            }
            this.progressText.string = Math.round(percent * 100) + "%"
        }.bind(this), function (err, assets, urls) {
            if (err) { cc.log('error', urls, assets, ', because:' + err); return; }
            cc.assetManager.loadBundle(this.gameConfig.gameBundle, async (err, sucBundle) => {
                if (err) {
                    this.setTips(AppLanguageConfig.Bundle_loading_err);
                } else {
                    if (sucBundle) {
                        await this.loadRes(sucBundle);
                    } else {
                        this.setTips(AppLanguageConfig.Bundle_loading_err);
                    }
                }
            });
        }.bind(this));
    }

    /**
     * 加载资源
     */
    private loadRes(sucBundle: cc.AssetManager.Bundle) {
        // sucBundle.load("script/data/DancingLionConfig", asset => {
        // });
        if (GameMainController.isDebug) {
            cc.director.loadScene(this.gameConfig.gameScene);
        } else {
            let percent: number = 0
            let beforepercent: number = 0
            // cc.log(this.gameConfig)
            Constants.getInstance().m_gameBundle = sucBundle;
            //所有需要预加载的目录数组
            let pathArray = [
                // { path: "res/prefab", type: cc.Prefab },
                // { path: "res/audio", type: cc.AudioClip },
                // { path: "res/images/base", type: cc.SpriteFrame },
                { path: "res/texture", type: cc.SpriteFrame },
                { path: "res/anim", type: sp.SkeletonData },
                { path: "res/fonts", type: cc.Font },
            ]
            let finishCount: number = 0; //已完成预加载的目录数
            for (let i = 0; i < pathArray.length; i++) {
                let path = pathArray[i].path
                let type = pathArray[i].type;
                sucBundle.loadDir(path, type, function (completedCount: number, totalCount: number, item: any) {
                    //更新进度条
                    percent = completedCount / totalCount;
                    if (percent > this.rannum) {
                        if (percent > 0.7) {
                            if (AppPlatformConfig.ISOLDVERSION) {
                                percent = 1
                            } else {
                                percent = 0.7
                            }

                        }
                        if (percent > beforepercent) {
                            beforepercent = percent
                            this.mask.x = this._width * percent - 540;
                            this.progressText.string = Math.round(percent * 100) + "%"
                        }

                    }
                }.bind(this), function (err, assets, urls) {
                    // if (err) { cc.log('error, because:' + err); return; }
                    finishCount++;
                    //所有目录预加载完成后，进入游戏
                    if (finishCount == pathArray.length) {
                        // cc.log("所有目录预加载完成后，进入游戏")
                        // cc.director.loadScene(this.gameConfig.gameScene);
                        //
                        if (AppPlatformConfig.ISOLDVERSION) {
                            cc.director.loadScene(this.gameConfig.gameScene);
                        } else {
                            Constants.getInstance().slotSocket.connect(this.gameConfig.gameID);
                        }
                    }
                }.bind(this));
            }
        }
    }

    onplayerLoginSuccess(data: SlotPushLogin) {
        Constants.getInstance().GameConnectSuccessData = data;
        this.mask.x = this._width * 0.7 - 540;
        this.progressText.string = 70 + "%"
        this.beforenum = 0
        this.beforewidth = this._width * 0.7 - 540
        cc.director.preloadScene(this.gameConfig.gameScene, function (completedCount: number, totalCount: number, item: any) {
            let percent: number = completedCount / totalCount;
            let newpercent: number = percent * 0.3
            let addwidth = this._width * (0.7 + newpercent) - 540
            if (addwidth > this.beforewidth) {
                this.beforewidth = addwidth
                this.mask.x = addwidth;
            }
            let newnum = newpercent.toFixed(2)
            let addnum = Math.round(Number(newnum) * 100)
            if (addnum > this.beforenum) {
                this.beforenum = addnum
                this.progressText.string = addnum + 70 + "%"
            }
        }.bind(this), function (err) {
            if (err) {
                console.error("Load Scene Failed: ", err);
            } else {
                cc.director.loadScene(this.gameConfig.gameScene);
            }
        }.bind(this))
    }

    /**
     * 设置提示内容
     * @param str 
     */
    private setTips(str: string) {
        this.tipsLabel.string = str;
    }

    onDestroy() {
        this._unRegisterEvent();
    }


}
