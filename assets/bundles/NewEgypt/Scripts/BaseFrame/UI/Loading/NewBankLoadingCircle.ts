import NewBankLogManager from "../../Manager/NewBankLogManager";


/**
 * 
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewBankLoadingCircle extends cc.Component {

    @property(cc.Sprite)
    loadingSprite: cc.Sprite = null;
    private isLoading: boolean;
    public constructor() {
        super();
        this.isLoading = false;
    }

    onLoad() {
        if (!this.isLoading)
            this.node.active = false;
    }

    start() {
    }

    public showLoading() {
        NewBankLogManager.instance.log("[LoadingCircle] showLoading");
        this.isLoading = true;
        this.node.active = true;
        cc.tween(this.loadingSprite.node)
            .by(2, { angle: 360 })
            .repeatForever()
            .start();
    }

    public hideLoading() {
        NewBankLogManager.instance.log("[LoadingCircle] hideLoading");
        this.isLoading = false;
        this.node.active = false;
        cc.tween(this.loadingSprite.node).stop();
    }
}
