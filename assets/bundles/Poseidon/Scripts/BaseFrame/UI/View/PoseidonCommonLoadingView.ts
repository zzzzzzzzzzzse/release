// import CommonDeal from "../../../Common/CommonDeal";
import { PoseidonEventDefine } from "../../Const/PoseidonEventDefine";
import PoseidonLogManager from "../../Manager/PoseidonLogManager";
import PoseidonSlotEventManager from "../../Manager/PoseidonSlotEventManager";
import PoseidonSlotResManager from "../../Manager/PoseidonSlotResManager";
// import UpdateManager from "../../Manager/UpdateManager";
import PoseidonViewManager from "../../Manager/PoseidonViewManager";
import PoseidonViewBase from "./PoseidonViewBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PoseidonCommonLoadingView extends PoseidonViewBase {

    @property(cc.Integer)
    public awaitTs: number = 1500;//loading展示的最短时间（毫秒,从打开动画播完开始算到正准备开始播关闭动画为止）
    @property(cc.String)
    public gameName: string = "";//将要打开的游戏名字

    public loadStartTs: number = 0;//开始展示的时间
    private loaded: boolean = false;//是否加载完毕

    protected onLoad(): void {
        PoseidonSlotEventManager.instance.on(PoseidonEventDefine.DOWNLOAD_COMPLETED, (gameName) => {
            if (gameName == this.gameName) {
                this.preLoad();
            }
        }, this);
        PoseidonSlotEventManager.instance.on(PoseidonEventDefine.GAME_PRELOAD_COMPLETE, this.openView, this);
        PoseidonSlotEventManager.instance.on(PoseidonEventDefine.SOCKET_CONNECT_SUCCESS, this.checkUpdate, this);
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
        PoseidonLogManager.instance.info("准备打开游戏界面");
        PoseidonSlotEventManager.instance.off(this, PoseidonEventDefine.GAME_PRELOAD_COMPLETE);
        PoseidonSlotEventManager.instance.off(this, PoseidonEventDefine.SOCKET_CONNECT_SUCCESS);
        let currTs = new Date().getTime();
        if ((currTs - this.loadStartTs) >= this.awaitTs) {
            PoseidonLogManager.instance.info("打开游戏界面:", this.gameName);
            PoseidonViewManager.instance.openGame(this.gameName);
        }
        else {
            this.setTimeOut(() => {
                PoseidonLogManager.instance.info("打开游戏界面：", this.gameName);
                PoseidonViewManager.instance.openGame(this.gameName);
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
        await PoseidonSlotResManager.instance.preloadByBundle(this.gameName + "Bundle", "Prefabs/" + this.gameName + "View");
        this.preComplete();
    }

    /**
     * 加载完成
     */
    protected preComplete() {
        PoseidonLogManager.instance.info("游戏界面预加载完成");
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
