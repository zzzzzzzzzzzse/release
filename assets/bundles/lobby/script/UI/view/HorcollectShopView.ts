import { StringUtil } from "../../../../../Script/tools/StringUtil";

const { ccclass, property } = cc._decorator;
/**
 * 横板商店界面
 */
@ccclass
export default class HorcollectShopView extends cc.Component {

    @property(cc.Node)
    coinsnod: cc.Node = null;

    @property(cc.Node)
    rewardnod1: cc.Node = null;

    @property(cc.Node)
    rewardnod2: cc.Node = null;

    @property(cc.Node)
    coinsani: cc.Node = null;

    @property(cc.Node)
    jinbiimg: cc.Node = null;

    @property(cc.Node)
    zuanshiimg: cc.Node = null;

    @property(cc.Node)
    collectbtn1: cc.Node = null;

    @property(cc.Node)
    collectbtn2: cc.Node = null;

    @property(cc.Node)
    bgani1: cc.Node = null;

    @property(cc.Node)
    bgani2: cc.Node = null;


    coins: number = 0;
    times: number = 0;
    goodstype: number;


    setData(goodstype:number,coinsnum:number,time:number) {
        this.goodstype = goodstype;
        this.coins = coinsnum;
        this.times = time;
        
    }

    protected onLoad(): void {
        // this.init();
    }

    protected start(): void {
        this.init();
    }

    private init() {
        this.initView();
        this.initData();
        this.initListener();
    }

    private initView() {
        if(this.goodstype==1){//金币
            if(this.jinbiimg){
                this.jinbiimg.active = true
            }
            this.collectbtn1.active = true
            this.bgani1.active = true
            // this.coinsani.getComponent(sp.Skeleton).setAnimation(0, "jinbi", true);
        }else if(this.goodstype == 2){//钻石
            if(this.zuanshiimg){
                this.zuanshiimg.active = true
            }
            this.collectbtn2.active = true
            this.bgani2.active = true
            // this.coinsani.getComponent(sp.Skeleton).setAnimation(0, "zuanshi", true);
        }
        this.coinsnod.getComponent(cc.Label).string = StringUtil.showMoneyType(this.coins)
        if(this.times>0){
            if(this.rewardnod1){
                this.rewardnod1.active = true
                this.rewardnod1.getChildByName("num").getComponent(cc.Label).string = "+"+this.times+" hour"
            }
            
        }

    }

    private initData() {
        
    }




    private initListener() {
        
    }





    /**
     * 关闭界面
     */
    private clickCloseView() {
        
        this.node.destroy();

    }



    /**
     * 绑定视图
     */
    public bindViewData() {
        
    }

}