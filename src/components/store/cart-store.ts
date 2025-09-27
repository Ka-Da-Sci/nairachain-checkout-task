import { create } from "zustand";

export type CartItem = {
  id: string;
  quantity: number;
  description: string;
  title: string;
  price: number;
  imgSrc: string;
  altText: string;
};

export type CartState = {
  cartItems: Record<string, CartItem>;
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  isCartModalOpen: boolean;
  setCartModalOpen: (isOpen: boolean) => void;
  isOrderPlacedModalOpen: boolean;
  setOrderPlacedModalOpen: (isOpen: boolean) => void;
  isContactVendorModalOpen: boolean;
  setContactVendorModalOpen: (isOpen: boolean) => void;
  isViewReceiptModalOpen: boolean;
  setViewReceiptModalOpen: (isOpen: boolean) => void;
  total: (subTotal: number, deliveryFee: number) => number;
  subtotal: (currentCartItems: CartItem[]) => number;
  deliveryFee: number;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useCartStore = create<CartState>((set, get) => ({
  cartItems:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cartItems") || "{}")
      : {},
  addToCart: (item) => {
    set((state) => {
      let newCartItems;
      if (item.quantity > 0) {
        newCartItems = { ...state.cartItems, [item.id]: item };
      } else {
        newCartItems = { ...state.cartItems };
        delete newCartItems[item.id];
      }
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
      return { cartItems: newCartItems };
    });
  },
  updateQuantity: (id, quantity) => {
    set((state) => {
      if (quantity < 1) return state;
      const newCartItems = {
        ...state.cartItems,
        [id]: { ...state.cartItems[id], quantity },
      };
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
      return { cartItems: newCartItems };
    });
  },
  removeItem: (id) => {
    set((state) => {
      const newCartItems = { ...state.cartItems };
      delete newCartItems[id];
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
      return { cartItems: newCartItems };
    });
  },
  clearCart: () => {
    set({ cartItems: {} });
    localStorage.removeItem("cartItems");
  },
  isCartModalOpen: false,
  setCartModalOpen: (isOpen) => set({ isCartModalOpen: isOpen }),
  isOrderPlacedModalOpen: false,
  setOrderPlacedModalOpen: (isOpen) => set({ isOrderPlacedModalOpen: isOpen }),
  isContactVendorModalOpen: false,
  setContactVendorModalOpen: (isOpen) =>
    set({ isContactVendorModalOpen: isOpen }),
  isViewReceiptModalOpen: false,
  setViewReceiptModalOpen: (isOpen) => set({ isViewReceiptModalOpen: isOpen }),
  subtotal: (currentCartItems: CartItem[]): number => {
    return currentCartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  },
  total: (subTotal: number, deliveryFee: number) => {
    return subTotal + deliveryFee;
  },
  deliveryFee: 5,
}));

export default useCartStore;
