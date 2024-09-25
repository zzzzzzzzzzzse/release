import { StoneAgeEventDefine } from "../Const/StoneAgeEventDefine";
import StoneAgeSlotEventManager from "./StoneAgeSlotEventManager";
/**
 * 界面状态管理：正常or特殊
 */
const { ccclass, property } = cc._decorator;


@ccclass
export default class StoneAgeStateManager extends cc.Component {
    @property({ tooltip: "如果勾选了此项，则为正常状态", readonly: true })
    public isNormalState: boolean = true;
    private static _instance: StoneAgeStateManager
    public static get instance() {
        if (StoneAgeStateManager._instance == null) {
            StoneAgeStateManager._instance = new StoneAgeStateManager();
        }
        return StoneAgeStateManager._instance;
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
        StoneAgeSlotEventManager.instance.emit(StoneAgeEventDefine.QUIE_SET_SPECIAL_DATA);
    }

    public setNormalData() {
        StoneAgeSlotEventManager.instance.emit(StoneAgeEventDefine.QUIE_SET_NORMAL_DATA);
    }

    public changeSpecial() {
        StoneAgeSlotEventManager.instance.emit(StoneAgeEventDefine.QUIE_CHANGE_SPECIAL_STATE);
    }

    public changeNormal() {
        StoneAgeSlotEventManager.instance.emit(StoneAgeEventDefine.QUIE_CHANGE_NORMAL_STATE);
    }
}
