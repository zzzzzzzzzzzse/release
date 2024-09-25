import { Constants } from "../../Constants";
import { LocalStorageTool } from "../../tools/storage/LocalStorageTool";
import GameMainController from "../controller/GameMainController";
import { ResMgr } from "./ResManager";

/** @description 全局音乐管理类 */
class AudioManager {
    /**@description 单列对象 */
    private static _instance: AudioManager;
    private _switchMusic: number = 1;               // 音乐开关 0关  1开
    private _switchEffect: number = 1;              // 音效开关 0关  1开
    private musicstr: string | cc.AudioClip = "";
    /**@description 全局唯一,私有构造函数,防止外部new操作 */
    private constructor() { };
    /**@description 公开调用接口 */
    public static get instance() {
        if (!this._instance) {
            this._instance = new AudioManager();
            this._instance.init();
        }
        return this._instance;
    }

    init() {
        // let music_set:number = parseInt(Manager.localStorage.getItem("music_save",1));
        // let sound_set:number = parseInt(Manager.localStorage.getItem("sound_save",1));
        // this._switchMusic = music_set;
        // this._switchEffect = sound_set;
    }

    /**
     * @description 通用播放背景音乐方法
     * @param audioClip 音乐文件或者相对路径
     * @param bundle 如audioClip为路径，则需要传入所在bundle
     * @param loop 是否循环播放
     * @param volume 音量
     * @returns 
     */
    public async playMusic(audioClip: string | cc.AudioClip, bundle?: string, loop?: boolean, volume?: number): Promise<void> {
        let music_set: number = parseInt(Manager.localStorage.getItem("music_save", 1));
        this._switchMusic = music_set;

        if (this._switchMusic == 0) {
            volume = 0
            this.musicstr = audioClip
            return
        }
        // if (!LocalStorageTool.getMusicStatus()) return;
        if (typeof audioClip === "string") {
            // bundle = bundle ? bundle : Constants.getInstance().m_gameBundle.name;
            bundle = bundle ? bundle : GameMainController._config._bundle;
            audioClip = await ResMgr.load<cc.AudioClip>(bundle, audioClip);
        }
        cc.audioEngine.stopMusic();
        cc.audioEngine.playMusic(audioClip, loop === undefined ? true : loop);
        cc.audioEngine.setMusicVolume(volume ? volume : 1);
    }

    /** @description 关闭全部背景音乐 */
    public closeMusic(): void {
        Manager.localStorage.setItem("music_save", 0)
        this._switchMusic = 0;
        cc.audioEngine.setMusicVolume(0)
    }

    /** @description 关闭全部音效 */
    public closeeffect(): void {
        Manager.localStorage.setItem("sound_save", 0)
        this._switchEffect = 0;
        cc.audioEngine.setEffectsVolume(0)
    }

    /** @description 开启背景音乐 */
    public openMusic(bundle?: string): void {
        Manager.localStorage.setItem("music_save", 1)
        this._switchMusic = 1;
        cc.audioEngine.setMusicVolume(1)
        if (this.musicstr != "") {
            this.playMusic(this.musicstr, bundle)
        }
    }

    public setSoundStatus(type: number): void {
        Manager.localStorage.setItem("sound_save", type);
    }

    public getSoundStatus(): number {
        return parseInt(Manager.localStorage.getItem("sound_save", 1));
    }

    public setMusicStatus(type: number): void {
        Manager.localStorage.setItem("music_save", type);
    }

    public getMusicStatus(): number {
        return parseInt(Manager.localStorage.getItem("music_save", 1));
    }

    /** @description 开启音效 */
    public openeffect(): void {
        Manager.localStorage.setItem("sound_save", 1)
        this._switchEffect = 1;
        cc.audioEngine.setEffectsVolume(1)
    }

    /** @description 停止播放背景音乐 */
    public stopMusic(): void {
        let music_set: number = parseInt(Manager.localStorage.getItem("music_save", 1));
        if (music_set == 0) return
        // if (!LocalStorageTool.getMusicStatus()) return;
        if (cc.audioEngine.isMusicPlaying()) {
            cc.audioEngine.stopMusic();
        }
    }
    /** @description 暂停背景音乐 */
    public pauseMusic(): void {
        if (cc.audioEngine.isMusicPlaying()) {
            cc.audioEngine.pauseMusic();
        }
    }
    /** @description 恢复背景音乐 */
    public resumeMusic(): void {
        let music_set: number = parseInt(Manager.localStorage.getItem("music_save", 1));
        if (music_set == 0) return
        if (!cc.audioEngine.isMusicPlaying()) {
            cc.audioEngine.resumeMusic();
        }
    }
    /**
     * @description 通用播放音频方法
     * @param audioClip 音频文件或相对路径
     * @param finishCallback 播放完成回调函数
     * @param loop 是否循环
     * @param volume 音量
     * @returns 
     */
    public async play(audioClip: string | cc.AudioClip, bundle?: string, finishCallback?: () => void, loop?: boolean, volume?: number): Promise<number> {
        let sound_set: number = parseInt(Manager.localStorage.getItem("sound_save", 1));
        this._switchEffect = sound_set;
        if (this._switchEffect == 0) {
            volume = 0;
            if (finishCallback) {
                finishCallback();
            }
            return
        } else {
            volume = 1
        }
        // if (!LocalStorageTool.getSoundStatus()) return;
        if (typeof audioClip === "string") {
            // bundle = bundle ? bundle : Constants.getInstance().m_gameBundle.name;
            bundle = bundle ? bundle : GameMainController._config._bundle;
            audioClip = await ResMgr.load<cc.AudioClip>(bundle, audioClip);
        }
        console.log("playmusic", audioClip);
        const aid: number = cc.audioEngine.play(audioClip, loop === undefined ? false : loop, volume ? volume : 1);
        finishCallback && cc.audioEngine.setFinishCallback(aid, finishCallback);
        return aid;
    }
    /**
     * @description 播放音频并暂停背景音乐，播放完成后恢复背景音乐
     * @param audioClip 音频文件或相对路径
     * @param finishCallback 播放完成回调函数
     * @param loop 是否循环
     * @param volume 音量
     * @returns 
     */
    public async playAndPauseMusic(audioClip: string | cc.AudioClip, bundle?: string, finishCallback?: () => void, loop?: boolean, volume?: number): Promise<number> {
        this.pauseMusic();
        const aid: number = await this.play(audioClip, bundle, () => {
            this.resumeMusic();
            finishCallback && finishCallback();
        }, loop, volume);
        return aid;
    }

    /**
     * @description 停止播放音频
     * @param aid 音频id
     */
    public stop(aid: number): void {
        // if (!LocalStorageTool.getMusicStatus() || aid < 0) return;
        cc.audioEngine.stop(aid);
    }
    /**
     * @description 暂停播放音频
     * @param aid 音频id
     */
    public pause(aid: number): void {
        // if (!LocalStorageTool.getMusicStatus() || aid < 0) return;
        cc.audioEngine.pause(aid);
    }
    /**
     * @description 恢复播放音频
     * @param aid 音频id 
     */
    public resume(aid: number): void {
        let sound_set: number = parseInt(Manager.localStorage.getItem("sound_save", 1));
        if (sound_set == 0) return
        // if (!LocalStorageTool.getMusicStatus() || aid < 0) return;
        cc.audioEngine.resume(aid);
    }

    public getCurrentTime(aid: number): number {
        return cc.audioEngine.getCurrentTime(aid);
    }

    public getDuration(aid: number): number {
        return cc.audioEngine.getDuration(aid);
    }

    /**@description 停止播放所有音效 */
    public stopAll(): void {
        cc.audioEngine.stopAll();
    }
    /**@description 暂停播放所有音效 */
    public pauseAll(): void {
        cc.audioEngine.pauseAll();
    }
    /**@description 恢复播放所有音效 */
    public resumeAll(): void {
        let sound_set: number = parseInt(Manager.localStorage.getItem("sound_save", 1));
        if (sound_set == 0) return
        // if (!LocalStorageTool.getMusicStatus()) return;
        cc.audioEngine.resumeAll();
    }
    /** @description 销毁该单例模式 */
    public destroy(): void {
        if (AudioManager._instance) {
            AudioManager._instance = null;
        }
    }
}
export const AudioMgr: AudioManager = AudioManager.instance;
