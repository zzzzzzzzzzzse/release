import { BundleType, SoundsType } from "./BaseFrame/Const/NewBankCommonDefine";
import NewBankDeviceManager from "./BaseFrame/Manager/NewBankDeviceManager";
import NewBankLogManager from "./BaseFrame/Manager/NewBankLogManager";
import { NewBankSlotAudioManager } from "./BaseFrame/Manager/NewBankSlotAudioManager";
import NewBankViewManager from "./BaseFrame/Manager/NewBankViewManager";
import NewBankScroll2 from "./BaseFrame/UI/Component/NewBankScroll2";
import SpineEx from "./BaseFrame/UI/Component/NewBankSpineEx";
import NewBankUtil from "./BaseFrame/Util/NewBankUtil";
import PlayerProxy from "./Common/NewBankPlayerProxy";
import { NewBankIconType } from "./NewBankDefine";
import NewBankItem from "./NewBankItem";
import NewBankProxy from "./NewBankProxy";

var map: { [key: number]: { resStr: string, tableId: number } } = {
    [0]: { resStr: "sp_Level15_151101", tableId: NewBankIconType.TEN },
    [1]: { resStr: "sp_Level15_151102", tableId: NewBankIconType.J },
    [2]: { resStr: "sp_Level15_151103", tableId: NewBankIconType.Q },
    [3]: { resStr: "sp_Level15_151104", tableId: NewBankIconType.K },
    [4]: { resStr: "sp_Level15_151105", tableId: NewBankIconType.A },
    [5]: { resStr: "sp_Level15_151106", tableId: NewBankIconType.DINOSAUR },
    [6]: { resStr: "sp_Level15_151107", tableId: NewBankIconType.MAMMOTH },
    [7]: { resStr: "sp_Level15_151108", tableId: NewBankIconType.PRIMITIVE_MAN },
    [8]: { resStr: "sp_Level15_151201", tableId: NewBankIconType.WILD },
    [9]: { resStr: "sp_Level15_151301", tableId: NewBankIconType.FREE }
};
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewBankScroll extends NewBankScroll2 {
    @property(SpineEx)
    addCircleSpine: SpineEx = null;//加圈spine

    onLoad() {
        if (!PlayerProxy.instance.gameId) {
            NewBankViewManager.instance.returnHall();
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
            let tsNewBankItem: NewBankItem = <NewBankItem>node.getComponent("NewBankItem");
            let randomObj = this.getRandomObj();
            tsNewBankItem.setTableId(randomObj.tableId);
            tsNewBankItem.setImg(true);
            tsNewBankItem.setOpacityFull();
        }
    }

    /** 
     * 设置清晰图片
     */
    public setClearnessImage(isRandom: boolean = false) {
        if (isRandom || NewBankProxy.instance.gameOverData == null) {
            for (let index = 0; index < this.node.children[0].children.length; index++) {
                const node = this.node.children[0].children[index];
                let tsNewBankItem: NewBankItem = <NewBankItem>node.getComponent("NewBankItem");
                let randomObj = this.getRandomObj();
                tsNewBankItem.setTableId(randomObj.tableId);
                tsNewBankItem.setImg(false);
            }
        }
        else {
            // let paytable: Array<Array<number>> = JSON.parse(NewBankProxy.instance.gameOverData.paytable);
            //上下两轴都设置是因为有时候策划配置的圈数是奇数，不这样搞会导致闪现
            for (let i = 0; i < this.node.children.length; i++) {
                const children = this.node.children[i];
                for (let index = 0; index < children.children.length; index++) {
                    const node = children.children[index];
                    let tsNewBankItem: NewBankItem = <NewBankItem>node.getComponent("NewBankItem");
                    const list = ['151101', '151102', '151103', '151104', '151105', '151106', '151107', '151108', '151201', '151301', '152102', '152103', '152104', '152105', '152106', '152107', '152108'];
                    const randIndex = NewBankUtil.getRandomInt(0, list.length - 1);
                    let tableId = list[randIndex]//paytable[index][this.index];
                    tsNewBankItem.setTableId(tableId);
                    tsNewBankItem.setImg(false);
                }
            }

        }
    }

    /**
     * 随机获取资源名
     * @returns 
     */
    private getRandomObj(): { resStr: string, tableId: number } {
        return map[NewBankUtil.getRandomInt(0, 9)];
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
        NewBankLogManager.instance.info("播放单列免费转:第", this.index, "轴");
        let time = new Date().getTime();
        // return time;
        if (NewBankProxy.instance.gameOverData == null) {
            return time;
        }
        let listNode = this.node.children[0];
        let isPlayJp: boolean = false;//是否播了四叶草音效
        let CurrJpCount: number = 0;//到目前为止出现了多少个免费转符
        let payTable = NewBankProxy.instance.getHandlePayTableArr()
        for (let index = 0; index <= this.index; index++) {
            const col = payTable[index];
            for (let i = 0; i < col.length; i++) {
                const row = col[i];
                if (NewBankIconType.FREE == row) {
                    ++CurrJpCount;
                }
            }
        }
        for (let index = 0; index < listNode.children.length; index++) {
            const node = listNode.children[index];
            let tsNewBankItem: NewBankItem = <NewBankItem>node.getComponent("NewBankItem");
            let tableId = tsNewBankItem.getTableId();
            if (tableId == NewBankIconType.FREE) {
                if (!isPlayJp) {
                    isPlayJp = true;
                    if (CurrJpCount == 1) {
                        NewBankSlotAudioManager.instance.playSound(BundleType.RESOURCES, SoundsType.SCATTER_ROLL);
                    }
                    else if (CurrJpCount == 2) {
                        NewBankSlotAudioManager.instance.playSound(BundleType.RESOURCES, SoundsType.SCATTER_ROLL2);
                    }
                    else if (CurrJpCount >= 3) {
                        NewBankDeviceManager.instance.shake(0.283);
                        NewBankSlotAudioManager.instance.playSound(BundleType.RESOURCES, SoundsType.SCATTER_ROLL3);
                    }
                }
                time = new Date().getTime() + 2100;
                tsNewBankItem.playSpineAnim();
            }
        }
        return time;
    }

    /**
     * 设置逻辑坐标
     */
    private setLogicPos() {
        let data = this.node.children[0].children;

        let tsNewBankItem: NewBankItem;
        for (let index = 0; index < data.length; index++) {
            const node = data[index];
            tsNewBankItem = <NewBankItem>node.getComponent("NewBankItem");
            tsNewBankItem.logicPos = { x: this.index, y: index };
        }
    }

    /**
  * 获得该轴有多少个符号
  */
    public getIconNum() {
        return this.node.children[0].children.length;
    }
}
