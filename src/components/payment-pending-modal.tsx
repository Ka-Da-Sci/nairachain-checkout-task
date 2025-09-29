"use client";

import { X } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import Spinner from "./spinner";

// Props type for the PaymentPendingModal component
type PaymentPendingModalProps = {
  qrCodeData: string;
  amount: number;
  currency: "USDT" | "BNB";
  onClose: (state: boolean) => void;
};

// Component to display a pending payment modal with QR code
const PaymentPendingModal: React.FC<PaymentPendingModalProps> = ({
  qrCodeData,
  amount,
  currency,
  onClose,
}) => {
  // Handler to close the modal
  const handleClose = () => {
    onClose(true);
  };
  return (
    // Fixed overlay for the payment pending modal
    <div
      id="paymentPendingModal"
      className="fixed z-50 left-0 top-0 w-full h-full overflow-hidden bg-[rgba(0,0,0,0.4)] flex"
    >
      {/* Modal content with centered layout and responsive sizing */}
      <div className="bg-[#fefefe] m-auto p-4 border border-solid border-[#888] rounded-2xl text-center relative w-[70%] md:w-[60%] max-w-[500px] h-auto">
        <h2 className="font-inter text-sm md:text-lg antialiased font-black">
          Payment Pending
        </h2>
        <div className="flex flex-col items-center gap-4">
          <p className="font-inter font-bold text-xs md:text-sm antialiased">
            Scan the QR code to complete the payment of ${amount} in {currency}.
          </p>

          {/* Render QR code for payment */}
          <QRCodeSVG value={qrCodeData} size={128} />
          <p className="font-inter text-xs antialiased font-semibold">
            Waiting for payment confirmation...
          </p>

          {/* Display loading spinner during payment processing */}
          <Spinner />
        </div>

        {/* Close button with animated hover effect */}
        <button
          onClick={handleClose}
          className="z-10 hover:scale-110 absolute right-0 transform -translate-x-[12.5%] -translate-y-[170%] rotate-90 cursor-pointer transition-all duration-1000 ease-in-out hover:-translate-x-[12.5%] hover:rotate-[45deg] top-4 shadow-xl rounded-full p-1 bg-black group"
        >
          <X className="group-hover:scale-125 transition-all duration-500 h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export default PaymentPendingModal;
