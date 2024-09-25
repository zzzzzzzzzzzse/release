import { BundleType, SoundsType } from "./BaseFrame/Const/StoneAgeCommonDefine";
import StoneAgeDeviceManager from "./BaseFrame/Manager/StoneAgeDeviceManager";
import StoneAgeLogManager from "./BaseFrame/Manager/StoneAgeLogManager";
import { StoneAgeSlotAudioManager } from "./BaseFrame/Manager/StoneAgeSlotAudioManager";
import StoneAgeViewManager from "./BaseFrame/Manager/StoneAgeViewManager";
import StoneAgeScroll2 from "./BaseFrame/UI/Component/StoneAgeScroll2";
import SpineEx from "./BaseFrame/UI/Component/StoneAgeSpineEx";
import StoneAgeUtil from "./BaseFrame/Util/StoneAgeUtil";
import PlayerProxy from "./Common/StoneAgePlayerProxy";
import { StoneAgeIconType } from "./StoneAgeDefine";
import StoneAgeItem from "./StoneAgeItem";
import StoneAgeProxy from "./StoneAgeProxy";

var map: { [key: number]: { resStr: string, tableId: number } } = {
    [0]: { resStr: "sp_Level15_151101", tableId: StoneAgeIconType.TEN },
    [1]: { resStr: "sp_Level15_151102", tableId: StoneAgeIconType.J },
    [2]: { resStr: "sp_Level15_151103", tableId: StoneAgeIconType.Q },
    [3]: { resStr: "sp_Level15_151104", tableId: StoneAgeIconType.K },
    [4]: { resStr: "sp_Level15_151105", tableId: StoneAgeIconType.A },
    [5]: { resStr: "sp_Level15_151106", tableId: StoneAgeIconType.DINOSAUR },
    [6]: { resStr: "sp_Level15_151107", tableId: StoneAgeIconType.MAMMOTH },
    [7]: { resStr: "sp_Level15_151108", tableId: StoneAgeIconType.PRIMITIVE_MAN },
    [8]: { resStr: "sp_Level15_151201", tableId: StoneAgeIconType.WILD },
    [9]: { resStr: "sp_Level15_151301", tableId: StoneAgeIconType.FREE }
};
const { ccclass, property } = cc._decorator;

@ccclass
export default class StoneAgeScroll extends StoneAgeScroll2 {
    @property(SpineEx)
    addCircleSpine: SpineEx = null;//加圈spine

    onLoad() {
        if (!PlayerProxy.instance.gameId) {
            StoneAgeViewManager.instance.returnHall();
        }
        this.circle = 10;//configData.numRing[this.index];
        super.onLoad();
        this.setLogicPos();
        this.setDimImage(1);
        this.setClearnessImage(true);
    }

    public calcDistance(): void {
        super.calcDistance();
    }

    /**
     * 设置模糊图片
     */
    public setDimImage(index: number) {
        const nodeList = this.node.children[index];
        for (let i = 0; i < nodeList.children.length; i++) {
            const node = nodeList.children[i];
            let tsStoneAgeItem: StoneAgeItem = <StoneAgeItem>node.getComponent("StoneAgeItem");
            let randomObj = this.getRandomObj();
            tsStoneAgeItem.setTableId(randomObj.tableId);
            tsStoneAgeItem.setImg(true);
            tsStoneAgeItem.setOpacityFull();
        }
    }

    /** 
     * 设置清晰图片
     */
    public setClearnessImage(isRandom: boolean = false) {
        if (isRandom || StoneAgeProxy.instance.gameOverData == null) {
            for (let index = 0; index < this.node.children[0].children.length; index++) {
                const node = this.node.children[0].children[index];
                let tsStoneAgeItem: StoneAgeItem = <StoneAgeItem>node.getComponent("StoneAgeItem");
                let randomObj = this.getRandomObj();
                tsStoneAgeItem.setTableId(randomObj.tableId);
                tsStoneAgeItem.setImg(false);
            }
        }
        else {
            // let paytable: Array<Array<number>> = JSON.parse(StoneAgeProxy.instance.gameOverData.paytable);
            //上下两轴都设置是因为有时候策划配置的圈数是奇数，不这样搞会导致闪现
            for (let i = 0; i < this.node.children.length; i++) {
                const children = this.node.children[i];
                for (let index = 0; index < children.children.length; index++) {
                    const node = children.children[index];
                    let tsStoneAgeItem: StoneAgeItem = <StoneAgeItem>node.getComponent("StoneAgeItem");
                    const list = ['151101', '151102', '151103', '151104', '151105', '151106', '151107', '151108', '151201', '151301', '152102', '152103', '152104', '152105', '152106', '152107', '152108'];
                    const randIndex = StoneAgeUtil.getRandomInt(0, list.length - 1);
                    let tableId = list[randIndex]//paytable[index][this.index];
                    tsStoneAgeItem.setTableId(tableId);
                    tsStoneAgeItem.setImg(false);
                }
            }

        }
    }

    /**
     * 随机获取资源名
     * @returns 
     */
    private getRandomObj(): { resStr: string, tableId: number } {
        return map[StoneAgeUtil.getRandomInt(0, 9)];
    }

    /**
      * 播放加圈动画
      */
    public playAddCircleSpine() {
        this.addCircleSpine.node.active = true;
        this.addCircleSpine.node.opacity = 0;
        cc.tween(this.addCircleSpine.node)
            .to(0.2, { opacity: 255 }, { easing: 'sineIn' })
            .start();

    }

    /**
     * 停止加圈动画
     */
    public stopAddCircleSpine() {
        cc.tween(this.addCircleSpine.node)
            .to(0.2, { opacity: 0 }, { easing: 'sineOut' })
            .call(() => {
                this.addCircleSpine.node.active = false;
                this.addCircleSpine.node.opacity = 255;
            })
            .start();
    }

    /**
    * 播放免费转符动画,会返回一个播放完成的时间戳
    */
    public playFreeAnim(): number {
        StoneAgeLogManager.instance.info("播放单列免费转:第", this.index, "轴");
        let time = new Date().getTime();
        // return time;
        if (StoneAgeProxy.instance.gameOverData == null) {
            return time;
        }
        let listNode = this.node.children[0];
        let isPlayJp: boolean = false;//是否播了四叶草音效
        let CurrJpCount: number = 0;//到目前为止出现了多少个免费转符
        let payTable = StoneAgeProxy.instance.getHandlePayTableArr()
        for (let index = 0; index <= this.index; index++) {
            const col = payTable[index];
            for (let i = 0; i < col.length; i++) {
                const row = col[i];
                if (StoneAgeIconType.FREE == row) {
                    ++CurrJpCount;
                }
            }
        }
        for (let index = 0; index < listNode.children.length; index++) {
            const node = listNode.children[index];
            let tsStoneAgeItem: StoneAgeItem = <StoneAgeItem>node.getComponent("StoneAgeItem");
            let tableId = tsStoneAgeItem.getTableId();
            if (tableId == StoneAgeIconType.FREE) {
                if (!isPlayJp) {
                    isPlayJp = true;
                    if (CurrJpCount == 1) {
                        StoneAgeSlotAudioManager.instance.playSound(BundleType.RESOURCES, SoundsType.SCATTER_ROLL);
                    }
                    else if (CurrJpCount == 2) {
                        StoneAgeSlotAudioManager.instance.playSound(BundleType.RESOURCES, SoundsType.SCATTER_ROLL2);
                    }
                    else if (CurrJpCount >= 3) {
                        StoneAgeDeviceManager.instance.shake(0.283);
                        StoneAgeSlotAudioManager.instance.playSound(BundleType.RESOURCES, SoundsType.SCATTER_ROLL3);
                    }
                }
                time = new Date().getTime() + 2100;
                tsStoneAgeItem.playSpineAnim();
            }
        }
        return time;
    }

    /**
     * 设置逻辑坐标
     */
    private setLogicPos() {
        let data = this.node.children[0].children;

        let tsStoneAgeItem: StoneAgeItem;
        for (let index = 0; index < data.length; index++) {
            const node = data[index];
            tsStoneAgeItem = <StoneAgeItem>node.getComponent("StoneAgeItem");
            tsStoneAgeItem.logicPos = { x: this.index, y: index };
        }
    }

    /**
  * 获得该轴有多少个符号
  */
    public getIconNum() {
        return this.node.children[0].children.length;
    }
}
