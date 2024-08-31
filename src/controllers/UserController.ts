/**
 * MainController.ts
 */
import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
    userService: UserService = new UserService();

    createUser(req: Request, res: Response) {
        res.send(this.userService.createUser(req.body));
    }

    getUser(_req: Request, res: Response) {
        res.send(this.userService.getUser());
    }
}

export default UserController;
