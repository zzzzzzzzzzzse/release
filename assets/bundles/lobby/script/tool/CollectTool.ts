import { LocalStorageTool } from "../../../../Script/tools/storage/LocalStorageTool";

/**
 * 领奖工具
 */
class CollectTool {
    /**@description 单列对象 */
    private static _instance: CollectTool;
    public static get instance() {
        if (!this._instance) {
            this._instance = new CollectTool();
        }
        return this._instance;
    }

    /**
     * 下次领奖时间
     */
    private m_nextTime: number = -1;

    public get nextTime(): number {
        if (this.m_nextTime < 0) {
            let time = LocalStorageTool.getUserCollectTime();
            if (time < 1) {
                this.m_nextTime = Math.floor(new Date().getTime() / 1000);
            } else {
                this.m_nextTime = time;
            }
        }
        return this.m_nextTime;
    }

    public set nextTime(time: number) {
        this.m_nextTime = time;
    }
    

    

    /** 销毁该单例 */
    public destroy(): void {
        /** 注释 */
        if (CollectTool._instance) {
            CollectTool._instance = null;
        }
    }
}
export default CollectTool.instance;