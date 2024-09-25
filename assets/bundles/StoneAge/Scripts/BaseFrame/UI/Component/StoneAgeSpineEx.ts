import { BundleType } from "../../Const/StoneAgeCommonDefine";
import StoneAgeLogManager from "../../Manager/StoneAgeLogManager";
import StoneAgeSlotResManager from "../../Manager/StoneAgeSlotResManager";

const { ccclass, property } = cc._decorator;
export const SPINE_END = "SPINE_END";
@ccclass
export default class StoneAgeSpineEx extends sp.Skeleton {
    @property({ tooltip: "是否循环" })
    private selfloop: boolean = true;
    @property({
        type: cc.Integer, tooltip: "播放次数(0表示无限次)", visible() {
            return !this.selfloop;
        }
    })
    totalCount: number = 0;
    @property({ tooltip: "动画混合时间" })
    mixTime: number = 0;

    private currCount: number = 0;//当前播放次数
    private currAnimName: string = "";//当前播放的动画名字
    private curSkin: string = '';
    private abName: string = '';
    private path: string = '';

    onLoad() {
        // this.loop = false;
        // if (this.selfloop) {
        //     this.totalCount = 0;
        // }
        // if (null != this.spineSkeleton.skeletonData) {
        //     this.mixSpine(this.spineSkeleton, this.mixTime);
        // }
        // !this.curSkin && (this.curSkin = this.defaultSkin);
        // this.playAnimation('', this.totalCount);
    }

    start() {
        // this.setCompleteListener(this.completeCallback.bind(this));
    }


    onDestroy() {
        if (BundleType.RESOURCES != this.abName) {
            StoneAgeSlotResManager.instance.cleanAsset(this.abName, this.path, cc.SpriteAtlas);
        }
    }

    private completeCallback() {
        if (this.totalCount <= 0) {
            return;
        }
        ++this.currCount;
        //防止没有使用本脚本提供的方法播放spine导致的重复播放不生效问题
        this.currAnimName = this.animation;
        this.mixTime <= 0 && this.clearTracks();
        if (this.currCount == this.totalCount) {
            this.currCount = 0;
            this.node.emit(SPINE_END, this.currAnimName);
        }
        else {
            if (null == this.node || !this.node.isValid) {
                return;
            }
            this.setAnimation(0, this.currAnimName, false);
        }
    }

    /**
    * 播放spine动画
    * @param data.aBName 包名 
    * @param data.path 路径
    * @param data.animName 动画名 
    * @param data.repeat 重复次数（0为无限次） 默认是0
    * @param data.callback 加载完成回调
    */
    public async playSpineAnim(data: {
        aBName: string,
        path: string,
        animName?: string,
        repeat?: number,
        callback?: Function
    }) {
        this.abName = data.aBName;
        this.path = data.path;
        let res: sp.SkeletonData = await StoneAgeSlotResManager.instance.loadByBundle(data.aBName, data.path, sp.SkeletonData);
        if (null == this.node || !this.node.isValid) {
            return;
        }
        if (this.skeletonData != res) {
            this.curSkin = "";
        }
        if (this.mixTime > 0) {
            if (res != this.skeletonData) {
                this.skeletonData = res;
                this.mixSpine(this.spineSkeleton, this.mixTime);
            }
        }
        else {
            this.skeletonData = res;
        }
        if (data.callback) {
            data.callback();
        }

        this.playAnimation(data.animName, data.repeat);
    }

    public playAnimation(aniName: string = '', repeat: number = -1): void {
        if (!this.skeletonData) {
            return;
        }
        this.loop = false;
        this.currCount = 0;
        this.currAnimName = aniName || this.animation || this.getState().data.skeletonData.animations[0].name;
        this.totalCount = repeat && repeat > 0 ? repeat : 0;
        this.selfloop = repeat && repeat > 0 ? false : true;
        if (this.curSkin) {
            this.setSkin(this.curSkin);
        }
        if (repeat <= 0) {
            this.setAnimation(0, this.currAnimName, true);
            return;
        }
        this.setAnimation(0, this.currAnimName, false);
    }

    /**
     * 获取sp.Skeleton组件
     */
    public get spineSkeleton(): sp.Skeleton {
        return this;
    }

    /**
    * 动画混合
    * @param _spine spine动画
    * @param _mixTime 混合时间
    */
    private mixSpine(_spine: sp.Skeleton, _mixTime: number) {
        if (0 == _mixTime) {
            return;
        }
        StoneAgeLogManager.instance.log("开始混合");
        var nameArray: Array<string> = []
        var anis = _spine.skeletonData.skeletonJson.animations
        for (const key in anis) {
            nameArray.push(key)
        }
        for (var i = 0; i < nameArray.length; i++) {
            for (var k = 0; k < nameArray.length; k++) {
                _spine.setMix(nameArray[i], nameArray[k], _mixTime)
            }
        }
    }

    /**
     * 必须在skeletonData挂载完毕之后才有效
     * @param targetNodeName 挂点节点名字
     * @param node 需要挂载的节点
     * 函数名字加上self是因为和原本引擎的重名了
     */
    public attachUtilSelf(targetNodeName: string, node: cc.Node) {
        node.removeFromParent(false);
        //@ts-ignore
        let attachUtil = this.spineSkeleton.attachUtil;
        let boneNodes = attachUtil.generateAttachedNodes(targetNodeName);
        let boneNode: cc.Node = boneNodes[0];
        if (null == boneNode) {
            StoneAgeLogManager.instance.err("找不到挂点：", targetNodeName);
            return;
        }
        boneNode.addChild(node);
        node.setPosition(0, 0)
    }

    public getCurAnimationName(): string {
        return this.currAnimName;
    }

    public setSkin(skinName: string): void {
        super.setSkin(skinName);
        this.curSkin = skinName;
    }

    public set active(value: boolean) {
        this.node.active = value;
        !value && this.clearTracks();
        if (value) {
            this.playAnimation(this.currAnimName, this.totalCount);
        }
    }

    public get active(): boolean {
        return this.node.active;
    }


}
