
import PoseidonComponentBase from "../ComponentBase/PoseidonComponentBase";
import PoseidonSpineFadeOut from "./PoseidonSpineFadeOut";
import SpriteFadeOut from "./PoseidonSpriteFadeOut";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu('自定义组件/Mask/PoseidonFadeOutMask')
export default class PoseidonFadeOutMask extends PoseidonComponentBase {
    @property(cc.Node)
    private maskNode: cc.Node = null;
    @property
    private left: number = 43;//左边距离遮罩开始的距离
    @property
    private rightNeedFadeOut: boolean = false;//左边距离遮罩开始的距离

    protected onLoad() {
        this.maskNode.on(cc.Node.EventType.POSITION_CHANGED, this.updateFadeOutProp, this);
        this.updateFadeOutProp();
    }

    /**
     * 更新渐隐组件的材质属性
     */
    public updateFadeOutProp(): void {
        const nodePos = this.maskNode.getPosition();
        const wPos = this.maskNode.convertToWorldSpaceAR(nodePos.sub(new cc.Vec2(this.maskNode.width * this.maskNode.anchorX, 0)));

        //获取挂在渐隐组件的列表，如果动态创建的组建，需要在创建完成之后手动调用一下该方法
        const spriteFadeOutList = this.maskNode.getComponentsInChildren(SpriteFadeOut);
        for (let i = 0; i < spriteFadeOutList.length; i++) {
            spriteFadeOutList[i].setFadeOutProp(this.left, wPos.x, this.rightNeedFadeOut, this.maskNode.width);
        }
        const spineFadeOutList = this.maskNode.getComponentsInChildren(PoseidonSpineFadeOut);
        for (let i = 0; i < spineFadeOutList.length; i++) {
            spineFadeOutList[i].setFadeOutProp(this.left, wPos.x, this.rightNeedFadeOut, this.maskNode.width);
        }
    }
}
