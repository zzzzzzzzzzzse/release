import { NewBankEventDefine } from "../Const/NewBankEventDefine";
import NewBankSlotEventManager from "../Manager/NewBankSlotEventManager";
import NewBankTipsManager from "../Manager/NewBankTipsManager";

export default class NewBankFacebookSdk {
    private static _instance: NewBankFacebookSdk = null;
    private token: string = '';

    private constructor() {
        window['facebookLoginCallback'] = this.loginCallback.bind(this);
    }

    /**
     * 获取单例
     */
    public static get instance(): NewBankFacebookSdk {
        if (!this._instance) {
            this._instance = new NewBankFacebookSdk();
        }
        return this._instance;
    }

    /**
     * Facebook登录
     */
    public login(): void {
        if (!CC_JSB) {
            return;
        }
        const reflection = jsb.reflection as any;
        if (cc.sys.os == 'Android') {
            reflection.callStaticMethod('org/cocos2dx/javascript/FacebookSdk', 'login', '()V');
        }
        else {
            reflection.callStaticMethod("FacebookSdk", "login");
        }
    }

    /**
     * 获取登录token
     */
    public getToken(): string {
        return this.token;
    }

    /**
     * Facebook登录返回
     */
    private loginCallback(resultStr: any): void {
        let token = '';
        let code = 0;
        if (cc.sys.os == 'iOS') {
            const list = resultStr.split(";");
            code = +list[0];
            token = list[1];
        }
        else if (cc.sys.os == 'Android') {
            const data = JSON.parse(resultStr);
            code = +data.code;
            token = data.token;
        }
        if (code != 0) {
            NewBankTipsManager.instance.showTips('tips_bind_fail');
            return;
        }
        this.token = token;
        NewBankSlotEventManager.instance.emit(NewBankEventDefine.FACEBOOK_LOGIN_SUCCESS);
    }

}
