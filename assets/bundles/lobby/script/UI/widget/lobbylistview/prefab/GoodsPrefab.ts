import { Constants } from "../../../../../../../Script/Constants";
import ShopGoodsModel from "../../../../../../../Script/models/ShopGoodsModel";
import ResourcesLoader from "../../../../../../../Script/tools/ResourcesLoder";
import { StringUtil } from "../../../../../../../Script/tools/StringUtil";
import GoodsConfig from "../../../../../config/GoodsConfig";
import ResourcesConfig from "../../../../../config/ResourcesConfig";
import RewardTypeConfig from "../../../../../config/RewardTypeConfig";

const { ccclass, property } = cc._decorator;

export type GoodsPrefabItem = {
	/**
	 * Item下标
	 */
	index: number;
	/**
	 * 游戏数据
	 */
	shopGoodsItem: ShopGoodsModel;
	/**
	 * 商品类型：1.金币；2.钻石；3.VIP
	 */
	goodsType: number;
};

@ccclass
export default class GoodsPrefab extends cc.Component {
	private _data: GoodsPrefabItem = null;
	private m_goodsConfig: GoodsConfig = new GoodsConfig();
	private m_rewardTypeConfig: RewardTypeConfig = new RewardTypeConfig();

	//回调
	private m_callBack: Function;

	onLoad() {
		this.node.opacity = 0;
	}

	/**
	 * 绑定数据
	 */
	bindData(data: GoodsPrefabItem, callBack: Function) {
		this._data = data;
		this.m_callBack = callBack;
		console.log("binddata",JSON.stringify(data));
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
		this._showPlaceHolder();
		let itemData = this.m_goodsConfig.getGoodsConfigModel(this._data.shopGoodsItem.m_clientTag);
		if (itemData) {
			// ResourcesLoader.bundleImgLoader(Constants.getInstance().m_hallBundle, itemData.iconUrl).then(asset => {
			// 	this.node.getChildByName("layout_container").getChildByName('img_goods').getComponent(cc.Sprite).spriteFrame = asset;

			// });
			ResourcesLoader.bundleSkeletonLoader(Constants.getInstance().m_hallBundle, itemData.iconAnim).then(asset => {
				this.node.getChildByName("layout_container").getChildByName('img_goodsani').getComponent(sp.Skeleton).skeletonData = asset;
				this.node.getChildByName("layout_container").getChildByName('img_goodsani').getComponent(sp.Skeleton).setAnimation(0, itemData.aniname, true);
			});
			this.node.getChildByName("layout_container").getChildByName("layout_coin").getChildByName('layout').getChildByName('label').getComponent(cc.Label).string = itemData.title;
		}
		//是否有赠送
		if (this._data.goodsType === 3) {
			// VIP
			let vipType = this._data.shopGoodsItem.getVipType();
			if (vipType > 0 && itemData) {
				switch(vipType) {
					case 1: {
						break;
					}
					case 2: {
						break;
					}
					case 3: {
						break;
					}
				}
			}
			
		} else {
			if (this._data.goodsType === 2) {
				//钻石
				ResourcesLoader.bundleImgLoader(Constants.getInstance().m_hallBundle, ResourcesConfig.m_shopDiamondsImgUrl).then(asset => {
					this.node.getChildByName("layout_container").getChildByName('layout_coin').getChildByName('layout').getChildByName('img').getComponent(cc.Sprite).spriteFrame = asset;
	
				});
			} else {
				//金币
				ResourcesLoader.bundleImgLoader(Constants.getInstance().m_hallBundle, ResourcesConfig.m_shopCionImgUrl).then(asset => {
					this.node.getChildByName("layout_container").getChildByName('layout_coin').getChildByName('layout').getChildByName('img').getComponent(cc.Sprite).spriteFrame = asset;
	
				});
			}
			// 钻石金币
			if (this._data.shopGoodsItem.m_attsList && this._data.shopGoodsItem.m_attsList.length > 0) {
				//主属性配置
				let atts1 = this._data.shopGoodsItem.m_attsList[0];
				console.log("atts1",atts1,parseInt(atts1.m_valueA),this.m_rewardTypeConfig.getValue(atts1.m_attType, parseInt(atts1.m_valueA)));
				this.node.getChildByName("layout_container").getChildByName("layout_coin").getChildByName('layout').getChildByName('label').getComponent(cc.Label).string = this.m_rewardTypeConfig.getValue(atts1.m_attType, parseInt(atts1.m_valueA));
				if (!StringUtil.isEmpty(atts1.m_valueB)) {
					let layout_was = this.node.getChildByName("layout_container").getChildByName('layout_was');
					layout_was.getChildByName('label').getComponent(cc.Label).string = this.m_rewardTypeConfig.getValue(atts1.m_attType, parseInt(atts1.m_valueB));
					layout_was.active = true;
					let str = layout_was.getChildByName('label').getComponent(cc.Label).string;
					let wid = str.length*20
					if(wid>140){
						wid = 140
					}
					layout_was.getChildByName('line').width = wid;
					
				}
				//附属性配置
				if (this._data.shopGoodsItem.m_attsList.length > 1) {
					for (let i = 1; i < this._data.shopGoodsItem.m_attsList.length; i++) {
						let attsItem = this._data.shopGoodsItem.m_attsList[i];
						// let attsItemContent = this.m_rewardTypeConfig.getrewardTypeConfigModel(attsItem.m_attType);
						this.setAttsContent(attsItem.m_attType, attsItem.m_valueA);
					}
				}
			}
		}
		
		//销售价格
		this.node.getChildByName('layout_btn').getChildByName('label').getComponent(cc.Label).string = "$" + this._data.shopGoodsItem.m_salesMoney;
		this._hidePlaceHolder();

	}

	/**
	 * 设置奖励类型
	 * @param attsTyp 类型
	 * @param value 显示值
	 */
	private setAttsContent(attsTyp: number, value: string) {
		console.log("jianglileixing",attsTyp,value);
		switch(attsTyp) {
			case 1: {
				if (this._data.goodsType === 3) {
					let contentNode = this.node.getChildByName("layout_container").getChildByName('layout_give').getChildByName('item_give3');
					contentNode.active = true;
					contentNode.getChildByName('layout').getChildByName('coin').active = true;
					contentNode.getChildByName('layout').getChildByName('coin').getChildByName('label').getComponent(cc.Label).string = "+" + StringUtil.showMoneyType(parseInt(value));
				}
				break;
			}
			case 2: {
				if (this._data.goodsType === 3) {
					let contentNode = this.node.getChildByName("layout_container").getChildByName('layout_give').getChildByName('item_give3');
					contentNode.active = true;
					contentNode.getChildByName('layout').getChildByName('diamonds').active = true;
					contentNode.getChildByName('layout').getChildByName('diamonds').getChildByName('label').getComponent(cc.Label).string = "+" + StringUtil.showMoneyType(parseInt(value));
				}
				break;
			}
			case 3: {
				break;
			}
			case 4: {
				break;
			}
			case 5: {
				break;
			}
			case 6: {
				break;
			}
			case 7: {
				break;
			}
			case 8: {
				break;
			}
			case 9: {
				if (this._data.goodsType === 3) {
					let contentNode = this.node.getChildByName("layout_container").getChildByName('layout_give').getChildByName('item_give4');
					contentNode.active = true;
					contentNode.getChildByName('layout').getChildByName('label1').active = true;
					contentNode.getChildByName('layout').getChildByName('label1').getComponent(cc.Label).string = "+" + value + "min";
				} else {
					let contentNode = this.node.getChildByName("layout_container").getChildByName('layout_give').getChildByName('item_give2');
					contentNode.active = true;
					contentNode.getChildByName('label').active = true;
					contentNode.getChildByName('label').getComponent(cc.Label).string = "+" + value + "min";
				}
				break;
			}

		}
	}

	private _showPlaceHolder() {
	}

	private _hidePlaceHolder() {
	}

	private buyGoods() {
		this.m_callBack(this._data.shopGoodsItem);
	}
}
