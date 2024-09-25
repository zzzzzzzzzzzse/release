import { MyCrpty } from "../../libs/MyCrpty";
import { SlotGameListParam } from "../../models/param/SlotGameListParam";
import { SlotGameModel, SlotGameRoomModel } from "../../models/SlotGameModel";
import { SlotGoldPoolInfo } from "../../models/SlotGoldPoolInfo";
import { OperateJson } from "../../tools/OperateJson";
import { StringUtil } from "../../tools/StringUtil";
import { CommonResult } from "../CommonResult";
import PostParameter from "../PostParameter";
import { RequestCallBackInfo } from "../RequestCallBackInfo";
import { BaseApi } from "./BaseApi";

/**
 * Slot业务
 */
export class SlotApi extends BaseApi {
    /**
     * 获取游戏列表
     * @param ranDevSign 请求参数
     * @returns
     */
    public static async getGameList(params: SlotGameListParam): Promise<CommonResult<any>> {
        //创建请求参数
        let httpResult: CommonResult<any> = new CommonResult<any>();
        let postDataList: PostParameter = new PostParameter();
        //设置wapsid
        this.setWapParmes(postDataList);
        postDataList.addPostData("mode", params.m_mode);
        if (params.m_ids) {
            postDataList.addPostData("ids", params.m_ids);
        }
        postDataList.addPostData("offset", MyCrpty.clientEncrypt(String(params.m_offset), 1));
        if (params.m_dateId) {
            postDataList.addPostData("dateId", String(params.m_dateId));
        }
        postDataList.addPostData(this._apiMethodKey, "slot/gamelist");
        //添加公共sign
        this.setPublicSignParams(postDataList, "slot");
        //数据格式化
        postDataList.adapterParamsSignatureSession();

        let result: RequestCallBackInfo = await this._httpNet.runHttp(this.getPostRequest(postDataList));
        console.log("lllllllllllllllll", result);
        if (result.m_requestStatus) {
            //判断是否是200
            if (result.checkServerCmdStatus()) {
                let jsonObj = result.getServerResult();
                if (jsonObj) {
                    //游戏
                    let gameJson = OperateJson.getJsonArr(jsonObj, "games");
                    if (gameJson) {
                        let slotsList: Array<SlotGameModel> = new Array<SlotGameModel>();
                        let item: SlotGameModel = null;
                        for (let i in gameJson) {
                            item = new SlotGameModel();
                            item.m_id = OperateJson.getNumber(gameJson[i], "id");
                            item.m_gameGid = OperateJson.getNumber(gameJson[i], "gameGid");
                            item.m_specialType = OperateJson.getNumber(gameJson[i], "specialType");
                            item.m_isBlankLines = OperateJson.getNumber(gameJson[i], "isBlankLines");
                            item.m_isComm = OperateJson.getNumber(gameJson[i], "isComm");
                            item.m_isHot = OperateJson.getNumber(gameJson[i], "isHot");
                            item.m_isNew = OperateJson.getNumber(gameJson[i], "isNew");
                            item.betUserLevelB0 = OperateJson.getNumber(gameJson[i], "betUserLevelB0");
                            item.m_lineType = OperateJson.getNumber(gameJson[i], "lineType");
                            item.m_row = OperateJson.getNumber(gameJson[i], "row");
                            item.m_column = OperateJson.getNumber(gameJson[i], "column");
                            item.m_openLevel = OperateJson.getNumber(gameJson[i], "openLevel");
                            item.m_version = OperateJson.getNumber(gameJson[i], "version");
                            item.m_title = OperateJson.getString(gameJson[i], "title");
                            item.m_icoUrl = OperateJson.getString(gameJson[i], "icoUrl");
                            item.m_mark = OperateJson.getString(gameJson[i], "mark");
                            item.m_remark = OperateJson.getString(gameJson[i], "remark");
                            item.m_superIcoUrl = OperateJson.getString(gameJson[i], "superIcoUrl");
                            item.m_collectConfigId = OperateJson.getNumber(gameJson[i], "collectConfigId");
                            item.m_collectRomLevel = OperateJson.getNumber(gameJson[i], "collectRomLevel") - 1;
                            let rooms = OperateJson.getJsonArr(gameJson[i], 'rooms');
                            for (let j in rooms) {
                                let room: SlotGameRoomModel = {
                                    level: 0,
                                    tradeMin: 0,
                                    tradeMax: 0,
                                    markTag: 0,
                                    unlockUserLevel: 0,
                                    betList: []
                                };
                                room.level = OperateJson.getNumber(rooms[j], 'level');
                                room.tradeMin = OperateJson.getNumber(rooms[j], 'tradeMin');
                                room.tradeMax = OperateJson.getNumber(rooms[j], 'tradeMax');
                                room.markTag = OperateJson.getNumber(rooms[j], 'markTag');
                                room.unlockUserLevel = OperateJson.getNumber(rooms[j], 'unlockUserLevel');
                                let betListJson = OperateJson.getJsonArr(rooms[j], 'betList');
                                for (let betItem in betListJson) {
                                    room.betList.push(StringUtil.StringToNumber(betListJson[betItem]));
                                }
                                item.m_rooms.push(room);
                            }
                            slotsList.push(item);
                        }
                        httpResult.code = result.getServerCmdCode();
                        httpResult.msg = result.getServerContent();
                        httpResult.succ = true;
                        httpResult.data = slotsList;
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
     * 获取游戏奖池
     * @param index 
     * @returns 
     */
    public static async gameboundInfo(id: number, gid?: number): Promise<CommonResult<any>> {
        //创建请求参数
        let httpResult: CommonResult<any> = new CommonResult<any>();
        let postDataList: PostParameter = new PostParameter();
        //设置wapsid
        this.setWapParmes(postDataList);

        postDataList.addPostData("id", String(id));
        if (gid) {
            postDataList.addPostData("gid", String(gid));
        }
        postDataList.addPostData(this._apiMethodKey, "slot/gameboundInfo");
        //添加公共sign
        this.setPublicSignParams(postDataList, "slot");
        //数据格式化
        postDataList.adapterParamsSignatureSession();

        let result: RequestCallBackInfo = await this._httpNet.runHttp(this.getPostRequest(postDataList));
        if (result.m_requestStatus) {
            //判断是否是200
            if (result.checkServerCmdStatus()) {
                let jsonObj = result.getServerResult();
                if (jsonObj) {
                    let slotGoldPoolInfo = new SlotGoldPoolInfo();
                    slotGoldPoolInfo.gameId = id;
                    slotGoldPoolInfo.pool_1 = OperateJson.getbigInt(jsonObj, "pool_1");
                    slotGoldPoolInfo.pool_2 = OperateJson.getbigInt(jsonObj, "pool_2");
                    slotGoldPoolInfo.pool_3 = OperateJson.getbigInt(jsonObj, "pool_3");
                    slotGoldPoolInfo.pool_4 = OperateJson.getbigInt(jsonObj, "pool_4");
                    slotGoldPoolInfo.pool_5 = OperateJson.getbigInt(jsonObj, "pool_5");
                    slotGoldPoolInfo.pool_6 = OperateJson.getbigInt(jsonObj, "pool_6");
                    slotGoldPoolInfo.pool_7 = OperateJson.getbigInt(jsonObj, "pool_7");
                    httpResult.code = result.getServerCmdCode();
                    httpResult.msg = result.getServerContent();
                    httpResult.succ = true;
                    httpResult.data = slotGoldPoolInfo;
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
     * 获取所有游戏奖池
     * @param index 
     * @returns 
     */
    public static async gamebounds(): Promise<CommonResult<any>> {
        //创建请求参数
        let httpResult: CommonResult<any> = new CommonResult<any>();
        let postDataList: PostParameter = new PostParameter();
        //设置wapsid
        this.setWapParmes(postDataList);
        postDataList.addPostData(this._apiMethodKey, "slot/gamebounds");
        //添加公共sign
        this.setPublicSignParams(postDataList, "slot");
        //数据格式化
        postDataList.adapterParamsSignatureSession();

        let result: RequestCallBackInfo = await this._httpNet.runHttp(this.getPostRequest(postDataList));
        if (result.m_requestStatus) {
            //判断是否是200
            if (result.checkServerCmdStatus()) {
                let jsonObj = result.getServerResult();
                if (jsonObj) {
                    //游戏
                    let boundsJson = OperateJson.getJsonArr(jsonObj, "bounds");
                    if (boundsJson) {
                        let gameboundsList: Array<SlotGoldPoolInfo> = new Array<SlotGoldPoolInfo>();
                        let item: SlotGoldPoolInfo = null;
                        for (let i in boundsJson) {
                            item = new SlotGoldPoolInfo();
                            item.gameId = OperateJson.getNumber(boundsJson[i], "id");
                            item.pool_1 = OperateJson.getbigInt(boundsJson[i], "pool_1");
                            item.pool_2 = OperateJson.getbigInt(boundsJson[i], "pool_2");
                            item.pool_3 = OperateJson.getbigInt(boundsJson[i], "pool_3");
                            item.pool_4 = OperateJson.getbigInt(boundsJson[i], "pool_4");
                            item.pool_5 = OperateJson.getbigInt(boundsJson[i], "pool_5");
                            item.pool_6 = OperateJson.getbigInt(boundsJson[i], "pool_6");
                            item.pool_7 = OperateJson.getbigInt(boundsJson[i], "pool_7");
                            gameboundsList.push(item);
                        }
                        httpResult.code = result.getServerCmdCode();
                        httpResult.msg = result.getServerContent();
                        httpResult.succ = true;
                        httpResult.data = gameboundsList;
                        return httpResult;
                    }
                }
            }
        } else {
            //失败
        }
        httpResult.succ = false;
        return httpResult;
    }
}
