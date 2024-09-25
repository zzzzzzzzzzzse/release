import { Constants } from "../Constants";
import ClientShieldInfo from "../models/ClientShieldInfo";

/**
 * 所有程序OEM相关资源处理
 */
export default class OEMManagerInfo {

    /**
     * 检测GP
     *
     * @return
     */
    public static checkGP(): boolean {
        // //是否屏蔽
        let shieldinfo: ClientShieldInfo = Constants.getInstance().getClientShieldInfo();
        if (shieldinfo.m_versionShield) {
            return false;
        }
        return true;
    }
}