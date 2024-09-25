import { NewBankEventDefine } from "../../Const/NewBankEventDefine";
import NewBankLanguageManager from "../../Manager/NewBankLanguageManager";
import NewBankLogManager from "../../Manager/NewBankLogManager";
import NewBankSlotEventManager from "../../Manager/NewBankSlotEventManager";
import NewBankUtil from "../../Util/NewBankUtil";

const { ccclass, property, menu } = cc._decorator;

/**
 * 多语言文本组建
 */
@ccclass
@menu('自定义组件/Language/NewBankLanguageRichText')
export default class NewBankLanguageRichText extends cc.Component {
    @property
    private id: string = "";//多语言id

    private params: any[] = [];

    protected onLoad(): void {
        this.setString();
        NewBankSlotEventManager.instance.on(NewBankEventDefine.LANGUAGE_CHANGED, this.setString, this);
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
            NewBankLogManager.instance.log('请将此节点挂在RichText下面');
            return;
        }
        let str = NewBankLanguageManager.instance.getLanguageStringById(this.id);
        str = NewBankUtil.formateReplaceChar(str, this.params);
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
        NewBankSlotEventManager.instance.off(this);
    }
}
