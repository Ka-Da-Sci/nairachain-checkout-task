"use client";

import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import ImageWrapper from "../image-wrapper";
import { AnimatePresence, motion, useInView } from "motion/react";
import MotionLink from "../motion-link";
import CloseBtn from "../closeBtn";
import AddToCart from "../add-to-cart";
import ShowDescription from "../show-description";
import { CartItem } from "../store/cart-store";

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

const Product: FC<{
  product: CartItem;
  index: number;
}> = ({ product, index }) => {
  const [showDescription, setShowDescription] = useState(false);
  const [showAddToCart, setShowAddToCart] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.05 });

  useEffect(() => {
    if (!isClicked) return;

    const toggleIsClicked = () => {
      if (!showDescription) setIsClicked(false);
    };

    toggleIsClicked();

    return () => toggleIsClicked();
  }, [isClicked, showDescription]);

  const handleShowDescription = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsClicked(true);
    setShowDescription(true);
  };

  const handleShowAddToCart = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setShowAddToCart(true);
  };

  return (
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
        href="/product-details"
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
            sourceUrl={product.imgSrc}
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
                // onMouseEnter={() => setShowAddToCart(true)}
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
                className="preview-button pointer-events-auto cursor-pointer flex justify-center w-full h-full max-w-6 max-h-6"
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

      <AnimatePresence>
        {showAddToCart && (
          <AddToCart
          positioning="absolute"
            product={product}
            handleToggleOpenAddToCart={() =>setShowAddToCart((prev: boolean) => !prev)}
            CloseBtn={
              <CloseBtn
                onClose={(event: MouseEvent) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setShowAddToCart((prev: boolean) => !prev);
                }}
              />
            }
          />
        )}
      </AnimatePresence>

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
