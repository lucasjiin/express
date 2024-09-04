/**
 * App.ts
 */
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import { readFileSync } from 'fs';
import helmet from 'helmet';
import http from 'http';
import path from 'path';
import { Resolvers } from '../graphql/resolvers';
import ErrorHandler from './middlewares/ErrorHandler';
import ReqeustLogger from './middlewares/ReqeustLogger';
import UserResolver from './resolvers/UserResolver';
import UserRoutes from './routes/UserRoutes';
import Log from './utils/Log';

// import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from './docs/swagger.json';

const LOG_TAG = 'App';

class App {
    private static instance: App | null = null;
    private static readonly SESSION_SECRET = process.env.SESSION_SECRET ?? '@node-expres1324!';
    static readonly PORT = process.env.PORT ?? 3000;

    private static readonly userTypeDefs = readFileSync(
        path.resolve(__dirname, '../graphql/user.graphql'),
        'utf8',
    );
    private static readonly typeDefs = [App.userTypeDefs];
    private static readonly resolvers: Resolvers = [new UserResolver()];

    private app = express();
    private server = http.createServer(this.app);

    private gqlServer = new ApolloServer({
        typeDefs: App.typeDefs,
        resolvers: App.resolvers,
        formatError: (err) => {
            return {
                message: err.message,
                extensions: {
                    ...err.extensions,
                    stacktrace: undefined,
                },
            };
        },
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer: this.server })],
    });

    private userRoutes = new UserRoutes();

    private constructor() {
        this.initialize();
    }

    private async initialize() {
        await this.gqlServer.start();

        this.app.use(ReqeustLogger.log());
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
                context: async (context) => context,
            }),
        );

        this.app.use(UserRoutes.PREFIX_PATH, this.userRoutes.getRouter());

        // handle error
        this.app.use(ErrorHandler.handleNotFound());
        this.app.use(ErrorHandler.handleError());
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
