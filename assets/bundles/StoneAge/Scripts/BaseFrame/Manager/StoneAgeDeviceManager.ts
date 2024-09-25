import { LocalStorageType } from "../Const/StoneAgeCommonDefine";
import { StoneAgeEventDefine } from "../Const/StoneAgeEventDefine";
import { StoneAgeLocalStorageManager } from "./StoneAgeLocalStorageManager";
import StoneAgeLogManager from "./StoneAgeLogManager";
import StoneAgeSlotEventManager from "./StoneAgeSlotEventManager";
import StoneAgeTimerManager from "./StoneAgeTimerManager";

const { ccclass, property } = cc._decorator;
@ccclass
export default class StoneAgeDeviceManager {
    private static _instance: StoneAgeDeviceManager;
    private _model: string = '未知型号';

    public static get instance() {
        if (StoneAgeDeviceManager._instance == null) {
            StoneAgeDeviceManager._instance = new StoneAgeDeviceManager();
        }
        return StoneAgeDeviceManager._instance;
    }

    private constructor() {
        window['getSystemModelCallback'] = this.getSystemModelCallback.bind(this);
    }

    /**
     * 手机震动
     * @param time 秒
     */
    public shake(time: number) {
        let isOpen = StoneAgeLocalStorageManager.instance.getLocalData(LocalStorageType.SWITCH_VIBRATE, "1");
        if ("1" != isOpen) {
            return;
        }
        if (cc.sys.os === cc.sys.OS_IOS) {
            //@ts-ignore
            jsb.reflection.callStaticMethod("Device", "shake");
            StoneAgeTimerManager.instance.setTimeOut(this.stopShake, time);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/Device", "shake", "(I)V", time * 1000);
        }

    }

    /**
     * 停止手机震动
     */
    public stopShake() {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //@ts-ignore
            jsb.reflection.callStaticMethod("Device", "stopShake");
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/Device", "stopShake", "()V");
        }
    }

    /**
     * 跳转网页
     */
    public jumpToUrl(url: string): void {
        if (!url) {
            return;
        }
        const reflection = jsb.reflection as any;
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            reflection.callStaticMethod('org/cocos2dx/javascript/Device', 'jumpToUrl', '(Ljava/lang/String;)V', url);
        }
        else if (cc.sys.os === cc.sys.OS_IOS) {
            reflection.callStaticMethod('Device', 'jumpToUrl:', url);
        }
    }

    /**
     * 开始获取手机型号
     */
    public getSystemModel(): void {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //@ts-ignore
            jsb.reflection.callStaticMethod("Device", "getSystemModel");
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/Device", "getSystemModel", "()V");
        }
    }

    /**
     * 获取手机型号信息回调
     */
    public getSystemModelCallback(model: string): void {
        StoneAgeLogManager.instance.log('获取手机型号为：', model);
        this._model = model;
        StoneAgeSlotEventManager.instance.emit(StoneAgeEventDefine.GET_SYSTEM_MODEL_SUCCESS);
    }

    /**
     * 退出应用程序
     */
    public exit(): void {
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/Device", "exit", "()V");
        }
    }

    /**
     * 当前手机型号
     */
    public get model(): string {
        return this._model;
    }

    /**
     * 复制内容到剪切板
     */
    public copyContent(str: string): void {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //@ts-ignore
            jsb.reflection.callStaticMethod("Device", "copyContent:", str);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/Device", "copyContent", '(Ljava/lang/String;)V', str);
        }
    }
}
