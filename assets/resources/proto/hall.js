/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.Hall_ReqLogin = (function() {

    /**
     * Properties of a Hall_ReqLogin.
     * @exports IHall_ReqLogin
     * @interface IHall_ReqLogin
     * @property {string|null} [pid] Hall_ReqLogin pid
     * @property {string|null} [token] Hall_ReqLogin token
     * @property {string|null} [version] Hall_ReqLogin version
     * @property {number|null} [maskingKey] Hall_ReqLogin maskingKey
     */

    /**
     * Constructs a new Hall_ReqLogin.
     * @exports Hall_ReqLogin
     * @classdesc Represents a Hall_ReqLogin.
     * @implements IHall_ReqLogin
     * @constructor
     * @param {IHall_ReqLogin=} [properties] Properties to set
     */
    function Hall_ReqLogin(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Hall_ReqLogin pid.
     * @member {string} pid
     * @memberof Hall_ReqLogin
     * @instance
     */
    Hall_ReqLogin.prototype.pid = "";

    /**
     * Hall_ReqLogin token.
     * @member {string} token
     * @memberof Hall_ReqLogin
     * @instance
     */
    Hall_ReqLogin.prototype.token = "";

    /**
     * Hall_ReqLogin version.
     * @member {string} version
     * @memberof Hall_ReqLogin
     * @instance
     */
    Hall_ReqLogin.prototype.version = "";

    /**
     * Hall_ReqLogin maskingKey.
     * @member {number} maskingKey
     * @memberof Hall_ReqLogin
     * @instance
     */
    Hall_ReqLogin.prototype.maskingKey = 0;

    /**
     * Creates a new Hall_ReqLogin instance using the specified properties.
     * @function create
     * @memberof Hall_ReqLogin
     * @static
     * @param {IHall_ReqLogin=} [properties] Properties to set
     * @returns {Hall_ReqLogin} Hall_ReqLogin instance
     */
    Hall_ReqLogin.create = function create(properties) {
        return new Hall_ReqLogin(properties);
    };

    /**
     * Encodes the specified Hall_ReqLogin message. Does not implicitly {@link Hall_ReqLogin.verify|verify} messages.
     * @function encode
     * @memberof Hall_ReqLogin
     * @static
     * @param {IHall_ReqLogin} message Hall_ReqLogin message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Hall_ReqLogin.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.pid != null && Object.hasOwnProperty.call(message, "pid"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.pid);
        if (message.token != null && Object.hasOwnProperty.call(message, "token"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.token);
        if (message.version != null && Object.hasOwnProperty.call(message, "version"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.version);
        if (message.maskingKey != null && Object.hasOwnProperty.call(message, "maskingKey"))
            writer.uint32(/* id 6, wireType 0 =*/48).int32(message.maskingKey);
        return writer;
    };

    /**
     * Encodes the specified Hall_ReqLogin message, length delimited. Does not implicitly {@link Hall_ReqLogin.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Hall_ReqLogin
     * @static
     * @param {IHall_ReqLogin} message Hall_ReqLogin message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Hall_ReqLogin.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Hall_ReqLogin message from the specified reader or buffer.
     * @function decode
     * @memberof Hall_ReqLogin
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Hall_ReqLogin} Hall_ReqLogin
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Hall_ReqLogin.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Hall_ReqLogin();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.pid = reader.string();
                break;
            case 2:
                message.token = reader.string();
                break;
            case 5:
                message.version = reader.string();
                break;
            case 6:
                message.maskingKey = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Hall_ReqLogin message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Hall_ReqLogin
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Hall_ReqLogin} Hall_ReqLogin
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Hall_ReqLogin.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Hall_ReqLogin message.
     * @function verify
     * @memberof Hall_ReqLogin
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Hall_ReqLogin.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.pid != null && message.hasOwnProperty("pid"))
            if (!$util.isString(message.pid))
                return "pid: string expected";
        if (message.token != null && message.hasOwnProperty("token"))
            if (!$util.isString(message.token))
                return "token: string expected";
        if (message.version != null && message.hasOwnProperty("version"))
            if (!$util.isString(message.version))
                return "version: string expected";
        if (message.maskingKey != null && message.hasOwnProperty("maskingKey"))
            if (!$util.isInteger(message.maskingKey))
                return "maskingKey: integer expected";
        return null;
    };

    /**
     * Creates a Hall_ReqLogin message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Hall_ReqLogin
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Hall_ReqLogin} Hall_ReqLogin
     */
    Hall_ReqLogin.fromObject = function fromObject(object) {
        if (object instanceof $root.Hall_ReqLogin)
            return object;
        var message = new $root.Hall_ReqLogin();
        if (object.pid != null)
            message.pid = String(object.pid);
        if (object.token != null)
            message.token = String(object.token);
        if (object.version != null)
            message.version = String(object.version);
        if (object.maskingKey != null)
            message.maskingKey = object.maskingKey | 0;
        return message;
    };

    /**
     * Creates a plain object from a Hall_ReqLogin message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Hall_ReqLogin
     * @static
     * @param {Hall_ReqLogin} message Hall_ReqLogin
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Hall_ReqLogin.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.pid = "";
            object.token = "";
            object.version = "";
            object.maskingKey = 0;
        }
        if (message.pid != null && message.hasOwnProperty("pid"))
            object.pid = message.pid;
        if (message.token != null && message.hasOwnProperty("token"))
            object.token = message.token;
        if (message.version != null && message.hasOwnProperty("version"))
            object.version = message.version;
        if (message.maskingKey != null && message.hasOwnProperty("maskingKey"))
            object.maskingKey = message.maskingKey;
        return object;
    };

    /**
     * Converts this Hall_ReqLogin to JSON.
     * @function toJSON
     * @memberof Hall_ReqLogin
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Hall_ReqLogin.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Hall_ReqLogin;
})();

$root.Hall_PushLogin = (function() {

    /**
     * Properties of a Hall_PushLogin.
     * @exports IHall_PushLogin
     * @interface IHall_PushLogin
     */

    /**
     * Constructs a new Hall_PushLogin.
     * @exports Hall_PushLogin
     * @classdesc Represents a Hall_PushLogin.
     * @implements IHall_PushLogin
     * @constructor
     * @param {IHall_PushLogin=} [properties] Properties to set
     */
    function Hall_PushLogin(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Creates a new Hall_PushLogin instance using the specified properties.
     * @function create
     * @memberof Hall_PushLogin
     * @static
     * @param {IHall_PushLogin=} [properties] Properties to set
     * @returns {Hall_PushLogin} Hall_PushLogin instance
     */
    Hall_PushLogin.create = function create(properties) {
        return new Hall_PushLogin(properties);
    };

    /**
     * Encodes the specified Hall_PushLogin message. Does not implicitly {@link Hall_PushLogin.verify|verify} messages.
     * @function encode
     * @memberof Hall_PushLogin
     * @static
     * @param {IHall_PushLogin} message Hall_PushLogin message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Hall_PushLogin.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        return writer;
    };

    /**
     * Encodes the specified Hall_PushLogin message, length delimited. Does not implicitly {@link Hall_PushLogin.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Hall_PushLogin
     * @static
     * @param {IHall_PushLogin} message Hall_PushLogin message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Hall_PushLogin.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Hall_PushLogin message from the specified reader or buffer.
     * @function decode
     * @memberof Hall_PushLogin
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Hall_PushLogin} Hall_PushLogin
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Hall_PushLogin.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Hall_PushLogin();
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
     * Decodes a Hall_PushLogin message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Hall_PushLogin
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Hall_PushLogin} Hall_PushLogin
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Hall_PushLogin.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Hall_PushLogin message.
     * @function verify
     * @memberof Hall_PushLogin
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Hall_PushLogin.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        return null;
    };

    /**
     * Creates a Hall_PushLogin message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Hall_PushLogin
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Hall_PushLogin} Hall_PushLogin
     */
    Hall_PushLogin.fromObject = function fromObject(object) {
        if (object instanceof $root.Hall_PushLogin)
            return object;
        return new $root.Hall_PushLogin();
    };

    /**
     * Creates a plain object from a Hall_PushLogin message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Hall_PushLogin
     * @static
     * @param {Hall_PushLogin} message Hall_PushLogin
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Hall_PushLogin.toObject = function toObject() {
        return {};
    };

    /**
     * Converts this Hall_PushLogin to JSON.
     * @function toJSON
     * @memberof Hall_PushLogin
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Hall_PushLogin.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Hall_PushLogin;
})();

$root.Hall_PushApiCallBackMessage = (function() {

    /**
     * Properties of a Hall_PushApiCallBackMessage.
     * @exports IHall_PushApiCallBackMessage
     * @interface IHall_PushApiCallBackMessage
     * @property {string|null} [jsondata] Hall_PushApiCallBackMessage jsondata
     */

    /**
     * Constructs a new Hall_PushApiCallBackMessage.
     * @exports Hall_PushApiCallBackMessage
     * @classdesc Represents a Hall_PushApiCallBackMessage.
     * @implements IHall_PushApiCallBackMessage
     * @constructor
     * @param {IHall_PushApiCallBackMessage=} [properties] Properties to set
     */
    function Hall_PushApiCallBackMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Hall_PushApiCallBackMessage jsondata.
     * @member {string} jsondata
     * @memberof Hall_PushApiCallBackMessage
     * @instance
     */
    Hall_PushApiCallBackMessage.prototype.jsondata = "";

    /**
     * Creates a new Hall_PushApiCallBackMessage instance using the specified properties.
     * @function create
     * @memberof Hall_PushApiCallBackMessage
     * @static
     * @param {IHall_PushApiCallBackMessage=} [properties] Properties to set
     * @returns {Hall_PushApiCallBackMessage} Hall_PushApiCallBackMessage instance
     */
    Hall_PushApiCallBackMessage.create = function create(properties) {
        return new Hall_PushApiCallBackMessage(properties);
    };

    /**
     * Encodes the specified Hall_PushApiCallBackMessage message. Does not implicitly {@link Hall_PushApiCallBackMessage.verify|verify} messages.
     * @function encode
     * @memberof Hall_PushApiCallBackMessage
     * @static
     * @param {IHall_PushApiCallBackMessage} message Hall_PushApiCallBackMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Hall_PushApiCallBackMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.jsondata != null && Object.hasOwnProperty.call(message, "jsondata"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.jsondata);
        return writer;
    };

    /**
     * Encodes the specified Hall_PushApiCallBackMessage message, length delimited. Does not implicitly {@link Hall_PushApiCallBackMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Hall_PushApiCallBackMessage
     * @static
     * @param {IHall_PushApiCallBackMessage} message Hall_PushApiCallBackMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Hall_PushApiCallBackMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Hall_PushApiCallBackMessage message from the specified reader or buffer.
     * @function decode
     * @memberof Hall_PushApiCallBackMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Hall_PushApiCallBackMessage} Hall_PushApiCallBackMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Hall_PushApiCallBackMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Hall_PushApiCallBackMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 3:
                message.jsondata = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Hall_PushApiCallBackMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Hall_PushApiCallBackMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Hall_PushApiCallBackMessage} Hall_PushApiCallBackMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Hall_PushApiCallBackMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Hall_PushApiCallBackMessage message.
     * @function verify
     * @memberof Hall_PushApiCallBackMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Hall_PushApiCallBackMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.jsondata != null && message.hasOwnProperty("jsondata"))
            if (!$util.isString(message.jsondata))
                return "jsondata: string expected";
        return null;
    };

    /**
     * Creates a Hall_PushApiCallBackMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Hall_PushApiCallBackMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Hall_PushApiCallBackMessage} Hall_PushApiCallBackMessage
     */
    Hall_PushApiCallBackMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.Hall_PushApiCallBackMessage)
            return object;
        var message = new $root.Hall_PushApiCallBackMessage();
        if (object.jsondata != null)
            message.jsondata = String(object.jsondata);
        return message;
    };

    /**
     * Creates a plain object from a Hall_PushApiCallBackMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Hall_PushApiCallBackMessage
     * @static
     * @param {Hall_PushApiCallBackMessage} message Hall_PushApiCallBackMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Hall_PushApiCallBackMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.jsondata = "";
        if (message.jsondata != null && message.hasOwnProperty("jsondata"))
            object.jsondata = message.jsondata;
        return object;
    };

    /**
     * Converts this Hall_PushApiCallBackMessage to JSON.
     * @function toJSON
     * @memberof Hall_PushApiCallBackMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Hall_PushApiCallBackMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Hall_PushApiCallBackMessage;
})();

module.exports = $root;
