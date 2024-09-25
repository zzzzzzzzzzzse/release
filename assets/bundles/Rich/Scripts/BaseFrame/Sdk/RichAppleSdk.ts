import { RichEventDefine } from "../Const/RichEventDefine";
import RichDialogManager from "../Manager/RichDialogManager";
import RichLogManager from "../Manager/RichLogManager";
import RichSlotEventManager from "../Manager/RichSlotEventManager";
import RichTimerManager from "../Manager/RichTimerManager";
import RichTipsManager from "../Manager/RichTipsManager";

export default class RichAppleSdk {
    private static _instance: RichAppleSdk = null;
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
    public static get instance(): RichAppleSdk {
        if (!this._instance) {
            this._instance = new RichAppleSdk();
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
        RichTimerManager.instance.setTimeOut(() => {
            this.isRestore && this.queryWaitConfirmOrdersCallback([]);
            this.isRestore = false;
        }, 5);
    }

    /**
     * 设备不支持apple登录
     */
    private notSupportLogin(): void {
        RichDialogManager.instance.openCommonDialog('cant_bind_apple');
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
            RichTipsManager.instance.showTips('tips_bind_fail');
            return;
        }
        this.token = token;
        this.nickname = nickname;
        RichSlotEventManager.instance.emit(RichEventDefine.APPLE_LOGIN_SUCCESS);
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
        RichLogManager.instance.log(payId + '购买成功');
        if (this.isRestore) {
            this.isRestore = false;
            this.queryWaitConfirmOrdersCallback && this.queryWaitConfirmOrdersCallback([data]);
            return;
        }
        RichSlotEventManager.instance.emit(RichEventDefine.SHOP_BUY_ITEMS_SUCCESS, data);
    }

    /**
     * apple支付失败
     */
    private buyItemsFailed(resultStr: string): void {
        const list = resultStr.split(";");
        const payId = list[0];
        RichSlotEventManager.instance.emit(RichEventDefine.SHOP_BUY_ITEMS_FAILED, { payId: payId });
    }

}
