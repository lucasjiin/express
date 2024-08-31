/**
 * RootRoutes.ts
 */
import UserController from '../controllers/UserController';
import { CreateUserSchema } from '../dto/user/UserDto';
import BaseRouter from './BaseRouter';

class UserRoutes extends BaseRouter {
    static PREFIX_PAT = '/user';

    private userController = new UserController();

    constructor() {
        super();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            '/',
            CreateUserSchema,
            this.handleValidationErrors,
            this.userController.createUser.bind(this.userController),
        );
        this.router.get('/', this.userController.getUser.bind(this.userController));
    }
}

export default UserRoutes;
