import { TurntableStatus } from "./BaseFrame/Const/PoseidonCommonDefine";
import PoseidonLogManager from "./BaseFrame/Manager/PoseidonLogManager";
import PoseidonAcitonManager from "./PoseidonAcitonManager";
import { PoseidonActionType } from "./PoseidonDefine";
import PoseidonView from "./PoseidonView";

const { ccclass, property } = cc._decorator;
/**
 * 机台3 action执行类
 */
@ccclass
export default class PoseidonAction {
    private view: PoseidonView;

    /**
     * 初始化
     * @param view 界面主脚本
     */
    public init(view: PoseidonView) {
        this.view = view;
    }

    /**
     * 根据类型执行某个动作
     * @param action 
     */
    public playAction(action: { type: PoseidonActionType, data?: any, frame?: number }) {
        switch (action.type) {
            case PoseidonActionType.RESULT:
                this.result(action);
                break;
            case PoseidonActionType.STOP_ONE:
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
    private stopOne(action: { type: PoseidonActionType, data?: any, frame?: number }) {
        if (1 == action.frame) {
            PoseidonLogManager.instance.log("[PoseidonAction] PoseidonActionType.STOP_ONE start");
            action.frame = 2;
            this.view.tsPoseidonTurntable.scrollStopOne(action.data.index);
        }
        else if (2 == action.frame) {
            PoseidonAcitonManager.instance.deleteFirstAction();
            PoseidonLogManager.instance.log("[PoseidonAction] PoseidonActionType.STOP_ONE end");
        }
    }

    /**
     * 结算流程
     * @param action 
     */
    private result(action: { type: PoseidonActionType, data?: any, frame?: number }) {
        if (1 == action.frame) {
            PoseidonLogManager.instance.log("[PoseidonAction] PoseidonActionType.RESULT start");
            this.view.tsPoseidonTurntable.checkServerData(
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
            this.view.tsPoseidonTurntable.checkIsClick();
        }
        else if (4 == action.frame) {
            action.frame = -1;
            this.view.tsPoseidonTurntable.drawPayAllline(() => {
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
            this.view.tsPoseidonTurntable.setScrollStatus(TurntableStatus.STOP);
            this.view.tsPoseidonTurntable.drawPayEveryOneLine(
                () => {
                    action.frame = 11;
                }
            );
        }
        else if (11 == action.frame) {
            action.frame = 12;
            this.view.tsPoseidonTurntable.cleanResultAnim();

        }
        else if (12 == action.frame) {
            action.frame = 13;
            this.view.testFreeOrAutoSpin();
        }
        else if (13 == action.frame) {
            PoseidonAcitonManager.instance.deleteFirstAction();
            PoseidonLogManager.instance.log("[PoseidonAction] PoseidonActionType.RESULT end");
        }
    }

    /**
     * 防止未处理的操作导致无法继续播放action
     * @param action 
     */
    private unknownAction(action) {
        PoseidonLogManager.instance.log("[PoseidonAction] unknown action:", action)
        PoseidonAcitonManager.instance.deleteFirstAction();
    }
}
