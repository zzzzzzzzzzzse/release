import { RichActionType } from "./RichDefine";

const { ccclass, property } = cc._decorator;
/**
 * 动作管理类
 */
@ccclass
export default class RichAcitonManager {
    private actionArr: Array<{ type: RichActionType, data?: {}, frame?: number }> = [];
    private static _instance: RichAcitonManager;
    public static get instance() {
        if (RichAcitonManager._instance == null) {
            RichAcitonManager._instance = new RichAcitonManager();
        }
        return RichAcitonManager._instance;
    }

    private constructor() {
    }

    /**
     * 清理
     */
    public clean() {
        RichAcitonManager._instance = null;
    }

    /**
     * 添加一个动作
     */
    public addAction(action: { type: RichActionType, data?: {}, frame?: number }) {
        this.actionArr.push(action);
    }

    /**
     * 获取下一个动作
     */
    public getNextAction(): { type: RichActionType, data?: {}, frame?: number } {
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
