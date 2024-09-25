import { EventBusEnum } from "../common/EventBus";
import { Constants } from "../Constants";
import { OperateJson } from "../tools/OperateJson";

/**
 * 请求回调
 */
export class RequestCallBackInfo {
    /**
     * 请求的可用结果 这个用于标记网络状态
     */
    public m_requestStatus: boolean = false;
    /**
     * 服务器的最后缓存更新时间
     */
    public m_LastModfied: string;
    /**
     * 服务器端返回的状态代码
     */
    public m_ServerStatusCode: number = 500;
    /**
     * 这个为服务器端返回的字符串
     */
    public m_ServerCallBackInfo: string;

    /**
     * 返回服务器生成的JSON对像
     */
    private m_serverCallBaseJson: JSON;

    public m_data: any;

    /**
     * 错误信息
     */
    public m_errorInfo: string;

    public getServerCmdCode(): number {
        let json = this.getServerJsonInfo();
        if (json != null) {
            return json["code"];
        }
        return -1;
    }

    /**
     * 检测是否成功状态的
     */
    public checkServerCmdStatus(): boolean {
        return this.getServerCmdCode() == 200;
    }

    /**
     * 返回服务器基本信息
     * @returns
     */
    public getServerContent(): string {
        let jsonObj = this.getServerJsonInfo();
        if (jsonObj) {
            return OperateJson.getString(jsonObj, "msg", "");
        }
        return "";
    }

    /**
     * 返回服务器基本数据结果对像
     * @returns
     */
    public getServerResult(): JSON {
        let json = OperateJson.getJsonObj(this.getServerJsonInfo(), "result");
        return json;
    }

    /**
     * 获取json对像
     */
    public getServerJsonInfo(): JSON {
        if (this.m_serverCallBaseJson == null && this.m_requestStatus && this.m_ServerCallBackInfo != "") {
            this.m_serverCallBaseJson = OperateJson.getRealJsonData(this.m_ServerCallBackInfo);
        }
        return this.m_serverCallBaseJson;
    }

    /**
     * 返奖处理
     */
    public formatiGiveResult() {
        let serverResult = this.getServerResult();
        if (serverResult) {
            let json = OperateJson.getJsonObj(serverResult, "giveResult");
            if (json) {
                let ordid: number = OperateJson.getNumber(json, "ordid");
                let giveType: number = OperateJson.getNumber(json, "giveType");
                let goldCoin: number = OperateJson.getNumber(json, "goldCoin");
                let gameCoin: number = OperateJson.getNumber(json, "gameCoin");
                let integral: number = OperateJson.getNumber(json, "integral");
                if (gameCoin > 0) {
                    Constants.getInstance().eventBus.post(EventBusEnum.app_give_result);
                }
            }
        }
    }
}