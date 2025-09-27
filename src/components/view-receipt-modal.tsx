import { X } from "lucide-react";
import useCartStore from "./store/cart-store";

interface ViewReceiptModalProps {
  total: number;
}

export const ViewReceiptModal: React.FC<ViewReceiptModalProps> = ({
  total,
}) => {
  const { setViewReceiptModalOpen } = useCartStore();

  return (
    <section id="viewReceiptSection">
      <div className="viewReceiptModal fixed z-50 left-0 top-0 w-full h-full overflow-auto [scrollbar-width:thin] scrollbar-thumb-[#888] scrollbar-track-[#ffffff] bg-[rgba(0,0,0,0.4)] flex">
        <div className="modal-content2 w-[80%] max-w-[250px] sm:max-w-[300px] lg:max-w-[500px] h-[60vh] sm:h-[70vh] rounded-lg will-change-[transform] bg-[#fefefe] m-auto p-4 border border-solid border-[#888] text-center relative overflow-y-auto">
          <button
            onClick={() => {
              setViewReceiptModalOpen(false);
            }}
            className="z-40 absolute top-4 right-0 transform -translate-x-1/2 lg:-translate-x-3/4 -translate-y-[0%] rotate-90 cursor-pointer transition-all duration-1000 ease-in-out shadow-xl rounded-full p-1 bg-black"
          >
            <X className="transition-all duration-500 h-5 w-5 text-white" />
          </button>
          <div className="header flex flex-col items-center mb-2">
            <svg
              className="w-20 aspect-square mb-2"
              viewBox="0 0 50 49"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25.2727 2.31152L31.3604 6.53486L38.8956 6.52122L41.2105 13.3411L47.315 17.5424L44.9729 24.3538L47.315 31.1652L41.2105 35.3664L38.8956 42.1863L31.3604 42.1727L25.2727 46.396L19.1851 42.1727L11.6499 42.1863L9.33499 35.3664L3.23047 31.1652L5.57262 24.3538L3.23047 17.5424L9.33499 13.3411L11.6499 6.52122L19.1851 6.53486L25.2727 2.31152Z"
                fill="#4EBA6F"
                stroke="white"
                strokeWidth="4.63532"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.1602 24.3533L22.9543 29.8639L34.5426 18.8428"
                stroke="white"
                strokeWidth="4.63532"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h2 className="antialiased font-space_grotesk text-sm md:text-lg text-[#333333]">
              Payment Successful!
            </h2>
          </div>
          <hr />
          <div className="details">
            <div className="container mx-auto mb-4 w-full">
              <p className="antialiased key font-poppins text-sm md:text-base text-[#333333]">
                Reference Number
              </p>
              <p className="value antialiased font-semibold font-poppins text-xs text-[#333333]">
                004561984411
              </p>
            </div>
            <div className="container mx-auto flex flex-wrap items-center justify-center gap-2 mb-4 w-full">
              <p className="key antialiased font-poppins text-sm md:text-base text-[#333333]">
                Date
              </p>
              <p className="value antialiased font-semibold font-poppins text-xs text-[#333333]">
                April 24, 2024
              </p>
            </div>
            <div className="container mx-auto flex flex-wrap items-center justify-center gap-2 mb-4 w-full">
              <p className="key antialiased font-poppins text-sm md:text-base text-[#333333]">
                Time
              </p>
              <p className="value antialiased font-semibold font-poppins text-xs text-[#333333]">
                09:32 PM
              </p>
            </div>
            <div className="container mx-auto flex flex-wrap items-center justify-center gap-2 mb-4 w-full">
              <p className="key antialiased font-poppins text-sm md:text-base text-[#333333]">
                Payment Method
              </p>
              <p className="value antialiased font-semibold font-poppins text-xs text-[#333333]">
                Debit Card
              </p>
            </div>
            <div className="container mx-auto flex flex-wrap items-center justify-center gap-2 mb-4 w-full">
              <p className="key antialiased font-poppins text-sm md:text-base text-[#333333]">
                Amount
              </p>
              <p className="value antialiased font-poppins text-sm md:text-base text-[#333333]">
                ${total.toFixed(2)}
              </p>
            </div>
          </div>
          <hr className="border border-dashed border-[#333333]" />
          <div className="last bg-[#ffffff] mt-2 flex items-center justify-center gap-2">
            <button className="alt flex items-center justify-center gap-2 font-poppins text-sm md:text-base w-[70%] h-12 rounded bg-[#408bfc] text-white hover:bg-[#ffffff] hover:text-[#408bfc] border border-solid border-[#408bfc] cursor-pointer mb-2 transition-all duration-300 ease-in-out">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
              >
                <path
                  fill="currentColor"
                  d="M2.75 14A1.75 1.75 0 0 1 1 12.25v-2.5a.75.75 0 0 1 1.5 0v2.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25v-2.5a.75.75 0 0 1 1.5 0v2.5A1.75 1.75 0 0 1 13.25 14Z"
                />
                <path
                  fill="currentColor"
                  d="M7.25 7.689V2a.75.75 0 0 1 1.5 0v5.689l1.97-1.969a.749.749 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 6.78a.749.749 0 1 1 1.06-1.06z"
                />
              </svg>
              <span className="font-poppins antialiased">
                Save Receipt
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewReceiptModal;
