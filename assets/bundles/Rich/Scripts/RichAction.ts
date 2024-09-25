import { TurntableStatus } from "./BaseFrame/Const/RichCommonDefine";
import RichLogManager from "./BaseFrame/Manager/RichLogManager";
import RichAcitonManager from "./RichAcitonManager";
import { RichActionType } from "./RichDefine";
import RichView from "./RichView";

const { ccclass, property } = cc._decorator;
/**
 * 机台3 action执行类
 */
@ccclass
export default class RichAction {
    private view: RichView;

    /**
     * 初始化
     * @param view 界面主脚本
     */
    public init(view: RichView) {
        this.view = view;
    }

    /**
     * 根据类型执行某个动作
     * @param action 
     */
    public playAction(action: { type: RichActionType, data?: any, frame?: number }) {
        switch (action.type) {
            case RichActionType.RESULT:
                this.result(action);
                break;
            case RichActionType.STOP_ONE:
                this.stopOne(action);
                break;


            default:
                this.unknownAction(action);
                break;
        }
    }


    /**
     * 结算流程
     * @param action 
     */
    private stopOne(action: { type: RichActionType, data?: any, frame?: number }) {
        if (1 == action.frame) {
            RichLogManager.instance.log("[RichAction] RichActionType.STOP_ONE start");
            action.frame = 2;
            this.view.tsRichTurntable.scrollStopOne(action.data.index);
        }
        else if (2 == action.frame) {
            RichAcitonManager.instance.deleteFirstAction();
            RichLogManager.instance.log("[RichAction] RichActionType.STOP_ONE end");
        }
    }

    /**
     * 结算流程
     * @param action 
     */
    private result(action: { type: RichActionType, data?: any, frame?: number }) {
        if (1 == action.frame) {
            RichLogManager.instance.log("[RichAction] RichActionType.RESULT start");
            this.view.tsRichTurntable.checkServerData(
                () => {
                    action.frame = 2;
                },
                () => {
                    action.frame = 11;
                })
        }
        else if (2 == action.frame) {
            action.frame = -1;
            this.view.playBigWinAnim(() => {
                action.frame = 3;
            });
        }
        else if (3 == action.frame) {
            action.frame = 4;
            this.view.tsRichTurntable.checkIsClick();
        }
        else if (4 == action.frame) {
            action.frame = -1;
            this.view.tsRichTurntable.drawPayAllline(() => {
                action.frame = 5;
            });
        }
        else if (5 == action.frame) {
            action.frame = 6;
        }
        else if (6 == action.frame) {
            action.frame = -1;
            this.view.playGetFreeAnim(() => {
                action.frame = 7;
            });
        }
        else if (7 == action.frame) {
            action.frame = -1;
            this.view.playFreeResultAnim(() => {
                action.frame = 8;
            });
        }
        else if (8 == action.frame) {
            action.frame = -1;
            this.view.changeScene(() => {
                action.frame = 9;
            });
        }
        else if (9 == action.frame) {
            this.view.checkLevelRoad(() => {
                action.frame = 10;
            });
        }
        else if (10 == action.frame) {
            action.frame = -1;
            this.view.tsRichTurntable.setScrollStatus(TurntableStatus.STOP);
            this.view.tsRichTurntable.drawPayEveryOneLine(
                () => {
                    action.frame = 11;
                }
            );
        }
        else if (11 == action.frame) {
            action.frame = 12;
            this.view.tsRichTurntable.cleanResultAnim();

        }
        else if (12 == action.frame) {
            action.frame = 13;
            this.view.testFreeOrAutoSpin();
        }
        else if (13 == action.frame) {
            RichAcitonManager.instance.deleteFirstAction();
            RichLogManager.instance.log("[RichAction] RichActionType.RESULT end");
        }
    }

    /**
     * 防止未处理的操作导致无法继续播放action
     * @param action 
     */
    private unknownAction(action) {
        RichLogManager.instance.log("[RichAction] unknown action:", action)
        RichAcitonManager.instance.deleteFirstAction();
    }
}
