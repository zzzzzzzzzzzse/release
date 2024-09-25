// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { EAnimNameType } from "./subject/SubjectBase";

const { ccclass, property } = cc._decorator;

export const enum EBorderType {
    WIN = 'Border',
}

@ccclass
export abstract default class ConfigBase {

    /** @description bonus图标落定音效 */
    public abstract bonusAppear: string;
    /** @description scatter图标落定音效 */
    public abstract scatterAppear: string;
    /** @description 赢钱滚动音效 */
    public abstract winAudio: string;

    /** @description 物件数据 */
    public abstract _subjectData: Map<number, string>;
    /** @description 子游戏所在bundle */
    public abstract readonly _bundle: string;
    /** @description 是否展示物件上的label */
    public abstract readonly isShowLabel: boolean;
    /** @description 物件label字体路径 */
    public abstract readonly subjectLabelFont: string;
    /** @description 物件倍数 （id，倍数值） */
    public abstract _subjectBet: Map<number, number>;
    public _subjectJackPot: Map<number, string>;

    /** @description 背景图片配置 */
    public abstract readonly _bgImgList: Array<string>;

    public abstract readonly _bgMusicList: Array<string>;

    protected abstract readonly _borderAnimNameList: Array<Array<string>>;
    public get borderAnimNameList(): Map<string, Map<number, string>> {
        const map: Map<string, Map<number, string>> = new Map<string, Map<number, string>>();
        let count: number = 0;
        for (const arr of this._borderAnimNameList) {
            const _map: Map<number, string> = new Map<number, string>();
            for (let i: number = 0; i < arr.length; i++) {
                _map.set(i, arr[i]);
            }
            const str = this._borderPrefabList[count++];
            const key: string = str.substr(str.lastIndexOf("/") + 1);
            map.set(key, _map);
        }
        return map;
    }

    protected abstract readonly _borderPrefabList: Array<string>;
    public get borderPrefabMap(): Map<string, string> {
        if (!this._borderPrefabList || this._borderPrefabList.length == 0) {
            throw new Error('error')
        }
        const map: Map<string, string> = new Map<string, string>();
        for (const str of this._borderPrefabList) {
            const key: string = str.substr(str.lastIndexOf("/") + 1);
            map.set(key, str);
        }
        return map;
    }

    /** @description 物件预制体资源路径数组 */
    protected abstract readonly _prefabAssetList: Array<string>;
    public get prefabAssetMap(): Map<string, string> {
        if (!this._prefabAssetList || this._prefabAssetList.length == 0) {
            throw new Error('error')
        }
        const map: Map<string, string> = new Map<string, string>();
        for (const str of this._prefabAssetList) {
            const key: string = str.substr(str.lastIndexOf("/") + 1);
            map.set(key, str);
        }
        return map;
    }
    /** @description 物件动画资源路径 */
    protected abstract readonly _animAssetList: Array<string>;
    public get animAssetMap(): Map<string, string> {
        if (!this._animAssetList || this._animAssetList.length == 0) {
            throw new Error('error')
        }
        const map: Map<string, string> = new Map<string, string>();
        for (const str of this._animAssetList) {
            const key: string = str.substr(str.lastIndexOf("/") + 1);
            map.set(key, str);
        }
        return map;
    }

    protected abstract readonly _audioAssetList: Array<string>;
    public get audioAssetMap(): Map<string, string> {
        if (!this._audioAssetList || this._audioAssetList.length == 0) {
            throw new Error('error')
        }
        const map: Map<string, string> = new Map<string, string>();
        for (const str of this._audioAssetList) {
            const key: string = str.substr(str.lastIndexOf("_") + 1);
            map.set(key, str);
        }
        return map;
    }

    protected abstract readonly _animNameList: Array<Array<string>>;
    public get animNameMap(): Map<string, Map<number, string>> {
        const map: Map<string, Map<number, string>> = new Map<string, Map<number, string>>();
        let count: number = 0;
        for (const arr of this._animNameList) {
            const _map: Map<number, string> = new Map<number, string>();
            for (let i: number = 0; i < arr.length; i++) {
                _map.set(i, arr[i]);
            }
            const str = this._animAssetList[count++];
            if (str != undefined) {
                const key: string = str.substring(str.lastIndexOf("/") + 1);
                map.set(key, _map);
            }
        }
        return map;
    }

    protected readonly _prefabList: Array<string>;
    public get prefabList(): Map<string, string> {
        if (!this._prefabList || this._prefabList.length == 0) {
            throw new Error('error')
        }
        const map: Map<string, string> = new Map<string, string>();
        for (const str of this._prefabList) {
            const key: string = str.substr(str.lastIndexOf("/") + 1);
            map.set(key, str);
        }
        return map;
    }

}
