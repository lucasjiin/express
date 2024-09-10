/**
 * AppService.ts
 */
import * as bcrypt from 'bcryptjs';
import { Prisma } from '../../prisma/client';
import UserRepository from '../repositories/UserRepository';

class UserService {
    private static instance: UserService | null = null;

    private constructor() {}

    static getInstance() {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }

        return UserService.instance;
    }

    async createUser(input: Prisma.UserCreateInput) {
        const salt = await bcrypt.genSalt();
        input.password = await bcrypt.hash(input.password, salt);
        // await bcrypt.compare(password, user.password)
        return await UserRepository.createUser(input);
    }

    getUser(name: string) {
        return UserRepository.getUser({ name });
    }
}

export default UserService;
