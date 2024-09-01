/**
 * CreaetUserDto.ts
 */
import { checkSchema, ParamSchema } from 'express-validator';
import { Prisma } from '../../../prisma/client';
import { notEmpty } from '../../utils/paramSchemas';

// export interface IUserDto {
//     id: string;
//     password?: string;
//     email: string;
// }

type CreateUserProps<T> = {
    [K in keyof T]: ParamSchema;
};

const createUserProps: CreateUserProps<Prisma.UserCreateInput> = {
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
export const CreateUserSchema = checkSchema(createUserProps);
