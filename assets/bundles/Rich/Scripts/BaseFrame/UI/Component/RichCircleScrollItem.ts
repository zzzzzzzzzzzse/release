import RichComponentBase from "../ComponentBase/RichComponentBase";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu('自定义组件/RichCircleScroll')
export default class RichCircleScrollItem extends RichComponentBase {
    private _index: number;
    private _data: any;

    public set index(value: number) {
        this._index = value;
    }

    public get index(): number {
        return this._index;
    }

    /**
     * 请在onload方法之后调用
     */
    public set data(value: any) {
        this._data = value;
        this.dataChanged();
    }

    public get data(): any {
        return this._data;
    }

    /**
     * 在设置data数据之后调用
     */
    public getDeltaAngle(): number {
        return -1;
    }

    /**
     * 获取当前节点的坐标
     */
    public getPos(): cc.Vec2 {
        return new cc.Vec2(this.node.x, this.node.y);
    }

    protected dataChanged(): void {

    }
}
