/**
 * App.ts
 */
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
// import helmet from 'helmet';
import path from 'path';
import * as swaggerUI from 'swagger-ui-express';
import { Container, Service } from 'typedi';

import { rootPath, WEB_PORT } from './configs/environments.js';
import { sessionOptions } from './configs/serverOptions.js';
import * as swaggerDocument from './configs/swagger.json' with { type: 'json' };
import { handleErrors, handleJsonParseError, handleNotFound, handleValidationError } from './middlewares/errorHandler.js';
import { RegisterRoutes } from './routes/routes.js';
import { getServerIpAddresses } from './utils/commonUtils.js';
import Log from './utils/Log.js';
import { makeRequestLog } from './utils/makeRequestLog.js';

const LOG_TAG = 'App';

@Service()
class App {
  private app = express();

  public init() {
    // Middleware setup
    this.app.use(makeRequestLog());
    this.app.use(cors());
    // app.use(helmet()); // enable helmet when using https
    this.app.use(session(sessionOptions));
    this.app.use(express.json(), handleJsonParseError);
    this.app.use(cookieParser());

    this.app.use(
      '/docs',
      swaggerUI.serve,
      swaggerUI.setup(swaggerDocument, {
        customSiteTitle: 'Express Template Docs',
        // customCss: '.swagger-ui .topbar { display: none }',
        // swaggerOptions: {
        //   displayRequestDuration: true,
        //   persistAuthorization: true,
        // },
      }),
    );

    // Routes setup
    RegisterRoutes(this.app);
    this.app.use('/', express.static(path.join(rootPath, 'public')));
    this.app.use(handleNotFound);

    // Error handling
    this.app.use(handleValidationError);
    this.app.use(handleErrors);
  }

  public startServer() {
    const server = this.app.listen(WEB_PORT, () => {
      const ipList = getServerIpAddresses();
      Log.info(LOG_TAG, `Server successfully started`);
      Log.info(LOG_TAG, 'IP:', ipList.join(','));
      Log.info(LOG_TAG, 'Port:', WEB_PORT);
    });

    server.on('error', (err: NodeJS.ErrnoException) => {
      Log.error(LOG_TAG, 'Server error occurred:', err.code ?? '-1', err.message);

      if (err.code === 'EADDRINUSE') {
        Log.error(LOG_TAG, `Port ${WEB_PORT} is already in use!`);
        Log.error(LOG_TAG, 'Try using a different port or stop the process using this port');
        Log.error(LOG_TAG, `To find process: lsof -i :${WEB_PORT}`);
      } else if (err.code === 'EACCES') {
        Log.error(LOG_TAG, `Permission denied to bind to port ${WEB_PORT}`);
        Log.error(LOG_TAG, 'Try using a port number > 1024 or run with sudo');
      }

      process.exit(1);
    });
  }
}

export default Container.get(App);
