/**
 * 用户信息
 */

import { UserSafeAuth } from "./UserSafeAuth";
import { WalletInfoModel } from "./WalletInfoModel";

export class UserInfoModel {
    //用户id
    public m_uid: string;
    //用户账号状态
    public m_userState: number;
    //用户名
    public m_nickName: string;
    //邀请码
    public m_invCode: string;
    //性别
    public m_sex: number;
    //国家码
    public m_countryCode: number;
    //生日
    public m_birthday: string;
    //头像地址
    public m_headerUrl: string;
    //好友数
    public m_friendNum: number;
    //分享数
    public m_shareNum: number;
    //充值次数
    public m_payNum: number;
    //体现次数
    public m_withdrawNum: number;
    //提现热度
    public m_withCashValue: number;
    //活跃度
    public m_activeValue: number;
    //经验值
    public m_expValue: bigint = BigInt(0);
    //升级所需经验值
    public m_nextExpValue: any[];
    //等级
    public m_level: number = 1;
    //是否是真实用户0为未实名，1为已实名，2为审核中
    public m_realStatus: number;
    //是否保证金用户0/1
    public m_ensureStatus: number;
    //用户质量(指头像？)
    public m_userQuality: number;
    //用户模式:15为黑名单
    public m_userModel: number;
    //特征用户
    public m_specialType: number;
    //用户钱包
    public m_userWallet: WalletInfoModel;
    //用户认证信息
    public m_userSafeAuth: UserSafeAuth;

    public getFacebookStatus(): boolean {
        if (this.m_userSafeAuth && this.m_userSafeAuth.m_facebookBindStatus === 1) {
            return true;
        }
        return false;
    }
    public getIOSStatus(): boolean {
        if(this.m_userSafeAuth ){
            console.log("8888888888", this.m_userSafeAuth.m_appleBindStatus);
        }
        if (this.m_userSafeAuth && this.m_userSafeAuth.m_appleBindStatus === 1) {
            return true;
        }
        return false;
    }
}

export interface OnlinePlayersModel {
    nickName: string;
    coin: number;
    diamonds: number;
    level: number;
    sex: number;
}