import { SlotsStage } from "../../Const/PoseidonCommonDefine";
import { PoseidonEventDefine } from "../../Const/PoseidonEventDefine";
import PoseidonLogManager from "../../Manager/PoseidonLogManager";
import PoseidonSlotEventManager from "../../Manager/PoseidonSlotEventManager";


const { ccclass, property } = cc._decorator;
@ccclass
export default class PoseidonSlotWheelBase extends cc.Component {
    @property({ tooltip: "是否是复制轴" })
    isCopy: boolean = false;
    @property
    protected index: number = 0;
    @property({ readonly: false })
    protected perDistance: number = 180;//单元距离，达到之后表示循环
    // @property
    private totalTime: number = 6;//转动的总时间
    // @property({ readonly: false })
    public circle: number = 6;//循环的次数
    @property({ readonly: false })
    private totalCount: number = 3;//节点数量

    @property({ tooltip: "蓄力阶段耗时" })
    private debugT0: number = 0.1;
    @property({ tooltip: "蓄力阶段初速度" })
    private debugV0s: number = -300;
    @property({ tooltip: "回弹阶段耗时" })
    private debugT4: number = 0.5;
    @property({ tooltip: "回弹阶段距离" })
    private debugX4: number = -30;
    @property({ tooltip: "匀速阶段速度" })
    private debugV2: number = 750;
    @property({ tooltip: "加速阶段加速度" })
    private debugA1: number = 3000;
    @property({ tooltip: "减速阶段加速度" })
    private debugA3: number = -3000;

    private isStart: boolean = false;
    private endIndex: number = 6;//结束时候的位置
    private curIndex: number = 0;//当前位置
    protected curDistance: number = 0;//当前偏离起点的位移，达到一个轮回之后会清0
    private endDeltaDistance: number = 0;//结束时的角度
    private lastEndDistance: number = 0;//上一次结束时离起点的距离
    private distance: number;//每次总运动的距离，以当前位置算起，超过一个轮回不会清0
    private time: number;//转盘已经转动的时间,单位为s
    private stage: SlotsStage = SlotsStage.CHARGE;//处于转动的哪个阶段
    private isChangeDimImage: boolean = false;//是否已经换过模糊图
    private isChangeClearnessImage: boolean = false;//是否已经换过清晰图
    private isCollideBottom: boolean = false;//是否已经撞底

    private x0: number;
    private x1: number;
    private x2: number;
    private x3: number;
    private x4: number;

    private a0: number;
    private a1: number = 2;//加速度
    private a3: number = 2;
    private a4: number = 2;

    private t0: number;
    private t1: number;
    private t2: number;
    private t3: number;
    private t4: number;

    private v0s: number;//初速度
    private v2: number;//匀速
    private uniformPhaseuUnitTs: number;//匀速阶段每一圈耗时
    private initCircle: number;//存一份初始圈数

    private hideTime: number;//切换到后台的时间戳

    protected onLoad(): void {
        cc.game.on(cc.game.EVENT_HIDE, () => {
            PoseidonLogManager.instance.log('游戏切换到后台');
            this.hideTime = new Date().getTime();
        }, this)
        cc.game.on(cc.game.EVENT_SHOW, () => {
            let currTime = new Date().getTime();
            let interval = (currTime - this.hideTime) / 1000;
            PoseidonLogManager.instance.log('重新回到游戏');
            const time = this.time + interval;
            this.setCompleteTime(time);
        }, this);
        this.initData();
    }

    private initData(): void {
        this.curIndex = 0;
        this.lastEndDistance = 0;
        this.initCircle = this.circle;
        this.uniformPhaseuUnitTs = this.perDistance / this.debugV2;
    }

    private resetData(): void {
        this.time = 0;
        this.isStart = false;
        let deltaIndex;
        if (this.endIndex >= this.curIndex) {
            deltaIndex = this.endIndex - this.curIndex;
        }
        else {
            deltaIndex = this.endIndex + this.totalCount - this.curIndex;
        }
        this.endDeltaDistance = this.endIndex * this.perDistance / this.totalCount;
        let distance = this.circle * this.perDistance + deltaIndex * this.perDistance / this.totalCount;
        this.distance = distance;

        let t0 = this.debugT0;
        let v0s = this.debugV0s;//v0初速度
        let a0 = - v0s / t0;
        let x0 = v0s * t0 + 0.5 * a0 * t0 * t0;

        let x4 = this.debugX4;
        let t4 = this.debugT4;
        let a4 = x4 / (0.5 * t4 * t4);

        let v2 = this.debugV2;//v2是匀速

        let a1 = this.debugA1;
        let v1e = v2;//v1末速度
        let t1 = v1e / a1; //v1初速度为0
        let x1 = 0.5 * a1 * t1 * t1;

        let v3s = v2;//v3初速度
        let a3 = this.debugA3;
        let t3 = - v3s / a3;
        let x3 = v3s * t3 + 0.5 * a3 * t3 * t3;

        let x2 = distance - x4 - x3 - x1 - x0;
        let t2 = x2 / v2;

        this.x0 = x0;
        this.x1 = x1;
        this.x2 = x2;
        this.x3 = x3;
        this.x4 = x4;


        this.t0 = t0;
        this.t1 = t1;
        this.t2 = t2;
        this.t3 = t3;
        this.t4 = t4;

        this.a0 = a0;
        this.a1 = a1;
        this.a3 = a3;
        this.a4 = a4;

        this.v0s = v0s;
        this.v2 = v2;
        this.totalTime = t0 + t1 + t2 + t3 + t4;

    }

    /**
     * 转动转盘
     * @param endIndex 结束时的位置，从0开始
     */
    public startWheel(endIndex: number): void {
        this.endIndex = endIndex;
        this.resetData();
        this.isStart = true;
    }

    /**
     * 转动过程中增加匀速阶段位移，需要在匀速阶段结束前设置才有用，
     * @param addCircle 在原有的基础上增加多少圈
     */
    public updateCircle(addCircle: number) {
        let deltaIndex;
        if (this.endIndex >= this.curIndex) {
            deltaIndex = this.endIndex - this.curIndex;
        }
        else {
            deltaIndex = this.endIndex + this.totalCount - this.curIndex;
        }
        this.circle = this.circle + addCircle
        this.distance = this.circle * this.perDistance + deltaIndex * this.perDistance / this.totalCount;
        this.x2 = this.distance - this.x4 - this.x3 - this.x1 - this.x0;
        let t2 = this.t2;//测试数据
        let addTs;//测试数据
        this.t2 = this.x2 / this.debugV2;
        addTs = this.t2 - t2;//测试数据
        // LogManager.instance.info("增加的时间为：", addTs);//测试数据
        this.totalTime = this.t0 + this.t1 + this.t2 + this.t3 + this.t4;
    }

    /**
     * 设置转动时间,请在startWheel之前设置
     */
    public setWheelTime(time: number = 7): void {
        this.totalTime = time;
    }

    /**
     * 获取转动时间
     */
    public getWheelTime(): number {
        return this.totalTime;
    }

    /**
     * 设置已经转动的时间
     */
    public setCompleteTime(time: number = 0): void {
        this.time = Math.min(time, this.totalTime);
    }

    /**
     * 获取已经转动的时间
     */
    public getCompleteTime(): number {
        return this.time;
    }

    private onStop(): void {
        this.isStart = false;
        this.curIndex = this.endIndex;
        this.lastEndDistance = this.endDeltaDistance;
        this.circle = this.initCircle;
        PoseidonSlotEventManager.instance.emit(PoseidonEventDefine.QUIE_SLOTS_ONE_STOP, { index: this.index, isCopy: this.isCopy });
    }

    /**
     * 计算运动的位移
     */
    public calcDistance(): void {
        if (this.time >= this.t0 + this.t1 + this.t2 + this.t3) {
            if (this.stage != SlotsStage.BOUNCE) {
                this.stage = SlotsStage.BOUNCE;
                PoseidonSlotEventManager.instance.emit(PoseidonEventDefine.SLOTS_TURN_STAGE, { id: this.index, stage: this.stage });
                PoseidonSlotEventManager.instance.emit(PoseidonEventDefine.SLOTS_BOUNCE_START, { index: this.index })
            }
            const t4 = this.time - this.t0 - this.t1 - this.t2 - this.t3;
            const x0 = this.x0;
            const x1 = this.x1;
            const x2 = this.x2;
            const x3 = this.x3;
            const x4 = 0.5 * this.a4 * t4 * t4;
            this.curDistance = this.lastEndDistance + x0 + x1 + x2 + x3 + x4;
        }
        else if (this.time >= this.t0 + this.t1 + this.t2) {
            if (this.stage != SlotsStage.SPEED_CUT) {
                this.stage = SlotsStage.SPEED_CUT;
                PoseidonSlotEventManager.instance.emit(PoseidonEventDefine.SLOTS_TURN_STAGE, { id: this.index, stage: this.stage });
            }
            const v2 = this.v2;
            const x0 = this.x0;
            const x1 = this.x1;
            const x2 = this.x2;
            const t3 = this.time - this.t1 - this.t2 - this.t0;
            const x3 = v2 * t3 + 0.5 * this.a3 * t3 * t3;

            this.curDistance = this.lastEndDistance + x0 + x1 + x2 + x3;
        }
        else if (this.time >= this.t0 + this.t1) {
            if (this.stage != SlotsStage.UNIFORM) {
                this.stage = SlotsStage.UNIFORM;
                PoseidonSlotEventManager.instance.emit(PoseidonEventDefine.SLOTS_TURN_STAGE, { id: this.index, stage: this.stage });
            }
            const t1 = this.t1;
            const t2 = this.time - t1 - this.t0;
            const x1 = this.x1;
            const x2 = this.v2 * t2;
            const x0 = this.x0;
            this.curDistance = this.lastEndDistance + x0 + x1 + x2;
            if (this.time + this.uniformPhaseuUnitTs >= this.t0 + this.t1 + this.t2 && 0 == this.index) {
                PoseidonLogManager.instance.info("检查：", this.curDistance, " index:", this.index);
                PoseidonSlotEventManager.instance.emit(PoseidonEventDefine.CHECK_SERVER_SLOT_DATA);
            }
        }
        else if (this.time >= this.t0) {
            if (this.stage != SlotsStage.SPEED_UP) {
                this.stage = SlotsStage.SPEED_UP;
                PoseidonSlotEventManager.instance.emit(PoseidonEventDefine.SLOTS_SPEED_UP_START, { index: this.index })
            }
            const t0 = this.t0;
            const t1 = this.time - t0;
            const x0 = this.x0;
            const x1 = 0.5 * this.a1 * t1 * t1;
            this.curDistance = this.lastEndDistance + x0 + x1;
        }
        else {
            if (this.stage != SlotsStage.CHARGE) {
                this.stage = SlotsStage.CHARGE;
            }
            const t0 = this.time;
            const x0 = this.v0s * t0 + 0.5 * this.a0 * t0 * t0;
            this.curDistance = this.lastEndDistance + x0;
        }
        if (!this.isChangeDimImage && this.curDistance >= this.perDistance) {
            PoseidonLogManager.instance.info("换图模糊：", this.index)
            this.isChangeDimImage = true;
            // EventManager.instance.emit(EventDefine.SLOTS_CHANGE_ICON_IMAGE, { isDim: true, id: this.index });
            // EventManager.instance.emit(EventDefine.SLOTS_TURN_PER_DISTANCE, { index: this.index })
        }
        if (!this.isChangeClearnessImage && this.curDistance >= this.distance - this.perDistance) {
            PoseidonLogManager.instance.info("换图清晰：", this.index)
            this.isChangeClearnessImage = true;
            PoseidonSlotEventManager.instance.emit(PoseidonEventDefine.SLOTS_CHANGE_ICON_IMAGE, { isDim: false, id: this.index });
        }
        if (!this.isCollideBottom && this.curDistance >= (this.distance + this.debugX4)) {
            PoseidonLogManager.instance.info("撞底：", this.index)
            this.isCollideBottom = true;
            PoseidonSlotEventManager.instance.emit(PoseidonEventDefine.WHEEL_COLLIDE_BOTTOM, { id: this.index });
        }

        if (this.time >= this.totalTime) {
            //圈数为奇数的时候会导致瞬移，正常现象
            this.curDistance = this.perDistance * (this.endIndex % this.totalCount) / this.totalCount;
        }
    }

    protected update(dt: number) {
        if (!this.isStart) {
            return;
        }
        this.calcDistance();
        if (this.time > this.totalTime) {
            this.isChangeDimImage = false;
            this.isChangeClearnessImage = false;
            this.isCollideBottom = false;
            this.stage = SlotsStage.CHARGE;
            this.onStop();
            return;
        }
        this.time += dt;
    }

    protected onDestroy(): void {
        PoseidonSlotEventManager.instance.off(this);
    }
}
