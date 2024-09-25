import { SlotPlayerCollectInfo } from "../../models/socket/SlotPlayerCollectInfo";
import { SlotGlobalMap } from "../../models/socket/SlotGlobalMap";
import { SlotRewardSubject } from "../../models/socket/SlotRewardSubject";
import { SlotSlotSubject } from "../../models/socket/SlotSlotSubject";
import { SlotSubGameBetResult } from "../../models/socket/SlotSubGameBetResult";
import { SlotSubGameInfo } from "../../models/socket/SlotSubGameInfo";
import { SlotBingoRewards } from "../../models/socket/SlotBingoRewards";
import { SlotPushBetResult } from "../../models/socket/SlotPushBetResult";
import { StringUtil } from "../../tools/StringUtil";

/**
 * socket解析
 */
export default class SocketDataFormatBase {

    /**
     * 各个子类游戏相关进度信息
     */
    public static formatSlotSubGameInfo(item): SlotSubGameInfo {
        let gameRoomInfo = new SlotSubGameInfo();
        gameRoomInfo.subGameType = item.subGameType;
        gameRoomInfo.rounds = item.rounds;
        gameRoomInfo.leftRounds = item.leftRounds;
        gameRoomInfo.betKey = item.betKey;
        gameRoomInfo.appendValue = item.appendValue;
        gameRoomInfo.appendLongList = item.appendLongList;
        //link边框图标位置
        if (item.linkIconPos) {
            gameRoomInfo.linkIconPos = [];
            item.linkIconPos.forEach(itemLine => {
                gameRoomInfo.linkIconPos.push(Number(itemLine));
            });
        }
        //游戏里物品位置
        if (item.slotSubjects) {
            gameRoomInfo.slotSubjects = [];
            let slotsubjectItem: SlotSlotSubject = null;
            item.slotSubjects.forEach(itemSubj => {
                slotsubjectItem = new SlotSlotSubject();
                slotsubjectItem.id = itemSubj.id;
                slotsubjectItem.winPrize = itemSubj.winPrize;
                slotsubjectItem.index = itemSubj.index;

                slotsubjectItem.lines = [];
                if (itemSubj.lines) {
                    itemSubj.lines.forEach(linesItem => {
                        slotsubjectItem.lines.push(linesItem);
                    });
                }
                gameRoomInfo.slotSubjects.push(slotsubjectItem);
            });
        }
        //物品奖励 只针对bouns游戏结算
        if (item.rewardSubjects) {
            gameRoomInfo.rewardSubjects = [];
            let rewardSubject: SlotRewardSubject = null;
            item.rewardSubjects.forEach(itemReward => {
                rewardSubject = SocketDataFormatBase.formatSlotRewardSubject(itemReward);
                gameRoomInfo.rewardSubjects.push(rewardSubject);
            });
        }
        gameRoomInfo.subGameStatus = item.subGameStatus;
        gameRoomInfo.beforeSettlementAmount = item.beforeSettlementAmount;
        gameRoomInfo.betAmount = item.betAmount;
        return gameRoomInfo;
    }

    /**
     * 玩家收集玩法详情
     * @param playerCollectInfo 
     * @returns 
     */
    public static formatSlotPlayerCollectInfo(playerCollectInfo): SlotPlayerCollectInfo {
        let dataInfo = new SlotPlayerCollectInfo();
        dataInfo.averageBetAmount = playerCollectInfo.averageBetAmount;
        dataInfo.collectCurrentValue = playerCollectInfo.collectCurrentValue;
        dataInfo.collectMaxValue = playerCollectInfo.collectMaxValue;
        dataInfo.currentIndex = playerCollectInfo.currentIndex;
        dataInfo.haveReward = playerCollectInfo.haveReward;

        if (playerCollectInfo.slotRewards) {
            dataInfo.slotRewards = [];
            let rewardSubject: SlotRewardSubject = null;
            playerCollectInfo.slotRewards.forEach(itemReward => {
                rewardSubject = this.formatSlotRewardSubject(itemReward);
                dataInfo.slotRewards.push(rewardSubject);
            });
        }
        if (playerCollectInfo.receivedSlotRewards) {
            dataInfo.receivedSlotRewards = [];
            let rewardSubject: SlotRewardSubject = null;
            playerCollectInfo.receivedSlotRewards.forEach(itemReward => {
                rewardSubject = this.formatSlotRewardSubject(itemReward);
                dataInfo.receivedSlotRewards.push(rewardSubject);
            });
        }
        return dataInfo;
    }

    /**
     * bingo玩法详情
     * @param slotBingoRewards 
     * @returns 
     */
    public static formatSlotBingoRewards(slotBingoRewards): SlotBingoRewards {
        let dataInfo = new SlotBingoRewards();
        if (slotBingoRewards.slotRewards) {
            dataInfo.slotRewards = [];
            let rewardSubject: SlotRewardSubject = null;
            slotBingoRewards.receivedSlotRewards.forEach(itemReward => {
                rewardSubject = this.formatSlotRewardSubject(itemReward);
                dataInfo.slotRewards.push(rewardSubject);
            });
        }
        return dataInfo;
    }

    public static formatSlotLastBetInfo(lastBetInfo): SlotPushBetResult {
        let dataInfo = new SlotPushBetResult();
        dataInfo = lastBetInfo;
        return dataInfo;
    }

    /**
     * 全局数据键值对
     * @param SlotGlobalMap 
     * @returns 
     */
    public static formatSlotSlotGlobalMap(GlobalMap): SlotGlobalMap {
        let dataInfo = new SlotGlobalMap();
        dataInfo.dataKey = GlobalMap.dataKey;
        dataInfo.dataValue = GlobalMap.dataValue;
        return dataInfo;
    }

    /**
     * bonus奖励解析
     * @param itemReward 
     * @returns 
     */
    public static formatSlotRewardSubject(itemReward): SlotRewardSubject {
        let rewardSubject = new SlotRewardSubject();
        rewardSubject.subjectId = itemReward.subjectId;
        rewardSubject.index = itemReward.index;
        rewardSubject.rewardType = itemReward.rewardType;
        rewardSubject.rewardAmount = itemReward.rewardAmount;
        rewardSubject.poolType = itemReward.poolType;
        rewardSubject.rewardCount = itemReward.rewardCount;
        //为SubGame 有用
        if (itemReward.subGameBetResults) {
            rewardSubject.subGameBetResults = [];
            let subGameBetResult: SlotSubGameBetResult = null;
            itemReward.subGameBetResults.forEach(item2 => {
                subGameBetResult = new SlotSubGameBetResult();
                subGameBetResult.subGameType = item2.subGameType;
                subGameBetResult.betAmount = item2.betAmount;
                subGameBetResult.betKey = item2.betKey;
                subGameBetResult.winAmount = item2.winAmount;
                subGameBetResult.rounds = item2.rounds;
                subGameBetResult.leftRounds = item2.leftRounds;
                subGameBetResult.bounsRewards = item2.bounsRewards;
                //物品展示详情
                if (item2.showSubjects) {
                    subGameBetResult.showSubjects = [];
                    let slotsubjectItem: SlotSlotSubject = null;
                    item2.showSubjects.forEach(item5 => {
                        slotsubjectItem = new SlotSlotSubject();
                        slotsubjectItem.id = item5.id;
                        slotsubjectItem.winPrize = item5.winPrize;
                        slotsubjectItem.index = item5.index;
                        slotsubjectItem.lines = [];
                        if (item5.lines) {
                            item5.lines.forEach(linesItem => {
                                slotsubjectItem.lines.push(linesItem);
                            });
                        }
                        subGameBetResult.showSubjects.push(slotsubjectItem);
                    });
                }
                //连线结果
                if (item2.lineIds) {
                    subGameBetResult.lineIds = [];
                    item2.lineIds.forEach(item3 => {
                        subGameBetResult.lineIds.push(item3);
                    });
                }
                subGameBetResult.appendValue = item2.appendValue;
                subGameBetResult.gameId = item2.gameId;
                // 随机出现的金框位置集合
                if (item2.appendList) {
                    subGameBetResult.appendList = [];
                    item2.appendList.forEach(item4 => {
                        subGameBetResult.appendList.push(item4);
                    });
                }

                rewardSubject.subGameBetResults.push(subGameBetResult);
            });
        }
        return rewardSubject;
    }
}
