/**
 * App.ts
 */
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';

import { rootPath, WEB_PORT } from './configs/environments.js';
import { sessionOptions } from './configs/serverOptions.js';
// import swaggerSpec from './configs/swagger/swaggerOptions.js';
// import { checkAuth } from './middlewares/checkLogin.js';
import { handleErrors, handleJsonParseError, handleNotFound } from './middlewares/errorHandler.js';
import { createAccessLog } from './utils/accessLog.js';
import log from './utils/log.js';
import path from 'path';

const LOG_TAG = 'App';

const app = express();

function init() {
  //   const { default: swaggerUiExpress } = await import('swagger-ui-express');

  // Middleware setup
  app.use(createAccessLog());
  app.use(cors());
  app.use(helmet());
  app.use(session(sessionOptions));
  app.use(express.json(), handleJsonParseError);
  app.use(cookieParser());
  //   app.use(
  //     '/api-docs',
  //     swaggerUiExpress.serve,
  //     swaggerUiExpress.setup(swaggerSpec, {
  //       // explorer: true,
  //       customCss: '.swagger-ui .topbar { display: none }',
  //       customSiteTitle: 'Intellilab API Documentation',
  //       swaggerOptions: {
  //         displayRequestDuration: true,
  //         persistAuthorization: true,
  //       },
  //     })
  //   );

  //   app.get('/api-docs.json', (req, res) => {
  //     res.setHeader('Content-Type', 'application/json');
  //     res.send(swaggerSpec);
  //   });

  // Initialize routes
  // app.use(testRoutes.PREFIX_PATH, testRoutes.router);
  //   app.use(authRoutes.PREFIX_PATH, authRoutes.router);
  //   app.use(imaginiRoutes.PREFIX_PATH, imaginiRoutes.router);
  //   app.use('/api', checkAuth);
  //   app.use(databaseRoutes.PREFIX_PATH, databaseRoutes.router);
  //   app.use(storageRoutes.PREFIX_PATH, storageRoutes.router);
  //   app.use(variablesRoutes.PREFIX_PATH, variablesRoutes.router);

  app.get('/', (req, res) => {
    res.send('HOME');
  });
  app.use('/', express.static(path.join(rootPath, 'public')));

  // Error handling
  app.use(handleNotFound);
  app.use(handleErrors);
}

function startServer(): void {
  const server = app.listen(WEB_PORT, () => {
    log.info(LOG_TAG, `Server successfully started on port`, WEB_PORT);
  });

  server.on('error', (err: NodeJS.ErrnoException) => {
    log.error(LOG_TAG, 'Server error occurred:', err.code ?? '-1', err.message);

    if (err.code === 'EADDRINUSE') {
      log.error(LOG_TAG, `Port ${WEB_PORT} is already in use!`);
      log.error(LOG_TAG, 'Try using a different port or stop the process using this port');
      log.error(LOG_TAG, `To find process: lsof -i :${WEB_PORT}`);
    } else if (err.code === 'EACCES') {
      log.error(LOG_TAG, `Permission denied to bind to port ${WEB_PORT}`);
      log.error(LOG_TAG, 'Try using a port number > 1024 or run with sudo');
    }

    process.exit(1);
  });
}

init();

export default app;
export { startServer };
