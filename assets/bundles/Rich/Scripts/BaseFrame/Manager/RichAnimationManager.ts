import { RichEventDefine } from "../Const/RichEventDefine";
import RichSlotEventManager from "./RichSlotEventManager";
import RichSlotResManager from "./RichSlotResManager";

/**
 * 动画管理
 */
export default class RichAnimationManager {
    private backPlayMap: { [key: number]: { animation: cc.Animation } } = {};//需要在切换到后台的时候依旧播放的动画数组
    private static _instance: RichAnimationManager;
    private id: number = 0;//每个动画的唯一id
    public static get instance() {
        if (RichAnimationManager._instance == null) {
            RichAnimationManager._instance = new RichAnimationManager();
        }
        return RichAnimationManager._instance;
    }

    public constructor() {
        RichSlotEventManager.instance.on(RichEventDefine.QUIE_GAME_SHOW, (interval: number) => {
            for (const key in this.backPlayMap) {
                const animOne = this.backPlayMap[key];
                if (null == animOne.animation.node || false == animOne.animation.node.activeInHierarchy) {
                    delete this.backPlayMap[key];
                    continue;
                }
                let animState: cc.AnimationState = animOne.animation.getAnimationState(animOne.animation.currentClip.name);
                if (null == animState) {
                    delete this.backPlayMap[key];
                    continue;
                }
                animState.time += interval;
            }
        }, this);
    }

    /**
     * 播放动画
     * @param data.animParent 父节点
     * @param data.animBundle AB包名
     * @param data.animPath 路径
     * @param data.animName 动画clip名字
     * @param data.animPos 相对于父节点的位移
     * @param data.animCallback 加载完成回调
     * @param data.animFinishedCallback 播放完成回调
     * @param data.animRepreatCount 重复次数
     * @param data.animIsBackPlay 是否要后台播放
     * @param data.animDestroy 播放完成后是否销毁
     */
    public async playAnimation(data: {
        animParent: cc.Node,
        animBundle: string,
        animPath: string,
        animName: string,
        animPos?: cc.Vec2,
        animCallback?: Function,
        animFinishedCallback?: Function,
        animRepreatCount?: number,
        animIsBackPlay?: boolean,
        animDestroy?: boolean
    }) {
        let res: cc.Prefab = await RichSlotResManager.instance.loadByBundle(data.animBundle, data.animPath);
        if (null == data.animParent || !data.animParent.isValid) {
            return;
        }
        var newNode = cc.instantiate(res);
        newNode.parent = data.animParent;
        if (data.animPos != null) {
            newNode.setPosition(data.animPos);
        }
        if (data.animCallback != null) {
            data.animCallback();
        }

        let animation = newNode.getComponent(cc.Animation) ? newNode.getComponent(cc.Animation) : newNode.getComponentInChildren(cc.Animation);
        let animState = animation.play(data.animName);
        let id = ++this.id;
        if (data.animIsBackPlay) {
            this.backPlayMap[id] = { animation: animation };
        }
        if (data.animRepreatCount != null) {
            animState.repeatCount = data.animRepreatCount;
        }
        animation.on("finished", () => {
            if (data.animFinishedCallback) {
                data.animFinishedCallback();
            }
            if (data.animDestroy) {
                delete this.backPlayMap[id];
                newNode.destroy();
            }
        });
    }
}
