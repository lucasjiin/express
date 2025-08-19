/**
 * index.ts
 */
import 'reflect-metadata';

import './configs/environments.js';
import App from './App.js';
import Log from './utils/Log.js';

function bootstrap(): void {
  App.init();
  App.startServer();

  process.on('exit', (code) => {
    Log.error('Process exiting with code:', code);
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
