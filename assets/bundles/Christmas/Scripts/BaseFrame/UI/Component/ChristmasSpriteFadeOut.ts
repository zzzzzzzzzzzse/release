
import ChristmasComponentBase from "../ComponentBase/ChristmasComponentBase";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu('自定义组件/ChristmasSpriteFadeOut')
export default class ChristmasSpriteFadeOut extends ChristmasComponentBase {
    @property(cc.EffectAsset)
    private effect: cc.EffectAsset = null;

    private renderComponent: cc.RenderComponent = null;
    private mtl: cc.Material = null;

    protected onLoad() {
        this.createMaterial();
        this.setMaterial();
    }

    /**
     * 创建材质
     */
    private createMaterial(): void {
        if (this.mtl) {
            return;
        }
        const mtl = cc.Material.create(this.effect);
        this.mtl = mtl;
    }

    /**
     * 更新材质
     */
    private setMaterial(): void {
        this.renderComponent = this.node.getComponent(cc.RenderComponent);
        this.renderComponent.setMaterial(0, this.mtl);
    }

    /**
     * 设置材质属性
     * @param area 距离mask左边多少范围开始渐隐
     * @param wp_x mask的世界坐标
     */
    public setFadeOutProp(area: number, wp_x: number, rightNeedFadeOut: boolean = false, maskWidth: number = 0): void {
        if (!this.mtl) {
            this.createMaterial();
        }
        let mtl = this.mtl;
        mtl.setProperty('area', area);
        mtl.setProperty('wp_x', wp_x);
        if (rightNeedFadeOut) {
            mtl.define('RIGHT_NEED_FADEOUT', true);
            mtl.setProperty('maskWidth', maskWidth);
        }
    }
}
