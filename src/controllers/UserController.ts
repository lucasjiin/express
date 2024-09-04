/**
 * MainController.ts
 */
import { Request, Response } from 'express';
import UserService from '../services/UserService';
import { Prisma } from '../../prisma/client';

class UserController {
    userService: UserService = UserService.getInstance();

    private sendServerError(res: Response) {
        res.status(500).send('Internal server error');
    }

    async createUser(req: Request, res: Response) {
        const { user, error } = await this.userService.createUser(req.body);
        if (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                res.status(400).json({ message: 'this email is already registered.' });
                return;
            } else {
                this.sendServerError(res);
                return;
            }
        }

        res.send({
            name: user?.name,
            email: user?.email,
            role: user?.role,
        });
    }

    async getUser(req: Request, res: Response) {
        const { user, error } = await this.userService.getUser(req.params.name);
        if (error) {
            this.sendServerError(res);
            return;
        }

        res.send({
            name: user?.name,
            email: user?.email,
            role: user?.role,
        });
    }
}

export default UserController;
