import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(64, { message: 'Password must be at most 64 characters' }),
});

export const signupSchema = z
  .object({
    email: z.string().email(),
    firstName: z
      .string()
      .min(2, { message: 'Must be at least 2 characters' })
      .max(20, { message: 'Must be at most 20 characters' }),
    lastName: z
      .string()
      .min(2, { message: 'Must be at least 2 characters' })
      .max(20, { message: 'Must be at most 20 characters' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .max(64, { message: 'Password must be at most 64 characters' }),
    confirmedPassword: z
      .string()
      .min(8, { message: 'Confirmed password must be at least 8 characters' }),
  })
  .refine(({ confirmedPassword, password }) => confirmedPassword === password, {
    message: 'Paswords are not matched',
    path: ['confirmedPassword'],
  });
