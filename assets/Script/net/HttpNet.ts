import { Constants } from "../Constants";
import AppLanguageConfig from "../configs/AppLanguageConfig";
import { HttpClient, HttpRequest, HttpResponse } from "../libs/signalr/HttpClient";
import { createLogger } from "../libs/signalr/Utils";
import { XhrHttpClient } from "../libs/signalr/XhrHttpClient";
import { OperateJson } from "../tools/OperateJson";
import { StringUtil } from "../tools/StringUtil";
import { RequestCallBackInfo } from "./RequestCallBackInfo";


export class HttpNet {

    readonly m_timeOut: number = 10000;

    private httpClient: HttpClient = new XhrHttpClient(createLogger());

    private _requestCount: number = 0;

    /**
     * 用户认证失败
     */
    private readonly g_httpUserAuthenticateCode: number = 888;
    private readonly g_serverUserAuthenticateCode: number = 50888;
    //用户认证失败，返回到登录界面
    private readonly g_httpUserGotoLoginCode: number = 887;
    private readonly g_serverUserGotoLoginCode: number = 50887;

    public get requestCount() {
        return this._requestCount;
    }

    /**
     * 执行http代码
     * @param requestOption 
     * @returns 
     */
    public async runHttp(requestOption: IHttpHubRequest): Promise<RequestCallBackInfo> {
        if (!requestOption.url) {
            throw new Error("Base Url Not Set");
        }

        //设置头信息
        this.setCustomHeader(requestOption);

        if (!requestOption.silent) {
            this._requestCount += 1;
        }
        try {
            let requestCallBackInfo = await this.sendRaw(requestOption);
            if (!requestOption.silent) {
                this._requestCount -= 1;
            }
            let checkModel = await this.checkUserAuthenticate(requestCallBackInfo, false);
            if (checkModel === 1) {
                requestCallBackInfo = await this.sendRaw(requestOption);
                checkModel = await this.checkUserAuthenticate(requestCallBackInfo, true);
                if (checkModel != 0) {
                    return requestCallBackInfo;
                }
            }
            return requestCallBackInfo;
        } catch (e) {
            console.log("eeeeeeee", e);
            if (!requestOption.silent) {
                this._requestCount -= 1;
            }
            requestOption.body
            return this.httpException();
        }
    }

    /**
     * 发送请求
     * @param requestOption 
     * @returns 
     */
    public async sendRaw(requestOption: IHttpHubRequest) {
        let request: HttpRequest = {
            //abortSignal: this.pollAbort.signal,
            url: requestOption.url,
            method: requestOption.method,
            headers: requestOption.headers,
            // responseType: "json",
            timeout: this.m_timeOut
        };
        request.content = requestOption.body;
        try {
            //console.warn("server response:", JSON.stringify(request));
            let response = await this.httpClient.send(request);
            //console.log("server request:", JSON.stringify(response));
            return this.explanOKHttpResponse(response);
        } catch (e) {
        }
        return this.httpException();
    }

    private parseParams(params: {}) {
        let paramsArr: string[] = [];
        let keys = Object.keys(params);
        for (let key of keys) {
            paramsArr.push(`${key}=${params[key]}`)
        }
        return paramsArr.join("&");
    }

    /**
     * 添加自定义头
     */
    private setCustomHeader(requestOption: IHttpHubRequest) {
        if (requestOption.headers) {
            requestOption.headers["Content-Type"] = "application/x-www-form-urlencoded";
        } else {
            requestOption.headers = { "Content-Type": "application/x-www-form-urlencoded" };
        }

        requestOption.headers["SYSAGENTS"] = Constants.getInstance().native.getUserAgent();
        // requestOption.headers["User-Agent"] = navigator.userAgent;
        //用户id
        requestOption.headers["UID"] = Constants.getInstance().m_LoginUserSession.getUserId();
        //用户token
        requestOption.headers["TOKEN"] = Constants.getInstance().m_LoginUserSession.m_userToken;
        //时区
        requestOption.headers["TIMEZHONE"] = new Date().getTimezoneOffset() / 60;
        //屏幕尺寸
        requestOption.headers["SIZE"] = Constants.getInstance().native.getScreenSizeOfDevice();
        //缓存
        // requestOption.headers["Last-Modified"] = this._configs.lastModified;
        /**
         * 请求状态
         * 888 重登录获取新的TOKEN
         * 887 过期TOKEN回到登录界面
         */
        // requestOption.headers["STATUS"] = this._configs.httpStatus;
    }

    /**
     * 请求结果处理
     * @param response 请求返回数据
     * @returns 
     */
    public explanOKHttpResponse(response: HttpResponse): RequestCallBackInfo {
        let requestCallBackInfo = new RequestCallBackInfo();
        if (response) {
            requestCallBackInfo.m_requestStatus = true;
            requestCallBackInfo.m_ServerStatusCode = response.statusCode;
            requestCallBackInfo.m_ServerCallBackInfo = response.content.toString();
        } else {
            //异常状态
            requestCallBackInfo.m_ServerStatusCode = 500;
            requestCallBackInfo.m_requestStatus = false;
            requestCallBackInfo.m_ServerCallBackInfo = "Server request exception, please try again!";
            requestCallBackInfo.m_errorInfo = "Unknow error";
        }
        return requestCallBackInfo;
    }

    /**
     * 异常结果处理
     * @param response 请求返回数据
     * @returns 
     */
    public httpException(errStr?: string): RequestCallBackInfo {
        let requestCallBackInfo = new RequestCallBackInfo();
        requestCallBackInfo.m_ServerStatusCode = 500;
        requestCallBackInfo.m_requestStatus = false;
        requestCallBackInfo.m_ServerCallBackInfo = "Server request exception, please try again!";
        if (errStr) {
            requestCallBackInfo.m_errorInfo = errStr;
        } else {
            requestCallBackInfo.m_errorInfo = "Unknow error";
        }
        return requestCallBackInfo;
    }

    /**
     * 检测用户认证
     * @param response 请求回调
     * @param isTry 是否重新链接过
     * @returns 0正常用户；1为登录成功；2为登录失败；3为真的登录失败
     */
    private checkUserAuthenticate(response: RequestCallBackInfo, isTry: boolean) {
        switch (response.m_ServerStatusCode) {
            case 200: {
                //正常回来
                let json = response.getServerJsonInfo();
                if (json) {
                    let code = OperateJson.getNumber(json, "code", -1);
                    let msg = OperateJson.getString(json, "msg");
                    switch (code) {
                        case this.g_serverUserAuthenticateCode: {
                            //888认证
                            if (isTry) {
                                response.m_ServerStatusCode = this.g_httpUserAuthenticateCode;
                                response.m_ServerCallBackInfo = AppLanguageConfig.http_network_userLogin;
                            } else {
                                //重新登录检测
                                let result = Constants.getInstance().userReLogin();
                                return result;
                            }
                            break;
                        }
                        case this.g_serverUserGotoLoginCode: {
                            //887认证，失败去登录
                            if (StringUtil.isEmpty(msg)) {
                                msg = AppLanguageConfig.text_loginInfo_expired;
                            }
                            //todo 退出登录
                            break;
                        }
                    }
                }
                break;
            }
            case this.g_httpUserAuthenticateCode: {
                //用户认证失败
                if (isTry) {
                    response.m_ServerStatusCode = this.g_httpUserAuthenticateCode;
                    response.m_ServerCallBackInfo = AppLanguageConfig.http_network_userLogin;
                } else {
                    //重新登录检测
                    let result = Constants.getInstance().userReLogin();
                    return result;
                }
                break;
            }
            case this.g_httpUserGotoLoginCode: {
                //用户认证失败返回登录界面
                if (StringUtil.isEmpty(response.m_errorInfo)) {
                    response.m_errorInfo = AppLanguageConfig.text_loginInfo_expired;
                }
                //todo 退出登录
                break;
            }
        }
        return 0;
    }
}

export interface IHttpHubRequest {
    url: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    headers?: any;
    query?: any;
    body?: any;
    silent?: boolean;
}