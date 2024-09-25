import { SlotSubGameBetResult } from "./SlotSubGameBetResult";

/**
 * bonus物品
 */
export class SlotRewardSubject {
    
    public subjectId:number;
    /**
     * 位置    -1为 GRAND奖池奖励
     */
    public index: number;
    /**
     * 奖励类型
     */
    public rewardType: number;
    /**
     * 奖励金额
     */
    public rewardAmount: number;
    /**
     * 奖池类型   //rewardType  为Pool 有用
     */
    public poolType: number;
    /**
     * 附加的int 类型
     */
    public rewardCount : number;
    /**
     * rewardType  为SubGame 有用
     */
    public subGameBetResults: SlotSubGameBetResult[];
}
