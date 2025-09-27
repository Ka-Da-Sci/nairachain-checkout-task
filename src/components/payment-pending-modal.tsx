'use client';

import { QRCodeSVG } from 'qrcode.react';

interface PaymentPendingModalProps {
  qrCodeData: string;
  amount: number;
  currency: 'USDT' | 'BNB';
}

const PaymentPendingModal: React.FC<PaymentPendingModalProps> = ({ qrCodeData, amount, currency }) => {
  return (
    <section id="paymentPendingModal" className="fixed z-50 left-0 top-0 w-full h-full overflow-hidden bg-[rgba(0,0,0,0.4)] flex">
      <div className="bg-[#fefefe] m-auto p-4 border border-solid border-[#888] rounded-2xl text-center relative w-[70%] md:w-[60%] max-w-[500px] h-auto">
        <h2 className="font-inter text-sm md:text-lg antialiased font-black">Payment Pending</h2>
        <div className="flex flex-col items-center gap-4">
          <p className="font-inter font-bold text-xs md:text-sm antialiased">
            Scan the QR code to complete the payment of {amount} {currency}.
          </p>
          <QRCodeSVG value={qrCodeData} size={128} />
          <p className="font-inter text-xs antialiased font-semibold">Waiting for payment confirmation...</p>
        </div>
      </div>
    </section>
  );
};

export default PaymentPendingModal;

