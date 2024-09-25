import { StoneAgeEventDefine } from "../Const/StoneAgeEventDefine";
import StoneAgeDialogManager from "../Manager/StoneAgeDialogManager";
import StoneAgeLogManager from "../Manager/StoneAgeLogManager";
import StoneAgeSlotEventManager from "../Manager/StoneAgeSlotEventManager";
import StoneAgeTimerManager from "../Manager/StoneAgeTimerManager";
import StoneAgeTipsManager from "../Manager/StoneAgeTipsManager";

export default class StoneAgeAppleSdk {
    private static _instance: StoneAgeAppleSdk = null;
    private token: string = '';
    private nickname: string = '';
    private isRestore: boolean = false;
    private queryWaitConfirmOrdersCallback: Function = null;//查询待确认订单回调

    private constructor() {
        window['appleLoginCallback'] = this.loginCallback.bind(this);
        window['appleNotSupportLogin'] = this.notSupportLogin.bind(this);
        window['appleStartPlay'] = this.startPlay.bind(this);
        window['appleBuyItemsSuccess'] = this.buyItemsSuccess.bind(this);
        window['appleBuyItemsFailed'] = this.buyItemsFailed.bind(this);
    }

    /**
     * 获取单例
     */
    public static get instance(): StoneAgeAppleSdk {
        if (!this._instance) {
            this._instance = new StoneAgeAppleSdk();
        }
        return this._instance;
    }

    /**
     * apple登录
     */
    public login(): void {
        if (!CC_JSB) {
            return;
        }
        const reflection = jsb.reflection as any;
        if (cc.sys.os == 'iOS') {
            reflection.callStaticMethod('AppleSdk', 'login');
        }
    }

    /**
     * Apple支付
     */
    public buyItems(itemId: string): void {
        if (!CC_JSB) {
            return;
        }
        jsb.reflection.callStaticMethod('AppleSdk', 'buyItems:', itemId);
    }

    /**
     * 获取登录token
     */
    public getToken(): string {
        return this.token;
    }

    /**
     * 获取昵称
     */
    public getNickname(): string {
        return this.nickname;
    }

    /**
     * 恢复购买
     */
    public restore(callback: Function): void {
        this.isRestore = true;
        this.queryWaitConfirmOrdersCallback = callback;
        const reflection = jsb.reflection as any;
        reflection.callStaticMethod('AppleSdk', 'restore');
        StoneAgeTimerManager.instance.setTimeOut(() => {
            this.isRestore && this.queryWaitConfirmOrdersCallback([]);
            this.isRestore = false;
        }, 5);
    }

    /**
     * 设备不支持apple登录
     */
    private notSupportLogin(): void {
        StoneAgeDialogManager.instance.openCommonDialog('cant_bind_apple');
    }

    /**
     * apple登录返回
     */
    private loginCallback(resultStr: string): void {
        const list = resultStr.split(";");
        const code = +list[0];
        const token = list[1];
        const nickname = list[2] || '';
        if (code != 0) {
            StoneAgeTipsManager.instance.showTips('tips_bind_fail');
            return;
        }
        this.token = token;
        this.nickname = nickname;
        StoneAgeSlotEventManager.instance.emit(StoneAgeEventDefine.APPLE_LOGIN_SUCCESS);
    }

    /**
     * 调起支付
     */
    private startPlay(): void {

    }

    /**
     * apple支付成功
     */
    private buyItemsSuccess(resultStr: string): void {
        const list = resultStr.split(";");
        const payId = list[0];
        const receipt = list[1];
        const data = {};
        data['receipt'] = receipt;
        data['payId'] = payId;
        StoneAgeLogManager.instance.log(payId + '购买成功');
        if (this.isRestore) {
            this.isRestore = false;
            this.queryWaitConfirmOrdersCallback && this.queryWaitConfirmOrdersCallback([data]);
            return;
        }
        StoneAgeSlotEventManager.instance.emit(StoneAgeEventDefine.SHOP_BUY_ITEMS_SUCCESS, data);
    }

    /**
     * apple支付失败
     */
    private buyItemsFailed(resultStr: string): void {
        const list = resultStr.split(";");
        const payId = list[0];
        StoneAgeSlotEventManager.instance.emit(StoneAgeEventDefine.SHOP_BUY_ITEMS_FAILED, { payId: payId });
    }

}
