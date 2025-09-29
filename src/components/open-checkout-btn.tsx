import useCartStore from "./store/cart-store";
import { motion } from "motion/react";

const OpenCartCheckout = ({handleCloseAddToCart}: {handleCloseAddToCart?: () => void}) => {
  const { setCartModalOpen } = useCartStore();
  return (
    <motion.button
      onClick={() => {setCartModalOpen(true);
        if (handleCloseAddToCart && typeof handleCloseAddToCart === "function") handleCloseAddToCart();
      }}
      className="w-full p-2.5 flex items-center justify-center gap-2 font-poppins text-sm md:text-base rounded bg-[#408bfc] text-white hover:scale-105 border border-solid border-[#408bfc] cursor-pointer transition-all duration-300 ease-in-out"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
      >
        <path
          fill="currentColor"
          d="M2.75 14A1.75 1.75 0 0 1 1 12.25v-2.5a.75.75 0 0 1 1.5 0v2.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25v-2.5a.75.75 0 0 1 1.5 0v2.5A1.75 1.75 0 0 1 13.25 14Z"
        />
        <path
          fill="currentColor"
          d="M7.25 7.689V2a.75.75 0 0 1 1.5 0v5.689l1.97-1.969a.749.749 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 6.78a.749.749 0 1 1 1.06-1.06z"
        />
      </svg>
      <motion.span className="inline-block font-poppins antialiased capitalize"><span>checkout</span></motion.span>
    </motion.button>
  );
};

export default OpenCartCheckout;
