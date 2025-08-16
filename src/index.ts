/**
 * index.ts
 */
import 'reflect-metadata';

import { startServer } from './App.js';
import './configs/environments.js';
import log from './utils/log.js';

function bootstrap(): void {
  startServer();

  process.on('exit', (code) => {
    log.error('Process exiting with code:', code);
  });

  // process.on('SIGINT', () => {
  //   log.error('Received SIGINT');
  //   process.exit(0);
  // });

  // process.on('uncaughtException', (err) => {
  //   log.error('Uncaught Exception:', err);
  // });

  // process.on('unhandledRejection', (reason, promise) => {
  //   log.error('Unhandled Rejection at:', promise, 'reason:', reason ?? '');
  //   process.exit(1);
  // });
}

bootstrap();
