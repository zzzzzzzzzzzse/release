import ChristmasComponentBase from "../ComponentBase/ChristmasComponentBase";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu('自定义组件/ChristmasSpriteGray')
export default class ChristmasSpriteGray extends ChristmasComponentBase {
    @property(cc.Material)
    private normalMaterial: cc.Material = null;
    @property(cc.Material)
    private grayMaterial: cc.Material = null;
    private renderComponent: cc.RenderComponent = null;
    private _gray: boolean = false;

    protected onLoad() {
        this.setMaterial();
    }

    /**
     * 更新材质
     */
    private setMaterial(): void {
        this.renderComponent = this.node.getComponent(cc.RenderComponent);
        const mtl = this._gray ? this.grayMaterial : this.normalMaterial;
        this.renderComponent.setMaterial(0, mtl);
    }

    /**
     * 设置材质属性
     * @param area 距离mask左边多少范围开始渐隐
     * @param wp_x mask的世界坐标
     */
    public set gray(value: boolean) {
        this._gray = value;
        this.setMaterial();
    }
}
