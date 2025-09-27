'use client';

import { motion } from 'motion/react';
import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import SectionAnimatedWrapper from '../section-animated-wrapper';
import Product from './product';
import { fetchProducts } from '@/services/api';
import validateProducts from '@/utils/validate-products';

const Products = () => {
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const products = await fetchProducts();
      return validateProducts(products);
    },
  });

  const ref = useRef(null);
  // const isInView = useInView(ref, { once: false, amount: 0.05 });

  if (isLoading) {
    return (
      <SectionAnimatedWrapper
        sectionId="products"
        sectionClassName="w-full bg-background-primary scroll-mt-10"
        classNamePlus="flex-col gap-4"
      >
        <div className="flex max-sm:items-center flex-col items-start max-md:justify-center max-md:items-center">
          <div className="flex gap-2 flex-col w-full max-w-[800px] items-center antialiased uppercase text-center text-[#1E1E1E] font-['Montserrat']">
            <h1 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
              Top Picks for You
            </h1>
            <div className="flex flex-col items-center gap-4">
              <h2 className="font-normal text-xs sm:text-sm">
                Find Your Perfect Gadget Among Our Favorites
              </h2>
              <div className="overflow-hidden relative z-0 dynamic-hr w-[95%] h-1 rounded-l-full rounded-r-full bg-transparent before:z-20 before:absolute before:top-0 before:left-0 before:content-[''] before:rounded-l-full before:rounded-r-full before:bg-[#ff4500] before:w-full before:h-full after:z-10 after:absolute after:top-0 after:left-0 after:content-[''] after:rounded-l-full after:rounded-r-full after:bg-[#ffa17f] after:w-full after:h-full"></div>
            </div>
          </div>
        </div>
        <div className="text-center">Loading products...</div>
      </SectionAnimatedWrapper>
    );
  }

  if (error) {
    return (
      <SectionAnimatedWrapper
        sectionId="products"
        sectionClassName="w-full bg-background-primary scroll-mt-10"
        classNamePlus="flex-col gap-4"
      >
        <div className="flex max-sm:items-center flex-col items-start max-md:justify-center max-md:items-center">
          <div className="flex gap-2 flex-col w-full max-w-[800px] items-center antialiased uppercase text-center text-[#1E1E1E] font-['Montserrat']">
            <h1 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
              Top Picks for You
            </h1>
            <div className="flex flex-col items-center gap-4">
              <h2 className="font-normal text-xs sm:text-sm">
                Find Your Perfect Gadget Among Our Favorites
              </h2>
              <div className="overflow-hidden relative z-0 dynamic-hr w-[95%] h-1 rounded-l-full rounded-r-full bg-transparent before:z-20 before:absolute before:top-0 before:left-0 before:content-[''] before:rounded-l-full before:rounded-r-full before:bg-[#ff4500] before:w-full before:h-full after:z-10 after:absolute after:top-0 after:left-0 after:content-[''] after:rounded-l-full after:rounded-r-full after:bg-[#ffa17f] after:w-full after:h-full"></div>
            </div>
          </div>
        </div>
        <div className="text-center text-red-500">Error loading products: {error.message}</div>
      </SectionAnimatedWrapper>
    );
  }

  console.log(products);

  return (
    <SectionAnimatedWrapper
      sectionId="products"
      sectionClassName="w-full bg-background-primary scroll-mt-10"
      classNamePlus="flex-col gap-4"
    >
      <div className="flex max-sm:items-center flex-col items-start max-md:justify-center max-md:items-center">
        <div className="flex gap-2 flex-col w-full max-w-[800px] items-center antialiased uppercase text-center text-[#1E1E1E] font-['Montserrat']">
          <h1 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            Top Picks for You
          </h1>
          <div className="flex flex-col items-center gap-4">
            <h2 className="font-normal text-xs sm:text-sm">
              Find Your Perfect Gadget Among Our Favorites
            </h2>
            <div className="overflow-hidden relative z-0 dynamic-hr w-[95%] h-1 rounded-l-full rounded-r-full bg-transparent before:z-20 before:absolute before:top-0 before:left-0 before:content-[''] before:rounded-l-full before:rounded-r-full before:bg-[#ff4500] before:w-full before:h-full after:z-10 after:absolute after:top-0 after:left-0 after:content-[''] after:rounded-l-full after:rounded-r-full after:bg-[#ffa17f] after:w-full after:h-full"></div>
          </div>
        </div>
      </div>
      <motion.ul
        ref={ref}
        // initial="hidden"
        // animate={isInView ? 'visible' : 'hidden'}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.3 } },
        }}
        className="self-start max-sm:self-center grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] max-lg:grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))] max-sm:grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] w-full gap-8 justify-between items-start"
      >
        {products.map((product, idx) => (
          <Product
            key={`product_${idx}`}
            product={{
              ...product,
              imgSrc: typeof product.imgSrc === 'object' ? product.imgSrc.src : product.imgSrc,
            }}
            index={idx}
          />
        ))}
      </motion.ul>
    </SectionAnimatedWrapper>
  );
};

export default Products;
