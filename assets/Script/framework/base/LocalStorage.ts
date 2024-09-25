
/**
 * @description 本地数据存储
 */

type StorageVauleType = "number" | "string" | "boolean" | "object";
interface StorageData {
    type: StorageVauleType,
    value: string | number | boolean | object;
}

export class LocalStorage {

    private static _instance: LocalStorage = null;
    public static Instance() { return this._instance || (this._instance = new LocalStorage()); }

    private encrypt(obj : {}) {

        return 
        
    }

    private decryption(word) {
        return
    }

    public getItem(key: string, defaultValue: any = null) {
        let value = cc.sys.localStorage.getItem(key);
        if (value  && value!="undefined") {
            //解析
            try {
                let data = value;
                let result: StorageData = JSON.parse(data);
                if ( result.type ){
                    return result.value;
                }else{
                    return value;
                }
            } catch (error) {
                return value;   
            }
        }
        else {
            return defaultValue;
        }
    }

    public setItem(key: string, value: string | number | boolean | object) {

        let type = typeof value;
        if (type == "number" || type == "string" || type == "boolean" || type == "object") {
            let saveObj: StorageData = { type: type, value: value };
            //加密
            try {
                let data = JSON.stringify(saveObj);
                cc.sys.localStorage.setItem(key, data);
            } catch (error) {
                if ( CC_DEBUG ) cc.error(error);
            }
        } else {
            if (CC_DEBUG) cc.error(`lx: ${type}`);
        }
    }

    public removeItem(key: string) {
        cc.sys.localStorage.removeItem(key);
    }
}