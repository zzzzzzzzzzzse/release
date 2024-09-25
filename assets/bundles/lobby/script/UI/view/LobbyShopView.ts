import { type } from "os";
import { BaseUI } from "../../../../../Script/common/BaseUI";
import { EVENT } from "../../../../../Script/configs/ConstDefine";
import { Constants } from "../../../../../Script/Constants";
import { EventMgr } from "../../../../../Script/framework/mgr/EventManager";
import { PayGatewayEnum } from "../../../../../Script/models/enum/PayGatewayEnum";
import OpenMoneyInfo from "../../../../../Script/models/OpenMoneyInfo";
import { PayOrderParam } from "../../../../../Script/models/param/PayOrderParam";
import ValidateOrderParams from "../../../../../Script/models/param/ValidateOrderParams";
import { PayOrderResultModel } from "../../../../../Script/models/PayOrderResultModel";
import ShopGoodsModel, { DataTypeEnum } from "../../../../../Script/models/ShopGoodsModel";
import { UserInfoModel } from "../../../../../Script/models/UserInfoModel";
import { WalletApi } from "../../../../../Script/net/apis/WalletApi";
import DateTimerUtil from "../../../../../Script/tools/DateTimerUtil";
import ResourcesLoader from "../../../../../Script/tools/ResourcesLoder";
import { StringUtil } from "../../../../../Script/tools/StringUtil";
import ResourcesConfig from "../../../config/ResourcesConfig";
import { NormalPage } from "../pages/PageStack";
import GoodsPrefab, { GoodsPrefabItem } from "../widget/lobbylistview/prefab/GoodsPrefab";
import ScrollViewPlus from "../widget/lobbylistview/ScrollViewPlus";
import { SwitchBox } from "../widget/SwitchBox";

/**
 * 商店界面
 */
export default class LobbyShopView extends NormalPage {
    private baseNode: cc.Node;
    //金币
    private m_label_coin: cc.Node;
    //钻石
    private m_label_diamonds: cc.Node;
    //菜单
    private m_menuSwitch: SwitchBox;

    //界面
    private viewList: cc.Node[] = [];
    private currentView: cc.Node = null;

    //商店金币容器
    private view_shopCoins: ShopCoinsView;

    //商店钻石容器
    private view_shopDiamonds: ShopDiamondView;
    //商店VIP容器
    private view_shopVip: ShopVIPView;

    private coinsGoodsList: UserInfoModel[] = [];
    private diamondGoodsList: UserInfoModel[] = [];
    private VIPGoodsList: UserInfoModel[] = [];
    //选中样式
    private itemSelect: cc.SpriteFrame;
    //未选中样式
    private itemUnSelect: cc.SpriteFrame;

    /**
     * 是否初始化
     */
    private m_init: boolean = false;
    private m_onlierewards: cc.Node;
    private conislab: cc.Label;
    private timelab: cc.Label;
    private layout_btn: cc.Node;
    private CollectTime: NodeJS.Timeout;
    private layout_timer: cc.Node;
    private layout_addCoin: cc.Node;
    private m_diamonds: cc.Node;
    private m_shop: cc.Node;
    private m_chips: cc.Node;
    private m_goods_close: cc.Node;
    private m_goods_open: cc.Node;
    private iscanclose: boolean = true;
    private masknod: cc.Node;

    constructor(node: cc.Node) {
        super(node);
        this.baseNode = node;

        this.m_label_coin = this.baseNode.getChildByName('layout_top').getChildByName('user_chips').getChildByName('label_chips');
        this.m_label_diamonds = this.baseNode.getChildByName('layout_top').getChildByName('user_diamonds').getChildByName('label_diamonds');

        this.m_shop = this.baseNode.getChildByName('layout_top').getChildByName('btn_shop');
        this.m_diamonds = this.baseNode.getChildByName('layout_top').getChildByName('user_diamonds');
        this.m_chips = this.baseNode.getChildByName('layout_top').getChildByName('user_chips');

        //界面
        this.viewList = this.baseNode.getChildByName('layout_container').children;

        this.masknod = this.baseNode.getChildByName('masknod');
        //菜单
        this.m_menuSwitch = node.getChildByName("layout_left").getComponent(SwitchBox);
        //在线奖励
        this.m_onlierewards = this.baseNode.getChildByName("layout_activity");
        this.layout_btn = this.m_onlierewards.getChildByName("layout_btn");
        this.layout_addCoin = this.m_onlierewards.getChildByName("layout_btn").getChildByName("layout_addCoin")
        this.layout_timer = this.m_onlierewards.getChildByName("layout_btn").getChildByName("layout_timer")
        this.conislab = this.m_onlierewards.getChildByName("layout_btn").getChildByName("layout_addCoin").getChildByName("label").getComponent(cc.Label)
        this.timelab = this.m_onlierewards.getChildByName("layout_btn").getChildByName("layout_timer").getChildByName("label").getComponent(cc.Label)


        this.m_goods_close = this.m_onlierewards.getChildByName('layout_btn').getChildByName('layout_goods').getChildByName('img');
        this.m_goods_open = this.m_onlierewards.getChildByName('layout_btn').getChildByName('layout_goods').getChildByName('img_open');

        this.view_shopCoins = new ShopCoinsView(this.viewList[0], this.coinsGoodsList);
        this.view_shopDiamonds = new ShopDiamondView(this.viewList[1], this.diamondGoodsList);
        this.view_shopVip = new ShopVIPView(this.viewList[2], this.VIPGoodsList);

        // ResourcesLoader.bundleImgLoader(Constants.getInstance().m_hallBundle, ResourcesConfig.m_shopItemSelect).then(asset => {
        //     this.itemSelect = asset;
        //     ResourcesLoader.bundleImgLoader(Constants.getInstance().m_hallBundle, ResourcesConfig.m_shopItemUnSelect).then(asset => {
        //         this.itemUnSelect = asset;
                this.m_menuSwitch.node.on("switch-change", this.onMenuSwitchChange.bind(this));
                // this.m_menuSwitch.switch(0);
        //     });
        // });

        this.layout_btn.on("click", this.onclickreward.bind(this));


        
    }

    async onrequestreward(){
        let result = await WalletApi.receiveOnlineList(2,"0");
        if (result.succ) {
            //获取奖励
            let rewardList: OpenMoneyInfo[] = result.data2;
            let time = result.data
            clearInterval(this.CollectTime);
            this.CollectTime = setInterval(() => {
                let newTime = Math.floor(new Date().getTime() / 1000);
                if (time > newTime) {
                    this.layout_timer.active = true;
                    this.m_goods_close.active = false;
                    this.m_goods_open.active = true;
                    this.timelab.string = DateTimerUtil.timeCountDown(time - newTime);
                }else{
                    this.layout_addCoin.active = true;
                    this.layout_timer.active = false;
                    this.m_goods_close.active = true;
                    this.m_goods_open.active = false;
                    clearInterval(this.CollectTime);
                }
                
            }, 0);
            if(rewardList.length>0){
                this.layout_timer.active = false;
                this.m_goods_close.active = true;
                this.m_goods_open.active = false;
                clearInterval(this.CollectTime);
                this.layout_addCoin.active=true;
                this.conislab.string = StringUtil.showMoneyType(rewardList[0].m_value);
            }else{
                this.layout_addCoin.active=false;
            }
        }
    }

    async onclickreward(){
        cc.log("onclickreward")
        if(this.layout_timer.active == false){
            clearInterval(this.CollectTime);
            let result = await WalletApi.receiveOnlineList(2,"1");
            if (result.succ) {
                //获取奖励
                let rewardList: OpenMoneyInfo[] = result.data2;
                Constants.getInstance().m_LoginUserSession.userWalletInfo.m_gameCoin += BigInt(rewardList[0].m_value);
                setTimeout(() => {
                    this.masknod.active = false
                    if(this.m_label_coin){
                        this.m_label_coin.getComponent(cc.Label).string = StringUtil.showMoneyType(Constants.getInstance().m_LoginUserSession.userWalletInfo.m_gameCoin);
                    }
                }, 2000);
                this.iscanclose = false;
                this.masknod.active = true
                EventMgr.dispatch(EVENT.EVENT_SHOPFLYICONS_SUB)
                let time = result.data
                this.CollectTime = setInterval(() => {
                    let newTime = Math.floor(new Date().getTime() / 1000);
                    if (time > newTime) {
                        this.layout_timer.active = true;
                        this.m_goods_close.active = false;
                        this.m_goods_open.active = true;
                        this.layout_addCoin.active = false;
                        this.timelab.string = DateTimerUtil.timeCountDown(time - newTime);
                    }else{
                        this.layout_timer.active = false;
                        this.m_goods_close.active = true;
                        this.m_goods_open.active = false;
                        clearInterval(this.CollectTime);
                    }
                    
                }, 0);
            }
        }
    }

    close(){
        super.close();
        cc.log("Ddddd")
        clearInterval(this.CollectTime);
    }

    /**
     * 设置布局
     * @param coinView 
     * @param diamondView 
     * @param vipView 
     */
    public setView(coinView, diamondView, vipView, prefab) {
        if (!this.m_init) {
            this.view_shopCoins.coinsScrollViewPlus = coinView;
            this.view_shopDiamonds.diamondScrollViewPlus = diamondView;
            this.view_shopVip.vipScrollViewPlus = vipView;
            this.view_shopCoins.goodsPrefab = prefab;
            this.view_shopDiamonds.goodsPrefab = prefab;
            this.view_shopVip.goodsPrefab = prefab;
    
            // this.view_shopCoins.addItem();
            // this.view_shopDiamonds.addItem();
            // this.view_shopVip.addItem();
            this.m_init = true;
        }

    }

    /**
     * 绑定视图
     */
    public bindViewData() {
        this.onrequestreward()
        if(Constants.getInstance().m_LoginUserSession.userWalletInfo) {
            this.m_label_coin.getComponent(cc.Label).string = StringUtil.showMoneyType(Constants.getInstance().m_LoginUserSession.userWalletInfo.m_gameCoin);
            this.m_label_diamonds.getComponent(cc.Label).string = StringUtil.showMoneyType(Constants.getInstance().m_LoginUserSession.userWalletInfo.m_goldCoin);
        }

        let frameSize = cc.view.getDesignResolutionSize();
        let width = frameSize.width;
        if(width/2-this.m_shop.x>630){
            this.m_diamonds.x = this.m_shop.x + 204
            this.m_chips.x = this.m_diamonds.x+204
        }

    }

    /**
     * 显示视图
     * @param index 索引
     */
    public showView(index: number) {
        this.m_menuSwitch.switch(index);
        // this.onMenuSwitchChange(index);
    }

    private onMenuSwitchChange(index: number) {
        if (this.currentView){
            this.currentView.active = false;
        }
        //显示按钮
        for(let i = 0; i < 2; i++) {
            // this.m_menuSwitch.menus[i].getChildByName('bg').getComponent(cc.Sprite).spriteFrame = this.itemUnSelect;
            this.setItemSelectLabelType(0, this.m_menuSwitch.menus[i]);
        }
        // this.m_menuSwitch.menus[index].getChildByName('bg').getComponent(cc.Sprite).spriteFrame = this.itemSelect;
        this.setItemSelectLabelType(1, this.m_menuSwitch.menus[index]);
        if (index === 0) {
            this.view_shopCoins.addItem();
        } else if (index === 1) {
            this.view_shopDiamonds.addItem();
        } else if (index === 2) {
            this.view_shopVip.addItem();
        }
        //显示界面
        this.currentView = this.viewList[index];
        this.currentView.active = true;
    }

    /**
     * 设置按钮样式
     * @param type 0：未选中；1：选中
     * @param labelNode 文本控件
     */
    public setItemSelectLabelType(type: number, parentNode: cc.Node) {
        if (type === 0) {
            parentNode.getChildByName("sel").active = false;
            parentNode.getChildByName("unsel").active = true;
            // labelNode.color = cc.color(144, 114, 220);
            // labelNode.getComponent(cc.Label).fontSize = 30;
            // labelNode.getComponent(cc.LabelOutline).color = cc.color(46, 7, 103);
        } else if (type === 1) {
            parentNode.getChildByName("sel").active = true;
            parentNode.getChildByName("unsel").active = false;
            // labelNode.color = cc.color(255, 255, 255);
            // labelNode.getComponent(cc.Label).fontSize = 36;
            // labelNode.getComponent(cc.LabelOutline).color = cc.color(51, 61, 187);
        }
    }
}

/**
 * 金币界面
 */
class ShopCoinsView extends cc.Component {
    public node: cc.Node = null;

    public coinsScrollViewPlus: ScrollViewPlus;

    //item
    public goodsPrefab: cc.Prefab;

    private isShow: boolean = false;

    constructor(node: cc.Node, dataList: any[]) {
        super();
        this.node = node;
    }


    public async addItem() {
        if (!this.isShow) {
            this.coinsScrollViewPlus.content.removeAllChildren();
            cc.log("ShopCoinsView=",Constants.getInstance()._coinsGoodsListData)
            await this.executePreFrame(this._getItemGenerator(Constants.getInstance()._coinsGoodsListData), 1);
            // 在创建好子节点之后，先手动调用一次DC优化，触发当前在可视区域内的节点的进入逻辑
            // 后续的ScrollView滚动时，内部自动回调
            this.coinsScrollViewPlus.getComponent(ScrollViewPlus).scrollToLeft(0)
            this.coinsScrollViewPlus.optDc();
            this.isShow = true;
        }else{
            this.coinsScrollViewPlus.getComponent(ScrollViewPlus).scrollToLeft(0)
            this.coinsScrollViewPlus.optDc();
        }

    }

	private *_getItemGenerator(data: Array<ShopGoodsModel>) {
        data.sort((a,b):any=>{
            if(a && b){
                return b.m_money-a.m_money;         
            }     
            return 0; 
        })
		for (let i = 0; i < data.length; i++) {
			yield this._initScrollViewItemPrefab({
				index: i,
                shopGoodsItem: data[i],
                goodsType: 1
			});
		}
	}
	private _initScrollViewItemPrefab(data: GoodsPrefabItem) {
		let itemNode = cc.instantiate(this.goodsPrefab);
		itemNode.parent = this.coinsScrollViewPlus.content;
		itemNode.getComponent(GoodsPrefab).bindData(data, this.buyGoods.bind(this));
	}

    /**
	 * 分帧执行 Generator 逻辑
	 *
	 * @param generator 生成器
	 * @param duration 持续时间（ms），每次执行 Generator 的操作时，最长可持续执行时长。假设值为8ms，那么表示1帧（总共16ms）下，分出8ms时间给此逻辑执行
	 */
    private executePreFrame(generator: Generator, duration: number) {
		return new Promise<void>((resolve, reject) => {
			let gen = generator;
			// 创建执行函数
			let execute = () => {
				// 执行之前，先记录开始时间
				let startTime = new Date().getTime();

				// 然后一直从 Generator 中获取已经拆分好的代码段出来执行
				for (let iter = gen.next(); ; iter = gen.next()) {
					// 判断是否已经执行完所有 Generator 的小代码段，如果是的话，那么就表示任务完成
					if (iter == null || iter.done) {
						resolve();
						return;
					}

					// 每执行完一段小代码段，都检查一下是否已经超过我们分配的本帧，这些小代码端的最大可执行时间
					if (new Date().getTime() - startTime > duration) {
						// 如果超过了，那么本帧就不在执行，开定时器，让下一帧再执行
						this.scheduleOnce(() => {
							execute();
						});
						return;
					}
				}
			};

			// 运行执行函数
			execute();
		});
	}

    /**
     * 充值
     * @param goodsId 
     * @param dataType 
     */
    private async buyGoods(data: ShopGoodsModel) {
        let payOrderData: PayOrderParam = new PayOrderParam();
        payOrderData.skuId = data.m_id;
        if(cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID){
            payOrderData.payModel = PayGatewayEnum.PAYGATEWAY_googlePay;
        }else if(cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS){
            payOrderData.payModel = PayGatewayEnum.PAYGATEWAY_IOS;
            // Constants.getInstance().native.startIOSPay(Constants.getInstance().m_LoginUserSession.m_uid,"ios_goods_coin_1001","ios_goods_coin_1001");
            // return;
        }
        payOrderData.dataType = DataTypeEnum.DataType_Recharge;
        let result = await WalletApi.payOrderRecharge(payOrderData);
        let data2 = [];
        for(let i in result){
            data2.push(i + "="+result[i]);
        }
        console.log(data2.join("&&"));
        if (result.data && result.data instanceof PayOrderResultModel) {
            let resultData: PayOrderResultModel = result.data;
            if(cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID){
                Constants.getInstance().native.startGPPay(Constants.getInstance().m_LoginUserSession.m_uid, resultData.appStorePid, resultData.orderSn);
            }else if(cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS){
                BaseUI.addNetLoading();
                Constants.getInstance().native.startIOSPay(Constants.getInstance().m_LoginUserSession.m_uid,resultData.appStorePid,resultData.orderSn);
            }
            //test123123
            // let param: ValidateOrderParams = new ValidateOrderParams();
            // param.m_key = resultData.orderSn;
            // param.m_payGateway = resultData.payModel;
            // param.m_receipt = Math.floor(Math.random() * 100000000) + "";
            // param.m_transSign = Math.floor(Math.random() * 100000000) + "";
            // param.m_transAt = Math.floor(new Date().getTime()/1000) + '';
            
            // await WalletApi.validateOrder(param);
        }
    }
}
/**
 * 钻石界面
 */
class ShopDiamondView extends cc.Component {
    public node: cc.Node = null;

    public diamondScrollViewPlus: ScrollViewPlus
    //item
    public goodsPrefab: cc.Prefab;

    private isShow: boolean = false;

    constructor(node: cc.Node, dataList: any[]) {
        super();
        this.node = node;
    }


    public async addItem() {
        if (!this.isShow) {
            this.diamondScrollViewPlus.content.removeAllChildren();
            cc.log("ShopCoinsView=",Constants.getInstance()._diamondGoodsListData)
            await this.executePreFrame(this._getItemGenerator(Constants.getInstance()._diamondGoodsListData), 1);
            // 在创建好子节点之后，先手动调用一次DC优化，触发当前在可视区域内的节点的进入逻辑
            // 后续的ScrollView滚动时，内部自动回调
            this.diamondScrollViewPlus.getComponent(ScrollViewPlus).scrollToLeft(0)
            this.diamondScrollViewPlus.optDc();
            this.isShow = true;
        }else{
            this.diamondScrollViewPlus.getComponent(ScrollViewPlus).scrollToLeft(0)
            this.diamondScrollViewPlus.optDc();
        }

    }

	private *_getItemGenerator(data: Array<ShopGoodsModel>) {
        data.sort((a,b):any=>{
            if(a && b){
                return b.m_money-a.m_money;         
            }     
            return 0; 
        })
		for (let i = 0; i < data.length; i++) {
			yield this._initScrollViewItemPrefab({
				index: i,
                shopGoodsItem: data[i],
                goodsType: 2
			});
		}
	}
	private _initScrollViewItemPrefab(data: GoodsPrefabItem) {
		let itemNode = cc.instantiate(this.goodsPrefab);
		itemNode.parent = this.diamondScrollViewPlus.content;
		itemNode.getComponent(GoodsPrefab).bindData(data, this.buyGoods.bind(this));
	}

    /**
	 * 分帧执行 Generator 逻辑
	 *
	 * @param generator 生成器
	 * @param duration 持续时间（ms），每次执行 Generator 的操作时，最长可持续执行时长。假设值为8ms，那么表示1帧（总共16ms）下，分出8ms时间给此逻辑执行
	 */
    private executePreFrame(generator: Generator, duration: number) {
		return new Promise<void>((resolve, reject) => {
			let gen = generator;
			// 创建执行函数
			let execute = () => {
				// 执行之前，先记录开始时间
				let startTime = new Date().getTime();

				// 然后一直从 Generator 中获取已经拆分好的代码段出来执行
				for (let iter = gen.next(); ; iter = gen.next()) {
					// 判断是否已经执行完所有 Generator 的小代码段，如果是的话，那么就表示任务完成
					if (iter == null || iter.done) {
						resolve();
						return;
					}

					// 每执行完一段小代码段，都检查一下是否已经超过我们分配的本帧，这些小代码端的最大可执行时间
					if (new Date().getTime() - startTime > duration) {
						// 如果超过了，那么本帧就不在执行，开定时器，让下一帧再执行
						this.scheduleOnce(() => {
							execute();
						});
						return;
					}
				}
			};

			// 运行执行函数
			execute();
		});
	}

    /**
     * 充值
     * @param goodsId 
     * @param dataType 
     */
    private async buyGoods(data: ShopGoodsModel) {
        let payOrderData: PayOrderParam = new PayOrderParam();
        payOrderData.skuId = data.m_id;
        if(cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID){
            payOrderData.payModel = PayGatewayEnum.PAYGATEWAY_googlePay;
        }else if(cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS){
            payOrderData.payModel = PayGatewayEnum.PAYGATEWAY_IOS;
            // Constants.getInstance().native.startIOSPay(Constants.getInstance().m_LoginUserSession.m_uid,"ios_goods_coin_1001","ios_goods_coin_1001");
            // return;
        }
        payOrderData.dataType = DataTypeEnum.DataType_GoldCoin;
        let result = await WalletApi.payOrderRecharge(payOrderData);
        if (result.data && result.data instanceof PayOrderResultModel) {
            let resultData: PayOrderResultModel = result.data;
            if(cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID){
                Constants.getInstance().native.startGPPay(Constants.getInstance().m_LoginUserSession.m_uid, resultData.appStorePid, resultData.orderSn);
            }else if(cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS){
                BaseUI.addNetLoading();
                Constants.getInstance().native.startIOSPay(Constants.getInstance().m_LoginUserSession.m_uid,resultData.appStorePid,resultData.orderSn);
            }
            // let param: ValidateOrderParams = new ValidateOrderParams();
            // param.m_key = resultData.orderSn;
            // param.m_payGateway = resultData.payModel;
            // param.m_receipt = Math.floor(Math.random() * 100000000) + "";
            // param.m_transSign = Math.floor(Math.random() * 100000000) + "";
            // param.m_transAt = Math.floor(new Date().getTime()/1000) + '';
            
            // await WalletApi.validateOrder(param);
        }
    }
}
/**
 * VIP界面
 */
class ShopVIPView extends cc.Component {
    public node: cc.Node = null;

    public vipScrollViewPlus: ScrollViewPlus;
    //item
    public goodsPrefab: cc.Prefab;

    private isShow: boolean = false;

    constructor(node: cc.Node, dataList: any[]) {
        super();
        this.node = node;
    }

    public async addItem() {
        if (!this.isShow) {
            this.vipScrollViewPlus.content.removeAllChildren();
            await this.executePreFrame(this._getItemGenerator(Constants.getInstance()._vipGoodsListData), 1);
            // 在创建好子节点之后，先手动调用一次DC优化，触发当前在可视区域内的节点的进入逻辑
            // 后续的ScrollView滚动时，内部自动回调
            this.vipScrollViewPlus.getComponent(ScrollViewPlus).scrollToLeft(0)
            this.vipScrollViewPlus.optDc();
            this.isShow = true;
        }else{
            this.vipScrollViewPlus.getComponent(ScrollViewPlus).scrollToLeft(0)
            this.vipScrollViewPlus.optDc();
        }

    }

	private *_getItemGenerator(data: Array<ShopGoodsModel>) {
		for (let i = 0; i < data.length; i++) {
			yield this._initScrollViewItemPrefab({
				index: i,
                shopGoodsItem: data[i],
                goodsType: 3
			});
		}
	}
	private _initScrollViewItemPrefab(data: GoodsPrefabItem) {
		let itemNode = cc.instantiate(this.goodsPrefab);
		itemNode.parent = this.vipScrollViewPlus.content;
		itemNode.getComponent(GoodsPrefab).bindData(data, this.buyGoods.bind(this));
	}

    /**
	 * 分帧执行 Generator 逻辑
	 *
	 * @param generator 生成器
	 * @param duration 持续时间（ms），每次执行 Generator 的操作时，最长可持续执行时长。假设值为8ms，那么表示1帧（总共16ms）下，分出8ms时间给此逻辑执行
	 */
    private executePreFrame(generator: Generator, duration: number) {
		return new Promise<void>((resolve, reject) => {
			let gen = generator;
			// 创建执行函数
			let execute = () => {
				// 执行之前，先记录开始时间
				let startTime = new Date().getTime();

				// 然后一直从 Generator 中获取已经拆分好的代码段出来执行
				for (let iter = gen.next(); ; iter = gen.next()) {
					// 判断是否已经执行完所有 Generator 的小代码段，如果是的话，那么就表示任务完成
					if (iter == null || iter.done) {
						resolve();
						return;
					}

					// 每执行完一段小代码段，都检查一下是否已经超过我们分配的本帧，这些小代码端的最大可执行时间
					if (new Date().getTime() - startTime > duration) {
						// 如果超过了，那么本帧就不在执行，开定时器，让下一帧再执行
						this.scheduleOnce(() => {
							execute();
						});
						return;
					}
				}
			};

			// 运行执行函数
			execute();
		});
	}

    /**
     * 充值
     * @param goodsId 
     * @param dataType 
     */
    private async buyGoods(data: ShopGoodsModel) {
        let payOrderData: PayOrderParam = new PayOrderParam();
        payOrderData.skuId = data.m_id;
        if(cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID){
            payOrderData.payModel = PayGatewayEnum.PAYGATEWAY_googlePay;
        }else if(cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS){
            payOrderData.payModel = PayGatewayEnum.PAYGATEWAY_IOS;
            // Constants.getInstance().native.startIOSPay(Constants.getInstance().m_LoginUserSession.m_uid,"ios_goods_coin_1001","ios_goods_coin_1001");
            // return;
        }
        payOrderData.dataType = DataTypeEnum.DataType_Monthcard;
        let result = await WalletApi.payOrderRecharge(payOrderData);
        if (result.data && result.data instanceof PayOrderResultModel) {
            let resultData: PayOrderResultModel = result.data;
            if(cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID){
                Constants.getInstance().native.startGPPay(Constants.getInstance().m_LoginUserSession.m_uid, resultData.appStorePid, resultData.orderSn);
            }else if(cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS){
                BaseUI.addNetLoading();
                Constants.getInstance().native.startIOSPay(Constants.getInstance().m_LoginUserSession.m_uid,resultData.appStorePid,resultData.orderSn);
            }
            //test123123
            // let param: ValidateOrderParams = new ValidateOrderParams();
            // param.m_key = resultData.orderSn;
            // param.m_payGateway = resultData.payModel;
            // param.m_receipt = Math.floor(Math.random() * 100000000) + "";
            // param.m_transSign = Math.floor(Math.random() * 100000000) + "";
            // param.m_transAt = Math.floor(new Date().getTime()/1000) + '';
            
            // await WalletApi.validateOrder(param);
        }
    }
}
