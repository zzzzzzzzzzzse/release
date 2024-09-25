
import { BundleType, ViewCloseAnimType, ViewLevel, ViewOpenAnimType } from "../Const/StoneAgeCommonDefine";
import StoneAgeViewBase from "../UI/View/StoneAgeViewBase";
import StoneAgeLogManager from "./StoneAgeLogManager";
import StoneAgeSlotResManager from "./StoneAgeSlotResManager";
import StoneAgeTimerManager from "./StoneAgeTimerManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class StoneAgeViewManager {
    private viewCon: cc.Node = null;
    private viewMap: { [key: string]: { node?: cc.Node, isGame?: boolean, abundleName?: string } } = {};//将所有已经挂在场景里的View存起来
    private currViewPath: string;//当前展示的是哪个View
    private lastViewPath: string;//上一次展示的是哪个View
    private isOpening: boolean = false;//是否正在打开某个View（同一时间只能处理一个View的打开逻辑）
    private openListArr: Array<{ abundleName: string, path: string, data?: {}, isDestroy: boolean, isGame: boolean, level?: ViewLevel }> = [];//存储历史打开View，有序
    private delayReleaseIDMap: { [key: string]: number } = {};//存放资源释放的计时器ID
    private static _instance: StoneAgeViewManager
    public static get instance() {
        if (StoneAgeViewManager._instance == null) {
            StoneAgeViewManager._instance = new StoneAgeViewManager();
        }
        return StoneAgeViewManager._instance;
    }

    private constructor() {

    }
    /**
     * 打开某个View（不能打开游戏）
     * @param 
     * @param abundleName AB包名
     * @param path 子游戏路径
     * @param data 带入子游戏的数据
     * @param isDestroy 是否销毁上一个View
     * @param closeAnimType 当前界面的关闭动画类型
     * @param openAnimType 即将打开的界面的打开动画类型
     * @returns void
     */
    public openView(
        abundleName: string,
        path: string,
        data: {} = {},
        isDestroy: boolean = true,
        closeAnimType: ViewCloseAnimType = ViewCloseAnimType.ONE,
        openAnimType: ViewOpenAnimType = ViewOpenAnimType.ONE
    ): void {
        if (this.currViewPath == path) {
            return;
        }
        if (this.isOpening) {
            return;
        }
        StoneAgeTimerManager.instance.clearInterval(this.delayReleaseIDMap[abundleName]);
        this.openListArr.push({ abundleName: abundleName, path: path, data: data, isDestroy: isDestroy, isGame: false });
        this.opening(abundleName, path, data, isDestroy, false, closeAnimType, openAnimType);
    }

    /**
     * 打开某个子游戏（不能打开子游戏之外的view）
     * @param abundleName 
     * @param data 
     * @param closeAnimType 当前界面的关闭动画类型
     * @param openAnimType 即将打开的界面的打开动画类型
     * @returns 
     */
    public openGame(
        gameName: string,
        data: {} = {},
        closeAnimType: ViewCloseAnimType = ViewCloseAnimType.ONE,
        openAnimType: ViewOpenAnimType = ViewOpenAnimType.ONE
    ) {
        let abundleName = gameName + "Bundle";
        let path = "Prefabs/" + gameName + "View";
        if (this.currViewPath == path) {
            return;
        }
        if (this.isOpening) {
            return;
        }
        StoneAgeTimerManager.instance.clearInterval(this.delayReleaseIDMap[abundleName]);
        this.openListArr.push({ abundleName: abundleName, path: path, data: data, isDestroy: true, isGame: true });
        this.opening(abundleName, path, data, true, true, closeAnimType, openAnimType);
    }

    /**
     * 返回上一个view
     * @param closeAnimType 当前界面的关闭动画类型
     * @param openAnimType 即将打开的界面的打开动画类型
     * @param isOpenLast 是否要打开上一个界面
     * @returns 
     */
    public back(
        closeAnimType: ViewCloseAnimType = ViewCloseAnimType.ONE,
        openAnimType: ViewOpenAnimType = ViewOpenAnimType.ONE,
        isOpenLast: boolean = true
    ) {
        if (this.isOpening) {
            return;
        }
        this.openListArr.pop();
        let obj: {
            abundleName: string;
            path: string;
            data?: {};
            isDestroy: boolean;
            isGame: boolean;
            level?: ViewLevel;
        } = null;
        for (let index = this.openListArr.length - 1; index >= 0; index--) {
            const element = this.openListArr[index];
            if (element.level == ViewLevel.LEVEL_ONE) {
                obj = element;
                StoneAgeLogManager.instance.log("openListArrBackOver：", this.openListArr);
                break;
            }
            else {
                const tempObj = this.openListArr.pop();
                const map = this.viewMap[tempObj.path];
                if (map && map.node) {
                    map.node.destroy();
                    delete this.viewMap[tempObj.path];
                }
                StoneAgeLogManager.instance.log("openListArr：", this.openListArr);
            }
        }
        if (null == obj) {
            StoneAgeLogManager.instance.err("back view is null");
            return;
        }
        if (!isOpenLast) {
            return;
        }
        StoneAgeTimerManager.instance.clearInterval(this.delayReleaseIDMap[obj.abundleName]);
        this.opening(
            obj.abundleName,
            obj.path,
            obj.data,
            obj.isDestroy,
            obj.isGame,
            closeAnimType,
            openAnimType
        );
    }

    /**
     * 打开中
     * @param abundleName AB包名
     * @param path 路径
     * @param data 数据
     * @param isDestroy 是否销毁
     * @param isGame 是否是游戏
     * @param closeAnimType 当前界面的关闭动画类型
     * @param openAnimType 即将打开的界面的打开动画类型
     */
    private opening(
        abundleName: string,
        path: string,
        data: {} = {},
        isDestroy: boolean = true,
        isGame: boolean = false,
        closeAnimType: ViewCloseAnimType,
        openAnimType: ViewOpenAnimType
    ) {
        this.isOpening = true;
        this.currViewPath = path;
        //如果这个View的节点没有销毁
        if (null != this.viewMap[path]) {
            if (this.viewMap[path].node != null) {
                this.handleView(this.viewMap[path].node, path, data, isDestroy, closeAnimType, openAnimType);
            }
        }
        else {
            this.viewMap[path] = {};
            this.viewMap[path].isGame = isGame;
            this.viewMap[path].abundleName = abundleName;
            this.loadModule(abundleName, path, data, isDestroy, closeAnimType, openAnimType);
        }
    }

    /**
     * 加载view
     * @param abundleName 
     * @param path 
     * @param data 
     * @param isDestroy 
     * @param closeAnimType 当前界面的关闭动画类型
     * @param openAnimType 即将打开的界面的打开动画类型
     */
    private async loadModule(abundleName: string, path: string, data: {} = {}, isDestroy: boolean = true, closeAnimType, openAnimType) {
        let res: cc.Prefab = await StoneAgeSlotResManager.instance.loadByBundle(
            abundleName,
            path
        )
        var view = cc.instantiate(res);
        this.handleView(view, path, data, isDestroy, closeAnimType, openAnimType);
    }

    /**
     * 处理view
     * @param view 
     * @param path 
     * @param data 
     * @param isDestroy 
     * @param closeAnimType 当前界面的关闭动画类型
     * @param openAnimType 即将打开的界面的打开动画类型
     */
    private handleView(
        view: cc.Node,
        path: string,
        data: {},
        isDestroy: boolean,
        closeAnimType: ViewCloseAnimType,
        openAnimType: ViewOpenAnimType
    ) {
        if (null == this.viewCon) {
            this.viewCon = cc.find("Canvas/viewNode");
        }
        this.viewMap[path].node = view;
        let tsViewBase: StoneAgeViewBase = <StoneAgeViewBase>view.getComponent("ViewBase");
        tsViewBase.setPath(path);
        tsViewBase.setData(data);
        tsViewBase.setOpenAnimCompleteCallback(() => { })
        this.openListArr[this.openListArr.length - 1].level = tsViewBase.getLevel();
        if (view.parent) {
            view.active = true;
        }
        else {
            view.parent = this.viewCon;
        }
        tsViewBase.open(openAnimType);
        this.destroyLastView(isDestroy, closeAnimType);
    }

    /**
     * 销毁或者移除上一个View
     * @param isDestroy 是否销毁
     * @param closeAnimType 当前界面的关闭动画类型
     */
    private destroyLastView(isDestroy: boolean, closeAnimType: ViewCloseAnimType) {
        if (null != this.lastViewPath) {
            let lastNode = this.viewMap[this.lastViewPath] == null ? null : this.viewMap[this.lastViewPath].node;
            let isGame = this.viewMap[this.lastViewPath] == null ? null : this.viewMap[this.lastViewPath].isGame;
            if (null != lastNode) {
                let tsOtherViewBase: StoneAgeViewBase = <StoneAgeViewBase>lastNode.getComponent("ViewBase");
                let _lastViewPath = this.lastViewPath;
                let _abundleName = this.viewMap[_lastViewPath].abundleName;
                tsOtherViewBase.setClose(isDestroy, () => {
                    if (isGame && isDestroy) {
                        this.delayReleaseIDMap[_abundleName] = StoneAgeTimerManager.instance.setInterval(() => {
                            StoneAgeSlotResManager.instance.releaseBundle(_abundleName);
                            StoneAgeLogManager.instance.info("释放成功:", this.delayReleaseIDMap[_abundleName], " name:", _abundleName);
                        }, 0, 0);
                        StoneAgeLogManager.instance.info("开始释放：", _abundleName, "计时器：", this.delayReleaseIDMap[_abundleName]);
                    }
                }, closeAnimType);
                StoneAgeTimerManager.instance.setTimeOut(() => {
                    this.isOpening = false;
                }, closeAnimType == ViewCloseAnimType.ONE ? tsOtherViewBase.getAnimTime() : tsOtherViewBase.getAnimTimeTwo());
                if (isDestroy) {
                    delete this.viewMap[_lastViewPath];
                }
            }
            else {
                this.isOpening = false;
            }
        }
        else {
            this.isOpening = false;
        }
        this.lastViewPath = this.currViewPath;
    }

    /**
     * 回到大厅，会清空之前所有界面数据
     */
    public returnHall() {
        if (this.isOpening) {
            return;
        }
        this.clean();
        StoneAgeSlotResManager.instance.cleanGameBundle();
        //延迟一点加载，避免游戏里面资源还未释放导致内存瞬间上升闪退的问题
        StoneAgeTimerManager.instance.setTimeOut(() => {
            this.openView(BundleType.HALL, 'Prefabs/View/HallView', {}, true);
        }, 0.1);

    }

    /**
     * 回到登录界面，会清空之前所有界面数据
     * @returns 
     */
    public returnLogin() {
        if (this.isOpening) {
            return;
        }
        this.clean();
        StoneAgeSlotResManager.instance.cleanAllBundle();
        this.openView(BundleType.RESOURCES, 'Prefabs/LoadingView', {}, true);
    }

    /**
     * 清空之前所有界面数据
     */
    private clean() {
        for (const key in this.viewMap) {
            const element = this.viewMap[key];
            if (null != element.node) {
                let tsOtherViewBase: StoneAgeViewBase = <StoneAgeViewBase>element.node.getComponent("ViewBase");
                element.node.destroy();
                tsOtherViewBase.onClose();
            }
            delete this.viewMap[key];
        }
        for (let index = 0; index < this.openListArr.length; index++) {
            this.openListArr.splice(index, 1);
            index--;
        }
        this.lastViewPath = null;
        this.currViewPath = null;
    }

    public getCurrentViewPath(): string {
        return this.currViewPath;
    }
}
