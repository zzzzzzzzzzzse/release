import ChristmasLogManager from "../../Manager/ChristmasLogManager";
import ChristmasComponentBase from "../ComponentBase/ChristmasComponentBase";

const { ccclass, property, menu } = cc._decorator;
@ccclass
@menu('自定义组件/ChristmasLabelStroke')
export default class ChristmasLabelStroke extends ChristmasComponentBase {
    @property(cc.Color)
    private strokeColor: cc.Color = new cc.Color();
    @property
    private deltaX: number = 3;
    @property
    private deltaY: number = 3;

    private label: cc.Label = null;
    private strokeLabel: cc.Label = null;

    protected onLoad(): void {
        const label = this.node.getComponent(cc.Label) as any;
        if (!label) {
            ChristmasLogManager.instance.warn('请把LabelStroke挂在label组件下');
            return;
        }
        label._checkStringEmpty = () => {
            label.markForRender(!!label.string);
            this.setString();
        }
        this.label = label;
        const strokeLabelNode = cc.instantiate(this.node);
        this.strokeLabel = strokeLabelNode.getComponent(cc.Label);
        strokeLabelNode.removeComponent(ChristmasLabelStroke);
        const labelOutline = strokeLabelNode.getComponent(cc.LabelOutline);
        labelOutline && (labelOutline.color = this.strokeColor);
        this.node.parent.addChild(strokeLabelNode);
        this.node.setSiblingIndex(this.node.parent.children.length);
        strokeLabelNode.x = this.label.node.x + this.deltaX;
        strokeLabelNode.y = this.label.node.y - this.deltaY;
        strokeLabelNode.color = this.strokeColor;
        this.setString();
    }

    private setString(): void {
        this.strokeLabel.string = this.label.string;
    }

    public hide(): void {
        this.strokeLabel.node.active = false;
    }

    public show(): void {
        this.strokeLabel.node.active = true;
    }
}
