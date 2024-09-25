/**
 * 小游戏配置
 */
export default class SlotGameConfig {
    /**
     * 索引列表
     */
    private slotGameConfigList: SlotGameConfigModel[] = [];
    /**
     * 是否已经初始化
     */
    private isInit: boolean = false;
    /**
     * 初始化
     */
    public constructor() {
        if (this.isInit) {
            return;
        }
        this.isInit = true;
        let gameModel: SlotGameConfigModel = null;
        //福娃游戏
        gameModel = {
            gameID: 4,
            gameBundle: 'fortuneBaby',
            gameScene: 'FortuneBaby',
            gameSceneUrl: 'scene/FortuneBaby',
            gameIconTitleAnim: 'res/slotGameList/fuwa/logoTitle/wenzi',
            gameIconTitleAnimName: 'animation',
            gameIconTitleScale: 1,
            gameIconbg: 'res/slotGameList/fuwa/fuwa_icon',
            gameIconlangbg: '',
            gameIconAnim: 'res/slotGameList/fuwa/logoAnim/fuwa_icon',
            gameIconAnimScale: 1,
            gameIconAnimName: 'logo',
            gameIconLangAnim: '',
            gameIconAnimLangName: 'animation',
            dialogShowIconUrl: 'res/slotGameList/fuwa/Lobby_game_fuwa',
            dialogShowTitleUrl: 'res/slotGameList/fuwa/Lobby_fuwa_title',
            gameOrientation: 2,
            loadingScence: true,
        };
        this.slotGameConfigList.push(gameModel);

        //classic游戏
        gameModel = {
            gameID: 5,
            gameBundle: 'classic',
            gameScene: 'Classic',
            gameSceneUrl: 'scene/Classic',
            gameIconTitleAnim: 'res/slotGameList/classic/logoTitle/classic_zi',
            gameIconTitleAnimName: 'animation',
            gameIconTitleScale: 0.5,
            gameIconbg: 'res/slotGameList/classic/classic_icon',
            gameIconlangbg: 'res/slotGameList/classic/classic_icon',
            gameIconAnim: 'res/slotGameList/classic/logoAnim/icon_s',
            gameIconAnimScale: 1,
            gameIconAnimName: 'animation',
            gameIconLangAnim: 'res/slotGameList/aiji/logoLangAnim/icon_l',
            gameIconAnimLangName: 'animation',
            dialogShowIconUrl: 'res/slotGameList/classic/Lobby_game_classic',
            dialogShowTitleUrl: 'res/slotGameList/classic/Lobby_classic_title',
            gameOrientation: 1,
            loadingScence: true,
        };
        this.slotGameConfigList.push(gameModel);

        //埃及游戏
        gameModel = {
            gameID: 6,
            gameBundle: 'egypt',
            gameScene: 'Egypt',
            gameSceneUrl: 'scene/Egypt',
            gameIconTitleAnim: 'res/slotGameList/aiji/logoTitle/aiji_logo',
            gameIconTitleAnimName: 'animation',
            gameIconTitleScale: 0.5,
            gameIconbg: 'res/slotGameList/aiji/aijiimg',
            gameIconlangbg: 'res/slotGameList/aiji/aijilangimg',
            gameIconAnim: 'res/slotGameList/aiji/logoAnim/icon_l',
            gameIconAnimScale: 1,
            gameIconAnimName: 'animation',
            gameIconLangAnim: 'res/slotGameList/aiji/logoLangAnim/icon_l',
            gameIconAnimLangName: 'animation',
            dialogShowIconUrl: 'res/slotGameList/aiji/hall_aiji',
            dialogShowTitleUrl: 'res/slotGameList/aiji/wenzi3_aiji',
            gameOrientation: 1,
            loadingScence: true,
        };
        this.slotGameConfigList.push(gameModel);
        //野蛮人游戏
        gameModel = {
            gameID: 7,
            gameBundle: 'barbarian',
            gameScene: 'Barbarian',
            gameSceneUrl: 'scene/Barbarian',
            gameIconTitleAnim: 'res/slotGameList/yemanren/logoTitle/zi',
            gameIconTitleAnimName: 'animation2',
            gameIconTitleScale: 1.5,
            gameIconbg: 'res/slotGameList/yemanren/bg',
            gameIconlangbg: '',
            gameIconAnim: 'res/slotGameList/yemanren/logoAnim/ren',
            gameIconAnimScale: 1.5,
            gameIconAnimName: 'animation',
            gameIconLangAnim: 'res/slotGameList/aiji/logoLangAnim/icon_l',
            gameIconAnimLangName: 'animation',
            dialogShowIconUrl: 'res/slotGameList/yemanren/Lobby_game_yemanren',
            dialogShowTitleUrl: 'res/slotGameList/yemanren/Lobby_yemanren_title',
            gameOrientation: 2,
            loadingScence: true,
        };
        this.slotGameConfigList.push(gameModel);
        //舞狮游戏
        gameModel = {
            gameID: 8,
            gameBundle: 'dancingLion',
            gameScene: 'DancingLion',
            gameSceneUrl: 'scene/DancingLion',
            gameIconTitleAnim: 'res/slotGameList/dancinglion/logoTitle/wenzi',
            gameIconTitleAnimName: 'animation',
            gameIconTitleScale: 0.5,
            gameIconbg: 'res/slotGameList/dancinglion/wushi',
            gameIconlangbg: 'res/slotGameList/dancinglion/wushilang',
            gameIconAnim: 'res/slotGameList/dancinglion/logoAnim/icon_s',
            gameIconAnimScale: 1,
            gameIconAnimName: 'animation',
            gameIconLangAnim: 'res/slotGameList/dancinglion/logoLangAnim/icon_l',
            gameIconAnimLangName: 'animation',
            dialogShowIconUrl: 'res/slotGameList/dancinglion/Lobby_game_dancinglion',
            dialogShowTitleUrl: 'res/slotGameList/dancinglion/Lobby_dancinglion_title',
            gameOrientation: 2,
            loadingScence: true,
        };
        this.slotGameConfigList.push(gameModel);

        //bank游戏
        gameModel = {
            gameID: 9,
            gameBundle: 'bank',
            gameScene: 'bank',
            gameSceneUrl: 'scene/bank',
            gameIconTitleAnim: 'res/slotGameList/bank/logoTitle/logo_zi',
            gameIconTitleAnimName: 'animation1',
            gameIconTitleScale: 0.5,
            gameIconbg: 'res/slotGameList/bank/bank_icon',
            gameIconlangbg: '',
            gameIconAnim: 'res/slotGameList/bank/logoAnim/bank_icon',
            gameIconAnimScale: 1,
            gameIconAnimName: 'animation1',
            gameIconLangAnim: '',
            gameIconAnimLangName: 'animation',
            dialogShowIconUrl: 'res/slotGameList/bank/Lobby_game_classic',
            dialogShowTitleUrl: 'res/slotGameList/bank/Lobby_classic_title',
            gameOrientation: 1,
            loadingScence: true,
        };
        this.slotGameConfigList.push(gameModel);
        //rich游戏
        gameModel = {
            gameID: 10,
            gameBundle: 'rich',
            gameScene: 'rich',
            gameSceneUrl: 'scene/rich',
            gameIconTitleAnim: 'res/slotGameList/rich/logoTitle/logo',
            gameIconTitleAnimName: 'animation',
            gameIconTitleScale: 0.5,
            gameIconbg: 'res/slotGameList/rich/fuhao_icon',
            gameIconlangbg: '',
            gameIconAnim: 'res/slotGameList/rich/logoAnim/icon_s',
            gameIconAnimScale: 1,
            gameIconAnimName: 'icon',
            gameIconLangAnim: '',
            gameIconAnimLangName: 'animation',
            dialogShowIconUrl: 'res/slotGameList/rich/Lobby_game_rich',
            dialogShowTitleUrl: 'res/slotGameList/rich/Lobby_rich_title',
            gameOrientation: 2,
            loadingScence: true,
        };
        this.slotGameConfigList.push(gameModel);
        //矿工游戏
        gameModel = {
            gameID: 12,
            gameBundle: 'miner',
            gameScene: 'Miner',
            gameSceneUrl: 'scene/Miner',
            gameIconTitleAnim: 'res/slotGameList/miner/logoTitle/icon_wenzi',
            gameIconTitleAnimName: 'animation',
            gameIconTitleScale: 0.5,
            gameIconbg: 'res/slotGameList/miner/kuanggong_icon',
            gameIconlangbg: '',
            gameIconAnim: 'res/slotGameList/miner/logoAnim/kuanggong_icon',
            gameIconAnimScale: 1,
            gameIconAnimName: 'animation1',
            gameIconLangAnim: 'res/slotGameList/aiji/logoLangAnim/icon_l',
            gameIconAnimLangName: 'animation',
            dialogShowIconUrl: 'res/slotGameList/rich/Lobby_game_rich',
            dialogShowTitleUrl: 'res/slotGameList/rich/Lobby_rich_title',
            gameOrientation: 2,
            loadingScence: true,
        }
        this.slotGameConfigList.push(gameModel);
        //狼月游戏
        gameModel = {
            gameID: 13,
            gameBundle: 'wolf',
            gameScene: 'wolf',
            gameSceneUrl: 'scene/wolf',
            gameIconTitleAnim: 'res/slotGameList/wolf/logoTitle/wenzi',
            gameIconTitleAnimName: 'animation',
            gameIconTitleScale: 0.5,
            gameIconbg: 'res/slotGameList/wolf/bg',
            gameIconlangbg: '',
            gameIconAnim: 'res/slotGameList/wolf/logoAnim/lang',
            gameIconAnimScale: 0.5,
            gameIconAnimName: 'animation',
            gameIconLangAnim: '',
            gameIconAnimLangName: 'animation',
            dialogShowIconUrl: 'res/slotGameList/wolf/Lobby_game_wolf',
            dialogShowTitleUrl: 'res/slotGameList/wolf/Lobby_wolf_title',
            gameOrientation: 2,
            loadingScence: true,
        };
        this.slotGameConfigList.push(gameModel);

        gameModel = {
            gameID: 14,
            gameBundle: 'poseidon',
            gameScene: 'Poseidon',
            gameSceneUrl: 'scene/Poseidon',
            gameIconTitleAnim: 'res/slotGameList/poseidon/logoTitle/wenzi',
            gameIconTitleAnimName: 'animation',
            gameIconTitleScale: 0.5,
            gameIconbg: 'res/slotGameList/poseidon/bg-logo',
            gameIconlangbg: '',
            gameIconAnim: 'res/slotGameList/poseidon/logoTitle/ren',
            gameIconAnimScale: 0.5,
            gameIconAnimName: 'animation',
            gameIconLangAnim: '',
            gameIconAnimLangName: 'animation',
            dialogShowIconUrl: 'res/slotGameList/poseidon/10012_theme_icon',
            dialogShowTitleUrl: 'res/slotGameList/poseidon/logo',
            gameOrientation: 1,
            loadingScence: true,
        }
        this.slotGameConfigList.push(gameModel);
    }

    /**
     * 获取游戏配置
     */
    public getGameConfigModel(gameId: number): SlotGameConfigModel {
        for (let i = 0; i < this.slotGameConfigList.length; i++) {
            if (gameId === this.slotGameConfigList[i].gameID) {
                return this.slotGameConfigList[i];
            }
        }
    }
}

export interface SlotGameConfigModel {
    /**
     * 游戏id
     */
    gameID: number;
    /**
     * bundle名
     */
    gameBundle: string;
    /**
     * 场景名
     */
    gameScene: string;
    /**
     * 场景路径
     */
    gameSceneUrl: string;
    /**
     * 图标标题动画
     */
    gameIconTitleAnim: string;
    /**
     * 图标标题动画名
     */
    gameIconTitleAnimName: string;
    gameIconTitleScale: number;

    gameIconLangAnim: string;
    gameIconAnimLangName: string;
    /**
     * 图标背景
     */
    gameIconbg: string;
    gameIconlangbg: string;
    /**
     * 图标动画
     */
    gameIconAnim: string;
    /**
     * 图标动画名
     */
    gameIconAnimName: string;
    gameIconAnimScale: number;

    /**
     * 弹窗标题/图片
     */
    dialogShowIconUrl: string;
    dialogShowTitleUrl: string;
    /**
     * 屏幕方向 (1=横屏 2=竖屏)
     */
    gameOrientation: number;

    loadingScence: boolean;
}