import { SlotPlayerCollectInfo } from "./SlotPlayerCollectInfo";

/**
 * 收集玩法中，用积分兑换商店里的奖励返回
 */
export class SlotPushCollectShopExchangeAward{
    /**
     * 请求兑换的商品索引
     */
    public index: number;
    /**
     * 玩家收集玩法信息
     */
    public playerCollectInfo: SlotPlayerCollectInfo;
}