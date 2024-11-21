import { z } from 'zod';
import { createUserSchema } from './user.validations';

export const loginSchema = z.object({
  body: createUserSchema.shape.body.pick({ email: true, password: true }),
});

export type LoginData = z.infer<typeof loginSchema.shape.body>;
