import { UIManagernew } from "../../../UIManagernew";
import { EVENT } from "../../configs/ConstDefine";
import { Constants } from "../../Constants";
import { EventMgr } from "../../framework/mgr/EventManager";
import { MyCrpty } from "../../libs/MyCrpty";
import OpenMoneyInfo from "../../models/OpenMoneyInfo";
import { PayOrderParam } from "../../models/param/PayOrderParam";
import ValidateOrderParams from "../../models/param/ValidateOrderParams";
import { PayOrderResultModel } from "../../models/PayOrderResultModel";
import ShopGoodsModel, { GoodsAtts } from "../../models/ShopGoodsModel";
import { SignInAtts } from "../../models/SignItemModel";
import { WalletInfoModel } from "../../models/WalletInfoModel";
import UserTaskTimerHelper from "../../task/UserTaskTimerHelper";
import AppLog from "../../tools/AppLog";
import AnalyticsTool, { AnalyticsEventEnmu } from "../../tools/log/AnalyticsTool";
import { OperateJson } from "../../tools/OperateJson";
import { LocalStorageTool } from "../../tools/storage/LocalStorageTool";
import { StringUtil } from "../../tools/StringUtil";
import { CommonResult } from "../CommonResult";
import PostParameter from "../PostParameter";
import { RequestCallBackInfo } from "../RequestCallBackInfo";
import { BaseApi } from "./BaseApi";

/**
 * 钱包业务
 */
export class WalletApi extends BaseApi {
 /**
     * 获取用户账户余额信息
     * @returns
     */
    public static async getBaseAccounts(): Promise<CommonResult<any>> {
        //创建请求参数
        let httpResult: CommonResult<any> = new CommonResult<any>();
        let postDataList: PostParameter = new PostParameter();
        //设置wapsid
        this.setWapParmes(postDataList);

        postDataList.addPostData(this._apiMethodKey, "wallet/getBaseAccounts");
        //添加公共sign
        this.setPublicSignParams(postDataList, "accounts");
        //数据格式化
        postDataList.adapterParamsSignatureSession();
        let result: RequestCallBackInfo = await this._httpNet.runHttp(this.getPostRequest(postDataList));
        if (result.m_requestStatus) {
            //判断是否是200
            if (result.checkServerCmdStatus()) {
                //获取结果
                let jsonObj = result.getServerResult();
                if (jsonObj) {
                    let walletInfo: WalletInfoModel = new WalletInfoModel();
                    walletInfo.m_uid = OperateJson.getString(jsonObj, "uid");
                    walletInfo.m_status = OperateJson.getNumber(jsonObj, "status");
                    walletInfo.m_goldCoin = OperateJson.getNumber(jsonObj, "goldCoin");
                    walletInfo.m_gameCoin = OperateJson.getbigInt(jsonObj, "gameCoin");
                    walletInfo.m_sumRecharge = OperateJson.getNumber(jsonObj, "sumRecharge");
                    walletInfo.m_sumProfit = OperateJson.getNumber(jsonObj, "sumProfit");
                    Constants.getInstance().m_LoginUserSession.userWalletInfo = walletInfo;
                    httpResult.code = result.getServerCmdCode();
                    httpResult.msg = result.getServerContent();
                    httpResult.succ = true;
                    return httpResult;
                }
            } 
        } else {
            //失败
            let sureCallback = (() => {
                cc.log("sureCallback!!!")
                Constants.getInstance().hallSocket.onDestroy();
                Constants.getInstance().hallSocket.resetstatus();
                let  SceneName = cc.director.getScene().name
                if(SceneName.localeCompare("CoreLoadScene")!=0 ){
                    cc.director.loadScene("CoreLoadScene")
                }
            })
            let msg1 = {
                name: "MessageBoxView",
                sureCallback: sureCallback,
                bundleIndex: "gameprefab",
                btnOkText: "Disconnect, please login again.",
                btnCount: 1,
                zorder: 10000
            }
            UIManagernew.openUI(msg1)
        }
        httpResult.code = result.getServerCmdCode();
        httpResult.msg = result.getServerContent();
        httpResult.succ = false;
        return httpResult;
    }

    /**
     * 用户领取在线奖励 1:在线奖励 2:商城奖励
     * @returns
     */
     public static async receiveOnlineList(type?:number,isreward:string="1"): Promise<CommonResult<any>> {
        //创建请求参数
        let httpResult: CommonResult<any> = new CommonResult<any>();
        let postDataList: PostParameter = new PostParameter();
        //设置wapsid
        this.setWapParmes(postDataList);

        postDataList.addPostData(this._apiMethodKey, "reward/receiveOnlineList");
        if(type==undefined) type = 1;
        if(type == 1){
            postDataList.addPostData("type", "onlie");
        }else if(type == 2){
            postDataList.addPostData("type", "shop");
        }
        postDataList.addPostData("isReward", isreward);

        //添加公共sign
        this.setPublicSignParams(postDataList, "reward");
        //数据格式化
        postDataList.adapterParamsSignatureSession();
        let result: RequestCallBackInfo = await this._httpNet.runHttp(this.getPostRequest(postDataList));
        if (result.m_requestStatus) {
            //判断是否是200
            if (result.checkServerCmdStatus()) {
                //获取结果
                let jsonObj = result.getServerResult();
                if (jsonObj) {
                    //获取充值商品列表

                    let time: number = OperateJson.getNumber(jsonObj, "time");
                    if(type == 1){
                        LocalStorageTool.setUserCollectTime(String(time + 2));
                    }
                    
                    let listJson: JSON = OperateJson.getJsonArr(jsonObj, "list");
                    let dataList: OpenMoneyInfo[] = [];
                    let item: JSON;
                    if (listJson) {
                        let itemInfo: OpenMoneyInfo;
                        for (let i in listJson) {
                            item = listJson[i];
                            itemInfo = new OpenMoneyInfo();
                            itemInfo.m_time = time;
                            itemInfo.m_type = OperateJson.getNumber(item, "type");
                            itemInfo.m_value = OperateJson.getNumber(item, "value");
                            itemInfo.m_addValue = OperateJson.getNumber(item, "addValue");
                            itemInfo.m_newValue = OperateJson.getNumber(item, "newValue");
                            dataList.push(itemInfo);
                        }
                    }

                    httpResult.code = result.getServerCmdCode();
                    httpResult.msg = result.getServerContent();
                    httpResult.succ = true;
                    httpResult.data = time;
                    httpResult.data2 = dataList;
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
     * 充值界面
     * @returns
     */
    public static async getProductSkuList(dataType: string): Promise<CommonResult<any>> {
        //创建请求参数
        let httpResult: CommonResult<any> = new CommonResult<any>();
        let postDataList: PostParameter = new PostParameter();
        //设置wapsid
        this.setWapParmes(postDataList);

        postDataList.addPostData("dataType", dataType);
        postDataList.addPostData(this._apiMethodKey, "wallet/getProductSkuList");
        //添加公共sign
        this.setPublicSignParams(postDataList, "product");
        //数据格式化
        postDataList.adapterParamsSignatureSession();
        let result: RequestCallBackInfo = await this._httpNet.runHttp(this.getPostRequest(postDataList));
        console.log("huoqushangpinliebiaoxinxi",JSON.stringify(result));
        if (result.m_requestStatus) {
            //判断是否是200
            if (result.checkServerCmdStatus()) {
                //获取结果
                let jsonObj = result.getServerResult();
                if (jsonObj) {
                    //充值商品列表解析
                    let infoList: Array<ShopGoodsModel> = new Array<ShopGoodsModel>();
                    //获取充值商品列表
                    let prolistJson: JSON = OperateJson.getJsonArr(jsonObj, "list");
                    //获取汇率
                    let forexJson: JSON = OperateJson.getJsonObj(jsonObj, "forex");
                    let itemModel: ShopGoodsModel = null;
                    let rechareJson: JSON;
                    if (prolistJson) {
                        for (let i in prolistJson) {
                            rechareJson = prolistJson[i];
                            if (rechareJson) {
                                itemModel = new ShopGoodsModel();
                                itemModel.m_id = OperateJson.getNumber(rechareJson, "id", 0);
                                itemModel.m_title = OperateJson.getString(rechareJson, "title");
                                itemModel.m_money = OperateJson.getNumber(rechareJson, "money");
                                itemModel.m_salesMoney = OperateJson.getNumber(rechareJson, "salesMoney");
                                itemModel.m_appStorePid = OperateJson.getString(rechareJson, "appStorePid");
                                itemModel.m_clientTag = OperateJson.getString(rechareJson, "clientTag");
                                let attsArr = OperateJson.getJsonArr(rechareJson, "atts");
                                if (attsArr) {
                                    itemModel.m_attsList = [];
                                    let attsItem: GoodsAtts;
                                    for (let x in attsArr) {
                                        attsItem = {
                                            m_attType: attsArr[x].attType,
                                            m_vipGrade: attsArr[x].vipGrade,
                                            m_valueA: attsArr[x].valueA,
                                            m_valueB: attsArr[x].valueB,
                                            m_valueC: attsArr[x].valueC,
                                        }
                                        itemModel.m_attsList.push(attsItem);
                                    }
                                }
                                itemModel.m_forex = OperateJson.getNumber(forexJson, "forex", -1);
                                itemModel.m_msymbol = OperateJson.getString(forexJson, "msymbol");
                                infoList.push(itemModel);
                            }
                        }
                    }
                    httpResult.code = result.getServerCmdCode();
                    httpResult.msg = result.getServerContent();
                    httpResult.data = infoList;
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
     * 用户充值下单
     * @param params 提交参数
     * @returns
     */
     public static async payOrderRecharge(params: PayOrderParam): Promise<CommonResult<any>> {
        //创建请求参数
        let httpResult: CommonResult<any> = new CommonResult<any>();
        let postDataList: PostParameter = new PostParameter();
        //设置wapsid
        this.setWapParmes(postDataList);

        console.log("jiamiqiandeshuju",params.skuId,params.money,params.dataType,params.payModel);

        postDataList.addPostData("key", MyCrpty.clientEncrypt(String(params.skuId), 1));
        if (params.money && params.money > 0) {
            postDataList.addPostData("money", MyCrpty.clientEncrypt(String(params.money), 1));
        }
        postDataList.addPostData("dataType", MyCrpty.clientEncrypt(String(params.dataType), 1));

        postDataList.addPostData("payGateway", MyCrpty.clientEncrypt(String(params.payModel), 1));
        postDataList.addPostData("payModel", MyCrpty.clientEncrypt(String(1), 1));
        postDataList.addPostData(this._apiMethodKey, "wallet/payOrderProductSku");

        let data = [];
        for(let i in postDataList){
            data.push(i + "="+postDataList[i]);
        }
        // console.log(data.join("&&"));
        //添加公共sign
        this.setPublicSignParams(postDataList, "payment");
        //数据格式化
        postDataList.adapterParamsSignatureSession();
        let result: RequestCallBackInfo = await this._httpNet.runHttp(this.getPostRequest(postDataList));
        if (result.m_requestStatus) {
            //判断是否是200
            if (result.checkServerCmdStatus()) {
                //获取结果
                let jsonObj = result.getServerResult();
                if (jsonObj) {
                    let orderSnStr = OperateJson.getString(jsonObj, "orderSn");
                    let payGatewayStr = OperateJson.getString(jsonObj, "payGateway");
                    let appStorePidStr = OperateJson.getString(jsonObj, "appStorePid");
                    let skuIdStr = OperateJson.getString(jsonObj, "skuId");
                    if (!StringUtil.isEmpty(orderSnStr) && !StringUtil.isEmpty(payGatewayStr)) {
                        AnalyticsTool.logEvent(AnalyticsEventEnmu.store_buy);
                        let orderResult: PayOrderResultModel = new PayOrderResultModel();
                        orderResult.skuid = MyCrpty.clientDecrypt(skuIdStr, 1);
                        orderResult.appStorePid = MyCrpty.clientDecrypt(appStorePidStr, 1);
                        orderResult.orderSn = MyCrpty.clientDecrypt(orderSnStr, 1);
                        orderResult.payModel = MyCrpty.clientDecrypt(payGatewayStr, 1);

                        httpResult.code = result.getServerCmdCode();
                        httpResult.msg = result.getServerContent();
                        httpResult.succ = true;
                        httpResult.data = orderResult;
                        return httpResult;
                    }
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
     * 订单支付验证或者检测结果
     * @param params 提交参数
     * @returns
     */
     public static async validateOrder(params: ValidateOrderParams): Promise<CommonResult<any>> {
        AnalyticsTool.logEvent(AnalyticsEventEnmu.store_buy_success);
        //创建请求参数
        let httpResult: CommonResult<any> = new CommonResult<any>();
        let postDataList: PostParameter = new PostParameter();
        //设置wapsid
        this.setWapParmes(postDataList);
      
        postDataList.addPostData("key", MyCrpty.clientEncrypt(String(params.m_key), 1));
        postDataList.addPostData("payGateway", MyCrpty.clientEncrypt(String(params.m_payGateway), 1));
        postDataList.addPostData("receipt", MyCrpty.clientEncrypt(String(params.m_receipt), 1));
        postDataList.addPostData("transSign", MyCrpty.clientEncrypt(String(params.m_transSign), 1));
        postDataList.addPostData("transAt", MyCrpty.clientEncrypt(String(params.m_transAt), 1));
        postDataList.addPostData(this._apiMethodKey, "wallet/validateOrder");
        //添加公共sign
        this.setPublicSignParams(postDataList, "validate");
        //数据格式化
        postDataList.adapterParamsSignatureSession();
        let result: RequestCallBackInfo = await this._httpNet.runHttp(this.getPostRequest(postDataList));
       
        let data = [];
        for(let i in result){
            data.push(i + " = " + result[i]);
        }
        console.log("%%%%%%%%%%",data.join("&&"));
        if (result.m_requestStatus) {
            //判断是否是200
            if (result.checkServerCmdStatus()) {
                //获取结果
                let keyArr: number[] = [];
                keyArr.push(StringUtil.StringToNumber(params.m_key));
                if (!LocalStorageTool.setSuccessDepositOrd(keyArr)) {
                    if (Constants.getInstance().m_LoginUserSession.userInfo.m_payNum === 0) {
                        Constants.getInstance().m_LoginUserSession.userInfo.m_payNum = 1;
                        AnalyticsTool.logEvent(AnalyticsEventEnmu.store_user_first_buy);
                    }
                    AnalyticsTool.logEvent(AnalyticsEventEnmu.store_buy_confirm);
                    AnalyticsTool.purchase();
                    UserTaskTimerHelper.addTimerTask(2);
                }
                let jsonObj = result.getServerResult();
                let arr = []
                if (jsonObj) {
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
                }
                
                httpResult.code = result.getServerCmdCode();
                httpResult.msg = result.getServerContent();
                httpResult.succ = true;
                httpResult.data = arr;

                let goodsnum = 0;
                let goodstype = 1;
                let goodstime = 0;
                console.log("arrarrarrarrarr",arr);
                if(arr.length>0){
                    for (let n: number = 0; n < arr.length; n++) {
                        if(Number(arr[n].m_attType)==1){
                            goodsnum = goodsnum + Number(arr[n].m_valueA)
                            goodstype = 1
                        }else if(Number(arr[n].m_attType)==2){
                            goodstype = 2
                            goodsnum = goodsnum + Number(arr[n].m_valueA)
                        }else if(Number(arr[n].m_attType)==7){
                            goodstime = goodstime + Number(arr[n].m_valueA)
                        }
                    }
                    let paydata = {
                        type:goodstype,
                        num:goodsnum,
                        time:goodstime,
                    }
                    EventMgr.dispatch(EVENT.EVENT_SHOP_PAYSUC,paydata);
                }
                return httpResult;
                // let jsonObj = result.getServerResult();
                // if (jsonObj) {
                   
                // }
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
