/**
 * Morgan.ts
 */
import morgan from 'morgan';
import Log from '../utils/Log';

class ReqeustLogger {
    private static readonly FORMAT =
        ':remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] :referrer :user-agent - :response-time ms';

    static log() {
        return morgan(ReqeustLogger.FORMAT, {
            stream: {
                write: (message) => {
                    Log.info('express', message.trim());
                },
            },
        });
    }
}

export default ReqeustLogger;
