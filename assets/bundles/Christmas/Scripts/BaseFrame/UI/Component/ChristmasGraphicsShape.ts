
const { ccclass, property, menu } = cc._decorator;

enum Shape {
    ROUNDRECT,
    RECT,
}

cc.Enum(Shape);

@ccclass
@menu('自定义组件/ChristmasGraphicsShape')
export default class ChristmasGraphicsShape extends cc.Component {
    @property({ type: Shape })
    private shape: Shape = Shape.ROUNDRECT;
    @property(cc.Color)
    private color: cc.Color = new cc.Color(0, 0, 0);
    @property({
        type: cc.Integer,
        visible: function () {
            return this.shape == Shape.ROUNDRECT;
        }
    })
    private r: number = 0;
    @property({
        type: cc.Integer
    })
    private lineWidth: number = 1;
    @property
    private isFill: boolean = true;
    private graphics: cc.Graphics = null;

    protected onLoad(): void {
        this.node.addComponent(cc.Graphics);
        this.graphics = this.node.getComponent(cc.Graphics);
        this.graphicsShape();
    }

    private graphicsShape(): void {
        const graphics = this.graphics;
        graphics.clear(false);
        let width = this.node.width;
        let height = this.node.height;
        let x = -width * this.node.anchorX;
        let y = -height * this.node.anchorY;
        graphics.lineWidth = this.lineWidth;
        switch (this.shape) {
            case Shape.ROUNDRECT: {
                graphics.roundRect(x, y, width, height, this.r);
                break;
            }
            case Shape.RECT: {
                graphics.rect(x, y, width, height);
                break;
            }
        }

        let color = new cc.Color(this.color.r, this.color.g, this.color.b, this.color.a);
        if (this.isFill) {
            graphics.fillColor = color;
            graphics.fill();
        }
        else {
            graphics.strokeColor = color;
            graphics.stroke();
        }
    }
}
