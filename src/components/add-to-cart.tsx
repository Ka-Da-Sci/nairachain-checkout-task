import { motion } from "motion/react";
import { ComponentType, MouseEvent, ReactNode, useState } from "react";
import useCartStore, { CartItem } from "./store/cart-store";
import { Plus, Minus } from "lucide-react";

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
  const { addToCart } = useCartStore();
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = (e: MouseEvent) => {
    e.preventDefault();
    console.log(product);
    addToCart({ ...product, quantity });
    setQuantity(0);
  };

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
        <div className="flex items-center p-2 rounded bg-[#E9E9E9] text-[#000000]">
          <button
            id={`${product.id}_minus`}
            onClick={(event) => {
              event.stopPropagation();
              setQuantity(Math.max(0, quantity - 1));
            }}
            className="group pointer-events-auto cursor-pointer bg-gray-200 text-gray-700 font-bold px-4 whitespace-nowrap uppercase font-['Montserrat'] text-sm sm:text-xl"
          >
            <Minus className="group-hover:scale-125 transition-all duration-500 h-4 w-4 text-black" />
          </button>
          <input
            type="text"
            id={`${product.id}_quantity`}
            min="0"
            step="1"
            value={quantity}
            className="w-20 p-1 rounded-sm bg-white outline-none text-center whitespace-nowrap uppercase font-semibold font-['Montserrat'] text-xs sm:text-sm"
            onClick={(event) => event.preventDefault()}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
          />
          <button
            id={`${product.id}_plus`}
            onClick={(event) => {
              event.stopPropagation();
              setQuantity(quantity + 1);
            }}
            className="group pointer-events-auto cursor-pointer bg-gray-200 text-gray-700 font-bold px-4 whitespace-nowrap uppercase font-['Montserrat'] text-sm sm:text-xl"
          >
            <Plus className="group-hover:scale-125 transition-all duration-500 h-4 w-4 text-black" />
          </button>
        </div>
        <motion.button
          variants={{
            hidden: { backgroundColor: "#7A5CFF", scale: 1 },
            tap: { scale: 1.2, transition: { duration: 1 } },
            hover: { backgroundColor: "#5e3bee", transition: { duration: 1 } },

            visible: {
              backgroundColor: [
                "var(--foreground-secondary-span)",
                "var(--foreground-secondary-span)",
                "#9C85FF",
                "#7A5CFF",
                "#9C85FF",
                "#4525C7",
                "#9C85FF",
                "#7A5CFF",
                "var(--foreground-secondary-span)",
                "var(--foreground-secondary-span)",
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
          whileTap={"tap"}
          // whileHover={"hover"}
          onClick={(event) => {
            event.stopPropagation();
            handleAddToCart(event);
            if (handleToggleOpenAddToCart) handleToggleOpenAddToCart(false);
          }}
          className="add-to-cart pointer-events-auto cursor-pointer bg-[#408bfc] text-white whitespace-nowrap uppercase font-semibold font-['Montserrat'] text-xs sm:text-sm p-2 pt-[10px] pb-[10px] rounded"
        >
          <motion.p className="inline-block">ADD TO CART</motion.p>
        </motion.button>
      </motion.div>

      {CloseBtn && typeof CloseBtn === "function" ? <CloseBtn /> : CloseBtn}
    </motion.div>
  );
};

export default AddToCart;

// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
//   rating: number;
//   reviewsNum: number;
//   seatCount: number;
//   transmissionType: string;
//   fuel: string;
//   currencySymb: string;
//   description: string;
//   collectionType?: string;
// }

// interface ProductCardProps {
//   product: Product;
// }

// export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
//   const { addToCart } = useCartStore();
//   const [quantity, setQuantity] = useState(1);
//   const [isAddToCartOpen, setIsAddToCartOpen] = useState(false);
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false);

//   const handleAddToCart = (e: React.MouseEvent) => {
//     e.preventDefault();
//     addToCart({ ...product, quantity });
//     setIsAddToCartOpen(false);
//   };

//   return (
//     <a
//       href="/product-details"
//       id={product.id}
//       className="item-container relative items-center flex gap-2 flex-col border border-solid border-[#1E1E1E4D] hover:[box-shadow:0px_4px_30px_0px_#00000033] rounded-xl py-3 px-6"
//       onClick={(e) => e.preventDefault()}
//     >
//       <div className="flex justify-center h-full w-full max-w-[259px] max-h-[193px] py-7 px-1 overflow-hidden">
//         <img
//           className="h-auto w-auto max-w-full max-h-full"
//           src={product.image}
//           alt="car"
//         />
//       </div>
//       <p className="item-name antialiased font-bold font-['poppins'] text-sm md:text-lg text-center sm:text-left capitalize text-[#767676]">
//         {product.name}
//       </p>
//       <div className="flex gap-2 items-center flex-col sm:flex-row">
//         <div className="flex items-center justify-center">
//           {[...Array(5)].map((_, i) => (
//             <img
//               key={i}
//               className="w-[12px] h-[12px]"
//               src={
//                 i < Math.floor(product.rating)
//                   ? "/assets/images/colored-star.svg"
//                   : "/assets/images/non-colored-star.svg"
//               }
//               alt="rating-star"
//             />
//           ))}
//         </div>
//         <p className="font-['poppins'] text-[#1E1E1E] text-center text-xs antialiased capitalize">
//           <span>{product.rating}</span>
//           <span>({product.reviewsNum} reviews)</span>
//         </p>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 w-full place-content-between gap-1">
//         <div className="bg-[#000000] rounded-md px-2 py-2 flex justify-center gap-1 items-center">
//           <div className="flex justify-center w-full h-full max-w-4 max-h-4">
//             <img
//               className="w-auto h-auto max-w-full max-h-full"
//               src="/assets/images/seat-icon.svg"
//               alt="seat-icon"
//             />
//           </div>
//           <p className="text-[#FFFFFF] antialiased text-xs text-left font-normal font-['poppins'] capitalize whitespace-nowrap overflow-hidden">
//             {product.seatCount} Seats
//           </p>
//         </div>
//         <div className="bg-[#000000] rounded-md px-2 py-2 flex justify-center gap-1 items-center">
//           <div className="flex justify-center w-full h-full max-w-4 max-h-4">
//             <img
//               className="w-auto h-auto max-w-full max-h-full"
//               src="/assets/images/auto-icon.svg"
//               alt="seat-icon"
//             />
//           </div>
//           <p className="text-[#FFFFFF] antialiased text-xs text-left font-normal font-['poppins'] capitalize whitespace-nowrap overflow-hidden">
//             {product.transmissionType}
//           </p>
//         </div>
//         <div className="bg-[#000000] rounded-md px-2 py-2 flex justify-center gap-1 items-center">
//           <div className="flex justify-center w-full h-full max-w-4 max-h-4">
//             <img
//               className="w-auto h-auto max-w-full max-h-full"
//               src="/assets/images/fuel-icon.svg"
//               alt="fuel-icon"
//             />
//           </div>
//           <p className="text-[#FFFFFF] antialiased text-xs text-left font-normal font-['poppins'] capitalize whitespace-nowrap overflow-hidden">
//             {product.fuel}
//           </p>
//         </div>
//       </div>
//       <div className="flex justify-between items-center w-full gap-2">
//         <p className="item-price font-bold font-['poppins'] text-left antialiased text-[#1E1E1E] text-sm sm:text-base md:text-lg lg:text-xl">
//           <span>{product.currencySymb}</span>
//           <span>{product.price}</span>
//         </p>
//         <div className="flex justify-center items-center gap-2">
//           <button className="add-to-cart hidden justify-center w-full h-full max-w-6 max-h-6">
//             <img src="/assets/images/like.svg" alt="wishlist-icon" />
//           </button>
//           <button
//             className="pseudo-add-to-cart flex justify-center w-full h-full max-w-6 max-h-6"
//             onMouseEnter={() => setIsAddToCartOpen(true)}
//           >
//             <img src="/assets/images/add-icon.svg" alt="add-icon" />
//           </button>
//           <button
//             className="preview-button flex justify-center w-full h-full max-w-6 max-h-6"
//             onMouseEnter={() => setIsPreviewOpen(true)}
//           >
//             <img src="/assets/images/preview-icon.svg" alt="preview-icon" />
//           </button>
//         </div>
//       </div>
//       <div
//         className={`add-to-cart-container rounded-xl absolute w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.5)] ${
//           isAddToCartOpen ? "flex" : "hidden"
//         }`}
//         onMouseLeave={() => setIsAddToCartOpen(false)}
//       >
//         <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center flex-col justify-center sm:justify-normal gap-4">
//           <div className="quantity-selector flex items-center p-2 rounded bg-[#E9E9E9] text-[#000000]">
//             <button
//               className="decrease bg-gray-200 text-gray-700 font-bold px-4 whitespace-nowrap uppercase font-['Montserrat'] text-sm sm:text-xl"
//               onClick={() => setQuantity(Math.max(1, quantity - 1))}
//             >
//               -
//             </button>
//             <input
//               type="text"
//               min="1"
//               step="1"
//               value={quantity}
//               className="w-12 outline-none text-center bg-transparent whitespace-nowrap uppercase font-semibold font-['Montserrat'] text-xs sm:text-sm"
//               onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
//             />
//             <button
//               className="increase bg-gray-200 text-gray-700 font-bold px-4 whitespace-nowrap uppercase font-['Montserrat'] text-sm sm:text-xl"
//               onClick={() => setQuantity(quantity + 1)}
//             >
//               +
//             </button>
//           </div>
//           <button
//             className="add-to-cart bg-orange-500 text-white whitespace-nowrap uppercase font-semibold font-['Montserrat'] text-xs sm:text-sm p-2 pt-[10px] pb-[10px] rounded"
//             onClick={handleAddToCart}
//           >
//             ADD TO CART
//           </button>
//         </div>
//       </div>
//       <div
//         id="preview-text"
//         className={`inset-0 rounded-xl absolute w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.8)] ${
//           isPreviewOpen ? "flex" : "hidden"
//         } gap-3 flex-col items-center justify-center text-white font-['Poppins'] font-normal text-center antialiased text-xs md:text-sm px-2`}
//         onMouseLeave={() => setIsPreviewOpen(false)}
//       >
//         <p className="uppercase text-white font-['Poppins'] font-bold text-sm sm:text-base">
//           description
//         </p>
//         <p>{product.description}</p>
//       </div>
//     </a>
//   );
// };
