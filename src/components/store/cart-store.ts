// // import { create } from "zustand";

// // export type CartItem = {
// //   id: string;
// //   quantity: number;
// //   description: string;
// //   title: string;
// //   price: number;
// //   imgSrc: string;
// //   altText: string;
// // };

// // export type CartState = {
// //   cartItems: Record<string, CartItem>;
// //   addToCart: (item: CartItem) => void;
// //   updateQuantity: (id: string, quantity: number) => void;
// //   removeItem: (id: string) => void;
// //   clearCart: () => void;
// //   isCartModalOpen: boolean;
// //   setCartModalOpen: (isOpen: boolean) => void;
// //   isOrderPlacedModalOpen: boolean;
// //   setOrderPlacedModalOpen: (isOpen: boolean) => void;
// //   isContactVendorModalOpen: boolean;
// //   setContactVendorModalOpen: (isOpen: boolean) => void;
// //   isViewReceiptModalOpen: boolean;
// //   setViewReceiptModalOpen: (isOpen: boolean) => void;
// //   total: (subTotal: number, deliveryFee: number) => number;
// //   subtotal: (currentCartItems: CartItem[]) => number;
// //   deliveryFee: number;
// // };

// // // eslint-disable-next-line @typescript-eslint/no-unused-vars
// // const useCartStore = create<CartState>((set, get) => ({
// //   cartItems:
// //     typeof window !== "undefined"
// //       ? JSON.parse(localStorage.getItem("cartItems") || "{}")
// //       : {},
// //   addToCart: (item) => {
// //     set((state) => {
// //       let newCartItems;
// //       if (item.quantity > 0) {
// //         newCartItems = { ...state.cartItems, [item.id]: item };
// //       } else {
// //         newCartItems = { ...state.cartItems };
// //         delete newCartItems[item.id];
// //       }
// //       localStorage.setItem("cartItems", JSON.stringify(newCartItems));
// //       return { cartItems: newCartItems };
// //     });
// //   },
// //   updateQuantity: (id, quantity) => {
// //     set((state) => {
// //       if (quantity < 1) return state;
// //       const newCartItems = {
// //         ...state.cartItems,
// //         [id]: { ...state.cartItems[id], quantity },
// //       };
// //       localStorage.setItem("cartItems", JSON.stringify(newCartItems));
// //       return { cartItems: newCartItems };
// //     });
// //   },
// //   removeItem: (id) => {
// //     set((state) => {
// //       const newCartItems = { ...state.cartItems };
// //       delete newCartItems[id];
// //       localStorage.setItem("cartItems", JSON.stringify(newCartItems));
// //       return { cartItems: newCartItems };
// //     });
// //   },
// //   clearCart: () => {
// //     set({ cartItems: {} });
// //     localStorage.removeItem("cartItems");
// //   },
// //   isCartModalOpen: false,
// //   setCartModalOpen: (isOpen) => set({ isCartModalOpen: isOpen }),
// //   isOrderPlacedModalOpen: false,
// //   setOrderPlacedModalOpen: (isOpen) => set({ isOrderPlacedModalOpen: isOpen }),
// //   isContactVendorModalOpen: false,
// //   setContactVendorModalOpen: (isOpen) =>
// //     set({ isContactVendorModalOpen: isOpen }),
// //   isViewReceiptModalOpen: false,
// //   setViewReceiptModalOpen: (isOpen) => set({ isViewReceiptModalOpen: isOpen }),
// //   subtotal: (currentCartItems: CartItem[]): number => {
// //     return currentCartItems.reduce(
// //       (acc, item) => acc + item.price * item.quantity,
// //       0
// //     );
// //   },
// //   total: (subTotal: number, deliveryFee: number) => {
// //     return subTotal + deliveryFee;
// //   },
// //   deliveryFee: 5,
// // }));

// // export default useCartStore;

// 'use client';

// import { create } from 'zustand';
// import { useQueryClient } from '@tanstack/react-query';
// import { cartItemSchema } from '../../lib/zod-schemas';
// import { CartItem } from '@/utils/types';
// import validateCartItems from '@/utils/validate-cart-items';

// export type CartState = {
//   cartItems: Record<string, CartItem>;
//   addToCart: (item: CartItem) => void;
//   updateQuantity: (id: string, quantity: number) => void;
//   removeItem: (id: string) => void;
//   clearCart: () => void;
//   resetCartAfterPayment: () => void;
//   discountCode: string | null;
//   discountAmount: number;
//   applyDiscount: (code: string) => void;
//   isCartModalOpen: boolean;
//   setCartModalOpen: (isOpen: boolean) => void;
//   isOrderPlacedModalOpen: boolean;
//   setOrderPlacedModalOpen: (isOpen: boolean) => void;
//   isContactVendorModalOpen: boolean;
//   setContactVendorModalOpen: (isOpen: boolean) => void;
//   isViewReceiptModalOpen: boolean;
//   setViewReceiptModalOpen: (isOpen: boolean) => void;
//   subtotal: (currentCartItems: CartItem[]) => number;
//   total: (subTotal: number, deliveryFee: number) => number;
//   deliveryFee: number;
// };

// const useCartStore = create<CartState>((set, get) => {
//   const queryClient = typeof window !== 'undefined' ? useQueryClient() : undefined;

//   // Initialize cartItems from localStorage with validation
//   let initialCartItems: Record<string, CartItem> = {};
//   if (typeof window !== 'undefined') {
//     try {
//       const storedItems = JSON.parse(localStorage.getItem('cartItems') || '{}');
//       initialCartItems = validateCartItems(storedItems);
//     } catch (error) {
//       console.error('Failed to parse cartItems from localStorage:', error);
//       localStorage.removeItem('cartItems');
//     }
//   }

//   return {
//     cartItems: initialCartItems,
//     addToCart: (item) => {
//       // Validate item
//       const validatedItem = cartItemSchema.parse(item);
//       set((state) => {
//         let newCartItems;
//         if (validatedItem.quantity > 0) {
//           newCartItems = { ...state.cartItems, [validatedItem.id]: validatedItem };
//         } else {
//           newCartItems = { ...state.cartItems };
//           delete newCartItems[validatedItem.id];
//         }
//         localStorage.setItem('cartItems', JSON.stringify(newCartItems));
//         queryClient?.setQueryData(['cartItems'], newCartItems);
//         queryClient?.invalidateQueries({ queryKey: ['cartItems'] });
//         return { cartItems: newCartItems };
//       });
//     },
//     updateQuantity: (id, quantity) => {
//       set((state) => {
//         if (quantity < 1 || !state.cartItems[id]) return state;
//         const newCartItems = {
//           ...state.cartItems,
//           [id]: { ...state.cartItems[id], quantity },
//         };
//         localStorage.setItem('cartItems', JSON.stringify(newCartItems));
//         queryClient?.setQueryData(['cartItems'], newCartItems);
//         queryClient?.invalidateQueries({ queryKey: ['cartItems'] });
//         return { cartItems: newCartItems };
//       });
//     },
//     removeItem: (id) => {
//       set((state) => {
//         const newCartItems = { ...state.cartItems };
//         delete newCartItems[id];
//         localStorage.setItem('cartItems', JSON.stringify(newCartItems));
//         queryClient?.setQueryData(['cartItems'], newCartItems);
//         queryClient?.invalidateQueries({ queryKey: ['cartItems'] });
//         return { cartItems: newCartItems };
//       });
//     },
//     clearCart: () => {
//       set({ cartItems: {}, discountCode: null, discountAmount: 0 });
//       localStorage.removeItem('cartItems');
//       queryClient?.setQueryData(['cartItems'], {});
//       queryClient?.invalidateQueries({ queryKey: ['cartItems'] });
//     },
//     resetCartAfterPayment: () => {
//       set({ cartItems: {}, discountCode: null, discountAmount: 0, isOrderPlacedModalOpen: false });
//       localStorage.removeItem('cartItems');
//       queryClient?.setQueryData(['cartItems'], {});
//       queryClient?.invalidateQueries({ queryKey: ['cartItems'] });
//     },
//     discountCode: null,
//     discountAmount: 0,
//     applyDiscount: (code) => {
//       const discountCodes: Record<string, number> = {
//         SAVE10: 10,
//         SAVE20: 20,
//         PERCENT10: 0.1,
//       };
//       const discount = discountCodes[code];
//       if (discount) {
//         const subTotal = get().subtotal(Object.values(get().cartItems));
//         const discountAmount = typeof discount === 'number' && discount < 1 ? subTotal * discount : discount;
//         set({ discountCode: code, discountAmount });
//       } else {
//         set({ discountCode: null, discountAmount: 0 });
//       }
//     },
//     isCartModalOpen: false,
//     setCartModalOpen: (isOpen) => set({ isCartModalOpen: isOpen }),
//     isOrderPlacedModalOpen: false,
//     setOrderPlacedModalOpen: (isOpen) => set({ isOrderPlacedModalOpen: isOpen }),
//     isContactVendorModalOpen: false,
//     setContactVendorModalOpen: (isOpen) => set({ isContactVendorModalOpen: isOpen }),
//     isViewReceiptModalOpen: false,
//     setViewReceiptModalOpen: (isOpen) => set({ isViewReceiptModalOpen: isOpen }),
//     subtotal: (currentCartItems: CartItem[]): number => {
//       return currentCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
//     },
//     total: (subTotal: number, deliveryFee: number) => {
//       const { discountAmount } = get();
//       return Math.max(0, subTotal + deliveryFee - discountAmount);
//     },
//     deliveryFee: 5,
//   };
// });

// export default useCartStore;

"use client";

import { create } from "zustand";
import { QueryClient } from "@tanstack/react-query";
import { CartItem } from "@/utils/types";
import validateCartItems from "@/utils/validate-cart-items";
import { cartItemSchema } from "@/lib/zod-schemas";

export type CartState = {
  cartItems: Record<string, CartItem>;
  addToCart: (item: CartItem, queryClient?: QueryClient) => void;
  updateQuantity: (
    id: string,
    quantity: number,
    queryClient?: QueryClient
  ) => void;
  removeItem: (id: string, queryClient?: QueryClient) => void;
  clearCart: (queryClient?: QueryClient) => void;
  resetCartAfterPayment: (queryClient?: QueryClient) => void;
  discountCode: string | null;
  discountAmount: number;
  applyDiscount: (code: string) => void;
  isCartModalOpen: boolean;
  setCartModalOpen: (isOpen: boolean) => void;
  isOrderPlacedModalOpen: boolean;
  setOrderPlacedModalOpen: (isOpen: boolean) => void;
  isContactVendorModalOpen: boolean;
  setContactVendorModalOpen: (isOpen: boolean) => void;
  isViewReceiptModalOpen: boolean;
  setViewReceiptModalOpen: (isOpen: boolean) => void;
  subtotal: (currentCartItems: CartItem[]) => number;
  total: (subTotal: number, deliveryFee: number) => number;
  deliveryFee: number;
  showUtilityCardModal: boolean;
  setShowUtilityCardModal: (state: boolean) => void;
  utilityHoverCardProps: { headerText: string; bodyText: string };
  setUtilityHoverCardProps: (headerText: string, bodyText: string) => void;
};

const useCartStore = create<CartState>((set, get) => {
  // Initialize cartItems from localStorage with validation
  let initialCartItems: Record<string, CartItem> = {};
  if (typeof window !== "undefined") {
    try {
      const storedItems = JSON.parse(localStorage.getItem("cartItems") || "{}");
      initialCartItems = validateCartItems(storedItems);
    } catch (error) {
      console.error("Failed to parse cartItems from localStorage:", error);
      localStorage.removeItem("cartItems");
    }
  }

  return {
    cartItems: initialCartItems,
    addToCart: (item, queryClient) => {
      // Validate item
      const validatedItem = cartItemSchema.parse(item);
      set((state) => {
        let newCartItems;
        if (validatedItem.quantity > 0) {
          newCartItems = {
            ...state.cartItems,
            [validatedItem.id]: validatedItem,
          };
        } else {
          newCartItems = { ...state.cartItems };
          delete newCartItems[validatedItem.id];
        }
        localStorage.setItem("cartItems", JSON.stringify(newCartItems));
        if (queryClient) {
          queryClient.setQueryData(["cartItems"], newCartItems);
          queryClient.invalidateQueries({ queryKey: ["cartItems"] });
        }
        return { cartItems: newCartItems };
      });
    },
    updateQuantity: (id, quantity, queryClient) => {
      set((state) => {
        if (quantity < 1 || !state.cartItems[id]) return state;
        const newCartItems = {
          ...state.cartItems,
          [id]: { ...state.cartItems[id], quantity },
        };
        localStorage.setItem("cartItems", JSON.stringify(newCartItems));
        if (queryClient) {
          queryClient.setQueryData(["cartItems"], newCartItems);
          queryClient.invalidateQueries({ queryKey: ["cartItems"] });
        }
        return { cartItems: newCartItems };
      });
    },
    removeItem: (id, queryClient) => {
      set((state) => {
        const newCartItems = { ...state.cartItems };
        delete newCartItems[id];
        localStorage.setItem("cartItems", JSON.stringify(newCartItems));
        if (queryClient) {
          queryClient.setQueryData(["cartItems"], newCartItems);
          queryClient.invalidateQueries({ queryKey: ["cartItems"] });
        }
        return { cartItems: newCartItems };
      });
    },
    clearCart: (queryClient) => {
      set({ cartItems: {}, discountCode: null, discountAmount: 0 });
      localStorage.removeItem("cartItems");
      if (queryClient) {
        queryClient.setQueryData(["cartItems"], {});
        queryClient.invalidateQueries({ queryKey: ["cartItems"] });
      }
    },
    resetCartAfterPayment: (queryClient) => {
      set({
        cartItems: {},
        discountCode: null,
        discountAmount: 0,
        isOrderPlacedModalOpen: false,
      });
      localStorage.removeItem("cartItems");
      if (queryClient) {
        queryClient.setQueryData(["cartItems"], {});
        queryClient.invalidateQueries({ queryKey: ["cartItems"] });
      }
    },
    discountCode: null,
    discountAmount: 0,
    applyDiscount: (code) => {
      const discountCodes: Record<string, number> = {
        SAVE10: 10,
        SAVE20: 20,
        PERCENT10: 0.1,
      };
      const discount = discountCodes[code];
      if (discount) {
        const subTotal = get().subtotal(Object.values(get().cartItems));
        const discountAmount =
          typeof discount === "number" && discount < 1
            ? subTotal * discount
            : discount;
        set({ discountCode: code, discountAmount });
      } else {
        set({ discountCode: null, discountAmount: 0 });
      }
    },
    isCartModalOpen: false,
    setCartModalOpen: (isOpen) => set({ isCartModalOpen: isOpen }),
    isOrderPlacedModalOpen: false,
    setOrderPlacedModalOpen: (isOpen) =>
      set({ isOrderPlacedModalOpen: isOpen }),
    isContactVendorModalOpen: false,
    setContactVendorModalOpen: (isOpen) =>
      set({ isContactVendorModalOpen: isOpen }),
    isViewReceiptModalOpen: false,
    setViewReceiptModalOpen: (isOpen) =>
      set({ isViewReceiptModalOpen: isOpen }),
    subtotal: (currentCartItems: CartItem[]): number => {
      return currentCartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    },
    total: (subTotal: number, deliveryFee: number) => {
      const { discountAmount } = get();
      return Math.max(0, subTotal + deliveryFee - discountAmount);
    },
    deliveryFee: 5,
    utilityHoverCardProps: { headerText: "", bodyText: "" },
    setUtilityHoverCardProps: (headerText, bodyText) => {
      set({ utilityHoverCardProps: { headerText, bodyText } });
    },
    showUtilityCardModal: false,
    setShowUtilityCardModal: (showUtilityCardModal) => {
      set({ showUtilityCardModal });
    },
  };
});

export default useCartStore;
