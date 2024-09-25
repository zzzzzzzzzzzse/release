import * as $protobuf from "protobufjs";
/** Properties of a Hall_ReqLogin. */
export interface IHall_ReqLogin {

    /** Hall_ReqLogin pid */
    pid?: (string|null);

    /** Hall_ReqLogin token */
    token?: (string|null);

    /** Hall_ReqLogin version */
    version?: (string|null);

    /** Hall_ReqLogin maskingKey */
    maskingKey?: (number|null);
}

/** Represents a Hall_ReqLogin. */
export class Hall_ReqLogin implements IHall_ReqLogin {

    /**
     * Constructs a new Hall_ReqLogin.
     * @param [properties] Properties to set
     */
    constructor(properties?: IHall_ReqLogin);

    /** Hall_ReqLogin pid. */
    public pid: string;

    /** Hall_ReqLogin token. */
    public token: string;

    /** Hall_ReqLogin version. */
    public version: string;

    /** Hall_ReqLogin maskingKey. */
    public maskingKey: number;

    /**
     * Creates a new Hall_ReqLogin instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Hall_ReqLogin instance
     */
    public static create(properties?: IHall_ReqLogin): Hall_ReqLogin;

    /**
     * Encodes the specified Hall_ReqLogin message. Does not implicitly {@link Hall_ReqLogin.verify|verify} messages.
     * @param message Hall_ReqLogin message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IHall_ReqLogin, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Hall_ReqLogin message, length delimited. Does not implicitly {@link Hall_ReqLogin.verify|verify} messages.
     * @param message Hall_ReqLogin message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IHall_ReqLogin, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Hall_ReqLogin message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Hall_ReqLogin
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Hall_ReqLogin;

    /**
     * Decodes a Hall_ReqLogin message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Hall_ReqLogin
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Hall_ReqLogin;

    /**
     * Verifies a Hall_ReqLogin message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Hall_ReqLogin message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Hall_ReqLogin
     */
    public static fromObject(object: { [k: string]: any }): Hall_ReqLogin;

    /**
     * Creates a plain object from a Hall_ReqLogin message. Also converts values to other types if specified.
     * @param message Hall_ReqLogin
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Hall_ReqLogin, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Hall_ReqLogin to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Hall_PushLogin. */
export interface IHall_PushLogin {
}

/** Represents a Hall_PushLogin. */
export class Hall_PushLogin implements IHall_PushLogin {

    /**
     * Constructs a new Hall_PushLogin.
     * @param [properties] Properties to set
     */
    constructor(properties?: IHall_PushLogin);

    /**
     * Creates a new Hall_PushLogin instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Hall_PushLogin instance
     */
    public static create(properties?: IHall_PushLogin): Hall_PushLogin;

    /**
     * Encodes the specified Hall_PushLogin message. Does not implicitly {@link Hall_PushLogin.verify|verify} messages.
     * @param message Hall_PushLogin message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IHall_PushLogin, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Hall_PushLogin message, length delimited. Does not implicitly {@link Hall_PushLogin.verify|verify} messages.
     * @param message Hall_PushLogin message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IHall_PushLogin, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Hall_PushLogin message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Hall_PushLogin
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Hall_PushLogin;

    /**
     * Decodes a Hall_PushLogin message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Hall_PushLogin
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Hall_PushLogin;

    /**
     * Verifies a Hall_PushLogin message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Hall_PushLogin message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Hall_PushLogin
     */
    public static fromObject(object: { [k: string]: any }): Hall_PushLogin;

    /**
     * Creates a plain object from a Hall_PushLogin message. Also converts values to other types if specified.
     * @param message Hall_PushLogin
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Hall_PushLogin, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Hall_PushLogin to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Hall_PushApiCallBackMessage. */
export interface IHall_PushApiCallBackMessage {

    /** Hall_PushApiCallBackMessage jsondata */
    jsondata?: (string|null);
}

/** Represents a Hall_PushApiCallBackMessage. */
export class Hall_PushApiCallBackMessage implements IHall_PushApiCallBackMessage {

    /**
     * Constructs a new Hall_PushApiCallBackMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: IHall_PushApiCallBackMessage);

    /** Hall_PushApiCallBackMessage jsondata. */
    public jsondata: string;

    /**
     * Creates a new Hall_PushApiCallBackMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Hall_PushApiCallBackMessage instance
     */
    public static create(properties?: IHall_PushApiCallBackMessage): Hall_PushApiCallBackMessage;

    /**
     * Encodes the specified Hall_PushApiCallBackMessage message. Does not implicitly {@link Hall_PushApiCallBackMessage.verify|verify} messages.
     * @param message Hall_PushApiCallBackMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IHall_PushApiCallBackMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Hall_PushApiCallBackMessage message, length delimited. Does not implicitly {@link Hall_PushApiCallBackMessage.verify|verify} messages.
     * @param message Hall_PushApiCallBackMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IHall_PushApiCallBackMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Hall_PushApiCallBackMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Hall_PushApiCallBackMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Hall_PushApiCallBackMessage;

    /**
     * Decodes a Hall_PushApiCallBackMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Hall_PushApiCallBackMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Hall_PushApiCallBackMessage;

    /**
     * Verifies a Hall_PushApiCallBackMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Hall_PushApiCallBackMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Hall_PushApiCallBackMessage
     */
    public static fromObject(object: { [k: string]: any }): Hall_PushApiCallBackMessage;

    /**
     * Creates a plain object from a Hall_PushApiCallBackMessage message. Also converts values to other types if specified.
     * @param message Hall_PushApiCallBackMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Hall_PushApiCallBackMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Hall_PushApiCallBackMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}
