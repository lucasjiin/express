/**
 * AppService.ts
 */
import { Prisma } from '../../prisma/client';
// import { IUserDto } from '../dto/user/UserDto';
import UserRepository from '../repositories/UserRepository';

class UserService {
    userRepository = new UserRepository();

    createUser(user: Prisma.UserCreateInput) {
        return this.userRepository.createUser(user);
    }

    getUser() {
        return this.userRepository.getUser();
    }
}

export default UserService;
