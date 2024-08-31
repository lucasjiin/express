/**
 * AppService.ts
 */
import { IUserDto } from '../dto/user/UserDto';
import UserRepository from '../repositories/UserRepository';

class UserService {
    userRepository = new UserRepository();

    createUser(user: IUserDto): IUserDto {
        return this.userRepository.createUser(user);
    }

    getUser(): IUserDto {
        return this.userRepository.getUser();
    }
}

export default UserService;
