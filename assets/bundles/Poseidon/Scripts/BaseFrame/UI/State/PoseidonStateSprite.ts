/**
 * 精灵状态
 */
import StateBase from "./PoseidonStateBase";
const { ccclass, property } = cc._decorator;
var isActive: boolean = true;
@ccclass
export default class PoseidonStateSprite extends StateBase {
    @property({ visible: isActive, readonly: true })
    public sSpriteFrame: cc.SpriteFrame = new cc.SpriteFrame();
    @property({ visible: isActive, readonly: true })
    public nSpriteFrame: cc.SpriteFrame = new cc.SpriteFrame();

    public setNormalData(target: cc.Node) {
        super.setNormalData(target);
        this.nSpriteFrame = target.getComponent(cc.Sprite).spriteFrame;
    }

    public setSpecialData(target: cc.Node) {
        super.setSpecialData(target);
        this.sSpriteFrame = target.getComponent(cc.Sprite).spriteFrame;
    }

    public changeNormalState() {
        super.changeNormalState();
        this.node.getComponent(cc.Sprite).spriteFrame = this.nSpriteFrame;
    }

    public changeSpecialState() {
        super.changeSpecialState();
        this.node.getComponent(cc.Sprite).spriteFrame = this.sSpriteFrame;
    }
}


