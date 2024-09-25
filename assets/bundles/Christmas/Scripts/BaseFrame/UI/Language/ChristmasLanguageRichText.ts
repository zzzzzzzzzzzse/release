import { ChristmasEventDefine } from "../../Const/ChristmasEventDefine";
import ChristmasLanguageManager from "../../Manager/ChristmasLanguageManager";
import ChristmasLogManager from "../../Manager/ChristmasLogManager";
import ChristmasSlotEventManager from "../../Manager/ChristmasSlotEventManager";
import ChristmasUtil from "../../Util/ChristmasUtil";

const { ccclass, property, menu } = cc._decorator;

/**
 * 多语言文本组建
 */
@ccclass
@menu('自定义组件/Language/ChristmasLanguageRichText')
export default class ChristmasLanguageRichText extends cc.Component {
    @property
    private id: string = "";//多语言id

    private params: any[] = [];

    protected onLoad(): void {
        this.setString();
        ChristmasSlotEventManager.instance.on(ChristmasEventDefine.LANGUAGE_CHANGED, this.setString, this);
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
            ChristmasLogManager.instance.log('请将此节点挂在RichText下面');
            return;
        }
        let str = ChristmasLanguageManager.instance.getLanguageStringById(this.id);
        str = ChristmasUtil.formateReplaceChar(str, this.params);
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
        ChristmasSlotEventManager.instance.off(this);
    }
}
