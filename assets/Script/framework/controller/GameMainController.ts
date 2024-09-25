// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

// import { EVENT } from "../../../bundles/barbarian/script/data/ConstDefine";
import { Slot_PushJackpotAmount, Slot_ReqJackpotAmount } from "../../../resources/proto/slot";
import { SubGameType } from "../../../Script/models/socket/SlotPushBetResult";
import { EVENT, NativeEvent } from "../../configs/ConstDefine";
import { Constants } from "../../Constants";
import { SlotPlayerCollectInfo } from "../../models/socket/SlotPlayerCollectInfo";
import { SlotPushAcceptCollectAward } from "../../models/socket/SlotPushAcceptCollectAward";
import { SlotPushBetResult } from "../../models/socket/SlotPushBetResult";
import SlotPushChooseSubGame from "../../models/socket/SlotPushChooseSubGame";
import { SlotPushLogin } from "../../models/socket/SlotPushLogin";
import SlotPushSettlementBonusSuccess from "../../models/socket/SlotPushSettlementBonusSuccess";
import { SlotSlotSubject } from "../../models/socket/SlotSlotSubject";
import { SlotSubGameBetResult } from "../../models/socket/SlotSubGameBetResult";
import { SlotSubGameInfo, SubGameStatus } from "../../models/socket/SlotSubGameInfo";
import { UserInfoModel } from "../../models/UserInfoModel";
import { SlotEventBusEnum } from "../../net/socket/GameHub";
import { HallEventBusEnum } from "../../net/socket/HallHub";
import { BetRoomInfo } from "../../tools/BetKeyConfig";
import HeaderTool from "../../tools/HeaderTool";
import { LocalStorageTool } from "../../tools/storage/LocalStorageTool";
import ConfigBase from "../base/ConfigBase";
import SubjectBase from "../base/subject/SubjectBase";
import WheelBase from "../base/WheelBase";
import { catchError } from "../common/Helper";
import { AudioMgr } from "../mgr/AudioManager";
import { EventMgr } from "../mgr/EventManager";
import { ResMgr } from "../mgr/ResManager";
import { UIMgr } from "../mgr/UIManager";

export enum ELocalStorageType {
    TYPE_BET_RESULT = 'TYPE_BET_RESULT',
}

/**
 * 下注类型
 */
export enum SpinBtnType {
    CanBet = 1,//可以下单
    CanStop = 2,//可以停止
    NotBet = 3,//不可以下单
    AutoBet = 4,//自动下单
}

export const enum EWinType {
    NONE,
    FREEGAME,
    BONUSGAME,
}

export const enum EFreeGameType {
    NORMAL,
    SPECIAL,
}

const { ccclass, property } = cc._decorator;


@ccclass
class GameMainController {
    /**@description 单列对象 */
    private static _instance: GameMainController;
    /**@description 全局唯一,私有构造函数,防止外部new操作 */
    private constructor() {
    };
    /**@description 公开调用接口 */
    public static get instance() {
        if (!this._instance) {
            this._instance = new GameMainController();
        }
        return this._instance;
    }

    public clearInstance(): void {
        EventMgr.targetOff(this);
        if (this._pingHandle) {
            clearInterval(this._pingHandle)
        }

        /** 注释 */
        if (GameMainController._instance) {
            GameMainController._instance = null;
        }
    }

    /** @description 初始化配置 */
    public _initconfig<T extends ConfigBase>(config: T, cb: () => void): void {
        if (!config) {
            throw new Error("error!");
        }
        this._config = config;
        cb && cb();
    }

    /** @description 是否为调试模式下 */
    public isDebug: boolean = false;
    /** @description 记录当前特殊游戏类型退出到basegame用 */
    public saveType: SubGameType = SubGameType.Base;
    /** @description 是否处于特殊freegame */
    public freeGameType: EFreeGameType = EFreeGameType.NORMAL;
    /** @description 特殊freegame中的全部结果 */
    public specialFreeGameBetResult: Array<SlotSubGameBetResult>;
    /** @description 特殊freegame当前次数索引 */
    public specialFreeGameIndex: number = 0;

    public tempResultData: SlotPushBetResult;

    /** @description 当前局数的下注信息（betkey和betNum) */
    public m_thisGameBetKey: number = -1;
    public m_thisGameBetNum: number = 0;

    public get specialFreeGameTimes(): number {
        return this.specialFreeGameBetResult.length;
    }

    /** @description 初始化控制器 */
    public _init<T extends ConfigBase>(config: T, cb: () => void): void {
        if (!config) {
            throw new Error("error!");
        }
        this._config = config;
        /** @description 注册事件 */
        this._register();
        /** @description 初始化房间信息列表 */
        this._initRoomList();

        this._getData();

        cb && cb();
    }

    /** @description 获取游戏数据 */
    private async _getData(): Promise<void> {
        this._gameBundle = this._constants.m_gameBundle ? this._constants.m_gameBundle : await ResMgr.loadBundle(cc.director.getScene().name.toLowerCase());
        this._hallBundle = this._constants.m_hallBundle ? this._constants.m_hallBundle : await ResMgr.loadBundle("hall");
        this._id = (this._constants && this._constants.m_userPlayingGame && this._constants.m_userPlayingGame.m_id) ? this._constants.m_userPlayingGame.m_id : 0;
    }

    public betKeyNum: number = 0;
    public prefabMap: Map<string, cc.Prefab> = new Map<string, cc.Prefab>();
    public collectBigindex: number = 0;
    /** @description 下注计时 */
    private _spinCount: number = -1;
    /** @description 下注interval句柄 */
    private _spinHandle: NodeJS.Timeout;

    /** @description constants单例实例 */
    private _constants: Constants = Constants.getInstance();
    /** @description 心跳定时器句柄 */
    private _pingHandle: NodeJS.Timeout;
    /** @description 子游戏id */
    private _id: number;
    public get id(): number { return this._id };
    public set id(id: number) { this._id = id };
    /** @description 上次登录的最后一局数据 */
    private _lastBetInfo: SlotPushBetResult;
    public get lastBetInfo(): SlotPushBetResult { return this._lastBetInfo };
    public set lastBetInfo(data: SlotPushBetResult) { this._lastBetInfo = data };
    /** @description 登录回调数据 */
    private _loginResultData: SlotPushLogin;
    public get loginResultData(): SlotPushLogin { return this._loginResultData };
    public set loginResultData(data: SlotPushLogin) { this._loginResultData = data };
    /** @description 下注回调数据 */
    private _betResultData: SlotPushBetResult;
    public get betResultData(): SlotPushBetResult { if (!this._betResultData) { this._betResultData = new SlotPushBetResult(); } return this._betResultData };
    public set betResultData(data: SlotPushBetResult) { this._betResultData = data };
    /** @description 收集玩法结算回调数据 */
    private _collectResultData: SlotPushAcceptCollectAward;
    public get collectResultData(): SlotPushAcceptCollectAward { return this._collectResultData };
    public set collectResultData(data: SlotPushAcceptCollectAward) { this._collectResultData = data };
    /** @description 结算回调数据 */
    private _settlementResultData: SlotPushSettlementBonusSuccess;
    public get settlementResultData(): SlotPushSettlementBonusSuccess { return this._settlementResultData };
    public set settlementResultData(data: SlotPushSettlementBonusSuccess) { this._settlementResultData = data };
    public upCollectData: SlotPlayerCollectInfo;
    /** @description 当前收集玩法数据 */
    private _collectData: SlotPlayerCollectInfo;
    public get collectData(): SlotPlayerCollectInfo { return this._collectData };
    public set collectData(data) { this._collectData = data };
    /** @description 当前游戏等级列表 */
    private _subGameInfoList: Array<SlotSubGameInfo>;
    public get subGameInfoList(): Array<SlotSubGameInfo> { return this._subGameInfoList };
    public set subGameInfoList(data: Array<SlotSubGameInfo>) { this._subGameInfoList = data };
    /** @description 当前游戏信息 */
    private _subGameInfo: SlotSubGameInfo;
    public get subGameInfo(): SlotSubGameInfo { return this._subGameInfo };
    public set subGameInfo(data: SlotSubGameInfo) { this._subGameInfo = data };
    /** @description 当前下注结果数据 */
    private _betData: SlotSubGameBetResult;
    public get betData(): SlotSubGameBetResult { return this._betData };
    public set betData(data) { this._betData = data };
    /** @description 下次游戏信息 */
    private _nextGameInfo: SlotSubGameInfo;
    public get nextGameInfo(): SlotSubGameInfo { return this._nextGameInfo };
    public set nextGameInfo(data: SlotSubGameInfo) { this._nextGameInfo = data };
    /** @description 游戏房间信息列表 */
    private _roomList: Array<BetRoomInfo>;
    public get roomList(): Array<BetRoomInfo> { return this._roomList };
    public set roomList(data: Array<BetRoomInfo>) { this._roomList = data };
    public _isSpinBegin: boolean = false;
    public winType: EWinType;
    /** @description 是否禁用ui按钮 */
    public isBanUIBtn: boolean = false;
    /** @description 是否禁止下注 */
    public isBanBet: boolean = false;
    public lastWinNum: number = 0;
    public spinBtnType: SpinBtnType = SpinBtnType.CanBet;
    public collectCoin: number = 0;
    public winNum: number = 0;
    public collectIsUnLock: boolean = false;
    public BonusGoldPoolType: number = 0;
    public bonusCount: number = 0;

    public isNormalWheelBetResult: boolean = true;

    public gamePause: boolean = false;


    //bet下注音效
    public m_betAudioList: string[] = [
        'public_slot/audio/global_bet1',
        'public_slot/audio/global_bet2',
        'public_slot/audio/global_bet3',
        'public_slot/audio/global_bet4',
        'public_slot/audio/global_bet5',
        'public_slot/audio/global_bet6',
        'public_slot/audio/global_bet7',
        'public_slot/audio/global_bet8',
        'public_slot/audio/global_bet9',
        'public_slot/audio/global_bet10',
        'public_slot/audio/global_bet11',
        'public_slot/audio/global_bet12',
        'public_slot/audio/global_bet13',
        'public_slot/audio/global_bet14',
        'public_slot/audio/global_bet15',
        'public_slot/audio/global_bet16',
        'public_slot/audio/global_bet17',
        'public_slot/audio/global_bet18',
        'public_slot/audio/global_bet19',
        'public_slot/audio/global_bet20',
        'public_slot/audio/global_bet21',
        'public_slot/audio/global_bet22',
        'public_slot/audio/global_bet23',
        'public_slot/audio/global_bet24',
        'public_slot/audio/global_bet25',
    ];

    /** @description 获取当前用户头像 */
    public async getUserHeader(): Promise<cc.SpriteFrame> {
        return new Promise(async (resolve) => {
            let id: number = -1;
            if (LocalStorageTool.getUserHeaderId() === undefined || LocalStorageTool.getUserHeaderId() === NaN || !LocalStorageTool.getUserHeaderId()) {
                LocalStorageTool.setUserHeaderId("0");
                id = 0;
            } else {
                id = LocalStorageTool.getUserHeaderId();
            }
            const spriteFrame: cc.SpriteFrame = await ResMgr.load<cc.SpriteFrame>(this._hallBundle, HeaderTool.m_userHeaderImgUrl[id], cc.SpriteFrame);
            resolve(spriteFrame);
        })

    }

    /** @description 当前下注所在的数组索引 */
    private _currBetPointIndex: {
        /** @description 房间索引 */
        roomLevelIndex: number,
        /** @description 下注索引 */
        betLevelIndex: number
    };
    /** @description 当前游戏状态 */
    public get gameStatus(): SubGameStatus {
        return this.subGameInfo.subGameStatus;
    }
    /** @description 默认bet */
    private _defaultBet: number = 50000;

    public _isStopAutoSpin: boolean = false;

    /** @description 下注key*/
    public get betKey(): number {
        // console.error("当前的房间信息:", JSON.stringify(this._roomList), ",当前betkey:", (this._currBetPointIndex.roomLevelIndex * 3 + this._currBetPointIndex.betLevelIndex));
        cc.log("this._currBetPointIndex.roomLevelIndex ==", this._currBetPointIndex.roomLevelIndex)
        cc.log("this._currBetPointIndex.betLevelIndex==", this._currBetPointIndex.betLevelIndex)
        return this._currBetPointIndex.roomLevelIndex * 3 + this._currBetPointIndex.betLevelIndex;
    }
    /** @description 获取最大下注值 */
    public get maxBetNum() {

        return this._roomList[this._roomList.length - 1].betLevel[this._roomList[this._roomList.length - 1].betLevel.length - 1] * 10000;
    }

    public lastBaseWinNum: number = 0;
    public isCollectQuit: boolean = false;

    public checkCollect(isLogin: boolean = false) {
        cc.log("checkCollect！")
        cc.log(this._roomList)
        cc.log(this._currBetPointIndex)
        cc.log("checkCollect@@@@==" + Constants.getInstance().m_userPlayingGame.m_collectRomLevel)
        if (this._roomList && this._currBetPointIndex) {
            console.error("!!!!", this._currBetPointIndex.roomLevelIndex);
            if (Constants.getInstance().m_userPlayingGame.m_collectRomLevel <= (this._roomList[this._currBetPointIndex.roomLevelIndex].roomLevel)) {
                this.collectIsUnLock = true;
                EventMgr.dispatch(EVENT.EVENT_COLLECT_UNLOCK, isLogin);
                cc.log("unlock!")
            } else {
                EventMgr.dispatch(EVENT.EVENT_COLLECT_LOCK);
                this.collectIsUnLock = false;
                cc.log("lock!")
            }
        }
    }

    public unlockclick() {
        let unlockindex = -1
        for (let i = 0; i < 5; i++) {
            if (Constants.getInstance().m_userPlayingGame.m_collectRomLevel <= this._roomList[i].roomLevel) {
                unlockindex = i
                break
            }
        }
        this._currBetPointIndex.roomLevelIndex = unlockindex;
        this._currBetPointIndex.betLevelIndex = 0;
        EventMgr.dispatch(EVENT.EVENT_COLLECT_UNLOCK);
    }

    /** @description 增加下注 */
    public addBetPointIndex(): void {
        if (!this._currBetPointIndex) return;
        if (this._roomList.length < this._currBetPointIndex.roomLevelIndex) return;
        if (this._roomList[this._currBetPointIndex.roomLevelIndex].betLevel.length - 1 > this._currBetPointIndex.betLevelIndex) {
            this._currBetPointIndex.betLevelIndex++;
        } else {
            if (this._roomList.length - 1 > this._currBetPointIndex.roomLevelIndex) {
                this._currBetPointIndex.roomLevelIndex = this._currBetPointIndex.roomLevelIndex + 1;
                this._currBetPointIndex.betLevelIndex = 0;
            } else {
                this._currBetPointIndex.roomLevelIndex = 0;
                this._currBetPointIndex.betLevelIndex = 0;
            }
        }
        this.checkCollect();

        // let audioid = this._currBetPointIndex.roomLevelIndex;
        // let betid = this._currBetPointIndex.betLevelIndex
        // let id = Math.floor(audioid/3)
        let soundid = this._currBetPointIndex.roomLevelIndex * 3 + this._currBetPointIndex.betLevelIndex;
        // cc.log("soundid==",soundid)
        AudioMgr.play(this.m_betAudioList[soundid], "resources")
    }
    //判断当前是否是最大下注
    public maxbetbol(): boolean {
        if (!this._currBetPointIndex) return false;
        if (this._currBetPointIndex.roomLevelIndex == this._roomList.length - 1 && this._currBetPointIndex.betLevelIndex == this._roomList[this._currBetPointIndex.roomLevelIndex].betLevel.length - 1) {
            return true
        }
    }

    /** @description 减少下注*/
    public decBetPointIndex() {
        if (!this._currBetPointIndex) return;
        if (this._currBetPointIndex.betLevelIndex === 0) {
            if (this._currBetPointIndex.roomLevelIndex === 0) {
                this.setMaxBetPointIndex();
            } else {
                this._currBetPointIndex.roomLevelIndex--;
                this._currBetPointIndex.betLevelIndex = this._roomList[this._currBetPointIndex.roomLevelIndex].betLevel.length - 1;
            }
        } else {
            this._currBetPointIndex.betLevelIndex--;
        }
        this.checkCollect();
        // let audioid = this._currBetPointIndex.roomLevelIndex;
        // let id = Math.floor(audioid/3)
        // cc.log("audioid==",id)
        // AudioMgr.play(this.m_betAudioList[audioid], "resources")

        let soundid = this._currBetPointIndex.roomLevelIndex * 3 + this._currBetPointIndex.betLevelIndex;
        AudioMgr.play(this.m_betAudioList[soundid], "resources")
    }
    /** @description 设置当前下注值为最大值 */
    public setMaxBetPointIndex() {
        if (this._roomList && this._roomList.length - 1 >= 0) {
            this._currBetPointIndex = {
                roomLevelIndex: this._roomList.length - 1,
                betLevelIndex: this._roomList[this._roomList.length - 1].betLevel.length - 1
            };
        }
        this.checkCollect();
    }

    /**
     * 升级更新bet值
     */
    public levelUpUpdateBet() {
        cc.log("levelUpUpdateBet")
        let oldKey: number = this._roomList[this._currBetPointIndex.roomLevelIndex].betLevel[this._currBetPointIndex.betLevelIndex];

        this._roomList = Constants.getInstance().m_betKeyConfig.getBetRoomInfo(Constants.getInstance().m_LoginUserSession.userInfo.m_level);

        for (let i = this._roomList.length - 1; i >= 0; i--) {
            for (let j = this._roomList[i].betLevel.length - 1; j >= 0; j--) {
                if ((oldKey - this._roomList[i].betLevel[j]) >= 0) {
                    //初始化索引
                    this._currBetPointIndex = {
                        roomLevelIndex: i,
                        betLevelIndex: j
                    };
                    return;
                }
            }
        }
    }

    /**
     * @description 计算赢的钱
     * @param winNumber 胜利的钱
     * @param betLevel 下注值
     * @returns 
     */
    public countWinNum(winNumber: number, betLevel: number): number {
        const loginUserSession: UserInfoModel = this._constants.m_LoginUserSession.userInfo;
        return this._defaultBet + betLevel * (2 * loginUserSession.m_level * loginUserSession.m_level) + winNumber;
    }
    /**
    * @description 设置下注值
    * @param num 下注值
    */
    public set betNum(num: number) {
        if (num >= 0) {
            if (!this._currBetPointIndex) {
                this._currBetPointIndex = {
                    betLevelIndex: 0,
                    roomLevelIndex: 0
                }
            }
            if (num >= 0) {
                this._currBetPointIndex.roomLevelIndex = Math.floor(num / 3);
                this._currBetPointIndex.betLevelIndex = num % 3;
            }
            // for (let i = 0; i < this._roomList.length; i++) {
            //     let betGroup = this._roomList[i].betList;
            //     for (let j = 0; j < betGroup.length; j++) {
            //         if (num === this._roomList[i].betList[j]) {
            //             this._currBetPointIndex.roomLevelIndex = i;
            //             this._currBetPointIndex.betLevelIndex = j;
            //             return;
            //         }
            //     }
            // }
        }
    }

    /** @description 获取下注额*/
    public get betNum(): number {
        if ((this._roomList.length < this._currBetPointIndex.roomLevelIndex) || !this._constants.m_LoginUserSession) return 0;
        return this._roomList[this._currBetPointIndex.roomLevelIndex].betLevel[this._currBetPointIndex.betLevelIndex] * 10000;
    }

    /**
    * @description 获取当前游戏
    * @param betKey key值
    * @returns 
    */
    public get currentGame() {
        if (this.subGameInfoList && this.subGameInfoList.length > 0) {
            for (let i = 0; i < this.subGameInfoList.length; i++) {
                if (this.subGameInfoList[i].subGameType != SubGameType.Base || (this.subGameInfoList[i].subGameType == SubGameType.Base && this.subGameInfoList[i].subGameStatus == SubGameStatus.Choose)) {
                    let data = this.subGameInfoList[i];
                    return JSON.parse(JSON.stringify(data));
                }
            }
            for (let i = 0; i < this.subGameInfoList.length; i++) {
                if (this.subGameInfoList[i].betKey === this.betKey) {
                    let data = this.subGameInfoList[i];
                    return JSON.parse(JSON.stringify(data));
                }
            }
        }
    }

    /** @description 注册事件 */
    private _register(): void {
        console.error("!!!!");
        this._constants.eventBus.register(SlotEventBusEnum.SLOT_Player_Login_Result, this._onLoginResult.bind(this));
        this._constants.eventBus.register(SlotEventBusEnum.SLOT_BetResult, this._onBetResult.bind(this));
        this._constants.eventBus.register(SlotEventBusEnum.Slot_PushAcceptCollectAward, this._onCollectResult.bind(this));
        this._constants.eventBus.register(SlotEventBusEnum.Slot_PushSettlementBounsSuccess, this._onSettlementResult.bind(this));
        this._constants.eventBus.register(SlotEventBusEnum.Slot_PushChooseSubGame, this._onChooseSubGameResult.bind(this));
        this._constants.eventBus.register(SlotEventBusEnum.Slot_ServerGoldPool, this._onJackpotAmount.bind(this));

        EventMgr.register(EVENT.EVENT_SIMRESULET_DATA, this._onsimresult, this);

    }

    private _onJackpotAmount(data: Slot_PushJackpotAmount): void {
        console.error("info", data);
        EventMgr.dispatch(EVENT.EVENT_JACKPOTAMOUNT, data);
    }

    private _onsimresult(data: SlotPushBetResult): void {
        if (data) {
            this.betResultData = data;
        }
    }

    public playMusic(audioClip: string, loop?: boolean, volume?: number): void {
        AudioMgr.playMusic(this._config.audioAssetMap.get(audioClip), this._config._bundle, true, 0.3);
    }

    public async play(audioClip: string, finishCallback?: () => void, loop?: boolean, volume?: number): Promise<number> {
        console.log("playMusic === ", audioClip, this._config.audioAssetMap.get(audioClip));
        return AudioMgr.play(this._config.audioAssetMap.get(audioClip), this._config._bundle, finishCallback, loop, volume)
    }

    /** @description 选择小游戏模式回调 */
    private _onChooseSubGameResult(data: SlotPushChooseSubGame): void {
        if (data) {
            this.subGameInfo = data.currentGameInfo;
            this.nextGameInfo = data.currentGameInfo;
            EventMgr.dispatch(EVENT.EVENT_SELECT_RESULT, data);
        }
    }

    /** @description 登录回调 */
    private _onLoginResult(data: SlotPushLogin): void {
        console.error("login", data);
        if (data) {
            this.sendPing(10);
            this.loginResultData = data;
            this.collectData = data.playerCollectInfo;
            this.subGameInfoList = data.subGameInfos;
            if (data.playerCollectInfo) {
                this.collectData = data.playerCollectInfo;
                EventMgr.dispatch(EVENT.EVENT_UPDATE_COLLECT_PROGRESS, true);
            }

            if (this.subGameInfoList && this.subGameInfoList.length > 0) {
                // this._roomList = this._constants.m_userPlayingGame.m_rooms;
                this._subGameInfo = this.currentGame;
                this._nextGameInfo = this._subGameInfo;
                if (this._subGameInfo) {
                    this.betKeyNum = this._subGameInfo.betKey;
                    this.lastWinNum = this.nextGameInfo.beforeSettlementAmount;
                    this.betNum = this._subGameInfo.betKey;
                } else {
                    this._subGameInfo = new SlotSubGameInfo();
                    this._subGameInfo.subGameType = SubGameType.Base;
                }
            } else {
                this._subGameInfo = new SlotSubGameInfo();
                this._subGameInfo.subGameType = SubGameType.Base;
                this._nextGameInfo = this._subGameInfo;
            }

            if (data.lastBetInfo) {
                this.lastBetInfo = data.lastBetInfo;
                if (this.subGameInfo.subGameType != SubGameType.Base) {
                    this.betNum = this.lastBetInfo.betResult.betKey;
                    for (let i: number = 0; i < this._subGameInfoList.length; i++) {
                        if (this._subGameInfoList[i].subGameType != SubGameType.Base) {
                            if (this._subGameInfoList[i].betKey != this.lastBetInfo.betResult.betKey) {
                                this.betNum = this._subGameInfoList[i].betKey;
                            }
                        }
                    }
                }
            }
            console.log("登录成功了");
            /** 发送登录成功事件 */
            EventMgr.dispatch(EVENT.EVENT_LOGIN_SUCCESS, this.loginResultData);
            //检测收集
            this.checkCollect(true);
        } else {
            throw new Error("fail!");
        }
    }
    /** @description 下注回调 */
    private _onBetResult(data: SlotPushBetResult): void {
        if (data) {
            this.setThisGameBet(data.betResult.betKey, data.betResult.betAmount);
            if ((data.playerCollectInfo && data.playerCollectInfo.collectCurrentValue >= data.playerCollectInfo.collectMaxValue) || (data.betResult.subGameType == SubGameType.Base && data.nextGameInfo.subGameType != SubGameType.Base) || ((data.nextGameInfo.subGameType == SubGameType.Base && data.nextGameInfo.subGameStatus == SubGameStatus.Choose))) {
                console.error("bet", data);
                const temp: SlotPushBetResult = data;
                temp.balance = null;
                cc.sys.localStorage.setItem(`${this.id}${ELocalStorageType.TYPE_BET_RESULT}`, JSON.stringify(temp));
            }
            clearInterval(this._spinHandle);
            this._spinHandle = null;
            this._spinCount = -1;
            this.betResultData = data;
            if (data.betResult) {
                this.betData = this.betResultData.betResult;
                if (data.betResult.subGameType == SubGameType.Base) {
                    this._isStopAutoSpin = true;
                } else {
                    this._isStopAutoSpin = false;
                }
            }
            if (data.nextGameInfo) {
                switch (data.nextGameInfo.subGameType) {
                    case SubGameType.Base:
                        this.winType = EWinType.NONE;
                        break;
                    case SubGameType.Free:
                        this.winType = EWinType.FREEGAME;
                        if (data.betResult.subGameType == SubGameType.Free && data.nextGameInfo.rounds > data.betResult.rounds) {
                            EventMgr.dispatch(EVENT.EVENT_FREE_EXTRA);
                        }
                        break;
                    case SubGameType.Bonus:
                    case SubGameType.Bonus_Choose:
                        this.winType = EWinType.BONUSGAME;
                        break;
                }

                this.nextGameInfo = data.nextGameInfo;
                this._subGameInfo.subGameType = data.nextGameInfo.subGameType;
                // if (this.nextGameInfo.subGameType != SubGameType.Free) {
                //     this.lastWinNum = this.nextGameInfo.beforeSettlementAmount;
                // }


                if (data.betResult.subGameType == SubGameType.Base) {
                    if (this.nextGameInfo.subGameType == SubGameType.Free || this.nextGameInfo.subGameType == SubGameType.Bonus || (this.nextGameInfo.subGameType == SubGameType.Base && this.nextGameInfo.subGameStatus == SubGameStatus.Choose)) {
                        this.lastBaseWinNum = data.betResult.winAmount;
                        console.error("lastBase", this.lastBaseWinNum);
                    }

                }
            }
            if (data.playerCollectInfo) {
                this.collectData = data.playerCollectInfo;
            }
            EventMgr.dispatch(EVENT.EVENT_BET_RESULT, this.betData);

            if (data.playerLevel) {
                let level = data.playerLevel
                if (Constants.getInstance().m_LoginUserSession.userInfo.m_level != level) {
                    Constants.getInstance().m_LoginUserSession.userInfo.m_level = level;
                    //通知等级变化
                    Constants.getInstance().eventBus.post(HallEventBusEnum.Hall_Exp_Change, 0);
                }
            }
        } else {
            throw new Error("bet fail!");
        }
    }

    /**
     * 设置当局的betkey
     * @param betKey 
     * @param betNum 
     */
    private setThisGameBet(betKey: number, betNum: number) {
        cc.log("xbetkey!", betKey, betNum, this.m_thisGameBetKey, this.m_thisGameBetNum);
        if (betKey != this.m_thisGameBetKey || this.m_thisGameBetNum != betNum) {
            this.m_thisGameBetKey = betKey;
            this.m_thisGameBetNum = betNum;
            this.updateBetInfo();
        } else {
            this.m_thisGameBetKey = betKey;
            this.m_thisGameBetNum = betNum;
        }

    }

    /**
     * 更新下注有关
     */
    private updateBetInfo() {
        this.levelUpUpdateBet();
        //更新ui
        //更新奖池
    }

    /** @description 收集玩法回调 */
    private _onCollectResult(data: SlotPushAcceptCollectAward): void {
        this.collectResultData = data;
        this.subGameInfo = data.currentGameInfo;
        this.collectData = data.playerCollectInfo;
        if (this.isCollectQuit) {
            this.upCollectData = this.collectData;
        }
        EventMgr.dispatch(EVENT.EVENT_UPDATE_COLLECT_PROGRESS, true);
        EventMgr.dispatch(EVENT.EVENT_COLLECT_SETTLE_ACCOUNTS);
        console.error("info", this.subGameInfo, this.upCollectData, data);

        // const localData: SlotPushBetResult = JSON.parse(cc.sys.localStorage.getItem(ELocalStorageType.TYPE_BET_RESULT));
        // if (localData) {
        //     if (localData.betResult.subGameType == SubGameType.Base && ((localData.nextGameInfo.subGameType == SubGameType.Base && localData.nextGameInfo.subGameStatus == SubGameStatus.Choose) ||
        //         localData.nextGameInfo.subGameType != SubGameType.Base)) {
        //         console.error("记录下注结果", data);

        //         cc.sys.localStorage.setItem(ELocalStorageType.TYPE_BET_RESULT, JSON.stringify(data));
        //     }
        // }
        if (!this.subGameInfo || (this.subGameInfo && this.subGameInfo.subGameType == undefined)) {
            this._subGameInfo = new SlotSubGameInfo();
            this._subGameInfo.subGameType = SubGameType.Base;
        }
        if (this.subGameInfo.subGameType == SubGameType.Free) {
            EventMgr.dispatch(EVENT.EVENT_FREE_BEGIN, true);
        } else if (this.subGameInfo.subGameType == SubGameType.Bonus) {
            EventMgr.dispatch(EVENT.EVENT_BONUS_BEGIN, true);
        } else if (this.subGameInfo.subGameType == SubGameType.Base) {
            if (this.freeGameType != EFreeGameType.SPECIAL) {
                EventMgr.dispatch(EVENT.OPEN_WIN_PANEL);
            }
        }
    }
    /** @description 结算回调 */
    private _onSettlementResult(data: SlotPushSettlementBonusSuccess): void {
        if (data) {
            this.settlementResultData = data;
            this.subGameInfo = data.currentGameInfo;
            EventMgr.dispatch(EVENT.EVENT_SETTLE_ACCOUNTS, data);
        } else {
            throw new Error("fail!");
        }
    }
    public reqJackpotAmount(arr: Array<number>) {
        this._constants.slotSocket.sendServerGoldPool(this.betKey, arr);
    }

    /** @description 发送特殊游戏结算请求 */
    public reqSettlementBonusSuccess() {
        console.log("reqSettlementBonusSuccess", this.betKey);
        this._constants.slotSocket.reqSettlementBounsSuccess(this.betKey);
    }
    /** @description 发送收集玩法结算请求 */
    public reqAcceptCollectAward() {
        this._constants.slotSocket.reqAcceptCollectAward(this.betKey);
    }
    /** 发送下注请求 */
    public reqPlayerBet(reqbetkey?: number): void {
        // this._spinHandle = setInterval(() => {
        //     this._spinCount++;
        //     if (this._spinCount > 5) {
        //         console.error("5秒未收到下注回调");
        //         UIMgr.open("prefab/UITips", cc.director.getScene().children[0]);
        //         clearInterval(this._spinHandle);
        //         this._spinCount = -1;
        //         this._spinHandle = null;
        //     };
        // }, 1000);
        if (this._nextGameInfo.subGameType === SubGameType.Base || this.m_thisGameBetKey == -1) {
            this.m_thisGameBetKey = this.betKey
            this.m_thisGameBetNum = this.betNum;
        }
        cc.log("reqbetkey=", reqbetkey)
        cc.log("this.subGameInfo.subGameType = ", this.subGameInfo.subGameType)
        if (reqbetkey || reqbetkey == 0) {
            this._constants.slotSocket.sendMsgPlayerBet(reqbetkey, this.subGameInfo.subGameType);
        } else {
            this._constants.slotSocket.sendMsgPlayerBet(this.m_thisGameBetKey, this.subGameInfo.subGameType);
        }

    }
    /** @description 检查结果中是否存在指定id的结果 */
    @catchError('Check result failed')
    public checkResult(id): boolean {
        let arr: Array<SlotSlotSubject> = new Array<SlotSlotSubject>();
        if (this.freeGameType == EFreeGameType.NORMAL) {
            arr = this.betData ? this.betData.showSubjects : this.subGameInfo.slotSubjects;
        } else {
            arr = this.betResultData.betResult.showSubjects;
        }

        for (const v of arr) {
            if (v.id === id) {
                console.error("return!!!!", true);
                return true;
            }
        }
        console.error("return!!!!", false);
        return false;
    }
    /** @description 查找结果中所有和id相同的结果数组 */
    @catchError('Search result failed')
    public findResult(id): Array<number> {
        if (!this.betData) return;
        const arr: Array<SlotSlotSubject> = this.betData.showSubjects;
        const result: Array<number> = new Array<number>();
        arr.forEach(v => {
            if (v.id === id) {
                if (v.index === undefined) {
                    v.index = 1;
                }
                v.index -= 1;
                result.push(v.index);
            }
        })
        return result;
    }
    /** @description 初始化房间数据列表 */
    private _initRoomList(): void {
        if (!this._constants.m_userPlayingGame) return;
        this._roomList = Constants.getInstance().m_betKeyConfig.getBetRoomInfo(Constants.getInstance().m_LoginUserSession.userInfo.m_level);
        for (let i = 0; i < this._roomList.length; i++) {
            for (let j = 0; j < this._roomList[i].betLevel.length; j++) {
                if (Constants.getInstance().m_betNumber === this._roomList[i].betLevel[j] * 10000) {
                    //初始化索引
                    this._currBetPointIndex = {
                        roomLevelIndex: i,
                        betLevelIndex: j
                    };
                    return;
                }
            }
        }
        //初始化索引
        this._currBetPointIndex = {
            roomLevelIndex: 0,
            betLevelIndex: 0
        };
    }

    /** @description 当前游戏配置信息 */
    public _config: ConfigBase;
    /** @description 当前游戏bundle */
    private _gameBundle: cc.AssetManager.Bundle;
    public get gameBundle(): cc.AssetManager.Bundle { return this._gameBundle };
    public set gameBundle(bundle: cc.AssetManager.Bundle) { this._gameBundle = bundle };
    private _hallBundle: cc.AssetManager.Bundle;
    public get hallBundle(): cc.AssetManager.Bundle { return this._hallBundle };
    public set hallBundle(bundle: cc.AssetManager.Bundle) { this._hallBundle = bundle };
    /**
    * @description 发送心跳
    * @param interval 发送间隔
    */
    public sendPing(interval: number) {
        //定时任务，重复发送
        // if (!this._pingHandle) {
        //     this._pingHandle = setInterval(() => {
        //         this._constants.slotSocket.sendPing();
        //     }, interval * 1000);
        // }
    }

    /** 销毁该单例 */
    public destroy(): void {
        EventMgr.targetOff(this);
        if (this._pingHandle) {
            clearInterval(this._pingHandle)
        }

        /** 注释 */
        if (GameMainController._instance) {
            GameMainController._instance = null;
        }
        let bundle = cc.assetManager.getBundle(this._gameBundle.name);
        if (bundle) {
            cc.assetManager.getBundle(this._gameBundle.name).releaseAll();
        }
    }
}
export default GameMainController.instance;
