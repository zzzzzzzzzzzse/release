/**
 * 声音模块
 */
import { LocalStorageType } from "../Const/RichCommonDefine";
import { RichEventDefine } from "../Const/RichEventDefine";
import { RichLocalStorageManager } from "./RichLocalStorageManager";
import RichLogManager from "./RichLogManager";
import RichSlotEventManager from "./RichSlotEventManager";

export class RichSlotAudioManager {
    private musicVolume: number = null;
    private soundVolume: number = null;
    private soundMap: { [key: string]: number };
    private static _instance: RichSlotAudioManager;

    private _musicOpen: boolean = true;//音乐开关
    private _soundOpen: boolean = true;//音效开关

    private currMusicName: string = "";//当前播放的背景音乐标识

    public static get instance() {
        if (RichSlotAudioManager._instance == null) {
            RichSlotAudioManager._instance = new RichSlotAudioManager();
        }
        return RichSlotAudioManager._instance;
    }

    private constructor() {
        this.init();
    }

    private init() {
        this.soundMap = {};
        this.initLocalMusicConfig();
        this.initLocalSoundConfig();
        this.setMusicVolume(this.getLocalMusicVolume());
        this.setSoundVolume(this.getLocalSoundVolume());
    }

    private initLocalMusicConfig() {
        if (RichLocalStorageManager.instance.getLocalData(LocalStorageType.AUDIO_BGM_VOLUME) < 0
            || RichLocalStorageManager.instance.getLocalData(LocalStorageType.AUDIO_BGM_VOLUME) == "null"
            || RichLocalStorageManager.instance.getLocalData(LocalStorageType.AUDIO_BGM_VOLUME) == null) {
            RichLocalStorageManager.instance.saveLocalData(LocalStorageType.AUDIO_BGM_VOLUME, 0.5);
        }
        const musicSwitch = RichLocalStorageManager.instance.getLocalData(LocalStorageType.SWITCH_MUSIC);
        this._musicOpen = !musicSwitch || musicSwitch == '1';
    }

    private initLocalSoundConfig() {
        if (RichLocalStorageManager.instance.getLocalData(LocalStorageType.AUDIO_EFFECT_VOLUME) < 0
            || RichLocalStorageManager.instance.getLocalData(LocalStorageType.AUDIO_EFFECT_VOLUME) == "null"
            || RichLocalStorageManager.instance.getLocalData(LocalStorageType.AUDIO_EFFECT_VOLUME) == null) {
            RichLocalStorageManager.instance.saveLocalData(LocalStorageType.AUDIO_EFFECT_VOLUME, 1);
        }
        const soundSwitch = RichLocalStorageManager.instance.getLocalData(LocalStorageType.SWITCH_SOUND);
        this._soundOpen = !soundSwitch || soundSwitch == '1';
    }

    private getLocalMusicVolume() {
        return RichLocalStorageManager.instance.getLocalData(LocalStorageType.AUDIO_BGM_VOLUME);
    }

    private getLocalSoundVolume() {
        return RichLocalStorageManager.instance.getLocalData(LocalStorageType.AUDIO_EFFECT_VOLUME);
    }

    public getMusicVolume() {
        return this.musicVolume;
    }

    public setMusicVolume(value) {
        this.musicVolume = value;
        cc.audioEngine.setMusicVolume(value);
        RichLocalStorageManager.instance.saveLocalData(LocalStorageType.AUDIO_BGM_VOLUME, this.musicVolume);
    }

    public getSoundVolume() {
        return this.soundVolume;
    }

    public setSoundVolume(value) {
        this.soundVolume = value;
        RichLocalStorageManager.instance.saveLocalData(LocalStorageType.AUDIO_EFFECT_VOLUME, this.soundVolume);
    }

    /**
     * 播放背景音乐
     * @param aBName 包名
     * @param filePath 文件路径
     * @param loop 是否循环播放
     */
    public async playMusic(aBName: string, filePath: string, loop: boolean = true) {
        // if (!this.musicOpen) {
        //     return;
        // }
        // if ((aBName + filePath) === this.currMusicName) {
        //     LogManager.instance.info("背景音乐相同");
        //     return;
        // }
        // this.currMusicName = aBName + filePath;
        // let audio: cc.AudioClip = await ResManager.instance.loadByBundle(aBName, "Sounds/" + filePath, cc.AudioClip);
        // LogManager.instance.log("[AudioManager] bg loaded");
        // cc.audioEngine.playMusic(audio, loop);
        // cc.audioEngine.setMusicVolume(cc.audioEngine.getMusicVolume());
    }

    public stopMusic() {
        this.currMusicName = "";
        cc.audioEngine.stopMusic();
    }

    public pauseMusic() {
        cc.audioEngine.pauseMusic();
    }

    public resumeMusic() {
        cc.audioEngine.resumeMusic();
    }

    /**
     * 播放音效
     * @param aBName 包名
     * @param filePath 文件路径
     * @param loop 是否循环播放
     */
    public async playSound(aBName: string, filePath: string, loop: boolean = false) {
        // if (!this.soundOpen) {
        //     return;
        // }
        // let audio: cc.AudioClip = await ResManager.instance.loadByBundle(aBName, "Sounds/" + filePath, cc.AudioClip);
        // LogManager.instance.log("[AudioManager] audio loaded " + filePath);
        // var id = cc.audioEngine.play(audio, loop, this.soundVolume);
        // cc.audioEngine.setVolume(id, this.soundVolume);
        // this.soundMap[filePath] = id;
    }

    public stopSound(filePath) {
        RichLogManager.instance.info("停止播放音效：", filePath);
        RichLogManager.instance.info("当前音效列表：", this.soundMap);
        if (null != this.soundMap[filePath]) {
            cc.audioEngine.stopEffect(this.soundMap[filePath]);
        }
    }

    // 暂停所有的音效
    public stopAllEffects() {
        this.soundMap = {};
        cc.audioEngine.stopAllEffects();
    }

    public set musicOpen(value: boolean) {
        this._musicOpen = value;
        !value && this.stopMusic();
        RichLocalStorageManager.instance.saveLocalData(LocalStorageType.SWITCH_MUSIC, value ? '1' : '0');
        RichSlotEventManager.instance.emit(RichEventDefine.MUSIC_SWITCH);
    }

    public get musicOpen(): boolean {
        return this._musicOpen;
    }

    public set soundOpen(value: boolean) {
        this._soundOpen = value;
        RichLocalStorageManager.instance.saveLocalData(LocalStorageType.SWITCH_SOUND, value ? '1' : '0');
    }

    public get soundOpen(): boolean {
        return this._soundOpen;
    }
}
