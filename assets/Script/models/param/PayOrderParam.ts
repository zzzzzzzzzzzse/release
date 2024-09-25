/**
 * 用户充值/开通会员等支付业务下单接参数
 */
 export class PayOrderParam {
    /**
     * 订单模式
     */
    orderType: number;
    /**
     * 订单 recharge=充值/vip=会员/monthcard=道具
     */
    dataType: string;
    /**
     * 商品的SKU ID
     */
    skuId: number;
 
    money: number;
 
    /**
     * 支付网关类型
     */
    payModel: number;
}