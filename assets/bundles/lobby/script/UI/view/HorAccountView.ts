import { Constants } from "../../../../../Script/Constants";
import SlotTipsManager from "../../../../../Script/framework/mgr/SlotTipsManager";
import UserApi from "../../../../../Script/net/apis/UserApi";
import { LocalStorageTool } from "../../../../../Script/tools/storage/LocalStorageTool";
import { StringUtil } from "../../../../../Script/tools/StringUtil";
import CollectTool from "../../tool/CollectTool";

const { ccclass, property } = cc._decorator;
/**
 * 注销账户界面
 */
@ccclass
export default class HorAccountView extends cc.Component {


    protected onLoad(): void {

    }

    protected start(): void {

    }

    

    private initData() {
        
    }


    private initListener() {
        
    }

    /**
     * 确定
     */
     private clickdelete() {
        // setUserCollectTime
        LocalStorageTool.setUserCollectTime(null);
        CollectTool.nextTime = -1;
        Constants.getInstance().m_firstOpenLobby = true
        LocalStorageTool.setLoginserInfo(null);
        Constants.getInstance().hallSocket.closeSocket();
        UserApi.deleteAccount();
        cc.director.loadScene("CoreLoadScene")
        this.node.destroy();
    }

    /**
     * 关闭界面
     */
    private clickCloseView() {
        
        this.node.destroy();

    }


    /**
     * 绑定视图
     */
    public bindViewData() {
        
    }

}