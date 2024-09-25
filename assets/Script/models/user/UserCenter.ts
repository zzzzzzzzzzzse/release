import { SlotPlayerCollectInfo } from "../socket/SlotPlayerCollectInfo";
import { SlotSubGameInfo } from "../socket/SlotSubGameInfo";


class UserCenter {
    /**@description 单列对象 */
    private static _instance: UserCenter;
    /**@description 全局唯一,私有构造函数,防止外部new操作 */
    private constructor() { };
    /**@description 公开调用接口 */
    public static get instance() {
        if (!this._instance) {
            this._instance = new UserCenter();
        }
        return this._instance;
    }
    /** 玩家各个子游戏数据 */
    private _userGameData: Array<SlotSubGameInfo> = new Array<SlotSubGameInfo>();
    public get userGameData(): Array<SlotSubGameInfo> {
        return this._userGameData;
    }
    public set userGameData(value: Array<SlotSubGameInfo>) {
        this._userGameData = value;
    }

    private _playerCollectData: SlotPlayerCollectInfo;
    public get playerCollectData(): SlotPlayerCollectInfo {
        return this._playerCollectData;
    }
    public set playerCollectData(value: SlotPlayerCollectInfo) {
        this._playerCollectData = value;
    }

}
export default UserCenter.instance;