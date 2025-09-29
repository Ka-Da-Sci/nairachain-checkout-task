import { motion } from "motion/react";
import { ComponentType, ReactNode } from "react";


// Component to display product description text.
const ShowDescription = ({
  product,
  CloseBtn,
}: {
  product: { description: string; id: string };
  CloseBtn?: ComponentType | ReactNode;
}) => {
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
      className="inset-0 transition-all duration-500 rounded-xl absolute w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.8)] gap-3 flex-col items-center justify-center text-white font-['Poppins'] font-normal text-center antialiased text-xs md:text-sm px-2"
      onClick={(event) => event.stopPropagation()}
    >
      <p className="uppercase text-white font-['Poppins'] font-bold text-sm sm:text-base">
        description
      </p>
      <p id={`${product.id}_item-footer-description`}>{product.description}</p>

      {CloseBtn && typeof CloseBtn === "function" ? <CloseBtn /> : CloseBtn}
    </motion.div>
  );
};

export default ShowDescription;
