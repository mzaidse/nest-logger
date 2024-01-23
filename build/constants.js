"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAUT_LOGGER_CONFIG = exports.HEADER_NAMES = exports.CONTEXT_NAMESPACE_ID = exports.REQUEST_LOG_PARAMS = void 0;
exports.REQUEST_LOG_PARAMS = 'request-log-params';
exports.CONTEXT_NAMESPACE_ID = 'a6a29a6f-6747-4b5f-b99f-07ff96e32f88';
exports.HEADER_NAMES = {
    X_USER_ID: 'x-user-id',
    X_TENANT_ID: 'x-tenant-id',
    X_ENTITY_ID: 'x-entity-id',
    X_CHANNEL_ID: 'x-channel-id',
    X_CORRELATION_KEY: 'x-correlation-id',
    USER_AGENT: 'user-agent',
    ORIGIN: 'origin',
};
exports.DEFAUT_LOGGER_CONFIG = {
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
};
//# sourceMappingURL=constants.js.map