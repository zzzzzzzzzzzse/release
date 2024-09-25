const {ccclass, property} = cc._decorator;

@ccclass
export default class ExploreItem extends cc.Component {

    private nodePool: cc.NodePool = null;

    public stop: boolean = true;

    private speed: number = 0;

    private moveAngle: number = 0;

    private duration: number = 0;

    private times: number = 0;

    private roll: boolean = false;

    protected onLoad(): void {

    }

    public update(dt: number) {
        if (this.stop) return;
        if (this.times % 1 === 0) {
            this.explore();
        }
        if (this.times >= this.duration) {
            this.crash();
        }
        this.times++;
    }

    /**
     * 初始化
     * @param position 玩家位置
     * @param nodePool 回收池
     * @param speed 速度
     * @param duration 时间
     * @param angle 角度
     * @param scale 缩放
     * @param roll 自转
     */
    public init(nodePool: cc.NodePool, position: cc.Vec2, speed: number, duration: number, angle: number, scale: number, roll: boolean) {
        this.nodePool = nodePool;
        this.times = 0;
        this.speed = speed;
        this.duration = duration;
        this.roll = roll;
        this.moveAngle = angle / 180 * Math.PI;
        if (!roll)
            this.node.angle = angle;
        this.node.scale = scale;
        this.node.active = true;
        this.node.setPosition(position);
    }

    public explore() {
        let currX = this.node.x;
        let currY = this.node.y;
        this.node.x = currX + (this.speed * Math.sin(this.moveAngle) * -1);
        this.node.y = currY + (this.speed * Math.cos(this.moveAngle));
        if (this.roll) {
            this.node.angle += Math.floor(Math.random() * 20);
        }
    }

    public crash() {
        this.stop = true;
        cc.tween(this.node)
            .to(0.2, {scale: this.node.scale / 2})
            .to(0.2, {opacity: 0})
            .call(() => {
                this.node.active = false;
                this.node.opacity = 255;
                this.node.setPosition(0, 0);
                this.nodePool.put(this.node);
            })
            .start();
    }
}

