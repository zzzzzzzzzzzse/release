import StoneAgeLogManager from "../../Manager/StoneAgeLogManager";
import StoneAgeComponentBase from "../ComponentBase/StoneAgeComponentBase";

const { ccclass, property, menu } = cc._decorator;
@ccclass
@menu('自定义组件/StoneAgeLabelStroke')
export default class StoneAgeLabelStroke extends StoneAgeComponentBase {
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
            StoneAgeLogManager.instance.warn('请把LabelStroke挂在label组件下');
            return;
        }
        label._checkStringEmpty = () => {
            label.markForRender(!!label.string);
            this.setString();
        }
        this.label = label;
        const strokeLabelNode = cc.instantiate(this.node);
        this.strokeLabel = strokeLabelNode.getComponent(cc.Label);
        strokeLabelNode.removeComponent(StoneAgeLabelStroke);
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
