import SignItemModel from "./SignItemModel";
/**
 * 签到数据
 */
export default class SignModel {
    /**
     * 签到子节点信息
     */
    public m_signList: Array<SignItemModel>;
    /**
     * 今天是否能签到
     */
    public m_status: number;
    /**
     * 这周连续签到多少
     */
    public m_weekDay: number;
    /**
     * 这个月连续签到多少
     */
    public m_monthDay: number;
    /**
     * 月周期：0的话不显示出来
     */
    public m_monthCycle: number;
    /**
     * 	月周期送的内容文字，没有就不显示(monthCycle:0也不显示)
     */
    public m_monthPlain: string;

    public continuity:any;
 
    /**
     * 可以签到
     */
    public checkSign(): boolean {
       return this.m_status === 1;
    }
 
    /**
     * 获取今天签到信息
     */
    public getTodaySignItem(): SignItemModel {
        if (this.m_signList != null && this.m_signList.length >0 && this.m_signList.length > this.m_weekDay && this.checkSign()) {
            return this.m_signList[this.m_weekDay];
        }
        return null;
    }
}