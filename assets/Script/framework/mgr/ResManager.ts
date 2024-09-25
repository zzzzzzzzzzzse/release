

import { StringUtil } from "../../tools/StringUtil";
import { CacheMgr, CACHE_TYPE } from "./CacheManager";

/** @description 资源数据 */
export interface IAssetData {
    /** 资源 */
    asset: cc.Asset;
    depend: Array<string>;
    uuid: string;
    use?: Set<any>;
}
/** 加载进度回调类型 */
type onProgress = (finish: number, total: number, item?: cc.AssetManager.RequestItem) => void
/** 完成回调类型 */
type onComplete = (assets: cc.Asset | sp.Skeleton) => void;

class ResManager {
    /**@description 单列对象 */
    private static _instance: ResManager;
    /**@description 全局唯一,私有构造函数,防止外部new操作 */
    private constructor() { };
    /**@description 公开调用接口 */
    public static get instance() {
        if (!this._instance) {
            this._instance = new ResManager();
        }
        return this._instance;
    }
    /**
     * @description 通用加载bundle方法
     * @param bundle bundle路径
     * @returns 
     */
    public async loadBundle(bundle: string): Promise<cc.AssetManager.Bundle> {
        if (!bundle) return;
        return new Promise((resolve: (value: cc.AssetManager.Bundle | PromiseLike<cc.AssetManager.Bundle>) => void, reject: (reason?: any) => void) => {
            cc.assetManager.loadBundle(bundle, (err: Error, asset: cc.AssetManager.Bundle) => {
                if (err) {
                    console.error("loadBundle Faild", err);
                    reject(err);
                    return;
                } else {
                    resolve(asset);
                }
            })
        })
    }
    /**
     * @description 获取已加载bundle
     * @param bundle bundle路径
     * @returns 
     */
    public async getBundle(bundle: string): Promise<cc.AssetManager.Bundle> {
        if (!bundle) return;
        return new Promise(async (resolve: (value: cc.AssetManager.Bundle | PromiseLike<cc.AssetManager.Bundle>) => void, reject: (reason?: any) => void) => {
            if (cc.assetManager.bundles.get(bundle)) {
                resolve(cc.assetManager.bundles.get(bundle));
            } else {
                resolve(await this.loadBundle(bundle));
            }
        })

    }
    /**
     * @description 通用加载资源方法
     * @param bundle bundle路径或bundle包
     * @param url 资源相对路径
     * @param use 资源使用者
     * @returns 
     */
    public async load<T extends cc.Asset>(bundle: string | cc.AssetManager.Bundle, url: string, type?: typeof cc.Asset, use?: any, onProgress?: onProgress, onComplete?: onComplete): Promise<T> {
        if (!bundle || !url) return;
        return new Promise(async (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => {
            const key: string = this._createKey(typeof bundle === "string" ? bundle : bundle.name, url);
            if (CacheMgr.has(CACHE_TYPE.CACHE_TYPE_ASSET, key)) {
                let assetData: IAssetData = CacheMgr.get(CACHE_TYPE.CACHE_TYPE_ASSET, key);
                assetData.use.add(use);
                assetData.asset.addRef();
                if (!StringUtil.isEmpty(assetData.asset.nativeUrl)) {
                    resolve(assetData.asset as T);
                    return;
                }

            }
            let _bundle: cc.AssetManager.Bundle;
            if (typeof bundle === "string") {
                _bundle = await this.getBundle(bundle);
            } else {
                _bundle = bundle;
            }
            _bundle.load(url, type, (finish: number, total: number, item: cc.AssetManager.RequestItem) => {
                onProgress && onProgress(finish, total, item);
            }, (err: Error, asset: cc.Asset | sp.SkeletonData) => {
                if (err) {
                    console.log("load res Faild", url, type, err);
                    reject(err);
                    return;
                } else {
                    if (!asset.loaded) {
                        throw new Error("fail");
                    }
                    if (asset instanceof cc.Texture2D) {
                        let spriteFrame = new cc.SpriteFrame();
                        spriteFrame["uuid"] = this.getUUID(asset);
                        spriteFrame.setTexture(asset);
                        spriteFrame.name = url.substr(url.lastIndexOf("/") + 1, url.length);
                        asset = spriteFrame;
                    }
                    // asset.addRef();
                    CacheMgr.set(CACHE_TYPE.CACHE_TYPE_ASSET, key, {
                        asset: asset,
                        depend: this.getDepsRecursively(asset),
                        uuid: this.getUUID(asset),
                        use: new Set<any>().add(use),
                    })
                    onComplete && onComplete(asset as T);
                    resolve(asset as T);
                }
            });

        });
    }

    public async loadDir<T extends cc.Asset>(bundle: string | cc.AssetManager.Bundle, url: string, type?: typeof cc.Asset): Promise<{ map: Map<string, T>, arr: Array<T> }> {
        return new Promise(async (resolve: (value: { map: Map<string, T>, arr: Array<T> } | PromiseLike<{ map: Map<string, T>, arr: Array<T> }>) => void, reject: (reason?: any) => void) => {
            let _bundle: cc.AssetManager.Bundle;
            if (typeof bundle === "string") {
                _bundle = await this.getBundle(bundle);
            } else {
                _bundle = bundle;
            }
            _bundle.loadDir(url, type, (err: Error, assets: Array<cc.Asset>) => {
                if (err) {
                    reject(err);
                }
                const arr: Array<T> = (assets as Array<T>);
                const map: Map<string, T> = new Map<string, T>();
                for (let i: number = 0; i < arr.length; i++) {
                    map.set(arr[i].name, arr[i] as T);
                }
                resolve({
                    map: map, arr: arr
                })
            });
        });
    }


    /**
     * @description 释放资源(这里其实是减少资源的引用计数，当资源引用计数为0时会自动释放资源)
     * @param 资源文件
     */
    public release(asset: cc.Asset): void {
        if (!asset) return;
        asset.decRef();
    }
    /**
     * @description 获取资源数据
     * @param asset 资源
     */
    public getAssetData(asset: cc.Asset): IAssetData {
        return CacheMgr.getAssetFromUuid(this.getUUID(asset));
    }
    /**
     * 获取资源的uuid
     * @param asset 需要获取uuid的资源
     * @returns 
     */
    public getUUID(asset: cc.Asset): string {
        return asset["_uuid"];
    }

    /**
     * @description 获取某个已经加载好的资源的所有非原生依赖资源列表，包括间接引用的资源，并保存在数组中返回。 返回的数组将仅保存依赖资源的 uuid
     * @param asset 需要获取依赖列表的资源
     * @returns 
     */
    public getDepsRecursively(asset: cc.Asset): Array<string> {
        return cc.assetManager.dependUtil.getDepsRecursively(this.getUUID(asset));
    }

    /**
     * @description 通过资源的bundle和路径制造key
     * @param bundle 所在bundle
     * @param url 路径
     * @returns 
     */
    private _createKey(bundle: string, url: string): string {
        return `${bundle}/${url}`;
    }

    public async removeBundle(url: string, releaseAll: boolean): Promise<void> {
        const bundle: cc.AssetManager.Bundle = await this.getBundle(url);
        releaseAll && bundle.releaseAll();
        releaseAll && CacheMgr.releaseAll(CACHE_TYPE.CACHE_TYPE_ASSET);
        if (bundle) {
            cc.assetManager.removeBundle(bundle);
        }

    }

    /** 销毁该单例模式 */
    public destroy(): void {
        if (ResManager._instance) {
            ResManager._instance = null;
        }
    }


}
export const ResMgr: ResManager = ResManager.instance;