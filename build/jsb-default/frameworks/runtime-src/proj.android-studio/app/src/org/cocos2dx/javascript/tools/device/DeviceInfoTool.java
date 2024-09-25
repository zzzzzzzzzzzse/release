package org.cocos2dx.javascript.tools.device;

import android.app.Activity;
import android.provider.Settings;

import com.google.android.gms.ads.identifier.AdvertisingIdClient;

import org.cocos2dx.javascript.SDKWrapper;
import org.cocos2dx.javascript.dataPool.sp.AppData;
import org.cocos2dx.javascript.tools.StringUtil;

public class DeviceInfoTool
{
    public static String getDeviceInfo(Activity activity)
    {
        String androidID = "";
        try {
            androidID = Settings.Secure.getString(activity.getContentResolver(), Settings.Secure.ANDROID_ID);
        } catch (Exception e) {

        }
        String RandStr = StringUtil.getCharAndNumr(18);
        androidID += "_" + RandStr;

        return androidID;
    }

    /**
     * 获取udid
     * @return
     */
    public static String getUDID() {
        String udid = AppData.getPhoneUDID();
        if (StringUtil.StringEmpty(udid)) {
            udid = StringUtil.getSmallCharAndNum(16);
            AppData.setPhoneUDID(udid);
        }
        return udid;
    }

    /**
     * 获取idfi
     * @return
     */
    public static String getIDFA() {
        String idfa = AppData.getPhoneIDFA();
        if (StringUtil.StringEmpty(idfa)) {
            try {
                AdvertisingIdClient.Info adInfo = AdvertisingIdClient.getAdvertisingIdInfo(SDKWrapper.getInstance().getContext());
                idfa = adInfo.getId();
            } catch (Exception e) {
                e.printStackTrace();
            }
            if (!StringUtil.StringEmpty(idfa)) {
                idfa = StringUtil.getSmallCharAndNum(8) + "_" + StringUtil.getSmallCharAndNum(4) + "_" + StringUtil.getSmallCharAndNum(4) + "_" + StringUtil.getSmallCharAndNum(4) + "_" + StringUtil.getSmallCharAndNum(12);
            }
            AppData.setPhoneIDFA(idfa);
        }
        return idfa;
    }
}
