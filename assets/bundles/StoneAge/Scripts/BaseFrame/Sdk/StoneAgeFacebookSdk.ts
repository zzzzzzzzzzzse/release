import { StoneAgeEventDefine } from "../Const/StoneAgeEventDefine";
import StoneAgeSlotEventManager from "../Manager/StoneAgeSlotEventManager";
import StoneAgeTipsManager from "../Manager/StoneAgeTipsManager";

export default class StoneAgeFacebookSdk {
    private static _instance: StoneAgeFacebookSdk = null;
    private token: string = '';

    private constructor() {
        window['facebookLoginCallback'] = this.loginCallback.bind(this);
    }

    /**
     * 获取单例
     */
    public static get instance(): StoneAgeFacebookSdk {
        if (!this._instance) {
            this._instance = new StoneAgeFacebookSdk();
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
            StoneAgeTipsManager.instance.showTips('tips_bind_fail');
            return;
        }
        this.token = token;
        StoneAgeSlotEventManager.instance.emit(StoneAgeEventDefine.FACEBOOK_LOGIN_SUCCESS);
    }

}
