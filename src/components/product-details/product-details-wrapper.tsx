"use client";

import { useRef } from "react";
import ImageWrapper from "../image-wrapper";
import { motion, useInView } from "motion/react";
import amazonAlexaSpeaker from "../../../public/images/Amazon Alexa Speakers.png";
import SectionAnimatedWrapper from "../section-animated-wrapper";

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

// : FC<{
//   product: {
//     description: string;
//     title: string;
//     price: number;
//     imgSrc: string;
//     altText: string;
//     id: string;
//   };
// }>

const ProductDetailsWrapper = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.05 });

  const product = {
    id: "1",
    description:
      "High-quality smart speaker with voice assistant capabilities for seamless integration and control.",
    title: "Amazon Alexa Speakers",
    price: 100,
    imgSrc: (amazonAlexaSpeaker as { src: string }).src ?? amazonAlexaSpeaker,
    altText: "amazon-alexa-speakers",
  };

  return (
    <SectionAnimatedWrapper
      sectionId={`product_${product.id}`}
      sectionClassName="w-full h-full relative pt-20"
    >
      <motion.li
        id={product.id}
        ref={ref}
        variants={containerVariant}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="w-full h-full relative bg-[#000000CC] rounded-lg"
      >
        <motion.div className="item-container z-0 h-full flex items-center justify-center gap-12 flex-col sm:flex-row py-8 px-4">
          <div className="group max-w-full sm:max-w-1/2 group [box-shadow:0px_4px_30px_0px_#00000033] rounded-lg">
            <motion.div
              variants={{
                hidden: { opacity: 0.3 },
                visible: { opacity: 1 },
              }}
              className="shrink-0 flex justify-center w-[250px] max-w-full overflow-hidden p-8 group-hover:scale-110 transition-all duration-1000"
            >
              <ImageWrapper
                sourceUrl={product.imgSrc}
                alternativeText={product.altText}
              />
            </motion.div>
          </div>

          <div className="flex max-sm:items-center justify-center gap-4 flex-col ">
            <p className="item-name sm:self-start antialiased font-bold font-['poppins'] text-sm md:text-lg text-center sm:text-left capitalize text-white/90">
              {product.title}
            </p>

            <motion.p
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
              id={`${product.id}_item-footer-description`}
              className="preview-text transition-all duration-500 w-full max-w-[400px] text-white font-['Poppins'] font-normal text-center sm:text-left antialiased text-xs md:text-sm"
              onClick={(event) => event.stopPropagation()}
            >
              {product.description}
            </motion.p>

            <p className="item-price font-bold font-['poppins'] text-center sm:text-left antialiased text-white/90 text-sm sm:text-base md:text-lg lg:text-xl">
              <span>$</span>
              <span>{product.price}</span>
            </p>
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { duration: 1.5 },
                },
              }}
              initial="hidden"
              exit="hidden"
              animate="visible"
              className="add-to-cart-container flex max-sm:items-center flex-col gap-4 w-full max-w-max"
              onClick={(event) => event.stopPropagation()}
            >
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
            </motion.div>
          </div>
        </motion.div>
      </motion.li>
    </SectionAnimatedWrapper>
  );
};

export default ProductDetailsWrapper;
