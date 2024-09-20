/**
 * CreaetUserDto.ts
 */
import { z } from 'zod';

export const createUserSchema = z.object({
    body: z.object({
        name: z.string().min(6).max(20),
        password: z.string().regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/, {
            message:
                'Password must be at least 8 characters long and contain at least one letter, one number, and one special character.',
        }),
        email: z.string().email(),
    }),
});

export type CreateUserDto = z.infer<typeof createUserSchema>['body'];
