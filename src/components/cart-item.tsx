"use client";

import { X, Plus, Minus } from "lucide-react";
import ImageWrapper from "./image-wrapper";
import useCartStore from "./store/cart-store";
import { CartItem as CartItemType } from "@/utils/types";

// Props type for the CartItem component
type CartItemProps = {
  item: CartItemType;
};

// Component to render a single item in the cart
const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    // List item for cart product with animated transitions
    <li className="item w-full flex items-center md:justify-normal justify-between gap-4 pb-1 transition-all duration-300 ease-in-out">
      <button
        onClick={() => removeItem(item.id)}
        className="p-1 aspect-square cursor-pointer group bg-[#fd7171] rounded-full"
      >
        <X className="group-hover:scale-125 transition-all duration-500 h-3 w-3 text-white" />
      </button>
      <div className="item-image w-full h-full max-w-8 max-h-8 flex-[0_0_2rem] flex justify-center">
        <ImageWrapper
          className="product-image w-full h-full"
          sourceUrl={
            typeof item.imgSrc === "string" ? item.imgSrc : item.imgSrc.src
          }
          alternativeText={item.title}
        />
      </div>
      <div className="product-name text-left min-w-28 w-28 flex flex-col gap-2">
        <h2 className="name antialiased font-medium font-poppins w-full whitespace-nowrap overflow-hidden text-ellipsis text-sm 2xl:text-base text-black">
          {item.title}
        </h2>
      </div>

      {/* Quantity selector with increment and decrement buttons */}
      <div className="quantity-selector flex flex-[0_0_120px] py-0 px-1 text-center justify-between rounded-2xl">
        <button
          className="decrement bg-[#888]/80 border-none cursor-pointer aspect-square rounded-full flex items-center justify-center"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
        >
          <Minus className="group-hover:scale-125 transition-all duration-500 h-4 w-4 text-white p-0.5 font-poppins font-bold" />
        </button>
        <input
          className="appearance-none antialiased border-none outline-none text-center w-full max-w-20 text-xs"
          type="number"
          value={item.quantity}
          min="0"
          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
        />
        <button
          className="increment bg-[#888]/80 border-none cursor-pointer aspect-square rounded-full flex items-center justify-center"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          <Plus className="group-hover:scale-125 transition-all duration-500 h-4 w-4 text-white p-0.5 font-poppins font-bold" />
        </button>
      </div>

      {/* Price display for item */}
      <div className="each-item-price w-28 flex justify-start text-xs font-poppins font-medium">
        <p className="unit-price antialiased hidden">${item.price}</p>
        <p>${(item.quantity * item.price).toFixed(2)}</p>
      </div>
    </li>
  );
};

export default CartItem;
