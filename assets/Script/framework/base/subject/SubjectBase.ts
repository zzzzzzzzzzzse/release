// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { resolve } from "path/posix";
import { SlotSlotSubject } from "../../../models/socket/SlotSlotSubject";
import { StringUtil } from "../../../tools/StringUtil";
import Helper, { catchError } from "../../common/Helper";
import GameMainController from "../../controller/GameMainController";
import { EventMgr } from "../../mgr/EventManager";
import { ResMgr } from "../../mgr/ResManager";
import { EWheelLayer, IBorderArgs } from "../WheelBase";

const { ccclass, property } = cc._decorator;

/** 物件类型 */
export enum ESubjectType {
    /** @description 普通物件 */
    NORMAL,
    /** @description 特殊物件 */
    SPECIAL,
    MANYCELL,
}

export enum EAnimNameType {
    WIN,
    APPEAR,
    CUSTOM,
}

/** @description 物件基类 */
@ccclass
export abstract default class SubjectBase extends cc.Component {
    /** @description 物件id */
    public abstract id: number;
    /** @description 物件类型 */
    public abstract type: ESubjectType;
    /** @description 图片资源路径 */
    public abstract img: cc.SpriteFrame;
    /** @description 动画资源文件 */
    public abstract animAsset: sp.SkeletonData;
    /** @description 动画名合集 */
    public abstract animNameMap: Map<EAnimNameType, string>;
    /** @description 边框动画资源文件 */
    public abstract borderAsset: sp.SkeletonData;
    /** @description 边框动画名字合集 */
    public abstract borderAnimMap: Map<string, string>;
    /** @description 物件宽度 */
    public abstract width: number;
    /** @description 物件高度 */
    public abstract hight: number;
    /** @description 所在层级中的索引 */
    protected abstract index: number;

    public singleFunctionIndex: number = -1;

    public isFilderSingle: boolean = false;

    public nextY: number = -1;
    public nextYArr: Array<number> = new Array<number>(3).fill(-1);
    public get _index(): number {
        return this.index;
    }
    public set _index(value: number) {
        this.index = value;
    }
    /** @description z轴 */
    public abstract zindex: number;
    /** @description 缩放倍数 */
    public abstract scale: number;
    /** @description 是否开启子物件mask组件 */
    public abstract isOpenSingleMaskComponent: boolean;
    /** @description 是否开启子物件半透明遮罩 */
    public abstract isOpenSingleMaskSpriteFrame: boolean;
    /** @description 基于轮盘的初始x坐标 */
    public initX: number;
    /** @description 基于轮盘的初始y坐标 */
    public initY: number;
    /** @description 基于轮盘的x坐标 */
    public x: number;
    /** @description 基于轮盘的y坐标 */
    public y: number;
    /** @description 初始坐标 */
    public initPosition: cc.Vec3;
    /** @description 子节点下基于单轮盘的y坐标 */
    public arrY: Array<number> = new Array<number>(3);
    /** @description 子节点下基于单轮盘的初始y坐标 */
    public arrInitY: Array<number> = new Array<number>(3);
    /** @description 记录子节点下的图片节点初始坐标 */
    public arrInitPosition: Array<cc.Vec3> = new Array<cc.Vec3>(3);
    /** @description 物件中奖结果 */
    public data: SlotSlotSubject;
    /** @description y偏移量 */
    public offsetY: number = 0;

    public showNode: cc.Node;
    public size: cc.Size;
    /** @description 所在列是否停止滚动 */
    public colIsStop: boolean = false;

    /** @description 初始化 */
    public async init() {
        if (!GameMainController._config || (GameMainController._config && !GameMainController._config.isShowLabel)) return;
        if (this.node.getChildByName("Single").children[0].childrenCount > 0) {
            const labelNode: cc.Node = this.node.getChildByName("Single").children[0].children[0];
            const label: cc.Label = labelNode.getComponent(cc.Label);
            const font: cc.Font = await ResMgr.load<cc.Font>(GameMainController._config._bundle, GameMainController._config.subjectLabelFont, cc.Font);
            labelNode.active = true;
            label.font = font;
        }
    }

    public showLabel() {
        this.node.getChildByName("Single").children[0].active = true;
    }
    public hideLabel() {
        this.node.getChildByName("Single").children[0].active = false;
    }

    protected onLoad(): void {
        const single: cc.Node = this.node.getChildByName("Single");
        for (let i: number = 0; i < single.childrenCount; i++) {
            this.arrInitY[i] = this.arrY[i] = i;
            this.arrInitPosition[i] = single.children[i].position;
            this.size = this.node.getContentSize();
        }
    }

    /** @description 重置物件 */
    public reset(cb?: () => void): void {
        const single: cc.Node = this.node.getChildByName("Single");
        single.active = true;
        for (let i: number = 0; i < single.childrenCount; i++) {
            this.arrInitY[i] = this.arrY[i] = i;
            this.nextYArr[i] = -1;
            this.arrInitPosition[i] = single.children[i].position;
            this.size = this.node.getContentSize();
        }
        cb && cb();
    }

    /**
     *  @description 播放中奖动画 
     *  @param position 当前需要播放动画坐标
     *  @param parent 添加的父节点
    */
    public async showAnimation(position: cc.Vec3, parent: cc.Node, type: EAnimNameType, isDestroy?: boolean, cb?: (aninode: cc.Node) => void, loop?: boolean, isScale?: boolean): Promise<cc.Node> {
        return new Promise(async (resolve) => {
            this.animNameMap = GameMainController._config.animNameMap.get(GameMainController._config._subjectData.get(this.id));
            const animName = this.animNameMap.get(type);
            console.warn("#######################", this, GameMainController._config._subjectData.get(this.id), GameMainController._config.animNameMap);
            if (!animName) return;
            const url: string = GameMainController._config.animAssetMap.get(GameMainController._config._subjectData.get(this.id));
            const pre: cc.Prefab = await ResMgr.load<cc.Prefab>(GameMainController._config._bundle, url, cc.Prefab);
            const node: cc.Node = cc.instantiate(pre);
            node.parent = parent;
            node.position = position;
            if (isScale) {
                node.scale = this.node.scale;
            }
            if (node.childrenCount > 0 && GameMainController._config.isShowLabel) {
                node.children.forEach(async v => {
                    v.active = true;
                    const label: cc.Label = v.getComponent(cc.Label);
                    const font: cc.Font = await ResMgr.load<cc.Font>(GameMainController._config._bundle, GameMainController._config.subjectLabelFont, cc.Font)
                    if (font) {
                        label.font = font;
                    }
                    label.string = StringUtil.showMoneyType2(GameMainController._config._subjectBet.get(this.id) * GameMainController.betNum);
                });
            }
            this.node.getChildByName("Single").active = false;
            this.showNode = node;
            Helper.playSpine(node, animName, () => {
                if (isDestroy) {
                    node.destroy();
                    node.removeFromParent();
                    this.node.getChildByName("Single").active = true;
                }
                cb && cb(node);
            }, loop);
            resolve(node);
        })
    }

    public async showBorderAnimation(args: IBorderArgs, position: cc.Vec3, parent: cc.Node, cb?: (node?: cc.Node) => void, loop?: boolean, isScale?: boolean): Promise<void> {
        const animName: string = GameMainController._config.borderAnimNameList.get(args.type).get(0);
        const url: string = GameMainController._config.borderPrefabMap.get(args.type);
        const pre: cc.Prefab = await ResMgr.load<cc.Prefab>(GameMainController._config._bundle, url, cc.Prefab);
        const node: cc.Node = cc.instantiate(pre);
        if (parent.position.y != parent.parent.children[EWheelLayer.LAYER_CORE].position.y) {
            parent.position = cc.v3(parent.x, parent.parent.children[EWheelLayer.LAYER_CORE].y);
        }
        node.parent = parent;
        node.position = position;
        if (isScale) {
            node.scale = this.node.scale;
        }
        Helper.playSpine(node, animName, () => {
            if (!loop) {
                node.destroy();
                node.removeFromParent();
                cb && cb(node);
            }
        }, loop);
    }

    /** @description 替换当前物件属性 */
    @catchError('Failed to replace object')
    public async replace(id: number): Promise<void> {
        return new Promise(async resolve => {
            this.id = id;
            this.animNameMap = GameMainController._config.animNameMap.get(GameMainController._config._subjectData.get(this.id));
            const pre: cc.Prefab = GameMainController.prefabMap.get(GameMainController._config._subjectData.get(this.id));
            const node: cc.Node = cc.instantiate(pre);
            const sprite: cc.Node = cc.instantiate(node.getChildByName("Single")).children[0];
            const cellSprite: cc.Node = this.node.getChildByName("Single").children[0];
            const com: SubjectBase = node.getComponent(SubjectBase);
            this.node.getChildByName("Single").active = true;
            if (cellSprite.childrenCount > 0) {
                cellSprite.removeAllChildren();
            }
            this.node.name = node.name;
            this.type = com.type;
            this.zindex = com.zindex;
            cellSprite.getComponent(cc.Sprite).spriteFrame = sprite.getComponent(cc.Sprite).spriteFrame;
            cellSprite.scale = sprite.scale;
            cellSprite.setContentSize(sprite.getContentSize());
            if (node.getChildByName("Single").children[0].childrenCount > 0) {
                cellSprite.addChild(cc.instantiate(node.getChildByName("Single").children[0].children[0]));
            }
            if (GameMainController._config._subjectBet && GameMainController._config.isShowLabel && cellSprite.childrenCount > 0) {
                const labelNode: cc.Node = this.node.getChildByName("Single").children[0].children[0];
                const label: cc.Label = labelNode.getComponent(cc.Label);
                labelNode.active = true;
                label.string = StringUtil.showMoneyType2(GameMainController.betNum * GameMainController._config._subjectBet.get(id));
            }
            if (cellSprite.height >= this.node.height * 2) {
                node.zIndex = 1000;
            }
            resolve();
        });
    }



    /** @description 销毁物件前最后一次事件 */
    protected onDestroy(): void {
        /** @description 停止所有action */
        this.node.stopAllActions();
        /** @description 停止对象所有缓动 */
        cc.tween(this.node).stop();
        /** @description 停止所有调度器 */
        this.unscheduleAllCallbacks();
        /** @description 注销当前所有已注册自定义事件 */
        EventMgr.targetOff(this);
    }

}
