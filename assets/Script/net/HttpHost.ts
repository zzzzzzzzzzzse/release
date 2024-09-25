import AppPlatformConfig from "../configs/AppPlatformConfig";
import { LocalStorageTool } from "../tools/storage/LocalStorageTool";
import { StringUtil } from "../tools/StringUtil";

/**
 * Http链接请求
 */
export class HttpHost {
    //可连接host列表
    public m_hostList: Array<string> = new Array<string>();
    //初始url
    private readonly m_baseUrl = AppPlatformConfig.getHttpUrl();
    // private readonly m_baseUrl = AppPlatformConfig.TEST_HTTPURL;
    
    constructor () {
        //初始化
        let baseApi: string = LocalStorageTool.getBaseApiHost();
        if (!StringUtil.isEmpty(baseApi)) {
            this.m_baseUrl = baseApi;
        }
        this.m_hostList.push(this.m_baseUrl);
    }

    /**
     * 添加url
     * @param url 
     */
    public add(url: string) {
        let canAdd = true;
        for (let i = 0; i < this.m_hostList.length; i++) {
            if (this.m_hostList[i] === url) {
                canAdd = false;
            }
        }
        if (canAdd) {
            this.m_hostList.push(url);
        }
    }

    /**
     * 添加url
     * @param m_hostList 
     */
    public addList(hostList: Array<string>) {
        hostList.forEach(element => {
            let canAdd = true;
            for (let i = 0; i < this.m_hostList.length; i++) {
                if (this.m_hostList[i] !== element) {
                    canAdd = false;
                }
            }
            if (canAdd) {
                this.m_hostList.push(element);
            }
        });
    }

    /**
     * 获取url
     * @returns 
     */
    public getHostUrl(): string {
        if (this.m_hostList.length > 0) {
            return this.m_hostList[0];
        } else {
            //重新加初始值
            let hostList = JSON.parse(LocalStorageTool.getApiHost());
            if (hostList && hostList.length>0) {
                this.addList(hostList)
            }
            this.add(this.m_baseUrl);
            return this.m_hostList[0];
        }
    }

    /**
     * 删除url下一个url
     */
    public nextUrl() {
        if (this.m_hostList.length > 0) {
            this.m_hostList.splice(0,1);
        }
    }
}
