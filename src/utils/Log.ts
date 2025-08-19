/**
 * log.ts
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
import path from 'path';
import { Container, Service } from 'typedi';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

import { rootPath } from '../configs/environments.js';

const { colorize, combine, printf, timestamp } = winston.format;
const { Console, DailyRotateFile } = winston.transports;

type LogMessage = unknown;

@Service()
class Log {
  private static readonly LOG_DIR = path.join(rootPath, 'logs');

  private readonly format = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${process.pid}][${level}]${message}`;
  });

  private readonly logger = winston.createLogger({
    format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }), this.format),
    transports: [
      new Console({
        format: combine(colorize(), this.format),
        level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
      }),
      new DailyRotateFile({
        datePattern: 'YYYY-MM-DD',
        dirname: Log.LOG_DIR,
        filename: `%DATE%.log`,
        level: 'silly',
        maxFiles: 30,
        zippedArchive: true,
      }),
    ],
  });

  public debug(...strings: LogMessage[]): void {
    this.logger.debug(this.getMessage(...strings));
  }

  public error(...strings: LogMessage[]): void {
    this.logger.error(this.getMessage(...strings));
  }

  public http(...strings: LogMessage[]): void {
    this.logger.http(this.getMessage(...strings));
  }

  public info(...strings: LogMessage[]): void {
    this.logger.info(this.getMessage(...strings));
  }

  public silly(...strings: LogMessage[]): void {
    this.logger.silly(this.getMessage(...strings));
  }

  public verbose(...strings: LogMessage[]): void {
    this.logger.verbose(this.getMessage(...strings));
  }

  public warn(...strings: LogMessage[]): void {
    this.logger.warn(this.getMessage(...strings));
  }

  private getMessage(...messages: LogMessage[]): string {
    if (messages.length === 0) {
      return '';
    }

    const stringMessages = messages.map((msg) => this.stringifyMessage(msg));

    let message = '';
    if (messages.length === 1) {
      message = ` ${stringMessages[0]}`;
    } else {
      message = `[${stringMessages[0]}] ${stringMessages.slice(1).join(' ')}`;
    }

    return message;
  }

  private stringifyMessage(message: LogMessage): string {
    if (typeof message === 'string') {
      return message;
    } else if (typeof message === 'number' || typeof message === 'boolean') {
      return String(message);
    } else if (message instanceof Error) {
      return message.message;
    } else {
      try {
        return JSON.stringify(message);
      } catch {
        return '[Object]';
      }
    }
  }
}

export default Container.get(Log);
