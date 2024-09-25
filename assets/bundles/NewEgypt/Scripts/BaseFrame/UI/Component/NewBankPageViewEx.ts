import NewBankLogManager from "../../Manager/NewBankLogManager";
import NewBankComponentBase from "../ComponentBase/NewBankComponentBase";
import NewBankPageViewIndicator from "./NewBankPageViewIndicator";

const { ccclass, property, menu } = cc._decorator;

class NodeInfo {
    public index: number;
    public node: cc.Node;
    public angle: number;//角度
}

@ccclass
@menu('自定义组件/PageView/PageViewEx')
/**
 * 分页控件，如果是循环分页，水平滑动时，请将scrollview view content的x锚点设置为0.5,item的锚点设置为0.5，
 * 如果不是循环分页，请将scrollview view content的x锚点设置为0，item的锚点设置为0
 */
export default class NewBankPageViewEx extends NewBankComponentBase {
    @property(cc.ScrollView)
    public scrollView: cc.ScrollView = null;
    @property(cc.Node)
    private content: cc.Node = null;
    @property(cc.Prefab)
    private itemPrefab: cc.Prefab = null;
    @property
    private renderNum: number = 3;
    @property({ tooltip: '一页的距离' })
    private perDistance: number = 319;//一页的距离
    @property({ tooltip: '翻页所需要的时间，单位秒' })
    private pageTweenTime: number = 0.3;//翻页所需要的时间，单位秒
    @property({ tooltip: '滑动时，多少距离触发分页，大于这个值改变页数，小于则还原' })
    private threshold: number = 100;//滑动时，多少距离触发分页，大于这个值改变页数，小于则还原
    @property({ tooltip: '是否是循环分页' })
    private loop: boolean = true;//是否是循环分页
    @property({ type: NewBankPageViewIndicator, tooltip: '分页脚标' })
    private indicator: NewBankPageViewIndicator = null;//分页脚标
    //渲染事件（渲染器）
    @property({
        type: cc.Component.EventHandler,
        tooltip: CC_DEV && '渲染事件（渲染器）',
    })
    private renderEvent: cc.Component.EventHandler = new cc.Component.EventHandler();

    private singleNum: number = 1;

    private touchStartPos: cc.Vec2 = null;

    private curVirtualIndex: number = 0;//当前虚拟索引
    private lastVirtualIndex: number = 0;//上一次的虚拟索引
    private curPage: number = 0;//当前页数,从0开始
    private _totalPage: number = 3;//总页数


    private recoverList: NodeInfo[] = [];//对象池
    private showItemList: NodeInfo[] = [];//当前显示的子项列表
    private _pageChanedCallback: Function = null;//页数发生变化时的回调
    private needCalcOpacity: boolean = false;//是否需要计算透明度
    private isTweening: boolean = false;//是否正在缓动

    protected onLoad(): void {
        this.addHandler();
        this.initData();
    }

    protected update(): void {
        if (this._totalPage <= 1) {
            return;
        }
        this.calcOpacity();
    }

    private initData(): void {
        this.singleNum = (this.renderNum - 1) / 2;
        const layout = this.content.getComponent(cc.Layout);
        layout && this.content.removeComponent(cc.Layout);
        if (this.loop) {
            this.scrollView.inertia = false;
            this.scrollView.elastic = false;
        }
        (this.scrollView as any)._handleReleaseLogic = this.handleReleaseLogic.bind(this);
    }

    private addHandler(): void {
        this.scrollView.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.scrollView.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    private onTouchStart(e): void {
        if (this._totalPage <= 1) {
            return;
        }
        const touch: cc.Touch = e.currentTouch;
        this.touchStartPos = touch.getLocation();
    }

    private onTouchMove(): void {
        if (this._totalPage <= 1) {
            return;
        }
        this.needCalcOpacity = true;
    }

    /**
     * 重写触摸释放方法
     */
    private handleReleaseLogic(touch: cc.Touch): void {
        if (!touch || !this.touchStartPos) {
            return;
        }
        if (this._totalPage <= 1) {
            return;
        }
        const scrollView = this.scrollView as any;
        let delta = scrollView._getLocalAxisAlignDelta(touch);
        scrollView._gatherTouchMove(delta);
        scrollView._processInertiaScroll();
        if (scrollView._scrolling) {
            scrollView._scrolling = false;
            if (!scrollView._autoScrolling) {
                scrollView._dispatchEvent('scroll-ended');
            }
        }
        const endPos = touch.getLocation();
        if (Math.abs(endPos.x - this.touchStartPos.x) > this.threshold) {
            const isLeftToRight = endPos.x > this.touchStartPos.x;
            isLeftToRight ? this.prePage() : this.nextPage();
            return;
        }
        this.contentTween();
    }

    /**
     * 虚拟索引发生变化
     */
    private virtualIndexChanged(): void {
        this.curPage = this.calcPage(this.curVirtualIndex);
        const deltaIndex = Math.abs(this.curVirtualIndex - this.lastVirtualIndex);
        //向左滑或者上滑
        if (this.curVirtualIndex > this.lastVirtualIndex) {
            for (let i = 0; i < deltaIndex; i++) {
                this.checkLeftNeddRecover();
                this.checkRightNeedCreate();
            }

        }
        //向右滑或者下滑
        else {
            for (let i = 0; i < deltaIndex; i++) {
                this.checkLeftNeedCreate();
                this.checkRightNeddRecover();
            }

        }
        this.lastVirtualIndex = this.curVirtualIndex;
        this.pageChanged();
    }

    /**
     * 计算当前页数
     */
    private calcPage(virtualIndex: number): number {
        let page = 0;
        if (virtualIndex < 0) {
            page = (virtualIndex % this._totalPage + this._totalPage) % this._totalPage;
        }
        else {
            page = virtualIndex % this._totalPage;
        }
        return page;
    }

    /**
     * 页数发生变化
     */
    private pageChanged(): void {
        this.indicator && this.indicator.setCurrentPage(this.curPage);
        this._pageChanedCallback && this._pageChanedCallback();
    }

    /**
     * 计算子项的坐标
     */
    private calcItemPos(virtualIndex: number): cc.Vec2 {
        const perDistance = this.perDistance;
        return new cc.Vec2(virtualIndex * perDistance, 0);
    }

    /**
     * 缓动content
     */
    private contentTween(): void {
        this.needCalcOpacity = true;
        const perDistance = this.perDistance;
        const index = this.curVirtualIndex;
        this.isTweening = true;
        cc.tween(this.content).to(this.pageTweenTime, { x: -index * perDistance }).call(this.tweenCompleted.bind(this)).start();
    }

    /**
     * 缓动完成
     */
    private tweenCompleted(): void {
        this.calcOpacity();
        cc.Tween.stopAllByTarget(this.content);
        this.content.x = -this.curVirtualIndex * this.perDistance;
        this.needCalcOpacity = false;
        this.isTweening = false;
        this.checkVituralIndexChange();
    }

    /**
     * 计算透明度
     */
    private calcOpacity(): void {
        if (!this.needCalcOpacity) {
            return;
        }

        this.curPage = this.calcPage(this.curVirtualIndex);
        const func = (index: number) => {
            const item = this.showItemList[index];
            const x = Math.abs(this.content.x + item.node.x);
            if (x <= this.perDistance) {
                this.handlePercent((this.perDistance - x) / this.perDistance, this.calcPage(item.index));
                item.node.opacity = 255 * (this.perDistance - x) / this.perDistance;
            }
            else {
                this.handlePercent(0, this.calcPage(item.index));
                item.node.opacity = 0;
            }
        }

        //分左右滑动是为了解决总页数只有两页时，页标动画显示的bug
        //向左滑或者上滑
        if (this.curVirtualIndex > this.lastVirtualIndex) {
            for (let i = 0; i < this.showItemList.length; i++) {
                func(i);
            }
        }
        //向右滑或者下滑
        else {
            for (let i = this.showItemList.length - 1; i >= 0; i--) {
                func(i);
            }
        }
    }

    /**
     * 检测虚拟索引是否发生变化
     */
    private checkVituralIndexChange(): void {
        if (this.curVirtualIndex != this.lastVirtualIndex) {
            this.virtualIndexChanged();
        }
    }

    /**
     * 初始化子项列表
     */
    private initItemList(): void {
        this.curVirtualIndex = 0;
        this.content.removeAllChildren();
        this.content.x = 0;
        this.content.width = this._totalPage * this.perDistance;
        if (this._totalPage <= 0) {
            return;
        }
        const renderNum = this.renderNum;
        const startIndex = this.loop ? -(renderNum - 1) / 2 : 0;
        const endIndex = this.loop ? -startIndex : this._totalPage - 1;
        for (let i = startIndex; i <= endIndex; i++) {
            this.createItem(i);
        }

    }

    /**
     * 创建子项
     * @param index 索引
     * @param isBehind 是否是在末尾添加
     */
    private createItem(index: number, isBehind: boolean = true): void {
        if ((index < 0 || index >= this._totalPage) && !this.loop) {
            return;
        }
        const page = this.calcPage(index);
        if (page < 0) {
            return;
        }
        NewBankLogManager.instance.log('创建子项:', index);
        let nodeInfo = this.recoverList.pop();
        if (!nodeInfo) {
            nodeInfo = new NodeInfo();
            const node = cc.instantiate(this.itemPrefab);
            nodeInfo.node = node;
        }
        const node = nodeInfo.node;
        nodeInfo.index = index;
        const pos = this.calcItemPos(index);
        node.x = pos.x;
        node.y = pos.y;
        this.content.addChild(node);
        isBehind ? this.showItemList.push(nodeInfo) : this.showItemList.unshift(nodeInfo);
        if (this.renderEvent) {
            cc.Component.EventHandler.emitEvents([this.renderEvent], node, page);
        }
    }

    /**
     * 检测左边是否需要创建
     */
    private checkLeftNeedCreate(): void {
        const leftNodeInfo = this.showItemList[0];
        if (this.content.x + leftNodeInfo.node.x > -this.perDistance) {
            this.createItem(this.curVirtualIndex - 1, false);
        }
    }

    /**
     * 检测右边是否需要创建
     */
    private checkRightNeedCreate(): void {
        const rightNodeInfo = this.showItemList[this.showItemList.length - 1];
        if (this.content.x + rightNodeInfo.node.x < this.perDistance) {
            this.createItem(this.curVirtualIndex + 1);
        }
    }

    /**
     * 检测左边是否需要回收
     */
    private checkLeftNeddRecover(): void {
        const leftNodeInfo = this.showItemList[0];
        if (this.content.x + leftNodeInfo.node.x < -this.perDistance) {
            leftNodeInfo.node.parent = null;
            this.recoverList.push(leftNodeInfo);
            this.showItemList.shift();
            NewBankLogManager.instance.log('回收子项:', leftNodeInfo.index);
        }
    }

    /**
     * 检测右边是否需要回收
     */
    private checkRightNeddRecover(): void {
        const rightNodeInfo = this.showItemList[this.showItemList.length - 1];
        if (this.content.x + rightNodeInfo.node.x > this.perDistance) {
            rightNodeInfo.node.parent = null;
            this.recoverList.push(rightNodeInfo);
            NewBankLogManager.instance.log('回收子项:', rightNodeInfo.index);
            this.showItemList.splice(this.showItemList.length - 1, 1);
        }
    }

    private clear(): void {
        this.content.stopAllActions();
        this.content.x = 0;
        this.lastVirtualIndex = 0;
        this.curVirtualIndex = 0;
        this.recoverList = [];
        this.needCalcOpacity = false;
    }

    public onDestroy(): void {
        super.onDestroy();
        cc.Tween.stopAllByTarget(this.content);
        for (let i = 0; i < this.recoverList.length; i++) {
            const node = this.recoverList[i].node;
            if (cc.isValid(node)) {
                node.destroy();
            }
        }
        this.recoverList = [];
    }

    //============================以下方法对外提供======================//

    /**
     * 获取当前页数
     */
    public getCurrentPage(): number {
        return this.curPage;
    }

    /**
     * 下一页
     */
    public nextPage(): void {
        if (!this.loop && this.curVirtualIndex >= this._totalPage - 1 || this._totalPage <= 0) {
            return;
        }
        if (this.isTweening) {
            this.tweenCompleted();
        }
        this.curVirtualIndex++;
        const perDistance = this.perDistance;
        if (this.curVirtualIndex >= this.singleNum && this.loop) {
            this.content.width += perDistance * 2;
        }
        this.contentTween();
    }

    /**
     * 上一页
     */
    public prePage(): void {
        if (!this.loop && this.curVirtualIndex == 0 || this._totalPage <= 0) {
            return;
        }
        if (this.isTweening) {
            this.tweenCompleted();
        }
        this.curVirtualIndex--;
        const perDistance = this.perDistance;
        if (this.curVirtualIndex <= -this.singleNum && this.loop) {
            this.content.width += perDistance * 2;
        }
        this.contentTween();
    }

    /**
     * 跳转到指定的页数,从0开始
     */
    public jumpToPage(page: number): void {
        if (this.loop) {
            NewBankLogManager.instance.log('循环分页不支持跳转到指定的页数');
            return;
        }
        if (page < 0 || page >= this.totalPage) {
            NewBankLogManager.instance.log('跳转的页数请在0-' + (this.totalPage - 1));
            return;
        }
        // this.curVirtualIndex = page;
        // this.contentTween();
    }

    /**
     * 设置总的页数
     */
    public set totalPage(value: number) {
        this._totalPage = value;
        this.scrollView.horizontal = value > 1;
        this.clear();
        this.indicator && this.indicator.setPages(value);
        this.initItemList();
    }

    /**
     * 页数发生变化的回调
     */
    public set pageChanedCallback(value: Function) {
        this._pageChanedCallback = value;
    }

    /**
     * 占据view窗口的百分比
     */
    public handlePercent(percent: number, index: number) {

    }

    /**
     * 设置是否需要计算透明度
     */
    public setNeedCalcOpacity(value: boolean): void {
        this.needCalcOpacity = value;
    }
}
