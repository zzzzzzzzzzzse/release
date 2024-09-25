import { StoneAgeEventDefine } from "../../Const/StoneAgeEventDefine";
import StoneAgeLanguageManager from "../../Manager/StoneAgeLanguageManager";
import StoneAgeLogManager from "../../Manager/StoneAgeLogManager";
import StoneAgeSlotEventManager from "../../Manager/StoneAgeSlotEventManager";
import StoneAgeUtil from "../../Util/StoneAgeUtil";

const { ccclass, property, menu } = cc._decorator;

/**
 * 多语言文本组建
 */
@ccclass
@menu('自定义组件/Language/StoneAgeLanguageRichText')
export default class StoneAgeLanguageRichText extends cc.Component {
    @property
    private id: string = "";//多语言id

    private params: any[] = [];

    protected onLoad(): void {
        this.setString();
        StoneAgeSlotEventManager.instance.on(StoneAgeEventDefine.LANGUAGE_CHANGED, this.setString, this);
    }

    /**
     * 设置多语言文本
     */
    private setString(): void {
        if (!this.node.isValid) {
            return;
        }
        let richText = this.node.getComponent(cc.RichText);
        if (!richText) {
            StoneAgeLogManager.instance.log('请将此节点挂在RichText下面');
            return;
        }
        let str = StoneAgeLanguageManager.instance.getLanguageStringById(this.id);
        str = StoneAgeUtil.formateReplaceChar(str, this.params);
        richText.string = str || this.id || richText.string;
    }

    /**
     * 设置多语言id
     */
    public setLanguageId(id: string, params: any[] = []): void {
        this.id = id;
        this.params = params;
        this.setString();
    }

    protected onDestroy(): void {
        StoneAgeSlotEventManager.instance.off(this);
    }
}
