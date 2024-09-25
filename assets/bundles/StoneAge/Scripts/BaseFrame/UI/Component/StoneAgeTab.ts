import StoneAgeLogManager from "../../Manager/StoneAgeLogManager";
import StoneAgeComponentBase from "../ComponentBase/StoneAgeComponentBase";
import StoneAgeListEx from "./StoneAgeListEx";
import StoneAgeTabItem from "./StoneAgeTabItem";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu('自定义组件/Tab/StoneAgeTab')
export default class StoneAgeTab extends StoneAgeComponentBase {
    @property({
        type: [StoneAgeTabItem],
        visible() {
            return !this.virtual;
        }
    })
    private items: StoneAgeTabItem[] = [];
    @property({
        type: StoneAgeListEx,
        visible() {
            return this.virtual;
        }
    })
    private list: StoneAgeListEx = null;

    @property({
        type: cc.Integer,
        visible() {
            return !this.virtual;
        }
    })
    private _selectIndex: number = 0;

    @property({ tooltip: '是否需要播放渐隐渐现动画' })
    private isAni: boolean = false;

    @property
    private virtual: boolean = false;
    private _lastIndex: number = -1;

    private _selectChangeCallback: Function = null;
    private _itemClickCallback: Function = null;
    private _dataSource: any[] = [];

    protected onLoad(): void {
        this.addHandler();
        this.selectIndexChanged();
    }

    private addHandler(): void {
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            item.clickCallback = () => {
                this.tabItemClicked(i);
            };
        }
    }

    private selectIndexChanged(): void {
        this.virtual ? this.virtualSelectChanged() : this.normalSelectChanged();
        this._lastIndex = this._selectIndex;
    }

    private normalSelectChanged(): void {
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            const select = item.getIndex() == this._selectIndex;
            item.select = select;
            select && item.node.setSiblingIndex(this.items.length);
        }
        this._selectChangeCallback && this._selectChangeCallback(this._selectIndex);
    }

    private virtualSelectChanged(): void {
        const itemList = this.list.getShowItemList();
        if (itemList.length <= 0) {
            return;
        }
        for (let i = 0; i < itemList.length; i++) {
            const tabItem = itemList[i].getComponent(StoneAgeTabItem);
            tabItem.getIndex() == this._lastIndex && this._lastIndex != -1 && this.isAni ? tabItem.playHideAni() : (tabItem.select = false);
        }
        const selectNode = this.list.getItemByListId(this._selectIndex);
        if (selectNode) {
            const selectItem = selectNode.getComponent(StoneAgeTabItem);
            selectItem && this.isAni ? selectItem.playShowAni() : (selectItem.select = true);
        }
        this._selectChangeCallback && this._selectChangeCallback(this._selectIndex);
        this._selectIndex == 0 && this.list.scrollTo(0);
    }

    public set selectChangeCallback(value: Function) {
        this._selectChangeCallback = value;
    }

    public get selectChangeCallback(): Function {
        return this._selectChangeCallback;
    }

    public set itemClickCallback(value: Function) {
        this._itemClickCallback = value;
    }

    private itemChanged(node: cc.Node, index: number): void {
        const tabItem = node.getComponent(StoneAgeTabItem);
        if (!tabItem) {
            StoneAgeLogManager.instance.warn(node.name + '必现继承TabItem');
            return;
        }
        tabItem.setIndex(index);
        tabItem.select = index == this._selectIndex;
        tabItem.clickCallback = () => {
            this.tabItemClicked(index);
        };
        tabItem.data = this._dataSource[index];
    }

    private tabItemClicked(index: number): void {
        this._itemClickCallback && this._itemClickCallback();
        this.selectIndex = index;
    }

    public set selectIndex(index: number) {
        if (this._selectIndex == index) {
            return;
        }
        this._selectIndex = index;
        this.selectIndexChanged();
    }

    public get selectIndex(): number {
        return this._selectIndex;
    }

    public set dataSource(value: any[]) {
        this._dataSource = value;
        this.list.numItems = value.length;
        this.selectIndexChanged();
    }
}
