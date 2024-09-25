export default class SlotTipsManager {
    private static _instance: SlotTipsManager = null;
    private tipsNode: cc.Node = null;

    /**
     * 获取单例
     */
    public static get instance(): SlotTipsManager {
        if (!this._instance) {
            this._instance = new SlotTipsManager();
        }
        return this._instance;
    }

    /**
     * 飘字提升
     */
    public async showTips(text: string, params: any[] = []) {
        if (!this.tipsNode) {
            this.tipsNode = cc.find("Canvas/tipsNode");
        }
        cc.assetManager.loadBundle("resources", (err, bundle: cc.AssetManager.Bundle) => {
            if (err) {
                return;
            }
            bundle.load('prefab/TipsItem', cc.Prefab, (err, prefab: cc.Prefab) => {
                if (err) {
                    return;
                }
                const tipsItem = cc.instantiate(prefab);
                this.tipsNode.addChild(tipsItem);
                const tipsLabel = tipsItem.getChildByName('tipsLabel').getComponent(cc.RichText);
                tipsLabel.string = text;
                setTimeout(() => {
                    cc.tween(tipsItem).by(0.3, { y: 100 }).to(0.3, { opacity: 0 }).call(() => {
                        tipsItem.parent = null;
                    }).start();
                }, 1000)
            })
        })
    }

    public static release(): void {
        this._instance = null;
    }
}
