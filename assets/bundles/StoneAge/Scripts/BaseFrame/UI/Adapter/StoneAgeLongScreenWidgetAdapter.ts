import StoneAgeLogManager from "../../Manager/StoneAgeLogManager";

const { ccclass, property } = cc._decorator;

enum AdapterType {
    Left,
    Right,
    LeftAndRight
}
cc.Enum(AdapterType);

@ccclass
export default class StoneAgeLongScreenWidgetAdapter extends cc.Component {
    @property({
        type: AdapterType,
    })
    private adapterType: AdapterType = AdapterType.Left;
    @property({
        visible() {
            return this.adapterType == AdapterType.LeftAndRight;
        }
    })
    private left: number = 60;
    @property({
        visible() {
            return this.adapterType == AdapterType.LeftAndRight;
        }
    })
    private right: number = 60;
    @property({
        visible() {
            return this.adapterType != AdapterType.LeftAndRight;
        }
    })
    private delta: number = 60;

    protected onLoad() {
        const size = cc.view.getVisibleSize();
        const scale = size.width / size.height;
        if (scale < 1.8) {
            return;
        }
        const widget = this.node.getComponent(cc.Widget);
        if (!widget) {
            StoneAgeLogManager.instance.err('请把此控件挂在包含widget的节点上面');
            return;
        }
        switch (this.adapterType) {
            case AdapterType.Left: {
                widget.left += this.delta;
                break;
            }
            case AdapterType.Right: {
                widget.right += this.delta;
                break;
            }
            case AdapterType.LeftAndRight: {
                widget.left += this.left;
                widget.right += this.right;
                break;
            }
        }
        widget.updateAlignment();
    }
}
