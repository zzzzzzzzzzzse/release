
import { EventDispatcher } from "./event/EventDispatcher";
import { LocalStorage } from "./base/LocalStorage";
import { AssetManagerextend } from "./assetManager/AssetManagerextend";
import { CacheManagerextend } from "./assetManager/CacheManagerextend";
import { UIManager } from "./base/UIManager_test";

/**@description 框架层使用的各管理器单例的管理 */
export class Framewok{
    
    /**@description 事件派发器 */
    get eventDispatcher(){
        return getSingleton(EventDispatcher);
    }

    /**@description 界面管理器 */
    get uiManager(){
        return getSingleton(UIManager);
    }

    /**@description 本地仓库 */
    get localStorage(){
        return getSingleton(LocalStorage);
    }

    /**@description 资源管理器 */
    get assetManager(){
        return getSingleton(AssetManagerextend);
    }

    /**@description 资源缓存管理器 */
    get cacheManager(){
        return getSingleton(CacheManagerextend);
    }


   
}
