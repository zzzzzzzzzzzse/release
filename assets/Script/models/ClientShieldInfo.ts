/**
 * 客户端屏幕处理
 */
 export default class ClientShieldInfo {
    /**
     * 是否显示充值
     */
    public m_showMoney: boolean = true;
    /**
     * 全局屏蔽：
     */
    public m_allShield: boolean = true;
    /**
     * 是否核心版本屏蔽，默认是屏蔽状态
     */
    public m_mainShield: boolean = true;
    /**
     * 是否当前版本屏蔽，默认是
     */
    public m_versionShield: boolean = true;
}
