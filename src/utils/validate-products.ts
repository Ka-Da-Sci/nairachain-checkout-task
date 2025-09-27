import { productSchema } from "@/lib/zod-schemas";
import { CartItem } from "./types";

// Validate mock products
const validateProducts = (products: CartItem[]) => {
  return products.map((product) => productSchema.parse(product));
};

export default validateProducts;
