
import NewBankComponentBase from "../ComponentBase/NewBankComponentBase";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu('自定义组件/PageView/PageViewIndicatorItem')
export default class NewBankPageViewIndicatorItem extends NewBankComponentBase {
    @property(cc.Node)
    private normalNode: cc.Node = null;
    @property(cc.Node)
    private selectNode: cc.Node = null;

    public setStatus(select: boolean): void {
        this.normalNode && (this.normalNode.active = !select);
        this.selectNode && (this.selectNode.active = select);
    }
}
