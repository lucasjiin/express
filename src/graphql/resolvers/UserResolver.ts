/**
 * UserResolver.ts
 */

import { GraphQLError } from 'graphql';
import { QueryResolvers, Resolvers, Role, User } from '../../../graphql/resolvers';
import UserRepository from '../../repositories/UserRepository';

class UserQueryResolver implements QueryResolvers {
    async user(): Promise<User> {
        const user = await UserRepository.getUser();

        if (user === null) {
            const error = new GraphQLError('internal server error', {
                extensions: {
                    code: 500,
                },
            });

            throw error;
        }

        return {
            name: user?.name,
            email: user?.email,
            role: user?.role as Role,
        };
    }
}

class UserResolver implements Resolvers {
    Query = new UserQueryResolver();
}

export default UserResolver;
