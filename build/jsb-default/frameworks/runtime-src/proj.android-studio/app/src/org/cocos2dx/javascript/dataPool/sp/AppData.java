package org.cocos2dx.javascript.dataPool.sp;

import org.cocos2dx.javascript.tools.StringUtil;

public class AppData extends SharedPreferencesCache{
    private static final String  TAG = "app_user";
    /**
     * 设置idfa
     * @param idfa
     * @return
     */
    public static boolean setPhoneIDFA(String idfa) {
        return setStringData("user_idfa", idfa);
    }

    /**
     * 获取idfa
     * @return
     */
    public static String getPhoneIDFA() {
        return getStringData("user_idfa", "");
    }

    /**
     * 设置udid
     * @param udid
     * @return
     */
    public static boolean setPhoneUDID(String udid) {
        return setStringData("user_udid", udid);
    }

    /**
     * 获取udid
     * @return
     */
    public static String getPhoneUDID() {
        return getStringData("user_udid", "");
    }
    /************************************************************ 基础代码 ****************************************************************/
    /**
     * 设置数据BOOLEAN值KEY
     *
     * @param key
     * @param data
     * @return
     */
    public static boolean setBooleanData(String key, boolean data)
    {
        return setBooleanData(getAppDataTag(), key, data);
    }

    /**
     * 获取数据BOOLEAN值KEY
     *
     * @param key
     * @param defalutValue 默认值
     * @return
     */
    public static boolean getBooleanData(String key, boolean defalutValue)
    {
        return getBooleanData(getAppDataTag(), key, defalutValue);
    }

    /**
     * 获取数据String值KEY
     *
     * @param key
     * @param defalutValue 默认值
     * @return
     */
    public static String getStringData(String key, String defalutValue)
    {
        return getStringData(getAppDataTag(), key, defalutValue);
    }


    /**
     * 设置数据String值KEY
     *
     * @param key
     * @param data
     * @return
     */
    public static boolean setStringData(String key, String data)
    {
        return setStringData(getAppDataTag(), key, data);
    }

    /**
     * 设置数据long值KEY
     *
     * @param key
     * @param data
     * @return
     */
    public static boolean setLongData(String key, long data)
    {
        return setLongData(getAppDataTag(), key, data);
    }

    /**
     * 获取数据long值KEY
     *
     * @param key
     * @param defalutValue 默认值
     * @return
     */
    public static long getLongData(String key, long defalutValue)
    {
        return getLongData(getAppDataTag(), key, defalutValue);
    }

    /**
     * 设置数据int值KEY
     *
     * @param key
     * @param data
     * @return
     */
    public static boolean setIntegerData(String key, int data)
    {
        return setIntegerData(getAppDataTag(), key, data);
    }

    /**
     * 获取数据int值KEY
     *
     * @param key
     * @param defalutValue 默认值
     * @return
     */
    public static int getIntegerData(String key, int defalutValue)
    {
        return getIntegerData(getAppDataTag(), key, defalutValue);
    }

    /**
     * 获取数据float值KEY
     *
     * @param key
     * @param defalutValue 默认值
     * @return
     */
    public static float getFloatData(String key, float defalutValue)
    {
        return getFloatData(getAppDataTag(), key, defalutValue);
    }

    /**
     * 设置数据float值KEY
     *
     * @param key
     * @param data
     * @return
     */
    public static boolean setFloatData(String key, float data)
    {
        return setFloatData(getAppDataTag(), key, data);
    }

    /**
     * 删除指定的KEY
     *
     * @param key
     * @return
     */
    public static boolean remove(String key)
    {
        return remove(getAppDataTag(), key);
    }

    public static String getAppDataTag()
    {
        return "app_user";
    }

    /**
     * 设置推广链接
     *
     * @return
     */
    public static boolean setInstallReferrer(String link) {
        return setStringData("googleInstallReferrer", link);
    }

    /**
     * 获取推广链接
     *
     * @return
     */
    public static String getInstallReferre() {
        String siSource = getStringData("googleInstallReferrer", "");
        if (StringUtil.StringEmpty(siSource)) {
            return "";
        } else {
            if ("-10".equals(siSource)) {
                return "";
            } else {
                return siSource;
            }
        }
    }

}
