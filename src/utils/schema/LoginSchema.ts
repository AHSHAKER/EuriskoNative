import { z } from 'zod';
import { emailField, passwordField } from './Fields';

export const LoginSchema = z.object({
  email: emailField,
  password: passwordField,
});

export type LoginData = z.infer<typeof LoginSchema>;
