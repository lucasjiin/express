/**
 * appDataSource.ts
 */
import { DataSource } from 'typeorm';

import { dbInfo } from '../configs/environments.js';
import Test from '../models/Test.js';

const LOG_TAG = 'appDataSource'; // eslint-disable-line

let dataSource: DataSource | null = null;

async function init(): Promise<void> {
  dataSource = new DataSource({
    database: dbInfo.name,
    entities: [Test],
    host: dbInfo.host,
    logging: dbInfo.logging,
    password: dbInfo.password,
    port: dbInfo.port,
    synchronize: dbInfo.synchronize,
    type: dbInfo.type,
    username: dbInfo.username,
  });

  await dataSource.initialize();
}

const appDataSource = {
  dataSource,
  init,
};

export default appDataSource;
