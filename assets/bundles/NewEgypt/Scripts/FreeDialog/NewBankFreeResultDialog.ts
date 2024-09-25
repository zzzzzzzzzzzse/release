import { NewBankSoundsType } from "../../../NewEgypt/Scripts/NewBankDefine";
import { BundleType, SoundsType } from "../BaseFrame/Const/NewBankCommonDefine";
import { NewBankEventDefine } from "../BaseFrame/Const/NewBankEventDefine";
import NewBankLogManager from "../BaseFrame/Manager/NewBankLogManager";
import { NewBankSlotAudioManager } from "../BaseFrame/Manager/NewBankSlotAudioManager";
import NewBankSlotEventManager from "../BaseFrame/Manager/NewBankSlotEventManager";
import NewBankTimerManager from "../BaseFrame/Manager/NewBankTimerManager";
import ButtonEx from "../BaseFrame/UI/Component/NewBankButtonEx";
import NewBankLabelEx from "../BaseFrame/UI/Component/NewBankLabelEx";
import SpineEx, { SPINE_END } from "../BaseFrame/UI/Component/NewBankSpineEx";
import NewBankDialogBase from "../BaseFrame/UI/Dialog/NewBankDialogBase";
import NewBankUtil from "../BaseFrame/Util/NewBankUtil";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewBankFreeResultDialog extends NewBankDialogBase {
    @property(ButtonEx)
    backBtn: ButtonEx = null;
    @property(NewBankLabelEx)
    allWinNumLabelEx: NewBankLabelEx = null;
    // @property(cc.Node)
    // numNode: cc.Node = null;
    @property(SpineEx)
    bgSpineEx: SpineEx = null;
    @property(cc.Node)
    backLabelOne: cc.Node = null;
    @property(cc.Node)
    youWinNode: cc.Node = null;
    @property(cc.Node)
    inFreeSpinsNode: cc.Node = null;
    private _data: { num: number, callback: Function };
    public openAnimTime: number = 0.5;
    public closeAnimTime: number = 0.1;
    onLoad() {
        // this.backBtn.setDisable();
        this._data = this.getData();
        NewBankLogManager.instance.log("data:", this._data);
        this.addEvent();
    }

    onDestroy() {
        super.onDestroy();
        cc.Tween.stopAllByTarget(this.youWinNode);
        cc.Tween.stopAllByTarget(this.inFreeSpinsNode);
        cc.Tween.stopAllByTarget(this.backBtn.node);
        NewBankSlotAudioManager.instance.stopSound(SoundsType.MONEY_RUN);
        NewBankTimerManager.instance.setTimeOut(() => {
            NewBankSlotAudioManager.instance.stopSound(SoundsType.MONEY_RUN);
        }, 1);
    }

    openAnimation() {
        let self = this;
        this.maskNode.opacity = 0;
        cc.tween(this.maskNode)
            .to(this.openAnimTime, { opacity: 100 }, { easing: 'sineOut' })
            .start()
        NewBankSlotAudioManager.instance.playSound(BundleType.STONE_AGE, NewBankSoundsType.FREE_RESULT);
        //具体事件
        this.bgSpineEx.spineSkeleton.setEventListener(function name(track, event) {
            NewBankLogManager.instance.info("eventOut", event.data.name);
            if (event.data.name == 'num') {
                self.digitEffect(2);
                cc.tween(self.youWinNode)
                    .to(0.2, { opacity: 255 }, { easing: "sineOut" })
                    .start();
                cc.tween(self.inFreeSpinsNode)
                    .to(0.2, { opacity: 255 }, { easing: "sineOut" })
                    .start();
            }
            else if (event.data.name == 'btn') {
                self.backBtn.node.active = true;
                cc.tween(self.backBtn.node)
                    .to(0.5, { opacity: 255 }, { easing: "sineOut" })
                    .start();
            }
        }.bind(this));

        this.bgSpineEx.node.once(SPINE_END, () => {
            this.bgSpineEx.playSpineAnim({
                aBName: BundleType.STONE_AGE, path: "Spines/FreeResult/sp_level15_free_result", animName: "idle"
            })
        }, this);
        this.bgSpineEx.playSpineAnim({
            aBName: BundleType.STONE_AGE, path: "Spines/FreeResult/sp_level15_free_result", animName: "appear", repeat: 1, callback: () => {
                this.bgSpineEx.attachUtilSelf("num", this.allWinNumLabelEx.node);

            }
        })
        // this.conNode.scale = 0.5;
        // cc.tween(this.conNode)
        //     .to(this.openAnimTime, { scale: 1 }, {
        //         easing: 'backOut'
        //     })
        //     .start();
    }

    closeAnimation() {
        cc.tween(this.node)
            .to(this.closeAnimTime, { opacity: 0 }, { easing: 'sineIn' })
            .call(() => {
                this.closeCallback();
            })
            .start()
    }

    private addEvent() {
        this.backBtn.clickCallback = this.close.bind(this);
        this.backBtn.normalExtend = () => {
            NewBankLogManager.instance.info("normalExtend");
            let rgb = NewBankUtil.hexToRGB(0xffcd00);
            this.backLabelOne.color = new cc.Color(rgb.r, rgb.g, rgb.b);
            this.backLabelOne.getComponent(cc.Label).fontSize = 21;
        }
        this.backBtn.pressedExtend = () => {
            NewBankLogManager.instance.info("pressedExtend");
            let rgb = NewBankUtil.hexToRGB(0xcfab14);
            this.backLabelOne.color = new cc.Color(rgb.r, rgb.g, rgb.b);
            this.backLabelOne.getComponent(cc.Label).fontSize = 20;
        }
        NewBankSlotEventManager.instance.on(NewBankEventDefine.EXIT_ROOM_SUCCESS, () => {
            this.close();
        }, this);
    }

    onClose() {
        this._data.callback();
    }

    /**
 * 数字滚动效果
 * @param time 
 */
    private digitEffect(time: number) {
        this.allWinNumLabelEx.digitEffect({
            score: this._data.num,
            time: time,
            isCoin: true,
            initNum: 0,
            bit: 0,
            callback: () => {
                NewBankLogManager.instance.info("停止播放金币滚动音效");
                NewBankSlotAudioManager.instance.stopSound(SoundsType.MONEY_RUN);
                NewBankSlotAudioManager.instance.playSound(BundleType.RESOURCES, SoundsType.MONEY_END);
            }
        });
        this.allWinNumLabelEx.node.opacity = 255;
        NewBankSlotAudioManager.instance.playSound(BundleType.RESOURCES, SoundsType.MONEY_RUN, true);
    }
}
