/**
 *
 */
import { Prisma, Role } from '../../prisma/client';
import { prisma } from './connections';

class UserRepository {
    static async createUser(user: Prisma.UserCreateInput) {
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
            } else {
                return null;
            }
        }

        return { name, email, password };
    }

    static async getUser() {
        try {
            const user = await prisma.user.findFirst();
            return {
                name: user?.name,
                email: user?.email,
                role: user?.role,
            };
        } catch (error) {
            return null;
        }
    }
}

export default UserRepository;
