
/**
 * 事件类型
 */
export enum ChristmasEventDefine {
    QUIE_CHANGE_NORMAL_STATE = "NORMAL_STATE",//改变为普通状态
    QUIE_CHANGE_SPECIAL_STATE = "SPECIAL_STATE",//改变为特殊状态
    QUIE_SET_NORMAL_DATA = "SET_NORMAL_DATA",//设置普通状态数据
    QUIE_SET_SPECIAL_DATA = "SET_SPECIAL_DATA",//设置特殊状态数据
    QUIE_COMMON_PROMPT = "COMMON_PROMPT",//通用提示
    QUIE_GAME_HIDE = "GAME_HIDE",//切换到后台
    QUIE_GAME_SHOW = "GAME_SHOW",//切换到前台
    QUIE_SLOTS_ONE_STOP = "SLOTS_ONE_STOP",//SLOTS的某个转轴停了
    DOWNLOAD_CALLBACK = 'DOWNLOAD_CALLBACK',//热更新下载回调事件
    DOWNLOAD_COMPLETED = 'DOWNLOAD_COMPLETED',//热更新下载完成事件
    GET_VERSION_SUCCESS = 'GET_VERSION_SUCCESS',//获取版本信息成功
    GET_STORE_VERSION_SUCCESS = 'GET_STORE_VERSION_SUCCESS',//获取商店版本信息成功
    SLOTS_TURN_STAGE = "SLOTS_TURN_STAGE",//slots转动阶段
    SLOTS_CHANGE_ICON_IMAGE = "SLOTS_CHANGE_ICON_IMAGE",//slots换图
    SLOTS_TURN_PER_DISTANCE = "SLOTS_TURN_PER_DISTANCE",//slots刚好转完一轴的距离

    SOCKET_CONNECT_SUCCESS = 'SOCKET_CONNECT_SUCCESS',//socket连接成功
    SOCKET_CLOSE = 'SOCKET_CLOSE',//socket连接断开
    UPDATE_GAME_LIST = 'UPDATE_GAME_LIST',//更新游戏列表
    ENTER_ROOM_SUCCESS = 'ENTER_ROOM_SUCCESS',//进入房间成功
    EXIT_ROOM_SUCCESS = 'EXIT_ROOM_SUCCESS',//退出房间成功

    CLOSE_MENU_DIALOG = 'CLOSE_MENU_DIALOG',//关闭菜单
    MUSIC_SWITCH = 'MUSIC_SWITCH',//音乐开关状态发生变化
    UPDATE_PLAYER_GOLD = 'UPDATE_PLAYER_GOLD',//更新玩家金币
    UPDATE_PLAYER_EXPINFO = 'UPDATE_PLAYER_EXPINFO',//更新经验信息
    UPDATE_PLAYER_VIPINFO = 'UPDATE_PLAYER_VIPINFO',//更新vip信息
    PLAYER_LEVEL_UP = 'PLAYER_LEVEL_UP',//升级通知
    PLAYER_VIP_LEVEL_UP = 'PLAYER_VIP_LEVEL_UP',//VIP升级通知

    LANGUAGE_CHANGED = 'LANGUAGE_CHANGED',//切换语言
    CLOSE_SELECT_LANGUAGE = 'CLOSE_SELECT_LANGUAGE',//关闭语言选择面板
    USERINFO_CHANGED = 'USERINFO_CHANGED',//头像，昵称发生变化
    UPDATE_AVATART_LIST = 'UPDATE_AVATART_LIST',//可选头像列表发生变化

    COMMON_TOP_STATUS_CHANGE = 'COMMON_TOP_STATUS_CHANGE',//slots顶部状态改变

    MSG_PUSH_COMPLETED = 'MSG_PUSH_COMPLETED',//登录需要推送的消息全部完成

    UPDATE_BANK_INFO = 'UPDATE_BANK_INFO',//更新储蓄罐信息
    BANK_GOLD_ADD = 'BANK_GOLD_ADD',//储蓄罐金币增加
    BANK_GOLD_FULL = 'BANK_GOLD_FULL',//储蓄罐金币满了
    BANK_BREAK_SUCCESS = 'BANK_BREAK_SUCCESS',//储蓄罐打开成功

    HALL_SLOT_SPINE = 'HALL_SLOT_SPINE',//大厅机台随机动画

    GOOLE_LOGIN_SUCCESS = 'GOOLE_LOGIN_SUCCESS',//goole登录成功
    FACEBOOK_LOGIN_SUCCESS = 'FACEBOOK_LOGIN_SUCCESS',//facebook登录成功
    APPLE_LOGIN_SUCCESS = 'APPLE_LOGIN_SUCCESS',//apple登录成功
    LOGIN_FAILED = 'LOGIN_FAILED',//登录失败
    LOING_DEVICE_INVALID = 'LOING_DEVICE_INVALID',//deviceId登录失败

    ACCOUNT_SPECIAL_BIND = 'ACCOUNT_SPECIAL_BIND',//触发账号特殊绑定类型

    GET_UPDATE_NOTICE_SUCCESS = 'GET_UPDATE_NOTICE_SUCCESS',//获取更新公告成功
    GET_HOT_UPDATE_CONFIG_SUCCESS = 'GET_HOT_UPDATE_CONFIG_SUCCESS',//获取热更新配置数据


    CHECK_SERVER_SLOT_DATA = "CHECK_SERVER_DATA",//检查是否收到了下注的数据
    STOP_AUTO_SPIN = "STOP_AUTO_SPIN",//停止自动转

    SHOP_UPDATE_LIST = 'SHOP_UPDATE_LIST',//金币商店列表变化
    SHOP_SHOW_VIP = 'SHOP_SHOW_VIP',//显示vip弹窗
    SHOP_CREATE_ORDER_SUCCESS = 'SHOP_CREATE_ORDER_SUCCESS',//商城创建订单成功
    SHOP_BUY_ITEMS_SUCCESS = 'SHOP_BUY_ITEMS_SUCCESS',//支付成功
    SHOP_BUY_ITEMS_FAILED = 'SHOP_BUY_ITEMS_FAILED',//支付失败

    PLAY_CONNECT_FAILED = 'PLAY_CONNECT_FAILED',//连接失败失败

    FEEDBACK_FAILED = 'FEEDBACK_FAILED',//feedback提交失败
    FEEDBACK_SUCCESS = 'FEEDBACK_SUCCESS',//feedback提交成功

    GAME_STATE_CHANGED = 'GAME_STATE_CHANGED',//玩家游戏状态变化

    UPDATE_ITEM_INFO = 'UPDATE_ITEM_INFO',//更新道具信息
    ADD_ITEM_LIST = 'UPDATE_ITEM_LIST',//增加道具列表
    REMOVE_ITEM_LIST = 'UPDATE_ITEM_LIST',//删除道具列表

    WHEEL_COLLIDE_BOTTOM = "WHEEL_COLLIDE_BOTTOM",//某个轴撞底
    GAME_PRELOAD_COMPLETE = "GAME_PRELOAD_COMPLETE",//子游戏预加载完成

    FREE_REWARD_UPDATE_INFO = 'FREE_REWARD_UPDATE_INFO',//更新免费奖励信息
    FREE_REWARD_AWARD_SUCCESS = 'FREE_REWARD_AWARD_SUCCESS',//免费奖励领取成功
    FREE_REWARD_EASTER_EGG = 'FREE_REWARD_EASTER_EGG',//免费奖励彩蛋信息

    EMAIL_UPDATE_INFO = 'EMAIL_UPDATE_INFO',//更新邮件信息
    EMAIL_UPDATE_LIST = 'EMAIL_UPDATE_LIST',//更新邮件列表
    EMAIL_UPDATE_REDPOINT = 'EMAIL_UPDATE_REDPOINT',//更新邮件红点

    ROLLING_NOTICE_UPDATE_INFO = 'ROLLING_NOTICE_UPDATE_INFO',//更新滚动公告信息
    ROLLING_NOTICE_ADD = 'ROLLING_NOTICE_ADD',//增加滚动公告

    NOTICE_UPDATE_INFO = 'NOTICE_UPDATE_INFO',//更新公告信息

    WEEK_TASK_UPDATE_INFO = 'WEEK_TASK_UPDATE_INFO',//更新周任务信息
    WEEK_TASK_UPDATE_AWARD = 'WEEK_TASK_UPDATE_AWARD',//更新周任务奖励信息
    WEEK_TASK_UPDATE_AWARD_LIST = 'WEEK_TASK_UPDATE_AWARD_LIST',//更新周任务奖励列表
    WEEK_TASK_AWARD_SUCCESS = 'WEEK_TASK_AWARD_SUCCESS',//周任务领取奖励成功
    WEEK_TASK_UP_LEVEL = 'WEEK_TASK_UP_LEVEL',//周任务升级消息
    WEEK_TASK_UPDATE_REDPOINT = 'WEEK_TASK_UPDATE_REDPOINT',//更新周任务红点

    LIMIT_TIME_ACTIVITY_UPDATE_INFO = 'LIMIT_TIME_ACTIVITY_UPDATE_INFO',//更新限时优惠信息

    PRIME_UPDATE_INFO = 'PRIME_UPDATE_INFO',//更新会员信息

    GROWTH_FUND_UPDATE_INFO = 'GROWTH_FUND_UPDATE_INFO',//更新成长基金信息

    HALL_ACTIVITY_SHOW = 'FIRST_RECHARGE_SHOW',//显示大厅活动

    ACTIVITY_UPDATE_RED_POINT = 'ACTIVITY_UPDATE_RED_POINT',//更新活动红点
    ACTIVITY_CLOSE_EVENT_LOBBY = 'ACTIVITY_CLOSE_EVENT_LOBBY',//关闭大厅的活动界面
    ACTIVITY_UPDATE_LIST = 'ACTIVITY_UPDATE_LIST',//更新活动列表

    LOTTERY_UPDATE_SHOW_CARD_LIST = 'LOTTERY_UPDATE_SHOW_CARD_LIST',//更新卡包显示列表
    LOTTERY_ADD_WAIT_OPEN_CARD = 'LOTTERY_ADD_WAIT_OPEN_CARD',//增加一个待打开的卡包
    LOTTERY_ADD_FREE_CARD = 'LOTTERY_ADD_FREE_CARD',//增加一个空闲的卡包
    LOTTERY_OPEN_SUCCESS = 'LOTTERY_OPEN_SUCCESS',//打开卡包成功
    LOTTERY_UPDATE_CHIP_INFO = 'LOTTERY_UPDATE_CHIP_INFO',//更新卡包碎片信息
    LOTTERY_COLLECTION_UPDATE_STATE = 'LOTTERY_COLLECTION_UPDATE_STATE',//道具变化时收集品是否需要更新
    LOTTERT_CHIP_AWARD_SUCCESS = 'LOTTERT_CHIP_AWARD_SUCCESS',//碎片合成奖励领取成功

    GUIDE_BTN_CLICK = 'GUIDE_BTN_CLICK',//新手引导按钮点击
    GUIDE_STEP_CHANGED = 'GUIDE_STEP_CHANGED',//新手引导id发生变化

    FLY_GOLD_SHOW = 'FLY_GOLD_SHOW',//显示飞金币动画
    FLY_GOLD_CLOSE = 'FLY_GOLD_CLOSE',//关闭飞金币动画
    FLY_GOLD_MONEY_END = 'FLY_GOLD_MONEY_END',//飞金币完全结束

    LOGIN_REWARD_GET_SUCCESS = 'LOGIN_REWARD_GET_SUCCESS',//获取登录奖励信息成功

    GET_SYSTEM_MODEL_SUCCESS = 'GET_SYSTEM_MODEL_SUCCESS',//获取手机型号成功

    BANKRUPTCY_GET_FREE_AWARD_SUCCESS = 'BANKRUPTCY_GET_FREE_AWARD_SUCCESS',//领取破产资助免费奖励成功

    CHICKEN_FARM_GAME_START = 'CHICKEN_FARM_GAME_START',//小鸡农场游戏开始
    CHICKEN_FARM_COLLISION_WITH_CHICKEN = 'CHICKEN_FARM_COLLISION_WITH_CHICKEN',//小鸡农场与鸡碰撞
    CHICKEN_FARM_COLLISION_WITH_ITEM = 'CHICKEN_FARM_COLLISION_WITH_ITEM',//小鸡农场球与道具碰撞
    CHICKEN_FARM_COLLISION_WITH_NOZZLE = 'CHICKEN_FARM_COLLISION_WITH_NOZZLE',//小鸡农场与管口碰撞
    CHICKEN_FARM_GAME_STATE_CHANGED = 'CHICKEN_FARM_GAME_STATE_CHANGED',//小鸡农场游戏状态发生变化
    CHICKEN_FARM_PUT_ITEM_SUCCESS = 'CHICKEN_FARM_PUT_ITEM_SUCCESS',//小鸡农场投放道具成功
    CHICKEN_FARM_PUT_ITEM_ANI = 'CHICKEN_FARM_PUT_ITEM_ANI',//小鸡农场投放道具动画
    CHICKEN_FARM_FEED_SUCCESS = 'CHICKEN_FARM_FEED_SUCCESS',//小鸡农场小鸡喂养成功
    CHICKEN_FARM_EAT_COMPLETED = 'CHICKEN_FARM_EAT_COMPLETED',//小鸡农场吃的动画播放完成
    CHICKEN_FARM_UPGRADE_COMPLETED = 'CHICKEN_FARM_UPGRADE_COMPLETED',//小鸡农场升级动画播放完成
    CHICKEN_FARM_CHICKEN_TALK = 'CHICKEN_FARM_CHICKEN_TALK',//小鸡农场小鸡说话的事件
    CHICKEN_FARM_UPDATE_ITEM_LIST = 'CHICKEN_FARM_UPDATE_ITEM_LIST',//小鸡农场道具列表更新
    CHICKEN_FARM_UPDATE_CHICKEN_LIST = 'CHICKEN_FARM_UPDATE_CHICKEN_LIST',//小鸡农场小鸡列表更新


    COMMON_REWARD_CLOSE = 'COMMON_REWARD_CLOSE',//通用奖励弹窗关闭

    COMMON_POINT_UPDATE_INFO = 'COMMON_POINT_UPDATE_INFO',//更新通用点数信息
    COMMON_POINT_PLAY_ANI = 'COMMON_POINT_PLAY_ANI',//播放通用点数增加动画

    BET_GOLD_CHANGE = "BET_GOLD_CHANGE",//下注金额改变
    SLOTS_TURN_ALL_END = "SLOTS_TURN_ALL_END",//slots转盘的每一列转动停止
    SLOTS_SPEED_UP_START = 'SLOTS_SPEED_UP_START',//slots转盘开始加速
    SLOTS_BOUNCE_START = 'SLOTS_BOUNCE_START',//slots转盘开始回弹
}
