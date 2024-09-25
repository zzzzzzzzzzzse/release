import { BaseUI } from "../../../../../Script/common/BaseUI";
import { EVENT } from "../../../../../Script/configs/ConstDefine";
import { Constants } from "../../../../../Script/Constants";
import { AudioMgr } from "../../../../../Script/framework/mgr/AudioManager";
import { EventMgr } from "../../../../../Script/framework/mgr/EventManager";
import UserApi from "../../../../../Script/net/apis/UserApi";
import CoinFlyPool from "../../../../../Script/UI/dialog/CoinFlyPool";
import ScrollViewPlus from "../widget/lobbylistview/ScrollViewPlus";

const { ccclass, property } = cc._decorator;
/**
 * 横板商店界面
 */
@ccclass
export default class LobbyEmailView extends cc.Component {

    @property(ScrollViewPlus)
    ItemsScrollViewPlus: ScrollViewPlus = null;

    @property(cc.Prefab)
    itemPrefab: cc.Prefab = null;

    @property(cc.Label)
    numlab: cc.Label = null;

    @property(cc.Node)
    collectall: cc.Node = null;

    @property(cc.Node)
    dangban: cc.Node = null;

    datalist: any = null;

    //飞金币动画
    public m_anim_coin_fly: CoinFlyPool;
    canreceivenum: number = 0;
    allitemnod: any = [];
    offset: cc.Vec2 = null;
    curindex: number = 0;
    curid: number = 0;
    // pos: cc.Vec2 = null;

    setData() {


    }

    protected async onLoad(): Promise<void> {
        // this.init();
        // getUserEmail
        this.numlab.node.parent.active = false
        BaseUI.addNetLoading();
        let result = await UserApi.getUserEmail();
        if (result.succ) {
            BaseUI.removeNetLoading();
            console.log("LobbyEmailView=", result)
            this.datalist = result.data
            this.addItem()
            this.checkdata()
        } else {
            BaseUI.removeNetLoading();
        }


    }

    //检查可以领取邮件
    checkdata() {
        this.canreceivenum = 0
        if (this.datalist) {
            for (let i: number = 0; i < this.datalist.length; i++) {
                if (this.datalist[0].status == 1) {
                    this.canreceivenum += 1;
                }
            }
        }
        if (this.canreceivenum > 0) {
            this.numlab.node.parent.active = true
            this.collectall.color = cc.Color.WHITE
            this.collectall.getComponent(cc.Button).enabled = true;
        } else {
            this.numlab.node.parent.active = false
            this.collectall.color = cc.Color.GRAY
            this.collectall.getComponent(cc.Button).enabled = false;
        }
        this.numlab.string = this.canreceivenum + "";
    }

    //领取邮件
    onreceive(bol: boolean = false) {
        if (bol) {
            this.canreceivenum = 0;
        } else {
            this.canreceivenum = this.canreceivenum - 1;
        }
        if (this.canreceivenum > 0) {
            this.numlab.node.parent.active = true
            this.numlab.string = this.canreceivenum + "";
        } else {
            this.numlab.node.parent.active = false
            this.numlab.string = "0";
        }
    }

    protected start(): void {
        this.init();

        this.m_anim_coin_fly = this.node.getChildByName('animCoinFly').getChildByName('anim_coin_fly').getComponent(CoinFlyPool);
    }

    private init() {
        this.initView();
        this.initData();
        this.initListener();
    }


    public async addItem() {
        this.curindex = 0
        // if (!this.isShow) {
        this.ItemsScrollViewPlus.content.removeAllChildren();
        await this.executePreFrame(this._getItemGenerator(this.datalist), 1);
        // 在创建好子节点之后，先手动调用一次DC优化，触发当前在可视区域内的节点的进入逻辑
        // 后续的ScrollView滚动时，内部自动回调
        this.ItemsScrollViewPlus.getComponent(ScrollViewPlus).scrollToTop(0.1)
        this.ItemsScrollViewPlus.optDc();


    }

    onscroll() {

    }

    private *_getItemGenerator(data: Array<any>) {
        for (let i = 0; i < data.length; i++) {
            yield this._initScrollViewItemPrefab(data[i], i);
        }
    }
    private _initScrollViewItemPrefab(data, id: number) {
        let itemNode = cc.instantiate(this.itemPrefab);
        itemNode.parent = this.ItemsScrollViewPlus.content;
        itemNode.getComponent("LobbyemailPrefab").bindData(data, this.receiveclick.bind(this), id, this.ontimeover.bind(this), this.ontanban.bind(this));
        this.allitemnod.push(itemNode)
    }

    ontanban() {
        this.dangban.active = true
    }

    private receiveclick(startnod: cc.Node, index: number, coins: bigint) {
        if (this.node) {
            this.onreceive()
            this.playShopCoinFly(startnod, index, coins)
        }

        // if(this.allitemnod[index]){
        //     this.allitemnod[index].destroy();
        //     // setTimeout(() => {
        //     //     this.ItemsScrollViewPlus.optDc();
        //     // }, 100);
        // }
        // this.upateview()
    }

    private ontimeover(index: number) {
        this.onreceive()
        Constants.getInstance().emailcount = Constants.getInstance().emailcount - 1
        if (Constants.getInstance().emailcount < 0) {
            Constants.getInstance().emailcount = 0
        }
        EventMgr.dispatch(EVENT.EVENT_EMAILCOUNT_SUB);
        let id = 0
        for (let i: number = 0; i < this.allitemnod.length; i++) {
            if (this.allitemnod[i]) {
                id = i
                break
            }
        }

        if (index >= 0) {
            if (this.allitemnod[index]) {
                this.allitemnod[index].destroy();
                this.allitemnod[index] = null
                setTimeout(() => {
                    if (id == index) {
                        this.ItemsScrollViewPlus.getComponent(ScrollViewPlus).scrollToTop(0.1)
                    }
                    let ddd = this.ItemsScrollViewPlus.getComponent(ScrollViewPlus).getScrollOffset()
                    this.ItemsScrollViewPlus.getComponent(ScrollViewPlus).scrollToOffset(ddd)
                    this.ItemsScrollViewPlus.optDc();

                    let num = this.ItemsScrollViewPlus.content.children.length
                    if (num == 0) {
                        this.numlab.node.parent.active = false
                        this.collectall.color = cc.Color.GRAY
                        this.collectall.getComponent(cc.Button).enabled = false;
                    }
                }, 100);
            }
        }
    }

    async upateview() {
        this.numlab.node.parent.active = false
        BaseUI.addNetLoading();
        let result = await UserApi.getUserEmail();
        if (result.succ) {
            BaseUI.removeNetLoading();
            console.log("LobbyEmailView=", result)
            this.datalist = result.data
            this.addItem()
            this.checkdata()
        } else {
            BaseUI.removeNetLoading();
        }
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


    private initView() {


    }

    private initData() {

    }




    private initListener() {

    }

    async onreceiveall() {
        AudioMgr.play("public_slot/audio/button_click", "resources")
        this.dangban.active = true
        this.collectall.getComponent(cc.Button).enabled = false;
        let coins: bigint = BigInt(0)
        let result = await UserApi.submitUserEmail(1, BigInt(0));
        if (result.succ) {
            this.onreceive(true)
            console.log("onreceiveall", result)
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

            console.log("onreceiveallcoins=", coins)
            for (let i: number = 0; i < this.allitemnod.length; i++) {
                if (this.allitemnod[i]) {
                    this.allitemnod[i].getComponent("LobbyemailPrefab").setbtnstatus();
                }
            }
            this.playShopCoinFly(this.collectall, -1, coins)


        } else {
            this.dangban.active = false
            this.collectall.getComponent(cc.Button).enabled = true;
        }

    }



    /**
     * 播放商城飞金币动画
     * @param callBack 
     */
    public playShopCoinFly(startnod: cc.Node, index: number, coins: bigint) {
        this.dangban.active = true
        let startNode: cc.Node
        startNode = startnod;
        let _gameScene = cc.director.getScene()
        let _canvas = cc.find("Canvas", _gameScene)
        let coin = _canvas.getChildByName("menu_top").getChildByName("user_chips").getChildByName("coin")
        let endNode: cc.Node = coin;
        if (coins == BigInt(0)) {
            EventMgr.dispatch(EVENT.EVENT_UPDATAICONS_SUB)
            if (this.dangban) {
                this.dangban.active = false
            }
            let id = 0
            for (let i: number = 0; i < this.allitemnod.length; i++) {
                if (this.allitemnod[i]) {
                    id = i
                    break
                }
            }

            // this.upateview()
            if (index >= 0) {
                if (this.allitemnod[index]) {
                    this.allitemnod[index].destroy();
                    this.allitemnod[index] = null
                    setTimeout(() => {
                        if (id == index) {
                            this.ItemsScrollViewPlus.getComponent(ScrollViewPlus).scrollToTop(0.1)
                        }
                        let ddd = this.ItemsScrollViewPlus.getComponent(ScrollViewPlus).getScrollOffset()
                        this.ItemsScrollViewPlus.getComponent(ScrollViewPlus).scrollToOffset(ddd)
                        this.ItemsScrollViewPlus.optDc();

                        let num = this.ItemsScrollViewPlus.content.children.length
                        if (num == 0) {
                            this.numlab.node.parent.active = false
                            this.collectall.color = cc.Color.GRAY
                            this.collectall.getComponent(cc.Button).enabled = false;
                        }
                    }, 100);
                }
            } else {
                this.ItemsScrollViewPlus.content.removeAllChildren();
                this.numlab.node.parent.active = false
                this.collectall.color = cc.Color.GRAY
                this.collectall.getComponent(cc.Button).enabled = false;
            }
            return
        }
        this.m_anim_coin_fly.flushItems(30, 0.05, 1.5, startNode, endNode, () => {
            EventMgr.dispatch(EVENT.EVENT_UPDATAICONS_SUB)
            if (this.dangban) {
                this.dangban.active = false
            }
            let id = 0
            for (let i: number = 0; i < this.allitemnod.length; i++) {
                if (this.allitemnod[i]) {
                    id = i
                    break
                }
            }

            // this.upateview()
            if (index >= 0) {
                if (this.allitemnod[index]) {
                    this.allitemnod[index].destroy();
                    this.allitemnod[index] = null
                    setTimeout(() => {
                        if (id == index) {
                            this.ItemsScrollViewPlus.getComponent(ScrollViewPlus).scrollToTop(0.1)
                        }
                        let ddd = this.ItemsScrollViewPlus.getComponent(ScrollViewPlus).getScrollOffset()
                        this.ItemsScrollViewPlus.getComponent(ScrollViewPlus).scrollToOffset(ddd)
                        this.ItemsScrollViewPlus.optDc();

                        let num = this.ItemsScrollViewPlus.content.children.length
                        if (num == 0) {
                            this.numlab.node.parent.active = false
                            this.collectall.color = cc.Color.GRAY
                            this.collectall.getComponent(cc.Button).enabled = false;
                        }
                    }, 100);
                }
            } else {
                this.ItemsScrollViewPlus.content.removeAllChildren();
                this.numlab.node.parent.active = false
                this.collectall.color = cc.Color.GRAY
                this.collectall.getComponent(cc.Button).enabled = false;
            }

        });
        // setTimeout(() => {
        //     if(this.dangban){
        //         this.dangban.active=false
        //     }
        // }, 1000);
    }


    /**
     * 关闭界面
     */
    private clickCloseView() {
        AudioMgr.play("public_slot/audio/button_click", "resources")
        this.node.destroy();

    }



    /**
     * 绑定视图
     */
    public bindViewData() {

    }

}