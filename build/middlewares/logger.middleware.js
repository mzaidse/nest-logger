"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestContextMiddleware = void 0;
const graphql_1 = require("graphql");
const cls_context_1 = require("../cls-context");
const constants_1 = require("../constants");
const request_ip_utils_1 = require("../utils/request-ip.utils");
const RequestContextMiddleware = () => {
    return (req, res, next) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const requestLogParams = {
            correlationId: req.get(constants_1.HEADER_NAMES.X_CORRELATION_KEY),
            userId: req.get(constants_1.HEADER_NAMES.X_USER_ID),
            tenantId: req.get(constants_1.HEADER_NAMES.X_TENANT_ID),
            entityId: req.get(constants_1.HEADER_NAMES.X_ENTITY_ID),
            channelId: req.get(constants_1.HEADER_NAMES.X_CHANNEL_ID),
            origin: req.get(constants_1.HEADER_NAMES.ORIGIN),
            userAgent: req.get(constants_1.HEADER_NAMES.USER_AGENT),
            clientIP: (0, request_ip_utils_1.getClientIp)(req),
            requestType: 'http',
            method: req.method,
            url: req.originalUrl,
        };
        if (requestLogParams.url === '/graphql' && ((_a = req.body) === null || _a === void 0 ? void 0 : _a.query)) {
            const query = (0, graphql_1.parse)((_b = req.body) === null || _b === void 0 ? void 0 : _b.query);
            requestLogParams.requestType = "graphql";
            requestLogParams['operationType'] = ((_c = query === null || query === void 0 ? void 0 : query.definitions) === null || _c === void 0 ? void 0 : _c[0]['operation']) || null;
            requestLogParams['operationName'] = ((_h = (_g = (_f = (_e = (_d = query === null || query === void 0 ? void 0 : query.definitions) === null || _d === void 0 ? void 0 : _d[0]['selectionSet']) === null || _e === void 0 ? void 0 : _e['selections']) === null || _f === void 0 ? void 0 : _f[0]) === null || _g === void 0 ? void 0 : _g['name']) === null || _h === void 0 ? void 0 : _h['value']) || null;
        }
        (0, cls_context_1.createRequestContext)(requestLogParams);
        next();
    };
};
exports.RequestContextMiddleware = RequestContextMiddleware;
//# sourceMappingURL=logger.middleware.js.map