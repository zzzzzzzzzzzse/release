import { RichEventDefine } from "../Const/RichEventDefine";
import RichSlotEventManager from "./RichSlotEventManager";
/**
 * 界面状态管理：正常or特殊
 */
const { ccclass, property } = cc._decorator;


@ccclass
export default class RichStateManager extends cc.Component {
    @property({ tooltip: "如果勾选了此项，则为正常状态", readonly: true })
    public isNormalState: boolean = true;
    private static _instance: RichStateManager
    public static get instance() {
        if (RichStateManager._instance == null) {
            RichStateManager._instance = new RichStateManager();
        }
        return RichStateManager._instance;
    }

    private constructor() {
        super();
    }
    onLoad() {

    }

    start() {
        //todo这里后面通过服务器配置开关
        this.isNormalState = false;
        if (this.isNormalState) {
            this.changeNormal()
        }
        else {
            this.changeSpecial();
        }
    }

    public setisNormalState(state: boolean) {
        this.isNormalState = state;
    }

    public getisNormalState(state: boolean) {
        return this.isNormalState;
    }


    public setSpecialData() {
        RichSlotEventManager.instance.emit(RichEventDefine.QUIE_SET_SPECIAL_DATA);
    }

    public setNormalData() {
        RichSlotEventManager.instance.emit(RichEventDefine.QUIE_SET_NORMAL_DATA);
    }

    public changeSpecial() {
        RichSlotEventManager.instance.emit(RichEventDefine.QUIE_CHANGE_SPECIAL_STATE);
    }

    public changeNormal() {
        RichSlotEventManager.instance.emit(RichEventDefine.QUIE_CHANGE_NORMAL_STATE);
    }
}
