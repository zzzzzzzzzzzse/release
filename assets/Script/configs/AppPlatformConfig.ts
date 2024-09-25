export enum AppPlatformType {
    //开发
    KAIFA,
    //测试
    TEST,
    //正式
    FORMAL
}


/**
 * 配置
 */
export default class AppPlatformConfig {
    public static platformType: AppPlatformType = AppPlatformType.FORMAL;
    /**
     * 是否是debug模式
     */
    public static readonly ISDEBUG: boolean = false;

    /**
     * 是否是旧版本模式
     */
    public static readonly ISOLDVERSION: boolean = true;
    /**
     * 打开热更新
     */
    public static OPEN_HOTLOAD: boolean = false;
    /**
     * 打开app测试
     */
    public static readonly OPEN_APP_TEST: boolean = false;

    /**
     * 是否打开facebook头像
     */
    public static readonly ISOPENFBIMG: boolean = false;

    /**
     * 开发服url
     */
    // public static readonly KAIFA_HTTPURL_Suc: string = "http://slotapidev.fanyouonline.cloud:8081/apps/";
    // public static readonly KAIFA_HTTPURL: string = "http://globaldev.fanyouonline.cloud:8081";
    public static readonly KAIFA_HTTPURL_Suc: string = "http://192.168.3.119:8081/api/ClientApp/apps/";
    public static readonly KAIFA_HTTPURL: string = "http://192.168.42.114:9090/";
    /**
     * 测试服url
     */
    public static readonly TEST_HTTPURL_Suc: string = "https://api.ssltestgm.com/apps/";
    public static readonly TEST_HTTPURL: string = "https://global.ssltestgm.com";

    /**
     * 老的正式服url
     */
    public static readonly OLD_HTTPURL: string = "https://global.jackpot-fever.com";

    /**
     * 开发服urljava接口,在使用 2024.06.25
     */
    public static TEST_HTTPURLJAVA: string = "";

    /**
     * 正式服url
     */
    public static readonly HTTPURL: string = "https://global.jackpot-fevergame.com";

    //品牌标签
    public static readonly PlatformConfigID_kaifa = "rooollerslotdev";
    public static readonly PlatformConfigID_test = "rooollerslottest";
    public static readonly PlatformConfigID_OLD = "rooollerslotali";
    public static readonly PlatformConfigID = "rooollerslot";

    //隐私地址
    public static readonly privateUrl = "https://www.game-champion.com/SpinCrazy/policy.html";
    //团队地址
    public static readonly termUrl = "https://www.game-champion.com/index.html";
    //关于我们地址
    public static readonly rateUsUrl = "";
    //关于我们地址
    public static readonly contactUsUrl = "";
    //关于地址
    public static readonly aboutUrl = "https://www.game-champion.com/SpinCrazy/about.html";


    /**
     * 获取url
     * @returns 
     */
    public static getHttpUrl(): string {
        switch (this.platformType) {
            case AppPlatformType.TEST: {
                return this.TEST_HTTPURL;
            }
            case AppPlatformType.FORMAL: {
                return this.HTTPURL;
                // return "https://global.jackpot-fevergame.com/v01/apps/";
            }
            default: {
                return this.KAIFA_HTTPURL;
            }
        }
    }

    public static getPlatformId(): string {
        switch (this.platformType) {
            case AppPlatformType.TEST: {
                return this.PlatformConfigID_test;
            }
            case AppPlatformType.FORMAL: {
                return this.PlatformConfigID;
            }
            default: {
                return this.PlatformConfigID_kaifa;
            }
        }
    }

    public static getWebTestUrl(): string {
        switch (this.platformType) {
            case AppPlatformType.TEST: {
                return this.TEST_HTTPURL_Suc;
            }
            case AppPlatformType.FORMAL: {
                return this.HTTPURL
            }
        }
    }
}