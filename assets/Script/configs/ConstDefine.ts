


export const enum LAYER_TYPE {
    LAYER_ROOT = 'LayerRoot',
    LAYER_NORMAL = 'LayerNormal',
    LAYER_UI = 'LayerUI',
    LAYER_ANIMATION = "LayerAnimation",
    LAYER_POPUP = "LayerPopUp",
    LAYER_LOADING = "LayerLoading",
}


export const enum NativeEvent {
    EVENT_IOS_LOGIN = "EVENT_IOS_LOGIN",
    EVENT_IOS_BIND = "EVENT_IOS_BIND",
    EVENT_IOS_TRANSACTION = "EVENT_IOS_TRANSACTION",
    EVENT_IOS_TRANSACTIONFAILD = "EVENT_IOS_TRANSACTION_FAILD",
    EVENT_IOS_ADAPTER = "EVENT_IOS_ADAPTER",
}




export const enum EVENT {
    /** @description 登录成功 */
    EVENT_LOGIN_SUCCESS = 1000,
    /** @description 收到下注结果 */
    EVENT_BET_RESULT,
    /** @description 收到结算回调 */
    EVENT_SETTLE_ACCOUNTS,
    /** @description 开启选择界面 */
    EVENT_SELECT_BEGIN,
    /** @description 收到选择界面结果 */
    EVENT_SELECT_RESULT,
    /** @description 更新用户金币 */
    EVENT_UPDATE_USER_COIN,
    /** @description 更新用户经验值 */
    EVENT_UPDATE_USER_EXP,
    /** @description 用户金币 */
    EVENT_UPDATE_COMUSER_COIN,

    EVENT_CLOSE_LOADING,
    /** @description 游戏控制器初始化完毕 */
    EVENT_GAME_CONTROLLER_INIT_FINISHED,
    /** @description 更新倍数 */
    EVENT_UPDATE_BET,
    /** @description 更新游戏类型 */
    EVENT_UPDATE_GAME_TYPE,
    /** @description 开始下注 */
    EVENT_SPIN_BEGIN,

    /** @description 开始下注 */
    EVENT_SPIN_BEGINBIG,
    /** @description 停止下注 */
    EVENT_SPIN_FINISH,
    /** @description 立即停止下注 */
    EVENT_SPINE_FINISH_INSTANTLY,

    EVENT_FREE_EXTRA,

    EVENT_COLLECT_LOCK,
    EVENT_COLLECT_UNLOCK,

    /** @description 下注结算 */
    EVENT_SPIN_SETTLE_ACCOUNTS,
    /** @description 结算完成 */
    EVENT_SETTLE_ACCOUNTS_FINISH,
    /** @description 更新freegame游戏次数 */
    EVENT_UPDATE_FREE_GAME_TIMES,
    /** @description 更新收集玩法进度 */
    EVENT_UPDATE_COLLECT_PROGRESS,
    /** @description 收集玩法开始 */
    EVENT_COLLECT_BEGIN,
    /** @description 收集玩法结算 */
    EVENT_COLLECT_SETTLE_ACCOUNTS,
    /** @description 收集玩法退出 */
    EVENT_COLLECT_QUIT,
    /** @description 选择模式bonus玩法开始 */
    EVENT_SELECT_BONUS_BEGIN,
    /** @description bonusgame开始 */
    EVENT_BONUS_BEGIN,
    /** @description bonusgame退出 */
    EVENT_BONUS_QUIT,
    EVENT_SUPER_FREE_BEGIN,
    /** @description freegame开始 */
    EVENT_FREE_BEGIN,
    EVENT_SELECT_FREE_BEGIN,
    /** @description freegame自动下注 */
    EVENT_AUTO_SPIN,
    /** @description freegame退出 */
    EVENT_FREE_QUIT,
    /** @description 更新win的Label */
    EVENT_UPDATE_WIN_LABEL,
    /** @description 更新winLabel完毕 */
    EVENT_WIN_LABEL_UPDATE_FINISH,

    EVENT_INIT_PANEL,

    /** @description 回到basegame */
    EVENT_BACK_BASEGAME,
    /** @description 更新按钮状态 */
    EVENT_UPDATE_SPINBTN_TYPE,

    /** @description 禁止输入事件 */
    EVENT_BAN_INPUT_EVENS,
    /** @description 开启输入事件 */
    EVENT_OPEN_INPUT_EVENTS,

    /** @description 奖池锁定框动画事件 */
    EVENT_GOLD_POOL_ANIM,

    /** @description 额外滚动次数 */
    EVENT_ROLL_TIMES,
    EVENT_FREEROLL_TIMES,

    /** @description 轮盘初始化完成 */
    EVENT_ROLL_INITFINISH,

    /** @description 大奖面板播放完成 */
    EVENT_BIGPANEL_FINISH,

    /** @description 模拟下注数据 */
    EVENT_SIMRESULET_DATA,


    EVENT_OPEN_SHOP,

    /** @description 点击解锁收集玩法 */
    EVENT_UNLOCK_SUB,

    /** @description 请求奖池信息修正 */
    EVENT_JACKPOTAMOUNT,

    OPEN_WIN_PANEL,
    /** @description 结算转场 */
    EVENT_SETTLE_ACCOUNTS_CHANGE,

    /** @description 更新大厅余额 */
    EVENT_UPDATAICONS_SUB,

    EVENT_FLYICONS_SUB,
    /** @description 显示隐藏自动下注弹窗 */
    EVENT_SHOW_AUTO_SPIN_DIALOG,
    /** @description 开始特殊逻辑处理 */
    EVENT_SPECIAL_LOGIC,

    EVENT_PAUSE_GAME,

    EVENT_RESUME_GAME,

    EVENT_CONNECT_CLOSE,
    EVENT_CONNECT_OPEN,

    EVENT_SHOPFLYICONS_SUB,


    /** @description 支付成功弹窗 */
    EVENT_SHOP_PAYSUC,

    /** @description 商城在线奖励领取成功 */
    EVENT_SHOPCOLLECT_SUC,

    /**邮件条数 */
    EVENT_EMAILCOUNT_SUB,
}
