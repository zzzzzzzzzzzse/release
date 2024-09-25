// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import SubjectBase, { EAnimNameType, ESubjectType } from "../base/subject/SubjectBase";
import { ESpecialType } from "../base/WheelBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SubjectManyCell extends SubjectBase {
    public animNameMap: Map<EAnimNameType, string>;
    public id: number;
    public type: ESubjectType = ESubjectType.MANYCELL;
    public img: cc.SpriteFrame;
    public animAsset: sp.SkeletonData;
    public borderAsset: sp.SkeletonData;
    public borderAnimMap: Map<string, string>;
    public width: number;
    public hight: number;
    public index: number;
    public scale: number;
    public isOpenSingleMaskComponent: boolean;
    public isOpenSingleMaskSpriteFrame: boolean;

    public specialType: ESpecialType;

}
