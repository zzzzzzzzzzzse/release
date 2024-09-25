import ChristmasLogManager from "../../Manager/ChristmasLogManager";
import ChristmasComponentBase from "../ComponentBase/ChristmasComponentBase";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu('自定义组件/ChristmasLabelGradual')
export default class ChristmasLabelGradual extends ChristmasComponentBase {
    @property(cc.Color)
    private beginColor: cc.Color = null;
    @property(cc.Color)
    private endColor: cc.Color = null;

    protected onLoad(): void {
        this.updateColor();
    }

    private updateColor(): void {
        const label = this.node.getComponent(cc.Label);
        if (!label) {
            ChristmasLogManager.instance.log('请把LabelGradual挂在cc.Label下面');
            return;
        }
        const labelMaterial = label.getMaterial(0);
        labelMaterial.setProperty('beginColor', this.beginColor);
        labelMaterial.setProperty('endColor', this.endColor);
    }
}
