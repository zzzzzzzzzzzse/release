import { AudioMgr } from "../../../../../../Script/framework/mgr/AudioManager";
import UserApi from "../../../../../../Script/net/apis/UserApi";
import DateTimerUtil from "../../../../../../Script/tools/DateTimerUtil";
import { StringUtil } from "../../../../../../Script/tools/StringUtil";

const { ccclass, property } = cc._decorator;


@ccclass
export default class LobbyemailPrefab extends cc.Component {

	@property(cc.Label)
	biaoti: cc.Label = null;

	@property(cc.Label)
	content: cc.Label = null;

	@property(cc.Node)
	tittle_img: cc.Node = null;

	@property(cc.Label)
	timelab: cc.Label = null;

	@property(cc.Node)
	timenod: cc.Node = null;

	@property(cc.Node)
	collectnod: cc.Node = null;

	//回调
	private m_callBack: Function = null;
	_data: any;
	CollectTime: NodeJS.Timeout = null;
	index: number = 0;
	m_callBack_time: Function = null;
	tanbancallBack: Function = null;

	onLoad() {
		this.node.opacity = 0;
	}

	start() {
		// this.initview();

		// this.collectnod.color = cc.Color.GRAY;
	}

	initview() {
		this.node.getChildByName("timesbg").active = true
		let urlstr = this._data.mediaUrls[0] + ""
		console.log("urlstr==", this._data.mediaUrls, this._data.mediaUrls.length)
		if (this._data.mediaUrls.length > 0) {
			cc.assetManager.loadRemote<cc.Texture2D>(urlstr, (err, texture) => {
				if (texture) {
					if (this.tittle_img) {
						let spriteframe = new cc.SpriteFrame(texture)
						this.tittle_img.getComponent(cc.Sprite).spriteFrame = spriteframe;
					}
				}
			});
		}

		this.biaoti.string = this._data.sysTitle;
		let coinsnum: number = 0
		let diamondnum: number = 0
		let attsList = this._data.attsList;
		if (attsList) {
			for (let i: number = 0; i < attsList.length; i++) {
				if (attsList[i].m_attType == 1) {
					coinsnum = coinsnum + Number(attsList[i].m_valueA)
				}
				if (attsList[i].m_attType == 2) {
					diamondnum = diamondnum + Number(attsList[i].m_valueA)
				}
				if (attsList[i].m_attType == 11) {
					coinsnum = coinsnum + Number(attsList[i].m_valueA)
				}
			}
		}
		let diamondstr = ""
		if (diamondnum > 0) {
			diamondstr = "    " + diamondnum + " Diamonds"
		}
		this.content.string = StringUtil.showMoneyType(coinsnum) + " Coins" + diamondstr;
		console.log("expireAt=", this._data.expireAt)
		let timenum = Number(this._data.expireAt)
		this.timelab.string = DateTimerUtil.timeCountDown(timenum);
		if (timenum == 0) {
			this.timenod.active = false;
		}
		let time = timenum;
		this.CollectTime = setInterval(() => {
			let newTime = Math.floor(new Date().getTime() / 1000);
			if (time > newTime) {
				if (this.timelab) {
					this.timelab.string = DateTimerUtil.timeCountDown2(time - newTime);
				} else {
					if (this.CollectTime) {
						clearInterval(this.CollectTime);
						this.CollectTime = null
					}

				}
			} else {
				if (this.CollectTime) {
					clearInterval(this.CollectTime);
					this.CollectTime = null
					console.log("time over")
				}
				if (this.m_callBack_time) {
					this.m_callBack_time(this.index);
				}
			}

		}, 0);

		// setTimeout(() => {
		// 	console.log("time over")
		// 		if(this.m_callBack_time){
		// 			this.m_callBack_time(this.index);
		// 		}
		// }, 2000);
	}

	/**
	 * 绑定数据
	 */
	bindData(data, callBack: Function, index: number, callBack2: Function, tanbancallBack: Function) {
		this._data = data;
		this.m_callBack = callBack;
		this.m_callBack_time = callBack2;
		this.tanbancallBack = tanbancallBack;
		this.index = index
		console.log("binddata", data);

		console.log("dddd=", this._data.mediaUrls)
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
		this.initview();

	}

	async oncollectclick() {
		AudioMgr.play("public_slot/audio/button_click", "resources")
		if (this.CollectTime) {
			clearInterval(this.CollectTime);
		}
		if (this.tanbancallBack) {
			this.tanbancallBack()
		}
		this.collectnod.color = cc.Color.GRAY;
		this.collectnod.getComponent(cc.Button).enabled = false;
		let type = 0
		let msgId = this._data.id
		let result = await UserApi.submitUserEmail(type, msgId);
		let coins: bigint = BigInt(0)
		if (result.succ) {
			console.log("dddd", result)
			this.node.getChildByName("timesbg").active = false
			let data = result.data;
			for (let i: number = 0; i < data.length; i++) {
				let attsitems = data[i].attsItems;
				console.log("attsitems=", attsitems)
				if (attsitems) {
					for (let n: number = 0; n < attsitems.length; n++) {
						let attType = attsitems[n].attType;
						let valueA = attsitems[n].valueA;
						if (attType == 1) {
							coins = coins + BigInt(valueA)
						}
						if (attType == 11) {
							coins = coins + BigInt(valueA)
						}
					}
				}
			}
			if (this.m_callBack) {
				this.m_callBack(this.collectnod, this.index, coins);
			}
			console.log("dd22222222222=", coins)
		}
	}

	setbtnstatus() {
		this.collectnod.color = cc.Color.GRAY;
		this.collectnod.getComponent(cc.Button).enabled = false;
	}

	onDestroy() {
		if (this.CollectTime = null) {
			clearInterval(this.CollectTime);
		}
	}

}
