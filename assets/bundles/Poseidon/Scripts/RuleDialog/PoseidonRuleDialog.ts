import PoseidonLogManager from "../BaseFrame/Manager/PoseidonLogManager";
import ButtonEx from "../BaseFrame/UI/Component/PoseidonButtonEx";
import PageViewEx from "../BaseFrame/UI/Component/PoseidonPageViewEx";
import PoseidonDialogBase from "../BaseFrame/UI/Dialog/PoseidonDialogBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PoseidonRuleDialog extends PoseidonDialogBase {
    @property(PageViewEx)
    pageView: PageViewEx = null;
    @property(ButtonEx)
    backButton: ButtonEx = null;//规则按钮
    @property(ButtonEx)
    previousPageButton: ButtonEx = null;//上一页
    @property(ButtonEx)
    nextPageButton: ButtonEx = null;//下一页
    @property(cc.Node)
    footerConNode: cc.Node = null;//页脚父节点
    @property(cc.Label)
    backLabelOne: cc.Label = null;

    // private payTableArr: Array<Paytable> = [];//存储读表的数据
    private footerInitWidth: number;//页脚初始宽度
    private footerTargetWidth: number;//页脚目标宽度
    onLoad() {
        this.addEvent();
        this.init();
    }

    private init() {
        this.footerInitWidth = 10;
        this.footerTargetWidth = 28;

        this.pageView.handlePercent = (percent: number, index: number) => {
            this.updateFooter(percent, index);
        }
        // this.pageView.totalPage = this.payTableArr.length;
    }

    /**
     * 渲染每个列表项（listEx自己会调用）
     * @param item 渲染的节点
     * @param idx 下标
     */
    public renderItem(item: cc.Node, idx: number) {
        // let tsPoseidonRuleItem: PoseidonRuleItem = <PoseidonRuleItem>item.getComponent("PoseidonRuleItem");
        // LogManager.instance.info("this.payTableArr:", this.payTableArr);
        // tsPoseidonRuleItem.updateItem(this.payTableArr[idx]);
        // this.fadeOutMask.updateFadeOutProp();
    }

    private addEvent() {
        this.backButton.clickCallback = this.onClickBack.bind(this);
        this.previousPageButton.clickCallback = this.onClickPreviousPage.bind(this);
        this.nextPageButton.clickCallback = this.onClickNextPage.bind(this);
        this.backButton.normalExtend = () => {
            this.backLabelOne.getComponent(cc.Label).fontSize = 22;
        }
        this.backButton.pressedExtend = () => {
            this.backLabelOne.getComponent(cc.Label).fontSize = 21;
        }
    }

    /**
     * 关闭
     */
    private onClickBack() {
        this.close();
    }

    /**
     * 上一页
     */
    private onClickPreviousPage() {
        this.pageView.prePage();
    }

    /**
     * 下一页
     */
    private onClickNextPage() {
        this.pageView.nextPage();
    }

    /**
     * 更新页脚
     */
    private updateFooter(percent: number, index: number) {
        PoseidonLogManager.instance.log("[PoseidonRuleDialog] updateFooter:", percent, ",", index);
        let footerArr = this.footerConNode.children;
        const nodeOne = footerArr[index].children[0];
        const nodeTwo = footerArr[index].children[1];
        nodeOne.opacity = 255 * percent;
        nodeOne.width = this.footerInitWidth + (this.footerTargetWidth - this.footerInitWidth) * percent;

        nodeTwo.opacity = 255 * (1 - percent);
        nodeTwo.width = this.footerInitWidth + (this.footerTargetWidth - this.footerInitWidth) * percent;
    }
}
