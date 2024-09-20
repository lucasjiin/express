/**
 * RootRoutes.ts
 */
import UserController from '../controllers/UserController';
import { createUserSchema } from '../dto/user/CreateUserDto';
import DataValidator from '../middlewares/DataValidator';
import BaseRouter from './BaseRouter';

class UserRoutes extends BaseRouter {
    static PREFIX_PATH = '/user';

    private userController = new UserController();

    constructor() {
        super();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        /**
         * @api {post} /user Create User
         * @apiName CreateUser
         * @apiGroup user
         * @apiVersion 0.1.0
         *
         * @apiBody  {String} name
         * @apiBody  {String} password
         * @apiBody  {String} email

         * @apiSuccess (200) {String} name
         * @apiSuccess (200) {String} email
         * @apiSuccess (200) {String} role
         *
         * @apiParamExample  {json} Request-Example:
         * {
         *      "name": "test1234",
         *      "password": "test1234!",
         *      "email": "a@a.com"
         * }
         *
         * @apiSuccessExample {json} Success-Response:
         * HTTP/1.1 201 Created
         * {
         *      "name": "test1234",
         *      "email": "a@a.com",
         *      "role": "USER"
         * }
         *
         * @apiSampleRequest /user
         */
        this.router.post(
            '/',
            DataValidator.validate(createUserSchema),
            this.userController.createUser.bind(this.userController),
        );

        /**
         * @api {get} /user/:name Get User
         * @apiName GetUser
         * @apiGroup user
         * @apiVersion 0.1.0
         *
         * @apiParam {number} name
         *
         * @apiSuccess (200) {String} name
         * @apiSuccess (200) {String} email
         * @apiSuccess (200) {String} role
         *
         * @apiSuccessExample {json} Success-Response:
         * HTTP/1.1 200 OK
         * {
         *      "name": "test1234",
         *      "email": "a@a.com",
         *      "role": "USER"
         * }
         *
         * @apiSampleRequest /user/:name
         */
        this.router.get('/:name', this.userController.getUser.bind(this.userController));
    }
}

export default UserRoutes;
