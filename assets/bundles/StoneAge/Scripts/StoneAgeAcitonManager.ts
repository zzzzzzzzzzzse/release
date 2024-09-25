import { StoneAgeActionType } from "./StoneAgeDefine";

const { ccclass, property } = cc._decorator;
/**
 * 动作管理类
 */
@ccclass
export default class StoneAgeAcitonManager {
    private actionArr: Array<{ type: StoneAgeActionType, data?: {}, frame?: number }> = [];
    private static _instance: StoneAgeAcitonManager;
    public static get instance() {
        if (StoneAgeAcitonManager._instance == null) {
            StoneAgeAcitonManager._instance = new StoneAgeAcitonManager();
        }
        return StoneAgeAcitonManager._instance;
    }

    private constructor() {
    }

    /**
     * 清理
     */
    public clean() {
        StoneAgeAcitonManager._instance = null;
    }

    /**
     * 添加一个动作
     */
    public addAction(action: { type: StoneAgeActionType, data?: {}, frame?: number }) {
        this.actionArr.push(action);
    }

    /**
     * 获取下一个动作
     */
    public getNextAction(): { type: StoneAgeActionType, data?: {}, frame?: number } {
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
