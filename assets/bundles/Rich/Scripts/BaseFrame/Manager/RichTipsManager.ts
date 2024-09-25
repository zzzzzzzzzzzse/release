import { BundleType } from "../Const/RichCommonDefine";
import LanguageRichText from "../UI/Language/RichLanguageRichText";
import RichTimerManager from "./RichTimerManager";

export default class RichTipsManager {
    private static _instance: RichTipsManager = null;
    private tipsNode: cc.Node = null;

    /**
     * 获取单例
     */
    public static get instance(): RichTipsManager {
        if (!this._instance) {
            this._instance = new RichTipsManager();
        }
        return this._instance;
    }

    /**
     * 飘字提升
     */
    public async showTips(languageKey: string, params: any[] = []) {
        if (!this.tipsNode) {
            this.tipsNode = cc.find("Canvas/tipsNode");
        }
        cc.assetManager.loadBundle(BundleType.RESOURCES, (err, bundle: cc.AssetManager.Bundle) => {
            if (err) {
                return;
            }
            bundle.load('Prefabs/Common/TipsItem', cc.Prefab, (err, prefab: cc.Prefab) => {
                if (err) {
                    return;
                }
                const tipsItem = cc.instantiate(prefab);
                this.tipsNode.addChild(tipsItem);
                const tipsLabel = tipsItem.getChildByName('tipsLabel').getComponent(LanguageRichText);
                tipsLabel.setLanguageId(languageKey, params);
                RichTimerManager.instance.setTimeOut(() => {
                    cc.tween(tipsItem).by(0.3, { y: 100 }).to(0.3, { opacity: 0 }).call(() => {
                        tipsItem.parent = null;
                    }).start();
                }, 1)
            })
        })
        // const prefab = await SlotResManager.instance.loadByBundle('resources', 'Prefabs/Common/TipsItem') as cc.Prefab;
        // const tipsItem = cc.instantiate(prefab);
        // this.tipsNode.addChild(tipsItem);
        // const tipsLabel = tipsItem.getChildByName('tipsLabel').getComponent(LanguageRichText);
        // tipsLabel.setLanguageId(languageKey, params);
        // TimerManager.instance.setTimeOut(() => {
        //     cc.tween(tipsItem).by(0.3, { y: 100 }).to(0.3, { opacity: 0 }).call(() => {
        //         tipsItem.parent = null;
        //     }).start();
        // }, 1)
    }

    // public release(): void 
}
