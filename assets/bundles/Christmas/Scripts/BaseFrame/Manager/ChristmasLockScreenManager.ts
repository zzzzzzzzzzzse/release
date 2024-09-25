import { BundleType } from "../Const/ChristmasCommonDefine";
import ChristmasUtil from "../Util/ChristmasUtil";
import ChristmasLogManager from "./ChristmasLogManager";
import ChristmasSlotResManager from "./ChristmasSlotResManager";
import ChristmasTimerManager from "./ChristmasTimerManager";

export default class ChristmasLockScreenManager {
    private static _instance: ChristmasLockScreenManager = null;
    private parentNode: cc.Node = null;//锁屏界面的父节点
    private lockNode: cc.Node = null;//锁屏界面
    private timerArry: number[] = [];
    private _isLock: boolean = false;

    public static get instance(): ChristmasLockScreenManager {
        if (!this._instance) {
            this._instance = new ChristmasLockScreenManager();
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
        ChristmasLogManager.instance.log('开始锁屏');
        if (!this.parentNode) {
            this.parentNode = cc.find("Canvas/lockNode");
        }
        if (!this.lockNode) {
            const prefab: cc.Prefab = await ChristmasSlotResManager.instance.loadByBundle(BundleType.RESOURCES, 'Prefabs/LockScreen', cc.Prefab);
            const node = cc.instantiate(prefab);
            this.lockNode = node;
            node.width = this.parentNode.width;
            node.height = this.parentNode.height;
        }
        this.lockNode.parent = null;
        this.parentNode.addChild(this.lockNode);
        const loadingNode = ChristmasUtil.seekNodeByName('loadingNode', this.lockNode);
        loadingNode && (loadingNode.active = false);
        let timerId = ChristmasTimerManager.instance.setTimeOut(() => {
            loadingNode.active = showLoading;
            if (closeTime > 0) {
                timerId = ChristmasTimerManager.instance.setTimeOut(() => {
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
        ChristmasLogManager.instance.log('关闭锁屏');
        this.lockNode.parent = null;
        for (let i = 0; i < this.timerArry.length; i++) {
            ChristmasTimerManager.instance.clearTimeout(this.timerArry[i]);
        }
    }

    public get isLock(): boolean {
        return this._isLock;
    }
}
