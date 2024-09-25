import { RichEventDefine } from "../../Const/RichEventDefine";
import RichLanguageManager from "../../Manager/RichLanguageManager";
import RichLogManager from "../../Manager/RichLogManager";
import RichSlotEventManager from "../../Manager/RichSlotEventManager";
import RichUtil from "../../Util/RichUtil";

const { ccclass, property, menu } = cc._decorator;

/**
 * 多语言文本组建
 */
@ccclass
@menu('自定义组件/Language/RichLanguageRichText')
export default class RichLanguageRichText extends cc.Component {
    @property
    private id: string = "";//多语言id

    private params: any[] = [];

    protected onLoad(): void {
        this.setString();
        RichSlotEventManager.instance.on(RichEventDefine.LANGUAGE_CHANGED, this.setString, this);
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
            RichLogManager.instance.log('请将此节点挂在RichText下面');
            return;
        }
        let str = RichLanguageManager.instance.getLanguageStringById(this.id);
        str = RichUtil.formateReplaceChar(str, this.params);
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
        RichSlotEventManager.instance.off(this);
    }
}
