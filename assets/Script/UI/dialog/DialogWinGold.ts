import ResourcesLoader from "../../tools/ResourcesLoder";
import { StringUtil } from "../../tools/StringUtil";
import WinCoinPool from "./WinCoinPool";

/**
 * 赢钱弹窗
 */
export default class DialogWinGold extends cc.Component {
    //回调处理
    private m_backCall: Function;
 
    private canvasNode: cc.Node;
    private baseNode: cc.Node;
    private img_light_bg: cc.Node;
    private img_star_left1: cc.Node;
    private img_star_left2: cc.Node;
    private img_star_right1: cc.Node;
    private img_star_right2: cc.Node;
    private img_win_title: cc.Node;
    private img_win: cc.Node;
    private layout_win_coin_bg: cc.Node;
    private label_win_coin: cc.Node;
    private anim_win_coin: cc.Node;
    private anim_ribbon: cc.Node;
    //赢得金额
    private m_win_coin: number;
 
    private m_cast_things_node: cc.Node;
 
    public coinPool: WinCoinPool = null;
    public diamondPool: WinCoinPool = null;
    public ribbonPool: WinCoinPool = null;
 
    private m_playingAudioId: number = -1;

    private m_audioList: cc.AudioClip[];
 
    private m_fullBg: cc.Node;
 
    //加钱的线程
    private winAddSchedule;
 
    public init(canvas: cc.Node, node: cc.Node) {
        this.canvasNode = canvas;
        this.baseNode = node;
        this.img_light_bg = this.baseNode.getChildByName('img_light_bg');
        this.img_star_left1 = this.baseNode.getChildByName('img_star_left1');
        this.img_star_left2 = this.baseNode.getChildByName('img_star_left2');
        this.img_star_right1 = this.baseNode.getChildByName('img_star_right1');
        this.img_star_right2 = this.baseNode.getChildByName('img_star_right2');
        this.img_win_title = this.baseNode.getChildByName('layout_win_title').getChildByName('img_win_title');
        this.img_win = this.baseNode.getChildByName('layout_win_title').getChildByName('img_win');
        this.layout_win_coin_bg = this.baseNode.getChildByName('layout_win_coin_bg');
        this.label_win_coin = this.baseNode.getChildByName('layout_win_coin_bg').getChildByName('label');
        this.anim_win_coin = this.baseNode.getChildByName('layout_win_coin_bg').getChildByName('anim_win_coin');
        this.anim_ribbon = this.baseNode.getChildByName('anim_ribbon');
        this.m_cast_things_node = this.baseNode.getChildByName('cast_things');

        this.layout_win_coin_bg.on(cc.Node.EventType.TOUCH_END, this.clickCloseView.bind(this));
        let layoutBg = this.baseNode.getChildByName('bg');
        if (layoutBg) {
            layoutBg.on(cc.Node.EventType.TOUCH_END, this.clickCloseView.bind(this));
        }
        

        this.initAnim();
    }

    /**
     * 点击关闭界面
     */
    public clickCloseView() {
        //点击关闭弹窗
        if (this.winAddSchedule) {
            this.unschedule(this.winAddSchedule);
            this.winAddSchedule = null;
            if (this.m_playingAudioId >= 0) {
                cc.audioEngine.stop(this.m_playingAudioId);
                cc.audioEngine.play(this.m_audioList[0], false, 1);
            }
            this.label_win_coin.getComponent(cc.Label).string = StringUtil.showMoneyType(this.m_win_coin);
            this.closeDialog();
        }
    }

    /**
     * 设置音效
     */
    public setAudio(audioList: cc.AudioClip[]) {
        this.m_audioList = audioList;
    }
 
    /**
     * 初始化动画
     */
    public initAnim() {
        this.label_win_coin.getComponent(cc.Label).string = String(0);
        cc.tween(this.img_light_bg).stop();
        cc.tween(this.img_win_title).stop();
        cc.tween(this.img_win).stop();
        cc.tween(this.img_star_left1).stop();
        cc.tween(this.img_star_left2).stop();
        cc.tween(this.img_star_right1).stop();
        cc.tween(this.img_star_right2).stop();
        this.img_star_left1.scale = 0;
        this.img_star_left2.scale = 0;
        this.img_star_right1.scale = 0;
        this.img_star_right2.scale = 0;
        this.baseNode.scale = 0;
        this.anim_win_coin.active = false;
    }
 
    /**
     * 显示弹窗
     * @param winNum 赢的金额
     * @param betNum 下注金额
     */
    public showDialog(winNum: number, betNum: number, fullBg: cc.Node, needStopAudioCall: Function, backCall: Function) {
        this.m_backCall = backCall;
        this.m_fullBg = fullBg;
        this.initAnim();
        this.m_win_coin = winNum;
        switch (this.getShowType(winNum, betNum)) {
            case DialogWinShowType.HUGE: {
                this.m_fullBg.active = true;
                if (needStopAudioCall) {
                    needStopAudioCall();
                }
                this.anim_ribbon.getComponent(sp.Skeleton).setSkin('lan');
                this.anim_ribbon.getComponent(sp.Skeleton).setAnimation(0, 'animation', true);
                //加载资源
                ResourcesLoader.imgLoader('public_slot/Slot_dialog_win_coin/Slot_dialog_huge').then(asset => {
                    this.img_win_title.getComponent(cc.Sprite).spriteFrame = asset;
                    this.startAnim(this.m_audioList[1]);
                });
                ResourcesLoader.imgLoader('public_slot/Slot_dialog_win_coin/Slot_dialog_huge_bg').then(asset => {
                    this.layout_win_coin_bg.getComponent(cc.Sprite).spriteFrame = asset;
                });
                break;
            }
            case DialogWinShowType.SUPER: {
                this.m_fullBg.active = true;
                if (needStopAudioCall) {
                    needStopAudioCall();
                }
                this.anim_ribbon.getComponent(sp.Skeleton).setSkin('hong');
                this.anim_ribbon.getComponent(sp.Skeleton).setAnimation(0, 'animation', true);
                //加载资源
                ResourcesLoader.imgLoader('public_slot/Slot_dialog_win_coin/Slot_dialog_super').then(asset => {
                    this.img_win_title.getComponent(cc.Sprite).spriteFrame = asset;
                    this.startAnim(this.m_audioList[2]);
                });
                ResourcesLoader.imgLoader('public_slot/Slot_dialog_win_coin/Slot_dialog_super_bg').then(asset => {
                    this.layout_win_coin_bg.getComponent(cc.Sprite).spriteFrame = asset;
                });
                break;
            }
            case DialogWinShowType.FANTASTIC: {
                this.m_fullBg.active = true;
                if (needStopAudioCall) {
                    needStopAudioCall();
                }
                this.anim_ribbon.getComponent(sp.Skeleton).setSkin('zi');
                this.anim_ribbon.getComponent(sp.Skeleton).setAnimation(0, 'animation', true);
                //加载资源
                ResourcesLoader.imgLoader('public_slot/Slot_dialog_win_coin/Slot_dialog_fantastic').then(asset => {
                    this.img_win_title.getComponent(cc.Sprite).spriteFrame = asset;
                    this.startAnim(this.m_audioList[3]);
                });
                ResourcesLoader.imgLoader('public_slot/Slot_dialog_win_coin/Slot_dialog_fantastic_bg').then(asset => {
                    this.layout_win_coin_bg.getComponent(cc.Sprite).spriteFrame = asset;
                });
                break;
            }
            default: {
                if (backCall) {
                    backCall();
                }
                break;
            }
        }
    }
 
    /**
     * 显示弹窗类型
     * @param winNum
     * @param betNum 下注金额
     * @returns 1:huge；2.super；3.fantastic
     */
    public getShowType(winNum: number, betNum: number): number {
        if (winNum >= betNum * 20) {
            return DialogWinShowType.FANTASTIC;
        } else if (winNum >= betNum * 10) {
            return DialogWinShowType.SUPER;
        } else if (winNum >= betNum * 5) {
            return DialogWinShowType.HUGE;
        }
        return DialogWinShowType.NONE;
    }
 
    /**
     * 开始动画
     */
    public startAnim(audioClip: cc.AudioClip) {
        this.baseNode.active = true;
        //旋转
        cc.tween(this.img_light_bg).by(5, {angle: 360}).repeatForever().start();
        cc.tween(this.img_win_title).repeatForever(cc.sequence(cc.scaleTo(0.9, 1.1, 1.1), cc.scaleTo(1.1, 0.9, 0.9))).start();
        cc.tween(this.img_win).repeatForever(cc.sequence(cc.scaleTo(1, 1.1, 1.1), cc.scaleTo(1, 0.9, 0.9))).start();
        cc.tween(this.baseNode).to(0.3, {scale: 1.5}).to(0.15, {scale: 1}).call(() => {
            this.castThings();
            //中间动画
            this.anim_win_coin.active = true;
            this.anim_win_coin.getComponent(sp.Skeleton).setCompleteListener(() => {
                this.anim_win_coin.active = false;
            })
            this.anim_win_coin.getComponent(sp.Skeleton).setAnimation(0, 'animation', false);
            this.m_playingAudioId = cc.audioEngine.play(audioClip, true, 1);
            this.addWinGold();
        }).start();
        cc.tween(this.img_star_left1).to(0.1, {}).to(0.2, {scaleX: -1.5, scaleY: 1.5}).to(0.15, {
            scaleX: -1,
            scaleY: 1
        }).call(() => {
            cc.tween(this.img_star_left1).repeatForever(cc.sequence(cc.scaleTo(0.6, -1.1, 1.1), cc.scaleTo(0.6, -0.9, 0.9))).start();
        }).start();
        cc.tween(this.img_star_right1).to(0.15, {}).to(0.2, {scale: 1.5}).to(0.15, {scale: 1}).call(() => {
            cc.tween(this.img_star_right1).repeatForever(cc.sequence(cc.scaleTo(0.6, 1.1, 1.1), cc.scaleTo(0.6, 0.9, 0.9))).start();
        }).start();
        cc.tween(this.img_star_left2).to(0.2, {scaleX: -1.3, scaleY: 1.3}).to(0.15, {
            scaleX: -0.8,
            scaleY: 0.8
        }).call(() => {
            cc.tween(this.img_star_left2).repeatForever(cc.sequence(cc.scaleTo(0.6, -0.9, 0.9), cc.scaleTo(0.6, -0.7, 0.7))).start();
        }).start();
        cc.tween(this.img_star_right2).to(0.2, {scale: 1.3}).to(0.15, {scale: 0.8}).call(() => {
            cc.tween(this.img_star_right2).repeatForever(cc.sequence(cc.scaleTo(0.6, 0.9, 0.9), cc.scaleTo(0.6, 0.7, 0.7))).start();
        }).start();
    }
 
    /**
     * 中奖金额
     */
    public addWinGold() {
        if (this.m_win_coin > 0) {
            let _this = this;
            let thisGold = 0;
            this.winAddSchedule = function () {
                //播放2秒的加钱动画
                if (thisGold >= _this.m_win_coin) {
                    if (_this.m_playingAudioId >= 0) {
                        cc.audioEngine.stop(_this.m_playingAudioId);
                        cc.audioEngine.play(_this.m_audioList[0], false, 1);
                    }
                    _this.label_win_coin.getComponent(cc.Label).string = StringUtil.showMoneyType(_this.m_win_coin);
                    _this.closeDialog();
                    _this.unschedule(this.winAddSchedule);
                } else {
                    thisGold += Math.floor(_this.m_win_coin / 100);
                    _this.label_win_coin.getComponent(cc.Label).string = StringUtil.showMoneyType(thisGold);
                }
            }
            this.schedule(this.winAddSchedule, 0.05);
        }
    }
 
    public castThings() {
        this.baseNode.scale = 1;
        this.coinPool = this.m_cast_things_node.getChildByName('coins_pool').getComponent(WinCoinPool);
        this.diamondPool = this.m_cast_things_node.getChildByName('diamonds_pool').getComponent(WinCoinPool);
        this.ribbonPool = this.m_cast_things_node.getChildByName('ribbons_pool').getComponent(WinCoinPool);
        this.coinPool.flushItems(100, 0.05, 1000, -800, Math.floor(Math.random() * 50), Math.floor(Math.random() * 200 + 100), 1, 2, 1, true);
        this.diamondPool.flushItems(100, 0.05, 1000, -800, Math.floor(Math.random() * 50), Math.floor(Math.random() * 200 + 100), .5, 1.5, 1, true);
        this.ribbonPool.flushItems(100, 0.05, 1000, -100, Math.floor(Math.random() * 50), Math.floor(Math.random() * 100 + 10), 1, 2, 1, true);
    }
 
    /**
     * 关闭动画
     */
    public closeDialog() {
        if (this.m_fullBg) {
            this.m_fullBg.active = false;
        }
        
        this.m_playingAudioId = -1;
        cc.tween(this.baseNode).delay(1.5).to(0.15, {scale: 1.5}).to(0.2, {scale: 0}).call(() => {
            this.initAnim();
            if (this.coinPool) {
                // this.coinPool.stopAnim();
                // this.coinPool = null;
            }
            if (this.diamondPool) {
                // this.diamondPool.stopAnim();
                // this.diamondPool = null;
            }
            if (this.ribbonPool) {
                // this.ribbonPool.stopAnim();
                // this.ribbonPool = null;
            }
            //回调
            if (this.m_backCall) {
                this.m_backCall();
            }
        }).start();
    }
 
    /**
     * 清除回调
     */
    public removeBackCall() {
        this.m_backCall = null;
    }
}
 
/**
 * 显示弹窗类型
 */
export enum DialogWinShowType {
    NONE = 0,
    HUGE = 1,
    SUPER = 2,
    FANTASTIC = 3
}