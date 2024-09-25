import { ResourceCacheData, ResourceCacheStatus, ResourceInfo, ResourceType } from "../base/Defines";

class RemoteLoader {

    private _logTag = `[RemoteLoader] `;
    private static _instance: RemoteLoader = null;
    public static Instance() { return this._instance || (this._instance = new RemoteLoader()); }

    public loadImage(url: string, isNeedCache: boolean) {
        let me = this;
        return new Promise<cc.SpriteFrame>((resolve) => {
            if (url == null || url == undefined || url.length <= 0) {
                resolve(null);
                return;
            }
            let spCache = Manager.cacheManager.remoteCaches.getSpriteFrame(url);
            if (spCache && spCache.data) {
                if (CC_DEBUG) cc.log(this._logTag, `get:${url}`);
                resolve(<cc.SpriteFrame>(spCache.data));
                return;
            }

            me._loadRemoteRes(url,cc.Texture2D , isNeedCache).then((data: any) => {
                //改变缓存类型
                let cache = Manager.cacheManager.remoteCaches.get(url);
                if (data && cache) {
                    if (CC_DEBUG) cc.log(`${this._logTag}finish${url}`);
                    cache.data = data;
                    (<cc.Asset>cache.data).name = url;
                    let spriteFrame = Manager.cacheManager.remoteCaches.setSpriteFrame(url, cache.data);
                    resolve(spriteFrame);
                } else {
                    if (CC_DEBUG) cc.warn(`${this._logTag}error${url}`);
                    resolve(null);
                }
            })
        });
    }

    

    private _loadRemoteRes(url: string,type : typeof cc.Asset ,isNeedCache: boolean) {
        return new Promise<any>((resolve) => {
            let cache = Manager.cacheManager.remoteCaches.get(url);
            if (cache) {
                //有缓存,查看是否已经加载
                if (cache.isLoaded) {
                    //如果已经加载完成
                    resolve(cache.data);
                } else {
                    //正在加载中
                    cache.finishCb.push(resolve);
                }
            } else {
                //没有缓存存在,生成加载缓存
                cache = new ResourceCacheData();
                cache.info.resourceType = ResourceType.Remote;
                cache.info.type = type;
                Manager.cacheManager.remoteCaches.set(url, cache);
                cc.assetManager.loadRemote(url,(error,data)=>{
                    cache.isLoaded = true;
                    if (data) {
                        cache.data = data;
                        (<cc.Asset>cache.data).addRef();
                        if ( CC_DEBUG ) cc.log(`${this._logTag}finish:${url}`);
                    }
                    else {
                        if (CC_DEBUG) cc.warn(`${this._logTag}error:${url}`);
                    }
                    //把再加载过程里，双加载同一资源的回调都回调回去
                    cache.doFinish(data);
                    resolve(cache.data)
                })
            }
        });
    }

    /**@description 由主游戏控制器驱动，在下载远程资源时，设置一个上限下载任务数据，以免同一时间任务数量过大 */
    update(){
        
    }
}

export class AssetManagerextend {
    private logTag = `[AssetManagerextend]: `;
    private static _instance: AssetManagerextend = null;
    public static Instance() {
        return this._instance || (this._instance = new AssetManagerextend());
    }

    private _remote = new RemoteLoader();
    public get remote(){ return this._remote;}
    /**
     * @description 获取Bundle
     * @param bundle Bundle名|Bundle
     */
    public getBundle(bundle: BUNDLE_TYPE ) {
        if ( bundle ){
            if ( typeof bundle == "string" ){
                return cc.assetManager.getBundle(bundle);
            }
            return bundle;
        }
        return null;
    }

    // Manager.assetManager.loadBundle("hall",(err, bundle) => {
    //     bundle.load("texture/" , cc.SpriteFrame, function (err, spriteFrame) {
            
    //     })
    // })

    /**@description 加载bundle */
    public loadBundle(nameOrUrl: string, onComplete: (err: Error, bundle: cc.AssetManager.Bundle) => void): void{
        cc.assetManager.loadBundle(nameOrUrl,onComplete);
    }

    /**@description 移除bundle */
    public removeBundle( bundle : BUNDLE_TYPE ){
        let result = this.getBundle(bundle);
        if( result ){
            Manager.cacheManager.removeBundle(bundle);
            result.releaseAll();
            cc.assetManager.removeBundle(result);
        }
    }

    public load(
        bundle: BUNDLE_TYPE,
        path: string,
        type: typeof cc.Asset,
        onProgress: (finish: number, total: number, item: cc.AssetManager.RequestItem) => void,
        onComplete: (data:ResourceCacheData) => void): void {
            if( CC_DEBUG ) {
                cc.log(`load bundle : ${bundle} path : ${path}`)
            }
            let cache = Manager.cacheManager.get(bundle,path);
            if ( cache ){
                //存在缓存信息
                if ( cache.isLoaded ){
                    //已经加载完成
                    if (CC_DEBUG && cache.status == ResourceCacheStatus.WAITTING_FOR_RELEASE ){
                        cc.warn(this.logTag, `res:${path} `);
                    }
                    //加载完成
                    onComplete(cache);
                }else{
                    if (CC_DEBUG && cache.status == ResourceCacheStatus.WAITTING_FOR_RELEASE ){
                        cc.warn(this.logTag, `res:${path}`);
                    }
                    cache.finishCb.push(onComplete);
                }
                //重新复位资源状态
                cache.status = ResourceCacheStatus.NONE;
            }else{
                //无缓存信息
                cache = new ResourceCacheData();
                cache.info.url = path;
                cache.info.type = type;
                cache.info.bundle = bundle;
                Manager.cacheManager.set(bundle,path,cache);
                //cc.time(`加载资源 : ${cache.info.url}`);
                let _bundle = this.getBundle(bundle);
                if (!_bundle ){
                    //如果bundle不存在
                    let error = new Error(`${this.logTag} ${bundle} not`);
                    this._onLoadComplete(cache,onComplete,error,null);
                    return;
                }
                let res = _bundle.get(path,type);
                if ( res ){
                    this._onLoadComplete(cache,onComplete,null,res);
                }else{
                    if ( onProgress ){
                        _bundle.load(path,type,onProgress,this._onLoadComplete.bind(this,cache,onComplete));
                    }else{
                        _bundle.load(path,type,this._onLoadComplete.bind(this,cache,onComplete));
                    }
                }
            }
    }

    private _onLoadComplete( cache : ResourceCacheData , completeCallback: (data: ResourceCacheData) => void,err:Error,data:cc.Asset | cc.Asset[]){
        cache.isLoaded = true;
        //添加引用关系
        let tempCache = cache;
        if (err) {
            cc.error(`${this.logTag}fail:${cache.info.url} bec:${err.message ? err.message : "un"}`);
            cache.data = null;
            tempCache.data = null;
            Manager.cacheManager.remove(cache.info.bundle,cache.info.url);
            completeCallback(cache);
        }
        else {
            if (CC_DEBUG) cc.log(`${this.logTag}suc:${cache.info.url}`);
            cache.data = data;
            tempCache.data = data;
            completeCallback(cache);
        }

        //加载过程，有不同地方调用过来加载同一个资源的地方，都回调回去
        cache.doFinish(tempCache);
        cache.doGet(tempCache.data);

        if (cache.status == ResourceCacheStatus.WAITTING_FOR_RELEASE) {
            if (CC_DEBUG) cc.warn(this.logTag, `res:${cache.info.url}`);
            if (cache.data) {
                cache.status = ResourceCacheStatus.NONE;
                let info = new ResourceInfo;
                info.url = cache.info.url;
                info.type = cache.info.type;
                info.data = cache.data;
                info.bundle = cache.info.bundle;
                this.releaseAsset(info);
            }
        }

        //cc.timeEnd(`加载资源 : ${cache.info.url}`);
    }

    public loadDir(
        bundle: BUNDLE_TYPE,
        path: string,
        type: typeof cc.Asset,
        onProgress: (finish: number, total: number, item: cc.AssetManager.RequestItem) => void,
        onComplete: (data:ResourceCacheData) => void): void {
            if( CC_DEBUG ) {
                cc.log(`load bundle : ${bundle} path : ${path}`)
            }
            let cache = Manager.cacheManager.get(bundle,path);
            if ( cache ){
                //存在缓存信息
                if ( cache.isLoaded ){
                    //已经加载完成
                    if (CC_DEBUG && cache.status == ResourceCacheStatus.WAITTING_FOR_RELEASE ){
                        // cc.warn(this.logTag, `资源:${path} 等待释放，但资源已经加载完成，此时有人又重新加载，不进行释放处理`);
                    }
                    //加载完成
                    onComplete(cache);
                }else{
                    if (CC_DEBUG && cache.status == ResourceCacheStatus.WAITTING_FOR_RELEASE ){
                        // cc.warn(this.logTag, `资源:${path}等待释放，但资源处理加载过程中，此时有人又重新加载，不进行释放处理`);
                    }
                    cache.finishCb.push(onComplete);
                }
                //重新复位资源状态
                cache.status = ResourceCacheStatus.NONE;
            }else{
                //无缓存信息
                cache = new ResourceCacheData();
                cache.info.url = path;
                cache.info.type = type;
                cache.info.bundle = bundle;
                Manager.cacheManager.set(bundle,path,cache);
                //cc.time(`加载资源 : ${cache.info.url}`);
                let _bundle = this.getBundle(bundle);
                if (!_bundle ){
                    //如果bundle不存在
                    let error = new Error(`${this.logTag} ${bundle} not`);
                    this._onLoadComplete(cache,onComplete,error,null);
                    return;
                }
                if (onProgress) {
                    _bundle.loadDir(path, type, onProgress, this._onLoadComplete.bind(this, cache, onComplete));
                } else {
                    _bundle.loadDir(path, type, this._onLoadComplete.bind(this, cache, onComplete));
                }
            }
    }

    public releaseAsset( info : ResourceInfo ){
        if ( info && info.bundle ){
            let cache = Manager.cacheManager.get(info.bundle,info.url,false);
            if( !cache ){
                return;
            }else{
                if( cache.isInvalid ){
                    if( CC_DEBUG ) cc.warn(`res url : ${info.url}`);
                    return;
                }
            }
            if( cache.isLoaded ){
                if( cache.info.retain ){
                    if( CC_DEBUG ) cc.log(`res url : ${cache.info.url}`);
                    return;
                }
                if( CC_DEBUG ) cc.log(`unres : ${info.bundle}.${info.url}`);
                
                if (Manager.cacheManager.removeWithInfo(info)) {
                    let bundle = this.getBundle(info.bundle);
                    if (bundle) {
                        if (Array.isArray(info.data)) {
                            for (let i = 0; i < info.data.length; i++) {
                                let path = `${info.url}/${info.data[i].name}`;
                                bundle.release(path, info.type);
                            }
                            if (CC_DEBUG) cc.log(`sucres : ${info.bundle}.${info.url}`);
                        } else {
                            bundle.release(info.url, info.type);
                            if (CC_DEBUG) cc.log(`unres : ${info.bundle}.${info.url}`);
                        }
                    } else {
                        cc.error(`${info.bundle} no found`);
                    }
                } else {
                    if (CC_DEBUG){
                        if( Array.isArray(info.data) ){
                            for( let i = 0 ; i < info.data.length ; i++ ){
                                if( info.data[i].refCount != 0 ){
                                    cc.warn(`bundle : ${info.bundle} url : ${info.url}/${info.data[i].name}  refCount : ${info.data[i].refCount}`)
                                }
                            }
                        }else{
                            cc.warn(`bundle : ${info.bundle} url : ${info.url}  refCount : ${info.data.refCount}`)
                        }
                    } 
                }
            }else{
                cache.status = ResourceCacheStatus.WAITTING_FOR_RELEASE;
                if( CC_DEBUG ) cc.warn(`${cache.info.url} `);
            }
            
        }
    }

    public retainAsset( info : ResourceInfo ){
        if( info ){
            let cache = Manager.cacheManager.get(info.bundle,info.url)
            if( cache ){
                if( CC_DEBUG ){
                    if( info.data != cache.data ){
                        cc.error(`retainAsset :${info.url}`);
                    }
                }
                if( !cache.info.retain ){
                    cache.info.retain = info.retain;
                }
                if( Array.isArray(cache.data) ){
                    //里面是数组 
                    for( let i = 0 ; i < cache.data.length ; i++){
                        cache.data[i] && cache.data[i].addRef();
                    }
                }else{
                    cache.data && cache.data.addRef();
                }
            }else{
                if( CC_DEBUG ) cc.error(`retainAsset cache.data is null`);
            }
        }else{
            if ( CC_DEBUG ) cc.error(`retainAsset info is null`);
        }
    }

    /**
     * @description 添加常驻资源
     * @param prefab 
     */
    public addPersistAsset(url: string, data: cc.Asset , bundle : BUNDLE_TYPE ) {
        let info = new ResourceInfo;
        info.url = url;
        info.data = data;
        info.bundle = bundle;
        info.retain = true;
        this.retainAsset(info);
    }
}