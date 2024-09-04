/**
 *
 */
import { Prisma } from '../../prisma/client';
import Log from '../utils/Log';
import { prisma } from './connections';

class UserRepository {
    static async createUser(input: Prisma.UserCreateInput) {
        const { name, password, email } = input;

        try {
            const user = await prisma.user.create({
                data: { name, email, password },
            });

            return { user };
        } catch (error: any) {
            Log.error(error.toString());
            return { error };
        }
    }

    static async getUser(input: Prisma.UserWhereUniqueInput) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    name: input.name,
                },
            });
            return { user };
        } catch (error: any) {
            Log.error(error.toString());
            return { error };
        }
    }
}

export default UserRepository;
