// import CommonDeal from "../../../Common/CommonDeal";
import { ChristmasEventDefine } from "../../Const/ChristmasEventDefine";
import ChristmasLogManager from "../../Manager/ChristmasLogManager";
import ChristmasSlotEventManager from "../../Manager/ChristmasSlotEventManager";
import ChristmasSlotResManager from "../../Manager/ChristmasSlotResManager";
// import UpdateManager from "../../Manager/UpdateManager";
import ChristmasViewManager from "../../Manager/ChristmasViewManager";
import ChristmasViewBase from "./ChristmasViewBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ChristmasCommonLoadingView extends ChristmasViewBase {

    @property(cc.Integer)
    public awaitTs: number = 1500;//loading展示的最短时间（毫秒,从打开动画播完开始算到正准备开始播关闭动画为止）
    @property(cc.String)
    public gameName: string = "";//将要打开的游戏名字

    public loadStartTs: number = 0;//开始展示的时间
    private loaded: boolean = false;//是否加载完毕

    protected onLoad(): void {
        ChristmasSlotEventManager.instance.on(ChristmasEventDefine.DOWNLOAD_COMPLETED, (gameName) => {
            if (gameName == this.gameName) {
                this.preLoad();
            }
        }, this);
        ChristmasSlotEventManager.instance.on(ChristmasEventDefine.GAME_PRELOAD_COMPLETE, this.openView, this);
        ChristmasSlotEventManager.instance.on(ChristmasEventDefine.SOCKET_CONNECT_SUCCESS, this.checkUpdate, this);
    }

    onOpen() {
        // ResManager.instance.releaseBundle(BundleType.HALL);
        // this.loadStartTs = new Date().getTime();
        // this.checkUpdate();
    }

    /**
     * 加载完后调用这个方法
     */
    public openView() {
        ChristmasLogManager.instance.info("准备打开游戏界面");
        ChristmasSlotEventManager.instance.off(this, ChristmasEventDefine.GAME_PRELOAD_COMPLETE);
        ChristmasSlotEventManager.instance.off(this, ChristmasEventDefine.SOCKET_CONNECT_SUCCESS);
        let currTs = new Date().getTime();
        if ((currTs - this.loadStartTs) >= this.awaitTs) {
            ChristmasLogManager.instance.info("打开游戏界面:", this.gameName);
            ChristmasViewManager.instance.openGame(this.gameName);
        }
        else {
            this.setTimeOut(() => {
                ChristmasLogManager.instance.info("打开游戏界面：", this.gameName);
                ChristmasViewManager.instance.openGame(this.gameName);
            }, (this.awaitTs - currTs + this.loadStartTs) / 1000);
        }
    }

    /**
     * 检测热更新
     */
    private async checkUpdate() {
        // if (CC_JSB) {
        //     const needUpdate = UpdateManager.instance.checkNeedUpdate(this.gameName);
        //     if (needUpdate) {
        //         UpdateManager.instance.updateGame(this.gameName);
        //         return;
        //     }
        // }
        // this.preLoad();
    }

    /**
     * 预加载下一个view的资源（默认只加载view预制）
     */
    protected async preLoad() {
        await ChristmasSlotResManager.instance.preloadByBundle(this.gameName + "Bundle", "Prefabs/" + this.gameName + "View");
        this.preComplete();
    }

    /**
     * 加载完成
     */
    protected preComplete() {
        ChristmasLogManager.instance.info("游戏界面预加载完成");
        this.loaded = true;
        this.syncGameRoomInfo();
    }

    /**
     * 找服务器拿游戏数据
     */
    private syncGameRoomInfo() {
        // if (this.loaded) {
        //     CommonDeal.instance.syncGameRoomInfo();
        // }
    }
}
