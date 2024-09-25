import { Constants } from "../../Constants";
import AppPlatformConfig from "../../configs/AppPlatformConfig";
import { NativeEvent } from "../../configs/ConstDefine";
import { EventMgr } from "../../framework/mgr/EventManager";
import { EventBus } from "../EventBus";
import { BaseBridge } from "./BaseBridge";


let _eventBus: EventBus = null;

// export interface ITransaction{
//     key:string,
//     payGateway:string,

// }

window["iosLoginCallback"] = (method: string, oaType: string, udid: string, token: string, fullName: string, email: string, code: string) => {
    let jsonObject = {
        method: method,
        oaType: oaType,
        udid: udid,
        token: token,
        fullName: fullName,
        email: email,
        code: code
    }
    console.log("ios huidiao chenggong", JSON.stringify(jsonObject));
    EventMgr.dispatch(NativeEvent.EVENT_IOS_LOGIN, JSON.stringify(jsonObject));
}

window["iosBindCallback"] = (method: string, oaType: string, udid: string, token: string, fullName: string, email: string, code: string) => {
    let jsonObject = {
        method: method,
        oaType: oaType,
        udid: udid,
        token: token,
        fullName: fullName,
        email: email,
        code: code
    }
    console.log("ios huidiao chenggong2", JSON.stringify(jsonObject));
    EventMgr.dispatch(NativeEvent.EVENT_IOS_BIND, JSON.stringify(jsonObject));
}

window["iosTransactionCallback"] = (receipt: string, transSign: string, transAt: string) => {
    let jsonObject = {
        key: Constants.getInstance()._serverOrderID,
        payGateway: 1,
        receipt: receipt,
        transSign: transSign,
        transAt: transAt
    }
    console.log("ios huidiao chenggong", JSON.stringify(jsonObject));
    EventMgr.dispatch(NativeEvent.EVENT_IOS_TRANSACTION, JSON.stringify(jsonObject));
}


window["iosIsLHP"] = (str: string) => {
    if (str == "Yes") {
        Constants.getInstance()._isLHP = true;
    } else {
        Constants.getInstance()._isLHP = false;
    }
    console.log("shoudao  liuhaiping huidiao", str);
}
window["iosTransactionFaildCallback"] = (code: string) => {

    EventMgr.dispatch(NativeEvent.EVENT_IOS_TRANSACTIONFAILD, code);
}


/**
 * 与原生桥接
 */
export default class NativeBridge extends BaseBridge {
    public constructor(eventBus: EventBus) {
        super();
        _eventBus = eventBus;
        this.init();
    }

    public get version() {
        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
            return "1.0.0";
        } else if (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS) {
            return this._version;
        } else {
            return "1.0.0";
        }
    }

    public init() {
        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
            this._version = jsb.reflection.callStaticMethod(this.javascriptDirUrl + this.baseBridge,
                "getNativeVersion", "(Ljava/lang/String;)Ljava/lang/String;", this.hall_version);
        } else if (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS) {
            this._version = jsb.reflection.callStaticMethod(this.cocosNative, "getNativeVersion:", "getNativeVersion");
        }
    }

    protected onJavaCallback(name: string, ...args: any[]) {
        _eventBus.post(name, args);
    }


    /**
     * 退出app
     */
    public ExitApp() {
        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(this.javascriptDirUrl + this.baseBridge,
                "exitApplication", "()V");
        } else if (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS) {
            cc.game.end();
            //TODO
        }
    }

    /**
     * 获取用户渠道号
     */
    public getPackageChannel() {
        let packageChannel = null;
        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
            packageChannel = jsb.reflection.callStaticMethod(this.javascriptDirUrl + this.baseBridge,
                "getPackageChannel", "()Ljava/lang/String;");
            if (packageChannel === undefined) packageChannel = jsb.reflection.callStaticMethod(this.javascriptDirUrl + this.baseBridge,
                "getUserChannel", "()Ljava/lang/String;");
        } else if (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS) {
            //TODO
        }
        return packageChannel;
    }

    /**
     * 设置屏幕旋转方向
     * @param orientation 0=保持当前 1=横屏 2=竖屏
     */
    public setOrientation(orientation: number) {
        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(this.javascriptDirUrl + this.baseBridge,
                "setOrientation", "(I)V", orientation);
        } else if (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS) {
            //TODO
            jsb.reflection.callStaticMethod(this.cocosNative, "setOrientation:", orientation.toString());
        }
        if (CC_JSB) {
            let event: any = new cc.Event.EventCustom('resize', true);
            window.dispatchEvent(event);
        }
    }

    /**
     *  @description 创建苹果登陆ui按钮
     */
    public setupUI() {
        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod(this.cocosNative, "setupUI:", "setupUI");
        }
    }

    /**
     * 获取客户端UDID
     */
    public getPhoneUdid(): string {
        let phoneUDID = null;
        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
            phoneUDID = jsb.reflection.callStaticMethod(this.javascriptDirUrl + this.baseBridge,
                "getPhoneUdid", "()Ljava/lang/String;");
            return phoneUDID;
        } else if (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS) {
            phoneUDID = jsb.reflection.callStaticMethod("CocosNative", "getDeviceID:", "ios get udid");
            return phoneUDID;
        }
        return "";
    }

    /**
     * 获取客户端IDFA
     */
    public getPhoneIdfa(): string {
        let phoneIDFA = null;
        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
            phoneIDFA = jsb.reflection.callStaticMethod(this.javascriptDirUrl + this.baseBridge,
                "getPhoneIdfa", "()Ljava/lang/String;");
            return phoneIDFA;
        } else if (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS) {
            // phoneIDFA = jsb.reflection.callStaticMethod(this.cocosNative,"getNativeIDFA:","ios get idfa");
            console.log("idfa", phoneIDFA);
            return phoneIDFA;
        }
        return "";
    }

    /**
     * 获取客户端UA参数
     */
    public getUserAgent(): string {
        let userAgent = null;
        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
            userAgent = jsb.reflection.callStaticMethod(this.javascriptDirUrl + this.baseBridge,
                "getUserAgent", "()Ljava/lang/String;");
            console.log('getUserAgent android', userAgent);
            return userAgent;
        } else if (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS) {
            //TODO
            userAgent = jsb.reflection.callStaticMethod(this.cocosNative, "getUserAgent:", "get UserAgent");
            console.log("uuua", userAgent);
            return userAgent;
        } else {
            if (cc.sys.isBrowser) {
                return "Mozilla/5.0 (Android; OS/10; B/" + AppPlatformConfig.PlatformConfigID_kaifa + "; V/1.0.0/1.0.0; C/100.0; 10/zh-cn; BD HTC Desire S)";
            }
        }
        return "";
    }

    /**
     * 获取客户端屏分辨像素宽w*像素高h
     */
    public getScreenSizeOfDevice(): string {
        let userAgent = null;
        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
            userAgent = jsb.reflection.callStaticMethod(this.javascriptDirUrl + this.baseBridge,
                "getScreenSizeOfDevice", "()Ljava/lang/String;");
            return userAgent;
        } else if (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS) {
            userAgent = jsb.reflection.callStaticMethod(this.cocosNative, "getScreenSizeOfDevice:", "ios getScreenSizeOfDevice");
        } else {
            if (AppPlatformConfig.ISDEBUG) {
                return "100*100";
            }
        }
        return "";
    }

    /**
     * 初始化客服系统
     */
    public initFreshchat(id: string, key: string) {
        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(this.javascriptDirUrl + this.baseBridge,
                "initFreshchat", "(Ljava/lang/String;Ljava/lang/String;)V", id, key);
        } else if (Constants.getInstance().NATIVE_IOS) {
            jsb.reflection.callStaticMethod(this.freshchatBridge, "initFreshchat:key:", id, key);
        }
    }
    /**
     * 初始化客服信息
     */
    public initFreshchatUser() {
        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(this.javascriptDirUrl + this.baseBridge,
                "initFreshchatUser", "(Ljava/lang/String;)V", Constants.getInstance().m_LoginUserSession.m_uid);
        } else if (Constants.getInstance().NATIVE_IOS) {
            jsb.reflection.callStaticMethod(this.freshchatBridge, "initFreshchatUser:", Constants.getInstance().m_LoginUserSession.m_uid);
        }
    }
    /**
     * 打开客服
     */
    public showConversations() {
        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(this.javascriptDirUrl + this.baseBridge,
                "showConversations", "()V");
        } else if (Constants.getInstance().NATIVE_IOS) {
            jsb.reflection.callStaticMethod(this.freshchatBridge, "showConversations:", "");
        }
    }

    /**
     * 初始化 tenjin
     */
    public initTenjin(key: string) {
        // if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
        //     jsb.reflection.callStaticMethod(this.javascriptDirUrl + this.baseBridge,
        //         "initTenjin", "(Ljava/lang/String;)V", key);
        // }
    }

    //------------------------------------- facebook SDK ----------------------------------

    /**
     * 初始化facebook
     */
    public initFacebook(key: string) {
        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(this.javascriptDirUrl + this.facebookBridge,
                "initFacebook", "(Ljava/lang/String;)V", key);
        }
    }

    /**
     * facebook登录
     */
    public faceBookBind() {
        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(this.javascriptDirUrl + this.facebookBridge,
                "facebookLogin", "()V");
        }
    }

    public facebookLogin() {
        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(this.javascriptDirUrl + this.facebookBridge,
                "facebookLoginCocos", "()V");
        }
    }

    //------------------------------------- google SDK ----------------------------------

    /**
     * google绑定
     */
    public googleBind() {
        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(this.javascriptDirUrl + this.googleBridge,
                "googleBind", "()V");
        }
    }

    /**
     * google登录
     */
    public googleLogin() {
        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(this.javascriptDirUrl + this.googleBridge,
                "googleLogin", "()V");
        }
    }

    /**
     * 开始gp支付
     * @param uid 
     * @param appStorePid 
     * @param orderSn 
     */
    public startGPPay(uid: string, appStorePid: string, orderSn: string) {
        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(this.javascriptDirUrl + this.googleBridge,
                "startGPPay", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", uid, appStorePid, orderSn);
        }
    }

    /**
     * 订单上传服务器
     * @param key 
     * @param orderId 
     * @param payGateway 
     * @param token 
     * @param time 
     */
    protected GPPayUpdateServer(key: string, orderId: string, payGateway: string, token: string, time: string) {
        _eventBus.post("app_update_server", key, orderId, payGateway, token, time);
    }

    /**
     * 搜索订单上传服务器
     * @param serverid 
     * @param gpId 
     * @param payGateway 
     * @param token 
     * @param time 
     */
    protected GPPayQueryOrdUpdateServer(serverid: string, gpId: string, payGateway: string, token: string, time: string) {
        _eventBus.post("app_query_ord", serverid, gpId, payGateway, token, time);
    }

    /*
     * 搜索订单
     */
    public queryOrdGPPay(uid: string) {
        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(this.javascriptDirUrl + this.baseBridge,
                "queryOrdGPPay", "(Ljava/lang/String;)V", uid);
        }
    }

    /**
     * 更新订单状态
     */
    public upDateRechargeStatus(rechargeId: string, status: number) {
        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(this.javascriptDirUrl + this.baseBridge,
                "upDateRechargeStatus", "(Ljava/lang/String;I)V", rechargeId, status);
        }
    }

    /**
     * 更新订单日志
     */
    public updateGPPayLog(rechargeId: string) {
        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(this.javascriptDirUrl + this.baseBridge,
                "updateGPPayLog", "(Ljava/lang/String;)V", rechargeId);
        }
    }
    //------------------------------------- IOS SDK ----------------------------------

    /**
     * ios登陆
     */
    public iosLogin() {
        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod(this.cocosNative, "appleLogin:", "appleLogin");
        }
    }
    /**
     * ios绑定
     */
    public iosBind() {
        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod(this.cocosNative, "appleBind:", "appleBind");
        }
    }

    /**
     *  开始ios支付
     * @param uid 
     * @param appStorePid 
     * @param orderSn 
     */
    public startIOSPay(uid: string, appStorePid: string, orderSn: string) {
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
            Constants.getInstance()._serverOrderID = orderSn;
            console.log(appStorePid, orderSn);
            jsb.reflection.callStaticMethod(this.cocosNative, "storePay:", appStorePid);
        }
    }
}
