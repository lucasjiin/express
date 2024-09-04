/**
 * AppService.ts
 */
import { Prisma } from '../../prisma/client';
import UserRepository from '../repositories/UserRepository';
import * as bcrypt from 'bcryptjs';

class UserService {
    async createUser(user: Prisma.UserCreateInput) {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);

        return UserRepository.createUser(user);
    }

    getUser() {
        return UserRepository.getUser();
    }
}

export default UserService;
