import * as $protobuf from "protobufjs";
/** ErrorCode enum. */
export enum ErrorCode {
    NORMAL = 0,
    SYSTEM_ERR = 404,
    ARGS_ERR = 1,
    TOKEN_ERR = 2,
    OTHER_LOGIN_ERR = 3,
    BALANCE_NOT_ENOUGH = 4
}

/** Represents an Error. */
export class Error implements IError {

    /**
     * Constructs a new Error.
     * @param [properties] Properties to set
     */
    constructor(properties?: IError);

    /** Error code. */
    public code: number;

    /** Error args. */
    public args: string[];

    /**
     * Creates a new Error instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Error instance
     */
    public static create(properties?: IError): Error;

    /**
     * Encodes the specified Error message. Does not implicitly {@link Error.verify|verify} messages.
     * @param message Error message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IError, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Error message, length delimited. Does not implicitly {@link Error.verify|verify} messages.
     * @param message Error message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IError, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an Error message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Error
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Error;

    /**
     * Decodes an Error message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Error
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Error;

    /**
     * Verifies an Error message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an Error message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Error
     */
    public static fromObject(object: { [k: string]: any }): Error;

    /**
     * Creates a plain object from an Error message. Also converts values to other types if specified.
     * @param message Error
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Error, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Error to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** SubCmd enum. */
export enum SubCmd {
    Cmd_ReqHeartBeat = 0,
    Cmd_PushHeartBeat = 1,
    Cmd_Error = 404,
    Cmd_Slot_ReqLogin = 1000,
    Cmd_Slot_PushLogin = 1001,
    Cmd_Slot_ReqBet = 1002,
    Cmd_Slot_PushBetResult = 1003,
    Cmd_Slot_ReqSettlementBounsSuccess = 1004,
    Cmd_Slot_PushSettlementBounsSuccess = 1005,
    Cmd_Slot_ReqChooseSubGame = 1006,
    Cmd_Slot_PushChooseSubGame = 1007,
    Cmd_Slot_ReqAcceptCollectAward = 1008,
    Cmd_Slot_PushAcceptCollectAward = 1009,
    Cmd_Slot_ReqCollectShopExchangeAward = 1010,
    Cmd_Slot_PushCollectShopExchangeAward = 1011,
    Cmd_Slot_ReqBingoReward = 1012,
    Cmd_Slot_PushBingoReward = 1013,
    Cmd_Slot_ReqJackpotAmount = 1014,
    Cmd_Slot_PushJackpotAmount = 1015,
    Cmd_Slot_ReqLastBetInfo = 1016,
    Cmd_Slot_PushLastBetInfo = 1017,
    Cmd_Hall_ReqLogin = 2000,
    Cmd_Hall_PushLogin = 2001,
    Cmd_Hall_PushApiCallBackMessage = 2002
}

/** Represents a ReqHeartBeat. */
export class ReqHeartBeat implements IReqHeartBeat {

    /**
     * Constructs a new ReqHeartBeat.
     * @param [properties] Properties to set
     */
    constructor(properties?: IReqHeartBeat);

    /**
     * Creates a new ReqHeartBeat instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ReqHeartBeat instance
     */
    public static create(properties?: IReqHeartBeat): ReqHeartBeat;

    /**
     * Encodes the specified ReqHeartBeat message. Does not implicitly {@link ReqHeartBeat.verify|verify} messages.
     * @param message ReqHeartBeat message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IReqHeartBeat, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ReqHeartBeat message, length delimited. Does not implicitly {@link ReqHeartBeat.verify|verify} messages.
     * @param message ReqHeartBeat message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IReqHeartBeat, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ReqHeartBeat message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ReqHeartBeat
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ReqHeartBeat;

    /**
     * Decodes a ReqHeartBeat message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ReqHeartBeat
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ReqHeartBeat;

    /**
     * Verifies a ReqHeartBeat message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a ReqHeartBeat message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ReqHeartBeat
     */
    public static fromObject(object: { [k: string]: any }): ReqHeartBeat;

    /**
     * Creates a plain object from a ReqHeartBeat message. Also converts values to other types if specified.
     * @param message ReqHeartBeat
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ReqHeartBeat, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ReqHeartBeat to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a PushHeartBeat. */
export class PushHeartBeat implements IPushHeartBeat {

    /**
     * Constructs a new PushHeartBeat.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPushHeartBeat);

    /** PushHeartBeat serverTime. */
    public serverTime: (number|Long);

    /**
     * Creates a new PushHeartBeat instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PushHeartBeat instance
     */
    public static create(properties?: IPushHeartBeat): PushHeartBeat;

    /**
     * Encodes the specified PushHeartBeat message. Does not implicitly {@link PushHeartBeat.verify|verify} messages.
     * @param message PushHeartBeat message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPushHeartBeat, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified PushHeartBeat message, length delimited. Does not implicitly {@link PushHeartBeat.verify|verify} messages.
     * @param message PushHeartBeat message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPushHeartBeat, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PushHeartBeat message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PushHeartBeat
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PushHeartBeat;

    /**
     * Decodes a PushHeartBeat message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PushHeartBeat
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PushHeartBeat;

    /**
     * Verifies a PushHeartBeat message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a PushHeartBeat message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PushHeartBeat
     */
    public static fromObject(object: { [k: string]: any }): PushHeartBeat;

    /**
     * Creates a plain object from a PushHeartBeat message. Also converts values to other types if specified.
     * @param message PushHeartBeat
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: PushHeartBeat, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this PushHeartBeat to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}
