/**
 * MainController.ts
 */
import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
    userService: UserService = new UserService();

    async createUser(req: Request, res: Response) {
        const user = await this.userService.createUser(req.body);
        if (typeof user === 'string') {
            res.status(400).json({ message: user });
            return;
        }

        res.send(user);
    }

    getUser(_req: Request, res: Response) {
        res.send(this.userService.getUser());
    }
}

export default UserController;
