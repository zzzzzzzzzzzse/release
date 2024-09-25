/**
 * json处理工具
 */
export class OperateJson {
    /**
     * 获取number类型
     * @param jsonObj json对像
     * @param itemName item名字
     * @param defaultValue 默认值
     * @returns 
     */
    public static getNumber(jsonObj: JSON, itemName: string, defaultValue: number = -1): number {
        if (jsonObj) {
            try {
                let strNum: number = Number(jsonObj[itemName]);
                if (!isNaN(strNum)) {
                    return strNum;
                }
            } catch (e) {

            }
        }
        return defaultValue;
    }

    /**
     * 获取大数据int
     * @param jsonObj 
     * @param itemName 
     * @param defaultValue 
     * @returns 
     */
    public static getBigNumber(jsonObj: JSON, itemName: string, defaultValue: bigint = BigInt(-1)): bigint {
        if (jsonObj) {
            try {
                return BigInt(jsonObj[itemName]);
            } catch (e) {

            }
        }
        return defaultValue;
    }

    /**
     * 获取string类型
     * @param jsonObj json对像
     * @param itemName item名字
     * @param defaultValue 默认值
     * @returns 
     */
    public static getString(jsonObj: JSON, itemName: string, defaultValue: string = ""): string {
        if (jsonObj) {
            try {
                return String(jsonObj[itemName]);
            } catch (e) {

            }
        }
        return defaultValue;
    }


    /**
     * 获取json类型
     * @param jsonObj json对像
     * @param itemName item名字
     * @returns 
     */
    public static getJsonObj(jsonObj: JSON, itemName: string): JSON {
        if (jsonObj) {
            try {
                return jsonObj[itemName];
            } catch (e) {
            }
        }
        return null;
    }

    /**
     * 获取json数组类型
     * @param jsonObj json对像
     * @param itemName item名字
     * @returns 
     */
    public static getJsonArr(jsonObj: JSON, itemName: string): JSON {
        if (jsonObj) {
            try {
                return jsonObj[itemName];
            } catch (e) {

            }
        }
        return null;
    }

    /**
     * 获取json类型
     * @param jsonObj json对像
     * @param itemName item名字
     * @returns 
     */
    public static getAny(jsonObj: JSON, itemName: string, defaultValue: any = null): any {
        if (jsonObj) {
            try {
                return jsonObj[itemName];
            } catch (e) {
            }
        }
        return defaultValue;
    }

    public static getbigInt(jsonObj: JSON, itemName: string, defaultValue: bigint = BigInt(0)): bigint {
        if (jsonObj) {
            try {
                return BigInt(jsonObj[itemName]);
            } catch (e) {
            }
        }
        return defaultValue;
    }

    /**
     * 字符串转json
     * @param str 数据
     * @returns 
     */
    public static readJsonString(str: string): JSON {
        try {
            return JSON.parse(str);
        } catch (e) {

        }
        return null;
    }

    /**
     * json转字符串
     * @param jsonObj 
     * @returns 
     */
    public static jsonToString(jsonObj: JSON): string {
        if (jsonObj != null) {
            try {
                return JSON.stringify(jsonObj);
            } catch (e) {

            }
        }
        return null;
    }

    /**
     * 对象转字符串
     * @param obj 
     * @returns 
     */
    public static objToString(obj: any): string {
        if (obj) {
            return JSON.stringify(obj);
        }
        return null;
    }


    public static getRealJsonData(baseStr) {
        if (!baseStr || typeof baseStr != 'string') return;
        var jsonData = null;
        try {
            jsonData = JSON.parse(baseStr);
        } catch (err) {
            return null;
        }
        var needReplaceStrs = [];
        this.loopFindArrOrObj(jsonData, needReplaceStrs);
        needReplaceStrs.forEach(function (replaceInfo) {
            var matchArr = baseStr.match(eval('/"' + replaceInfo.key + '":[0-9]{15,}/'));
            if (matchArr) {
                var str = matchArr[0];
                var replaceStr = str.replace('"' + replaceInfo.key + '":', '"' + replaceInfo.key + '":"');
                replaceStr += '"';
                baseStr = baseStr.replace(str, replaceStr);
            }
        });
        var returnJson = null;
        try {
            returnJson = JSON.parse(baseStr);
        } catch (err) {
            return null;
        }
        return returnJson;
    }

    //遍历对象类型的
    public static getNeedRpStrByObj(obj, needReplaceStrs) {
        for (var key in obj) {
            var value = obj[key];
            if (typeof value == 'number' && value > 9007199254740992) {
                needReplaceStrs.push({ key: key });
            }
            this.loopFindArrOrObj(value, needReplaceStrs);
        }
    }

    //遍历数组类型的
    public static getNeedRpStrByArr(arr, needReplaceStrs) {
        for (var i = 0; i < arr.length; i++) {
            var value = arr[i];
            this.loopFindArrOrObj(value, needReplaceStrs);
        }
    }

    //递归遍历
    public static loopFindArrOrObj(value, needRpStrArr) {
        var valueTypeof = Object.prototype.toString.call(value);
        if (valueTypeof == '[object Object]') {
            needRpStrArr.concat(this.getNeedRpStrByObj(value, needRpStrArr));
        }
        if (valueTypeof == '[object Array]') {
            needRpStrArr.concat(this.getNeedRpStrByArr(value, needRpStrArr));
        }
    }
}