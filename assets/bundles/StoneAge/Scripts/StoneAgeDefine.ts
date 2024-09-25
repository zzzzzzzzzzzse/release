/**
 * 场景状态
 */
export enum StoneAgeSceneStatus {
    NORMAL = 0,//默认状态
    FREE = 1,//免费转状态
}

export enum StoneAgeSoundsType {
    BGM = 'lv15_bgm',
    FREE_BGM = "lv15_bgm_free",
    BIG_WIN = "lv15_bigwin",
    FREE_PRIZE = "lv15_free",//获得免费转
    FREE_RESULT = "lv15_free_result",
    EVERY_LINE = "lv15_line",
}

/**
 * 大奖类型
 */
export enum StoneAgeWinType {
    NOT_WIN = 0,//没有奖励
    WIN = 1,//有奖励
    BIG_WIN = 2,
    MEGA_WIN = 3,
    SUPER_WIN = 4,
    HUGE_WIN = 5,
}

/**
 * 中奖符号类型
 */
export enum StoneAgeIconType {
    TEN = 151101,
    J = 151102,
    Q = 151103,
    K = 151104,
    A = 151105,
    /**
     * 恐龙
     */
    DINOSAUR = 151106,
    /**
     * 猛犸
     */
    MAMMOTH = 151107,
    /**
     * 原始人
     */
    PRIMITIVE_MAN = 151108,
    WILD = 151201,
    FREE = 151301,

    FREE_TEN = 152101,
    FREE_J = 152102,
    FREE_Q = 152103,
    FREE_K = 152104,
    FREE_A = 152105,
    FREE_DINOSAUR = 152106,
    FREE_MAMMOTH = 152107,
    FREE_PRIMITIVE_MAN = 152108,
    FREE_WILD = 152201,
}


/**
 * action类型
 */
export enum StoneAgeActionType {
    RESULT = 1,
    STOP_ONE = 2,
}

/**
 * 游戏类型
 */
export enum StoneAgeGameType {
    NORMAL = 0,
    FREE = 1,
}






