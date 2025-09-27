import { addToCartSchema, checkoutFormSchema } from "@/lib/zod-schemas";
import z from "zod";

export type CartItem = {
  id: string;
  quantity: number;
  description: string;
  title: string;
  price: number;
  imgSrc: string | { src: string };
  altText: string;
};

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;

export type PaymentResponse = {
  status: 'pending' | 'success' | 'failed';
  transactionId: string;
  qrCodeData: string;
  amount: number;
  currency: 'USDT' | 'BNB';
}

export type AddToCartFormData = z.infer<typeof addToCartSchema>;

