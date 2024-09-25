const {ccclass, property} = cc._decorator;

@ccclass
export default class WinCoin extends cc.Component {
    private nodePool: cc.NodePool;
    private time: number = 0;
    private endPosition: cc.Vec2 = cc.v2(0, 0);
    private moveAngel: number = 0;
    private moveHeight: number = 0;

    /**
     * 初始化
     * @param nodePool 节点缓存池
     * @param position 起始点
     * @param angle 抛物角度
     * @param height 抛物高度
     * @param time 总时长
     * @param scale 缩放
     * @param rotate 自转角度
     */
    public init(nodePool: cc.NodePool, position: cc.Vec2, angle: number, height: number, time: number, scale: number, rotate: number) {
        this.nodePool = nodePool;
        this.time = time;
        this.moveAngel = angle;
        this.moveHeight = height;
        this.node.active = true;
        this.node.scale = scale;
        this.node.angle = rotate;
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
        let angle = Math.floor(Math.random() * 50 + 10);
        let height = Math.floor(Math.random() * 30 + 70);
        this.node.runAction(this.throw(this.time, cc.v2(0, 0), cc.v2(moveLocation.x, moveLocation.y), this.moveHeight, this.moveAngel));
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
    public throw(t: number, startPoint: cc.Vec2, endPoint: cc.Vec2, height: number, angle: number): cc.ActionInterval {
        let radian = angle * Math.PI / 180;
        let qlx = startPoint.x + (endPoint.x - startPoint.x) / 4;
        let q1 = cc.v2(qlx, height + startPoint.y + Math.cos(radian) * Math.abs(qlx));
        let q2x = startPoint.x + (endPoint.x - startPoint.x) / 2;
        let q2 = cc.v2(q2x, height + startPoint.y + Math.cos(radian) * Math.abs(q2x));
        return cc.bezierTo(t, [q1, q2, endPoint]);
    }

    /**
     * 物件移动位置
     * @param moveLocation 目标点
     */
    public moveBackup(moveLocation: cc.Vec2) {
        let xEnd = moveLocation.x;
        let yEnd = moveLocation.y;
        var aaa = cc.find('Canvas').convertToNodeSpaceAR(cc.v2(xEnd, yEnd));
        cc.tween(this.node)
            .to(1, {x: aaa.x, y: aaa.y})
            // .to(1, {position: {value: aaa, easing: 'quartOut'}})
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