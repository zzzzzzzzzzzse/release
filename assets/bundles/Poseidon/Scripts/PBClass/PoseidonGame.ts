export enum PoseidonCmdType{
    S_S_CMD_NONE = 0,//占位使用，emun要从0开始
	S_C_STONEAGE_GAME_START_NOTIFY = 11500001,//通知游戏开始
	C_S_STONEAGE_BET_REQUEST = 11500002,//游戏下注
	S_C_STONEAGE_BET_RESPONSE = 11500003,//游戏下注返回
	S_C_STONEAGE_GAME_OVER_NOTIFY = 11500004,//游戏结束通知
	S_C_STONEAGE_SYNC_NOTIFY = 11500005,//游戏同步提醒
}


//游戏类型 
export enum PoseidonGameType{
    NORMAL = 0,//普通
    FREE = 1, //免费转
}

//游戏赢类型 0:notwin 1:win 2:bigwin 3:megawin 4:superwin 5:hugewin
export enum PoseidonWinType{
    NOTWIN = 0,
    WIN = 1,
    BIGWIN = 2,
    MEGAWIN = 3,
    SUPERWIN = 4,
    HUGEWIN = 5,
}

//	S_C_STONEAGE_GAME_START_NOTIFY = 11500001;//通知游戏开始
export class PoseidonGameStartNotify{
	public times: string;
	public startTime: any;
	public gameType: number;
	public freeTimes: number;
	public freeBet: number;
}

//	C_S_STONEAGE_BET_REQUEST = 11500002;//游戏下注
export class PoseidonBetRequest{
	public betGold: number;
	public times: string;
	public testTable: string;
}

//	S_C_STONEAGE_BET_RESPONSE = 11500003;//游戏下注返回
export class PoseidonBetResponse{
	public errorCode: number;
	public userid: number;
	public betGold: number;
	public remainGold: number;
	public times: string;
}


//	S_C_STONEAGE_GAME_OVER_NOTIFY = 11500004;//游戏结束通知
export class PoseidonGameOverNotify{
	public times: string;
	public paytable: string;
	public totalPay: number;
	public free: number;
	public winType: number;
	public lineWin: Array<PoseidonLineWin>;
	public gameType: number;
	public freeGameSettle: boolean;
	public freeGameSettleAmount: number;
}


export class PoseidonLineWin{
	public lineid: number;
	public linePay: number;
	public targetid: number;
	public combo: number;
}

//S_C_STONEAGE_SYNC_NOTIFY = 11500005;//游戏同步提醒 在加入房间和断线重连的时候推送
export class PoseidonSyncNotify{
	public times: string;
	public roomStatus: number;
	public startTime: any;
	public gameType: number;
	public freeTimes: number;
	public freeBet: number;
}









