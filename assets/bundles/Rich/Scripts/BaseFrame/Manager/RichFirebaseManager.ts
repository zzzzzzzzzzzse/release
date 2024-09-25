const { ccclass, property } = cc._decorator;
@ccclass
export default class RichFirebaseManager {
    private static _instance: RichFirebaseManager;
    public static get instance() {
        if (RichFirebaseManager._instance == null) {
            RichFirebaseManager._instance = new RichFirebaseManager();
        }
        return RichFirebaseManager._instance;
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
