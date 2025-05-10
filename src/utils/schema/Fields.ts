import { z } from 'zod';

export const nameField = z.string().min(2, 'Name is too short');
export const emailField = z.string().email('Invalid email');
export const passwordField = z.string().min(6, 'Password must be at least 6 characters');
export const phoneField = z
  .string()
  .min(8, 'Phone must be at least 10 digits')
  .regex(/^[0-9]+$/, 'Phone must contain only numbers');
