import { SlotBingoRewards } from "./SlotBingoRewards";
import { SlotGlobalMap } from "./SlotGlobalMap";
import { SlotPlayerCollectInfo } from "./SlotPlayerCollectInfo";
import { SlotSubGameBetResult } from "./SlotSubGameBetResult";
import { SlotSubGameInfo } from "./SlotSubGameInfo";

/**
 * 下注返回结果
 */
export class SlotPushBetResult {
    /**
     * 当前下注游戏返回结
     */
    public betResult: SlotSubGameBetResult;
    /**
     * 下次游戏状态信息
     */
    public nextGameInfo: SlotSubGameInfo;
    /**
     * 收集玩法
     */
    public playerCollectInfo: SlotPlayerCollectInfo;

    /**
     * 刷新游戏全局数据 变的才有值
     */
    public changeDatas: SlotGlobalMap[];

    public bingoRewardsList: SlotBingoRewards[];
    /**
     * 用户余额
     */
    public balance: number = 0;
    /**
     * 用户等级
     */
    public playerLevel: number;
    /**
     * 用户经验
     */
    public playerexp: number;
}

export enum SubGameType {
    None = 0,//
    Base = 1,//基础游戏类型
    Base_Link = 2,// base游戏引发的link游戏
    Free = 3,// 免费游戏
    Bonus = 4,// bonus游戏模式
    Free_Link = 5,// Free游戏引发的link游戏
    Bonus_Choose = 10,//选择模式进入的bonus游戏
    Mega_Bonus = 13,
    Super_Free = 15,
    Free_Choose = 16,
    Mega_Free = 17,
    Free_Bouns = 18,
    Rich_Green_Bonus = 20,
    Rich_Purple_Bonus = 21,
    Rich_Red_Bonus = 22,
    Rich_Green_Purple_Bonus = 23,
    Rich_Green_Red_Bonus = 24,
    Rich_Purple_Red_Bonus = 25,
    Rich_Green_Purple_Red_Bonus = 26,
    Wheel_Game = 27,
    Collect_Subgame = 28
}
