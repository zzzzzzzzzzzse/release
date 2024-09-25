// import NativeBridge from "../common/NativeBridge";
import { Constants } from "../Constants";

/**
 * 获取桥接数据
 */
export default class NativeBridgeModel {
    /** ua */
    private phone_ua: string;
    /** udid */
    private phone_udid: string;
    /** idfa */
    private phone_idfa: string;
    /** 屏幕尺寸 */
    private phone_screenSize: string;

    /**
     * 设置数据
     */
    setData() {
        this.phone_ua = Constants.getInstance().native.getUserAgent();
        this.phone_udid = Constants.getInstance().native.getPhoneUdid();
        this.phone_idfa = Constants.getInstance().native.getPhoneIdfa();
        this.phone_screenSize = Constants.getInstance().native.getScreenSizeOfDevice();
    }

    
    public get UA() : string {
        if (!this.phone_ua) {
            this.setData();
        }
        return this.phone_ua;
    }

    public get UDID() : string {
        if (!this.phone_udid) {
            this.setData();
        }
        return this.phone_udid;
    }

    public get IDFA() : string {
        if (!this.phone_idfa) {
            this.setData();
        }
        return this.phone_idfa;
    }

    public get SCREENSIZE() {
        if (!this.phone_screenSize) {
            this.setData();
        }
        return this.phone_screenSize;
    }
}
