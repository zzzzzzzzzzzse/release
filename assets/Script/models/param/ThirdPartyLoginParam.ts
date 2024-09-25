/**
 * 第三方登录登录请求参数
 */
 export default class ThirdPartyLoginParam {
    /**
     * 用户名-内部算法(AndroidID+GADI)
     */
    public m_oaType: string;
    /**
     * 设备ID
     */
    public m_method: string;
    /**
     * 分享渠道号
     */
    public m_openId: string;
    /**
     * 分享渠信息
     */
    public m_valCode: string;
    public m_valAppId: string;

    public m_headerUrl:string;
    /**
     * ios专用IMEI
     */
    public m_fullName: string;
    /**
     * ios专用IMSI
     */
    public m_email: string;

    public isFacebook(): boolean {
        return this.m_method === 'oafb';
    }

    public isApple(): boolean {
        return this.m_method === 'oaapple';
    }
}
