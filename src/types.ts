/**
 * types.ts
 */
import { ParamSchema } from 'express-validator';

export type Schema<T> = {
    [K in keyof T]: ParamSchema;
};
