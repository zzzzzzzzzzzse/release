/** @description slot基础物件物件*/
export class SlotSubject {
    /** @description 物件宽 */
    public width: number = 0;
    /** @description 物件高 */
    public height: number = 0;
    /** @description 物件id */
    public id: number = 0;
    /** @description 显示内容 */
    public value: string = "";
    /** @description 资源路径 */
    public resPath: string = "";
    /** @description icon图片 */
    public iconAsset: cc.SpriteFrame = null;
    /** @description 背景图片 */
    public bgAsset: cc.SpriteFrame = null;
    /** @description 动画资源 */
    public animAsset: sp.SkeletonData = null;
    /** @description 动画缩放倍数 */
    public animSize: number = 1;
    /** @description 动画名 */
    public animName: Array<string> = new Array<string>();
    /** @description 边框动画名 */
    public borderAnimName: string = "";
}

/** @description slot边框效果*/
export class SlotBorderSubject {
    /** @description 物件宽 */
    public width: number = 0;
    /** @description 物件高 */
    public height: number = 0;
    /** @description 物件id */
    public id: number = 0;
    /** @description 资源路径 */
    public resPath: string = "";
    /** @description icon图片 */
    public iconAsset: cc.SpriteFrame = null;
    /** @description 动画资源 */
    public animAsset: sp.SkeletonData = null;
    /** @description 动画名 */
    public animName: Array<string> = new Array<string>();
    /** @description 赢的时候动画组件 */
    public winAnimAsset: sp.SkeletonData;
    /** @description 赢的时候动画名 */
    public winAnimName: string;
    /** @description 触发bonusgame时动画组件 */
    public toBonusAnimAsset: sp.SkeletonData;
    /** @description 触发bonusgame时动画名 */
    public toBonusAnimName: string;
    /** @description drummod动画组件 */
    public drummodAnimAsset: sp.SkeletonData;
    /** @description drummod动画名 */
    public drummodAnimName: string;
}