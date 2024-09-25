package org.cocos2dx.javascript.tools;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * 字符串处理
 */
public class MyCrpty
{
    /**
     * 32位长的MD5加密处理
     *
     * @param str
     * @return
     */
    public static String MD5(String str)
    {
        try {
            if (str != null) {
                return MD5(str.getBytes("UTF-8"));
            }
            return "";
        }
        catch (UnsupportedEncodingException e) {
            return "";
        }
        catch (Exception e) {
            return "";
        }
    }

    /**
     * 32位长的MD5加密处理
     *
     * @param sourceArray
     * @return
     */
    public static String MD5(byte[] sourceArray)
    {
        if (sourceArray == null || sourceArray.length <= 0) {
            return "";
        }
        MessageDigest messageDigest = null;
        try {
            messageDigest = MessageDigest.getInstance("MD5");
            messageDigest.reset();
            messageDigest.update(sourceArray);
        }
        catch (Exception e) {
            return "";
        }
        byte[] byteArray = messageDigest.digest();
        StringBuffer md5StrBuff = new StringBuffer();
        for (int i = 0; i < byteArray.length; i++) {
            if (Integer.toHexString(0xFF & byteArray[i]).length() == 1) {
                md5StrBuff.append("0").append(Integer.toHexString(0xFF & byteArray[i]));
            } else {
                md5StrBuff.append(Integer.toHexString(0xFF & byteArray[i]));
            }
        }
        return md5StrBuff.toString().toLowerCase();
    }

    /**
     * SHA1
     *
     * @param str
     * @return
     */
    public static String SHA1(String str)
    {
        try {
            if (str != null) {
                return SHA1(str.getBytes("UTF-8"));
            }
            return "";
        }
        catch (UnsupportedEncodingException e) {
            return "";
        }
        catch (Exception e) {
            return "";
        }
    }

    /**
     * SHA1
     *
     * @param sourceArray
     * @return
     */
    public static String SHA1(byte[] sourceArray)
    {
        if (sourceArray == null || sourceArray.length <= 0) {
            return "";
        }
        byte[] byteArray = null;
        try {
            // 得到一个SHA-1的消息摘要
            MessageDigest alga = MessageDigest.getInstance("SHA-1");
            // 添加要进行计算摘要的信息
            alga.update(sourceArray);
            // 得到该摘要
            byteArray = alga.digest();
        }
        catch (NoSuchAlgorithmException e) {
            return "";
        }
        return sha1ToHexString(byteArray).toLowerCase();
    }

    private static final String HEX_DIGITS = "0123456789abcdef";

    private static String sha1ToHexString(byte[] v)
    {
        StringBuilder sb = new StringBuilder(v.length * 2);
        for (int i = 0; i < v.length; i++) {
            int b = v[i] & 0xFF;
            sb.append(HEX_DIGITS.charAt(b >>> 4)).append(HEX_DIGITS.charAt(b & 0xF));
        }
        return sb.toString();
    }
}
