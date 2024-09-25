import UIBase from "../base/UIBase";
import { ResMgr } from "./ResManager";

/** @description 全局通用UI管理类 */
class UIManager {
    /**@description 单列对象 */
    private static _instance: UIManager;
    /**@description 全局唯一,私有构造函数,防止外部new操作 */
    private constructor() { };
    /**@description 公开调用接口 */
    public static get instance() {
        if (!this._instance) {
            this._instance = new UIManager();
        }
        return this._instance;
    }
    /**
     * @description 通用打开UI方法
     * @param url 路径
     * @param component 脚本组件名 
     * @param parent 父节点
     * @param cb 回调函数
     */
    public async open(url: string, parent?: cc.Node, component?: string, cb?: () => void): Promise<UIBase> {
        if (!url) return;
        if (!url.includes("prefab/")) url = `prefab/${url}`;
        return new Promise(async (resolve: (value: UIBase | PromiseLike<UIBase>) => void, reject: (reason?: any) => void) => {
            const com: string = component ? component : url.substr(url.lastIndexOf("/") + 1, url.length);
            const pre: cc.Prefab = await ResMgr.load<cc.Prefab>("resources", url);
            const node: cc.Node = cc.instantiate(pre);
            const uibase: UIBase = !node.getComponent(com) ? node.addComponent(com) : node.getComponent(com);
            uibase && uibase._preInit && await uibase._preInit();
            parent && parent.addChild(node);
            cb && cb();
            resolve(uibase);
        });
    }

    public async close(uibase: UIBase) {
        if (uibase) {
            if (uibase.isDestroy && uibase.isValid) {
                uibase.node.removeFromParent();
                uibase.node.destroy();
            } else {
                uibase.node.active = false;
            }
        }
    }

    /**
     * @description 通用从指定bundle打开UI方法
     * @param bundleName bundle名字
     * @param url 路径
     * @param component 脚本组件名 
     * @param parent 父节点
     * @param cb 回调函数
     */
    public async openFromBundle(bundleName: string, url: string, parent?: cc.Node, component?: string, cb?: () => void): Promise<UIBase> {
        if (!url) return;
        if (!url.includes("prefab/")) url = `prefab/${url}`;
        console.log(url);
        return new Promise(async (resolve: (value: UIBase | PromiseLike<UIBase>) => void, reject: (reason?: any) => void) => {
            const com: string = component ? component : url.substr(url.lastIndexOf("/") + 1, url.length);
            console.log(com);
            const bundle: cc.AssetManager.Bundle = await ResMgr.loadBundle(bundleName);
            const pre: cc.Prefab = await ResMgr.load<cc.Prefab>(bundle, url);
            console.log(pre);
            const node: cc.Node = cc.instantiate(pre);
            const uibase: UIBase = !node.getComponent(com) ? node.addComponent(com) : node.getComponent(com);
            uibase && uibase._preInit && await uibase._preInit();
            parent && parent.addChild(node);
            console.log(node, parent);
            cb && cb();
            resolve(uibase);
        });
    }

}
export const UIMgr: UIManager = UIManager.instance;