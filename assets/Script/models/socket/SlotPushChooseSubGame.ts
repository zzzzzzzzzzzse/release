import { SlotSubGameInfo } from "./SlotSubGameInfo";

/**
 * 请求结算bounsGame完成 返回
 */
export default class SlotPushChooseSubGame {
    /**
     * 下注值
     */
    public betKey: number;
    /**
     * 当前子游戏状态信息
     */
    public currentGameInfo: SlotSubGameInfo;
}
