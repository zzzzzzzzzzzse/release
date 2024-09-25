/**
 * 时间管理大师
 */
export default class DateTimerUtil {
    /**
     * 获取倒计时时间
     * @param time 
     * @returns 
     */
    public static timeCountDown(time: number): string {
        let str = "";
        if (time > 0) {
            let hs = "00";
            let ms = "00";
            let ss = "00";
            let s = time % 60;
            let m = Math.floor(time / 60) % 60;
            let h = Math.floor(Math.floor(time / 60) / 60);
            if (h > 99) {
                return "99:99:99";
            }
            if (h < 10) {
                hs = "0" + h;
            } else {
                hs = h + "";
            }
            if (m < 10) {
                ms = "0" + m;
            } else {
                ms = m + "";
            }
            if (s < 10) {
                ss = "0" + s;
            } else {
                ss = s + "";
            }
            str = hs + ":" + ms + ":" + ss;
        } else {
            str = "00:00:00";
        }
        return str;
    }


    public static timeCountDown2(value: number): string {
        let theTime = parseInt(String(value));// 需要转换的时间秒 
        let theTime1 = 0;// 分 
        let theTime2 = 0;// 小时 
        let theTime3 = 0;// 天
        if (theTime > 60) {
            theTime1 = parseInt(String(theTime / 60));
            theTime = parseInt(String(theTime % 60));
            if (theTime1 > 60) {
                theTime2 = parseInt(String(theTime1 / 60));
                theTime1 = parseInt(String(theTime1 % 60));
                if (theTime2 > 24) {
                    //大于24小时
                    theTime3 = parseInt(String(theTime2 / 24));
                    theTime2 = parseInt(String(theTime2 % 24));
                }
            }
        }
        var result = '';
        if (theTime >= 0) {
            if (theTime < 10) {
                result = "0" + parseInt(String(theTime));
            } else {
                result = "" + parseInt(String(theTime));
            }
        }
        if (theTime1 >= 0) {
            if (theTime1 < 10) {
                result = "0" + parseInt(String(theTime1)) + ":" + result;
            } else {
                result = "" + parseInt(String(theTime1)) + ":" + result;
            }
        }
        if (theTime2 >= 0) {
            if (theTime2 < 10) {
                result = "0" + parseInt(String(theTime2)) + ":" + result;
            } else {
                result = "" + parseInt(String(theTime2)) + ":" + result;
            }
        }

        if (theTime3 > 0) {
            result = "" + parseInt(String(theTime3)) + " DAYS";
        }
        // console.log("fORMatSeconds=",result)
        return result;
    }

    /**
     * 判断时间
     * @param date
     */
    public static getDayName(d: string) {
        let td = new Date();
        td = new Date(td.getFullYear(), td.getMonth(), td.getDate());

        let od = new Date(d);
        od = new Date(od.getFullYear(), od.getMonth(), od.getDate());

        let xc = (od.getTime() - td.getTime()) / 1000 / 60 / 60 / 24;
        if (xc < -2) {
            return 1; // 多少天前
        } else if (xc < -1) {
            return 2; //前天
        } else if (xc < 0) {
            return 3; //昨天
        } else if (xc == 0) {
            return 4; //今天
        } else if (xc < 2) {
            return 5; //明天
        } else if (xc < 3) {
            return 6; //后天
        }
    }


    static formatCustomCurrDate(formatStr) {
        let str = formatStr;
        let Week = ['日', '一', '二', '三', '四', '五', '六'];

        const date: Date = new Date();
        str = str.replace(/yyyy|YYYY/, date.getFullYear());
        let twoyear = Number((date.getFullYear() < 2000 ? date.getFullYear() + 1900 : date.getFullYear()).toString().substr(2, 2));
        str = str.replace(/yy|YY/, (twoyear % 100) > 9 ? (twoyear % 100).toString() : '0' + (twoyear % 100));

        str = str.replace(/MM/, (date.getMonth() + 1) > 9 ? (date.getMonth() + 1).toString() : '0' + (date.getMonth() + 1));
        str = str.replace(/M/g, (date.getMonth() + 1));


        str = str.replace(/w|W/g, Week[date.getDay()]);

        str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate());
        str = str.replace(/d|D/g, date.getDate());

        str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours());
        str = str.replace(/h|H/g, date.getHours());
        str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes());
        str = str.replace(/m/g, date.getMinutes());

        str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds());
        str = str.replace(/s|S/g, date.getSeconds());

        return str;
    }

    //将时间戳转化为时间
    static timestampToTime(timestamp) {
        let date = new Date(timestamp * 1000);//时间戳为10位需*1000，13位的话不需要
        let Y = date.getFullYear() + "-";
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = date.getDate() + " ";
        let H = date.getHours() + "";
        if (Number(D) < 10) {
            D = "0" + D + " ";
        } else {
            D = "" + D + " ";
        }
        if (Number(H) < 10) {
            H = "0" + H + ":";
        } else {
            H = "" + H + ":";
        }
        let MIN = date.getMinutes() + "";
        if (Number(MIN) < 10) {
            MIN = "0" + MIN + ":";
        } else {
            MIN = "" + MIN + ":";
        }
        let S = date.getSeconds() + "";
        if (Number(S) < 10) {
            S = "0" + S;
        } else {
            S = "" + S;
        }
        return Y + M + D + H + MIN + S;
    }


    /**
     * 判断天数
     * @param date
     */
    public static getDayLater(d: number): number {
        let td = Date.now();
        let timeDiff = td - d;
        let daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
        console.log("daysDiff=", daysDiff)
        return daysDiff
    }
}