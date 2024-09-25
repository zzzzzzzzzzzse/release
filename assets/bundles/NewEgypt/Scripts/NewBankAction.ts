import { TurntableStatus } from "./BaseFrame/Const/NewBankCommonDefine";
import NewBankLogManager from "./BaseFrame/Manager/NewBankLogManager";
import NewBankAcitonManager from "./NewBankAcitonManager";
import { NewBankActionType } from "./NewBankDefine";
import NewBankView from "./NewBankView";

const { ccclass, property } = cc._decorator;
/**
 * 机台3 action执行类
 */
@ccclass
export default class NewBankAction {
    private view: NewBankView;

    /**
     * 初始化
     * @param view 界面主脚本
     */
    public init(view: NewBankView) {
        this.view = view;
    }

    /**
     * 根据类型执行某个动作
     * @param action 
     */
    public playAction(action: { type: NewBankActionType, data?: any, frame?: number }) {
        switch (action.type) {
            case NewBankActionType.RESULT:
                this.result(action);
                break;
            case NewBankActionType.STOP_ONE:
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
    private stopOne(action: { type: NewBankActionType, data?: any, frame?: number }) {
        if (1 == action.frame) {
            NewBankLogManager.instance.log("[NewBankAction] NewBankActionType.STOP_ONE start");
            action.frame = 2;
            this.view.tsNewBankTurntable.scrollStopOne(action.data.index);
        }
        else if (2 == action.frame) {
            NewBankAcitonManager.instance.deleteFirstAction();
            NewBankLogManager.instance.log("[NewBankAction] NewBankActionType.STOP_ONE end");
        }
    }

    /**
     * 结算流程
     * @param action 
     */
    private result(action: { type: NewBankActionType, data?: any, frame?: number }) {
        if (1 == action.frame) {
            NewBankLogManager.instance.log("[NewBankAction] NewBankActionType.RESULT start");
            this.view.tsNewBankTurntable.checkServerData(
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
            this.view.tsNewBankTurntable.checkIsClick();
        }
        else if (4 == action.frame) {
            action.frame = -1;
            this.view.tsNewBankTurntable.drawPayAllline(() => {
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
            this.view.tsNewBankTurntable.setScrollStatus(TurntableStatus.STOP);
            this.view.tsNewBankTurntable.drawPayEveryOneLine(
                () => {
                    action.frame = 11;
                }
            );
        }
        else if (11 == action.frame) {
            action.frame = 12;
            this.view.tsNewBankTurntable.cleanResultAnim();

        }
        else if (12 == action.frame) {
            action.frame = 13;
            this.view.testFreeOrAutoSpin();
        }
        else if (13 == action.frame) {
            NewBankAcitonManager.instance.deleteFirstAction();
            NewBankLogManager.instance.log("[NewBankAction] NewBankActionType.RESULT end");
        }
    }

    /**
     * 防止未处理的操作导致无法继续播放action
     * @param action 
     */
    private unknownAction(action) {
        NewBankLogManager.instance.log("[NewBankAction] unknown action:", action)
        NewBankAcitonManager.instance.deleteFirstAction();
    }
}
