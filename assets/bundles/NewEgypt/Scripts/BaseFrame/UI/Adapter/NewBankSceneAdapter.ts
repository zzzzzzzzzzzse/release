/**
 * 场景适配
 */
const { ccclass } = cc._decorator;
@ccclass
export default class NewBankSceneAdapter extends cc.Component {
    onLoad() {
        let frameSize = cc.view.getFrameSize();
        let designWidth = cc.Canvas.instance.designResolution.width;
        let designHeight = cc.Canvas.instance.designResolution.height;

        if ((frameSize.width / frameSize.height) >= (designWidth / designHeight)) {
            cc.Canvas.instance.fitWidth = false;
            cc.Canvas.instance.fitHeight = true;
        } else {
            cc.Canvas.instance.fitWidth = true;
            cc.Canvas.instance.fitHeight = false;
        }
    }
}
