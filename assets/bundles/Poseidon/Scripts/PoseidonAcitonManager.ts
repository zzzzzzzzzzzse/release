import { PoseidonActionType } from "./PoseidonDefine";

const { ccclass, property } = cc._decorator;
/**
 * 动作管理类
 */
@ccclass
export default class PoseidonAcitonManager {
    private actionArr: Array<{ type: PoseidonActionType, data?: {}, frame?: number }> = [];
    private static _instance: PoseidonAcitonManager;
    public static get instance() {
        if (PoseidonAcitonManager._instance == null) {
            PoseidonAcitonManager._instance = new PoseidonAcitonManager();
        }
        return PoseidonAcitonManager._instance;
    }

    private constructor() {
    }

    /**
     * 清理
     */
    public clean() {
        PoseidonAcitonManager._instance = null;
    }

    /**
     * 添加一个动作
     */
    public addAction(action: { type: PoseidonActionType, data?: {}, frame?: number }) {
        this.actionArr.push(action);
    }

    /**
     * 获取下一个动作
     */
    public getNextAction(): { type: PoseidonActionType, data?: {}, frame?: number } {
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
