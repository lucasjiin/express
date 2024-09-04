/**
 * errorHandler.ts
 */
import { NextFunction, Request, Response } from 'express';

class ErrorHandler {
    static handleError =
        () =>
        (
            err: any,
            _req: Request,
            res: Response,
            _next: NextFunction, // eslint-disable-line
        ) => {
            if (
                err instanceof SyntaxError &&
                err.status === 400 &&
                err.type === 'entity.parse.failed'
            ) {
                return res.status(err.status).send('Invalid json payload');
            } else {
                return res.status(500).send('Internal server error');
            }
        };

    // eslint-disable-next-line
    static handleNotFound = () => (_req: Request, res: Response, _next: NextFunction) => {
        return res.status(500).send('Not Found');
    };
}

export default ErrorHandler;
