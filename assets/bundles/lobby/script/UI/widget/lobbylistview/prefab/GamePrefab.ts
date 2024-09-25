import { Constants } from "../../../../../../../Script/Constants";
import { SlotGameModel } from "../../../../../../../Script/models/SlotGameModel";
import { SlotGoldPoolInfo } from "../../../../../../../Script/models/SlotGoldPoolInfo";
import { SlotApi } from "../../../../../../../Script/net/apis/SlotApi";
import ResourcesLoader from "../../../../../../../Script/tools/ResourcesLoder";
import { StringUtil } from "../../../../../../../Script/tools/StringUtil";
import SlotGameConfig, { SlotGameConfigModel } from "../../../../../config/SlotGameConfig";

const { ccclass, property } = cc._decorator;

export type GamePrefabItem = {
	/**
	 * Item下标
	 */
	index: number;

	/**
	 * Item所加载的图片
	 */
	picPath: string;
	/**
	 * 游戏数据
	 */
	SlotGameData: SlotGameModel;
	/**
	 * 游戏配置
	 */
	gameConfig: SlotGameConfigModel;

	canPlay: boolean;
};

@ccclass
export default class GamePrefab extends cc.Component {
	private _data: GamePrefabItem = null;
	private m_slotGameConfig: SlotGameConfig = new SlotGameConfig();

	/**
	 * 开始奖池变动
	 */
	private startPool: boolean = false;

	//回调
	private m_callBack: Function = null;

	private downlaodedGame: number[];
	private ischang: boolean;
	private curgrand: bigint =BigInt(0);
	private datapool_1: bigint;
	timer: NodeJS.Timeout = null;
	// private curgrand: number = 0;

	onLoad() {
		this.node.opacity = 0;
	}

	/**
	 * 绑定数据
	 */
	bindData(data: GamePrefabItem, numArr?: number[], callBack?: Function,ischang:boolean=false) {
		this._data = data;
		this.downlaodedGame = numArr;
		this.m_callBack = callBack;
		this.ischang = ischang;
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
		if(this._data.SlotGameData.m_id == -1){
			return
		}

		let ishot = this._data.SlotGameData.m_isHot;
		let isnew = this._data.SlotGameData.m_isNew;
		if(ishot == 1){
			this.node.getChildByName('img_hot').active = true;
		}
		if(isnew == 1){
			this.node.getChildByName('img_new').active = true;
		}

		this.node.getChildByName('text').active = false;
		this.node.getChildByName('jackpot').active = false;
		this._showPlaceHolder();
		let itemData = this.m_slotGameConfig.getGameConfigModel(this._data.SlotGameData.m_id);
		if (itemData) {
			this._data.gameConfig = itemData;
			// ResourcesLoader.bundleImgLoader(Constants.getInstance().m_hallBundle, itemData.gameIconbg).then(asset => {
			// 	this.node.getChildByName('background').getChildByName('iconBg').getComponent(cc.Sprite).spriteFrame = asset;
			// });
			if(this.ischang==true){
				ResourcesLoader.bundleImgLoader(Constants.getInstance().m_hallBundle, itemData.gameIconlangbg).then(asset => {
					this.node.getChildByName('background').getChildByName('iconBg').getComponent(cc.Sprite).spriteFrame = asset;
				});
				ResourcesLoader.bundleSkeletonLoader(Constants.getInstance().m_hallBundle, itemData.gameIconLangAnim).then(asset => {
					this.node.getChildByName('iconAnim').scale = 1;
					this.node.getChildByName('iconAnim').getComponent(sp.Skeleton).skeletonData = asset;
					this.node.getChildByName('iconAnim').getComponent(sp.Skeleton).setAnimation(0, itemData.gameIconAnimLangName, true);
					this.node.getChildByName('iconAnim').active = false
				});
			}else{
				ResourcesLoader.bundleImgLoader(Constants.getInstance().m_hallBundle, itemData.gameIconbg).then(asset => {
					this.node.getChildByName('background').getChildByName('iconBg').getComponent(cc.Sprite).spriteFrame = asset;
				});
				ResourcesLoader.bundleSkeletonLoader(Constants.getInstance().m_hallBundle, itemData.gameIconAnim).then(asset => {
					this.node.getChildByName('iconAnim').scale = itemData.gameIconAnimScale;
					this.node.getChildByName('iconAnim').getComponent(sp.Skeleton).skeletonData = asset;
					this.node.getChildByName('iconAnim').getComponent(sp.Skeleton).setAnimation(0, itemData.gameIconAnimName, true);
					this.node.getChildByName('iconAnim').active = false
				});
			}
			// ResourcesLoader.bundleSkeletonLoader(Constants.getInstance().m_hallBundle, itemData.gameIconAnim).then(asset => {
			// 	this.node.getChildByName('iconAnim').scale = itemData.gameIconAnimScale;
			// 	this.node.getChildByName('iconAnim').getComponent(sp.Skeleton).skeletonData = asset;
			// 	this.node.getChildByName('iconAnim').getComponent(sp.Skeleton).setAnimation(0, itemData.gameIconAnimName, true);
			// 	this.node.getChildByName('iconAnim').active = false
			// });
			// ResourcesLoader.bundleSkeletonLoader(Constants.getInstance().m_hallBundle, itemData.gameIconTitleAnim).then(asset => {
			// 	this.node.getChildByName('iconTitleAnim').scale = itemData.gameIconTitleScale;
			// 	this.node.getChildByName('iconTitleAnim').getComponent(sp.Skeleton).skeletonData = asset;
			// 	this.node.getChildByName('iconTitleAnim').getComponent(sp.Skeleton).setAnimation(0, itemData.gameIconTitleAnimName, true);
			// });
		}

		// this.picSprite.spriteFrame = await ResourcesLoader.loadSpriteFrameFromResources(this._data.picPath);
		// if (!StringUtil.isEmpty(this._data.picPath)) {
		// this.node.getChildByName("download_tips").active = false;
		// this.node.getChildByName('downloadPro').getChildByName('progress').getComponent(cc.Sprite).fillRange = 0;
		// this.checkVersion();
		this.node.on('click', this.intoGame.bind(this));
		// }
		this._hidePlaceHolder();
	}

	/**
	 * 显示动画
	 */
	public showGameaction() {
		this.node.getChildByName('iconAnim').active = true;
		this.node.getChildByName('jackpot').active = true;
		this.node.getChildByName('background').getChildByName('iconBg').active=false;
		this.startPoolView();
	}

	/**
	 * 隐藏动画
	 */
	 public hideGameaction() {
		this.node.getChildByName('iconAnim').active = false;
		this.node.getChildByName('jackpot').active = false;
		this.node.getChildByName('text').active = false;
		this.node.getChildByName('background').getChildByName('iconBg').active=true;
	}

	/**
	 * 开始变动奖池
	 */
	public async startPoolView() {
		let result = await SlotApi.gamebounds();
		let pool_1:bigint = BigInt(0)
		if (result.succ) {
			let dataList: Array<SlotGoldPoolInfo> = result.data;
			for (let i: number = 0; i < dataList.length; i++) {
				if(dataList[i].gameId==this._data.SlotGameData.m_id){
					pool_1 = dataList[i].pool_1
				}
			}
		}
		this.datapool_1 = pool_1
		if(this.curgrand<=pool_1){
			this.curgrand = pool_1;
		}
		if(!this.node){
			return
		}
		let newNum = BigInt(1111111)
		this.node.getChildByName('text').active = true
		if(this.timer){
			clearInterval(this.timer);
			this.timer = null;
		}
		// if (!this.startPool) {
			this.timer = setInterval(() => {
				try {
					// let addNum: bigint = BigInt(Math.floor(parseInt(pool_1.toString()) * 0.1));
					// let newNum: bigint = BigInt(Math.floor(Math.random() * parseInt(addNum.toString())));
					this.curgrand = this.curgrand + newNum
					if(this.curgrand>BigInt(1000000000000000000)){
						this.curgrand = this.datapool_1
					}
					this.node.getChildByName('text').getComponent(cc.Label).string = StringUtil.showMoneyType(this.curgrand);
					
				} catch (e) {
					clearInterval(this.timer);
				}

			}, 100);
			// this.startPool = true;
		// }
	}

	/**
	 * 确定是否有更新
	 */
	private checkVersion() {
		//确定版本
		if (this.downlaodedGame && this.downlaodedGame.length > 0) {
			for(let i = 0; i < this.downlaodedGame.length; i++) {
				if (this.downlaodedGame[i] === this._data.SlotGameData.m_id) {
					this.successDownload();
				}
			}
		}

	}

	/**
	 * 显示进度
	 * @param isShow 是否显示
	 */
	public showDownloadPro(isShow: boolean) {
		// this._data.canPlay = !isShow;
		// this.node.getChildByName('downloadPro').active = isShow;
		// this.node.getChildByName("download_tips").active = !isShow;
	}

	/**
	 * 下载成功
	 */
	public successDownload() {
		// this._data.canPlay = true;
		// this.node.getChildByName('downloadPro').active = false;
		// this.node.getChildByName("download_tips").active = false;
	}

	private isCheck() {
		if (this.downlaodedGame && this.downlaodedGame.length > 0) {
			for(let i = 0; i < this.downlaodedGame.length; i++) {
				if (this.downlaodedGame[i] === this._data.SlotGameData.m_id) {
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * 设置进度
	 * @param proNum 
	 */
	public setDownloadPro(proNum: number) {
		this.node.getChildByName('downloadPro').getChildByName('progress').getComponent(cc.Sprite).fillRange = -proNum;
	}


	private _showPlaceHolder() {
		// var clips = this.node.getChildByName('jackpot').getComponent(cc.Animation).getClips();
		// this.node.getChildByName('jackpot').getComponent(cc.Animation).play(clips[0].name);
	}

	private _hidePlaceHolder() {
	}

	private intoGame() {
		if (this._data.canPlay&&this.m_callBack) {
			this.m_callBack(this._data.SlotGameData, this._data.gameConfig);
		}
	}
}
