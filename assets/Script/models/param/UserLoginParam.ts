/**
 * 用户登录请求参数
 */
export class UserLoginParam {
    /**
     * 注册的分配的用户名
     */
    public m_name: string;
    /**
     * 登录模式
     */
    public m_cmdModel: string;
    /**
     * 密码
     */
    public m_pwd: string;
    /**
     * 手机前缀
     */
    public m_prefix: string;
    /**
     * 设备标识r
     */
    public m_udid: string;
    /**
     * 推送token
     * IOS为apns那个识别码,ANDROID为推送平台识别码
     */
    public m_token: string;
    /**
     * ios专用IMEI
     */
    public m_imei: string;
    /**
     * ios专用IMSI
     */
    public m_imsi: string;
    /**
     * 设备唯一标识
     * android：'gaid'
     * iphone: 'idfa'
     */
    public m_idfa: string;
    /**
     * 网卡
     */
    public m_mac: string;
    /**
     * 登录模式
     * true:后台登录
     * false前台登录
     */
    public m_bgAuth: boolean;

    /**
     * 是手机验证码模式
     */
    public setPhonecodeModel() {
        this.m_cmdModel = "phonecode";
    }

    /**
     * 是邮箱验证码模式
     */
    public setEmailcodeModel() {
        this.m_cmdModel = "emailcode";
    }

    /**
     * 是系统用户名(authName)
     */
    public setSysnameModel() {
        this.m_cmdModel = "sysname";
    }

    /**
     * 是系统ID模式
     */
    public setSysuidModel() {
        this.m_cmdModel = "sysuid";
    }

    /**
     * 是否是手机验证码模式
     * @returns 
     */
    public isPhonecodeModel(): boolean {
        return this.m_cmdModel === "phonecode";
    }
    
    /**
     * 是否是邮箱验证码模式
     * @returns 
     */
     public isEmailcodeModel(): boolean {
        return this.m_cmdModel === "emailcode";
    }

    /**
     * 是否是系统用户名(authName)
     * @returns 
     */
     public isSysnameModel(): boolean {
        return this.m_cmdModel === "sysname";
    }

    /**
     * 是否是系统ID模式
     * @returns 
     */
    public isSysuidModel(): boolean {
        return this.m_cmdModel === "sysuid";
    }
}
