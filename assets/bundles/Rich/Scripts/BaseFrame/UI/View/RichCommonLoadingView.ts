// import CommonDeal from "../../../Common/CommonDeal";
import { RichEventDefine } from "../../Const/RichEventDefine";
import RichLogManager from "../../Manager/RichLogManager";
import RichSlotEventManager from "../../Manager/RichSlotEventManager";
import RichSlotResManager from "../../Manager/RichSlotResManager";
// import UpdateManager from "../../Manager/UpdateManager";
import RichViewManager from "../../Manager/RichViewManager";
import RichViewBase from "./RichViewBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RichCommonLoadingView extends RichViewBase {

    @property(cc.Integer)
    public awaitTs: number = 1500;//loading展示的最短时间（毫秒,从打开动画播完开始算到正准备开始播关闭动画为止）
    @property(cc.String)
    public gameName: string = "";//将要打开的游戏名字

    public loadStartTs: number = 0;//开始展示的时间
    private loaded: boolean = false;//是否加载完毕

    protected onLoad(): void {
        RichSlotEventManager.instance.on(RichEventDefine.DOWNLOAD_COMPLETED, (gameName) => {
            if (gameName == this.gameName) {
                this.preLoad();
            }
        }, this);
        RichSlotEventManager.instance.on(RichEventDefine.GAME_PRELOAD_COMPLETE, this.openView, this);
        RichSlotEventManager.instance.on(RichEventDefine.SOCKET_CONNECT_SUCCESS, this.checkUpdate, this);
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
        RichLogManager.instance.info("准备打开游戏界面");
        RichSlotEventManager.instance.off(this, RichEventDefine.GAME_PRELOAD_COMPLETE);
        RichSlotEventManager.instance.off(this, RichEventDefine.SOCKET_CONNECT_SUCCESS);
        let currTs = new Date().getTime();
        if ((currTs - this.loadStartTs) >= this.awaitTs) {
            RichLogManager.instance.info("打开游戏界面:", this.gameName);
            RichViewManager.instance.openGame(this.gameName);
        }
        else {
            this.setTimeOut(() => {
                RichLogManager.instance.info("打开游戏界面：", this.gameName);
                RichViewManager.instance.openGame(this.gameName);
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
        await RichSlotResManager.instance.preloadByBundle(this.gameName + "Bundle", "Prefabs/" + this.gameName + "View");
        this.preComplete();
    }

    /**
     * 加载完成
     */
    protected preComplete() {
        RichLogManager.instance.info("游戏界面预加载完成");
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
