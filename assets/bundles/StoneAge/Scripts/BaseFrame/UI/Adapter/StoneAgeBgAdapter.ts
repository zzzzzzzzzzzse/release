/**
 * 背景适配
 */

const { ccclass, property } = cc._decorator;
@ccclass
export default class StoneAgeBgAdapter extends cc.Component {
    onLoad() {
        let scaleX = cc.winSize.width / this.node.width;
        let scaleY = cc.winSize.height / this.node.height;
        let scale = scaleX >= scaleY ? scaleX : scaleY;
        this.node.scaleX = scale;
        this.node.scaleY = scale;
    }
}
