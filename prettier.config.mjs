/**
 * prettier.config.mjs
 */
/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
    plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-prisma'],
    singleQuote: true,
    trailingComma: 'all',
    tabWidth: 4,
    printWidth: 100,
};

export default config;
