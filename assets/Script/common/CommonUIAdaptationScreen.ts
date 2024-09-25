// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class CommonUIAdaptationScreen extends cc.Component {

    protected onLoad(): void {
        let designSize = cc.Canvas.instance.designResolution;
        let size: cc.Size = this.node.getContentSize();
        if (designSize.height / size.width > designSize.height / designSize.width) {
            this.node.scale = designSize.width / this.node.width;
        }
    }
}
