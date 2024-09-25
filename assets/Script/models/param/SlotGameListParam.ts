/**
 * Slot游戏列表请求参数
 */
 export class SlotGameListParam {
    /**
     * 模式(all:全部模式,id:id模式,page:分页模式)
     */
    public m_mode: string;
    /**
     * 游戏id “1,2,3,4”
     */
    public m_ids: string;
    /**
     * 偏移量索引
     */
    public m_offset: number;
    /**
     * 下拉时给第一条记录的id &上拉时给最后一条记录的id
     */
    public m_dateId: number;
 
    /**
     * 设置全部模式
     */
    public setAllMode() {
        this.m_mode = "all";
    }
 
    /**
     * 设置id模式
     */
    public setIdMode() {
        this.m_mode = "id";
    }
 
    /**
     * 设置分页模式
     */
    public setPageModel() {
        this.m_mode = "page";
    }
}