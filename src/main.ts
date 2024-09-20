/**
 * app.ts
 */
import cluster from 'cluster';
import * as dotenv from 'dotenv';
import { cpus } from 'os';
import path from 'path';
import App from './App';

function bootstrap() {
    let cpuNum: number | string = 1;
    dotenv.config({
        path: [path.join(__dirname, '../.env'), path.join(__dirname, '../.env.dev')],
        override: true,
    });

    cpuNum = process.env.INSTANCES_NUM ?? cpus().length;

    if (cluster.isPrimary) {
        for (let i = 0; i < +cpuNum; i++) {
            cluster.fork();
        }

        cluster.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died. code: ${code}, signal: ${signal}`);
        });
    } else {
        App.getInstance().listen();
    }
}

bootstrap();
