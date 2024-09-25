import { SlotRewardSubject } from "./SlotRewardSubject";
import { SlotSlotSubject } from "./SlotSlotSubject";

/**
 * 游戏下注结果
 */
export class SlotSubGameBetResult {
    /**
     * 子类游戏type
     */
    public subGameType: number;
    /**
     * 下注金额
     */
    public betAmount: number;
    /**
     * 下注系数
     */
    public betKey: number;

    public bounsRewards: SlotRewardSubject[];
    /**
     * 普通中奖金额
     */
    public winAmount: number;
    /**
     * 总轮数
     */
    public rounds: number;
    /**
     * 当前还剩多少轮
     */
    public leftRounds: number;
    /**
     * 物品展示详情
     */
    public showSubjects: SlotSlotSubject[];
    /**
     * 连线结果
     */
    public lineIds: number[];
    /**
     * 在classic 子游戏中子代翻倍的数量
     */
    public appendValue: number;
    /**
     * 在福娃游戏中指 随机出现的金框位置集合
     */
    public appendList: number[];
    /**
     * 游戏id
     */
    public gameId: number;

    /**
    * 当前用户余额
    */
    public balance: number;

    public appendLongList: number[];
}
