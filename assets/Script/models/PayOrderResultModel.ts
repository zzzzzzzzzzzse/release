/**
 * 用户充值/开通会员等支付业务下单返因的结果
 */
 export class PayOrderResultModel {
    /**
     * 产品id
     */
    skuid: string;
    /**
     * 订单ID
     */
    orderSn: string;
    /**
     * 支付网关类型
     */
    payModel: string;
    /**
     * 支付签名
     */
    sign: string;
    /**
     * 微信支付的partnerid
     */
    partnerid: string;
    /**
     * 微信支付的prepayid
     */
    prepayid: string;
    /**
     * 第三方支付的时间
     */
    timestamp: string;
    /**
     * 第三方支付的随机数
     */
    noncestr: string;
    /**
     * 谷歌支付订单
     */
    appStorePid: string;
 
}
