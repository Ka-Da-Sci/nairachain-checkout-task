import { z } from 'zod';

export const productSchema = z.object({
  id: z.string().min(1, 'Product ID is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  price: z.number().positive('Price must be positive').min(0.01, 'Price must be at least 0.01'),
  imgSrc: z.any(),
  altText: z.string().min(1, 'Alt text is required'),
  quantity: z.number().int().min(0, 'Quantity must be non-negative'),
});

export const cartItemSchema = z.object({
  id: z.string().min(1, 'Product ID is required'),
  quantity: z.number().int().min(0, 'Quantity must be non-negative'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  price: z.number().positive('Price must be positive').min(0.01, 'Price must be at least 0.01'),
  imgSrc: z.any(),
  altText: z.string().min(1, 'Alt text is required'),
});

export const checkoutFormSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name is too long"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name is too long"),
  email: z.email("Invalid email address"),
  address: z
    .string()
    .min(10, "Address must be at least 10 characters")
    .max(200, "Address is too long"),
  amount: z
    .number()
    .positive("Amount must be positive")
    .min(0.01, "Amount must be at least 0.01"),
  currency: z.enum(["USDT", "BNB"], {
    message: "Please select a currency (USDT or BNB)"
  }),
});

export const addToCartSchema = z.object({
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
});
