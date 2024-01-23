import { ConsoleTransportInstance } from 'winston/lib/winston/transports';
import { iLOGGER } from '../interfaces';
export declare class ConsoleTransporter {
    static getTransporter(config: iLOGGER): ConsoleTransportInstance;
}
