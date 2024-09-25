/**
 * 商品item
 */
export default class ShopGoodsModel {
  /**
   * 商品id
   */
  public m_id: number;
  /**
   * 商品标题
   */
  public m_title: string;
  /**
   * 原价
   */
  public m_money: number;
  /**
   * 销售价格
   */
  public m_salesMoney: number;
  /**
   * 汇率
   */
  public m_forex: number;
   /**
    * 钱的符号
    */
  public m_msymbol: string;
   /**
    * 前的汇率标记
    */
  public m_nsymbol: string;
  /**
   * 商城对应的playstore/appstore商品id
   */
  public m_appStorePid: string;
  /**
   * 客户端对应标签（用于显示图片）
   */
  public m_clientTag: string;
  /**
   * 商品内容列表
   */
  public m_attsList: GoodsAtts[];

  /**
   * 是否是vip类型
   */
  public getVipType() {
    if (this.m_attsList && this.m_attsList.length > 0) {
      return this.m_attsList[0].m_vipGrade;
    }
    return 0;
  }
}
 
export interface GoodsAtts {
    /**
     * 属性类型
     */
    m_attType: number;
    /**
     * VIP等级
     */
    m_vipGrade: number;
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
 
/**
 * 支付类型
 */
 export enum DataTypeEnum {
  /**
   * 充值
   */
  DataType_Recharge = "recharge",
  /**
   * 充值钻石
   */
  DataType_GoldCoin = "goldcoin",
  /**
   * 道具
   */
  DataType_Monthcard = "monthcard",
   /**
    * vip
    */
  DataType_VIP = "vip"
}