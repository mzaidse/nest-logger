"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleTransporter = void 0;
const winston = __importStar(require("winston"));
const constants_1 = require("../constants");
const utils_1 = require("../utils");
class ConsoleTransporter {
    static getTransporter(config) {
        const LOGGER_CONFIG = Object.assign(Object.assign({}, constants_1.DEFAUT_LOGGER_CONFIG), config);
        let isColorEncodingEnabled = (process.env.ENV_RBX_ENABLE_LOGGER_COLOR_ENCODING) ? process.env.ENV_RBX_ENABLE_LOGGER_COLOR_ENCODING == 'true' : (config.ENABLE_COLOR_ENCODING || process.env.NODE_ENV != 'production');
        return new winston.transports.Console({
            level: LOGGER_CONFIG.LEVEL,
            format: winston.format.combine(winston.format.label({ label: LOGGER_CONFIG.LABEL }), winston.format.timestamp(), utils_1.LoggerUtils.format.nestLike(isColorEncodingEnabled)),
        });
    }
}
exports.ConsoleTransporter = ConsoleTransporter;
//# sourceMappingURL=console.transporter.js.map