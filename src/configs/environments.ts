/**
 * environments.ts
 */
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

config({ override: true });

export const WEB_PORT = parseInt(process.env.PORT ?? '3000', 10);
export const SESSION_SECRET = process.env.SESSION_SECRET ?? '@node-expres1324!';

export const dbInfo = {
  host: process.env.DB_HOST ?? 'localhost',
  logging: (process.env.DB_LOGGING ?? 'false') === 'true',
  name: process.env.DB_NAME ?? '',
  password: process.env.DB_PASSWORD ?? '',
  port: parseInt(process.env.DB_PORT ?? '3306', 10), // default port is 3306
  synchronize: (process.env.DB_SYNCHRONIZE ?? 'false') === 'true',
  type: 'mariadb',
  username: process.env.DB_USERNAME ?? '',
} as const;

export const rootPath = (() => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  return path.join(__dirname, '../..');
})();
