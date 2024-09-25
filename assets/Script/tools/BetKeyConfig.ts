import { OperateJson } from "./OperateJson";

/**
 *  下注值
 */
export default class BetKeyConfig {
    
    /** betkey数组 */
    public betKeyMap: Map<string, BetRoomInfo[]> = new Map();
    /**
     * 读取 bet key 的 json
     */
    public readJson() {
        cc.loader.loadRes("BetKeyConfig", (err, asset) => {
            if (err) {
                return;
            }
            this.formatJson(asset.json);
        });
    }

    /**
     * 格式化json数据
     * @param json 
     */
    private formatJson(json: JSON) {
        for(let i in json) {
            //等级
            let level: number;
            //betkey
            let valueItem: number;
            let valueArr: number[] = [];

            //房间
            let roomArr: BetRoomInfo[] =[]

            let index = -1;
            for(let b in json[i]) {
                if (index === -1) {
                    level = OperateJson.getNumber(json[i], "Level");
                } else {
                    valueItem = OperateJson.getNumber(json[i], b);
                    valueArr.push(valueItem);
                }
                index++;
            }
            // 房间索引
            let roomIndex: number = 0;
            let whileIndex: number = 0;
            let betLevelArr: number[] = [];
            while(whileIndex <= valueArr.length) {
                if (whileIndex != 0 && whileIndex % 3 === 0) {
                    let roomInfo: BetRoomInfo = {
                        roomLevel: roomIndex,
                        betLevel: betLevelArr
                    }
                    roomArr.push(roomInfo);
                    roomIndex++;
                    betLevelArr = [];
                }
                betLevelArr.push(valueArr[whileIndex]);
                whileIndex++;
            }
            this.betKeyMap.set(String(level), roomArr);
        }
    }

    /**
     * 获取bet
     * @param level 用户等级 
     * @param index 索引
     */
    public getBetRoomInfo(level: number): BetRoomInfo[] {
        if (this.betKeyMap && this.betKeyMap.size > 0) {
            return this.betKeyMap.get(String(level));
        }
        return [];
    }
}
/**
 * 房间等级
 */
export interface BetRoomInfo {
    /** 房间等级 */
    roomLevel: number,
    /** 下注等级 */
    betLevel: number[]
}