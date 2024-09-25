import { Slot_PushBetResult } from "../../../resources/proto/slot";
import { SlotGlobalMap } from "./SlotGlobalMap";
import { SlotPlayerCollectInfo } from "./SlotPlayerCollectInfo";
import { SlotPushBetResult } from "./SlotPushBetResult";
import { SlotSubGameInfo } from "./SlotSubGameInfo";

/**
 * 登录成功
 */
export class SlotPushLogin {
    /**
     * 游戏id
     */
    public gameId: number;
    /**
     * 游戏房间信息
     */
    public subGameInfos: SlotSubGameInfo[];
    /**
     * 收集玩法解析
     */
    public playerCollectInfo: SlotPlayerCollectInfo;
    /**
     * 全局数据键值对
     */
    public globalMap: SlotGlobalMap[];

    public lastBetInfo: SlotPushBetResult;

}
