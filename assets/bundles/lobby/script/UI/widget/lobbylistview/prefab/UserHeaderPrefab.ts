/**
 * 用户头像
 */

import AppPlatformConfig from "../../../../../../../Script/configs/AppPlatformConfig";
import { Constants } from "../../../../../../../Script/Constants";
import ResourcesLoader from "../../../../../../../Script/tools/ResourcesLoder";

 const { ccclass, property } = cc._decorator;

 export type UserHeaderPrefabItem = {
     /**
      * Item下标
      */
     index: number;
 
     /**
      * Item所加载的图片
      */
     picPath: string;
 };
 
 @ccclass
export default class UserHeaderPrefab extends cc.Component {
	private _data: UserHeaderPrefabItem = null;

	//回调
	private m_callBack: Function;

	onLoad() {
		this.node.opacity = 0;
	}

	/**
	 * 绑定数据
	 */
	bindData(data: UserHeaderPrefabItem, callBack: Function) {
		this._data = data;
		this.m_callBack = callBack;
	}

	public itemData() {
		return this._data;
	}

	/**
	 * 本Item进入ScrollView的时候回调
	 */
	onEnterSrcollView() {
		this.node.opacity = 255;
		this._loadAndShowPic();
	}

	/**
	 * 本Item离开ScrollView的时候回调
	 */
	onExitScrollView() {
		this.node.opacity = 0;
	}

	/**
	 * 加载并展示图片
	 */
	private async _loadAndShowPic() {
		if(this._data.index==0&&Constants.getInstance().isfacebook&&AppPlatformConfig.ISOPENFBIMG){
			cc.assetManager.loadRemote<cc.Texture2D>(this._data.picPath,{ext:".png"}, (err, texture) => {
				if (texture) {
					let spriteframe = new cc.SpriteFrame(texture)
					this.node.getChildByName('mask').getChildByName('img').getComponent(cc.Sprite).spriteFrame = spriteframe;
				}
			});
			this.node.getChildByName('facebooktips').active = true;
		}else{
			ResourcesLoader.bundleImgLoader(Constants.getInstance().m_hallBundle, this._data.picPath).then(asset => {
				if (asset) {
					this.node.getChildByName('mask').getChildByName('img').getComponent(cc.Sprite).spriteFrame = asset;
				}
			});
		}
        
		this.node.on('click', this.itemClick.bind(this));
	}

	/**
	 * 显示按钮
	 * @param isShow 
	 */
	public showClickBtn(isShow: boolean) {
		this.node.getChildByName('img_check').active = isShow;
	}

    private itemClick() {
        if (this.m_callBack) {
            this.m_callBack(this._data.index);
        }
    }

}
