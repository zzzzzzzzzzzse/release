/**
 * app语言显示工具
 */
export default class AppLanguageConfig {
    public static readonly app_exit: string = "Are you sure to exit the game?"

    /** 网络认证失败重新登录 */
    public static readonly http_network_userLogin: string = "";
    /** 网络认证失败退出重新登录 */
    public static readonly text_loginInfo_expired: string = "";

    /** 正在获取主配置 */
    public static readonly Tips_Load_getMain = "Getting master configuration";
    /** 检测版本 */
    public static readonly Tips_Load_checkVer = "Check version";
    /** 最新版本 */
    public static readonly Tips_Load_NewVer = "It is already the latest version";
    /** 热更进行中 */
    public static readonly Tips_Load_loading = "Number of files being downloaded: ";
    /** 获取用户信息 */
    public static readonly Tips_Load_getUserInfo = "Getting user information";
    /** 加载完成 */
    public static readonly Tips_Load_loadingSuccess = "Load complete";
    /** 错误，重启游戏 */
    public static readonly Tips_Load_err = "Error, please restart game";

    /** 加载游戏失败 */
    public static readonly Bundle_loading_err = "Loading game err!"
}
