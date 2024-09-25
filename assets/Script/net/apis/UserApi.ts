import AppPlatformConfig from "../../configs/AppPlatformConfig";
import { Constants } from "../../Constants";
import { MyCrpty } from "../../libs/MyCrpty";
import EmailItemModel from "../../models/EmailItemModel";
import ThirdPartyLoginParam from "../../models/param/ThirdPartyLoginParam";
import TouristLoginParam from "../../models/param/TouristLoginParam";
import { UserLoginParam } from "../../models/param/UserLoginParam";
import SignItemModel, { SignInAtts } from "../../models/SignItemModel";
import SignModel from "../../models/SignModel";
import { UserInfoModel } from "../../models/UserInfoModel";
import { UserSafeAuth } from "../../models/UserSafeAuth";
import UserSelfInfo from "../../models/UserSelfInfo";
import AnalyticsTool, { AnalyticsEventEnmu } from "../../tools/log/AnalyticsTool";
import { OperateJson } from "../../tools/OperateJson";
import { LocalStorageTool } from "../../tools/storage/LocalStorageTool";
import { StringUtil } from "../../tools/StringUtil";
import { CommonResult } from "../CommonResult";
import PostParameter from "../PostParameter";
import { RequestCallBackInfo } from "../RequestCallBackInfo";
import { BaseApi } from "./BaseApi";

/**
 * 用户接口调用
 */
export default class UserApi extends BaseApi {
    /**
     * 用户快速注册
     * @param params 请求参数
     * @returns
     */
    public static async touristLogin(params: TouristLoginParam): Promise<CommonResult<any>> {
        let httpResult: CommonResult<any> = new CommonResult<any>();
        let timeStr: string = new Date().getTime().toString();
        //创建请求参数
        let postDataList: PostParameter = new PostParameter();
        //设置wapsid
        this.setWapParmes(postDataList);

        postDataList.addPostData("signName", MyCrpty.clientEncrypt(params.m_signName + "@" + timeStr));

        postDataList.addPostData("udid", params.m_udid);
        if (params.m_siCode) {
            postDataList.addPostData("siCode", params.m_siCode);
        }
        if (params.m_siSource) {
            postDataList.addPostData("siSource", MyCrpty.base64Encrypt(params.m_siSource));
        }

        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS) {
            postDataList.addPostData("imei", params.m_imei);
            postDataList.addPostData("imsi", params.m_imsi);
        }
        let signMac = "";
        if (params.m_mac) {
            signMac = params.m_mac;
            postDataList.addPostData("mac", params.m_mac);
        }
        postDataList.addPostData("idfa", params.m_idfa);
        if (params.m_token) {
            postDataList.addPostData("token", params.m_token);
        }

        postDataList.addPostData(this._apiMethodKey, "user/tourist");
        //设置公共参数
        //随机串6-10位大小写英文数字
        postDataList.addPostData("nonce", StringUtil.createRandomStr(5));
        //毫秒级时间戳
        postDataList.addPostData("stemp", timeStr);
        postDataList.addPostData("sign", params.m_udid + signMac + timeStr + params.m_signName + Constants.getInstance().native.version + "reg");
        postDataList.adapterParamsSignature();

        for (let i in postDataList) {
            // console.log(i + " = ",postDataList[i]);
        }

        let result: RequestCallBackInfo = await this._httpNet.runHttp(this.getPostRequest(postDataList));

        let data = [];
        for (let i in result) {
            data.push(i + "=" + result[i]);
        }
        // console.log(data.join("&&"))
        if (result.m_requestStatus) {
            //判断是否是200
            if (result.checkServerCmdStatus()) {
                //获取结果
                let jsonObj = result.getServerResult();
                if (jsonObj) {
                    //用户ID
                    let uid = OperateJson.getString(jsonObj, "uid");
                    Constants.getInstance().m_LoginUserSession.m_uid = uid;
                    //会话TOKEN
                    let token = OperateJson.getString(jsonObj, "token");
                    Constants.getInstance().m_LoginUserSession.m_userToken = token;
                    //注册完成状态
                    let regStep = OperateJson.getNumber(jsonObj, "regStep");
                    //临时会话密码
                    let authToken = OperateJson.getString(jsonObj, "authToken");
                    //登录后的会话密匙
                    let clientSign = OperateJson.getString(jsonObj, "clientSign");
                    Constants.getInstance().crptyConfig.m_clientSessionKey = MyCrpty.clientDecrypt(clientSign);
                    //邀请码
                    let invCode = OperateJson.getString(jsonObj, "invCode");

                    //设置登录信息
                    let userLoginInfo: UserSelfInfo = new UserSelfInfo();
                    userLoginInfo.m_userName = uid;
                    userLoginInfo.m_password = authToken;
                    LocalStorageTool.setLoginserInfo(userLoginInfo);
                    httpResult.data = uid;
                    httpResult.data2 = authToken;
                    httpResult.code = result.getServerCmdCode();
                    httpResult.msg = result.getServerContent();
                    httpResult.succ = true;
                    return httpResult;
                }
            }
        } else {
            //失败
            result = null;
        }
        // httpResult.code = result.getServerCmdCode();
        // httpResult.msg = result.getServerContent();
        httpResult.succ = false;
        return httpResult;
    }

    /**
     * 用户登录
     * @param params 请求参数
     * @returns
     */
    public static async userLogin(params: UserLoginParam): Promise<CommonResult<any>> {
        let httpResult: CommonResult<any> = new CommonResult<any>();
        let timeStr: string = new Date().getTime().toString();
        let postDataList: PostParameter = new PostParameter();
        this.setWapParmes(postDataList);

        postDataList.addPostData("name", params.m_name);
        postDataList.addPostData("cmdModel", MyCrpty.clientEncrypt(params.m_cmdModel));
        postDataList.addPostData("pwd", MyCrpty.clientEncrypt(params.m_pwd + "@" + timeStr));
        //手机模式需要区号
        if (params.isPhonecodeModel() && params.m_prefix) {
            postDataList.addPostData("prefix", params.m_prefix);
        }
        postDataList.addPostData("udid", params.m_udid);
        if (params.m_token) {
            postDataList.addPostData("token", params.m_token);
        }
        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS) {
            postDataList.addPostData("imei", params.m_imei);
            postDataList.addPostData("imsi", params.m_imsi);
        }
        postDataList.addPostData("idfa", params.m_idfa);
        let signMac = "";
        if (params.m_mac) {
            signMac = params.m_mac;
            postDataList.addPostData("mac", params.m_mac);
        }
        postDataList.addPostData("bgAuth", String(params.m_bgAuth));

        postDataList.addPostData(this._apiMethodKey, "user/login");
        //设置公共参数
        //随机串6-10位大小写英文数字
        postDataList.addPostData("nonce", StringUtil.createRandomStr(5));
        //毫秒级时间戳
        postDataList.addPostData("stemp", timeStr);
        postDataList.addPostData("sign", params.m_udid + signMac + timeStr + params.m_name + params.m_pwd + Constants.getInstance().native.version + "login");
        postDataList.adapterParamsSignature();

        let result: RequestCallBackInfo = await this._httpNet.runHttp(this.getPostRequest(postDataList));
        if (result.m_requestStatus) {
            //判断是否是200
            if (result.checkServerCmdStatus()) {
                //获取结果
                let jsonObj = result.getServerResult();
                if (jsonObj) {
                    //用户ID
                    let uid = OperateJson.getString(jsonObj, "uid");
                    Constants.getInstance().m_LoginUserSession.m_uid = uid;

                    //会话TOKEN
                    let token = OperateJson.getString(jsonObj, "token");
                    Constants.getInstance().m_LoginUserSession.m_userToken = token;
                    //注册完成状态
                    let regStep = OperateJson.getNumber(jsonObj, "regStep");
                    if (regStep === 1) {
                        AnalyticsTool.logEvent(AnalyticsEventEnmu.login_guest);
                    }
                    //临时会话密码
                    let authToken = OperateJson.getString(jsonObj, "authToken");
                    Constants.getInstance().m_LoginUserSession.m_authToken = authToken;
                    //登录后的会话密匙
                    let clientSign = OperateJson.getString(jsonObj, "clientSign");
                    Constants.getInstance().crptyConfig.m_clientSessionKey = MyCrpty.clientDecrypt(clientSign);
                    //邀请码
                    let invCode = OperateJson.getString(jsonObj, "invCode");

                    //设置登录信息
                    let userLoginInfo: UserSelfInfo = new UserSelfInfo();
                    userLoginInfo.m_userName = uid;
                    userLoginInfo.m_password = authToken;
                    LocalStorageTool.setLoginserInfo(userLoginInfo);
                    httpResult.code = result.getServerCmdCode();
                    httpResult.msg = result.getServerContent();
                    httpResult.succ = true;
                    return httpResult;
                }
            } else {
                //失败
                result = null;
            }
        }
        // httpResult.code = result.getServerCmdCode();
        // httpResult.msg = result.getServerContent();
        httpResult.succ = false;
        return httpResult;
    }

    /**
     * 第三方登陆
     * @param params 请求参数
     * @returns
     */
    public static async thirdPartyLogin(param: ThirdPartyLoginParam): Promise<CommonResult<any>> {
        let httpResult: CommonResult<any> = new CommonResult<any>();
        let postDataList: PostParameter = new PostParameter();
        this.setWapParmes(postDataList);

        postDataList.addPostData("method", param.m_method);
        postDataList.addPostData("oaType", "openApp");

        postDataList.addPostData("udid", Constants.getInstance().m_phoneModel.UDID);
        postDataList.addPostData("openId", MyCrpty.clientEncrypt(param.m_openId));
        postDataList.addPostData("valCode", MyCrpty.clientEncrypt(param.m_valCode));
        if (!StringUtil.isEmpty(param.m_valAppId)) {
            postDataList.addPostData("valAppId", MyCrpty.clientEncrypt(param.m_valAppId));
        }


        if (!StringUtil.isEmpty(param.m_fullName)) {
            postDataList.addPostData("fullName", MyCrpty.clientEncrypt(param.m_fullName));
        }
        if (!StringUtil.isEmpty(param.m_email)) {
            postDataList.addPostData("email", MyCrpty.clientEncrypt(param.m_email));
        }

        postDataList.addPostData(this._apiMethodKey, "user/thirdPartyLogin");
        //设置公共参数
        this.setPublicSignParams(postDataList, "login");
        postDataList.adapterParamsSignature();

        let result: RequestCallBackInfo = await this._httpNet.runHttp(this.getPostRequest(postDataList));
        console.error("disanfangdenglu,", JSON.stringify(result));
        if (result.m_requestStatus) {
            //判断是否是200
            if (result.checkServerCmdStatus()) {
                //获取结果
                let jsonObj = result.getServerResult();
                if (jsonObj) {
                    //用户ID
                    let uid = OperateJson.getString(jsonObj, "uid");
                    Constants.getInstance().m_LoginUserSession.m_uid = uid;
                    //会话TOKEN
                    let token = OperateJson.getString(jsonObj, "token");
                    Constants.getInstance().m_LoginUserSession.m_userToken = token;
                    //注册完成状态
                    let regStep = OperateJson.getNumber(jsonObj, "regStep");
                    //临时会话密码
                    let authToken = OperateJson.getString(jsonObj, "authToken");
                    Constants.getInstance().m_LoginUserSession.m_authToken = authToken;
                    //登录后的会话密匙
                    let clientSign = OperateJson.getString(jsonObj, "clientSign");
                    Constants.getInstance().crptyConfig.m_clientSessionKey = MyCrpty.clientDecrypt(clientSign);
                    //邀请码
                    let invCode = OperateJson.getString(jsonObj, "invCode");

                    //设置登录信息
                    let userLoginInfo: UserSelfInfo = new UserSelfInfo();
                    userLoginInfo.m_userName = uid;
                    userLoginInfo.m_password = authToken;
                    userLoginInfo.m_method = param.m_method;
                    if (param.m_method == "oafb") {
                        // userLoginInfo.m_headurl = param.m_headerUrl;
                        if (AppPlatformConfig.ISOPENFBIMG) {
                            userLoginInfo.m_headurl = param.m_headerUrl;
                        } else {
                            userLoginInfo.m_headurl = "";
                        }
                    } else {
                        userLoginInfo.m_headurl = "";
                    }
                    LocalStorageTool.setLoginserInfo(userLoginInfo);
                    httpResult.code = result.getServerCmdCode();
                    httpResult.msg = result.getServerContent();
                    httpResult.succ = true;
                    return httpResult;
                }
            } else {
                //失败
                httpResult.code = result.getServerCmdCode();
                httpResult.msg = result.getServerContent();
                httpResult.succ = false;
                return httpResult;
            }
        }
        // httpResult.code = result.getServerCmdCode();
        // httpResult.msg = result.getServerContent();
        httpResult.succ = false;
        return httpResult;
    }

    /**
     * 第三方绑定
     * @param params 请求参数
     * @returns
     */
    public static async bindingThirdParty(param: ThirdPartyLoginParam): Promise<CommonResult<any>> {
        let httpResult: CommonResult<any> = new CommonResult<any>();
        let postDataList: PostParameter = new PostParameter();
        this.setWapParmes(postDataList);

        postDataList.addPostData("method", param.m_method);
        postDataList.addPostData("oaType", "openApp");

        postDataList.addPostData("udid", Constants.getInstance().m_phoneModel.UDID);
        postDataList.addPostData("openId", MyCrpty.clientEncrypt(param.m_openId));
        postDataList.addPostData("valCode", MyCrpty.clientEncrypt(param.m_valCode));
        postDataList.addPostData("valAppId", MyCrpty.clientEncrypt(param.m_valAppId));

        if (!StringUtil.isEmpty(param.m_fullName)) {
            postDataList.addPostData("fullName", MyCrpty.clientEncrypt(param.m_fullName));
        }
        if (!StringUtil.isEmpty(param.m_email)) {
            postDataList.addPostData("email", MyCrpty.clientEncrypt(param.m_email));
        }

        postDataList.addPostData(this._apiMethodKey, "user/bindingThirdParty");
        //设置公共参数
        this.setPublicSignParams(postDataList, "third");
        postDataList.adapterParamsSignatureSession();
        console.log("body", JSON.stringify(param));
        let result: RequestCallBackInfo = await this._httpNet.runHttp(this.getPostRequest(postDataList));
        let data2 = [];
        for (let i in result) {
            data2.push(i + "=" + result[i]);
        }
        console.log("bbbbbbbbbb", data2.join("&&"));
        console.log("bbbbbbbbbb", JSON.stringify(result));
        if (result.m_requestStatus) {
            result.formatiGiveResult();
            //判断是否是200
            if (result.checkServerCmdStatus()) {
                if (param.isFacebook()) {
                    AnalyticsTool.logEvent(AnalyticsEventEnmu.login_facebook);
                } else if (param.isApple()) {
                    AnalyticsTool.logEvent(AnalyticsEventEnmu.login_apple);
                }
                AnalyticsTool.clickLogin();
                httpResult.code = result.getServerCmdCode();
                httpResult.msg = result.getServerContent();
                httpResult.succ = true;
                return httpResult;
                //获取结果
                // let jsonObj = result.getServerResult();
                // let data = [];
                // for(let i in jsonObj){
                //     data.push(i+"="+jsonObj[i]);
                // }
                // console.log("ddddenglu",data.join("&&"));
                // if (jsonObj) {
                //     //用户ID
                //     let uid = OperateJson.getString(jsonObj, "uid");
                //     Constants.getInstance().m_LoginUserSession.m_uid = uid;
                //     LocalStorageTool.setUserUid(String(uid));
                //     //会话TOKEN
                //     let token = OperateJson.getString(jsonObj, "token");
                //     Constants.getInstance().m_LoginUserSession.m_userToken = token;
                //     //注册完成状态
                //     let regStep = OperateJson.getNumber(jsonObj, "regStep");
                //     //临时会话密码
                //     let authToken = OperateJson.getString(jsonObj, "authToken");
                //     Constants.getInstance().m_LoginUserSession.m_authToken = authToken;
                //     LocalStorageTool.setUserAuthToken(authToken);
                //     //登录后的会话密匙
                //     let clientSign = OperateJson.getString(jsonObj, "clientSign");
                //     Constants.getInstance().crptyConfig.m_clientSessionKey = MyCrpty.clientDecrypt(clientSign);
                //     //邀请码
                //     let invCode = OperateJson.getString(jsonObj, "invCode");
                //     AnalyticsTool.logEvent(AnalyticsEventEnmu.login_facebook);
                //     AnalyticsTool.clickLogin();
                //     httpResult.code = result.getServerCmdCode();
                //     httpResult.msg = result.getServerContent();
                //     httpResult.succ = true;
                //     return httpResult;
                // }
            } else {
                //失败
                httpResult.code = result.getServerCmdCode();
                httpResult.msg = result.getServerContent();
                httpResult.succ = false;
                return httpResult;
            }
        }
        // httpResult.code = result.getServerCmdCode();
        // httpResult.msg = result.getServerContent();
        httpResult.succ = false;
        return httpResult;
    }

    /**
     * 注销账户
     * @returns
     */
    public static async deleteAccount(): Promise<CommonResult<any>> {
        //创建请求参数
        let httpResult: CommonResult<any> = new CommonResult<any>();
        let postDataList: PostParameter = new PostParameter();
        //设置wapsid
        this.setWapParmes(postDataList);

        // postDataList.addPostData("nickName", nickName);
        postDataList.addPostData(this._apiMethodKey, "user/logout");
        //设置公共参数
        this.setPublicSignParams(postDataList, "user");
        postDataList.adapterParamsSignatureSession();

        let result: RequestCallBackInfo = await this._httpNet.runHttp(this.getPostRequest(postDataList));
        if (result.m_requestStatus) {
            //判断是否是200 
            if (result.checkServerCmdStatus()) {
                //获取结果
                let jsonObj = result.getServerResult();
                if (jsonObj) {
                    //数据
                    httpResult.code = result.getServerCmdCode();
                    httpResult.msg = result.getServerContent();
                    httpResult.succ = true;
                    return httpResult;
                }
            } else {
            }
        } else {
            //失败
        }
        // httpResult.code = result.getServerCmdCode();
        // httpResult.msg = result.getServerContent();
        httpResult.succ = false;
        return httpResult;
    }

    /**
     * 获取当前登录用户的基本信息
     * @returns
     */
    public static async getBaseInfo(): Promise<CommonResult<any>> {
        //创建请求参数
        let httpResult: CommonResult<any> = new CommonResult<any>();
        let postDataList: PostParameter = new PostParameter();
        //设置wapsid
        this.setWapParmes(postDataList);

        postDataList.addPostData(this._apiMethodKey, "user/getBaseInfo");
        //设置公共参数
        this.setPublicSignParams(postDataList, "user");
        postDataList.adapterParamsSignatureSession();

        let result: RequestCallBackInfo = await this._httpNet.runHttp(this.getPostRequest(postDataList));
        if (result.m_requestStatus) {
            //判断是否是200
            if (result.checkServerCmdStatus()) {
                //获取结果
                let jsonObj = result.getServerResult();
                jsonObj = OperateJson.getJsonObj(jsonObj, "userInfo");
                if (jsonObj) {
                    let userInfo: UserInfoModel = new UserInfoModel();
                    //用户id
                    userInfo.m_uid = OperateJson.getString(jsonObj, "uid");
                    //用户账号状态
                    userInfo.m_userState = OperateJson.getNumber(jsonObj, "userState");
                    //用户名
                    userInfo.m_nickName = OperateJson.getString(jsonObj, "nickName");
                    //邀请码
                    userInfo.m_invCode = OperateJson.getString(jsonObj, "invCode");
                    //性别
                    userInfo.m_sex = OperateJson.getNumber(jsonObj, "sex");
                    //生日
                    userInfo.m_birthday = OperateJson.getString(jsonObj, "birthday");
                    //头像地址
                    userInfo.m_headerUrl = OperateJson.getString(jsonObj, "headerUrl");
                    //好友数
                    userInfo.m_friendNum = OperateJson.getNumber(jsonObj, "friendNum");
                    //分享数
                    userInfo.m_shareNum = OperateJson.getNumber(jsonObj, "shareNum");
                    //充值次数
                    userInfo.m_payNum = OperateJson.getNumber(jsonObj, "payNum", 0);
                    //体现次数
                    userInfo.m_withdrawNum = OperateJson.getNumber(jsonObj, "withdrawNum");
                    //提现热度
                    userInfo.m_withCashValue = OperateJson.getNumber(jsonObj, "withCashValue");
                    //活跃度
                    userInfo.m_activeValue = OperateJson.getNumber(jsonObj, "activeValue");
                    //经验值
                    userInfo.m_expValue = OperateJson.getbigInt(jsonObj, "expValue");
                    //升级所需经验值
                    userInfo.m_nextExpValue = OperateJson.getAny(jsonObj, "nextExpValue");
                    //等级
                    userInfo.m_level = OperateJson.getNumber(jsonObj, "level");
                    //是否是真实用户0为未实名，1为已实名，2为审核中
                    userInfo.m_realStatus = OperateJson.getNumber(jsonObj, "realStatus");
                    //是否保证金用户0/1
                    userInfo.m_ensureStatus = OperateJson.getNumber(jsonObj, "ensureStatus");
                    //用户质量(指头像？)
                    userInfo.m_userQuality = OperateJson.getNumber(jsonObj, "userQuality");
                    //用户模式:15为黑名单
                    userInfo.m_userModel = OperateJson.getNumber(jsonObj, "userModel");

                    userInfo.m_headerUrl = 'face_4';
                    Constants.getInstance().m_LoginUserSession.userInfo = userInfo;

                    httpResult.code = result.getServerCmdCode();
                    httpResult.msg = result.getServerContent();
                    httpResult.succ = true;
                    return httpResult;
                }
            } else {
            }
        } else {
            //失败
        }
        // httpResult.code = result.getServerCmdCode();
        // httpResult.msg = result.getServerContent();
        httpResult.succ = false;
        return httpResult;
    }

    /**
     * 更新用户昵称
     * @param nickName 用户昵称
     * @returns
     */
    public static async setNickName(nickName: string): Promise<CommonResult<any>> {
        //创建请求参数
        let httpResult: CommonResult<any> = new CommonResult<any>();
        let postDataList: PostParameter = new PostParameter();
        //设置wapsid
        this.setWapParmes(postDataList);

        postDataList.addPostData("nickName", nickName);
        postDataList.addPostData(this._apiMethodKey, "user/setNickName");
        //设置公共参数
        this.setPublicSignParams(postDataList, "user");
        postDataList.adapterParamsSignatureSession();

        let result: RequestCallBackInfo = await this._httpNet.runHttp(this.getPostRequest(postDataList));
        if (result.m_requestStatus) {
            //判断是否是200 
            if (result.checkServerCmdStatus()) {
                //获取结果
                let jsonObj = result.getServerResult();
                if (jsonObj) {
                    //数据
                    httpResult.code = result.getServerCmdCode();
                    httpResult.msg = result.getServerContent();
                    httpResult.succ = true;
                    return httpResult;
                }
            } else {
            }
        } else {
            //失败
        }
        // httpResult.code = result.getServerCmdCode();
        // httpResult.msg = result.getServerContent();
        httpResult.succ = false;
        return httpResult;
    }

    /**
     * 获取当前登录用户的基本信息
     * @returns
     */
    public static async getUserSafeAuth(): Promise<CommonResult<any>> {
        //创建请求参数
        let httpResult: CommonResult<any> = new CommonResult<any>();
        let postDataList: PostParameter = new PostParameter();
        //设置wapsid
        this.setWapParmes(postDataList);

        postDataList.addPostData(this._apiMethodKey, "safe/getUserSafeAuth");
        //设置公共参数
        this.setPublicSignParams(postDataList, "user");
        postDataList.adapterParamsSignatureSession();

        let result: RequestCallBackInfo = await this._httpNet.runHttp(this.getPostRequest(postDataList));
        if (result.m_requestStatus) {
            //判断是否是200
            if (result.checkServerCmdStatus()) {
                //获取结果
                let jsonObj = result.getServerResult();
                if (jsonObj) {
                    //用户安全信息
                    Constants.getInstance().m_LoginUserSession.userInfo.m_userSafeAuth = new UserSafeAuth()
                    Constants.getInstance().m_LoginUserSession.userInfo.m_userSafeAuth.m_appleBindStatus = OperateJson.getNumber(jsonObj, "appleBindStatus", 0);
                    Constants.getInstance().m_LoginUserSession.userInfo.m_userSafeAuth.m_facebookBindStatus = OperateJson.getNumber(jsonObj, "facebookBindStatus", 0);
                    Constants.getInstance().m_LoginUserSession.userInfo.m_userSafeAuth.m_googleBindStatus = OperateJson.getNumber(jsonObj, "googleBindStatus", 0);

                    httpResult.code = result.getServerCmdCode();
                    httpResult.msg = result.getServerContent();
                    httpResult.succ = true;
                    return httpResult;
                }
            } else {
            }
        } else {
            //失败
        }
        // httpResult.code = result.getServerCmdCode();
        // httpResult.msg = result.getServerContent();
        httpResult.succ = false;
        return httpResult;
    }

    /**
     * 用户背包业务
     * @returns
     */
    public static async receiveuserPack(typeid: number): Promise<CommonResult<any>> {
        //创建请求参数
        let httpResult: CommonResult<any> = new CommonResult<any>();
        let postDataList: PostParameter = new PostParameter();
        //设置wapsid
        this.setWapParmes(postDataList);
        postDataList.addPostData("id", MyCrpty.clientEncrypt(String(typeid), 1));

        postDataList.addPostData(this._apiMethodKey, "bag/consume");

        //添加公共sign
        this.setPublicSignParams(postDataList, "bag");
        //数据格式化
        postDataList.adapterParamsSignatureSession();
        let result: RequestCallBackInfo = await this._httpNet.runHttp(this.getPostRequest(postDataList));
        cc.log("receiveuserPack=", result)
        if (result.m_requestStatus) {
            //判断是否是200
            if (result.checkServerCmdStatus()) {
                //获取结果
                let jsonObj = result.getServerResult();
                if (jsonObj) {
                    let arr = []
                    // let attsArr = OperateJson.getJsonArr(rechareJson, "atts");
                    let attsItem: SignInAtts;
                    for (let x in jsonObj) {
                        attsItem = {
                            m_attType: jsonObj[x].dataType,
                            m_valueA: jsonObj[x].valueA,
                            m_valueB: jsonObj[x].valueB,
                            m_valueC: jsonObj[x].valueC,
                        }
                        arr.push(attsItem);
                    }


                    httpResult.code = result.getServerCmdCode();
                    httpResult.msg = result.getServerContent();
                    httpResult.succ = true;
                    httpResult.data = arr;
                    // httpResult.data2 = dataList;
                    return httpResult;
                }
            } else {
            }
        } else {
            //失败
        }
        httpResult.code = result.getServerCmdCode();
        httpResult.msg = result.getServerContent();
        httpResult.succ = false;
        return httpResult;
    }

    /**
     * 用户下次升级奖励
     * @returns
     */
    public static async userNextLevelReward(): Promise<CommonResult<any>> {
        //创建请求参数
        let httpResult: CommonResult<any> = new CommonResult<any>();
        let postDataList: PostParameter = new PostParameter();
        //设置wapsid
        this.setWapParmes(postDataList);

        postDataList.addPostData(this._apiMethodKey, "reward/getLevelReward");

        //添加公共sign
        this.setPublicSignParams(postDataList, "levelreward");
        //数据格式化
        postDataList.adapterParamsSignatureSession();
        let result: RequestCallBackInfo = await this._httpNet.runHttp(this.getPostRequest(postDataList));
        cc.log("userNextLevelReward=", result)
        if (result.m_requestStatus) {
            //判断是否是200
            if (result.checkServerCmdStatus()) {
                //获取结果
                let jsonObj = result.getServerResult();
                if (jsonObj) {
                    let arr = []
                    let attsArr = OperateJson.getJsonArr(jsonObj, "list");
                    let attsItem: SignInAtts;
                    for (let x in attsArr) {
                        attsItem = {
                            m_attType: attsArr[x].attType,
                            m_valueA: attsArr[x].valueA,
                            m_valueB: attsArr[x].valueB,
                            m_valueC: attsArr[x].valueC,
                        }
                        arr.push(attsItem);
                    }


                    httpResult.code = result.getServerCmdCode();
                    httpResult.msg = result.getServerContent();
                    httpResult.succ = true;
                    httpResult.data = arr;
                    // httpResult.data2 = dataList;
                    return httpResult;
                }
            } else {
            }
        } else {
            //失败
        }
        httpResult.code = result.getServerCmdCode();
        httpResult.msg = result.getServerContent();
        httpResult.succ = false;
        return httpResult;
    }

    /**
     * 用户获取签到信息
     * @returns
     */
    public static async getSignIn(): Promise<CommonResult<any>> {
        //创建请求参数
        let httpResult: CommonResult<any> = new CommonResult<any>();
        let postDataList: PostParameter = new PostParameter();
        //设置wapsid
        this.setWapParmes(postDataList);

        postDataList.addPostData(this._apiMethodKey, "task/getSignIn");
        //设置公共参数
        this.setPublicSignParams(postDataList, "signIn");
        postDataList.adapterParamsSignatureSession();

        let result: RequestCallBackInfo = await this._httpNet.runHttp(this.getPostRequest(postDataList));
        if (result.m_requestStatus) {
            //判断是否是200

            if (result.checkServerCmdStatus()) {
                //获取结果
                let jsonObj = result.getServerResult();
                if (jsonObj) {
                    let signModel = new SignModel();
                    //每天签到数据
                    let listJson = OperateJson.getJsonObj(jsonObj, "list");
                    let dataListJson = OperateJson.getJsonArr(listJson, "day");
                    let continuity = OperateJson.getJsonArr(listJson, "continuity");
                    if (dataListJson) {
                        let signItemModel: SignItemModel = null;
                        let signList: Array<SignItemModel> = new Array<SignItemModel>();
                        for (let i in dataListJson) {
                            if (dataListJson[i] != null) {
                                signItemModel = new SignItemModel();
                                signItemModel.m_id = OperateJson.getNumber(dataListJson[i], "id");
                                signItemModel.m_dayIndex = OperateJson.getNumber(dataListJson[i], "dayIndex");
                                signItemModel.m_luckDraw = OperateJson.getNumber(dataListJson[i], "luckDrawType");
                                signItemModel.m_tranSign = OperateJson.getString(dataListJson[i], "tranSign");
                                signItemModel.m_icoUrl = OperateJson.getString(dataListJson[i], "icoUrl");
                                let attsArr = OperateJson.getJsonArr(dataListJson[i], "atts");
                                if (attsArr) {
                                    signItemModel.attsList = [];
                                    let attsItem: SignInAtts;
                                    for (let x in attsArr) {
                                        attsItem = {
                                            m_attType: attsArr[x].attType,
                                            m_valueA: attsArr[x].valueA,
                                            m_valueB: attsArr[x].valueB,
                                            m_valueC: attsArr[x].valueC,
                                        }
                                        signItemModel.attsList.push(attsItem);
                                    }
                                }
                                signList.push(signItemModel);
                            }
                        }
                        signModel.m_signList = signList;
                    }
                    signModel.continuity = continuity
                    //签到情况
                    let signInJson = OperateJson.getJsonObj(jsonObj, "signIn");
                    if (signInJson) {
                        //今天是否能签到
                        signModel.m_status = OperateJson.getNumber(signInJson, "status");
                        //这周签到的天数
                        signModel.m_weekDay = OperateJson.getNumber(signInJson, "weekDay");
                        //这个月签到天数
                        signModel.m_monthDay = OperateJson.getNumber(signInJson, "monthDay");
                    }
                    //月周期：0的话不显示出来
                    signModel.m_monthCycle = OperateJson.getNumber(jsonObj, "monthCycle");
                    //月周期送的内容文字，没有就不显示(monthCycle:0也不显示)
                    signModel.m_monthPlain = OperateJson.getString(jsonObj, "monthPlain");

                    httpResult.code = result.getServerCmdCode();
                    httpResult.msg = result.getServerContent();
                    httpResult.succ = true;
                    httpResult.data = signModel;
                    return httpResult;
                }
            }
        } else {
            //失败
        }
        // httpResult.code = result.getServerCmdCode();
        // httpResult.msg = result.getServerContent();
        httpResult.succ = false;
        return httpResult;
    }

    /**
     * 用户提交取签获奖励
     * @param signId 签到的ID
     * @param tranSign 签到的tranSign
     * @returns
     */
    public static async submitSignIn(signId: string | number, tranSign: string): Promise<CommonResult<any>> {
        //创建请求参数
        let httpResult: CommonResult<any> = new CommonResult<any>();
        let postDataList: PostParameter = new PostParameter();
        //设置wapsid
        this.setWapParmes(postDataList);

        postDataList.addPostData("key", MyCrpty.clientEncrypt(String(signId), 1));
        postDataList.addPostData("keySign", tranSign);
        postDataList.addPostData("signId", MyCrpty.clientEncrypt(MyCrpty.sha1Encrypt(tranSign), 1));
        postDataList.addPostData(this._apiMethodKey, "task/submitSignIn");
        //设置公共参数
        this.setPublicSignParams(postDataList, "signIn");
        postDataList.adapterParamsSignatureSession();

        let result: RequestCallBackInfo = await this._httpNet.runHttp(this.getPostRequest(postDataList));
        if (result.m_requestStatus) {
            //判断是否是200 
            if (result.checkServerCmdStatus()) {
                //获取结果
                let jsonObj = result.getServerResult();
                if (jsonObj) {
                    //数据
                    //签到的ID
                    let id = OperateJson.getNumber(jsonObj, "id");
                    //说明
                    let remark = OperateJson.getString(jsonObj, "remark");
                    //新的签到图标
                    let icoUrl = OperateJson.getString(jsonObj, "icoUrl");
                    // let list = OperateJson.getString(jsonObj, "list");
                    //奖励中显示:未启用
                    let giveIcoUrl = OperateJson.getString(jsonObj, "giveIcoUrl");
                    httpResult.code = result.getServerCmdCode();
                    httpResult.msg = result.getServerContent();
                    httpResult.succ = true;
                    httpResult.data = result.getServerResult();
                    return httpResult;
                }
            }
        } else {
            //失败
        }
        // httpResult.code = result.getServerCmdCode();
        // httpResult.msg = result.getServerContent();
        httpResult.succ = false;
        return httpResult;
    }


    /**
     * 查询用户邮件
     * @returns
     */
    public static async getUserEmail(): Promise<CommonResult<any>> {
        //创建请求参数
        let httpResult: CommonResult<any> = new CommonResult<any>();
        let postDataList: PostParameter = new PostParameter();
        //设置wapsid
        this.setWapParmes(postDataList);

        postDataList.addPostData(this._apiMethodKey, "email/list");
        //设置公共参数
        this.setPublicSignParams(postDataList, "email");
        postDataList.addPostData("key", Constants.getInstance().m_LoginUserSession.m_uid);
        postDataList.adapterParamsSignatureSession();

        let result: RequestCallBackInfo = await this._httpNet.runHttp(this.getPostRequest(postDataList, true));
        console.log("getUserEmail==", result)
        if (result.m_requestStatus) {
            //判断是否是200
            if (result.checkServerCmdStatus()) {
                //获取结果
                let jsonObj = result.getServerResult();
                if (jsonObj) {
                    let msgInboxes = OperateJson.getJsonObj(jsonObj, "msgInboxes");
                    if (msgInboxes) {
                        let EmailModel: EmailItemModel = null;
                        let emailList: Array<EmailItemModel> = new Array<EmailItemModel>();
                        for (let i in msgInboxes) {
                            if (msgInboxes[i] != null) {
                                EmailModel = new EmailItemModel();
                                EmailModel.id = OperateJson.getBigNumber(msgInboxes[i], "id");
                                EmailModel.rewardPacketId = OperateJson.getNumber(msgInboxes[i], "rewardPacketId");
                                EmailModel.rewardTime = OperateJson.getNumber(msgInboxes[i], "rewardTime");
                                EmailModel.status = OperateJson.getNumber(msgInboxes[i], "status");
                                EmailModel.activityAt = OperateJson.getNumber(msgInboxes[i], "activityAt");
                                EmailModel.expireAt = OperateJson.getNumber(msgInboxes[i], "expireAt");

                                EmailModel.icoUrl = OperateJson.getString(msgInboxes[i], "icoUrl");
                                EmailModel.sysTitle = OperateJson.getString(msgInboxes[i], "sysTitle");
                                EmailModel.videoUrl = OperateJson.getString(msgInboxes[i], "videoUrl");
                                EmailModel.mediaUrls = OperateJson.getAny(msgInboxes[i], "mediaUrls");

                                EmailModel.openTag = OperateJson.getString(msgInboxes[i], "openTag");
                                EmailModel.openLink = OperateJson.getString(msgInboxes[i], "openLink");

                                let attsArr = OperateJson.getJsonArr(msgInboxes[i], "rewardResult");
                                if (attsArr) {
                                    EmailModel.attsList = [];
                                    let attsItem: SignInAtts;
                                    for (let x in attsArr) {
                                        attsItem = {
                                            m_attType: attsArr[x].attType,
                                            m_valueA: attsArr[x].valueA,
                                            m_valueB: attsArr[x].valueB,
                                            m_valueC: attsArr[x].valueC,
                                        }
                                        EmailModel.attsList.push(attsItem);
                                    }
                                }

                                emailList.push(EmailModel);
                            }
                        }
                        httpResult.data = emailList;
                    }
                    // let HallEmailModel: HallEmailModel = null;
                    // let hallemailModel = new HallEmailModel();
                    // //邮件数据
                    // let id = OperateJson.getNumber(jsonObj, "id");
                    // let rewardPacketId = OperateJson.getNumber(jsonObj, "rewardPacketId");
                    // let rewardTime = OperateJson.getJsonArr(jsonObj, "rewardTime");
                    // let status = OperateJson.getJsonArr(jsonObj, "status");
                    // let activityAt = OperateJson.getJsonArr(jsonObj, "activityAt");
                    // let expireAt = OperateJson.getJsonArr(jsonObj, "expireAt");

                    httpResult.code = result.getServerCmdCode();
                    httpResult.msg = result.getServerContent();
                    httpResult.succ = true;
                    // httpResult.data = hallemailModel;
                    return httpResult;
                }


            }
        } else {
            //失败
        }

        httpResult.succ = false;
        return httpResult;
    }

    /**
     * 领取用户邮件 type:0单个 1全部
     * @returns
     */
    public static async submitUserEmail(type: number, msgId: bigint): Promise<CommonResult<any>> {
        //创建请求参数
        let httpResult: CommonResult<any> = new CommonResult<any>();
        let postDataList: PostParameter = new PostParameter();
        //设置wapsid
        this.setWapParmes(postDataList);

        postDataList.addPostData(this._apiMethodKey, "email/consume");
        //设置公共参数
        this.setPublicSignParams(postDataList, "email");
        postDataList.addPostData("uid", Constants.getInstance().m_LoginUserSession.m_uid);
        postDataList.addPostData("type", String(type));
        postDataList.addPostData("msgId", String(msgId));
        postDataList.adapterParamsSignatureSession();

        let result: RequestCallBackInfo = await this._httpNet.runHttp(this.getPostRequest(postDataList, true));
        console.log("submitUserEmail==", result)
        if (result.m_requestStatus) {
            //判断是否是200
            if (result.checkServerCmdStatus()) {
                //获取结果
                let jsonObj = result.getServerResult();
                let attsList = [];
                if (jsonObj) {
                    let rewardEmail = OperateJson.getJsonObj(jsonObj, "rewardEmail");
                    if (rewardEmail) {
                        for (let x in rewardEmail) {
                            let dd = rewardEmail[x]
                            attsList.push(dd);
                        }
                    }

                    httpResult.code = result.getServerCmdCode();
                    httpResult.msg = result.getServerContent();
                    httpResult.succ = true;
                    httpResult.data = attsList;
                    return httpResult;
                }


            }
        } else {
            //失败
        }

        httpResult.succ = false;
        return httpResult;
    }
}
