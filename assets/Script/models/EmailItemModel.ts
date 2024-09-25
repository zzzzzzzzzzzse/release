import { SignInAtts } from "./SignItemModel";

/**
 * 邮件数据
 */
 export default class EmailItemModel {
    /**
     * 邮件ID
     */
     public id: bigint;
     /**
      * 品牌硬编码
      */
     public brandType: number;
     /**
      * 邮件类型
      */
     public msgType: number;
     /**
      * 奖励礼包ID
      */
     public rewardPacketId: number;
     /**
      * 邮件领取时长(s)
      */
     public rewardTime: number;
     /**
      * 	状态:0为无效,1有效,2过期
     */
     public status: number;
 
     /**
      * 	邮件激活时间
     */
      public activityAt: number;
 
     /**
      * 	邮件过期时间(过期无效,0为无限期)
     */
     public expireAt: number;
 
     /**
      * 	邮件图标地址
     */
      public icoUrl: string;
 
     /**
      * 	系统标题
     */
     public sysTitle: string;
 
     /**
      * 	视频的URL
      */
      public videoUrl: string;
 
      /**
      * 	图片地址列表
      */
       public mediaUrls:any;
 
     /**
      * 	打开内部标识
      */
      public openTag: string;
 
      /**
      * 	打开外部浏览器
      */
       public openLink: string;

       /**
     * 奖励内容
     */
      public attsList: SignInAtts[];
}
 