package org.cocos2dx.javascript.tools;

import android.content.Context;
import android.content.res.Configuration;
import android.util.DisplayMetrics;

import org.cocos2dx.javascript.SDKWrapper;

public class ScreenConfig {
    public static int screenWidth = 100;
    public static int screenHeight = 100;

    public static void initViewConfig(Context context) {
        try {
            DisplayMetrics viewMEtrics = SDKWrapper.getInstance().getContext().getResources().getDisplayMetrics();
            screenWidth = viewMEtrics.widthPixels;
            screenHeight = viewMEtrics.heightPixels;
            Configuration cf = (context == null ? SDKWrapper.getInstance().getContext() : context).getResources().getConfiguration();
            if (cf != null && cf.orientation != Configuration.ORIENTATION_PORTRAIT) {
                screenWidth = viewMEtrics.widthPixels;
                screenHeight = viewMEtrics.heightPixels;
            }
        } catch (Exception e) {

        }
    }

    public static String getScreenSize() {
        return screenWidth + "*" + screenHeight;
    }
}
