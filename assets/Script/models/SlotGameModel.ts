/**
 * slot游戏
 */
 export class SlotGameModel {
    /**
     * 游戏ID
     */
    public m_id: number;
    /**
     * 游戏分组ID
     */
    public m_gameGid: number;
    /**
     * 特殊的SLOT概率
     */
    public m_specialType: number;
    /**
     * 是否允许空缺的SLOT
     */
    public m_isBlankLines: number;
    /**
     * 是否推荐
     */
     public m_isComm: number;
     /**
     * 是否流行
     */
    public m_isHot: number;
    /**
     * 是否是新的游戏
     */
     public m_isNew: number;
    /**
     * 用户等级与BET值计算系数B0
     */
    public betUserLevelB0: number;
    /**
     * 连线类型0：普通，1全种
     */
    public m_lineType: number;
    /**
     * 列行
     */
    public m_row: number;
    /**
     * 列
     */
    public m_column: number;
    /**
     * 用户所需等级
     */
    public m_openLevel: number;
    /**
     * 当前最新的游戏版本
     */
    public m_version: number;
    /**
     * 游戏标题
     */
    public m_title: string;
    /**
     * 游戏图标
     */
    public m_icoUrl: string;
    /**
     * 角标
     */
    public m_mark: string;
    /**
     * 描述
     */
    public m_remark: string;
    /**
     * 特殊场景图
     */
    public m_superIcoUrl: string;
 
    public m_rooms: SlotGameRoomModel[] = [];
 
    /**
     * 收集玩法ID（1.点数；2.地图；3.商店消费）
     */
    public m_collectConfigId: number;
    /**
     * 收集玩法解锁
     */
    public m_collectRomLevel: number;

    public gameBundle: string;
}
 
export interface SlotGameRoomModel {
    /** 等级 */
    level: number;
    /**
     * 最小交易
     */
    tradeMin: number;
    /**
     * 最大交易
     */
    tradeMax: number;
    /**
     * 房间角标类型:0无角标,1类型,2类型,3XX
     */
    markTag: number;
    /**
     * 连线类型
     */
    unlockUserLevel: number;
    /**
     * 投资列表
     */
    betList: number[]
}
 
export interface SlotGameJoinMode {
    /** 玩家id */
    uid: number;
 
    /** 玩家token */
    token: string;
 
    /** 游戏id */
    gameId: number;
 
    /** 房间类型 */
    roomType: number;
 
    /** 版本号 */
    version: string;
 
    /** 掩码*/
    maskingKey: number;
}