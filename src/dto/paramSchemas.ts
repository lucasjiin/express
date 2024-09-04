/**
 * paramSchemas.ts
 */
import { ParamSchema } from 'express-validator';

export const notEmpty: ParamSchema = {
    errorMessage: 'this param is required.',
};

export const isString: ParamSchema = {
    errorMessage: 'this param must be a string',
};
