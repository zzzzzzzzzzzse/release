import { AudioMgr } from "../../framework/mgr/AudioManager";
import CoinFly from "./CoinFly";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CoinFlyPool extends cc.Component {

    @property(cc.Node)
    private template: cc.Node = null;
    private nodePool: cc.NodePool = null;

    onLoad() {
        this.nodePool = new cc.NodePool();
    }

    /**
     * 创建物体
     * @param itemData 物体数据
     */
    public createItem(itemData) {
        var _this = this;
        var item = null;
        var itemNode: cc.Node = null;
        if (this.nodePool && this.nodePool.size() > 0) {
            itemNode = this.nodePool.get();
            item = itemNode.getComponent(CoinFly);
            buildRelationship();
        } else {
            if (!this.nodePool) {
                this.nodePool = new cc.NodePool();
            }
            itemNode = cc.instantiate(this.template);
            itemNode.name = 'castItem';
            itemNode.addComponent(CoinFly);
            item = itemNode.getComponent(CoinFly);
            buildRelationship();
        }
        itemNode.x = itemData.startLoc.x;
        itemNode.y = itemData.startLoc.y;

        function buildRelationship() {
            itemNode.parent = _this.node;
            item.init(_this.nodePool, itemData.startLoc, itemData.time);
            item.getEndPosition(itemData.endLoc);
        }
    }

    /**
     * 批量创建物件
     * @param flushNum 数量
     * @param interval 创建间隔
     * @param time 抛物动画时长
     */
    public flushItemsLoc(flushNum: number, interval: number, time: number, startLocNum: number[], endLocNum: number[], callBack?: Function) {
        let Data: any;
        let startLoc = cc.v2(startLocNum[0], startLocNum[1]);
        let endLoc = cc.v2(endLocNum[0], endLocNum[1]);
        let flush = cc.tween(this.node)
            .delay(interval)
            .call(() => {
                Data = {
                    startLoc: startLoc,
                    endLoc: endLoc,
                    time: time,
                };
                this.createItem(Data);
            });
        cc.tween(this.node)
            .then(flush)
            .repeat(flushNum)
            .start();
        if (callBack) {
            let effectid = AudioMgr.play("public_slot/audio/coin_fly", "resources", () => { }, true);
            let timerOut = setTimeout(async () => {
                clearTimeout(timerOut);
                AudioMgr.stop(await effectid);
                callBack();
            }, ((flushNum * interval + time) * 1000));
        }
    }

    /**
     * 批量创建物件
     * @param flushNum 数量
     * @param interval 创建间隔
     * @param time 抛物动画时长
     */
    public flushItems(flushNum: number, interval: number, time: number, startNode: cc.Node, endNode: cc.Node, callBack?: Function) {
        let Data: any;
        let startLocNum: number[] = [];
        let endLocNum: number[] = [];

        let designSize = cc.view.getDesignResolutionSize();
        let startWorldAR = startNode.convertToWorldSpaceAR(cc.v2(0, 0));
        startLocNum[0] = startWorldAR.x - designSize.width / 2;
        startLocNum[1] = startWorldAR.y - designSize.height / 2;

        let endWorldAR = endNode.convertToWorldSpaceAR(cc.v2(0, 0));
        endLocNum[0] = endWorldAR.x - designSize.width / 2;
        endLocNum[1] = endWorldAR.y - designSize.height / 2;

        let startLoc = cc.v2(startLocNum[0], startLocNum[1]);
        let endLoc = cc.v2(endLocNum[0], endLocNum[1]);
        let flush = cc.tween(this.node)
            .delay(interval)
            .call(() => {
                Data = {
                    startLoc: startLoc,
                    endLoc: endLoc,
                    time: time,
                };
                this.createItem(Data);
            });
        cc.tween(this.node)
            .then(flush)
            .repeat(flushNum)
            .start();

        if (callBack) {
            let effectid = AudioMgr.play("public_slot/audio/coin_fly", "resources", () => { }, true);
            let timerOut = setTimeout(async () => {
                clearTimeout(timerOut);
                AudioMgr.stop(await effectid);
                callBack();
            }, ((flushNum * interval + time) * 1000));
        }
    }

    /**
     * 停止动画
     */
    public stopAnim() {
        cc.Tween.stopAll();
    }
}