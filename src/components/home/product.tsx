"use client";

import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import ImageWrapper from "../image-wrapper";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { X } from "lucide-react";
import MotionLink from "../motion-link";

const containerVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.2,
      duration: 0.3
    },
  }),
};

const CloseBtn = ({ onClose }: { onClose: (event: MouseEvent) => void }) => {
  return (
    <button
      onClick={onClose}
      className="hover:scale-110 transition-all duration-500 absolute cursor-pointer right-4 top-4 shadow-xl rounded-full p-1 bg-black group"
    >
      <X className="group-hover:scale-125 transition-all duration-500 h-5 w-5 text-white" />
    </button>
  );
};

const Product: FC<{
  description: string;
  title: string;
  price: number;
  imgSrc: string;
  altText: string;
  index: number;
}> = ({ description, title, imgSrc, altText, index, price }) => {
  const [showDescription, setShowDescription] = useState(false);
  const [showAddToCart, setShowAddToCart] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.05 }); // Trigger when 30% of the item is in view

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
      ref={ref}
      variants={containerVariant}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={index}
      className="w-full h-full relative"
    >
      <MotionLink
        href="/products-details"
        id="e0cad9090fbfbdcea7034cda9e0dfd29"
        className="item-container group z-0 h-full flex items-center gap-2 flex-col border border-solid border-[#1E1E1E4D] hover:[box-shadow:0px_4px_30px_0px_#00000033] transition-all duration-500 rounded-xl py-3 px-6"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0.3 },
            visible: { opacity: 1, transition: { delay: index * 0.2 } },
          }}
          className="flex justify-center h-full w-full max-w-[259px] max-h-[193px] py-7 px-1 overflow-hidden"
        >
          <ImageWrapper
            className="h-auto w-auto max-w-full max-h-full"
            sourceUrl={imgSrc}
            alternativeText={altText}
          />
        </motion.div>
        <p className="item-name sm:self-start antialiased font-bold font-['poppins'] text-sm md:text-lg text-center sm:text-left capitalize text-[#1E1E1E]/85 group-hover:text-[#1E1E1E]">
          {title}
        </p>

        <div className="flex justify-between items-center w-full gap-2">
          <p className="item-price font-bold font-['poppins'] text-left antialiased text-[#1E1E1E]/85 group-hover:text-[#1E1E1E] text-sm sm:text-base md:text-lg lg:text-xl">
            <span>$</span>
            <span>{price}</span>
          </p>
          <div className="flex justify-center items-center gap-2">
            <motion.button
              onClick={handleShowAddToCart}
              // onMouseEnter={() => setShowAddToCart(true)}
              className="pseudo-add-to-cart pointer-events-auto cursor-pointer z-10 flex justify-center w-full h-full max-w-6 max-h-6"
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
              className="preview-button z-10 pointer-events-auto cursor-pointer flex justify-center w-full h-full max-w-6 max-h-6"
            >
              <ImageWrapper
                sourceUrl="/images/preview-icon.svg"
                alternativeText="preview-icon"
              />
            </motion.button>
          </div>
        </div>
      </MotionLink>


      <AnimatePresence>
        {showAddToCart && (
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
                  id="minus"
                  onClick={(event) => event.stopPropagation()}
                  className="decrease bg-gray-200 text-gray-700 font-bold px-4 whitespace-nowrap uppercase font-['Montserrat'] text-sm sm:text-xl"
                >
                  -
                </button>
                <input
                  type="text"
                  id="quantity"
                  min="1"
                  step="1"
                  className="w-12 outline-none text-center bg-transparent whitespace-nowrap uppercase font-semibold font-['Montserrat'] text-xs sm:text-sm"
                  onClick={(event) => event.stopPropagation()}
                />
                <button
                  id="plus"
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

            <CloseBtn
              onClose={(event: MouseEvent) => {
                event.preventDefault();
                event.stopPropagation();
                setShowAddToCart((prev: boolean) => !prev);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDescription && (
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
            className="preview-text inset-0 transition-all duration-500 rounded-xl absolute w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.8)] gap-3 flex-col items-center justify-center text-white font-['Poppins'] font-normal text-center antialiased text-xs md:text-sm px-2"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="uppercase text-white font-['Poppins'] font-bold text-sm sm:text-base">
              description
            </p>
            <p id="item-footer-description">{description}</p>
            <CloseBtn
              onClose={(event: MouseEvent) => {
                event.preventDefault();
                event.stopPropagation();
                setShowDescription(false);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
};

export default Product;
