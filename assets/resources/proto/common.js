/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

/**
 * ErrorCode enum.
 * @exports ErrorCode
 * @enum {number}
 * @property {number} NORMAL=0 NORMAL value
 * @property {number} SYSTEM_ERR=404 SYSTEM_ERR value
 * @property {number} ARGS_ERR=1 ARGS_ERR value
 * @property {number} TOKEN_ERR=2 TOKEN_ERR value
 * @property {number} OTHER_LOGIN_ERR=3 OTHER_LOGIN_ERR value
 * @property {number} BALANCE_NOT_ENOUGH=4 BALANCE_NOT_ENOUGH value
 */
$root.ErrorCode = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "NORMAL"] = 0;
    values[valuesById[404] = "SYSTEM_ERR"] = 404;
    values[valuesById[1] = "ARGS_ERR"] = 1;
    values[valuesById[2] = "TOKEN_ERR"] = 2;
    values[valuesById[3] = "OTHER_LOGIN_ERR"] = 3;
    values[valuesById[4] = "BALANCE_NOT_ENOUGH"] = 4;
    return values;
})();

$root.Error = (function() {

    /**
     * Properties of an Error.
     * @exports IError
     * @interface IError
     * @property {number|null} [code] Error code
     * @property {Array.<string>|null} [args] Error args
     */

    /**
     * Constructs a new Error.
     * @exports Error
     * @classdesc Represents an Error.
     * @implements IError
     * @constructor
     * @param {IError=} [properties] Properties to set
     */
    function Error(properties) {
        this.args = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Error code.
     * @member {number} code
     * @memberof Error
     * @instance
     */
    Error.prototype.code = 0;

    /**
     * Error args.
     * @member {Array.<string>} args
     * @memberof Error
     * @instance
     */
    Error.prototype.args = $util.emptyArray;

    /**
     * Creates a new Error instance using the specified properties.
     * @function create
     * @memberof Error
     * @static
     * @param {IError=} [properties] Properties to set
     * @returns {Error} Error instance
     */
    Error.create = function create(properties) {
        return new Error(properties);
    };

    /**
     * Encodes the specified Error message. Does not implicitly {@link Error.verify|verify} messages.
     * @function encode
     * @memberof Error
     * @static
     * @param {IError} message Error message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Error.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.code != null && Object.hasOwnProperty.call(message, "code"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
        if (message.args != null && message.args.length)
            for (var i = 0; i < message.args.length; ++i)
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.args[i]);
        return writer;
    };

    /**
     * Encodes the specified Error message, length delimited. Does not implicitly {@link Error.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Error
     * @static
     * @param {IError} message Error message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Error.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an Error message from the specified reader or buffer.
     * @function decode
     * @memberof Error
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Error} Error
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Error.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Error();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.code = reader.int32();
                break;
            case 2:
                if (!(message.args && message.args.length))
                    message.args = [];
                message.args.push(reader.string());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an Error message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Error
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Error} Error
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Error.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an Error message.
     * @function verify
     * @memberof Error
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Error.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.code != null && message.hasOwnProperty("code"))
            if (!$util.isInteger(message.code))
                return "code: integer expected";
        if (message.args != null && message.hasOwnProperty("args")) {
            if (!Array.isArray(message.args))
                return "args: array expected";
            for (var i = 0; i < message.args.length; ++i)
                if (!$util.isString(message.args[i]))
                    return "args: string[] expected";
        }
        return null;
    };

    /**
     * Creates an Error message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Error
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Error} Error
     */
    Error.fromObject = function fromObject(object) {
        if (object instanceof $root.Error)
            return object;
        var message = new $root.Error();
        if (object.code != null)
            message.code = object.code | 0;
        if (object.args) {
            if (!Array.isArray(object.args))
                throw TypeError(".Error.args: array expected");
            message.args = [];
            for (var i = 0; i < object.args.length; ++i)
                message.args[i] = String(object.args[i]);
        }
        return message;
    };

    /**
     * Creates a plain object from an Error message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Error
     * @static
     * @param {Error} message Error
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Error.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.args = [];
        if (options.defaults)
            object.code = 0;
        if (message.code != null && message.hasOwnProperty("code"))
            object.code = message.code;
        if (message.args && message.args.length) {
            object.args = [];
            for (var j = 0; j < message.args.length; ++j)
                object.args[j] = message.args[j];
        }
        return object;
    };

    /**
     * Converts this Error to JSON.
     * @function toJSON
     * @memberof Error
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Error.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Error;
})();

/**
 * SubCmd enum.
 * @exports SubCmd
 * @enum {number}
 * @property {number} Cmd_ReqHeartBeat=0 Cmd_ReqHeartBeat value
 * @property {number} Cmd_PushHeartBeat=1 Cmd_PushHeartBeat value
 * @property {number} Cmd_Error=404 Cmd_Error value
 * @property {number} Cmd_Slot_ReqLogin=1000 Cmd_Slot_ReqLogin value
 * @property {number} Cmd_Slot_PushLogin=1001 Cmd_Slot_PushLogin value
 * @property {number} Cmd_Slot_ReqBet=1002 Cmd_Slot_ReqBet value
 * @property {number} Cmd_Slot_PushBetResult=1003 Cmd_Slot_PushBetResult value
 * @property {number} Cmd_Slot_ReqSettlementBounsSuccess=1004 Cmd_Slot_ReqSettlementBounsSuccess value
 * @property {number} Cmd_Slot_PushSettlementBounsSuccess=1005 Cmd_Slot_PushSettlementBounsSuccess value
 * @property {number} Cmd_Slot_ReqChooseSubGame=1006 Cmd_Slot_ReqChooseSubGame value
 * @property {number} Cmd_Slot_PushChooseSubGame=1007 Cmd_Slot_PushChooseSubGame value
 * @property {number} Cmd_Slot_ReqAcceptCollectAward=1008 Cmd_Slot_ReqAcceptCollectAward value
 * @property {number} Cmd_Slot_PushAcceptCollectAward=1009 Cmd_Slot_PushAcceptCollectAward value
 * @property {number} Cmd_Slot_ReqCollectShopExchangeAward=1010 Cmd_Slot_ReqCollectShopExchangeAward value
 * @property {number} Cmd_Slot_PushCollectShopExchangeAward=1011 Cmd_Slot_PushCollectShopExchangeAward value
 * @property {number} Cmd_Slot_ReqBingoReward=1012 Cmd_Slot_ReqBingoReward value
 * @property {number} Cmd_Slot_PushBingoReward=1013 Cmd_Slot_PushBingoReward value
 * @property {number} Cmd_Slot_ReqJackpotAmount=1014 Cmd_Slot_ReqJackpotAmount value
 * @property {number} Cmd_Slot_PushJackpotAmount=1015 Cmd_Slot_PushJackpotAmount value
 * @property {number} Cmd_Slot_ReqLastBetInfo=1016 Cmd_Slot_ReqLastBetInfo value
 * @property {number} Cmd_Slot_PushLastBetInfo=1017 Cmd_Slot_PushLastBetInfo value
 * @property {number} Cmd_Hall_ReqLogin=2000 Cmd_Hall_ReqLogin value
 * @property {number} Cmd_Hall_PushLogin=2001 Cmd_Hall_PushLogin value
 * @property {number} Cmd_Hall_PushApiCallBackMessage=2002 Cmd_Hall_PushApiCallBackMessage value
 */
$root.SubCmd = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "Cmd_ReqHeartBeat"] = 0;
    values[valuesById[1] = "Cmd_PushHeartBeat"] = 1;
    values[valuesById[404] = "Cmd_Error"] = 404;
    values[valuesById[1000] = "Cmd_Slot_ReqLogin"] = 1000;
    values[valuesById[1001] = "Cmd_Slot_PushLogin"] = 1001;
    values[valuesById[1002] = "Cmd_Slot_ReqBet"] = 1002;
    values[valuesById[1003] = "Cmd_Slot_PushBetResult"] = 1003;
    values[valuesById[1004] = "Cmd_Slot_ReqSettlementBounsSuccess"] = 1004;
    values[valuesById[1005] = "Cmd_Slot_PushSettlementBounsSuccess"] = 1005;
    values[valuesById[1006] = "Cmd_Slot_ReqChooseSubGame"] = 1006;
    values[valuesById[1007] = "Cmd_Slot_PushChooseSubGame"] = 1007;
    values[valuesById[1008] = "Cmd_Slot_ReqAcceptCollectAward"] = 1008;
    values[valuesById[1009] = "Cmd_Slot_PushAcceptCollectAward"] = 1009;
    values[valuesById[1010] = "Cmd_Slot_ReqCollectShopExchangeAward"] = 1010;
    values[valuesById[1011] = "Cmd_Slot_PushCollectShopExchangeAward"] = 1011;
    values[valuesById[1012] = "Cmd_Slot_ReqBingoReward"] = 1012;
    values[valuesById[1013] = "Cmd_Slot_PushBingoReward"] = 1013;
    values[valuesById[1014] = "Cmd_Slot_ReqJackpotAmount"] = 1014;
    values[valuesById[1015] = "Cmd_Slot_PushJackpotAmount"] = 1015;
    values[valuesById[1016] = "Cmd_Slot_ReqLastBetInfo"] = 1016;
    values[valuesById[1017] = "Cmd_Slot_PushLastBetInfo"] = 1017;
    values[valuesById[2000] = "Cmd_Hall_ReqLogin"] = 2000;
    values[valuesById[2001] = "Cmd_Hall_PushLogin"] = 2001;
    values[valuesById[2002] = "Cmd_Hall_PushApiCallBackMessage"] = 2002;
    return values;
})();

$root.ReqHeartBeat = (function() {

    /**
     * Properties of a ReqHeartBeat.
     * @exports IReqHeartBeat
     * @interface IReqHeartBeat
     */

    /**
     * Constructs a new ReqHeartBeat.
     * @exports ReqHeartBeat
     * @classdesc Represents a ReqHeartBeat.
     * @implements IReqHeartBeat
     * @constructor
     * @param {IReqHeartBeat=} [properties] Properties to set
     */
    function ReqHeartBeat(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Creates a new ReqHeartBeat instance using the specified properties.
     * @function create
     * @memberof ReqHeartBeat
     * @static
     * @param {IReqHeartBeat=} [properties] Properties to set
     * @returns {ReqHeartBeat} ReqHeartBeat instance
     */
    ReqHeartBeat.create = function create(properties) {
        return new ReqHeartBeat(properties);
    };

    /**
     * Encodes the specified ReqHeartBeat message. Does not implicitly {@link ReqHeartBeat.verify|verify} messages.
     * @function encode
     * @memberof ReqHeartBeat
     * @static
     * @param {IReqHeartBeat} message ReqHeartBeat message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ReqHeartBeat.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        return writer;
    };

    /**
     * Encodes the specified ReqHeartBeat message, length delimited. Does not implicitly {@link ReqHeartBeat.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ReqHeartBeat
     * @static
     * @param {IReqHeartBeat} message ReqHeartBeat message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ReqHeartBeat.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ReqHeartBeat message from the specified reader or buffer.
     * @function decode
     * @memberof ReqHeartBeat
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ReqHeartBeat} ReqHeartBeat
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ReqHeartBeat.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ReqHeartBeat();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a ReqHeartBeat message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ReqHeartBeat
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ReqHeartBeat} ReqHeartBeat
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ReqHeartBeat.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ReqHeartBeat message.
     * @function verify
     * @memberof ReqHeartBeat
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ReqHeartBeat.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        return null;
    };

    /**
     * Creates a ReqHeartBeat message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ReqHeartBeat
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ReqHeartBeat} ReqHeartBeat
     */
    ReqHeartBeat.fromObject = function fromObject(object) {
        if (object instanceof $root.ReqHeartBeat)
            return object;
        return new $root.ReqHeartBeat();
    };

    /**
     * Creates a plain object from a ReqHeartBeat message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ReqHeartBeat
     * @static
     * @param {ReqHeartBeat} message ReqHeartBeat
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ReqHeartBeat.toObject = function toObject() {
        return {};
    };

    /**
     * Converts this ReqHeartBeat to JSON.
     * @function toJSON
     * @memberof ReqHeartBeat
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ReqHeartBeat.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ReqHeartBeat;
})();

$root.PushHeartBeat = (function() {

    /**
     * Properties of a PushHeartBeat.
     * @exports IPushHeartBeat
     * @interface IPushHeartBeat
     * @property {number|Long|null} [serverTime] PushHeartBeat serverTime
     */

    /**
     * Constructs a new PushHeartBeat.
     * @exports PushHeartBeat
     * @classdesc Represents a PushHeartBeat.
     * @implements IPushHeartBeat
     * @constructor
     * @param {IPushHeartBeat=} [properties] Properties to set
     */
    function PushHeartBeat(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * PushHeartBeat serverTime.
     * @member {number|Long} serverTime
     * @memberof PushHeartBeat
     * @instance
     */
    PushHeartBeat.prototype.serverTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new PushHeartBeat instance using the specified properties.
     * @function create
     * @memberof PushHeartBeat
     * @static
     * @param {IPushHeartBeat=} [properties] Properties to set
     * @returns {PushHeartBeat} PushHeartBeat instance
     */
    PushHeartBeat.create = function create(properties) {
        return new PushHeartBeat(properties);
    };

    /**
     * Encodes the specified PushHeartBeat message. Does not implicitly {@link PushHeartBeat.verify|verify} messages.
     * @function encode
     * @memberof PushHeartBeat
     * @static
     * @param {IPushHeartBeat} message PushHeartBeat message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PushHeartBeat.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.serverTime != null && Object.hasOwnProperty.call(message, "serverTime"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.serverTime);
        return writer;
    };

    /**
     * Encodes the specified PushHeartBeat message, length delimited. Does not implicitly {@link PushHeartBeat.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PushHeartBeat
     * @static
     * @param {IPushHeartBeat} message PushHeartBeat message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PushHeartBeat.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PushHeartBeat message from the specified reader or buffer.
     * @function decode
     * @memberof PushHeartBeat
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PushHeartBeat} PushHeartBeat
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PushHeartBeat.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PushHeartBeat();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.serverTime = reader.int64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a PushHeartBeat message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PushHeartBeat
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PushHeartBeat} PushHeartBeat
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PushHeartBeat.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a PushHeartBeat message.
     * @function verify
     * @memberof PushHeartBeat
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    PushHeartBeat.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.serverTime != null && message.hasOwnProperty("serverTime"))
            if (!$util.isInteger(message.serverTime) && !(message.serverTime && $util.isInteger(message.serverTime.low) && $util.isInteger(message.serverTime.high)))
                return "serverTime: integer|Long expected";
        return null;
    };

    /**
     * Creates a PushHeartBeat message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PushHeartBeat
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {PushHeartBeat} PushHeartBeat
     */
    PushHeartBeat.fromObject = function fromObject(object) {
        if (object instanceof $root.PushHeartBeat)
            return object;
        var message = new $root.PushHeartBeat();
        if (object.serverTime != null)
            if ($util.Long)
                (message.serverTime = $util.Long.fromValue(object.serverTime)).unsigned = false;
            else if (typeof object.serverTime === "string")
                message.serverTime = parseInt(object.serverTime, 10);
            else if (typeof object.serverTime === "number")
                message.serverTime = object.serverTime;
            else if (typeof object.serverTime === "object")
                message.serverTime = new $util.LongBits(object.serverTime.low >>> 0, object.serverTime.high >>> 0).toNumber();
        return message;
    };

    /**
     * Creates a plain object from a PushHeartBeat message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PushHeartBeat
     * @static
     * @param {PushHeartBeat} message PushHeartBeat
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PushHeartBeat.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.serverTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.serverTime = options.longs === String ? "0" : 0;
        if (message.serverTime != null && message.hasOwnProperty("serverTime"))
            if (typeof message.serverTime === "number")
                object.serverTime = options.longs === String ? String(message.serverTime) : message.serverTime;
            else
                object.serverTime = options.longs === String ? $util.Long.prototype.toString.call(message.serverTime) : options.longs === Number ? new $util.LongBits(message.serverTime.low >>> 0, message.serverTime.high >>> 0).toNumber() : message.serverTime;
        return object;
    };

    /**
     * Converts this PushHeartBeat to JSON.
     * @function toJSON
     * @memberof PushHeartBeat
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PushHeartBeat.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PushHeartBeat;
})();

module.exports = $root;
