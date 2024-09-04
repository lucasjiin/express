/**
 * CreaetUserDto.ts
 */
import { Prisma } from '../../../prisma/client';
import { Schema } from '../../types';
import ParamSchemas from '../ParamSchemas';

export type CreateUserDto = Prisma.UserCreateInput;

export const createUserSchema: Schema<CreateUserDto> = {
    name: {
        in: ['body'],
        notEmpty: ParamSchemas.notEmpty,
        isLength: {
            options: { min: 6 },
            errorMessage: 'Username must be at least 6 characters long',
        },
    },
    password: {
        in: ['body'],
        notEmpty: ParamSchemas.notEmpty,
        isStrongPassword: {
            errorMessage:
                'Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.',
        },
    },
    email: {
        in: ['body'],
        notEmpty: ParamSchemas.notEmpty,
        isEmail: {
            errorMessage: 'Please provide a valid email address',
        },
    },
};
