import { Constants } from "../../Constants";

/**
 * 统计工具
 */
export default class AnalyticsTool {
    /**
     * 设置用户信息
     */
    public static setUserInfo() {
        if(Constants.getInstance().m_LoginUserSession) {
            
        }
    }

    /**
     * 设置打开视图统计
     * @param viewName 
     */
    public static logView(viewName: string, ...params: any) {
        if (params) {
            switch(viewName) {
                case AnalyticsViewEnmu.View_Hall_Shop:
                case AnalyticsViewEnmu.View_Game_Shop:
                case AnalyticsViewEnmu.View_Game_Select_Room:
                case AnalyticsViewEnmu.View_Setting:
                case AnalyticsViewEnmu.View_Game_Rule: {
                    if (params[0]) {
                        let json = {type: params[0]};
                        Constants.getInstance().analytics.logView(viewName, JSON.stringify(json));
                    } else {
                        Constants.getInstance().analytics.logView(viewName, "");
                    }
                    break;
                } 
                default: {
                    Constants.getInstance().analytics.logView(viewName, "");
                    break;
                }
            }
        } else {
            Constants.getInstance().analytics.logView(viewName, "");
        }
        
    }
    
    /**
     * 事件参数
     * @param eventName 事件名
     * @param params 
     */
    public static logEvent(eventName: string, ...params: any) {
        console.log("eventName==",eventName,params)
        if (params) {
            switch(eventName) {
                case AnalyticsEventEnmu.game_setting:
                case AnalyticsEventEnmu.game_sound:
                case AnalyticsEventEnmu.game_music:
                case AnalyticsEventEnmu.game_vibration:
                case AnalyticsEventEnmu.game_system:
                case AnalyticsEventEnmu.game_jackpot:
                case AnalyticsEventEnmu.game_help:
                case AnalyticsEventEnmu.game_rate:
                case AnalyticsEventEnmu.game_contact:
                case AnalyticsEventEnmu.game_service:
                case AnalyticsEventEnmu.game_pollcy:
                case AnalyticsEventEnmu.game_about:
                case AnalyticsEventEnmu.game_close:
                case AnalyticsEventEnmu.game_paytable:
                case AnalyticsEventEnmu.slot_first:
                case AnalyticsEventEnmu.slot_click:
                case AnalyticsEventEnmu.slot_close: {
                    if (params[0]) {
                        let json = {game: params[0]};
                        Constants.getInstance().analytics.logEvent(eventName, JSON.stringify(json));
                    } else {
                        Constants.getInstance().analytics.logEvent(eventName, "");
                    }
                    break;
                } 
                case AnalyticsEventEnmu.slot_bet: {
                    if (params[0] && params[1]) {
                        let json = {game: params[0],
                            room: params[1]
                        };
                        Constants.getInstance().analytics.logEvent(eventName, JSON.stringify(json));
                    } else {
                        Constants.getInstance().analytics.logEvent(eventName, "");
                    }
                }
                default: {
                    Constants.getInstance().analytics.logEvent(eventName, "");
                    break;
                }
            }
        } else {
            Constants.getInstance().analytics.logEvent(eventName, "");
        }
        
    }

    /**
     * 登录统计
     */
     public static clickLogin() {
        Constants.getInstance().analytics.clickLogin();   
    }

    /**
     * 等级达成
     */
    public static levelAcheived() {
        Constants.getInstance().analytics.levelAcheived();   
    }

    /**
     * 应用内购买
     */
    public static purchase() {
        Constants.getInstance().analytics.purchase();   
    }
}
/**
 * 试图统计
 */
export class AnalyticsViewEnmu {
    //加载app界面
    public static View_Main_Loading = "View_Main_Loading";
    //大厅界面
    public static View_Hall = "View_Hall";
    //大厅商店界面
    public static View_Hall_Shop = "View_Hall_Shop";
    //游戏里的商店界面
    public static View_Game_Shop = "View_Game_Shop";
    //用户信息界面
    public static View_UserInfo_Edit = "View_UserInfo_Edit";
    //用户信息设置头像界面
    public static View_UserInfo_Edit_Photo = "View_UserInfo_Edit_Photo";
    //游戏房间选择界面
    public static View_Game_Select_Room = "View_Game_Select_Room";
    //签到界面
    public static View_Signin = "View_Signin";
    //设置界面
    public static View_Setting = "View_Setting";
    //游戏规则界面
    public static View_Game_Rule = "View_Game_Rule";
}
/**
 * 事件统计
 */
export class AnalyticsEventEnmu {
    //  - Face book登录按钮：有效点击时统计
    public static login_google = "login_google";
    public static login_facebook = "login_facebook";
    public static login_apple = "login_apple";
    // -Ios登陆按钮：有效点击时统计
    public static login_ios = "login_ios";
    //  - 游客登录按钮：有效点击时统计
    public static login_guest = "login_guest";
    //  - 点击大厅头像：有效点击（打开个人中心）时统计
    public static user_photo = "user_photo";
    //  - 修改头像：有效点击（打开edit info界面）时统计
    public static user_info = "user_info";
    //  - EDIT：有效点击（打开edit info界面）时统计
    public static user_edit = "user_edit";
    //  - 金币商店跳转按钮：有效点击时统计
    public static user_coin = "user_coin";
    //  - 钻石商店跳转按钮：有效点击时统计
    public static user_diamond = "user_diamond";
    //  - Face book登录按钮：有效点击时统计
    public static user_facebook = "user_facebook";
    //  - 关闭按钮：有效点击时统计
    public static user_close = "user_close";

    //  - 金币商城标签页：有效点击时统计
    public static store_coin = "store_coin";
    //  - 钻石商城标签页：有效点击时统计
    public static store_diamond = "store_diamond";
    //  - 商品购买按钮：有效点击时统计，分不同档位统计
    public static store_buy = "store_buy";
    //  - 商品购买成功统计（GP成功支付时），分不同档位统计
    public static store_buy_success = "store_buy_success";
    //  - 商品购买确认统计（服务器签单，客户端确认购买内容到账时），分不同档位统计
    public static store_buy_confirm = "store_buy_confirm";
    //  - 用户首充
    public static store_user_first_buy = "store_user_first_buy";
    //  - 关闭按钮：有效点击时统计
    public static store_close = "store_close";

    //  - 设置按钮：有效点击时统计
    public static lobby_setting = "lobby_setting";
    //  - Sound：有效点击时统计
    public static lobby_sound = "lobby_sound";
    //  - Music：有效点击时统计
    public static lobby_music = "lobby_music";
    //  - Vibration：有效点击时统计
    public static lobby_vibration = "lobby_vibration";
    //  - System Notifications：有效点击时统计
    public static lobby_system = "lobby_system";
    //  - Jackpot Notifications：有效点击时统计
    public static lobby_jackpot = "lobby_jackpot";
    //  - Help：有效点击时统计
    public static lobby_help = "lobby_help";
    //  - Rate Us：有效点击时统计
    public static lobby_rate = "lobby_rate";
    //  - Contact Us：有效点击时统计
    public static lobby_contact = "lobby_contact";
    //  - Terms Of Service：有效点击时统计
    public static lobby_service = "lobby_service";
    //  - Privacy Pollcy：有效点击时统计
    public static lobby_pollcy = "lobby_pollcy";
    //  - About：有效点击时统计
    public static lobby_about = "lobby_about";
    //  - 关闭：有效点击时统计
    public static lobby_close = "lobby_close";

    //  - 设置按钮：有效点击时统计
    public static game_setting = "game_setting";
    //  - Sound：有效点击时统计
    public static game_sound = "game_sound";
    //  - Music：有效点击时统计
    public static game_music = "game_music";
    //  - Vibration：有效点击时统计
    public static game_vibration = "game_vibration";
    //  - System Notifications：有效点击时统计
    public static game_system = "game_system";
    //  - Jackpot Notifications：有效点击时统计
    public static game_jackpot = "game_jackpot";
    //  - Help：有效点击时统计
    public static game_help = "game_help";
    //  - Rate Us：有效点击时统计
    public static game_rate = "game_rate";
    //  - Contact Us：有效点击时统计
    public static game_contact = "game_contact";
    //  - Terms Of Service：有效点击时统计
    public static game_service = "game_service";
    //  - Privacy Pollcy：有效点击时统计
    public static game_pollcy = "game_pollcy";
    //  - About：有效点击时统计
    public static game_about = "game_about";
    //  - 关闭：有效点击时统计
    public static game_close = "game_close";
    //  - Game rule：有效点击时统计
    public static game_paytable = "game_paytable";

    //  - 机器入口图标首次：首次点击关卡入口图标时
    public static slot_first = "slot_first";
    //  - 机器入口图标：点击关卡入口图标时
    public static slot_click = "slot_click";
    //  - 房间选择弹窗：每个bet值：有效点击时
    public static slot_bet = "slot_bet";
    //  - 房间选择弹窗：关闭按钮：有效点击时
    public static slot_close = "slot_close";

    //  - collect按钮：有效点击时，根据配置的档位分开统计
    public static bonus_collect = "bonus_collect";
}