package org.cocos2dx.javascript.tools;

import android.os.Looper;

import org.cocos2dx.javascript.AppActivity;
import org.cocos2dx.javascript.SDKWrapper;

/**
 * 线程管理
 */
public class LooperTool {

    /**
     * 是否是主线程
     * @return
     */
    public static boolean isMainThread() {
        return Looper.getMainLooper() == Looper.myLooper();
    }

    public static void UiRun(Runnable action) {
        if (LooperTool.isMainThread()) {
            action.run();
        } else {
            AppActivity app = (AppActivity) (SDKWrapper.getInstance().getContext());
            app.runOnUiThread(action);
        }
    }
}
