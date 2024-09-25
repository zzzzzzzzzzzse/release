package org.cocos2dx.javascript.dataPool.sp;

import android.content.Context;
import android.content.SharedPreferences;
import android.content.SharedPreferences.Editor;
import android.text.TextUtils;

import org.cocos2dx.javascript.SDKWrapper;

/**
 * 应用数据
 */
public abstract class SharedPreferencesCache {
    public static Context getAppDataContent()
    {
        return SDKWrapper.getInstance().getContext();
    }

    /**
     * 设置数据BOOLEAN值KEY
     *
     * @param key
     * @param status
     * @return
     */
    public static boolean setBooleanData(String cacheFile, String key, boolean status)
    {
        try {
            SharedPreferences m_sharedata = getAppDataContent().getSharedPreferences(cacheFile, 0);
            if (m_sharedata != null)// 先保留最后再去除
            {
                Editor edit = m_sharedata.edit();
                edit.putBoolean(key, status);
                return edit.commit();
            }
        }
        catch (Exception E) {
        }
        return false;
    }

    /**
     * 获取数据BOOLEAN值KEY
     *
     * @param key
     * @param defalutValue 默认值
     * @return
     */
    public static boolean getBooleanData(String cacheFile, String key, boolean defalutValue)
    {
        try {
            if (TextUtils.isEmpty(cacheFile)) {
                return defalutValue;
            }
            SharedPreferences m_sharedata = getAppDataContent().getSharedPreferences(cacheFile, 0);
            if (m_sharedata != null&&m_sharedata.contains(key))// 先保留最后再去除
            {
                return m_sharedata.getBoolean(key, defalutValue);
            }
        }
        catch (Exception E) {

        }
        return defalutValue;
    }

    /**
     * 获取数据String值KEY
     *
     * @param key
     * @param defalutValue 默认值
     * @return
     */
    public static String getStringData(String cacheFile, String key, String defalutValue)
    {
        try {
            if (TextUtils.isEmpty(cacheFile)) {
                return defalutValue;
            }
            SharedPreferences m_sharedata = getAppDataContent().getSharedPreferences(cacheFile, 0);
            if (m_sharedata != null&&m_sharedata.contains(key))// 先保留最后再去除
            {
                return m_sharedata.getString(key, defalutValue);
            }
        }
        catch (Exception E) {

        }
        return defalutValue;
    }

    /**
     * 设置数据String值KEY
     *
     * @param key
     * @param status
     * @return
     */
    public static boolean setStringData(String cacheFile, String key, String status)
    {
        try {
            SharedPreferences m_sharedata = getAppDataContent().getSharedPreferences(cacheFile, 0);
            if (m_sharedata != null)// 先保留最后再去除
            {
                Editor edit = m_sharedata.edit();
                edit.putString(key, status);
                return edit.commit();
            }
        }
        catch (Exception E) {

        }
        return false;
    }

    /**
     * 设置数据long值KEY
     *
     * @param key
     * @param data
     * @return
     */
    public static boolean setLongData(String cacheFile, String key, long data)
    {
        try {
            if (TextUtils.isEmpty(cacheFile)) {
                return false;
            }
            SharedPreferences m_sharedata = getAppDataContent().getSharedPreferences(cacheFile, 0);
            if (m_sharedata != null)// 先保留最后再去除
            {
                Editor edit = m_sharedata.edit();
                edit.putLong(key, data);
                return edit.commit();
            }

        }
        catch (Exception E) {

        }
        return false;
    }

    /**
     * 获取数据long值KEY
     *
     * @param key
     * @param defalutValue 默认值
     * @return
     */
    public static long getLongData(String cacheFile, String key, long defalutValue)
    {
        try {
            if (TextUtils.isEmpty(cacheFile)) {
                return defalutValue;
            }
            SharedPreferences m_sharedata = getAppDataContent().getSharedPreferences(cacheFile, 0);
            if (m_sharedata != null&&m_sharedata.contains(key))// 先保留最后再去除
            {
                return m_sharedata.getLong(key, defalutValue);
            }
        }
        catch (Exception E) {

        }
        return defalutValue;
    }

    /**
     * 设置数据int值KEY
     *
     * @param key
     * @param data
     * @return
     */
    public static boolean setIntegerData(String cacheFile, String key, int data)
    {
        try {
            if (TextUtils.isEmpty(cacheFile)) {
                return false;
            }
            SharedPreferences m_sharedata = getAppDataContent().getSharedPreferences(cacheFile, 0);
            if (m_sharedata != null)// 先保留最后再去除
            {
                Editor edit = m_sharedata.edit();
                edit.putInt(key, data);
                return edit.commit();
            }
        }
        catch (Exception E) {

        }
        return false;
    }

    /**
     * 获取数据int值KEY
     *
     * @param key
     * @param defalutValue 默认值
     * @return
     */
    public static int getIntegerData(String cacheFile, String key, int defalutValue)
    {
        try {
            if (TextUtils.isEmpty(cacheFile)) {
                return defalutValue;
            }
            SharedPreferences m_sharedata = getAppDataContent().getSharedPreferences(cacheFile, 0);
            if (m_sharedata != null&&m_sharedata.contains(key))// 先保留最后再去除
            {
                return m_sharedata.getInt(key, defalutValue);
            }
        }
        catch (Exception E) {

        }
        return defalutValue;
    }

    /**
     * 设置数据float值KEY
     *
     * @param key
     * @param data
     * @return
     */
    public static boolean setFloatData(String cacheFile, String key, float data)
    {
        try {
            if (TextUtils.isEmpty(cacheFile)) {
                return false;
            }
            SharedPreferences m_sharedata = getAppDataContent().getSharedPreferences(cacheFile, 0);
            if (m_sharedata != null)// 先保留最后再去除
            {
                Editor edit = m_sharedata.edit();
                edit.putFloat(key, data);
                return edit.commit();
            }
        }
        catch (Exception E) {

        }
        return false;
    }

    /**
     * 获取数据float值KEY
     *
     * @param key
     * @param defalutValue 默认值
     * @return
     */
    public static float getFloatData(String cacheFile, String key, float defalutValue)
    {
        try {
            if (TextUtils.isEmpty(cacheFile)) {
                return defalutValue;
            }
            SharedPreferences m_sharedata = getAppDataContent().getSharedPreferences(cacheFile, 0);
            if (m_sharedata != null&&m_sharedata.contains(key))// 先保留最后再去除
            {
                return m_sharedata.getFloat(key, defalutValue);
            }
        }
        catch (Exception E) {

        }
        return defalutValue;
    }

    /**
     * 删除指定KEY
     *
     * @param key
     * @return
     */
    public static boolean remove(String cacheFile, String key)
    {
        try {
            if (TextUtils.isEmpty(cacheFile)) {
                return false;
            }
            SharedPreferences m_sharedata = getAppDataContent().getSharedPreferences(cacheFile, 0);
            if (m_sharedata != null)// 先保留最后再去除
            {
                Editor edit = m_sharedata.edit();
                edit.remove(key);
                return edit.commit();
            }
        }
        catch (Exception E) {

        }
        return false;
    }
}
