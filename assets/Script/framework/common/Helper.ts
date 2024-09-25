import { SlotSlotSubject } from "../../models/socket/SlotSlotSubject";
import { StringUtil } from "../../tools/StringUtil";

/**
 * @description try catch装饰器(支持5个参数以内的funcition修饰)
 * @param msg 报错输出信息
 * @returns 
 */
export function catchError(msg: string) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        const value: any = descriptor.value;
        descriptor.value = function (args1: any, args2: any, args3: any, args4: any, args5: any) {
            try {
                if (typeof value === "function") {
                    return value.call(this, args1, args2, args3, args4, args5);
                }
            } catch (error) {
                console.error(msg, ",error:", error);
            }
        };
    }
}

const CANVAS: string = `Canvas`;

export default class Helper {


    public static setWinCoin<T extends cc.Component>(win: number, label: cc.Label, cb: () => void, target: T): void {
        const self = target;
        let num: number = win;
        let addNum: number = 0;
        const _winAddSchedule = function () {
            if (!self.isValid) {
                self.unschedule(this._winAddSchedule);
                return;
            }
            if (addNum >= num) {
                self.unschedule(_winAddSchedule);
                addNum = num;
                label.string = StringUtil.showMoneyType(addNum);
                cb && cb();

            } else {
                addNum += Math.floor(num / 20);
                label.string = StringUtil.showMoneyType(addNum);
            }
        }
        target.scheduleOnce(() => {
            target.schedule(_winAddSchedule, 0.05);
        }, 0.2);
    }


    /** @description 屏幕适配 */
    public static adaptationScreen(): void {
        cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
        let frameSize = cc.view.getFrameSize();
        let designSize = cc.view.getDesignResolutionSize();
        let canvas: cc.Node = cc.find(CANVAS);
        if (frameSize.width / frameSize.height > designSize.width / designSize.height) {
            canvas.width = designSize.height * frameSize.width / frameSize.height;
            canvas.height = designSize.height;
            canvas.getComponent(cc.Canvas).designResolution = cc.size(canvas.width, canvas.height);
        } else {
            canvas.width = designSize.width;
            canvas.height = designSize.width * frameSize.height / frameSize.width;
            canvas.getComponent(cc.Canvas).designResolution = cc.size(canvas.width, canvas.height);
        }
    }

    public static adaptationUI(node: cc.Node): void {
        let designSize = cc.Canvas.instance.designResolution;
        let size: cc.Size = node.getContentSize();
        if (designSize.height / size.width > designSize.height / designSize.width) {
            node.scale = designSize.width / node.width;
        }
    }


    /** @description 数组是否有重复元素 */
    public static arrIsRepeat<T>(arr: Array<T>) {
        let set: Set<T> = new Set<T>(arr);
        return arr.length !== set.size;
    }

    /** 
     * @description 节点坐标系转换 
     * @param node 需要转换的节点
     * @param tuNode 转换到哪个节点
     * */
    public static toNodeSpaceAR(node: cc.Node, toNode: cc.Node): cc.Vec3 {
        const worldPosition: cc.Vec3 = node.parent.convertToWorldSpaceAR(node.position);
        const nodePosition: cc.Vec3 = toNode.parent.convertToNodeSpaceAR(worldPosition);
        return nodePosition;
    }
    /**
     *  @description 播放spine动画
     *  @param node 包含带有sp.Skeleton的节点
     *  @param animation 动画名字
     *  @param cb 回调函数
     *  @param loop 是否循环
     */
    public static playSpine(node, animation: string, cb?: () => void, loop?: boolean): void {
        loop = loop === undefined ? true : loop;
        const spine: sp.Skeleton = node.getComponent(sp.Skeleton);
        const track: sp.spine.TrackEntry = spine.setAnimation(0, animation, loop);
        if (track) {
            spine.setCompleteListener((trackEntry, loopCount) => {
                let name = trackEntry.animation ? trackEntry.animation.name : '';
                if (name === animation) {
                    cb && cb();
                }
            });
        }
    }
    /**
     * 分帧执行 Generator 逻辑
     *
     * @param generator 生成器
     * @param duration 持续时间（ms），每次执行 Generator 的操作时，最长可持续执行时长。假设值为8ms，那么表示1帧（总共16ms）下，分出8ms时间给此逻辑执行
     */
    public static executePreFrame(generator: Generator, duration: number, target: cc.Component) {
        return new Promise<void>((resolve, reject) => {
            let gen = generator;
            // 创建执行函数
            let execute = () => {
                // 执行之前，先记录开始时间
                let startTime = new Date().getTime();

                // 然后一直从 Generator 中获取已经拆分好的代码段出来执行
                for (let iter = gen.next(); ; iter = gen.next()) {
                    // 判断是否已经执行完所有 Generator 的小代码段，如果是的话，那么就表示任务完成
                    if (iter == null || iter.done) {
                        resolve();
                        return;
                    }

                    // 每执行完一段小代码段，都检查一下是否已经超过我们分配的本帧，这些小代码端的最大可执行时间
                    if (new Date().getTime() - startTime > duration) {
                        // 如果超过了，那么本帧就不在执行，开定时器，让下一帧再执行
                        target.scheduleOnce(() => {
                            execute();
                        });
                        return;
                    }
                }
            };

            // 运行执行函数
            execute();
        });
    }

    /**
    * @description 贝塞尔抛物线函数
    * @param t 总时长
    * @param startPoint 起始点
    * @param endPoint 终点
    * @param height 抛物高度
    * @param angle 抛物角度
    */
    public static throw(t: number, startPoint: cc.Vec2, endPoint: cc.Vec2, height: number, angle: number): {
        t: number,
        q1: cc.Vec2,
        q2: cc.Vec2,
        endPoint: cc.Vec2
    } {
        let radian: number = angle * Math.PI / 180;
        let qlx: number = startPoint.x + (endPoint.x - startPoint.x) / 4;
        let q1: cc.Vec2 = cc.v2(qlx, height + startPoint.y + Math.cos(radian) * Math.abs(qlx));
        let q2x: number = startPoint.x + (endPoint.x - startPoint.x) / 2;
        let q2: cc.Vec2 = cc.v2(q2x, height + startPoint.y + Math.cos(radian) * Math.abs(q2x));
        return { t, q1, q2, endPoint };
    }
    /**
     * 插入算法
     * @param arr 需要排序的数组
     * @returns 排序后的数组
     */
    public static insertSort(arr: Array<number>): Array<number> {
        let key: number;
        let j: number;
        for (let i: number = 0; i < arr.length; i++) {
            j = i - 1;
            key = arr[i];
            while ((j >= 0) && (arr[j] > key)) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
        return arr;
    }
    /** @description 判断2个subject数据是否相等 */
    public static arraysAreEqual(arr1: Array<SlotSlotSubject>, arr2: Array<SlotSlotSubject>): boolean {
        if (arr1.length != arr2.length) return false;
        const length: number = arr1.length;
        for (let i: number = 0; i < length; i++) {
            if (arr1[i].id != arr2[i].id || arr1[i].index != arr2[i].index || arr1[i].winPrize != arr2[i].winPrize) {
                return false;
            }
        }
        return true;
    }



}