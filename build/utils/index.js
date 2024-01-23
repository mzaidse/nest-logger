"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerUtils = void 0;
const common_1 = require("@nestjs/common");
const fast_safe_stringify_1 = __importDefault(require("fast-safe-stringify"));
const safe_1 = __importDefault(require("colors/safe"));
const winston_1 = require("winston");
const NEST_COLOR_SCHEME = {
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red',
};
const nestLikeConsoleFormat = (isColorEncodingEnabled = true) => {
    if (!isColorEncodingEnabled) {
        safe_1.default.disable();
    }
    return winston_1.format.combine((0, winston_1.format)(info => {
        try {
            const color = NEST_COLOR_SCHEME[info.level];
            if (color) {
                info.label = info.label && safe_1.default[color](`[${info.label}]`);
                info.level = safe_1.default[color](`[${info.level}]`);
                info.message = safe_1.default[color](info.message);
            }
            else {
                info.label = info.label && `[${info.label}]`;
                info.level = `[${info.level}]`;
                info.message = info.message;
            }
            return info;
        }
        catch (error) {
            common_1.Logger.error(error.message);
        }
    })(), winston_1.format.printf(params => {
        const { context, level, timestamp, message, label } = params, meta = __rest(params, ["context", "level", "timestamp", "message", "label"]);
        return (('undefined' !== typeof timestamp ? `[${timestamp}] ` : '') +
            ('undefined' !== typeof label ? `${label} ` : '') +
            `${level.charAt(0).toUpperCase() + level.slice(1)}\t` +
            ('undefined' !== typeof context ? `[${context}] ` : '') +
            `${message}` +
            (meta ? ` - ${(0, fast_safe_stringify_1.default)(meta, null, 2)}` : ''));
    }));
};
exports.LoggerUtils = {
    format: {
        nestLike: nestLikeConsoleFormat,
    },
};
//# sourceMappingURL=index.js.map