
import ChristmasLogManager from "../../Manager/ChristmasLogManager";
import ButtonEx from "../Component/ChristmasButtonEx";
import ChristmasDialogBase from "../Dialog/ChristmasDialogBase";
import LanguageLabel from "../Language/ChristmasLanguageLabel";
import LanguageRichText from "../Language/ChristmasLanguageRichText";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ChristmasCommonDialog extends ChristmasDialogBase {
    @property(LanguageRichText)
    private contentLabel: LanguageRichText = null;//提示文本
    @property(LanguageLabel)
    private titleStrokeLabel: LanguageLabel = null;//标题文本
    @property(LanguageLabel)
    private titleLabel: LanguageLabel = null;//标题文本
    @property(LanguageLabel)
    private confirmLabel: LanguageLabel = null;//确定按钮的文本
    @property(LanguageLabel)
    private cancelLabel: LanguageLabel = null;//取消按钮的文本
    @property(ButtonEx)
    private confirmBtn: ButtonEx = null;//确定按钮
    @property(ButtonEx)
    private cancelBtn: ButtonEx = null;//取消按钮

    @property([cc.Color])
    private fontColor: cc.Color[] = [];
    @property([cc.Color])
    private fontStorkeColor: cc.Color[] = [];

    @property(cc.Node)
    private content: cc.Node = null;

    public onLoad(): void {
        this.confirmBtn.clickCallback = this.onConfirm.bind(this);
        this.cancelBtn.clickCallback = this.onCancel.bind(this);
        const data = this.getData();
        this.updateUI(data.popupKey || '');
    }

    public openAnimation(): void {
        this.conNode.scale = 0.5;
        cc.tween(this.conNode)
            .to(this.openAnimTime, { scale: 1 }, {
                easing: 'backOut'
            })
            .start();
    }

    public closeAnimation() {
        if (this.closeAnimTime <= 0) {
            this.node.opacity = 255;
            this.closeCallback();
        }
        else {
            cc.tween(this.node)
                .to(this.closeAnimTime, { opacity: 0 }, {
                    easing: 'fade'
                }).call(() => {
                    this.node.opacity = 255;
                    this.closeCallback();
                })
                .start();
        }
    }

    /**
     * 显示提示文本，请在onLoad方法执行之后调用
     */
    private async updateUI(popupKey: string) {
        // const popupData: Popup = ConfigProxy.instance.getConfigData('Popup')[popupKey] || {};
        // this.titleStrokeLabel.setLanguageId(popupData.title);
        // this.titleLabel.setLanguageId(popupData.title);
        // const params = this.getData().replaceParams;
        // this.contentLabel.setLanguageId(popupData.details, params);
        // this.confirmLabel.setLanguageId(popupData.buttonTextTrue);
        // this.cancelLabel.setLanguageId(popupData.buttonTextFalse);
        // this.confirmBtn.node.active = popupData.type != 2;//2只显示取消按钮
        // this.cancelBtn.node.active = popupData.type != 1;//1只显示确定按钮

        // const confirmIndex = popupData.typeText[0];
        // const cancelIndex = popupData.typeText[1];
        // if (confirmIndex) {
        //     this.confirmLabel.node.color = this.fontColor[confirmIndex - 1];
        //     const labelOutline = this.confirmLabel.node.getComponent(cc.LabelOutline);
        //     labelOutline.color = this.fontStorkeColor[confirmIndex - 1];
        // }
        // if (cancelIndex) {
        //     this.cancelLabel.node.color = this.fontColor[cancelIndex - 1];
        //     const labelOutline = this.cancelLabel.node.getComponent(cc.LabelOutline);
        //     labelOutline.color = this.fontStorkeColor[cancelIndex - 1];
        // }

        // //左边显示确定按钮，右边显示取消按钮
        // if (popupData.type == 3) {
        //     this.cancelBtn.node.setSiblingIndex(2);
        // }
        // //左边显示取消按钮，右边显示确定按钮
        // if (popupData.type == 4) {
        //     this.confirmBtn.node.setSiblingIndex(2);
        // }

        // if (popupData.imgButtonTrue) {
        //     const confirmSpriteEx = this.confirmBtn.node.getComponent(SpriteEx);
        //     confirmSpriteEx.setImage(BundleType.RESOURCES, 'Textures/Common/Dialog/' + popupData.imgButtonTrue);
        //     const btn = this.confirmBtn.node.getComponent(cc.Button);
        //     btn.normalSprite = await ResManager.instance.loadByBundle(BundleType.RESOURCES, 'Textures/Common/Dialog/' + popupData.imgButtonTrue, cc.SpriteFrame);
        //     btn.pressedSprite = await ResManager.instance.loadByBundle(BundleType.RESOURCES, 'Textures/Common/Dialog/' + popupData.imgButtonTrueDown, cc.SpriteFrame);
        // }
        // if (popupData.imgButtonFalse) {
        //     const cancelSpriteEx = this.cancelBtn.node.getComponent(SpriteEx);
        //     cancelSpriteEx.setImage(BundleType.RESOURCES, 'Textures/Common/Dialog/' + popupData.imgButtonFalse);
        //     const btn = this.cancelBtn.node.getComponent(cc.Button);
        //     btn.normalSprite = await ResManager.instance.loadByBundle(BundleType.RESOURCES, 'Textures/Common/Dialog/' + popupData.imgButtonFalse, cc.SpriteFrame);
        //     btn.pressedSprite = await ResManager.instance.loadByBundle(BundleType.RESOURCES, 'Textures/Common/Dialog/' + popupData.imgButtonFalseDown, cc.SpriteFrame);
        // }
        // this.contentLabel.node.opacity = 0;
        // this.setTimeOut(()=>{
        //     this.contentLabel.node.opacity = 255;
        //     const height = this.contentLabel.node.height;
        //     if (height > this.content.height) {
        //         this.content.height = height;
        //         this.contentLabel.node.anchorY = 1;
        //         this.contentLabel.node.y = 0;
        //     }
        // }, 0.05);
    }

    /**
     * 确定按钮点击事件
     */
    private onConfirm(): void {
        const confirmCallback = this.getData().confirmCallback;
        confirmCallback && confirmCallback();
        this.close();
    }

    /**
     * 取消按钮点击事件
     */
    private onCancel(): void {
        const cancelCallback = this.getData().cancelCallback;
        cancelCallback && cancelCallback();
        this.close();
    }

    public onDestroy(): void {
        ChristmasLogManager.instance.log(this.getData().popupKey + ' destroy');
        super.onDestroy();
    }
}
