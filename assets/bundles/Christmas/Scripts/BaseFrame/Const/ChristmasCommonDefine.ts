/**
 * 服务器IP
 */
export enum URL_IP {
    /**
     * 本地
     */
    NATIVE = 'http://192.168.9.19:8901/login/',
    /**
     * 内网测试服
     */
    LAN_DEBUG = 'http://192.168.9.247:8901/login/',
    /**
     * 外网测试服
     */
    INTERNET_DEBUG = 'http://203.10.96.66:8901/login/',
    /**
     * 外网正式服
     */
    INTERNET_RELEASE = 'https://game.onlinegamestime.com/login/',
}

/**存储类型 */
export enum LocalStorageType {
    AUDIO_BGM_VOLUME = 'AUDIO_BGM_VOLUME',     //背景音乐音量
    AUDIO_EFFECT_VOLUME = 'AUDIO_EFFECT_VOLUME',  //音效音量
    USER_ACCOUNT = 'USER_ACCOUNT',//账号
    USER_PSW = 'USER_PSW',//密码
    DEVICEID = 'DEVICEID',//设备id
    TOKEN = 'TOKEN',//token
    SWITCH_MUSIC = 'SWITCH_MUSIC',//音乐开关
    SWITCH_SOUND = 'SWITCH_SOUND',//音效开关
    SWITCH_VIBRATE = 'SWITCH_VIBRATE',//震动开关
    SWITCH_NOTICE = 'SWITCH_NOTICE',//公告开关
    LANGUAGE = 'LANGUAGE',//语言 
    LEVELROAD = 'LEVELROAD',//上一次等级解锁跳到的等级
    FEEDBACK_EMAIL = 'FEEDBACK_EMAIL',//feedback邮箱
    LAST_LOGIN_TIME = 'LAST_LOGIN_TIME',//上次登录的时间
    APPLE_WAIT_VALIDATE_ORDERS = 'APPLE_WAIT_VALIDATE_ORDERS',//apple 等待校验的订单列表
    GP_WAIT_VALIDATE_ORDERS = 'GP_WAIT_VALIDATE_ORDERS',//GP 等待校验的订单列表
    LAST_GUIDE_ID = 'LAST_GUIDE_GROUP',//上一次新手引导的group
    FIRST_GAME = 'FIRST_GAME',//第一次进游戏的标志
    HOTUPDATE_SEARCH_PATH = 'HotUpdateSearchPaths',//热更新搜索路径,不能随意修改，热更新插件里面还会用到此字符串
    IS_HOT_UPDATE_ENTER = 'IS_HOT_UPDATE_ENTER',//是否是热更新启动
    GOLD = 'GOLD'
}

export enum MessageType {
    HALL_MSG = '100',
    ROOM_MSG = '200',
    CLASSIC777_MSG = "101",
    BUFFALO_RUN = '102',
    DRAGON_SLAYING = '103',
    PIRATES_TREASURE = '104',
    LUCKY_CLOVER = '105',
    HAPPY_FIREWORKS = '106',
    MINE_BLASTING = '107',
    THUNDER_FURY = '108',
    COOL_SUMMER = '109',
    CANDY_SHOP = '110',
    WILD_WEST = '111',
    MAGIC_WORKSHOP = '112',
    HAPPY_FARM = '113',
    MERMAID_PRINCESS = '114',
    STONE_AGE = '115',
    ERR_MSG = '500',
    PING = '600',
    PONG = '601',
    COMMON_GAME_MSG = '802',
}

export class GameItemVo {
    public gameId: number;//游戏id
    public version: number;//游戏版本
    public gameName: string;//包名
    public code: HotUpdateCheckCode;//热更新检测状态
    public status: HotUpdateStaus;//热更新下载状态
    public icon: string;//图标
    public index: number;//列表索引
    public unlockLv: number;//解锁等级
    public isOpen: boolean;//是否开放
    public logo: string;//底部图标
    public spine: string;//spine动画
}

/**
 * 热更新vo数据
 */
export class HotUpdateVo {
    public localManifestUrl: string;//本地manifest文件
    public tempManifestUrl: string;//热更新目录下的manifest文件
    public serverManifetUrl: string;//服务器manifest文件
    public name: string;//名称
}

/**
 * 热更新进度数据
 */
export class DownloadProgressVo {
    public totalDowloadCount: number;//需要下载的数量
    public finishCount: number;//完成的数量
    public name: string;//更新的游戏名称
    public downloadSize: number;//已经下载的字节数
}

/**
 * 热更新检测状态
 */
export enum HotUpdateCheckCode {
    NEED_DOWNLOAD,//需要下载
    NEED_UPDATE,//需要更新
    UP_TO_DATE,//已经是最新
}

/**
 * 热更新状态
 */
export enum HotUpdateStaus {
    FREE,//空闲
    DOWNLOADING,//下载中
    PAUSE,//暂停
    FAILED,//失败
    FINISHED,//完成
}

/**
 * 热更新错误码
 */
export enum HotUpdateCode {
    SUCCESS,//成功
    FAILED,//失败
}

/**按钮触摸移动状态 */
export enum ButtonMoveStatus {
    INSIDE = 0, //内部
    OUTER = 1,  //外部
}

/**
 * slots转动阶段
 * 
 * CHARGE 蓄力阶段
 
   SPEED_UP 加速阶段

   UNIFORM 匀速阶段

   SPEED_CUT 减速阶段

   BOUNCE 回弹阶段
 */
export enum SlotsStage {
    CHARGE = 0,
    SPEED_UP = 1,
    UNIFORM = 2,
    SPEED_CUT = 3,
    BOUNCE = 4,
}

/**
 * 玩家数据
 */
export class PlayerVO {
    public lv: number = 0;//等级
    public lastLv: number = 0;//上次的等级
    public newUser: boolean = true;//是否是新用户
    public rb: number = 0;
    public nickname: string;//昵称
    public headImg: string;//头像
    public headType: number;//头像类型
    public gender: number;//性别
    public userId: number = 0;//用户id
    public gold: number = 0;//金币
    public exp: number = 0;//经验
    public vipLv: number = 0;//vip等级
    public vipExp: number = 0;//vip经验
    public levelUp: boolean = false;//是否升级
    public bindApple: boolean = false;//是否绑定apple账号
    public bindFacebook: boolean = false;//是否绑定facebook账号
    public bindGoogle: boolean = false;//是否绑定google账号
    public canBuyFirstRecharge: boolean = false;//是否可以购买新人礼包
    public gameState: CommonTopStatus = CommonTopStatus.NORMAL;//玩家游戏状态
    public recvEnterMsg: boolean = false;//是否已经收到进入游戏的消息
}

/**
 * 服务器相关数据
 */
export class ServerVO {
    public hallServerId: number;//大厅服务器id
    public gameServerId: number;//游戏服务器id
    public token: string;//token数据
}

/**spin按钮状态 */
export enum SpinBtnStatus {
    SPIN = 0, //手动转
    AUTO = 1,  //自动转
    FREE = 2// 小游戏转
}

/**满注状态 */
export enum MaxStatus {
    MAX = 0, //已满
    NOT_MAX = 1//未满
}

export enum SoundsType {
    //大厅音效
    HALL_BGM = 'Hall/bgm_lobby',
    HALL_APPEAR_GAME = 'Hall/appear_game',
    HALL_ENTER_GAME = 'Hall/enter_game',
    HALL_DOWNLOAD_COMPLETE = 'Hall/unlock_game',
    HALL_LOCK_GAME = 'Hall/lock_game',
    //登录音效
    LOGIN_SUCCESS = 'cheer_loading',
    //通用音效
    CLICK = 'click',
    //菜单音效
    MENU_SWITCH = 'Menu/set_switch',
    MENU_SHOW = 'Menu/open_set',
    MENU_HIDE = 'Menu/close_set',
    //等级解锁音效
    LEVELROAD_BGM = 'LevelRoad/bgm_levelroad',
    LEVELROAD_STEP = 'LevelRoad/levelroad_step',
    LEVELROAD_BUBBLE = 'LevelRoad/levelroad_bubble',
    //通用奖励
    REWARD_APPPEAR = 'Reward/reward_appear',
    REWARD_FIREWORKS = 'Reward/reward_fireworks',
    REWARD_YEAH = 'Reward/reward_yeah',
    //储蓄罐音效
    BANK_BGM = 'Bank/bgm_piggy_bank',
    BANK_DROP = 'Bank/bank_drop',
    BANK_CRY = 'Bank/bank_cry',
    BANK_BREAK = 'Bank/bank_break',
    //商城音效
    SHOP_GOODS = 'Shop/shop_goods',
    //登录奖励音效
    LOGIN_REWARD_APPEAR = 'LoginReward/loginreward_appear',
    LOGIN_REWARD_RESULT = 'LoginReward/loginreward_result',
    LOGIN_REWARD_WHEEL_END = 'LoginReward/loginreward_wheel_end',
    LOGIN_REWARD_WHEEL_RUN = 'LoginReward/loginreward_wheel_run',

    //卡包音效
    LOTTERY_BGN = 'Lottery/pack_bgm',
    LOTTERY_CLICK = 'Lottery/pack_click_pack',
    LOTTERY_CLICK_CANT = 'Lottery/pack_click_pack_cant',
    LOTTERY_PUT_PACK = 'Lottery/pack_put_pack',
    LOTTERY_CANCEL_PACK = 'Lottery/pack_cancel_pack',
    LOTTERY_OPEN_PACK = 'Lottery/pack_open_pack',
    LOTTERY_SHOW_REWARD = 'Lottery/pack_show_reward',
    LOTTERY_COLLECTION = 'Lottery/pack_get_collection',

    //通用奖励音效
    COMMON_REWARD_APPEAR = 'CommonReward/reward_sp_appear',

    //看板娘音效
    LADY_HIT_1 = 'Guide/lady_hit_1',
    LADY_HIT_2 = 'Guide/lady_hit_2',
    LADY_HIT_3 = 'Guide/lady_hit_3',

    EXTEND_ROLL = 'extend_roll',
    SPIN_AUTO = 'spin_auto',
    START_ROLL = 'start_roll',
    BET = 'bet_',//编号需要自己加
    SCATTER_ROLL = 'scatter_roll_1',
    SCATTER_ROLL2 = 'scatter_roll_2',
    SCATTER_ROLL3 = 'scatter_roll',
    END_ROLL = 'end_roll',
    MONEY_ADD = 'money_add',
    MONEY_END = 'money_end',
    MONEY_RUN = 'money_run',
    MONEY_APPEAR = 'money_appear',
    SPIN = 'spin',

    CHICKEN_FARM_BGM = 'ChickenFarm/chick_bgm',
    CHICKEN_FARM_EAT = 'ChickenFarm/chick_eat',
    CHICKEN_FARM_APPEAR = 'ChickenFarm/chick_appear',
    CHICKEN_FARM_ITEM_FLY = 'ChickenFarm/chick_item_fly',
    CHICKEN_FARM_ITEM_PUT = 'ChickenFarm/chick_item_put',
    CHICKEN_FARM_ORGAN = 'ChickenFarm/chick_organ',
    CHICKEN_FARM_POINT = 'ChickenFarm/chick_point',
    CHICKEN_FARM_PULL = 'ChickenFarm/chick_pull',
    CHICKEN_FARM_PUSH = 'ChickenFarm/chick_push',
    CHICKEN_FARM_UPGRAGE = 'ChickenFarm/chick_upgrade',
    CHICKEN_FARM_ITEM_HIT = 'ChickenFarm/chick_item_hit',
}

export enum BundleType {
    HALL = 'HallBundle',
    RESOURCES = 'resources',
    GAME_CLASSIC777 = 'ClassicSevenBundle',
    BUFFALO_RUN = "BuffaloRunBundle",
    DRAGON_SLAYING = "DragonSlayingBundle",
    PIRATES_TREASURE = "PiratesTreasureBundle",
    LUCKY_CLOVER = "LuckyCloverBundle",
    HAPPY_FIREWORKS = "HappyFireworksBundle",
    MINE_BLASTING = "MineBlastingBundle",
    THUNDER_FURY = "ThunderFuryBundle",
    CANDY_SHOP = "CandyShopBundle",
    COOL_SUMMER = "CoolSummerBundle",
    WILD_WEST = 'WildWestBundle',
    MAGIC_WORKSHOP = 'MagicWorkshopBundle',
    HAPPY_FARM = 'HappyFarmBundle',
    MERMAID_PRINCESS = 'MermaidPrincessBundle',
    STONE_AGE = 'Christmas',
}

/**
 * slots界面放大缩小状态
 */
export enum SlotsViewScaleStatus {
    BIG = 'BIG',//放大
    SMALL = 'SMALL',//缩小
}

/**
 * SPIN按钮状态
 */
export enum SpinStatus {
    SPIN = 0,
    AUTO = 1,
    FREE = 2
}

/**
 * SPIN按钮动画状态
 */
export enum SpinAnimStatus {
    HOLD = 0,//普通状态下长按
    AUTO = 1,//自动
    PROMPT = 2,//无人操作时
    NULL = 3,//没有播动画
    FREE = 4,//免费转
}

/**
 * 通用按钮状态
 */
export enum BtnExStatus {
    NORMAL = 0,//普通状态
    PRESSED = 1,//按下状态
}

/**
 * view关闭动画类型
 */
export enum ViewCloseAnimType {
    ONE = 0,
    TWO = 1,
}

/**
 * view打开动画类型
 */
export enum ViewOpenAnimType {
    ONE = 0,
    TWO = 1,
}


/**
 * slots转盘状态
 */
export enum TurntableStatus {
    SCROLLING = 0,//转动中
    STOP = 1,//停止状态
}

/**
 * slots转盘状态
 */
export enum CommonTopStatus {
    NORMAL = 0,//正常状态
    BAN = 1,//禁止状态
}

/**
 * 连接socket的类型，登录为NORMAL，短线重连为RECONNECT
 */
export enum ConnectType {
    NORMAL,
    RECONNECT
}

/**
 * google支付服务
 */
export enum GoogleConnectCode {
    OK = 0,
    SERVICE_TIMEOUT = -3,
    BILLING_UNAVAILABLE = 3,
}

// /**
//  * 新手引导步骤
//  */
// export enum GuideGroup {
//     BUFFALO_RUN_DOWNLOAD = 1,
//     DRAGON_SLAYING_DOWNLOAD = 2,
// }

/**
 * 登录类型
 */
export enum LoginType {
    GUEST = 1,
    GOOGLE,
    APPLE,
    FACEBOOK,
}

/**
 * 界面等级（数字越小 级别越高）
 */
export enum ViewLevel {
    LEVEL_ONE = 1,
    LEVEL_TWO = 2,
}

export enum PointType {
    BEGIN_AUTO_SPIN = 'behavior_auto_spin',
    SKIP_BIG_WIN = 'behavior_spin_anim',
}

export enum TimeOutType {
    COMMON_TIME_OUT = 10,
}

export enum OperateTypeEnum {
    DEF = 0,//默认
    NEW_PLAYER_GIVING,//新用户赠送
    RECHARGE,//购买充值
    GAMING_BETTING,//游戏下注
    GAMING_SETTLE,//游戏结算
    GAME_LV_AWARD,//游戏等级奖励
    VIP_LV_AWARD,//vip等级奖励
    CONTINUOUS_LOGIN_AWARD,//连续登录奖励
    VIP_LOGIN_AWARD,//vip登录奖励
    ROTARY_LOGIN_AWARD,//转盘登录奖励
    PRIME_DAYLI_CHIP_LOGIN_AWARD,//月卡会员每日奖励
    LOTTERY_AWARD,//乐透摇奖奖励
    LOTTERY_PUZZLE_AWARD,//乐透拼图奖励
    BREAK_SAVING_BOX_AWARD,//砸碎储蓄罐奖励
    REWARD_FREE_AWARD,//免费奖励
    WEEKLY_ASSIGNMENT_AWARD,//周任务奖励
    EMAIL_ACCESSORY_RECEIVE,//邮件附件领取
    ADMIN_GIVE,//管理员手动赠送
    GROWTH_FUND_RECEIVE,//成长基金领取
    ADMIN_DESC,//管理员手动扣除
    ROBOT_ADD,//AI上分
    ROBOT_DESC,//AI下分
    BIND_ACCOUNT_REWARD,//绑定三方账户奖励
    PACK_REWARD,//卡包奖励
    PACK_FRAGMENT_REWARD,//卡包碎片奖励
    BANKRUPTCY_ASSISTANCE_FREE = 25,//破产免费补助
    CHICKEN_FARM = 26,//小鸡农场
}

/**
 * 公告类型
 */
export enum NoticeType {
    NORMAL,
    UPDATE,
    ACTIVITY
}

export enum FirebaseEvent {
    LOGIN_SUCCESS = "login",//登录成功
    BUY_SUCCESS = "purchase",//购买成功
    SIGN_UP_SUCCESS = "sign_up",//注册成功
    ONLINE = "online",//在线
}

/**
 * 活动类型
 */
export enum ActivityType {
    GROWTH_FUND = 2001,//成长基金
    FIRST_RECHARGE = 1001,//新手礼包
    LIMIT_ACTIVITY = 1002,//限时优惠
}

/**
 * 活动入口类型
 */
export enum ActivityPostion {
    DIALOG = 1,//弹窗入口
    PAGE = 2,//大厅入口
    ICON = 3,//图标
}

/**
 * 新手引导组类型
 */
export enum GuideGroup {
    GUIDE_GOLD_NOT_ENOUGH = 101,//金币不足引导
    GUIDE_FREE_AWARD = 21002,//引导领取免费奖励
    GUIDE_ENTER_GAME = 1001,//引导从登录界面进入到机台
    GUIDE_PLAY_GAME = 1002,//引导下注等相关操作
    GUIDE_SCALE_BTN = 1003,//引导点击放大按钮
    GUIDE_LEVELROAD_SLOT2 = 2001,//引导进返回到大厅下载机台2
    GUIDE_DOWNLOAD_SLOT2 = 2002,//引导下载机台2
    GUIDE_CLICK_ANY_POS_SLOT2 = 2003,//引导点击机台2的任意位置
    GUIDE_HALL_CLICK_HEAD = 3001,//引导点击大厅头像
    GUIDE_INFORMATION_CLICK_HEAD = 3002,//引导点击个人信息弹窗的头像引导介绍修改个人信息
    GUIDE_INFORMATION_ALTER_INFO = 3003,//引导介绍修改个人信息
    GUIDE_LEVELROAD_BANK = 4001,//引导进入储蓄罐
    GUIDE_BANK_NORMAL_BREAK = 4002,//介绍普通锤
    GUIDE_BANK_SUPER_BREAK = 4003,//介绍普通锤
    GUIDE_LEVELROAD_WEEK_TASK = 5001,//引导进入周任务
    GUIDE_WEEK_TASK_INTRODUCE = 5002,//介绍周任务
    GUIDE_LEVELROAD_PACK = 6001,//引导进入卡包
    GUIDE_PACK_OPEN = 6002,//引导打开卡包
    GUIDE_PACK_AWARD = 6003,//引导领取卡包收集品
    GUIDE_LEVELROAD_CHICKEN_FARM = 7001,//引导进入小鸡农场
    GUIDE_CHICKEN_FARM = 7002,//引导发射饲料
}

/**
 * 新手引导操作类型
 */
export enum GuideOperationType {
    AUTO_OPEN = 1001,//自动打开界面或弹窗
    CLICK = 1002,//按钮点击
    LONG_CLICK = 1003,//长按按钮
    CLICK_ANY_POS = 1004,//点击任意位置
    TOUCH_MOVE = 1005,//滑动
}

export enum RemainEvent {
    OPEN_GAME = 101010,//打开游戏
    LOADING_COMPLETED = 101020,//loading进度条加载完成
    LOGIN_BTN_CLICK = 101030,//登录按钮点击
    FIRST_ENTER_SLOT1 = 101050,//新玩家进入机台1
    GUIDE_TALK1 = 101060,//新手引导对话1
    GUIDE_TALK2 = 101070,//新手引导对话2
    GUIDE_TALK3 = 101080,//新手引导对话3
    GUIDE_ALTER_BET = 101090,//介绍修改投注
    GUIDE_WIN_BET = 101100,//介绍奖励金额
    GUIDE_MAX_BET = 101110,//点击满注按钮
    GUIDE_CLICK_SPINE = 101120,//点击投注按钮
    GUIDE_TALK4 = 101130,//对话4
    GUIDE_SCALE_BTN = 101140,//点击放大按钮
    GUIDE_SPINE_AUTO = 101150,//开启自动投注
    SHOP_OPEN = 1001010,//打开商店
    SHOP_BUY = 1001020,//点击购买按钮
    SHOP_BUY_SUCCESS = 1001030,//购买成功
    FIRST_RECHARGE_OPEN = 1002010,//打开新手礼包
    FIRST_RECHARGE_BUY = 1002020,//新手礼包点击购买按钮
    FIRST_RECHARGE_BUY_SUCCESS = 1002030,//新手礼包购买成功
    GROWTH_FUND_OPEN = 1003010,//打开成长基金
    GROWTH_FUND_BUY = 1003020,//成长基金点击购买按钮
    GROWTH_FUND_BUY_SUCCESS = 1003030,//成长基金购买成功
    LIMIT_ACTIVITY_OPEN = 1004010,//打开成长限时热卖
    LIMIT_ACTIVITY_BUY = 1004020,//限时热卖点击购买按钮
    LIMIT_ACTIVITY_BUY_SUCCESS = 1004030,//限时热卖购买成功
    BANK_BREAK_NORMAL_CLICK = 1005010,//在储蓄罐界面点击普通锤按钮（当前没有普通锤）
    BANK_BREAK_NORMAL_BUY = 1005020,//点击弹窗中的购买按钮
    BANK_BREAK_NORMAL_BUY_SUCCESS = 1005030,//普通锤购买成功
    BANK_BREAK_SUPER_CLICK = 1006010,//在储蓄罐界面点击双倍锤按钮（当前没有双倍锤）
    BANK_BREAK_SUPER_BUY = 1006020,//点击弹窗中的购买按钮
    BANK_BREAK_SUPER_BUY_SUCCESS = 1006030,//双倍锤购买成功
    PRIME_OPEN = 1007010,//打开会员弹窗
    PRIME_BUY = 1007020,//点击购买按钮
    PRIME_BUY_SUCCESS = 1007030,//购买成功
    BANKRUPTCY_OPEN = 1008010,//打开付费破产弹窗
    BANKRUPTCY_BUY = 1008020,//点击购买按钮
    BANKRUPTCY_BUY_SUCCESS = 1008030,//购买成功
    CHICKEN_FARM_BALL_OPEN = 1009010,//弹出购买饲料弹窗
    CHICKEN_FARM_BALL_BUY = 1009020,//点击购买按钮
    CHICKEN_FARM_BALL_BUY_SUCCESS = 1009030,//购买成功
}

/**
 * 商品id
 */
export enum ShopType {
    BANK_NORMAL_BREAK = 1001,//普通锤
    BANK_SUPER_BREAK = 1002,//双倍锤
    FIRST_RECHARGE = 20001,//新手礼包
    BANKRUPTCY = 30001,//破产礼包
    PRIME = 100001,//会员
    GROWTH_FUND = 100002,//成长基金
    PRIME_RENEW = 110001,//续费会员
    CHICKEN_FARM_BALL = 2001,//小鸡农场饲料
}

/**
 * 道具id
 */
export enum ItemType {
    GOLD = 1,//金币
    CHICKEN_FARM_BALL = 20000,//小鸡农场饲料
    CHICKEN_FARM_UP_LEVEL = 20001,//小鸡农场双倍升级道具
    CHICKEN_FARM_DIVIDE = 20002,//小鸡农场分裂道具
    CHICKEN_FARM_DOUBLE_GOLD = 20003,//小鸡农场双倍金币道具
    CHICKEN_FARM_ADD_BALL = 20004,//小鸡农场增加饲料道具
}

/**
 * 小鸡农场游戏状态
 */
export enum ChickenFarmGameState {
    FREE,//空闲状态
    BALL_DROP,//球下落状态
    BALL_DROP_STOP,//球下落停止
    BALL_PRE_SHOT,//准备发射，球在管口中
    BALL_SHOT,//球离开管口
    GAME_OVER,//游戏结束
}

/**
 * 点数信息
 */
export class CommonPointInfo {
    public curPoint: number;//当前点数
    public maxPoint: number;//最大点数
    public lastMaxPoint: number;//上一级的最大点数
    public key: string;//功能key值
    public isMax: boolean;//是否达到最大等级
    public isUpLevel: boolean;//是否升级
}

/**
 * 功能key
 */
export enum FunctionKey {
    LEVELROAD = 10000,//等级解锁
    BANK_PIG = 10001,//储蓄罐
    BIGWIN = 10002,//周任务
    LOTTERY = 10003,//卡包
    CHICKEN_FARM = 10004,//小鸡农场

}