import { Constants } from "../Constants";
import CryptoJS = require("./cryptoJS/crypto-js");

/**
 * 数据加解密处理
 */
export class MyCrpty {
    /**
     * hmac加密
     * @param msg 明文
     * @returns 
     */
    public static hmacEncrypt(msg: string): string{
        let hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, Constants.getInstance().crptyConfig.m_clientKey)
        let encryptStr = hmacHasher.finalize(msg);
        //转成输出格式
        return encryptStr.toString(CryptoJS.enc.Hex);
    }  
    
    /**
     * hmac加密
     * @param msg 明文
     * @returns 
     */
     public static hmacEncryptSession(msg: string): string{
        let hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, Constants.getInstance().crptyConfig.m_clientSessionKey)
        let encryptStr = hmacHasher.finalize(msg);
        //转成输出格式
        return encryptStr.toString(CryptoJS.enc.Hex);
    }   

    /**
     * 客户端本地数据加密
     * @param msg 明文
     * @param session 登录后(默认静态)
     * @returns 
     */
    public static clientEncrypt(msg: string, session=0): string{
        if(session == 1){
            //登录后加密
            let encrypted = CryptoJS.AES.encrypt(msg, CryptoJS.enc.Utf8.parse(Constants.getInstance().crptyConfig.m_clientSessionKey),{
                iv : CryptoJS.enc.Utf8.parse(Constants.getInstance().crptyConfig.m_Loginiv),
                mode : CryptoJS.mode.CBC,
                padding : CryptoJS.pad.Pkcs7
                });
            return encrypted.toString();
        }else{
            //非登录后加密
            let encrypted = CryptoJS.AES.encrypt(msg, CryptoJS.enc.Utf8.parse(Constants.getInstance().crptyConfig.m_clientKey),{
                iv : CryptoJS.enc.Utf8.parse(Constants.getInstance().crptyConfig.m_iv),
                mode : CryptoJS.mode.CBC,
                padding : CryptoJS.pad.Pkcs7
                });
            return encrypted.toString();
        }
    }


    /**
     * 客户端本地数据加密
     * @param msg 明文
     * @param session 登录后(默认静态)
     * @returns 
     */
    public static clientEncryptTest(): string{
        //登录后加密
        let test1 = this.base64_decode_url_safe("hiEzUsHo6AIiKL1CuxAobtYla-Irr6QtWBD5f66viQl9vtEPahJKHhNrdRz21oQU")
        let decrypt = CryptoJS.AES.decrypt(test1, CryptoJS.enc.Utf8.parse(Constants.getInstance().crptyConfig.m_clientKey),{
            iv : CryptoJS.enc.Utf8.parse(Constants.getInstance().crptyConfig.m_iv),
            mode : CryptoJS.mode.CBC,
            padding : CryptoJS.pad.Pkcs7
            });
        return decrypt.toString(CryptoJS.enc.Utf8);
    }

    /**
     * 客户端本地数据解密
     * @param msg 密文
     * @param session 登录后(默认静态)
     * @returns 
     */
    public static clientDecrypt(msg: string, session=0): string{
        if(msg){
            if(session == 1){
                //登录后解密
                let decrypt = CryptoJS.AES.decrypt(this.base64_decode_url_safe(msg), CryptoJS.enc.Utf8.parse(Constants.getInstance().crptyConfig.m_clientSessionKey),{
                    iv : CryptoJS.enc.Utf8.parse(Constants.getInstance().crptyConfig.m_Loginiv),
                    mode : CryptoJS.mode.CBC,
                    padding : CryptoJS.pad.Pkcs7
                    });
                return decrypt.toString(CryptoJS.enc.Utf8);
            }else{
                //非登录后解密
                let decrypt = CryptoJS.AES.decrypt(this.base64_decode_url_safe(msg), CryptoJS.enc.Utf8.parse(Constants.getInstance().crptyConfig.m_clientKey),{
                    iv : CryptoJS.enc.Utf8.parse(Constants.getInstance().crptyConfig.m_iv),
                    mode : CryptoJS.mode.CBC,
                    padding : CryptoJS.pad.Pkcs7
                    });
                return decrypt.toString(CryptoJS.enc.Utf8);
            }
        }else{
            return "";
        }
    }

    /**
     * base加密
     * @param msg 明文
     * @returns 
     */
    public static base64Encrypt(msg: string): string{
        return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(msg));
    }


    /**
     * base64解密
     * @param msg 密文
     * @returns 
     */
    public static base64Decrypt(msg: string): string{
        return CryptoJS.enc.Base64.parse(msg).toString(CryptoJS.enc.Utf8);
    } 

    /**
     * 浏览器安全信息
     * @param msg 
     * @returns 
     */
    public static base64_decode_url_safe(msg: string): string {
        var base64 = msg.replace("-", "+").replace("_", "/");
        var mod = base64.length % 4;
        if(mod > 0)
            base64 += "====".substring(mod);
        return base64;
    }

    /**
     * MD5加密
     * @param msg 明文
     * @returns 
     */
    public static md5Encrypt(msg: string): string{
        return CryptoJS.MD5(msg).toString();
    }

    /**
     * sha1加密
     * @param msg 明文
     * @returns 
     */
    public static sha1Encrypt(msg: string): string{
        return String(CryptoJS.SHA1(msg));
    }
}
