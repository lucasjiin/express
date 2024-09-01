/**
 * prettier.config.mjs
 */
import baseConfig from './prettier.config.mjs';

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
    ...baseConfig,
    plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-prisma'],
};

export default config;
