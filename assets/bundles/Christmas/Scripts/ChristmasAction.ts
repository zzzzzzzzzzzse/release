import { TurntableStatus } from "./BaseFrame/Const/ChristmasCommonDefine";
import ChristmasLogManager from "./BaseFrame/Manager/ChristmasLogManager";
import ChristmasAcitonManager from "./ChristmasAcitonManager";
import { ChristmasActionType } from "./ChristmasDefine";
import ChristmasView from "./ChristmasView";

const { ccclass, property } = cc._decorator;
/**
 * 机台3 action执行类
 */
@ccclass
export default class ChristmasAction {
    private view: ChristmasView;

    /**
     * 初始化
     * @param view 界面主脚本
     */
    public init(view: ChristmasView) {
        this.view = view;
    }

    /**
     * 根据类型执行某个动作
     * @param action 
     */
    public playAction(action: { type: ChristmasActionType, data?: any, frame?: number }) {
        switch (action.type) {
            case ChristmasActionType.RESULT:
                this.result(action);
                break;
            case ChristmasActionType.STOP_ONE:
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
    private stopOne(action: { type: ChristmasActionType, data?: any, frame?: number }) {
        if (1 == action.frame) {
            ChristmasLogManager.instance.log("[ChristmasAction] ChristmasActionType.STOP_ONE start");
            action.frame = 2;
            this.view.tsChristmasTurntable.scrollStopOne(action.data.index);
        }
        else if (2 == action.frame) {
            ChristmasAcitonManager.instance.deleteFirstAction();
            ChristmasLogManager.instance.log("[ChristmasAction] ChristmasActionType.STOP_ONE end");
        }
    }

    /**
     * 结算流程
     * @param action 
     */
    private result(action: { type: ChristmasActionType, data?: any, frame?: number }) {
        if (1 == action.frame) {
            ChristmasLogManager.instance.log("[ChristmasAction] ChristmasActionType.RESULT start");
            this.view.tsChristmasTurntable.checkServerData(
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
            this.view.tsChristmasTurntable.checkIsClick();
        }
        else if (4 == action.frame) {
            action.frame = -1;
            this.view.tsChristmasTurntable.drawPayAllline(() => {
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
            this.view.tsChristmasTurntable.setScrollStatus(TurntableStatus.STOP);
            this.view.tsChristmasTurntable.drawPayEveryOneLine(
                () => {
                    action.frame = 11;
                }
            );
        }
        else if (11 == action.frame) {
            action.frame = 12;
            this.view.tsChristmasTurntable.cleanResultAnim();

        }
        else if (12 == action.frame) {
            action.frame = 13;
            this.view.testFreeOrAutoSpin();
        }
        else if (13 == action.frame) {
            ChristmasAcitonManager.instance.deleteFirstAction();
            ChristmasLogManager.instance.log("[ChristmasAction] ChristmasActionType.RESULT end");
        }
    }

    /**
     * 防止未处理的操作导致无法继续播放action
     * @param action 
     */
    private unknownAction(action) {
        ChristmasLogManager.instance.log("[ChristmasAction] unknown action:", action)
        ChristmasAcitonManager.instance.deleteFirstAction();
    }
}
