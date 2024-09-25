// import GameController from "../../../bundles/barbarian/script/GameController";
import { Constants } from "../../Constants";
import { AudioMgr } from "./AudioManager";
import { CacheMgr } from "./CacheManager";
import { EventMgr } from "./EventManager";
import { ResMgr } from "./ResManager";

/**@description 引擎管理类,私有类 ,除了destroy接口,其余方法不会暴露给外部调用 */
class EngineManager {
    /**@description 单列对象 */
    private static _instance: EngineManager;
    /**@description 全局唯一,私有构造函数,防止外部new操作 */
    private constructor() { };
    /**@description 公开调用接口 */
    public static get instance() {
        if (!this._instance) {
            this._instance = new EngineManager();
            this._instance._register();
        }
        return this._instance;
    }
    /**@description 注册事件 */
    private _register(): void {
        cc.game.on(cc.game.EVENT_SHOW, this._onEventShow, this);
        cc.game.on(cc.game.EVENT_HIDE, this._onEventHide, this);

        cc.director.on(cc.Director.EVENT_BEFORE_SCENE_LAUNCH, this._onEventBeforeSceneLaunch, this);
        cc.director.on(cc.Director.EVENT_BEFORE_SCENE_LOADING, this._onEventBeforeSceneLoading, this);
        cc.director.on(cc.Director.EVENT_AFTER_SCENE_LAUNCH, this._onEventAfterSceneLaunch, this);
    }
    /** @description 应用切换到前台事件 */
    private _onEventShow(): void {
        AudioMgr.resumeMusic();
    }
    /** @description 应用切换到后台事件 */
    private _onEventHide(): void {
        AudioMgr.pauseAll();
    }
    /** @description 运行新场景之前事件 */
    private _onEventBeforeSceneLaunch(): void {
        AudioMgr.stopAll();
    }
    /** @description 加载新场景之前事件 */
    private _onEventBeforeSceneLoading(): void {

    }
    /** @description 运行新场景之后事件 */
    private _onEventAfterSceneLaunch(): void {
        if(Constants.getInstance().m_userPlayingGame && Constants.getInstance().m_userPlayingGame.m_id != 7){
            return;
        }
        // GameController.destroy();
        // GameController.init();
    }

    /** 销毁该单例模式 */
    public destroy(): void {
        ResMgr.destroy();
        CacheMgr.destroy();
        AudioMgr.destroy();
        EventMgr.destroy();
    }

}
export const EngineMgr: EngineManager = EngineManager.instance;