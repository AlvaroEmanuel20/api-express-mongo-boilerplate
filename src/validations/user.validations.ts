import { z } from 'zod';
import validateObjectId from '../utils/validateObjectId';

export const createUserSchema = z.object({
  body: z.object(
    {
      name: z
        .string({ message: 'Name is required' })
        .min(2, 'Must be 2 or more characters'),
      email: z
        .string({ message: 'Email is required' })
        .email('Invalid email address'),
      password: z
        .string({ message: 'Password is required' })
        .min(8, 'Must be 8 or more characters'),
    },
    { message: 'Request body is required' }
  ),
});

export const updateUserSchema = z.object({
  body: createUserSchema.partial(),
});

export const userIdSchema = z.object({
  params: z.object(
    {
      userId: z
        .string({ message: 'userId is required' })
        .refine(validateObjectId, 'Invalid userId'),
    },
    { message: 'Request params is required' }
  ),
});

export type CreateUserData = z.infer<typeof createUserSchema.shape.body>;
export type UpdateUserData = Partial<CreateUserData>;
export type UserId = z.infer<typeof userIdSchema.shape.params>;
