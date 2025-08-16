/**
 * accessLog.ts
 */
import morgan from 'morgan';

import log from './log.js';

const FORMAT = ':remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] :referrer :user-agent - :response-time ms';

export function createAccessLog() {
  return morgan(FORMAT, {
    stream: {
      write: (message) => {
        log.info('express', message.trim());
      },
    },
  });
}
