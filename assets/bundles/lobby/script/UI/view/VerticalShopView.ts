import { type } from "os";
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
import CoinFlyPool from "../../../../../Script/UI/dialog/CoinFlyPool";
import ResourcesConfig from "../../../config/ResourcesConfig";
import { NormalPage } from "../pages/PageStack";
import GoodsPrefab, { GoodsPrefabItem } from "../widget/lobbylistview/prefab/GoodsPrefab";
import ScrollViewPlus from "../widget/lobbylistview/ScrollViewPlus";
import { SwitchBox } from "../widget/SwitchBox";
const { ccclass, property } = cc._decorator;
/**
 * 竖版商店界面
 */
@ccclass
export default class VerticalShopView extends cc.Component {
    private m_closeNode: cc.Node;
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

    /** 商店视图 */
    @property(ScrollViewPlus)
    coinsScrollViewPlus: ScrollViewPlus = null;
    @property(ScrollViewPlus)
    diamondScrollViewPlus: ScrollViewPlus = null;
    @property(ScrollViewPlus)
    vipScrollViewPlus: ScrollViewPlus = null;
    @property(cc.Prefab)
    itemPrefab: cc.Prefab = null;

    /**
     * 是否初始化
     */
    private m_init: boolean = false;
    private CollectTime: NodeJS.Timeout;
    private m_onlierewards: cc.Node;
    private layout_timer: cc.Node;
    private layout_addCoin: cc.Node;
    private conislab: cc.Label;
    private timelab: cc.Label;
    private m_goods_close: cc.Node;
    private m_goods_open: cc.Node;
    private layout_btn: cc.Node;

    //飞金币动画
    public m_anim_coin_fly: CoinFlyPool;
    private iscanclick: boolean = true;
    private masknod: cc.Node;

    protected onLoad(): void {
        this.init();
    }

    private init() {
        this.initView();
        this.initData();
        this.initListener();
    }

    private initView() {
        this.m_closeNode = this.node.getChildByName('btn_close');

        this.m_label_coin = this.node.getChildByName('layout_top').getChildByName('user_chips').getChildByName('label_chips');
        this.m_label_diamonds = this.node.getChildByName('layout_top').getChildByName('user_diamonds').getChildByName('label_diamonds');

        //界面
        this.viewList = this.node.getChildByName('layout_container').children;

        this.masknod = this.node.getChildByName('masknod');
        //菜单
        this.m_menuSwitch = this.node.getChildByName("layout_left").getComponent(SwitchBox);

        this.view_shopCoins = new ShopCoinsView(this.viewList[0], this.coinsGoodsList);
        this.view_shopDiamonds = new ShopDiamondView(this.viewList[1], this.diamondGoodsList);
        this.view_shopVip = new ShopVIPView(this.viewList[2], this.VIPGoodsList);

        //在线奖励
        this.m_onlierewards = this.node.getChildByName("layout_activity");
        this.layout_btn = this.m_onlierewards.getChildByName("layout_btn");
        this.layout_timer = this.m_onlierewards.getChildByName("layout_btn").getChildByName("layout_timer")
        this.layout_addCoin = this.m_onlierewards.getChildByName("layout_btn").getChildByName("layout_addCoin")
        this.conislab = this.m_onlierewards.getChildByName("layout_btn").getChildByName("layout_addCoin").getChildByName("label").getComponent(cc.Label)
        this.timelab = this.m_onlierewards.getChildByName("layout_btn").getChildByName("layout_timer").getChildByName("label").getComponent(cc.Label)


        this.m_goods_close = this.m_onlierewards.getChildByName('layout_btn').getChildByName('layout_goods').getChildByName('img');
        this.m_goods_open = this.m_onlierewards.getChildByName('layout_btn').getChildByName('layout_goods').getChildByName('img_open');

        this.m_anim_coin_fly = this.node.getChildByName('animCoinFly').getChildByName('anim_coin_fly').getComponent(CoinFlyPool);

    }

    private initData() {
        ResourcesLoader.bundleImgLoader(Constants.getInstance().m_hallBundle, ResourcesConfig.m_shopItemSelect_v).then(asset => {
            this.itemSelect = asset;
            ResourcesLoader.bundleImgLoader(Constants.getInstance().m_hallBundle, ResourcesConfig.m_shopItemUnSelect_v).then(asset => {
                this.itemUnSelect = asset;
                this.m_menuSwitch.node.on("switch-change", this.onMenuSwitchChange.bind(this));

                this.view_shopCoins.coinsScrollViewPlus = this.coinsScrollViewPlus;
                this.view_shopDiamonds.diamondScrollViewPlus = this.diamondScrollViewPlus;
                this.view_shopVip.vipScrollViewPlus = this.vipScrollViewPlus;
                this.view_shopCoins.goodsPrefab = this.itemPrefab;
                this.view_shopDiamonds.goodsPrefab = this.itemPrefab;
                this.view_shopVip.goodsPrefab = this.itemPrefab;

                this.bindViewData();
                this.showView(0);
            });
        });

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
                if (time > newTime&&rewardList.length==0) {
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
                this.layout_addCoin.active=true;
                this.layout_timer.active = false;
                this.m_goods_close.active = true;
                this.m_goods_open.active = false;
                this.conislab.string = StringUtil.showMoneyType(rewardList[0].m_value);
            }else{
                this.layout_addCoin.active=false;
            }
        }
    }

    async onclickreward(){
        cc.log("onclickreward")
        if(this.layout_timer.active == false){
            this.iscanclick = false
            clearInterval(this.CollectTime);
            let result = await WalletApi.receiveOnlineList(2,"1");
            if (result.succ) {
                //获取奖励
                let rewardList: OpenMoneyInfo[] = result.data2;
                Constants.getInstance().m_LoginUserSession.userWalletInfo.m_gameCoin += BigInt(rewardList[0].m_value);
                // this.m_label_coin.getComponent(cc.Label).string = StringUtil.showMoneyType(Constants.getInstance().m_LoginUserSession.userWalletInfo.m_gameCoin);
                // EventMgr.dispatch(EVENT.EVENT_SHOPFLYICONS_SUB)
                this.masknod.active = true
                this.playShopCoinFly(null)
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
            }else{
                this.iscanclick = true;
            }
        }
    }

    /**
     * 播放商城飞金币动画
     * @param callBack 
     */
     public playShopCoinFly(callBack: Function, issign: boolean = false) {
        EventMgr.dispatch(EVENT.EVENT_SHOPCOLLECT_SUC);
        let startNode: cc.Node
        startNode = this.m_onlierewards;
        let endNode: cc.Node = this.node.getChildByName('layout_top').getChildByName('user_chips').getChildByName("img_chips");
        this.m_anim_coin_fly.flushItems(30, 0.05, 1.5, startNode, endNode, () => {
            this.masknod.active = false
            if (callBack) {
                callBack();
            }
            // EventMgr.dispatch(EVENT.EVENT_UPDATAICONS_SUB)
            EventMgr.dispatch(EVENT.EVENT_UPDATE_COMUSER_COIN, 0);
            this.m_label_coin.getComponent(cc.Label).string = StringUtil.showMoneyType(Constants.getInstance().m_LoginUserSession.userWalletInfo.m_gameCoin);
            this.m_label_diamonds.getComponent(cc.Label).string = StringUtil.showMoneyType(Constants.getInstance().m_LoginUserSession.userWalletInfo.m_goldCoin);
            setTimeout(() => {
                this.iscanclick = true;
            }, 500);
        });
    }


    private initListener() {
        this.m_closeNode.on(cc.Node.EventType.TOUCH_END, this.clickCloseView.bind(this));
    }

    /**
     * 关闭界面
     */
    private clickCloseView() {
        if(this.iscanclick == false){
            return
        }
        this.node.destroy();
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
        this.onrequestreward();
        if(Constants.getInstance().m_LoginUserSession.userWalletInfo) {
            this.m_label_coin.getComponent(cc.Label).string = StringUtil.showMoneyType(Constants.getInstance().m_LoginUserSession.userWalletInfo.m_gameCoin);
            this.m_label_diamonds.getComponent(cc.Label).string = StringUtil.showMoneyType(Constants.getInstance().m_LoginUserSession.userWalletInfo.m_goldCoin);
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
    public setItemSelectLabelType(type: number,parentNode: cc.Node) {
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
            await this.executePreFrame(this._getItemGenerator(Constants.getInstance()._coinsGoodsListData), 1);
            // 在创建好子节点之后，先手动调用一次DC优化，触发当前在可视区域内的节点的进入逻辑
            // 后续的ScrollView滚动时，内部自动回调
            this.coinsScrollViewPlus.getComponent(ScrollViewPlus).scrollToTop(0.1)
            this.coinsScrollViewPlus.optDc();
            this.isShow = true;
        }else{
            this.coinsScrollViewPlus.getComponent(cc.ScrollView).scrollToTop(0)
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
        }
        payOrderData.dataType = DataTypeEnum.DataType_Recharge;
        let result = await WalletApi.payOrderRecharge(payOrderData);
        if (result.data && result.data instanceof PayOrderResultModel) {
            let resultData: PayOrderResultModel = result.data;
            if(cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID){
                Constants.getInstance().native.startGPPay(Constants.getInstance().m_LoginUserSession.m_uid, resultData.appStorePid, resultData.orderSn);
            }else if(cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS){
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
            await this.executePreFrame(this._getItemGenerator(Constants.getInstance()._diamondGoodsListData), 1);
            // 在创建好子节点之后，先手动调用一次DC优化，触发当前在可视区域内的节点的进入逻辑
            // 后续的ScrollView滚动时，内部自动回调
            this.diamondScrollViewPlus.getComponent(ScrollViewPlus).scrollToTop(0.1)
            this.diamondScrollViewPlus.optDc();
            this.isShow = true;
        }else{
            this.diamondScrollViewPlus.getComponent(cc.ScrollView).scrollToTop(0)
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
        }
        payOrderData.dataType = DataTypeEnum.DataType_GoldCoin;
        let result = await WalletApi.payOrderRecharge(payOrderData);
        if (result.data && result.data instanceof PayOrderResultModel) {
            let resultData: PayOrderResultModel = result.data;
            if(cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID){
                Constants.getInstance().native.startGPPay(Constants.getInstance().m_LoginUserSession.m_uid, resultData.appStorePid, resultData.orderSn);
            }else if(cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS){
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
            this.vipScrollViewPlus.optDc();
            this.isShow = true;
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
        }
        payOrderData.dataType = DataTypeEnum.DataType_Monthcard;
        let result = await WalletApi.payOrderRecharge(payOrderData);
        if (result.data && result.data instanceof PayOrderResultModel) {
            let resultData: PayOrderResultModel = result.data;
            if(cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID){
                Constants.getInstance().native.startGPPay(Constants.getInstance().m_LoginUserSession.m_uid, resultData.appStorePid, resultData.orderSn);
            }else if(cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS){
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
