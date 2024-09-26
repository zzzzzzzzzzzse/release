import { UIBasenew } from "../../../Script/framework/base/UIBasenew";
import { UIManagernew } from "../../../UIManagernew";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MessageBoxView extends UIBasenew {

    @property(cc.Button)
    closeButton: cc.Button = null;

    @property(cc.Button)
    sureButton: cc.Button = null;

    @property(cc.Button)
    cancelButton: cc.Button = null;

    @property(cc.Label)
    text: cc.Label = null;

    contentmsgs: string = ""
    numBtn: number = 0;
    private sureCallback: Function = null
    private cancelCallback: Function = null
    private closeCallback: Function = null

    start() {

    }

    init(msgData) {
        console.log("MessageBoxView init")
        super.init()
        if (msgData.btnOkText) {
            this.contentmsgs = msgData.btnOkText;
        }

        if (msgData.code && msgData.code > 0) {
            this.contentmsgs = msgData.btnOkText + ":" + msgData.code;
        }

        if (msgData.btnCount) {
            this.numBtn = Number(msgData.btnCount)
        } else {
            this.numBtn = 1
        }

        let flag = false
        if (this.closeCallback) {
            flag = true
        }

        this.show(this.contentmsgs, this.numBtn, flag, msgData.sureCallback, msgData.cancelCallback, msgData.closeCallback)
    }

    // contentStr 显示的文本   btnNum 确定 取消按钮1-2   
    show(contentStr: string, btnCount: number = 2, isShowCloseBtn: boolean = false, callback1: Function = null, callback2: Function = null, callback3: Function = null) {
        this.text.string = contentStr
        // this.text.node.color = cc.color(184, 123, 65, 255);
        this.numBtn = btnCount
        this.closeButton.node.active = isShowCloseBtn
        this.sureCallback = callback1
        this.cancelCallback = callback2
        this.closeCallback = callback3
        if (this.numBtn == 1) {
            this.cancelButton.node.active = false
            this.sureButton.node.active = true
            this.sureButton.node.x = 0
        } else if (this.numBtn == 2) {
            this.cancelButton.node.active = true
            this.sureButton.node.active = true
            this.sureButton.node.x = 150
            this.cancelButton.node.x = -150

        }
    }

    hideNode() {
        UIManagernew.closeUI({
            name: 'MessageBoxView'
        });
    }

    sureBtnCallBack() {
        if (this.sureCallback) this.sureCallback();
        this.hideNode()
    }
    cancelBtnCallBack() {
        if (this.cancelCallback) this.cancelCallback();
        this.hideNode()
    }
    closeBtnCallBack() {
        if (this.closeCallback) this.closeCallback();
        this.hideNode()
    }




    onDestroy() {

    }

    // update (dt) {}
}
