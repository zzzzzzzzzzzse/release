import { UserInfoModel } from "../models/UserInfoModel";
import { WalletInfoModel } from "../models/WalletInfoModel";
import { StringUtil } from "../tools/StringUtil";

/**
 * 登录用户信息
 */
export default class LoginUserSession  {
    /** 用户id */
    public m_uid: string = '0';
    /** 用户会话token */
    public m_userToken: string = "";
    /** 登录token */
    public m_authToken: string = "";
    /** 用户信息 */
    private m_userInfo: UserInfoModel;
    /** 用户钱包信息 */
    private m_userWalletInfo: WalletInfoModel;
 
    /**
     * 获取用户uid
     * @returns
     */
    public getUserId(): string {
        return this.m_uid;
    }
 
    public get userInfo() {
        return this.m_userInfo;
    }
 
    public set userInfo(value: UserInfoModel) {
        this.m_userInfo = value;
    }
 
    public set userWalletInfo(value: WalletInfoModel) {
        this.m_userWalletInfo = value;
    }
 
    public get userWalletInfo() {
        return this.m_userWalletInfo;
    }

    /**
     * 是否是用户
     * @returns 
     */
    public isUser(): boolean {
        // if (this.m_uid === "0") {
            return true;
        // } else {
        //     return false;
        // }
    }
 
    /**
     * 退出登录
     */
    public SignOut() {
        this.m_uid = '0';
        this.m_userToken = "";
        this.m_authToken = "";
        this.m_userInfo = null;
        this.m_userWalletInfo = null;
    }
}
