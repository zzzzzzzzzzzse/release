import { SlotPlayerCollectInfo } from "./SlotPlayerCollectInfo";
import { SlotSubGameInfo } from "./SlotSubGameInfo";

/**
 * 请求领取收集玩法奖励返回
 */
export class SlotPushAcceptCollectAward {
    /**
     * 下注系数
     */
    public betKey: number;
    /**
     * 当前子游戏状态信息
     */
    public currentGameInfo: SlotSubGameInfo;
    /**
     * 玩家收集玩法信息
     */
    public playerCollectInfo: SlotPlayerCollectInfo;

    public winAmount: number;
    /**
     * 玩家余额
     */
    public balance: number = 0;
}