// import { EVENT } from "../../../bundles/barbarian/script/data/ConstDefine";
import PoseidonSubject from "../../../bundles/poseidon/script/base/PoseidonSubject";
import { EVENT } from "../../configs/ConstDefine";
import { Constants } from "../../Constants";
import { SlotPushAcceptCollectAward } from "../../models/socket/SlotPushAcceptCollectAward";
import { SlotPushBetResult, SubGameType } from "../../models/socket/SlotPushBetResult";
import { SlotPushLogin } from "../../models/socket/SlotPushLogin";
import SlotPushSettlementBonusSuccess from "../../models/socket/SlotPushSettlementBonusSuccess";
import { SlotSlotSubject } from "../../models/socket/SlotSlotSubject";
import { SlotSubGameBetResult } from "../../models/socket/SlotSubGameBetResult";
import { SubGameStatus } from "../../models/socket/SlotSubGameInfo";
import { SlotEventBusEnum } from "../../net/socket/GameHub";
import Helper, { catchError } from "../common/Helper";
import GameMainController, { ELocalStorageType, EWinType, SpinBtnType } from "../controller/GameMainController";

import { AudioMgr } from "../mgr/AudioManager";
import { EventMgr } from "../mgr/EventManager";
import { ResMgr } from "../mgr/ResManager";
import SubjectSpecial from "../subject/SubjectSpecial";
import SubjectBase, { EAnimNameType, ESubjectType } from "./subject/SubjectBase";

const { ccclass, property, menu } = cc._decorator;

/** @description 滚动类型枚举 */
export enum ERollingType {
    /** @description 普通滚动 */
    NORMAL,
    /** @description 单轮盘滚动 */
    SINGLE,
    /** @description 贝塞尔曲线滚动 */
    BEZIER,
}
/** @description 轮盘层级枚举 */
export enum EWheelLayer {
    /** @description 背景层 */
    LAYER_BG,
    /** @description 底部边框图片层 */
    LAYER_BOTTOM_BORDER_IMG,
    /** @description 底部边框动画层 */
    LAYER_BOTTOM_BORDER_ANIM,
    /** @description 核心层,物件图片层,物件滚动层 */
    LAYER_CORE,
    /** @description 物件动画背景层(同时也是遮罩层) */
    LAYER_ANIM_BG,
    /** @description 物件动画层 */
    LAYER_ANIM,
    /** @description 顶部边框图片层 */
    LAYER_TOP_BORDER_IMG,
    /** @description 顶部边框动画层 */
    LAYER_TOP_BORDER_ANIM,
    /** @description 特殊动画背景层 */
    // LAYER_ANIM_BG,
    LAYER_SPECIAL_BG,
    /** @description 特殊动画处理层 */
    LAYER_SPECIAL_ANIM,
    /** @description 粒子效果层 */
    LAYER_PARTICLE,
    /** @description 文字 */
    LAYER_LABEL,
}
/** @description 物件创建类型 */
export enum ECreateType {
    /** @description 随机创建 */
    RANDOM,
    /** @description 加载json配置表 */
    JSON
}

/** @description 创建特殊物件类型 */
export enum ECSpecialType {
    /** @description 创建 */
    NORMAL,
    /** @description SPE */
    JACKPOT,
}

export enum ERollingStatus {
    ROLLING,
    STOP,
    NONE,
}


export enum ESpecialType {
    BONUS,
    SCATTER,
    SCATTER2,
    LINK,
    WILD,
    BIGWILD,
}

export interface IMaskMoveData {
    form: cc.Node;
    self: cc.Node;
}

export enum EPlayAnimType {
    /** @description 全部同时播放 */
    ALL,
    /** @description 按照赢钱线播放 */
    LINE,
}

export interface IBorderArgs {
    isShow: boolean;
    layer: EWheelLayer;
    type: string
}
export enum EMaskType {
    NONE,
    ALL,
    LINE,
}

/** @description 轮盘基类 */
/**
 * 注意搭建时,根节点下定义10个层级结构,名字无关紧要,但是层级顺序一定要按照标准划分
 */

const GMC = GameMainController;

@ccclass
export abstract default class WheelBase extends cc.Component {
    /** @description 是否进行过初始化 */
    protected _isInit: boolean = false;
    protected isShowMaskSubejct: boolean = false;
    /** @description 物件遮罩 */
    public containerMask: cc.Node;
    /** @description 显示在遮罩上层的物件id */
    protected abstract maskTopArr: Array<number>;
    /** @description 是否移除mask层的所有子节点 */
    protected isRemoveMaskChildren: boolean = true;
    public bgList: cc.SpriteFrame[];

    protected maskType: EMaskType = EMaskType.NONE;

    protected maskTargetMap: Map<string, cc.Node> = new Map<string, cc.Node>();

    protected subjectNodeScale: number = 1;

    /** @description 是否第一次进入bonus */
    public isFirstBonus: boolean = false;
    /** @description 是否第一次进入free */
    protected isFirstFree: boolean = false;
    /** @description 普通物件预制体资源路径 */
    protected _subjectNormalPrefabUrl: string = 'res/prefab/symbol/normal/';
    /** @description 特殊物件预制体资源路径 */
    protected _subjectSpecialPrefabUrl: string = 'res/prefab/symbol/special/';
    /** @description jackpot物件预制体资源路径 */
    protected _subjectJackpotPrefabUrl: string = 'res/prefab/symbol/jackpot';
    /** @description 普通物件预制体资源合集 */
    protected _subjectNormalPrefabMap: Map<string, cc.Prefab> = new Map<string, cc.Prefab>();
    /** @description 特殊物件预制体资源合集 */
    protected _subjectSpecialPrefabMap: Map<string, cc.Prefab> = new Map<string, cc.Prefab>();
    /** @description 普通物件预制体资源合集 */
    protected _subjectJackpotPrefabMap: Map<string, cc.Prefab> = new Map<string, cc.Prefab>();
    /** @description 当前子游戏特殊物件id数组 例: [9,13,45] */
    protected readonly abstract gameSpecialID: Map<ESpecialType, Array<number>>;
    /** @description 轮盘滚动类型 */
    protected readonly abstract rollingType: ERollingType;
    /** @description 轮盘每一列滚动间隔(单轮盘模式无效)*/
    protected readonly abstract rollingInterval: number;
    /** @description 轮盘每一列停止间隔(单轮盘模式无效) */
    protected readonly abstract stopInterval: number;
    /** @description 轮盘转动速度 */
    protected abstract rollingSpeed: number;
    /** @description 轮盘初始速度 */
    protected _initRollingSpeed: number = 0;
    /** @description 轮盘转动结束是否回弹 */
    protected readonly abstract isSpringback: boolean;
    /** @description 中奖动画配置 */
    protected readonly abstract borderArgs: IBorderArgs;
    /** @description 初始化时过滤掉的物件id */
    protected readonly abstract initFilter: Array<string>;
    /** @description id过滤 */
    protected readonly abstract idFilter: Array<number>;

    protected readonly singleFilter: Array<number>;
    /** @description 播放动画类型 */
    protected abstract playAnimType: EPlayAnimType;
    /** @description 结果是否替换完毕 */
    protected isReplaceFinish: boolean = false;
    /** @description 按中奖线播放动画时的句柄 */
    protected _interval: NodeJS.Timeout;
    /** @description 中奖数组 */
    protected winArr: Array<SlotSlotSubject>;
    /** @description 轮盘宽度/列数 */
    protected abstract width: number;
    /** @description 轮盘高度/行数 */
    protected abstract height: number;
    /** @description 轮盘创建物件类型(随机创建\加载JSON配置表创建) */
    protected abstract createType: ECreateType;
    /** @description 轮盘创建特殊物件类型 */
    protected abstract createspeType: ECSpecialType;
    /** @description 轮盘是否正在滚动中 */
    protected isRolling: boolean = false;
    /** @description 轮盘滚动状态 */
    protected _rollingStatus: Array<ERollingStatus>;
    /** @description scatter图标计数 */
    protected _scatterCount: number = 0;
    /** @description bonus图标计数 */
    protected _bonusCount: number = 0;
    /** @description link图标计数 */
    protected _linkCount: number = 0;
    /** @description 开始间隔计数 */
    protected startIntervalCount: number = -1;
    /** @description 结束间隔计数 */
    protected stopIntervalCount: number = -1;
    /** @description 当前游戏是否需要播放落定动画 */
    protected isAppear: boolean = true;
    /** @description 是否收到了服务器下注消息 */
    protected _isBetResult: boolean = false;
    /** @description 滚动开始时是否进行回弹 */
    protected abstract isRollingBeginSpringback: boolean;
    /** @description 停止队列数量 */
    protected _stopCount: number = 0;
    /** @description 从开始下注到收到服务器数据结果的时间差对比 */
    protected _timeDifference: number = 0;
    protected _isStop: boolean = false;
    protected update(dt: number): void {
        if (this.isRolling) {
            this._timeDifference += dt;
        }

        if (this.maskTopMap.size > 0) {
            this.maskTopMap.forEach((v1, k1) => {
                this.maskTargetMap.forEach((v2, k2) => {
                    if (k1 == k2) {
                        v1.position = v2.position;
                    }
                })
            });
        }
    }
    protected maskTopMap: Map<string, cc.Node> = new Map<string, cc.Node>();
    /** @description 最后一列是否有特殊图标出现 */
    protected _isLastSpecial: boolean = false;
    /**
     *  @description 轮盘每一列停止顺序
     *  @example [1,2,3,4,5] 表示轮盘停止顺序为 第一列 第二列 第三列 第四列 第五列 依次停止, 传入-1则该列不进行转动
     */
    protected abstract rollingSequence: Array<number>;
    /** @description 设置滚动次数(收到服务器结果后计数开始递减)  -1 持续滚动 >0 每滚动一次计数-1 */
    protected abstract rollingTimesArray: Array<number>;
    /** @description 是否需要立即停止 */
    protected _stopPromptly: boolean = false;
    /** @description 记录滚动次数 */
    protected abstract _rollingTimes: Array<number>;
    /** @description 记录旧的滚动次数 */
    // private _rollingoldTimes: Array<number>;
    /** @description 虚拟轮盘系数 */
    protected _virtual: number = 3;
    /** @description 调度器管理器 */
    public _scheduler: cc.Scheduler = cc.director.getScheduler();
    /** @description 调度器函数数组 */
    protected _schedulerFunctions: Array<Function>;
    /** @description 轮盘节点 */
    protected _wheel: cc.Node;
    /** @description 轮盘中按宽高拆分后的二维数组索引 */
    public _wheelArr: Array<Array<cc.Node>> = new Array<Array<cc.Node>>();
    /** @description 轮盘节点索引map */
    private _wheelMap: Map<number, number> = new Map<number, number>();
    public get wheelMap(): Map<number, number> {
        return this._wheelMap;
    }
    /** @description 每一列是否停止 */
    protected _stopArr: Array<boolean>;
    /** @description 是否每次进行物件屏幕外随机替换 */
    protected abstract _isRandomSubject: boolean;
    /** @description 是否中jackpot */
    public _winpotbol: boolean = false;
    public get extrolltimesbol(): boolean {
        return this._winpotbol;
    }
    protected _TouchEventNode: cc.Node;
    protected _stopColFilter: Array<number> = new Array<number>();
    protected isPlayAnimDestroy: boolean = false;

    /** @description 物件节点map */
    public subjectNodeMap: Map<number, cc.Node> = new Map<number, cc.Node>();

    /** @description 用于展示结果的节点数组 */
    private _wheelResultArr: Array<Array<cc.Node>> = new Array<Array<cc.Node>>();
    public get wheelResultArr(): Array<Array<cc.Node>> {
        const arr: Array<cc.Node> = new Array<cc.Node>(this._wheelMap.size);
        this._wheelMap.forEach((v, k) => {
            const node: cc.Node = this.subjectNodeMap.get(v);
            arr[k] = node;
        })
        this._wheelResultArr = this.arrToTwoArr<cc.Node>(arr, 1);
        return this._wheelResultArr;
    }

    protected singleStopIdFilter: Array<number>;

    /** @description 下注物件需要展示结果 */
    protected _resultSubjects: Array<SlotSlotSubject> = new Array<SlotSlotSubject>();
    public _resultSubjectsTwo: Array<Array<SlotSlotSubject>> = new Array<Array<SlotSlotSubject>>();

    /** @description 各层级根节点合集 */
    private _LayerMap: Map<string, cc.Node> = new Map<string, cc.Node>();
    /** @description 获取层级根节点合集 */
    protected get layerMap(): Map<string, cc.Node> {
        return this._LayerMap;
    }
    /** @description 各层级节点缓存池合集 */
    private _NodePoolMap: Map<EWheelLayer, cc.NodePool> = new Map<EWheelLayer, cc.NodePool>();
    /** @description 获取各层级节点缓存合集 */
    protected get nodePoolMap(): Map<EWheelLayer, cc.NodePool> {
        return this._NodePoolMap;
    }
    @catchError('Failed to register event')
    private _register(): void {
        EventMgr.register(EVENT.EVENT_LOGIN_SUCCESS, this.onLoginResult, this);
        EventMgr.register(EVENT.EVENT_BET_RESULT, this.onBetResult, this);
        EventMgr.register(EVENT.EVENT_SETTLE_ACCOUNTS, this.onSettleAccounts, this);
        EventMgr.register(EVENT.EVENT_SETTLE_ACCOUNTS_CHANGE, this.onSettleAccountsChange, this);
        EventMgr.register(EVENT.EVENT_PAUSE_GAME, this._onPauseGame, this);
        EventMgr.register(EVENT.EVENT_RESUME_GAME, this._onResumeGame, this);

        EventMgr.register(EVENT.EVENT_SPIN_BEGIN, this._play, this);
        EventMgr.register(EVENT.EVENT_SPIN_FINISH, this._stop, this);
        EventMgr.register(EVENT.EVENT_SPINE_FINISH_INSTANTLY, this.stopImmediately, this);
    }

    protected _onPauseGame(): void {
        GameMainController.gamePause = true;
    }
    protected _onResumeGame(): void {
        GameMainController.gamePause = false;
    }


    protected onLoad(): void {
        // this.node.active = false;
        // this.node.active = true;
        this._register();
        GMC.prefabMap = new Map<string, cc.Prefab>();
    }
    /** @description freegame开始,子类实现 */
    protected abstract onFreeBegin(isExecute?: boolean, isLogin?: boolean);
    /** @description bonusgame开始,子类实现 */
    protected abstract onBonusBegin(isExecute?: boolean, isLogin?: boolean);
    /** @description 打开选择游戏界面 */
    protected onSelect() { };
    /** @description freegame结束,子类实现 */
    protected abstract onFreeEnd();
    /** @description bonusgame结束,子类实现 */
    protected abstract onBonusEnd();
    /** @description 在下注开始时的回调 子类实现 */
    protected abstract onSpinBegin();

    /**
     * @description 获取某一个层级根节点
     * @param type 层级枚举获索引
     */
    @catchError('Error getting game level')
    public getLayer(type: EWheelLayer): cc.Node {
        return this.node.children[type];
    }
    /**
     * @description 添加进某一层级
     * @param type 层级枚举索引
     * @param node 所添加的节点
     */
    @catchError('Failed to add node into hierarchy')
    protected addChild(type: EWheelLayer, node: cc.Node): cc.Node {
        this.node.children[type].addChild(node);
        return node;
    }
    /**
     * @description 获取节点在某个层级根节点下的坐标
     * @param node 需要转换坐标的节点
     * @param layer 层级枚举索引
     * @returns cc.vec3 转换后的坐标
     */
    protected getNodeToLayer(node: cc.Node, layer: EWheelLayer): cc.Vec3 {

        return Helper.toNodeSpaceAR(node, this.getLayer(layer));
    }

    /** @description 重新随机某个物件 */
    protected resetSubject(node: cc.Node): void {
        const arr: Array<[number, string]> = Array.from(GameMainController._config._subjectData);
        const random: number = Math.floor(Math.random() * arr.length);
        const id: number = arr[random][0];
        let isSpecial: boolean = false;
        this.gameSpecialID.forEach(v => {
            if (v.indexOf(id) !== -1) {
                isSpecial = true;
                return;
            }
        })
        if (this.idFilter.indexOf(id) !== -1) {
            isSpecial = true;
        }



        if (isSpecial) {
            this.resetSubject(node);
        } else {
            if (this.rollingType == ERollingType.NORMAL) {
                const subjectBase: SubjectBase = node.getComponent(SubjectBase);
                subjectBase.replace(id);
            } else {
                if (this.singleFilter.indexOf(id) != -1) {
                    this.resetSubject(node);
                } else {
                    const pre: cc.Prefab = GameMainController.prefabMap.get(GameMainController._config._subjectData.get(id));
                    const preNode: cc.Node = cc.instantiate(pre);
                    const sprite: cc.Node = cc.instantiate(preNode.getChildByName("Single")).children[0];
                    node.getComponent(cc.Sprite).spriteFrame = sprite.getComponent(cc.Sprite).spriteFrame;
                    node.scale = sprite.scale;
                    node.setContentSize(sprite.getContentSize());
                }
            }
        }
    }




    /** @description 初始化轮盘 */
    public async _initwheel(data?: SlotPushLogin): Promise<void> {
        if (this._isInit) return;
        this._isInit = true;
        this._initRollingSpeed = this.rollingSpeed;
        this._scheduler.enableForTarget(this);
        this._wheel = this.getLayer(EWheelLayer.LAYER_CORE).getChildByName("Container");
        this._subjectNormalPrefabMap = await (await ResMgr.loadDir<cc.Prefab>(GMC._config._bundle, this._subjectNormalPrefabUrl, cc.Prefab)).map;
        this._subjectSpecialPrefabMap = await (await ResMgr.loadDir<cc.Prefab>(GMC._config._bundle, this._subjectSpecialPrefabUrl, cc.Prefab)).map;
        this._subjectJackpotPrefabMap = await (await ResMgr.loadDir<cc.Prefab>(GMC._config._bundle, this._subjectJackpotPrefabUrl, cc.Prefab)).map;

        this._subjectNormalPrefabMap.forEach((v, k) => { GMC.prefabMap.set(k, v) });
        this._subjectSpecialPrefabMap.forEach((v, k) => { GMC.prefabMap.set(k, v) });
        this._subjectJackpotPrefabMap.forEach((v, k) => { GMC.prefabMap.set(k, v) });

        if (this.createType == ECreateType.RANDOM) {
            if (this.createspeType == ECSpecialType.NORMAL) {
                const length: number = this.height * this.width;
                for (let i: number = 0; i < length * this._virtual; i++) {
                    const cb: (index: number) => void = ((index: number) => {
                        const arr: Array<[string, cc.Prefab]> = Array.from(this._subjectNormalPrefabMap);
                        const random: number = Math.floor(Math.random() * this._subjectNormalPrefabMap.size);
                        const pre: cc.Prefab = arr[random][1];
                        const name: string = pre.name.substr(pre.name.lastIndexOf("/") + 1);
                        if (this.initFilter.indexOf(name) != -1) {
                            cb(index);
                        } else {
                            const node: cc.Node = cc.instantiate(pre);
                            const subjectBase: SubjectBase = node.getComponent(SubjectBase);
                            node.parent = this._wheel;
                            node.zIndex = subjectBase.zindex;
                            node.setSiblingIndex(index);
                            subjectBase._index = index;
                            subjectBase.init();
                            this.subjectNodeMap.set(index, node);
                        }
                    });
                    cb(i);
                }
            } else if (this.createspeType == ECSpecialType.JACKPOT) {
                const length: number = this.height * this.width;
                for (let i: number = 0; i < length * this._virtual; i++) {
                    const arr: Array<[string, cc.Prefab]> = Array.from(this._subjectJackpotPrefabMap);
                    const random: number = Math.floor(Math.random() * this._subjectJackpotPrefabMap.size);
                    const pre: cc.Prefab = arr[random][1];
                    const node: cc.Node = cc.instantiate(pre);
                    const subjectBase: SubjectBase = node.getComponent(SubjectBase);
                    this.subjectNodeMap.set(i, node);
                    node.parent = this._wheel;
                    node.zIndex = subjectBase.zindex;
                    node.setSiblingIndex(i);
                    subjectBase._index = i;
                    subjectBase.init();
                }
            }
        }
        /** 下一帧后执行关闭自动对齐组件 */
        this.scheduleOnce(() => {
            this._wheel.removeComponent(cc.Layout);
            /** @description 替换索引 */
            this._replaceIndex();
            // this.resetSiblingIndex();
        })
        EventMgr.dispatch(EVENT.EVENT_ROLL_INITFINISH);

    }
    /** @description 普通停止 */
    protected stopNormal(): void {
        this._rollingTimes.fill(0);
        this._rollingStatus.fill(ERollingStatus.STOP);

    }
    /** @description 单轮盘停止滚动 */
    protected stopSingle(): void {
        this._stopPromptly = true;
    }

    /** @description 立即停止 */
    protected stopImmediately(): void {
        this._stopPromptly = true;
        this._rollingTimes.fill(0);
        this._rollingStatus.fill(ERollingStatus.STOP);
    }
    /** 
     * @description 每一列滚动完毕出现在轮盘中时回调 子类实现需要调用super.onAppear(index);
     * @param index 索引(普通轮盘为列数索引,单轮盘为一维数组下标索引)
    */
    protected onAppear(row: cc.Node, index: number) {
        const layerAnim: cc.Node = this.getLayer(EWheelLayer.LAYER_ANIM);
        const subjectBase: SubjectBase = row.getComponent(SubjectBase);
        if (!subjectBase || (subjectBase && subjectBase._index === undefined)) return;
        if (subjectBase._index < (this.height * this.width * (this._virtual - 1))) return;
        const position: cc.Vec3 = subjectBase.initPosition;
        this.gameSpecialID.forEach((v, k) => {
            if (v.indexOf(subjectBase.id) !== -1) {
                if (index == this.width - 1) {
                    this._isLastSpecial = true;
                }
                if (k == ESpecialType.BONUS) {
                    GMC._config.bonusAppear && AudioMgr.play(GMC._config.bonusAppear, GMC._config._bundle, null, false, 1);
                } else if (k == ESpecialType.SCATTER) {
                    GMC._config.scatterAppear && AudioMgr.play(GMC._config.scatterAppear, GMC._config._bundle, null, false, 1);
                }
                subjectBase.showAnimation(position, layerAnim, EAnimNameType.APPEAR, true, () => {

                }, false);
            }
        })
    };


    /** @description 特殊图标出现落定时的回调 */
    protected specialAppear(index: number): void { }
    /** @description 重置节点索引 */
    protected resetSiblingIndex(): void {
        this.wheelMap.forEach((v, k) => {
            const node: cc.Node = this._wheel.children[v];
        })
    }
    /** @description 收到下注结果时回调 子类实现 */
    protected abstract onReceiveBetResult();
    /** @description 滚动完毕后执行特殊动画逻辑 */
    protected onSpecialLogic() {
        /** @description 这里会开始调用所有中奖动画效果,子类如重写需要调用super.onSpecialLogic() */
        EventMgr.dispatch(EVENT.EVENT_SPECIAL_LOGIC);
        this.onPlayWinAnim();
        this.isRolling = false

    };
    /** @description 转换展示节点 */
    protected _getResultNode(): Array<cc.Node> {
        // this.resetSiblingIndex();
        const resultArr: Array<cc.Node> = new Array<cc.Node>(this.wheelMap.size);
        this.wheelMap.forEach((v, k) => {
            const node: cc.Node = this.subjectNodeMap.get(v);
            resultArr[k] = node;
        })
        // const result: Array<cc.Node> = [].concat.apply([], this.resultTransform2<cc.Node>(resultArr));
        const result: Array<cc.Node> = [].concat.apply([], this.arrToTwoArr<cc.Node>(resultArr, 1));
        return result;
    }


    /** @description 播放普通中奖动画 */
    protected onPlayWinAnim(): void {
        const layerAnim: cc.Node = this.getLayer(EWheelLayer.LAYER_ANIM);
        const normalArr: Array<SubjectBase> = new Array<SubjectBase>();
        const specialArr: Array<SubjectBase> = new Array<SubjectBase>();
        const lines: Array<number> = GMC.betResultData.betResult.lineIds;
        const length: number = this.height * this.width;
        for (let i: number = 0; i < this.winArr.length; i++) {
            if (this.winArr[i] && this.winArr[i].winPrize && i != length) {
                /** @description 获取中奖展示节点 */
                const node: cc.Node = this._getResultNode()[this.winArr[i].index];
                /** @description 获取物件组件 */
                const subject: SubjectBase = node.getComponent(SubjectBase);
                /** @description 这里不确定多格物件是否属于普通物件 */
                if (subject.type == ESubjectType.NORMAL) {
                    normalArr.push(subject);
                } else if (subject.type == ESubjectType.SPECIAL) {
                    specialArr.push(subject);
                }
            }
        }
        if ((GMC.betResultData.nextGameInfo.subGameType == SubGameType.Free || GMC.betResultData.nextGameInfo.subGameType == SubGameType.Free_Choose) || (GMC.betResultData.nextGameInfo.subGameType == SubGameType.Base && GMC.betResultData.nextGameInfo.subGameStatus == SubGameStatus.Choose)
            || GMC.betResultData.nextGameInfo.subGameType == SubGameType.Bonus) {
            this.playAnimType = EPlayAnimType.ALL;
        }
        let isFinish: Array<boolean>;
        if (this.playAnimType == EPlayAnimType.LINE) {
            isFinish = new Array<boolean>(lines.length).fill(false)
            let index: number = 0;
            const playLine: (line: number) => void = ((line: number) => {
                if (this.isRolling) {
                    clearInterval(this._interval);
                    this._interval = null;
                    this.getLayer(EWheelLayer.LAYER_TOP_BORDER_ANIM).removeAllChildren();
                    return;
                }
                const tempFinish: Array<boolean> = new Array<boolean>(normalArr.length).fill(false);
                for (let i: number = 0; i < normalArr.length; i++) {
                    const subject: SubjectBase = normalArr[i];
                    if (this.idFilter.indexOf(subject.id) !== -1 || subject._index == -1) continue;
                    const node: cc.Node = subject.node;
                    if (!subject.data || (subject.data && !subject.data.lines)) continue;
                    if (subject.data.lines.indexOf(line) === -1) {
                        tempFinish[i] = true;
                        continue;
                    } else {
                        if (this.idFilter.indexOf(subject.id) === -1) {
                            if (this.borderArgs.isShow) {
                                subject.showBorderAnimation(this.borderArgs, node.position, this.getLayer(EWheelLayer.LAYER_TOP_BORDER_ANIM), () => {
                                    subject.showBorderAnimation(this.borderArgs, node.position, this.getLayer(EWheelLayer.LAYER_TOP_BORDER_ANIM), null, false);
                                }, false);
                            }
                            subject.showAnimation(node.position, layerAnim, EAnimNameType.WIN, this.isPlayAnimDestroy, () => {
                                tempFinish[i] = true;
                                node.getChildByName("Single").active = true;
                            }, false);
                        }
                    }
                }
                const checkIsTempFinish: () => void = () => {
                    if (tempFinish.indexOf(false) === -1 && index < lines.length) {
                        this.getLayer(EWheelLayer.LAYER_TOP_BORDER_ANIM).removeAllChildren();
                        clearInterval(this._interval);
                        this._interval = null;
                        isFinish[index] = true;
                        ++index;
                        checkIsFinish();
                        if (index == lines.length) {
                            if (GMC.nextGameInfo.subGameType != SubGameType.Base) {
                                return;
                            } else {
                                if (GMC.nextGameInfo.subGameType == SubGameType.Base && GMC.nextGameInfo.subGameStatus == SubGameStatus.Choose) {
                                    return;
                                } else {
                                    index %= lines.length;
                                    playLine(lines[index]);
                                }
                            }
                        } else {
                            playLine(lines[index]);
                        }
                    }
                };
                this._interval = setInterval(checkIsTempFinish, 100);
            });
            if (lines && lines.length > 0) {
                let finish = new Array<boolean>(normalArr.length).fill(false);
                for (let i: number = 0; i < normalArr.length; i++) {
                    const subject: SubjectBase = normalArr[i];
                    if (this.idFilter.indexOf(subject.id) !== -1 || subject._index == -1) continue;
                    const node: cc.Node = subject.node;
                    /** @description 判断动画是否需要循环播放 */
                    const loop: boolean = GMC.winType == EWinType.NONE ? true : false;
                    if (this.idFilter.indexOf(subject.id) === -1) {
                        // const loop: boolean = false;
                        if (this.borderArgs.isShow) {
                            subject.showBorderAnimation(this.borderArgs, node.position, this.getLayer(EWheelLayer.LAYER_TOP_BORDER_ANIM));
                        }
                        subject.showAnimation(node.position, layerAnim, EAnimNameType.WIN, true, () => {
                            finish[i] = true;
                            node.getChildByName("Single").active = true;
                            finishCheck();
                        }, loop);
                    }
                }
                const finishCheck = () => {
                    if (finish.indexOf(false) === -1) {
                        const line: number = lines[index];
                        playLine(line);
                    }
                };
            }
        } else {
            isFinish = new Array<boolean>(normalArr.length).fill(false);
            for (let i: number = 0; i < normalArr.length; i++) {
                const subject: SubjectBase = normalArr[i];
                if (this.idFilter.indexOf(subject.id) !== -1 || subject._index == -1) continue;
                const node: cc.Node = subject.node;
                /** @description 判断动画是否需要循环播放 */
                const loop: boolean = GMC.winType == EWinType.NONE ? true : false;
                if (this.idFilter.indexOf(subject.id) === -1) {
                    if (this.borderArgs.isShow) {
                        subject.showBorderAnimation(this.borderArgs, node.position, this.getLayer(EWheelLayer.LAYER_TOP_BORDER_ANIM), null, loop);
                    }
                    subject.showAnimation(node.position, layerAnim, EAnimNameType.WIN, this.isPlayAnimDestroy, () => {
                        if (isFinish) {
                            isFinish[i] = true;
                            checkIsFinish();
                        }
                        if (!loop) {
                            node.getChildByName("Single").active = true;
                        }
                    }, loop);
                }

            }
        }


        /** @description 检查中奖动画是否播放完毕 */
        const checkIsFinish: () => void = () => {
            if (isFinish.indexOf(false) === -1 || !isFinish) {
                /** @description 播放完毕后播放特殊中奖动画 */
                // this._scheduler.unschedule(checkIsFinish, this);
                this.onPlaySpecial(specialArr);
            }
        };
        if (normalArr.length == 0) {
            checkIsFinish();
        }
        // this._scheduler.schedule(checkIsFinish, this, 0.1, cc.macro.REPEAT_FOREVER, 0, false);

    }

    /** @description 结果替换完毕回调,子类根据需求实现 */
    protected replaceFinish(): void {
        // this.resetSiblingIndex();
        this.isReplaceFinish = true;
    }

    protected playChooseAudio(): void { };
    protected playFreeBeginAudio(): void { };
    protected playBonusBeginAudio(): void { };
    protected playAnimationFinish(): void { };

    /** @description 播放特殊中奖动画 */
    protected onPlaySpecial(winArr: Array<SubjectBase>): void {
        const layerAnim: cc.Node = this.getLayer(EWheelLayer.LAYER_ANIM);
        const isFinish: Array<boolean> = new Array<boolean>(winArr.length).fill(false);
        if (GMC.collectData && GMC.collectData.collectCurrentValue >= GMC.collectData.collectMaxValue) {
            EventMgr.dispatch(EVENT.EVENT_COLLECT_BEGIN, true);
            return;
        }

        switch (GMC.nextGameInfo.subGameType) {
            case SubGameType.Base:
                switch (GMC.nextGameInfo.subGameStatus) {
                    case SubGameStatus.Choose:
                        this.playChooseAudio();
                        break;
                    case SubGameStatus.Reward:
                        break;
                    case SubGameStatus.Normal:
                        break;
                }
                break;
            case SubGameType.Free:
            case SubGameType.Free_Choose:
                this.playFreeBeginAudio();
                break;
            case SubGameType.Bonus:
                this.playBonusBeginAudio();
                break;
        }

        let time: number = 0;
        if (winArr.length > 0 && GameMainController.betResultData.betResult.subGameType == SubGameType.Base) {
            time = 2;
        }
        if (GMC.betResultData.betResult.subGameType != SubGameType.Base) {
            this.playAnimationFinish();
        } else if (GMC.betResultData.betResult.subGameType == SubGameType.Base &&
            (GMC.betResultData.nextGameInfo.subGameType != SubGameType.Base ||
                GMC.betResultData.nextGameInfo.subGameStatus == SubGameStatus.Choose)) {
            for (let i: number = 0; i < winArr.length; i++) {
                const subject: SubjectBase = winArr[i];
                if (this.idFilter.indexOf(subject.id) !== -1 || subject._index == -1) continue;
                const node: cc.Node = subject.node;
                subject.showAnimation(node.position, layerAnim, EAnimNameType.WIN, false, () => {
                    // node.getChildByName("Single").active = true;
                    isFinish[i] = true;
                    checkSpecialIsFinish();
                }, false);
            }

            /** @description 检查中奖动画是否播放完毕 */
            const checkSpecialIsFinish: () => void = () => {
                if (isFinish.indexOf(false) === -1 || !isFinish) {
                    /** @description 播放完毕后播放特殊中奖动画 */
                    this.playAnimationFinish();
                }
            };
            if (winArr.length == 0) {
                checkSpecialIsFinish();
            }
        } else {
            this.playAnimationFinish();
        }
        // this._scheduler.schedule(checkSpecialIsFinish, this, 0.1, cc.macro.REPEAT_FOREVER, 0, false);
        /** @description 特殊中奖动画播放完毕后延迟2秒进入特殊场景转场流程 */
        this.scheduleOnce(() => {
            if (GMC.betResultData.betResult.subGameType == SubGameType.Base) {
                switch (GMC.betResultData.nextGameInfo.subGameType) {
                    case SubGameType.Base:
                        switch (GMC.betResultData.nextGameInfo.subGameStatus) {
                            case SubGameStatus.Choose:
                                this.onSelect();
                                break;
                            case SubGameStatus.Reward:
                                break;
                        }
                        break;
                    case SubGameType.Free:
                    case SubGameType.Free_Choose:
                        if (this.isFirstFree) {
                            this.onFreeBegin(true);
                        } else {
                            this.onFreeBegin(false);
                        }
                        break;
                    case SubGameType.Bonus:
                    case SubGameType.Bonus_Choose:
                        if (this.isFirstBonus) {
                            this.onBonusBegin(true);
                        } else {
                            this.onBonusBegin(false);
                        }
                        break;
                }
            }
        }, time);
    }
    /** @description 结算开始事件，在status = 1的时候调用 */
    public onSettleAccountsBegin(): void { }
    /** @description 触发收集玩法 */
    public onCollect(): void { };

    /** @description 下注回调 */
    protected onBetResult(data: SlotSubGameBetResult): void {
        if (!this.node.active || this.node.opacity == 0) return;
        if (!GMC.isNormalWheelBetResult) return;
        this._isBetResult = true;
        this.winArr = [];
        if (this.createspeType == ECSpecialType.NORMAL) {
            for (let i: number = 0; i < data.showSubjects.length; i++) {
                this.winArr.push(data.showSubjects[i])
            }
        } else if (this.createspeType == ECSpecialType.JACKPOT) {
            for (let i: number = 0; i < data.showSubjects.length; i++) {
                if (i == data.showSubjects.length - 1) {
                    this.winArr.push(data.showSubjects[i])
                }
            }
        }

        if (GMC.betResultData.betResult.subGameType != SubGameType.Bonus && GMC.betResultData.betResult.subGameType != SubGameType.Bonus_Choose
            && (GMC.betResultData.nextGameInfo.subGameType == SubGameType.Bonus || GMC.betResultData.nextGameInfo.subGameType == SubGameType.Bonus_Choose)) {
            this.isFirstBonus = true;
        } else {
            this.isFirstBonus = false;
        }

        if ((GMC.betResultData.betResult.subGameType != SubGameType.Free && GMC.betResultData.betResult.subGameType != SubGameType.Free_Choose) &&
            (GMC.betResultData.nextGameInfo.subGameType == SubGameType.Free || GMC.betResultData.nextGameInfo.subGameType == SubGameType.Free_Choose)) {
            this.isFirstFree = true;
        } else {
            this.isFirstFree = false;
        }

        this._resultSubjects = [].concat.apply([], this.resultTransform(this.winArr));
        this._resultSubjectsTwo = this.arrToTwoArr<SlotSlotSubject>(this._resultSubjects, 1);
        this.onReceiveBetResult();
        if (this.rollingType == ERollingType.NORMAL) {
            this.replaceResult();
        } else if (this.rollingType == ERollingType.SINGLE) {
            this.replaceResultSingle();
        }
    };
    /** @description 登录回调 */
    protected onLoginResult(data: SlotPushLogin): void {
        if (!this.node.active) return;
        if (GMC.collectData && GMC.collectData.collectCurrentValue >= GMC.collectData.collectMaxValue) {
            this.onCollect();
        } else {
            if (GMC.subGameInfo) {
                if (GMC.subGameInfo.subGameType == SubGameType.Base) {
                    if (GMC.subGameInfo.subGameStatus == SubGameStatus.Choose) {
                        this.onSelect();
                    }
                } else if (GMC.subGameInfo.subGameType == SubGameType.Free || GMC.subGameInfo.subGameType == SubGameType.Free_Choose || GMC.subGameInfo.subGameType == SubGameType.Super_Free || GMC.subGameInfo.subGameType == SubGameType.Mega_Free) {
                    this.isFirstFree = false;
                    if (GMC.subGameInfo.subGameStatus == SubGameStatus.Reward) {
                        this.onSettleAccountsBegin();
                    } else {
                        this.onFreeBegin(true, true);
                    }
                }
                else if (GMC.subGameInfo.subGameType == SubGameType.Bonus || GMC.subGameInfo.subGameType == SubGameType.Bonus_Choose) {
                    this.isFirstBonus = false;
                    if (GMC.subGameInfo.subGameStatus == SubGameStatus.Reward) {
                        this.onSettleAccountsBegin();
                    } else {
                        this.onBonusBegin(true, true);
                    }
                }
            }
        }
        this._loginResult();
        this._initwheel(data);
        EventMgr.dispatch(EVENT.EVENT_UPDATE_COLLECT_PROGRESS, true);
    };

    protected _loginResult(): void { }
    /** @description 轮盘回归 */
    protected wheelReturn(subject: Array<SlotSlotSubject>): void {
        this._wheel.children.forEach((v, k) => {
            const subjectBase: SubjectBase = v.getComponent(SubjectBase);
            v.position = subjectBase.initPosition;
            subjectBase.y = subjectBase.initY;
            v.active = true;
            if (v.getChildByName("Single")) {
                v.getChildByName("Single").active = true;
                v.getChildByName("Single").position = cc.Vec3.ZERO;
            }
        })
        const arr: Array<cc.Node> = new Array<cc.Node>(this._wheelMap.size);
        this.wheelMap.forEach((v, k) => {
            arr[k] = this.subjectNodeMap.get(v);
        })
        const subjects: Array<SlotSlotSubject> = [].concat.apply([], this.resultTransform(subject));
        let count: number = 0;
        console.log("lunpan huigui", subjects);
        const ex = async (_exCount: number) => {
            await this.replaceResultOne(_exCount, subjects, arr).then(async ({ index, isOver }) => {
                count++;
                if (count < this._wheelMap.size) {
                    ex(count);
                }
            });
        }
        ex(count);
    }

    protected onSettleAccountsChange(): void {
        const str: string = cc.sys.localStorage.getItem(`${GMC.id}${ELocalStorageType.TYPE_BET_RESULT}`);
        if (!str) return;
        const localData: SlotPushBetResult = JSON.parse(str);
        if (localData) {
            this.wheelReturn(localData.betResult.showSubjects);
            GMC.tempResultData = localData;
        }
    }

    /** @description 结算回调 */
    protected onSettleAccounts(data: SlotPushSettlementBonusSuccess): void {
        if (!this.node.active || this.node.opacity == 0) return;
        switch (GMC.saveType) {
            case SubGameType.Free:
            case SubGameType.Free_Choose:
            case SubGameType.Super_Free:
                this.onFreeEnd();
                break;
            case SubGameType.Bonus:
                this.onBonusEnd();
                break;
            case SubGameType.Base:
                break;
        }
        // setTimeout(() => {
        //     GameMainController.saveType = SubGameType.Base;
        // }, 1000);
    }


    /** @description 结果数据转换 */
    protected resultTransform(arr: Array<SlotSlotSubject>): Array<Array<SlotSlotSubject>> {
        const _arr: Array<Array<SlotSlotSubject>> = new Array<Array<SlotSlotSubject>>();
        const width: number = this.width;
        const height: number = this.height;
        for (let i: number = 0; i < height; i++) {
            _arr.push(new Array<SlotSlotSubject>());
            for (let j: number = 0; j < width; j++) {
                _arr[i][j] = null;
            }
        }

        for (let i: number = 0; i < arr.length; i++) {
            const data: SlotSlotSubject = arr[i];
            const x: number = Math.floor(i % height);
            const y: number = Math.floor(i / (height));
            _arr[x][y] = data;
        }
        return _arr;
    }
    /** @description 结果数据转换2 */
    protected resultTransform2<T>(arr: Array<T>): T[][] {
        const _arr: Array<Array<T>> = new Array<Array<T>>();
        const width: number = this.width;
        const height: number = this.height;
        for (let i: number = 0; i < width; i++) {
            _arr.push(new Array<T>());
            for (let j: number = 0; j < height; j++) {
                _arr[i][j] = null;
            }
        }
        for (let i: number = 0; i < arr.length; i++) {
            const data: T = arr[i];
            const x: number = Math.floor(i % width);
            const y: number = Math.floor(i / (width));
            _arr[x][y] = data;
        }
        return _arr;
    }

    /** @description 贝塞尔曲线滚动 */
    protected playBezier(): void { }
    /** @description 贝塞尔曲线停止 */
    protected stopBezier(): void { }
    /** @description 替换单个结果 */
    protected async replaceResultOne(index: number, subjects: Array<SlotSlotSubject>, arr: Array<cc.Node>): Promise<{ index: number, isOver: boolean }> {
        return new Promise((resolve => {
            const cell: cc.Node = arr[index];
            let subjectBase: SubjectBase = cell.getComponent(SubjectBase);
            if (subjects[index] && (this.idFilter.indexOf(subjects[index].id) !== -1 || subjects[index].index == -1)) {
                if (subjects[index]) {
                    subjectBase.data = subjects[index];
                    let ranid = Math.floor(Math.random() * (this.idFilter.length - 1)) + 1
                    subjectBase.replace(this.idFilter[ranid]).then(() => {
                        resolve({ index: index, isOver: true });
                    });
                    const cell2: cc.Node = arr[index + 1];
                    let subjectBase2: SubjectBase = cell2.getComponent(SubjectBase);
                    let ranid2 = Math.floor(Math.random() * (this.idFilter.length - 1)) + 1
                    subjectBase2.replace(this.idFilter[ranid2]).then(() => {
                        resolve({ index: index, isOver: true });
                    });
                }
                // resolve({ index: index, isOver: true });
                return;
            }
            switch (this.rollingType) {
                case ERollingType.NORMAL:
                    const replaceNormal: () => void = () => {
                        if (subjects[index]) {
                            subjectBase.data = subjects[index];
                            subjectBase.replace(subjects[index].id).then(() => {
                                resolve({ index: index, isOver: true });
                            });
                        } else {
                            resolve({ index: index, isOver: false })
                        }

                    };
                    replaceNormal();
                    break;
                case ERollingType.SINGLE:
                    const replaceSingle: () => void = () => {
                        if (subjects[index]) {
                            subjectBase.data = subjects[index];
                            subjectBase.replace(subjects[index].id).then(() => {
                                resolve({ index: index, isOver: true });
                            });
                        } else {
                            resolve({ index: index, isOver: false })
                        }
                    };
                    replaceSingle();
                    break;
            }
            this.gameSpecialID.forEach((v, k) => {
                if (subjects[index] && v.indexOf(subjects[index].id) !== -1) {
                    switch (k) {
                        case ESpecialType.BONUS:
                            subjectBase.type = ESubjectType.SPECIAL;
                            (subjectBase as SubjectSpecial).specialType = ESpecialType.BONUS;
                            break;
                        case ESpecialType.SCATTER:
                            subjectBase.type = ESubjectType.SPECIAL;
                            (subjectBase as SubjectSpecial).specialType = ESpecialType.SCATTER;
                            break;
                        case ESpecialType.LINK:
                            subjectBase.type = ESubjectType.SPECIAL;
                            (subjectBase as SubjectSpecial).specialType = ESpecialType.LINK;
                            break;
                    }
                }
            });
            cell.zIndex = subjectBase.zindex;
        }));
    }

    /** @description 替换单轮盘结果 */
    @catchError('Failed to replace roulette result')
    protected async replaceResultSingle(): Promise<void> {
        if (!this.node.active || this.node.opacity == 0) return;
        const arr: Array<cc.Node> = new Array<cc.Node>(this._wheelMap.size);
        this._wheelMap.forEach((v, k) => {
            const node: cc.Node = this.subjectNodeMap.get(v);
            arr[k] = node;
        })
        const subjects: Array<SlotSlotSubject> = this._resultSubjects;
        let count: number = 0;
        const ex = async (_exCount: number) => {
            if (this._stopColFilter.indexOf(_exCount) != -1) {
                count++;
                if (count < this._wheelMap.size) {
                    ex(count);
                } else {
                    let num: number = 0;
                    arr.forEach(v => {
                        v.zIndex = v.getComponent(SubjectBase).zindex + (num++);
                    })
                    this.replaceFinish();
                }
                return;
            }
            const node: cc.Node = arr[_exCount];
            if (node.getChildByName("Single").children[0].y <= 0) {
                await this.replaceResultOne(_exCount, subjects, arr).then(async ({ index, isOver }) => {
                    count++;
                    if (count < this._wheelMap.size) {
                        ex(count);
                    } else {
                        let num: number = 0;
                        arr.forEach(v => {
                            v.zIndex = v.getComponent(SubjectBase).zindex + (num++);
                        })
                        this.replaceFinish();
                    }
                });
            } else {
                this.scheduleOnce(async () => {
                    await ex(_exCount);
                }, this.rollingSpeed / 1000);
            }
        }
        ex(count);


    }

    /** @description 替换轮盘结果 */
    @catchError('Failed to replace roulette result')
    protected async replaceResult(isForce: boolean = false): Promise<void> {
        if (!this.node.active || this.node.opacity == 0) return;
        const arr: Array<cc.Node> = new Array<cc.Node>(this._wheelMap.size);
        this._wheelMap.forEach((v, k) => {
            const node: cc.Node = this.subjectNodeMap.get(v);
            arr[k] = node;
        })
        const subjects: Array<SlotSlotSubject> = this._resultSubjects;
        let count: number = 0;
        const ex = async (_exCount: number) => {
            if (this._stopColFilter.indexOf(_exCount) != -1) {
                count++;
                if (count < this._wheelMap.size) {
                    ex(count);
                } else {
                    let num: number = 0;
                    arr.forEach(v => {
                        v.zIndex = v.getComponent(SubjectBase).zindex + (num++);
                    })
                    this.replaceFinish();
                }
                return;
            }
            const node: cc.Node = arr[_exCount];
            if (!isForce) {
                if (node.y <= 0) {
                    await this.replaceResultOne(_exCount, subjects, arr).then(async ({ index, isOver }) => {
                        count++;
                        if (count < this._wheelMap.size) {
                            ex(count);
                        } else {
                            // let num: number = 0;
                            arr.forEach(v => {
                                const com: SubjectBase = v.getComponent(SubjectBase);
                                // v.zIndex = v.getComponent(SubjectBase).zindex + (num++);
                                if (com.type == ESubjectType.NORMAL) {
                                    com.zindex = 0;
                                } else {
                                    com.zindex = 1;
                                }
                                v.zIndex = com.zindex;
                            })
                            this.replaceFinish();
                        }
                    });
                } else {
                    this.scheduleOnce(async () => {
                        await ex(_exCount);
                    }, this.rollingSpeed / 1500);
                }
            } else {
                await this.replaceResultOne(_exCount, subjects, arr).then(async ({ index, isOver }) => {
                    count++;
                    if (count < this._wheelMap.size) {
                        ex(count);
                    } else {
                        let num: number = 0;
                        arr.forEach(v => {
                            v.zIndex = v.getComponent(SubjectBase).zindex + (num++);
                        })
                        this.replaceFinish();
                    }
                });
            }
        }
        ex(count);
    }

    /** @description 从一维数组转换到二维数组处理函数 */
    protected arrToTwoArr<T>(arr: Array<T>, virtual: number): Array<Array<T>> {
        const _arr: Array<Array<T>> = new Array<Array<T>>();
        const width: number = this.width;
        const height: number = this.height;
        for (let i: number = 0; i < width; i++) {
            _arr.push(new Array<T>());
            for (let j: number = 0; j < height * virtual; j++) {
                _arr[i][j] = null;
            }
        }
        for (let i: number = 0; i < arr.length; i++) {
            const data: T = arr[i];
            const x: number = Math.floor(i % width);
            const y: number = Math.floor(i / (width));
            _arr[x][y] = data;
        }
        return _arr;
    }

    /** @description 替换索引 */
    protected _replaceIndex(): void {
        let wheeArr: Array<cc.Node> = new Array<cc.Node>();
        this.subjectNodeMap.forEach((v, k) => {
            wheeArr.push(v);
        });
        this._wheelArr = this.arrToTwoArr<cc.Node>(wheeArr, this._virtual);

        /** @description 结算map索引 */
        const max: number = this.height * this.width;
        let count: number = 0;
        for (let i: number = this._wheel.childrenCount - max; i <= this._wheel.childrenCount - 1; i++) {
            this._wheelMap.set(count++, i);
        }
        /** @description 结算展示轮盘节点的行列关系 */
        const arr: Array<cc.Node> = new Array<cc.Node>(this._wheelMap.size);
        this._wheelMap.forEach((v, k) => {
            const node: cc.Node = this.subjectNodeMap.get(v);
            arr[k] = node;
        })
        this._wheelResultArr = this.arrToTwoArr<cc.Node>(arr, 1);



        /** @description 初始化物件x,y坐标 */
        for (let i: number = 0; i < this._wheelArr.length; i++) {
            for (let j: number = 0; j < this._wheelArr[i].length; j++) {
                const node: cc.Node = this._wheelArr[i][j];
                const subjectBase: SubjectBase = node.getComponent(SubjectBase);
                subjectBase.initX = subjectBase.x = i;
                subjectBase.initY = subjectBase.y = j;
                subjectBase.initPosition = node.position;

            }
        }
    }

    /**
     * 更新背景音乐和图片
     * @param bgNode 
     * @param imgCfgIndex 
     * @param audioCfgIndex 
     */
    public async updateBg(bgNode: cc.Node, imgCfgIndex: number, audioCfgIndex: number): Promise<void> {
        if (imgCfgIndex !== undefined && imgCfgIndex >= 0 && imgCfgIndex < GMC._config._bgImgList.length) {
            if (bgNode) {
                bgNode.getComponent(cc.Sprite).spriteFrame = this.bgList[imgCfgIndex];
            }
        }

        if (audioCfgIndex !== undefined && audioCfgIndex >= 0 && audioCfgIndex < GMC._config._bgMusicList.length) {
            const bgmUrl: string = GMC._config._bgMusicList[audioCfgIndex];
            AudioMgr.playMusic(bgmUrl, GMC._config._bundle, true, 0.05);
        }

    }


    /** @description 开始滚动 */
    private _play(): void {
        if (!this.node.active || this.node.opacity == 0) return;
        /** @description 重置轮盘状态 */
        this.resetstatus();
        /** @description 下注开始回调 */
        this.onSpinBegin();

        this.scheduleOnce(() => {
            switch (this.rollingType) {
                case ERollingType.NORMAL:
                    this.playNormal();
                    break;
                case ERollingType.SINGLE:
                    this.playSingle();
                    break;
            }
        })
    }
    /** @description 滚动停止 */
    private _stop(): void {
        if (!this.node.active || this.node.opacity == 0) return;
        switch (this.rollingType) {
            case ERollingType.NORMAL:
                this.stopImmediately();
                break;
            case ERollingType.SINGLE:
                this.stopSingle();
                break;
        }
    }

    /** @description 重置游戏状态 */
    protected resetstatus(): void {
        this.isReplaceFinish = false;
        this._scatterCount = 0;
        this._bonusCount = 0;
        this._linkCount = 0;
        this._stopCount = 0;
        this._isStop = false;
        this._timeDifference = 0;
        this.rollingSpeed = this._initRollingSpeed;
        this.isRemoveMaskChildren && this.containerMask?.removeAllChildren(true);
        this._isLastSpecial = false;
        this.maskTopMap.clear();
        this.maskTargetMap.clear();
        this._stopArr = new Array<boolean>(this.width).fill(false);
        this._wheel.children.forEach(v => {
            v.active = true;
            if (v.getChildByName("Single")) {
                v.getChildByName("Single").active = true;
                v.getChildByName("Single").position = cc.Vec3.ZERO;
            }
            cc.tween(v).to(0, { y: v.getComponent(SubjectBase).initPosition.y }).start();
        });
    };

    /** @description 清理物件上中奖信息 */
    @catchError('Failed to clean up the winning information. Please check whether the object is correctly bound to the script')
    protected _clearSubject(): void {
        const arr: Array<cc.Node> = new Array<cc.Node>(this._wheelMap.size);
        for (let i: number = 0; i < this._wheelMap.size; i++) {
            const node: cc.Node = this.subjectNodeMap.get(this.wheelMap.get(i));
            const subjectBase: SubjectBase = node.getComponent(SubjectBase);
            subjectBase.data = null;
            subjectBase.reset();
            node.getChildByName("Single").active = true;
            arr[i] = node;
            this.scheduleOnce(() => {
                node.getChildByName("Single").position = cc.Vec3.ZERO;
                node.getChildByName("Single").children[0].position = cc.Vec3.ZERO;
            }, 0.2);
        }
        // this._wheelResultArr = this.arrToTwoArr<cc.Node>(arr, 1);
    }
    /** @description 转动开始时的回弹效果 */
    protected beginSpringback(index: number): void {
        this._wheelArr[index].forEach(v => {
            cc.tween(v).to(0.1, { y: v.y + v.height * 0.3 }).to(this.rollingSpeed / 1000, { y: v.y }).start();
        });
        let timeOut = setTimeout(() => {
            clearTimeout(timeOut);
            this._scheduler.schedule(this._schedulerFunctions[index], this, this.rollingSpeed / 1000, cc.macro.REPEAT_FOREVER, 0, false);
        }, 0.1 + this.rollingSpeed / 1000);
    }

    /** @description 普通轮盘滚动开始 */
    protected playNormal(): void {
        if (!this.node.active || this.node.opacity == 0) return;
        // if (this.isRolling) return;
        /** @description 发送下注请求 */
        this.isRolling = true;
        this._stopPromptly = false;
        this.startIntervalCount = -1;
        this.stopIntervalCount = -1;
        this._isBetResult = false;
        this._rollingTimes = this.rollingTimesArray.slice();
        this._schedulerFunctions = new Array<Function>(this.width);
        for (let i: number = 0; i < this._schedulerFunctions.length; i++) {
            this._scheduler.unschedule(this._schedulerFunctions[i], this);
            this._schedulerFunctions[i] = null;
        }
        this._rollingStatus = new Array<ERollingStatus>(this.width).fill(ERollingStatus.ROLLING);
        this._rollingTimes.forEach(v => {
            v += this.stopInterval;
            v %= this.height * this._virtual;
        });
        this._stopColFilter = new Array<number>();
        for (let i: number = 0; i < this.rollingSequence.length; i++) {
            if (this.rollingSequence[i] == -1) {
                for (let j: number = 0; j < this.height; j++) {
                    if (j == 0) {
                        this._stopColFilter.push(i);
                    } else {
                        this._stopColFilter.push(i + this.width * j);
                    }

                }
            }
        }
        this.getLayer(EWheelLayer.LAYER_ANIM).removeAllChildren();
        this.getLayer(EWheelLayer.LAYER_TOP_BORDER_ANIM).removeAllChildren();
        this._clearSubject();
        let stopCount: number = 0;
        for (let i: number = 0; i < this.width; i++) {
            console.error("rollingSequence", this.rollingSequence[i]);
            if (this.rollingSequence[i] == -1) {
                stopCount++;
                if (stopCount >= this.width) {
                    this.scheduleOnce(() => {
                        this.onSpecialLogic && this.onSpecialLogic();
                    }, 2);
                    return;
                }
                continue;
            }
            const index: number = this.rollingSequence[i] - 1;
            const self: WheelBase = this;
            this._schedulerFunctions[index] = function () {
                if (!self._stopPromptly) {
                    self.stopIntervalCount = index;
                } else {
                    self.stopIntervalCount = 0;
                }
                self._rollingCol(self._wheelArr[index], index);
            }.bind(this);
            if (this.isRollingBeginSpringback) {
                this.beginSpringback(index);
            } else {
                this._scheduler.schedule(this._schedulerFunctions[index], this, this.rollingSpeed / 1000, cc.macro.REPEAT_FOREVER, 0, false);
            }
        }
    }

    /** @description 单轮盘滚动开始 */
    protected playSingle(): void {
        if (!this.node.active || this.node.opacity == 0) return;
        // if (this.isRolling) return;
        /** @description 发送下注请求 */
        // GMC.reqPlayerBet();
        this.isRolling = true;
        this._stopPromptly = false;
        this.startIntervalCount = -1;
        this.stopIntervalCount = -1;
        this.isRolling = true;
        this._stopPromptly = false;
        this.startIntervalCount = -1;
        this.stopIntervalCount = -1;
        this._isBetResult = false;
        this._rollingTimes = this.rollingTimesArray.slice();
        this._schedulerFunctions = new Array<Function>(this.width);
        for (let i: number = 0; i < this._schedulerFunctions.length; i++) {
            this._scheduler.unschedule(this._schedulerFunctions[i], this);
            this._schedulerFunctions[i] = null;
        }
        this._rollingStatus = new Array<ERollingStatus>(this.width).fill(ERollingStatus.ROLLING);
        this._stopColFilter = new Array<number>();
        for (let i: number = 0; i < this.rollingSequence.length; i++) {
            if (this.rollingSequence[i] == -1) {
                for (let j: number = 0; j < this.height; j++) {
                    if (j == 0) {
                        this._stopColFilter.push(i);
                    } else {
                        this._stopColFilter.push(i + this.width * j);
                    }

                }
            }
        }
        this.getLayer(EWheelLayer.LAYER_ANIM).removeAllChildren();
        this.getLayer(EWheelLayer.LAYER_TOP_BORDER_ANIM).removeAllChildren();
        this._clearSubject();
        for (let i: number = 0; i < this.width; i++) {
            const self: WheelBase = this;
            this._schedulerFunctions[i] = function () {
                if (!self._stopPromptly) {
                    self.stopIntervalCount = i;
                } else {
                    self.stopIntervalCount = 0;
                }
                // self._rollingCol(self._wheelArr[i], index);
                self._rollingColSingle(self._wheelArr[i], i);

            }.bind(this);
            this._scheduler.schedule(this._schedulerFunctions[i], this, this.rollingSpeed / 1000, cc.macro.REPEAT_FOREVER, 0, false);
        }
    }
    /** @description 逐个停止和回弹效果 */
    protected stopRowAndSpringback(index: number): void {
        // if (!this.isReplaceFinish) return;
        const col: Array<cc.Node> = this._wheelArr[index];
        let isFinish: boolean = false;
        const row: cc.Node = col[0];
        const subjectBase: SubjectBase = row.getComponent(SubjectBase);
        if (subjectBase.y == 0) {
            isFinish = true;
        } else {
            return;
        }

        const cb: (stopInterval: number, unscheduleTime: number) => void = ((stopInterval: number, unscheduleTime: number) => {
            this.scheduleOnce(() => {
                if (isFinish && this._schedulerFunctions[index]) {
                    const col: Array<cc.Node> = this._wheelArr[index];
                    this.readyStop(index);
                    const animTime: number = 0.1;
                    this._scheduler.unschedule(this._schedulerFunctions[index], this);
                    this._schedulerFunctions[index] = null;
                    this._rollingStatus[index] = ERollingStatus.NONE;
                    for (let i: number = 0; i < col.length; i++) {
                        const row: cc.Node = col[i];
                        const subjectBase: SubjectBase = row.getComponent(SubjectBase);
                        const single: cc.Node = row.getChildByName("Single");
                        if (subjectBase.isFilderSingle) continue;
                        /** 转轴修正 */
                        setTimeout(() => {
                            cc.tween(row).stop();
                            cc.tween(row)
                                .call(() => {
                                    for (let j: number = 0; j < single.children.length; j++) {
                                        const node: cc.Node = single.children[j];
                                        cc.tween(node).stop();
                                        node.y = subjectBase.arrInitPosition[j].y;
                                    }
                                })
                                .to(animTime, { y: row.y - row.height / 6 }, { easing: "backOut" })
                                .to(animTime, { y: row.y + row.height / 10 }, { easing: "smooth" })
                                .to(animTime, { y: subjectBase.initPosition.y }, { easing: "smooth" })
                                .start();
                        }, this.rollingSpeed);
                    }
                    this._stopCount++;
                    let count: number = 0;
                    this.rollingSequence.forEach(v => {
                        if (v != -1) {
                            count += 1;
                        }
                    });
                    /** @description 如果是最后一列执行完毕,开始执行特殊动画执行逻辑*/
                    if (this._stopCount == count) {
                        this.isRemoveMaskChildren && this.containerMask && this.containerMask.removeAllChildren(true);
                        const time: number = this._isLastSpecial ? (animTime * 3) : 0.5;
                        this.scheduleOnce(() => {
                            this.onSpecialLogic && this.onSpecialLogic();
                        }, time);
                    }
                }
            }, unscheduleTime);
        }).bind(this);
        let stopTime: number;
        let unscheduleTime: number;
        let isShowDurmmod: boolean;
        if (this._stopPromptly) {
            stopTime = 0;
            unscheduleTime = 0;
            isShowDurmmod = false;
        } else {
            isShowDurmmod = true;
            stopTime = index / 1000;
            unscheduleTime = index / 1000;
        }
        cb(stopTime, unscheduleTime);
        // const resultArr: Array<cc.Node> = new Array<cc.Node>(this.wheelMap.size);
        // this.wheelMap.forEach((v, k) => {
        //     const node: cc.Node = this.subjectNodeMap.get(v);
        //     resultArr[k] = node;
        // })
        // let groupArr: Array<Array<cc.Node>> = new Array<Array<cc.Node>>(this.width);
        // for (let i: number = 0; i < this._wheelMap.size; i++) {
        //     const node: cc.Node = resultArr[i];
        //     let t: number = i;
        //     let index: number = t %= this.width;
        //     if (!groupArr[index]) {
        //         groupArr[index] = new Array<cc.Node>();
        //     }
        //     groupArr[index].push(node);
        // }
        // const finish: () => void = () => {

        // }
        // let stopIndex: number = 0;
        // const stopCb: (x: number) => void = (x: number) => {
        //     const group: Array<cc.Node> = groupArr[x];
        //     for (let i: number = 0; i < group.length; i++) {
        //         const node: cc.Node = group[i];
        //         const subjectBase: SubjectBase = node.getComponent(SubjectBase);
        //         if (this._schedulerFunctions[subjectBase.singleFunctionIndex]) {
        //             this._scheduler.unschedule(this._schedulerFunctions[subjectBase.singleFunctionIndex], this);
        //             this._schedulerFunctions[subjectBase.singleFunctionIndex] = null;
        //             const single: cc.Node = node.getChildByName("Single");
        //             single.active = true
        //             for (let j: number = 0; j < 3; j++) {
        //                 const row: cc.Node = single.children[j];
        //                 if (subjectBase.id && !subjectBase.isFilderSingle) {
        //                     /** 转轴修正 */
        //                     if (this.singleStopIdFilter && this.singleStopIdFilter.indexOf(subjectBase.id) !== -1) {
        //                         break;
        //                     }
        //                     // if (j > 0) {
        //                     //     this.scheduleOnce(() => {
        //                     //         row.active = false;
        //                     //     }, this.rollingSpeed / 500);
        //                     // }
        //                     cc.tween(row)
        //                         .to(this.rollingSpeed / 500, { y: subjectBase.arrInitPosition[j].y }).start();
        //                     this.scheduleOnce(() => {
        //                         cc.tween(row)
        //                             .to(0.25, { y: row.y - single.height / 8 }, { easing: "backOut" })
        //                             .to(0.25, { y: row.y + single.height / 16 }, { easing: "smooth" })
        //                             .to(0.25, { y: subjectBase.arrInitPosition[j].y }, { easing: "smooth" })
        //                             .start();
        //                     }, this.rollingSpeed / 500)
        //                 }
        //             }
        //         }
        //         if (i == groupArr.length - 1) {
        //             this.scheduleOnce(() => {
        //                 if (x < this.width) {
        //                     x++
        //                     stopCb(x);
        //                 } else {
        //                     finish();
        //                 }
        //             }, this.rollingSpeed / 500)
        //         }
        //     }
        // }
        // stopCb(stopIndex);
    }
    /** @description 准备停止 */
    protected readyStop(index: number) { };

    /** @description 逐列停止和回弹效果 */
    @catchError('Stop queue error')
    protected stopColAndSpringback(index: number): void {
        const col: Array<cc.Node> = this._wheelArr[index];
        // const isFinish: Array<boolean> = new Array<boolean>(col.length).fill(false);
        let isFinish: boolean = false;
        const row: cc.Node = col[0];
        const subjectBase: SubjectBase = row.getComponent(SubjectBase);
        if (subjectBase.y == subjectBase.initY) {
            isFinish = true;
        } else {
            return;
        }

        // if (isFinish.indexOf(false) === -1) {
        //     this._waitStopSequence.push(this._wheelResultArr[index]);
        // }
        const cb: (stopInterval: number, unscheduleTime: number) => void = ((stopInterval: number, unscheduleTime: number) => {
            if (isFinish && this._schedulerFunctions[index]) {
                const col: Array<cc.Node> = this._wheelArr[index];
                this.readyStop(index);
                col.forEach(r => {
                    this.gameSpecialID.forEach((v, k) => {
                        const subjectBase: SubjectBase = r.getComponent(SubjectBase);
                        if (subjectBase._index && subjectBase._index >= (this.width * this.height * 2)) {
                            if (v.indexOf(subjectBase.id) !== -1) {
                                switch (k) {
                                    case ESpecialType.BONUS:
                                        this._bonusCount += 1;
                                        GameMainController.bonusCount += 1;
                                        break;
                                    case ESpecialType.SCATTER:
                                        this._scatterCount += 1;
                                        break;
                                    case ESpecialType.LINK:
                                        this._linkCount += 1;
                                        break;
                                }
                            }
                        }
                    })
                })
                this.scheduleOnce(() => {
                    this._scheduler.unschedule(this._schedulerFunctions[index], this);
                    this._schedulerFunctions[index] = null;
                    this._rollingStatus[index] = ERollingStatus.NONE;
                }, unscheduleTime);
                const animTime: number = 0.1;
                this.scheduleOnce(() => {
                    for (let i: number = 0; i < col.length; i++) {
                        const row: cc.Node = col[i];
                        const subjectBase: SubjectBase = row.getComponent(SubjectBase);
                        /** 转轴修正 */
                        setTimeout(() => {
                            cc.tween(row)
                                .to(0, { y: subjectBase.initPosition.y }).call(() => {

                                }).start();
                            if (this.isSpringback) {
                                this.scheduleOnce(() => {
                                    cc.tween(row)
                                        .call(() => {
                                            this.onAppear && this.onAppear(row, index);
                                            if (this.maskTargetMap.size > 0) {
                                                this.maskTargetMap.forEach((v, k) => {
                                                    if (k.substring(0, 1) == index.toString()) {
                                                        this.maskTargetMap.delete(k);
                                                    }
                                                })
                                            }
                                            if (this.maskTopMap.size > 0) {
                                                this.maskTopMap.forEach((v, k) => {
                                                    if (k.substring(0, 1) == index.toString()) {
                                                        this.maskTopMap.delete(k);
                                                    }
                                                })
                                            }
                                        })
                                        .to(animTime, { y: row.y - row.height / 6 }, { easing: "backOut" })
                                        .to(animTime, { y: row.y + row.height / 10 }, { easing: "smooth" })
                                        .to(animTime, { y: subjectBase.initPosition.y }, { easing: "smooth" })
                                        .start();
                                })
                            } else {
                                this.onAppear && this.onAppear(row, index);
                                if (this.maskTargetMap.size > 0) {
                                    this.maskTargetMap.forEach((v, k) => {
                                        if (k.substring(0, 1) == index.toString()) {
                                            this.maskTargetMap.delete(k);
                                        }
                                    })
                                }
                                if (this.maskTopMap.size > 0) {
                                    this.maskTopMap.forEach((v, k) => {
                                        if (k.substring(0, 1) == index.toString()) {
                                            this.maskTopMap.delete(k);
                                        }
                                    })
                                }
                            }
                        }, this.rollingSpeed);
                    }
                    this._stopCount++;
                    let count: number = 0;
                    this.rollingSequence.forEach(v => {
                        if (v != -1) {
                            count += 1;
                        }
                    });
                    /** @description 如果是最后一列执行完毕,开始执行特殊动画执行逻辑*/
                    if (this._stopCount == count) {
                        this.isRemoveMaskChildren && this.containerMask && this.containerMask.removeAllChildren(true);
                        const time: number = this._isLastSpecial ? (animTime * 3) : 0.5;
                        this.scheduleOnce(() => {
                            this.onSpecialLogic && this.onSpecialLogic();
                        }, time);
                    }
                    this.specialAppear && this.specialAppear(index);
                }, stopInterval);
            }
        }).bind(this);
        let stopTime: number;
        let unscheduleTime: number;
        let isShowDurmmod: boolean;
        if (this._stopPromptly) {
            stopTime = 0;
            unscheduleTime = 0;
            isShowDurmmod = false;
        } else {
            isShowDurmmod = true;
            stopTime = index / 1000;
            unscheduleTime = index / 1000;
        }
        cb(stopTime, unscheduleTime);
    }
    /** @description 滚动一列时的处理函数 */
    protected _rollingColCallback(col: Array<cc.Node>): void { }


    protected _rollingColSingle(col: Array<cc.Node>, index: number): void {
        if (GameMainController.gamePause) return;
        this._rollingColCallback(col);
        const self: WheelBase = this;
        for (let i: number = 0; i < col.length; i++) {
            (async (n: number) => {
                const row: cc.Node = col[n];
                const subjectBase: SubjectBase = row.getComponent(SubjectBase);
                const single: cc.Node = row.getChildByName("Single");
                single.active = true
                single.setContentSize(single.parent.getContentSize());
                const mask: cc.Mask = single.getComponent(cc.Mask);
                const laout: cc.Layout = single.getComponent(cc.Layout);
                if (laout) {
                    if (laout.enabled) laout.enabled = !laout.enabled;
                }
                if (mask) {
                    if (!mask.enabled) mask.enabled = !mask.enabled;
                }
                for (let j: number = 0; j < row.children.length; j++) {
                    if (subjectBase.isFilderSingle) {
                        continue;
                    }
                    const node: cc.Node = single.children[j];
                    cc.tween(node).stop();
                    // if (subjectBase.nextYArr.indexOf(-1) != -1) {
                    //     node.y = subjectBase.nextYArr[j];
                    // }
                    if (!node.active) node.active = true;
                    if (node.y < 0) {
                        node.y = single.height * 1;
                        if (!self._isBetResult) {
                            self.resetSubject(node);
                        }
                    }
                    subjectBase.y++;
                    subjectBase.y %= 3;
                    self._rollingSingle(node, j);
                }
            })(i);
        }
        if (this.isReplaceFinish) {
            if (!this._stopArr[index]) {
                this._rollingTimes[index] -= 3;
                if (this._rollingTimes[index] <= 0 && this._rollingStatus[index] != ERollingStatus.STOP) {
                    this._stopArr[index] = true;
                    this._rollingStatus[index] = ERollingStatus.STOP;
                }
            }
        }
        if (this._rollingStatus[index] == ERollingStatus.STOP) {
            this.stopRowAndSpringback(index);
        }


    }

    /** @description 整列滚动 */
    protected _rollingCol(col: Array<cc.Node>, index: number, contrary: boolean = false): void {
        if (GameMainController.gamePause) return;
        this._rollingColCallback(col);
        for (let i: number = 0; i < col.length; i++) {
            (async (n: number) => {
                const row: cc.Node = col[n];
                const subjectBase: SubjectBase = row.getComponent(SubjectBase);
                if (subjectBase.nextY != -1) {
                    cc.tween(row).stop();
                    row.y = subjectBase.nextY;
                }
                if (!contrary) {
                    if (row.y <= -row.height * (this.height - 0.5)) {
                        cc.tween(row).stop();
                        if (this._wheel.height != this.getLayer(EWheelLayer.LAYER_CORE).height * 3) {
                            this._wheel.height = this.getLayer(EWheelLayer.LAYER_CORE).height * 3;
                        }
                        row.y = row.height * ((this.height * 2) + 0.5);
                        // if (subjectBase._index >= 0 && subjectBase._index < (this.width * this.height) * (this._virtual - 1)) {
                        //     this.resetSubject(row);
                        // }

                    }
                }
                else {
                    if (row.y >= this._wheel.height - row.height) {
                        row.y = -row.height / 2;
                    }
                }
                if (this.maskType != EMaskType.NONE && this.isShowMaskSubejct || (this.containerMask && this.containerMask.active && this._isBetResult && this._timeDifference > 0.5)) {
                    if (this.maskTopArr.indexOf(subjectBase.id) !== -1) {
                        const name: string = `${subjectBase.initX}${subjectBase.initY}`;
                        let tempRow: cc.Node;
                        const url: string = GameMainController._config.prefabAssetMap.get((GameMainController._config._subjectData.get(subjectBase.id)));
                        const pre: cc.Prefab = await ResMgr.load<cc.Prefab>(GameMainController._config._bundle, url, cc.Prefab);
                        if (!this.maskTopMap.has(name)) {
                            tempRow = cc.instantiate(pre);
                            tempRow.parent = this.maskType == EMaskType.ALL ? this.containerMask : this.containerMask.children[n];
                            tempRow.name = name;
                            tempRow.scale = 1;
                            this.maskTargetMap.set(name, row);
                            this.maskTopMap.set(name, tempRow);
                        }
                    }
                }
                if (!contrary) {
                    subjectBase.y++;
                    subjectBase.y %= (this.height * this._virtual);
                } else {
                    subjectBase.y--;
                    if (subjectBase.y < 0) {
                        subjectBase.y = (this.height * this._virtual) - 1;
                    }
                }
                this._rollingRow(row, contrary);
            })(i);
        }

        if (this.isReplaceFinish) {
            if (!this._stopArr[index]) {
                this._rollingTimes[index]--;
                if (this._rollingTimes[index] <= 0 && this._rollingStatus[index] != ERollingStatus.STOP) {
                    this._stopArr[index] = true;
                    this._rollingStatus[index] = ERollingStatus.STOP;
                }
            }
        }
        if (this._rollingStatus[index] == ERollingStatus.STOP) {
            this.stopColAndSpringback(index);
        }
    }
    /** @description 滚动单个物件 */
    protected _rollingRow(row: cc.Node, contrary: boolean): void {
        const x: number = row.x;
        const y: number = row.y - ((contrary ? (-row.height * this.subjectNodeScale) : (row.height * this.subjectNodeScale)));
        row.getComponent(SubjectBase).nextY = y;
        cc.tween(row).to(this.rollingSpeed / 1000, { position: cc.v3(x, y) }).start();
        // const y: number = !contrary ? -row.height : row.height;
        // cc.tween(row).by(this.rollingSpeed / 1500, { y: y }).start();
    }

    /** @description 滚动单轮盘的单个物件 */
    protected _rollingSingle(row: cc.Node, index: number): void {
        const x: number = 0;
        const y: number = row.y - row.height;
        row.getComponent(SubjectBase).nextYArr[index] = y;
        cc.tween(row).to(this.rollingSpeed / 1000, { position: cc.v3(x, y) }).start();
    }

    /** @description 销毁物件前最后一次事件 */
    protected async onDestroy(): Promise<void> {
        /** @description 释放子游戏bundle */
        // ResMgr.removeBundle(GMC._config._bundle, true);
        /** @description 停止所有action */
        this.node.stopAllActions();
        /** @description 停止对象所有缓动 */
        cc.tween(this.node).stop();
        /** @description 停止所有调度器 */
        this.unscheduleAllCallbacks();
        /** @description 注销当前所有已注册自定义事件 */
        EventMgr.targetOff(this);
    }
}
