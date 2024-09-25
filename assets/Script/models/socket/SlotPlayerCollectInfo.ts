import { Slot_SlotRewardSubject } from "../../../resources/proto/slot";
import { SlotRewardSubject } from "./SlotRewardSubject";

/**
 * 请求领取收集玩法奖励返回
 */
 export class SlotPlayerCollectInfo {
    /**
     * 下注系数
     */
    public averageBetAmount: number;
    /**
     * 当前收集的值
     */
    public collectCurrentValue: number;
    /**
     * 收集满的最大值
     */
    public collectMaxValue: number;
    /**
     * 当前关卡索引
     */
    public currentIndex: number;
    /**
     * 当前是否有奖励待领取 如果为true ，会阻塞正常的游戏进程 ，要领完奖励才能进行游戏下注操作
     */
    public haveReward: boolean;
    /**
     * (关卡类型为地图时表示待领取的奖励，关卡类型为商店表示已领取的奖励）
     */
    public slotRewards: SlotRewardSubject[];
    /**
     * 已经领取的奖励
     */
    public receivedSlotRewards: SlotRewardSubject[];

}