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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileTransporter = void 0;
const winston = __importStar(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const constants_1 = require("../constants");
class FileTransporter {
    static getTransporter(config) {
        const LOGGER_CONFIG = Object.assign(Object.assign({}, constants_1.DEFAUT_LOGGER_CONFIG), config);
        return new winston_daily_rotate_file_1.default({
            level: LOGGER_CONFIG.LEVEL,
            filename: LOGGER_CONFIG.FILE_NAME,
            extension: LOGGER_CONFIG.FILE_EXTENSION,
            datePattern: LOGGER_CONFIG.FILE_NAME_DATE_PATTERN,
            utc: LOGGER_CONFIG.FILE_NAME_IN_UTC,
            dirname: LOGGER_CONFIG.DIR_NAME,
            zippedArchive: LOGGER_CONFIG.GZIP_ARCHIVED,
            maxSize: LOGGER_CONFIG.FILE_MAX_SIZE,
            maxFiles: LOGGER_CONFIG.FILE_KEEP_FOR,
            // handleExceptions: true,
            // json: true,
            format: winston.format.combine(winston.format.label({ label: LOGGER_CONFIG.LABEL }), winston.format.timestamp(), winston.format.json()),
        });
    }
}
exports.FileTransporter = FileTransporter;
//# sourceMappingURL=file.transporter.js.map