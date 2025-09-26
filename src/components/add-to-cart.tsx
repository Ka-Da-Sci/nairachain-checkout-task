import { motion } from "motion/react";
import { ComponentType, ReactNode } from "react";

const AddToCart = ({product, CloseBtn}: {product: {id: string;}, CloseBtn?: ComponentType | ReactNode}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, display: "none" },
        visible: {
          opacity: 1,
          display: "flex",
          transition: { duration: 1.5 },
        },
      }}
      initial="hidden"
      exit="hidden"
      animate="visible"
      className="add-to-cart-container rounded-xl absolute w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.5)]"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center flex-col justify-center sm:justify-normal gap-4">
        <div className="quantity-selector flex items-center p-2 rounded bg-[#E9E9E9] text-[#000000]">
          <button
            id={`${product.id}_minus`}
            onClick={(event) => event.stopPropagation()}
            className="decrease bg-gray-200 text-gray-700 font-bold px-4 whitespace-nowrap uppercase font-['Montserrat'] text-sm sm:text-xl"
          >
            -
          </button>
          <input
            type="text"
            id={`${product.id}_quantity`}
            min="1"
            step="1"
            className="w-12 outline-none text-center bg-transparent whitespace-nowrap uppercase font-semibold font-['Montserrat'] text-xs sm:text-sm"
            onClick={(event) => event.stopPropagation()}
          />
          <button
            id={`${product.id}_plus`}
            onClick={(event) => event.stopPropagation()}
            className="increase bg-gray-200 text-gray-700 font-bold px-4 whitespace-nowrap uppercase font-['Montserrat'] text-sm sm:text-xl"
          >
            +
          </button>
        </div>
        <button
          onClick={(event) => event.stopPropagation()}
          className="add-to-cart bg-orange-500 text-white whitespace-nowrap uppercase font-semibold font-['Montserrat'] text-xs sm:text-sm p-2 pt-[10px] pb-[10px] rounded"
        >
          ADD TO CART
        </button>
      </div>

      {CloseBtn && typeof CloseBtn === "function" ? <CloseBtn /> : CloseBtn}
    </motion.div>
  );
};

export default AddToCart;
