/**
 * 收集玩法中，用积分兑换商店里的奖励返回
 */
 export class SlotPushJackpotAmount{
    /**
     * 下注值
     */
    public betKey: number;
    /**
     * 奖池信息
     */
    public jackpotInfos: JackpotInfo[];
}

/**
 * 奖池
 */
export interface JackpotInfo {
    /**
     * 奖池类型
     */
    poolType: number;
    /**
     * 奖池金额
     */
    amount: number;
}