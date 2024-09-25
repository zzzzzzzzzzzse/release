/**
 * 字符串处理工具
 */
export class StringUtil {

    /**
     * 判断字符串是否为空
     * @param str 字符串
     * @returns 
     */
    public static isEmpty(str: string): boolean {
        if (!str || str === null || str === "") {
            return true;
        }
        return false;
    }

    /**
     * 字符串转数字
     * @param str 字符串
     * @returns 
     */
    public static StringToNumber(str: string, defaultNum: number = 0): number {
        if (str == null || str == "") {
            return defaultNum;
        }
        let thisNum: number = Number(str);
        if (isNaN(thisNum)) {
            return defaultNum;
        }
        return Number(str);
    }

    /**
     * 生成随机数
     * @param createNumber 生成长度
     * @returns 
     */
    public static createRandomNum(createNumber: number): string {
        let outString: string = "";
        let inOptions: string = "1234567890";

        for (let i = 0; i < createNumber; i++) {
            outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
        }
        return outString;
    }

    /**
     * 生成随机数
     * @param createNumber 生成长度
     * @returns 
     */
    public static createRandomStr(createNumber: number): string {
        let outString: string = "";
        let inOptions: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

        for (let i = 0; i < createNumber; i++) {
            outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
        }
        return outString;
    }

    /**
     * 显示钱类型（100,000）
     * @param num 金额
     */
    public static showMoneyType(num: number | bigint): string {
        if (typeof num === 'number') {
            if (num != 0) {
                let result: string = "";
                //number类型转换为string类型
                let temp: string = num.toString();
                //找到小数点位置
                let smallNode: number = temp.indexOf(".");
                result = temp;
                //从后向前每三位添加一个逗号，
                if (smallNode >= 0) {
                    for (let i = smallNode - 3; i >= 0; i -= 3) {
                        if (temp[i - 1]) {
                            result = this.insertStr(result, i, ",");
                        }
                    }
                } else {
                    for (let i = temp.length - 3; i >= 0; i -= 3) {
                        if (temp[i - 1]) {
                            result = this.insertStr(result, i, ",");
                        }
                    }
                }
                return result;
            }
        } else if (typeof num === 'bigint') {
            if (num) {
                let result: string = "";
                //number类型转换为string类型
                let temp: string = num.toString();
                //找到小数点位置
                let smallNode: number = temp.indexOf(".");
                result = temp;
                //从后向前每三位添加一个逗号，
                if (smallNode >= 0) {
                    for (let i = smallNode - 3; i >= 0; i -= 3) {
                        if (temp[i - 1]) {
                            result = this.insertStr(result, i, ",");
                        }
                    }
                } else {
                    for (let i = temp.length - 3; i >= 0; i -= 3) {
                        if (temp[i - 1]) {
                            result = this.insertStr(result, i, ",");
                        }
                    }
                }
                return result;
            }
        }

        return "0";
    }

    /**
    * 显示钱类型（1k,1m,1b,1t）
    * @param num 金额(大于0整数)
    */
    public static showMoneyTypeClasscs(num: number): string {
        if (num > 0) {
            let result: string = "";

            if (num >= 1000000000000) {
                let strNum = String((num / 100000000000));
                if (strNum.indexOf(".") >= 0) {
                    strNum = strNum.substring(0, strNum.indexOf(".") + 2);
                }
                result = strNum + "T";
            } else if (num >= 1000000000) {
                let strNum = String((num / 1000000000));
                if (strNum.indexOf(".") >= 0) {
                    strNum = strNum.substring(0, strNum.indexOf(".") + 2);
                }
                result = strNum + "B";
            } else if (num >= 1000000) {
                let strNum = String((num / 1000000));
                if (strNum.indexOf(".") >= 0) {
                    strNum = strNum.substring(0, strNum.indexOf(".") + 2);
                }
                result = strNum + "M";
            } else if (num >= 1000) {
                let strNum = String((num / 1000));
                if (strNum.indexOf(".") >= 0) {
                    strNum = strNum.substring(0, strNum.indexOf(".") + 2);
                }
                result = strNum + "K";
            } else {
                result = num.toString();
            }
            return result;
        }
        return "0";
    }

    /**
    * 显示钱类型（1k,1m,1b,1t）
    * @param num 金额(大于0整数)
    */
    public static showMoneyType2(num: number): string {
        if (num > 0) {
            let result: string = "";

            if (num >= 1000000000000) {
                let strNum = (num / 100000000000).toFixed(1);
                // String(Math.floor(num / 100000000000));
                // if (strNum.indexOf(".") >= 0) {
                //     strNum = strNum.substring(0, strNum.indexOf(".") + 2);
                // }

                if (strNum[strNum.length - 1] == "0") {
                    strNum = strNum.substring(0, strNum.length - 2);
                }
                result = strNum + "T";
            } else if (num >= 1000000000) {
                let strNum = (num / 1000000000).toFixed(1);

                // String(Math.floor(num / 1000000000));
                // if (strNum.indexOf(".") >= 0) {
                //     strNum = strNum.substring(0, strNum.indexOf(".") + 2);
                // }
                if (strNum[strNum.length - 1] == "0") {
                    strNum = strNum.substring(0, strNum.length - 2);
                }
                result = strNum + "B";
            } else if (num >= 1000000) {
                let strNum = (num / 1000000).toFixed(1);

                // String(Math.floor(num / 1000000));
                // if (strNum.indexOf(".") >= 0) {
                //     strNum = strNum.substring(0, strNum.indexOf(".") + 2);
                // }
                if (strNum[strNum.length - 1] == "0") {
                    strNum = strNum.substring(0, strNum.length - 2);
                }
                result = strNum + "M";
            } else if (num >= 1000) {
                let strNum = (num / 1000).toFixed(1);

                // String(Math.floor(num / 1000));
                // if (strNum.indexOf(".") >= 0) {
                //     strNum = strNum.substring(0, strNum.indexOf(".") + 2);
                // }
                if (strNum[strNum.length - 1] == "0") {
                    strNum = strNum.substring(0, strNum.length - 2);
                }
                result = strNum + "K";
            } else {
                result = num.toString();
            }
            return result;
        }
        return "0";
    }

    // /**
    // * 显示钱类型（1k,1m,1b,1t）
    // * @param num 金额(大于0整数)
    // */
    // public static showMoneyType2(num: number): string {
    //     if (num > 0) {
    //         let result: string = "";

    //         if (num >= 100000000000) {
    //             let strNum = Math.floor(num / 100000000);
    //             // if (strNum.indexOf(".00") >=0 ) {
    //             //     strNum = strNum.substring(0, strNum.indexOf(".00"));
    //             // }
    //             result = strNum + "B";
    //         } else if (num >= 100000000) {
    //             let strNum = Math.floor(num / 1000000);
    //             // if (strNum.indexOf(".00") >= 0) {
    //             //     strNum = strNum.substring(0, strNum.indexOf(".00"));
    //             // }
    //             result = strNum + "M";
    //         } else if (num >= 1000000) {
    //             let strNum = Math.floor(num / 1000);
    //             // if (strNum.indexOf(".00") >= 0) {
    //             //     strNum = strNum.substring(0, strNum.indexOf(".00"));
    //             // }
    //             result = strNum + "K";
    //         } else if (num >= 1000) {
    //             let strNum = Math.floor(num / 1000);
    //             // if (strNum.indexOf(".00") >= 0) {
    //             //     strNum = strNum.substring(0, strNum.indexOf(".00"));
    //             // }
    //             result = strNum + "K";
    //         } else {
    //             result = num.toString();
    //         }
    //         return result;
    //     }
    //     return "0";
    // }


    /**
     * 指定地方插入字符
     * @param str 原本内容
     * @param index 插入位置
     * @param addStr 添加内容
     */
    public static insertStr(str: string, index: number, addStr: string): string {
        return str.slice(0, index) + addStr + str.slice(index);
    }

}
