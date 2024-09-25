/**
 * 弹框管理类
 */

import { BundleType } from "../Const/StoneAgeCommonDefine";
import StoneAgeDialogBase from "../UI/Dialog/StoneAgeDialogBase";
import StoneAgeLogManager from "./StoneAgeLogManager";
import StoneAgeSlotResManager from "./StoneAgeSlotResManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class StoneAgeDialogManager {
    private dialogCon: cc.Node = null;
    private dialogMap: { [key: string]: { node?: cc.Node } } = {};//将所有弹框数据存起来
    private openList: Array<string> = [];//存所有已经打开的弹框路径
    private static _instance: StoneAgeDialogManager;
    public static get instance() {
        if (StoneAgeDialogManager._instance == null) {
            StoneAgeDialogManager._instance = new StoneAgeDialogManager();
        }
        return StoneAgeDialogManager._instance;
    }

    private constructor() {
    }

    /**
     * 打开某个弹框
     * @param abundleName AB包名
     * @param path 路径
     * @param data 带入弹框的数据
     * @returns void
     */
    public openDialog(abundleName: string, path: string, data?: {}): void {
        if (this.isPopExist(path)) {
            StoneAgeLogManager.instance.log("重复打开弹框:", abundleName, "->", path);
        }
        else {
            this.openList.push(path);
        }
        //如果这个弹框的节点没有销毁
        if (null != this.dialogMap[path]) {
            StoneAgeLogManager.instance.log("弹框数据还在:", abundleName, "->", path);
            if (this.dialogMap[path].node != null) {
                StoneAgeLogManager.instance.log("弹框节点还在:", abundleName, "->", path);
                if (null == this.dialogCon) {
                    this.dialogCon = cc.find("Canvas/dialogNode");
                }
                let tsDialogBase: StoneAgeDialogBase = <StoneAgeDialogBase>this.dialogMap[path].node.getComponent("DialogBase");
                tsDialogBase.setAbName(abundleName);
                tsDialogBase.setPath(path);
                tsDialogBase.setData(data);
                this.dialogMap[path].node.parent = this.dialogCon;
                tsDialogBase.open();
            }
        }
        else {
            StoneAgeLogManager.instance.log("没有弹框数据:", abundleName, "->", path);
            this.dialogMap[path] = {};
            this.loadModule(abundleName, path, data);
        }
    }

    /**
     * 关闭某个弹框
     * @param obj.path 弹框路径
     */
    public closeDialog(path?: string, isDestroy: boolean = true) {
        if (null == this.dialogCon || null == this.dialogCon.children) {
            return;
        }
        let closeCallback = () => {
            //干掉打开表
            if (null == path) {
                path = this.openList.pop();
            }
            else {
                for (let index = 0; index < this.openList.length; index++) {
                    const element = this.openList[index];
                    if (element == path) {
                        this.openList.splice(index, 1);
                        break;
                    }
                }
            }
            //销毁还是移除
            if (isDestroy) {
                delete this.dialogMap[path];
            }
        }
        let mapOne = this.dialogMap[path == null ? this.openList[this.openList.length - 1] : path];
        if (null == mapOne || null == mapOne.node) {
            return;
        }
        let dialogNode = mapOne.node;
        let tsDialogBase: StoneAgeDialogBase = <StoneAgeDialogBase>dialogNode.getComponent("DialogBase");
        tsDialogBase.setClose(isDestroy, closeCallback)
    }

    /**
     * 加载
     * @param abundleName 
     * @param path 
     * @param data 
     */
    private async loadModule(abundleName: string, path: string, data?: {}) {
        StoneAgeLogManager.instance.log("开始加载弹框资源:", abundleName, "->", path);
        //这里放加载动画
        let res: cc.Prefab = await StoneAgeSlotResManager.instance.loadByBundle(
            abundleName,
            path,
            cc.Prefab,
            (finish, total) => {
            }
        );
        StoneAgeLogManager.instance.log("弹框资源加载成功:", abundleName, "->", path);
        //这里关闭加载动画
        var newNode = cc.instantiate(res);
        if (null == this.dialogCon) {
            this.dialogCon = cc.find("Canvas/dialogNode");
        }
        let tsDialogBase: StoneAgeDialogBase = <StoneAgeDialogBase>newNode.getComponent("DialogBase");
        tsDialogBase.setAbName(abundleName);
        tsDialogBase.setPath(path);
        tsDialogBase.setData(data);
        newNode.parent = this.dialogCon;
        this.dialogMap[path].node = newNode;
        tsDialogBase.open();

    }

    /**
     * 是否已经弹了
     * @param path 弹框路径
     * @returns 
     */
    private isPopExist(path: string) {
        StoneAgeLogManager.instance.log("已有弹框：", this.openList);
        for (let index = 0; index < this.openList.length; index++) {
            const element = this.openList[index];
            if (element == path) {
                return true;
            }
        }
        return false;
    }

    /**
     * popupKey：popup配置表里面的key
     * confirmCallback：确定按钮点击回调
     * cancelCallback：取消按钮点击回调
     */
    public openCommonDialog(popupKey: string, confirmCallback: Function = null, cancelCallback: Function = null, replaceParams: any[] = []): void {
        const data = { popupKey: popupKey, confirmCallback: confirmCallback, cancelCallback: cancelCallback, replaceParams: replaceParams };
        StoneAgeDialogManager.instance.openDialog(BundleType.RESOURCES, 'Prefabs/Common/CommonDialog', data);
    }

    /**
     * titleLanguageKey：多语言标题key值
     * detailLanguageKey: 多语言内容key值
     * wPos:气泡箭头的世界坐标
     */
    public openCommonPrompts(titleLanguageKey: string, detailLanguageKey: string, wPos: cc.Vec2, params: any[] = [], refWPos: cc.Vec2 = null): void {
        const data = { titleLanguageKey: titleLanguageKey, detailLanguageKey: detailLanguageKey, wPos: wPos, params: params, refWPos: refWPos };
        StoneAgeDialogManager.instance.openDialog(BundleType.RESOURCES, 'Prefabs/Common/CommonPrompts', data);
    }

    /**
     * 关闭气泡弹窗
     */
    public closeCommonPrompts(): void {
        StoneAgeDialogManager.instance.closeDialog('Prefabs/Common/CommonPrompts');
    }

    /**
     * 检测通用弹窗是否存在
     */
    public checkCommonDialogIsExist(): boolean {
        const dialogIsExist = StoneAgeDialogManager.instance.isPopExist('Prefabs/Common/CommonDialog');
        return dialogIsExist;
    }

    /**
     * 关闭所有弹框
     */
    public closeAll() {
        while (0 != this.openList.length) {
            let path = this.openList.pop();
            let mapOne = this.dialogMap[path];
            let dialogNode = mapOne.node;
            if (null == dialogNode) {
                delete this.dialogMap[path];
            }
            else {
                let tsDialogBase: StoneAgeDialogBase = <StoneAgeDialogBase>dialogNode.getComponent("DialogBase");
                delete this.dialogMap[path];
                tsDialogBase.closeCallback();
                StoneAgeLogManager.instance.info("closeDialog:", path);
            }
        }
    }

    /**
     * 显示获得通用奖励弹窗
     */
    public showCommonReward(itemList: any[]): void {
        if (itemList.length <= 0) {
            return;
        }
        StoneAgeDialogManager.instance.openDialog(BundleType.RESOURCES, 'Prefabs/Common/CommonReward', itemList);
    }

    /**
     * 显示通用道具列表
     * itemList, 道具列表信息
     * wPos,气泡的世界坐标
     */
    public showCommonItemList(itemList: any[], wPos: cc.Vec2): void {
        if (itemList.length <= 0) {
            return;
        }
        StoneAgeDialogManager.instance.openDialog(BundleType.RESOURCES, 'Prefabs/Common/CommonItemList', { itemList: itemList, wPos: wPos });
    }
}
