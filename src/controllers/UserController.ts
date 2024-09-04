/**
 * MainController.ts
 */
import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
    userService: UserService = new UserService();

    private sendServerError(res: Response) {
        res.status(500).json({ message: 'internal server error' });
    }

    async createUser(req: Request, res: Response) {
        const user = await this.userService.createUser(req.body);
        if (typeof user === 'string') {
            res.status(400).json({ message: user });
            return;
        } else if (user === null) {
            this.sendServerError(res);
            return;
        }

        res.send(user);
    }

    async getUser(_req: Request, res: Response) {
        const user = await this.userService.getUser();

        if (user === null) {
            this.sendServerError(res);
            return;
        }

        res.send(user);
    }
}

export default UserController;
