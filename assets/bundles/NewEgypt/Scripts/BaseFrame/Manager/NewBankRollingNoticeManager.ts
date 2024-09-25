import { BundleType } from "../Const/NewBankCommonDefine";
import NewBankSlotResManager from "./NewBankSlotResManager";
import NewBankTimerManager from "./NewBankTimerManager";

export default class NewBankRollingNoticeManager {
    private static _instance: NewBankRollingNoticeManager = null;
    private parentNode: cc.Node = null;//滚动公告界面的父节点
    private rollingNoticeNode: cc.Node = null;//滚动公告界面

    private loopTime: number = 15;//循环公告循环的间隔时间
    private isStartRollingNotice: boolean = false;
    private timer: number;//循环公告循环的定时器

    private constructor() {

    }

    public static get instance() {
        if (!this._instance) {
            this._instance = new NewBankRollingNoticeManager();
        }
        return this._instance;
    }

    /**
     * 开始显示滚动公告
     */
    public startRollingNoticie(): void {
        if (this.isStartRollingNotice) {
            return;
        }
        this.isStartRollingNotice = true;
        this.showRollingNotice();
    }

    private async showRollingNotice() {
        this.isStartRollingNotice = true;
        if (!this.parentNode) {
            this.parentNode = cc.find("Canvas/rollingNoticeNode");
        }
        if (!this.rollingNoticeNode) {
            const prefab: cc.Prefab = await NewBankSlotResManager.instance.loadByBundle(BundleType.HALL, 'Prefabs/RollingNotice/RollingNotice', cc.Prefab);
            const node = cc.instantiate(prefab);
            this.rollingNoticeNode = node;
        }
        !this.rollingNoticeNode.parent && this.parentNode.addChild(this.rollingNoticeNode);
    }

    /**
     * 关闭滚动公告
     * @param loop 是否需要在指定的时间再次播放
     */
    public closeRollingNotice(loop: boolean = true): void {
        this.rollingNoticeNode && this.rollingNoticeNode.destroy();
        this.rollingNoticeNode = null;
        this.isStartRollingNotice = false;
        this.clear();
        loop && (this.timer = NewBankTimerManager.instance.setTimeOut(this.showRollingNotice.bind(this), this.loopTime));
    }

    private clear(): void {
        NewBankTimerManager.instance.clearTimeout(this.timer);
    }
}
