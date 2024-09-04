/**
 * logger.ts
 */
import path from 'path';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

const { combine, timestamp, printf, colorize } = winston.format;
const { Console, DailyRotateFile } = winston.transports;

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
class Log {
    private static readonly LOG_DIR = path.join(__dirname, '../../logs');
    private static readonly format = printf(({ level, message, timestamp }) => {
        return `${timestamp} [${[process.pid]}][${level}]${message}`;
    });
    private static readonly logger = winston.createLogger({
        format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }), Log.format),
        transports: [
            new Console({
                format: combine(colorize(), Log.format),
            }),
            new DailyRotateFile({
                level: 'silly',
                datePattern: 'YYYY-MM-DD',
                dirname: this.LOG_DIR,
                filename: `%DATE%.log`,
                maxFiles: 30,
                zippedArchive: true,
            }),
        ],
    });

    private static getMessage(...strings: string[]) {
        if (strings.length === 0) {
            return;
        }

        let message = '';
        if (strings.length === 1) {
            message = ` ${strings.join(' ')}`;
        } else {
            message = `[${strings[0]}] ${strings.slice(1).join(' ')}`;
        }

        return message;
    }

    static error(...strings: string[]) {
        Log.logger.error(Log.getMessage(...strings));
    }

    static warn(...strings: string[]) {
        Log.logger.warn(Log.getMessage(...strings));
    }

    static info(...strings: string[]) {
        Log.logger.info(Log.getMessage(...strings));
    }

    static http(...strings: string[]) {
        Log.logger.http(Log.getMessage(...strings));
    }

    static verbose(...strings: string[]) {
        Log.logger.verbose(Log.getMessage(...strings));
    }

    static debug(...strings: string[]) {
        Log.logger.debug(Log.getMessage(...strings));
    }

    static silly(...strings: string[]) {
        Log.logger.silly(Log.getMessage(...strings));
    }
}

export default Log;
