import SwingItem from "./SwingItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SwingView extends cc.Component {

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
        let swingItem: SwingItem = null;
        let itemNode: cc.Node = null;

        if (this.nodePool && this.nodePool.size() > 0) {
            itemNode = this.nodePool.get();
            swingItem = itemNode.getComponent(SwingItem);
            buildRelationship();
        } else {
            if (!this.nodePool) {
                this.nodePool = new cc.NodePool();
            }
            itemNode = cc.instantiate(this.template);
            itemNode.name = 'swingItem';
            itemNode.addComponent(SwingItem);
            swingItem = itemNode.getComponent(SwingItem);
            buildRelationship();
        }

        //建立关系
        function buildRelationship() {
            itemNode.parent = _this.node;
            swingItem.init(_this.nodePool, data.position, data.endPosition, data.time, data.scale, data.frequency, data.rotate, data.doReturn);
            _this.runNodes.push(itemNode);
            swingItem.stop = false;
            swingItem.move();
        }
    }

    /**
     *  刷东西
     * @param flushNum 数量
     * @param interval 间隔，单位s
     * @param bornWidth 间隔，单位s
     * @param bornHeight 间隔，单位s
     * @param width 宽度
     * @param height 宽度
     * @param frequency 宽度
     * @param scaleLow 最小
     * @param scaleHigh 最大
     * @param time 速度
     * @param roll 是否旋转
     * @param doReturn 是否返回
     */
    public flushNodes(flushNum: number, interval: number, bornWidth: number, bornHeight: number, width: number, height: number, frequency: number, scaleLow: number, scaleHigh: number, time: number, roll: boolean, doReturn: boolean) {
        let data: any;
        let rotate: number = 0;
        let flush = cc.tween(this.node)
            .delay(interval)
            .call(() => {
                if (roll) {
                    rotate = Math.floor(Math.random() * 360);
                }
                let bornPosition = cc.v2(0, 0);
                bornPosition.x += Math.floor(Math.random() * bornWidth - bornWidth / 2);
                bornPosition.y += Math.floor(Math.random() * bornHeight - bornHeight / 2);
                let endPosition = cc.v2(0, 0);
                endPosition.x = Math.floor(Math.random() * width - width / 2);
                endPosition.y = Math.floor(Math.random() * height - height / 2);
                let scale = (Math.floor((scaleHigh - scaleLow) * 100 * Math.random()) + scaleLow * 100) / 100;
                let randomFrequency: number = Math.floor(Math.random() * 6 + 7) * frequency / 10;
                let randomTime: number = Math.floor(Math.random() * 6 + 7) * time / 10;
                data = {
                    position: bornPosition,
                    endPosition: endPosition,
                    time: randomTime,
                    scale: scale,
                    frequency: randomFrequency,
                    rotate: rotate,
                    doReturn: doReturn,
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
            item.getComponent(SwingItem).crash();
            this.runNodes.splice(i);
        }
        this.runNodes = [];
    }
}
