import { StringUtil } from "./StringUtil";

/**
 * 资源加载
 */
export default class ResourcesLoader {
	private static readonly m_defaultImg: string = "lobby/main/btn_quickplay_game3";
	/**
	 * 加载 Resources 中图片地址
	 *
	 * @param spriteFrameUrl Resources 中图片地址
	 */
	public static loadSpriteFrameFromResources(spriteFrameUrl: string) {
		if (!StringUtil.isEmpty(spriteFrameUrl)) {
			return new Promise<cc.SpriteFrame>((resolve, reject) => {
				cc.loader.load({ url: spriteFrameUrl, type: "jpg" }, (err, asset) => {
					if (err != null) {
						if (CC_DEBUG) {
							cc.error(`load (${spriteFrameUrl}) failed!`);
							cc.error(err);
						}
						reject(err);
						return;
					}
					resolve(new cc.SpriteFrame(asset));
				});
			});
		} else {
			return new Promise<cc.SpriteFrame>((resolve, reject) => {
				cc.loader.loadRes(this.m_defaultImg, cc.SpriteFrame, (error: Error, spriteFrame) => {
					if (error != null) {
						if (CC_DEBUG) {
							cc.error(`load (${spriteFrameUrl}) failed!`);
							cc.error(error);
						}
						reject(error);
						return;
					}
					resolve(spriteFrame);
				});
			});
		}
	}


	/**
	 * 加载img图片
	 * @param url 路径
	 * @returns 
	 */
	public static imgLoader(url: string): Promise<cc.SpriteFrame> {
		return new Promise<cc.SpriteFrame>(resolve => {
			cc.loader.loadRes(url, cc.SpriteFrame, (err, asset) => {
				if (err) {
					resolve(null);
				} else {
					resolve(asset);
				}
			});
		});
	}

	public static bundleImgLoader(bundle: cc.AssetManager.Bundle, url: string) {
		return new Promise<cc.SpriteFrame>(resolve => {
			bundle.load(url, cc.SpriteFrame, (err, asset) => {
				if (err) {
					resolve(null);
				} else {
					resolve(asset as cc.SpriteFrame);
				}
			});
		});
	}

	/**
	 * 加载anim动画
	 * @param url 路径
	 * @returns 
	 */
	public static animateLoader(url: string): Promise<cc.AnimationClip> {
		return new Promise<cc.AnimationClip>(resolve => {
			cc.loader.loadRes(url, cc.AnimationClip, (err, asset) => {
				if (err) {
					resolve(null);
				} else {
					resolve(asset);
				}
			});
		})
	}

	/**
	 * 加载skeleton动画
	 * @param url  路径
	 * @returns 
	 */
	public static skeletonLoader(url: string): Promise<sp.SkeletonData> {
		return new Promise<sp.SkeletonData>(resolve => {
			cc.loader.loadRes(url, sp.SkeletonData, (err, asset) => {
				if (err) {
					resolve(null);
				} else {
					resolve(asset);
				}
			})
		});
	}

	public static bundleSkeletonLoader(bundle: cc.AssetManager.Bundle, url: string) {
		return new Promise<sp.SkeletonData>(resolve => {
			bundle.load(url, sp.SkeletonData, (err, asset) => {
				if (err) {
					resolve(null);
				} else {
					resolve(asset as sp.SkeletonData);
				}
			});
		});
	}

	/**
	 * 加载字体
	 * @param url  路径
	 * @returns 
	 */
	public static fontLoader(url: string): Promise<cc.Font> {
		return new Promise<cc.Font>(resolve => {
			cc.loader.loadRes(url, cc.Font, (err, asset) => {
				if (err) {
					resolve(null);
				} else {
					resolve(asset);
				}
			})
		})
	}

	/**
	 * 加载字体
	 * @param url  路径
	 * @returns 
	 */
	public static bundleFontLoader(bundle: cc.AssetManager.Bundle, url: string): Promise<cc.Font> {
		return new Promise<cc.Font>(resolve => {
			bundle.load(url, cc.Font, (err, asset) => {
				if (err) {
					resolve(null);
				} else {
					resolve(asset as cc.Font);
				}
			});
		});
	}

	/**
	 * 加载布局文件
	 * @param url  路径
	 * @returns 
	 */
	public static prefabsLoder(url: string): Promise<cc.Prefab> {
		return new Promise<cc.Prefab>(resolve => {
			cc.loader.loadRes(url, cc.Prefab, (err, asset) => {
				if (err) {
					resolve(null);
				} else {
					resolve(asset);
				}
			})
		})
	}

	/**
	 * bundle加载布局文件
	 * @param url  路径
	 * @returns 
	 */
	public static bundlePrefabsLoder(bundle: cc.AssetManager.Bundle, url: string): Promise<cc.Prefab> {
		return new Promise<cc.Prefab>(resolve => {
			bundle.load(url, cc.Prefab, (err, asset) => {
				if (err) {
					resolve(null);
				} else {
					resolve(asset as cc.Prefab);
				}
			});
		})
	}
}
