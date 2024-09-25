import { EAnimationType, IAnimationEventArgs, IInsertAnimationArgs } from "../../common/AnimationControllerInterface";
import Queue from "../../tools/Queue";
import Helper from "../common/Helper";




export default class AnimationController {

    private _isFree: boolean = true;
    private _animationQueue: Queue<IAnimationEventArgs>;

    public add(args: IAnimationEventArgs): AnimationController {
        if (!this._animationQueue) {
            this._animationQueue = new Queue<IAnimationEventArgs>();
        }
        this._animationQueue.add(args);
        if (this._animationQueue.size > 0 && this._isFree) {
            const data: IAnimationEventArgs = this._animationQueue.dec();
            this.execute(data);
        }
        return this;
    }

    public async sync(arr: IAnimationEventArgs[]): Promise<void> {
        for (const e of arr) {
            this.execute(e, true);
        }
    }

    private execute(args: IAnimationEventArgs, sync: boolean = false): void {
        const node: cc.Node = args.node;
        const type: EAnimationType = args.type;
        const arr: Array<IInsertAnimationArgs | Function> = args.insert;
        this._isFree = false;
        switch (type) {
            case EAnimationType.SPINE:
                if (!args.node || !args.animationName) {
                    throw new Error("AnimationController execute function error : node or animationName is undefind!");
                }
                const name: string = args.animationName;
                const cb: () => void = args.cb;
                const loop: boolean = args.loop === undefined ? false : args.loop;
                Helper.playSpine(node, name, () => {
                    cb && cb();
                    this._isFree = true;
                    if (!sync) {
                        if (this._animationQueue.size > 0) {
                            this.execute(this._animationQueue.dec());
                        }
                    }
                }, loop);
                if (arr !== undefined || (arr && arr.length != 0)) {
                    const tween: cc.Tween = cc.tween(this);
                    for (const a of arr) {
                        if (typeof a === "function") {
                            const _t: cc.Tween = cc.tween(this).call(() => {
                                a();
                            });
                            tween.then(_t);
                        } else {
                            const time: number = a.time * 1000;
                            setTimeout(() => {
                                a.cb && a.cb();
                            }, time);
                        }
                    }
                    console.error(tween);
                    tween.start();
                }
                break;
            case EAnimationType.TWEEN:
                const tween: cc.Tween = cc.tween(this);
                if (arr !== undefined || (arr && arr.length != 0)) {
                    for (const a of arr) {
                        if (typeof a === "function") {
                            const _t: cc.Tween = cc.tween(this).call(() => {
                                a();
                            });
                            tween.then(_t);
                        } else {
                            const time: number = a.time * 1000
                            setTimeout(() => {
                                a.cb && a.cb();
                            }, time);
                        }
                    }
                }
                tween.call(() => {
                    cb && cb();
                    this._isFree = true;
                    if (!sync) {
                        if (this._animationQueue.size > 0) {
                            this.execute(this._animationQueue.dec());
                        }
                    }
                }).start();
                break;
            case EAnimationType.ANIMATION:
                break;
            default:
                break;
        }

    }

}
