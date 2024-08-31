/**
 * errorHandler.ts
 */
import { Request, Response } from 'express';

export const errorHandler = () => (err: any, _req: Request, res: Response) => {
    if (err instanceof SyntaxError && err.status === 400 && err.type === 'entity.parse.failed') {
        return res.status(err.status).json({ message: 'invalid json payload' });
    } else {
        return res.status(500).json({ message: 'internal server error' });
    }
};
