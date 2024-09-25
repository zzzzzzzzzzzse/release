import { EventBusEnum } from "../../../../../Script/common/EventBus";
import { Constants } from "../../../../../Script/Constants";
import ThirdPartyLoginParam from "../../../../../Script/models/param/ThirdPartyLoginParam";
import UserApi from "../../../../../Script/net/apis/UserApi";

/**
 * 提示
 */
export default class ViewConnectTips {
    private baseNode: cc.Node;
    /**
     * 关闭
     */
    private m_btn_close: cc.Node;
    /**
     * facebook按钮
     */
    private m_btn_facebook: cc.Node;

    private m_btn_ios:cc.Node;
    /**
     * 金额
     */
    private m_label_coins: cc.Label;

    private m_callBack: Function;

    private btnCanClick: boolean = true;
    guangbg1: cc.Node;
    guangbg2: cc.Node;

    constructor(node: cc.Node, callBack: Function) {
        this.baseNode = node;
        this.m_callBack = callBack;
        this.init();
    }

    private init() {
        this.initView();
        this.initData();
        this.initListener();
    }

    private initView() {
        this.m_btn_close = this.baseNode.getChildByName('btn_close');
        this.m_btn_facebook = this.baseNode.getChildByName('layout').getChildByName('btn_facebook');
        this.m_btn_ios = this.baseNode.getChildByName('layout').getChildByName('btn_ios');
        this.m_label_coins = this.baseNode.getChildByName('layout_coins').getChildByName('layout').getChildByName('label').getComponent(cc.Label);

        this.guangbg1 = this.baseNode.getChildByName('guangbg');
        this.guangbg2 = this.baseNode.getChildByName('guangbg2');
        cc.tween(this.guangbg1)
        .by(3.1, { angle: 360 })
        .repeatForever()
        .start();
        cc.tween(this.guangbg2)
        .by(3.1, { angle: -360 })
        .repeatForever()
        .start();
    }

    private initData() {

    }

    private initListener() {
        this.m_btn_close.on(cc.Node.EventType.TOUCH_END, this.clickClose.bind(this));
        this.m_btn_facebook.on(cc.Node.EventType.TOUCH_END, this.clickFacebook.bind(this));
        this.m_btn_ios.on(cc.Node.EventType.TOUCH_END, this.clickIos.bind(this));
    }

    /**
     * 关闭按钮
     */
    private clickClose() {
        if (this.btnCanClick) {
            this.baseNode.active = false;
        }
    }

    /**
     * facebook点击按钮
     */
    private async clickFacebook() {
        if(!this.btnCanClick){
            return
        }
        this.btnCanClick = false;
        setTimeout(() => {
            this.btnCanClick = true
        }, 2000);
        // if (this.btnCanClick) {
            // this.btnCanClick = false;
            // this.m_btn_facebook.getComponent(cc.Button).interactable = false;
            if(cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID){
                Constants.getInstance().native.faceBookBind();
            }
        // }
    }
    /**
     * ios点击按钮
     */
    private async clickIos(){
        if(!this.btnCanClick){
            return
        }
        this.btnCanClick = false;
        setTimeout(() => {
            this.btnCanClick = true
        }, 2000);
        // if (this.btnCanClick) {
            // this.btnCanClick = false;
            // this.m_btn_ios.getComponent(cc.Button).interactable = false;
            if(Constants.getInstance().NATIVE_IOS){
                Constants.getInstance().native.iosBind();
            }
        // }
    }

    /**
     * 显示节点
     */
    public showNode() {
        this.baseNode.active = true;
        if(cc.sys.isNative && Constants.getInstance().NATIVE_IOS){
            this.m_btn_ios.active = true;
            this.m_btn_facebook.active = false;
        }else if(cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID){
            this.m_btn_ios.active = false;
            this.m_btn_facebook.active = true;
        }
    }

    /**
     * 关闭节点
     */
    public closeNode() {
        this.baseNode.active = false;
    }

    /**
     * 按钮重置
     */
    public resetBtn() {
        // this.btnCanClick = true;
        // this.m_btn_facebook.getComponent(cc.Button).interactable = true;
    }

    public getLabelNode(): cc.Node {
        return this.m_label_coins.node;
    }



    
}

