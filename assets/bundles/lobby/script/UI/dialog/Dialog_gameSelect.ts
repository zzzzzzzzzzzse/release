import AppBundleConfig from "../../../../../Script/configs/AppBundleConfig";
import { Constants } from "../../../../../Script/Constants";
import { AudioMgr } from "../../../../../Script/framework/mgr/AudioManager";
import { SlotGameModel } from "../../../../../Script/models/SlotGameModel";
import ResourcesLoader from "../../../../../Script/tools/ResourcesLoder";
import { StringUtil } from "../../../../../Script/tools/StringUtil";
import { SlotGameConfigModel } from "../../../config/SlotGameConfig";

/**
 * 游戏选择弹窗
 */
export class Dialog_gameSelect extends cc.Component {
    private baseNode: cc.Node;

    private m_gamebg: cc.Node;
    private m_gameLogo: cc.Node;
    private m_gameLogotitle: cc.Node;
    private m_gameTitle: cc.Node;
    private btn1: cc.Node;
    private btn1Value: cc.Node;
    private btn2: cc.Node;
    private btn2Value: cc.Node;
    private btn3: cc.Node;
    private btn3Value: cc.Node;
    private btn4: cc.Node;
    private btn4Value: cc.Node;

    private closeBtn: cc.Node;

    private m_thisSlotGameModel: SlotGameModel;
    private m_thisSlotGameConfig: SlotGameConfigModel;

    public init(node: cc.Node) {
        this.baseNode = node;

        this.m_gamebg = this.baseNode.getChildByName('gamebg');
        this.m_gameLogo = this.baseNode.getChildByName('gameAnim');
        this.m_gameLogotitle = this.baseNode.getChildByName('gametitleAnim');
        this.m_gameTitle = this.baseNode.getChildByName('layout_right').getChildByName('img');
        this.btn1 = this.baseNode.getChildByName('layout_btn1').getChildByName('btn');
        this.btn1Value = this.btn1.getChildByName('label');
        this.btn2 = this.baseNode.getChildByName('layout_btn2').getChildByName('btn');
        this.btn2Value = this.btn2.getChildByName('label');
        this.btn3 = this.baseNode.getChildByName('layout_btn3').getChildByName('btn');
        this.btn3Value = this.btn3.getChildByName('label');
        this.btn4 = this.baseNode.getChildByName('layout_btn4').getChildByName('btn');
        this.btn4Value = this.btn4.getChildByName('label');

        this.closeBtn = this.baseNode.getChildByName('btn_close');

        this.initData();
        this.initListener();
    }

    private initData() {

    }

    private initListener() {
        //test123123
        this.btn1.on(cc.Node.EventType.TOUCH_END, () => {
            //点击
            Constants.getInstance().m_userPlayingGame = this.m_thisSlotGameModel;
            Constants.getInstance().m_betNumber = this.getLastBet(4,1);
            cc.log("betNumber=",Constants.getInstance().m_betNumber)
            this.loadBundleScenec(this.m_thisSlotGameConfig);
            this.closeView();
        });
        this.btn2.on(cc.Node.EventType.TOUCH_END, () => {
            //点击
            Constants.getInstance().m_userPlayingGame = this.m_thisSlotGameModel;
            Constants.getInstance().m_betNumber = this.getLastBet(6,1);
            cc.log("betNumber=",Constants.getInstance().m_betNumber)
            this.loadBundleScenec(this.m_thisSlotGameConfig);
            this.closeView();
        });
        this.btn3.on(cc.Node.EventType.TOUCH_END, () => {
            //点击
            Constants.getInstance().m_userPlayingGame = this.m_thisSlotGameModel;
            Constants.getInstance().m_betNumber = this.getLastBet(1,1);
            cc.log("betNumber=",Constants.getInstance().m_betNumber)
            this.loadBundleScenec(this.m_thisSlotGameConfig);
            this.closeView();
        });
        this.btn4.on(cc.Node.EventType.TOUCH_END, () => {
            //点击
            Constants.getInstance().m_userPlayingGame = this.m_thisSlotGameModel;
            Constants.getInstance().m_betNumber = this.getLastBet(2,1);
            cc.log("betNumber=",Constants.getInstance().m_betNumber)
            this.loadBundleScenec(this.m_thisSlotGameConfig);
            this.closeView();
        });
        this.closeBtn.on(cc.Node.EventType.TOUCH_END, () => {
            //点击
            this.closeView();
        });
    }

    /**
     * 登录bundle
     * @param gameConfig 
     */
    public loadBundleScenec(gameConfig: SlotGameConfigModel) {
        if (gameConfig.loadingScence) {
            if (gameConfig.gameOrientation == 2) {
                Constants.getInstance().resLoader.loadBundleScene(Constants.getInstance().m_hallBundle, AppBundleConfig.BUNDLE_VERLOADINGScene, gameConfig.gameOrientation, gameConfig);
            } else {
                Constants.getInstance().resLoader.loadBundleScene(Constants.getInstance().m_hallBundle, AppBundleConfig.BUNDLE_LOADINGScene, gameConfig.gameOrientation, gameConfig);
            }
        } else {
            cc.assetManager.loadBundle(gameConfig.gameBundle, (err, sucBundle) => {
                if (err) {
                } else {
                    if (sucBundle) {
                        Constants.getInstance().m_gameBundle = sucBundle;
                        Constants.getInstance().resLoader.loadBundleScene(sucBundle, gameConfig.gameSceneUrl, gameConfig.gameOrientation);
                    } else {
                    }
                }
            });
        }
    }

    /**
     * 设置游戏
     * @param gameId 
     */
    public setGameShow(gameData: SlotGameModel, config: SlotGameConfigModel) {
        AudioMgr.play("public_slot/audio/button_click", "resources")
        this.m_thisSlotGameModel = gameData;
        this.m_thisSlotGameConfig = config;
        
        this.setView();
        this.baseNode.active = true;
    }

    /**
     * 设置视图
     */
    private setView() {
        // Constants.getInstance().m_hallBundle.load(this.m_thisSlotGameConfig.dialogShowIconUrl, cc.SpriteFrame, (err, asset) => {
        //     if (!err) {
        //         this.m_gameLogo.getComponent(cc.Sprite).spriteFrame = asset as cc.SpriteFrame;
        //     }
        // });

        // ResourcesLoader.bundleImgLoader(Constants.getInstance().m_hallBundle, this.m_thisSlotGameConfig.gameIconbg).then(asset => {
        //     this.m_gamebg.getComponent(cc.Sprite).spriteFrame = asset;
        // });

        // ResourcesLoader.bundleSkeletonLoader(Constants.getInstance().m_hallBundle, this.m_thisSlotGameConfig.gameIconTitleAnim).then(asset => {
        //     this.m_gameLogotitle.scale = this.m_thisSlotGameConfig.gameIconTitleScale;
        //     this.m_gameLogotitle.getComponent(sp.Skeleton).skeletonData = asset;
        //     this.m_gameLogotitle.getComponent(sp.Skeleton).setAnimation(0, this.m_thisSlotGameConfig.gameIconTitleAnimName, true);
        // });

        ResourcesLoader.bundleSkeletonLoader(Constants.getInstance().m_hallBundle, this.m_thisSlotGameConfig.gameIconAnim).then(asset => {
            this.m_gameLogo.scale = this.m_thisSlotGameConfig.gameIconAnimScale;
            this.m_gameLogo.getComponent(sp.Skeleton).skeletonData = asset;
            this.m_gameLogo.getComponent(sp.Skeleton).setAnimation(0, this.m_thisSlotGameConfig.gameIconAnimName, true);
        });

        Constants.getInstance().m_hallBundle.load(this.m_thisSlotGameConfig.dialogShowTitleUrl, cc.SpriteFrame, (err, asset) => {
            if (!err) {
                this.m_gameTitle.getComponent(cc.Sprite).spriteFrame = asset as cc.SpriteFrame;
            }
        });
        if (Constants.getInstance().m_betKeyConfig.getBetRoomInfo(Constants.getInstance().m_LoginUserSession.userInfo.m_level) && Constants.getInstance().m_betKeyConfig.getBetRoomInfo(Constants.getInstance().m_LoginUserSession.userInfo.m_level).length > 3) {
            this.btn2Value.getComponent(cc.Label).string = StringUtil.showMoneyType(this.getLastBet(6,1));
            this.btn1Value.getComponent(cc.Label).string = StringUtil.showMoneyType(this.getLastBet(4,1));
            this.btn4Value.getComponent(cc.Label).string = StringUtil.showMoneyType(this.getLastBet(2,1));
            this.btn3Value.getComponent(cc.Label).string = StringUtil.showMoneyType(this.getLastBet(1,1));
        }
    }

    /**
     * 关闭视图
     */
    private closeView() {
        this.baseNode.active = false;
        this.m_thisSlotGameModel = null;
    }

    /**
     * 获取最后一个bet
     * @param index 
     * @returns 
     */
    private getLastBet(index: number,index_1: number): number {
        cc.log("getLastBet=",Constants.getInstance().m_betKeyConfig.getBetRoomInfo(Constants.getInstance().m_LoginUserSession.userInfo.m_level))
        return Constants.getInstance().m_betKeyConfig.getBetRoomInfo(Constants.getInstance().m_LoginUserSession.userInfo.m_level)[index].betLevel[index_1] * 10000;
        // let room = this.m_thisSlotGameModel.m_rooms[index - 1];
        // let bet = room.betList;
        // return bet[bet.length - 1];
    }

    /**
     * 获取下注值
     * @param bet 
     */
    private getBetNumber(bet: number): string {
        return StringUtil.showMoneyType(this.m_thisSlotGameModel.betUserLevelB0 + bet * (2 * Constants.getInstance().m_LoginUserSession.userInfo.m_level * Constants.getInstance().m_LoginUserSession.userInfo.m_level));
    }
}