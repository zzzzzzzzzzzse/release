import { PoseidonEventDefine } from "../../Const/PoseidonEventDefine";
import PoseidonLogManager from "../../Manager/PoseidonLogManager";
import PoseidonSlotEventManager from "../../Manager/PoseidonSlotEventManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PoseidonLanguageSprite extends cc.Component {
    @property
    private id: number = 0;//多语言id
    @property
    private bundle: string = "";//bundle名
    @property
    private path: string = '';


    protected onLoad(): void {
        PoseidonSlotEventManager.instance.on(PoseidonEventDefine.LANGUAGE_CHANGED, this.setSprite, this);
        this.setSprite();
    }

    /**
     * 设置多语言图片
     */
    private setSprite(): void {
        let sprite = this.node.getComponent(cc.Sprite);
        if (!sprite) {
            PoseidonLogManager.instance.log('请将此节点挂在sprite下面');
            return;
        }
        // let str = LanguageManager.instance.getLanguageStringById(this.id);
        // if (!str) {
        //     LogManager.instance.log(this.id + '不在多语言配置表中,或配置表未加载完成');
        //     return;
        // }
    }
}
