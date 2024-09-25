
const { ccclass, property } = cc._decorator;

@ccclass
export class CheckBox extends cc.Component {

    @property
    private checked: boolean = false;
    @property(cc.Node)
    private mark: cc.Node = null;

    protected onLoad() {
        this.mark.active = this.checked;
        this.node.on("click", this.onNodeClick.bind(this));
    }

    public get isChecked() {
        return this.checked;
    }

    public setCheck(value: boolean) {
        this.checked = value;
        this.mark.active = value;
    }

    public check(value: boolean) {
        this.checked = value;
        this.mark.active = value;
        this.node.emit("check-change", value);
    }

    private onNodeClick() {
        this.check(!this.checked);
    }
}