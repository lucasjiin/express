/**
 * env.ts
 */
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

config({ override: true });

export const WEB_PORT = parseInt(process.env.PORT ?? '3000', 10);
export const dbInfo = {
  host: process.env.DB_HOST ?? 'localhost',
  logging: (process.env.DB_LOGGING ?? 'false') === 'true',
  name: process.env.DB_NAME ?? '',
  password: process.env.DB_PASSWORD ?? '',
  port: parseInt(process.env.DB_PORT ?? '3306', 10), // MariaDB 기본 포트는 3306입니다.
  synchronize: (process.env.DB_SYNCHRONIZE ?? 'false') === 'true',
  type: 'mariadb' as const,
  username: process.env.DB_USERNAME ?? '',
};

export const rootPath = (() => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  return path.join(__dirname, '../..');
})();
