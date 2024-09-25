
const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu('自定义组件/Mask/RoundRectMask')
export default class ChristmasRoundRectMask extends cc.Component {
    @property(cc.Integer)
    private r: number = 3;//圆角弧度

    private mask: any;

    protected onLoad() {
        const mask = this.node.getComponent(cc.Mask) as any;
        mask._updateGraphics = this._updateGraphics.bind(this);
        this.mask = mask;
    }

    _updateGraphics() {
        const mask = this.mask;
        if (!mask.enabledInHierarchy) return;
        let node = mask.node;
        let graphics = mask._graphics as cc.Graphics;
        graphics.clear(false);
        let width = node._contentSize.width;
        let height = node._contentSize.height;
        let x = -width * node._anchorPoint.x;
        let y = -height * node._anchorPoint.y;
        graphics.roundRect(x, y, width, height, this.r);
        if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
            graphics.stroke();
        }
        else {
            graphics.fill();
        }
    }

}
