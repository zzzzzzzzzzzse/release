import { MyCrpty } from "../../libs/MyCrpty";
import WSCItemModel from "../../models/WSCItemModel";
import { LocalStorageTool } from "../../tools/storage/LocalStorageTool";
 
/**
 * socket链接请求
 */
export class SocketHost {
    //可连接host列表
    private m_hostList: Array<string> = new Array<string>();
    
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
     * @param hostList 
     */
    public addWSCList(hostList: Array<WSCItemModel>) {
        hostList.forEach(element => {
            let ssl = element.m_ssl == 0? "ws://" : "wss://";
            let wsPath = MyCrpty.clientDecrypt(element.m_wsPath, 1);
            let sign = MyCrpty.clientDecrypt(element.m_sign, 1);
            let url = ssl + wsPath;
            let canAdd = true;
            for (let i = 0; i < this.m_hostList.length; i++) {
                if (this.m_hostList[i] !== url) {
                    canAdd = false;
                }
            }
            if (canAdd) {
                this.m_hostList.push(url);
            }
        });
    }
 
    /**
     * 添加url
     * @param hostList 
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
            return this.m_hostList[0];
        }
        // return "ws://192.168.3.221:9527/ws";
        // return "ws://192.168.3.114:10100/ws";
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