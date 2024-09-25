import { BundleType, SoundsType } from "./BaseFrame/Const/RichCommonDefine";
import RichDeviceManager from "./BaseFrame/Manager/RichDeviceManager";
import RichLogManager from "./BaseFrame/Manager/RichLogManager";
import { RichSlotAudioManager } from "./BaseFrame/Manager/RichSlotAudioManager";
import RichViewManager from "./BaseFrame/Manager/RichViewManager";
import RichScroll2 from "./BaseFrame/UI/Component/RichScroll2";
import SpineEx from "./BaseFrame/UI/Component/RichSpineEx";
import RichUtil from "./BaseFrame/Util/RichUtil";
import PlayerProxy from "./Common/RichPlayerProxy";
import { RichIconType } from "./RichDefine";
import RichItem from "./RichItem";
import RichProxy from "./RichProxy";

var map: { [key: number]: { resStr: string, tableId: number } } = {
    [0]: { resStr: "sp_Level15_151101", tableId: RichIconType.TEN },
    [1]: { resStr: "sp_Level15_151102", tableId: RichIconType.J },
    [2]: { resStr: "sp_Level15_151103", tableId: RichIconType.Q },
    [3]: { resStr: "sp_Level15_151104", tableId: RichIconType.K },
    [4]: { resStr: "sp_Level15_151105", tableId: RichIconType.A },
    [5]: { resStr: "sp_Level15_151106", tableId: RichIconType.DINOSAUR },
    [6]: { resStr: "sp_Level15_151107", tableId: RichIconType.MAMMOTH },
    [7]: { resStr: "sp_Level15_151108", tableId: RichIconType.PRIMITIVE_MAN },
    [8]: { resStr: "sp_Level15_151201", tableId: RichIconType.WILD },
    [9]: { resStr: "sp_Level15_151301", tableId: RichIconType.FREE }
};
const { ccclass, property } = cc._decorator;

@ccclass
export default class RichScroll extends RichScroll2 {
    @property(SpineEx)
    addCircleSpine: SpineEx = null;//加圈spine

    onLoad() {
        if (!PlayerProxy.instance.gameId) {
            RichViewManager.instance.returnHall();
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
            let tsRichItem: RichItem = <RichItem>node.getComponent("RichItem");
            let randomObj = this.getRandomObj();
            tsRichItem.setTableId(randomObj.tableId);
            tsRichItem.setImg(true);
            tsRichItem.setOpacityFull();
        }
    }

    /** 
     * 设置清晰图片
     */
    public setClearnessImage(isRandom: boolean = false) {
        if (isRandom || RichProxy.instance.gameOverData == null) {
            for (let index = 0; index < this.node.children[0].children.length; index++) {
                const node = this.node.children[0].children[index];
                let tsRichItem: RichItem = <RichItem>node.getComponent("RichItem");
                let randomObj = this.getRandomObj();
                tsRichItem.setTableId(randomObj.tableId);
                tsRichItem.setImg(false);
            }
        }
        else {
            // let paytable: Array<Array<number>> = JSON.parse(RichProxy.instance.gameOverData.paytable);
            //上下两轴都设置是因为有时候策划配置的圈数是奇数，不这样搞会导致闪现
            for (let i = 0; i < this.node.children.length; i++) {
                const children = this.node.children[i];
                for (let index = 0; index < children.children.length; index++) {
                    const node = children.children[index];
                    let tsRichItem: RichItem = <RichItem>node.getComponent("RichItem");
                    const list = ['151101', '151102', '151103', '151104', '151105', '151106', '151107', '151108', '151201', '151301', '152102', '152103', '152104', '152105', '152106', '152107', '152108'];
                    const randIndex = RichUtil.getRandomInt(0, list.length - 1);
                    let tableId = list[randIndex]//paytable[index][this.index];
                    tsRichItem.setTableId(tableId);
                    tsRichItem.setImg(false);
                }
            }

        }
    }

    /**
     * 随机获取资源名
     * @returns 
     */
    private getRandomObj(): { resStr: string, tableId: number } {
        return map[RichUtil.getRandomInt(0, 9)];
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
        RichLogManager.instance.info("播放单列免费转:第", this.index, "轴");
        let time = new Date().getTime();
        // return time;
        if (RichProxy.instance.gameOverData == null) {
            return time;
        }
        let listNode = this.node.children[0];
        let isPlayJp: boolean = false;//是否播了四叶草音效
        let CurrJpCount: number = 0;//到目前为止出现了多少个免费转符
        let payTable = RichProxy.instance.getHandlePayTableArr()
        for (let index = 0; index <= this.index; index++) {
            const col = payTable[index];
            for (let i = 0; i < col.length; i++) {
                const row = col[i];
                if (RichIconType.FREE == row) {
                    ++CurrJpCount;
                }
            }
        }
        for (let index = 0; index < listNode.children.length; index++) {
            const node = listNode.children[index];
            let tsRichItem: RichItem = <RichItem>node.getComponent("RichItem");
            let tableId = tsRichItem.getTableId();
            if (tableId == RichIconType.FREE) {
                if (!isPlayJp) {
                    isPlayJp = true;
                    if (CurrJpCount == 1) {
                        RichSlotAudioManager.instance.playSound(BundleType.RESOURCES, SoundsType.SCATTER_ROLL);
                    }
                    else if (CurrJpCount == 2) {
                        RichSlotAudioManager.instance.playSound(BundleType.RESOURCES, SoundsType.SCATTER_ROLL2);
                    }
                    else if (CurrJpCount >= 3) {
                        RichDeviceManager.instance.shake(0.283);
                        RichSlotAudioManager.instance.playSound(BundleType.RESOURCES, SoundsType.SCATTER_ROLL3);
                    }
                }
                time = new Date().getTime() + 2100;
                tsRichItem.playSpineAnim();
            }
        }
        return time;
    }

    /**
     * 设置逻辑坐标
     */
    private setLogicPos() {
        let data = this.node.children[0].children;

        let tsRichItem: RichItem;
        for (let index = 0; index < data.length; index++) {
            const node = data[index];
            tsRichItem = <RichItem>node.getComponent("RichItem");
            tsRichItem.logicPos = { x: this.index, y: index };
        }
    }

    /**
  * 获得该轴有多少个符号
  */
    public getIconNum() {
        return this.node.children[0].children.length;
    }
}
