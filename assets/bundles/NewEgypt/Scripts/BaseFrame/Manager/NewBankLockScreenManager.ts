import { BundleType } from "../Const/NewBankCommonDefine";
import NewBankUtil from "../Util/NewBankUtil";
import NewBankLogManager from "./NewBankLogManager";
import NewBankSlotResManager from "./NewBankSlotResManager";
import NewBankTimerManager from "./NewBankTimerManager";

export default class NewBankLockScreenManager {
    private static _instance: NewBankLockScreenManager = null;
    private parentNode: cc.Node = null;//锁屏界面的父节点
    private lockNode: cc.Node = null;//锁屏界面
    private timerArry: number[] = [];
    private _isLock: boolean = false;

    public static get instance(): NewBankLockScreenManager {
        if (!this._instance) {
            this._instance = new NewBankLockScreenManager();
        }
        return this._instance;
    }

    /**
     * 
     * @param showLoading 是否显示loading动画
     * @param waitTime 显示loading动画等待的时间
     * @param closeTime 界面关闭等待是时间
     */
    public async lockScreen(showLoading: boolean = false, waitTime: number = 0, closeTime: number = -1) {
        NewBankLogManager.instance.log('开始锁屏');
        if (!this.parentNode) {
            this.parentNode = cc.find("Canvas/lockNode");
        }
        if (!this.lockNode) {
            const prefab: cc.Prefab = await NewBankSlotResManager.instance.loadByBundle(BundleType.RESOURCES, 'Prefabs/LockScreen', cc.Prefab);
            const node = cc.instantiate(prefab);
            this.lockNode = node;
            node.width = this.parentNode.width;
            node.height = this.parentNode.height;
        }
        this.lockNode.parent = null;
        this.parentNode.addChild(this.lockNode);
        const loadingNode = NewBankUtil.seekNodeByName('loadingNode', this.lockNode);
        loadingNode && (loadingNode.active = false);
        let timerId = NewBankTimerManager.instance.setTimeOut(() => {
            loadingNode.active = showLoading;
            if (closeTime > 0) {
                timerId = NewBankTimerManager.instance.setTimeOut(() => {
                    this.unlockScreen();
                }, closeTime);
                this.timerArry.push(timerId);
            }
        }, waitTime);
        this.timerArry.push(timerId);
        this._isLock = true;
    }

    public unlockScreen(): void {
        if (!this.lockNode) {
            return;
        }
        this._isLock = false;
        NewBankLogManager.instance.log('关闭锁屏');
        this.lockNode.parent = null;
        for (let i = 0; i < this.timerArry.length; i++) {
            NewBankTimerManager.instance.clearTimeout(this.timerArry[i]);
        }
    }

    public get isLock(): boolean {
        return this._isLock;
    }
}
