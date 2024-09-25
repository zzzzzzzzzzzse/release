import { NewBankEventDefine } from "../Const/NewBankEventDefine";
import NewBankSlotEventManager from "./NewBankSlotEventManager";
/**
 * 界面状态管理：正常or特殊
 */
const { ccclass, property } = cc._decorator;


@ccclass
export default class NewBankStateManager extends cc.Component {
    @property({ tooltip: "如果勾选了此项，则为正常状态", readonly: true })
    public isNormalState: boolean = true;
    private static _instance: NewBankStateManager
    public static get instance() {
        if (NewBankStateManager._instance == null) {
            NewBankStateManager._instance = new NewBankStateManager();
        }
        return NewBankStateManager._instance;
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
        NewBankSlotEventManager.instance.emit(NewBankEventDefine.QUIE_SET_SPECIAL_DATA);
    }

    public setNormalData() {
        NewBankSlotEventManager.instance.emit(NewBankEventDefine.QUIE_SET_NORMAL_DATA);
    }

    public changeSpecial() {
        NewBankSlotEventManager.instance.emit(NewBankEventDefine.QUIE_CHANGE_SPECIAL_STATE);
    }

    public changeNormal() {
        NewBankSlotEventManager.instance.emit(NewBankEventDefine.QUIE_CHANGE_NORMAL_STATE);
    }
}
