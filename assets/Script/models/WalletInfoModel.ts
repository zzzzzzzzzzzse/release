export class WalletInfoModel {
    //用户id
    public m_uid: string;
    //钱包状态:1为正常,2为冻结,3为止付等
    public m_status: number;
    //宝石
    public m_goldCoin: number;
    //游戏币
    public m_gameCoin: bigint = BigInt(0);
    //总的充值金额(含VIP)
    public m_sumRecharge: number;
    //累计细计收益
    public m_sumProfit: number;

    
    //汇率
    public m_forex: number;
    //钱符号
    public m_msymbol: string;
    //钱的code
    public m_nsymbol: string;
}
