const { ccclass, property } = cc._decorator;
@ccclass
export default class ChristmasFirebaseManager {
    private static _instance: ChristmasFirebaseManager;
    public static get instance() {
        if (ChristmasFirebaseManager._instance == null) {
            ChristmasFirebaseManager._instance = new ChristmasFirebaseManager();
        }
        return ChristmasFirebaseManager._instance;
    }

    private constructor() {
    }

    /**
     * 打点
     * @param type 事件类型
     */
    public logEvent(type: string) {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //@ts-ignore
            jsb.reflection.callStaticMethod("FirebaseSdk", "logEvent:", type);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/FirebaseSdk", "logEvent", "(Ljava/lang/String;)V", type);
        }
    }
}
