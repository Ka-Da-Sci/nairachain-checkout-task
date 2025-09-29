import { cartItemSchema } from "@/lib/zod-schemas";
import { CartItem } from "./types";


// Validate mock cart items helper function
const validateCartItems = (items: Record<string, CartItem>) => {
  const validatedItems: Record<string, CartItem> = {};
  for (const [id, item] of Object.entries(items)) {
    validatedItems[id] = cartItemSchema.parse(item);
  }
  return validatedItems;
};

export default validateCartItems;
