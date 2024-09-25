import { Constants } from "../../Constants";
import { MyCrpty } from "../../libs/MyCrpty";
import ClientShieldInfo from "../../models/ClientShieldInfo";
import { OperateJson } from "../../tools/OperateJson";
import { LocalStorageTool } from "../../tools/storage/LocalStorageTool";
import { StringUtil } from "../../tools/StringUtil";

/**
 * 全局接口数据处理
 */
export default class CoreDataExplain {
    /**
     * 解释登录用户的屏蔽列表
     * @param docsss 
     * @param cache 是否获取本地
     * @param time 
     * @param sendDispatch 发送广播
     */
    public static explainShieldList(docsss: JSON, cache: boolean, sendDispatch: boolean = false): ClientShieldInfo {
        let info: ClientShieldInfo = null;
        try {
            if (cache) {
                info = LocalStorageTool.getShield();
            } else {
                if (docsss != null) {
                    let hosts: string = OperateJson.getString(docsss, "hosts");
                    if (!StringUtil.isEmpty(hosts)) {
                        //解码
                        //                        WorkFactory.getInstance().ByUser(String.valueOf(time), hosts, 1, 0)
                        hosts = MyCrpty.clientDecrypt(hosts);
                        if (!StringUtil.isEmpty(hosts)) {
                            let strArr: string[] = hosts.split("|");
                            if (strArr != null) {
                                if (strArr.length == 3) {
                                    //全局
                                    let all: number= StringUtil.StringToNumber(strArr[0], 1);
                                    //核心
                                    let main: number = StringUtil.StringToNumber(strArr[1], 1);
                                    //版本
                                    let version: number = StringUtil.StringToNumber(strArr[2], 1);
                                    info = new ClientShieldInfo();
                                    info.m_allShield = all == 1;
                                    if (info.m_allShield) {
                                        info.m_mainShield = true;
                                        info.m_versionShield = true;
                                    } else {
                                        info.m_mainShield = main == 1;
                                        info.m_versionShield = version == 1;
                                    }
                                } else if (strArr.length == 2) {
                                    //全局
                                    let all: number = StringUtil.StringToNumber(strArr[0], 1);
                                    //核心
                                    let main: number = StringUtil.StringToNumber(strArr[1], 1);
                                    info = new ClientShieldInfo();
                                    info.m_allShield = all == 1;
                                    if (info.m_allShield) {
                                        info.m_mainShield = true;
                                    } else {
                                        info.m_mainShield = main == 1;
                                    }
                                } else if (strArr.length == 1) {
                                    //全局
                                    let all: number = StringUtil.StringToNumber(strArr[0], 1);
                                    info = new ClientShieldInfo();
                                    info.m_allShield = all == 1;
                                }
                                //入库
                                if (info) {
                                    LocalStorageTool.setShield(info);
                                    Constants.getInstance().resetClientShieldInfo();
                                }
                                if (sendDispatch) {
                                    //发送屏蔽信息
                                }
                            }
                            //通知屏蔽变更
                        }
                    }
                }
            }

        }
        catch (e) {
        }
        return info;
    }
}
