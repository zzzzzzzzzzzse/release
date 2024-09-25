import { BundleType } from "./BaseFrame/Const/RichCommonDefine";
import SpriteEx from "./BaseFrame/UI/Component/RichSpriteEx";
import RichComponentBase from "./BaseFrame/UI/ComponentBase/RichComponentBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RichItem extends RichComponentBase {

    @property(SpriteEx)
    iconSpriteEx: SpriteEx = null;
    // @property(cc.Prefab)
    // spinePrefab: cc.Prefab = null;
    @property(cc.Node)
    spineAnimCon: cc.Node = null;

    private tableId: number;
    private _logicPos: { x: number, y: number };//位于整个表盘的逻辑位置
    private spineExNode: cc.Node = null;//符号动画节点
    public set logicPos(pos: { x: number, y: number }) {
        this._logicPos = pos;
    }

    public get logicPos() {
        return this._logicPos;
    }

    onDestroy() {
        super.onDestroy();
    }

    /**
     * 初始化icon数据
     * @param pos .
     */
    public init(pos: { x: number, y: number }) {
        this.iconSpriteEx.node.opacity = 255;
        this.logicPos = pos;
    }

    /**
     * 获取挂载icon的节点
     * @returns 
     */
    public getSpriteNode() {
        return this.iconSpriteEx.node;
    }

    /**
     * 设置图案ID
     * @param id 
     */
    public setTableId(id) {
        this.tableId = id;
    }

    public getTableId(): number {
        return this.tableId;
    }

    /**
     * 播放动画
     */
    public playSpineAnim(animName: string = "win", callback?: Function, jackpotCount?: number) {
        // let config = ConfigProxy.instance.getConfigData('Level15_Paytable')[this.getTableId()] as Level15_Paytable;
        // let spName = config.name_spine;
        // let cloneNode = cc.instantiate(this.spinePrefab);
        // let worldPos = this.node.parent.convertToWorldSpaceAR(this.node.getPosition());
        // let localPos = this.spineAnimCon.convertToNodeSpaceAR(worldPos);
        // cloneNode.parent = this.spineAnimCon;
        // cloneNode.setPosition(localPos);
        // cloneNode.opacity = 255;
        // this.node.opacity = 0;
        // if (null == this.spineExNode) {
        //     this.spineExNode = cloneNode;
        // }
        // else {
        //     this.spineExNode.off(SPINE_END);
        //     if (callback) {
        //         callback();
        //     }
        //     this.spineExNode.destroy();
        //     this.spineExNode = cloneNode;
        // }
        // cloneNode.once(SPINE_END, () => {
        //     if (callback) {
        //         callback();
        //     }
        //     cloneNode.destroy();
        //     this.spineExNode = null;
        //     this.node.opacity = 255;
        // })
        // let tsSpineEx: SpineEx = <SpineEx>cloneNode.getComponent("SpineEx");
        // tsSpineEx.spineSkeleton.setEventListener(function name(track, event) {
        //     LogManager.instance.info("eventOut:", event.data.name);
        //     if (event.data.name == 'stone') {
        //     }
        // }.bind(this));
        // tsSpineEx.playSpineAnim({ aBName: BundleType.STONE_AGE, path: "Spines/Icon/" + spName, animName: animName, repeat: 1 });
    }

    /**
     * 设置图片
     * @param isDim 是否是模糊图片
     */
    public async setImg(isDim: boolean) {
        let imgName = this.getImageNameById(isDim);
        this.iconSpriteEx.setImage(BundleType.STONE_AGE, "Textures/Other/" + imgName);
    }

    /**
     * 通过id获取图片名字 
     */
    public getImageNameById(isDim: boolean): string {
        // let config = ConfigProxy.instance.getConfigData('Level15_Paytable')[this.getTableId()] as Level15_Paytable;
        let config = this.getConfigData(this.getTableId());
        if (isDim) {
            return config.name_fuzzy;
        }
        else {
            return config.name_idle;
        }
    }

    private getConfigData(tableId: number): any {
        const config = { "151101": { "id": 151101, "type": 1, "name": "10", "type_symbol": 1, "pay": [0, 0, 5, 10, 30], "freegame": [-1], "name_spine": "sp_level15_151101", "scatter_circle": 0, "name_idle": "icon_151101", "name_fuzzy": "icon_151101_f" }, "151102": { "id": 151102, "type": 1, "name": "J", "type_symbol": 1, "pay": [0, 0, 5, 15, 50], "freegame": [-1], "name_spine": "sp_level15_151102", "scatter_circle": 0, "name_idle": "icon_151102", "name_fuzzy": "icon_151102_f" }, "151103": { "id": 151103, "type": 1, "name": "Q", "type_symbol": 1, "pay": [0, 0, 5, 15, 70], "freegame": [-1], "name_spine": "sp_level15_151103", "scatter_circle": 0, "name_idle": "icon_151103", "name_fuzzy": "icon_151103_f" }, "151104": { "id": 151104, "type": 1, "name": "K", "type_symbol": 1, "pay": [0, 0, 5, 20, 80], "freegame": [-1], "name_spine": "sp_level15_151104", "scatter_circle": 0, "name_idle": "icon_151104", "name_fuzzy": "icon_151104_f" }, "151105": { "id": 151105, "type": 1, "name": "A", "type_symbol": 1, "pay": [0, 0, 5, 25, 100], "freegame": [-1], "name_spine": "sp_level15_151105", "scatter_circle": 0, "name_idle": "icon_151105", "name_fuzzy": "icon_151105_f" }, "151106": { "id": 151106, "type": 1, "name": "恐龙", "type_symbol": 1, "pay": [0, 0, 10, 75, 250], "freegame": [-1], "name_spine": "sp_level15_151106", "scatter_circle": 0, "name_idle": "icon_151106", "name_fuzzy": "icon_151106_f" }, "151107": { "id": 151107, "type": 1, "name": "猛犸", "type_symbol": 1, "pay": [0, 0, 25, 100, 500], "freegame": [-1], "name_spine": "sp_level15_151107", "scatter_circle": 0, "name_idle": "icon_151107", "name_fuzzy": "icon_151107_f" }, "151108": { "id": 151108, "type": 1, "name": "原始人", "type_symbol": 1, "pay": [0, 0, 25, 150, 750], "freegame": [-1], "name_spine": "sp_level15_151108", "scatter_circle": 0, "name_idle": "icon_151108", "name_fuzzy": "icon_151108_f" }, "151201": { "id": 151201, "type": 1, "name": "wild", "type_symbol": 2, "pay": [0, 0, 25, 200, 1000], "freegame": [-1], "name_spine": "sp_level15_151201", "scatter_circle": 0, "name_idle": "icon_151201", "name_fuzzy": "icon_151201_f" }, "151301": { "id": 151301, "type": 1, "name": "scatter", "type_symbol": 3, "pay": [-1], "freegame": [0, 0, 10, 10, 10, 10, 10, 10, 10, 10, 10], "name_spine": "sp_level15_151301", "scatter_circle": 3, "name_idle": "icon_151301", "name_fuzzy": "icon_151301_f" }, "152101": { "id": 152101, "type": 1, "name": "10", "type_symbol": 1, "pay": [0, 0, 5, 10, 30], "freegame": [-1], "name_spine": "sp_level15_151101", "scatter_circle": 0, "name_idle": "icon_151101", "name_fuzzy": "icon_151101_f" }, "152102": { "id": 152102, "type": 2, "name": "J", "type_symbol": 1, "pay": [0, 0, 5, 15, 50], "freegame": [-1], "name_spine": "sp_level15_151102", "scatter_circle": 0, "name_idle": "icon_151102", "name_fuzzy": "icon_151102_f" }, "152103": { "id": 152103, "type": 2, "name": "Q", "type_symbol": 1, "pay": [0, 0, 5, 15, 70], "freegame": [-1], "name_spine": "sp_level15_151103", "scatter_circle": 0, "name_idle": "icon_151103", "name_fuzzy": "icon_151103_f" }, "152104": { "id": 152104, "type": 2, "name": "K", "type_symbol": 1, "pay": [0, 0, 5, 20, 80], "freegame": [-1], "name_spine": "sp_level15_151104", "scatter_circle": 0, "name_idle": "icon_151104", "name_fuzzy": "icon_151104_f" }, "152105": { "id": 152105, "type": 2, "name": "A", "type_symbol": 1, "pay": [0, 0, 5, 25, 100], "freegame": [-1], "name_spine": "sp_level15_151105", "scatter_circle": 0, "name_idle": "icon_151105", "name_fuzzy": "icon_151105_f" }, "152106": { "id": 152106, "type": 2, "name": "恐龙", "type_symbol": 1, "pay": [0, 0, 10, 75, 250], "freegame": [-1], "name_spine": "sp_level15_151106", "scatter_circle": 0, "name_idle": "icon_151106", "name_fuzzy": "icon_151106_f" }, "152107": { "id": 152107, "type": 2, "name": "猛犸", "type_symbol": 1, "pay": [0, 0, 25, 100, 500], "freegame": [-1], "name_spine": "sp_level15_151107", "scatter_circle": 0, "name_idle": "icon_151107", "name_fuzzy": "icon_151107_f" }, "152108": { "id": 152108, "type": 2, "name": "原始人", "type_symbol": 1, "pay": [0, 0, 25, 150, 750], "freegame": [-1], "name_spine": "sp_level15_151108", "scatter_circle": 0, "name_idle": "icon_151108", "name_fuzzy": "icon_151108_f" }, "152201": { "id": 152201, "type": 2, "name": "wild", "type_symbol": 2, "pay": [0, 0, 25, 200, 1000], "freegame": [-1], "name_spine": "sp_level15_151201", "scatter_circle": 0, "name_idle": "icon_151201", "name_fuzzy": "icon_151201_f" } }
        return config[tableId];

    }

    /**
     * 设置满透明度
     */
    public setOpacityFull() {
        this.node.opacity = 255;
    }
}
