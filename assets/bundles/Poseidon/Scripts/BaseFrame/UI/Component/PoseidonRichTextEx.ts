import PoseidonComponentBase from "../ComponentBase/PoseidonComponentBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PoseidonRichTextEx extends PoseidonComponentBase {

    private richTextClick(event: cc.Event, param: any): void {
        if (param) {
            const obj = JSON.parse(param);
            const key = obj.key;
            const data = obj.data;
            this.node.emit(key, data);
        }

    }
}
