package org.cocos2dx.javascript.tools;

import android.text.TextUtils;

import java.util.Random;

/**
 * 字符串处理工具
 */
public class StringUtil
{
    /**
     * 判断是字符串是否没有（空或者"")
     *
     * @param aData
     * @return
     */
    public static boolean StringEmpty(String aData)
    {
        try {
            return TextUtils.isEmpty(aData);
        }
        catch (Exception E) {

        }
        return true;
    }

    /**
     * 把字符串转为数字
     *
     * @param str     要转换的字符串
     * @param replace 非数字时要替换的数字
     * @return int
     */
    public static Integer StringToInt(String str, Integer replace)
    {
        if (str == null) {
            return replace;
        }
        str = str.trim();
        if (str.length() == 0) {
            return replace;
        }
        if (isNumber(str, true)) {
            try {
                return (Integer.parseInt(str));
            }
            catch (Exception ex) {
            }
        }
        return replace;
    }

    /**
     * 字符串转长整性
     */
    public static long StringToLong(String obj, long rej)
    {
        try {
            if (obj != null && !"".equals(obj) && isNumber(obj, true)) {
                rej = Long.valueOf(obj).longValue();
            }
        }
        catch (Exception E) {

        }
        return rej;
    }

    /**
     * 判断是否纯数字
     *
     * @param numberString 字符对像
     * @param Negative     是否要检测负数
     * @return
     */
    public static Boolean isNumber(Object numberString, boolean Negative)
    {
        if (numberString == null || numberString.toString().equals("")) {
            return false;
        }
        if (numberString.toString() == null || "".equals(numberString.toString())) {
            return false;
        }
        if (Negative) {
            return numberString.toString().matches("-?\\d+$");
        } else {
            return numberString.toString().matches("\\d*");
        }
    }


    /**
     * 设备信息有效性
     *
     * @param str
     * @return
     */
    public static boolean deviceStrEffective(String str)
    {
        if (StringEmpty(str)) {
            return false;
        }
        if (str.equals("unknown") || str.equals("UNKNOWN")) {
            return false;
        }
        if (str.equals("00:00:00:00:00:00") || str.equals("02:00:00:00:00:00")) {
            return false;
        }
        return true;
    }

    /**
     * 生成随机数字和字母组合
     *
     * @param length
     * @return
     */
    public static String getCharAndNumr(int length)
    {
        Random random = new Random();
        StringBuffer valSb = new StringBuffer();
        String charStr = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        int charLength = charStr.length();
        for (int i = 0; i < length; i++) {
            int index = random.nextInt(charLength);
            valSb.append(charStr.charAt(index));
        }
        return valSb.toString();
    }

    /**
     * 生成随机数字和字母组合
     *
     * @param length
     * @return
     */
    public static String getSmallCharAndNum(int length)
    {
        Random random = new Random();
        StringBuffer valSb = new StringBuffer();
        String charStr = "0123456789abcdefghijklmnopqrstuvwxyz";
        int charLength = charStr.length();
        for (int i = 0; i < length; i++) {
            int index = random.nextInt(charLength);
            valSb.append(charStr.charAt(index));
        }
        return valSb.toString();
    }

    /**
     * 异或处理
     *
     * @param key 异或的对象
     * @param str 需要处理的字符串
     * @return
     */
    public static String StringXor(char key, String str)
    {
        char[] charArray = str.toCharArray();
        for (int i = 0; i < charArray.length; i++) {
            charArray[i] = (char) (charArray[i] ^ key);
        }
        return String.valueOf(charArray);
    }
}
