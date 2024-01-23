export interface IRequestLogParams {
  correlationId: string;
  userId: string;
  tenantId: string;
  entityId: string;
  channelId: string;
  userAgent: string;
  origin: string;
  clientIP: string;
  requestType: string;
  url?: string;
  method?: string;
  operationType?: string;
  operationName?: string;
  message?: string;
}

export interface iLOGGER {
  LABEL: string;
  LEVEL: string;
  FILE_NAME?: string;
  FILE_EXTENSION?: string;
  FILE_NAME_DATE_PATTERN?: string;
  FILE_NAME_IN_UTC?: boolean;
  DIR_NAME?: string;
  GZIP_ARCHIVED?: boolean;
  FILE_MAX_SIZE?: string;
  FILE_KEEP_FOR?: string;
  EXIT_ON_ERROR?: boolean;
  ENABLE_COLOR_ENCODING?: boolean;
}
