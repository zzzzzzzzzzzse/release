package org.cocos2dx.javascript.tools;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class JsonOperate
{
    /**
     * 加载json字符串
     *
     * @param obj 标准的json对像
     * @return
     */
    public static JsonObject ReadJsonObject(JsonObject obj)
    {
        if (obj != null) {
            try {
                return ReadJsonString(obj.toString());

            }
            catch (Exception e) {

            }

        }
        return null;
    }

    /**
     * 加载json字符串
     *
     * @param jsonString 标准的json字符串
     * @return
     */
    public static JsonObject ReadJsonString(String jsonString)
    {
        try {
            if (!StringUtil.StringEmpty(jsonString)) {
                //return JSON.parseObject(jsonString);
                return JsonParser.parseString(jsonString).getAsJsonObject();
            }
        }
        catch (Exception ex) {
            
        }
        return null;
    }

    /**
     * 是否空的JSON对像
     *
     * @param json
     * @return
     */
//    public static boolean isEmpty(JsonObject json)
//    {
//        if (json == null || json.isEmpty()) {
//            return true;
//        }
//        return false;
//    }

    /**
     * 是否空列表的JSON列表对像
     *
     * @param json
     * @return
     */
    public static boolean isEmpty(JsonArray json)
    {
        if (json == null || json.size() <= 0) {
            return true;
        }
        return false;
    }

    /**
     * 加载json字符串
     *
     * @param jsonString 标准的json字符串
     * @return
     */
    public static JsonArray ReadJsonArrayString(String jsonString)
    {
        try {
            //return JSON.parseArray(jsonString);
            return JsonParser.parseString(jsonString).getAsJsonArray();
        }
        catch (Exception ex) {
        }
        return null;
    }

    /**
     * 检测提定KEY是否存在
     *
     * @param obj
     * @param key
     * @return
     */
//    public static boolean containsKey(JsonObject obj, String key)
//    {
//        if (obj == null) {
//            return false;
//        }
////        return obj.containsKey(key);
//        return obj.has(key);
//    }

    /**
     * 检测提定VALUE是否存在
     *
     * @param obj
     * @param value
     * @return
     */
//    public static boolean containsValue(JsonObject obj, Object value)
//    {
//        if (obj == null) {
//            return false;
//        }
//        return obj.containsValue(value);
//    }

    /**
     * 返回指定Json对像的double数据
     *
     * @param item         要查找的对像
     * @param name         要查找的名
     * @param defaultValue 默认值
     */
//    public static Double getDouble(JsonObject item, String name, double defaultValue)
//    {
//        if (item != null) {
//            try {
//                Double value = item.getDouble(name);
//                if (value != null) {
//                    return value;
//                }
//            }
//            catch (Exception e) {
//            }
//        }
//        return defaultValue;
//    }

    /**
     * 返回指定Json对像的double数据
     *
     * @param item         要查找的对像
     * @param name         要查找的名
     * @param defaultValue 默认值
     */
    public static Float getFloat(JsonObject item, String name, float defaultValue)
    {
        if (item != null) {
            try {
                //Float value = item.getFloat(name);
                Float value = item.get(name).getAsFloat();
                if (value != null) {
                    return value;
                }
            }
            catch (Exception e) {
            }
        }
        return defaultValue;

    }

    /**
     * 返回指定Json对像的Int数据
     *
     * @param item         要查找的对像
     * @param name         要查找的名
     * @param defaultValue 默认值
     */
    public static Integer getInt(JsonObject item, String name, int defaultValue)
    {
        if (item != null) {
            try {
                //Integer value = item.getInteger(name);
                Integer value = item.get(name).getAsInt();
                if (value != null) {
                    return value;
                }
            }
            catch (Exception e) {
            }
        }
        return defaultValue;
    }

    /**
     * 返回指定Json对像的Int数据
     *
     * @param item         要查找的对像
     * @param name         要查找的名
     * @param defaultValue 默认值
     */
    public static Boolean getBoolean(JsonObject item, String name, boolean defaultValue)
    {
        if (item != null) {
            try {
                //Boolean value = item.getBoolean(name);
                Boolean value = item.get(name).getAsBoolean();
                if (value != null) {
                    return value;
                }
            }
            catch (Exception e) {
            }
        }
        return defaultValue;
    }

    /**
     * 返回指定Json对像的Long数据
     *
     * @param item         要查找的对像
     * @param name         要查找的名
     * @param defaultValue 默认值
     */
//    public static Long getLong(JsonObject item, String name, long defaultValue)
//    {
//        if (item != null) {
//            try {
//                Long value = item.getLong(name);
//                if (value != null) {
//                    return value;
//                }
//            }
//            catch (Exception e) {
//            }
//        }
//        return defaultValue;
//    }

    /**
     * 返回指定Json对像的String数据
     *
     * @param item 要查找的对像
     * @param name 要查找的名
     */
    public static String getString(JsonObject item, String name)
    {
        return getString(item, name, null);
    }

    /**
     * 返回指定Json对像的String数据
     *
     * @param item         要查找的对像
     * @param name         要查找的名
     * @param defaultValue 默认值
     */
    public static String getString(JsonObject item, String name, String defaultValue)
    {
        if (item != null) {
            try {
                //String value = item.getString(name);
                String value = item.get(name).getAsString();
                if (value != null) {
                    return value;
                }
            }
            catch (Exception e) {
            }
        }
        return defaultValue;
    }

    /**
     * 返回指定Json对像的String列表数据
     *
     * @param item 要查找的对像
     * @param name 要查找的名
     */
//    public static List<String> getStringList(JsonObject item, String name)
//    {
//        if (item != null) {
//            try {
//                JSONArray value = item.getJSONArray(name);
//                if (value != null) {
//                    ArrayList<String> list = new ArrayList<String>(value.size());
//                    for (int i = 0; i < value.size(); i++) {
//                        list.add(value.get(i).toString());
//                    }
//                    return list;
//                }
//            }
//            catch (Exception e) {
//            }
//        }
//        return null;
//    }

    /**
     * 返回指定Json对像的JSONArray数据
     *
     * @param item 要查找的对像
     * @param name 要查找的名
     */
//    public static JSONArray getJSONArray(JsonObject item, String name)
//    {
//        if (item != null) {
//            try {
//                JSONArray value = item.getJSONArray(name);
//                if (value != null) {
//                    return value;
//                }
//            }
//            catch (Exception e) {
//            }
//        }
//        return null;
//
//
//    }

    /**
     * 返回指定Json对像的JsonObject数据
     *
     * @param item 要查找的对像
     * @param name 要查找的名
     * @return JsonObject
     */
//    public static JsonObject getJsonObject(JsonObject item, String name)
//    {
//        if (item != null) {
//            try {
//                JsonObject value = item.getJsonObject(name);
//                if (value != null) {
//                    return value;
//                }
//            }
//            catch (Exception e) {
//            }
//        }
//        return null;
//    }

    /**
     * 返回指定Json对像的JSONArray数据
     *
     * @param item  要查找的对像
     * @param index 循环索引
     */
//    public static JsonObject getJsonObject(JSONArray item, int index)
//    {
//        if (item != null) {
//            try {
//                JsonObject value = item.getJsonObject(index);
//                if (value != null) {
//                    return value;
//                }
//            }
//            catch (Exception e) {
//            }
//        }
//        return null;
//    }

    /**
     * 返回指定Json对像的JSONArray数据中的索引值 这个有区别于getJsonObject
     *
     * @param item  要查找的对像
     * @param index 循环索引
     */
//    public static Object getJsonObjectValue(JSONArray item, int index)
//    {
//
//        if (item != null) {
//            try {
//                Object value = item.get(index);
//                if (value != null) {
//                    return value;
//                }
//            }
//            catch (Exception e) {
//            }
//        }
//        return null;
//    }


    /**
     * 将对象转换成Json字符串
     *
     * @param obj
     * @return json类型字符串
     */
//    public static String getJsonToClass(Object obj)
//    {
//        try {
//            return JSON.toJSONString(obj);
//        }
//        catch (Exception E) {
//            return null;
//        }
//    }

    /**
     * 反序列化简单对象
     *
     * @param jsonStr json字符串
     * @param clazz   实体类类型
     * @return 反序列化后的实例
     */
//    public static <T> T getClassFromString(String jsonStr, Class<T> clazz)
//    {
//        if (clazz == null || jsonStr == null || jsonStr.length() == 0) {
//            return null;
//        }
//        try {
//            return JSON.parseObject(jsonStr, clazz);
//        }
//        catch (Exception e) {
//        }
//        return null;
//    }

    /**
     * 反序列化简单列表对象
     *
     * @param jsonStr json字符串
     * @param clazz   实体类类型
     * @return 反序列化后的实例列表
     */
//    public static <T> List<T> getClassListFromString(String jsonStr, Class<T> clazz)
//    {
//        if (clazz == null || jsonStr == null || jsonStr.length() == 0) {
//            return null;
//        }
//        try {
//            return JSON.parseArray(jsonStr, clazz);
//        }
//        catch (Exception e) {
//        }
//        return null;
//    }

    /**
     * 给一个JSON对像添加一项
     *
     * @param JsonObject
     * @param key
     * @param value
     * @return
     */
//    public static boolean setJsonItemValue(JsonObject JsonObject, String key, Object value)
//    {
//        if (value == null || key == null || JsonObject == null) {
//            return false;
//        }
//        try {
//            JsonObject.put(key, value);
//            return true;
//        }
//        catch (Exception e) {
//            return false;
//        }
//    }
}
