package org.cocos2dx.javascript.tools.device;

import org.cocos2dx.javascript.dataPool.sp.AppData;
import org.cocos2dx.javascript.tools.StringUtil;

public class DeviceInfoTool
{

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
            //广告id,
//            try {
//                AdvertisingIdClient.Info adInfo = AdvertisingIdClient.getAdvertisingIdInfo(SDKWrapper.getInstance().getContext());
//                idfa = adInfo.getId();
//            } catch (Exception e) {
//                e.printStackTrace();
//            }
            if (!StringUtil.StringEmpty(idfa)) {
                idfa = StringUtil.getSmallCharAndNum(8) + "_" + StringUtil.getSmallCharAndNum(4) + "_" + StringUtil.getSmallCharAndNum(4) + "_" + StringUtil.getSmallCharAndNum(4) + "_" + StringUtil.getSmallCharAndNum(12);
            }
            AppData.setPhoneIDFA(idfa);
        }
        return idfa;
    }
}
