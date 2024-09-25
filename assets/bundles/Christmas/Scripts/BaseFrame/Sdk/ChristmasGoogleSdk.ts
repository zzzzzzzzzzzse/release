
import { ChristmasEventDefine } from "../Const/ChristmasEventDefine";
import ChristmasLogManager from "../Manager/ChristmasLogManager";
import ChristmasSlotEventManager from "../Manager/ChristmasSlotEventManager";
import ChristmasTipsManager from "../Manager/ChristmasTipsManager";

export default class ChristmasGoogleSdk {
    private static _instance: ChristmasGoogleSdk = null;
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
    public static get instance(): ChristmasGoogleSdk {
        if (!this._instance) {
            this._instance = new ChristmasGoogleSdk();
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
            ChristmasTipsManager.instance.showTips('tips_bind_fail');
            return;
        }
        this.token = data.idToken;
        ChristmasSlotEventManager.instance.emit(ChristmasEventDefine.GOOLE_LOGIN_SUCCESS);
    }

    /**
     * google建立连接完成
     */
    private connectFinished(resultStr: string): void {
        const data = JSON.parse(resultStr);
        ChristmasSlotEventManager.instance.emit(ChristmasEventDefine.PLAY_CONNECT_FAILED, data);
    }

    /**
     * google支付成功
     */
    private buyItemsSuccess(resultStr: string): void {
        const data = JSON.parse(resultStr);
        ChristmasSlotEventManager.instance.emit(ChristmasEventDefine.SHOP_BUY_ITEMS_SUCCESS, data);
    }

    /**
     * google支付失败
     */
    private buyItemsFailed(payId: string): void {
        ChristmasSlotEventManager.instance.emit(ChristmasEventDefine.SHOP_BUY_ITEMS_FAILED, { payId: payId });
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
        ChristmasLogManager.instance.log('queryWaitConfirmOrderListCallback:', data);
        const waitConfirmOrderList = data.waitConfirmOrderList;
        this.queryWaitConfirmOrdersCallback && this.queryWaitConfirmOrdersCallback(waitConfirmOrderList);
    }
}
