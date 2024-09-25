import { StoneAgeEventDefine } from "../../Const/StoneAgeEventDefine";
import StoneAgeSlotEventManager from "../../Manager/StoneAgeSlotEventManager";

var isActive: boolean = true;
/**
 * 状态基类
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class StateBase extends cc.Component {
    @property({ visible: isActive, readonly: true })
    public sPosition: cc.Vec2 = new cc.Vec2(0, 0);
    @property({ visible: isActive, readonly: true })
    public nPosition: cc.Vec2 = new cc.Vec2(0, 0);
    @property({ visible: isActive, readonly: true })
    public sActive: boolean = true;
    @property({ visible: isActive, readonly: true })
    public nActive: boolean = true;
    @property({ visible: isActive, readonly: true })
    public sSize: cc.Size = new cc.Size(0, 0);;
    @property({ visible: isActive, readonly: true })
    public nSize: cc.Size = new cc.Size(0, 0);

    onLoad() {
        this.addEvent();
    }

    start() {
    }

    private addEvent() {
        StoneAgeSlotEventManager.instance.on(StoneAgeEventDefine.QUIE_CHANGE_NORMAL_STATE, this.changeNormalState, this);
        StoneAgeSlotEventManager.instance.on(StoneAgeEventDefine.QUIE_CHANGE_SPECIAL_STATE, this.changeSpecialState, this);
    }

    /**
     * 设置正常状态下节点数据
     * @param target 目标节点
     */
    public setNormalData(target: cc.Node) {
        this.nPosition.x = target.getPosition().x;
        this.nPosition.y = target.getPosition().y;
        this.nActive = target.active;
        this.nSize = target.getContentSize();
    }

    /**
     * 设置特殊状态下节点数据
     * @param target 目标节点
     */
    public setSpecialData(target: cc.Node) {
        this.sPosition.x = target.getPosition().x;
        this.sPosition.y = target.getPosition().y;
        this.sActive = target.active;
        this.sSize = target.getContentSize();
    }

    public getNormalData() {
        let obj = {
            nPosition: this.nPosition,
            nActive: this.nActive,
            nSize: this.nSize
        };
        return obj;
    }

    public getSpecialData() {
        let obj = {
            sPosition: this.sPosition,
            sActive: this.sActive,
            sSize: this.sSize
        };
        return obj;
    }

    /**
     * 改变为正常状态
     */
    public changeNormalState() {
        this.node.setPosition(this.nPosition);
        this.node.active = this.nActive;
        this.node.setContentSize(this.nSize);
    }

    /**
     * 改变为特殊状态
     */
    public changeSpecialState() {
        this.node.setPosition(this.sPosition);
        this.node.active = this.sActive;
        this.node.setContentSize(this.sSize);
    }
}
