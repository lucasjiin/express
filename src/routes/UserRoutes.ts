/**
 * RootRoutes.ts
 */
import { checkSchema } from 'express-validator';
import UserController from '../controllers/UserController';
import { createUserSchema } from '../dto/user/CreateUserDto';
import BaseRouter from './BaseRouter';

class UserRoutes extends BaseRouter {
    static PREFIX_PATH = '/user';

    private userController = new UserController();

    constructor() {
        super();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            '/',
            checkSchema(createUserSchema),
            this.handleValidationErrors,
            this.userController.createUser.bind(this.userController),
        );
        this.router.get('/:name', this.userController.getUser.bind(this.userController));
    }
}

export default UserRoutes;
