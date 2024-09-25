/**
 * 快速登录请求参数
 */
 export default class TouristLoginParam {
    /**
     * 用户名-内部算法(AndroidID+GADI)
     */
    public m_signName: string;
    /**
     * 设备ID
     */
    public m_udid: string;
    /**
     * 分享渠道号
     */
    public m_siCode: string;
    /**
     * 分享渠信息
     */
    public m_siSource: string;
    /**
     * ios专用IMEI
     */
    public m_imei: string;
    /**
     * ios专用IMSI
     */
    public m_imsi: string;
    /**
     * 网卡
     */
    public m_mac: string;
    /**
     * 设备唯一标识
     * android：'gaid'
     * iphone: 'idfa'
     */
    public m_idfa: string;
    /**
     * 推送token
     * IOS为apns那个识别码,ANDROID为推送平台识别码
     */
    public m_token: string;
}
