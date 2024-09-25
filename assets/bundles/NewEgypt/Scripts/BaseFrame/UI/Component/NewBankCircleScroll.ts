import NewBankCircleScrollItem from "./NewBankCircleScrollItem";

const { ccclass, property, menu } = cc._decorator;

class NodeInfo {
    public index: number;
    public node: cc.Node;
    public angle: number;//角度
}

@ccclass
@menu('自定义组件/NewBankCircleScroll')
export default class NewBankCircleScroll extends cc.Component {
    @property(cc.ScrollView)
    private scrollView: cc.ScrollView = null;
    @property(cc.Prefab)
    private itemPrefab: cc.Prefab = null;
    @property(cc.Node)
    private circleContent: cc.Node = null;
    @property(cc.Node)
    private content: cc.Node = null;
    @property(cc.Node)
    private rotationNode: cc.Node = null;
    @property(cc.Node)
    private firstItem: cc.Node = null;
    private startX: number = 0;
    @property
    private deltaAngle: number = 20;
    @property
    private radis: number = 100;
    @property
    private perAngleLength: number = 50;//每角度对应的周长
    @property({
        visible: function (this) {
            return this.isVirtual;
        }
    })
    private showNum: number = 14;
    @property
    private isVirtual: boolean = true;
    @property
    private firstItemRad: number = 0;//第一个子项相对于圆心的角度
    private itemSize: cc.Size = new cc.Size(0, 0);//子项大小
    private showNodeInfoList: NodeInfo[] = [];//当前显示的子项列表数据
    private lastAngle: number = 0;//上次旋转的角度
    private circleCenterAngle: number = 140;//圆心角
    private recoverList: NodeInfo[] = [];//对象池
    private _dataSource: any[] = [];//数据源

    onLoad(): void {
        this.alterScrollView();
    }

    /**
     * 初始化数据
     */
    private initData(): void {
        const node = cc.instantiate(this.itemPrefab);
        this.itemSize.width = node.width;
        this.itemSize.height = node.height;
        // this.radis += node.height / 2;
        const wPos = this.firstItem.parent.convertToWorldSpaceAR(this.firstItem.getPosition());
        const pos = this.circleContent.convertToNodeSpaceAR(wPos);
        this.startX = pos.x;
        this.firstItemRad = Math.asin(this.startX / this.radis);
        // console.log('firstItemAngle:' + this.radToAngle(this.firstItemAngle));
        this.lastAngle = this.rotationNode.angle;
    }

    /**
     * 初始化子项列表
     */
    private initItemList(): void {
        this.circleContent.removeAllChildren();
        this.showNodeInfoList = [];
        const num = this.isVirtual ? this.showNum : this._dataSource.length;
        for (let i = 0; i < num; i++) {
            this.createItem(i);
        }
        this.calcContentWidth();
    }

    /**
     * 计算子项坐标
     */
    private calcItemPos(index: number, deltaAngle: number): cc.Vec2 {
        let angle = this.getItemAngle(index, deltaAngle);
        let rad = this.angleToRad(angle);
        let posX = Math.abs(this.radis * Math.sin(rad));
        let posY = Math.sqrt(this.radis * this.radis - posX * posX);
        let flag = this.getFlag(angle);
        posX *= flag.x;
        posY *= flag.y;
        return new cc.Vec2(posX, posY);
    }

    /**
     * 顺时针方向为正
     */
    private getItemAngle(index: number, deltaAngle: number): number {
        if (index <= 0) {
            return this.radToAngle(this.firstItemRad);
        }
        let angle = this.showNodeInfoList[index - 1].angle + deltaAngle;
        return angle;
    }

    /**
     * 修改引擎scrollview底层代码
     */
    private alterScrollView(): void {
        let scroll = this.scrollView as any;
        scroll._moveContent = (deltaMove, canStartBounceBack) => {
            let adjustedMove = scroll._flattenVectorByDirection(deltaMove);
            let newPosition = scroll.getContentPosition().add(adjustedMove);
            scroll.setContentPosition(newPosition);
            if (scroll.elastic && canStartBounceBack) {
                scroll._startBounceBackIfNeeded();
            }
            let angle = -adjustedMove.x / this.perAngleLength;
            this.setAngle(angle);
        }
    }

    /**
     * 设置转动角度
     */
    private setAngle(angle: number): void {
        this.rotationNode.angle += angle;
        this.checkMove();
    }

    private checkMove(): void {
        const delta = this.rotationNode.angle - this.lastAngle;
        let count = Math.ceil(Math.abs(delta) / this.deltaAngle);
        //向左滑动
        if (delta > 0) {
            for (let i = 0; i < count; i++) {
                this.checkLeftNeddRecover();
                this.checkRightNeedCreate();
            }
        }
        //向右滑动
        else {
            for (let i = 0; i < count; i++) {
                this.checkRightNeddRecover();
                this.checkLeftNeedCreate();
            }
        }
        this.lastAngle = this.rotationNode.angle;
    }

    /**
     * 检测左边是否需要创建
     */
    private checkLeftNeedCreate(): void {
        const leftNodeInfo = this.showNodeInfoList[0];
        if (-this.rotationNode.angle + leftNodeInfo.angle > 0) {
            this.createItem(leftNodeInfo.index - 1, false);
        }
    }

    /**
     * 检测右边是否需要创建
     */
    private checkRightNeedCreate(): void {
        const rightNodeInfo = this.showNodeInfoList[this.showNodeInfoList.length - 1];
        if (-this.rotationNode.angle + rightNodeInfo.angle < this.circleCenterAngle) {
            this.createItem(rightNodeInfo.index + 1);
        }
    }

    /**
     * 检测左边是否需要回收
     */
    private checkLeftNeddRecover(): void {
        if (!this.isVirtual) {
            return;
        }
        const leftNodeInfo = this.showNodeInfoList[0];
        const index = Math.floor(this.rotationNode.angle / this.deltaAngle);
        if (leftNodeInfo.index < index) {
            // console.log('回收子项:' + index);
            this.showNodeInfoList.shift();
            leftNodeInfo.node.parent = null;
            this.recoverList.push(leftNodeInfo);
        }
    }

    /**
     * 检测右边是否需要回收
     */
    private checkRightNeddRecover(): void {
        if (!this.isVirtual) {
            return;
        }
        const rightNodeInfo = this.showNodeInfoList[this.showNodeInfoList.length - 1];
        if (this.rotationNode.angle + this.circleCenterAngle < rightNodeInfo.angle) {
            // console.log('回收子项:' + rightNodeInfo.index);
            this.showNodeInfoList.pop();
            rightNodeInfo.node.parent = null;
            this.recoverList.push(rightNodeInfo);
        }
    }

    /**
     * 创建子项
     */
    private createItem(index: number, isRight: boolean = true): void {
        if (index < 0 || index >= this.dataSource.length) {
            return;
        }
        // console.log('创建子项:' + (index + 1));
        let nodeInfo = this.recoverList.pop();
        if (!nodeInfo) {
            nodeInfo = new NodeInfo();
            const node = cc.instantiate(this.itemPrefab);
            const circleScrollItem = node.getComponent(NewBankCircleScrollItem);
            this.circleContent.addChild(node);
            circleScrollItem.data = this.dataSource[index];
            circleScrollItem.index = index;
            let deltaAngle = circleScrollItem.getDeltaAngle();
            deltaAngle = deltaAngle == -1 ? this.deltaAngle : deltaAngle;
            nodeInfo.node = node;
            nodeInfo.index = index;
            let angle = this.getItemAngle(index, deltaAngle);
            nodeInfo.angle = angle;
            isRight ? this.showNodeInfoList.push(nodeInfo) : this.showNodeInfoList.unshift(nodeInfo);
            let pos = this.calcItemPos(index, deltaAngle);
            node.angle = -angle;
            node.x = pos.x;
            node.y = pos.y;
        }
    }

    /**
     * 计算滑动content宽度
     */
    private calcContentWidth(): void {
        let rad = this.deltaAngle * this.dataSource.length * this.perAngleLength;
        this.content.width = rad;
    }

    /**
     * 弧度转角度
     */
    private radToAngle(rad: number): number {
        return rad * 180 / Math.PI;
    }

    /**
     * 角度转弧度
     */
    private angleToRad(angle: number): number {
        return angle * Math.PI / 180;
    }

    /**
     * 获取象限符号
     */
    private getFlag(angle: number): cc.Vec2 {
        let pos = new cc.Vec2();
        angle = this.getRealAngle(angle);
        //一项限
        if (angle >= 0 && angle < 90) {
            pos.x = 1;
            pos.y = 1;
        }
        //二项限
        else if (angle >= 90 && angle < 180) {
            pos.x = 1;
            pos.y = -1;
        }
        //三项限
        else if (angle >= 180 && angle < 270) {
            pos.x = -1;
            pos.y = -1;
        }
        //四项限
        else {
            pos.x = -1;
            pos.y = 1;
        }
        return pos;
    }

    /**
     * 获取真实的角度，0-360
     */
    private getRealAngle(angle: number): number {
        if (angle < 0) {
            return 360 + angle;
        }
        return angle % 360;
    }

    /**
     * 设置数据源
     */
    public set dataSource(value: any[]) {
        this._dataSource = value;
        this.initData();
        this.initItemList();
    }

    /**
     * 获取数据源
     */
    public get dataSource(): any[] {
        return this._dataSource;
    }

    /**
     * 外部设置content的宽度
     */
    public setContentWidth(width: number): void {
        this.content.width = width;
    }

    public setContentPos(angle: number, pos: cc.Vec2): void {
        this.rotationNode.angle = angle;
        this.content.x = pos.x;
        this.content.y = pos.y;
    }

    public getRotationAngle(index: number): number {
        const angle = this.showNodeInfoList[index].angle;
        return angle - this.radToAngle(this.firstItemRad);
    }

    public getShowItemList(): cc.Node[] {
        let list = [];
        for (let i = 0; i < this.showNodeInfoList.length; i++) {
            const node = this.showNodeInfoList[i].node;
            list.push(node);
        }
        return list;
    }
}
