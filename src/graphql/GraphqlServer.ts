/**
 * GraphqlServer.ts
 */
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { readFileSync } from 'fs';
import { Server as HttpServer } from 'http';
import { Server as HttpsServer } from 'https';
import path from 'path';
import { Resolvers } from '../../graphql/resolvers';
import UserResolver from './resolvers/UserResolver';

const userTypeDefs = readFileSync(path.resolve(__dirname, '../../graphql/user.graphql'), 'utf8');
const typeDefs = [userTypeDefs];
const resolvers: Resolvers = [new UserResolver()];

class GraphqlServer extends ApolloServer {
    private static instance: GraphqlServer | null = null;

    private constructor(httpServer: HttpServer | HttpsServer) {
        super({
            typeDefs,
            resolvers,
            formatError: (err) => {
                return {
                    message: err.message,
                    extensions: {
                        ...err.extensions,
                        stacktrace: undefined,
                    },
                };
            },
            plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        });
    }

    static getInstance(httpServer: HttpServer | HttpsServer) {
        if (!GraphqlServer.instance) {
            GraphqlServer.instance = new GraphqlServer(httpServer);
        }

        return GraphqlServer.instance;
    }
}

export default GraphqlServer;
