import { createLogger, Logger, LoggerOptions } from 'winston';
import { LoggerService } from '@nestjs/common';
import { IRequestLogParams } from '../interfaces';
import { DEFAUT_LOGGER_CONFIG } from '../constants';
import { getRequestContext } from '../cls-context';

export function createNestWinstonLogger(
  opts: LoggerOptions,
): WinstonLogger {
  const loggerConfig = {
    defaultMeta: {},
    exitOnError: DEFAUT_LOGGER_CONFIG.EXIT_ON_ERROR,
    
    ...opts,
  }
  return new WinstonLogger(createLogger(loggerConfig));
}

export class WinstonLogger implements LoggerService {
  private context?: string;

  constructor(private readonly logger: Logger) {}

  public setContext(context: string) {
    this.context = context;
  }

  public log(message: any, context?: string): any {
    context = context || this.context;
    const requestLogParams: IRequestLogParams = getRequestContext()
    if ('object' === typeof message) {
      const { message: msg, ...meta } = message;
      return this.logger.info(msg as string, {
        context,
        ...requestLogParams,
        ...meta,
      });
    }
    return this.logger.info(message, { context, ...requestLogParams });
  }

  public error(message: any, trace?: string, context?: string): any {
    context = context || this.context;
    const requestLogParams: IRequestLogParams = getRequestContext()
    if (message instanceof Error) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { message: msg, name, stack, ...meta } = message;
      return this.logger.error(msg, {
        context,
        stack: [trace || message.stack],
        ...requestLogParams,
        ...meta,
      });
    }
    if ('object' === typeof message) {
      const { message: msg, ...meta } = message;
      return this.logger.error(msg as string, {
        context,
        stack: [trace],
        ...requestLogParams,
        ...meta,
      });
    }
    return this.logger.error(message, { context, stack: [trace] });
  }

  public warn(message: any, context?: string): any {
    context = context || this.context;
    const requestLogParams: IRequestLogParams = getRequestContext()
    if ('object' === typeof message) {
      const { message: msg, ...meta } = message;
      return this.logger.warn(msg as string, {
        context,
        ...requestLogParams,
        ...meta,
      });
    }
    return this.logger.warn(message, { context, ...requestLogParams });
  }

  public debug?(message: any, context?: string): any {
    context = context || this.context;
    const requestLogParams: IRequestLogParams = getRequestContext()
    if ('object' === typeof message) {
      const { message: msg, ...meta } = message;
      return this.logger.debug(msg as string, {
        context,
        ...requestLogParams,
        ...meta,
      });
    }
    return this.logger.debug(message, { context, ...requestLogParams });
  }

  public verbose?(message: any, context?: string): any {
    context = context || this.context;
    const requestLogParams: IRequestLogParams = getRequestContext()
    if ('object' === typeof message) {
      const { message: msg, ...meta } = message;
      return this.logger.verbose(msg as string, {
        context,
        ...requestLogParams,
        ...meta,
      });
    }
    return this.logger.verbose(message, { context, ...requestLogParams });
  }
}
