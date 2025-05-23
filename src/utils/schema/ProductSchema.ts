import { z } from 'zod';

export const ProductSchema = z.object({
  name: z.string().min(3, 'Product name is too short'),
  description: z.string().min(10, 'Description is too short'),
  price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, 'Invalid price format')
    .transform((val) => parseFloat(val)),
  images: z.array(z.string().url()).min(1, 'At least one image is required'),
});

export type ProductFormData = z.infer<typeof ProductSchema>;
