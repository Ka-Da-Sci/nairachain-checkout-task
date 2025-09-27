'use client';

import { motion } from 'motion/react';
import { ComponentType, ReactNode, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useCartStore from './store/cart-store';
import { Plus, Minus } from 'lucide-react';
import { AddToCartFormData, CartItem } from '@/utils/types';
import { addToCartApi } from '@/services/api';
import { addToCartSchema } from '@/lib/zod-schemas';

const AddToCart = ({
  product,
  CloseBtn,
  handleToggleOpenAddToCart,
  positioning,
}: {
  product: CartItem;
  handleToggleOpenAddToCart?: (state: boolean) => void;
  CloseBtn?: ComponentType | ReactNode;
  positioning?: string;
}) => {
  const { addToCart, cartItems } = useCartStore();
  const queryClient = useQueryClient();

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

  const quantity = watch('quantity');

  useEffect(() => {
    setValue('quantity', quantity);
  }, [quantity, setValue]);

  const mutation = useMutation({
    mutationFn: (item: CartItem) => addToCartApi(item),
    onMutate: async (item) => {
      await queryClient.cancelQueries({ queryKey: ['cartItems'] });
      const previousCartItems = queryClient.getQueryData(['cartItems']) || cartItems;
      const newCartItems = {
        ...previousCartItems,
        [item.id]: { ...item, quantity: item.quantity },
      };
      queryClient.setQueryData(['cartItems'], newCartItems);
      addToCart(item, queryClient); // Pass queryClient to store action
      return { previousCartItems };
    },
    onError: (err, item, context) => {
      queryClient.setQueryData(['cartItems'], context?.previousCartItems);
      alert('Failed to add item to cart');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cartItems'] });
      if (handleToggleOpenAddToCart) handleToggleOpenAddToCart(false);
    },
  });

  const onSubmit = (data: AddToCartFormData) => {
    mutation.mutate({ ...product, quantity: data.quantity });
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, display: 'none' },
        visible: {
          opacity: 1,
          display: 'flex',
          transition: { duration: 1.5 },
        },
      }}
      initial="hidden"
      exit="hidden"
      animate="visible"
      className={`${
        positioning ? `${positioning} top-0 left-0 bg-[rgba(0,0,0,0.5)]` : ''
      } rounded-xl w-full h-full`}
      onClick={(event) => event.stopPropagation()}
    >
      <motion.div
        className={`${
          positioning
            ? `${positioning} z-30 bottom-4 left-1/2 -translate-x-1/2`
            : ''
        } flex items-center flex-col justify-center sm:justify-normal gap-4`}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center p-2 rounded bg-[#E9E9E9] text-[#000000]">
          <button
            id={`${product.id}_minus`}
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setValue('quantity', Math.max(0, quantity - 1));
            }}
            className="group pointer-events-auto cursor-pointer bg-gray-200 text-gray-700 font-bold px-4 whitespace-nowrap uppercase font-['Montserrat'] text-sm sm:text-xl"
          >
            <Minus className="group-hover:scale-125 transition-all duration-500 h-4 w-4 text-black" />
          </button>
          <div>
            <input
              type="number"
              id={`${product.id}_quantity`}
              min="0"
              step="1"
              className="w-20 p-1 rounded-sm bg-white outline-none text-center whitespace-nowrap uppercase font-semibold font-['Montserrat'] text-xs sm:text-sm"
              {...register('quantity', { valueAsNumber: true })}
              onClick={(event) => event.preventDefault()}
            />
            {errors.quantity && <p className="text-red-500 text-xs">{errors.quantity.message}</p>}
          </div>
          <button
            id={`${product.id}_plus`}
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setValue('quantity', quantity + 1);
            }}
            className="group pointer-events-auto cursor-pointer bg-gray-200 text-gray-700 font-bold px-4 whitespace-nowrap uppercase font-['Montserrat'] text-sm sm:text-xl"
          >
            <Plus className="group-hover:scale-125 transition-all duration-500 h-4 w-4 text-black" />
          </button>
        </form>
        <motion.button
          variants={{
            hidden: { backgroundColor: '#7A5CFF', scale: 1 },
            tap: { scale: 1.2, transition: { duration: 1 } },
            visible: {
              backgroundColor: [
                '#7A5CFF',
                '#7A5CFF',
                '#9C85FF',
                '#7A5CFF',
                '#9C85FF',
                '#4525C7',
                '#9C85FF',
                '#7A5CFF',
                '#7A5CFF',
                '#7A5CFF',
              ],
              color: [
                '#FFFFFF',
                '#FFFFFF',
                '#F8F9FA',
                '#FAFAFF',
                '#F2F2FF',
                '#BFBFBF',
                '#F2F2FF',
                '#FAFAFF',
                '#FFFFFF',
                '#FFFFFF',
              ],
              transition: {
                duration: 8,
                repeat: Infinity,
                repeatType: 'reverse',
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
      {CloseBtn && typeof CloseBtn === 'function' ? <CloseBtn /> : CloseBtn}
    </motion.div>
  );
};

export default AddToCart;

