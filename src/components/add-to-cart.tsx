"use client";

import { motion } from "motion/react";
import { ComponentType, ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useCartStore from "./store/cart-store";
import { Plus, Minus } from "lucide-react";
import { AddToCartFormData, CartItem } from "@/utils/types";
import { addToCartApi } from "@/services/api";
import { addToCartSchema } from "@/lib/zod-schemas";
import OpenCartCheckout from "./open-checkout-btn";

// Component to handle adding a product to the cart with quantity input
const AddToCart = ({
  product,
  CloseBtn,
  positioning,
  handleToggleOpenAddToCart,
}: {
  product: CartItem; // Product to be added to the cart
  handleToggleOpenAddToCart?: (state: boolean) => void; // Optional callback to toggle add-to-cart visibility
  CloseBtn?: ComponentType | ReactNode; // Optional close button component or node
  positioning?: string;
}) => {
  const { addToCart, cartItems } = useCartStore();
  const queryClient = useQueryClient();
  const [isShowOpenCartCheckoutBtn, setShowOpenCartCheckoutBtn] =
    useState(false);

  // Initialize form with validation schema and default quantity
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<AddToCartFormData>({
    resolver: zodResolver(addToCartSchema),
    defaultValues: { quantity: 0 },
  });

  // Watch quantity field for real-time updates
  const quantity = watch("quantity");

  // Update form quantity when it changes
  useEffect(() => {
    setValue("quantity", quantity);
  }, [quantity, setValue]);

  // Mutation to handle adding item to cart via API
  const mutation = useMutation({
    mutationFn: (item: CartItem) => addToCartApi(item),

    // Optimistically update cart before API response
    onMutate: async (item) => {
      await queryClient.cancelQueries({ queryKey: ["cartItems"] });
      const previousCartItems =
        queryClient.getQueryData(["cartItems"]) || cartItems;
      const newCartItems = {
        ...previousCartItems,
        [item.id]: { ...item, quantity: item.quantity },
      };
      queryClient.setQueryData(["cartItems"], newCartItems);
      addToCart(item, queryClient); // Pass queryClient to store action
      return { previousCartItems };
    },

    // Handle successful mutation
    onSuccess: () => {
      setValue("quantity", 0);

      setShowOpenCartCheckoutBtn(true);
    },

    // Handle mutation error by reverting to previous cart state
    onError: (err, item, context) => {
      queryClient.setQueryData(["cartItems"], context?.previousCartItems);
      alert("Failed to add item to cart");
    },

    // Invalidate cart cache after mutation settles
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
      // if (handleToggleOpenAddToCart) handleToggleOpenAddToCart(false);
    },
  });

  // Handle form submission to add item to cart
  const onSubmit = (data: AddToCartFormData) => {
    mutation.mutate({ ...product, quantity: data.quantity });
  };

  // Close add-to-cart popup
  const handleCloseAddToCart = () => {
    if (handleToggleOpenAddToCart) handleToggleOpenAddToCart(false);
  };

  return (
    // Animated container for add-to-cart form
    <motion.div
      variants={{
        hidden: { opacity: 0, display: "none" },
        visible: {
          opacity: 1,
          display: "flex",
          transition: { duration: 0.5 },
        },
      }}
      initial="hidden"
      exit="hidden"
      animate="visible"
      className={`${
        positioning ? `${positioning} top-0 left-0 bg-[rgba(0,0,0,0.5)]` : ""
      } rounded-xl w-full h-full`}
      onClick={(event) => event.stopPropagation()}
    >
      <motion.div
        className={`${
          positioning
            ? `${positioning} z-30 bottom-4 left-1/2 -translate-x-1/2`
            : ""
        } flex items-center flex-col justify-center sm:justify-normal gap-4`}
      >
        {isShowOpenCartCheckoutBtn && (
          <OpenCartCheckout handleCloseAddToCart={handleCloseAddToCart} />
        )}

        {/* Form for quantity input and submission */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative flex items-center p-2 rounded bg-[#E9E9E9] text-[#000000]"
        >
          <button
            id={`${product.id}_minus`}
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setValue("quantity", Math.max(0, quantity - 1));
            }}
            className="group pointer-events-auto cursor-pointer bg-gray-200 text-gray-700 font-bold px-4 whitespace-nowrap uppercase font-['Montserrat'] text-sm sm:text-xl"
          >
            <Minus className="group-hover:scale-125 transition-all duration-500 h-4 w-4 text-black" />
          </button>
          <input
            type="number"
            id={`${product.id}_quantity`}
            min="0"
            step="1"
            className="w-20 p-1 rounded-sm bg-white outline-none text-center whitespace-nowrap uppercase font-semibold font-['Montserrat'] text-xs sm:text-sm"
            {...register("quantity", { valueAsNumber: true })}
            onClick={(event) => event.preventDefault()}
          />
          {errors.quantity && (
            <p className="w-full absolute -left-1/2 translate-x-1/2 -top-6 text-center text-white font-montserrat text-xs">
              {errors.quantity.message}
            </p>
          )}
          <button
            id={`${product.id}_plus`}
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setValue("quantity", quantity + 1);
            }}
            className="group pointer-events-auto cursor-pointer bg-gray-200 text-gray-700 font-bold px-4 whitespace-nowrap uppercase font-['Montserrat'] text-sm sm:text-xl"
          >
            <Plus className="group-hover:scale-125 transition-all duration-500 h-4 w-4 text-black" />
          </button>
        </form>

        {/* Animated add-to-cart button with color transition */}
        <motion.button
          variants={{
            hidden: { backgroundColor: "#7A5CFF", scale: 1 },
            tap: { scale: 1.2, transition: { duration: 1 } },
            visible: {
              backgroundColor: [
                "#7A5CFF",
                "#7A5CFF",
                "#9C85FF",
                "#7A5CFF",
                "#9C85FF",
                "#4525C7",
                "#9C85FF",
                "#7A5CFF",
                "#7A5CFF",
                "#7A5CFF",
              ],
              color: [
                "#FFFFFF",
                "#FFFFFF",
                "#F8F9FA",
                "#FAFAFF",
                "#F2F2FF",
                "#BFBFBF",
                "#F2F2FF",
                "#FAFAFF",
                "#FFFFFF",
                "#FFFFFF",
              ],
              transition: {
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
              },
            },
          }}
          initial="hidden"
          animate="visible"
          whileTap="tap"
          onClick={(event) => {
            event.stopPropagation();
            handleSubmit(onSubmit)();
          }}
          className="add-to-cart pointer-events-auto cursor-pointer bg-[#408bfc] text-white whitespace-nowrap uppercase font-semibold font-['Montserrat'] text-xs sm:text-sm p-2 pt-[10px] pb-[10px] rounded"
        >
          <motion.p className="inline-block">ADD TO CART</motion.p>
        </motion.button>
      </motion.div>

      {/* Render close button if provided */}
      {CloseBtn && typeof CloseBtn === "function" ? <CloseBtn /> : CloseBtn}
    </motion.div>
  );
};

export default AddToCart;
