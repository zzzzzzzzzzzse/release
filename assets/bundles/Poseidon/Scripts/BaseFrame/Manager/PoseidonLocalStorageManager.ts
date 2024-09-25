/**
 * 本地缓存模块
 */

import PlayerProxy from "../../Common/PoseidonPlayerProxy";
import { LocalStorageType } from "../Const/PoseidonCommonDefine";

export class PoseidonLocalStorageManager {
    private static _instance: PoseidonLocalStorageManager

    public static get instance() {
        if (PoseidonLocalStorageManager._instance == null) {
            PoseidonLocalStorageManager._instance = new PoseidonLocalStorageManager();
        }
        return PoseidonLocalStorageManager._instance;
    }

    private constructor() {
    }

    private createLocalName(str, bindUserId: boolean = true) {
        let playerId = !bindUserId ? 'game' : (PlayerProxy.instance.playerVO.userId || 'game');
        const localName = (cc.js.formatStr("%s_%s", playerId, str));
        return localName;
    }

    /**
     *  通用存储本地数据
     * @param localName 存储类型
     * @param localData 存储数据
     */
    public saveLocalData(localName: LocalStorageType, localData, bindUserId: boolean = false) {
        cc.sys.localStorage.setItem(this.createLocalName(localName, bindUserId), localData);
    }

    /**
     * 通用获取本地数据
     * @param localName 存储类型
     * @param defaultData :本地无数据时的默认数据 
     */
    public getLocalData(localName: LocalStorageType, defaultData = null, bindUserId: boolean = false) {
        let localData = cc.sys.localStorage.getItem(this.createLocalName(localName, bindUserId));
        if (localData == null || localData === "") {
            localData = defaultData;
        }
        return localData;
    }
}