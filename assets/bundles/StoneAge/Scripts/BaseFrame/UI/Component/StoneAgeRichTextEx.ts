import StoneAgeComponentBase from "../ComponentBase/StoneAgeComponentBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class StoneAgeRichTextEx extends StoneAgeComponentBase {

    private richTextClick(event: cc.Event, param: any): void {
        if (param) {
            const obj = JSON.parse(param);
            const key = obj.key;
            const data = obj.data;
            this.node.emit(key, data);
        }

    }
}
