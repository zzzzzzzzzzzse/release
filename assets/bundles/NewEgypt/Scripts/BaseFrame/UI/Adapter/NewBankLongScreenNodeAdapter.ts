
const { ccclass, property } = cc._decorator;

enum AdapterType {
    Width,
    Height,
}
cc.Enum(AdapterType);
@ccclass

export default class NewBankLongScreenNodeAdapter extends cc.Component {
    @property({
        type: AdapterType,
    })
    private adapterType: AdapterType = AdapterType.Width;
    @property
    private delta: number = 145;

    protected onLoad() {
        const size = cc.view.getVisibleSize();
        const scale = size.width / size.height;
        if (scale < 1.8) {
            return;
        }
        const node = this.node;
        switch (this.adapterType) {
            case AdapterType.Width: {
                node.width += this.delta;
                break;
            }
            case AdapterType.Height: {
                node.height += this.delta;
                break;
            }
        }
    }
}
