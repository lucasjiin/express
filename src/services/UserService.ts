/**
 * AppService.ts
 */
import { Prisma } from '../../prisma/client';
import UserRepository from '../repositories/UserRepository';
import * as bcrypt from 'bcryptjs';

class UserService {
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
