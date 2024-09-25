import { SlotSubGameInfo } from "./SlotSubGameInfo";

/**
 * 请求结算bounsGame完成 返回
 */
export default class SlotPushSettlementBonusSuccess {
    /**
     * 下注值
     */
    public betKey: number;
    /**
     * 当前子游戏状态信息
     */
    public currentGameInfo: SlotSubGameInfo;

    /**
     * 当前用户余额
     */
    public balance: number = 0;
    /**
     * 领取的奖励金额
     */
    public winAmount: number;
}
