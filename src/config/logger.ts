import environment from './environment';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, json, printf, colorize, errors } = winston.format;

const sharedConsoleFormat = {
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    printf((info) => `[${info.timestamp}] - ${info.level}: ${info.message}`)
  ),
};

const logger = winston.createLogger({
  level: environment.logLevel || 'info',
  format: combine(errors({ stack: true }), timestamp(), json()),
  transports: [
    new DailyRotateFile({
      dirname: 'logs',
      level: 'error',
      filename: 'errors-%DATE%.log',
      maxFiles: '14d',
    }),
    new DailyRotateFile({
      dirname: 'logs',
      filename: 'combined-%DATE%.log',
      maxFiles: '7d',
    }),
  ],
  exceptionHandlers: [
    new DailyRotateFile({
      dirname: 'logs',
      filename: 'exceptions-%DATE%.log',
      maxFiles: '14d',
    }),
  ],
  rejectionHandlers: [
    new DailyRotateFile({
      dirname: 'logs',
      filename: 'rejections-%DATE%.log',
      maxFiles: '14d',
    }),
  ],
});

if (!environment.isProduction) {
  logger.add(new winston.transports.Console(sharedConsoleFormat));
}

export const httpLogger = winston.createLogger({
  level: 'http',
  format: combine(timestamp(), json()),
  transports: [
    new DailyRotateFile({
      dirname: 'logs',
      level: 'http',
      filename: 'http-%DATE%.log',
      maxFiles: '1d',
    }),
  ],
});

if (!environment.isProduction) {
  httpLogger.add(new winston.transports.Console(sharedConsoleFormat));
}

export default logger;
