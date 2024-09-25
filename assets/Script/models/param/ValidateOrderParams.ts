/**
 * 消单参数
 */
 export default class ValidateOrderParams {
    /**
     * 订单ID
     */
    public m_key: string;
    /**
     * 支付方式
     */
    public m_payGateway: string;
    /**
     * 第三方返回的token
     */
    public m_receipt: string;
    /**
     * 苹果/GOOGLE支付时的transaction_id
     */
    public m_transSign: string;
    /**
     * 苹果/GOOGLE支付时的支付时间
     */
    public m_transAt: string;
}