import NewBankLogManager from "../../Manager/NewBankLogManager";
import NewBankComponentBase from "../ComponentBase/NewBankComponentBase";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu('自定义组件/NewBankLabelGradual')
export default class NewBankLabelGradual extends NewBankComponentBase {
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
            NewBankLogManager.instance.log('请把LabelGradual挂在cc.Label下面');
            return;
        }
        const labelMaterial = label.getMaterial(0);
        labelMaterial.setProperty('beginColor', this.beginColor);
        labelMaterial.setProperty('endColor', this.endColor);
    }
}
