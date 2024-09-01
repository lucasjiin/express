/**
 *
 */
import { Prisma, Role } from '../../prisma/client';
import { prisma } from './connections';

class UserRepository {
    prisma = prisma;

    async createUser(user: Prisma.UserCreateInput) {
        const { name, password, email } = user;

        try {
            await prisma.user.create({
                data: { name, email, password },
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    return 'this email is already registered.';
                }
            }
            return null;
        }

        return { name, email, password };
    }

    getUser() {
        return {
            name: 'test123',
            email: 'test123@gmail.com',
            role: Role.USER,
        };
    }
}

export default UserRepository;
