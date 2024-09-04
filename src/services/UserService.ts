/**
 * AppService.ts
 */
import { Prisma } from '../../prisma/client';
import UserRepository from '../repositories/UserRepository';

class UserService {
    createUser(user: Prisma.UserCreateInput) {
        return UserRepository.createUser(user);
    }

    getUser() {
        return UserRepository.getUser();
    }
}

export default UserService;
