"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";
import useCartStore from "./store/cart-store";

const ViewReceiptModal = dynamic(() => import("./view-receipt-modal"), {
  ssr: false,
});
const OrderPlacedModal = dynamic(() => import("./order-placed-modal"), {
  ssr: false,
});

const CartModal = dynamic(() => import("../components/cart-modal"), {
  ssr: false,
});

const RootLayoutWrapper = ({ children }: { children: ReactNode }) => {
  const {
    isCartModalOpen,
    isOrderPlacedModalOpen,
    subtotal,
    deliveryFee,
    cartItems,

    isViewReceiptModalOpen,
  } = useCartStore();

  const total =
    subtotal(Object.values(cartItems)) +
    deliveryFee;
  return (
    <main className="w-full">
      {children}
      {isCartModalOpen && <CartModal />}

      {isOrderPlacedModalOpen && <OrderPlacedModal />}
      {isViewReceiptModalOpen && <ViewReceiptModal total={total} />}
    </main>
  );
};

export default RootLayoutWrapper;
