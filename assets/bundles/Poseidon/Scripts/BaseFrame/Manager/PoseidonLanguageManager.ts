import ConfigProxy from "../../Common/PoseidonConfigProxy";
import { LocalStorageType } from "../Const/PoseidonCommonDefine";
import { PoseidonEventDefine } from "../Const/PoseidonEventDefine";
import { PoseidonLocalStorageManager } from "./PoseidonLocalStorageManager";
import PoseidonLogManager from "./PoseidonLogManager";
import PoseidonSlotEventManager from "./PoseidonSlotEventManager";

const { ccclass } = cc._decorator;

/**
 * 多语言管理器
 */
@ccclass
export default class PoseidonLanguageManager {
    private static _instance: PoseidonLanguageManager = null;
    private curLanguage: number = 1;//当前语言
    private languageInfo: any;//多语言配置信息

    private constructor() {
        this.init();
    }

    private init(): void {
        let language = PoseidonLocalStorageManager.instance.getLocalData(LocalStorageType.LANGUAGE, -1);
        if (language == -1) {
            window['getCurrentLanguageCallback'] = this.getCurrentLanguageCallback.bind(this);
            this.getCurrentLanguage();
            return;
        }
        this.curLanguage = language;
        this.loadConfigs();
    }

    private getCurrentLanguage(): void {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //@ts-ignore
            jsb.reflection.callStaticMethod("Device", "getCurrentLanguage");
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/Device", "getCurrentLanguage", "()V");
        }
    }

    private getCurrentLanguageCallback(language: string): void {
        const config = ConfigProxy.instance.getConfigData('Language');
        if (!config) {
            return;
        }
        const keys = Object.keys(config);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const info = config[key] as any;
            const index = cc.sys.os === cc.sys.OS_IOS ? 0 : 1;
            if (language.indexOf(info.name_abb[index]) != -1) {
                this.curLanguage = info.id;
                break;
            }
        }
        this.loadConfigs();
        PoseidonLogManager.instance.log('language:', language);
    }

    /**
     * 加载多语言配置表
     */
    public loadConfigs() {
        const config = ConfigProxy.instance.getConfigData('Language');
        if (!config) {
            return;
        }
        const language = config[this.curLanguage] as any;
        this.languageInfo = ConfigProxy.instance.getConfigData(language.name);
    }

    /**
     * 获取单例
     */
    public static get instance(): PoseidonLanguageManager {
        if (!this._instance) {
            this._instance = new PoseidonLanguageManager();
        }
        return this._instance;
    }

    /**
     * 设置游戏语言
     * @param language 当前语言
     */
    public setLanguage(language: number): void {
        if (language == this.curLanguage) {
            PoseidonLogManager.instance.log('切换语言与当前语言相同');
            return;
        }
        this.curLanguage = language;
        PoseidonLocalStorageManager.instance.saveLocalData(LocalStorageType.LANGUAGE, language);
        this.loadConfigs();
        PoseidonSlotEventManager.instance.emit(PoseidonEventDefine.LANGUAGE_CHANGED);
    }

    /**
     * 获取当前语言
     */
    public getLanguage(): number {
        return this.curLanguage;
    }

    /**
     * 获取当前语言的名字
     */
    public getLanguageName(): string {
        const config = ConfigProxy.instance.getConfigData('Language');
        const language = config[this.curLanguage] as any;
        return language.nameLanguage;
    }

    /**
     * 根据id获取当前语言下对应的文本
     * @param id 
     */
    public getLanguageStringById(id: string): string {
        if (!this.languageInfo) {
            this.loadConfigs();
            return '';
        }
        let info = this.languageInfo[id];
        if (!info) {
            return '';
        }
        return info.text || '';
    }
}
