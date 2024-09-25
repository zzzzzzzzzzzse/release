/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

/**
 * SubGameType enum.
 * @exports SubGameType
 * @enum {number}
 * @property {number} None=0 None value
 * @property {number} Base=1 Base value
 * @property {number} Base_Link=2 Base_Link value
 * @property {number} Free=3 Free value
 * @property {number} Bonus=4 Bonus value
 * @property {number} Free_Link=5 Free_Link value
 * @property {number} RandomWilds=6 RandomWilds value
 * @property {number} RespinUntilWin=7 RespinUntilWin value
 * @property {number} LockWildAward=8 LockWildAward value
 * @property {number} RandomOdds=9 RandomOdds value
 * @property {number} Bonus_choose=10 Bonus_choose value
 * @property {number} Collect_Free=11 Collect_Free value
 * @property {number} Bingo=12 Bingo value
 * @property {number} Mega_Bouns=13 Mega_Bouns value
 * @property {number} Super_Bouns=14 Super_Bouns value
 * @property {number} Super_Free=15 Super_Free value
 * @property {number} Free_choose=16 Free_choose value
 * @property {number} Rich_Green_Bonus=20 Rich_Green_Bonus value
 * @property {number} Rich_Purple_Bonus=21 Rich_Purple_Bonus value
 * @property {number} Rich_Red_Bonus=22 Rich_Red_Bonus value
 * @property {number} Rich_Green_Purple_Bonus=23 Rich_Green_Purple_Bonus value
 * @property {number} Rich_Green_Red_Bonus=24 Rich_Green_Red_Bonus value
 * @property {number} Rich_Purple_Red_Bonus=25 Rich_Purple_Red_Bonus value
 * @property {number} Rich_Green_Purple_Red_Bonus=26 Rich_Green_Purple_Red_Bonus value
 * @property {number} Wheel_Game=27 Wheel_Game value
 * @property {number} Collect_Subgame=28 Collect_Subgame value
 */
$root.SubGameType = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "None"] = 0;
    values[valuesById[1] = "Base"] = 1;
    values[valuesById[2] = "Base_Link"] = 2;
    values[valuesById[3] = "Free"] = 3;
    values[valuesById[4] = "Bonus"] = 4;
    values[valuesById[5] = "Free_Link"] = 5;
    values[valuesById[6] = "RandomWilds"] = 6;
    values[valuesById[7] = "RespinUntilWin"] = 7;
    values[valuesById[8] = "LockWildAward"] = 8;
    values[valuesById[9] = "RandomOdds"] = 9;
    values[valuesById[10] = "Bonus_choose"] = 10;
    values[valuesById[11] = "Collect_Free"] = 11;
    values[valuesById[12] = "Bingo"] = 12;
    values[valuesById[13] = "Mega_Bouns"] = 13;
    values[valuesById[14] = "Super_Bouns"] = 14;
    values[valuesById[15] = "Super_Free"] = 15;
    values[valuesById[16] = "Free_choose"] = 16;
    values[valuesById[20] = "Rich_Green_Bonus"] = 20;
    values[valuesById[21] = "Rich_Purple_Bonus"] = 21;
    values[valuesById[22] = "Rich_Red_Bonus"] = 22;
    values[valuesById[23] = "Rich_Green_Purple_Bonus"] = 23;
    values[valuesById[24] = "Rich_Green_Red_Bonus"] = 24;
    values[valuesById[25] = "Rich_Purple_Red_Bonus"] = 25;
    values[valuesById[26] = "Rich_Green_Purple_Red_Bonus"] = 26;
    values[valuesById[27] = "Wheel_Game"] = 27;
    values[valuesById[28] = "Collect_Subgame"] = 28;
    return values;
})();

/**
 * GameDataKey enum.
 * @exports GameDataKey
 * @enum {number}
 * @property {number} GAMEDATATYPE_NONE=0 GAMEDATATYPE_NONE value
 * @property {number} GREEN_BOX=1 GREEN_BOX value
 * @property {number} PURPLE_BOX=2 PURPLE_BOX value
 * @property {number} RED_BOX=3 RED_BOX value
 */
$root.GameDataKey = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "GAMEDATATYPE_NONE"] = 0;
    values[valuesById[1] = "GREEN_BOX"] = 1;
    values[valuesById[2] = "PURPLE_BOX"] = 2;
    values[valuesById[3] = "RED_BOX"] = 3;
    return values;
})();

/**
 * SubGameStatus enum.
 * @exports SubGameStatus
 * @enum {number}
 * @property {number} Normal=0 Normal value
 * @property {number} Reward=1 Reward value
 * @property {number} Choose=2 Choose value
 * @property {number} RewardBingo=3 RewardBingo value
 */
$root.SubGameStatus = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "Normal"] = 0;
    values[valuesById[1] = "Reward"] = 1;
    values[valuesById[2] = "Choose"] = 2;
    values[valuesById[3] = "RewardBingo"] = 3;
    return values;
})();

/**
 * PoolType enum.
 * @exports PoolType
 * @enum {number}
 * @property {number} POOL_NONE=0 POOL_NONE value
 * @property {number} GRAND=1 GRAND value
 * @property {number} MAJOR=2 MAJOR value
 * @property {number} MINOR=3 MINOR value
 * @property {number} MINI=4 MINI value
 * @property {number} MEGA=5 MEGA value
 * @property {number} MAXI=6 MAXI value
 */
$root.PoolType = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "POOL_NONE"] = 0;
    values[valuesById[1] = "GRAND"] = 1;
    values[valuesById[2] = "MAJOR"] = 2;
    values[valuesById[3] = "MINOR"] = 3;
    values[valuesById[4] = "MINI"] = 4;
    values[valuesById[5] = "MEGA"] = 5;
    values[valuesById[6] = "MAXI"] = 6;
    return values;
})();

/**
 * RewardType enum.
 * @exports RewardType
 * @enum {number}
 * @property {number} Reward_NONE=0 Reward_NONE value
 * @property {number} BONUS_COUNT=6 BONUS_COUNT value
 * @property {number} Pool=7 Pool value
 * @property {number} Money=9 Money value
 * @property {number} SubGame=10 SubGame value
 * @property {number} JackpotUp=15 JackpotUp value
 * @property {number} Collect1=16 Collect1 value
 * @property {number} Collect2=17 Collect2 value
 * @property {number} Collect3=18 Collect3 value
 * @property {number} Multiple=19 Multiple value
 * @property {number} Addition=20 Addition value
 * @property {number} AddReel=21 AddReel value
 * @property {number} AddRow=22 AddRow value
 * @property {number} AddProbability=23 AddProbability value
 */
$root.RewardType = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "Reward_NONE"] = 0;
    values[valuesById[6] = "BONUS_COUNT"] = 6;
    values[valuesById[7] = "Pool"] = 7;
    values[valuesById[9] = "Money"] = 9;
    values[valuesById[10] = "SubGame"] = 10;
    values[valuesById[15] = "JackpotUp"] = 15;
    values[valuesById[16] = "Collect1"] = 16;
    values[valuesById[17] = "Collect2"] = 17;
    values[valuesById[18] = "Collect3"] = 18;
    values[valuesById[19] = "Multiple"] = 19;
    values[valuesById[20] = "Addition"] = 20;
    values[valuesById[21] = "AddReel"] = 21;
    values[valuesById[22] = "AddRow"] = 22;
    values[valuesById[23] = "AddProbability"] = 23;
    return values;
})();

/**
 * Lange enum.
 * @exports Lange
 * @enum {number}
 * @property {number} En=0 En value
 * @property {number} Hindi=1 Hindi value
 */
$root.Lange = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "En"] = 0;
    values[valuesById[1] = "Hindi"] = 1;
    return values;
})();

$root.Slot_ReqLogin = (function() {

    /**
     * Properties of a Slot_ReqLogin.
     * @exports ISlot_ReqLogin
     * @interface ISlot_ReqLogin
     * @property {string|null} [pid] Slot_ReqLogin pid
     * @property {string|null} [token] Slot_ReqLogin token
     * @property {number|null} [gameId] Slot_ReqLogin gameId
     * @property {number|null} [lang] Slot_ReqLogin lang
     * @property {string|null} [version] Slot_ReqLogin version
     * @property {number|null} [maskingKey] Slot_ReqLogin maskingKey
     * @property {number|null} [channel] Slot_ReqLogin channel
     */

    /**
     * Constructs a new Slot_ReqLogin.
     * @exports Slot_ReqLogin
     * @classdesc Represents a Slot_ReqLogin.
     * @implements ISlot_ReqLogin
     * @constructor
     * @param {ISlot_ReqLogin=} [properties] Properties to set
     */
    function Slot_ReqLogin(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Slot_ReqLogin pid.
     * @member {string} pid
     * @memberof Slot_ReqLogin
     * @instance
     */
    Slot_ReqLogin.prototype.pid = "";

    /**
     * Slot_ReqLogin token.
     * @member {string} token
     * @memberof Slot_ReqLogin
     * @instance
     */
    Slot_ReqLogin.prototype.token = "";

    /**
     * Slot_ReqLogin gameId.
     * @member {number} gameId
     * @memberof Slot_ReqLogin
     * @instance
     */
    Slot_ReqLogin.prototype.gameId = 0;

    /**
     * Slot_ReqLogin lang.
     * @member {number} lang
     * @memberof Slot_ReqLogin
     * @instance
     */
    Slot_ReqLogin.prototype.lang = 0;

    /**
     * Slot_ReqLogin version.
     * @member {string} version
     * @memberof Slot_ReqLogin
     * @instance
     */
    Slot_ReqLogin.prototype.version = "";

    /**
     * Slot_ReqLogin maskingKey.
     * @member {number} maskingKey
     * @memberof Slot_ReqLogin
     * @instance
     */
    Slot_ReqLogin.prototype.maskingKey = 0;

    /**
     * Slot_ReqLogin channel.
     * @member {number} channel
     * @memberof Slot_ReqLogin
     * @instance
     */
    Slot_ReqLogin.prototype.channel = 0;

    /**
     * Creates a new Slot_ReqLogin instance using the specified properties.
     * @function create
     * @memberof Slot_ReqLogin
     * @static
     * @param {ISlot_ReqLogin=} [properties] Properties to set
     * @returns {Slot_ReqLogin} Slot_ReqLogin instance
     */
    Slot_ReqLogin.create = function create(properties) {
        return new Slot_ReqLogin(properties);
    };

    /**
     * Encodes the specified Slot_ReqLogin message. Does not implicitly {@link Slot_ReqLogin.verify|verify} messages.
     * @function encode
     * @memberof Slot_ReqLogin
     * @static
     * @param {ISlot_ReqLogin} message Slot_ReqLogin message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_ReqLogin.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.pid != null && Object.hasOwnProperty.call(message, "pid"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.pid);
        if (message.token != null && Object.hasOwnProperty.call(message, "token"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.token);
        if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.gameId);
        if (message.lang != null && Object.hasOwnProperty.call(message, "lang"))
            writer.uint32(/* id 4, wireType 0 =*/32).int32(message.lang);
        if (message.version != null && Object.hasOwnProperty.call(message, "version"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.version);
        if (message.maskingKey != null && Object.hasOwnProperty.call(message, "maskingKey"))
            writer.uint32(/* id 6, wireType 0 =*/48).int32(message.maskingKey);
        if (message.channel != null && Object.hasOwnProperty.call(message, "channel"))
            writer.uint32(/* id 7, wireType 0 =*/56).int32(message.channel);
        return writer;
    };

    /**
     * Encodes the specified Slot_ReqLogin message, length delimited. Does not implicitly {@link Slot_ReqLogin.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Slot_ReqLogin
     * @static
     * @param {ISlot_ReqLogin} message Slot_ReqLogin message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_ReqLogin.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Slot_ReqLogin message from the specified reader or buffer.
     * @function decode
     * @memberof Slot_ReqLogin
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Slot_ReqLogin} Slot_ReqLogin
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_ReqLogin.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Slot_ReqLogin();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.pid = reader.string();
                break;
            case 2:
                message.token = reader.string();
                break;
            case 3:
                message.gameId = reader.int32();
                break;
            case 4:
                message.lang = reader.int32();
                break;
            case 5:
                message.version = reader.string();
                break;
            case 6:
                message.maskingKey = reader.int32();
                break;
            case 7:
                message.channel = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Slot_ReqLogin message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Slot_ReqLogin
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Slot_ReqLogin} Slot_ReqLogin
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_ReqLogin.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Slot_ReqLogin message.
     * @function verify
     * @memberof Slot_ReqLogin
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Slot_ReqLogin.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.pid != null && message.hasOwnProperty("pid"))
            if (!$util.isString(message.pid))
                return "pid: string expected";
        if (message.token != null && message.hasOwnProperty("token"))
            if (!$util.isString(message.token))
                return "token: string expected";
        if (message.gameId != null && message.hasOwnProperty("gameId"))
            if (!$util.isInteger(message.gameId))
                return "gameId: integer expected";
        if (message.lang != null && message.hasOwnProperty("lang"))
            if (!$util.isInteger(message.lang))
                return "lang: integer expected";
        if (message.version != null && message.hasOwnProperty("version"))
            if (!$util.isString(message.version))
                return "version: string expected";
        if (message.maskingKey != null && message.hasOwnProperty("maskingKey"))
            if (!$util.isInteger(message.maskingKey))
                return "maskingKey: integer expected";
        if (message.channel != null && message.hasOwnProperty("channel"))
            if (!$util.isInteger(message.channel))
                return "channel: integer expected";
        return null;
    };

    /**
     * Creates a Slot_ReqLogin message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Slot_ReqLogin
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Slot_ReqLogin} Slot_ReqLogin
     */
    Slot_ReqLogin.fromObject = function fromObject(object) {
        if (object instanceof $root.Slot_ReqLogin)
            return object;
        var message = new $root.Slot_ReqLogin();
        if (object.pid != null)
            message.pid = String(object.pid);
        if (object.token != null)
            message.token = String(object.token);
        if (object.gameId != null)
            message.gameId = object.gameId | 0;
        if (object.lang != null)
            message.lang = object.lang | 0;
        if (object.version != null)
            message.version = String(object.version);
        if (object.maskingKey != null)
            message.maskingKey = object.maskingKey | 0;
        if (object.channel != null)
            message.channel = object.channel | 0;
        return message;
    };

    /**
     * Creates a plain object from a Slot_ReqLogin message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Slot_ReqLogin
     * @static
     * @param {Slot_ReqLogin} message Slot_ReqLogin
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Slot_ReqLogin.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.pid = "";
            object.token = "";
            object.gameId = 0;
            object.lang = 0;
            object.version = "";
            object.maskingKey = 0;
            object.channel = 0;
        }
        if (message.pid != null && message.hasOwnProperty("pid"))
            object.pid = message.pid;
        if (message.token != null && message.hasOwnProperty("token"))
            object.token = message.token;
        if (message.gameId != null && message.hasOwnProperty("gameId"))
            object.gameId = message.gameId;
        if (message.lang != null && message.hasOwnProperty("lang"))
            object.lang = message.lang;
        if (message.version != null && message.hasOwnProperty("version"))
            object.version = message.version;
        if (message.maskingKey != null && message.hasOwnProperty("maskingKey"))
            object.maskingKey = message.maskingKey;
        if (message.channel != null && message.hasOwnProperty("channel"))
            object.channel = message.channel;
        return object;
    };

    /**
     * Converts this Slot_ReqLogin to JSON.
     * @function toJSON
     * @memberof Slot_ReqLogin
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Slot_ReqLogin.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Slot_ReqLogin;
})();

$root.Slot_PushLogin = (function() {

    /**
     * Properties of a Slot_PushLogin.
     * @exports ISlot_PushLogin
     * @interface ISlot_PushLogin
     * @property {number|null} [gameId] Slot_PushLogin gameId
     * @property {Array.<ISlot_SubGameInfo>|null} [subGameInfos] Slot_PushLogin subGameInfos
     * @property {ISlot_PlayerCollectInfo|null} [playerCollectInfo] Slot_PushLogin playerCollectInfo
     * @property {Array.<ISlot_BetkeyMap>|null} [betkeyMap] Slot_PushLogin betkeyMap
     * @property {Array.<ISlot_GlobalMap>|null} [globalMap] Slot_PushLogin globalMap
     * @property {ISlot_PushBetResult|null} [lastBetInfo] Slot_PushLogin lastBetInfo
     */

    /**
     * Constructs a new Slot_PushLogin.
     * @exports Slot_PushLogin
     * @classdesc Represents a Slot_PushLogin.
     * @implements ISlot_PushLogin
     * @constructor
     * @param {ISlot_PushLogin=} [properties] Properties to set
     */
    function Slot_PushLogin(properties) {
        this.subGameInfos = [];
        this.betkeyMap = [];
        this.globalMap = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Slot_PushLogin gameId.
     * @member {number} gameId
     * @memberof Slot_PushLogin
     * @instance
     */
    Slot_PushLogin.prototype.gameId = 0;

    /**
     * Slot_PushLogin subGameInfos.
     * @member {Array.<ISlot_SubGameInfo>} subGameInfos
     * @memberof Slot_PushLogin
     * @instance
     */
    Slot_PushLogin.prototype.subGameInfos = $util.emptyArray;

    /**
     * Slot_PushLogin playerCollectInfo.
     * @member {ISlot_PlayerCollectInfo|null|undefined} playerCollectInfo
     * @memberof Slot_PushLogin
     * @instance
     */
    Slot_PushLogin.prototype.playerCollectInfo = null;

    /**
     * Slot_PushLogin betkeyMap.
     * @member {Array.<ISlot_BetkeyMap>} betkeyMap
     * @memberof Slot_PushLogin
     * @instance
     */
    Slot_PushLogin.prototype.betkeyMap = $util.emptyArray;

    /**
     * Slot_PushLogin globalMap.
     * @member {Array.<ISlot_GlobalMap>} globalMap
     * @memberof Slot_PushLogin
     * @instance
     */
    Slot_PushLogin.prototype.globalMap = $util.emptyArray;

    /**
     * Slot_PushLogin lastBetInfo.
     * @member {ISlot_PushBetResult|null|undefined} lastBetInfo
     * @memberof Slot_PushLogin
     * @instance
     */
    Slot_PushLogin.prototype.lastBetInfo = null;

    /**
     * Creates a new Slot_PushLogin instance using the specified properties.
     * @function create
     * @memberof Slot_PushLogin
     * @static
     * @param {ISlot_PushLogin=} [properties] Properties to set
     * @returns {Slot_PushLogin} Slot_PushLogin instance
     */
    Slot_PushLogin.create = function create(properties) {
        return new Slot_PushLogin(properties);
    };

    /**
     * Encodes the specified Slot_PushLogin message. Does not implicitly {@link Slot_PushLogin.verify|verify} messages.
     * @function encode
     * @memberof Slot_PushLogin
     * @static
     * @param {ISlot_PushLogin} message Slot_PushLogin message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_PushLogin.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.gameId);
        if (message.subGameInfos != null && message.subGameInfos.length)
            for (var i = 0; i < message.subGameInfos.length; ++i)
                $root.Slot_SubGameInfo.encode(message.subGameInfos[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.playerCollectInfo != null && Object.hasOwnProperty.call(message, "playerCollectInfo"))
            $root.Slot_PlayerCollectInfo.encode(message.playerCollectInfo, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.betkeyMap != null && message.betkeyMap.length)
            for (var i = 0; i < message.betkeyMap.length; ++i)
                $root.Slot_BetkeyMap.encode(message.betkeyMap[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        if (message.globalMap != null && message.globalMap.length)
            for (var i = 0; i < message.globalMap.length; ++i)
                $root.Slot_GlobalMap.encode(message.globalMap[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        if (message.lastBetInfo != null && Object.hasOwnProperty.call(message, "lastBetInfo"))
            $root.Slot_PushBetResult.encode(message.lastBetInfo, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Slot_PushLogin message, length delimited. Does not implicitly {@link Slot_PushLogin.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Slot_PushLogin
     * @static
     * @param {ISlot_PushLogin} message Slot_PushLogin message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_PushLogin.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Slot_PushLogin message from the specified reader or buffer.
     * @function decode
     * @memberof Slot_PushLogin
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Slot_PushLogin} Slot_PushLogin
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_PushLogin.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Slot_PushLogin();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.gameId = reader.int32();
                break;
            case 2:
                if (!(message.subGameInfos && message.subGameInfos.length))
                    message.subGameInfos = [];
                message.subGameInfos.push($root.Slot_SubGameInfo.decode(reader, reader.uint32()));
                break;
            case 3:
                message.playerCollectInfo = $root.Slot_PlayerCollectInfo.decode(reader, reader.uint32());
                break;
            case 4:
                if (!(message.betkeyMap && message.betkeyMap.length))
                    message.betkeyMap = [];
                message.betkeyMap.push($root.Slot_BetkeyMap.decode(reader, reader.uint32()));
                break;
            case 5:
                if (!(message.globalMap && message.globalMap.length))
                    message.globalMap = [];
                message.globalMap.push($root.Slot_GlobalMap.decode(reader, reader.uint32()));
                break;
            case 6:
                message.lastBetInfo = $root.Slot_PushBetResult.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Slot_PushLogin message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Slot_PushLogin
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Slot_PushLogin} Slot_PushLogin
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_PushLogin.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Slot_PushLogin message.
     * @function verify
     * @memberof Slot_PushLogin
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Slot_PushLogin.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.gameId != null && message.hasOwnProperty("gameId"))
            if (!$util.isInteger(message.gameId))
                return "gameId: integer expected";
        if (message.subGameInfos != null && message.hasOwnProperty("subGameInfos")) {
            if (!Array.isArray(message.subGameInfos))
                return "subGameInfos: array expected";
            for (var i = 0; i < message.subGameInfos.length; ++i) {
                var error = $root.Slot_SubGameInfo.verify(message.subGameInfos[i]);
                if (error)
                    return "subGameInfos." + error;
            }
        }
        if (message.playerCollectInfo != null && message.hasOwnProperty("playerCollectInfo")) {
            var error = $root.Slot_PlayerCollectInfo.verify(message.playerCollectInfo);
            if (error)
                return "playerCollectInfo." + error;
        }
        if (message.betkeyMap != null && message.hasOwnProperty("betkeyMap")) {
            if (!Array.isArray(message.betkeyMap))
                return "betkeyMap: array expected";
            for (var i = 0; i < message.betkeyMap.length; ++i) {
                var error = $root.Slot_BetkeyMap.verify(message.betkeyMap[i]);
                if (error)
                    return "betkeyMap." + error;
            }
        }
        if (message.globalMap != null && message.hasOwnProperty("globalMap")) {
            if (!Array.isArray(message.globalMap))
                return "globalMap: array expected";
            for (var i = 0; i < message.globalMap.length; ++i) {
                var error = $root.Slot_GlobalMap.verify(message.globalMap[i]);
                if (error)
                    return "globalMap." + error;
            }
        }
        if (message.lastBetInfo != null && message.hasOwnProperty("lastBetInfo")) {
            var error = $root.Slot_PushBetResult.verify(message.lastBetInfo);
            if (error)
                return "lastBetInfo." + error;
        }
        return null;
    };

    /**
     * Creates a Slot_PushLogin message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Slot_PushLogin
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Slot_PushLogin} Slot_PushLogin
     */
    Slot_PushLogin.fromObject = function fromObject(object) {
        if (object instanceof $root.Slot_PushLogin)
            return object;
        var message = new $root.Slot_PushLogin();
        if (object.gameId != null)
            message.gameId = object.gameId | 0;
        if (object.subGameInfos) {
            if (!Array.isArray(object.subGameInfos))
                throw TypeError(".Slot_PushLogin.subGameInfos: array expected");
            message.subGameInfos = [];
            for (var i = 0; i < object.subGameInfos.length; ++i) {
                if (typeof object.subGameInfos[i] !== "object")
                    throw TypeError(".Slot_PushLogin.subGameInfos: object expected");
                message.subGameInfos[i] = $root.Slot_SubGameInfo.fromObject(object.subGameInfos[i]);
            }
        }
        if (object.playerCollectInfo != null) {
            if (typeof object.playerCollectInfo !== "object")
                throw TypeError(".Slot_PushLogin.playerCollectInfo: object expected");
            message.playerCollectInfo = $root.Slot_PlayerCollectInfo.fromObject(object.playerCollectInfo);
        }
        if (object.betkeyMap) {
            if (!Array.isArray(object.betkeyMap))
                throw TypeError(".Slot_PushLogin.betkeyMap: array expected");
            message.betkeyMap = [];
            for (var i = 0; i < object.betkeyMap.length; ++i) {
                if (typeof object.betkeyMap[i] !== "object")
                    throw TypeError(".Slot_PushLogin.betkeyMap: object expected");
                message.betkeyMap[i] = $root.Slot_BetkeyMap.fromObject(object.betkeyMap[i]);
            }
        }
        if (object.globalMap) {
            if (!Array.isArray(object.globalMap))
                throw TypeError(".Slot_PushLogin.globalMap: array expected");
            message.globalMap = [];
            for (var i = 0; i < object.globalMap.length; ++i) {
                if (typeof object.globalMap[i] !== "object")
                    throw TypeError(".Slot_PushLogin.globalMap: object expected");
                message.globalMap[i] = $root.Slot_GlobalMap.fromObject(object.globalMap[i]);
            }
        }
        if (object.lastBetInfo != null) {
            if (typeof object.lastBetInfo !== "object")
                throw TypeError(".Slot_PushLogin.lastBetInfo: object expected");
            message.lastBetInfo = $root.Slot_PushBetResult.fromObject(object.lastBetInfo);
        }
        return message;
    };

    /**
     * Creates a plain object from a Slot_PushLogin message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Slot_PushLogin
     * @static
     * @param {Slot_PushLogin} message Slot_PushLogin
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Slot_PushLogin.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults) {
            object.subGameInfos = [];
            object.betkeyMap = [];
            object.globalMap = [];
        }
        if (options.defaults) {
            object.gameId = 0;
            object.playerCollectInfo = null;
            object.lastBetInfo = null;
        }
        if (message.gameId != null && message.hasOwnProperty("gameId"))
            object.gameId = message.gameId;
        if (message.subGameInfos && message.subGameInfos.length) {
            object.subGameInfos = [];
            for (var j = 0; j < message.subGameInfos.length; ++j)
                object.subGameInfos[j] = $root.Slot_SubGameInfo.toObject(message.subGameInfos[j], options);
        }
        if (message.playerCollectInfo != null && message.hasOwnProperty("playerCollectInfo"))
            object.playerCollectInfo = $root.Slot_PlayerCollectInfo.toObject(message.playerCollectInfo, options);
        if (message.betkeyMap && message.betkeyMap.length) {
            object.betkeyMap = [];
            for (var j = 0; j < message.betkeyMap.length; ++j)
                object.betkeyMap[j] = $root.Slot_BetkeyMap.toObject(message.betkeyMap[j], options);
        }
        if (message.globalMap && message.globalMap.length) {
            object.globalMap = [];
            for (var j = 0; j < message.globalMap.length; ++j)
                object.globalMap[j] = $root.Slot_GlobalMap.toObject(message.globalMap[j], options);
        }
        if (message.lastBetInfo != null && message.hasOwnProperty("lastBetInfo"))
            object.lastBetInfo = $root.Slot_PushBetResult.toObject(message.lastBetInfo, options);
        return object;
    };

    /**
     * Converts this Slot_PushLogin to JSON.
     * @function toJSON
     * @memberof Slot_PushLogin
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Slot_PushLogin.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Slot_PushLogin;
})();

$root.Slot_GlobalMap = (function() {

    /**
     * Properties of a Slot_GlobalMap.
     * @exports ISlot_GlobalMap
     * @interface ISlot_GlobalMap
     * @property {number|null} [dataKey] Slot_GlobalMap dataKey
     * @property {number|Long|null} [dataValue] Slot_GlobalMap dataValue
     */

    /**
     * Constructs a new Slot_GlobalMap.
     * @exports Slot_GlobalMap
     * @classdesc Represents a Slot_GlobalMap.
     * @implements ISlot_GlobalMap
     * @constructor
     * @param {ISlot_GlobalMap=} [properties] Properties to set
     */
    function Slot_GlobalMap(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Slot_GlobalMap dataKey.
     * @member {number} dataKey
     * @memberof Slot_GlobalMap
     * @instance
     */
    Slot_GlobalMap.prototype.dataKey = 0;

    /**
     * Slot_GlobalMap dataValue.
     * @member {number|Long} dataValue
     * @memberof Slot_GlobalMap
     * @instance
     */
    Slot_GlobalMap.prototype.dataValue = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new Slot_GlobalMap instance using the specified properties.
     * @function create
     * @memberof Slot_GlobalMap
     * @static
     * @param {ISlot_GlobalMap=} [properties] Properties to set
     * @returns {Slot_GlobalMap} Slot_GlobalMap instance
     */
    Slot_GlobalMap.create = function create(properties) {
        return new Slot_GlobalMap(properties);
    };

    /**
     * Encodes the specified Slot_GlobalMap message. Does not implicitly {@link Slot_GlobalMap.verify|verify} messages.
     * @function encode
     * @memberof Slot_GlobalMap
     * @static
     * @param {ISlot_GlobalMap} message Slot_GlobalMap message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_GlobalMap.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.dataKey != null && Object.hasOwnProperty.call(message, "dataKey"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.dataKey);
        if (message.dataValue != null && Object.hasOwnProperty.call(message, "dataValue"))
            writer.uint32(/* id 2, wireType 0 =*/16).int64(message.dataValue);
        return writer;
    };

    /**
     * Encodes the specified Slot_GlobalMap message, length delimited. Does not implicitly {@link Slot_GlobalMap.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Slot_GlobalMap
     * @static
     * @param {ISlot_GlobalMap} message Slot_GlobalMap message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_GlobalMap.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Slot_GlobalMap message from the specified reader or buffer.
     * @function decode
     * @memberof Slot_GlobalMap
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Slot_GlobalMap} Slot_GlobalMap
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_GlobalMap.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Slot_GlobalMap();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.dataKey = reader.int32();
                break;
            case 2:
                message.dataValue = reader.int64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Slot_GlobalMap message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Slot_GlobalMap
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Slot_GlobalMap} Slot_GlobalMap
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_GlobalMap.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Slot_GlobalMap message.
     * @function verify
     * @memberof Slot_GlobalMap
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Slot_GlobalMap.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.dataKey != null && message.hasOwnProperty("dataKey"))
            if (!$util.isInteger(message.dataKey))
                return "dataKey: integer expected";
        if (message.dataValue != null && message.hasOwnProperty("dataValue"))
            if (!$util.isInteger(message.dataValue) && !(message.dataValue && $util.isInteger(message.dataValue.low) && $util.isInteger(message.dataValue.high)))
                return "dataValue: integer|Long expected";
        return null;
    };

    /**
     * Creates a Slot_GlobalMap message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Slot_GlobalMap
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Slot_GlobalMap} Slot_GlobalMap
     */
    Slot_GlobalMap.fromObject = function fromObject(object) {
        if (object instanceof $root.Slot_GlobalMap)
            return object;
        var message = new $root.Slot_GlobalMap();
        if (object.dataKey != null)
            message.dataKey = object.dataKey | 0;
        if (object.dataValue != null)
            if ($util.Long)
                (message.dataValue = $util.Long.fromValue(object.dataValue)).unsigned = false;
            else if (typeof object.dataValue === "string")
                message.dataValue = parseInt(object.dataValue, 10);
            else if (typeof object.dataValue === "number")
                message.dataValue = object.dataValue;
            else if (typeof object.dataValue === "object")
                message.dataValue = new $util.LongBits(object.dataValue.low >>> 0, object.dataValue.high >>> 0).toNumber();
        return message;
    };

    /**
     * Creates a plain object from a Slot_GlobalMap message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Slot_GlobalMap
     * @static
     * @param {Slot_GlobalMap} message Slot_GlobalMap
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Slot_GlobalMap.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.dataKey = 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.dataValue = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.dataValue = options.longs === String ? "0" : 0;
        }
        if (message.dataKey != null && message.hasOwnProperty("dataKey"))
            object.dataKey = message.dataKey;
        if (message.dataValue != null && message.hasOwnProperty("dataValue"))
            if (typeof message.dataValue === "number")
                object.dataValue = options.longs === String ? String(message.dataValue) : message.dataValue;
            else
                object.dataValue = options.longs === String ? $util.Long.prototype.toString.call(message.dataValue) : options.longs === Number ? new $util.LongBits(message.dataValue.low >>> 0, message.dataValue.high >>> 0).toNumber() : message.dataValue;
        return object;
    };

    /**
     * Converts this Slot_GlobalMap to JSON.
     * @function toJSON
     * @memberof Slot_GlobalMap
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Slot_GlobalMap.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Slot_GlobalMap;
})();

$root.Slot_BetkeyMap = (function() {

    /**
     * Properties of a Slot_BetkeyMap.
     * @exports ISlot_BetkeyMap
     * @interface ISlot_BetkeyMap
     * @property {number|null} [betKey] Slot_BetkeyMap betKey
     * @property {Array.<ISlot_SlotRewardSubject>|null} [slotRewards] Slot_BetkeyMap slotRewards
     */

    /**
     * Constructs a new Slot_BetkeyMap.
     * @exports Slot_BetkeyMap
     * @classdesc Represents a Slot_BetkeyMap.
     * @implements ISlot_BetkeyMap
     * @constructor
     * @param {ISlot_BetkeyMap=} [properties] Properties to set
     */
    function Slot_BetkeyMap(properties) {
        this.slotRewards = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Slot_BetkeyMap betKey.
     * @member {number} betKey
     * @memberof Slot_BetkeyMap
     * @instance
     */
    Slot_BetkeyMap.prototype.betKey = 0;

    /**
     * Slot_BetkeyMap slotRewards.
     * @member {Array.<ISlot_SlotRewardSubject>} slotRewards
     * @memberof Slot_BetkeyMap
     * @instance
     */
    Slot_BetkeyMap.prototype.slotRewards = $util.emptyArray;

    /**
     * Creates a new Slot_BetkeyMap instance using the specified properties.
     * @function create
     * @memberof Slot_BetkeyMap
     * @static
     * @param {ISlot_BetkeyMap=} [properties] Properties to set
     * @returns {Slot_BetkeyMap} Slot_BetkeyMap instance
     */
    Slot_BetkeyMap.create = function create(properties) {
        return new Slot_BetkeyMap(properties);
    };

    /**
     * Encodes the specified Slot_BetkeyMap message. Does not implicitly {@link Slot_BetkeyMap.verify|verify} messages.
     * @function encode
     * @memberof Slot_BetkeyMap
     * @static
     * @param {ISlot_BetkeyMap} message Slot_BetkeyMap message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_BetkeyMap.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.betKey != null && Object.hasOwnProperty.call(message, "betKey"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.betKey);
        if (message.slotRewards != null && message.slotRewards.length)
            for (var i = 0; i < message.slotRewards.length; ++i)
                $root.Slot_SlotRewardSubject.encode(message.slotRewards[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Slot_BetkeyMap message, length delimited. Does not implicitly {@link Slot_BetkeyMap.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Slot_BetkeyMap
     * @static
     * @param {ISlot_BetkeyMap} message Slot_BetkeyMap message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_BetkeyMap.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Slot_BetkeyMap message from the specified reader or buffer.
     * @function decode
     * @memberof Slot_BetkeyMap
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Slot_BetkeyMap} Slot_BetkeyMap
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_BetkeyMap.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Slot_BetkeyMap();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.betKey = reader.int32();
                break;
            case 2:
                if (!(message.slotRewards && message.slotRewards.length))
                    message.slotRewards = [];
                message.slotRewards.push($root.Slot_SlotRewardSubject.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Slot_BetkeyMap message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Slot_BetkeyMap
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Slot_BetkeyMap} Slot_BetkeyMap
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_BetkeyMap.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Slot_BetkeyMap message.
     * @function verify
     * @memberof Slot_BetkeyMap
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Slot_BetkeyMap.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.betKey != null && message.hasOwnProperty("betKey"))
            if (!$util.isInteger(message.betKey))
                return "betKey: integer expected";
        if (message.slotRewards != null && message.hasOwnProperty("slotRewards")) {
            if (!Array.isArray(message.slotRewards))
                return "slotRewards: array expected";
            for (var i = 0; i < message.slotRewards.length; ++i) {
                var error = $root.Slot_SlotRewardSubject.verify(message.slotRewards[i]);
                if (error)
                    return "slotRewards." + error;
            }
        }
        return null;
    };

    /**
     * Creates a Slot_BetkeyMap message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Slot_BetkeyMap
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Slot_BetkeyMap} Slot_BetkeyMap
     */
    Slot_BetkeyMap.fromObject = function fromObject(object) {
        if (object instanceof $root.Slot_BetkeyMap)
            return object;
        var message = new $root.Slot_BetkeyMap();
        if (object.betKey != null)
            message.betKey = object.betKey | 0;
        if (object.slotRewards) {
            if (!Array.isArray(object.slotRewards))
                throw TypeError(".Slot_BetkeyMap.slotRewards: array expected");
            message.slotRewards = [];
            for (var i = 0; i < object.slotRewards.length; ++i) {
                if (typeof object.slotRewards[i] !== "object")
                    throw TypeError(".Slot_BetkeyMap.slotRewards: object expected");
                message.slotRewards[i] = $root.Slot_SlotRewardSubject.fromObject(object.slotRewards[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a Slot_BetkeyMap message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Slot_BetkeyMap
     * @static
     * @param {Slot_BetkeyMap} message Slot_BetkeyMap
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Slot_BetkeyMap.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.slotRewards = [];
        if (options.defaults)
            object.betKey = 0;
        if (message.betKey != null && message.hasOwnProperty("betKey"))
            object.betKey = message.betKey;
        if (message.slotRewards && message.slotRewards.length) {
            object.slotRewards = [];
            for (var j = 0; j < message.slotRewards.length; ++j)
                object.slotRewards[j] = $root.Slot_SlotRewardSubject.toObject(message.slotRewards[j], options);
        }
        return object;
    };

    /**
     * Converts this Slot_BetkeyMap to JSON.
     * @function toJSON
     * @memberof Slot_BetkeyMap
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Slot_BetkeyMap.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Slot_BetkeyMap;
})();

$root.Slot_BingoRewards = (function() {

    /**
     * Properties of a Slot_BingoRewards.
     * @exports ISlot_BingoRewards
     * @interface ISlot_BingoRewards
     * @property {Array.<ISlot_SlotRewardSubject>|null} [slotRewards] Slot_BingoRewards slotRewards
     */

    /**
     * Constructs a new Slot_BingoRewards.
     * @exports Slot_BingoRewards
     * @classdesc Represents a Slot_BingoRewards.
     * @implements ISlot_BingoRewards
     * @constructor
     * @param {ISlot_BingoRewards=} [properties] Properties to set
     */
    function Slot_BingoRewards(properties) {
        this.slotRewards = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Slot_BingoRewards slotRewards.
     * @member {Array.<ISlot_SlotRewardSubject>} slotRewards
     * @memberof Slot_BingoRewards
     * @instance
     */
    Slot_BingoRewards.prototype.slotRewards = $util.emptyArray;

    /**
     * Creates a new Slot_BingoRewards instance using the specified properties.
     * @function create
     * @memberof Slot_BingoRewards
     * @static
     * @param {ISlot_BingoRewards=} [properties] Properties to set
     * @returns {Slot_BingoRewards} Slot_BingoRewards instance
     */
    Slot_BingoRewards.create = function create(properties) {
        return new Slot_BingoRewards(properties);
    };

    /**
     * Encodes the specified Slot_BingoRewards message. Does not implicitly {@link Slot_BingoRewards.verify|verify} messages.
     * @function encode
     * @memberof Slot_BingoRewards
     * @static
     * @param {ISlot_BingoRewards} message Slot_BingoRewards message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_BingoRewards.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.slotRewards != null && message.slotRewards.length)
            for (var i = 0; i < message.slotRewards.length; ++i)
                $root.Slot_SlotRewardSubject.encode(message.slotRewards[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Slot_BingoRewards message, length delimited. Does not implicitly {@link Slot_BingoRewards.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Slot_BingoRewards
     * @static
     * @param {ISlot_BingoRewards} message Slot_BingoRewards message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_BingoRewards.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Slot_BingoRewards message from the specified reader or buffer.
     * @function decode
     * @memberof Slot_BingoRewards
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Slot_BingoRewards} Slot_BingoRewards
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_BingoRewards.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Slot_BingoRewards();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.slotRewards && message.slotRewards.length))
                    message.slotRewards = [];
                message.slotRewards.push($root.Slot_SlotRewardSubject.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Slot_BingoRewards message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Slot_BingoRewards
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Slot_BingoRewards} Slot_BingoRewards
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_BingoRewards.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Slot_BingoRewards message.
     * @function verify
     * @memberof Slot_BingoRewards
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Slot_BingoRewards.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.slotRewards != null && message.hasOwnProperty("slotRewards")) {
            if (!Array.isArray(message.slotRewards))
                return "slotRewards: array expected";
            for (var i = 0; i < message.slotRewards.length; ++i) {
                var error = $root.Slot_SlotRewardSubject.verify(message.slotRewards[i]);
                if (error)
                    return "slotRewards." + error;
            }
        }
        return null;
    };

    /**
     * Creates a Slot_BingoRewards message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Slot_BingoRewards
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Slot_BingoRewards} Slot_BingoRewards
     */
    Slot_BingoRewards.fromObject = function fromObject(object) {
        if (object instanceof $root.Slot_BingoRewards)
            return object;
        var message = new $root.Slot_BingoRewards();
        if (object.slotRewards) {
            if (!Array.isArray(object.slotRewards))
                throw TypeError(".Slot_BingoRewards.slotRewards: array expected");
            message.slotRewards = [];
            for (var i = 0; i < object.slotRewards.length; ++i) {
                if (typeof object.slotRewards[i] !== "object")
                    throw TypeError(".Slot_BingoRewards.slotRewards: object expected");
                message.slotRewards[i] = $root.Slot_SlotRewardSubject.fromObject(object.slotRewards[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a Slot_BingoRewards message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Slot_BingoRewards
     * @static
     * @param {Slot_BingoRewards} message Slot_BingoRewards
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Slot_BingoRewards.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.slotRewards = [];
        if (message.slotRewards && message.slotRewards.length) {
            object.slotRewards = [];
            for (var j = 0; j < message.slotRewards.length; ++j)
                object.slotRewards[j] = $root.Slot_SlotRewardSubject.toObject(message.slotRewards[j], options);
        }
        return object;
    };

    /**
     * Converts this Slot_BingoRewards to JSON.
     * @function toJSON
     * @memberof Slot_BingoRewards
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Slot_BingoRewards.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Slot_BingoRewards;
})();

$root.Slot_ReqBet = (function() {

    /**
     * Properties of a Slot_ReqBet.
     * @exports ISlot_ReqBet
     * @interface ISlot_ReqBet
     * @property {number|null} [betKey] Slot_ReqBet betKey
     * @property {number|null} [subGameType] Slot_ReqBet subGameType
     */

    /**
     * Constructs a new Slot_ReqBet.
     * @exports Slot_ReqBet
     * @classdesc Represents a Slot_ReqBet.
     * @implements ISlot_ReqBet
     * @constructor
     * @param {ISlot_ReqBet=} [properties] Properties to set
     */
    function Slot_ReqBet(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Slot_ReqBet betKey.
     * @member {number} betKey
     * @memberof Slot_ReqBet
     * @instance
     */
    Slot_ReqBet.prototype.betKey = 0;

    /**
     * Slot_ReqBet subGameType.
     * @member {number} subGameType
     * @memberof Slot_ReqBet
     * @instance
     */
    Slot_ReqBet.prototype.subGameType = 0;

    /**
     * Creates a new Slot_ReqBet instance using the specified properties.
     * @function create
     * @memberof Slot_ReqBet
     * @static
     * @param {ISlot_ReqBet=} [properties] Properties to set
     * @returns {Slot_ReqBet} Slot_ReqBet instance
     */
    Slot_ReqBet.create = function create(properties) {
        return new Slot_ReqBet(properties);
    };

    /**
     * Encodes the specified Slot_ReqBet message. Does not implicitly {@link Slot_ReqBet.verify|verify} messages.
     * @function encode
     * @memberof Slot_ReqBet
     * @static
     * @param {ISlot_ReqBet} message Slot_ReqBet message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_ReqBet.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.betKey != null && Object.hasOwnProperty.call(message, "betKey"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.betKey);
        if (message.subGameType != null && Object.hasOwnProperty.call(message, "subGameType"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.subGameType);
        return writer;
    };

    /**
     * Encodes the specified Slot_ReqBet message, length delimited. Does not implicitly {@link Slot_ReqBet.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Slot_ReqBet
     * @static
     * @param {ISlot_ReqBet} message Slot_ReqBet message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_ReqBet.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Slot_ReqBet message from the specified reader or buffer.
     * @function decode
     * @memberof Slot_ReqBet
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Slot_ReqBet} Slot_ReqBet
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_ReqBet.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Slot_ReqBet();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.betKey = reader.int32();
                break;
            case 2:
                message.subGameType = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Slot_ReqBet message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Slot_ReqBet
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Slot_ReqBet} Slot_ReqBet
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_ReqBet.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Slot_ReqBet message.
     * @function verify
     * @memberof Slot_ReqBet
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Slot_ReqBet.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.betKey != null && message.hasOwnProperty("betKey"))
            if (!$util.isInteger(message.betKey))
                return "betKey: integer expected";
        if (message.subGameType != null && message.hasOwnProperty("subGameType"))
            if (!$util.isInteger(message.subGameType))
                return "subGameType: integer expected";
        return null;
    };

    /**
     * Creates a Slot_ReqBet message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Slot_ReqBet
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Slot_ReqBet} Slot_ReqBet
     */
    Slot_ReqBet.fromObject = function fromObject(object) {
        if (object instanceof $root.Slot_ReqBet)
            return object;
        var message = new $root.Slot_ReqBet();
        if (object.betKey != null)
            message.betKey = object.betKey | 0;
        if (object.subGameType != null)
            message.subGameType = object.subGameType | 0;
        return message;
    };

    /**
     * Creates a plain object from a Slot_ReqBet message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Slot_ReqBet
     * @static
     * @param {Slot_ReqBet} message Slot_ReqBet
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Slot_ReqBet.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.betKey = 0;
            object.subGameType = 0;
        }
        if (message.betKey != null && message.hasOwnProperty("betKey"))
            object.betKey = message.betKey;
        if (message.subGameType != null && message.hasOwnProperty("subGameType"))
            object.subGameType = message.subGameType;
        return object;
    };

    /**
     * Converts this Slot_ReqBet to JSON.
     * @function toJSON
     * @memberof Slot_ReqBet
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Slot_ReqBet.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Slot_ReqBet;
})();

$root.Slot_SlotSubject = (function() {

    /**
     * Properties of a Slot_SlotSubject.
     * @exports ISlot_SlotSubject
     * @interface ISlot_SlotSubject
     * @property {number|null} [id] Slot_SlotSubject id
     * @property {Array.<number>|null} [lines] Slot_SlotSubject lines
     * @property {boolean|null} [winPrize] Slot_SlotSubject winPrize
     * @property {number|null} [index] Slot_SlotSubject index
     */

    /**
     * Constructs a new Slot_SlotSubject.
     * @exports Slot_SlotSubject
     * @classdesc Represents a Slot_SlotSubject.
     * @implements ISlot_SlotSubject
     * @constructor
     * @param {ISlot_SlotSubject=} [properties] Properties to set
     */
    function Slot_SlotSubject(properties) {
        this.lines = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Slot_SlotSubject id.
     * @member {number} id
     * @memberof Slot_SlotSubject
     * @instance
     */
    Slot_SlotSubject.prototype.id = 0;

    /**
     * Slot_SlotSubject lines.
     * @member {Array.<number>} lines
     * @memberof Slot_SlotSubject
     * @instance
     */
    Slot_SlotSubject.prototype.lines = $util.emptyArray;

    /**
     * Slot_SlotSubject winPrize.
     * @member {boolean} winPrize
     * @memberof Slot_SlotSubject
     * @instance
     */
    Slot_SlotSubject.prototype.winPrize = false;

    /**
     * Slot_SlotSubject index.
     * @member {number} index
     * @memberof Slot_SlotSubject
     * @instance
     */
    Slot_SlotSubject.prototype.index = 0;

    /**
     * Creates a new Slot_SlotSubject instance using the specified properties.
     * @function create
     * @memberof Slot_SlotSubject
     * @static
     * @param {ISlot_SlotSubject=} [properties] Properties to set
     * @returns {Slot_SlotSubject} Slot_SlotSubject instance
     */
    Slot_SlotSubject.create = function create(properties) {
        return new Slot_SlotSubject(properties);
    };

    /**
     * Encodes the specified Slot_SlotSubject message. Does not implicitly {@link Slot_SlotSubject.verify|verify} messages.
     * @function encode
     * @memberof Slot_SlotSubject
     * @static
     * @param {ISlot_SlotSubject} message Slot_SlotSubject message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_SlotSubject.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && Object.hasOwnProperty.call(message, "id"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
        if (message.lines != null && message.lines.length) {
            writer.uint32(/* id 2, wireType 2 =*/18).fork();
            for (var i = 0; i < message.lines.length; ++i)
                writer.int32(message.lines[i]);
            writer.ldelim();
        }
        if (message.winPrize != null && Object.hasOwnProperty.call(message, "winPrize"))
            writer.uint32(/* id 3, wireType 0 =*/24).bool(message.winPrize);
        if (message.index != null && Object.hasOwnProperty.call(message, "index"))
            writer.uint32(/* id 4, wireType 0 =*/32).int32(message.index);
        return writer;
    };

    /**
     * Encodes the specified Slot_SlotSubject message, length delimited. Does not implicitly {@link Slot_SlotSubject.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Slot_SlotSubject
     * @static
     * @param {ISlot_SlotSubject} message Slot_SlotSubject message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_SlotSubject.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Slot_SlotSubject message from the specified reader or buffer.
     * @function decode
     * @memberof Slot_SlotSubject
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Slot_SlotSubject} Slot_SlotSubject
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_SlotSubject.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Slot_SlotSubject();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.id = reader.int32();
                break;
            case 2:
                if (!(message.lines && message.lines.length))
                    message.lines = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.lines.push(reader.int32());
                } else
                    message.lines.push(reader.int32());
                break;
            case 3:
                message.winPrize = reader.bool();
                break;
            case 4:
                message.index = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Slot_SlotSubject message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Slot_SlotSubject
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Slot_SlotSubject} Slot_SlotSubject
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_SlotSubject.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Slot_SlotSubject message.
     * @function verify
     * @memberof Slot_SlotSubject
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Slot_SlotSubject.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isInteger(message.id))
                return "id: integer expected";
        if (message.lines != null && message.hasOwnProperty("lines")) {
            if (!Array.isArray(message.lines))
                return "lines: array expected";
            for (var i = 0; i < message.lines.length; ++i)
                if (!$util.isInteger(message.lines[i]))
                    return "lines: integer[] expected";
        }
        if (message.winPrize != null && message.hasOwnProperty("winPrize"))
            if (typeof message.winPrize !== "boolean")
                return "winPrize: boolean expected";
        if (message.index != null && message.hasOwnProperty("index"))
            if (!$util.isInteger(message.index))
                return "index: integer expected";
        return null;
    };

    /**
     * Creates a Slot_SlotSubject message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Slot_SlotSubject
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Slot_SlotSubject} Slot_SlotSubject
     */
    Slot_SlotSubject.fromObject = function fromObject(object) {
        if (object instanceof $root.Slot_SlotSubject)
            return object;
        var message = new $root.Slot_SlotSubject();
        if (object.id != null)
            message.id = object.id | 0;
        if (object.lines) {
            if (!Array.isArray(object.lines))
                throw TypeError(".Slot_SlotSubject.lines: array expected");
            message.lines = [];
            for (var i = 0; i < object.lines.length; ++i)
                message.lines[i] = object.lines[i] | 0;
        }
        if (object.winPrize != null)
            message.winPrize = Boolean(object.winPrize);
        if (object.index != null)
            message.index = object.index | 0;
        return message;
    };

    /**
     * Creates a plain object from a Slot_SlotSubject message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Slot_SlotSubject
     * @static
     * @param {Slot_SlotSubject} message Slot_SlotSubject
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Slot_SlotSubject.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.lines = [];
        if (options.defaults) {
            object.id = 0;
            object.winPrize = false;
            object.index = 0;
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.lines && message.lines.length) {
            object.lines = [];
            for (var j = 0; j < message.lines.length; ++j)
                object.lines[j] = message.lines[j];
        }
        if (message.winPrize != null && message.hasOwnProperty("winPrize"))
            object.winPrize = message.winPrize;
        if (message.index != null && message.hasOwnProperty("index"))
            object.index = message.index;
        return object;
    };

    /**
     * Converts this Slot_SlotSubject to JSON.
     * @function toJSON
     * @memberof Slot_SlotSubject
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Slot_SlotSubject.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Slot_SlotSubject;
})();

$root.Slot_PushBetResult = (function() {

    /**
     * Properties of a Slot_PushBetResult.
     * @exports ISlot_PushBetResult
     * @interface ISlot_PushBetResult
     * @property {ISlot_SubGameBetResult|null} [betResult] Slot_PushBetResult betResult
     * @property {ISlot_SubGameInfo|null} [nextGameInfo] Slot_PushBetResult nextGameInfo
     * @property {ISlot_PlayerCollectInfo|null} [playerCollectInfo] Slot_PushBetResult playerCollectInfo
     * @property {Array.<ISlot_GlobalMap>|null} [changeDatas] Slot_PushBetResult changeDatas
     * @property {Array.<ISlot_BingoRewards>|null} [bingoRewardsList] Slot_PushBetResult bingoRewardsList
     * @property {number|Long|null} [exp] Slot_PushBetResult exp
     * @property {number|null} [playerLevel] Slot_PushBetResult playerLevel
     * @property {number|Long|null} [balance] Slot_PushBetResult balance
     */

    /**
     * Constructs a new Slot_PushBetResult.
     * @exports Slot_PushBetResult
     * @classdesc Represents a Slot_PushBetResult.
     * @implements ISlot_PushBetResult
     * @constructor
     * @param {ISlot_PushBetResult=} [properties] Properties to set
     */
    function Slot_PushBetResult(properties) {
        this.changeDatas = [];
        this.bingoRewardsList = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Slot_PushBetResult betResult.
     * @member {ISlot_SubGameBetResult|null|undefined} betResult
     * @memberof Slot_PushBetResult
     * @instance
     */
    Slot_PushBetResult.prototype.betResult = null;

    /**
     * Slot_PushBetResult nextGameInfo.
     * @member {ISlot_SubGameInfo|null|undefined} nextGameInfo
     * @memberof Slot_PushBetResult
     * @instance
     */
    Slot_PushBetResult.prototype.nextGameInfo = null;

    /**
     * Slot_PushBetResult playerCollectInfo.
     * @member {ISlot_PlayerCollectInfo|null|undefined} playerCollectInfo
     * @memberof Slot_PushBetResult
     * @instance
     */
    Slot_PushBetResult.prototype.playerCollectInfo = null;

    /**
     * Slot_PushBetResult changeDatas.
     * @member {Array.<ISlot_GlobalMap>} changeDatas
     * @memberof Slot_PushBetResult
     * @instance
     */
    Slot_PushBetResult.prototype.changeDatas = $util.emptyArray;

    /**
     * Slot_PushBetResult bingoRewardsList.
     * @member {Array.<ISlot_BingoRewards>} bingoRewardsList
     * @memberof Slot_PushBetResult
     * @instance
     */
    Slot_PushBetResult.prototype.bingoRewardsList = $util.emptyArray;

    /**
     * Slot_PushBetResult exp.
     * @member {number|Long} exp
     * @memberof Slot_PushBetResult
     * @instance
     */
    Slot_PushBetResult.prototype.exp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Slot_PushBetResult playerLevel.
     * @member {number} playerLevel
     * @memberof Slot_PushBetResult
     * @instance
     */
    Slot_PushBetResult.prototype.playerLevel = 0;

    /**
     * Slot_PushBetResult balance.
     * @member {number|Long} balance
     * @memberof Slot_PushBetResult
     * @instance
     */
    Slot_PushBetResult.prototype.balance = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new Slot_PushBetResult instance using the specified properties.
     * @function create
     * @memberof Slot_PushBetResult
     * @static
     * @param {ISlot_PushBetResult=} [properties] Properties to set
     * @returns {Slot_PushBetResult} Slot_PushBetResult instance
     */
    Slot_PushBetResult.create = function create(properties) {
        return new Slot_PushBetResult(properties);
    };

    /**
     * Encodes the specified Slot_PushBetResult message. Does not implicitly {@link Slot_PushBetResult.verify|verify} messages.
     * @function encode
     * @memberof Slot_PushBetResult
     * @static
     * @param {ISlot_PushBetResult} message Slot_PushBetResult message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_PushBetResult.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.betResult != null && Object.hasOwnProperty.call(message, "betResult"))
            $root.Slot_SubGameBetResult.encode(message.betResult, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.nextGameInfo != null && Object.hasOwnProperty.call(message, "nextGameInfo"))
            $root.Slot_SubGameInfo.encode(message.nextGameInfo, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.playerCollectInfo != null && Object.hasOwnProperty.call(message, "playerCollectInfo"))
            $root.Slot_PlayerCollectInfo.encode(message.playerCollectInfo, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.changeDatas != null && message.changeDatas.length)
            for (var i = 0; i < message.changeDatas.length; ++i)
                $root.Slot_GlobalMap.encode(message.changeDatas[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        if (message.bingoRewardsList != null && message.bingoRewardsList.length)
            for (var i = 0; i < message.bingoRewardsList.length; ++i)
                $root.Slot_BingoRewards.encode(message.bingoRewardsList[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        if (message.exp != null && Object.hasOwnProperty.call(message, "exp"))
            writer.uint32(/* id 8, wireType 0 =*/64).int64(message.exp);
        if (message.playerLevel != null && Object.hasOwnProperty.call(message, "playerLevel"))
            writer.uint32(/* id 9, wireType 0 =*/72).int32(message.playerLevel);
        if (message.balance != null && Object.hasOwnProperty.call(message, "balance"))
            writer.uint32(/* id 10, wireType 0 =*/80).int64(message.balance);
        return writer;
    };

    /**
     * Encodes the specified Slot_PushBetResult message, length delimited. Does not implicitly {@link Slot_PushBetResult.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Slot_PushBetResult
     * @static
     * @param {ISlot_PushBetResult} message Slot_PushBetResult message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_PushBetResult.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Slot_PushBetResult message from the specified reader or buffer.
     * @function decode
     * @memberof Slot_PushBetResult
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Slot_PushBetResult} Slot_PushBetResult
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_PushBetResult.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Slot_PushBetResult();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.betResult = $root.Slot_SubGameBetResult.decode(reader, reader.uint32());
                break;
            case 2:
                message.nextGameInfo = $root.Slot_SubGameInfo.decode(reader, reader.uint32());
                break;
            case 3:
                message.playerCollectInfo = $root.Slot_PlayerCollectInfo.decode(reader, reader.uint32());
                break;
            case 4:
                if (!(message.changeDatas && message.changeDatas.length))
                    message.changeDatas = [];
                message.changeDatas.push($root.Slot_GlobalMap.decode(reader, reader.uint32()));
                break;
            case 5:
                if (!(message.bingoRewardsList && message.bingoRewardsList.length))
                    message.bingoRewardsList = [];
                message.bingoRewardsList.push($root.Slot_BingoRewards.decode(reader, reader.uint32()));
                break;
            case 8:
                message.exp = reader.int64();
                break;
            case 9:
                message.playerLevel = reader.int32();
                break;
            case 10:
                message.balance = reader.int64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Slot_PushBetResult message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Slot_PushBetResult
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Slot_PushBetResult} Slot_PushBetResult
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_PushBetResult.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Slot_PushBetResult message.
     * @function verify
     * @memberof Slot_PushBetResult
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Slot_PushBetResult.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.betResult != null && message.hasOwnProperty("betResult")) {
            var error = $root.Slot_SubGameBetResult.verify(message.betResult);
            if (error)
                return "betResult." + error;
        }
        if (message.nextGameInfo != null && message.hasOwnProperty("nextGameInfo")) {
            var error = $root.Slot_SubGameInfo.verify(message.nextGameInfo);
            if (error)
                return "nextGameInfo." + error;
        }
        if (message.playerCollectInfo != null && message.hasOwnProperty("playerCollectInfo")) {
            var error = $root.Slot_PlayerCollectInfo.verify(message.playerCollectInfo);
            if (error)
                return "playerCollectInfo." + error;
        }
        if (message.changeDatas != null && message.hasOwnProperty("changeDatas")) {
            if (!Array.isArray(message.changeDatas))
                return "changeDatas: array expected";
            for (var i = 0; i < message.changeDatas.length; ++i) {
                var error = $root.Slot_GlobalMap.verify(message.changeDatas[i]);
                if (error)
                    return "changeDatas." + error;
            }
        }
        if (message.bingoRewardsList != null && message.hasOwnProperty("bingoRewardsList")) {
            if (!Array.isArray(message.bingoRewardsList))
                return "bingoRewardsList: array expected";
            for (var i = 0; i < message.bingoRewardsList.length; ++i) {
                var error = $root.Slot_BingoRewards.verify(message.bingoRewardsList[i]);
                if (error)
                    return "bingoRewardsList." + error;
            }
        }
        if (message.exp != null && message.hasOwnProperty("exp"))
            if (!$util.isInteger(message.exp) && !(message.exp && $util.isInteger(message.exp.low) && $util.isInteger(message.exp.high)))
                return "exp: integer|Long expected";
        if (message.playerLevel != null && message.hasOwnProperty("playerLevel"))
            if (!$util.isInteger(message.playerLevel))
                return "playerLevel: integer expected";
        if (message.balance != null && message.hasOwnProperty("balance"))
            if (!$util.isInteger(message.balance) && !(message.balance && $util.isInteger(message.balance.low) && $util.isInteger(message.balance.high)))
                return "balance: integer|Long expected";
        return null;
    };

    /**
     * Creates a Slot_PushBetResult message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Slot_PushBetResult
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Slot_PushBetResult} Slot_PushBetResult
     */
    Slot_PushBetResult.fromObject = function fromObject(object) {
        if (object instanceof $root.Slot_PushBetResult)
            return object;
        var message = new $root.Slot_PushBetResult();
        if (object.betResult != null) {
            if (typeof object.betResult !== "object")
                throw TypeError(".Slot_PushBetResult.betResult: object expected");
            message.betResult = $root.Slot_SubGameBetResult.fromObject(object.betResult);
        }
        if (object.nextGameInfo != null) {
            if (typeof object.nextGameInfo !== "object")
                throw TypeError(".Slot_PushBetResult.nextGameInfo: object expected");
            message.nextGameInfo = $root.Slot_SubGameInfo.fromObject(object.nextGameInfo);
        }
        if (object.playerCollectInfo != null) {
            if (typeof object.playerCollectInfo !== "object")
                throw TypeError(".Slot_PushBetResult.playerCollectInfo: object expected");
            message.playerCollectInfo = $root.Slot_PlayerCollectInfo.fromObject(object.playerCollectInfo);
        }
        if (object.changeDatas) {
            if (!Array.isArray(object.changeDatas))
                throw TypeError(".Slot_PushBetResult.changeDatas: array expected");
            message.changeDatas = [];
            for (var i = 0; i < object.changeDatas.length; ++i) {
                if (typeof object.changeDatas[i] !== "object")
                    throw TypeError(".Slot_PushBetResult.changeDatas: object expected");
                message.changeDatas[i] = $root.Slot_GlobalMap.fromObject(object.changeDatas[i]);
            }
        }
        if (object.bingoRewardsList) {
            if (!Array.isArray(object.bingoRewardsList))
                throw TypeError(".Slot_PushBetResult.bingoRewardsList: array expected");
            message.bingoRewardsList = [];
            for (var i = 0; i < object.bingoRewardsList.length; ++i) {
                if (typeof object.bingoRewardsList[i] !== "object")
                    throw TypeError(".Slot_PushBetResult.bingoRewardsList: object expected");
                message.bingoRewardsList[i] = $root.Slot_BingoRewards.fromObject(object.bingoRewardsList[i]);
            }
        }
        if (object.exp != null)
            if ($util.Long)
                (message.exp = $util.Long.fromValue(object.exp)).unsigned = false;
            else if (typeof object.exp === "string")
                message.exp = parseInt(object.exp, 10);
            else if (typeof object.exp === "number")
                message.exp = object.exp;
            else if (typeof object.exp === "object")
                message.exp = new $util.LongBits(object.exp.low >>> 0, object.exp.high >>> 0).toNumber();
        if (object.playerLevel != null)
            message.playerLevel = object.playerLevel | 0;
        if (object.balance != null)
            if ($util.Long)
                (message.balance = $util.Long.fromValue(object.balance)).unsigned = false;
            else if (typeof object.balance === "string")
                message.balance = parseInt(object.balance, 10);
            else if (typeof object.balance === "number")
                message.balance = object.balance;
            else if (typeof object.balance === "object")
                message.balance = new $util.LongBits(object.balance.low >>> 0, object.balance.high >>> 0).toNumber();
        return message;
    };

    /**
     * Creates a plain object from a Slot_PushBetResult message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Slot_PushBetResult
     * @static
     * @param {Slot_PushBetResult} message Slot_PushBetResult
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Slot_PushBetResult.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults) {
            object.changeDatas = [];
            object.bingoRewardsList = [];
        }
        if (options.defaults) {
            object.betResult = null;
            object.nextGameInfo = null;
            object.playerCollectInfo = null;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.exp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.exp = options.longs === String ? "0" : 0;
            object.playerLevel = 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.balance = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.balance = options.longs === String ? "0" : 0;
        }
        if (message.betResult != null && message.hasOwnProperty("betResult"))
            object.betResult = $root.Slot_SubGameBetResult.toObject(message.betResult, options);
        if (message.nextGameInfo != null && message.hasOwnProperty("nextGameInfo"))
            object.nextGameInfo = $root.Slot_SubGameInfo.toObject(message.nextGameInfo, options);
        if (message.playerCollectInfo != null && message.hasOwnProperty("playerCollectInfo"))
            object.playerCollectInfo = $root.Slot_PlayerCollectInfo.toObject(message.playerCollectInfo, options);
        if (message.changeDatas && message.changeDatas.length) {
            object.changeDatas = [];
            for (var j = 0; j < message.changeDatas.length; ++j)
                object.changeDatas[j] = $root.Slot_GlobalMap.toObject(message.changeDatas[j], options);
        }
        if (message.bingoRewardsList && message.bingoRewardsList.length) {
            object.bingoRewardsList = [];
            for (var j = 0; j < message.bingoRewardsList.length; ++j)
                object.bingoRewardsList[j] = $root.Slot_BingoRewards.toObject(message.bingoRewardsList[j], options);
        }
        if (message.exp != null && message.hasOwnProperty("exp"))
            if (typeof message.exp === "number")
                object.exp = options.longs === String ? String(message.exp) : message.exp;
            else
                object.exp = options.longs === String ? $util.Long.prototype.toString.call(message.exp) : options.longs === Number ? new $util.LongBits(message.exp.low >>> 0, message.exp.high >>> 0).toNumber() : message.exp;
        if (message.playerLevel != null && message.hasOwnProperty("playerLevel"))
            object.playerLevel = message.playerLevel;
        if (message.balance != null && message.hasOwnProperty("balance"))
            if (typeof message.balance === "number")
                object.balance = options.longs === String ? String(message.balance) : message.balance;
            else
                object.balance = options.longs === String ? $util.Long.prototype.toString.call(message.balance) : options.longs === Number ? new $util.LongBits(message.balance.low >>> 0, message.balance.high >>> 0).toNumber() : message.balance;
        return object;
    };

    /**
     * Converts this Slot_PushBetResult to JSON.
     * @function toJSON
     * @memberof Slot_PushBetResult
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Slot_PushBetResult.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Slot_PushBetResult;
})();

$root.Slot_SubGameInfo = (function() {

    /**
     * Properties of a Slot_SubGameInfo.
     * @exports ISlot_SubGameInfo
     * @interface ISlot_SubGameInfo
     * @property {number|null} [subGameType] Slot_SubGameInfo subGameType
     * @property {number|null} [rounds] Slot_SubGameInfo rounds
     * @property {number|null} [leftRounds] Slot_SubGameInfo leftRounds
     * @property {number|null} [betKey] Slot_SubGameInfo betKey
     * @property {number|Long|null} [betAmount] Slot_SubGameInfo betAmount
     * @property {Array.<number>|null} [linkIconPos] Slot_SubGameInfo linkIconPos
     * @property {Array.<ISlot_SlotSubject>|null} [slotSubjects] Slot_SubGameInfo slotSubjects
     * @property {Array.<ISlot_SlotRewardSubject>|null} [rewardSubjects] Slot_SubGameInfo rewardSubjects
     * @property {number|Long|null} [beforeSettlementAmount] Slot_SubGameInfo beforeSettlementAmount
     * @property {number|null} [subGameStatus] Slot_SubGameInfo subGameStatus
     * @property {number|Long|null} [appendValue] Slot_SubGameInfo appendValue
     * @property {Array.<number|Long>|null} [appendLongList] Slot_SubGameInfo appendLongList
     */

    /**
     * Constructs a new Slot_SubGameInfo.
     * @exports Slot_SubGameInfo
     * @classdesc Represents a Slot_SubGameInfo.
     * @implements ISlot_SubGameInfo
     * @constructor
     * @param {ISlot_SubGameInfo=} [properties] Properties to set
     */
    function Slot_SubGameInfo(properties) {
        this.linkIconPos = [];
        this.slotSubjects = [];
        this.rewardSubjects = [];
        this.appendLongList = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Slot_SubGameInfo subGameType.
     * @member {number} subGameType
     * @memberof Slot_SubGameInfo
     * @instance
     */
    Slot_SubGameInfo.prototype.subGameType = 0;

    /**
     * Slot_SubGameInfo rounds.
     * @member {number} rounds
     * @memberof Slot_SubGameInfo
     * @instance
     */
    Slot_SubGameInfo.prototype.rounds = 0;

    /**
     * Slot_SubGameInfo leftRounds.
     * @member {number} leftRounds
     * @memberof Slot_SubGameInfo
     * @instance
     */
    Slot_SubGameInfo.prototype.leftRounds = 0;

    /**
     * Slot_SubGameInfo betKey.
     * @member {number} betKey
     * @memberof Slot_SubGameInfo
     * @instance
     */
    Slot_SubGameInfo.prototype.betKey = 0;

    /**
     * Slot_SubGameInfo betAmount.
     * @member {number|Long} betAmount
     * @memberof Slot_SubGameInfo
     * @instance
     */
    Slot_SubGameInfo.prototype.betAmount = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Slot_SubGameInfo linkIconPos.
     * @member {Array.<number>} linkIconPos
     * @memberof Slot_SubGameInfo
     * @instance
     */
    Slot_SubGameInfo.prototype.linkIconPos = $util.emptyArray;

    /**
     * Slot_SubGameInfo slotSubjects.
     * @member {Array.<ISlot_SlotSubject>} slotSubjects
     * @memberof Slot_SubGameInfo
     * @instance
     */
    Slot_SubGameInfo.prototype.slotSubjects = $util.emptyArray;

    /**
     * Slot_SubGameInfo rewardSubjects.
     * @member {Array.<ISlot_SlotRewardSubject>} rewardSubjects
     * @memberof Slot_SubGameInfo
     * @instance
     */
    Slot_SubGameInfo.prototype.rewardSubjects = $util.emptyArray;

    /**
     * Slot_SubGameInfo beforeSettlementAmount.
     * @member {number|Long} beforeSettlementAmount
     * @memberof Slot_SubGameInfo
     * @instance
     */
    Slot_SubGameInfo.prototype.beforeSettlementAmount = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Slot_SubGameInfo subGameStatus.
     * @member {number} subGameStatus
     * @memberof Slot_SubGameInfo
     * @instance
     */
    Slot_SubGameInfo.prototype.subGameStatus = 0;

    /**
     * Slot_SubGameInfo appendValue.
     * @member {number|Long} appendValue
     * @memberof Slot_SubGameInfo
     * @instance
     */
    Slot_SubGameInfo.prototype.appendValue = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Slot_SubGameInfo appendLongList.
     * @member {Array.<number|Long>} appendLongList
     * @memberof Slot_SubGameInfo
     * @instance
     */
    Slot_SubGameInfo.prototype.appendLongList = $util.emptyArray;

    /**
     * Creates a new Slot_SubGameInfo instance using the specified properties.
     * @function create
     * @memberof Slot_SubGameInfo
     * @static
     * @param {ISlot_SubGameInfo=} [properties] Properties to set
     * @returns {Slot_SubGameInfo} Slot_SubGameInfo instance
     */
    Slot_SubGameInfo.create = function create(properties) {
        return new Slot_SubGameInfo(properties);
    };

    /**
     * Encodes the specified Slot_SubGameInfo message. Does not implicitly {@link Slot_SubGameInfo.verify|verify} messages.
     * @function encode
     * @memberof Slot_SubGameInfo
     * @static
     * @param {ISlot_SubGameInfo} message Slot_SubGameInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_SubGameInfo.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.subGameType != null && Object.hasOwnProperty.call(message, "subGameType"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.subGameType);
        if (message.rounds != null && Object.hasOwnProperty.call(message, "rounds"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.rounds);
        if (message.leftRounds != null && Object.hasOwnProperty.call(message, "leftRounds"))
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.leftRounds);
        if (message.betKey != null && Object.hasOwnProperty.call(message, "betKey"))
            writer.uint32(/* id 4, wireType 0 =*/32).int32(message.betKey);
        if (message.betAmount != null && Object.hasOwnProperty.call(message, "betAmount"))
            writer.uint32(/* id 5, wireType 0 =*/40).int64(message.betAmount);
        if (message.linkIconPos != null && message.linkIconPos.length) {
            writer.uint32(/* id 6, wireType 2 =*/50).fork();
            for (var i = 0; i < message.linkIconPos.length; ++i)
                writer.int32(message.linkIconPos[i]);
            writer.ldelim();
        }
        if (message.slotSubjects != null && message.slotSubjects.length)
            for (var i = 0; i < message.slotSubjects.length; ++i)
                $root.Slot_SlotSubject.encode(message.slotSubjects[i], writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
        if (message.rewardSubjects != null && message.rewardSubjects.length)
            for (var i = 0; i < message.rewardSubjects.length; ++i)
                $root.Slot_SlotRewardSubject.encode(message.rewardSubjects[i], writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
        if (message.beforeSettlementAmount != null && Object.hasOwnProperty.call(message, "beforeSettlementAmount"))
            writer.uint32(/* id 9, wireType 0 =*/72).int64(message.beforeSettlementAmount);
        if (message.subGameStatus != null && Object.hasOwnProperty.call(message, "subGameStatus"))
            writer.uint32(/* id 10, wireType 0 =*/80).int32(message.subGameStatus);
        if (message.appendValue != null && Object.hasOwnProperty.call(message, "appendValue"))
            writer.uint32(/* id 11, wireType 0 =*/88).int64(message.appendValue);
        if (message.appendLongList != null && message.appendLongList.length) {
            writer.uint32(/* id 12, wireType 2 =*/98).fork();
            for (var i = 0; i < message.appendLongList.length; ++i)
                writer.int64(message.appendLongList[i]);
            writer.ldelim();
        }
        return writer;
    };

    /**
     * Encodes the specified Slot_SubGameInfo message, length delimited. Does not implicitly {@link Slot_SubGameInfo.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Slot_SubGameInfo
     * @static
     * @param {ISlot_SubGameInfo} message Slot_SubGameInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_SubGameInfo.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Slot_SubGameInfo message from the specified reader or buffer.
     * @function decode
     * @memberof Slot_SubGameInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Slot_SubGameInfo} Slot_SubGameInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_SubGameInfo.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Slot_SubGameInfo();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.subGameType = reader.int32();
                break;
            case 2:
                message.rounds = reader.int32();
                break;
            case 3:
                message.leftRounds = reader.int32();
                break;
            case 4:
                message.betKey = reader.int32();
                break;
            case 5:
                message.betAmount = reader.int64();
                break;
            case 6:
                if (!(message.linkIconPos && message.linkIconPos.length))
                    message.linkIconPos = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.linkIconPos.push(reader.int32());
                } else
                    message.linkIconPos.push(reader.int32());
                break;
            case 7:
                if (!(message.slotSubjects && message.slotSubjects.length))
                    message.slotSubjects = [];
                message.slotSubjects.push($root.Slot_SlotSubject.decode(reader, reader.uint32()));
                break;
            case 8:
                if (!(message.rewardSubjects && message.rewardSubjects.length))
                    message.rewardSubjects = [];
                message.rewardSubjects.push($root.Slot_SlotRewardSubject.decode(reader, reader.uint32()));
                break;
            case 9:
                message.beforeSettlementAmount = reader.int64();
                break;
            case 10:
                message.subGameStatus = reader.int32();
                break;
            case 11:
                message.appendValue = reader.int64();
                break;
            case 12:
                if (!(message.appendLongList && message.appendLongList.length))
                    message.appendLongList = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.appendLongList.push(reader.int64());
                } else
                    message.appendLongList.push(reader.int64());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Slot_SubGameInfo message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Slot_SubGameInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Slot_SubGameInfo} Slot_SubGameInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_SubGameInfo.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Slot_SubGameInfo message.
     * @function verify
     * @memberof Slot_SubGameInfo
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Slot_SubGameInfo.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.subGameType != null && message.hasOwnProperty("subGameType"))
            if (!$util.isInteger(message.subGameType))
                return "subGameType: integer expected";
        if (message.rounds != null && message.hasOwnProperty("rounds"))
            if (!$util.isInteger(message.rounds))
                return "rounds: integer expected";
        if (message.leftRounds != null && message.hasOwnProperty("leftRounds"))
            if (!$util.isInteger(message.leftRounds))
                return "leftRounds: integer expected";
        if (message.betKey != null && message.hasOwnProperty("betKey"))
            if (!$util.isInteger(message.betKey))
                return "betKey: integer expected";
        if (message.betAmount != null && message.hasOwnProperty("betAmount"))
            if (!$util.isInteger(message.betAmount) && !(message.betAmount && $util.isInteger(message.betAmount.low) && $util.isInteger(message.betAmount.high)))
                return "betAmount: integer|Long expected";
        if (message.linkIconPos != null && message.hasOwnProperty("linkIconPos")) {
            if (!Array.isArray(message.linkIconPos))
                return "linkIconPos: array expected";
            for (var i = 0; i < message.linkIconPos.length; ++i)
                if (!$util.isInteger(message.linkIconPos[i]))
                    return "linkIconPos: integer[] expected";
        }
        if (message.slotSubjects != null && message.hasOwnProperty("slotSubjects")) {
            if (!Array.isArray(message.slotSubjects))
                return "slotSubjects: array expected";
            for (var i = 0; i < message.slotSubjects.length; ++i) {
                var error = $root.Slot_SlotSubject.verify(message.slotSubjects[i]);
                if (error)
                    return "slotSubjects." + error;
            }
        }
        if (message.rewardSubjects != null && message.hasOwnProperty("rewardSubjects")) {
            if (!Array.isArray(message.rewardSubjects))
                return "rewardSubjects: array expected";
            for (var i = 0; i < message.rewardSubjects.length; ++i) {
                var error = $root.Slot_SlotRewardSubject.verify(message.rewardSubjects[i]);
                if (error)
                    return "rewardSubjects." + error;
            }
        }
        if (message.beforeSettlementAmount != null && message.hasOwnProperty("beforeSettlementAmount"))
            if (!$util.isInteger(message.beforeSettlementAmount) && !(message.beforeSettlementAmount && $util.isInteger(message.beforeSettlementAmount.low) && $util.isInteger(message.beforeSettlementAmount.high)))
                return "beforeSettlementAmount: integer|Long expected";
        if (message.subGameStatus != null && message.hasOwnProperty("subGameStatus"))
            if (!$util.isInteger(message.subGameStatus))
                return "subGameStatus: integer expected";
        if (message.appendValue != null && message.hasOwnProperty("appendValue"))
            if (!$util.isInteger(message.appendValue) && !(message.appendValue && $util.isInteger(message.appendValue.low) && $util.isInteger(message.appendValue.high)))
                return "appendValue: integer|Long expected";
        if (message.appendLongList != null && message.hasOwnProperty("appendLongList")) {
            if (!Array.isArray(message.appendLongList))
                return "appendLongList: array expected";
            for (var i = 0; i < message.appendLongList.length; ++i)
                if (!$util.isInteger(message.appendLongList[i]) && !(message.appendLongList[i] && $util.isInteger(message.appendLongList[i].low) && $util.isInteger(message.appendLongList[i].high)))
                    return "appendLongList: integer|Long[] expected";
        }
        return null;
    };

    /**
     * Creates a Slot_SubGameInfo message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Slot_SubGameInfo
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Slot_SubGameInfo} Slot_SubGameInfo
     */
    Slot_SubGameInfo.fromObject = function fromObject(object) {
        if (object instanceof $root.Slot_SubGameInfo)
            return object;
        var message = new $root.Slot_SubGameInfo();
        if (object.subGameType != null)
            message.subGameType = object.subGameType | 0;
        if (object.rounds != null)
            message.rounds = object.rounds | 0;
        if (object.leftRounds != null)
            message.leftRounds = object.leftRounds | 0;
        if (object.betKey != null)
            message.betKey = object.betKey | 0;
        if (object.betAmount != null)
            if ($util.Long)
                (message.betAmount = $util.Long.fromValue(object.betAmount)).unsigned = false;
            else if (typeof object.betAmount === "string")
                message.betAmount = parseInt(object.betAmount, 10);
            else if (typeof object.betAmount === "number")
                message.betAmount = object.betAmount;
            else if (typeof object.betAmount === "object")
                message.betAmount = new $util.LongBits(object.betAmount.low >>> 0, object.betAmount.high >>> 0).toNumber();
        if (object.linkIconPos) {
            if (!Array.isArray(object.linkIconPos))
                throw TypeError(".Slot_SubGameInfo.linkIconPos: array expected");
            message.linkIconPos = [];
            for (var i = 0; i < object.linkIconPos.length; ++i)
                message.linkIconPos[i] = object.linkIconPos[i] | 0;
        }
        if (object.slotSubjects) {
            if (!Array.isArray(object.slotSubjects))
                throw TypeError(".Slot_SubGameInfo.slotSubjects: array expected");
            message.slotSubjects = [];
            for (var i = 0; i < object.slotSubjects.length; ++i) {
                if (typeof object.slotSubjects[i] !== "object")
                    throw TypeError(".Slot_SubGameInfo.slotSubjects: object expected");
                message.slotSubjects[i] = $root.Slot_SlotSubject.fromObject(object.slotSubjects[i]);
            }
        }
        if (object.rewardSubjects) {
            if (!Array.isArray(object.rewardSubjects))
                throw TypeError(".Slot_SubGameInfo.rewardSubjects: array expected");
            message.rewardSubjects = [];
            for (var i = 0; i < object.rewardSubjects.length; ++i) {
                if (typeof object.rewardSubjects[i] !== "object")
                    throw TypeError(".Slot_SubGameInfo.rewardSubjects: object expected");
                message.rewardSubjects[i] = $root.Slot_SlotRewardSubject.fromObject(object.rewardSubjects[i]);
            }
        }
        if (object.beforeSettlementAmount != null)
            if ($util.Long)
                (message.beforeSettlementAmount = $util.Long.fromValue(object.beforeSettlementAmount)).unsigned = false;
            else if (typeof object.beforeSettlementAmount === "string")
                message.beforeSettlementAmount = parseInt(object.beforeSettlementAmount, 10);
            else if (typeof object.beforeSettlementAmount === "number")
                message.beforeSettlementAmount = object.beforeSettlementAmount;
            else if (typeof object.beforeSettlementAmount === "object")
                message.beforeSettlementAmount = new $util.LongBits(object.beforeSettlementAmount.low >>> 0, object.beforeSettlementAmount.high >>> 0).toNumber();
        if (object.subGameStatus != null)
            message.subGameStatus = object.subGameStatus | 0;
        if (object.appendValue != null)
            if ($util.Long)
                (message.appendValue = $util.Long.fromValue(object.appendValue)).unsigned = false;
            else if (typeof object.appendValue === "string")
                message.appendValue = parseInt(object.appendValue, 10);
            else if (typeof object.appendValue === "number")
                message.appendValue = object.appendValue;
            else if (typeof object.appendValue === "object")
                message.appendValue = new $util.LongBits(object.appendValue.low >>> 0, object.appendValue.high >>> 0).toNumber();
        if (object.appendLongList) {
            if (!Array.isArray(object.appendLongList))
                throw TypeError(".Slot_SubGameInfo.appendLongList: array expected");
            message.appendLongList = [];
            for (var i = 0; i < object.appendLongList.length; ++i)
                if ($util.Long)
                    (message.appendLongList[i] = $util.Long.fromValue(object.appendLongList[i])).unsigned = false;
                else if (typeof object.appendLongList[i] === "string")
                    message.appendLongList[i] = parseInt(object.appendLongList[i], 10);
                else if (typeof object.appendLongList[i] === "number")
                    message.appendLongList[i] = object.appendLongList[i];
                else if (typeof object.appendLongList[i] === "object")
                    message.appendLongList[i] = new $util.LongBits(object.appendLongList[i].low >>> 0, object.appendLongList[i].high >>> 0).toNumber();
        }
        return message;
    };

    /**
     * Creates a plain object from a Slot_SubGameInfo message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Slot_SubGameInfo
     * @static
     * @param {Slot_SubGameInfo} message Slot_SubGameInfo
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Slot_SubGameInfo.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults) {
            object.linkIconPos = [];
            object.slotSubjects = [];
            object.rewardSubjects = [];
            object.appendLongList = [];
        }
        if (options.defaults) {
            object.subGameType = 0;
            object.rounds = 0;
            object.leftRounds = 0;
            object.betKey = 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.betAmount = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.betAmount = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.beforeSettlementAmount = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.beforeSettlementAmount = options.longs === String ? "0" : 0;
            object.subGameStatus = 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.appendValue = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.appendValue = options.longs === String ? "0" : 0;
        }
        if (message.subGameType != null && message.hasOwnProperty("subGameType"))
            object.subGameType = message.subGameType;
        if (message.rounds != null && message.hasOwnProperty("rounds"))
            object.rounds = message.rounds;
        if (message.leftRounds != null && message.hasOwnProperty("leftRounds"))
            object.leftRounds = message.leftRounds;
        if (message.betKey != null && message.hasOwnProperty("betKey"))
            object.betKey = message.betKey;
        if (message.betAmount != null && message.hasOwnProperty("betAmount"))
            if (typeof message.betAmount === "number")
                object.betAmount = options.longs === String ? String(message.betAmount) : message.betAmount;
            else
                object.betAmount = options.longs === String ? $util.Long.prototype.toString.call(message.betAmount) : options.longs === Number ? new $util.LongBits(message.betAmount.low >>> 0, message.betAmount.high >>> 0).toNumber() : message.betAmount;
        if (message.linkIconPos && message.linkIconPos.length) {
            object.linkIconPos = [];
            for (var j = 0; j < message.linkIconPos.length; ++j)
                object.linkIconPos[j] = message.linkIconPos[j];
        }
        if (message.slotSubjects && message.slotSubjects.length) {
            object.slotSubjects = [];
            for (var j = 0; j < message.slotSubjects.length; ++j)
                object.slotSubjects[j] = $root.Slot_SlotSubject.toObject(message.slotSubjects[j], options);
        }
        if (message.rewardSubjects && message.rewardSubjects.length) {
            object.rewardSubjects = [];
            for (var j = 0; j < message.rewardSubjects.length; ++j)
                object.rewardSubjects[j] = $root.Slot_SlotRewardSubject.toObject(message.rewardSubjects[j], options);
        }
        if (message.beforeSettlementAmount != null && message.hasOwnProperty("beforeSettlementAmount"))
            if (typeof message.beforeSettlementAmount === "number")
                object.beforeSettlementAmount = options.longs === String ? String(message.beforeSettlementAmount) : message.beforeSettlementAmount;
            else
                object.beforeSettlementAmount = options.longs === String ? $util.Long.prototype.toString.call(message.beforeSettlementAmount) : options.longs === Number ? new $util.LongBits(message.beforeSettlementAmount.low >>> 0, message.beforeSettlementAmount.high >>> 0).toNumber() : message.beforeSettlementAmount;
        if (message.subGameStatus != null && message.hasOwnProperty("subGameStatus"))
            object.subGameStatus = message.subGameStatus;
        if (message.appendValue != null && message.hasOwnProperty("appendValue"))
            if (typeof message.appendValue === "number")
                object.appendValue = options.longs === String ? String(message.appendValue) : message.appendValue;
            else
                object.appendValue = options.longs === String ? $util.Long.prototype.toString.call(message.appendValue) : options.longs === Number ? new $util.LongBits(message.appendValue.low >>> 0, message.appendValue.high >>> 0).toNumber() : message.appendValue;
        if (message.appendLongList && message.appendLongList.length) {
            object.appendLongList = [];
            for (var j = 0; j < message.appendLongList.length; ++j)
                if (typeof message.appendLongList[j] === "number")
                    object.appendLongList[j] = options.longs === String ? String(message.appendLongList[j]) : message.appendLongList[j];
                else
                    object.appendLongList[j] = options.longs === String ? $util.Long.prototype.toString.call(message.appendLongList[j]) : options.longs === Number ? new $util.LongBits(message.appendLongList[j].low >>> 0, message.appendLongList[j].high >>> 0).toNumber() : message.appendLongList[j];
        }
        return object;
    };

    /**
     * Converts this Slot_SubGameInfo to JSON.
     * @function toJSON
     * @memberof Slot_SubGameInfo
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Slot_SubGameInfo.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Slot_SubGameInfo;
})();

$root.Slot_SlotRewardSubject = (function() {

    /**
     * Properties of a Slot_SlotRewardSubject.
     * @exports ISlot_SlotRewardSubject
     * @interface ISlot_SlotRewardSubject
     * @property {number|null} [subjectId] Slot_SlotRewardSubject subjectId
     * @property {number|null} [index] Slot_SlotRewardSubject index
     * @property {number|null} [rewardType] Slot_SlotRewardSubject rewardType
     * @property {number|Long|null} [rewardAmount] Slot_SlotRewardSubject rewardAmount
     * @property {number|null} [poolType] Slot_SlotRewardSubject poolType
     * @property {Array.<ISlot_SubGameBetResult>|null} [subGameBetResults] Slot_SlotRewardSubject subGameBetResults
     * @property {number|null} [rewardCount] Slot_SlotRewardSubject rewardCount
     */

    /**
     * Constructs a new Slot_SlotRewardSubject.
     * @exports Slot_SlotRewardSubject
     * @classdesc Represents a Slot_SlotRewardSubject.
     * @implements ISlot_SlotRewardSubject
     * @constructor
     * @param {ISlot_SlotRewardSubject=} [properties] Properties to set
     */
    function Slot_SlotRewardSubject(properties) {
        this.subGameBetResults = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Slot_SlotRewardSubject subjectId.
     * @member {number} subjectId
     * @memberof Slot_SlotRewardSubject
     * @instance
     */
    Slot_SlotRewardSubject.prototype.subjectId = 0;

    /**
     * Slot_SlotRewardSubject index.
     * @member {number} index
     * @memberof Slot_SlotRewardSubject
     * @instance
     */
    Slot_SlotRewardSubject.prototype.index = 0;

    /**
     * Slot_SlotRewardSubject rewardType.
     * @member {number} rewardType
     * @memberof Slot_SlotRewardSubject
     * @instance
     */
    Slot_SlotRewardSubject.prototype.rewardType = 0;

    /**
     * Slot_SlotRewardSubject rewardAmount.
     * @member {number|Long} rewardAmount
     * @memberof Slot_SlotRewardSubject
     * @instance
     */
    Slot_SlotRewardSubject.prototype.rewardAmount = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Slot_SlotRewardSubject poolType.
     * @member {number} poolType
     * @memberof Slot_SlotRewardSubject
     * @instance
     */
    Slot_SlotRewardSubject.prototype.poolType = 0;

    /**
     * Slot_SlotRewardSubject subGameBetResults.
     * @member {Array.<ISlot_SubGameBetResult>} subGameBetResults
     * @memberof Slot_SlotRewardSubject
     * @instance
     */
    Slot_SlotRewardSubject.prototype.subGameBetResults = $util.emptyArray;

    /**
     * Slot_SlotRewardSubject rewardCount.
     * @member {number} rewardCount
     * @memberof Slot_SlotRewardSubject
     * @instance
     */
    Slot_SlotRewardSubject.prototype.rewardCount = 0;

    /**
     * Creates a new Slot_SlotRewardSubject instance using the specified properties.
     * @function create
     * @memberof Slot_SlotRewardSubject
     * @static
     * @param {ISlot_SlotRewardSubject=} [properties] Properties to set
     * @returns {Slot_SlotRewardSubject} Slot_SlotRewardSubject instance
     */
    Slot_SlotRewardSubject.create = function create(properties) {
        return new Slot_SlotRewardSubject(properties);
    };

    /**
     * Encodes the specified Slot_SlotRewardSubject message. Does not implicitly {@link Slot_SlotRewardSubject.verify|verify} messages.
     * @function encode
     * @memberof Slot_SlotRewardSubject
     * @static
     * @param {ISlot_SlotRewardSubject} message Slot_SlotRewardSubject message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_SlotRewardSubject.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.subjectId != null && Object.hasOwnProperty.call(message, "subjectId"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.subjectId);
        if (message.index != null && Object.hasOwnProperty.call(message, "index"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.index);
        if (message.rewardType != null && Object.hasOwnProperty.call(message, "rewardType"))
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.rewardType);
        if (message.rewardAmount != null && Object.hasOwnProperty.call(message, "rewardAmount"))
            writer.uint32(/* id 4, wireType 0 =*/32).int64(message.rewardAmount);
        if (message.poolType != null && Object.hasOwnProperty.call(message, "poolType"))
            writer.uint32(/* id 5, wireType 0 =*/40).int32(message.poolType);
        if (message.subGameBetResults != null && message.subGameBetResults.length)
            for (var i = 0; i < message.subGameBetResults.length; ++i)
                $root.Slot_SubGameBetResult.encode(message.subGameBetResults[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        if (message.rewardCount != null && Object.hasOwnProperty.call(message, "rewardCount"))
            writer.uint32(/* id 7, wireType 0 =*/56).int32(message.rewardCount);
        return writer;
    };

    /**
     * Encodes the specified Slot_SlotRewardSubject message, length delimited. Does not implicitly {@link Slot_SlotRewardSubject.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Slot_SlotRewardSubject
     * @static
     * @param {ISlot_SlotRewardSubject} message Slot_SlotRewardSubject message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_SlotRewardSubject.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Slot_SlotRewardSubject message from the specified reader or buffer.
     * @function decode
     * @memberof Slot_SlotRewardSubject
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Slot_SlotRewardSubject} Slot_SlotRewardSubject
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_SlotRewardSubject.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Slot_SlotRewardSubject();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.subjectId = reader.int32();
                break;
            case 2:
                message.index = reader.int32();
                break;
            case 3:
                message.rewardType = reader.int32();
                break;
            case 4:
                message.rewardAmount = reader.int64();
                break;
            case 5:
                message.poolType = reader.int32();
                break;
            case 6:
                if (!(message.subGameBetResults && message.subGameBetResults.length))
                    message.subGameBetResults = [];
                message.subGameBetResults.push($root.Slot_SubGameBetResult.decode(reader, reader.uint32()));
                break;
            case 7:
                message.rewardCount = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Slot_SlotRewardSubject message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Slot_SlotRewardSubject
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Slot_SlotRewardSubject} Slot_SlotRewardSubject
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_SlotRewardSubject.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Slot_SlotRewardSubject message.
     * @function verify
     * @memberof Slot_SlotRewardSubject
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Slot_SlotRewardSubject.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.subjectId != null && message.hasOwnProperty("subjectId"))
            if (!$util.isInteger(message.subjectId))
                return "subjectId: integer expected";
        if (message.index != null && message.hasOwnProperty("index"))
            if (!$util.isInteger(message.index))
                return "index: integer expected";
        if (message.rewardType != null && message.hasOwnProperty("rewardType"))
            if (!$util.isInteger(message.rewardType))
                return "rewardType: integer expected";
        if (message.rewardAmount != null && message.hasOwnProperty("rewardAmount"))
            if (!$util.isInteger(message.rewardAmount) && !(message.rewardAmount && $util.isInteger(message.rewardAmount.low) && $util.isInteger(message.rewardAmount.high)))
                return "rewardAmount: integer|Long expected";
        if (message.poolType != null && message.hasOwnProperty("poolType"))
            if (!$util.isInteger(message.poolType))
                return "poolType: integer expected";
        if (message.subGameBetResults != null && message.hasOwnProperty("subGameBetResults")) {
            if (!Array.isArray(message.subGameBetResults))
                return "subGameBetResults: array expected";
            for (var i = 0; i < message.subGameBetResults.length; ++i) {
                var error = $root.Slot_SubGameBetResult.verify(message.subGameBetResults[i]);
                if (error)
                    return "subGameBetResults." + error;
            }
        }
        if (message.rewardCount != null && message.hasOwnProperty("rewardCount"))
            if (!$util.isInteger(message.rewardCount))
                return "rewardCount: integer expected";
        return null;
    };

    /**
     * Creates a Slot_SlotRewardSubject message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Slot_SlotRewardSubject
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Slot_SlotRewardSubject} Slot_SlotRewardSubject
     */
    Slot_SlotRewardSubject.fromObject = function fromObject(object) {
        if (object instanceof $root.Slot_SlotRewardSubject)
            return object;
        var message = new $root.Slot_SlotRewardSubject();
        if (object.subjectId != null)
            message.subjectId = object.subjectId | 0;
        if (object.index != null)
            message.index = object.index | 0;
        if (object.rewardType != null)
            message.rewardType = object.rewardType | 0;
        if (object.rewardAmount != null)
            if ($util.Long)
                (message.rewardAmount = $util.Long.fromValue(object.rewardAmount)).unsigned = false;
            else if (typeof object.rewardAmount === "string")
                message.rewardAmount = parseInt(object.rewardAmount, 10);
            else if (typeof object.rewardAmount === "number")
                message.rewardAmount = object.rewardAmount;
            else if (typeof object.rewardAmount === "object")
                message.rewardAmount = new $util.LongBits(object.rewardAmount.low >>> 0, object.rewardAmount.high >>> 0).toNumber();
        if (object.poolType != null)
            message.poolType = object.poolType | 0;
        if (object.subGameBetResults) {
            if (!Array.isArray(object.subGameBetResults))
                throw TypeError(".Slot_SlotRewardSubject.subGameBetResults: array expected");
            message.subGameBetResults = [];
            for (var i = 0; i < object.subGameBetResults.length; ++i) {
                if (typeof object.subGameBetResults[i] !== "object")
                    throw TypeError(".Slot_SlotRewardSubject.subGameBetResults: object expected");
                message.subGameBetResults[i] = $root.Slot_SubGameBetResult.fromObject(object.subGameBetResults[i]);
            }
        }
        if (object.rewardCount != null)
            message.rewardCount = object.rewardCount | 0;
        return message;
    };

    /**
     * Creates a plain object from a Slot_SlotRewardSubject message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Slot_SlotRewardSubject
     * @static
     * @param {Slot_SlotRewardSubject} message Slot_SlotRewardSubject
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Slot_SlotRewardSubject.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.subGameBetResults = [];
        if (options.defaults) {
            object.subjectId = 0;
            object.index = 0;
            object.rewardType = 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.rewardAmount = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.rewardAmount = options.longs === String ? "0" : 0;
            object.poolType = 0;
            object.rewardCount = 0;
        }
        if (message.subjectId != null && message.hasOwnProperty("subjectId"))
            object.subjectId = message.subjectId;
        if (message.index != null && message.hasOwnProperty("index"))
            object.index = message.index;
        if (message.rewardType != null && message.hasOwnProperty("rewardType"))
            object.rewardType = message.rewardType;
        if (message.rewardAmount != null && message.hasOwnProperty("rewardAmount"))
            if (typeof message.rewardAmount === "number")
                object.rewardAmount = options.longs === String ? String(message.rewardAmount) : message.rewardAmount;
            else
                object.rewardAmount = options.longs === String ? $util.Long.prototype.toString.call(message.rewardAmount) : options.longs === Number ? new $util.LongBits(message.rewardAmount.low >>> 0, message.rewardAmount.high >>> 0).toNumber() : message.rewardAmount;
        if (message.poolType != null && message.hasOwnProperty("poolType"))
            object.poolType = message.poolType;
        if (message.subGameBetResults && message.subGameBetResults.length) {
            object.subGameBetResults = [];
            for (var j = 0; j < message.subGameBetResults.length; ++j)
                object.subGameBetResults[j] = $root.Slot_SubGameBetResult.toObject(message.subGameBetResults[j], options);
        }
        if (message.rewardCount != null && message.hasOwnProperty("rewardCount"))
            object.rewardCount = message.rewardCount;
        return object;
    };

    /**
     * Converts this Slot_SlotRewardSubject to JSON.
     * @function toJSON
     * @memberof Slot_SlotRewardSubject
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Slot_SlotRewardSubject.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Slot_SlotRewardSubject;
})();

$root.Slot_SubGameBetResult = (function() {

    /**
     * Properties of a Slot_SubGameBetResult.
     * @exports ISlot_SubGameBetResult
     * @interface ISlot_SubGameBetResult
     * @property {number|null} [subGameType] Slot_SubGameBetResult subGameType
     * @property {number|null} [betKey] Slot_SubGameBetResult betKey
     * @property {number|Long|null} [betAmount] Slot_SubGameBetResult betAmount
     * @property {number|Long|null} [winAmount] Slot_SubGameBetResult winAmount
     * @property {number|null} [rounds] Slot_SubGameBetResult rounds
     * @property {number|null} [leftRounds] Slot_SubGameBetResult leftRounds
     * @property {Array.<ISlot_SlotSubject>|null} [showSubjects] Slot_SubGameBetResult showSubjects
     * @property {Array.<number>|null} [lineIds] Slot_SubGameBetResult lineIds
     * @property {Array.<ISlot_SlotRewardSubject>|null} [bounsRewards] Slot_SubGameBetResult bounsRewards
     * @property {number|Long|null} [appendValue] Slot_SubGameBetResult appendValue
     * @property {Array.<number>|null} [appendList] Slot_SubGameBetResult appendList
     * @property {Array.<number|Long>|null} [appendLongList] Slot_SubGameBetResult appendLongList
     */

    /**
     * Constructs a new Slot_SubGameBetResult.
     * @exports Slot_SubGameBetResult
     * @classdesc Represents a Slot_SubGameBetResult.
     * @implements ISlot_SubGameBetResult
     * @constructor
     * @param {ISlot_SubGameBetResult=} [properties] Properties to set
     */
    function Slot_SubGameBetResult(properties) {
        this.showSubjects = [];
        this.lineIds = [];
        this.bounsRewards = [];
        this.appendList = [];
        this.appendLongList = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Slot_SubGameBetResult subGameType.
     * @member {number} subGameType
     * @memberof Slot_SubGameBetResult
     * @instance
     */
    Slot_SubGameBetResult.prototype.subGameType = 0;

    /**
     * Slot_SubGameBetResult betKey.
     * @member {number} betKey
     * @memberof Slot_SubGameBetResult
     * @instance
     */
    Slot_SubGameBetResult.prototype.betKey = 0;

    /**
     * Slot_SubGameBetResult betAmount.
     * @member {number|Long} betAmount
     * @memberof Slot_SubGameBetResult
     * @instance
     */
    Slot_SubGameBetResult.prototype.betAmount = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Slot_SubGameBetResult winAmount.
     * @member {number|Long} winAmount
     * @memberof Slot_SubGameBetResult
     * @instance
     */
    Slot_SubGameBetResult.prototype.winAmount = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Slot_SubGameBetResult rounds.
     * @member {number} rounds
     * @memberof Slot_SubGameBetResult
     * @instance
     */
    Slot_SubGameBetResult.prototype.rounds = 0;

    /**
     * Slot_SubGameBetResult leftRounds.
     * @member {number} leftRounds
     * @memberof Slot_SubGameBetResult
     * @instance
     */
    Slot_SubGameBetResult.prototype.leftRounds = 0;

    /**
     * Slot_SubGameBetResult showSubjects.
     * @member {Array.<ISlot_SlotSubject>} showSubjects
     * @memberof Slot_SubGameBetResult
     * @instance
     */
    Slot_SubGameBetResult.prototype.showSubjects = $util.emptyArray;

    /**
     * Slot_SubGameBetResult lineIds.
     * @member {Array.<number>} lineIds
     * @memberof Slot_SubGameBetResult
     * @instance
     */
    Slot_SubGameBetResult.prototype.lineIds = $util.emptyArray;

    /**
     * Slot_SubGameBetResult bounsRewards.
     * @member {Array.<ISlot_SlotRewardSubject>} bounsRewards
     * @memberof Slot_SubGameBetResult
     * @instance
     */
    Slot_SubGameBetResult.prototype.bounsRewards = $util.emptyArray;

    /**
     * Slot_SubGameBetResult appendValue.
     * @member {number|Long} appendValue
     * @memberof Slot_SubGameBetResult
     * @instance
     */
    Slot_SubGameBetResult.prototype.appendValue = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Slot_SubGameBetResult appendList.
     * @member {Array.<number>} appendList
     * @memberof Slot_SubGameBetResult
     * @instance
     */
    Slot_SubGameBetResult.prototype.appendList = $util.emptyArray;

    /**
     * Slot_SubGameBetResult appendLongList.
     * @member {Array.<number|Long>} appendLongList
     * @memberof Slot_SubGameBetResult
     * @instance
     */
    Slot_SubGameBetResult.prototype.appendLongList = $util.emptyArray;

    /**
     * Creates a new Slot_SubGameBetResult instance using the specified properties.
     * @function create
     * @memberof Slot_SubGameBetResult
     * @static
     * @param {ISlot_SubGameBetResult=} [properties] Properties to set
     * @returns {Slot_SubGameBetResult} Slot_SubGameBetResult instance
     */
    Slot_SubGameBetResult.create = function create(properties) {
        return new Slot_SubGameBetResult(properties);
    };

    /**
     * Encodes the specified Slot_SubGameBetResult message. Does not implicitly {@link Slot_SubGameBetResult.verify|verify} messages.
     * @function encode
     * @memberof Slot_SubGameBetResult
     * @static
     * @param {ISlot_SubGameBetResult} message Slot_SubGameBetResult message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_SubGameBetResult.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.subGameType != null && Object.hasOwnProperty.call(message, "subGameType"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.subGameType);
        if (message.betKey != null && Object.hasOwnProperty.call(message, "betKey"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.betKey);
        if (message.betAmount != null && Object.hasOwnProperty.call(message, "betAmount"))
            writer.uint32(/* id 3, wireType 0 =*/24).int64(message.betAmount);
        if (message.winAmount != null && Object.hasOwnProperty.call(message, "winAmount"))
            writer.uint32(/* id 4, wireType 0 =*/32).int64(message.winAmount);
        if (message.rounds != null && Object.hasOwnProperty.call(message, "rounds"))
            writer.uint32(/* id 5, wireType 0 =*/40).int32(message.rounds);
        if (message.leftRounds != null && Object.hasOwnProperty.call(message, "leftRounds"))
            writer.uint32(/* id 6, wireType 0 =*/48).int32(message.leftRounds);
        if (message.showSubjects != null && message.showSubjects.length)
            for (var i = 0; i < message.showSubjects.length; ++i)
                $root.Slot_SlotSubject.encode(message.showSubjects[i], writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
        if (message.lineIds != null && message.lineIds.length) {
            writer.uint32(/* id 8, wireType 2 =*/66).fork();
            for (var i = 0; i < message.lineIds.length; ++i)
                writer.int32(message.lineIds[i]);
            writer.ldelim();
        }
        if (message.bounsRewards != null && message.bounsRewards.length)
            for (var i = 0; i < message.bounsRewards.length; ++i)
                $root.Slot_SlotRewardSubject.encode(message.bounsRewards[i], writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
        if (message.appendValue != null && Object.hasOwnProperty.call(message, "appendValue"))
            writer.uint32(/* id 12, wireType 0 =*/96).int64(message.appendValue);
        if (message.appendList != null && message.appendList.length) {
            writer.uint32(/* id 13, wireType 2 =*/106).fork();
            for (var i = 0; i < message.appendList.length; ++i)
                writer.int32(message.appendList[i]);
            writer.ldelim();
        }
        if (message.appendLongList != null && message.appendLongList.length) {
            writer.uint32(/* id 14, wireType 2 =*/114).fork();
            for (var i = 0; i < message.appendLongList.length; ++i)
                writer.int64(message.appendLongList[i]);
            writer.ldelim();
        }
        return writer;
    };

    /**
     * Encodes the specified Slot_SubGameBetResult message, length delimited. Does not implicitly {@link Slot_SubGameBetResult.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Slot_SubGameBetResult
     * @static
     * @param {ISlot_SubGameBetResult} message Slot_SubGameBetResult message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_SubGameBetResult.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Slot_SubGameBetResult message from the specified reader or buffer.
     * @function decode
     * @memberof Slot_SubGameBetResult
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Slot_SubGameBetResult} Slot_SubGameBetResult
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_SubGameBetResult.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Slot_SubGameBetResult();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.subGameType = reader.int32();
                break;
            case 2:
                message.betKey = reader.int32();
                break;
            case 3:
                message.betAmount = reader.int64();
                break;
            case 4:
                message.winAmount = reader.int64();
                break;
            case 5:
                message.rounds = reader.int32();
                break;
            case 6:
                message.leftRounds = reader.int32();
                break;
            case 7:
                if (!(message.showSubjects && message.showSubjects.length))
                    message.showSubjects = [];
                message.showSubjects.push($root.Slot_SlotSubject.decode(reader, reader.uint32()));
                break;
            case 8:
                if (!(message.lineIds && message.lineIds.length))
                    message.lineIds = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.lineIds.push(reader.int32());
                } else
                    message.lineIds.push(reader.int32());
                break;
            case 9:
                if (!(message.bounsRewards && message.bounsRewards.length))
                    message.bounsRewards = [];
                message.bounsRewards.push($root.Slot_SlotRewardSubject.decode(reader, reader.uint32()));
                break;
            case 12:
                message.appendValue = reader.int64();
                break;
            case 13:
                if (!(message.appendList && message.appendList.length))
                    message.appendList = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.appendList.push(reader.int32());
                } else
                    message.appendList.push(reader.int32());
                break;
            case 14:
                if (!(message.appendLongList && message.appendLongList.length))
                    message.appendLongList = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.appendLongList.push(reader.int64());
                } else
                    message.appendLongList.push(reader.int64());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Slot_SubGameBetResult message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Slot_SubGameBetResult
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Slot_SubGameBetResult} Slot_SubGameBetResult
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_SubGameBetResult.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Slot_SubGameBetResult message.
     * @function verify
     * @memberof Slot_SubGameBetResult
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Slot_SubGameBetResult.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.subGameType != null && message.hasOwnProperty("subGameType"))
            if (!$util.isInteger(message.subGameType))
                return "subGameType: integer expected";
        if (message.betKey != null && message.hasOwnProperty("betKey"))
            if (!$util.isInteger(message.betKey))
                return "betKey: integer expected";
        if (message.betAmount != null && message.hasOwnProperty("betAmount"))
            if (!$util.isInteger(message.betAmount) && !(message.betAmount && $util.isInteger(message.betAmount.low) && $util.isInteger(message.betAmount.high)))
                return "betAmount: integer|Long expected";
        if (message.winAmount != null && message.hasOwnProperty("winAmount"))
            if (!$util.isInteger(message.winAmount) && !(message.winAmount && $util.isInteger(message.winAmount.low) && $util.isInteger(message.winAmount.high)))
                return "winAmount: integer|Long expected";
        if (message.rounds != null && message.hasOwnProperty("rounds"))
            if (!$util.isInteger(message.rounds))
                return "rounds: integer expected";
        if (message.leftRounds != null && message.hasOwnProperty("leftRounds"))
            if (!$util.isInteger(message.leftRounds))
                return "leftRounds: integer expected";
        if (message.showSubjects != null && message.hasOwnProperty("showSubjects")) {
            if (!Array.isArray(message.showSubjects))
                return "showSubjects: array expected";
            for (var i = 0; i < message.showSubjects.length; ++i) {
                var error = $root.Slot_SlotSubject.verify(message.showSubjects[i]);
                if (error)
                    return "showSubjects." + error;
            }
        }
        if (message.lineIds != null && message.hasOwnProperty("lineIds")) {
            if (!Array.isArray(message.lineIds))
                return "lineIds: array expected";
            for (var i = 0; i < message.lineIds.length; ++i)
                if (!$util.isInteger(message.lineIds[i]))
                    return "lineIds: integer[] expected";
        }
        if (message.bounsRewards != null && message.hasOwnProperty("bounsRewards")) {
            if (!Array.isArray(message.bounsRewards))
                return "bounsRewards: array expected";
            for (var i = 0; i < message.bounsRewards.length; ++i) {
                var error = $root.Slot_SlotRewardSubject.verify(message.bounsRewards[i]);
                if (error)
                    return "bounsRewards." + error;
            }
        }
        if (message.appendValue != null && message.hasOwnProperty("appendValue"))
            if (!$util.isInteger(message.appendValue) && !(message.appendValue && $util.isInteger(message.appendValue.low) && $util.isInteger(message.appendValue.high)))
                return "appendValue: integer|Long expected";
        if (message.appendList != null && message.hasOwnProperty("appendList")) {
            if (!Array.isArray(message.appendList))
                return "appendList: array expected";
            for (var i = 0; i < message.appendList.length; ++i)
                if (!$util.isInteger(message.appendList[i]))
                    return "appendList: integer[] expected";
        }
        if (message.appendLongList != null && message.hasOwnProperty("appendLongList")) {
            if (!Array.isArray(message.appendLongList))
                return "appendLongList: array expected";
            for (var i = 0; i < message.appendLongList.length; ++i)
                if (!$util.isInteger(message.appendLongList[i]) && !(message.appendLongList[i] && $util.isInteger(message.appendLongList[i].low) && $util.isInteger(message.appendLongList[i].high)))
                    return "appendLongList: integer|Long[] expected";
        }
        return null;
    };

    /**
     * Creates a Slot_SubGameBetResult message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Slot_SubGameBetResult
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Slot_SubGameBetResult} Slot_SubGameBetResult
     */
    Slot_SubGameBetResult.fromObject = function fromObject(object) {
        if (object instanceof $root.Slot_SubGameBetResult)
            return object;
        var message = new $root.Slot_SubGameBetResult();
        if (object.subGameType != null)
            message.subGameType = object.subGameType | 0;
        if (object.betKey != null)
            message.betKey = object.betKey | 0;
        if (object.betAmount != null)
            if ($util.Long)
                (message.betAmount = $util.Long.fromValue(object.betAmount)).unsigned = false;
            else if (typeof object.betAmount === "string")
                message.betAmount = parseInt(object.betAmount, 10);
            else if (typeof object.betAmount === "number")
                message.betAmount = object.betAmount;
            else if (typeof object.betAmount === "object")
                message.betAmount = new $util.LongBits(object.betAmount.low >>> 0, object.betAmount.high >>> 0).toNumber();
        if (object.winAmount != null)
            if ($util.Long)
                (message.winAmount = $util.Long.fromValue(object.winAmount)).unsigned = false;
            else if (typeof object.winAmount === "string")
                message.winAmount = parseInt(object.winAmount, 10);
            else if (typeof object.winAmount === "number")
                message.winAmount = object.winAmount;
            else if (typeof object.winAmount === "object")
                message.winAmount = new $util.LongBits(object.winAmount.low >>> 0, object.winAmount.high >>> 0).toNumber();
        if (object.rounds != null)
            message.rounds = object.rounds | 0;
        if (object.leftRounds != null)
            message.leftRounds = object.leftRounds | 0;
        if (object.showSubjects) {
            if (!Array.isArray(object.showSubjects))
                throw TypeError(".Slot_SubGameBetResult.showSubjects: array expected");
            message.showSubjects = [];
            for (var i = 0; i < object.showSubjects.length; ++i) {
                if (typeof object.showSubjects[i] !== "object")
                    throw TypeError(".Slot_SubGameBetResult.showSubjects: object expected");
                message.showSubjects[i] = $root.Slot_SlotSubject.fromObject(object.showSubjects[i]);
            }
        }
        if (object.lineIds) {
            if (!Array.isArray(object.lineIds))
                throw TypeError(".Slot_SubGameBetResult.lineIds: array expected");
            message.lineIds = [];
            for (var i = 0; i < object.lineIds.length; ++i)
                message.lineIds[i] = object.lineIds[i] | 0;
        }
        if (object.bounsRewards) {
            if (!Array.isArray(object.bounsRewards))
                throw TypeError(".Slot_SubGameBetResult.bounsRewards: array expected");
            message.bounsRewards = [];
            for (var i = 0; i < object.bounsRewards.length; ++i) {
                if (typeof object.bounsRewards[i] !== "object")
                    throw TypeError(".Slot_SubGameBetResult.bounsRewards: object expected");
                message.bounsRewards[i] = $root.Slot_SlotRewardSubject.fromObject(object.bounsRewards[i]);
            }
        }
        if (object.appendValue != null)
            if ($util.Long)
                (message.appendValue = $util.Long.fromValue(object.appendValue)).unsigned = false;
            else if (typeof object.appendValue === "string")
                message.appendValue = parseInt(object.appendValue, 10);
            else if (typeof object.appendValue === "number")
                message.appendValue = object.appendValue;
            else if (typeof object.appendValue === "object")
                message.appendValue = new $util.LongBits(object.appendValue.low >>> 0, object.appendValue.high >>> 0).toNumber();
        if (object.appendList) {
            if (!Array.isArray(object.appendList))
                throw TypeError(".Slot_SubGameBetResult.appendList: array expected");
            message.appendList = [];
            for (var i = 0; i < object.appendList.length; ++i)
                message.appendList[i] = object.appendList[i] | 0;
        }
        if (object.appendLongList) {
            if (!Array.isArray(object.appendLongList))
                throw TypeError(".Slot_SubGameBetResult.appendLongList: array expected");
            message.appendLongList = [];
            for (var i = 0; i < object.appendLongList.length; ++i)
                if ($util.Long)
                    (message.appendLongList[i] = $util.Long.fromValue(object.appendLongList[i])).unsigned = false;
                else if (typeof object.appendLongList[i] === "string")
                    message.appendLongList[i] = parseInt(object.appendLongList[i], 10);
                else if (typeof object.appendLongList[i] === "number")
                    message.appendLongList[i] = object.appendLongList[i];
                else if (typeof object.appendLongList[i] === "object")
                    message.appendLongList[i] = new $util.LongBits(object.appendLongList[i].low >>> 0, object.appendLongList[i].high >>> 0).toNumber();
        }
        return message;
    };

    /**
     * Creates a plain object from a Slot_SubGameBetResult message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Slot_SubGameBetResult
     * @static
     * @param {Slot_SubGameBetResult} message Slot_SubGameBetResult
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Slot_SubGameBetResult.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults) {
            object.showSubjects = [];
            object.lineIds = [];
            object.bounsRewards = [];
            object.appendList = [];
            object.appendLongList = [];
        }
        if (options.defaults) {
            object.subGameType = 0;
            object.betKey = 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.betAmount = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.betAmount = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.winAmount = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.winAmount = options.longs === String ? "0" : 0;
            object.rounds = 0;
            object.leftRounds = 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.appendValue = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.appendValue = options.longs === String ? "0" : 0;
        }
        if (message.subGameType != null && message.hasOwnProperty("subGameType"))
            object.subGameType = message.subGameType;
        if (message.betKey != null && message.hasOwnProperty("betKey"))
            object.betKey = message.betKey;
        if (message.betAmount != null && message.hasOwnProperty("betAmount"))
            if (typeof message.betAmount === "number")
                object.betAmount = options.longs === String ? String(message.betAmount) : message.betAmount;
            else
                object.betAmount = options.longs === String ? $util.Long.prototype.toString.call(message.betAmount) : options.longs === Number ? new $util.LongBits(message.betAmount.low >>> 0, message.betAmount.high >>> 0).toNumber() : message.betAmount;
        if (message.winAmount != null && message.hasOwnProperty("winAmount"))
            if (typeof message.winAmount === "number")
                object.winAmount = options.longs === String ? String(message.winAmount) : message.winAmount;
            else
                object.winAmount = options.longs === String ? $util.Long.prototype.toString.call(message.winAmount) : options.longs === Number ? new $util.LongBits(message.winAmount.low >>> 0, message.winAmount.high >>> 0).toNumber() : message.winAmount;
        if (message.rounds != null && message.hasOwnProperty("rounds"))
            object.rounds = message.rounds;
        if (message.leftRounds != null && message.hasOwnProperty("leftRounds"))
            object.leftRounds = message.leftRounds;
        if (message.showSubjects && message.showSubjects.length) {
            object.showSubjects = [];
            for (var j = 0; j < message.showSubjects.length; ++j)
                object.showSubjects[j] = $root.Slot_SlotSubject.toObject(message.showSubjects[j], options);
        }
        if (message.lineIds && message.lineIds.length) {
            object.lineIds = [];
            for (var j = 0; j < message.lineIds.length; ++j)
                object.lineIds[j] = message.lineIds[j];
        }
        if (message.bounsRewards && message.bounsRewards.length) {
            object.bounsRewards = [];
            for (var j = 0; j < message.bounsRewards.length; ++j)
                object.bounsRewards[j] = $root.Slot_SlotRewardSubject.toObject(message.bounsRewards[j], options);
        }
        if (message.appendValue != null && message.hasOwnProperty("appendValue"))
            if (typeof message.appendValue === "number")
                object.appendValue = options.longs === String ? String(message.appendValue) : message.appendValue;
            else
                object.appendValue = options.longs === String ? $util.Long.prototype.toString.call(message.appendValue) : options.longs === Number ? new $util.LongBits(message.appendValue.low >>> 0, message.appendValue.high >>> 0).toNumber() : message.appendValue;
        if (message.appendList && message.appendList.length) {
            object.appendList = [];
            for (var j = 0; j < message.appendList.length; ++j)
                object.appendList[j] = message.appendList[j];
        }
        if (message.appendLongList && message.appendLongList.length) {
            object.appendLongList = [];
            for (var j = 0; j < message.appendLongList.length; ++j)
                if (typeof message.appendLongList[j] === "number")
                    object.appendLongList[j] = options.longs === String ? String(message.appendLongList[j]) : message.appendLongList[j];
                else
                    object.appendLongList[j] = options.longs === String ? $util.Long.prototype.toString.call(message.appendLongList[j]) : options.longs === Number ? new $util.LongBits(message.appendLongList[j].low >>> 0, message.appendLongList[j].high >>> 0).toNumber() : message.appendLongList[j];
        }
        return object;
    };

    /**
     * Converts this Slot_SubGameBetResult to JSON.
     * @function toJSON
     * @memberof Slot_SubGameBetResult
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Slot_SubGameBetResult.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Slot_SubGameBetResult;
})();

$root.Slot_ReqSettlementBounsSuccess = (function() {

    /**
     * Properties of a Slot_ReqSettlementBounsSuccess.
     * @exports ISlot_ReqSettlementBounsSuccess
     * @interface ISlot_ReqSettlementBounsSuccess
     * @property {number|null} [betKey] Slot_ReqSettlementBounsSuccess betKey
     */

    /**
     * Constructs a new Slot_ReqSettlementBounsSuccess.
     * @exports Slot_ReqSettlementBounsSuccess
     * @classdesc Represents a Slot_ReqSettlementBounsSuccess.
     * @implements ISlot_ReqSettlementBounsSuccess
     * @constructor
     * @param {ISlot_ReqSettlementBounsSuccess=} [properties] Properties to set
     */
    function Slot_ReqSettlementBounsSuccess(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Slot_ReqSettlementBounsSuccess betKey.
     * @member {number} betKey
     * @memberof Slot_ReqSettlementBounsSuccess
     * @instance
     */
    Slot_ReqSettlementBounsSuccess.prototype.betKey = 0;

    /**
     * Creates a new Slot_ReqSettlementBounsSuccess instance using the specified properties.
     * @function create
     * @memberof Slot_ReqSettlementBounsSuccess
     * @static
     * @param {ISlot_ReqSettlementBounsSuccess=} [properties] Properties to set
     * @returns {Slot_ReqSettlementBounsSuccess} Slot_ReqSettlementBounsSuccess instance
     */
    Slot_ReqSettlementBounsSuccess.create = function create(properties) {
        return new Slot_ReqSettlementBounsSuccess(properties);
    };

    /**
     * Encodes the specified Slot_ReqSettlementBounsSuccess message. Does not implicitly {@link Slot_ReqSettlementBounsSuccess.verify|verify} messages.
     * @function encode
     * @memberof Slot_ReqSettlementBounsSuccess
     * @static
     * @param {ISlot_ReqSettlementBounsSuccess} message Slot_ReqSettlementBounsSuccess message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_ReqSettlementBounsSuccess.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.betKey != null && Object.hasOwnProperty.call(message, "betKey"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.betKey);
        return writer;
    };

    /**
     * Encodes the specified Slot_ReqSettlementBounsSuccess message, length delimited. Does not implicitly {@link Slot_ReqSettlementBounsSuccess.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Slot_ReqSettlementBounsSuccess
     * @static
     * @param {ISlot_ReqSettlementBounsSuccess} message Slot_ReqSettlementBounsSuccess message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_ReqSettlementBounsSuccess.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Slot_ReqSettlementBounsSuccess message from the specified reader or buffer.
     * @function decode
     * @memberof Slot_ReqSettlementBounsSuccess
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Slot_ReqSettlementBounsSuccess} Slot_ReqSettlementBounsSuccess
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_ReqSettlementBounsSuccess.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Slot_ReqSettlementBounsSuccess();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.betKey = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Slot_ReqSettlementBounsSuccess message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Slot_ReqSettlementBounsSuccess
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Slot_ReqSettlementBounsSuccess} Slot_ReqSettlementBounsSuccess
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_ReqSettlementBounsSuccess.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Slot_ReqSettlementBounsSuccess message.
     * @function verify
     * @memberof Slot_ReqSettlementBounsSuccess
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Slot_ReqSettlementBounsSuccess.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.betKey != null && message.hasOwnProperty("betKey"))
            if (!$util.isInteger(message.betKey))
                return "betKey: integer expected";
        return null;
    };

    /**
     * Creates a Slot_ReqSettlementBounsSuccess message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Slot_ReqSettlementBounsSuccess
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Slot_ReqSettlementBounsSuccess} Slot_ReqSettlementBounsSuccess
     */
    Slot_ReqSettlementBounsSuccess.fromObject = function fromObject(object) {
        if (object instanceof $root.Slot_ReqSettlementBounsSuccess)
            return object;
        var message = new $root.Slot_ReqSettlementBounsSuccess();
        if (object.betKey != null)
            message.betKey = object.betKey | 0;
        return message;
    };

    /**
     * Creates a plain object from a Slot_ReqSettlementBounsSuccess message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Slot_ReqSettlementBounsSuccess
     * @static
     * @param {Slot_ReqSettlementBounsSuccess} message Slot_ReqSettlementBounsSuccess
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Slot_ReqSettlementBounsSuccess.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.betKey = 0;
        if (message.betKey != null && message.hasOwnProperty("betKey"))
            object.betKey = message.betKey;
        return object;
    };

    /**
     * Converts this Slot_ReqSettlementBounsSuccess to JSON.
     * @function toJSON
     * @memberof Slot_ReqSettlementBounsSuccess
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Slot_ReqSettlementBounsSuccess.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Slot_ReqSettlementBounsSuccess;
})();

$root.Slot_PushSettlementBounsSuccess = (function() {

    /**
     * Properties of a Slot_PushSettlementBounsSuccess.
     * @exports ISlot_PushSettlementBounsSuccess
     * @interface ISlot_PushSettlementBounsSuccess
     * @property {number|null} [betKey] Slot_PushSettlementBounsSuccess betKey
     * @property {ISlot_SubGameInfo|null} [currentGameInfo] Slot_PushSettlementBounsSuccess currentGameInfo
     * @property {ISlot_PlayerCollectInfo|null} [playerCollectInfo] Slot_PushSettlementBounsSuccess playerCollectInfo
     * @property {number|Long|null} [winAmount] Slot_PushSettlementBounsSuccess winAmount
     * @property {number|Long|null} [balance] Slot_PushSettlementBounsSuccess balance
     */

    /**
     * Constructs a new Slot_PushSettlementBounsSuccess.
     * @exports Slot_PushSettlementBounsSuccess
     * @classdesc Represents a Slot_PushSettlementBounsSuccess.
     * @implements ISlot_PushSettlementBounsSuccess
     * @constructor
     * @param {ISlot_PushSettlementBounsSuccess=} [properties] Properties to set
     */
    function Slot_PushSettlementBounsSuccess(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Slot_PushSettlementBounsSuccess betKey.
     * @member {number} betKey
     * @memberof Slot_PushSettlementBounsSuccess
     * @instance
     */
    Slot_PushSettlementBounsSuccess.prototype.betKey = 0;

    /**
     * Slot_PushSettlementBounsSuccess currentGameInfo.
     * @member {ISlot_SubGameInfo|null|undefined} currentGameInfo
     * @memberof Slot_PushSettlementBounsSuccess
     * @instance
     */
    Slot_PushSettlementBounsSuccess.prototype.currentGameInfo = null;

    /**
     * Slot_PushSettlementBounsSuccess playerCollectInfo.
     * @member {ISlot_PlayerCollectInfo|null|undefined} playerCollectInfo
     * @memberof Slot_PushSettlementBounsSuccess
     * @instance
     */
    Slot_PushSettlementBounsSuccess.prototype.playerCollectInfo = null;

    /**
     * Slot_PushSettlementBounsSuccess winAmount.
     * @member {number|Long} winAmount
     * @memberof Slot_PushSettlementBounsSuccess
     * @instance
     */
    Slot_PushSettlementBounsSuccess.prototype.winAmount = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Slot_PushSettlementBounsSuccess balance.
     * @member {number|Long} balance
     * @memberof Slot_PushSettlementBounsSuccess
     * @instance
     */
    Slot_PushSettlementBounsSuccess.prototype.balance = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new Slot_PushSettlementBounsSuccess instance using the specified properties.
     * @function create
     * @memberof Slot_PushSettlementBounsSuccess
     * @static
     * @param {ISlot_PushSettlementBounsSuccess=} [properties] Properties to set
     * @returns {Slot_PushSettlementBounsSuccess} Slot_PushSettlementBounsSuccess instance
     */
    Slot_PushSettlementBounsSuccess.create = function create(properties) {
        return new Slot_PushSettlementBounsSuccess(properties);
    };

    /**
     * Encodes the specified Slot_PushSettlementBounsSuccess message. Does not implicitly {@link Slot_PushSettlementBounsSuccess.verify|verify} messages.
     * @function encode
     * @memberof Slot_PushSettlementBounsSuccess
     * @static
     * @param {ISlot_PushSettlementBounsSuccess} message Slot_PushSettlementBounsSuccess message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_PushSettlementBounsSuccess.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.betKey != null && Object.hasOwnProperty.call(message, "betKey"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.betKey);
        if (message.currentGameInfo != null && Object.hasOwnProperty.call(message, "currentGameInfo"))
            $root.Slot_SubGameInfo.encode(message.currentGameInfo, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.playerCollectInfo != null && Object.hasOwnProperty.call(message, "playerCollectInfo"))
            $root.Slot_PlayerCollectInfo.encode(message.playerCollectInfo, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.winAmount != null && Object.hasOwnProperty.call(message, "winAmount"))
            writer.uint32(/* id 4, wireType 0 =*/32).int64(message.winAmount);
        if (message.balance != null && Object.hasOwnProperty.call(message, "balance"))
            writer.uint32(/* id 5, wireType 0 =*/40).int64(message.balance);
        return writer;
    };

    /**
     * Encodes the specified Slot_PushSettlementBounsSuccess message, length delimited. Does not implicitly {@link Slot_PushSettlementBounsSuccess.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Slot_PushSettlementBounsSuccess
     * @static
     * @param {ISlot_PushSettlementBounsSuccess} message Slot_PushSettlementBounsSuccess message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_PushSettlementBounsSuccess.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Slot_PushSettlementBounsSuccess message from the specified reader or buffer.
     * @function decode
     * @memberof Slot_PushSettlementBounsSuccess
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Slot_PushSettlementBounsSuccess} Slot_PushSettlementBounsSuccess
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_PushSettlementBounsSuccess.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Slot_PushSettlementBounsSuccess();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.betKey = reader.int32();
                break;
            case 2:
                message.currentGameInfo = $root.Slot_SubGameInfo.decode(reader, reader.uint32());
                break;
            case 3:
                message.playerCollectInfo = $root.Slot_PlayerCollectInfo.decode(reader, reader.uint32());
                break;
            case 4:
                message.winAmount = reader.int64();
                break;
            case 5:
                message.balance = reader.int64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Slot_PushSettlementBounsSuccess message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Slot_PushSettlementBounsSuccess
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Slot_PushSettlementBounsSuccess} Slot_PushSettlementBounsSuccess
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_PushSettlementBounsSuccess.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Slot_PushSettlementBounsSuccess message.
     * @function verify
     * @memberof Slot_PushSettlementBounsSuccess
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Slot_PushSettlementBounsSuccess.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.betKey != null && message.hasOwnProperty("betKey"))
            if (!$util.isInteger(message.betKey))
                return "betKey: integer expected";
        if (message.currentGameInfo != null && message.hasOwnProperty("currentGameInfo")) {
            var error = $root.Slot_SubGameInfo.verify(message.currentGameInfo);
            if (error)
                return "currentGameInfo." + error;
        }
        if (message.playerCollectInfo != null && message.hasOwnProperty("playerCollectInfo")) {
            var error = $root.Slot_PlayerCollectInfo.verify(message.playerCollectInfo);
            if (error)
                return "playerCollectInfo." + error;
        }
        if (message.winAmount != null && message.hasOwnProperty("winAmount"))
            if (!$util.isInteger(message.winAmount) && !(message.winAmount && $util.isInteger(message.winAmount.low) && $util.isInteger(message.winAmount.high)))
                return "winAmount: integer|Long expected";
        if (message.balance != null && message.hasOwnProperty("balance"))
            if (!$util.isInteger(message.balance) && !(message.balance && $util.isInteger(message.balance.low) && $util.isInteger(message.balance.high)))
                return "balance: integer|Long expected";
        return null;
    };

    /**
     * Creates a Slot_PushSettlementBounsSuccess message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Slot_PushSettlementBounsSuccess
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Slot_PushSettlementBounsSuccess} Slot_PushSettlementBounsSuccess
     */
    Slot_PushSettlementBounsSuccess.fromObject = function fromObject(object) {
        if (object instanceof $root.Slot_PushSettlementBounsSuccess)
            return object;
        var message = new $root.Slot_PushSettlementBounsSuccess();
        if (object.betKey != null)
            message.betKey = object.betKey | 0;
        if (object.currentGameInfo != null) {
            if (typeof object.currentGameInfo !== "object")
                throw TypeError(".Slot_PushSettlementBounsSuccess.currentGameInfo: object expected");
            message.currentGameInfo = $root.Slot_SubGameInfo.fromObject(object.currentGameInfo);
        }
        if (object.playerCollectInfo != null) {
            if (typeof object.playerCollectInfo !== "object")
                throw TypeError(".Slot_PushSettlementBounsSuccess.playerCollectInfo: object expected");
            message.playerCollectInfo = $root.Slot_PlayerCollectInfo.fromObject(object.playerCollectInfo);
        }
        if (object.winAmount != null)
            if ($util.Long)
                (message.winAmount = $util.Long.fromValue(object.winAmount)).unsigned = false;
            else if (typeof object.winAmount === "string")
                message.winAmount = parseInt(object.winAmount, 10);
            else if (typeof object.winAmount === "number")
                message.winAmount = object.winAmount;
            else if (typeof object.winAmount === "object")
                message.winAmount = new $util.LongBits(object.winAmount.low >>> 0, object.winAmount.high >>> 0).toNumber();
        if (object.balance != null)
            if ($util.Long)
                (message.balance = $util.Long.fromValue(object.balance)).unsigned = false;
            else if (typeof object.balance === "string")
                message.balance = parseInt(object.balance, 10);
            else if (typeof object.balance === "number")
                message.balance = object.balance;
            else if (typeof object.balance === "object")
                message.balance = new $util.LongBits(object.balance.low >>> 0, object.balance.high >>> 0).toNumber();
        return message;
    };

    /**
     * Creates a plain object from a Slot_PushSettlementBounsSuccess message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Slot_PushSettlementBounsSuccess
     * @static
     * @param {Slot_PushSettlementBounsSuccess} message Slot_PushSettlementBounsSuccess
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Slot_PushSettlementBounsSuccess.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.betKey = 0;
            object.currentGameInfo = null;
            object.playerCollectInfo = null;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.winAmount = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.winAmount = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.balance = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.balance = options.longs === String ? "0" : 0;
        }
        if (message.betKey != null && message.hasOwnProperty("betKey"))
            object.betKey = message.betKey;
        if (message.currentGameInfo != null && message.hasOwnProperty("currentGameInfo"))
            object.currentGameInfo = $root.Slot_SubGameInfo.toObject(message.currentGameInfo, options);
        if (message.playerCollectInfo != null && message.hasOwnProperty("playerCollectInfo"))
            object.playerCollectInfo = $root.Slot_PlayerCollectInfo.toObject(message.playerCollectInfo, options);
        if (message.winAmount != null && message.hasOwnProperty("winAmount"))
            if (typeof message.winAmount === "number")
                object.winAmount = options.longs === String ? String(message.winAmount) : message.winAmount;
            else
                object.winAmount = options.longs === String ? $util.Long.prototype.toString.call(message.winAmount) : options.longs === Number ? new $util.LongBits(message.winAmount.low >>> 0, message.winAmount.high >>> 0).toNumber() : message.winAmount;
        if (message.balance != null && message.hasOwnProperty("balance"))
            if (typeof message.balance === "number")
                object.balance = options.longs === String ? String(message.balance) : message.balance;
            else
                object.balance = options.longs === String ? $util.Long.prototype.toString.call(message.balance) : options.longs === Number ? new $util.LongBits(message.balance.low >>> 0, message.balance.high >>> 0).toNumber() : message.balance;
        return object;
    };

    /**
     * Converts this Slot_PushSettlementBounsSuccess to JSON.
     * @function toJSON
     * @memberof Slot_PushSettlementBounsSuccess
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Slot_PushSettlementBounsSuccess.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Slot_PushSettlementBounsSuccess;
})();

$root.Slot_ReqChooseSubGame = (function() {

    /**
     * Properties of a Slot_ReqChooseSubGame.
     * @exports ISlot_ReqChooseSubGame
     * @interface ISlot_ReqChooseSubGame
     * @property {number|null} [betKey] Slot_ReqChooseSubGame betKey
     * @property {number|null} [subGameType] Slot_ReqChooseSubGame subGameType
     */

    /**
     * Constructs a new Slot_ReqChooseSubGame.
     * @exports Slot_ReqChooseSubGame
     * @classdesc Represents a Slot_ReqChooseSubGame.
     * @implements ISlot_ReqChooseSubGame
     * @constructor
     * @param {ISlot_ReqChooseSubGame=} [properties] Properties to set
     */
    function Slot_ReqChooseSubGame(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Slot_ReqChooseSubGame betKey.
     * @member {number} betKey
     * @memberof Slot_ReqChooseSubGame
     * @instance
     */
    Slot_ReqChooseSubGame.prototype.betKey = 0;

    /**
     * Slot_ReqChooseSubGame subGameType.
     * @member {number} subGameType
     * @memberof Slot_ReqChooseSubGame
     * @instance
     */
    Slot_ReqChooseSubGame.prototype.subGameType = 0;

    /**
     * Creates a new Slot_ReqChooseSubGame instance using the specified properties.
     * @function create
     * @memberof Slot_ReqChooseSubGame
     * @static
     * @param {ISlot_ReqChooseSubGame=} [properties] Properties to set
     * @returns {Slot_ReqChooseSubGame} Slot_ReqChooseSubGame instance
     */
    Slot_ReqChooseSubGame.create = function create(properties) {
        return new Slot_ReqChooseSubGame(properties);
    };

    /**
     * Encodes the specified Slot_ReqChooseSubGame message. Does not implicitly {@link Slot_ReqChooseSubGame.verify|verify} messages.
     * @function encode
     * @memberof Slot_ReqChooseSubGame
     * @static
     * @param {ISlot_ReqChooseSubGame} message Slot_ReqChooseSubGame message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_ReqChooseSubGame.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.betKey != null && Object.hasOwnProperty.call(message, "betKey"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.betKey);
        if (message.subGameType != null && Object.hasOwnProperty.call(message, "subGameType"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.subGameType);
        return writer;
    };

    /**
     * Encodes the specified Slot_ReqChooseSubGame message, length delimited. Does not implicitly {@link Slot_ReqChooseSubGame.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Slot_ReqChooseSubGame
     * @static
     * @param {ISlot_ReqChooseSubGame} message Slot_ReqChooseSubGame message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_ReqChooseSubGame.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Slot_ReqChooseSubGame message from the specified reader or buffer.
     * @function decode
     * @memberof Slot_ReqChooseSubGame
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Slot_ReqChooseSubGame} Slot_ReqChooseSubGame
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_ReqChooseSubGame.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Slot_ReqChooseSubGame();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.betKey = reader.int32();
                break;
            case 2:
                message.subGameType = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Slot_ReqChooseSubGame message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Slot_ReqChooseSubGame
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Slot_ReqChooseSubGame} Slot_ReqChooseSubGame
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_ReqChooseSubGame.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Slot_ReqChooseSubGame message.
     * @function verify
     * @memberof Slot_ReqChooseSubGame
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Slot_ReqChooseSubGame.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.betKey != null && message.hasOwnProperty("betKey"))
            if (!$util.isInteger(message.betKey))
                return "betKey: integer expected";
        if (message.subGameType != null && message.hasOwnProperty("subGameType"))
            if (!$util.isInteger(message.subGameType))
                return "subGameType: integer expected";
        return null;
    };

    /**
     * Creates a Slot_ReqChooseSubGame message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Slot_ReqChooseSubGame
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Slot_ReqChooseSubGame} Slot_ReqChooseSubGame
     */
    Slot_ReqChooseSubGame.fromObject = function fromObject(object) {
        if (object instanceof $root.Slot_ReqChooseSubGame)
            return object;
        var message = new $root.Slot_ReqChooseSubGame();
        if (object.betKey != null)
            message.betKey = object.betKey | 0;
        if (object.subGameType != null)
            message.subGameType = object.subGameType | 0;
        return message;
    };

    /**
     * Creates a plain object from a Slot_ReqChooseSubGame message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Slot_ReqChooseSubGame
     * @static
     * @param {Slot_ReqChooseSubGame} message Slot_ReqChooseSubGame
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Slot_ReqChooseSubGame.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.betKey = 0;
            object.subGameType = 0;
        }
        if (message.betKey != null && message.hasOwnProperty("betKey"))
            object.betKey = message.betKey;
        if (message.subGameType != null && message.hasOwnProperty("subGameType"))
            object.subGameType = message.subGameType;
        return object;
    };

    /**
     * Converts this Slot_ReqChooseSubGame to JSON.
     * @function toJSON
     * @memberof Slot_ReqChooseSubGame
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Slot_ReqChooseSubGame.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Slot_ReqChooseSubGame;
})();

$root.Slot_PushChooseSubGame = (function() {

    /**
     * Properties of a Slot_PushChooseSubGame.
     * @exports ISlot_PushChooseSubGame
     * @interface ISlot_PushChooseSubGame
     * @property {number|null} [betKey] Slot_PushChooseSubGame betKey
     * @property {ISlot_SubGameInfo|null} [currentGameInfo] Slot_PushChooseSubGame currentGameInfo
     */

    /**
     * Constructs a new Slot_PushChooseSubGame.
     * @exports Slot_PushChooseSubGame
     * @classdesc Represents a Slot_PushChooseSubGame.
     * @implements ISlot_PushChooseSubGame
     * @constructor
     * @param {ISlot_PushChooseSubGame=} [properties] Properties to set
     */
    function Slot_PushChooseSubGame(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Slot_PushChooseSubGame betKey.
     * @member {number} betKey
     * @memberof Slot_PushChooseSubGame
     * @instance
     */
    Slot_PushChooseSubGame.prototype.betKey = 0;

    /**
     * Slot_PushChooseSubGame currentGameInfo.
     * @member {ISlot_SubGameInfo|null|undefined} currentGameInfo
     * @memberof Slot_PushChooseSubGame
     * @instance
     */
    Slot_PushChooseSubGame.prototype.currentGameInfo = null;

    /**
     * Creates a new Slot_PushChooseSubGame instance using the specified properties.
     * @function create
     * @memberof Slot_PushChooseSubGame
     * @static
     * @param {ISlot_PushChooseSubGame=} [properties] Properties to set
     * @returns {Slot_PushChooseSubGame} Slot_PushChooseSubGame instance
     */
    Slot_PushChooseSubGame.create = function create(properties) {
        return new Slot_PushChooseSubGame(properties);
    };

    /**
     * Encodes the specified Slot_PushChooseSubGame message. Does not implicitly {@link Slot_PushChooseSubGame.verify|verify} messages.
     * @function encode
     * @memberof Slot_PushChooseSubGame
     * @static
     * @param {ISlot_PushChooseSubGame} message Slot_PushChooseSubGame message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_PushChooseSubGame.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.betKey != null && Object.hasOwnProperty.call(message, "betKey"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.betKey);
        if (message.currentGameInfo != null && Object.hasOwnProperty.call(message, "currentGameInfo"))
            $root.Slot_SubGameInfo.encode(message.currentGameInfo, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Slot_PushChooseSubGame message, length delimited. Does not implicitly {@link Slot_PushChooseSubGame.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Slot_PushChooseSubGame
     * @static
     * @param {ISlot_PushChooseSubGame} message Slot_PushChooseSubGame message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_PushChooseSubGame.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Slot_PushChooseSubGame message from the specified reader or buffer.
     * @function decode
     * @memberof Slot_PushChooseSubGame
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Slot_PushChooseSubGame} Slot_PushChooseSubGame
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_PushChooseSubGame.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Slot_PushChooseSubGame();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.betKey = reader.int32();
                break;
            case 2:
                message.currentGameInfo = $root.Slot_SubGameInfo.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Slot_PushChooseSubGame message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Slot_PushChooseSubGame
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Slot_PushChooseSubGame} Slot_PushChooseSubGame
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_PushChooseSubGame.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Slot_PushChooseSubGame message.
     * @function verify
     * @memberof Slot_PushChooseSubGame
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Slot_PushChooseSubGame.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.betKey != null && message.hasOwnProperty("betKey"))
            if (!$util.isInteger(message.betKey))
                return "betKey: integer expected";
        if (message.currentGameInfo != null && message.hasOwnProperty("currentGameInfo")) {
            var error = $root.Slot_SubGameInfo.verify(message.currentGameInfo);
            if (error)
                return "currentGameInfo." + error;
        }
        return null;
    };

    /**
     * Creates a Slot_PushChooseSubGame message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Slot_PushChooseSubGame
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Slot_PushChooseSubGame} Slot_PushChooseSubGame
     */
    Slot_PushChooseSubGame.fromObject = function fromObject(object) {
        if (object instanceof $root.Slot_PushChooseSubGame)
            return object;
        var message = new $root.Slot_PushChooseSubGame();
        if (object.betKey != null)
            message.betKey = object.betKey | 0;
        if (object.currentGameInfo != null) {
            if (typeof object.currentGameInfo !== "object")
                throw TypeError(".Slot_PushChooseSubGame.currentGameInfo: object expected");
            message.currentGameInfo = $root.Slot_SubGameInfo.fromObject(object.currentGameInfo);
        }
        return message;
    };

    /**
     * Creates a plain object from a Slot_PushChooseSubGame message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Slot_PushChooseSubGame
     * @static
     * @param {Slot_PushChooseSubGame} message Slot_PushChooseSubGame
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Slot_PushChooseSubGame.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.betKey = 0;
            object.currentGameInfo = null;
        }
        if (message.betKey != null && message.hasOwnProperty("betKey"))
            object.betKey = message.betKey;
        if (message.currentGameInfo != null && message.hasOwnProperty("currentGameInfo"))
            object.currentGameInfo = $root.Slot_SubGameInfo.toObject(message.currentGameInfo, options);
        return object;
    };

    /**
     * Converts this Slot_PushChooseSubGame to JSON.
     * @function toJSON
     * @memberof Slot_PushChooseSubGame
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Slot_PushChooseSubGame.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Slot_PushChooseSubGame;
})();

$root.Slot_ReqBingoReward = (function() {

    /**
     * Properties of a Slot_ReqBingoReward.
     * @exports ISlot_ReqBingoReward
     * @interface ISlot_ReqBingoReward
     * @property {number|null} [betKey] Slot_ReqBingoReward betKey
     */

    /**
     * Constructs a new Slot_ReqBingoReward.
     * @exports Slot_ReqBingoReward
     * @classdesc Represents a Slot_ReqBingoReward.
     * @implements ISlot_ReqBingoReward
     * @constructor
     * @param {ISlot_ReqBingoReward=} [properties] Properties to set
     */
    function Slot_ReqBingoReward(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Slot_ReqBingoReward betKey.
     * @member {number} betKey
     * @memberof Slot_ReqBingoReward
     * @instance
     */
    Slot_ReqBingoReward.prototype.betKey = 0;

    /**
     * Creates a new Slot_ReqBingoReward instance using the specified properties.
     * @function create
     * @memberof Slot_ReqBingoReward
     * @static
     * @param {ISlot_ReqBingoReward=} [properties] Properties to set
     * @returns {Slot_ReqBingoReward} Slot_ReqBingoReward instance
     */
    Slot_ReqBingoReward.create = function create(properties) {
        return new Slot_ReqBingoReward(properties);
    };

    /**
     * Encodes the specified Slot_ReqBingoReward message. Does not implicitly {@link Slot_ReqBingoReward.verify|verify} messages.
     * @function encode
     * @memberof Slot_ReqBingoReward
     * @static
     * @param {ISlot_ReqBingoReward} message Slot_ReqBingoReward message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_ReqBingoReward.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.betKey != null && Object.hasOwnProperty.call(message, "betKey"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.betKey);
        return writer;
    };

    /**
     * Encodes the specified Slot_ReqBingoReward message, length delimited. Does not implicitly {@link Slot_ReqBingoReward.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Slot_ReqBingoReward
     * @static
     * @param {ISlot_ReqBingoReward} message Slot_ReqBingoReward message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_ReqBingoReward.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Slot_ReqBingoReward message from the specified reader or buffer.
     * @function decode
     * @memberof Slot_ReqBingoReward
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Slot_ReqBingoReward} Slot_ReqBingoReward
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_ReqBingoReward.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Slot_ReqBingoReward();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.betKey = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Slot_ReqBingoReward message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Slot_ReqBingoReward
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Slot_ReqBingoReward} Slot_ReqBingoReward
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_ReqBingoReward.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Slot_ReqBingoReward message.
     * @function verify
     * @memberof Slot_ReqBingoReward
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Slot_ReqBingoReward.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.betKey != null && message.hasOwnProperty("betKey"))
            if (!$util.isInteger(message.betKey))
                return "betKey: integer expected";
        return null;
    };

    /**
     * Creates a Slot_ReqBingoReward message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Slot_ReqBingoReward
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Slot_ReqBingoReward} Slot_ReqBingoReward
     */
    Slot_ReqBingoReward.fromObject = function fromObject(object) {
        if (object instanceof $root.Slot_ReqBingoReward)
            return object;
        var message = new $root.Slot_ReqBingoReward();
        if (object.betKey != null)
            message.betKey = object.betKey | 0;
        return message;
    };

    /**
     * Creates a plain object from a Slot_ReqBingoReward message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Slot_ReqBingoReward
     * @static
     * @param {Slot_ReqBingoReward} message Slot_ReqBingoReward
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Slot_ReqBingoReward.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.betKey = 0;
        if (message.betKey != null && message.hasOwnProperty("betKey"))
            object.betKey = message.betKey;
        return object;
    };

    /**
     * Converts this Slot_ReqBingoReward to JSON.
     * @function toJSON
     * @memberof Slot_ReqBingoReward
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Slot_ReqBingoReward.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Slot_ReqBingoReward;
})();

$root.Slot_PushBingoReward = (function() {

    /**
     * Properties of a Slot_PushBingoReward.
     * @exports ISlot_PushBingoReward
     * @interface ISlot_PushBingoReward
     * @property {number|null} [betKey] Slot_PushBingoReward betKey
     * @property {Array.<ISlot_SlotRewardSubject>|null} [slotRewards] Slot_PushBingoReward slotRewards
     */

    /**
     * Constructs a new Slot_PushBingoReward.
     * @exports Slot_PushBingoReward
     * @classdesc Represents a Slot_PushBingoReward.
     * @implements ISlot_PushBingoReward
     * @constructor
     * @param {ISlot_PushBingoReward=} [properties] Properties to set
     */
    function Slot_PushBingoReward(properties) {
        this.slotRewards = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Slot_PushBingoReward betKey.
     * @member {number} betKey
     * @memberof Slot_PushBingoReward
     * @instance
     */
    Slot_PushBingoReward.prototype.betKey = 0;

    /**
     * Slot_PushBingoReward slotRewards.
     * @member {Array.<ISlot_SlotRewardSubject>} slotRewards
     * @memberof Slot_PushBingoReward
     * @instance
     */
    Slot_PushBingoReward.prototype.slotRewards = $util.emptyArray;

    /**
     * Creates a new Slot_PushBingoReward instance using the specified properties.
     * @function create
     * @memberof Slot_PushBingoReward
     * @static
     * @param {ISlot_PushBingoReward=} [properties] Properties to set
     * @returns {Slot_PushBingoReward} Slot_PushBingoReward instance
     */
    Slot_PushBingoReward.create = function create(properties) {
        return new Slot_PushBingoReward(properties);
    };

    /**
     * Encodes the specified Slot_PushBingoReward message. Does not implicitly {@link Slot_PushBingoReward.verify|verify} messages.
     * @function encode
     * @memberof Slot_PushBingoReward
     * @static
     * @param {ISlot_PushBingoReward} message Slot_PushBingoReward message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_PushBingoReward.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.betKey != null && Object.hasOwnProperty.call(message, "betKey"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.betKey);
        if (message.slotRewards != null && message.slotRewards.length)
            for (var i = 0; i < message.slotRewards.length; ++i)
                $root.Slot_SlotRewardSubject.encode(message.slotRewards[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Slot_PushBingoReward message, length delimited. Does not implicitly {@link Slot_PushBingoReward.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Slot_PushBingoReward
     * @static
     * @param {ISlot_PushBingoReward} message Slot_PushBingoReward message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_PushBingoReward.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Slot_PushBingoReward message from the specified reader or buffer.
     * @function decode
     * @memberof Slot_PushBingoReward
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Slot_PushBingoReward} Slot_PushBingoReward
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_PushBingoReward.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Slot_PushBingoReward();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.betKey = reader.int32();
                break;
            case 2:
                if (!(message.slotRewards && message.slotRewards.length))
                    message.slotRewards = [];
                message.slotRewards.push($root.Slot_SlotRewardSubject.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Slot_PushBingoReward message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Slot_PushBingoReward
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Slot_PushBingoReward} Slot_PushBingoReward
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_PushBingoReward.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Slot_PushBingoReward message.
     * @function verify
     * @memberof Slot_PushBingoReward
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Slot_PushBingoReward.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.betKey != null && message.hasOwnProperty("betKey"))
            if (!$util.isInteger(message.betKey))
                return "betKey: integer expected";
        if (message.slotRewards != null && message.hasOwnProperty("slotRewards")) {
            if (!Array.isArray(message.slotRewards))
                return "slotRewards: array expected";
            for (var i = 0; i < message.slotRewards.length; ++i) {
                var error = $root.Slot_SlotRewardSubject.verify(message.slotRewards[i]);
                if (error)
                    return "slotRewards." + error;
            }
        }
        return null;
    };

    /**
     * Creates a Slot_PushBingoReward message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Slot_PushBingoReward
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Slot_PushBingoReward} Slot_PushBingoReward
     */
    Slot_PushBingoReward.fromObject = function fromObject(object) {
        if (object instanceof $root.Slot_PushBingoReward)
            return object;
        var message = new $root.Slot_PushBingoReward();
        if (object.betKey != null)
            message.betKey = object.betKey | 0;
        if (object.slotRewards) {
            if (!Array.isArray(object.slotRewards))
                throw TypeError(".Slot_PushBingoReward.slotRewards: array expected");
            message.slotRewards = [];
            for (var i = 0; i < object.slotRewards.length; ++i) {
                if (typeof object.slotRewards[i] !== "object")
                    throw TypeError(".Slot_PushBingoReward.slotRewards: object expected");
                message.slotRewards[i] = $root.Slot_SlotRewardSubject.fromObject(object.slotRewards[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a Slot_PushBingoReward message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Slot_PushBingoReward
     * @static
     * @param {Slot_PushBingoReward} message Slot_PushBingoReward
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Slot_PushBingoReward.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.slotRewards = [];
        if (options.defaults)
            object.betKey = 0;
        if (message.betKey != null && message.hasOwnProperty("betKey"))
            object.betKey = message.betKey;
        if (message.slotRewards && message.slotRewards.length) {
            object.slotRewards = [];
            for (var j = 0; j < message.slotRewards.length; ++j)
                object.slotRewards[j] = $root.Slot_SlotRewardSubject.toObject(message.slotRewards[j], options);
        }
        return object;
    };

    /**
     * Converts this Slot_PushBingoReward to JSON.
     * @function toJSON
     * @memberof Slot_PushBingoReward
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Slot_PushBingoReward.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Slot_PushBingoReward;
})();

$root.Slot_PlayerCollectInfo = (function() {

    /**
     * Properties of a Slot_PlayerCollectInfo.
     * @exports ISlot_PlayerCollectInfo
     * @interface ISlot_PlayerCollectInfo
     * @property {number|Long|null} [averageBetAmount] Slot_PlayerCollectInfo averageBetAmount
     * @property {number|null} [collectCurrentValue] Slot_PlayerCollectInfo collectCurrentValue
     * @property {number|null} [collectMaxValue] Slot_PlayerCollectInfo collectMaxValue
     * @property {number|null} [currentIndex] Slot_PlayerCollectInfo currentIndex
     * @property {boolean|null} [haveReward] Slot_PlayerCollectInfo haveReward
     * @property {Array.<ISlot_SlotRewardSubject>|null} [slotRewards] Slot_PlayerCollectInfo slotRewards
     * @property {Array.<ISlot_SlotRewardSubject>|null} [receivedSlotRewards] Slot_PlayerCollectInfo receivedSlotRewards
     * @property {Array.<ISlot_SlotRewardSubject>|null} [buffSlotRewards] Slot_PlayerCollectInfo buffSlotRewards
     * @property {number|null} [betkey] Slot_PlayerCollectInfo betkey
     */

    /**
     * Constructs a new Slot_PlayerCollectInfo.
     * @exports Slot_PlayerCollectInfo
     * @classdesc Represents a Slot_PlayerCollectInfo.
     * @implements ISlot_PlayerCollectInfo
     * @constructor
     * @param {ISlot_PlayerCollectInfo=} [properties] Properties to set
     */
    function Slot_PlayerCollectInfo(properties) {
        this.slotRewards = [];
        this.receivedSlotRewards = [];
        this.buffSlotRewards = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Slot_PlayerCollectInfo averageBetAmount.
     * @member {number|Long} averageBetAmount
     * @memberof Slot_PlayerCollectInfo
     * @instance
     */
    Slot_PlayerCollectInfo.prototype.averageBetAmount = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Slot_PlayerCollectInfo collectCurrentValue.
     * @member {number} collectCurrentValue
     * @memberof Slot_PlayerCollectInfo
     * @instance
     */
    Slot_PlayerCollectInfo.prototype.collectCurrentValue = 0;

    /**
     * Slot_PlayerCollectInfo collectMaxValue.
     * @member {number} collectMaxValue
     * @memberof Slot_PlayerCollectInfo
     * @instance
     */
    Slot_PlayerCollectInfo.prototype.collectMaxValue = 0;

    /**
     * Slot_PlayerCollectInfo currentIndex.
     * @member {number} currentIndex
     * @memberof Slot_PlayerCollectInfo
     * @instance
     */
    Slot_PlayerCollectInfo.prototype.currentIndex = 0;

    /**
     * Slot_PlayerCollectInfo haveReward.
     * @member {boolean} haveReward
     * @memberof Slot_PlayerCollectInfo
     * @instance
     */
    Slot_PlayerCollectInfo.prototype.haveReward = false;

    /**
     * Slot_PlayerCollectInfo slotRewards.
     * @member {Array.<ISlot_SlotRewardSubject>} slotRewards
     * @memberof Slot_PlayerCollectInfo
     * @instance
     */
    Slot_PlayerCollectInfo.prototype.slotRewards = $util.emptyArray;

    /**
     * Slot_PlayerCollectInfo receivedSlotRewards.
     * @member {Array.<ISlot_SlotRewardSubject>} receivedSlotRewards
     * @memberof Slot_PlayerCollectInfo
     * @instance
     */
    Slot_PlayerCollectInfo.prototype.receivedSlotRewards = $util.emptyArray;

    /**
     * Slot_PlayerCollectInfo buffSlotRewards.
     * @member {Array.<ISlot_SlotRewardSubject>} buffSlotRewards
     * @memberof Slot_PlayerCollectInfo
     * @instance
     */
    Slot_PlayerCollectInfo.prototype.buffSlotRewards = $util.emptyArray;

    /**
     * Slot_PlayerCollectInfo betkey.
     * @member {number} betkey
     * @memberof Slot_PlayerCollectInfo
     * @instance
     */
    Slot_PlayerCollectInfo.prototype.betkey = 0;

    /**
     * Creates a new Slot_PlayerCollectInfo instance using the specified properties.
     * @function create
     * @memberof Slot_PlayerCollectInfo
     * @static
     * @param {ISlot_PlayerCollectInfo=} [properties] Properties to set
     * @returns {Slot_PlayerCollectInfo} Slot_PlayerCollectInfo instance
     */
    Slot_PlayerCollectInfo.create = function create(properties) {
        return new Slot_PlayerCollectInfo(properties);
    };

    /**
     * Encodes the specified Slot_PlayerCollectInfo message. Does not implicitly {@link Slot_PlayerCollectInfo.verify|verify} messages.
     * @function encode
     * @memberof Slot_PlayerCollectInfo
     * @static
     * @param {ISlot_PlayerCollectInfo} message Slot_PlayerCollectInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_PlayerCollectInfo.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.averageBetAmount != null && Object.hasOwnProperty.call(message, "averageBetAmount"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.averageBetAmount);
        if (message.collectCurrentValue != null && Object.hasOwnProperty.call(message, "collectCurrentValue"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.collectCurrentValue);
        if (message.collectMaxValue != null && Object.hasOwnProperty.call(message, "collectMaxValue"))
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.collectMaxValue);
        if (message.currentIndex != null && Object.hasOwnProperty.call(message, "currentIndex"))
            writer.uint32(/* id 4, wireType 0 =*/32).int32(message.currentIndex);
        if (message.haveReward != null && Object.hasOwnProperty.call(message, "haveReward"))
            writer.uint32(/* id 5, wireType 0 =*/40).bool(message.haveReward);
        if (message.slotRewards != null && message.slotRewards.length)
            for (var i = 0; i < message.slotRewards.length; ++i)
                $root.Slot_SlotRewardSubject.encode(message.slotRewards[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        if (message.receivedSlotRewards != null && message.receivedSlotRewards.length)
            for (var i = 0; i < message.receivedSlotRewards.length; ++i)
                $root.Slot_SlotRewardSubject.encode(message.receivedSlotRewards[i], writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
        if (message.buffSlotRewards != null && message.buffSlotRewards.length)
            for (var i = 0; i < message.buffSlotRewards.length; ++i)
                $root.Slot_SlotRewardSubject.encode(message.buffSlotRewards[i], writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
        if (message.betkey != null && Object.hasOwnProperty.call(message, "betkey"))
            writer.uint32(/* id 9, wireType 0 =*/72).int32(message.betkey);
        return writer;
    };

    /**
     * Encodes the specified Slot_PlayerCollectInfo message, length delimited. Does not implicitly {@link Slot_PlayerCollectInfo.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Slot_PlayerCollectInfo
     * @static
     * @param {ISlot_PlayerCollectInfo} message Slot_PlayerCollectInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_PlayerCollectInfo.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Slot_PlayerCollectInfo message from the specified reader or buffer.
     * @function decode
     * @memberof Slot_PlayerCollectInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Slot_PlayerCollectInfo} Slot_PlayerCollectInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_PlayerCollectInfo.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Slot_PlayerCollectInfo();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.averageBetAmount = reader.int64();
                break;
            case 2:
                message.collectCurrentValue = reader.int32();
                break;
            case 3:
                message.collectMaxValue = reader.int32();
                break;
            case 4:
                message.currentIndex = reader.int32();
                break;
            case 5:
                message.haveReward = reader.bool();
                break;
            case 6:
                if (!(message.slotRewards && message.slotRewards.length))
                    message.slotRewards = [];
                message.slotRewards.push($root.Slot_SlotRewardSubject.decode(reader, reader.uint32()));
                break;
            case 7:
                if (!(message.receivedSlotRewards && message.receivedSlotRewards.length))
                    message.receivedSlotRewards = [];
                message.receivedSlotRewards.push($root.Slot_SlotRewardSubject.decode(reader, reader.uint32()));
                break;
            case 8:
                if (!(message.buffSlotRewards && message.buffSlotRewards.length))
                    message.buffSlotRewards = [];
                message.buffSlotRewards.push($root.Slot_SlotRewardSubject.decode(reader, reader.uint32()));
                break;
            case 9:
                message.betkey = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Slot_PlayerCollectInfo message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Slot_PlayerCollectInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Slot_PlayerCollectInfo} Slot_PlayerCollectInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_PlayerCollectInfo.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Slot_PlayerCollectInfo message.
     * @function verify
     * @memberof Slot_PlayerCollectInfo
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Slot_PlayerCollectInfo.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.averageBetAmount != null && message.hasOwnProperty("averageBetAmount"))
            if (!$util.isInteger(message.averageBetAmount) && !(message.averageBetAmount && $util.isInteger(message.averageBetAmount.low) && $util.isInteger(message.averageBetAmount.high)))
                return "averageBetAmount: integer|Long expected";
        if (message.collectCurrentValue != null && message.hasOwnProperty("collectCurrentValue"))
            if (!$util.isInteger(message.collectCurrentValue))
                return "collectCurrentValue: integer expected";
        if (message.collectMaxValue != null && message.hasOwnProperty("collectMaxValue"))
            if (!$util.isInteger(message.collectMaxValue))
                return "collectMaxValue: integer expected";
        if (message.currentIndex != null && message.hasOwnProperty("currentIndex"))
            if (!$util.isInteger(message.currentIndex))
                return "currentIndex: integer expected";
        if (message.haveReward != null && message.hasOwnProperty("haveReward"))
            if (typeof message.haveReward !== "boolean")
                return "haveReward: boolean expected";
        if (message.slotRewards != null && message.hasOwnProperty("slotRewards")) {
            if (!Array.isArray(message.slotRewards))
                return "slotRewards: array expected";
            for (var i = 0; i < message.slotRewards.length; ++i) {
                var error = $root.Slot_SlotRewardSubject.verify(message.slotRewards[i]);
                if (error)
                    return "slotRewards." + error;
            }
        }
        if (message.receivedSlotRewards != null && message.hasOwnProperty("receivedSlotRewards")) {
            if (!Array.isArray(message.receivedSlotRewards))
                return "receivedSlotRewards: array expected";
            for (var i = 0; i < message.receivedSlotRewards.length; ++i) {
                var error = $root.Slot_SlotRewardSubject.verify(message.receivedSlotRewards[i]);
                if (error)
                    return "receivedSlotRewards." + error;
            }
        }
        if (message.buffSlotRewards != null && message.hasOwnProperty("buffSlotRewards")) {
            if (!Array.isArray(message.buffSlotRewards))
                return "buffSlotRewards: array expected";
            for (var i = 0; i < message.buffSlotRewards.length; ++i) {
                var error = $root.Slot_SlotRewardSubject.verify(message.buffSlotRewards[i]);
                if (error)
                    return "buffSlotRewards." + error;
            }
        }
        if (message.betkey != null && message.hasOwnProperty("betkey"))
            if (!$util.isInteger(message.betkey))
                return "betkey: integer expected";
        return null;
    };

    /**
     * Creates a Slot_PlayerCollectInfo message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Slot_PlayerCollectInfo
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Slot_PlayerCollectInfo} Slot_PlayerCollectInfo
     */
    Slot_PlayerCollectInfo.fromObject = function fromObject(object) {
        if (object instanceof $root.Slot_PlayerCollectInfo)
            return object;
        var message = new $root.Slot_PlayerCollectInfo();
        if (object.averageBetAmount != null)
            if ($util.Long)
                (message.averageBetAmount = $util.Long.fromValue(object.averageBetAmount)).unsigned = false;
            else if (typeof object.averageBetAmount === "string")
                message.averageBetAmount = parseInt(object.averageBetAmount, 10);
            else if (typeof object.averageBetAmount === "number")
                message.averageBetAmount = object.averageBetAmount;
            else if (typeof object.averageBetAmount === "object")
                message.averageBetAmount = new $util.LongBits(object.averageBetAmount.low >>> 0, object.averageBetAmount.high >>> 0).toNumber();
        if (object.collectCurrentValue != null)
            message.collectCurrentValue = object.collectCurrentValue | 0;
        if (object.collectMaxValue != null)
            message.collectMaxValue = object.collectMaxValue | 0;
        if (object.currentIndex != null)
            message.currentIndex = object.currentIndex | 0;
        if (object.haveReward != null)
            message.haveReward = Boolean(object.haveReward);
        if (object.slotRewards) {
            if (!Array.isArray(object.slotRewards))
                throw TypeError(".Slot_PlayerCollectInfo.slotRewards: array expected");
            message.slotRewards = [];
            for (var i = 0; i < object.slotRewards.length; ++i) {
                if (typeof object.slotRewards[i] !== "object")
                    throw TypeError(".Slot_PlayerCollectInfo.slotRewards: object expected");
                message.slotRewards[i] = $root.Slot_SlotRewardSubject.fromObject(object.slotRewards[i]);
            }
        }
        if (object.receivedSlotRewards) {
            if (!Array.isArray(object.receivedSlotRewards))
                throw TypeError(".Slot_PlayerCollectInfo.receivedSlotRewards: array expected");
            message.receivedSlotRewards = [];
            for (var i = 0; i < object.receivedSlotRewards.length; ++i) {
                if (typeof object.receivedSlotRewards[i] !== "object")
                    throw TypeError(".Slot_PlayerCollectInfo.receivedSlotRewards: object expected");
                message.receivedSlotRewards[i] = $root.Slot_SlotRewardSubject.fromObject(object.receivedSlotRewards[i]);
            }
        }
        if (object.buffSlotRewards) {
            if (!Array.isArray(object.buffSlotRewards))
                throw TypeError(".Slot_PlayerCollectInfo.buffSlotRewards: array expected");
            message.buffSlotRewards = [];
            for (var i = 0; i < object.buffSlotRewards.length; ++i) {
                if (typeof object.buffSlotRewards[i] !== "object")
                    throw TypeError(".Slot_PlayerCollectInfo.buffSlotRewards: object expected");
                message.buffSlotRewards[i] = $root.Slot_SlotRewardSubject.fromObject(object.buffSlotRewards[i]);
            }
        }
        if (object.betkey != null)
            message.betkey = object.betkey | 0;
        return message;
    };

    /**
     * Creates a plain object from a Slot_PlayerCollectInfo message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Slot_PlayerCollectInfo
     * @static
     * @param {Slot_PlayerCollectInfo} message Slot_PlayerCollectInfo
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Slot_PlayerCollectInfo.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults) {
            object.slotRewards = [];
            object.receivedSlotRewards = [];
            object.buffSlotRewards = [];
        }
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.averageBetAmount = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.averageBetAmount = options.longs === String ? "0" : 0;
            object.collectCurrentValue = 0;
            object.collectMaxValue = 0;
            object.currentIndex = 0;
            object.haveReward = false;
            object.betkey = 0;
        }
        if (message.averageBetAmount != null && message.hasOwnProperty("averageBetAmount"))
            if (typeof message.averageBetAmount === "number")
                object.averageBetAmount = options.longs === String ? String(message.averageBetAmount) : message.averageBetAmount;
            else
                object.averageBetAmount = options.longs === String ? $util.Long.prototype.toString.call(message.averageBetAmount) : options.longs === Number ? new $util.LongBits(message.averageBetAmount.low >>> 0, message.averageBetAmount.high >>> 0).toNumber() : message.averageBetAmount;
        if (message.collectCurrentValue != null && message.hasOwnProperty("collectCurrentValue"))
            object.collectCurrentValue = message.collectCurrentValue;
        if (message.collectMaxValue != null && message.hasOwnProperty("collectMaxValue"))
            object.collectMaxValue = message.collectMaxValue;
        if (message.currentIndex != null && message.hasOwnProperty("currentIndex"))
            object.currentIndex = message.currentIndex;
        if (message.haveReward != null && message.hasOwnProperty("haveReward"))
            object.haveReward = message.haveReward;
        if (message.slotRewards && message.slotRewards.length) {
            object.slotRewards = [];
            for (var j = 0; j < message.slotRewards.length; ++j)
                object.slotRewards[j] = $root.Slot_SlotRewardSubject.toObject(message.slotRewards[j], options);
        }
        if (message.receivedSlotRewards && message.receivedSlotRewards.length) {
            object.receivedSlotRewards = [];
            for (var j = 0; j < message.receivedSlotRewards.length; ++j)
                object.receivedSlotRewards[j] = $root.Slot_SlotRewardSubject.toObject(message.receivedSlotRewards[j], options);
        }
        if (message.buffSlotRewards && message.buffSlotRewards.length) {
            object.buffSlotRewards = [];
            for (var j = 0; j < message.buffSlotRewards.length; ++j)
                object.buffSlotRewards[j] = $root.Slot_SlotRewardSubject.toObject(message.buffSlotRewards[j], options);
        }
        if (message.betkey != null && message.hasOwnProperty("betkey"))
            object.betkey = message.betkey;
        return object;
    };

    /**
     * Converts this Slot_PlayerCollectInfo to JSON.
     * @function toJSON
     * @memberof Slot_PlayerCollectInfo
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Slot_PlayerCollectInfo.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Slot_PlayerCollectInfo;
})();

$root.Slot_ReqAcceptCollectAward = (function() {

    /**
     * Properties of a Slot_ReqAcceptCollectAward.
     * @exports ISlot_ReqAcceptCollectAward
     * @interface ISlot_ReqAcceptCollectAward
     * @property {number|null} [betKey] Slot_ReqAcceptCollectAward betKey
     */

    /**
     * Constructs a new Slot_ReqAcceptCollectAward.
     * @exports Slot_ReqAcceptCollectAward
     * @classdesc Represents a Slot_ReqAcceptCollectAward.
     * @implements ISlot_ReqAcceptCollectAward
     * @constructor
     * @param {ISlot_ReqAcceptCollectAward=} [properties] Properties to set
     */
    function Slot_ReqAcceptCollectAward(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Slot_ReqAcceptCollectAward betKey.
     * @member {number} betKey
     * @memberof Slot_ReqAcceptCollectAward
     * @instance
     */
    Slot_ReqAcceptCollectAward.prototype.betKey = 0;

    /**
     * Creates a new Slot_ReqAcceptCollectAward instance using the specified properties.
     * @function create
     * @memberof Slot_ReqAcceptCollectAward
     * @static
     * @param {ISlot_ReqAcceptCollectAward=} [properties] Properties to set
     * @returns {Slot_ReqAcceptCollectAward} Slot_ReqAcceptCollectAward instance
     */
    Slot_ReqAcceptCollectAward.create = function create(properties) {
        return new Slot_ReqAcceptCollectAward(properties);
    };

    /**
     * Encodes the specified Slot_ReqAcceptCollectAward message. Does not implicitly {@link Slot_ReqAcceptCollectAward.verify|verify} messages.
     * @function encode
     * @memberof Slot_ReqAcceptCollectAward
     * @static
     * @param {ISlot_ReqAcceptCollectAward} message Slot_ReqAcceptCollectAward message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_ReqAcceptCollectAward.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.betKey != null && Object.hasOwnProperty.call(message, "betKey"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.betKey);
        return writer;
    };

    /**
     * Encodes the specified Slot_ReqAcceptCollectAward message, length delimited. Does not implicitly {@link Slot_ReqAcceptCollectAward.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Slot_ReqAcceptCollectAward
     * @static
     * @param {ISlot_ReqAcceptCollectAward} message Slot_ReqAcceptCollectAward message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_ReqAcceptCollectAward.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Slot_ReqAcceptCollectAward message from the specified reader or buffer.
     * @function decode
     * @memberof Slot_ReqAcceptCollectAward
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Slot_ReqAcceptCollectAward} Slot_ReqAcceptCollectAward
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_ReqAcceptCollectAward.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Slot_ReqAcceptCollectAward();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.betKey = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Slot_ReqAcceptCollectAward message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Slot_ReqAcceptCollectAward
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Slot_ReqAcceptCollectAward} Slot_ReqAcceptCollectAward
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_ReqAcceptCollectAward.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Slot_ReqAcceptCollectAward message.
     * @function verify
     * @memberof Slot_ReqAcceptCollectAward
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Slot_ReqAcceptCollectAward.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.betKey != null && message.hasOwnProperty("betKey"))
            if (!$util.isInteger(message.betKey))
                return "betKey: integer expected";
        return null;
    };

    /**
     * Creates a Slot_ReqAcceptCollectAward message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Slot_ReqAcceptCollectAward
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Slot_ReqAcceptCollectAward} Slot_ReqAcceptCollectAward
     */
    Slot_ReqAcceptCollectAward.fromObject = function fromObject(object) {
        if (object instanceof $root.Slot_ReqAcceptCollectAward)
            return object;
        var message = new $root.Slot_ReqAcceptCollectAward();
        if (object.betKey != null)
            message.betKey = object.betKey | 0;
        return message;
    };

    /**
     * Creates a plain object from a Slot_ReqAcceptCollectAward message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Slot_ReqAcceptCollectAward
     * @static
     * @param {Slot_ReqAcceptCollectAward} message Slot_ReqAcceptCollectAward
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Slot_ReqAcceptCollectAward.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.betKey = 0;
        if (message.betKey != null && message.hasOwnProperty("betKey"))
            object.betKey = message.betKey;
        return object;
    };

    /**
     * Converts this Slot_ReqAcceptCollectAward to JSON.
     * @function toJSON
     * @memberof Slot_ReqAcceptCollectAward
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Slot_ReqAcceptCollectAward.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Slot_ReqAcceptCollectAward;
})();

$root.Slot_PushAcceptCollectAward = (function() {

    /**
     * Properties of a Slot_PushAcceptCollectAward.
     * @exports ISlot_PushAcceptCollectAward
     * @interface ISlot_PushAcceptCollectAward
     * @property {number|null} [betKey] Slot_PushAcceptCollectAward betKey
     * @property {ISlot_SubGameInfo|null} [currentGameInfo] Slot_PushAcceptCollectAward currentGameInfo
     * @property {ISlot_PlayerCollectInfo|null} [playerCollectInfo] Slot_PushAcceptCollectAward playerCollectInfo
     * @property {number|Long|null} [winAmount] Slot_PushAcceptCollectAward winAmount
     * @property {number|Long|null} [balance] Slot_PushAcceptCollectAward balance
     */

    /**
     * Constructs a new Slot_PushAcceptCollectAward.
     * @exports Slot_PushAcceptCollectAward
     * @classdesc Represents a Slot_PushAcceptCollectAward.
     * @implements ISlot_PushAcceptCollectAward
     * @constructor
     * @param {ISlot_PushAcceptCollectAward=} [properties] Properties to set
     */
    function Slot_PushAcceptCollectAward(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Slot_PushAcceptCollectAward betKey.
     * @member {number} betKey
     * @memberof Slot_PushAcceptCollectAward
     * @instance
     */
    Slot_PushAcceptCollectAward.prototype.betKey = 0;

    /**
     * Slot_PushAcceptCollectAward currentGameInfo.
     * @member {ISlot_SubGameInfo|null|undefined} currentGameInfo
     * @memberof Slot_PushAcceptCollectAward
     * @instance
     */
    Slot_PushAcceptCollectAward.prototype.currentGameInfo = null;

    /**
     * Slot_PushAcceptCollectAward playerCollectInfo.
     * @member {ISlot_PlayerCollectInfo|null|undefined} playerCollectInfo
     * @memberof Slot_PushAcceptCollectAward
     * @instance
     */
    Slot_PushAcceptCollectAward.prototype.playerCollectInfo = null;

    /**
     * Slot_PushAcceptCollectAward winAmount.
     * @member {number|Long} winAmount
     * @memberof Slot_PushAcceptCollectAward
     * @instance
     */
    Slot_PushAcceptCollectAward.prototype.winAmount = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Slot_PushAcceptCollectAward balance.
     * @member {number|Long} balance
     * @memberof Slot_PushAcceptCollectAward
     * @instance
     */
    Slot_PushAcceptCollectAward.prototype.balance = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new Slot_PushAcceptCollectAward instance using the specified properties.
     * @function create
     * @memberof Slot_PushAcceptCollectAward
     * @static
     * @param {ISlot_PushAcceptCollectAward=} [properties] Properties to set
     * @returns {Slot_PushAcceptCollectAward} Slot_PushAcceptCollectAward instance
     */
    Slot_PushAcceptCollectAward.create = function create(properties) {
        return new Slot_PushAcceptCollectAward(properties);
    };

    /**
     * Encodes the specified Slot_PushAcceptCollectAward message. Does not implicitly {@link Slot_PushAcceptCollectAward.verify|verify} messages.
     * @function encode
     * @memberof Slot_PushAcceptCollectAward
     * @static
     * @param {ISlot_PushAcceptCollectAward} message Slot_PushAcceptCollectAward message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_PushAcceptCollectAward.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.betKey != null && Object.hasOwnProperty.call(message, "betKey"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.betKey);
        if (message.currentGameInfo != null && Object.hasOwnProperty.call(message, "currentGameInfo"))
            $root.Slot_SubGameInfo.encode(message.currentGameInfo, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.playerCollectInfo != null && Object.hasOwnProperty.call(message, "playerCollectInfo"))
            $root.Slot_PlayerCollectInfo.encode(message.playerCollectInfo, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.winAmount != null && Object.hasOwnProperty.call(message, "winAmount"))
            writer.uint32(/* id 4, wireType 0 =*/32).int64(message.winAmount);
        if (message.balance != null && Object.hasOwnProperty.call(message, "balance"))
            writer.uint32(/* id 5, wireType 0 =*/40).int64(message.balance);
        return writer;
    };

    /**
     * Encodes the specified Slot_PushAcceptCollectAward message, length delimited. Does not implicitly {@link Slot_PushAcceptCollectAward.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Slot_PushAcceptCollectAward
     * @static
     * @param {ISlot_PushAcceptCollectAward} message Slot_PushAcceptCollectAward message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_PushAcceptCollectAward.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Slot_PushAcceptCollectAward message from the specified reader or buffer.
     * @function decode
     * @memberof Slot_PushAcceptCollectAward
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Slot_PushAcceptCollectAward} Slot_PushAcceptCollectAward
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_PushAcceptCollectAward.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Slot_PushAcceptCollectAward();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.betKey = reader.int32();
                break;
            case 2:
                message.currentGameInfo = $root.Slot_SubGameInfo.decode(reader, reader.uint32());
                break;
            case 3:
                message.playerCollectInfo = $root.Slot_PlayerCollectInfo.decode(reader, reader.uint32());
                break;
            case 4:
                message.winAmount = reader.int64();
                break;
            case 5:
                message.balance = reader.int64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Slot_PushAcceptCollectAward message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Slot_PushAcceptCollectAward
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Slot_PushAcceptCollectAward} Slot_PushAcceptCollectAward
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_PushAcceptCollectAward.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Slot_PushAcceptCollectAward message.
     * @function verify
     * @memberof Slot_PushAcceptCollectAward
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Slot_PushAcceptCollectAward.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.betKey != null && message.hasOwnProperty("betKey"))
            if (!$util.isInteger(message.betKey))
                return "betKey: integer expected";
        if (message.currentGameInfo != null && message.hasOwnProperty("currentGameInfo")) {
            var error = $root.Slot_SubGameInfo.verify(message.currentGameInfo);
            if (error)
                return "currentGameInfo." + error;
        }
        if (message.playerCollectInfo != null && message.hasOwnProperty("playerCollectInfo")) {
            var error = $root.Slot_PlayerCollectInfo.verify(message.playerCollectInfo);
            if (error)
                return "playerCollectInfo." + error;
        }
        if (message.winAmount != null && message.hasOwnProperty("winAmount"))
            if (!$util.isInteger(message.winAmount) && !(message.winAmount && $util.isInteger(message.winAmount.low) && $util.isInteger(message.winAmount.high)))
                return "winAmount: integer|Long expected";
        if (message.balance != null && message.hasOwnProperty("balance"))
            if (!$util.isInteger(message.balance) && !(message.balance && $util.isInteger(message.balance.low) && $util.isInteger(message.balance.high)))
                return "balance: integer|Long expected";
        return null;
    };

    /**
     * Creates a Slot_PushAcceptCollectAward message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Slot_PushAcceptCollectAward
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Slot_PushAcceptCollectAward} Slot_PushAcceptCollectAward
     */
    Slot_PushAcceptCollectAward.fromObject = function fromObject(object) {
        if (object instanceof $root.Slot_PushAcceptCollectAward)
            return object;
        var message = new $root.Slot_PushAcceptCollectAward();
        if (object.betKey != null)
            message.betKey = object.betKey | 0;
        if (object.currentGameInfo != null) {
            if (typeof object.currentGameInfo !== "object")
                throw TypeError(".Slot_PushAcceptCollectAward.currentGameInfo: object expected");
            message.currentGameInfo = $root.Slot_SubGameInfo.fromObject(object.currentGameInfo);
        }
        if (object.playerCollectInfo != null) {
            if (typeof object.playerCollectInfo !== "object")
                throw TypeError(".Slot_PushAcceptCollectAward.playerCollectInfo: object expected");
            message.playerCollectInfo = $root.Slot_PlayerCollectInfo.fromObject(object.playerCollectInfo);
        }
        if (object.winAmount != null)
            if ($util.Long)
                (message.winAmount = $util.Long.fromValue(object.winAmount)).unsigned = false;
            else if (typeof object.winAmount === "string")
                message.winAmount = parseInt(object.winAmount, 10);
            else if (typeof object.winAmount === "number")
                message.winAmount = object.winAmount;
            else if (typeof object.winAmount === "object")
                message.winAmount = new $util.LongBits(object.winAmount.low >>> 0, object.winAmount.high >>> 0).toNumber();
        if (object.balance != null)
            if ($util.Long)
                (message.balance = $util.Long.fromValue(object.balance)).unsigned = false;
            else if (typeof object.balance === "string")
                message.balance = parseInt(object.balance, 10);
            else if (typeof object.balance === "number")
                message.balance = object.balance;
            else if (typeof object.balance === "object")
                message.balance = new $util.LongBits(object.balance.low >>> 0, object.balance.high >>> 0).toNumber();
        return message;
    };

    /**
     * Creates a plain object from a Slot_PushAcceptCollectAward message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Slot_PushAcceptCollectAward
     * @static
     * @param {Slot_PushAcceptCollectAward} message Slot_PushAcceptCollectAward
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Slot_PushAcceptCollectAward.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.betKey = 0;
            object.currentGameInfo = null;
            object.playerCollectInfo = null;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.winAmount = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.winAmount = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.balance = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.balance = options.longs === String ? "0" : 0;
        }
        if (message.betKey != null && message.hasOwnProperty("betKey"))
            object.betKey = message.betKey;
        if (message.currentGameInfo != null && message.hasOwnProperty("currentGameInfo"))
            object.currentGameInfo = $root.Slot_SubGameInfo.toObject(message.currentGameInfo, options);
        if (message.playerCollectInfo != null && message.hasOwnProperty("playerCollectInfo"))
            object.playerCollectInfo = $root.Slot_PlayerCollectInfo.toObject(message.playerCollectInfo, options);
        if (message.winAmount != null && message.hasOwnProperty("winAmount"))
            if (typeof message.winAmount === "number")
                object.winAmount = options.longs === String ? String(message.winAmount) : message.winAmount;
            else
                object.winAmount = options.longs === String ? $util.Long.prototype.toString.call(message.winAmount) : options.longs === Number ? new $util.LongBits(message.winAmount.low >>> 0, message.winAmount.high >>> 0).toNumber() : message.winAmount;
        if (message.balance != null && message.hasOwnProperty("balance"))
            if (typeof message.balance === "number")
                object.balance = options.longs === String ? String(message.balance) : message.balance;
            else
                object.balance = options.longs === String ? $util.Long.prototype.toString.call(message.balance) : options.longs === Number ? new $util.LongBits(message.balance.low >>> 0, message.balance.high >>> 0).toNumber() : message.balance;
        return object;
    };

    /**
     * Converts this Slot_PushAcceptCollectAward to JSON.
     * @function toJSON
     * @memberof Slot_PushAcceptCollectAward
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Slot_PushAcceptCollectAward.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Slot_PushAcceptCollectAward;
})();

$root.Slot_ReqCollectShopExchangeAward = (function() {

    /**
     * Properties of a Slot_ReqCollectShopExchangeAward.
     * @exports ISlot_ReqCollectShopExchangeAward
     * @interface ISlot_ReqCollectShopExchangeAward
     * @property {number|null} [index] Slot_ReqCollectShopExchangeAward index
     */

    /**
     * Constructs a new Slot_ReqCollectShopExchangeAward.
     * @exports Slot_ReqCollectShopExchangeAward
     * @classdesc Represents a Slot_ReqCollectShopExchangeAward.
     * @implements ISlot_ReqCollectShopExchangeAward
     * @constructor
     * @param {ISlot_ReqCollectShopExchangeAward=} [properties] Properties to set
     */
    function Slot_ReqCollectShopExchangeAward(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Slot_ReqCollectShopExchangeAward index.
     * @member {number} index
     * @memberof Slot_ReqCollectShopExchangeAward
     * @instance
     */
    Slot_ReqCollectShopExchangeAward.prototype.index = 0;

    /**
     * Creates a new Slot_ReqCollectShopExchangeAward instance using the specified properties.
     * @function create
     * @memberof Slot_ReqCollectShopExchangeAward
     * @static
     * @param {ISlot_ReqCollectShopExchangeAward=} [properties] Properties to set
     * @returns {Slot_ReqCollectShopExchangeAward} Slot_ReqCollectShopExchangeAward instance
     */
    Slot_ReqCollectShopExchangeAward.create = function create(properties) {
        return new Slot_ReqCollectShopExchangeAward(properties);
    };

    /**
     * Encodes the specified Slot_ReqCollectShopExchangeAward message. Does not implicitly {@link Slot_ReqCollectShopExchangeAward.verify|verify} messages.
     * @function encode
     * @memberof Slot_ReqCollectShopExchangeAward
     * @static
     * @param {ISlot_ReqCollectShopExchangeAward} message Slot_ReqCollectShopExchangeAward message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_ReqCollectShopExchangeAward.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.index != null && Object.hasOwnProperty.call(message, "index"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.index);
        return writer;
    };

    /**
     * Encodes the specified Slot_ReqCollectShopExchangeAward message, length delimited. Does not implicitly {@link Slot_ReqCollectShopExchangeAward.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Slot_ReqCollectShopExchangeAward
     * @static
     * @param {ISlot_ReqCollectShopExchangeAward} message Slot_ReqCollectShopExchangeAward message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_ReqCollectShopExchangeAward.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Slot_ReqCollectShopExchangeAward message from the specified reader or buffer.
     * @function decode
     * @memberof Slot_ReqCollectShopExchangeAward
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Slot_ReqCollectShopExchangeAward} Slot_ReqCollectShopExchangeAward
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_ReqCollectShopExchangeAward.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Slot_ReqCollectShopExchangeAward();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.index = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Slot_ReqCollectShopExchangeAward message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Slot_ReqCollectShopExchangeAward
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Slot_ReqCollectShopExchangeAward} Slot_ReqCollectShopExchangeAward
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_ReqCollectShopExchangeAward.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Slot_ReqCollectShopExchangeAward message.
     * @function verify
     * @memberof Slot_ReqCollectShopExchangeAward
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Slot_ReqCollectShopExchangeAward.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.index != null && message.hasOwnProperty("index"))
            if (!$util.isInteger(message.index))
                return "index: integer expected";
        return null;
    };

    /**
     * Creates a Slot_ReqCollectShopExchangeAward message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Slot_ReqCollectShopExchangeAward
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Slot_ReqCollectShopExchangeAward} Slot_ReqCollectShopExchangeAward
     */
    Slot_ReqCollectShopExchangeAward.fromObject = function fromObject(object) {
        if (object instanceof $root.Slot_ReqCollectShopExchangeAward)
            return object;
        var message = new $root.Slot_ReqCollectShopExchangeAward();
        if (object.index != null)
            message.index = object.index | 0;
        return message;
    };

    /**
     * Creates a plain object from a Slot_ReqCollectShopExchangeAward message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Slot_ReqCollectShopExchangeAward
     * @static
     * @param {Slot_ReqCollectShopExchangeAward} message Slot_ReqCollectShopExchangeAward
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Slot_ReqCollectShopExchangeAward.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.index = 0;
        if (message.index != null && message.hasOwnProperty("index"))
            object.index = message.index;
        return object;
    };

    /**
     * Converts this Slot_ReqCollectShopExchangeAward to JSON.
     * @function toJSON
     * @memberof Slot_ReqCollectShopExchangeAward
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Slot_ReqCollectShopExchangeAward.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Slot_ReqCollectShopExchangeAward;
})();

$root.Slot_PushCollectShopExchangeAward = (function() {

    /**
     * Properties of a Slot_PushCollectShopExchangeAward.
     * @exports ISlot_PushCollectShopExchangeAward
     * @interface ISlot_PushCollectShopExchangeAward
     * @property {number|null} [index] Slot_PushCollectShopExchangeAward index
     * @property {ISlot_PlayerCollectInfo|null} [playerCollectInfo] Slot_PushCollectShopExchangeAward playerCollectInfo
     */

    /**
     * Constructs a new Slot_PushCollectShopExchangeAward.
     * @exports Slot_PushCollectShopExchangeAward
     * @classdesc Represents a Slot_PushCollectShopExchangeAward.
     * @implements ISlot_PushCollectShopExchangeAward
     * @constructor
     * @param {ISlot_PushCollectShopExchangeAward=} [properties] Properties to set
     */
    function Slot_PushCollectShopExchangeAward(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Slot_PushCollectShopExchangeAward index.
     * @member {number} index
     * @memberof Slot_PushCollectShopExchangeAward
     * @instance
     */
    Slot_PushCollectShopExchangeAward.prototype.index = 0;

    /**
     * Slot_PushCollectShopExchangeAward playerCollectInfo.
     * @member {ISlot_PlayerCollectInfo|null|undefined} playerCollectInfo
     * @memberof Slot_PushCollectShopExchangeAward
     * @instance
     */
    Slot_PushCollectShopExchangeAward.prototype.playerCollectInfo = null;

    /**
     * Creates a new Slot_PushCollectShopExchangeAward instance using the specified properties.
     * @function create
     * @memberof Slot_PushCollectShopExchangeAward
     * @static
     * @param {ISlot_PushCollectShopExchangeAward=} [properties] Properties to set
     * @returns {Slot_PushCollectShopExchangeAward} Slot_PushCollectShopExchangeAward instance
     */
    Slot_PushCollectShopExchangeAward.create = function create(properties) {
        return new Slot_PushCollectShopExchangeAward(properties);
    };

    /**
     * Encodes the specified Slot_PushCollectShopExchangeAward message. Does not implicitly {@link Slot_PushCollectShopExchangeAward.verify|verify} messages.
     * @function encode
     * @memberof Slot_PushCollectShopExchangeAward
     * @static
     * @param {ISlot_PushCollectShopExchangeAward} message Slot_PushCollectShopExchangeAward message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_PushCollectShopExchangeAward.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.index != null && Object.hasOwnProperty.call(message, "index"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.index);
        if (message.playerCollectInfo != null && Object.hasOwnProperty.call(message, "playerCollectInfo"))
            $root.Slot_PlayerCollectInfo.encode(message.playerCollectInfo, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Slot_PushCollectShopExchangeAward message, length delimited. Does not implicitly {@link Slot_PushCollectShopExchangeAward.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Slot_PushCollectShopExchangeAward
     * @static
     * @param {ISlot_PushCollectShopExchangeAward} message Slot_PushCollectShopExchangeAward message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_PushCollectShopExchangeAward.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Slot_PushCollectShopExchangeAward message from the specified reader or buffer.
     * @function decode
     * @memberof Slot_PushCollectShopExchangeAward
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Slot_PushCollectShopExchangeAward} Slot_PushCollectShopExchangeAward
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_PushCollectShopExchangeAward.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Slot_PushCollectShopExchangeAward();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.index = reader.int32();
                break;
            case 2:
                message.playerCollectInfo = $root.Slot_PlayerCollectInfo.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Slot_PushCollectShopExchangeAward message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Slot_PushCollectShopExchangeAward
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Slot_PushCollectShopExchangeAward} Slot_PushCollectShopExchangeAward
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_PushCollectShopExchangeAward.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Slot_PushCollectShopExchangeAward message.
     * @function verify
     * @memberof Slot_PushCollectShopExchangeAward
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Slot_PushCollectShopExchangeAward.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.index != null && message.hasOwnProperty("index"))
            if (!$util.isInteger(message.index))
                return "index: integer expected";
        if (message.playerCollectInfo != null && message.hasOwnProperty("playerCollectInfo")) {
            var error = $root.Slot_PlayerCollectInfo.verify(message.playerCollectInfo);
            if (error)
                return "playerCollectInfo." + error;
        }
        return null;
    };

    /**
     * Creates a Slot_PushCollectShopExchangeAward message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Slot_PushCollectShopExchangeAward
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Slot_PushCollectShopExchangeAward} Slot_PushCollectShopExchangeAward
     */
    Slot_PushCollectShopExchangeAward.fromObject = function fromObject(object) {
        if (object instanceof $root.Slot_PushCollectShopExchangeAward)
            return object;
        var message = new $root.Slot_PushCollectShopExchangeAward();
        if (object.index != null)
            message.index = object.index | 0;
        if (object.playerCollectInfo != null) {
            if (typeof object.playerCollectInfo !== "object")
                throw TypeError(".Slot_PushCollectShopExchangeAward.playerCollectInfo: object expected");
            message.playerCollectInfo = $root.Slot_PlayerCollectInfo.fromObject(object.playerCollectInfo);
        }
        return message;
    };

    /**
     * Creates a plain object from a Slot_PushCollectShopExchangeAward message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Slot_PushCollectShopExchangeAward
     * @static
     * @param {Slot_PushCollectShopExchangeAward} message Slot_PushCollectShopExchangeAward
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Slot_PushCollectShopExchangeAward.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.index = 0;
            object.playerCollectInfo = null;
        }
        if (message.index != null && message.hasOwnProperty("index"))
            object.index = message.index;
        if (message.playerCollectInfo != null && message.hasOwnProperty("playerCollectInfo"))
            object.playerCollectInfo = $root.Slot_PlayerCollectInfo.toObject(message.playerCollectInfo, options);
        return object;
    };

    /**
     * Converts this Slot_PushCollectShopExchangeAward to JSON.
     * @function toJSON
     * @memberof Slot_PushCollectShopExchangeAward
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Slot_PushCollectShopExchangeAward.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Slot_PushCollectShopExchangeAward;
})();

$root.Slot_ReqJackpotAmount = (function() {

    /**
     * Properties of a Slot_ReqJackpotAmount.
     * @exports ISlot_ReqJackpotAmount
     * @interface ISlot_ReqJackpotAmount
     * @property {number|null} [betKey] Slot_ReqJackpotAmount betKey
     * @property {Array.<number>|null} [poolTypes] Slot_ReqJackpotAmount poolTypes
     */

    /**
     * Constructs a new Slot_ReqJackpotAmount.
     * @exports Slot_ReqJackpotAmount
     * @classdesc Represents a Slot_ReqJackpotAmount.
     * @implements ISlot_ReqJackpotAmount
     * @constructor
     * @param {ISlot_ReqJackpotAmount=} [properties] Properties to set
     */
    function Slot_ReqJackpotAmount(properties) {
        this.poolTypes = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Slot_ReqJackpotAmount betKey.
     * @member {number} betKey
     * @memberof Slot_ReqJackpotAmount
     * @instance
     */
    Slot_ReqJackpotAmount.prototype.betKey = 0;

    /**
     * Slot_ReqJackpotAmount poolTypes.
     * @member {Array.<number>} poolTypes
     * @memberof Slot_ReqJackpotAmount
     * @instance
     */
    Slot_ReqJackpotAmount.prototype.poolTypes = $util.emptyArray;

    /**
     * Creates a new Slot_ReqJackpotAmount instance using the specified properties.
     * @function create
     * @memberof Slot_ReqJackpotAmount
     * @static
     * @param {ISlot_ReqJackpotAmount=} [properties] Properties to set
     * @returns {Slot_ReqJackpotAmount} Slot_ReqJackpotAmount instance
     */
    Slot_ReqJackpotAmount.create = function create(properties) {
        return new Slot_ReqJackpotAmount(properties);
    };

    /**
     * Encodes the specified Slot_ReqJackpotAmount message. Does not implicitly {@link Slot_ReqJackpotAmount.verify|verify} messages.
     * @function encode
     * @memberof Slot_ReqJackpotAmount
     * @static
     * @param {ISlot_ReqJackpotAmount} message Slot_ReqJackpotAmount message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_ReqJackpotAmount.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.betKey != null && Object.hasOwnProperty.call(message, "betKey"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.betKey);
        if (message.poolTypes != null && message.poolTypes.length) {
            writer.uint32(/* id 2, wireType 2 =*/18).fork();
            for (var i = 0; i < message.poolTypes.length; ++i)
                writer.int32(message.poolTypes[i]);
            writer.ldelim();
        }
        return writer;
    };

    /**
     * Encodes the specified Slot_ReqJackpotAmount message, length delimited. Does not implicitly {@link Slot_ReqJackpotAmount.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Slot_ReqJackpotAmount
     * @static
     * @param {ISlot_ReqJackpotAmount} message Slot_ReqJackpotAmount message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_ReqJackpotAmount.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Slot_ReqJackpotAmount message from the specified reader or buffer.
     * @function decode
     * @memberof Slot_ReqJackpotAmount
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Slot_ReqJackpotAmount} Slot_ReqJackpotAmount
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_ReqJackpotAmount.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Slot_ReqJackpotAmount();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.betKey = reader.int32();
                break;
            case 2:
                if (!(message.poolTypes && message.poolTypes.length))
                    message.poolTypes = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.poolTypes.push(reader.int32());
                } else
                    message.poolTypes.push(reader.int32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Slot_ReqJackpotAmount message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Slot_ReqJackpotAmount
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Slot_ReqJackpotAmount} Slot_ReqJackpotAmount
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_ReqJackpotAmount.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Slot_ReqJackpotAmount message.
     * @function verify
     * @memberof Slot_ReqJackpotAmount
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Slot_ReqJackpotAmount.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.betKey != null && message.hasOwnProperty("betKey"))
            if (!$util.isInteger(message.betKey))
                return "betKey: integer expected";
        if (message.poolTypes != null && message.hasOwnProperty("poolTypes")) {
            if (!Array.isArray(message.poolTypes))
                return "poolTypes: array expected";
            for (var i = 0; i < message.poolTypes.length; ++i)
                if (!$util.isInteger(message.poolTypes[i]))
                    return "poolTypes: integer[] expected";
        }
        return null;
    };

    /**
     * Creates a Slot_ReqJackpotAmount message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Slot_ReqJackpotAmount
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Slot_ReqJackpotAmount} Slot_ReqJackpotAmount
     */
    Slot_ReqJackpotAmount.fromObject = function fromObject(object) {
        if (object instanceof $root.Slot_ReqJackpotAmount)
            return object;
        var message = new $root.Slot_ReqJackpotAmount();
        if (object.betKey != null)
            message.betKey = object.betKey | 0;
        if (object.poolTypes) {
            if (!Array.isArray(object.poolTypes))
                throw TypeError(".Slot_ReqJackpotAmount.poolTypes: array expected");
            message.poolTypes = [];
            for (var i = 0; i < object.poolTypes.length; ++i)
                message.poolTypes[i] = object.poolTypes[i] | 0;
        }
        return message;
    };

    /**
     * Creates a plain object from a Slot_ReqJackpotAmount message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Slot_ReqJackpotAmount
     * @static
     * @param {Slot_ReqJackpotAmount} message Slot_ReqJackpotAmount
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Slot_ReqJackpotAmount.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.poolTypes = [];
        if (options.defaults)
            object.betKey = 0;
        if (message.betKey != null && message.hasOwnProperty("betKey"))
            object.betKey = message.betKey;
        if (message.poolTypes && message.poolTypes.length) {
            object.poolTypes = [];
            for (var j = 0; j < message.poolTypes.length; ++j)
                object.poolTypes[j] = message.poolTypes[j];
        }
        return object;
    };

    /**
     * Converts this Slot_ReqJackpotAmount to JSON.
     * @function toJSON
     * @memberof Slot_ReqJackpotAmount
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Slot_ReqJackpotAmount.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Slot_ReqJackpotAmount;
})();

$root.Slot_PushJackpotAmount = (function() {

    /**
     * Properties of a Slot_PushJackpotAmount.
     * @exports ISlot_PushJackpotAmount
     * @interface ISlot_PushJackpotAmount
     * @property {number|null} [betKey] Slot_PushJackpotAmount betKey
     * @property {Array.<IJackpotInfo>|null} [jackpotInfos] Slot_PushJackpotAmount jackpotInfos
     */

    /**
     * Constructs a new Slot_PushJackpotAmount.
     * @exports Slot_PushJackpotAmount
     * @classdesc Represents a Slot_PushJackpotAmount.
     * @implements ISlot_PushJackpotAmount
     * @constructor
     * @param {ISlot_PushJackpotAmount=} [properties] Properties to set
     */
    function Slot_PushJackpotAmount(properties) {
        this.jackpotInfos = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Slot_PushJackpotAmount betKey.
     * @member {number} betKey
     * @memberof Slot_PushJackpotAmount
     * @instance
     */
    Slot_PushJackpotAmount.prototype.betKey = 0;

    /**
     * Slot_PushJackpotAmount jackpotInfos.
     * @member {Array.<IJackpotInfo>} jackpotInfos
     * @memberof Slot_PushJackpotAmount
     * @instance
     */
    Slot_PushJackpotAmount.prototype.jackpotInfos = $util.emptyArray;

    /**
     * Creates a new Slot_PushJackpotAmount instance using the specified properties.
     * @function create
     * @memberof Slot_PushJackpotAmount
     * @static
     * @param {ISlot_PushJackpotAmount=} [properties] Properties to set
     * @returns {Slot_PushJackpotAmount} Slot_PushJackpotAmount instance
     */
    Slot_PushJackpotAmount.create = function create(properties) {
        return new Slot_PushJackpotAmount(properties);
    };

    /**
     * Encodes the specified Slot_PushJackpotAmount message. Does not implicitly {@link Slot_PushJackpotAmount.verify|verify} messages.
     * @function encode
     * @memberof Slot_PushJackpotAmount
     * @static
     * @param {ISlot_PushJackpotAmount} message Slot_PushJackpotAmount message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_PushJackpotAmount.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.betKey != null && Object.hasOwnProperty.call(message, "betKey"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.betKey);
        if (message.jackpotInfos != null && message.jackpotInfos.length)
            for (var i = 0; i < message.jackpotInfos.length; ++i)
                $root.JackpotInfo.encode(message.jackpotInfos[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Slot_PushJackpotAmount message, length delimited. Does not implicitly {@link Slot_PushJackpotAmount.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Slot_PushJackpotAmount
     * @static
     * @param {ISlot_PushJackpotAmount} message Slot_PushJackpotAmount message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_PushJackpotAmount.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Slot_PushJackpotAmount message from the specified reader or buffer.
     * @function decode
     * @memberof Slot_PushJackpotAmount
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Slot_PushJackpotAmount} Slot_PushJackpotAmount
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_PushJackpotAmount.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Slot_PushJackpotAmount();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.betKey = reader.int32();
                break;
            case 2:
                if (!(message.jackpotInfos && message.jackpotInfos.length))
                    message.jackpotInfos = [];
                message.jackpotInfos.push($root.JackpotInfo.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Slot_PushJackpotAmount message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Slot_PushJackpotAmount
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Slot_PushJackpotAmount} Slot_PushJackpotAmount
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_PushJackpotAmount.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Slot_PushJackpotAmount message.
     * @function verify
     * @memberof Slot_PushJackpotAmount
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Slot_PushJackpotAmount.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.betKey != null && message.hasOwnProperty("betKey"))
            if (!$util.isInteger(message.betKey))
                return "betKey: integer expected";
        if (message.jackpotInfos != null && message.hasOwnProperty("jackpotInfos")) {
            if (!Array.isArray(message.jackpotInfos))
                return "jackpotInfos: array expected";
            for (var i = 0; i < message.jackpotInfos.length; ++i) {
                var error = $root.JackpotInfo.verify(message.jackpotInfos[i]);
                if (error)
                    return "jackpotInfos." + error;
            }
        }
        return null;
    };

    /**
     * Creates a Slot_PushJackpotAmount message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Slot_PushJackpotAmount
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Slot_PushJackpotAmount} Slot_PushJackpotAmount
     */
    Slot_PushJackpotAmount.fromObject = function fromObject(object) {
        if (object instanceof $root.Slot_PushJackpotAmount)
            return object;
        var message = new $root.Slot_PushJackpotAmount();
        if (object.betKey != null)
            message.betKey = object.betKey | 0;
        if (object.jackpotInfos) {
            if (!Array.isArray(object.jackpotInfos))
                throw TypeError(".Slot_PushJackpotAmount.jackpotInfos: array expected");
            message.jackpotInfos = [];
            for (var i = 0; i < object.jackpotInfos.length; ++i) {
                if (typeof object.jackpotInfos[i] !== "object")
                    throw TypeError(".Slot_PushJackpotAmount.jackpotInfos: object expected");
                message.jackpotInfos[i] = $root.JackpotInfo.fromObject(object.jackpotInfos[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a Slot_PushJackpotAmount message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Slot_PushJackpotAmount
     * @static
     * @param {Slot_PushJackpotAmount} message Slot_PushJackpotAmount
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Slot_PushJackpotAmount.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.jackpotInfos = [];
        if (options.defaults)
            object.betKey = 0;
        if (message.betKey != null && message.hasOwnProperty("betKey"))
            object.betKey = message.betKey;
        if (message.jackpotInfos && message.jackpotInfos.length) {
            object.jackpotInfos = [];
            for (var j = 0; j < message.jackpotInfos.length; ++j)
                object.jackpotInfos[j] = $root.JackpotInfo.toObject(message.jackpotInfos[j], options);
        }
        return object;
    };

    /**
     * Converts this Slot_PushJackpotAmount to JSON.
     * @function toJSON
     * @memberof Slot_PushJackpotAmount
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Slot_PushJackpotAmount.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Slot_PushJackpotAmount;
})();

$root.JackpotInfo = (function() {

    /**
     * Properties of a JackpotInfo.
     * @exports IJackpotInfo
     * @interface IJackpotInfo
     * @property {number|null} [poolType] JackpotInfo poolType
     * @property {number|Long|null} [amount] JackpotInfo amount
     */

    /**
     * Constructs a new JackpotInfo.
     * @exports JackpotInfo
     * @classdesc Represents a JackpotInfo.
     * @implements IJackpotInfo
     * @constructor
     * @param {IJackpotInfo=} [properties] Properties to set
     */
    function JackpotInfo(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * JackpotInfo poolType.
     * @member {number} poolType
     * @memberof JackpotInfo
     * @instance
     */
    JackpotInfo.prototype.poolType = 0;

    /**
     * JackpotInfo amount.
     * @member {number|Long} amount
     * @memberof JackpotInfo
     * @instance
     */
    JackpotInfo.prototype.amount = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new JackpotInfo instance using the specified properties.
     * @function create
     * @memberof JackpotInfo
     * @static
     * @param {IJackpotInfo=} [properties] Properties to set
     * @returns {JackpotInfo} JackpotInfo instance
     */
    JackpotInfo.create = function create(properties) {
        return new JackpotInfo(properties);
    };

    /**
     * Encodes the specified JackpotInfo message. Does not implicitly {@link JackpotInfo.verify|verify} messages.
     * @function encode
     * @memberof JackpotInfo
     * @static
     * @param {IJackpotInfo} message JackpotInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    JackpotInfo.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.poolType != null && Object.hasOwnProperty.call(message, "poolType"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.poolType);
        if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
            writer.uint32(/* id 2, wireType 0 =*/16).int64(message.amount);
        return writer;
    };

    /**
     * Encodes the specified JackpotInfo message, length delimited. Does not implicitly {@link JackpotInfo.verify|verify} messages.
     * @function encodeDelimited
     * @memberof JackpotInfo
     * @static
     * @param {IJackpotInfo} message JackpotInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    JackpotInfo.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a JackpotInfo message from the specified reader or buffer.
     * @function decode
     * @memberof JackpotInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {JackpotInfo} JackpotInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    JackpotInfo.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.JackpotInfo();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.poolType = reader.int32();
                break;
            case 2:
                message.amount = reader.int64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a JackpotInfo message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof JackpotInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {JackpotInfo} JackpotInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    JackpotInfo.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a JackpotInfo message.
     * @function verify
     * @memberof JackpotInfo
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    JackpotInfo.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.poolType != null && message.hasOwnProperty("poolType"))
            if (!$util.isInteger(message.poolType))
                return "poolType: integer expected";
        if (message.amount != null && message.hasOwnProperty("amount"))
            if (!$util.isInteger(message.amount) && !(message.amount && $util.isInteger(message.amount.low) && $util.isInteger(message.amount.high)))
                return "amount: integer|Long expected";
        return null;
    };

    /**
     * Creates a JackpotInfo message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof JackpotInfo
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {JackpotInfo} JackpotInfo
     */
    JackpotInfo.fromObject = function fromObject(object) {
        if (object instanceof $root.JackpotInfo)
            return object;
        var message = new $root.JackpotInfo();
        if (object.poolType != null)
            message.poolType = object.poolType | 0;
        if (object.amount != null)
            if ($util.Long)
                (message.amount = $util.Long.fromValue(object.amount)).unsigned = false;
            else if (typeof object.amount === "string")
                message.amount = parseInt(object.amount, 10);
            else if (typeof object.amount === "number")
                message.amount = object.amount;
            else if (typeof object.amount === "object")
                message.amount = new $util.LongBits(object.amount.low >>> 0, object.amount.high >>> 0).toNumber();
        return message;
    };

    /**
     * Creates a plain object from a JackpotInfo message. Also converts values to other types if specified.
     * @function toObject
     * @memberof JackpotInfo
     * @static
     * @param {JackpotInfo} message JackpotInfo
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    JackpotInfo.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.poolType = 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.amount = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.amount = options.longs === String ? "0" : 0;
        }
        if (message.poolType != null && message.hasOwnProperty("poolType"))
            object.poolType = message.poolType;
        if (message.amount != null && message.hasOwnProperty("amount"))
            if (typeof message.amount === "number")
                object.amount = options.longs === String ? String(message.amount) : message.amount;
            else
                object.amount = options.longs === String ? $util.Long.prototype.toString.call(message.amount) : options.longs === Number ? new $util.LongBits(message.amount.low >>> 0, message.amount.high >>> 0).toNumber() : message.amount;
        return object;
    };

    /**
     * Converts this JackpotInfo to JSON.
     * @function toJSON
     * @memberof JackpotInfo
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    JackpotInfo.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return JackpotInfo;
})();

$root.Slot_ReqLastBetInfo = (function() {

    /**
     * Properties of a Slot_ReqLastBetInfo.
     * @exports ISlot_ReqLastBetInfo
     * @interface ISlot_ReqLastBetInfo
     */

    /**
     * Constructs a new Slot_ReqLastBetInfo.
     * @exports Slot_ReqLastBetInfo
     * @classdesc Represents a Slot_ReqLastBetInfo.
     * @implements ISlot_ReqLastBetInfo
     * @constructor
     * @param {ISlot_ReqLastBetInfo=} [properties] Properties to set
     */
    function Slot_ReqLastBetInfo(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Creates a new Slot_ReqLastBetInfo instance using the specified properties.
     * @function create
     * @memberof Slot_ReqLastBetInfo
     * @static
     * @param {ISlot_ReqLastBetInfo=} [properties] Properties to set
     * @returns {Slot_ReqLastBetInfo} Slot_ReqLastBetInfo instance
     */
    Slot_ReqLastBetInfo.create = function create(properties) {
        return new Slot_ReqLastBetInfo(properties);
    };

    /**
     * Encodes the specified Slot_ReqLastBetInfo message. Does not implicitly {@link Slot_ReqLastBetInfo.verify|verify} messages.
     * @function encode
     * @memberof Slot_ReqLastBetInfo
     * @static
     * @param {ISlot_ReqLastBetInfo} message Slot_ReqLastBetInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_ReqLastBetInfo.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        return writer;
    };

    /**
     * Encodes the specified Slot_ReqLastBetInfo message, length delimited. Does not implicitly {@link Slot_ReqLastBetInfo.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Slot_ReqLastBetInfo
     * @static
     * @param {ISlot_ReqLastBetInfo} message Slot_ReqLastBetInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Slot_ReqLastBetInfo.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Slot_ReqLastBetInfo message from the specified reader or buffer.
     * @function decode
     * @memberof Slot_ReqLastBetInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Slot_ReqLastBetInfo} Slot_ReqLastBetInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_ReqLastBetInfo.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Slot_ReqLastBetInfo();
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
     * Decodes a Slot_ReqLastBetInfo message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Slot_ReqLastBetInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Slot_ReqLastBetInfo} Slot_ReqLastBetInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Slot_ReqLastBetInfo.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Slot_ReqLastBetInfo message.
     * @function verify
     * @memberof Slot_ReqLastBetInfo
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Slot_ReqLastBetInfo.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        return null;
    };

    /**
     * Creates a Slot_ReqLastBetInfo message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Slot_ReqLastBetInfo
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Slot_ReqLastBetInfo} Slot_ReqLastBetInfo
     */
    Slot_ReqLastBetInfo.fromObject = function fromObject(object) {
        if (object instanceof $root.Slot_ReqLastBetInfo)
            return object;
        return new $root.Slot_ReqLastBetInfo();
    };

    /**
     * Creates a plain object from a Slot_ReqLastBetInfo message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Slot_ReqLastBetInfo
     * @static
     * @param {Slot_ReqLastBetInfo} message Slot_ReqLastBetInfo
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Slot_ReqLastBetInfo.toObject = function toObject() {
        return {};
    };

    /**
     * Converts this Slot_ReqLastBetInfo to JSON.
     * @function toJSON
     * @memberof Slot_ReqLastBetInfo
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Slot_ReqLastBetInfo.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Slot_ReqLastBetInfo;
})();

module.exports = $root;
