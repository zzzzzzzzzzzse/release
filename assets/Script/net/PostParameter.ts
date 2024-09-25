import { Constants } from "../Constants";
import { MyCrpty } from "../libs/MyCrpty";

//POST数据列表
export default class PostParameter {
    /**
     * post数据的map列表
     */
    private m_list: Map<string, string> = null;


    constructor() {
        this.m_list = new Map();
    }

    /**
     * 获取对应key的item
     * @param key key值
     * @returns 
     */
    public getPostData(key: string): string {
        return this.m_list.get(key);
    }

    /**
     * 添加数据
     * @param key 
     * @param value 
     */
    public addPostData(key: string, value: string) {
        this.m_list.set(key, value);
    }

    /**
     * 转化成请求类型字符串
     */
    public toRequestString(): string {
        let requestString: string = "";
        if (this.m_list != null && this.m_list.size > 0) {
            this.m_list.forEach((value, key) => {
                requestString += key + "=" + encodeURIComponent(value) + "&";
            });
            //去掉最后的&
            // requestString = requestString.substr(0, requestString.length - 1); 
        }
        return requestString;
    }

    /**
     * 是否为空
     * @returns 
     */
    public isEmpty(): boolean {
        if (this.m_list == null || this.m_list.size < 1) {
            return true;
        }
        return false;
    }


    /**
     * map排序
     */
    public mapSort() {
        let keyItem = [];
        let valueItem = [];
        this.m_list.forEach((value, key) => {
            valueItem.push(value);
            keyItem.push(key);
        });
        let len = keyItem.length;
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len - i - 1; j++) {
                if (keyItem[j] > keyItem[j + 1]) {
                    let valueTemp = keyItem[j + 1];//交换元素  
                    keyItem[j + 1] = keyItem[j];
                    keyItem[j] = valueTemp;

                    let keyTemp = valueItem[j + 1];
                    valueItem[j + 1] = valueItem[j];
                    valueItem[j] = keyTemp;
                }
            }
        }
        this.m_list = new Map();
        for (let i = 0; i < len; i++) {
            this.addPostData(keyItem[i], valueItem[i]);
        }
    }

    /**
     * 生成参数签名并填充
     * @returns 
     */
    public adapterParamsSignature() {
        //先排序
        this.addPostData("tmuid", Constants.getInstance().m_LoginUserSession.getUserId());
        this.addPostData("tmtoken", Constants.getInstance().m_LoginUserSession.m_userToken);
        this.mapSort();
        let newSign: string = "";
        let oldSign: string = "";
        this.m_list.forEach((value, key) => {
            //判断是否有原来sgin
            if (key == "sign") {
                oldSign = value;
            } else {
                newSign += key + "=" + value;
            }
        });
        this.m_list.delete("tmuid");
        this.m_list.delete("tmtoken");

        //有sign的话直接加，没sign的话就生成
        if (oldSign != "") {
            newSign += oldSign;
            if (this.m_list.has("sign")) {
                this.m_list.delete("sign");
            }
            this.m_list.set("sign", MyCrpty.hmacEncrypt(newSign).toLowerCase());
        } else {
            this.m_list.set("sign", MyCrpty.hmacEncrypt(newSign).toLowerCase());
        }
        // let str:string = MyCrpty.hmacEncrypt(newSign).toLowerCase();
        // console.log("singjiami",newSign);
    }

    /**
     * 生成参数签名并填充
     * @returns 
     */
    public adapterParamsSignatureSession() {
        //先排序
        this.addPostData("tmuid", Constants.getInstance().m_LoginUserSession.getUserId());
        this.addPostData("tmtoken", Constants.getInstance().m_LoginUserSession.m_userToken);
        this.mapSort();
        let newSign: string = "";
        let oldSign: string = "";
        this.m_list.forEach((value, key) => {
            //判断是否有原来sgin
            if (key == "sign") {
                oldSign = value;
            } else {
                newSign += key + "=" + value;
            }
        });
        this.m_list.delete("tmuid");
        this.m_list.delete("tmtoken");

        //有sign的话直接加，没sign的话就生成
        if (oldSign != "") {
            newSign += oldSign;
            if (this.m_list.has("sign")) {
                this.m_list.delete("sign");
            }
            this.m_list.set("sign", MyCrpty.hmacEncryptSession(newSign).toLowerCase());
        } else {
            this.m_list.set("sign", MyCrpty.hmacEncryptSession(newSign).toLowerCase());
        }
    }
}
