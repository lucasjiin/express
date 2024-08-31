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
    private static LOG_DIR = path.join(__dirname, '../../logs');
    private static format = printf(({ level, message, label, timestamp }) => {
        return `${timestamp} [${level}]${message}`;
    });
    private static logger = winston.createLogger({
        format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }), this.format),
        transports: [
            new Console({
                format: combine(colorize(), this.format),
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
        this.logger.error(this.getMessage(...strings));
    }

    static warn(...strings: string[]) {
        this.logger.warn(this.getMessage(...strings));
    }

    static info(...strings: string[]) {
        this.logger.info(this.getMessage(...strings));
    }

    static http(...strings: string[]) {
        this.logger.http(this.getMessage(...strings));
    }

    static verbose(...strings: string[]) {
        this.logger.verbose(this.getMessage(...strings));
    }

    static debug(...strings: string[]) {
        this.logger.debug(this.getMessage(...strings));
    }

    static silly(...strings: string[]) {
        this.logger.silly(this.getMessage(...strings));
    }
}

export default Log;
