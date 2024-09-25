import { BaseBridge } from "./BaseBridge";

/**
 * 统计桥接
 */
export default class AnalyticsBridge extends BaseBridge {

    /**
     * 设置用户信息
     * @param uid 用户id
     */
    // public setUserInfo(uid: string) {
    //     if(cc.sys.isNative) {
    //         if (cc.sys.os === cc.sys.OS_ANDROID) {
    //             jsb.reflection.callStaticMethod(this.javascriptDirUrl + this.analyticsBridge, "setUserInfo", "(Ljava/lang/String;)V", uid);
    //         }else if(cc.sys.os === cc.sys.OS_IOS){
    //             jsb.reflection.callStaticMethod(this.analyticsBridge,"setUserInfo:",uid);
    //         }
    //     }
    // }

    /**
     * 统计视图位置
     * @param viewName 视图名
     * @param param 参数
     */
    public logView(viewName: string, param: string) {
        console.log('logView');

        // if(cc.sys.isNative) {
        //     if (cc.sys.os === cc.sys.OS_ANDROID) {
        //         jsb.reflection.callStaticMethod(this.javascriptDirUrl + this.analyticsBridge, "logView", "(Ljava/lang/String;Ljava/lang/String;)V", viewName, param);
        //     }else if(cc.sys.os === cc.sys.OS_IOS){
        //         jsb.reflection.callStaticMethod(this.analyticsBridge,"logView:andParam:",viewName,param);
        //     }
        // }
    }

    /**
     * 统计事件
     * @param eventName 事件名 
     * @param param 参数 
     */
    public logEvent(eventName: string, param: string) {
        console.log('logEvent', eventName);
        // if(cc.sys.isNative) {
        //     if (cc.sys.os === cc.sys.OS_ANDROID) {
        //         jsb.reflection.callStaticMethod(this.javascriptDirUrl + this.analyticsBridge, "logEvent", "(Ljava/lang/String;Ljava/lang/String;)V", eventName, param);
        //     }else if(cc.sys.os === cc.sys.OS_IOS){
        //         jsb.reflection.callStaticMethod(this.analyticsBridge,"logEvent:param:",eventName,param);
        //     }
        // }
    }

    /**
     * 登录统计
     */
    public clickLogin() {
        console.log('clickLogin');
        // if(cc.sys.isNative) {
        //     if (cc.sys.os === cc.sys.OS_ANDROID) {
        //         jsb.reflection.callStaticMethod(this.javascriptDirUrl + this.facebookBridge, "logCompletedRegistrationEvent", "(Ljava/lang/String;)V", "Facebook");
        //     }else if(cc.sys.os === cc.sys.OS_IOS){
        //         jsb.reflection.callStaticMethod(this.facebookBridge,"logCompletedRegistrationEvent:","facebook");
        //     }
        // }       
    }

    /**
     * 等级达成
     */
    public levelAcheived() {
        console.log('levelAcheived');

        // if(cc.sys.isNative) {
        //     if (cc.sys.os === cc.sys.OS_ANDROID) {
        //         jsb.reflection.callStaticMethod(this.javascriptDirUrl + this.facebookBridge, "logAchievedLevelEvent", "(Ljava/lang/String;)V", "10");
        //     }else if(cc.sys.os === cc.sys.OS_IOS){
        //         jsb.reflection.callStaticMethod(this.facebookBridge,"logAchievedLevelEvent:","10");
        //     }
        // }       
    }

    /**
     * 应用内购买
     */
    public purchase() {
        console.log('purchase');


        // if(cc.sys.isNative) {
        //     let numItems: number = 0;
        //     let contentType: string = "";
        //     let contentId: string = "";
        //     let currency: string = "";
        //     let price: string = "";
        //     if (cc.sys.os === cc.sys.OS_ANDROID) {
        //         jsb.reflection.callStaticMethod(this.javascriptDirUrl + this.facebookBridge, "logPurchasedEvent", "(ILjava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", numItems, contentType, contentId, currency, price);
        //     }else if(cc.sys.os === cc.sys.OS_IOS){
        //         jsb.reflection.callStaticMethod(this.facebookBridge,"logPurchasedEvent:",numItems.toString(),contentType,contentId,currency,price);
        //     }
        // }       
    }
}
