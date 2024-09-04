/**
 * CreaetUserDto.ts
 */
import { Prisma } from '../../../prisma/client';
import { Schema } from '../../types';
import { notEmpty } from '../paramSchemas';

export type CreateUserDto = Prisma.UserCreateInput;

export const createUserSchema: Schema<CreateUserDto> = {
    name: {
        in: ['body'],
        notEmpty,
        isLength: {
            options: { min: 6 },
            errorMessage: 'Username must be at least 6 characters long',
        },
    },
    password: {
        in: ['body'],
        notEmpty,
        isStrongPassword: {
            errorMessage:
                'Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.',
        },
    },
    email: {
        in: ['body'],
        notEmpty,
        isEmail: {
            errorMessage: 'Please provide a valid email address',
        },
    },
};
