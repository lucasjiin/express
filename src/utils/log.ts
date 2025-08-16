/**
 * log.ts
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
import path from 'path';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { rootPath } from '../configs/environments.js';

const { colorize, combine, printf, timestamp } = winston.format;
const { Console, DailyRotateFile } = winston.transports;

type LogMessage = boolean | Error | number | object | string;

const LOG_DIR = path.join(rootPath, 'logs');

const format = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${process.pid}][${level}]${message}`;
});

const logger = winston.createLogger({
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }), format),
  transports: [
    new Console({
      format: combine(colorize(), format),
      level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
    }),
    new DailyRotateFile({
      datePattern: 'YYYY-MM-DD',
      dirname: LOG_DIR,
      filename: `%DATE%.log`,
      level: 'silly',
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],
});

function debug(...strings: LogMessage[]): void {
  logger.debug(getMessage(...strings));
}

function error(...strings: LogMessage[]): void {
  logger.error(getMessage(...strings));
}

function getMessage(...messages: LogMessage[]): string {
  if (messages.length === 0) {
    return '';
  }

  const stringMessages = messages.map((msg) => stringifyMessage(msg));

  let message = '';
  if (messages.length === 1) {
    message = ` ${stringMessages[0]}`;
  } else {
    message = `[${stringMessages[0]}] ${stringMessages.slice(1).join(' ')}`;
  }

  return message;
}

function http(...strings: LogMessage[]): void {
  logger.http(getMessage(...strings));
}

function info(...strings: LogMessage[]): void {
  logger.info(getMessage(...strings));
}

function silly(...strings: LogMessage[]): void {
  logger.silly(getMessage(...strings));
}

function stringifyMessage(message: LogMessage): string {
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

function verbose(...strings: LogMessage[]): void {
  logger.verbose(getMessage(...strings));
}

function warn(...strings: LogMessage[]): void {
  logger.warn(getMessage(...strings));
}

const log = {
  debug,
  error,
  http,
  info,
  silly,
  verbose,
  warn,
};

export default log;
