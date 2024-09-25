import AppPlatformConfig from "../../configs/AppPlatformConfig";
import { Constants } from "../../Constants";
import AppLog from "../AppLog";
import { CoreUpdate } from "./Coreupdate";

class AssetsManager {

    constructor(name: string) {
        this.name = name;
    }

    /**@description  当前资源管理器的状态*/
    code: any = -1;
    /**@description 当前资源管理器的名称 */
    name: string = "";
    /**@description 当前资源管理器的实体 jsb.AssetsManager */
    manager: jsb.AssetsManager = null!;
}

const MAIN_PACK = "main";

/**
 * @description 热更新组件
 */
export class CoreupdateManager {
    private static _instance: CoreupdateManager = null!;
    public static Instance() { return this._instance || (this._instance = new CoreupdateManager()); }
    private manifestRoot: string = `manifest/`;
    /**@description 本地存储热更新文件的路径 */
    private storagePath = "";
    /**@description 是否在热更新中或检测更新状态 */
    private updating = false;

    private _commonCoreUpdateUrl = "";
    /**@description 通用的热更新地址，当在子游戏或大厅未指定热更新地址时，都统一使用服务器传回来的默认全局更新地址 */
    public get commonCoreUpdateUrl(): string {
        if (this._commonCoreUpdateUrl.length > 0) {
            return this._commonCoreUpdateUrl;
        } else {
            return this.projectManifest.packageUrl as string;
        }
    }
    public set commonCoreUpdateUrl(value) {
        this._commonCoreUpdateUrl = value;
    }

    /**@description 是否路过热更新 */
    public isSkipCheckUpdate = !AppPlatformConfig.OPEN_HOTLOAD;

    private _projectManifest: CoreUpdate.Manifest | null = null;
    private get projectManifest(): CoreUpdate.Manifest {
        if (CC_JSB && !this._projectManifest) {
            let content = jsb.fileUtils.getStringFromFile(this.hallProjectMainfest);
            try {
                this._projectManifest = JSON.parse(content);
            } catch (err) {
                this._projectManifest = null;
                AppLog.writeLog(`load ${this.hallProjectMainfest} fail`);
            }
        }
        return this._projectManifest as any;
    }

    /**@description 大厅本地的版本项目更新文件配置路径 */
    public get hallProjectMainfest() {
        return `${this.manifestRoot}project.manifest`;
    }
    /**@description 检测更新回调 */
    public checkCallback: ((code: CoreUpdate.Code, state: CoreUpdate.State) => void) | null = null;

    /**@description bundle版本信息 */
    public bundlesConfig: { [key: string]: CoreUpdate.BundleConfig } = {};

    /**@description 资源管理器 */
    private assetsManagers: { [key: string]: AssetsManager } = {};

    public _CoreUpdateUrls: { [key: string]: string } = {};
    /**@description 热更新地址，为了方便后面当只更新一个游戏，或cdn服务器 */
    private getCoreUpdateUrl(moduleName: string) {
        if (CC_DEBUG) {
            // AppLog.writeLog("core UPdate core:" + this.commonCoreUpdateUrl)
            return this.commonCoreUpdateUrl;
        } else {
            if (this._CoreUpdateUrls[moduleName]) {
                // AppLog.writeLog("core UPdate core:" + this._CoreUpdateUrls[moduleName])
                return this._CoreUpdateUrls[moduleName];
            } else {
                // AppLog.writeLog("core UPdate core:" + this.commonCoreUpdateUrl)
                return this.commonCoreUpdateUrl;
            }
        }
    }

    /**@description 当前热更新的资源管理器 */
    private currentAssetsManager: AssetsManager = null!;

    private newVersion: string = '0';

    /**@description 获取Bundle名 */
    public getBundleName(bundle: string) {
        return this.bundlesConfig[bundle];
    }

    /**@description 释放资源管理器，默认为hall 大厅资源管理器 */
    private destroyAssetsManager(name: string = MAIN_PACK) {
        if (this.assetsManagers[name]) {
            AppLog.writeLog("destroyAssetsManager : " + name);
            this.currentAssetsManager = <any>null;
            delete this.assetsManagers[name];
        }
    }

    /**@description 获取资源管理器，默认为hall 大厅的资源管理器 */
    private getAssetsManager(name: string = MAIN_PACK) {
        if (this.assetsManagers[name]) {
            return this.assetsManagers[name];
        } else {
            //初始化资源管理器
            if (CC_JSB) {
                if(Constants.getInstance().NATIVE_ANDROID){
                    this.storagePath = jsb.fileUtils.getWritablePath();
                }else if(Constants.getInstance().NATIVE_IOS){

                    this.storagePath = jsb.fileUtils.getWritablePath() + "Manifest/";
                }
              
                if(!jsb.fileUtils.isDirectoryExist(this.storagePath)) {
                    jsb.fileUtils.createDirectory(this.storagePath);
                } else {
                    console.log("dir is exist!!!");
                }
                console.log(`Storage path for remote asset : ${this.storagePath}`);
                console.log("getCoreUpdateUrl",this.getCoreUpdateUrl(name));
                this.assetsManagers[name] = new AssetsManager(name);
                this.assetsManagers[name].manager = new jsb.AssetsManager(name == MAIN_PACK ? `type.${MAIN_PACK}`: `type.${name}_`, this.storagePath, this.versionCompareHanle.bind(this));
                console.log("this.assetsManagers0",name);
                console.log("this.assetsManagers1",this.assetsManagers[name]);
                console.log("this.assetsManagers",this.assetsManagers[name].name);
                console.log("this.assetsManagers2",this.assetsManagers[name].manager);
                console.log("this.assetsManagers2",this.assetsManagers[name].manager.setHotUpdateUrl);

                //设置下载并发量
                this.assetsManagers[name].manager.setMaxConcurrentTask(10);
                this.assetsManagers[name].manager.setHotUpdateUrl(this.getCoreUpdateUrl(name));
                this.assetsManagers[name].manager.setVerifyCallback(function (path, asset) {
                    let compressed = asset.compressed;
                    let expectedMD5 = asset.md5;
                    let relativePath = asset.path;
                    let size = asset.size;
                    if (compressed) {
                        AppLog.writeLog(`Verification passed : ${relativePath}`);
                        return true;
                    }
                    else {
                        AppLog.writeLog(`Verification passed : ${relativePath} ( ${expectedMD5} )`);
                        return true;
                    }
                });
                AppLog.writeLog(`Hot update is ready , please check or directly update.`);
            }
            return this.assetsManagers[name];
        }
    }

    /**@description 判断是否需要重新尝试下载之前下载失败的文件 */
    private isTryDownloadFailedAssets() {
        if (this.currentAssetsManager && (
            this.currentAssetsManager.manager.getState() == CoreUpdate.State.FAIL_TO_UPDATE as any ||
            this.currentAssetsManager.code == CoreUpdate.Code.ERROR_NO_LOCAL_MANIFEST ||
            this.currentAssetsManager.code == CoreUpdate.Code.ERROR_DOWNLOAD_MANIFEST ||
            this.currentAssetsManager.code == CoreUpdate.Code.ERROR_PARSE_MANIFEST)
        ) {
            return true;
        }
        return false;
    }

    /**@description 是否是预览或浏览器 */
    private get isBrowser() {
        return cc.sys.platform == cc.sys.WECHAT_GAME || CC_PREVIEW || cc.sys.isBrowser;
    }

    private isNeedUpdate(callback: (code: CoreUpdate.Code, state: CoreUpdate.State) => void) {
        if (this.isBrowser) {
            //预览及浏览器下，不需要有更新的操作
            this.updating = false;
            callback(CoreUpdate.Code.ALREADY_UP_TO_DATE, CoreUpdate.State.UP_TO_DATE);
            return false;
        } else {
            if (this.isSkipCheckUpdate) {
                AppLog.writeLog("skip update，use loc ");
                this.updating = false;
                callback(CoreUpdate.Code.ALREADY_UP_TO_DATE, CoreUpdate.State.UP_TO_DATE);
            }
            console.log("is skip check update",!this.isSkipCheckUpdate);
            return !this.isSkipCheckUpdate;
        }
    }

    /**@description 检测更新 */
    private _checkUpdate(callback: (code: CoreUpdate.Code, state: CoreUpdate.State) => void) {
        if (this.isNeedUpdate(callback)) {
            console.log("---checkupdate---");
            AppLog.writeLog(`--checkUpdate--`);
            if (this.updating) {
                console.log("===========================","checking or updateing");
                AppLog.writeLog(`Checking or updating...`);
                callback(CoreUpdate.Code.CHECKING, CoreUpdate.State.PREDOWNLOAD_VERSION);
                return;
            }
            if (!this.currentAssetsManager.manager.getLocalManifest() || !this.currentAssetsManager.manager.getLocalManifest().isLoaded()) {
                console.log("===========================","Failed to load local manifest ....");
                AppLog.writeLog(`Failed to load local manifest ....`);
                callback(CoreUpdate.Code.ERROR_DOWNLOAD_MANIFEST, CoreUpdate.State.FAIL_TO_UPDATE);
                return;
            }
            if (this.isTryDownloadFailedAssets()) {
                //已经更新失败，尝试获取更新下载失败的
                console.log("===========================","load no succ，please load");
                AppLog.writeLog(`load no succ，please load`);
                callback(CoreUpdate.Code.UPDATE_FAILED, CoreUpdate.State.TRY_DOWNLOAD_FAILED_ASSETS);
            } else {
                console.log("===========================","start update");
                this.updating = true;
                this.checkCallback = callback;
                this.currentAssetsManager.manager.setEventCallback(this.checkCb.bind(this));
                this.currentAssetsManager.manager.checkUpdate();
            }
        }
    }

    downloadFailedAssets() {
        if (this.currentAssetsManager) {
            this.currentAssetsManager.manager.downloadFailedAssets();
        }
    }

    /**@description 检查主包是否需要更新 */
    private checkMainUpdate(callback: (code: CoreUpdate.Code, state: CoreUpdate.State) => void) {
        console.log("ischeckMainupdate",this.isNeedUpdate(callback));
        if (this.isNeedUpdate(callback) ) {
            console.log("mainfest!!!!!",this.hallProjectMainfest)
            this.currentAssetsManager = this.getAssetsManager();
            this.currentAssetsManager.manager.loadLocalManifest(this.hallProjectMainfest);
            console.log("mainfest!!!!!",this.hallProjectMainfest)
            this._checkUpdate(callback);
        }
    }

    /**
     * @description 检测更新
     * @param callback 回调
     * @param bundle bundle,如果不传，则为对主包的检测
     */
    checkUpdate(callback: (code: CoreUpdate.Code, state: CoreUpdate.State) => void, bundle?: string) {
        console.log("bundle",typeof bundle);
        if (typeof bundle == "string") {
            this.checkBundleUpdate(bundle, callback);
        } else {
            this.checkMainUpdate(callback);
        }
    }

    /**
     * @description 获取bundlemanifest url
     * @param bundle bundle
     * @returns manifest url
     */
    private getBundleManifest(bundle: string): string {
        return `${this.manifestRoot}${bundle}_project.manifest`;
    }

    /**
     * @description 检测Bundle更新
     * @param bundle 子游戏名
     * @param callback 检测完成回调
     */
    private checkBundleUpdate(bundle: string, callback: (code: CoreUpdate.Code, state: CoreUpdate.State) => void) {
        if (this.isNeedUpdate(callback)) {
            this.currentAssetsManager = this.getAssetsManager(bundle);
            let manifestUrl = this.getBundleManifest(bundle);
            console.log("checkingupdatebundle");
            AppLog.writeLog("Checking", manifestUrl, bundle);
            //先检测本地是否已经存在子游戏版本控制文件 
            if (jsb.fileUtils.isFileExist(manifestUrl)) {
                //存在版本控制文件 
                let content = jsb.fileUtils.getStringFromFile(manifestUrl);
                let jsbGameManifest = new jsb.Manifest(content, this.storagePath, this.getCoreUpdateUrl(this.currentAssetsManager.name));
                AppLog.writeLog(`--have mainifesturl checkUpdate--`);
                AppLog.writeLog(`mainifestUrl : ${manifestUrl}`);
                this.currentAssetsManager.manager.loadLocalManifest(jsbGameManifest, "");
                this._checkUpdate(callback);
            } else {
                //不存在版本控制文件 ，生成一个初始版本
                if (this.updating) {
                    AppLog.writeLog(`Checking or updating...`);
                    callback(CoreUpdate.Code.CHECKING, CoreUpdate.State.PREDOWNLOAD_VERSION);
                    return;
                }
                console.log("bundle",bundle);
                let packageUrl = this.getCoreUpdateUrl(bundle);
                let gameManifest = {
                    version: "0",
                    packageUrl: packageUrl,
                    remoteManifestUrl: `${packageUrl}/${manifestUrl}`,
                    remoteVersionUrl: `${packageUrl}/${this.manifestRoot}${bundle}_version.manifest`,
                    assets: {},
                    searchPaths: []
                };
                console.log("manifest",JSON.stringify(gameManifest));
                let gameManifestContent = JSON.stringify(gameManifest);
                console.log("mmmmmmmmmmfest",gameManifestContent);
                console.log("mmmmmmmmmmfest",this.storagePath);
                console.log("mmmmmmmmmmfest",this.getCoreUpdateUrl(this.currentAssetsManager.name));
                let jsbGameManifest = new jsb.Manifest(gameManifestContent, this.storagePath,this.getCoreUpdateUrl(this.currentAssetsManager.name));
                AppLog.writeLog(`--checkUpdate--`);
                AppLog.writeLog(`mainifest content : ${gameManifestContent}`);
                this.currentAssetsManager.manager.loadLocalManifest(jsbGameManifest, "");
                this._checkUpdate(callback);
            }
            Manager.localStorage.setItem(bundle+"_Version", this.currentAssetsManager.manager.getLocalManifest().getVersion())
        }
    }

    /**@description 检测更新 */
    private checkCb(event: any) {

        //这里不能置空，下载manifest文件也会回调过来
        //this.checkCallback = null;
        //存储当前的状态，当下载版本文件失败时，state的状态与下载非版本文件是一样的状态
        this.currentAssetsManager.code = event.getEventCode();
        AppLog.writeLog(`checkCb event code : ${event.getEventCode()} state : ${this.currentAssetsManager.manager.getState()}`);
        switch (event.getEventCode()) {
            case CoreUpdate.Code.ERROR_NO_LOCAL_MANIFEST:
                AppLog.writeLog(`No local manifest file found, hot update skipped.`);
                break;
            case CoreUpdate.Code.ERROR_DOWNLOAD_MANIFEST:
            case CoreUpdate.Code.ERROR_PARSE_MANIFEST:
                AppLog.writeLog(`Fail to download manifest file, hot update skipped.`);
                break;
            case CoreUpdate.Code.ALREADY_UP_TO_DATE:
                AppLog.writeLog(`Already up to date with the latest remote version.`);
                break;
            case CoreUpdate.Code.NEW_VERSION_FOUND:
                AppLog.writeLog(`New version found, please try to update.`);
                break;
            default:
                return;
        }

        //this.currentAssetsManager.setEventCallback(null);
        this.updating = false;

        //如果正在下载更新文件，先下载更新文件比较完成后，再回调
        if (this.checkCallback && this.currentAssetsManager.manager.getState() != CoreUpdate.State.DOWNLOADING_VERSION as any) {
            this.checkCallback(event.getEventCode(), this.currentAssetsManager.manager.getState() as any);
            this.checkCallback = null;
        }
    }

    /**@description 执行热更新*/
    CoreUpdate() {
        if (!this.currentAssetsManager) {
            AppLog.writeLog(`update no init`);
            console.log("update node init");
            return;
        }
        console.log(`update :${this.currentAssetsManager.name} , updating : ${this.updating}`);
        AppLog.writeLog(`update :${this.currentAssetsManager.name} , updating : ${this.updating}`);
        if (!this.updating) {
            AppLog.writeLog(`load update ${this.currentAssetsManager.name} `);
            console.log("888888888",this.updateCb);
            this.currentAssetsManager.manager.setEventCallback(this.updateCb.bind(this));
            this.currentAssetsManager.manager.setMaxConcurrentTask(10);
            this.currentAssetsManager.manager.update();
        }
    }

    /**@description 热更新回调 */
    private updateCb(event: any) {
        var isUpdateFinished = false;
        var failed = false;
        AppLog.writeLog(`--update cb code : ${event.getEventCode()} state : ${this.currentAssetsManager.manager.getState()}`);
        //存储当前的状态，当下载版本文件失败时，state的状态与下载非版本文件是一样的状态
        this.currentAssetsManager.code = event.getEventCode();
        let bundleName: string = this.currentAssetsManager.name;
        console.log("update cb code",event.getEventCode());
        console.log(`${event.getDownloadedBytes()} / ${event.getTotalBytes()}`);
        console.log(`${event.getDownloadedFiles()} / ${event.getTotalFiles()}`);
        console.log(`percent : ${event.getPercent()}`);
        console.log(`percent by file : ${event.getPercentByFile()}`);
        switch (event.getEventCode()) {
            case CoreUpdate.Code.ERROR_NO_LOCAL_MANIFEST:
                AppLog.writeLog(`No local manifest file found, hot update skipped.`);
                failed = true;
                break;
            case CoreUpdate.Code.UPDATE_PROGRESSION:
                AppLog.writeLog(`${event.getDownloadedBytes()} / ${event.getTotalBytes()}`);
                AppLog.writeLog(`${event.getDownloadedFiles()} / ${event.getTotalFiles()}`);
                AppLog.writeLog(`percent : ${event.getPercent()}`);
                AppLog.writeLog(`percent by file : ${event.getPercentByFile()}`);
                var msg = event.getMessage();
                if (msg) {
                    AppLog.writeLog(`Updated file: ${msg}`);
                }
                break;
            case CoreUpdate.Code.ERROR_DOWNLOAD_MANIFEST:
            case CoreUpdate.Code.ERROR_PARSE_MANIFEST:
                AppLog.writeLog(`Fail to download manifest file, hot update skipped.`);
                failed = true;
                break;
            case CoreUpdate.Code.ALREADY_UP_TO_DATE:
                AppLog.writeLog(`Already up to date with the latest remote version.`);
                failed = true;
                break;
            case CoreUpdate.Code.UPDATE_FINISHED:
                AppLog.writeLog(`Update finished. ${event.getMessage()}`);
                isUpdateFinished = true;
                break;
            case CoreUpdate.Code.UPDATE_FAILED:
                AppLog.writeLog(`Update failed. ${event.getMessage()}`);
                this.updating = false;
                break;
            case CoreUpdate.Code.ERROR_UPDATING:
                AppLog.writeLog(`Asset update error: ${event.getAssetId()} , ${event.getMessage()}`);
                break;
            case CoreUpdate.Code.ERROR_DECOMPRESS:
                AppLog.writeLog(`${event.getMessage()}`);
                break;
            default:
                break;
        }
        if (failed) {
            this.currentAssetsManager.manager.setEventCallback(null as any);
            this.updating = false;
        }
        

        if (isUpdateFinished) {
            //下载完成,需要重新设置搜索路径，添加下载路径
            var searchPaths: string[] = jsb.fileUtils.getSearchPaths();
            var newPaths: string[] = this.currentAssetsManager.manager.getLocalManifest().getSearchPaths();
            AppLog.writeLog(JSON.stringify(newPaths));
            Array.prototype.unshift.apply(searchPaths, newPaths);

            //这里做一个搜索路径去重处理
            let obj: any = {};
            for (let i = 0; i < searchPaths.length; i++) {
                obj[searchPaths[i]] = true;
            }
            searchPaths = Object.keys(obj);
            cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
            jsb.fileUtils.setSearchPaths(searchPaths);
        }

        let state = this.currentAssetsManager.manager.getState();
        if (this.currentAssetsManager.name == MAIN_PACK) {
            if (isUpdateFinished) {
                this.currentAssetsManager.manager.setEventCallback(null as any);
                //下载数量大于0，才有必要进入重启，在如下这种情况下，并不会发生下载
                //当只提升了版本号，而并未对代码进行修改时，此时的只下载了一个project.manifest文件，
                //不需要对游戏进行重启的操作
                if (event.getDownloadedFiles() > 0) {
                    cc.game.restart();
                }
                //下载完成 删除资源管理器
                this.destroyAssetsManager(this.currentAssetsManager.name);
            }
        } else {
            //子游戏更新
            if (isUpdateFinished) {
                AppLog.writeLog(`${this.currentAssetsManager.name} load ziyuan num : ${event.getDownloadedFiles()}`)
                //下载完成 删除资源管理器
                this.destroyAssetsManager(this.currentAssetsManager.name);
            }
        }

        let info: CoreUpdate.DownLoadInfo = {
            bundleName: bundleName,
            downloadedBytes: event.getDownloadedBytes(),
            totalBytes: event.getTotalBytes(),
            downloadedFiles: event.getDownloadedFiles(),
            totalFiles: event.getTotalFiles(),
            percent: event.getPercent(),
            percentByFile: event.getPercentByFile(),
            code: event.getEventCode(),
            state: state as any,
            needRestart: isUpdateFinished,
            newVersion: this.newVersion,
        };

        //广播
        Constants.getInstance().eventBus.post(CoreUpdate.Event.CoreUpdate_DOWNLOAD, info);

        AppLog.writeLog(`update cb  failed : ${failed}  , need restart : ${isUpdateFinished} , updating : ${this.updating}`);
    }

    private versionCompareHanle(versionA: string, versionB: string) {
        let data = {
            versionA: versionA,
            versionB: versionB,
        }
        cc.sys.localStorage.setItem("VersionData", JSON.stringify(data));
        this.newVersion = versionB;
        AppLog.writeLog(`JS Custom Version Compare : version A is ${versionA} , version B is ${versionB}`);
        let vA = versionA.split('.');
        let vB = versionB.split('.');
        AppLog.writeLog(`version A ${vA} , version B ${vB}`);
        for (let i = 0; i < vA.length && i < vB.length; ++i) {
            let a = parseInt(vA[i]);
            let b = parseInt(vB[i]);
            if (a === b) {
                continue;
            }
            else {
                return -1;
            }
        }
        if (vB.length > vA.length) {
            return -1;
        }
        return 0;
    }
}
