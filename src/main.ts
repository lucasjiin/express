/**
 * app.ts
 */
import * as dotenv from 'dotenv';
import path from 'path';
import App from './App';

function bootstrap() {
    dotenv.config({ path: path.join(__dirname, '../.env') });
    App.getInstance().listen();
}

bootstrap();
