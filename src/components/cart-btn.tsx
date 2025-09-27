"use client";

import Image from "next/image";
import useCartStore from "./store/cart-store";
import { useEffect, useState } from "react";

const CartButton = () => {
  const { setCartModalOpen, cartItems } = useCartStore();
  const [cartNum, setCartNum] = useState(0);

  useEffect(() => {

    const cartQty = Object.keys(cartItems).length;
    setCartNum(cartQty);
  }, [cartItems])


  return (
    <div className="search-cart cursor-pointer pointer-events-auto flex gap-6 items-center">
      <button
        className="cart relative flex justify-center max-w-[100px] max-h-[100px] cursor-pointer pointer-events-auto"
        id="cart-trolley"
        onClick={() => setCartModalOpen(true)}
      >
        <div className="w-10 h-10 flex items-center justify-center cursor-pointer pointer-events-auto">
          <Image
            width={100}
            height={100}
            className="w-full h-full object-cover"
            src={"/images/cart-icon.svg"}
            alt="cart icon"
          />
        </div>
        <div className="counter hover:scale-110 absolute top-1/4 right-0 bg-[#408bfc] rounded-full w-max max-w-[22px] max-h-[22px] aspect-square flex items-center justify-center">
          <p
            id="num-of-items"
            className="rounded-full p-2 m-0 text-left text-[#FFFFFF] font-['poppins'] text-xs"
          >
            {cartNum}
          </p>
        </div>
      </button>
    </div>
  );
};

export default CartButton;
