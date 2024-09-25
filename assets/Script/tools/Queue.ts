// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Queue<T> {
    private _queue: { [key: string]: T };
    private _header: number;
    private _count: number;
    constructor() {
        this._queue = cc.js.createMap();
        this._header = 0;
        this._count = 0;
    }
    /**
     * 添加元素进入队列
     * @param element 所需要添加的元素
     * @returns 
     */
    public add(element: T, isRepeat: boolean = true): number {
        console.log("添加元素", this._count, element, this._queue);
        if (!isRepeat) {
            let repeat: boolean = false;
            Object.values(v => {
                if (v == element) {
                    repeat = true;
                }
            })
            if (repeat) return;
        }
        this._queue[this._count++] = element
        return this.size;
    }
    /**
     * 出队列
     * @returns 出队列的元素
     */
    public dec(): T {
        if (this.isEmpty) return undefined;
        const element: T = this._queue[this._header];
        delete this._queue[this._header];
        this._header++;
        return element;
    }

    public delete(index: number): void {
        if (this.isEmpty) return;
        if (index >= this.size) return;
        console.log("删除元素", this._queue[index]);
        delete this._queue[index];
    }

    /**
    * 查看队首的元素
    * @return 队首位的元素
    */
    peek(): T {
        if (this.isEmpty) return undefined;
        return this._queue[this._header];
    }

    /**
    * 返回队列中元素的个数
    * @returns count
    */
    public get size(): number {
        return this._count - this._header;
    }
    /**
    * 返回队列是否为空
    * @returns boolean
    */
    public get isEmpty(): boolean {
        return this.size === 0;
    }
    /**
     * 清空队列
     */
    clear(): void {
        this._queue = cc.js.createMap();
        this._header = 0;
        this._count = 0;
    }
}
