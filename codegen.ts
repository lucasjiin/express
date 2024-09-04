/**
 * codegen.ts
 */
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: './graphql/*.graphql',
    generates: {
        './graphql/resolvers.ts': {
            config: {
                useIndexSignature: true,
            },
            plugins: ['typescript', 'typescript-resolvers'],
        },
    },
};
export default config;
