package org.cocos2dx.javascript.tools;


import android.app.Activity;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.os.Build;

import org.cocos2dx.javascript.AppConstant;
import org.cocos2dx.javascript.SDKWrapper;

import java.util.Locale;

/**
 * 安卓获取工具
 */
public class DeviceUtils
{
    private static final String packetName = "rooollerslot";

    /**
     * 获取设备标识
     */
    public static String getAndroidDeviceInfo()
    {
//        //todo 初始化activity
//        final Activity activity = (Activity) SDKWrapper.getInstance().getContext();
//        DeviceInfo deviceInfo = DeviceInfoTool.getDeviceInfo(activity);
//        if (deviceInfo != null) {
//            if (deviceInfo != null) {
//                //转化成字符串
//                String deviceStr = deviceInfo.getAJsonStr();
//                if (!StringUtil.StringEmpty(deviceStr)) {
//                    return deviceStr;
//                }
//            }
//        }
        return "";
    }

    /**
     * 获取android
     * @return
     */
    public static String getAndroidUA()
    {
        String ret = "Mozilla/5.0 (Android; OS/" + Build.VERSION.SDK_INT + "; B/" + packetName + "; V/" + getVersionName() + "/" + AppConstant.hallVersion + "; C/" + getAppChannelAndType() + "; " + getAppLanguage() + "; Branchs " + Build.MODEL + ")";
        return ret;
    }


    /**
     * 取得应用渠道号和应用类别id
     *
     * @return
     */
    public static String getAppChannelAndType()
    {
        //升级gradle版本后,老语法不支持,所以直接返回对应版本号
//        return BuildConfig.ThisAppChannelId + "." + BuildConfig.ThisAppCategoryId;
        return "0.0";
    }


    /**
     * 取得应用语言
     *
     * @return
     */
    public static String getAppLanguage()
    {
        //华为的坑zh_CN_#Hans
        String language = Locale.getDefault().toString();
        if (StringUtil.StringEmpty(language)) {
            return "en";
        } else {
            return language;
        }
    }

    /**
     * 返回1.0.0格式的版本号 2024.09.25
     *
     * @return
     */
    public static String getVersionName()
    {
        String versionname = "1.0.0";// 版本号
        try {
            //todo 初始化activity
            final Activity activity = (Activity) SDKWrapper.getInstance().getContext();
            PackageManager pm = activity.getPackageManager();
            PackageInfo pi = pm.getPackageInfo(activity.getPackageName(), 0);
            versionname = pi.versionName;  //在app/build.gradle里配置版本号

        }
        catch (Exception e) {
            versionname = "";
        }
        return versionname;
    }
}
