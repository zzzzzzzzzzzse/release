
import { BundleType } from "./BaseFrame/Const/StoneAgeCommonDefine";
import StoneAgeSlotEventManager from "./BaseFrame/Manager/StoneAgeSlotEventManager";
import SpineEx from "./BaseFrame/UI/Component/StoneAgeSpineEx";
import StoneAgeComponentBase from "./BaseFrame/UI/ComponentBase/StoneAgeComponentBase";
import { StoneAgeEventDefine2 } from "./StoneAgeEventDefine2";

const { ccclass, property } = cc._decorator;

@ccclass
export default class StoneAgeAnimation extends StoneAgeComponentBase {
    @property(SpineEx)
    machineBgFarSpineEx: SpineEx = null;
    @property(SpineEx)
    machineBgNearSpineEx: SpineEx = null;

    start() {
        this.addEvent();

    }

    onDestroy() {
        super.onDestroy();
    }

    private addEvent() {
        StoneAgeSlotEventManager.instance.on(StoneAgeEventDefine2.SHAKE_EFFECT, (event) => {
            let time = event.time;
            this.shakeEffect(time);
        }, this)
    }

    /**
     * 播放免费页面动画
     */
    public playFreeSpine() {
        this.machineBgFarSpineEx.playSpineAnim({ aBName: BundleType.STONE_AGE, path: "Spines/Scene/sp_level15_machineyuanjing", animName: "idle_free" });
        this.machineBgNearSpineEx.playSpineAnim({ aBName: BundleType.STONE_AGE, path: "Spines/Scene/sp_level15_machineqianjing", animName: "idle_free" });
    }
    /**
     * 播放普通页面动画
     */
    public playNormalSpine() {
        this.machineBgFarSpineEx.playSpineAnim({ aBName: BundleType.STONE_AGE, path: "Spines/Scene/sp_level15_machineyuanjing", animName: "idle" });
        this.machineBgNearSpineEx.playSpineAnim({ aBName: BundleType.STONE_AGE, path: "Spines/Scene/sp_level15_machineqianjing", animName: "idle" });
    }


    /**
     * 震屏效果
     * @param duration 震屏时间
     */
    public shakeEffect(duration) {
        let persent = 0.6;
        let shakeTween = cc.tween(this.node)
            .to(0.02, { x: 5 * persent, y: 7 * persent })
            .to(0.02, { x: -6 * persent, y: 7 * persent })
            .to(0.02, { x: -13 * persent, y: 3 * persent })
            .to(0.02, { x: 3 * persent, y: -6 * persent })
            .to(0.02, { x: -5 * persent, y: 5 * persent })
            .to(0.02, { x: 2 * persent, y: -8 * persent })
            .to(0.02, { x: -8 * persent, y: -10 * persent })
            .to(0.02, { x: 3 * persent, y: 10 * persent })
            .to(0.02, { x: 0, y: 0 })
        cc.tween(this.node)
            .then(shakeTween)
            .repeatForever()
            .start();
        this.setTimeOut(() => {
            cc.Tween.stopAllByTarget(this.node);
            this.node.setPosition(0, 0);
        }, duration);
    }

}
