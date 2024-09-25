// import NativeBridge from "./NativeBridge";

import NativeBridge from "./bridge/NativeBridge";

const LOCAL_URL_CACHE: Map<string, string> = new Map();

const LOCAL_IMG_CACHE: Map<string, cc.SpriteFrame> = new Map();
const REMOTE_IMG_CACHE: Map<string, cc.SpriteFrame> = new Map();

export class ResLoader {

    private native: NativeBridge = null;
    private _loadCount: number = 0;
    private _loadOpts: any = null;

    private _defaultImg: cc.SpriteFrame = null;
    private _defautHeadLocate: string = '';

    /** 资源加载器 */
    public constructor(nativeInterface: NativeBridge) {
        this.native = nativeInterface;
    }

    /** 初始化资源加载器 */
    public async init() {
        this._defautHeadLocate = 'faces/';
        cc.loader.loadRes('faces/face_default', cc.SpriteFrame, (err, asset) => {
            if (asset)
                this._defaultImg = asset;
        });
    }

    /** 默认头像图片 */
    public get defaultImg() {
        return this._defaultImg;
    }

    /** 正在加载中的资源数量 */
    public get loadCount() {
        return this._loadCount;
    }

    /** 当前加载场景自定义参数 */
    public get loadOpts() {
        return this._loadOpts;
    }

    public loadLocalHeadImg(url: string): Promise<cc.SpriteFrame> {
        return new Promise(resolve => {
            cc.loader.loadRes('faces/' + url, cc.SpriteFrame, (err, asset) => {
                if (err) {
                    resolve(null)
                } else {
                    resolve(asset)
                }
            });
        })
    }

    public loadLocalImg(url: string): Promise<cc.SpriteFrame> {
        return new Promise(resolve => {
            if (LOCAL_IMG_CACHE.get(url)) return resolve(LOCAL_IMG_CACHE.get(url));
            cc.loader.loadRes(url, cc.SpriteFrame, (err, img) => {
                if (err) {
                    console.log("Failed to load local res", err);
                    resolve(null);
                } else {
                    LOCAL_IMG_CACHE.set(url, img);
                    resolve(img);
                }
                this._loadCount--;
            });
        });
    }

    /** 加载网络图片 */
    public loadRemoteImg(url: string): Promise<cc.SpriteFrame> {
        this._loadCount++;
        return new Promise(resolve => {
            if (LOCAL_IMG_CACHE.get(url) && LOCAL_IMG_CACHE.get(url).isValid) return resolve(LOCAL_IMG_CACHE.get(url));
            if (REMOTE_IMG_CACHE.get(url) && REMOTE_IMG_CACHE.get(url).isValid) return resolve(REMOTE_IMG_CACHE.get(url));
            if (LOCAL_URL_CACHE.get(url)) {
                cc.loader.loadRes("faces/" + LOCAL_URL_CACHE.get(url), cc.SpriteFrame, (err, img) => {
                    if (err) {
                        console.log("Failed to load local res", err);
                        resolve(null);
                    } else {
                        LOCAL_IMG_CACHE.set(url, img);
                        resolve(img);
                    }
                    this._loadCount--;
                });
            } else {
                cc.loader.load(url, (err, tex: cc.Texture2D) => {
                    if (err) {
                        console.log("Failed to load remote res", err);
                        resolve(null);
                    } else {
                        let img = new cc.SpriteFrame(tex);
                        if (REMOTE_IMG_CACHE.size > 20) REMOTE_IMG_CACHE.clear();
                        REMOTE_IMG_CACHE.set(url, img);
                        resolve(img);
                    }
                    this._loadCount--;
                });
            }
        });
    }

    /**
     * 加载场景
     * @param name 场景名称
     * @param orientation 旋转方向 0=保持当前 1=横屏 2=竖屏
     */
    public loadScene(name: string, orientation: number, opts: any = null) {
        this._loadCount++;
        this._loadOpts = opts;
        cc.director.preloadScene(name, () => {
        }, (err) => {
            this._loadCount--;
            if (err) {
                console.error("Load Scene Failed: ", err);
            } else {
                if (orientation > 0) this.setOrientation(orientation);
                // TODO test code
                // this.setOrientation(0);
                cc.director.loadScene(name);
            }
        });
    }

    /**
     * 加载bundle场景
     * @param thisBundle bundle
     * @param sceneUrl 场景url
     * @param orientation 旋转方向 0=保持当前 1=横屏 2=竖屏
     * @param opts 
     */
    public loadBundleScene(thisBundle: cc.AssetManager.Bundle, sceneUrl: string, orientation: number, opts: any = null) {
        this._loadOpts = opts;
        thisBundle.loadScene(sceneUrl, (err, sucSecene) => {
            if (err) {
                console.error("Load Scene Failed: ", err);
            } else {
                if (orientation > 0) {
                    this.setOrientation(orientation);
                }
                cc.director.runScene(sucSecene);
            }

        });
    }

    public setOrientation(orientation: number) {
        if (cc.sys.isBrowser) {
            let frameSize = cc.view.getFrameSize();
            let width = frameSize.width;
            let height = frameSize.height;
            if (height > width) {
                height = frameSize.width;
                width = frameSize.height;
            }
            if (orientation === 1) {
                cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
                cc.view.setFrameSize(width, height);
                cc.view.setDesignResolutionSize(width, height, cc.ResolutionPolicy.FIXED_HEIGHT);
            } else if (orientation === 2) {
                cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
                cc.view.setFrameSize(height, width);
                cc.view.setDesignResolutionSize(height, width, cc.ResolutionPolicy.FIXED_WIDTH);
            }
        } else {
            this.native.setOrientation(orientation);
        }
    }
}