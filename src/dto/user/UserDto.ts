/**
 * CreaetUserDto.ts
 */
import { checkSchema } from 'express-validator';

export interface IUserDto {
    id: string;
    password?: string;
    email: string;
}

export const CreateUserSchema = checkSchema({
    id: {
        in: ['body'],
        isString: {
            errorMessage: 'Username must be a string',
        },
        isLength: {
            options: { min: 6 },
            errorMessage: 'Username must be at least 6 characters long',
        },
    },
    password: {
        in: ['body'],
        isStrongPassword: {
            errorMessage:
                'Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.',
        },
    },
    email: {
        in: ['body'],
        isEmail: {
            errorMessage: 'Please provide a valid email address',
        },
    },
});
