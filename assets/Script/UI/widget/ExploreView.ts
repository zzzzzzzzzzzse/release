import ExploreItem from "./ExploreItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ExploreView extends cc.Component {

    @property(cc.Node)
    public template: cc.Node = null;

    public nodePool: cc.NodePool = null;

    private runNodes: cc.Node[] = [];


    onLoad() {
        this.nodePool = new cc.NodePool();
    }

    /**
     * 创建
     * @param data 数据
     */
    public createNode(data) {
        let _this = this;
        let exploreItem: ExploreItem = null;
        let itemNode: cc.Node = null;
        if (this.nodePool && this.nodePool.size() > 0) {
            itemNode = this.nodePool.get();
            exploreItem = itemNode.getComponent(ExploreItem);
            buildRelationship();
        } else {
            if (!this.nodePool) {
                this.nodePool = new cc.NodePool();
            }
            itemNode = cc.instantiate(this.template);
            itemNode.name = 'exploreItem';
            itemNode.addComponent(ExploreItem);
            exploreItem = itemNode.getComponent(ExploreItem);
            buildRelationship();
        }

        //建立关系
        function buildRelationship() {
            itemNode.parent = _this.node;
            exploreItem.init(_this.nodePool, data.position, data.speed, data.duration, data.angle, data.scale, data.roll);
            _this.runNodes.push(itemNode);
            exploreItem.stop = false;
        }
    }

    /**
     *
     * @param flushNum
     * @param interval
     * @param scaleLow
     * @param scaleHigh
     * @param speed
     * @param duration
     * @param roll
     */
    public flushNodes(flushNum: number, interval: number, scaleLow: number, scaleHigh: number, speed: number, duration: number, roll: boolean) {
        let data: any;
        let flush = cc.tween(this.node)
            .delay(interval)
            .call(() => {
                let bornPosition = cc.v2(0, 0);
                let angle = Math.floor(Math.random() * 360);
                let scale = (Math.floor((scaleHigh - scaleLow) * 100 * Math.random()) + scaleLow * 100) / 100;
                let randomDuration = Math.floor(Math.random() * 6 + 7) * duration / 10;
                let randomSpeed = Math.floor(Math.random() * 6 + 7) * speed / 10;
                data = {
                    position: bornPosition,
                    speed: randomSpeed,
                    angle: angle,
                    scale: scale,
                    duration: randomDuration,
                    roll: roll,
                };
                this.createNode(data);
            });
        cc.tween(this.node)
            .tag(1)
            .then(flush)
            .repeat(flushNum)
            .start();
    }

    /**
     * 回收所有激活节点
     */
    public crashAll() {
        cc.tween(this.node).tag(1).stop();
        let item: cc.Node = null;
        for (let i = 0; i < this.runNodes.length; i++) {
            item = this.runNodes[i];
            item.getComponent(ExploreItem).crash();
            this.runNodes.splice(i);
        }
        this.runNodes = [];
    }
}