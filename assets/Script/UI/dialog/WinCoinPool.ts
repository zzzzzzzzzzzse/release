import WinCoin from "./WinCoin";

const { ccclass, property } = cc._decorator;

@ccclass
export default class WinCoinPool extends cc.Component {

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
            item = itemNode.getComponent(WinCoin);
            buildRelationship();
        } else {
            if (!this.nodePool) {
                this.nodePool = new cc.NodePool();
            }
            itemNode = cc.instantiate(this.template);
            itemNode.name = 'castItem';
            itemNode.addComponent(WinCoin);
            item = itemNode.getComponent(WinCoin);
            buildRelationship();
        }


        function buildRelationship() {
            itemNode.parent = _this.node;
            item.init(_this.nodePool, itemData.position, itemData.angle, itemData.height, itemData.time, itemData.scale, itemData.rotate);
            item.getEndPosition(itemData.targetLocation);
        }
    }

    /**
     * 批量创建物件
     * @param flushNum 数量
     * @param interval 创建间隔
     * @param endWidth 抛物终点相对创建位置宽度
     * @param endHeight 抛物终点相对创建位置高度
     * @param angle 抛物角度
     * @param height 抛物高度
     * @param scaleLow 缩放最小值
     * @param scaleHigh 缩放最大值
     * @param time 抛物动画时长
     * @param roll 物件是否自转
     */
    public flushItems(flushNum: number, interval: number, endWidth: number, endHeight: number, angle: number, height: number, scaleLow: number, scaleHigh: number, time: number, roll: boolean) {
        let Data: any;
        let bornPosition = cc.v2(0, 0);
        let flush = cc.tween(this.node)
            .delay(interval)
            .call(() => {
                bornPosition = cc.v2(0, 0);
                bornPosition.x += Math.floor(Math.random() * 40 - 20);
                let moveLocation = cc.v2(Math.floor((Math.random() * 2 - 1) * endWidth / 2), endHeight);
                let scale = (Math.floor((scaleHigh - scaleLow) * 100 * Math.random()) + scaleLow * 100) / 100;
                let rotate = roll ? Math.floor(Math.random() * 360) : 0;
                Data = {
                    position: bornPosition,
                    targetLocation: moveLocation,
                    angle: angle,
                    height: height,
                    scale: scale,
                    time: time,
                    rotate: rotate,
                };
                this.createItem(Data);
            });
        cc.tween(this.node)
            .then(flush)
            .repeat(flushNum)
            .start();
    }

    /**
     * 批量创建物件
     * @param totaltime 动画总时间
     * @param interval 创建间隔
     * @param startV 初始速度
     * @param angleMin 抛物角度区间下限
     * @param angleMax 抛物角度区间上限
     * @param height 抛物高度
     * @param scaleLow 缩放最小值
     * @param scaleHigh 缩放最大值
     * @param time 粒子抛物时长
     * @param roll 物件是否自转
     * @param orientation 横竖屏幕 1:横屏 2:竖屏
     */
    public CommonflushItems(interval: number, startV: number, angleMin: number, angleMax: number, height: number, scaleLow: number, scaleHigh: number, time: number, roll: boolean, totaltime: number, orientation: number) {
        let Data: any;
        let flushNum = totaltime / interval;
        let bornPosition = cc.v2(0, 0);
        let flush = cc.tween(this.node)
            .delay(interval)
            .call(() => {
                bornPosition = cc.v2(0, 0);
                bornPosition.x += Math.floor(Math.random() * 120 - 60);
                bornPosition.y += Math.floor(Math.random() * 80 - 40);
                let moveLocation = cc.v2(Math.floor((Math.random() * 100 - 50) * startV * (2 * 1 / 9.8)), (1 / 2) * 9.8 * (1 / 9.8) * (1 / 9.8) - 350);//横板
                if (orientation == 1) {
                    moveLocation = cc.v2(Math.floor((Math.random() * 100 - 50) * startV * (2 * 1 / 9.8)), (1 / 2) * 9.8 * (1 / 9.8) * (1 / 9.8) - 350);//横板
                } else if (orientation == 2) {
                    moveLocation = cc.v2(Math.floor((Math.random() * 100 - 50) * startV * (2 * 1 / 9.8)), (1 / 2) * 9.8 * (1 / 9.8) * (1 / 9.8) - 1100);//竖版
                }
                let scale = (Math.floor((scaleHigh - scaleLow) * 100 * Math.random()) + scaleLow * 100) / 100;
                let rotate = roll ? Math.floor(Math.random() * 360) : 0;
                let randomAngle = Math.floor(Math.random() * (angleMax - angleMin) + angleMin);
                let randomHeight = Math.floor(Math.random() * ((height * 2) - (height / 2)) + (height / 2));
                Data = {
                    position: bornPosition,
                    targetLocation: moveLocation,
                    angle: randomAngle,
                    height: randomHeight,
                    scale: scale,
                    time: time,
                    rotate: rotate,
                };
                this.createItem(Data);
            });
        cc.tween(this.node)
            .then(flush)
            .repeat(flushNum)
            .start();
    }

    /**
     * 批量创建物件
     * @param totaltime 动画总时间
     * @param interval 创建间隔
     * @param startV 初始速度
     * @param angleMin 抛物角度区间下限
     * @param angleMax 抛物角度区间上限
     * @param height 抛物高度
     * @param scaleLow 缩放最小值
     * @param scaleHigh 缩放最大值
     * @param time 粒子抛物时长
     * @param roll 物件是否自转
     * @param orientation 横竖屏幕 1:横屏 2:竖屏
     */
    public CommonflushItems2(interval: number, startV: number, angleMin: number, angleMax: number, height: number, scaleLow: number, scaleHigh: number, time: number, roll: boolean, totaltime: number, orientation: number) {
        let Data: any;
        let flushNum = totaltime / interval;
        let bornPosition = cc.v2(0, 0);
        let flush = cc.tween(this.node)
            .delay(interval)
            .call(() => {
                bornPosition = cc.v2(0, 0);
                bornPosition.x += Math.floor(Math.random() * 120 - 60);
                bornPosition.y += Math.floor(Math.random() * 80 - 40);
                let moveLocation = cc.v2(Math.floor((Math.random() * 100 - 50) * startV * (2 * 1 / 9.8)), (1 / 2) * 9.8 * (1 / 9.8) * (1 / 9.8) - 350);//横板
                if (orientation == 1) {
                    moveLocation = cc.v2(Math.floor((Math.random() * 100 - 50) * startV * (2 * 1 / 9.8)), (1 / 2) * 9.8 * (1 / 9.8) * (1 / 9.8) - 350);//横板
                } else if (orientation == 2) {
                    moveLocation = cc.v2(Math.floor((Math.random() * 100 - 50) * startV * (2 * 1 / 9.8)), (1 / 2) * 9.8 * (1 / 9.8) * (1 / 9.8) - 1100);//竖版
                }
                let scale = (Math.floor((scaleHigh - scaleLow) * 100 * Math.random()) + scaleLow * 100) / 100;
                let rotate = roll ? Math.floor(Math.random() * 360) : 0;
                let randomAngle = Math.floor(Math.random() * (angleMax - angleMin) + angleMin);
                let randomHeight = Math.floor(Math.random() * ((height * 2) - (height / 2)) + (height / 2));
                Data = {
                    position: bornPosition,
                    targetLocation: moveLocation,
                    angle: randomAngle,
                    height: randomHeight,
                    scale: scale,
                    time: time,
                    rotate: rotate,
                };
                this.createItem(Data);
            });
        cc.tween(this.node)
            .then(flush)
            .repeat(flushNum)
            .start();
    }

    /**
     * 停止动画
     */
    public stopAnim() {
        cc.Tween.stopAll();
    }
}