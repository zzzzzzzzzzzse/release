/**
 * 下注回调参数
 */
 export class BetResultModel {
    //下注金额
    public m_betAmount: number;
    //普通中奖金额
    public m_winAmount: number;
    //额外中奖金额
    public m_extraReardAmount: number
    //当前奖金池
    public m_currGoldPoolPoint: number;
    //剩余免费次数
    public m_freeTimes: number;
    //物品的总数
    public m_slotSubjectsArr: any;
    //连线结果
    public m_lineIdsArr: any;
    //滚动的列
    public m_rollColsArr: any;
 
    /**
     * 是否中奖
     */
    public isContinuous(): boolean {
        if (this.m_slotSubjectsArr && this.m_slotSubjectsArr.length > 0) {
            for (let i = 0; i < this.m_slotSubjectsArr.length; i++) {
                if (this.m_slotSubjectsArr[i].continuous) {
                    return true;
                }
            }
        }
        return false;
    }
}