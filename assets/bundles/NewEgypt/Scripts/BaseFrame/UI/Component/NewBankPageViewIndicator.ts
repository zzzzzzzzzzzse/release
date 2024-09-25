import NewBankLogManager from "../../Manager/NewBankLogManager";
import NewBankComponentBase from "../ComponentBase/NewBankComponentBase";
import NewBankPageViewIndicatorItem from "./NewBankPageViewIndicatorItem";

enum TemplateType {
    NODE = 1,
    PREFAB = 2,
}

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu('自定义组件/PageView/PageViewIndicator')
export default class NewBankPageViewIndicator extends NewBankComponentBase {
    //模板类型
    @property({ type: cc.Enum(TemplateType), tooltip: CC_DEV && '模板类型', })
    private templateType: TemplateType = TemplateType.PREFAB;

    @property({
        type: cc.Prefab,
        tooltip: CC_DEV && '模板Item',
        visible() { return this.templateType == TemplateType.PREFAB; }
    })
    private itemPrefab: cc.Prefab = null;

    @property({
        type: cc.Node,
        tooltip: CC_DEV && '模板Item',
        visible() { return this.templateType == TemplateType.NODE; }
    })
    itemNode: cc.Node = null;

    private itemList: cc.Node[] = [];

    public addItem(): void {
        NewBankLogManager.instance.log('增加一个页标');
        const node = this.templateType == TemplateType.PREFAB ? cc.instantiate(this.itemPrefab) : cc.instantiate(this.itemNode);
        this.itemList.push(node);
        this.node.addChild(node);
    }

    public removeItem(): void {
        const item = this.itemList.pop();
        item && (item.parent = null);
    }

    public setPages(pages: number): void {
        NewBankLogManager.instance.log('清空页标');
        this.node.removeAllChildren();
        this.itemList = [];
        this.node.active = pages > 1;
        for (let i = 0; i < pages; i++) {
            this.addItem();
        }
        this.setCurrentPage();
    }

    public setCurrentPage(index: number = 0): void {
        if (index < 0 || index >= this.itemList.length) {
            return;
        }
        for (let i = 0; i < this.itemList.length; i++) {
            const node = this.itemList[i];
            const item = node.getComponent(NewBankPageViewIndicatorItem);
            item.setStatus(i == index);
        }
    }
}
