// import { CommonDialog } from './CommonDialog';
const { ccclass, property } = cc._decorator;

@ccclass
export class PoseidonCommonDialogListen extends cc.Component {
    @property(cc.Prefab)
    vari_prefab: cc.Prefab = null;

    onLoad() {
        this.addEvent();
    }
    start() {
    }

    private addEvent() {
        // EventManager.instance.on(EventDefine.QUIE_COMMON_POP, this.onCommonPop, this);
    }

    private onCommonPop(event) {
        // let zIndex = 2;//展示层级
        // let data = event.msg;
        // let prefab = cc.instantiate(this.vari_prefab);
        // prefab.parent = this.node;
        // prefab.zIndex = zIndex;
        // let tsCommonDialog: CommonDialog = <CommonDialog>prefab.getComponent("CommonDialog");
        // tsCommonDialog.showPop(data);
    }
}