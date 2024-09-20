/**
 * errorHandler.ts
 */
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

class ErrorHandler {
    static handleErrors(
        _err: any,
        _req: Request,
        res: Response,
        _next: NextFunction, // eslint-disable-line
    ) {
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }

    static handleJsonParseError(
        err: any,
        _req: Request,
        res: Response,
        _next: NextFunction, // eslint-disable-line
    ) {
        return res.status(err.status).send('Invalid json payload');
    }

    // eslint-disable-next-line
    static handleNotFound(_req: Request, res: Response, _next: NextFunction) {
        return res.sendStatus(StatusCodes.NOT_FOUND);
    }
}

export default ErrorHandler;
