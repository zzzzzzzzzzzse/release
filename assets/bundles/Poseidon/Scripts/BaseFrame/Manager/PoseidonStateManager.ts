import { PoseidonEventDefine } from "../Const/PoseidonEventDefine";
import PoseidonSlotEventManager from "./PoseidonSlotEventManager";
/**
 * 界面状态管理：正常or特殊
 */
const { ccclass, property } = cc._decorator;


@ccclass
export default class PoseidonStateManager extends cc.Component {
    @property({ tooltip: "如果勾选了此项，则为正常状态", readonly: true })
    public isNormalState: boolean = true;
    private static _instance: PoseidonStateManager
    public static get instance() {
        if (PoseidonStateManager._instance == null) {
            PoseidonStateManager._instance = new PoseidonStateManager();
        }
        return PoseidonStateManager._instance;
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
        PoseidonSlotEventManager.instance.emit(PoseidonEventDefine.QUIE_SET_SPECIAL_DATA);
    }

    public setNormalData() {
        PoseidonSlotEventManager.instance.emit(PoseidonEventDefine.QUIE_SET_NORMAL_DATA);
    }

    public changeSpecial() {
        PoseidonSlotEventManager.instance.emit(PoseidonEventDefine.QUIE_CHANGE_SPECIAL_STATE);
    }

    public changeNormal() {
        PoseidonSlotEventManager.instance.emit(PoseidonEventDefine.QUIE_CHANGE_NORMAL_STATE);
    }
}
