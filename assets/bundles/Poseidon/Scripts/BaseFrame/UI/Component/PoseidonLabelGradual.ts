import PoseidonLogManager from "../../Manager/PoseidonLogManager";
import PoseidonComponentBase from "../ComponentBase/PoseidonComponentBase";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu('自定义组件/PoseidonLabelGradual')
export default class PoseidonLabelGradual extends PoseidonComponentBase {
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
            PoseidonLogManager.instance.log('请把LabelGradual挂在cc.Label下面');
            return;
        }
        const labelMaterial = label.getMaterial(0);
        labelMaterial.setProperty('beginColor', this.beginColor);
        labelMaterial.setProperty('endColor', this.endColor);
    }
}
