
import ChristmasComponentBase from "../ComponentBase/ChristmasComponentBase";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu('自定义组件/PageView/PageViewIndicatorItem')
export default class ChristmasPageViewIndicatorItem extends ChristmasComponentBase {
    @property(cc.Node)
    private normalNode: cc.Node = null;
    @property(cc.Node)
    private selectNode: cc.Node = null;

    public setStatus(select: boolean): void {
        this.normalNode && (this.normalNode.active = !select);
        this.selectNode && (this.selectNode.active = select);
    }
}
