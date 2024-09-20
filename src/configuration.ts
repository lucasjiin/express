/**
 * configuration.ts
 */
import { ApolloServerOptions, BaseContext } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { readFileSync } from 'fs';
import http from 'http';
import path from 'path';
import { Resolvers } from '../graphql/resolvers';
import UserResolver from './resolvers/UserResolver';
import { HelmetOptions } from 'helmet';
import session from 'express-session';

const SESSION_SECRET = process.env.SESSION_SECRET ?? '@node-expres1324!';

const userTypeDefs = readFileSync(path.resolve(__dirname, '../graphql/user.graphql'), 'utf8');
const typeDefs = [userTypeDefs];
const resolvers: Resolvers = [new UserResolver()];

export function getApolloServerOptions(httpServer: http.Server): ApolloServerOptions<BaseContext> {
    return {
        typeDefs: typeDefs,
        resolvers: resolvers,
        formatError: (err) => {
            return {
                message: err.message,
                extensions: {
                    ...err.extensions,
                    stacktrace: undefined,
                },
            };
        },
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            ApolloServerPluginLandingPageLocalDefault({ embed: true, includeCookies: true }),
        ],
    };
}

export function getHelmetOptions(): Readonly<HelmetOptions> {
    return {
        contentSecurityPolicy: {
            useDefaults: true,
            directives: {
                'script-src': [
                    "'self'",
                    "'unsafe-eval'",
                    "'unsafe-inline'",
                    'https://embeddable-sandbox.cdn.apollographql.com',
                ],
                'img-src': ["'self'", 'https://apollo-server-landing-page.cdn.apollographql.com'],
                'default-src': [
                    "'self'",
                    'https://apollo-server-landing-page.cdn.apollographql.com',
                ],
                'frame-src': ["'self'", 'https://sandbox.embed.apollographql.com'],
                'frame-ancestors': ["'self'", 'https://studio.apollographql.com'],
            },
        },
    };
}

export function getSessionOptions(): session.SessionOptions {
    return {
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { httpOnly: true },
    };
}
