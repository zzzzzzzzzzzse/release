const {ccclass, property} = cc._decorator;

@ccclass
export default class CoinFly extends cc.Component {
    private nodePool: cc.NodePool;
    private time: number = 0;
    private startPosition: cc.Vec2 = cc.v2(0, 0);
    private endPosition: cc.Vec2 = cc.v2(0, 0);

    /**
     * 初始化
     * @param nodePool 节点缓存池
     * @param position 起始点
     * @param time 总时长
     */
    public init(nodePool: cc.NodePool, position: cc.Vec2, time: number) {
        this.nodePool = nodePool;
        this.time = time;
        this.node.active = true;
        this.node.setPosition(position);
    }

    /**
     * 获取终点，激活动画
     * @param position
     */
    public getEndPosition(position) {
        this.endPosition = cc.v2(position.x, position.y);
        this.move();
    }

    /**
     * 物件移动
     */
    public move() {
        let moveLocation = this.endPosition;
        this.node.runAction(this.throw(this.time, this.node.getPosition(), cc.v2(moveLocation.x, moveLocation.y)));
        cc.tween(this.node)
            .delay(this.time)
            .call(() => {
                this.crash();
            })
            .start();
    }

    /**
     * 贝塞尔抛物线函数
     * @param t 总时长
     * @param startPoint 起始点
     * @param endPoint 终点
     * @param height 抛物高度
     * @param angle 抛物角度
     */
    public throw(t: number, startPoint: cc.Vec2, endPoint: cc.Vec2): cc.ActionInterval {
        let q1 = cc.v2(startPoint.x, (endPoint.y + startPoint.y) / 2);
        let q2 = cc.v2(endPoint.x, (endPoint.y + startPoint.y) / 2);
        return cc.bezierTo(t, [q1, q2, endPoint]);
    }

    /**
     * 物件移动位置
     * @param moveLocation 目标点
     */
    public moveBackup(moveLocation: cc.Vec2) {
        let xEnd = moveLocation.x;
        let yEnd = moveLocation.y;
        var ar = cc.find('Canvas').convertToNodeSpaceAR(cc.v2(xEnd, yEnd));
        cc.tween(this.node)
            .to(1, {x: ar.x, y: ar.y})
            .start();
    }

    /**
     * 回收物件
     */
    public crash() {
        this.node.active = false;
        this.nodePool.put(this.node);
    }
}