import { BundleType, SoundsType } from "./BaseFrame/Const/ChristmasCommonDefine";
import ChristmasDeviceManager from "./BaseFrame/Manager/ChristmasDeviceManager";
import ChristmasLogManager from "./BaseFrame/Manager/ChristmasLogManager";
import { ChristmasSlotAudioManager } from "./BaseFrame/Manager/ChristmasSlotAudioManager";
import ChristmasViewManager from "./BaseFrame/Manager/ChristmasViewManager";
import ChristmasScroll2 from "./BaseFrame/UI/Component/ChristmasScroll2";
import SpineEx from "./BaseFrame/UI/Component/ChristmasSpineEx";
import ChristmasUtil from "./BaseFrame/Util/ChristmasUtil";
import PlayerProxy from "./Common/ChristmasPlayerProxy";
import { ChristmasIconType } from "./ChristmasDefine";
import ChristmasItem from "./ChristmasItem";
import ChristmasProxy from "./ChristmasProxy";

var map: { [key: number]: { resStr: string, tableId: number } } = {
    [0]: { resStr: "sp_Level15_151101", tableId: ChristmasIconType.TEN },
    [1]: { resStr: "sp_Level15_151102", tableId: ChristmasIconType.J },
    [2]: { resStr: "sp_Level15_151103", tableId: ChristmasIconType.Q },
    [3]: { resStr: "sp_Level15_151104", tableId: ChristmasIconType.K },
    [4]: { resStr: "sp_Level15_151105", tableId: ChristmasIconType.A },
    [5]: { resStr: "sp_Level15_151106", tableId: ChristmasIconType.DINOSAUR },
    [6]: { resStr: "sp_Level15_151107", tableId: ChristmasIconType.MAMMOTH },
    [7]: { resStr: "sp_Level15_151108", tableId: ChristmasIconType.PRIMITIVE_MAN },
    [8]: { resStr: "sp_Level15_151201", tableId: ChristmasIconType.WILD },
    [9]: { resStr: "sp_Level15_151301", tableId: ChristmasIconType.FREE }
};
const { ccclass, property } = cc._decorator;

@ccclass
export default class ChristmasScroll extends ChristmasScroll2 {
    @property(SpineEx)
    addCircleSpine: SpineEx = null;//加圈spine

    onLoad() {
        if (!PlayerProxy.instance.gameId) {
            ChristmasViewManager.instance.returnHall();
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
            let tsChristmasItem: ChristmasItem = <ChristmasItem>node.getComponent("ChristmasItem");
            let randomObj = this.getRandomObj();
            tsChristmasItem.setTableId(randomObj.tableId);
            tsChristmasItem.setImg(true);
            tsChristmasItem.setOpacityFull();
        }
    }

    /** 
     * 设置清晰图片
     */
    public setClearnessImage(isRandom: boolean = false) {
        if (isRandom || ChristmasProxy.instance.gameOverData == null) {
            for (let index = 0; index < this.node.children[0].children.length; index++) {
                const node = this.node.children[0].children[index];
                let tsChristmasItem: ChristmasItem = <ChristmasItem>node.getComponent("ChristmasItem");
                let randomObj = this.getRandomObj();
                tsChristmasItem.setTableId(randomObj.tableId);
                tsChristmasItem.setImg(false);
            }
        }
        else {
            // let paytable: Array<Array<number>> = JSON.parse(ChristmasProxy.instance.gameOverData.paytable);
            //上下两轴都设置是因为有时候策划配置的圈数是奇数，不这样搞会导致闪现
            for (let i = 0; i < this.node.children.length; i++) {
                const children = this.node.children[i];
                for (let index = 0; index < children.children.length; index++) {
                    const node = children.children[index];
                    let tsChristmasItem: ChristmasItem = <ChristmasItem>node.getComponent("ChristmasItem");
                    const list = ['151101', '151102', '151103', '151104', '151105', '151106', '151107', '151108', '151201', '151301', '152102', '152103', '152104', '152105', '152106', '152107', '152108'];
                    const randIndex = ChristmasUtil.getRandomInt(0, list.length - 1);
                    let tableId = list[randIndex]//paytable[index][this.index];
                    tsChristmasItem.setTableId(tableId);
                    tsChristmasItem.setImg(false);
                }
            }

        }
    }

    /**
     * 随机获取资源名
     * @returns 
     */
    private getRandomObj(): { resStr: string, tableId: number } {
        return map[ChristmasUtil.getRandomInt(0, 9)];
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
        ChristmasLogManager.instance.info("播放单列免费转:第", this.index, "轴");
        let time = new Date().getTime();
        // return time;
        if (ChristmasProxy.instance.gameOverData == null) {
            return time;
        }
        let listNode = this.node.children[0];
        let isPlayJp: boolean = false;//是否播了四叶草音效
        let CurrJpCount: number = 0;//到目前为止出现了多少个免费转符
        let payTable = ChristmasProxy.instance.getHandlePayTableArr()
        for (let index = 0; index <= this.index; index++) {
            const col = payTable[index];
            for (let i = 0; i < col.length; i++) {
                const row = col[i];
                if (ChristmasIconType.FREE == row) {
                    ++CurrJpCount;
                }
            }
        }
        for (let index = 0; index < listNode.children.length; index++) {
            const node = listNode.children[index];
            let tsChristmasItem: ChristmasItem = <ChristmasItem>node.getComponent("ChristmasItem");
            let tableId = tsChristmasItem.getTableId();
            if (tableId == ChristmasIconType.FREE) {
                if (!isPlayJp) {
                    isPlayJp = true;
                    if (CurrJpCount == 1) {
                        ChristmasSlotAudioManager.instance.playSound(BundleType.RESOURCES, SoundsType.SCATTER_ROLL);
                    }
                    else if (CurrJpCount == 2) {
                        ChristmasSlotAudioManager.instance.playSound(BundleType.RESOURCES, SoundsType.SCATTER_ROLL2);
                    }
                    else if (CurrJpCount >= 3) {
                        ChristmasDeviceManager.instance.shake(0.283);
                        ChristmasSlotAudioManager.instance.playSound(BundleType.RESOURCES, SoundsType.SCATTER_ROLL3);
                    }
                }
                time = new Date().getTime() + 2100;
                tsChristmasItem.playSpineAnim();
            }
        }
        return time;
    }

    /**
     * 设置逻辑坐标
     */
    private setLogicPos() {
        let data = this.node.children[0].children;

        let tsChristmasItem: ChristmasItem;
        for (let index = 0; index < data.length; index++) {
            const node = data[index];
            tsChristmasItem = <ChristmasItem>node.getComponent("ChristmasItem");
            tsChristmasItem.logicPos = { x: this.index, y: index };
        }
    }

    /**
  * 获得该轴有多少个符号
  */
    public getIconNum() {
        return this.node.children[0].children.length;
    }
}
