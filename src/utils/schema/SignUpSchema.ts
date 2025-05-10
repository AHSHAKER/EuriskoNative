import { z } from 'zod';
import { nameField, emailField, passwordField, phoneField } from './Fields';

export const SignUpSchema = z.object({
  name: nameField,
  email: emailField,
  password: passwordField,
  phone: phoneField,
});

export type SignUpData = z.infer<typeof SignUpSchema>;
