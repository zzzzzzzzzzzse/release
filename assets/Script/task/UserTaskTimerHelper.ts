import { EventBusEnum } from "../common/EventBus";
import LoginUserSession from "../common/LoginUserSession";
import { Constants } from "../Constants";
import UserApi from "../net/apis/UserApi";
import { WalletApi } from "../net/apis/WalletApi";
import UserTaskConfig from "./UserTaskConfig";

/**
 * 用户任务
 */
export default class UserTaskTimerHelper {
    protected static async checkNetworkNofince(item: UserTaskConfig): Promise<boolean> {
        switch (item.m_talkId) {
            case 1: {
                //登录用户基本资料
                if (Constants.getInstance().m_LoginUserSession.isUser()) {
                    let result = await UserApi.getBaseInfo();
                    if (result.succ) {
                        return true;
                    }
                }
                return false;
            }
            case 2: {
                //登录用户钱包余额
                if (Constants.getInstance().m_LoginUserSession.isUser()) {
                    let result = await WalletApi.getBaseAccounts();
                    console.log("huoquyonghuyue",JSON.stringify(result));
                    if (result.succ) {
                        Constants.getInstance().eventBus.post(EventBusEnum.app_deposit_success);
                        return true;
                    }
                }
                return false;
            }
        }
    }

    /**
     * 添加任务
     * @param taskModel 任务类型
     */
    public static async addTimerTask(taskModel: number) {
        let config: UserTaskConfig = new UserTaskConfig();
        config.m_talkId = taskModel;
        this.checkNetworkNofince(config);
    }

    /**
     * 登录成功后进行任务
     */
    public static loginRunCheckTask() {
        //任务id
        let talks: number[] = [1, 2]; 
        this.autoAddTimerTask(talks);
    }

    /**
     * 自动添加任务
     * @param talks 
     */
    protected static async autoAddTimerTask(talks: number[]) {
        for (let i = 0; i < talks.length; i++) {
            await this.addTimerTask(talks[i]);
        }
    }
}
