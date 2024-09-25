import StoneAgeLogManager from "./BaseFrame/Manager/StoneAgeLogManager";
import StoneAgeSlotEventManager from "./BaseFrame/Manager/StoneAgeSlotEventManager";
import StoneAgeUtil from "./BaseFrame/Util/StoneAgeUtil";
import StoneAgeConfigProxy from "./Common/StoneAgeConfigProxy";
import { StoneAgeBetResponse, StoneAgeGameOverNotify } from "./PBClass/StoneAgeGame";
import { StoneAgeGameType, StoneAgeIconType, StoneAgeSceneStatus } from "./StoneAgeDefine";
import { StoneAgeEventDefine2 } from "./StoneAgeEventDefine2";
const { ccclass, property } = cc._decorator;

@ccclass
export default class StoneAgeProxy {
    private linesDataArr: Array<StoneAgeLines> = [];//赔付线数据
    private _times: string;//局号
    private _gameOverData: StoneAgeGameOverNotify;//游戏结束数据
    private _betResponse: StoneAgeBetResponse;//下注返回数据
    private handlePayTableArr: Array<Array<number>> = [[], [], [], [], []];//表盘数据
    private _freeSpinCount: number = 0;//剩余免费转次数
    private _sceneStatus: StoneAgeSceneStatus = StoneAgeSceneStatus.NORMAL;//场景状态
    private _freeBet: number = 0;//免费转投注金额
    private addCircleStartIndex: number = -1;//需要加圈的起始下标（-1为不加圈）
    private _nextGameType: StoneAgeGameType = null;//下一局游戏类型
    private static _instance: StoneAgeProxy

    private _betGold: number = 1000;

    public static get instance() {
        if (StoneAgeProxy._instance == null) {
            StoneAgeProxy._instance = new StoneAgeProxy();
        }
        return StoneAgeProxy._instance;
    }

    private constructor() {
        this._gameOverData = new StoneAgeGameOverNotify();
        this._betResponse = new StoneAgeBetResponse();

    }

    public get gameOverData() {
        // this._gameOverData.times = '101';
        // this._gameOverData.paytable = JSON.stringify({});
        // let randNum = Util.getRandomInt(0, 10);
        // if (randNum < 5) {
        //     this._gameOverData.totalPay = 0;
        // }
        // else {
        //     randNum = Util.getRandomInt(5, 20);
        //     this._gameOverData.totalPay = randNum * 100;
        // }
        // this._gameOverData.free = 0;
        // this._gameOverData.freeGameSettle = false;
        // this._gameOverData.freeGameSettleAmount = 0;
        // this._gameOverData.gameType = 0;
        // this._gameOverData.winType = 1;
        return this._gameOverData;
    }

    public set gameOverData(gameOverData) {
        this._gameOverData = gameOverData;
        if (null == this._gameOverData) {
            return;
        }
        this.setPayLines();
        this.handleTable();
        this.handleAddCircle();
        StoneAgeSlotEventManager.instance.emit(StoneAgeEventDefine2.START_SPIN);
    }

    public randGameOverData(): void {
        this._gameOverData.times = '101';
        this._gameOverData.paytable = JSON.stringify({});
        let randNum = StoneAgeUtil.getRandomInt(0, 10);
        if (randNum < 5) {
            this._gameOverData.totalPay = 0;
        }
        else {
            randNum = StoneAgeUtil.getRandomInt(5, 20);
            this._gameOverData.totalPay = randNum * 100 * this.betGold / 1000;
        }
        this._gameOverData.free = 0;
        this._gameOverData.freeGameSettle = false;
        this._gameOverData.freeGameSettleAmount = 0;
        this._gameOverData.gameType = 0;
        this._gameOverData.winType = 1;
    }

    public get betResponse() {
        return this._betResponse;
    }

    public set betResponse(betResponse) {
        this._betResponse = betResponse;
    }

    public get times() {
        return this._times;
    }

    public set times(times) {
        this._times = times;
    }

    public get freeSpinCount() {
        return this._freeSpinCount;
    }

    public set freeSpinCount(count) {
        this._freeSpinCount = count;
        StoneAgeSlotEventManager.instance.emit(StoneAgeEventDefine2.UPDATE_FREE_COUNT);
    }

    public get sceneStatus() {
        return this._sceneStatus;
    }

    public set sceneStatus(sceneStatus: StoneAgeSceneStatus) {
        this._sceneStatus = sceneStatus;
    }

    public get freeBet() {
        return this._freeBet;
    }

    public set freeBet(bet: number) {
        this._freeBet = bet;
    }

    public get nextGameType() {
        return this._nextGameType;
    }

    public set nextGameType(type: StoneAgeGameType) {
        this._nextGameType = type;
    }

    /**
    * 清理操作
    */
    public clean() {
        this.gameOverData = null;
        this.linesDataArr = [];//赔付线数据
        this.handlePayTableArr = [[], [], [], [], []];
        this.addCircleStartIndex = -1;
        this.sceneStatus = StoneAgeSceneStatus.NORMAL;
    }


    /**
     * 获得处理过后的初始表盘
     * @returns 
     */
    public getHandlePayTableArr() {
        return this.handlePayTableArr;
    }

    /**
     * 转盘数据处理成我们想要的结构
     */
    private handleTable() {
        this.handlePayTableArr = [[], [], [], [], []];
        handle(this.handlePayTableArr, this._gameOverData.paytable);
        function handle(resultArr: Array<Array<any>>, data: string) {
            let payTable: Array<Array<number>> = JSON.parse(data);
            for (let index = 0; index < payTable.length; index++) {
                const row = payTable[index];//行
                for (let i = 0; i < row.length; i++) {
                    const col = row[i];//列
                    resultArr[i].push(col);
                }
            }
        }
        StoneAgeLogManager.instance.info("this.handlePayTableArr:", this.handlePayTableArr);
    }

    /**
     * 通过逻辑位置得到图案Id
     */
    public getTableIdByLogicPos(logicPos: { x: number, y: number }): number {
        return this.handlePayTableArr[logicPos.x][logicPos.y];
    }

    /**
     * 获得开始增加圈数的轴下标
     * @returns 
     */
    public getAddCircleStartIndex() {
        return this.addCircleStartIndex
    }

    /**
     * 初始化开始增加圈数的轴下标
     * @returns 
     */
    public initAddCircleStartIndex() {
        this.addCircleStartIndex = -1;
    }

    /**
     *处理加圈
     */
    private handleAddCircle() {
        this.addCircleStartIndex = -1;
        let payTableObj = { "151101": { "id": 151101, "type": 1, "name": "10", "type_symbol": 1, "pay": [0, 0, 5, 10, 30], "freegame": [-1], "name_spine": "sp_level15_151101", "scatter_circle": 0, "name_idle": "icon_151101", "name_fuzzy": "icon_151101_f" }, "151102": { "id": 151102, "type": 1, "name": "J", "type_symbol": 1, "pay": [0, 0, 5, 15, 50], "freegame": [-1], "name_spine": "sp_level15_151102", "scatter_circle": 0, "name_idle": "icon_151102", "name_fuzzy": "icon_151102_f" }, "151103": { "id": 151103, "type": 1, "name": "Q", "type_symbol": 1, "pay": [0, 0, 5, 15, 70], "freegame": [-1], "name_spine": "sp_level15_151103", "scatter_circle": 0, "name_idle": "icon_151103", "name_fuzzy": "icon_151103_f" }, "151104": { "id": 151104, "type": 1, "name": "K", "type_symbol": 1, "pay": [0, 0, 5, 20, 80], "freegame": [-1], "name_spine": "sp_level15_151104", "scatter_circle": 0, "name_idle": "icon_151104", "name_fuzzy": "icon_151104_f" }, "151105": { "id": 151105, "type": 1, "name": "A", "type_symbol": 1, "pay": [0, 0, 5, 25, 100], "freegame": [-1], "name_spine": "sp_level15_151105", "scatter_circle": 0, "name_idle": "icon_151105", "name_fuzzy": "icon_151105_f" }, "151106": { "id": 151106, "type": 1, "name": "恐龙", "type_symbol": 1, "pay": [0, 0, 10, 75, 250], "freegame": [-1], "name_spine": "sp_level15_151106", "scatter_circle": 0, "name_idle": "icon_151106", "name_fuzzy": "icon_151106_f" }, "151107": { "id": 151107, "type": 1, "name": "猛犸", "type_symbol": 1, "pay": [0, 0, 25, 100, 500], "freegame": [-1], "name_spine": "sp_level15_151107", "scatter_circle": 0, "name_idle": "icon_151107", "name_fuzzy": "icon_151107_f" }, "151108": { "id": 151108, "type": 1, "name": "原始人", "type_symbol": 1, "pay": [0, 0, 25, 150, 750], "freegame": [-1], "name_spine": "sp_level15_151108", "scatter_circle": 0, "name_idle": "icon_151108", "name_fuzzy": "icon_151108_f" }, "151201": { "id": 151201, "type": 1, "name": "wild", "type_symbol": 2, "pay": [0, 0, 25, 200, 1000], "freegame": [-1], "name_spine": "sp_level15_151201", "scatter_circle": 0, "name_idle": "icon_151201", "name_fuzzy": "icon_151201_f" }, "151301": { "id": 151301, "type": 1, "name": "scatter", "type_symbol": 3, "pay": [-1], "freegame": [0, 0, 10, 10, 10, 10, 10, 10, 10, 10, 10], "name_spine": "sp_level15_151301", "scatter_circle": 3, "name_idle": "icon_151301", "name_fuzzy": "icon_151301_f" }, "152101": { "id": 152101, "type": 1, "name": "10", "type_symbol": 1, "pay": [0, 0, 5, 10, 30], "freegame": [-1], "name_spine": "sp_level15_151101", "scatter_circle": 0, "name_idle": "icon_151101", "name_fuzzy": "icon_151101_f" }, "152102": { "id": 152102, "type": 2, "name": "J", "type_symbol": 1, "pay": [0, 0, 5, 15, 50], "freegame": [-1], "name_spine": "sp_level15_151102", "scatter_circle": 0, "name_idle": "icon_151102", "name_fuzzy": "icon_151102_f" }, "152103": { "id": 152103, "type": 2, "name": "Q", "type_symbol": 1, "pay": [0, 0, 5, 15, 70], "freegame": [-1], "name_spine": "sp_level15_151103", "scatter_circle": 0, "name_idle": "icon_151103", "name_fuzzy": "icon_151103_f" }, "152104": { "id": 152104, "type": 2, "name": "K", "type_symbol": 1, "pay": [0, 0, 5, 20, 80], "freegame": [-1], "name_spine": "sp_level15_151104", "scatter_circle": 0, "name_idle": "icon_151104", "name_fuzzy": "icon_151104_f" }, "152105": { "id": 152105, "type": 2, "name": "A", "type_symbol": 1, "pay": [0, 0, 5, 25, 100], "freegame": [-1], "name_spine": "sp_level15_151105", "scatter_circle": 0, "name_idle": "icon_151105", "name_fuzzy": "icon_151105_f" }, "152106": { "id": 152106, "type": 2, "name": "恐龙", "type_symbol": 1, "pay": [0, 0, 10, 75, 250], "freegame": [-1], "name_spine": "sp_level15_151106", "scatter_circle": 0, "name_idle": "icon_151106", "name_fuzzy": "icon_151106_f" }, "152107": { "id": 152107, "type": 2, "name": "猛犸", "type_symbol": 1, "pay": [0, 0, 25, 100, 500], "freegame": [-1], "name_spine": "sp_level15_151107", "scatter_circle": 0, "name_idle": "icon_151107", "name_fuzzy": "icon_151107_f" }, "152108": { "id": 152108, "type": 2, "name": "原始人", "type_symbol": 1, "pay": [0, 0, 25, 150, 750], "freegame": [-1], "name_spine": "sp_level15_151108", "scatter_circle": 0, "name_idle": "icon_151108", "name_fuzzy": "icon_151108_f" }, "152201": { "id": 152201, "type": 2, "name": "wild", "type_symbol": 2, "pay": [0, 0, 25, 200, 1000], "freegame": [-1], "name_spine": "sp_level15_151201", "scatter_circle": 0, "name_idle": "icon_151201", "name_fuzzy": "icon_151201_f" } }//ConfigProxy.instance.getConfigData('Level15_Paytable') as { [key: number]: Level15_Paytable };
        let map: { [key: number]: number } = {};
        let isAdd = false;
        let row = 5;
        for (let index = 0; index < this.handlePayTableArr.length; index++) {
            const arr = this.handlePayTableArr[index];
            for (let i = 0; i < arr.length; i++) {
                const num = arr[i];
                if (0 == num) {
                    continue;
                }
                map[num] = map[num] ? ++map[num] : 1;
                if (payTableObj[num].scatter_circle != 0 && payTableObj[num].freegame[map[num]] > 0) {
                    //需要加圈
                    isAdd = true;
                    this.addCircleStartIndex = index + 1;
                    if (row == this.addCircleStartIndex) {
                        this.addCircleStartIndex = -1;
                    }
                    StoneAgeSlotEventManager.instance.emit(StoneAgeEventDefine2.UPDATE_CIRCLE, { index: index + 1, times: payTableObj[num].scatter_circle })
                    break;
                }
            }
            if (isAdd) {
                break;
            }
        }
    }

    /**
     * 收到服务器数据后立马处理数据
     */
    private setPayLines() {
        //赔付线测试数据
        this.linesDataArr = [];
        for (let index = 0; index < this._gameOverData.lineWin.length; index++) {
            const lines = this._gameOverData.lineWin[index];
            this.linesDataArr.push(StoneAgeConfigProxy.instance.getConfigData('Level15_Lines')[lines.lineid] as StoneAgeLevel15Lines);
        }
    }


    /**
     * 得到赔付线数据
     * @returns 
     */
    public getPayLinesData(): Array<StoneAgeLines> {
        return this.linesDataArr;
    }

    /**
   * 通过赔付线ID获取连线个数
   * @param linesId 
   */
    public getComboByLinesId(linesId: number): number {
        // return 5
        for (let index = 0; index < this.gameOverData.lineWin.length; index++) {
            const linesData = this.gameOverData.lineWin[index];
            if (linesData.lineid == linesId) {
                return linesData.combo;
            }
        }

    }

    /**
     * 通过赔付线ID获取 icon Id
     * @param linesId 
     * @returns 
     */
    public getTargetIdByLinesId(linesId: number): number {
        // return 0
        for (let index = 0; index < this.gameOverData.lineWin.length; index++) {
            const linesData = this.gameOverData.lineWin[index];
            if (linesData.lineid == linesId) {
                return linesData.targetid;
            }
        }
    }

    /**
    * 获取免费转符个数
    */
    public getFreeCount(): number {
        let count = 0;
        if (null == this.gameOverData) {
            return count;
        }
        let payTable: Array<Array<number>> = JSON.parse(this.gameOverData.paytable);
        for (let index = 0; index < payTable.length; index++) {
            const rowArr = payTable[index];
            for (let i = 0; i < rowArr.length; i++) {
                const id = rowArr[i];
                if (id == StoneAgeIconType.FREE) {
                    count++;
                }
            }
        }
        return count;
    }

    public set betGold(value: number) {
        this._betGold = value;
    }

    public get betGold(): number {
        return this._betGold;
    }
}
