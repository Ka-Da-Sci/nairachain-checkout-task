"use client";

import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import ImageWrapper from "../image-wrapper";
import MotionLink from "../motion-link";
import CloseBtn from "../closeBtn";
import AddToCart from "../add-to-cart";
import ShowDescription from "../show-description";
import { CartItem } from "@/utils/types";

// Animation variants for product card entrance
const containerVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.3,
    },
  }),
};

// Component to render a single product card
const Product: FC<{
  product: CartItem;
  index: number;
}> = ({ product, index }) => {
  const [showDescription, setShowDescription] = useState(false);
  const [showAddToCart, setShowAddToCart] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.05 });

  // Effect to reset isClicked state when description is toggled off
  useEffect(() => {
    if (!isClicked) return;

    const toggleIsClicked = () => {
      if (!showDescription) setIsClicked(false);
    };

    toggleIsClicked();

    // Cleanup function to ensure proper state reset
    return () => toggleIsClicked();
  }, [isClicked, showDescription]);

  // Handler to show description popup and prevent navigation
  const handleShowDescription = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsClicked(true);
    setShowDescription(true);
  };

  // Handler to show add-to-cart popup and prevent navigation
  const handleShowAddToCart = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setShowAddToCart(true);
  };

  return (
    // Animated list item for the product card
    <motion.li
      id={product.id}
      ref={ref}
      variants={containerVariant}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={index}
      className="w-full h-full relative"
    >
      <MotionLink
        href={`/products/${product.id}`}
        className="item-container group z-0 h-full flex items-center gap-12 flex-col border border-solid border-[#1E1E1E4D] hover:[box-shadow:0px_4px_30px_0px_#00000033] transition-all duration-500 rounded-xl py-8 px-4"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0.3 },
            visible: { opacity: 1, transition: { delay: index * 0.1 } },
          }}
          className="flex justify-center h-full w-[150px] max-w-full overflow-hidden"
        >
          <ImageWrapper
            sourceUrl={
              typeof product.imgSrc === "object"
                ? product.imgSrc.src
                : product.imgSrc
            }
            alternativeText={product.altText}
          />
        </motion.div>

        <div className="flex justify-center gap-4 flex-col w-full">
          <p className="item-name sm:self-start antialiased font-bold font-['poppins'] text-sm md:text-lg text-center sm:text-left capitalize text-[#1E1E1E]/85 group-hover:text-[#1E1E1E]">
            {product.title}
          </p>

          <div className="flex justify-between items-center w-full gap-2">
            <p className="item-price font-bold font-['poppins'] text-left antialiased text-[#1E1E1E]/85 group-hover:text-[#1E1E1E] text-sm sm:text-base md:text-lg lg:text-xl">
              <span>$</span>
              <span>{product.price}</span>
            </p>
            <div className="flex justify-center items-center gap-2">
              <motion.button
                onClick={handleShowAddToCart}
                className="pseudo-add-to-cart pointer-events-auto cursor-pointer flex justify-center w-full h-full max-w-6 max-h-6"
              >
                <ImageWrapper
                  sourceUrl="/images/add-icon.svg"
                  alternativeText="add-icon"
                />
              </motion.button>
              <motion.button
                onClick={handleShowDescription}
                onMouseEnter={() => setShowDescription(true)}
                onMouseLeave={() => !isClicked && setShowDescription(false)}
                className="z-30 cursor-pointer preview-button pointer-events-auto flex justify-center w-full h-full max-w-6 max-h-6"
              >
                <ImageWrapper
                  sourceUrl="/images/preview-icon.svg"
                  alternativeText="preview-icon"
                />
              </motion.button>
            </div>
          </div>
        </div>
      </MotionLink>

      {/* Conditionally render and animate add-to-cart popup */}
      <AnimatePresence>
        {showAddToCart && (
          <AddToCart
            positioning="absolute"
            product={{ ...product, quantity: 0 }} // Ensure quantity is initialized
            handleToggleOpenAddToCart={setShowAddToCart}
            CloseBtn={
              <CloseBtn
                onClose={(event: MouseEvent) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setShowAddToCart(false);
                }}
              />
            }
          />
        )}
      </AnimatePresence>

      {/* Conditionally render and animate description popup */}
      <AnimatePresence>
        {showDescription && (
          <ShowDescription
            product={product}
            CloseBtn={
              <CloseBtn
                onClose={(event: MouseEvent) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setShowDescription(false);
                }}
              />
            }
          />
        )}
      </AnimatePresence>
    </motion.li>
  );
};

export default Product;
