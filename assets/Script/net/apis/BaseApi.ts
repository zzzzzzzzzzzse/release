import AppPlatformConfig from "../../configs/AppPlatformConfig";
import { Constants } from "../../Constants";
import { MyCrpty } from "../../libs/MyCrpty";
import { StringUtil } from "../../tools/StringUtil";
import { HttpNet, IHttpHubRequest } from "../HttpNet";
import PostParameter from "../PostParameter";

/**
 * api基类
 */
export class BaseApi {
    //http请求操作
    protected static _httpNet: HttpNet = new HttpNet();
    //请求的功能路径
    static readonly _apiMethodKey: string = "apiMethod";

    /**
     * 获取请求参数
     * @param postData 请求参数
     * @returns 
     */
    public static getPostRequest(postData: PostParameter, istestnew: boolean = true): IHttpHubRequest {
        //追踪调试用
        let apiMethod = postData.getPostData(this._apiMethodKey);
        let postDataStr = postData.toRequestString();
        console.log("ApiMethod", apiMethod);
        let urlstr = Constants.getInstance().m_httpHost.getHostUrl();
        if (istestnew == true) {
            let testurlstr = AppPlatformConfig.TEST_HTTPURLJAVA
            return {
                url: testurlstr + "" + apiMethod,
                method: "POST",
                body: postDataStr,
            };
        } else {
            return {
                url: urlstr + "?reqmnasign=" + apiMethod,
                method: "POST",
                body: postDataStr,
            };
        }
    }


    /**
     * 设置wap动态参数
     * @param parmesList 请求参数
     */
    public static setWapParmes(parmesList: PostParameter) {
        if (parmesList != null) {
            if (!parmesList.isEmpty()) {
                parmesList.addPostData("wapSid", this.getWebViewParmes());
            }
        }
    }

    /**
     * 获取wapsid参数
     * @returns 
     */
    public static getWebViewParmes(): string {
        let wapsidStr: string = "";
        //设置ua
        wapsidStr += Constants.getInstance().native.getUserAgent() + "#";
        //用户id
        //todo uid
        wapsidStr += "0#";
        // wapsidStr += Constants.userProfile.uid + "#";
        //用户token
        // if(Constants.getInstance().tokenInfo){
        //     wapsidStr += Constants.getInstance().tokenInfo + "#";
        // }
        //屏分辨像素宽w*像素高h
        wapsidStr += Constants.getInstance().native.getScreenSizeOfDevice() + "#";
        //时区
        wapsidStr += new Date().getTimezoneOffset() / 60;
        return wapsidStr;
    }

    /**
     * 设置公共部分
     * @param parmesList 请求参数
     * @param tagKey 设置请求tag
     */
    public static setPublicSignParams(parmesList: PostParameter, tagKey: string) {
        if (parmesList != null) {
            if (!parmesList.isEmpty()) {
                let timeStr: string = new Date().getTime().toString();
                //随机串6-10位大小写英文数字
                parmesList.addPostData("nonce", StringUtil.createRandomNum(6));
                //毫秒级时间戳
                parmesList.addPostData("stemp", timeStr);
                parmesList.addPostData("sign", Constants.getInstance().native.version + tagKey);
            }
        }
        // console.log("^^^^^^^^^^",StringUtil.createRandomNum(6),Constants.getInstance().native.version + tagKey);
    }

    /**
    * 设置sign
    * @param parmesList 请求参数
    * @param signStr 特定签名
    */
    public static setSignParams(parmesList: PostParameter, signStr: string) {
        if (parmesList != null) {
            if (!parmesList.isEmpty()) {
                let timeStr: string = new Date().getTime().toString();
                //随机串6-10位大小写英文数字
                parmesList.addPostData("nonce", StringUtil.createRandomNum(6));
                //毫秒级时间戳
                parmesList.addPostData("stemp", timeStr);
                parmesList.addPostData("sign", MyCrpty.clientEncrypt(timeStr + signStr));
            }
        }
    }
}