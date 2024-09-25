import { SlotRewardSubject } from "./SlotRewardSubject";
import { SlotSlotSubject } from "./SlotSlotSubject";

/**
 * 各个子类游戏相关进度信息
 */
export class SlotSubGameInfo {
    /**
     * 子类游戏type
     */
    public subGameType: number;
    /**
     * 总轮数
     */
    public rounds: number;
    /**
     * 当前还剩多少轮
     */
    public leftRounds: number;
    /**
     * 下注值
     */
    public betKey: number;
    /**
     * link边框图标位置
     */
    public linkIconPos: number[];
    /**
     * 游戏里物品位置和数值
     */
    public slotSubjects: SlotSlotSubject[];
    /**
     * bouns 物品奖励 只针对bouns游戏结算使用
     */
    public rewardSubjects: SlotRewardSubject[];
    /**
     * freegame 结算前所有赢的钱
     */
    public beforeSettlementAmount: number;
    /**
     * 各个子类游戏相关进度信息
     */
    public subGameStatus: number;
    /**
     * 零时附加的long值
     */
    public appendValue: number;

    public betAmount: number;

    public appendLongList: number[];
}

/**
 * 游戏状态
 */
export enum SubGameStatus {
    Normal = 0,//正常状态，等待玩家下注
    Reward = 1,//待领奖状态
    Choose = 2,//等待玩家选择哪个游戏
}
