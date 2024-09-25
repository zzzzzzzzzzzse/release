import internal = require("stream");
import { StringUtil } from "../../../Script/tools/StringUtil";

/**
 * 商品配置
 */
export default class GoodsConfig {
    /**
     * 索引列表
     */
     private goodsConfigModelList: GoodsConfigConfigModel[] = [];
     /**
      * 是否已经初始化
      */
     private isInit: boolean = false;
     /**
      * 初始化
      */
     public constructor() {
         if (this.isInit) {
             return;
         }
         this.isInit = true;
         let goodsModel: GoodsConfigConfigModel = null;
//--------------------------------------------------   金币商品   -----------------------------------
        goodsModel = {
             id: 1001,
             iconUrl: "res/shop/goods/Goods_img_coin4",
             iconAnim:"res/shop/goods/jinbi",
             title: "",
             aniname:"2"
        };
        this.goodsConfigModelList.push(goodsModel);
        goodsModel = {
            id: 1002,
            iconUrl: "res/shop/goods/Goods_img_coin5",
            iconAnim:"res/shop/goods/jinbi",
            title: "",
            aniname:"3"
        };
        this.goodsConfigModelList.push(goodsModel);
        goodsModel = {
            id: 1003,
            iconUrl: "res/shop/goods/Goods_img_coin1",
            iconAnim:"res/shop/goods/jinbi",
            title: "",
            aniname:"4"
        };
        this.goodsConfigModelList.push(goodsModel);
        goodsModel = {
            id: 1004,
            iconUrl: "res/shop/goods/Goods_img_coin2",
            iconAnim:"res/shop/goods/jinbi",
            title: "",
            aniname:"5"
        };
        this.goodsConfigModelList.push(goodsModel);
        goodsModel = {
            id: 1005,
            iconUrl: "res/shop/goods/Goods_img_coin3",
            iconAnim:"res/shop/goods/jinbi",
            title: "",
            aniname:"6"
        };
        this.goodsConfigModelList.push(goodsModel);
        goodsModel = {
            id: 1006,
            iconUrl: "res/shop/goods/Goods_img_coin4",
            iconAnim:"res/shop/goods/jinbi",
            title: "",
            aniname:"1"
        };
        this.goodsConfigModelList.push(goodsModel);
//--------------------------------------------------   钻石商品   -----------------------------------
        goodsModel = {
            id: 2001,
            iconUrl: "res/shop/goods/Goods_img_diamonds",
            iconAnim:"res/shop/goods/zuanshi",
            title: "",
            aniname:"2"
        };
        this.goodsConfigModelList.push(goodsModel);
        goodsModel = {
            id: 2002,
            iconUrl: "res/shop/goods/Goods_img_diamonds1",
            iconAnim:"res/shop/goods/zuanshi",
            title: "",
            aniname:"3"
        };
        this.goodsConfigModelList.push(goodsModel);
        goodsModel = {
            id: 2003,
            iconUrl: "res/shop/goods/Goods_img_diamonds2",
            iconAnim:"res/shop/goods/zuanshi",
            title: "",
            aniname:"4"
        };
        this.goodsConfigModelList.push(goodsModel);
        goodsModel = {
            id: 2004,
            iconUrl: "res/shop/goods/Goods_img_diamonds3",
            iconAnim:"res/shop/goods/zuanshi",
            title: "",
            aniname:"5"
        };
        this.goodsConfigModelList.push(goodsModel);
        goodsModel = {
            id: 2005,
            iconUrl: "res/shop/goods/Goods_img_diamonds4",
            iconAnim:"res/shop/goods/zuanshi",
            title: "",
            aniname:"6"
        };
        this.goodsConfigModelList.push(goodsModel);
//--------------------------------------------------   VIP商品   -----------------------------------
        goodsModel = {
            id: 3001,
            iconUrl: "res/shop/goods/Goods_img_vip30day2",
            iconAnim:"res/shop/goods/Goods_img_coin1",
            title: "Green Jade VIP",
            aniname:""
        };
        this.goodsConfigModelList.push(goodsModel);
        goodsModel = {
            id: 3002,
            iconUrl: "res/shop/goods/Goods_img_vip30day1",
            iconAnim:"res/shop/goods/Goods_img_coin1",
            title: "Yellow Topaz VIP",
            aniname:""
        };
        this.goodsConfigModelList.push(goodsModel);
        goodsModel = {
            id: 3003,
            iconUrl: "res/shop/goods/Goods_img_vip60day1",
            iconAnim:"res/shop/goods/Goods_img_coin1",
            title: "Violet Sapphire VIP",
            aniname:""
        };
        this.goodsConfigModelList.push(goodsModel);
        goodsModel = {
            id: 3004,
            iconUrl: "res/shop/goods/Goods_img_vip60day2",
            iconAnim:"res/shop/goods/Goods_img_coin1",
            title: "Red Ruby VIP",
            aniname:""
        };
        this.goodsConfigModelList.push(goodsModel);
        goodsModel = {
            id: 3005,
            iconUrl: "res/shop/goods/Goods_img_vip90day",
            iconAnim:"res/shop/goods/Goods_img_coin1",
            title: "Black Diamond VIP",
            aniname:""
        };
        this.goodsConfigModelList.push(goodsModel);
    }

    /**
     * 获取商品配置
     */
    public getGoodsConfigModel(clientTag: string): GoodsConfigConfigModel {
        if (!StringUtil.isEmpty(clientTag)) {
            let goodsId = parseInt(clientTag);
            for (let i = 0; i < this.goodsConfigModelList.length; i++) {
                if (goodsId === this.goodsConfigModelList[i].id) {
                    return this.goodsConfigModelList[i];
                }
            }
        }
        return null;
    }
}
/**
 * 商品参数
 */
export interface GoodsConfigConfigModel {
    /**
     * 属性类型
     */
    id: number;
    /**
     * 图片地址
     */
    iconUrl: string;
    /**
     * 动画地址
     */
     iconAnim: string;
    /**
     * 显示名字
     */
    title: string;
    /**
     * 动画名字
     */
    aniname:string;
}