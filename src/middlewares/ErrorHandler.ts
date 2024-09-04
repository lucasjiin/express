/**
 * errorHandler.ts
 */
import { ErrorRequestHandler, NextFunction, Request, RequestHandler, Response } from 'express';

class ErrorHandler {
    static handleError: ErrorRequestHandler = (
        err: any,
        _req: Request,
        res: Response,
        next: NextFunction,
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

    static handleNotFound: RequestHandler = (_req: Request, res: Response, next: NextFunction) => {
        return res.status(500).send('Not Found');
    };
}

export default ErrorHandler;
