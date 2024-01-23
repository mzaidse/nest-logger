import { parse } from 'graphql';
import { createRequestContext } from '../cls-context'
import { HEADER_NAMES } from "../constants";
import { getClientIp } from '../utils/request-ip.utils';

export const RequestContextMiddleware = (): any => {
  return (req: any, res: any, next: any): void => {
        const requestLogParams = {
            correlationId: req.get(HEADER_NAMES.X_CORRELATION_KEY),
            userId: req.get(HEADER_NAMES.X_USER_ID),
            tenantId: req.get(HEADER_NAMES.X_TENANT_ID),
            entityId: req.get(HEADER_NAMES.X_ENTITY_ID),
            channelId: req.get(HEADER_NAMES.X_CHANNEL_ID),
            origin: req.get(HEADER_NAMES.ORIGIN),
            userAgent: req.get(HEADER_NAMES.USER_AGENT),
            clientIP: getClientIp(req),
            requestType: 'http',
            method: req.method,
            url: req.originalUrl,
        };
        if(requestLogParams.url === '/graphql' && req.body?.query){
            const query = parse(req.body?.query as any);
            requestLogParams.requestType = "graphql";
            requestLogParams['operationType'] = query?.definitions?.[0]['operation'] || null;
            requestLogParams['operationName'] = query?.definitions?.[0]['selectionSet']?.['selections']?.[0]?.['name']?.['value'] || null;
        }
    createRequestContext(requestLogParams);
    next();
  };
};