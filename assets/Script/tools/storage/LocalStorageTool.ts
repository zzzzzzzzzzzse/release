import ClientShieldInfo from "../../models/ClientShieldInfo";
import UserSelfInfo from "../../models/UserSelfInfo";
import { StringUtil } from "../StringUtil";
import { AppDataItemKey } from "./AppDataItemKey";

/**
 * 本地存储管理
 */
export class LocalStorageTool {

    /**
     * 获取javaapi链接  新加 2024.07.15
     * @returns 
     */
    public static getBaseJavaApiHost() {
        return localStorage.getItem(AppDataItemKey.APP_BASEJAVA_APIHOST)
    }

    /**
     * 设置javaapi链接  新加 2024.07.15
     * @param url 链接
     */
    public static setBaseJavaApiHost(url: any) {
        localStorage.setItem(AppDataItemKey.APP_BASEJAVA_APIHOST, url);
    }

    /**
     * 设置api链接
     * @param url 链接
     */
    public static setBaseApiHost(url: any) {
        localStorage.setItem(AppDataItemKey.APP_BASE_APIHOST, url);
    }

    /**
     * 获取api链接
     * @returns 
     */
    public static getBaseApiHost() {
        try {
            let str: string = localStorage.getItem(AppDataItemKey.APP_BASE_APIHOST);
            if (!StringUtil.isEmpty(str)) {
                return str;
            }
        } catch (e) {
        }
        return "";
    }

    /**
     * 设置api链接
     * @param url 链接
     */
    public static setBaseHotHost(url: any) {
        localStorage.setItem(AppDataItemKey.APP_BASE_HOTHOST, url);
    }

    /**
     * 获取api链接
     * @returns 
     */
    public static getBaseHotHost() {
        try {
            let str: string = localStorage.getItem(AppDataItemKey.APP_BASE_HOTHOST);
            if (!StringUtil.isEmpty(str)) {
                return str;
            }
        } catch (e) {
        }
        return "";
    }

    /**
     * 设置屏蔽对象
     * @param url 链接
     */
    public static setShield(url: any) {
        localStorage.setItem(AppDataItemKey.APP_SHIELD, JSON.stringify(url));
    }

    /**
     * 获取屏蔽对象
     * @returns 
     */
    public static getShield(): ClientShieldInfo {
        try {
            let str = localStorage.getItem(AppDataItemKey.APP_SHIELD);
            if (!StringUtil.isEmpty(str)) {
                let info: ClientShieldInfo = JSON.parse(str);
                return info;
            }
        } catch (e) {
        }
        let info: ClientShieldInfo = new ClientShieldInfo();
        return info;
    }

    /**
     * 设置app欸之
     * @param content 内容
     */
    public static setAPPLog(data: string) {
        try {
            let old = this.getAppLog();
            if (old) {
                old += "\n" + data;
            } else {
                old = data;
            }
            localStorage.setItem(AppDataItemKey.APP_LOG, old);
        } catch (e) {
            try {
                localStorage.setItem(AppDataItemKey.APP_LOG, "");
            } catch (e) {

            }
        }
    }

    /**
     * 获取app日志
     * @returns 
     */
    public static getAppLog() {
        try {
            return localStorage.getItem(AppDataItemKey.APP_LOG);
        } catch (e) {
            return null;
        }
    }
    /**
     * 设置api链接
     * @param url 链接
     */
    public static setApiHost(url: any) {
        localStorage.setItem(AppDataItemKey.APP_APIHOST, url);
    }

    /**
     * 获取api链接
     * @returns 
     */
    public static getApiHost() {
        try {
            return localStorage.getItem(AppDataItemKey.APP_APIHOST);
        } catch (e) {
            return null;
        }
    }

    /**
     * 保存用户领取奖励时间
     * @param index 头像id
     */
    public static setUserCollectTime(time: string) {
        if (time) {
            localStorage.setItem(AppDataItemKey.USER_COLLECT_TIME, time);
        } else {
            localStorage.setItem(AppDataItemKey.USER_COLLECT_TIME, "-1");
        }
        // localStorage.setItem(AppDataItemKey.USER_COLLECT_TIME, time);
    }

    /**
     * 获取用户领取奖励时间
     * @returns 
     */
    public static getUserCollectTime(): number {
        try {
            return StringUtil.StringToNumber(localStorage.getItem(AppDataItemKey.USER_COLLECT_TIME));
        } catch (e) {

        }
        return 0;
    }

    /**
     * 保存用户头像
     * @param index 头像id
     */
    public static setUserHeaderId(index: string) {
        localStorage.setItem(AppDataItemKey.USERINFO_HEADER, index);
    }

    /**
     * 获取用户头像
     * @returns 
     */
    public static getUserHeaderId() {
        try {
            return StringUtil.StringToNumber(localStorage.getItem(AppDataItemKey.USERINFO_HEADER));
        } catch (e) {
            return null;
        }
    }

    /**
     * 设置用户登录信息
     * @param authToken 
     */
    public static setLoginserInfo(loginUserInfo: UserSelfInfo) {
        if (loginUserInfo) {
            localStorage.setItem(AppDataItemKey.LOGIN_USER_INFO, JSON.stringify(loginUserInfo));
        } else {
            localStorage.setItem(AppDataItemKey.LOGIN_USER_INFO, '');
        }

    }

    /**
     * 获取用户登录信息
     * @returns 
     */
    public static getLoginserInfo(): UserSelfInfo {
        try {
            let str = localStorage.getItem(AppDataItemKey.LOGIN_USER_INFO);
            if (!StringUtil.isEmpty(str)) {
                let loginUserInfo: UserSelfInfo = JSON.parse(str);
                return loginUserInfo;
            }
        } catch (e) {
        }
        return null;
    }


    /**
     * 设置房间类型
     */
    public static setRoomType(roomType: string) {
        localStorage.setItem(AppDataItemKey.ROOM_TYPE, roomType);
    }

    /**
     * 获取房间类型
     * @returns 
     */
    public static getRoomType() {
        try {
            return localStorage.getItem(AppDataItemKey.USER_TOKEN);
        } catch (e) {
            return null;
        }
    }

    /**
     * 是否开启震动
     * @param isStatus 开关
     */
    public static setVibrationStatus(isStatus: boolean) {
        localStorage.setItem(AppDataItemKey.VIBRATION_STATUS, String(isStatus));
    }

    /**
     * 获取用户是否开启震动
     * @returns 
     */
    public static getVibrationStatus(): boolean {
        try {
            let check = localStorage.getItem(AppDataItemKey.VIBRATION_STATUS);
            if (StringUtil.isEmpty(check)) {
                return true;
            }
            return check === "true";
        } catch (e) {
            return false;
        }
    }

    /**
    * 是否系统通知
    * @param isStatus 开关
    */
    public static setSystemNotifyStatus(isStatus: boolean) {
        localStorage.setItem(AppDataItemKey.SYSTEMN_NOTIFY_STATUS, String(isStatus));
    }

    /**
     * 获取用户是否开启系统通知
     * @returns 
     */
    public static getSystemNotifyStatus(): boolean {
        try {
            let check = localStorage.getItem(AppDataItemKey.SYSTEMN_NOTIFY_STATUS);
            if (StringUtil.isEmpty(check)) {
                return true;
            }
            return check === "true";
        } catch (e) {
            return false;
        }
    }

    /**
    * 是否开启游戏通知
    * @param isStatus 开关
    */
    public static setGameNotifyStatus(isStatus: boolean) {
        localStorage.setItem(AppDataItemKey.GAME_NOTIFY_STATUS, String(isStatus));
    }

    /**
     * 获取用户是否开启游戏通知
     * @returns 
     */
    public static getGameNotifyStatus(): boolean {
        try {
            let check = localStorage.getItem(AppDataItemKey.GAME_NOTIFY_STATUS);
            if (StringUtil.isEmpty(check)) {
                return true;
            }
            return check === "true";
        } catch (e) {
            return false;
        }
    }
    /**
     * 加入游戏信息
     * @param isStatus 开关
     */
    public static setGameJoinData(data) {
        localStorage.setItem(AppDataItemKey.GAME_JOIN_DATA, String(data));
    }

    /**
     * 获取加入游戏信息
     * @returns 
     */
    public static getGameJoinData(): any {
        try {
            return localStorage.getItem(AppDataItemKey.GAME_JOIN_DATA);
        } catch (e) {
            return null;
        }
    }

    /**
     * 已下载的游戏
     * @param data
     */
    public static setDownloadedGame(data: number[]) {
        localStorage.setItem(AppDataItemKey.GAME_DOWNLOADED_GAME, JSON.stringify(data));
    }

    /**
     * 获取已下载的游戏
     * @returns 
     */
    public static getDownloadedGame(): number[] {
        try {
            let data = localStorage.getItem(AppDataItemKey.GAME_DOWNLOADED_GAME);
            if (data) {
                return JSON.parse(data);
            }
        } catch (e) {

        }
        return [];
    }

    /**
     * 以打点的充值成功订单
     * @param data
     */
    public static setSuccessDepositOrd(data: number[]): boolean {
        let olddataStr = localStorage.getItem(AppDataItemKey.SUCCESS_DEPOSIT_ORD);
        if (olddataStr) {
            let olddata: number[] = JSON.parse(olddataStr);
            if (olddata && olddata.length > 0) {
                if (olddata.indexOf(data[0]) >= 0) {
                    return false;
                }
                data.concat(olddata);
            }
        }
        localStorage.setItem(AppDataItemKey.SUCCESS_DEPOSIT_ORD, JSON.stringify(data));
        return true;
    }
}
