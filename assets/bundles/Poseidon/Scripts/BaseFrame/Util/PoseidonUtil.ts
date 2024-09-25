
import PoseidonLanguageManager from "../Manager/PoseidonLanguageManager";
import PoseidonTimerManager from "../Manager/PoseidonTimerManager";
import PoseidonTipsManager from "../Manager/PoseidonTipsManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PoseidonUtil {
    public static test: boolean = false;
    private static serverTime: number = 0;//服务器时间
    private static timer: number = 0;//每秒时钟定时器
    /**
     * 深拷贝
     * @param data 
     * @returns 
     */
    public static deepClone(data) {
        let type = this.getDataType(data);
        let obj;
        if (type === 'array') {
            obj = [];
        } else if (type === 'object') {
            obj = {};
        } else {
            //不再具有下一层次
            return data;
        }
        if (type === 'array') {
            for (let i = 0, len = data.length; i < len; i++) {
                obj.push(this.deepClone(data[i]));
            }
        } else if (type === 'object') {
            for (let key in data) {
                obj[key] = this.deepClone(data[key]);
            }
        }
        return obj;
    }

    public static clone(value: any) {
        if (!value || typeof value != "object") {
            return value;
        }
        let out: any = value.contructor === Array ? [] : {}
        let _clone: Function = ((o: Object, c: any) => {
            for (let i in o) {
                if (o[i] && typeof o[i] === "object") {
                    if (o[i].contructor === Array) {
                        c[i] = []
                    }
                    else {
                        c[i] = {}
                    }
                    _clone(o[i], c[i]);
                }
                else {
                    c[i] = o[i]
                }
            }
            return c;
        })
        return _clone(value, out)
    }

    /**
     * 判断两个object内容是否相同
     * BETTER:判断方法不太好
     */
    public static isObjectValueEqual(a, b) {
        let aStr = JSON.stringify(a);
        let bStr = JSON.stringify(b);
        return (aStr == bStr);
    }

    /**
     * 获取数据类型
     * @param obj 
     * @returns 
     */
    public static getDataType(obj) {
        //tostring会返回对应不同的标签的构造函数
        let toString = Object.prototype.toString;
        let map = {
            '[object Boolean]': 'boolean',
            '[object Number]': 'number',
            '[object String]': 'string',
            '[object Function]': 'function',
            '[object Array]': 'array',
            '[object Date]': 'date',
            '[object RegExp]': 'regExp',
            '[object Undefined]': 'undefined',
            '[object Null]': 'null',
            '[object Object]': 'object'
        };
        return map[toString.call(obj)];
    }

    /**
     * 获取时间戳
     * @returns 
     */
    public static getTimeStamp() {
        let timeStamp = new Date().getTime();
        return timeStamp;
    }

    /**
     * 格式化短时间
     * timeStamp 时间戳，formate格式化字符串
     * 例如：formate为dd:hh:mm:ss 返回结果为xx:xx:xx:xx
     * 例如：formate为dd-hh-mm-ss 返回结果为xx-xx-xx-xx
     * frontZero,是否需要加前置0，为true时，5表示为05
     */
    public static formateShortTimeStamp(timeStamp: number, formate: string, frontZero: boolean = true): string {
        let sPer = 1000;
        let minPer = 60 * sPer;
        let hPer = 60 * minPer;
        let dPer = 24 * hPer;

        let h: any = frontZero ? '00' : '0';
        let min: any = frontZero ? '00' : '0';
        let s: any = frontZero ? '00' : '0';
        let d: any = '0';

        if (timeStamp >= dPer) {
            d = Math.floor(timeStamp / dPer) + '';
            frontZero && (d = (d < 10 ? '' : '') + d);
            timeStamp %= dPer;
        }
        if (timeStamp >= hPer) {
            h = Math.floor(timeStamp / hPer) + '';
            frontZero && (h = (h < 10 ? '0' : '') + h);
            timeStamp %= hPer;
        }
        if (timeStamp >= minPer) {
            min = Math.floor(timeStamp / minPer) + '';
            frontZero && (min = (min < 10 ? '0' : '') + min);
            timeStamp %= minPer;
        }
        if (timeStamp >= sPer) {
            s = Math.floor(timeStamp / sPer) + '';
            frontZero && (s = (s < 10 ? '0' : '') + s);
        }

        formate = formate.replace('[dd]', d);
        formate = formate.replace('[hh]', h);
        formate = formate.replace('[mm]', min);
        formate = formate.replace('[ss]', s);
        return formate;
    }

    /**
     * 格式化短时间
     * timeStamp 时间戳，formate格式化字符串
     * 例如：timeStamp为10000，formate为YY-MM-DD hh:mm:ss 返回结果为xx-xx-xx xx:xx:xx
     * 例如：timeStamp为10000，formate为YY-MM-DD hh-mm-ss 返回结果为xx-xx-xx xx-xx-xx
     */
    public static formateLongTimeStamp(timeStamp: number, formate: string): string {
        let date = new Date(timeStamp);
        let y = date.getFullYear().toString();
        let month: any = date.getMonth() + 1;
        month = (month < 10 ? '0' : '') + month;
        let d: any = date.getDate().toString();
        d = (d < 10 ? '0' : '') + d;

        let h: any = date.getHours();
        h = (h < 10 ? '0' : '') + h;
        let min: any = date.getMinutes();
        min = (min < 10 ? '0' : '') + min;
        let s: any = date.getSeconds().toString();
        s = (s < 10 ? '0' : '') + s;

        formate = formate.replace('YY', y);
        formate = formate.replace('MM', month);
        formate = formate.replace('DD', d);
        formate = formate.replace('hh', h);
        formate = formate.replace('mm', min);
        formate = formate.replace('ss', s);
        return formate;
    }

    /**
     * 获取英语日期
     */
    public static getEnglishDate(timeStamp: number): string {
        let date = new Date(timeStamp);
        const month: number = date.getMonth();
        const day: number = date.getDate();
        const monthStrArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        const dayStrArr = ['st', 'nd', 'rd', 'th'];
        const monthStr = monthStrArr[month];
        const dayStr = day + (dayStrArr[day - 1] || 'th');
        return monthStr + '.' + dayStr;
    }

    /**
     * 获取范围内随机整数
     * @param min 最小数（含这个数）
     * @param max 最大数（含这个数）
     */
    public static getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * 格式化为货币格式
     */
    public static formateCoinStr(num: number): string {
        const str = (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
        return str;
    }

    /**
    * 将传入的数字处理为保留XX位小数
    * @param num 待处理的数
    * @param bit 位数
    * @param isRounding 是否四舍五入
    */
    public static getFloatToFixed(num: number, bit: number = 1, isRounding = true) {
        if (!num) {
            return 0
        }
        if (isRounding) {
            return parseFloat(num.toFixed(bit));
        }
        else {
            if (bit == 0) {
                return Math.floor(num);
            }
            else {
                return Math.floor(num * Math.pow(10, bit)) / Math.pow(10, bit);
            }
        }
    }

    /**
    * 将传入的数字处理为向上保留XX位小数
    * @param num 待处理的数
    */
    public static getFloatToCelil(num: number, bit: number = 1): number {
        if (!num) {
            return 0;
        }
        return Math.ceil(num * Math.pow(10, bit)) / Math.pow(10, bit);
    }

    /**
     * 把16进制颜色转换成RGB颜色
     * @param hex 
     * @returns 
     */
    public static hexToRGB(hex: number): { r: number, g: number, b: number } {
        let color = {
            r: (hex & 0xFF0000) >> 16,
            g: (hex & 0xFF00) >> 8,
            b: (hex & 0xFF)
        }
        return color;
    }

    /**
     * 错误码提示
     */
    public static printErrorCode(errorCode: number): void {
        const str = PoseidonLanguageManager.instance.getLanguageStringById('' + errorCode);
        if (!str) {
            PoseidonTipsManager.instance.showTips(errorCode + 'Error code is not defined');
            return;
        }
        PoseidonTipsManager.instance.showTips(str);
    }

    /**
     * 遍历查找子节点
     * @param name 目标节点名字
     * @param node 父节点（默认是从Canvas开始找）
     * @returns 返回找到的第一个节点
     */
    public static seekNodeByName(name: string, node?: cc.Node): cc.Node {
        if (node == undefined || node == null) {
            node = cc.find("Canvas");
        }
        if (node.name == name) {
            return node;
        }
        let childrenArr = node.children;
        let tmpLength = childrenArr.length;
        for (let i = 0; i < tmpLength; i++) {
            let child = childrenArr[i];
            if (child != undefined && child != null) {
                let res = this.seekNodeByName(name, child);
                if (res != undefined && res != null) {
                    return res;
                }
            }
        }
        return null;
    }

    /**
     * 格式化为货币格式2
     * @param num 需要格式化的数字字符串（只能传整数）
     * @param bit 保留小数位数（默认2位）
     * @param isShowZero 是否要展示小数位最后的零（默认不展示）
     * @param unitBit 展示货币单位的最小位数(默认4位)
     * @param isShowSeparator 是否展示货币分割符(默认不展示)
     * @returns 
     */
    public static formateCoinStrTwo(num: string, bit: number = 2, isShowZero: boolean = false, unitBit: number = 4, isShowSeparator: boolean = false): string {
        let allLength = num.length;//总长度
        let endIndex = allLength;//截取的终点下标
        let temp = num;//复制一份
        let symbol = "";//结尾计量单位
        let kNum = 3, mNum = 6, bNum = 9, tNum = 12, Qnum = 15;
        let byteNum = 0;//限制位数记录
        let tempBit = bit;//复制一份位数
        //如果不需要展示单位
        if (allLength < unitBit) {
            if (isShowSeparator) {
                return this.formateCoinStr(parseInt(num));
            }
            else {
                return num;
            }
        }
        // 判断KMBTQ
        if (allLength > Qnum) {
            byteNum = Qnum;
            symbol = "Q";
        }
        else if (allLength > tNum) {
            byteNum = tNum;
            symbol = "T";
        }
        else if (allLength > bNum) {
            byteNum = bNum;
            symbol = "B";
        }
        else if (allLength > mNum) {
            byteNum = mNum;
            symbol = "M";
        }
        else if (allLength > kNum) {
            byteNum = kNum;
            symbol = "K";
        }
        //计算字符串截取终点下标
        endIndex = allLength - byteNum;
        //小数位不能超过限制位
        if (tempBit > byteNum) {
            tempBit = byteNum;
        }
        //加上小数位
        if (allLength > kNum) {
            endIndex += tempBit;
        }
        //截取
        temp = temp.substring(0, endIndex);
        //在对应位数加小数点
        temp = temp.slice(0, temp.length - tempBit) + "." + temp.slice(temp.length - tempBit);
        //判断是否需要展示小数位最后的零
        if (!isShowZero) {
            for (let index = 0; index < tempBit; index++) {
                if (temp[temp.length - 1] == "0") {
                    temp = temp.slice(0, temp.length - 1);
                }
            }
        }
        else {
            //检测是否需要补0
            let pointIndex = temp.indexOf(".");
            let addCount = bit - (temp.length - pointIndex - 1);
            for (let index = 0; index < addCount; index++) {
                temp += "0";
            }
        }
        //如果最后一位是小数点，则删掉
        if (temp[temp.length - 1] == ".") {
            temp = temp.slice(0, temp.length - 1);
        }
        return (temp + symbol);
    }

    /**
     * 格式化可替换的字符，flag为需要替换的字符串
     */
    public static formateReplaceChar(str: string, datas: any[]): string {
        for (let i = 0; i < datas.length; i++) {
            const type = typeof datas[i];
            if (type != 'string' && type != 'number') {
                continue;
            }
            const flag = type == 'string' ? '{%s}' : '{%d}';
            str = str.replace(flag, '' + datas[i]);
        }
        return str;
    }

    /**
     * 验证邮箱是否合法
     */
    public static validateEmail(str: string): boolean {
        const reg = /^(([^()[\]\\.,;:\s@\"]+(\.[^()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        str = this.trim(str);
        return reg.test(str);
    }

    /**
     * 去除字符串前后空格
     */
    public static trim(str: string): string {
        str = str.replace(/(^\s*)|(\s*$)/g, "");
        return str;
    }

    /**
     * 检测是否有特殊字符
     */
    public static checkHaveSpecialChar(str: string): boolean {
        const reg = /[<>]/gi;
        return reg.test(str);
    }

    /**
     * 检测字符串当中是否含有表情
     */
    public static checkHaveEmoji(str: string): boolean {
        for (let i = 0; i < str.length; i++) {
            let hs = str.charCodeAt(i);
            if (0xd800 <= hs && hs <= 0xdbff) {
                if (str.length > 1) {
                    let ls = str.charCodeAt(i + 1);
                    let uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
                    if (0x1d000 <= uc && uc <= 0x1f77f) {
                        return true;
                    }
                }
            } else if (str.length > 1) {
                let ls = str.charCodeAt(i + 1);
                if (ls == 0x20e3) {
                    return true;
                }
            } else {
                if (0x2100 <= hs && hs <= 0x27ff) {
                    return true;
                }
                else if (0x2B05 <= hs && hs <= 0x2b07) {
                    return true;
                }
                else if (0x2934 <= hs && hs <= 0x2935) {
                    return true;
                }
                else if (0x3297 <= hs && hs <= 0x3299) {
                    return true;
                }
                else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030 ||
                    hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b ||
                    hs == 0x2b50) {
                    return true;
                }
            }
        }
    }

    // 截取字符串，尾部加...，主要用于处理名字超长的情况
    public static cutShortWidthStr(label: cc.Label, maxLength = 50, startNum: number = 10, add: boolean = false) {
        let tmpStr = "";
        const tempLabel = label as any;
        tempLabel._forceUpdateRenderData(true);
        label.node.opacity = 0;
        if (label.node.width > maxLength) {
            const str = label.string;
            // let curStr = str.replace(/\./g, '') + '...';
            tmpStr = str.substring(0, startNum - 1) + '...';
            label.string = tmpStr;
            this.cutShortWidthStr(label, maxLength, --startNum, true);
            return;
        }
        if (add) {
            let curStr = label.string.replace(/\./g, '') + '...';
            label.string = curStr;
        }
        label.node.opacity = 255;
    }

    // 截取字符串，尾部加...，主要用于处理名字超长的情况
    public static cutShortHeightStr(label: cc.Label, maxHeight = 50) {
        let tmpStr = "";
        const tempLabel = label as any;
        tempLabel._forceUpdateRenderData(true);
        if (label.node.height > maxHeight) {
            while (label.node.height > maxHeight) {
                let curStr = label.string + "..."
                tmpStr = curStr.substring(0, curStr.length - 1 - 3)
                label.string = tmpStr;
                tempLabel._forceUpdateRenderData(true);
            }
            tmpStr = tmpStr.substring(0, tmpStr.length - 3);
            label.string = tmpStr + "...";
        }
    }

    /**
     * 获取服务器时间
     */
    public static getServerTime(): number {
        return this.serverTime;
    }

    /**
     * 同步服务器时间
     * @param timeStamp 时间戳
     */
    public static setServerTime(timeStamp: number): void {
        this.serverTime = timeStamp;
        const time = 1;
        PoseidonTimerManager.instance.clearTimeout(this.timer);
        this.timer = PoseidonTimerManager.instance.setTimeOut(() => {
            this.setServerTime(timeStamp + time * 1000);
        }, time);
    }

    /**
     * 检查功能是否开启
     */
    public static checkFunctionOpen(funcId: number, showTips: boolean = true): boolean {

        return true;
    }

    public static isLongScreen(): boolean {
        const size = cc.view.getVisibleSize();
        const scale = size.width / size.height;
        return scale >= 1.8;
    }

    /**
     * 判断一段字符串中某字符出现的个数
     * @param str 字符串
     * @param char 字符
     * @returns 
     */
    public static getCharCount(str, char) {
        var regex = new RegExp(char, 'g'); // 使用g表示整个字符串都要匹配
        var result = str.match(regex); //match方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。
        var count = !result ? 0 : result.length;
        return count;
    }

    /**
     * 
     * @param fileName 只是文件名，并不是路径
     */
    public static getEncodeFileName(path: string): string {
        const arr = path.split('/');
        const fileName = arr[arr.length - 1];
        let encodeName = '';
        let startCode = 32;
        for (let i = 0; i < fileName.length; i++) {
            if (fileName[i] == '.') {
                encodeName += '.';
                continue;
            }
            const charCode = fileName.charCodeAt(i);
            const newCharCode = charCode - startCode;
            encodeName += newCharCode;
        }
        const result = path.replace(fileName, encodeName);
        return result;
    }

}
window['Util'] = PoseidonUtil;
