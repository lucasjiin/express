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
import { errorHandler } from './middlewares/errorHandler';
import UserRoutes from './routes/UserRoutes';
import Log from './utils/Log';

class App {
    private static instance: App | null = null;
    private static SESSION_SECRET = process.env.SESSION_SECRET ?? '@node-expres1324!';
    static PORT = process.env.PORT ?? 3000;

    private app = express();

    private userRoutes = new UserRoutes();

    private constructor() {
        this.initializeMiddleware();
        this.initializeRoutes();
    }

    private initializeMiddleware() {
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
        this.app.use(UserRoutes.PREFIX_PAT, this.userRoutes.getRouter());
    }

    private initializeRoutes() {
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
            Log.info(`listening on port ${App.PORT}`);
        });
    }
}

export default App;
