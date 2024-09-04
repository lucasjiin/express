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
} from '../../graphql/resolvers';
import UserService from '../services/UserService';

type QueryResolverFnUser = Resolver<
    Maybe<ResolverTypeWrapper<User>>,
    Record<string, never>,
    any,
    RequireFields<QueryUserArgs, 'name'>
>;

class Query implements QueryResolvers {
    user: QueryResolverFnUser = async (_parent, args /* , _context, _info */) => {
        const { user, error } = await UserService.getInstance().getUser(args.name);

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
    Query: QueryResolvers = new Query();
}

export default UserResolver;
