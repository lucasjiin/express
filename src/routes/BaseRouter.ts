/**
 * BaseRouter.ts
 */
import express, { NextFunction, Request, Response, Router } from 'express';
import { validationResult } from 'express-validator';

class BaseRouter {
    protected router = express.Router();

    protected constructor() {}

    protected handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    };

    getRouter(): Router {
        return this.router;
    }
}

export default BaseRouter;
