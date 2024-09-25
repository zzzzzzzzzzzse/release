import ButtonEx from "./PoseidonButtonEx";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu('自定义组件/PoseidonToggleEx')
export default class PoseidonToggleEx extends ButtonEx {
    @property(cc.Node)
    private normalNode: cc.Node = null;
    @property(cc.Node)
    private selectNode: cc.Node = null;
    @property(cc.Node)
    private thumbNode: cc.Node = null;
    @property(cc.Vec2)
    private thumbNormalPos: cc.Vec2 = new cc.Vec2(0, 0);
    @property(cc.Vec2)
    private thumbSelectPos: cc.Vec2 = new cc.Vec2(0, 0);
    @property
    private isSelect: boolean = false;

    private toggleAni: cc.Animation = null;
    private _selectCallback: Function = null;

    public onLoad(): void {
        this.toggleAni = this.node.getComponent(cc.Animation);
        this.clickCallback = this.click.bind(this);
        this.toggleAni && this.toggleAni.on('finished', this.selectChanged, this);
        this.updateUI();
    }

    private click(): void {
        this.isSelect = !this.isSelect;
        if (this.toggleAni) {
            const state = this.toggleAni.play();
            state.wrapMode = this.isSelect ? cc.WrapMode.Reverse : cc.WrapMode.Normal;
            return;
        }
        this.selectChanged();
    }

    private selectChanged(): void {
        this._selectCallback && this._selectCallback(this.isSelect);
        this.updateUI();
    }

    public set selectCallback(value: Function) {
        this._selectCallback = value;
    }

    public setStatus(isSelect: boolean): void {
        if (this.isSelect == isSelect) {
            return;
        }
        this.isSelect = isSelect;
        this.selectChanged();
    }

    private updateUI(): void {
        const descPos = this.isSelect ? this.thumbSelectPos : this.thumbNormalPos;
        this.normalNode.active = !this.isSelect;
        this.selectNode.active = this.isSelect;
        if (this.thumbNode) {
            this.thumbNode.x = descPos.x;
            this.thumbNode.y = descPos.y;
        }
    }
}
