const {ccclass, property} = cc._decorator;

@ccclass
export default class SwingItem extends cc.Component {

    private nodePool: cc.NodePool = null;

    public stop: boolean = true;

    private time: number = 0;

    private times: number = 0;

    private frequency: number = 0;

    private startPosition = cc.v3(0, 0, 0);

    private endPosition = cc.v3(0, 0, 0);

    private doReturn: boolean = false;

    private isTwink: boolean = false;

    protected onLoad(): void {
    }

    public update(dt: number) {
        // if (this.stop) return;
        // if (this.times % 1 === 0) {
        //     this.fall();
        // }
        // if (this.times >= 120) {
        //     this.crash();
        // }
        // this.times++;
    }

    public move() {
        if (!this.isTwink)
            this.twink();
        if (!this.doReturn) {
            let moving = cc.tween(this.node).by(this.time, {position: this.endPosition});
            cc.tween(this.node)
                .tag(1)
                .then(moving)
                .call(() => {
                    this.crash();
                })
                .start()
        } else {
            console.log(this.startPosition, this.endPosition);
            let moving = cc.tween(this.node).by(this.time, {position: this.endPosition}).delay(0.5).to(this.time, {position: this.startPosition}).delay(0.5);
            cc.tween(this.node)
                .tag(1)
                .then(moving)
                .repeatForever()
                .start()
        }
    }

    /**
     * * 初始化
     * @param nodePool
     * @param position
     * @param endPosition
     * @param time
     * @param scale
     * @param frequency
     * @param rotate
     * @param doReturn
     */
    public init(nodePool: cc.NodePool, position: cc.Vec2, endPosition: cc.Vec2, time: number, scale: number, frequency: number, rotate: number, doReturn: boolean) {
        this.nodePool = nodePool;
        this.times = 0;
        this.time = time;
        this.node.active = true;
        this.node.scale = scale;
        this.node.angle = rotate;
        this.startPosition.x = position.x;
        this.startPosition.y = position.y;
        this.node.setPosition(position);
        this.endPosition.x = endPosition.x;
        this.endPosition.y = endPosition.y;
        this.doReturn = doReturn;
        this.frequency = frequency;
    }

    /**
     * 萤火虫闪烁
     */
    public twink() {
        let twinkling = cc.tween(this.node).by(this.frequency, {
            opacity: -200,
            scale: -0.8,
        }).by(this.frequency, {opacity: 200, scale: 0.8});
        cc.tween(this.node)
            .then(twinkling)
            .repeatForever()
            .start();
        this.isTwink = true;
    }

    public crash() {
        this.node.active ? this.node.active = false : this.stop = true;
        if (this.doReturn) cc.Tween.stopAllByTag(1);
        this.node.setPosition(0, 0);
        this.nodePool.put(this.node);
    }
}
