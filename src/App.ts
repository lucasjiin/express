/**
 * App.ts
 */
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import http from 'http';
import path from 'path';
// import swaggerUi from 'swagger-ui-express';
import { getApolloServerOptions, getHelmetOptions, getSessionOptions } from './configuration';
// import swaggerDocument from './docs/swagger.json';
import ErrorHandler from './middlewares/ErrorHandler';
import ReqeustLogger from './middlewares/ReqeustLogger';
import UserRoutes from './routes/UserRoutes';
import Log from './utils/Log';

const LOG_TAG = 'App';

class App {
    private static instance: App | null = null;
    static readonly PORT = process.env.PORT ?? 3000;

    private app = express();
    private server = http.createServer(this.app);

    private gqlServer = new ApolloServer(getApolloServerOptions(this.server));

    private userRoutes = new UserRoutes();

    private constructor() {
        this.initialize();
    }

    private async initialize() {
        await this.gqlServer.start();

        this.app.use(ReqeustLogger.log());
        this.app.use(cors());
        this.app.use(helmet(getHelmetOptions()));
        this.app.use(express.json(), ErrorHandler.handleJsonParseError);
        this.app.use(cookieParser());
        this.app.use(session(getSessionOptions()));
        this.app.use('/', express.static(path.join(__dirname, '../public')));
        // this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        this.app.use(
            '/api',
            expressMiddleware(this.gqlServer, {
                context: async (context) => context,
            }),
        );

        this.app.use(UserRoutes.PREFIX_PATH, this.userRoutes.getRouter());

        // handle error
        this.app.use(ErrorHandler.handleNotFound);
        this.app.use(ErrorHandler.handleErrors);
    }

    static getInstance() {
        if (!App.instance) {
            App.instance = new App();
        }

        return App.instance;
    }

    listen() {
        this.app.listen(App.PORT, () => {
            Log.info(LOG_TAG, `listening on port ${App.PORT}`);
        });
    }
}

export default App;
