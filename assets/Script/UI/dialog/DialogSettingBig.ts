import { AudioMgr } from "../../framework/mgr/AudioManager";
import AnalyticsTool, { AnalyticsEventEnmu } from "../../tools/log/AnalyticsTool";
import { LocalStorageTool } from "../../tools/storage/LocalStorageTool";
import { CheckBox } from "../widget/CheckBox";

 
/**
 * 通用设置弹窗
 */
export default class DialogSettingBig {
 
    private baseNode: cc.Node;
    private baseDialog: cc.Node;
    
    private m_checkBox_sounds: cc.Node;//音效
    private m_checkBox_music: cc.Node;//背景音乐
    private m_checkBox_vibration: cc.Node;//震动
    private m_checkBox_systemNotify: cc.Node;//系统通知
    private m_checkBox_jackpotNotify: cc.Node;//游戏通知
 
    private m_btn_help: cc.Node;//帮助
    private m_btn_rateUs: cc.Node;//评价我们
    private m_btn_contactUs: cc.Node;//联系我们
    private m_btn_Terms: cc.Node;//团队
    private m_btn_privacyPollcy: cc.Node;//隐私
    private m_btn_about: cc.Node;//关于我们
 
    private btnClose: cc.Node;
    
    private m_gameName: string = "";

    constructor(baseNode: cc.Node, gameName: string) {
        this.baseNode = baseNode;
        this.m_gameName = gameName;
 
        this.baseDialog = this.baseNode.getChildByName('dialog_setting');

        this.m_checkBox_sounds = this.baseDialog.getChildByName('layout_content').getChildByName('item_sounds').getChildByName('btn_checkbox');
        this.m_checkBox_music = this.baseDialog.getChildByName('layout_content').getChildByName('item_music').getChildByName('btn_checkbox');
        this.m_checkBox_vibration = this.baseDialog.getChildByName('layout_content').getChildByName('item_vibration').getChildByName('btn_checkbox');
        this.m_checkBox_systemNotify = this.baseDialog.getChildByName('layout_content').getChildByName('item_systemNotifications').getChildByName('btn_checkbox');
        this.m_checkBox_jackpotNotify = this.baseDialog.getChildByName('layout_content').getChildByName('item_jackpotNotifications').getChildByName('btn_checkbox');
 
        this.m_btn_help = this.baseDialog.getChildByName('layout_content').getChildByName('layout_container').getChildByName('item_help');
        this.m_btn_rateUs = this.baseDialog.getChildByName('layout_content').getChildByName('layout_container').getChildByName('item_rateUs');
        this.m_btn_contactUs = this.baseDialog.getChildByName('layout_content').getChildByName('layout_container').getChildByName('item_contactUs');
        this.m_btn_Terms = this.baseDialog.getChildByName('layout_content').getChildByName('layout_container').getChildByName('item_terms');
        this.m_btn_privacyPollcy = this.baseDialog.getChildByName('layout_content').getChildByName('layout_container').getChildByName('item_privacyPollcy');
        this.m_btn_about = this.baseDialog.getChildByName('layout_content').getChildByName('layout_container').getChildByName('item_about');
 
        this.btnClose = this.baseDialog.getChildByName('btn_close');
        this.initListener();
    }
 
    public initData() {
        this.m_checkBox_sounds.getComponent(CheckBox).setCheck(AudioMgr.getSoundStatus() === 1? true: false);
        this.m_checkBox_music.getComponent(CheckBox).setCheck(AudioMgr.getMusicStatus() === 1? true: false);
        this.m_checkBox_vibration.getComponent(CheckBox).setCheck(LocalStorageTool.getVibrationStatus());
        this.m_checkBox_systemNotify.getComponent(CheckBox).setCheck(LocalStorageTool.getSystemNotifyStatus());
        this.m_checkBox_jackpotNotify.getComponent(CheckBox).setCheck(LocalStorageTool.getGameNotifyStatus());
    }
 
    private initListener() {
        //开关事件
        this.m_checkBox_sounds.on("check-change", this.checkBoxSound.bind(this));
        this.m_checkBox_music.on("check-change", this.checkBoxMusic.bind(this));
        this.m_checkBox_vibration.on("check-change", this.checkBoxVibration.bind(this));
        this.m_checkBox_systemNotify.on("check-change", this.checkBoxSystemNotify.bind(this));
        this.m_checkBox_jackpotNotify.on("check-change", this.checkBoxJackpotNotify.bind(this));
        //按钮事件
        // this.m_btn_help.on("click", this.openUrl.bind(this, 'https://www.baidu.com'));
        // this.m_btn_rateUs.on("click", this.openUrl.bind(this, 'https://www.baidu.com'));
        // this.m_btn_contactUs.on("click", this.openUrl.bind(this, 'https://www.baidu.com'));
        // this.m_btn_Terms.on("click", this.openUrl.bind(this, 'https://www.baidu.com'));
        // this.m_btn_privacyPollcy.on("click", this.openUrl.bind(this, 'https://www.baidu.com'));
        // this.m_btn_about.on("click", this.openUrl.bind(this, 'https://www.baidu.com'));
 
        this.btnClose.on(cc.Node.EventType.TOUCH_END, () => {
            this.closeView();
        })
    }
    /**
     * 改变音效开关
     * @param check 开关
     */
     public checkBoxSound(check: boolean) {
        AnalyticsTool.logEvent(AnalyticsEventEnmu.game_sound, this.m_gameName, check?"open": "close");
        AudioMgr.setSoundStatus(check? 1: 0);
    }
    /**
     * 改变音乐开关
     * @param check 开关
     */
    public checkBoxMusic(check: boolean) {
        AnalyticsTool.logEvent(AnalyticsEventEnmu.game_music, this.m_gameName, check?"open": "close");
        if (check) {
            AudioMgr.openMusic(this.m_gameName);
        } else {
            AudioMgr.closeMusic();
        }
    }
    /**
     * 改变震动开关
     * @param check 开关
     */
    public checkBoxVibration(check: boolean) {
        AnalyticsTool.logEvent(AnalyticsEventEnmu.game_vibration, this.m_gameName, check?"open": "close");
        LocalStorageTool.setVibrationStatus(check);
    }
    /**
     * 改变系统通知开关
     * @param check 开关
     */
    public checkBoxSystemNotify(check: boolean) {
        AnalyticsTool.logEvent(AnalyticsEventEnmu.game_system, this.m_gameName, check?"open": "close");
        LocalStorageTool.setSystemNotifyStatus(check);
    }    
    /**
     * 改变游戏通知开关
     * @param check 开关
     */
    public checkBoxJackpotNotify(check: boolean) {
        AnalyticsTool.logEvent(AnalyticsEventEnmu.game_jackpot, this.m_gameName, check?"open": "close");
        LocalStorageTool.setGameNotifyStatus(check);
    }
 
    /**
     * 打开网站
     * @param urlString 地址
     */
    public openUrl(urlString: string) {
        cc.sys.openURL(urlString);
    }
    
    /**
     * 显示窗口
     */
    public showView() {
        this.initData();
        AnalyticsTool.logEvent(AnalyticsEventEnmu.game_setting, this.m_gameName);
        this.baseNode.active = true;
    }
 
    /**
     * 关闭窗口
     */
     public closeView() {
        this.baseNode.active = false;
    }
}