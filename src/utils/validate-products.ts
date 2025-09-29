import { productSchema } from "@/lib/zod-schemas";
import { CartItem } from "./types";

// Validate mock products helper function
const validateProducts = (products: CartItem[]) => {
  return products.map((product) => productSchema.parse(product));
};

export default validateProducts;
