import RichUtil from "../../Util/RichUtil";
import RichDialogBase from "../Dialog/RichDialogBase";
import LanguageLabel from "../Language/RichLanguageLabel";
import LanguageRichText from "../Language/RichLanguageRichText";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RichCommonPrompts extends RichDialogBase {
    @property(cc.Node)
    private downArrow: cc.Node = null;
    @property(cc.Node)
    private upArrow: cc.Node = null;
    @property(LanguageLabel)
    private titleLabel: LanguageLabel = null;
    @property(LanguageRichText)
    private detailRichText: LanguageRichText = null;
    @property(cc.Node)
    private textNode: cc.Node = null;

    private wPos: cc.Vec2;
    private refWPos: cc.Vec2;

    protected onLoad(): void {
        const data = this.getData();
        const titleLanguageKey = data.titleLanguageKey || '';
        const detailLanguageKey = data.detailLanguageKey;
        this.wPos = data.wPos;
        const params = data.params || [];
        this.refWPos = data.refWPos;//对称点的世界坐标
        this.show(titleLanguageKey, detailLanguageKey, params);
    }

    private show(titleLanguageKey: string, detailLanguageLey: string, params: any[]): void {
        if (titleLanguageKey) {
            this.titleLabel.node.on(cc.Node.EventType.SIZE_CHANGED, this.updatePos, this);
        }
        else {
            this.setTimeOut(this.updatePos.bind(this), 0.1);
        }
        this.detailRichText.setLanguageId(detailLanguageLey, params);
        this.titleLabel.setLanguageId(titleLanguageKey);
        this.titleLabel.node.active = !!titleLanguageKey;
        this.conNode.opacity = 0;
        this.upArrow.active = false;
        this.downArrow.active = false;
    }

    private updatePos(): void {
        this.textNode.width = Math.max(this.detailRichText.node.width, this.titleLabel.node.width);
        this.conNode.width = this.textNode.width + 40;
        this.conNode.height = this.textNode.height + 50;
        const nPos = this.node.convertToNodeSpaceAR(this.wPos);
        const refNpos = this.refWPos ? this.node.convertToNodeSpaceAR(this.refWPos) : null;
        this.conNode.x = nPos.x;
        this.conNode.y = nPos.y + this.conNode.height * this.conNode.anchorY;
        this.conNode.opacity = 255;
        this.upArrow.active = true;
        this.downArrow.active = true;
        const size = cc.view.getVisibleSize();
        const isTop = refNpos && this.conNode.y + this.conNode.height < size.height / 2 - 10;

        this.upArrow.x = nPos.x;
        this.upArrow.y = nPos.y;
        this.downArrow.x = nPos.x;
        this.downArrow.y = nPos.y - 4;

        //如果上边超出屏幕，进行翻转
        if (!isTop) {
            this.conNode.y -= 2 * (this.conNode.y - refNpos.y);
            this.upArrow.y -= 2 * (this.upArrow.y - refNpos.y) - 4;
        }
        const isLongScreen = RichUtil.isLongScreen();
        const left = 10;
        const right = 10;
        const minX = isLongScreen ? -size.width / 2 + left + 60 : -size.width / 2 + 10;
        const maxX = isLongScreen ? size.width / 2 - right - 60 : size.width / 2 - 10;
        //如果左边超出屏幕
        if (this.conNode.x - this.conNode.width / 2 <= minX) {
            this.conNode.x = minX + this.conNode.anchorX * this.conNode.width;
        }
        if (this.conNode.x + this.conNode.width / 2 >= maxX) {
            this.conNode.x = maxX - this.conNode.anchorX * this.conNode.width;
        }

        const delta = 20;//箭头相对背景框的左右的最小距离
        this.upArrow.active = this.upArrow.x > minX + delta && this.upArrow.x < maxX - delta && !isTop;
        this.downArrow.active = this.downArrow.x > minX + delta && this.downArrow.x < maxX - delta && isTop;
    }
}
