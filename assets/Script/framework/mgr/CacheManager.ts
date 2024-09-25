
export const enum CACHE_TYPE {
    CACHE_TYPE_ASSET,
}
import { IAssetData } from "./ResManager";


/**@description 全局通用缓存管理类 */
class CacheManager {
    /**@description 单列对象 */
    private static _instance: CacheManager;
    /**@description 全局唯一,私有构造函数,防止外部new操作 */
    private constructor() { };
    /**@description 公开调用接口 */
    public static get instance() {
        if (!this._instance) {
            this._instance = new CacheManager();
        }
        return this._instance;
    }
    /** 资源缓存合集 */
    private _assetCaches: { [key: string]: IAssetData } = cc.js.createMap();
    /**
     * @description 通过uuid获取已缓存资源数据
     * @param uuid 资源uuid
     */
    public getAssetFromUuid(uuid: string): IAssetData {
        let assetData: IAssetData;
        Object.keys(this._assetCaches).map(key => {
            let data: IAssetData = this._assetCaches[key];
            if (data.uuid = uuid) {
                assetData = data;
            }
        });
        return assetData;
    }
    /**
     * @description 获取资源
     * @param key 资源存储的key
     */
    public get(type: CACHE_TYPE, key: string): IAssetData {
        switch (type) {
            case CACHE_TYPE.CACHE_TYPE_ASSET:
                return this._assetCaches[key];
            default:
                break;
        }
    }
    /**
     * @description 是否存在指定缓存
     * @param key 
     * @returns 
     */
    public has(type: CACHE_TYPE, key: string): boolean {
        switch (type) {
            case CACHE_TYPE.CACHE_TYPE_ASSET:
                return !!this._assetCaches[key];
            default:
                return;
        }
    }

    /**
     * @description 缓存数据
     * @param type 缓存类型
     * @param key key
     * @param value 值
     */
    public set(type: CACHE_TYPE, key: string, value: IAssetData) {
        switch (type) {
            case CACHE_TYPE.CACHE_TYPE_ASSET:
                this._assetCaches[key] = value;
                break;
            default:
                break;
        }
    }

    public releaseAll(type: CACHE_TYPE) {
        switch (type) {
            case CACHE_TYPE.CACHE_TYPE_ASSET:
                this._assetCaches = cc.js.createMap();
                break;
        }
    }


    /** @description 销毁该单例模式 */
    public destroy(): void {
        Object.keys(this._assetCaches).map(key => {
            delete this._assetCaches[key];
        })
        this._assetCaches = null;
        if (CacheManager._instance) {
            CacheManager._instance = null;
        }
    }
}
export const CacheMgr: CacheManager = CacheManager.instance;

