import { EVENT } from "../../../../../Script/configs/ConstDefine";
import { Constants } from "../../../../../Script/Constants";
import { EventMgr } from "../../../../../Script/framework/mgr/EventManager";
import SignItemModel, { SignInAtts } from "../../../../../Script/models/SignItemModel";
import SignModel from "../../../../../Script/models/SignModel";
import UserApi from "../../../../../Script/net/apis/UserApi";
import ResourcesLoader from "../../../../../Script/tools/ResourcesLoder";
import { StringUtil } from "../../../../../Script/tools/StringUtil";
import RewardTypeConfig, { RewardTypeModel } from "../../../config/RewardTypeConfig";
import { NormalPage } from "../pages/PageStack";

/**
 * 签到界面
 */
export default class LobbySignInView extends NormalPage {
    private baseNode: cc.Node;
    //item的内容
    private signinItemPrefabs: cc.Prefab;
    //item布局
    private itemNodeList: cc.Node[] = [];
    //item的签到成功项
    private itemImgSignInCheckList: cc.Node[] = [];
    //item内容
    private itemLayoutNodeList: cc.Node[] = []
    private layout_contentTop: cc.Node;
    private daylabel: cc.Label;
    private layout_pro_item: cc.Node;
    private item1: cc.Node;
    private item2: cc.Node;
    private item3: cc.Node;
    private item4: cc.Node;
    private continuity: any;
    // private ererydays: []=[];
    private pro: cc.Node;
    private totalday: number;
    private layout_pro: cc.Node;
    private ererydays: any;
    private tankuangbtn: cc.Node;
    private isclose: boolean=false;
 
    constructor(node: cc.Node, prefabs: cc.Prefab) {
        super(node);
        this.baseNode = node;
        this.ererydays = []
        this.signinItemPrefabs = prefabs;
        for(let i = 1; i <= 7; i++) {
            this.itemNodeList.push(this.baseNode.getChildByName('layout_content').getChildByName('item' + i));
            this.itemImgSignInCheckList.push(this.baseNode.getChildByName('layout_content').getChildByName('item' + i).getChildByName('img_check'));
            this.itemLayoutNodeList.push(this.baseNode.getChildByName('layout_content').getChildByName('item' + i).getChildByName('layout_content'));
        }
        this.layout_contentTop = this.baseNode.getChildByName('layout_contentTop')
        this.daylabel = this.layout_contentTop.getChildByName('daylabel').getComponent(cc.Label)

        this.layout_pro_item = this.layout_contentTop.getChildByName('layout_pro_item')
        this.item1 = this.layout_pro_item.getChildByName('item1')
        this.item2 = this.layout_pro_item.getChildByName('item2')
        this.item3 = this.layout_pro_item.getChildByName('item3')
        this.item4 = this.layout_pro_item.getChildByName('item4')
        this.tankuangbtn = this.baseNode.getChildByName('tankuang').getChildByName('bgnode').getChildByName('closebtn')
        // this.tankuangbtn.clickEvents()
        this.tankuangbtn.on("click", this.closetankuang.bind(this));
    }

    closetankuang(){
        if(this.isclose == true){
            this.baseNode.getChildByName('tankuang').active = false
        }
        
    }
 
    /**
     * 绑定数据
     * @param 绑定数据
     */
    public bindData(data: SignModel) {
        // //cc.log("绑定数据",data)
        this.ererydays = []
        if (data.m_signList && data.m_signList.length > 0) {
            //子项数据
            let itemData: SignItemModel;
            for(let i = 0; i < data.m_signList.length; i++) {
                itemData = data.m_signList[i];
                //奖励内容
                if (itemData.attsList && itemData.attsList.length > 0) {
                    this.addContent(i, itemData.attsList)
                }
            }
        }
        //打勾
        if (data.m_weekDay > 0) {
            for (let i = 0; i < data.m_weekDay; i++) {
                this.itemLayoutNodeList[i].active = false;
                this.itemImgSignInCheckList[i].active = true;
            }
        }
        this.daylabel.string = data.m_monthDay+"/"+ data.m_monthCycle
        this.continuity = data.continuity;
        this.continuity.sort((a,b):any=>{
            if(a && b){
                return a.dayIndex-b.dayIndex;         
            }     
            return 0; 
        })
        //cc.log("continuity=",this.continuity)
        for(let i = 0; i < this.continuity.length; i++) {
            let daynum = this.continuity[i].dayIndex
            if(i==0){
                this.item1.getChildByName('lock').getChildByName('label').getComponent(cc.Label).string = this.continuity[i].dayIndex+"";
            }else if(i==1){
                this.item2.getChildByName('lock').getChildByName('label').getComponent(cc.Label).string = this.continuity[i].dayIndex+"";
            }else if(i==2){
                this.item3.getChildByName('lock').getChildByName('label').getComponent(cc.Label).string = this.continuity[i].dayIndex+"";
            }else if(i==3){
                this.item4.getChildByName('lock').getChildByName('label').getComponent(cc.Label).string = this.continuity[i].dayIndex+"";
            }
            if(data.m_monthDay>=this.continuity[i].dayIndex){
              if(i==0){//unlock 
                this.item1.getChildByName('lock').active = false
                this.item1.getChildByName('unlock').active = true
              }else if(i==1){
                this.item2.getChildByName('lock').active = false
                this.item2.getChildByName('unlock').active = true
              }else if(i==2){
                this.item3.getChildByName('lock').active = false
                this.item3.getChildByName('unlock').active = true
              }else if(i==3){
                this.item4.getChildByName('lock').active = false
                this.item4.getChildByName('unlock').active = true
              }  
            }

        }

        this.totalday = data.m_monthCycle;
        let per = data.m_monthDay/data.m_monthCycle;
        this.layout_pro = this.layout_contentTop.getChildByName('layout_pro')
        this.pro = this.layout_pro.getChildByName('pro')
        this.pro.width = this.layout_pro.width*per

        // setTimeout(() => {
        //     this.checkDay(1)
        // }, 2000);
    }
 
    /**
     * 展示数据
     * @param index 索引
     * @param dataList 数据列表
     */
    private addContent(index: number, dataList: SignInAtts[]) {
        //内容
        this.ererydays.push(dataList)
        let contentNode: cc.Node = this.itemLayoutNodeList[index];
        let itemModel: RewardTypeModel;//对应的配置商品
        let itemNode: cc.Node;//创建的节点
        let itemCount: number = dataList.length;//数量
        let m_rewardTypeConfig: RewardTypeConfig = new RewardTypeConfig();
        for(let i = 0; i < dataList.length; i++) {
            itemModel = m_rewardTypeConfig.getrewardTypeConfigModel(dataList[i].m_attType);
            //创建节点
            itemNode = this.createrContent(itemModel.iconImg, dataList[i].m_valueA);
            //更具数量排序
            switch (itemCount) {
                case 2: {
                    if(i === 0) {
                        itemNode.x = -(itemNode.width / 2) - 5;
                        itemNode.y = 0;
                    } else if (i === 1) {
                        itemNode.x = (itemNode.width / 2) + 5;
                        itemNode.y = 0;
                    }
                    itemNode.parent = contentNode;
                    break;
                }
                case 3: {
                    if(i === 0) {
                        itemNode.x = -(itemNode.width / 2) - 5;
                        itemNode.y = (itemNode.height / 2) + 5;
                    } else if (i === 1) {
                        itemNode.x = (itemNode.width / 2) + 5;
                        itemNode.y  = (itemNode.height / 2) + 5;
                    } else if (i === 2) {
                        itemNode.x = 0;
                        itemNode.y = -(itemNode.height / 2) - 5;
                    }
                    itemNode.parent = contentNode;
                    break;
                }
                case 4: {
                    if(i === 0) {
                        itemNode.x = -(itemNode.width / 2) - 5;
                        itemNode.y = (itemNode.height / 2) + 5;
                    } else if (i === 1) {
                        itemNode.x = (itemNode.width / 2) + 5;
                        itemNode.y  = (itemNode.height / 2) + 5;
                    } else if (i === 2) {
                        itemNode.x = -(itemNode.width / 2) - 5;
                        itemNode.y = -(itemNode.height / 2) - 5;
                    } else if (i === 3) {
                        itemNode.x = (itemNode.width / 2) + 5;
                        itemNode.y = -(itemNode.height / 2) - 5;
                    }
                    itemNode.parent = contentNode;
                    break;
                }
                default: {
                    itemNode.parent = contentNode;
                    break;
                }
            }
        }
        
    }
 
    /**
     * 创建内容
     * @param imgUrl 图片
     * @param label 文字
     */
    private createrContent(imgUrl: string, label: string) {
        let itemNode = cc.instantiate(this.signinItemPrefabs);
        let itemImgNode = itemNode.getChildByName('img');
        let itemLabelnode = itemNode.getChildByName('label');
        let num = Number(label)
        itemLabelnode.getComponent(cc.Label).string = StringUtil.showMoneyType2(num);
        ResourcesLoader.bundleImgLoader(Constants.getInstance().m_hallBundle, imgUrl).then(asset => {
            itemImgNode.getComponent(cc.Sprite).spriteFrame = asset;
        });
        return itemNode;
    }
 
    /**
     * 确认签到成功
     * @param dayNum 第几天
     */
    public checkDay(dayNum: number,data:SignModel,result) {
        //cc.log("确认签到成功",data)
        //cc.log("result",result)
        let list = result.data.list;
        //cc.log(list)

        let reward1 = list

        let coins = 0
        let diamonds = 0
        for(let i = 0; i < reward1.length; i++) {
            if(reward1[i].dataType ==1){
                coins = coins + Number(reward1[i].attValueA) 
            }
            if(reward1[i].dataType ==2){
                diamonds = diamonds + Number(reward1[i].attValueA) 
            }
        }
        //cc.log("coins",coins)
        //cc.log("diamonds",diamonds)
        // this.pro.width = (dayNum/this.totalday)*this.layout_pro.width
        cc.tween(this.itemLayoutNodeList[dayNum]).to(0.2, {opacity: 0}).call(() => {
            this.itemLayoutNodeList[dayNum].active = false;
            this.itemImgSignInCheckList[dayNum].opacity = 0;
            this.itemImgSignInCheckList[dayNum].active = true;
            cc.tween(this.itemImgSignInCheckList[dayNum]).to(0.2, {opacity: 255}).call(async () => {
                this.pro.width = ((data.m_monthDay+1)/this.totalday)*this.layout_pro.width
                this.daylabel.string = (data.m_monthDay+1)+"/"+ this.totalday
                Constants.getInstance().m_LoginUserSession.userWalletInfo.m_gameCoin += BigInt(coins)
                Constants.getInstance().m_LoginUserSession.userWalletInfo.m_goldCoin += diamonds
                // EventMgr.dispatch(EVENT.EVENT_UPDATAICONS_SUB)
                for(let i = 0; i < this.continuity.length; i++) {
                    if(this.continuity[i].dayIndex == (data.m_monthDay+1)){
                        //cc.log("7天")
                        // let result = await UserApi.submitSignIn(this.continuity[i].id, this.continuity[i].tranSign);
                        // if (result.succ) {
                        //     //cc.log("7t==",result)
                            
                        // }
                    }

                    if((data.m_monthDay+1)>=this.continuity[i].dayIndex){
                        if(i==0){//unlock 
                          this.item1.getChildByName('lock').active = false
                          this.item1.getChildByName('unlock').active = true
                        }else if(i==1){
                          this.item2.getChildByName('lock').active = false
                          this.item2.getChildByName('unlock').active = true
                        }else if(i==2){
                          this.item3.getChildByName('lock').active = false
                          this.item3.getChildByName('unlock').active = true
                        }else if(i==3){
                          this.item4.getChildByName('lock').active = false
                          this.item4.getChildByName('unlock').active = true
                        }  
                      }
                }

                

                this.baseNode.getChildByName('tankuang').active = true
                let actionnod = this.baseNode.getChildByName('tankuang').getChildByName('bgnode')
                cc.tween(actionnod).to(0.2, { scale: 1 }).call(() => {
                    EventMgr.dispatch(EVENT.EVENT_FLYICONS_SUB)
                    this.isclose = false
                    setTimeout(() => {
                        EventMgr.dispatch(EVENT.EVENT_UPDATAICONS_SUB)
                        this.isclose = true
                    }, 2300);
                }).start();
                let tankuang = this.baseNode.getChildByName('tankuang').getChildByName('bgnode').getChildByName('layout_content')

                let contentNode: cc.Node = tankuang
                let itemModel: RewardTypeModel;//对应的配置商品
                let itemNode: cc.Node;//创建的节点
                let itemCount: number = reward1.length;//数量
                let m_rewardTypeConfig: RewardTypeConfig = new RewardTypeConfig();
                for(let i = 0; i < reward1.length; i++) {
                    itemModel = m_rewardTypeConfig.getrewardTypeConfigModel(reward1[i].dataType);
                    //创建节点
                    itemNode = this.createrContent(itemModel.iconImg, reward1[i].attValueA);
                    //更具数量排序
                    switch (itemCount) {
                        case 2: {
                            if(i === 0) {
                                itemNode.x = -(itemNode.width / 2) - 15;
                                itemNode.y = 0;
                            } else if (i === 1) {
                                itemNode.x = (itemNode.width / 2) + 15;
                                itemNode.y = 0;
                            }
                            itemNode.parent = contentNode;
                            break;
                        }
                        case 3: {
                            if(i === 0) {
                                itemNode.x = -(itemNode.width / 2) - 15;
                                itemNode.y = (itemNode.height / 2) + 5;
                            } else if (i === 1) {
                                itemNode.x = (itemNode.width / 2) + 15;
                                itemNode.y  = (itemNode.height / 2) + 5;
                            } else if (i === 2) {
                                itemNode.x = 0;
                                itemNode.y = -(itemNode.height / 2) - 5;
                            }
                            itemNode.parent = contentNode;
                            break;
                        }
                        case 4: {
                            if(i === 0) {
                                itemNode.x = -(itemNode.width / 2) - 15;
                                itemNode.y = (itemNode.height / 2) + 5;
                            } else if (i === 1) {
                                itemNode.x = (itemNode.width / 2) + 15;
                                itemNode.y  = (itemNode.height / 2) + 5;
                            } else if (i === 2) {
                                itemNode.x = -(itemNode.width / 2) - 15;
                                itemNode.y = -(itemNode.height / 2) - 5;
                            } else if (i === 3) {
                                itemNode.x = (itemNode.width / 2) + 15;
                                itemNode.y = -(itemNode.height / 2) - 5;
                            }
                            itemNode.parent = contentNode;
                            break;
                        }
                        default: {
                            itemNode.parent = contentNode;
                            break;
                        }
                    }
                }
            }).start();
        }).start();
        
    }
}