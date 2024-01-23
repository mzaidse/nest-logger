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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinstonLogger = exports.createNestWinstonLogger = void 0;
const winston_1 = require("winston");
const constants_1 = require("../constants");
const cls_context_1 = require("../cls-context");
function createNestWinstonLogger(opts) {
    const loggerConfig = Object.assign({ defaultMeta: {}, exitOnError: constants_1.DEFAUT_LOGGER_CONFIG.EXIT_ON_ERROR }, opts);
    return new WinstonLogger((0, winston_1.createLogger)(loggerConfig));
}
exports.createNestWinstonLogger = createNestWinstonLogger;
class WinstonLogger {
    constructor(logger) {
        this.logger = logger;
    }
    setContext(context) {
        this.context = context;
    }
    log(message, context) {
        context = context || this.context;
        const requestLogParams = (0, cls_context_1.getRequestContext)();
        if ('object' === typeof message) {
            const { message: msg } = message, meta = __rest(message, ["message"]);
            return this.logger.info(msg, Object.assign(Object.assign({ context }, requestLogParams), meta));
        }
        return this.logger.info(message, Object.assign({ context }, requestLogParams));
    }
    error(message, trace, context) {
        context = context || this.context;
        const requestLogParams = (0, cls_context_1.getRequestContext)();
        if (message instanceof Error) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { message: msg, name, stack } = message, meta = __rest(message, ["message", "name", "stack"]);
            return this.logger.error(msg, Object.assign(Object.assign({ context, stack: [trace || message.stack] }, requestLogParams), meta));
        }
        if ('object' === typeof message) {
            const { message: msg } = message, meta = __rest(message, ["message"]);
            return this.logger.error(msg, Object.assign(Object.assign({ context, stack: [trace] }, requestLogParams), meta));
        }
        return this.logger.error(message, { context, stack: [trace] });
    }
    warn(message, context) {
        context = context || this.context;
        const requestLogParams = (0, cls_context_1.getRequestContext)();
        if ('object' === typeof message) {
            const { message: msg } = message, meta = __rest(message, ["message"]);
            return this.logger.warn(msg, Object.assign(Object.assign({ context }, requestLogParams), meta));
        }
        return this.logger.warn(message, Object.assign({ context }, requestLogParams));
    }
    debug(message, context) {
        context = context || this.context;
        const requestLogParams = (0, cls_context_1.getRequestContext)();
        if ('object' === typeof message) {
            const { message: msg } = message, meta = __rest(message, ["message"]);
            return this.logger.debug(msg, Object.assign(Object.assign({ context }, requestLogParams), meta));
        }
        return this.logger.debug(message, Object.assign({ context }, requestLogParams));
    }
    verbose(message, context) {
        context = context || this.context;
        const requestLogParams = (0, cls_context_1.getRequestContext)();
        if ('object' === typeof message) {
            const { message: msg } = message, meta = __rest(message, ["message"]);
            return this.logger.verbose(msg, Object.assign(Object.assign({ context }, requestLogParams), meta));
        }
        return this.logger.verbose(message, Object.assign({ context }, requestLogParams));
    }
}
exports.WinstonLogger = WinstonLogger;
//# sourceMappingURL=index.js.map