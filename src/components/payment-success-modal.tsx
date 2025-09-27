"use client";

import { useQueryClient } from "@tanstack/react-query";
import useCartStore from "./store/cart-store";
import { X } from "lucide-react";

interface PaymentSuccessModalProps {
  transactionId: string;
  amount: number;
  onClose: (state: boolean) => void;
  currency: "USDT" | "BNB";
}

const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({
  transactionId,
  amount,
  currency,
  onClose
}) => {
  const { resetCartAfterPayment } = useCartStore();
  const queryClient = useQueryClient();

  const handleClose = () => {
    resetCartAfterPayment(queryClient);
    onClose(false);
  };

  return (
    <section
      id="paymentSuccessModal"
      className="fixed z-50 left-0 top-0 w-full h-full overflow-hidden bg-[rgba(0,0,0,0.4)] flex"
    >
      <div className="bg-[#fefefe] m-auto p-4 border border-solid border-[#888] rounded-2xl text-center relative w-[70%] md:w-[60%] max-w-[500px] h-auto">
        <div className="flex flex-col items-center gap-4">
          <svg
            className="w-[10%] mb-2"
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
          <h2 className="font-inter text-sm md:text-lg antialiased">
            Payment Successful!
          </h2>
          <div className="details">
            <div className="container mx-auto mb-4 w-full">
              <p className="key font-inter text-sm md:text-base text-[#333333] antialiased">
                Transaction ID
              </p>
              <p className="value font-semibold font-inter text-xs text-[#333333] antialiased">
                {transactionId}
              </p>
            </div>
            <div className="container mx-auto mb-4 w-full">
              <p className="key font-inter text-sm md:text-base text-[#333333] antialiased">
                Amount
              </p>
              <p className="value font-semibold font-inter text-xs text-[#333333] antialiased">
                {amount} {currency}
              </p>
            </div>
            <div className="container mx-auto mb-4 w-full">
              <p className="key font-inter text-sm md:text-base text-[#333333] antialiased">
                Date
              </p>
              <p className="value font-semibold font-inter text-xs text-[#333333] antialiased">
                {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="container mx-auto mb-4 w-full">
              <p className="key font-inter text-sm md:text-base text-[#333333] antialiased">
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
        </div>
      </div>
    </section>
  );
};

export default PaymentSuccessModal;
