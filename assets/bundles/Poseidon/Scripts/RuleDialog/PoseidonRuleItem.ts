import { BundleType } from "../BaseFrame/Const/PoseidonCommonDefine";
import PoseidonLogManager from "../BaseFrame/Manager/PoseidonLogManager";
import PoseidonSlotResManager from "../BaseFrame/Manager/PoseidonSlotResManager";
import LanguageRichText from "../BaseFrame/UI/Language/PoseidonLanguageRichText";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PoseidonRuleItem extends cc.Component {
    @property(cc.Sprite)
    bgSprite: cc.Sprite = null;
    @property(cc.Node)
    richTextConNode: cc.Node = null;

    public async updateItem(data: any) {
        PoseidonLogManager.instance.info("[PoseidonRuleItem] updateItem data:", data);
        this.richTextConNode.removeAllChildren();
        //设置大图
        this.bgSprite.spriteFrame = null;
        let res: cc.SpriteFrame = null;
        if (data.pngName) {
            res = await PoseidonSlotResManager.instance.loadByBundle(BundleType.STONE_AGE, "Textures/Bg/" + data.pngName, cc.SpriteFrame);
        }
        if (null != this.bgSprite.node && this.bgSprite.node.isValid) {
            this.bgSprite.node.getComponent(cc.Sprite).spriteFrame = res;
        }
        this.bgSprite.spriteFrame = res;
        let atlas: cc.SpriteAtlas = await PoseidonSlotResManager.instance.loadByBundle(BundleType.STONE_AGE, "Atlas/rules_txt_icon_stone_age", cc.SpriteAtlas);
        if (null == this.bgSprite.node && !this.richTextConNode.isValid) {
            return;
        }
        //设置文字
        for (let index = 0; index < data.richTextKey.length; index++) {
            const textId = data.richTextKey[index];
            var node = new cc.Node('richTextNode');
            node.parent = this.richTextConNode;
            var richText: cc.RichText = node.addComponent(cc.RichText);
            richText.imageAtlas = atlas;
            richText.lineHeight = data.lineHeight[index];
            let tsLanguageRichText: LanguageRichText = <LanguageRichText>node.addComponent("LanguageRichText");
            tsLanguageRichText.setLanguageId(textId);
            node.setPosition(data.positonX[index], data.positonY[index]);
            richText.handleTouchEvent = false;
            node.setAnchorPoint(data.anchorX[index], data.anchorY[index]);
        }

    }
}
