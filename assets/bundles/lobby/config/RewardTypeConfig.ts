import { StringUtil } from "../../../Script/tools/StringUtil";

/**
 * 奖励类型
 */
export default class RewardTypeConfig {
    /**
      * 索引列表
      */
    private rewardTypeConfigList: RewardTypeModel[] = [];
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
        let rewardTypeModel: RewardTypeModel = null;
        //金币
        rewardTypeModel = {
            attType: 1,
            iconImg: "res/shop/goods/Goods_img_coin4",
            valueType: ValueType.VALUETYPE_Coin
        };
        this.rewardTypeConfigList.push(rewardTypeModel);

        //钻石
        rewardTypeModel = {
            attType: 2,
            iconImg: "res/shop/goods/Goods_img_diamonds",
            valueType: ValueType.VALUETYPE_Coin
        };
        this.rewardTypeConfigList.push(rewardTypeModel);

        //会员VIP
        rewardTypeModel = {
            attType: 3,
            iconImg: "res/shop/goods/Goods_img_love2",
            valueType: ValueType.VALUETYPE_Coin
        };
        this.rewardTypeConfigList.push(rewardTypeModel);

        //会员vip加成
        rewardTypeModel = {
            attType: 4,
            iconImg: "res/shop/goods/Goods_img_love2",
            valueType: ValueType.VALUETYPE_Coin
        };
        this.rewardTypeConfigList.push(rewardTypeModel);

        //月卡-金币加成
        rewardTypeModel = {
            attType: 5,
            iconImg: "res/shop/goods/Goods_img_love2",
            valueType: ValueType.VALUETYPE_Coin
        };
        this.rewardTypeConfigList.push(rewardTypeModel);

        //月卡-钻石加成
        rewardTypeModel = {
            attType: 6,
            iconImg: "res/shop/goods/Goods_img_love2",
            valueType: ValueType.VALUETYPE_Coin
        };
        this.rewardTypeConfigList.push(rewardTypeModel);

        //月卡-经验加成
        rewardTypeModel = {
            attType: 7,
            iconImg: "res/shop/goods/Goods_img_expUp2",
            valueType: ValueType.VALUETYPE_Coin
        };
        this.rewardTypeConfigList.push(rewardTypeModel);

        //月卡-在线奖励
        rewardTypeModel = {
            attType: 8,
            iconImg: "res/shop/goods/Goods_img_love2",
            valueType: ValueType.VALUETYPE_Coin
        };
        this.rewardTypeConfigList.push(rewardTypeModel);

        //奖励加成
        rewardTypeModel = {
            attType: 9,
            iconImg: "res/shop/goods/Goods_img_expUp",
            valueType: ValueType.VALUETYPE_Time
        };
        this.rewardTypeConfigList.push(rewardTypeModel);

        //签到金币
        rewardTypeModel = {
            attType: 1001,
            iconImg: "res/shop/goods/signincoins",
            valueType: ValueType.VALUETYPE_Coin
        };
        this.rewardTypeConfigList.push(rewardTypeModel);

        //签到钻石
        rewardTypeModel = {
            attType: 1002,
            iconImg: "res/shop/goods/signinzuan",
            valueType: ValueType.VALUETYPE_Coin
        };
        this.rewardTypeConfigList.push(rewardTypeModel);

        //金币
        rewardTypeModel = {
            attType: 11,
            iconImg: "res/shop/goods/signincoins",
            valueType: ValueType.VALUETYPE_Coin
        };
        this.rewardTypeConfigList.push(rewardTypeModel);

        //邮票包蓝
        rewardTypeModel = {
            attType: 19,
            iconImg: "res/shop/goods/youpiaobao_l",
            valueType: ValueType.VALUETYPE_Coin
        };
        this.rewardTypeConfigList.push(rewardTypeModel);

        //邮票包紫
        rewardTypeModel = {
            attType: 20,
            iconImg: "res/shop/goods/youpiaobao_z",
            valueType: ValueType.VALUETYPE_Coin
        };
        this.rewardTypeConfigList.push(rewardTypeModel);

    }

    /**
     * 获取商场配置
     */
    public getrewardTypeConfigModel(attType: number): RewardTypeModel {
        for (let i = 0; i < this.rewardTypeConfigList.length; i++) {
            if (attType === this.rewardTypeConfigList[i].attType) {
                return this.rewardTypeConfigList[i];
            }
        }
    }

    /**
     * 获取值
     * @param attType 类型
     */
    public getValue(attType: number, value: number): string {
        for (let i = 0; i < this.rewardTypeConfigList.length; i++) {
            if (attType === this.rewardTypeConfigList[i].attType) {
                switch (this.rewardTypeConfigList[i].valueType) {
                    case ValueType.VALUETYPE_Coin: {
                        return StringUtil.showMoneyType(value);
                    }
                    case ValueType.VALUETYPE_Time: {
                        return value + " hour";
                    }
                }
            }
        }
    }
}

/**
 * 奖励相关对象
 */
export interface RewardTypeModel {
    /**
     * 游戏id
     */
    attType: number;
    /**
     * 图片
     */
    iconImg: string;
    /**
     * 值类型
     */
    valueType: number
}
/**
 * 值的类型
 */
export enum ValueType {
    //金币格式
    VALUETYPE_Coin = 1,
    //时间格式
    VALUETYPE_Time = 2,
}