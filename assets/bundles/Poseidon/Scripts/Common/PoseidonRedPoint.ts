import PoseidonComponentBase from "../BaseFrame/UI/ComponentBase/PoseidonComponentBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PoseidonRedPoint extends PoseidonComponentBase {
    @property(cc.Label)
    private numLabel: cc.Label = null;

    /**
     * 设置红点数量
     */
    public setNum(num: number): void {
        this.node.active = num > 0;
        const str = '' + (num > 99 ? '...' : num);
        this.numLabel.string = str;
    }
}
