# Nest Logger for Nest Services

## Installation

```bash
npm install --save git+ssh://git@github.com:mzaidse/nest-logger.git
```

## Quick Start

* Upgrade NestJs version in your service to `^7.6.8`, other wise this library will not work correctly.
* Configure NestWinston Logger while bootstrapping the NestJS service.
* Configure required transporters in the logger while integrating it with NestJS.
* Create logger configuration object, and pass it to transporter functions.


```typescript
import {
  createNestWinstonLogger,
  ConsoleTransporter,
  FileTransporter,
} from 'nest-logger';

  public static async setup(): Promise<INestApplication> {
    const config: ConfigurationService = new ConfigurationService();
    const app = await NestFactory.create(ApplicationModule, {
      logger: createNestWinstonLogger({
        defaultMeta: {},
        exitOnError: config.LOGGER.EXIT_ON_ERROR,
        transports: [
          ConsoleTransporter.getTransporter(config.LOGGER),
          FileTransporter.getTransporter(config.LOGGER),
        ],
      }),
    });
    const server = new Server(app, config);
    return server.init();
  }
```

* Configure context middleware to bind logging information with each request.

```typescript
import { RequestContextMiddleware } from 'nest-logger';

app.use(RequestContextMiddleware());
```

## Configuration
By default CLI colour encoding is enabled in all environments except `production`. To enable/disable the cli color encoding, use the below given environment variable in your service.

```bash
$ export ENV_RBX_ENABLE_LOGGER_COLOR_ENCODING=false
```
By default we have this configuration in the logger.

```typescript
export const DEFAUT_LOGGER_CONFIG: iLOGGER = {
  LABEL: 'NEST_SERVICE',
  LEVEL: 'info',
  FILE_NAME: `%DATE%`,
  FILE_EXTENSION: '.log',
  FILE_NAME_DATE_PATTERN: 'YYYY-MM-DD',
  FILE_NAME_IN_UTC: false,
  DIR_NAME: 'logs',
  GZIP_ARCHIVED: true,
  FILE_MAX_SIZE: '20m',
  FILE_KEEP_FOR: '14d',
  EXIT_ON_ERROR: false,
  ENABLE_COLOR_ENCODING: true
};
```

If anyone wants to change the configuration, he can pass his own configuration object in transporters.