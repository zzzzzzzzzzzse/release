import { BundleType } from "../BaseFrame/Const/PoseidonCommonDefine";
import { PoseidonSlotAudioManager } from "../BaseFrame/Manager/PoseidonSlotAudioManager";
import ButtonEx from "../BaseFrame/UI/Component/PoseidonButtonEx";
import SpineEx, { SPINE_END } from "../BaseFrame/UI/Component/PoseidonSpineEx";
import PoseidonDialogBase from "../BaseFrame/UI/Dialog/PoseidonDialogBase";
import { PoseidonSoundsType } from "../PoseidonDefine";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PoseidonFreeDialog extends PoseidonDialogBase {
    @property(cc.Prefab)
    spinePrefab: cc.Prefab = null;//spine预制
    @property(cc.Node)
    spineConNode: cc.Node = null;//spine父节点
    @property(ButtonEx)
    skipBtn: ButtonEx = null;//跳过按钮

    public closeAnimTime: number = 0.2;//关闭动画时间
    public openAnimTime: number = 0;//打开动画
    private _data: { num: number, callback: Function } = { num: null, callback: null };

    onLoad() {
        this._data = this.getData();
        this.addEvent();
    }



    public onOpen() {
        // DeviceManager.instance.shake(0.283);
        this.playFreeAnim();
    }

    public closeAnimation() {
        cc.tween(this.node)
            .to(this.closeAnimTime, { opacity: 0 }, {
                easing: 'sineOut'
            }).call(() => {
                this.node.opacity = 255;
                this.closeCallback();
            })
            .start();
    }

    public onClose() {
        this._data.callback();
        // EventManager.instance.emit(PoseidonEventDefine.FREE_DIALOG_CLOSE_CALLBACK);
    }

    private addEvent() {
        this.skipBtn.clickCallback = this.close.bind(this);
    }

    public playFreeAnim() {
        PoseidonSlotAudioManager.instance.playSound(BundleType.STONE_AGE, PoseidonSoundsType.FREE_PRIZE);
        var freeAnimName = 'free' + this._data.num;
        let preWin = cc.instantiate(this.spinePrefab);
        preWin.parent = this.spineConNode;
        let tsSpineEx = preWin.getComponent(SpineEx);
        tsSpineEx.spineSkeleton.setEventListener(function name(track, event) {
            if (event.data.name == 'playsound') {
            }
        }.bind(this));
        //播放结束
        preWin.once(SPINE_END, () => {
            this.close();
        });
        tsSpineEx.playSpineAnim({ aBName: BundleType.STONE_AGE, path: "Spines/Free/sp_level15_free", animName: freeAnimName, repeat: 1 });
    }

}
