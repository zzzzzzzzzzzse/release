
const { ccclass, property, menu } = cc._decorator;
enum LayoutType {
    Horizontal,
    Vertical
}
cc.Enum(LayoutType);
@ccclass
@menu('自定义组件/Layout/NewBankLayoutEx')
export default class NewBankLayoutEx extends cc.Component {
    @property({
        type: LayoutType,
    })
    private type: LayoutType = LayoutType.Horizontal;
    @property
    private itemWidth: number = 100;
    @property
    private anchorX: number = 0.5;
    @property({
        visible() {
            return this.type == LayoutType.Horizontal;
        }
    })
    private left: number = 100;
    @property({
        visible() {
            return this.type == LayoutType.Horizontal;
        }
    })
    private right: number = 100;

    protected onLoad(): void {
        this.updatePos();
        this.addHandler();
    }

    private addHandler(): void {
        this.node.on(cc.Node.EventType.SIZE_CHANGED, this.updatePos, this);
    }

    private updatePos(): void {
        const chidren = this.node.children;
        for (let i = 0; i < chidren.length; i++) {
            const child = chidren[i];
            const x = this.getPosX(i);
            child.x = x;
        }
    }

    private getPosX(index: number): number {
        const width = this.node.width;
        const chidren = this.node.children;
        if (index == 0) {
            return this.left + this.itemWidth * this.anchorX;
        }
        if (index == chidren.length - 1) {
            return width - this.right - this.itemWidth * this.anchorX;
        }
        const midWith = width - this.left - this.right - this.itemWidth * 2;
        const midNum = chidren.length - 2;
        const grap = (midWith - this.itemWidth * midNum) / (midNum + 1);
        const x = this.left + this.itemWidth + index * (grap + this.itemWidth) - this.itemWidth * this.anchorX;
        return x;
    }
}
