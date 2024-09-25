import { NewBankActionType } from "./NewBankDefine";

const { ccclass, property } = cc._decorator;
/**
 * 动作管理类
 */
@ccclass
export default class NewBankAcitonManager {
    private actionArr: Array<{ type: NewBankActionType, data?: {}, frame?: number }> = [];
    private static _instance: NewBankAcitonManager;
    public static get instance() {
        if (NewBankAcitonManager._instance == null) {
            NewBankAcitonManager._instance = new NewBankAcitonManager();
        }
        return NewBankAcitonManager._instance;
    }

    private constructor() {
    }

    /**
     * 清理
     */
    public clean() {
        NewBankAcitonManager._instance = null;
    }

    /**
     * 添加一个动作
     */
    public addAction(action: { type: NewBankActionType, data?: {}, frame?: number }) {
        this.actionArr.push(action);
    }

    /**
     * 获取下一个动作
     */
    public getNextAction(): { type: NewBankActionType, data?: {}, frame?: number } {
        if (this.actionArr.length > 0) {
            var action = this.actionArr[0];
            return action;
        }
        return null;
    }

    /**
     * 删除最前面的动作
     */
    public deleteFirstAction() {
        return this.actionArr.shift();
    }



}
