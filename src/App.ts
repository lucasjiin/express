/**
 * App.ts
 */
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
// import helmet from 'helmet';
import path from 'path';
import swaggerUiExpress from 'swagger-ui-express';

import { rootPath, WEB_PORT } from './configs/environments.js';
import { sessionOptions } from './configs/serverOptions.js';
import swaggerSpec from './configs/swaggerSpec.js';
import { handleErrors, handleJsonParseError, handleNotFound } from './middlewares/errorHandler.js';
import testRoutes from './routes/testRoutes.js';
import { createAccessLog } from './utils/accessLog.js';
import { getServerIpAddresses } from './utils/commonUtils.js';
import log from './utils/log.js';

const LOG_TAG = 'App';

const app = express();

function init() {
  // Middleware setup
  app.use(createAccessLog());
  app.use(cors());
  // app.use(helmet()); // enable helmet when using https
  app.use(session(sessionOptions));
  app.use(express.json(), handleJsonParseError);
  app.use(cookieParser());

  // docs
  app.use(
    '/docs',
    swaggerUiExpress.serve,
    swaggerUiExpress.setup(swaggerSpec, {
      customCss: '.swagger-ui .topbar { display: none }',
      customSiteTitle: 'Express API Documentation',
      swaggerOptions: {
        displayRequestDuration: true,
        persistAuthorization: true,
      },
    }),
  );

  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  // Initialize routes
  app.use(testRoutes.PREFIX_PATH, testRoutes.router);

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
    const ipList = getServerIpAddresses();
    log.info(LOG_TAG, `Server successfully started`);
    log.info(LOG_TAG, 'IP:', ipList.join(','));
    log.info(LOG_TAG, 'Port:', WEB_PORT);
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
