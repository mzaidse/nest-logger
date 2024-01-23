import * as winston from 'winston';
import { ConsoleTransportInstance } from 'winston/lib/winston/transports';
import { DEFAUT_LOGGER_CONFIG } from '../constants';
import { iLOGGER } from '../interfaces';
import { LoggerUtils } from '../utils';

export class ConsoleTransporter {
  static getTransporter(config: iLOGGER): ConsoleTransportInstance {
    const LOGGER_CONFIG = {
      ...DEFAUT_LOGGER_CONFIG,
      ...config,
    };
    let isColorEncodingEnabled = (process.env.ENV_RBX_ENABLE_LOGGER_COLOR_ENCODING) ? process.env.ENV_RBX_ENABLE_LOGGER_COLOR_ENCODING == 'true' : (config.ENABLE_COLOR_ENCODING  || process.env.NODE_ENV != 'production');
    return new winston.transports.Console({
      level: LOGGER_CONFIG.LEVEL,
      format: winston.format.combine(
        winston.format.label({ label: LOGGER_CONFIG.LABEL }),
        winston.format.timestamp(),
        LoggerUtils.format.nestLike(isColorEncodingEnabled),
      ),
    });
  }
}
