import { PoseidonEventDefine } from "../../Const/PoseidonEventDefine";
import PoseidonLanguageManager from "../../Manager/PoseidonLanguageManager";
import PoseidonLogManager from "../../Manager/PoseidonLogManager";
import PoseidonSlotEventManager from "../../Manager/PoseidonSlotEventManager";
import PoseidonUtil from "../../Util/PoseidonUtil";

const { ccclass, property, menu } = cc._decorator;

/**
 * 多语言文本组建
 */
@ccclass
@menu('自定义组件/Language/PoseidonLanguageLabel')
export default class PoseidonLanguageLabel extends cc.Component {
    @property
    private id: string = "";//多语言id
    private params: any[] = [];

    protected onLoad(): void {
        this.setString();
        PoseidonSlotEventManager.instance.on(PoseidonEventDefine.LANGUAGE_CHANGED, this.setString, this);
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
            PoseidonLogManager.instance.log('请将此节点挂在label下面');
            return;
        }
        let str = PoseidonLanguageManager.instance.getLanguageStringById(this.id);
        str = PoseidonUtil.formateReplaceChar(str, this.params);
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
        PoseidonSlotEventManager.instance.off(this);
    }
}
