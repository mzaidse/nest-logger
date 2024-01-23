import { Logger } from '@nestjs/common';
import safeStringify from 'fast-safe-stringify';
import colors from 'colors/safe';
import { Format } from 'logform';
import { format } from 'winston';

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

const nestLikeConsoleFormat = (isColorEncodingEnabled: boolean = true): Format => {
  if(!isColorEncodingEnabled) {
    colors.disable();
  }
  return  format.combine(
    format(info => {
      try {
        const color = NEST_COLOR_SCHEME[info.level];
        if (color) {
          info.label = info.label && colors[color](`[${info.label}]`);
          info.level = colors[color](`[${info.level}]`);
          info.message = colors[color](info.message);
        } else {
          info.label = info.label && `[${info.label}]`;
          info.level = `[${info.level}]`;
          info.message = info.message;
        }
        return info;
      } catch (error) {
        Logger.error(error.message);
      }
    })(),
    format.printf(params => {
      const { context, level, timestamp, message, label, ...meta } = params;
      return (
        ('undefined' !== typeof timestamp ? `[${timestamp}] ` : '') +
        ('undefined' !== typeof label ? `${label} ` : '') +
        `${level.charAt(0).toUpperCase() + level.slice(1)}\t` +
        ('undefined' !== typeof context ? `[${context}] ` : '') +
        `${message}` +
        ( meta ? ` - ${safeStringify(meta, null, 2)}` : '')
      );
    }),
  );
}


export const LoggerUtils = {
  format: {
    nestLike: nestLikeConsoleFormat,
  },
};
