import { mockProducts } from "./mockdb";
import { CartItem, PaymentResponse } from "@/utils/types";


// Mock API function for fetching products
export const fetchProducts = async (): Promise<CartItem[]> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
    return mockProducts;
  } catch (error) {
    console.error("fetchProducts: Error fetching products", error);
    throw new Error("Failed to fetch products");
  }
};


// Mock API function for processing payment
export const processPayment = async ({
  amount,
  currency,
}: {
  amount: number;
  currency: "USDT" | "BNB";
}): Promise<PaymentResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate API delay
  const walletAddresses = {
    USDT: "0x1234567890abcdef1234567890abcdef12345678",
    BNB: "bnb1xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  };

  return {
    status: "success",
    transactionId: `TX-${Math.random().toString(36).substr(2, 9)}`,
    qrCodeData: `crypto:${walletAddresses[currency]}?amount=${amount}`,
    amount,
    currency,
  };
};

// Mock API function for adding to cart
export const addToCartApi = async (item: CartItem): Promise<CartItem> => {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay
  return item;
};
