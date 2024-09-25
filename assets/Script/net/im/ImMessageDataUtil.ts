import AppPlatformConfig from "../../configs/AppPlatformConfig";
import { Constants } from "../../Constants";
import UserTaskTimerHelper from "../../task/UserTaskTimerHelper";
import AnalyticsTool, { AnalyticsEventEnmu } from "../../tools/log/AnalyticsTool";
import { OperateJson } from "../../tools/OperateJson";
import { LocalStorageTool } from "../../tools/storage/LocalStorageTool";
import { StringUtil } from "../../tools/StringUtil";
import UserApi from "../apis/UserApi";
import { HallEventBusEnum } from "../socket/HallHub";
import ImMessageConfig from "./ImMessageConfig";
import ImMessageInfo from "./ImMessageInfo";

/**
 * im消息处理
 */
export default class ImMessageDataUtil {
    /**
     * 解析自定义业务
     * @param msg 
     */
    public static formatCustomMessgeOrderItem(msg: ImMessageInfo) {
        let contentJson: JSON = OperateJson.getRealJsonData(msg.m_imMsgBody);
        if (contentJson) {
            let pv: number = OperateJson.getNumber(contentJson, "pv");
            if (this.checkMsgVersion(pv)) {
                let type: number = OperateJson.getNumber(contentJson, "type");
                let resultBodyStr: string = OperateJson.getString(contentJson, "result");
                let resultBody: JSON = null;
                if (!StringUtil.isEmpty(resultBodyStr)) {
                    resultBody = OperateJson.getRealJsonData(resultBodyStr);
                }
                Constants.getInstance().SendHttpGets(AppPlatformConfig.KAIFA_LOGURL, "isError=1&uid="+Constants.getInstance().m_LoginUserSession.m_uid+"&msg="+type+"gameCoin=="+OperateJson.getNumber(resultBody, "gameCoin"))
                this.formatCustomMessageOrderItem(type, resultBody);
            }
        }
    }

    /**
     * 确定im消息版本
     */
    public static checkMsgVersion(pv: number): boolean {
        if (pv >= ImMessageConfig.m_clientPv) {
            return true;
        }
        return false;
    }

    /**
     * im消息业务处理
     * @param resultType 
     * @param resultBoby 
     */
    public static async formatCustomMessageOrderItem(resultType: number, resultBoby: JSON) {
        switch (resultType) {
            case 600887: {
                //踢用户下线，回到登录界面
                let msg: string = OperateJson.getString(resultBoby, "msg");
                if (!StringUtil.isEmpty(msg)) {

                }
                break;
            }
            case 600888: {
                //踢用户下线，后台重新登录
                let msg: string = OperateJson.getString(resultBoby, "msg");
                if (!StringUtil.isEmpty(msg)) {
                    
                }
                break;
            }
            case 600889: {
                //用户经验变化
                //活跃度
                let activeValue: number = OperateJson.getNumber(resultBoby, "activeValue");
                //用户当前经验值
                let expValue: number = OperateJson.getNumber(resultBoby, "expValue");
                //添加的经验值
                let addExpValue: number = OperateJson.getNumber(resultBoby, "addExpValue");
                //用户等级
                let level: number = OperateJson.getNumber(resultBoby, "level");
                //增量游戏币+:增加-:减少
                let gameCoin: number = OperateJson.getNumber(resultBoby, "gameCoin");
                //增量钻石+:增加-:减少
                let goldCoin: number = OperateJson.getNumber(resultBoby, "goldCoin");
                // 	发生时间
                let createAt: number = OperateJson.getNumber(resultBoby, "createAt");
                //是否特征用户
                let specialType: number = OperateJson.getNumber(resultBoby, "specialType");
                //状态
                let userState: number = OperateJson.getNumber(resultBoby, "userState");
                //用户模式
                let userModel: number = OperateJson.getNumber(resultBoby, "userModel");
                
                cc.log("levellevellevel=",Constants.getInstance().m_LoginUserSession.userInfo.m_level,level)
                // if(Constants.getInstance().m_LoginUserSession.userInfo.m_level != level) {
                //     Constants.getInstance().m_LoginUserSession.userInfo.m_level = level;
                //     //通知经验值变化
                //     Constants.getInstance().eventBus.post(HallEventBusEnum.Hall_Exp_Change, 0);
                // }
                break;
            }
            case 600890: {
                //用户经验增幅
                //多少倍，默认是2
                let incre: number = OperateJson.getNumber(resultBoby, "incre");
                //开始时间
                let sAt: number = OperateJson.getNumber(resultBoby, "sAt");
                //结束时间
                let eAt: number = OperateJson.getNumber(resultBoby, "eAt");
                //发生时间
                let cAt: number = OperateJson.getNumber(resultBoby, "cAt");
                break;
            }
            case 600891: {
                //用户支付订单结果
                //订单ID
                console.log("mmmmmmm",JSON.stringify(resultBoby));
                let orderSn: number = OperateJson.getNumber(resultBoby, "orderSn");
                //0/1（要做本地更新钱包等显示）
                let status: number = OperateJson.getNumber(resultBoby, "status");
                if (status === 1) {
                    let keyArr: number[] = [];
                    keyArr.push(orderSn);
                    if (!LocalStorageTool.setSuccessDepositOrd(keyArr)) {
                        if (Constants.getInstance().m_LoginUserSession.userInfo.m_payNum === 0) {
                            Constants.getInstance().m_LoginUserSession.userInfo.m_payNum = 1;
                            AnalyticsTool.logEvent(AnalyticsEventEnmu.store_user_first_buy);
                        }
                        AnalyticsTool.logEvent(AnalyticsEventEnmu.store_buy_confirm);
                        AnalyticsTool.purchase();
                        UserTaskTimerHelper.addTimerTask(2);
                    }
                    //更新钱包
                    
                }
                break;
            }
            case 600892: {
                //用户升级奖励
                //用户ID
                let uid: number = OperateJson.getNumber(resultBoby, "uid");
                //产生的业务类型
                let dataType: number = OperateJson.getNumber(resultBoby, "dataType");
                //产生的业务类型-子业务
                let subDataType: number = OperateJson.getNumber(resultBoby, "subDataType");
                //产生的业务类型对应的数据ID	
                let dataId: number = OperateJson.getNumber(resultBoby, "dataId");
                //增量游戏币+:增加-:减少
                let gameCoin: number = OperateJson.getNumber(resultBoby, "gameCoin");
                //增量钻石+:增加-:减少
                let goldCoin: number = OperateJson.getNumber(resultBoby, "goldCoin");
                // 	发生时间
                let createAt: number = OperateJson.getNumber(resultBoby, "createAt");

                cc.log("dataType=",resultBoby)
                cc.log("subDataType",subDataType)
                cc.log("levellevellevel coins=",Constants.getInstance().m_LoginUserSession.userInfo.m_level,gameCoin)
                if(dataType==147){
                    if(subDataType!=-1){
                        cc.log("dddw",subDataType)
                        if(subDataType==101){
                            Constants.getInstance().iszhengji = true;
                            let result = await UserApi.receiveuserPack(dataId);
                            // cc.log("subDataType=",result)
                        }
                    }
                    
                }else if(dataType==84){
                    Constants.getInstance().eventBus.post(HallEventBusEnum.Hall_Uplevel_Reward, gameCoin);
                }
                break;
            }
        }
    }
}
