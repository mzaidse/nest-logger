import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { DEFAUT_LOGGER_CONFIG } from '../constants';
import { iLOGGER } from '../interfaces';

export class FileTransporter {
  static getTransporter(config: iLOGGER): DailyRotateFile {
    const LOGGER_CONFIG = {
      ...DEFAUT_LOGGER_CONFIG,
      ...config,
    };
    return new DailyRotateFile({
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
      format: winston.format.combine(
        winston.format.label({ label: LOGGER_CONFIG.LABEL }),
        winston.format.timestamp(),
        winston.format.json(),
      ),
    });
  }
}
