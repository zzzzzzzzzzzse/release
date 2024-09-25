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
@menu('自定义组件/Language/StoneAgeLanguageLabel')
export default class StoneAgeLanguageLabel extends cc.Component {
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
        let label = this.node.getComponent(cc.Label);
        if (!label) {
            StoneAgeLogManager.instance.log('请将此节点挂在label下面');
            return;
        }
        let str = StoneAgeLanguageManager.instance.getLanguageStringById(this.id);
        str = StoneAgeUtil.formateReplaceChar(str, this.params);
        str && (label.string = str);
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
