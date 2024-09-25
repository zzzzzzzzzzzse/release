import { MyCrpty } from "../libs/MyCrpty";
import { StringUtil } from "../tools/StringUtil";
 
/**
 * websocket连接项
 */
export default class WSCItemModel {
    /**
     * 是否启用SSL
     */
    public m_ssl: number;
    /**
     * ws全地址：主机+端口+路径
     */
    public m_wsPath: string;
    /**
     * 用于服务器验证使用
     */
    public m_sign: string;
 
    /**
     * 获取解密sgin
     * @returns 
     */
    public getWSCSign(): string {
        if (!StringUtil.isEmpty(this.m_sign)) {
            return MyCrpty.clientDecrypt(this.m_sign, 1);
        }
        return "";
    }
}