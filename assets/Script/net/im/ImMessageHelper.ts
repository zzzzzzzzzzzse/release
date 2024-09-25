import ImMessageInfo from "./ImMessageInfo";

/**
 * im推送服务
 */
export default class ImMessageHelper {

    private static manager: ImMessageHelper;

    public static getInstance(): ImMessageHelper {
        if (!this.manager) {
            this.manager = new ImMessageHelper();
        }
        return this.manager;
    }

    /**
     * 发送一个消息
     */
    public sendMessage(type: BridgeDataType, object: ImMessageInfo) {
        switch (type) {
            case BridgeDataType.NONE: {
                //空处理
                break;
            }
            case BridgeDataType.SERVER_IMList: {
                //消息列表处理
                break;
            }
            case BridgeDataType.SERVER_IM: {
                //单个消息处理
                break;
            }
        }
    }
}
/**
 * 消息类型
 */
export enum BridgeDataType {
    NONE,//空
    SERVER_IMList,//消息列表
    SERVER_IM//单个消息
}