/**
 * MainController.ts
 */
import { Request, Response } from 'express';
import { Prisma } from '../../prisma/client';
import UserService from '../services/UserService';
import { StatusCodes } from 'http-status-codes';

class UserController {
    userService: UserService = UserService.getInstance();

    async createUser(req: Request, res: Response) {
        const { user, error } = await this.userService.createUser(req.body);
        if (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                res.status(StatusCodes.BAD_REQUEST).json({
                    message: 'this email is already registered.',
                });
                return;
            } else {
                res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
                return;
            }
        }

        res.status(StatusCodes.CREATED).send({
            name: user?.name,
            email: user?.email,
            role: user?.role,
        });
    }

    async getUser(req: Request, res: Response) {
        const { user, error } = await this.userService.getUser(req.params.name);
        if (error) {
            res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
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
