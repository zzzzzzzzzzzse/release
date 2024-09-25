
import { StoneAgeEventDefine } from "../Const/StoneAgeEventDefine";
import StoneAgeLogManager from "../Manager/StoneAgeLogManager";
import StoneAgeSlotEventManager from "../Manager/StoneAgeSlotEventManager";
import StoneAgeTipsManager from "../Manager/StoneAgeTipsManager";

export default class StoneAgeGoogleSdk {
    private static _instance: StoneAgeGoogleSdk = null;
    private token: string = '';
    private queryWaitConfirmOrdersCallback: Function = null;//查询待确认订单回调

    private constructor() {
        window['googleLoginCallback'] = this.loginCallback.bind(this);
        window['googleConnectFinished'] = this.connectFinished.bind(this);
        window['googleBuyItemsSuccess'] = this.buyItemsSuccess.bind(this);
        window['googleBuyItemsFailed'] = this.buyItemsFailed.bind(this);
        window['googleQueryWaitConfirmOrderListCallback'] = this.queryWaitConfirmOrderListCallback.bind(this);
    }

    public initSdk(): void {
        if (!CC_JSB) {
            return;
        }
        jsb.reflection.callStaticMethod('org/cocos2dx/javascript/GoogleSdk', 'initSdk', '()V');
    }

    /**
     * 获取单例
     */
    public static get instance(): StoneAgeGoogleSdk {
        if (!this._instance) {
            this._instance = new StoneAgeGoogleSdk();
        }
        return this._instance;
    }

    /**
     * google登录
     */
    public login(): void {
        if (!CC_JSB) {
            return;
        }
        if (cc.sys.os == 'Android') {
            jsb.reflection.callStaticMethod('org/cocos2dx/javascript/GoogleSdk', 'login', '()V');
        }
    }

    /**
     * google支付
     */
    public buyItems(itemId: string): void {
        if (!CC_JSB) {
            return;
        }
        jsb.reflection.callStaticMethod('org/cocos2dx/javascript/GoogleSdk', 'buyItems', '(Ljava/lang/String;)V', itemId);
    }

    /**
     * 获取登录token
     */
    public getToken(): string {
        return this.token;
    }

    /**
     * google登录返回
     */
    private loginCallback(json: any): void {
        let data = JSON.parse(json);
        if (data.code != 0) {
            StoneAgeTipsManager.instance.showTips('tips_bind_fail');
            return;
        }
        this.token = data.idToken;
        StoneAgeSlotEventManager.instance.emit(StoneAgeEventDefine.GOOLE_LOGIN_SUCCESS);
    }

    /**
     * google建立连接完成
     */
    private connectFinished(resultStr: string): void {
        const data = JSON.parse(resultStr);
        StoneAgeSlotEventManager.instance.emit(StoneAgeEventDefine.PLAY_CONNECT_FAILED, data);
    }

    /**
     * google支付成功
     */
    private buyItemsSuccess(resultStr: string): void {
        const data = JSON.parse(resultStr);
        StoneAgeSlotEventManager.instance.emit(StoneAgeEventDefine.SHOP_BUY_ITEMS_SUCCESS, data);
    }

    /**
     * google支付失败
     */
    private buyItemsFailed(payId: string): void {
        StoneAgeSlotEventManager.instance.emit(StoneAgeEventDefine.SHOP_BUY_ITEMS_FAILED, { payId: payId });
    }

    /**
     * 查询待确认的订单
     */
    public queryWaitConfirmOrderList(callback: Function = null): void {
        if (!CC_JSB) {
            return;
        }
        this.queryWaitConfirmOrdersCallback = callback;
        jsb.reflection.callStaticMethod('org/cocos2dx/javascript/GoogleSdk', 'queryPurchases', '()V');
    }

    /**
     * 查询待确认订单列表返回
     */
    private queryWaitConfirmOrderListCallback(resultStr: string): void {
        const data = JSON.parse(resultStr);
        StoneAgeLogManager.instance.log('queryWaitConfirmOrderListCallback:', data);
        const waitConfirmOrderList = data.waitConfirmOrderList;
        this.queryWaitConfirmOrdersCallback && this.queryWaitConfirmOrdersCallback(waitConfirmOrderList);
    }
}
