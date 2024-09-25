/**
 * 奖池中奖信息
 */
export class SlotBonusPool {
    /**
     * 奖池类别
     */
    public poolType: number;
    /**
     * 奖池中奖金额
     */
    public winAmount: number;
}

export enum PoolType{
    //奖池类型
    POOL_NONE = 0 ,  //无意义
    GRAND = 1,   //"全局奖池")
    MINI = 2,   //"最小奖池")
    MINOR = 3,   //"普通奖池")
    MAJOR = 4   // "最大奖池")
}
