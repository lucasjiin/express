/**
 * paramSchemas.ts
 */
import { ParamSchema } from 'express-validator';

class ParamSchemas {
    static isString: ParamSchema = {
        errorMessage: 'this param must be a string',
    };

    static notEmpty: ParamSchema = {
        errorMessage: 'this param is required.',
    };
}

export default ParamSchemas;
