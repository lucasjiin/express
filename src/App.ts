/**
 * App.ts
 */
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import path from 'path';
// import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from './docs/swagger.json';
import http from 'http';
import morgan from 'morgan';
import GraphqlServer from './graphql/GraphqlServer';
import { errorHandler } from './middlewares/errorHandler';
import UserRoutes from './routes/UserRoutes';
import Log from './utils/Log';
import { expressMiddleware } from '@apollo/server/express4';

const LOG_TAG = 'App';
const morganFormat =
    ':remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] :referrer :user-agent - :response-time ms';

class App {
    private static instance: App | null = null;
    private static SESSION_SECRET = process.env.SESSION_SECRET ?? '@node-expres1324!';
    static PORT = process.env.PORT ?? 3000;

    private app = express();
    private server = http.createServer(this.app);

    private gqlServer = GraphqlServer.getInstance(this.server);

    private userRoutes = new UserRoutes();

    private constructor() {
        this.initialize();
    }

    private async initialize() {
        await this.gqlServer.start();

        this.app.use(
            morgan(morganFormat, {
                stream: {
                    write: (message) => {
                        if (message.includes('POST /api')) {
                            return;
                        }
                        Log.info(LOG_TAG, message);
                    },
                },
            }),
        );
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use(
            session({
                secret: App.SESSION_SECRET,
                resave: false,
                saveUninitialized: true,
                cookie: { httpOnly: true },
            }),
        );
        this.app.use('/', express.static(path.join(__dirname, '../public')));
        // this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        this.app.use(
            '/api',
            expressMiddleware(this.gqlServer, {
                context: async ({ req }) => ({ token: req.headers.token }),
            }),
        );

        this.app.use(UserRoutes.PREFIX_PAT, this.userRoutes.getRouter());
        this.app.use(errorHandler());
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
