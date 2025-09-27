"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useCartStore from "./store/cart-store";
import CartItem from "./cart-item";
import { X } from "lucide-react";
import Link from "next/link";
import ImageWrapper from "./image-wrapper";
import dynamic from "next/dynamic";
import { QRCodeSVG } from "qrcode.react";
import { checkoutFormSchema } from "@/lib/zod-schemas";
import { processPayment } from "@/services/api";
import { CheckoutFormData, PaymentResponse } from "@/utils/types";

// Dynamic imports for payment modals
const PaymentPendingModal = dynamic(() => import("./payment-pending-modal"), {
  ssr: false,
});
const PaymentSuccessModal = dynamic(() => import("./payment-success-modal"), {
  ssr: false,
});

const CartModal: React.FC = () => {
  const {
    cartItems,
    setCartModalOpen,
    clearCart,
    subtotal,
    total,
    deliveryFee,
  } = useCartStore();
  const queryClient = useQueryClient();
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  const [paymentData, setPaymentData] = useState<PaymentResponse | null>(null);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      amount: total(subtotal(Object.values(cartItems)), deliveryFee),
      currency: "USDT",
    },
  });

  const formData = watch();
  const amount = formData.amount;

  // Update amount when cart or discount changes
  const currentSubtotal = subtotal(Object.values(cartItems));
  if (amount !== total(currentSubtotal, deliveryFee)) {
    setValue("amount", total(currentSubtotal, deliveryFee));
  }

  const { mutate, isPending } = useMutation<
    PaymentResponse,
    Error,
    { amount: number; currency: "USDT" | "BNB" }
  >({
    mutationFn: processPayment,
    onSuccess: (data: PaymentResponse) => {
      setPaymentData(data);
      setIsPaymentSuccess(true);
      console.log(data);
      // setCartModalOpen(false);
      // setOrderPlacedModalOpen(true);
    },
    onError: () => {
      alert("Payment processing failed. Please try again.");
    },
  });

  const handleGenerateQRCode = () => {
    if (!isValid) {
      alert("Please fill out the payment information form correctly.");
      return;
    }
    const walletAddresses = {
      USDT: "0x1234567890abcdef1234567890abcdef12345678",
      BNB: "bnb1xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    };
    setQrCodeData(
      `crypto:${walletAddresses[formData.currency]}?amount=${formData.amount}`
    );
  };

  const handlePaymentSuccess = (state: boolean) => {
    setIsPaymentSuccess(state);
  };

  const onSubmit = (data: CheckoutFormData) => {
    if (!qrCodeData) {
      alert("Please generate the QR code before proceeding with payment.");
      return;
    }
    mutate({ amount: data.amount, currency: data.currency });
  };

  console.log(paymentData);

  return (
    <>
      {!isPaymentSuccess && (
        <div
          id="checkout-modal"
          className={`checkout-modal fixed z-50 left-0 top-0 flex w-full h-full overflow-hidden bg-[rgba(0,0,0,0.4)]`}
        >
          <div className="modal-content-wrapper container m-auto p-4 relative max-[400px]:w-[95%] w-[90%] md:w-full max-md:max-w-[500px] max-w-[700px] flex justify-between rounded-lg h-[60vh] sm:h-[70vh] will-change-[transform]">
            <button
              onClick={() => setCartModalOpen(false)}
              className="z-10 hover:scale-110 absolute right-0 transform -translate-x-[12.5%] -translate-y-[170%] rotate-90 cursor-pointer transition-all duration-1000 ease-in-out hover:-translate-x-[12.5%] hover:rotate-[45deg] top-4 shadow-xl rounded-full p-1 bg-black group"
            >
              <X className="group-hover:scale-125 transition-all duration-500 h-5 w-5 text-white" />
            </button>
            <div className="modal-content container bg-[#fefefe] m-auto p-2 pt-4 pb-4 rounded-lg fixed inset-0 top-[2.5%] left-0 w-[95%] grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center md:items-start overflow-x-hidden overflow-y-auto h-[95%] [scrollbar-width:thin] scrollbar-thumb-[#888] scrollbar-track-[#ffffff]">
              <div className="product-details relative h-full flex flex-col gap-6">
                <div className="cart flex w-full flex-col gap-4">
                  <div className="heading flex gap-4 w-full justify-between mb-4">
                    <h2 className="font-inter text-sm text-left antialiased">
                      Cart Details
                    </h2>
                    <span
                      className="empty-cart font-inter antialiased flex items-center cursor-pointer text-end"
                      onClick={() => clearCart(queryClient)}
                    >
                      <ImageWrapper
                        className="w-[0.8rem]"
                        sourceUrl="/images/clear-cart-btn.png"
                        alternativeText="clear cart icon"
                      />
                      <p className="font-inter text-xs text-[#FE7171] font-semibold antialiased">
                        Empty Cart
                      </p>
                    </span>
                  </div>
                  <ul className="cart-items list-none flex flex-col justify-normal gap-1 w-full h-full max-h-40 overflow-auto mr-2 [scrollbar-width:thin]">
                    {Object.values(cartItems).map(
                      (item) =>
                        item.quantity > 0 && (
                          <CartItem key={item.id} item={item} />
                        )
                    )}
                  </ul>
                </div>
                <div className="details flex flex-col gap-1 text-left">
                  <h6 className="font-inter antialiased text-xs font-semibold mb-2 pb-1 border-b border-[#696969]">
                    Payment details
                  </h6>
                  <div className="subtotal flex justify-between mb-1">
                    <p className="font-inter antialiased font-normal text-sm text-[#696969]">
                      Order
                    </p>
                    <p className="font-inter antialiased font-normal text-sm text-[#696969]">
                      ${subtotal(Object.values(cartItems)).toFixed(2)}
                    </p>
                  </div>
                  <div className="delivery flex justify-between mb-1 pb-2 border-b border-[#696969]">
                    <p className="font-inter font-normal text-sm text-[#696969] antialiased">
                      Delivery Fee
                    </p>
                    <p className="font-inter font-normal text-sm text-[#696969] antialiased bold">
                      ${deliveryFee}
                    </p>
                  </div>
                  <div className="total flex justify-between mb-1">
                    <p className="font-inter font-bold text-sm text-[#696969] antialiased">
                      Total
                    </p>
                    <p className="font-inter font-bold text-sm text-[#696969] antialiased bold">
                      $
                      {total(
                        parseFloat(
                          subtotal(Object.values(cartItems)).toFixed(2)
                        ),
                        deliveryFee
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="w-full max-w-[400px] md:mt-4">
                  <button
                    type="button"
                    onClick={handleGenerateQRCode}
                    disabled={!isValid}
                    className={`w-full cursor-pointer font-inter text-sm md:text-base bg-[#408BFC] text-[#ffffff] rounded-lg flex items-center justify-center p-2 px-4 border border-solid border-transparent text-center transition-all duration-300 ease-in-out font-semibold antialiased ${
                      !isValid ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    Generate Payment QR Code
                  </button>
                  {qrCodeData && (
                    <div className="qr-code mt-4 flex justify-center">
                      <QRCodeSVG value={qrCodeData} size={128} />
                    </div>
                  )}
                </div>
                <Link
                  href="/#products"
                  className="capitalize max-md:hidden text-sm md:text-base antialiased font-poppins w-full max-w-[400px] no-underline md:absolute bottom-2 left-0 bg-[#408bfc] text-[#ffffff] font-normal cursor-pointer p-2 rounded-lg text-center transition-all duration-300 ease-in-out"
                  onClick={() => setCartModalOpen(false)}
                >
                  Return to Shopping
                </Link>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="payment-info bg-[#EDF2F2] p-1 md:p-2 flex flex-col rounded-lg w-full h-max gap-6 placeholder:text-xs placeholder:opacity-50"
              >
                <div className="name-email w-full max-w-full flex gap-4 flex-col">
                  <h3 className="font-inter w-full text-base font-bold antialiased">
                    Payment Information
                  </h3>
                  <div className="name-inputs w-full flex flex-col gap-4 justify-between">
                    <div className="w-full">
                      <input
                        type="text"
                              className="w-full px-3 py-2 max-lg:text-base max-md:text-sm max-sm:text-xs !bg-background-primary !text-foreground-sub-primary text-input border border-solid border-blue-500/50 rounded-lg outline-0 font-bai_jamjuree font-normal text-lg transition-colors duration-[0s]"
                        placeholder="First name"
                        {...register("firstName")}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div className="w-full">
                      <input
                        type="text"
                              className="w-full px-3 py-2 max-lg:text-base max-md:text-sm max-sm:text-xs !bg-background-primary !text-foreground-sub-primary text-input border border-solid border-blue-500/50 rounded-lg outline-0 font-bai_jamjuree font-normal text-lg transition-colors duration-[0s]"
                        placeholder="Last name"
                        {...register("lastName")}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <input
                              className="w-full px-3 py-2 max-lg:text-base max-md:text-sm max-sm:text-xs !bg-background-primary !text-foreground-sub-primary text-input border border-solid border-blue-500/50 rounded-lg outline-0 font-bai_jamjuree font-normal text-lg transition-colors duration-[0s]"

                      type="email"
                      placeholder="Enter your email address"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="payment-method flex gap-1 flex-col">
                  <h3 className="font-poppins antialiased mb-1 font-bold text-base text-[#191C1F]"></h3>
                  <div className="flex items-center w-full gap-4">
                    <div className="w-full flex flex-col gap-1">
                      <div className="w-full rounded flex items-center bg-[#ffffff] cursor-pointer border border-solid border-[#E6E9EC]">
                      <select
                      className='w-full max-lg:text-base max-md:text-sm max-sm:text-xs bg-background-primary text-foreground-secondary border border-solid border-blue-500/50 rounded-lg outline-0 font-bai_jamjuree font-normal text-lg px-4 py-2'
                        {...register("currency")}
                      >
                        {/* <option disabled defaultValue={"Select Currency"}>
                          Select Currency
                        </option> */}
                        <option value="USDT">USDT</option>
                        <option value="BNB">BNB</option>
                      </select>
                    </div>
                    {errors.currency && (
                      <p className="text-red-500 text-xs">
                        {errors.currency.message}
                      </p>
                    )}
                    </div>
                    <div>
                      <input
                        type="number"
                        step="0.01"
                        className="antialiased placeholder:text-xs placeholder:opacity-50 font-poppins w-full border border-solid border-[#E6E9EC] p-3 rounded-lg text-xs bg-[#FFFFFF] outline-none appearance-none"
                        placeholder="Payment Amount"
                        {...register("amount", { valueAsNumber: true })}
                        readOnly
                      />
                      {errors.amount && (
                        <p className="text-red-500 text-xs">
                          {errors.amount.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="shipping-info flex flex-col gap-2 antialiased">
                  <h3 className="font-poppins antialiased mb-1 font-bold text-base text-[#191C1F]">
                    Shipping Information
                  </h3>
                  <textarea
                    rows={3}
                              className="px-3 max-lg:text-base max-md:text-sm max-sm:text-xs text-textarea bg-background-primary text-foreground-sub-secondary border border-solid border-blue-500/50 rounded-lg outline-0 font-bai_jamjuree font-normal text-lg"

                    placeholder="Address"
                    {...register("address")}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs">
                      {errors.address.message}
                    </p>
                  )}
                  <button
                    className={`cursor-pointer font-inter text-sm md:text-base bg-[#408BFC] text-[#ffffff] rounded-lg px-4 py-2 flex items-center justify-center border border-solid border-transparent text-center transition-all duration-300 ease-in-out font-semibold antialiased ${
                      !isValid || !qrCodeData
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    type="submit"
                    disabled={!isValid || !qrCodeData}
                  >
                    Pay Now
                  </button>
                  <div className="policy flex flex-col items-center gap-3">
                    <p className="font-poppins antialiased font-normal mb-1 text-center text-xs text-[#1E1E1EBA]">
                      By checking out you agree with our{" "}
                      <Link
                        className="font-inter antialiased underline text-[#408BFC]"
                        href="/error404"
                      >
                        Terms of Service
                      </Link>{" "}
                      and confirm that you have read our{" "}
                      <Link
                        className="font-inter antialiased underline text-[#408BFC]"
                        href="/error404"
                      >
                        Privacy Policy
                      </Link>
                      . You can cancel recurring payment at any time
                    </p>
                    <div className="assurances antialiased flex flex-col md:flex-row justify-center gap-2">
                      <span className="antialiased flex flex-col items-center gap-1 font-poppins">
                        <ImageWrapper
                          className="antialiased w-[0.7rem] aspect-square"
                          sourceUrl="/images/moneyback.png"
                          alternativeText="moneyback guarantee"
                        />
                        <p className="antialiased font-poppins font-semibold mb-1 text-center text-xs text-[#1E1E1EBA]">
                          30-Days Money Back Guarantee
                        </p>
                      </span>
                      <span className="antialiased flex flex-col items-center gap-1 font-poppins">
                        <ImageWrapper
                          className="antialiased w-[0.7rem] aspect-square"
                          sourceUrl="/images/encrypted.png"
                          alternativeText="encrypted icon"
                        />
                        <p className="antialiased font-poppins font-semibold mb-1 text-center text-xs text-[#1E1E1EBA]">
                          Encrypted And Secured Payment
                        </p>
                      </span>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {Object.keys(cartItems).length === 0 && (
              <div
                className={`cart-empty-state absolute w-full h-full inset-0 top-0 left-0 rounded-lg bg-white flex flex-col items-center justify-center`}
              >
                <ImageWrapper
                  className="w-[7%] mb-[0.2rem]"
                  sourceUrl="/images/emptycart.png"
                  alternativeText="empty cart icon"
                />
                <p className="font-inter text-xs mb-4 antialiased">
                  Your cart is empty
                </p>
                <Link
                  className="font-inter antialiased no-underline flex items-center justify-center text-xs w-40 h-8 bg-[#408bfc] outline-none text-white rounded-lg cursor-pointer text-center transition-all duration-300 ease-in-out"
                  href="/#products"
                  onClick={() => setCartModalOpen(false)}
                >
                  Continue shopping
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
      {isPending && (
        <PaymentPendingModal
          qrCodeData={qrCodeData as string}
          amount={amount}
          currency={formData.currency}
        />
      )}
      {paymentData && isPaymentSuccess && (
        <PaymentSuccessModal
          onClose={handlePaymentSuccess}
          transactionId={paymentData.transactionId}
          amount={paymentData.amount}
          currency={paymentData.currency}
        />
      )}
    </>
  );
};

export default CartModal;

// const CartModal: React.FC = () => {
//   const {
//     cartItems,
//     setCartModalOpen,
//     clearCart,
//     subtotal,
//     total,
//     deliveryFee,
//     applyDiscount,
//     discountAmount,
//   } = useCartStore();
//   const queryClient = useQueryClient();
//   const [couponCode, setCouponCode] = useState('');
//   const [qrCodeData, setQrCodeData] = useState<string | null>(null);
//   const [paymentData, setPaymentData] = useState<PaymentResponse | null>(null);
//   const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isValid },
//     setValue,
//     watch,
//   } = useForm<CheckoutFormData>({
//     resolver: zodResolver(checkoutFormSchema),
//     defaultValues: {
//       amount: total(subtotal(Object.values(cartItems)), deliveryFee),
//       currency: 'USDT',
//     },
//   });

//   const formData = watch();
//   const amount = formData.amount;

//   // Update amount when cart or discount changes
//   const currentSubtotal = subtotal(Object.values(cartItems));
//   if (amount !== total(currentSubtotal, deliveryFee)) {
//     setValue('amount', total(currentSubtotal, deliveryFee));
//   }

//   const { mutate, isPending } = useMutation<PaymentResponse, Error, { amount: number; currency: 'USDT' | 'BNB' }>({
//     mutationFn: processPayment,
//     onSuccess: (data: PaymentResponse) => {
//       setPaymentData(data);
//       setIsPaymentSuccess(true);
//       console.log(data);
//       // setCartModalOpen(false);
//       // setOrderPlacedModalOpen(true);
//     },
//     onError: () => {
//       alert('Payment processing failed. Please try again.');
//     },
//   });

//   const handleGenerateQRCode = () => {
//     if (!isValid) {
//       alert('Please fill out the payment information form correctly.');
//       return;
//     }
//     const walletAddresses = {
//       USDT: '0x1234567890abcdef1234567890abcdef12345678',
//       BNB: 'bnb1xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
//     };
//     setQrCodeData(`crypto:${walletAddresses[formData.currency]}?amount=${formData.amount}`);
//   };

//   const handleApplyDiscount = () => {
//     applyDiscount(couponCode);
//     const { discountAmount } = useCartStore.getState();
//     if (discountAmount > 0) {
//       const currentSubtotal = subtotal(Object.values(cartItems));
//       setValue('amount', total(currentSubtotal, deliveryFee));
//       alert('Discount applied successfully!');
//     } else {
//       alert('Invalid discount code');
//     }
//   };

//   const handlePaymentSuccess = (state: boolean) => {
//     setIsPaymentSuccess(state);
//   }

//   const onSubmit = (data: CheckoutFormData) => {
//     if (!qrCodeData) {
//       alert('Please generate the QR code before proceeding with payment.');
//       return;
//     }
//     mutate({ amount: data.amount, currency: data.currency });
//   };

//   console.log(paymentData);

//   return (
//     <>
//     {!isPaymentSuccess &&
//       <div
//         id="checkout-modal"
//         className="checkout-modal fixed z-50 left-0 top-0 flex w-full h-full overflow-hidden bg-[rgba(0,0,0,0.4)]"
//       >
//         <div className="modal-content-wrapper container m-auto bg-[#fefefe] p-4 relative max-[400px]:w-[95%] w-[90%] md:w-full max-w-[700px] flex justify-between rounded-lg h-[60vh] sm:h-[70vh] will-change-[transform]">
//           <button
//             onClick={() => setCartModalOpen(false)}
//             className="z-10 hover:scale-110 absolute right-0 transform -translate-x-[12.5%] -translate-y-[170%] rotate-90 cursor-pointer transition-all duration-1000 ease-in-out hover:-translate-x-[12.5%] hover:rotate-[45deg] top-4 shadow-xl rounded-full p-1 bg-black group"
//           >
//             <X className="group-hover:scale-125 transition-all duration-500 h-5 w-5 text-white" />
//           </button>
//           <div className="modal-content container bg-[#fefefe] m-auto pt-4 pb-4 rounded-lg fixed inset-0 top-[2.5%] left-0 w-[95%] grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center md:items-start overflow-x-hidden overflow-y-auto h-[95%] [scrollbar-width:thin] scrollbar-thumb-[#888] scrollbar-track-[#ffffff]">
//             <div className="product-details relative h-full flex flex-col gap-6">
//               <div className="cart flex w-full flex-col gap-4">
//                 <div className="heading flex gap-4 w-full justify-between mb-4">
//                   <h2 className="font-inter text-sm text-left antialiased">Cart Details</h2>
//                   <span
//                     className="empty-cart font-inter antialiased flex items-center cursor-pointer text-end"
//                     onClick={() => clearCart(queryClient)}
//                   >
//                     <ImageWrapper
//                       className="w-[0.8rem]"
//                       sourceUrl="/images/clear-cart-btn.png"
//                       alternativeText="clear cart icon"
//                     />
//                     <p className="font-inter text-xs text-[#FE7171] font-semibold antialiased">Empty Cart</p>
//                   </span>
//                 </div>
//                 <ul className="cart-items list-none flex flex-col justify-normal gap-1 w-full h-full max-h-40 overflow-auto mr-2 [scrollbar-width:thin]">
//                   {Object.values(cartItems).map(
//                     (item) => item.quantity > 0 && <CartItem key={item.id} item={item} />
//                   )}
//                 </ul>
//               </div>
//               <div className="details flex flex-col gap-1 text-left">
//                 <h6 className="font-inter antialiased text-xs font-semibold mb-2 pb-1 border-b border-[#696969]">
//                   Payment details
//                 </h6>
//                 <div className="subtotal flex justify-between mb-1">
//                   <p className="font-inter antialiased font-normal text-sm text-[#696969]">Order</p>
//                   <p className="font-inter antialiased font-normal text-sm text-[#696969]">
//                     ${subtotal(Object.values(cartItems)).toFixed(2)}
//                   </p>
//                 </div>
//                 <div className="delivery flex justify-between mb-1 pb-2 border-b border-[#696969]">
//                   <p className="font-inter font-normal text-sm text-[#696969] antialiased">Delivery Fee</p>
//                   <p className="font-inter font-normal text-sm text-[#696969] antialiased bold">${deliveryFee}</p>
//                 </div>
//                 {discountAmount > 0 && (
//                   <div className="discount flex justify-between mb-1">
//                     <p className="font-inter font-normal text-sm text-[#696969] antialiased">Discount</p>
//                     <p className="font-inter font-normal text-sm text-[#696969] antialiased bold">-${discountAmount.toFixed(2)}</p>
//                   </div>
//                 )}
//                 <div className="total flex justify-between mb-1">
//                   <p className="font-inter font-bold text-sm text-[#696969] antialiased">Total</p>
//                   <p className="font-inter font-bold text-sm text-[#696969] antialiased bold">
//                     ${total(subtotal(Object.values(cartItems)), deliveryFee).toFixed(2)}
//                   </p>
//                 </div>
//               </div>
//               <div className="coupon flex gap-2 flex-col max-w-[250px]">
//                 <p className="font-inter text-[#F80505] font-normal text-xs antialiased">Do you have a coupon code?</p>
//                 <div className="add-code flex flex-wrap flex-row gap-1 w-full max-w-[235px]">
//                   <input
//                     type="text"
//                     className="coupon-code w-[162px] font-poppins rounded-sm px-2 border border-solid border-[#E6E9EC] text-[#333333] text-xs bg-none outline-none antialiased"
//                     placeholder="Discount code"
//                     value={couponCode}
//                     onChange={(e) => setCouponCode(e.target.value)}
//                   />
//                   <span
//                     className="apply-discount font-inter bg-[#408BFC] text-[#ffffff] rounded-lg px-4 flex items-center justify-center py-1 w-16 border border-solid border-transparent text-xs text-center transition-all duration-300 ease-in-out font-semibold antialiased"
//                     onClick={handleApplyDiscount}
//                   >
//                     Apply
//                   </span>
//                 </div>
//               </div>
//               <div className="w-full max-w-[400px] md:mt-auto md:mb-37">
//                 <button
//                   type="button"
//                   onClick={handleGenerateQRCode}
//                   disabled={!isValid}
//                   className={`w-full cursor-pointer font-inter text-sm md:text-base bg-[#408BFC] text-[#ffffff] rounded-lg flex items-center justify-center p-2 px-4 border border-solid border-transparent text-center transition-all duration-300 ease-in-out font-semibold antialiased ${
//                     !isValid ? 'opacity-50 cursor-not-allowed' : ''
//                   }`}
//                 >
//                   Generate Payment QR Code
//                 </button>
//                 {qrCodeData && (
//                   <div className="qr-code mt-4 flex justify-center">
//                     <QRCodeSVG value={qrCodeData} size={128} />
//                   </div>
//                 )}
//               </div>
//               <Link
//                 href="/#products"
//                 className="max-md:hidden text-sm md:text-base antialiased font-poppins w-full max-w-[400px] no-underline md:absolute bottom-2 left-0 bg-[#408bfc] text-[#ffffff] font-normal cursor-pointer p-2 rounded-lg text-center transition-all duration-300 ease-in-out"
//                 onClick={() => setCartModalOpen(false)}
//               >
//                 Continue Shopping
//               </Link>
//             </div>
//             <form
//               onSubmit={handleSubmit(onSubmit)}
//               className="payment-info bg-[#EDF2F2] p-1 md:p-2 flex flex-col rounded-lg w-full h-max gap-6 placeholder:text-xs placeholder:opacity-50"
//             >
//               <div className="name-email w-full flex gap-1 flex-col">
//                 <h3 className="font-inter w-full text-base font-bold mb-1 antialiased">Payment Information</h3>
//                 <div className="name-inputs w-full grid grid-cols-2 gap-1 justify-between mb-1">
//                   <div>
//                     <input
//                       type="text"
//                       className="placeholder:text-xs placeholder:opacity-50 firstname font-poppins antialiased border border-solid border-[#E6E9EC] p-3 rounded-lg text-xs bg-[#FFFFFF] outline-none appearance-none"
//                       placeholder="First name"
//                       {...register('firstName')}
//                     />
//                     {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
//                   </div>
//                   <div>
//                     <input
//                       type="text"
//                       className="antialiased placeholder:text-xs placeholder:opacity-50 lastname font-poppins border border-solid border-[#E6E9EC] p-3 rounded-lg text-xs bg-[#FFFFFF] outline-none appearance-none"
//                       placeholder="Last name"
//                       {...register('lastName')}
//                     />
//                     {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName.message}</p>}
//                   </div>
//                 </div>
//                 <div>
//                   <input
//                     className="antialiased placeholder:text-xs placeholder:opacity-50 font-poppins w-full border border-solid border-[#E6E9EC] p-3 rounded-lg text-xs bg-[#FFFFFF] outline-none appearance-none"
//                     type="email"
//                     placeholder="Enter your email address"
//                     {...register('email')}
//                   />
//                   {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
//                 </div>
//               </div>
//               <div className="payment-method flex gap-1 flex-col">
//                 <h3 className="font-poppins antialiased mb-1 font-bold text-base text-[#191C1F]">Payment Method</h3>
//                 <div className="select w-full rounded p-1 h-6 flex items-center bg-[#ffffff] cursor-pointer border border-solid border-[#E6E9EC]">
//                   <select
//                     className="w-[98%] antialiased border-none outline-none text-xs font-light text-[#989898] cursor-pointer font-poppins"
//                     {...register('currency')}
//                   >
//                     <option value="USDT">USDT</option>
//                     <option value="BNB">BNB</option>
//                   </select>
//                 </div>
//                 {errors.currency && <p className="text-red-500 text-xs">{errors.currency.message}</p>}
//                 <div>
//                   <input
//                     type="number"
//                     step="0.01"
//                     className="antialiased placeholder:text-xs placeholder:opacity-50 font-poppins w-full border border-solid border-[#E6E9EC] p-3 rounded-lg text-xs bg-[#FFFFFF] outline-none appearance-none"
//                     placeholder="Payment Amount"
//                     {...register('amount', { valueAsNumber: true })}
//                     readOnly
//                   />
//                   {errors.amount && <p className="text-red-500 text-xs">{errors.amount.message}</p>}
//                 </div>
//               </div>
//               <div className="shipping-info flex flex-col gap-2 antialiased">
//                 <h3 className="font-poppins antialiased mb-1 font-bold text-base text-[#191C1F]">Shipping Information</h3>
//                 <div>
//                   <textarea
//                     rows={4}
//                     className="addy antialiased placeholder:text-xs placeholder:opacity-50 font-poppins border border-solid border-[#E6E9EC] p-1 rounded-lg text-xs bg-[#FFFFFF] outline-none appearance-none"
//                     placeholder="Address"
//                     {...register('address')}
//                   />
//                   {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
//                 </div>
//                 <button
//                   className={`cursor-pointer font-inter text-sm md:text-base bg-[#408BFC] text-[#ffffff] rounded-lg px-4 py-2 flex items-center justify-center border border-solid border-transparent text-center transition-all duration-300 ease-in-out font-semibold antialiased ${
//                     !isValid || !qrCodeData ? 'opacity-50 cursor-not-allowed' : ''
//                   }`}
//                   type="submit"
//                   disabled={!isValid || !qrCodeData}
//                 >
//                   Pay Now
//                 </button>
//                 <div className="policy flex flex-col items-center gap-3">
//                   <p className="font-poppins antialiased font-normal mb-1 text-center text-xs text-[#1E1E1EBA]">
//                     By checking out you agree with our{' '}
//                     <Link className="font-inter antialiased underline text-[#408BFC]" href="/error404">
//                       Terms of Service
//                     </Link>{' '}
//                     and confirm that you have read our{' '}
//                     <Link className="font-inter antialiased underline text-[#408BFC]" href="/error404">
//                       Privacy Policy
//                     </Link>
//                     . You can cancel recurring payment at any time
//                   </p>
//                   <div className="assurances antialiased flex flex-col md:flex-row justify-center gap-2">
//                     <span className="antialiased flex flex-col items-center gap-1 font-poppins">
//                       <ImageWrapper
//                         className="antialiased w-[0.7rem] aspect-square"
//                         sourceUrl="/images/moneyback.png"
//                         alternativeText="moneyback guarantee"
//                       />
//                       <p className="antialiased font-poppins font-semibold mb-1 text-center text-xs text-[#1E1E1EBA]">
//                         30-Days Money Back Guarantee
//                       </p>
//                     </span>
//                     <span className="antialiased flex flex-col items-center gap-1 font-poppins">
//                       <ImageWrapper
//                         className="antialiased w-[0.7rem] aspect-square"
//                         sourceUrl="/images/encrypted.png"
//                         alternativeText="encrypted icon"
//                       />
//                       <p className="antialiased font-poppins font-semibold mb-1 text-center text-xs text-[#1E1E1EBA]">
//                         Encrypted And Secured Payment
//                       </p>
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </form>
//           </div>
//           {Object.keys(cartItems).length === 0 && (
//             <div className="cart-empty-state absolute w-full h-full inset-0 top-0 left-0 rounded-lg bg-white flex flex-col items-center justify-center">
//               <ImageWrapper
//                 className="w-[7%] mb-[0.2rem]"
//                 sourceUrl="/images/emptycart.png"
//                 alternativeText="empty cart icon"
//               />
//               <p className="font-inter text-xs mb-4 antialiased">Your cart is empty</p>
//               <Link
//                 className="font-inter antialiased no-underline flex items-center justify-center text-xs w-40 h-8 bg-[#408bfc] outline-none text-white rounded-lg cursor-pointer text-center transition-all duration-300 ease-in-out"
//                 href="/#products"
//                 onClick={() => setCartModalOpen(false)}
//               >
//                 Continue shopping
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     }
//       {isPending && (
//         <PaymentPendingModal
//           qrCodeData={qrCodeData as string}
//           amount={amount}
//           currency={formData.currency}
//         />
//       )}
//       {paymentData && isPaymentSuccess && (
//         <PaymentSuccessModal
//         onClose={handlePaymentSuccess}
//           transactionId={paymentData.transactionId}
//           amount={paymentData.amount}
//           currency={paymentData.currency}
//         />
//       )}
//     </>
//   );
// };
