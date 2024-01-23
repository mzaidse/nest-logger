import DailyRotateFile from 'winston-daily-rotate-file';
import { iLOGGER } from '../interfaces';
export declare class FileTransporter {
    static getTransporter(config: iLOGGER): DailyRotateFile;
}
