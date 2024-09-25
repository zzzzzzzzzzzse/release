import { ChristmasEventDefine } from "../../Const/ChristmasEventDefine";
import ChristmasLogManager from "../../Manager/ChristmasLogManager";
import ChristmasSlotEventManager from "../../Manager/ChristmasSlotEventManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ChristmasLanguageSprite extends cc.Component {
    @property
    private id: number = 0;//多语言id
    @property
    private bundle: string = "";//bundle名
    @property
    private path: string = '';


    protected onLoad(): void {
        ChristmasSlotEventManager.instance.on(ChristmasEventDefine.LANGUAGE_CHANGED, this.setSprite, this);
        this.setSprite();
    }

    /**
     * 设置多语言图片
     */
    private setSprite(): void {
        let sprite = this.node.getComponent(cc.Sprite);
        if (!sprite) {
            ChristmasLogManager.instance.log('请将此节点挂在sprite下面');
            return;
        }
        // let str = LanguageManager.instance.getLanguageStringById(this.id);
        // if (!str) {
        //     LogManager.instance.log(this.id + '不在多语言配置表中,或配置表未加载完成');
        //     return;
        // }
    }
}
