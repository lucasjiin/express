/**
 * BaseRouter.ts
 */
import express, { Router } from 'express';

class BaseRouter {
    protected router = express.Router();

    protected constructor() {}

    getRouter(): Router {
        return this.router;
    }
}

export default BaseRouter;
