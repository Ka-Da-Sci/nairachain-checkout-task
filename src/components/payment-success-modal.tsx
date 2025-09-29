"use client";

import { useQueryClient } from "@tanstack/react-query";
import useCartStore from "./store/cart-store";
import { X } from "lucide-react";

// Props type for the PaymentSuccessModal component
type PaymentSuccessModalProps = {
  transactionId: string;
  amount: number;
  onClose: (state: boolean) => void;
  currency: "USDT" | "BNB";
};

const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({
  transactionId,
  amount,
  currency,
  onClose,
}) => {
  // Access cart store for managing cart state and utility modal
  const {
    resetCartAfterPayment,
    setCartModalOpen,
    setShowUtilityCardModal,
    setUtilityHoverCardProps,
  } = useCartStore();

  const queryClient = useQueryClient();

  // Handler to close modal and reset cart
  const handleClose = () => {
    setCartModalOpen(false);
    resetCartAfterPayment(queryClient);
    onClose(false);
  };

  return (
    // Fixed overlay for the payment success modal
    <div
      id="paymentSuccessModal"
      className="fixed z-50 left-0 top-0 w-full h-full overflow-hidden bg-[rgba(0,0,0,0.4)] flex"
    >
      {/* Modal content with centered layout and responsive sizing */}
      <div className="bg-[#fefefe] m-auto p-4 border border-solid border-[#888] rounded-2xl text-center relative w-[70%] md:w-[60%] max-w-[500px] h-auto">
        <div className="flex flex-col items-center gap-4">
          <svg
            className="w-14 sm:w-20 aspect-square mb-2"
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
          <h2 className="font-inter font-black text-sm md:text-lg antialiased">
            Payment Successful!
          </h2>
          <div className="details">
            <div className="container mx-auto mb-4 w-full">
              <p className="font-inter font-bold text-sm md:text-base text-[#333333] antialiased">
                Transaction ID
              </p>
              <p className="value font-semibold font-inter text-xs text-[#333333] antialiased">
                {transactionId}
              </p>
            </div>
            <div className="container mx-auto mb-4 w-full">
              <p className="font-inter font-bold text-sm md:text-base text-[#333333] antialiased">
                Amount
              </p>
              <p className="value font-semibold font-inter text-xs text-[#333333] antialiased">
                ${amount} in {currency}
              </p>
            </div>
            <div className="container mx-auto mb-4 w-full">
              <p className="font-inter font-bold text-sm md:text-base text-[#333333] antialiased">
                Date
              </p>
              <p className="value font-semibold font-inter text-xs text-[#333333] antialiased">
                {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="container mx-auto mb-4 w-full">
              <p className="font-inter font-bold text-sm md:text-base text-[#333333] antialiased">
                Time
              </p>
              <p className="value font-semibold font-inter text-xs text-[#333333] antialiased">
                {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="z-10 hover:scale-110 absolute right-0 transform -translate-x-[12.5%] -translate-y-[170%] rotate-90 cursor-pointer transition-all duration-1000 ease-in-out hover:-translate-x-[12.5%] hover:rotate-[45deg] top-4 shadow-xl rounded-full p-1 bg-black group"
          >
            <X className="group-hover:scale-125 transition-all duration-500 h-5 w-5 text-white" />
          </button>

          <div className="w-full flex flex-col gap-4">
            <hr className="border border-dashed border-[#333333]" />
            <button
              onClick={() => {
                setUtilityHoverCardProps(
                  "Info!",
                  "Ooops! This feature not enabled yet."
                );
                setShowUtilityCardModal(true);
              }}
              className="w-full p-2 flex items-center justify-center gap-2 font-poppins text-sm md:text-base rounded bg-[#408bfc] text-white hover:bg-[#ffffff] hover:text-[#408bfc] border border-solid border-[#408bfc] cursor-pointer mb-2 transition-all duration-300 ease-in-out"
            >
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
              <span className="font-poppins antialiased">Save Receipt</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;
