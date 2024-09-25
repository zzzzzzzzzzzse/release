import { ChristmasEventDefine } from "../Const/ChristmasEventDefine";
import ChristmasSlotEventManager from "./ChristmasSlotEventManager";
/**
 * 界面状态管理：正常or特殊
 */
const { ccclass, property } = cc._decorator;


@ccclass
export default class ChristmasStateManager extends cc.Component {
    @property({ tooltip: "如果勾选了此项，则为正常状态", readonly: true })
    public isNormalState: boolean = true;
    private static _instance: ChristmasStateManager
    public static get instance() {
        if (ChristmasStateManager._instance == null) {
            ChristmasStateManager._instance = new ChristmasStateManager();
        }
        return ChristmasStateManager._instance;
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
        ChristmasSlotEventManager.instance.emit(ChristmasEventDefine.QUIE_SET_SPECIAL_DATA);
    }

    public setNormalData() {
        ChristmasSlotEventManager.instance.emit(ChristmasEventDefine.QUIE_SET_NORMAL_DATA);
    }

    public changeSpecial() {
        ChristmasSlotEventManager.instance.emit(ChristmasEventDefine.QUIE_CHANGE_SPECIAL_STATE);
    }

    public changeNormal() {
        ChristmasSlotEventManager.instance.emit(ChristmasEventDefine.QUIE_CHANGE_NORMAL_STATE);
    }
}
