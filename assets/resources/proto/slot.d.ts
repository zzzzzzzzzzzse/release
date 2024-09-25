import * as $protobuf from "protobufjs";
/** SubGameType enum. */
export enum SubGameType {
    None = 0,
    Base = 1,
    Base_Link = 2,
    Free = 3,
    Bonus = 4,
    Free_Link = 5,
    RandomWilds = 6,
    RespinUntilWin = 7,
    LockWildAward = 8,
    RandomOdds = 9,
    Bonus_choose = 10,
    Collect_Free = 11,
    Bingo = 12,
    Mega_Bouns = 13,
    Super_Bouns = 14,
    Super_Free = 15,
    Free_choose = 16,
    Mega_Free = 17,
    Rich_Green_Bonus = 20,
    Rich_Purple_Bonus = 21,
    Rich_Red_Bonus = 22,
    Rich_Green_Purple_Bonus = 23,
    Rich_Green_Red_Bonus = 24,
    Rich_Purple_Red_Bonus = 25,
    Rich_Green_Purple_Red_Bonus = 26,
    Wheel_Game = 27,
    Collect_Subgame = 28
}

/** GameDataKey enum. */
export enum GameDataKey {
    GAMEDATATYPE_NONE = 0,
    GREEN_BOX = 1,
    PURPLE_BOX = 2,
    RED_BOX = 3
}

/** SubGameStatus enum. */
export enum SubGameStatus {
    Normal = 0,
    Reward = 1,
    Choose = 2,
    RewardBingo = 3
}

/** PoolType enum. */
export enum PoolType {
    POOL_NONE = 0,
    GRAND = 1,
    MAJOR = 2,
    MINOR = 3,
    MINI = 4,
    MEGA = 5,
    MAXI = 6
}

/** RewardType enum. */
export enum RewardType {
    Reward_NONE = 0,
    BONUS_COUNT = 6,
    Pool = 7,
    Money = 9,
    SubGame = 10,
    JackpotUp = 15,
    Collect1 = 16,
    Collect2 = 17,
    Collect3 = 18,
    Multiple = 19,
    Addition = 20,
    AddReel = 21,
    AddRow = 22,
    AddProbability = 23
}

/** Lange enum. */
export enum Lange {
    En = 0,
    Hindi = 1
}

/** Represents a Slot_ReqLogin. */
export class Slot_ReqLogin implements ISlot_ReqLogin {

    /**
     * Constructs a new Slot_ReqLogin.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISlot_ReqLogin);

    /** Slot_ReqLogin pid. */
    public pid: string;

    /** Slot_ReqLogin token. */
    public token: string;

    /** Slot_ReqLogin gameId. */
    public gameId: number;

    /** Slot_ReqLogin lang. */
    public lang: number;

    /** Slot_ReqLogin version. */
    public version: string;

    /** Slot_ReqLogin maskingKey. */
    public maskingKey: number;

    /** Slot_ReqLogin channel. */
    public channel: number;

    /**
     * Creates a new Slot_ReqLogin instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Slot_ReqLogin instance
     */
    public static create(properties?: ISlot_ReqLogin): Slot_ReqLogin;

    /**
     * Encodes the specified Slot_ReqLogin message. Does not implicitly {@link Slot_ReqLogin.verify|verify} messages.
     * @param message Slot_ReqLogin message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISlot_ReqLogin, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Slot_ReqLogin message, length delimited. Does not implicitly {@link Slot_ReqLogin.verify|verify} messages.
     * @param message Slot_ReqLogin message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISlot_ReqLogin, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Slot_ReqLogin message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Slot_ReqLogin
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): Slot_ReqLogin;

    /**
     * Decodes a Slot_ReqLogin message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Slot_ReqLogin
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): Slot_ReqLogin;

    /**
     * Verifies a Slot_ReqLogin message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string | null);

    /**
     * Creates a Slot_ReqLogin message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Slot_ReqLogin
     */
    public static fromObject(object: { [k: string]: any }): Slot_ReqLogin;

    /**
     * Creates a plain object from a Slot_ReqLogin message. Also converts values to other types if specified.
     * @param message Slot_ReqLogin
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Slot_ReqLogin, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Slot_ReqLogin to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a Slot_PushLogin. */
export class Slot_PushLogin implements ISlot_PushLogin {

    /**
     * Constructs a new Slot_PushLogin.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISlot_PushLogin);

    /** Slot_PushLogin gameId. */
    public gameId: number;

    /** Slot_PushLogin subGameInfos. */
    public subGameInfos: ISlot_SubGameInfo[];

    /** Slot_PushLogin playerCollectInfo. */
    public playerCollectInfo?: (ISlot_PlayerCollectInfo | null);

    /** Slot_PushLogin betkeyMap. */
    public betkeyMap: ISlot_BetkeyMap[];

    /** Slot_PushLogin globalMap. */
    public globalMap: ISlot_GlobalMap[];

    /** Slot_PushLogin lastBetInfo. */
    public lastBetInfo?: (ISlot_PushBetResult | null);

    /**
     * Creates a new Slot_PushLogin instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Slot_PushLogin instance
     */
    public static create(properties?: ISlot_PushLogin): Slot_PushLogin;

    /**
     * Encodes the specified Slot_PushLogin message. Does not implicitly {@link Slot_PushLogin.verify|verify} messages.
     * @param message Slot_PushLogin message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISlot_PushLogin, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Slot_PushLogin message, length delimited. Does not implicitly {@link Slot_PushLogin.verify|verify} messages.
     * @param message Slot_PushLogin message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISlot_PushLogin, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Slot_PushLogin message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Slot_PushLogin
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): Slot_PushLogin;

    /**
     * Decodes a Slot_PushLogin message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Slot_PushLogin
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): Slot_PushLogin;

    /**
     * Verifies a Slot_PushLogin message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string | null);

    /**
     * Creates a Slot_PushLogin message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Slot_PushLogin
     */
    public static fromObject(object: { [k: string]: any }): Slot_PushLogin;

    /**
     * Creates a plain object from a Slot_PushLogin message. Also converts values to other types if specified.
     * @param message Slot_PushLogin
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Slot_PushLogin, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Slot_PushLogin to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a Slot_GlobalMap. */
export class Slot_GlobalMap implements ISlot_GlobalMap {

    /**
     * Constructs a new Slot_GlobalMap.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISlot_GlobalMap);

    /** Slot_GlobalMap dataKey. */
    public dataKey: number;

    /** Slot_GlobalMap dataValue. */
    public dataValue: (number | Long);

    /**
     * Creates a new Slot_GlobalMap instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Slot_GlobalMap instance
     */
    public static create(properties?: ISlot_GlobalMap): Slot_GlobalMap;

    /**
     * Encodes the specified Slot_GlobalMap message. Does not implicitly {@link Slot_GlobalMap.verify|verify} messages.
     * @param message Slot_GlobalMap message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISlot_GlobalMap, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Slot_GlobalMap message, length delimited. Does not implicitly {@link Slot_GlobalMap.verify|verify} messages.
     * @param message Slot_GlobalMap message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISlot_GlobalMap, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Slot_GlobalMap message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Slot_GlobalMap
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): Slot_GlobalMap;

    /**
     * Decodes a Slot_GlobalMap message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Slot_GlobalMap
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): Slot_GlobalMap;

    /**
     * Verifies a Slot_GlobalMap message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string | null);

    /**
     * Creates a Slot_GlobalMap message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Slot_GlobalMap
     */
    public static fromObject(object: { [k: string]: any }): Slot_GlobalMap;

    /**
     * Creates a plain object from a Slot_GlobalMap message. Also converts values to other types if specified.
     * @param message Slot_GlobalMap
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Slot_GlobalMap, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Slot_GlobalMap to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a Slot_BetkeyMap. */
export class Slot_BetkeyMap implements ISlot_BetkeyMap {

    /**
     * Constructs a new Slot_BetkeyMap.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISlot_BetkeyMap);

    /** Slot_BetkeyMap betKey. */
    public betKey: number;

    /** Slot_BetkeyMap slotRewards. */
    public slotRewards: ISlot_SlotRewardSubject[];

    /**
     * Creates a new Slot_BetkeyMap instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Slot_BetkeyMap instance
     */
    public static create(properties?: ISlot_BetkeyMap): Slot_BetkeyMap;

    /**
     * Encodes the specified Slot_BetkeyMap message. Does not implicitly {@link Slot_BetkeyMap.verify|verify} messages.
     * @param message Slot_BetkeyMap message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISlot_BetkeyMap, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Slot_BetkeyMap message, length delimited. Does not implicitly {@link Slot_BetkeyMap.verify|verify} messages.
     * @param message Slot_BetkeyMap message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISlot_BetkeyMap, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Slot_BetkeyMap message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Slot_BetkeyMap
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): Slot_BetkeyMap;

    /**
     * Decodes a Slot_BetkeyMap message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Slot_BetkeyMap
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): Slot_BetkeyMap;

    /**
     * Verifies a Slot_BetkeyMap message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string | null);

    /**
     * Creates a Slot_BetkeyMap message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Slot_BetkeyMap
     */
    public static fromObject(object: { [k: string]: any }): Slot_BetkeyMap;

    /**
     * Creates a plain object from a Slot_BetkeyMap message. Also converts values to other types if specified.
     * @param message Slot_BetkeyMap
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Slot_BetkeyMap, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Slot_BetkeyMap to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a Slot_BingoRewards. */
export class Slot_BingoRewards implements ISlot_BingoRewards {

    /**
     * Constructs a new Slot_BingoRewards.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISlot_BingoRewards);

    /** Slot_BingoRewards slotRewards. */
    public slotRewards: ISlot_SlotRewardSubject[];

    /**
     * Creates a new Slot_BingoRewards instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Slot_BingoRewards instance
     */
    public static create(properties?: ISlot_BingoRewards): Slot_BingoRewards;

    /**
     * Encodes the specified Slot_BingoRewards message. Does not implicitly {@link Slot_BingoRewards.verify|verify} messages.
     * @param message Slot_BingoRewards message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISlot_BingoRewards, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Slot_BingoRewards message, length delimited. Does not implicitly {@link Slot_BingoRewards.verify|verify} messages.
     * @param message Slot_BingoRewards message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISlot_BingoRewards, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Slot_BingoRewards message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Slot_BingoRewards
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): Slot_BingoRewards;

    /**
     * Decodes a Slot_BingoRewards message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Slot_BingoRewards
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): Slot_BingoRewards;

    /**
     * Verifies a Slot_BingoRewards message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string | null);

    /**
     * Creates a Slot_BingoRewards message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Slot_BingoRewards
     */
    public static fromObject(object: { [k: string]: any }): Slot_BingoRewards;

    /**
     * Creates a plain object from a Slot_BingoRewards message. Also converts values to other types if specified.
     * @param message Slot_BingoRewards
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Slot_BingoRewards, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Slot_BingoRewards to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a Slot_ReqBet. */
export class Slot_ReqBet implements ISlot_ReqBet {

    /**
     * Constructs a new Slot_ReqBet.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISlot_ReqBet);

    /** Slot_ReqBet betKey. */
    public betKey: number;

    /** Slot_ReqBet subGameType. */
    public subGameType: number;

    /**
     * Creates a new Slot_ReqBet instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Slot_ReqBet instance
     */
    public static create(properties?: ISlot_ReqBet): Slot_ReqBet;

    /**
     * Encodes the specified Slot_ReqBet message. Does not implicitly {@link Slot_ReqBet.verify|verify} messages.
     * @param message Slot_ReqBet message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISlot_ReqBet, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Slot_ReqBet message, length delimited. Does not implicitly {@link Slot_ReqBet.verify|verify} messages.
     * @param message Slot_ReqBet message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISlot_ReqBet, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Slot_ReqBet message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Slot_ReqBet
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): Slot_ReqBet;

    /**
     * Decodes a Slot_ReqBet message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Slot_ReqBet
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): Slot_ReqBet;

    /**
     * Verifies a Slot_ReqBet message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string | null);

    /**
     * Creates a Slot_ReqBet message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Slot_ReqBet
     */
    public static fromObject(object: { [k: string]: any }): Slot_ReqBet;

    /**
     * Creates a plain object from a Slot_ReqBet message. Also converts values to other types if specified.
     * @param message Slot_ReqBet
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Slot_ReqBet, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Slot_ReqBet to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a Slot_SlotSubject. */
export class Slot_SlotSubject implements ISlot_SlotSubject {

    /**
     * Constructs a new Slot_SlotSubject.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISlot_SlotSubject);

    /** Slot_SlotSubject id. */
    public id: number;

    /** Slot_SlotSubject lines. */
    public lines: number[];

    /** Slot_SlotSubject winPrize. */
    public winPrize: boolean;

    /** Slot_SlotSubject index. */
    public index: number;

    /**
     * Creates a new Slot_SlotSubject instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Slot_SlotSubject instance
     */
    public static create(properties?: ISlot_SlotSubject): Slot_SlotSubject;

    /**
     * Encodes the specified Slot_SlotSubject message. Does not implicitly {@link Slot_SlotSubject.verify|verify} messages.
     * @param message Slot_SlotSubject message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISlot_SlotSubject, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Slot_SlotSubject message, length delimited. Does not implicitly {@link Slot_SlotSubject.verify|verify} messages.
     * @param message Slot_SlotSubject message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISlot_SlotSubject, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Slot_SlotSubject message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Slot_SlotSubject
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): Slot_SlotSubject;

    /**
     * Decodes a Slot_SlotSubject message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Slot_SlotSubject
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): Slot_SlotSubject;

    /**
     * Verifies a Slot_SlotSubject message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string | null);

    /**
     * Creates a Slot_SlotSubject message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Slot_SlotSubject
     */
    public static fromObject(object: { [k: string]: any }): Slot_SlotSubject;

    /**
     * Creates a plain object from a Slot_SlotSubject message. Also converts values to other types if specified.
     * @param message Slot_SlotSubject
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Slot_SlotSubject, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Slot_SlotSubject to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a Slot_PushBetResult. */
export class Slot_PushBetResult implements ISlot_PushBetResult {

    /**
     * Constructs a new Slot_PushBetResult.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISlot_PushBetResult);

    /** Slot_PushBetResult betResult. */
    public betResult?: (ISlot_SubGameBetResult | null);

    /** Slot_PushBetResult nextGameInfo. */
    public nextGameInfo?: (ISlot_SubGameInfo | null);

    /** Slot_PushBetResult playerCollectInfo. */
    public playerCollectInfo?: (ISlot_PlayerCollectInfo | null);

    /** Slot_PushBetResult changeDatas. */
    public changeDatas: ISlot_GlobalMap[];

    /** Slot_PushBetResult bingoRewardsList. */
    public bingoRewardsList: ISlot_BingoRewards[];

    /** Slot_PushBetResult exp. */
    public exp: (number | Long);

    /** Slot_PushBetResult playerLevel. */
    public playerLevel: number;

    /** Slot_PushBetResult balance. */
    public balance: (number | Long);

    /**
     * Creates a new Slot_PushBetResult instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Slot_PushBetResult instance
     */
    public static create(properties?: ISlot_PushBetResult): Slot_PushBetResult;

    /**
     * Encodes the specified Slot_PushBetResult message. Does not implicitly {@link Slot_PushBetResult.verify|verify} messages.
     * @param message Slot_PushBetResult message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISlot_PushBetResult, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Slot_PushBetResult message, length delimited. Does not implicitly {@link Slot_PushBetResult.verify|verify} messages.
     * @param message Slot_PushBetResult message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISlot_PushBetResult, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Slot_PushBetResult message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Slot_PushBetResult
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): Slot_PushBetResult;

    /**
     * Decodes a Slot_PushBetResult message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Slot_PushBetResult
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): Slot_PushBetResult;

    /**
     * Verifies a Slot_PushBetResult message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string | null);

    /**
     * Creates a Slot_PushBetResult message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Slot_PushBetResult
     */
    public static fromObject(object: { [k: string]: any }): Slot_PushBetResult;

    /**
     * Creates a plain object from a Slot_PushBetResult message. Also converts values to other types if specified.
     * @param message Slot_PushBetResult
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Slot_PushBetResult, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Slot_PushBetResult to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a Slot_SubGameInfo. */
export class Slot_SubGameInfo implements ISlot_SubGameInfo {

    /**
     * Constructs a new Slot_SubGameInfo.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISlot_SubGameInfo);

    /** Slot_SubGameInfo subGameType. */
    public subGameType: number;

    /** Slot_SubGameInfo rounds. */
    public rounds: number;

    /** Slot_SubGameInfo leftRounds. */
    public leftRounds: number;

    /** Slot_SubGameInfo betKey. */
    public betKey: number;

    /** Slot_SubGameInfo betAmount. */
    public betAmount: (number | Long);

    /** Slot_SubGameInfo linkIconPos. */
    public linkIconPos: number[];

    /** Slot_SubGameInfo slotSubjects. */
    public slotSubjects: ISlot_SlotSubject[];

    /** Slot_SubGameInfo rewardSubjects. */
    public rewardSubjects: ISlot_SlotRewardSubject[];

    /** Slot_SubGameInfo beforeSettlementAmount. */
    public beforeSettlementAmount: (number | Long);

    /** Slot_SubGameInfo subGameStatus. */
    public subGameStatus: number;

    /** Slot_SubGameInfo appendValue. */
    public appendValue: (number | Long);

    /** Slot_SubGameInfo appendLongList. */
    public appendLongList: (number | Long)[];

    /**
     * Creates a new Slot_SubGameInfo instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Slot_SubGameInfo instance
     */
    public static create(properties?: ISlot_SubGameInfo): Slot_SubGameInfo;

    /**
     * Encodes the specified Slot_SubGameInfo message. Does not implicitly {@link Slot_SubGameInfo.verify|verify} messages.
     * @param message Slot_SubGameInfo message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISlot_SubGameInfo, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Slot_SubGameInfo message, length delimited. Does not implicitly {@link Slot_SubGameInfo.verify|verify} messages.
     * @param message Slot_SubGameInfo message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISlot_SubGameInfo, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Slot_SubGameInfo message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Slot_SubGameInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): Slot_SubGameInfo;

    /**
     * Decodes a Slot_SubGameInfo message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Slot_SubGameInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): Slot_SubGameInfo;

    /**
     * Verifies a Slot_SubGameInfo message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string | null);

    /**
     * Creates a Slot_SubGameInfo message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Slot_SubGameInfo
     */
    public static fromObject(object: { [k: string]: any }): Slot_SubGameInfo;

    /**
     * Creates a plain object from a Slot_SubGameInfo message. Also converts values to other types if specified.
     * @param message Slot_SubGameInfo
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Slot_SubGameInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Slot_SubGameInfo to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a Slot_SlotRewardSubject. */
export class Slot_SlotRewardSubject implements ISlot_SlotRewardSubject {

    /**
     * Constructs a new Slot_SlotRewardSubject.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISlot_SlotRewardSubject);

    /** Slot_SlotRewardSubject subjectId. */
    public subjectId: number;

    /** Slot_SlotRewardSubject index. */
    public index: number;

    /** Slot_SlotRewardSubject rewardType. */
    public rewardType: number;

    /** Slot_SlotRewardSubject rewardAmount. */
    public rewardAmount: (number | Long);

    /** Slot_SlotRewardSubject poolType. */
    public poolType: number;

    /** Slot_SlotRewardSubject subGameBetResults. */
    public subGameBetResults: ISlot_SubGameBetResult[];

    /** Slot_SlotRewardSubject rewardCount. */
    public rewardCount: number;

    /**
     * Creates a new Slot_SlotRewardSubject instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Slot_SlotRewardSubject instance
     */
    public static create(properties?: ISlot_SlotRewardSubject): Slot_SlotRewardSubject;

    /**
     * Encodes the specified Slot_SlotRewardSubject message. Does not implicitly {@link Slot_SlotRewardSubject.verify|verify} messages.
     * @param message Slot_SlotRewardSubject message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISlot_SlotRewardSubject, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Slot_SlotRewardSubject message, length delimited. Does not implicitly {@link Slot_SlotRewardSubject.verify|verify} messages.
     * @param message Slot_SlotRewardSubject message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISlot_SlotRewardSubject, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Slot_SlotRewardSubject message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Slot_SlotRewardSubject
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): Slot_SlotRewardSubject;

    /**
     * Decodes a Slot_SlotRewardSubject message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Slot_SlotRewardSubject
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): Slot_SlotRewardSubject;

    /**
     * Verifies a Slot_SlotRewardSubject message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string | null);

    /**
     * Creates a Slot_SlotRewardSubject message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Slot_SlotRewardSubject
     */
    public static fromObject(object: { [k: string]: any }): Slot_SlotRewardSubject;

    /**
     * Creates a plain object from a Slot_SlotRewardSubject message. Also converts values to other types if specified.
     * @param message Slot_SlotRewardSubject
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Slot_SlotRewardSubject, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Slot_SlotRewardSubject to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a Slot_SubGameBetResult. */
export class Slot_SubGameBetResult implements ISlot_SubGameBetResult {

    /**
     * Constructs a new Slot_SubGameBetResult.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISlot_SubGameBetResult);

    /** Slot_SubGameBetResult subGameType. */
    public subGameType: number;

    /** Slot_SubGameBetResult betKey. */
    public betKey: number;

    /** Slot_SubGameBetResult betAmount. */
    public betAmount: (number | Long);

    /** Slot_SubGameBetResult winAmount. */
    public winAmount: (number | Long);

    /** Slot_SubGameBetResult rounds. */
    public rounds: number;

    /** Slot_SubGameBetResult leftRounds. */
    public leftRounds: number;

    /** Slot_SubGameBetResult showSubjects. */
    public showSubjects: ISlot_SlotSubject[];

    /** Slot_SubGameBetResult lineIds. */
    public lineIds: number[];

    /** Slot_SubGameBetResult bounsRewards. */
    public bounsRewards: ISlot_SlotRewardSubject[];

    /** Slot_SubGameBetResult appendValue. */
    public appendValue: (number | Long);

    /** Slot_SubGameBetResult appendList. */
    public appendList: number[];

    /** Slot_SubGameBetResult appendLongList. */
    public appendLongList: (number | Long)[];

    /**
     * Creates a new Slot_SubGameBetResult instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Slot_SubGameBetResult instance
     */
    public static create(properties?: ISlot_SubGameBetResult): Slot_SubGameBetResult;

    /**
     * Encodes the specified Slot_SubGameBetResult message. Does not implicitly {@link Slot_SubGameBetResult.verify|verify} messages.
     * @param message Slot_SubGameBetResult message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISlot_SubGameBetResult, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Slot_SubGameBetResult message, length delimited. Does not implicitly {@link Slot_SubGameBetResult.verify|verify} messages.
     * @param message Slot_SubGameBetResult message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISlot_SubGameBetResult, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Slot_SubGameBetResult message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Slot_SubGameBetResult
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): Slot_SubGameBetResult;

    /**
     * Decodes a Slot_SubGameBetResult message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Slot_SubGameBetResult
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): Slot_SubGameBetResult;

    /**
     * Verifies a Slot_SubGameBetResult message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string | null);

    /**
     * Creates a Slot_SubGameBetResult message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Slot_SubGameBetResult
     */
    public static fromObject(object: { [k: string]: any }): Slot_SubGameBetResult;

    /**
     * Creates a plain object from a Slot_SubGameBetResult message. Also converts values to other types if specified.
     * @param message Slot_SubGameBetResult
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Slot_SubGameBetResult, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Slot_SubGameBetResult to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a Slot_ReqSettlementBounsSuccess. */
export class Slot_ReqSettlementBounsSuccess implements ISlot_ReqSettlementBounsSuccess {

    /**
     * Constructs a new Slot_ReqSettlementBounsSuccess.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISlot_ReqSettlementBounsSuccess);

    /** Slot_ReqSettlementBounsSuccess betKey. */
    public betKey: number;

    /**
     * Creates a new Slot_ReqSettlementBounsSuccess instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Slot_ReqSettlementBounsSuccess instance
     */
    public static create(properties?: ISlot_ReqSettlementBounsSuccess): Slot_ReqSettlementBounsSuccess;

    /**
     * Encodes the specified Slot_ReqSettlementBounsSuccess message. Does not implicitly {@link Slot_ReqSettlementBounsSuccess.verify|verify} messages.
     * @param message Slot_ReqSettlementBounsSuccess message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISlot_ReqSettlementBounsSuccess, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Slot_ReqSettlementBounsSuccess message, length delimited. Does not implicitly {@link Slot_ReqSettlementBounsSuccess.verify|verify} messages.
     * @param message Slot_ReqSettlementBounsSuccess message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISlot_ReqSettlementBounsSuccess, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Slot_ReqSettlementBounsSuccess message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Slot_ReqSettlementBounsSuccess
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): Slot_ReqSettlementBounsSuccess;

    /**
     * Decodes a Slot_ReqSettlementBounsSuccess message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Slot_ReqSettlementBounsSuccess
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): Slot_ReqSettlementBounsSuccess;

    /**
     * Verifies a Slot_ReqSettlementBounsSuccess message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string | null);

    /**
     * Creates a Slot_ReqSettlementBounsSuccess message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Slot_ReqSettlementBounsSuccess
     */
    public static fromObject(object: { [k: string]: any }): Slot_ReqSettlementBounsSuccess;

    /**
     * Creates a plain object from a Slot_ReqSettlementBounsSuccess message. Also converts values to other types if specified.
     * @param message Slot_ReqSettlementBounsSuccess
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Slot_ReqSettlementBounsSuccess, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Slot_ReqSettlementBounsSuccess to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a Slot_PushSettlementBounsSuccess. */
export class Slot_PushSettlementBounsSuccess implements ISlot_PushSettlementBounsSuccess {

    /**
     * Constructs a new Slot_PushSettlementBounsSuccess.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISlot_PushSettlementBounsSuccess);

    /** Slot_PushSettlementBounsSuccess betKey. */
    public betKey: number;

    /** Slot_PushSettlementBounsSuccess currentGameInfo. */
    public currentGameInfo?: (ISlot_SubGameInfo | null);

    /** Slot_PushSettlementBounsSuccess playerCollectInfo. */
    public playerCollectInfo?: (ISlot_PlayerCollectInfo | null);

    /** Slot_PushSettlementBounsSuccess winAmount. */
    public winAmount: (number | Long);

    /** Slot_PushSettlementBounsSuccess balance. */
    public balance: (number | Long);

    /**
     * Creates a new Slot_PushSettlementBounsSuccess instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Slot_PushSettlementBounsSuccess instance
     */
    public static create(properties?: ISlot_PushSettlementBounsSuccess): Slot_PushSettlementBounsSuccess;

    /**
     * Encodes the specified Slot_PushSettlementBounsSuccess message. Does not implicitly {@link Slot_PushSettlementBounsSuccess.verify|verify} messages.
     * @param message Slot_PushSettlementBounsSuccess message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISlot_PushSettlementBounsSuccess, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Slot_PushSettlementBounsSuccess message, length delimited. Does not implicitly {@link Slot_PushSettlementBounsSuccess.verify|verify} messages.
     * @param message Slot_PushSettlementBounsSuccess message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISlot_PushSettlementBounsSuccess, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Slot_PushSettlementBounsSuccess message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Slot_PushSettlementBounsSuccess
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): Slot_PushSettlementBounsSuccess;

    /**
     * Decodes a Slot_PushSettlementBounsSuccess message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Slot_PushSettlementBounsSuccess
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): Slot_PushSettlementBounsSuccess;

    /**
     * Verifies a Slot_PushSettlementBounsSuccess message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string | null);

    /**
     * Creates a Slot_PushSettlementBounsSuccess message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Slot_PushSettlementBounsSuccess
     */
    public static fromObject(object: { [k: string]: any }): Slot_PushSettlementBounsSuccess;

    /**
     * Creates a plain object from a Slot_PushSettlementBounsSuccess message. Also converts values to other types if specified.
     * @param message Slot_PushSettlementBounsSuccess
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Slot_PushSettlementBounsSuccess, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Slot_PushSettlementBounsSuccess to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a Slot_ReqChooseSubGame. */
export class Slot_ReqChooseSubGame implements ISlot_ReqChooseSubGame {

    /**
     * Constructs a new Slot_ReqChooseSubGame.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISlot_ReqChooseSubGame);

    /** Slot_ReqChooseSubGame betKey. */
    public betKey: number;

    /** Slot_ReqChooseSubGame subGameType. */
    public subGameType: number;

    /**
     * Creates a new Slot_ReqChooseSubGame instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Slot_ReqChooseSubGame instance
     */
    public static create(properties?: ISlot_ReqChooseSubGame): Slot_ReqChooseSubGame;

    /**
     * Encodes the specified Slot_ReqChooseSubGame message. Does not implicitly {@link Slot_ReqChooseSubGame.verify|verify} messages.
     * @param message Slot_ReqChooseSubGame message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISlot_ReqChooseSubGame, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Slot_ReqChooseSubGame message, length delimited. Does not implicitly {@link Slot_ReqChooseSubGame.verify|verify} messages.
     * @param message Slot_ReqChooseSubGame message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISlot_ReqChooseSubGame, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Slot_ReqChooseSubGame message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Slot_ReqChooseSubGame
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): Slot_ReqChooseSubGame;

    /**
     * Decodes a Slot_ReqChooseSubGame message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Slot_ReqChooseSubGame
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): Slot_ReqChooseSubGame;

    /**
     * Verifies a Slot_ReqChooseSubGame message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string | null);

    /**
     * Creates a Slot_ReqChooseSubGame message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Slot_ReqChooseSubGame
     */
    public static fromObject(object: { [k: string]: any }): Slot_ReqChooseSubGame;

    /**
     * Creates a plain object from a Slot_ReqChooseSubGame message. Also converts values to other types if specified.
     * @param message Slot_ReqChooseSubGame
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Slot_ReqChooseSubGame, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Slot_ReqChooseSubGame to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a Slot_PushChooseSubGame. */
export class Slot_PushChooseSubGame implements ISlot_PushChooseSubGame {

    /**
     * Constructs a new Slot_PushChooseSubGame.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISlot_PushChooseSubGame);

    /** Slot_PushChooseSubGame betKey. */
    public betKey: number;

    /** Slot_PushChooseSubGame currentGameInfo. */
    public currentGameInfo?: (ISlot_SubGameInfo | null);

    /**
     * Creates a new Slot_PushChooseSubGame instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Slot_PushChooseSubGame instance
     */
    public static create(properties?: ISlot_PushChooseSubGame): Slot_PushChooseSubGame;

    /**
     * Encodes the specified Slot_PushChooseSubGame message. Does not implicitly {@link Slot_PushChooseSubGame.verify|verify} messages.
     * @param message Slot_PushChooseSubGame message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISlot_PushChooseSubGame, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Slot_PushChooseSubGame message, length delimited. Does not implicitly {@link Slot_PushChooseSubGame.verify|verify} messages.
     * @param message Slot_PushChooseSubGame message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISlot_PushChooseSubGame, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Slot_PushChooseSubGame message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Slot_PushChooseSubGame
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): Slot_PushChooseSubGame;

    /**
     * Decodes a Slot_PushChooseSubGame message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Slot_PushChooseSubGame
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): Slot_PushChooseSubGame;

    /**
     * Verifies a Slot_PushChooseSubGame message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string | null);

    /**
     * Creates a Slot_PushChooseSubGame message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Slot_PushChooseSubGame
     */
    public static fromObject(object: { [k: string]: any }): Slot_PushChooseSubGame;

    /**
     * Creates a plain object from a Slot_PushChooseSubGame message. Also converts values to other types if specified.
     * @param message Slot_PushChooseSubGame
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Slot_PushChooseSubGame, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Slot_PushChooseSubGame to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a Slot_ReqBingoReward. */
export class Slot_ReqBingoReward implements ISlot_ReqBingoReward {

    /**
     * Constructs a new Slot_ReqBingoReward.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISlot_ReqBingoReward);

    /** Slot_ReqBingoReward betKey. */
    public betKey: number;

    /**
     * Creates a new Slot_ReqBingoReward instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Slot_ReqBingoReward instance
     */
    public static create(properties?: ISlot_ReqBingoReward): Slot_ReqBingoReward;

    /**
     * Encodes the specified Slot_ReqBingoReward message. Does not implicitly {@link Slot_ReqBingoReward.verify|verify} messages.
     * @param message Slot_ReqBingoReward message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISlot_ReqBingoReward, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Slot_ReqBingoReward message, length delimited. Does not implicitly {@link Slot_ReqBingoReward.verify|verify} messages.
     * @param message Slot_ReqBingoReward message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISlot_ReqBingoReward, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Slot_ReqBingoReward message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Slot_ReqBingoReward
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): Slot_ReqBingoReward;

    /**
     * Decodes a Slot_ReqBingoReward message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Slot_ReqBingoReward
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): Slot_ReqBingoReward;

    /**
     * Verifies a Slot_ReqBingoReward message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string | null);

    /**
     * Creates a Slot_ReqBingoReward message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Slot_ReqBingoReward
     */
    public static fromObject(object: { [k: string]: any }): Slot_ReqBingoReward;

    /**
     * Creates a plain object from a Slot_ReqBingoReward message. Also converts values to other types if specified.
     * @param message Slot_ReqBingoReward
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Slot_ReqBingoReward, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Slot_ReqBingoReward to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a Slot_PushBingoReward. */
export class Slot_PushBingoReward implements ISlot_PushBingoReward {

    /**
     * Constructs a new Slot_PushBingoReward.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISlot_PushBingoReward);

    /** Slot_PushBingoReward betKey. */
    public betKey: number;

    /** Slot_PushBingoReward slotRewards. */
    public slotRewards: ISlot_SlotRewardSubject[];

    /**
     * Creates a new Slot_PushBingoReward instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Slot_PushBingoReward instance
     */
    public static create(properties?: ISlot_PushBingoReward): Slot_PushBingoReward;

    /**
     * Encodes the specified Slot_PushBingoReward message. Does not implicitly {@link Slot_PushBingoReward.verify|verify} messages.
     * @param message Slot_PushBingoReward message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISlot_PushBingoReward, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Slot_PushBingoReward message, length delimited. Does not implicitly {@link Slot_PushBingoReward.verify|verify} messages.
     * @param message Slot_PushBingoReward message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISlot_PushBingoReward, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Slot_PushBingoReward message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Slot_PushBingoReward
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): Slot_PushBingoReward;

    /**
     * Decodes a Slot_PushBingoReward message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Slot_PushBingoReward
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): Slot_PushBingoReward;

    /**
     * Verifies a Slot_PushBingoReward message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string | null);

    /**
     * Creates a Slot_PushBingoReward message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Slot_PushBingoReward
     */
    public static fromObject(object: { [k: string]: any }): Slot_PushBingoReward;

    /**
     * Creates a plain object from a Slot_PushBingoReward message. Also converts values to other types if specified.
     * @param message Slot_PushBingoReward
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Slot_PushBingoReward, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Slot_PushBingoReward to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a Slot_PlayerCollectInfo. */
export class Slot_PlayerCollectInfo implements ISlot_PlayerCollectInfo {

    /**
     * Constructs a new Slot_PlayerCollectInfo.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISlot_PlayerCollectInfo);

    /** Slot_PlayerCollectInfo averageBetAmount. */
    public averageBetAmount: (number | Long);

    /** Slot_PlayerCollectInfo collectCurrentValue. */
    public collectCurrentValue: number;

    /** Slot_PlayerCollectInfo collectMaxValue. */
    public collectMaxValue: number;

    /** Slot_PlayerCollectInfo currentIndex. */
    public currentIndex: number;

    /** Slot_PlayerCollectInfo haveReward. */
    public haveReward: boolean;

    /** Slot_PlayerCollectInfo slotRewards. */
    public slotRewards: ISlot_SlotRewardSubject[];

    /** Slot_PlayerCollectInfo receivedSlotRewards. */
    public receivedSlotRewards: ISlot_SlotRewardSubject[];

    /** Slot_PlayerCollectInfo buffSlotRewards. */
    public buffSlotRewards: ISlot_SlotRewardSubject[];

    /** Slot_PlayerCollectInfo betkey. */
    public betkey: number;

    /**
     * Creates a new Slot_PlayerCollectInfo instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Slot_PlayerCollectInfo instance
     */
    public static create(properties?: ISlot_PlayerCollectInfo): Slot_PlayerCollectInfo;

    /**
     * Encodes the specified Slot_PlayerCollectInfo message. Does not implicitly {@link Slot_PlayerCollectInfo.verify|verify} messages.
     * @param message Slot_PlayerCollectInfo message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISlot_PlayerCollectInfo, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Slot_PlayerCollectInfo message, length delimited. Does not implicitly {@link Slot_PlayerCollectInfo.verify|verify} messages.
     * @param message Slot_PlayerCollectInfo message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISlot_PlayerCollectInfo, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Slot_PlayerCollectInfo message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Slot_PlayerCollectInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): Slot_PlayerCollectInfo;

    /**
     * Decodes a Slot_PlayerCollectInfo message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Slot_PlayerCollectInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): Slot_PlayerCollectInfo;

    /**
     * Verifies a Slot_PlayerCollectInfo message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string | null);

    /**
     * Creates a Slot_PlayerCollectInfo message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Slot_PlayerCollectInfo
     */
    public static fromObject(object: { [k: string]: any }): Slot_PlayerCollectInfo;

    /**
     * Creates a plain object from a Slot_PlayerCollectInfo message. Also converts values to other types if specified.
     * @param message Slot_PlayerCollectInfo
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Slot_PlayerCollectInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Slot_PlayerCollectInfo to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a Slot_ReqAcceptCollectAward. */
export class Slot_ReqAcceptCollectAward implements ISlot_ReqAcceptCollectAward {

    /**
     * Constructs a new Slot_ReqAcceptCollectAward.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISlot_ReqAcceptCollectAward);

    /** Slot_ReqAcceptCollectAward betKey. */
    public betKey: number;

    /**
     * Creates a new Slot_ReqAcceptCollectAward instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Slot_ReqAcceptCollectAward instance
     */
    public static create(properties?: ISlot_ReqAcceptCollectAward): Slot_ReqAcceptCollectAward;

    /**
     * Encodes the specified Slot_ReqAcceptCollectAward message. Does not implicitly {@link Slot_ReqAcceptCollectAward.verify|verify} messages.
     * @param message Slot_ReqAcceptCollectAward message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISlot_ReqAcceptCollectAward, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Slot_ReqAcceptCollectAward message, length delimited. Does not implicitly {@link Slot_ReqAcceptCollectAward.verify|verify} messages.
     * @param message Slot_ReqAcceptCollectAward message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISlot_ReqAcceptCollectAward, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Slot_ReqAcceptCollectAward message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Slot_ReqAcceptCollectAward
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): Slot_ReqAcceptCollectAward;

    /**
     * Decodes a Slot_ReqAcceptCollectAward message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Slot_ReqAcceptCollectAward
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): Slot_ReqAcceptCollectAward;

    /**
     * Verifies a Slot_ReqAcceptCollectAward message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string | null);

    /**
     * Creates a Slot_ReqAcceptCollectAward message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Slot_ReqAcceptCollectAward
     */
    public static fromObject(object: { [k: string]: any }): Slot_ReqAcceptCollectAward;

    /**
     * Creates a plain object from a Slot_ReqAcceptCollectAward message. Also converts values to other types if specified.
     * @param message Slot_ReqAcceptCollectAward
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Slot_ReqAcceptCollectAward, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Slot_ReqAcceptCollectAward to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a Slot_PushAcceptCollectAward. */
export class Slot_PushAcceptCollectAward implements ISlot_PushAcceptCollectAward {

    /**
     * Constructs a new Slot_PushAcceptCollectAward.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISlot_PushAcceptCollectAward);

    /** Slot_PushAcceptCollectAward betKey. */
    public betKey: number;

    /** Slot_PushAcceptCollectAward currentGameInfo. */
    public currentGameInfo?: (ISlot_SubGameInfo | null);

    /** Slot_PushAcceptCollectAward playerCollectInfo. */
    public playerCollectInfo?: (ISlot_PlayerCollectInfo | null);

    /** Slot_PushAcceptCollectAward winAmount. */
    public winAmount: (number | Long);

    /** Slot_PushAcceptCollectAward balance. */
    public balance: (number | Long);

    /**
     * Creates a new Slot_PushAcceptCollectAward instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Slot_PushAcceptCollectAward instance
     */
    public static create(properties?: ISlot_PushAcceptCollectAward): Slot_PushAcceptCollectAward;

    /**
     * Encodes the specified Slot_PushAcceptCollectAward message. Does not implicitly {@link Slot_PushAcceptCollectAward.verify|verify} messages.
     * @param message Slot_PushAcceptCollectAward message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISlot_PushAcceptCollectAward, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Slot_PushAcceptCollectAward message, length delimited. Does not implicitly {@link Slot_PushAcceptCollectAward.verify|verify} messages.
     * @param message Slot_PushAcceptCollectAward message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISlot_PushAcceptCollectAward, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Slot_PushAcceptCollectAward message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Slot_PushAcceptCollectAward
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): Slot_PushAcceptCollectAward;

    /**
     * Decodes a Slot_PushAcceptCollectAward message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Slot_PushAcceptCollectAward
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): Slot_PushAcceptCollectAward;

    /**
     * Verifies a Slot_PushAcceptCollectAward message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string | null);

    /**
     * Creates a Slot_PushAcceptCollectAward message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Slot_PushAcceptCollectAward
     */
    public static fromObject(object: { [k: string]: any }): Slot_PushAcceptCollectAward;

    /**
     * Creates a plain object from a Slot_PushAcceptCollectAward message. Also converts values to other types if specified.
     * @param message Slot_PushAcceptCollectAward
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Slot_PushAcceptCollectAward, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Slot_PushAcceptCollectAward to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a Slot_ReqCollectShopExchangeAward. */
export class Slot_ReqCollectShopExchangeAward implements ISlot_ReqCollectShopExchangeAward {

    /**
     * Constructs a new Slot_ReqCollectShopExchangeAward.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISlot_ReqCollectShopExchangeAward);

    /** Slot_ReqCollectShopExchangeAward index. */
    public index: number;

    /**
     * Creates a new Slot_ReqCollectShopExchangeAward instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Slot_ReqCollectShopExchangeAward instance
     */
    public static create(properties?: ISlot_ReqCollectShopExchangeAward): Slot_ReqCollectShopExchangeAward;

    /**
     * Encodes the specified Slot_ReqCollectShopExchangeAward message. Does not implicitly {@link Slot_ReqCollectShopExchangeAward.verify|verify} messages.
     * @param message Slot_ReqCollectShopExchangeAward message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISlot_ReqCollectShopExchangeAward, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Slot_ReqCollectShopExchangeAward message, length delimited. Does not implicitly {@link Slot_ReqCollectShopExchangeAward.verify|verify} messages.
     * @param message Slot_ReqCollectShopExchangeAward message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISlot_ReqCollectShopExchangeAward, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Slot_ReqCollectShopExchangeAward message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Slot_ReqCollectShopExchangeAward
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): Slot_ReqCollectShopExchangeAward;

    /**
     * Decodes a Slot_ReqCollectShopExchangeAward message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Slot_ReqCollectShopExchangeAward
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): Slot_ReqCollectShopExchangeAward;

    /**
     * Verifies a Slot_ReqCollectShopExchangeAward message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string | null);

    /**
     * Creates a Slot_ReqCollectShopExchangeAward message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Slot_ReqCollectShopExchangeAward
     */
    public static fromObject(object: { [k: string]: any }): Slot_ReqCollectShopExchangeAward;

    /**
     * Creates a plain object from a Slot_ReqCollectShopExchangeAward message. Also converts values to other types if specified.
     * @param message Slot_ReqCollectShopExchangeAward
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Slot_ReqCollectShopExchangeAward, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Slot_ReqCollectShopExchangeAward to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a Slot_PushCollectShopExchangeAward. */
export class Slot_PushCollectShopExchangeAward implements ISlot_PushCollectShopExchangeAward {

    /**
     * Constructs a new Slot_PushCollectShopExchangeAward.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISlot_PushCollectShopExchangeAward);

    /** Slot_PushCollectShopExchangeAward index. */
    public index: number;

    /** Slot_PushCollectShopExchangeAward playerCollectInfo. */
    public playerCollectInfo?: (ISlot_PlayerCollectInfo | null);

    /**
     * Creates a new Slot_PushCollectShopExchangeAward instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Slot_PushCollectShopExchangeAward instance
     */
    public static create(properties?: ISlot_PushCollectShopExchangeAward): Slot_PushCollectShopExchangeAward;

    /**
     * Encodes the specified Slot_PushCollectShopExchangeAward message. Does not implicitly {@link Slot_PushCollectShopExchangeAward.verify|verify} messages.
     * @param message Slot_PushCollectShopExchangeAward message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISlot_PushCollectShopExchangeAward, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Slot_PushCollectShopExchangeAward message, length delimited. Does not implicitly {@link Slot_PushCollectShopExchangeAward.verify|verify} messages.
     * @param message Slot_PushCollectShopExchangeAward message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISlot_PushCollectShopExchangeAward, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Slot_PushCollectShopExchangeAward message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Slot_PushCollectShopExchangeAward
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): Slot_PushCollectShopExchangeAward;

    /**
     * Decodes a Slot_PushCollectShopExchangeAward message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Slot_PushCollectShopExchangeAward
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): Slot_PushCollectShopExchangeAward;

    /**
     * Verifies a Slot_PushCollectShopExchangeAward message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string | null);

    /**
     * Creates a Slot_PushCollectShopExchangeAward message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Slot_PushCollectShopExchangeAward
     */
    public static fromObject(object: { [k: string]: any }): Slot_PushCollectShopExchangeAward;

    /**
     * Creates a plain object from a Slot_PushCollectShopExchangeAward message. Also converts values to other types if specified.
     * @param message Slot_PushCollectShopExchangeAward
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Slot_PushCollectShopExchangeAward, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Slot_PushCollectShopExchangeAward to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a Slot_ReqJackpotAmount. */
export class Slot_ReqJackpotAmount implements ISlot_ReqJackpotAmount {

    /**
     * Constructs a new Slot_ReqJackpotAmount.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISlot_ReqJackpotAmount);

    /** Slot_ReqJackpotAmount betKey. */
    public betKey: number;

    /** Slot_ReqJackpotAmount poolTypes. */
    public poolTypes: number[];

    /**
     * Creates a new Slot_ReqJackpotAmount instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Slot_ReqJackpotAmount instance
     */
    public static create(properties?: ISlot_ReqJackpotAmount): Slot_ReqJackpotAmount;

    /**
     * Encodes the specified Slot_ReqJackpotAmount message. Does not implicitly {@link Slot_ReqJackpotAmount.verify|verify} messages.
     * @param message Slot_ReqJackpotAmount message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISlot_ReqJackpotAmount, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Slot_ReqJackpotAmount message, length delimited. Does not implicitly {@link Slot_ReqJackpotAmount.verify|verify} messages.
     * @param message Slot_ReqJackpotAmount message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISlot_ReqJackpotAmount, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Slot_ReqJackpotAmount message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Slot_ReqJackpotAmount
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): Slot_ReqJackpotAmount;

    /**
     * Decodes a Slot_ReqJackpotAmount message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Slot_ReqJackpotAmount
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): Slot_ReqJackpotAmount;

    /**
     * Verifies a Slot_ReqJackpotAmount message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string | null);

    /**
     * Creates a Slot_ReqJackpotAmount message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Slot_ReqJackpotAmount
     */
    public static fromObject(object: { [k: string]: any }): Slot_ReqJackpotAmount;

    /**
     * Creates a plain object from a Slot_ReqJackpotAmount message. Also converts values to other types if specified.
     * @param message Slot_ReqJackpotAmount
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Slot_ReqJackpotAmount, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Slot_ReqJackpotAmount to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a Slot_PushJackpotAmount. */
export class Slot_PushJackpotAmount implements ISlot_PushJackpotAmount {

    /**
     * Constructs a new Slot_PushJackpotAmount.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISlot_PushJackpotAmount);

    /** Slot_PushJackpotAmount betKey. */
    public betKey: number;

    /** Slot_PushJackpotAmount jackpotInfos. */
    public jackpotInfos: IJackpotInfo[];

    /**
     * Creates a new Slot_PushJackpotAmount instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Slot_PushJackpotAmount instance
     */
    public static create(properties?: ISlot_PushJackpotAmount): Slot_PushJackpotAmount;

    /**
     * Encodes the specified Slot_PushJackpotAmount message. Does not implicitly {@link Slot_PushJackpotAmount.verify|verify} messages.
     * @param message Slot_PushJackpotAmount message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISlot_PushJackpotAmount, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Slot_PushJackpotAmount message, length delimited. Does not implicitly {@link Slot_PushJackpotAmount.verify|verify} messages.
     * @param message Slot_PushJackpotAmount message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISlot_PushJackpotAmount, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Slot_PushJackpotAmount message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Slot_PushJackpotAmount
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): Slot_PushJackpotAmount;

    /**
     * Decodes a Slot_PushJackpotAmount message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Slot_PushJackpotAmount
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): Slot_PushJackpotAmount;

    /**
     * Verifies a Slot_PushJackpotAmount message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string | null);

    /**
     * Creates a Slot_PushJackpotAmount message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Slot_PushJackpotAmount
     */
    public static fromObject(object: { [k: string]: any }): Slot_PushJackpotAmount;

    /**
     * Creates a plain object from a Slot_PushJackpotAmount message. Also converts values to other types if specified.
     * @param message Slot_PushJackpotAmount
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Slot_PushJackpotAmount, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Slot_PushJackpotAmount to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a JackpotInfo. */
export class JackpotInfo implements IJackpotInfo {

    /**
     * Constructs a new JackpotInfo.
     * @param [properties] Properties to set
     */
    constructor(properties?: IJackpotInfo);

    /** JackpotInfo poolType. */
    public poolType: number;

    /** JackpotInfo amount. */
    public amount: (number | Long);

    /**
     * Creates a new JackpotInfo instance using the specified properties.
     * @param [properties] Properties to set
     * @returns JackpotInfo instance
     */
    public static create(properties?: IJackpotInfo): JackpotInfo;

    /**
     * Encodes the specified JackpotInfo message. Does not implicitly {@link JackpotInfo.verify|verify} messages.
     * @param message JackpotInfo message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IJackpotInfo, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified JackpotInfo message, length delimited. Does not implicitly {@link JackpotInfo.verify|verify} messages.
     * @param message JackpotInfo message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IJackpotInfo, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a JackpotInfo message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns JackpotInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): JackpotInfo;

    /**
     * Decodes a JackpotInfo message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns JackpotInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): JackpotInfo;

    /**
     * Verifies a JackpotInfo message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string | null);

    /**
     * Creates a JackpotInfo message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns JackpotInfo
     */
    public static fromObject(object: { [k: string]: any }): JackpotInfo;

    /**
     * Creates a plain object from a JackpotInfo message. Also converts values to other types if specified.
     * @param message JackpotInfo
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: JackpotInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this JackpotInfo to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a Slot_ReqLastBetInfo. */
export class Slot_ReqLastBetInfo implements ISlot_ReqLastBetInfo {

    /**
     * Constructs a new Slot_ReqLastBetInfo.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISlot_ReqLastBetInfo);

    /**
     * Creates a new Slot_ReqLastBetInfo instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Slot_ReqLastBetInfo instance
     */
    public static create(properties?: ISlot_ReqLastBetInfo): Slot_ReqLastBetInfo;

    /**
     * Encodes the specified Slot_ReqLastBetInfo message. Does not implicitly {@link Slot_ReqLastBetInfo.verify|verify} messages.
     * @param message Slot_ReqLastBetInfo message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISlot_ReqLastBetInfo, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Slot_ReqLastBetInfo message, length delimited. Does not implicitly {@link Slot_ReqLastBetInfo.verify|verify} messages.
     * @param message Slot_ReqLastBetInfo message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISlot_ReqLastBetInfo, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Slot_ReqLastBetInfo message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Slot_ReqLastBetInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): Slot_ReqLastBetInfo;

    /**
     * Decodes a Slot_ReqLastBetInfo message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Slot_ReqLastBetInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): Slot_ReqLastBetInfo;

    /**
     * Verifies a Slot_ReqLastBetInfo message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string | null);

    /**
     * Creates a Slot_ReqLastBetInfo message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Slot_ReqLastBetInfo
     */
    public static fromObject(object: { [k: string]: any }): Slot_ReqLastBetInfo;

    /**
     * Creates a plain object from a Slot_ReqLastBetInfo message. Also converts values to other types if specified.
     * @param message Slot_ReqLastBetInfo
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Slot_ReqLastBetInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Slot_ReqLastBetInfo to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}
