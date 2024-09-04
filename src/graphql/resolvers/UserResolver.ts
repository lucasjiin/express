/**
 * UserResolver.ts
 */
import { GraphQLError } from 'graphql';
import {
    Maybe,
    QueryResolvers,
    QueryUserArgs,
    RequireFields,
    Resolver,
    Resolvers,
    ResolverTypeWrapper,
    Role,
    User,
} from '../../../graphql/resolvers';
import UserRepository from '../../repositories/UserRepository';

class UserQueryResolver implements QueryResolvers {
    user: Resolver<
        Maybe<ResolverTypeWrapper<User>>,
        Record<string, never>,
        any,
        RequireFields<QueryUserArgs, 'name'>
    > = async (_parent, args /* , _context, _info */) => {
        const { user, error } = await UserRepository.getUser({ name: args.name });

        if (error) {
            const gqlerror = new GraphQLError('internal server error', {
                extensions: {
                    code: 500,
                },
            });

            throw gqlerror;
        }

        return {
            name: user?.name,
            email: user?.email,
            role: user?.role as Role,
        };
    };
}

class UserResolver implements Resolvers {
    Query: QueryResolvers = new UserQueryResolver();
}

export default UserResolver;
