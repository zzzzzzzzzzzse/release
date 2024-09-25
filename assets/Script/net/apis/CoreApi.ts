import { Constants } from "../../Constants";
import AppPlatformConfig from "../../configs/AppPlatformConfig";
import { MyCrpty } from "../../libs/MyCrpty";
import { SlotGameVersion } from "../../models/SlotGameVersion";
import WSCItemModel from "../../models/WSCItemModel";
import AppLog from "../../tools/AppLog";
import { OperateJson } from "../../tools/OperateJson";
import { StringUtil } from "../../tools/StringUtil";
import { LocalStorageTool } from "../../tools/storage/LocalStorageTool";
import { CommonResult } from "../CommonResult";
import PostParameter from "../PostParameter";
import { RequestCallBackInfo } from "../RequestCallBackInfo";
import CoreDataExplain from "../dataExplain/CoreDataExplain";
import { BaseApi } from "./BaseApi";

/**
 * 核心接口调用
 */
export class CoreApi extends BaseApi {

    /**
     * 路由
     * @returns 
     */
    public static async coreRout(): Promise<CommonResult<any>> {
        let httpResult: CommonResult<any> = new CommonResult<any>();
        //创建请求参数
        let postDataList: PostParameter = new PostParameter();
        //设置wapsid
        this.setWapParmes(postDataList);

        postDataList.addPostData(this._apiMethodKey, "core/rout");
        //添加公共sign
        this.setPublicSignParams(postDataList, "rout");
        //数据格式化
        postDataList.adapterParamsSignature();
        let result: RequestCallBackInfo = await this._httpNet.runHttp(this.getPostRequest(postDataList, false));
        console.log("luyou result: ", JSON.stringify(result));
        if (result.m_requestStatus) {
            //判断是否是200
            if (result.checkServerCmdStatus()) {
                //获取结果
                let jsonObj = result.getServerResult();
                if (jsonObj) {
                    let gateway: string = OperateJson.getString(jsonObj, "gateway");
                    let gateway2: string = OperateJson.getString(jsonObj, "gateway2");
                    if (Constants.getInstance().m_httpHost && !StringUtil.isEmpty(gateway)) {
                        let aesGateway: string = MyCrpty.clientDecrypt(gateway, 0);
                        //let aesGateway2: string = MyCrpty.clientDecrypt(gateway2, 0);
                        let aesGateway2: string = "https://usaeastapi2.jackpot-fevergame.com/v01/apps/";
                        LocalStorageTool.setBaseApiHost(aesGateway);
                        LocalStorageTool.setBaseJavaApiHost(aesGateway2);
                        Constants.getInstance().m_httpHost.m_hostList[0] = aesGateway;
                        AppPlatformConfig.TEST_HTTPURLJAVA = aesGateway2;
                        console.log("aesGateway url ", aesGateway)
                    }
                    let region: number = OperateJson.getNumber(jsonObj, "region", -1);
                    let load2d: string = OperateJson.getString(jsonObj, "load2d");
                    // if (!StringUtil.isEmpty(load2d)) {
                    // load2d += "basev1";
                    LocalStorageTool.setBaseHotHost(load2d);
                    // }
                    let load3d: string = OperateJson.getString(jsonObj, "load3d");

                    httpResult.code = result.getServerCmdCode();
                    httpResult.msg = result.getServerContent();
                    httpResult.succ = true;
                    Constants.getInstance().analytics.logEvent("core_rout_data", "");
                    // console.log("%%%%%%%%%%%%",JSON.stringify(httpResult));
                    return httpResult;
                }
            } else {
                Constants.getInstance().analytics.logEvent("core_rout_err", "");
            }
        } else {
            Constants.getInstance().analytics.logEvent("core_rout_timout", "");
        }
        httpResult.code = result.getServerCmdCode();
        httpResult.msg = result.getServerContent();
        httpResult.succ = false;
        return httpResult;
    }

    /**
     * 主核心接口
     * @returns
     */
    public static async coreMain(): Promise<CommonResult<any>> {
        let httpResult: CommonResult<any> = new CommonResult<any>();
        //创建请求参数
        let postDataList: PostParameter = new PostParameter();
        //设置wapsid
        this.setWapParmes(postDataList);

        postDataList.addPostData(this._apiMethodKey, "core/main");
        //添加公共sign
        this.setPublicSignParams(postDataList, "main");
        //数据格式化
        postDataList.adapterParamsSignature();
        console.log("qingqiu main jiekou");
        let result: RequestCallBackInfo = await this._httpNet.runHttp(this.getPostRequest(postDataList));
        console.log("freshchat json", JSON.stringify(result))

        // console.log("fffffffff",data.join("&&"));
        if (result.m_requestStatus) {
            //判断是否是200
            if (result.checkServerCmdStatus()) {
                //获取结果

                let jsonObj = result.getServerResult();
                if (jsonObj) {
                    //视频ID
                    let youtubeCode = OperateJson.getNumber(jsonObj, "youtubeCode");
                    //whatsapp客服务地址,空就不显示
                    let whatappHelp = OperateJson.getString(jsonObj, "whatappHelp", "");
                    //分享出去的APP公共URL
                    let shareAppUrl = OperateJson.getString(jsonObj, "shareAppUrl");
                    //屏蔽解析处理
                    CoreDataExplain.explainShieldList(jsonObj, false);
                    let hosts = OperateJson.getString(jsonObj, "hosts");
                    //是否打开OTP验证
                    let openOtpVal = OperateJson.getNumber(jsonObj, "openOtpVal");

                    //升级信息结点
                    let upgrateJson = OperateJson.getJsonObj(jsonObj, "upgrate");
                    if (upgrateJson) {
                        //如果是0的话没有下面的数据,1为正常提示升级,2为强制升级
                        let status = OperateJson.getNumber(jsonObj, "status");
                        //版本号
                        let version = OperateJson.getString(jsonObj, "version");
                        //升级提示内容
                        let msg = OperateJson.getString(jsonObj, "msg");
                        //下载连接或者市场连接
                        let downurl = OperateJson.getString(jsonObj, "downurl");
                        //包的大小
                        let length = OperateJson.getNumber(jsonObj, "length");
                    }

                    //促销结点
                    let promotoJson = OperateJson.getJsonObj(jsonObj, "promoto");
                    //提现信息
                    let withdrawJson = OperateJson.getJsonObj(jsonObj, "withdraw");


                    //域名配置结点
                    let domainJson = OperateJson.getJsonObj(jsonObj, "domain");
                    if (domainJson) {
                        //默认资源图片服务器
                        let imgHostArr = OperateJson.getJsonArr(domainJson, "imgHost");
                        if (imgHostArr) {
                            let imgHostList: Array<string> = new Array<string>();
                            for (let i in imgHostArr) {
                                imgHostList.push(imgHostArr[i]);
                            }
                        }
                        //API域名
                        let apHostsArr = OperateJson.getJsonArr(domainJson, "apHosts");
                        if (apHostsArr) {
                            let apHostsList: Array<string> = new Array<string>();
                            for (let i in apHostsArr) {
                                apHostsList.push(apHostsArr[i]);
                            }
                            //保存本地
                            if (apHostsList.length > 0) {
                                LocalStorageTool.setApiHost(apHostsList);
                            }
                        }
                        //服务域名连接服务
                        let shareHostArr = OperateJson.getJsonArr(domainJson, "shareHost");
                        if (shareHostArr) {
                            let shareHostList: Array<string> = new Array<string>();
                            for (let i in shareHostArr) {
                                shareHostList.push(shareHostArr[i]);
                            }
                        }
                    }

                    //配置结点
                    let configJson = OperateJson.getJsonObj(jsonObj, "config");
                    // console.log('freshchat json', JSON.stringify(configJson));
                    if (configJson) {
                        //客服0就不显示，1显示
                        let freshchat = OperateJson.getNumber(configJson, "freshchat");

                        let freshchatid: string = OperateJson.getString(configJson, "freshchatid");
                        let freshchatkey: string = OperateJson.getString(configJson, "freshchatkey");
                        if (!StringUtil.isEmpty(freshchatid) && !StringUtil.isEmpty(freshchatkey)) {
                            Constants.getInstance().native.initFreshchat(freshchatid, freshchatkey);
                        }
                        //是否打开FB登录
                        let fbopen = OperateJson.getNumber(configJson, "fbopen");
                        //FACEBOOK的应用ID
                        let fbkey = OperateJson.getString(configJson, "fbkey");
                        if (fbopen === 1 && !StringUtil.isEmpty(fbkey)) {
                            //登录fb
                            Constants.getInstance().native.initFacebook(fbkey);
                        }
                        let tenjinKey = OperateJson.getString(configJson, "tenjinid");
                        if (!StringUtil.isEmpty(tenjinKey)) {
                            Constants.getInstance().native.initTenjin(tenjinKey);
                        }
                        //客服邮件
                        let serviceEmail = OperateJson.getString(configJson, "serviceEmail");
                    }
                    httpResult.code = result.getServerCmdCode();
                    httpResult.msg = result.getServerContent();
                    httpResult.succ = true;
                    return httpResult;
                }
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
     * 服务器Websocket连接结点
     */
    public static async getWsclist(): Promise<CommonResult<any>> {
        //创建请求参数
        let httpResult: CommonResult<any> = new CommonResult<any>();
        let postDataList: PostParameter = new PostParameter();
        //设置wapsid
        this.setWapParmes(postDataList);
        postDataList.addPostData(this._apiMethodKey, "core/wsclist");
        //添加公共sign
        this.setPublicSignParams(postDataList, "wsc");
        //数据格式化
        postDataList.adapterParamsSignatureSession();

        let result: RequestCallBackInfo = await this._httpNet.runHttp(this.getPostRequest(postDataList));
        AppLog.writeLog("net_123123core/wsclist:", result)
        if (result.m_requestStatus) {
            //判断是否是200
            if (result.checkServerCmdStatus()) {
                let jsonObj = result.getServerResult();
                if (jsonObj) {
                    //大厅
                    let centersJson = OperateJson.getJsonArr(jsonObj, "centers");
                    let centersList: Array<WSCItemModel> = new Array<WSCItemModel>();
                    if (centersJson) {
                        let wscItemModel: WSCItemModel = null;
                        for (let i in centersJson) {
                            wscItemModel = new WSCItemModel();
                            wscItemModel.m_ssl = OperateJson.getNumber(centersJson[i], "ssl");
                            wscItemModel.m_wsPath = OperateJson.getString(centersJson[i], "wsPath");
                            wscItemModel.m_sign = OperateJson.getString(centersJson[i], "sign");
                            centersList.push(wscItemModel);
                        }
                        //添加到内存
                        Constants.getInstance().m_hallSocketHost.addWSCList(centersList);
                    }
                    //游戏
                    let slotsJson = OperateJson.getJsonArr(jsonObj, "slots");
                    let slotsList: Array<WSCItemModel> = new Array<WSCItemModel>();
                    if (slotsJson) {
                        let wscItemModel: WSCItemModel = null;
                        for (let i in slotsJson) {
                            wscItemModel = new WSCItemModel();
                            wscItemModel.m_ssl = OperateJson.getNumber(slotsJson[i], "ssl");
                            wscItemModel.m_wsPath = OperateJson.getString(slotsJson[i], "wsPath");
                            wscItemModel.m_sign = OperateJson.getString(slotsJson[i], "sign");
                            slotsList.push(wscItemModel);
                        }
                        //添加到内存
                        Constants.getInstance().m_slotSocketHost.addWSCList(slotsList);
                    }
                    httpResult.code = result.getServerCmdCode();
                    httpResult.msg = result.getServerContent();
                    httpResult.data = centersList;
                    httpResult.data2 = slotsList;
                    httpResult.succ = true;
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
     * 获取更新地址
     * @returns
     */
    public static async coreCheckUpdate(gameid: number, type: string): Promise<CommonResult<any>> {
        let httpResult: CommonResult<any> = new CommonResult<any>();
        //创建请求参数
        let postDataList: PostParameter = new PostParameter();
        //设置wapsid
        this.setWapParmes(postDataList);

        postDataList.addPostData("type", "game");

        postDataList.addPostData("type", type);
        if (type == "game") {
            postDataList.addPostData("id", String(gameid));
        }

        postDataList.addPostData(this._apiMethodKey, "core/upgrate");
        //添加公共sign
        this.setPublicSignParams(postDataList, "upgrate");
        //数据格式化
        postDataList.adapterParamsSignature();
        let result: RequestCallBackInfo = await this._httpNet.runHttp(this.getPostRequest(postDataList));
        console.log("net12313_core/upgrate", JSON.stringify(result));
        if (result.m_requestStatus) {
            //判断是否是200
            if (result.checkServerCmdStatus()) {
                //获取结果
                let jsonObj = result.getServerResult();
                if (jsonObj) {
                    let jsoninfo = OperateJson.getJsonObj(jsonObj, "info");
                    console.log("jsoninfo=", jsoninfo)
                    let SlotGameVersiondata: SlotGameVersion = new SlotGameVersion();
                    SlotGameVersiondata.version = OperateJson.getNumber(jsoninfo, "version");
                    SlotGameVersiondata.packageSize = OperateJson.getNumber(jsoninfo, "packageSize");
                    SlotGameVersiondata.packageUrl = OperateJson.getString(jsoninfo, "packageUrl");
                    SlotGameVersiondata.isMake = OperateJson.getString(jsoninfo, "isMake");
                    SlotGameVersiondata.clientId = OperateJson.getNumber(jsoninfo, "clientId");

                    httpResult.data = SlotGameVersiondata;
                    httpResult.code = result.getServerCmdCode();
                    httpResult.msg = result.getServerContent();
                    httpResult.succ = true;
                    return httpResult;
                }
            }
        } else {
            //失败
        }
        httpResult.code = result.getServerCmdCode();
        httpResult.msg = result.getServerContent();
        httpResult.succ = false;
        return httpResult;
    }

}
