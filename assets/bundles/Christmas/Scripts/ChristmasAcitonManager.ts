import { ChristmasActionType } from "./ChristmasDefine";

const { ccclass, property } = cc._decorator;
/**
 * 动作管理类
 */
@ccclass
export default class ChristmasAcitonManager {
    private actionArr: Array<{ type: ChristmasActionType, data?: {}, frame?: number }> = [];
    private static _instance: ChristmasAcitonManager;
    public static get instance() {
        if (ChristmasAcitonManager._instance == null) {
            ChristmasAcitonManager._instance = new ChristmasAcitonManager();
        }
        return ChristmasAcitonManager._instance;
    }

    private constructor() {
    }

    /**
     * 清理
     */
    public clean() {
        ChristmasAcitonManager._instance = null;
    }

    /**
     * 添加一个动作
     */
    public addAction(action: { type: ChristmasActionType, data?: {}, frame?: number }) {
        this.actionArr.push(action);
    }

    /**
     * 获取下一个动作
     */
    public getNextAction(): { type: ChristmasActionType, data?: {}, frame?: number } {
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
