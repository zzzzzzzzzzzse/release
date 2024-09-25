import { EventMgr } from "../../../../Script/framework/mgr/EventManager";
import { CommonTopStatus, OperateTypeEnum, PlayerVO, ServerVO } from "../BaseFrame/Const/ChristmasCommonDefine";
import { ChristmasEventDefine } from "../BaseFrame/Const/ChristmasEventDefine";
import ChristmasSlotEventManager from "../BaseFrame/Manager/ChristmasSlotEventManager";

export default class ChristmasPlayerProxy {
    private static _instance: ChristmasPlayerProxy = null;
    private _playerVO: PlayerVO = new PlayerVO();
    private _serverVO: ServerVO = new ServerVO();

    private _roomId: number = -1;//当前房间id
    private _gameId: number = 0;//当前打开的游戏id

    private constructor() {
        this._playerVO.gold = cc.sys.localStorage.getItem('gold') || 10000000;
    }

    /**
     * 获取单例
     */
    public static get instance(): ChristmasPlayerProxy {
        if (!this._instance) {
            this._instance = new ChristmasPlayerProxy();
        }
        return this._instance;
    }

    /**
     * 设置大厅服务器id
     */
    public setHallServerId(hallServerId: number): void {
        this._serverVO.hallServerId = hallServerId;
    }

    /**
     * 设置游戏服务器id
     */
    public setGameServerId(gameServerId: number): void {
        this._serverVO.gameServerId = gameServerId;
    }

    /**
     * 设置token数据
     */
    public setToken(token: string): void {
        this._serverVO.token = token;
    }

    /**
     * 设置用户金币
     */
    public setPlayerGold(gold: number, operateType: OperateTypeEnum): void {
        this._playerVO.gold = gold;
        ChristmasSlotEventManager.instance.emit(ChristmasEventDefine.UPDATE_PLAYER_GOLD, { operateType: operateType });
    }

    /**
     * 设置新手礼包是否购买
     */
    public setCanBuyFirstRecharge(canBuyFirstRecharge: boolean): void {
        this.playerVO.canBuyFirstRecharge = canBuyFirstRecharge;
    }

    /**
     * 设置玩家信息
     */
    public setPlayerInfo(playerInfo: any): void {
        this._playerVO.userId = playerInfo.userId;
        this._playerVO.nickname = playerInfo.nickname;
        this._playerVO.headImg = playerInfo.headImg;
        this._playerVO.gender = playerInfo.gender;
        this._playerVO.bindApple = playerInfo.bindApple;
        this._playerVO.bindFacebook = playerInfo.bindFacebook;
        this._playerVO.bindGoogle = playerInfo.bindGoogle;
        this._playerVO.headType = playerInfo.headType;
        this._playerVO.canBuyFirstRecharge = playerInfo.rechargeVIP;
        ChristmasSlotEventManager.instance.emit(ChristmasEventDefine.USERINFO_CHANGED);
    }

    /**
     * 设置用户经验等级信息
     */
    public setPlayerExpInfo(expInfo: any): void {
        this._playerVO.lastLv = this._playerVO.lv == 0 ? expInfo.lv : this._playerVO.lv;
        this._playerVO.lv = expInfo.lv;
        this._playerVO.exp = expInfo.exp;
        this._playerVO.levelUp = expInfo.levelUp;
        ChristmasSlotEventManager.instance.emit(ChristmasEventDefine.UPDATE_PLAYER_EXPINFO);
        expInfo.levelUp && ChristmasSlotEventManager.instance.emit(ChristmasEventDefine.PLAYER_LEVEL_UP);
    }

    /**
     * 设置用户经验等级信息
     */
    public setPlayerVipInfo(expInfo: any): void {
        this._playerVO.vipLv = expInfo.lv;
        this._playerVO.vipExp = expInfo.exp;
        ChristmasSlotEventManager.instance.emit(ChristmasEventDefine.UPDATE_PLAYER_VIPINFO);
        expInfo.levelUp && ChristmasSlotEventManager.instance.emit(ChristmasEventDefine.PLAYER_VIP_LEVEL_UP);
    }

    /**
     * 设置头像
     */
    public setAvatar(avatar: string, headType: number): void {
        if (avatar) {
            this._playerVO.headType = headType;
            this._playerVO.headImg = avatar;
            ChristmasSlotEventManager.instance.emit(ChristmasEventDefine.USERINFO_CHANGED);
        }
    }

    /**
     * 设置昵称
     */
    public setNickName(nickName: string): void {
        if (nickName) {
            this._playerVO.nickname = nickName;
            ChristmasSlotEventManager.instance.emit(ChristmasEventDefine.USERINFO_CHANGED);
        }
    }

    /**
     * 设置游戏状态
     */
    public setGameState(state: CommonTopStatus): void {
        this._playerVO.gameState = state;
        ChristmasSlotEventManager.instance.emit(ChristmasEventDefine.GAME_STATE_CHANGED);
    }

    /**
     * 设置是否收到进入游戏消息
     */
    public setRecvEnterMsg(recvEnterMsg: boolean = true): void {
        this._playerVO.recvEnterMsg = recvEnterMsg;
    }

    // /**
    //  * 获取当前等级总的经验值
    //  */
    // public getTotalExpByLv(lv: number): number {
    //     const config = ConfigProxy.instance.getConfigData('Player');
    //     const len = Object.getOwnPropertyNames(config).length;
    //     lv = Math.min(lv, len - 1);
    //     const player = config[lv] as Player;
    //     return player.xp;
    // }

    /**
     * 检测等级是否达到满级
     */
    public checkLvIsMax(lv: number): boolean {
        // const config = ConfigProxy.instance.getConfigData('Player');
        // const len = Object.getOwnPropertyNames(config).length;
        return false
    }

    // /**
    //  * 根据vip等级获取vip经验
    //  */
    // public getTotalVipExp(vipLv: number): number {
    //     const config = ConfigProxy.instance.getConfigData('Vip');
    //     const len = Object.getOwnPropertyNames(config).length;
    //     vipLv = Math.min(vipLv, len - 1);
    //     const vip = config[vipLv + 1] as Vip;
    //     return vip.vipXP;
    // }

    /**
     * 获取玩家当前最大可投注金额
     */
    public getMaxCanBet(): number {
        // const config = ConfigProxy.instance.getConfigData('Player');
        // const playerInfo = config[this._playerVO.lv] as Player;
        // const betRange = playerInfo.betRange;
        // let max = 0;
        // for (let i = 0; i < betRange.length; i++) {
        //     max = Math.max(betRange[i], max);
        // }
        return 1000;
    }

    /**
     * 根据索引获取当前投注金额
     */
    public getBetNumByIndex(index: number): number {
        // const config = ConfigProxy.instance.getConfigData('Player');
        // const playerInfo = config[this._playerVO.lv] as Player;
        // return playerInfo.betRange[index] || 0;
        return 1000;
    }

    // /**
    //  * 获取头像icon
    //  */
    // public getInformationPageAvatar(avatarId: number): string {
    //     const config = ConfigProxy.instance.getConfigData('Avatar');
    //     const avatarInfo = config[avatarId] as Avatar;
    //     return 'Textures/Common/Head/' + avatarInfo.photoName;
    // }

    /**
     * 获取服务器vo数据
     */
    public get serverVO(): ServerVO {
        return this._serverVO;
    }

    /**
     * 获取玩家数据
     */
    public get playerVO(): PlayerVO {
        return this._playerVO;
    }

    /**
     * 获取当前打开的游戏id
     */
    public get gameId(): number {
        return 115;//this._gameId;
    }

    /**
     * 设置当前打开的游戏id
     */
    public set gameId(value: number) {
        this._gameId = value;
    }

    /**
     * 设置当前房间id
     */
    public set roomId(value: number) {
        this._roomId = value;
    }

    /**
     * 获取当前房间id
     */
    public get roomId(): number {
        return this._roomId;
    }

    public set gold(value: number) {
        this._playerVO.gold = value;
        // LocalStorageManager.instance.saveLocalData(LocalStorageType.GOLD, value);
        cc.sys.localStorage.setItem('gold', value);
        EventMgr.dispatch('goldChanged', value);
    }

    public get gold(): number {
        return this._playerVO.gold;
    }
}
