/**
 * 签到item信息
 */
 export default class SignItemModel {
    /**
     * ID 备用
     */
    public m_id: number;
    /**
     * 第几天(1-7)
     */
    public m_dayIndex: number;
    /**
     * 	宝箱类型0/1/2/3/4:
        0正常模式
        1:宝箱类型1
        2:宝箱类型2
        3:礼包1
        4礼包2
     */
    public m_luckDraw: number;
    /**
     * 提交签到要用
     */
    public m_tranSign: string;
    /**
     * 图标URL
     */
    public m_icoUrl: string;
    /**
     * 奖励内容
     */
    public attsList: SignInAtts[];

    public continuity;
}
 
export interface SignInAtts {
    /**
     * 属性类型
     */
    m_attType: number;
    /**
     * 属性值A
     */
 
    m_valueA: string;
    /**
     * 属性值B
     */
    m_valueB: string;
    /**
     * 属性值C
     */
    m_valueC: string;
}