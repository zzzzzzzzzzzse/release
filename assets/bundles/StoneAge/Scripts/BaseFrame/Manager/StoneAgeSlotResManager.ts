import { BundleType } from "../Const/StoneAgeCommonDefine";
import StoneAgeUtil from "../Util/StoneAgeUtil";
import StoneAgeLogManager from "./StoneAgeLogManager";
import StoneAgeTimerManager from "./StoneAgeTimerManager";

export default class StoneAgeSlotResManager {
    private static _instance: StoneAgeSlotResManager
    public static get instance() {
        if (StoneAgeSlotResManager._instance == null) {
            StoneAgeSlotResManager._instance = new StoneAgeSlotResManager();
        }
        return StoneAgeSlotResManager._instance;
    }

    private constructor() {
    }

    private aBArr: Array<string> = [
        BundleType.HALL,
        BundleType.GAME_CLASSIC777,
        BundleType.BUFFALO_RUN,
        BundleType.DRAGON_SLAYING,
        BundleType.PIRATES_TREASURE,
        BundleType.LUCKY_CLOVER,
        BundleType.HAPPY_FIREWORKS,
        BundleType.MINE_BLASTING,
        BundleType.THUNDER_FURY,
        BundleType.COOL_SUMMER,
        BundleType.CANDY_SHOP,
        BundleType.WILD_WEST,
        BundleType.MAGIC_WORKSHOP,
        BundleType.HAPPY_FARM,
        BundleType.MERMAID_PRINCESS,
        BundleType.STONE_AGE,
    ]

    /**
     * 加载AB包
     * @param aBName 包名
     * @param onComplete 完成回调
     */
    public async loadBundle(aBName: string): Promise<cc.AssetManager.Bundle> {
        let startTime: number = StoneAgeUtil.getTimeStamp();
        let endTime: number;
        return new Promise<any>((resolve, reject) => {
            cc.assetManager.loadBundle(aBName, (err, bundle) => {
                if (err) {
                    StoneAgeLogManager.instance.log("loadBundleFail:", aBName);
                    reject(err.message || err);
                }
                else {
                    endTime = StoneAgeUtil.getTimeStamp();
                    StoneAgeLogManager.instance.log("loadBundleSucc:", aBName, " costTime:", endTime - startTime, "ms");
                    resolve(bundle);
                }
            });
        })

    }

    /**
     * 加载某个AB包内的某个资源
     * @param aBName 包名
     * @param assetName 资源路径
     * @param onComplete 完成回调
     * @param type 资源类型
     * @param onProgress 进度回调
     */
    public async loadByBundle(aBName: string, path: string, type?: typeof cc.Asset, onProgress?: (finish: number, total: number) => void): Promise<any> {
        let startTime: number = StoneAgeUtil.getTimeStamp();
        let endTime: number;
        let abundle = cc.assetManager.getBundle(aBName);
        type ||= cc.Asset;
        if (null == abundle) {
            StoneAgeLogManager.instance.err("abundle is null:", aBName);
            await this.loadBundle(aBName);
            return this.loadByBundle(
                aBName, path, type, (finish, total) => {
                    onProgress && onProgress(finish, total);
                },
            );

        }
        return new Promise<any>((resolve, reject) => {
            abundle.load(
                path,
                type,
                (finish, total) => {
                    onProgress && onProgress(finish, total);
                },
                (err, asset) => {
                    if (!err) {
                        endTime = StoneAgeUtil.getTimeStamp();
                        StoneAgeLogManager.instance.log("loadByBundleSucc:", aBName, "->", path, " costTime:", endTime - startTime, "ms");
                        resolve(asset);
                    }
                    else {
                        StoneAgeLogManager.instance.err(err)
                        reject(err.message || err);
                    }
                }
            );
        })

    }

    /**
     * 批量加载某个AB包的资源
     * @param aBName 包名
     * @param dir 目标文件夹路径，路径是相对于bundle文件夹的
     * @param onComplete 完成回调
     * @param type 资源类型，如果传了这个参数，则只会加载这个类型的资源
     */
    public async loadDirByBundle(aBName: string, dir: string, type?: typeof cc.Asset, onProgress?: (finish: number, total: number) => void): Promise<cc.Asset> {

        let startTime: number = StoneAgeUtil.getTimeStamp();
        let endTime: number;
        let abundle = cc.assetManager.getBundle(aBName);
        type ||= cc.Asset;
        if (null == abundle) {
            StoneAgeLogManager.instance.err("abundle is null:", aBName);
            await this.loadBundle(aBName);
            return this.loadDirByBundle(
                aBName, dir, type, (finish, total) => {
                    onProgress && onProgress(finish, total);
                },
            );

        }
        return new Promise<any>((resolve, reject) => {
            abundle.loadDir(
                dir,
                type,
                (finish, total) => {
                    onProgress && onProgress(finish, total);
                },
                (err, asset) => {
                    if (!err) {
                        endTime = StoneAgeUtil.getTimeStamp();
                        StoneAgeLogManager.instance.log("loadDirByBundleSucc:", aBName, "->", dir, " costTime:", endTime - startTime, "ms");
                        resolve(asset);
                    }
                    else {
                        reject(err.message || err);
                    }

                }
            );
        })

    }

    /**
     * 释放AB包，会连带释放包内的所有资源
     * @param aBName 包名
     */
    public releaseBundle(aBName: string) {
        let bundle = cc.assetManager.getBundle(aBName);
        if (null != bundle) {
            bundle.releaseAll();
            cc.assetManager.removeBundle(bundle);
            StoneAgeLogManager.instance.log('释放bundle：', aBName);
            StoneAgeTimerManager.instance.setTimeOut(() => {
                cc.sys.garbageCollect();
            }, 0);
        }
    }

    /**
     * 预加载某个AB包内的某个文件夹
     * @param aBName 包名
     * @param path 资源路径
     * @param type 资源类型
     */
    public async preloadByBundle(aBName: string, path: string, type?: typeof cc.Asset, onProgress?: (finish: number, total: number) => void) {

        let startTime: number = StoneAgeUtil.getTimeStamp();
        let endTime: number;
        let abundle = cc.assetManager.getBundle(aBName);
        if (null == abundle) {
            StoneAgeLogManager.instance.err("abundle is null:", aBName);
            await this.loadBundle(aBName);
            return this.preloadByBundle(
                aBName, path, type, (finish, total) => {
                    onProgress && onProgress(finish, total);
                },
            );
        }
        type ||= cc.Asset;
        return new Promise<any>((resolve, reject) => {
            abundle.preloadDir(
                path,
                type,
                (finish, total) => {
                    onProgress && onProgress(finish, total);
                },
                (err, asset) => {
                    if (null != err) {
                        StoneAgeLogManager.instance.err(err);
                        reject(err.message || err);
                    }
                    else {
                        endTime = StoneAgeUtil.getTimeStamp();
                        StoneAgeLogManager.instance.log("preloadByBundleSucc:", aBName, "->", path, " costTime:", endTime - startTime, "ms");
                        resolve(asset);
                    }
                }
            );
        })

    }

    /**
     * 加载远程资源（待测试）
     * @param url 
     * @param options 
     * @param onComplete 
     */
    public async loadRemote(url: string, options: Record<string, any>): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            cc.assetManager.loadRemote(url, options, (err, asset: cc.Asset) => {
                if (null != err) {
                    StoneAgeLogManager.instance.err(err);
                    reject(err.message || err);
                }
                else {
                    resolve(asset);
                }
            });
        })

    }

    /**
     * 释放除登录界面（resources）之外所有的ab包
     */
    public cleanAllBundle() {
        this.cleanGameBundle();
        this.cleanHallBundle();
    }

    /**
     * 释放游戏ab包
     */
    public cleanGameBundle() {
        for (let index = 0; index < this.aBArr.length; index++) {
            const aBName = this.aBArr[index];
            if (aBName != BundleType.HALL) {
                this.releaseBundle(aBName);
            }
        }
    }

    /**
     * 释放大厅ab包
     */
    public cleanHallBundle() {
        this.releaseBundle(BundleType.HALL);
    }

    /**
     * 释放指定ab包的指定路径的所有资源
     */
    public cleanBundlePath(aBName: string, path: string, type?: typeof cc.Asset) {
        type ||= cc.Asset;
        let bundle = cc.assetManager.getBundle(aBName);
        if (null != bundle) {
            let assetInfo = bundle.getDirWithPath(path);
            assetInfo.forEach(asset => {
                bundle.release(asset.path, type);
            });
            StoneAgeTimerManager.instance.setTimeOut(() => {
                cc.sys.garbageCollect();
            }, 0);
        }
    }

    /**
    * 释放指定资源
    * @param aBName 包名
    * @param path 路径
    * @param type 类型
    */
    public cleanAsset(aBName: string, path: string, type?: typeof cc.Asset) {
        type ||= cc.Asset;
        let bundle = cc.assetManager.getBundle(aBName);
        if (null != bundle) {
            bundle.release(path, type);
            StoneAgeTimerManager.instance.setTimeOut(() => {
                cc.sys.garbageCollect();
            }, 0);
        }
    }
}

