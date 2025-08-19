/**
 * AppDataSource.ts
 */
import { DataSource } from 'typeorm';

import { dbInfo } from '../configs/environments.js';
import Test from '../models/Test.js';
import Log from '../utils/Log.js';

const LOG_TAG = 'AppDataSource'; // eslint-disable-line

class AppDataSource {
  public dataSource = new DataSource({
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

  public async init(): Promise<void> {
    try {
      await this.dataSource.initialize();
    } catch (error) {
      Log.error('Error during Data Source initialization', error);
    }
  }
}

export default AppDataSource;
