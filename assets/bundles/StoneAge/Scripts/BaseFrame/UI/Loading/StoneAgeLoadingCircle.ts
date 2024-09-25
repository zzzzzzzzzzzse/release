import StoneAgeLogManager from "../../Manager/StoneAgeLogManager";


/**
 * 
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class StoneAgeLoadingCircle extends cc.Component {

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
        StoneAgeLogManager.instance.log("[LoadingCircle] showLoading");
        this.isLoading = true;
        this.node.active = true;
        cc.tween(this.loadingSprite.node)
            .by(2, { angle: 360 })
            .repeatForever()
            .start();
    }

    public hideLoading() {
        StoneAgeLogManager.instance.log("[LoadingCircle] hideLoading");
        this.isLoading = false;
        this.node.active = false;
        cc.tween(this.loadingSprite.node).stop();
    }
}
