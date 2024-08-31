/**
 *
 */
import { IUserDto } from '../dto/user/UserDto';

class UserRepository {
    createUser(_user: IUserDto): IUserDto {
        return {
            id: 'test123',
            email: 'test123@gmail.com',
        };
    }

    getUser(): IUserDto {
        return {
            id: 'test123',
            email: 'test123@gmail.com',
        };
    }
}

export default UserRepository;
