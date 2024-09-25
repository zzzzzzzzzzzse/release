import { Slot_PushAcceptCollectAward, Slot_PushBetResult, Slot_PushChooseSubGame, Slot_PushCollectShopExchangeAward, Slot_PushJackpotAmount, Slot_PushLogin, Slot_PushSettlementBounsSuccess } from "../../../resources/proto/slot";
import { SlotBingoRewards } from "../../models/socket/SlotBingoRewards";
import { SlotGlobalMap } from "../../models/socket/SlotGlobalMap";
import { SlotPlayerCollectInfo } from "../../models/socket/SlotPlayerCollectInfo";
import { SlotPushAcceptCollectAward } from "../../models/socket/SlotPushAcceptCollectAward";
import { SlotPushBetResult } from "../../models/socket/SlotPushBetResult";
import SlotPushChooseSubGame from "../../models/socket/SlotPushChooseSubGame";
import { SlotPushCollectShopExchangeAward } from "../../models/socket/SlotPushCollectShopExchangeAward";
import { SlotPushJackpotAmount } from "../../models/socket/SlotPushJackpotAmount";
import { SlotPushLogin } from "../../models/socket/SlotPushLogin";
import SlotPushSettlementBonusSuccess from "../../models/socket/SlotPushSettlementBonusSuccess";
import { SlotRewardSubject } from "../../models/socket/SlotRewardSubject";
import { SlotSlotSubject } from "../../models/socket/SlotSlotSubject";
import { SlotSubGameBetResult } from "../../models/socket/SlotSubGameBetResult";
import { SlotSubGameInfo } from "../../models/socket/SlotSubGameInfo";
import SocketDataFormatBase from "./SocketDataFormatBase";

/**
 * 数据格式化
 */
export class SocketDataFormat {
    /**
     * 登录回调解析
     * @param data 
     * @returns 
     */
    public static slotPushLoginFormat(data: Slot_PushLogin): SlotPushLogin {
        try {
            if (data) {
                let slotPushLogin = new SlotPushLogin();
                slotPushLogin.gameId = data.gameId;
                if (data.subGameInfos) {
                    slotPushLogin.subGameInfos = [];
                    let gameRoomInfo: SlotSubGameInfo = null;
                    data.subGameInfos.forEach(item => {
                        if (item) {
                            gameRoomInfo = SocketDataFormatBase.formatSlotSubGameInfo(item);
                            slotPushLogin.subGameInfos.push(gameRoomInfo);
                        }
                    });
                    //玩家收集玩法信息
                    if (data.playerCollectInfo) {
                        slotPushLogin.playerCollectInfo = SocketDataFormatBase.formatSlotPlayerCollectInfo(data.playerCollectInfo);
                    }
                    //全局数据键值对
                    if (data.globalMap && data.globalMap.length > 0) {
                        slotPushLogin.globalMap = [];
                        let _Info: SlotGlobalMap = null;
                        data.globalMap.forEach(item => {
                            if (item) {
                                _Info = SocketDataFormatBase.formatSlotSlotGlobalMap(item);
                                slotPushLogin.globalMap.push(_Info);
                            }
                        });
                    }

                    if (data.lastBetInfo) {
                        slotPushLogin.lastBetInfo = SocketDataFormatBase.formatSlotLastBetInfo(data.lastBetInfo);
                    }

                    return slotPushLogin;
                }
            }
        } catch (e) {
        }
        return null;
    }

    /**
     * Slot_PushBetResult下注数据格式化
     */
    public static slotPushBetResultFormat(data: Slot_PushBetResult): SlotPushBetResult {
        try {
            if (data) {
                let slotPushBetResult: SlotPushBetResult = new SlotPushBetResult();
                //当前下注游戏返回结
                if (data.betResult) {
                    let betResult = new SlotSubGameBetResult();
                    betResult.subGameType = data.betResult.subGameType;
                    betResult.betAmount = data.betResult.betAmount;
                    betResult.bounsRewards = data.betResult.bounsRewards;
                    betResult.betKey = data.betResult.betKey;
                    betResult.winAmount = data.betResult.winAmount;
                    betResult.rounds = data.betResult.rounds;
                    betResult.leftRounds = data.betResult.leftRounds;
                    betResult.balance = data.balance;
                    betResult.appendLongList = data.betResult.appendLongList;
                    //物品展示详情
                    if (data.betResult.showSubjects) {
                        betResult.showSubjects = [];
                        let slotsubjectItem: SlotSlotSubject = null;
                        data.betResult.showSubjects.forEach(item => {
                            slotsubjectItem = new SlotSlotSubject();
                            slotsubjectItem.id = item.id;
                            slotsubjectItem.winPrize = item.winPrize;
                            slotsubjectItem.index = item.index;
                            slotsubjectItem.lines = [];
                            if (item.lines) {
                                item.lines.forEach(linesItem => {
                                    slotsubjectItem.lines.push(linesItem);
                                });
                            }
                            betResult.showSubjects.push(slotsubjectItem);
                        });
                    }
                    //连线结果
                    if (data.betResult.lineIds) {
                        betResult.lineIds = [];
                        data.betResult.lineIds.forEach(item => {
                            betResult.lineIds.push(item);
                        });
                    }
                    betResult.appendValue = data.betResult.appendValue;
                    betResult.gameId = data.betResult.gameId;
                    // 随机出现的金框位置集合
                    if (data.betResult.appendList) {
                        betResult.appendList = [];
                        data.betResult.appendList.forEach(item => {
                            betResult.appendList.push(item);
                        });
                    }
                    slotPushBetResult.betResult = betResult;
                }
                //当前子游戏状态信息
                if (data.nextGameInfo) {
                    let currentGameInfo = SocketDataFormatBase.formatSlotSubGameInfo(data.nextGameInfo);
                    slotPushBetResult.nextGameInfo = currentGameInfo;
                }
                //玩家收集玩法信息
                if (data.playerCollectInfo) {
                    slotPushBetResult.playerCollectInfo = SocketDataFormatBase.formatSlotPlayerCollectInfo(data.playerCollectInfo);
                }
                //全局数据键值对
                if (data.changeDatas && data.changeDatas.length > 0) {
                    slotPushBetResult.changeDatas = [];
                    let _Info: SlotGlobalMap = null;
                    data.changeDatas.forEach(item => {
                        if (item) {
                            _Info = SocketDataFormatBase.formatSlotSlotGlobalMap(item);
                            slotPushBetResult.changeDatas.push(_Info);
                        }
                    });
                    // slotPushBetResult.changeDatas = SocketDataFormatBase.formatSlotSlotGlobalMap(data.changeDatas);
                }
                //bingo游戏
                if (data.bingoRewardsList && data.bingoRewardsList.length > 0) {
                    slotPushBetResult.bingoRewardsList = [];
                    let _Info: SlotBingoRewards = null;
                    data.bingoRewardsList.forEach(item => {
                        if (item) {
                            _Info = SocketDataFormatBase.formatSlotBingoRewards(item);
                            slotPushBetResult.bingoRewardsList.push(_Info);
                        }
                    });
                }
                //玩家余额
                if (data.balance) {
                    slotPushBetResult.balance = data.balance;
                }
                //玩家等级
                if (data.playerLevel) {
                    slotPushBetResult.playerLevel = data.playerLevel;
                }
                //玩家经验
                if (data.exp) {
                    slotPushBetResult.playerexp = data.exp;
                }
                return slotPushBetResult;
            }
        } catch (e) {

        }
        return null;
    }

    /**
     * 请求结算bounsGame完成 返回
     * @param data 
     */
    public static slotPushSettlementBonusSuccess(data: Slot_PushSettlementBounsSuccess): SlotPushSettlementBonusSuccess {
        try {
            if (data) {
                let pushSettlementBonusSuccess = new SlotPushSettlementBonusSuccess();
                pushSettlementBonusSuccess.betKey = data.betKey;
                if (data.balance) {
                    pushSettlementBonusSuccess.balance = data.balance;
                }

                pushSettlementBonusSuccess.winAmount = data.winAmount;
                if (data.currentGameInfo) {
                    pushSettlementBonusSuccess.currentGameInfo = SocketDataFormatBase.formatSlotSubGameInfo(data.currentGameInfo);
                }
                return pushSettlementBonusSuccess;
            }
        } catch (e) {

        }
        return null;
    }

    /**
     * 选择游戏进入
     * @param data 
     */
    public static slotPushChooseSubGame(data: Slot_PushChooseSubGame): SlotPushChooseSubGame {
        try {
            if (data) {
                let pushChooseSubGame = new SlotPushChooseSubGame();
                pushChooseSubGame.betKey = data.betKey;
                pushChooseSubGame.currentGameInfo = data.currentGameInfo;
                // if (data.currentGameInfo) {
                //     pushChooseSubGame.currentGameInfo = SocketDataFormatBase.formatSlotSubGameInfo(data.currentGameInfo.subGameType);
                // }
                return pushChooseSubGame;
            }
        } catch (e) {

        }
        return null;
    }

    /**
     * 请求领取收集玩法奖励格式化
     * @param data 
     * @returns 
     */
    public static slotPushAcceptCollectAward(data: Slot_PushAcceptCollectAward): SlotPushAcceptCollectAward {
        try {
            if (data) {
                let acceptCollectAward: SlotPushAcceptCollectAward = new SlotPushAcceptCollectAward();
                acceptCollectAward.betKey = data.betKey;
                //当前子游戏状态信息
                if (data.currentGameInfo) {
                    acceptCollectAward.currentGameInfo = SocketDataFormatBase.formatSlotSubGameInfo(data.currentGameInfo);
                }
                //玩家收集玩法信息
                if (data.playerCollectInfo) {
                    acceptCollectAward.playerCollectInfo = SocketDataFormatBase.formatSlotPlayerCollectInfo(data.playerCollectInfo);
                }
                if (data.winAmount) {
                    acceptCollectAward.winAmount = data.winAmount;
                }
                //玩家余额
                if (data.balance) {
                    acceptCollectAward.balance = data.balance;
                }
                return acceptCollectAward;
            }
        } catch (e) {

        }
        return null;
    }

    public static slotPushCollectShopExchangeAward(data: Slot_PushCollectShopExchangeAward): SlotPushCollectShopExchangeAward {
        try {
            if (data) {
                let collectShopExchangeAward: SlotPushCollectShopExchangeAward = new SlotPushCollectShopExchangeAward();
                collectShopExchangeAward.index = data.index;
                //玩家收集玩法信息
                if (data.playerCollectInfo) {
                    collectShopExchangeAward.playerCollectInfo = SocketDataFormatBase.formatSlotPlayerCollectInfo(data.playerCollectInfo);
                }
                return collectShopExchangeAward;
            }
        } catch (e) {

        }
        return null;
    }

    /**
     * 格式化奖池数据
     * @param data 
     * @returns 
     */
    public static slotPushJackpotAmount(data: Slot_PushJackpotAmount): SlotPushJackpotAmount {
        try {
            if (data) {
                let pushJackpotAmount: SlotPushJackpotAmount = new SlotPushJackpotAmount();
                pushJackpotAmount.betKey = data.betKey;
                //玩家收集玩法信息
                if (data.jackpotInfos) {
                    pushJackpotAmount.jackpotInfos = [];
                    data.jackpotInfos.forEach(item => {
                        pushJackpotAmount.jackpotInfos.push({
                            poolType: item.poolType,
                            amount: item.amount
                        });
                    });
                }
                return pushJackpotAmount;
            }
        } catch (e) {

        }
        return null;
    }
}
