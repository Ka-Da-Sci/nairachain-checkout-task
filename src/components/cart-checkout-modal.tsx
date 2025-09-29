"use client";

import { ChangeEvent, useCallback, useEffect, useState } from "react";
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

// Component for rendering the cart checkout modal
const CartCheckoutModal = () => {
  const {
    cartItems,
    setCartModalOpen,
    clearCart,
    subtotal,
    total,
    deliveryFee,
    resetCartAfterPayment,
    setShowUtilityCardModal,
    setUtilityHoverCardProps,
  } = useCartStore();
  const queryClient = useQueryClient();
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  const [paymentData, setPaymentData] = useState<PaymentResponse | null>(null);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [closePendingPaymentModal, setClosePendingPaymentModal] =
    useState(false);

  // Initialize form with validation schema and default total amount
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
    },
  });

  // Watch form data for real-time updates
  const formData = watch();
  const amount = formData.amount;

  // Memoized function to generate QR code for payment
  const generateQrCodeHelperFun = useCallback(() => {
    if (!isValid) {
      setShowUtilityCardModal(true);
      setUtilityHoverCardProps(
        "Invalid Form Input",
        "Please fill out the payment information form correctly."
      );
      return;
    }
    const walletAddresses = {
      USDT: "0x1234567890abcdef1234567890abcdef12345678",
      BNB: "bnb1xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    };
    setQrCodeData(
      `crypto:${walletAddresses[formData.currency]}?amount=${formData.amount}`
    );
  }, [
    formData.amount,
    formData.currency,
    isValid,
    setShowUtilityCardModal,
    setUtilityHoverCardProps,
  ]);

  // Regenerate QR code when amount changes
  useEffect(() => {
    if (!qrCodeData) return;
    generateQrCodeHelperFun();
  }, [formData.amount, qrCodeData, generateQrCodeHelperFun]);

  // Update form amount when cart subtotal or delivery fee changes
  const currentSubtotal = subtotal(Object.values(cartItems));
  if (amount !== total(currentSubtotal, deliveryFee)) {
    setValue("amount", total(currentSubtotal, deliveryFee));
  }

  // Mutation to process payment via API
  const { mutate, isPending } = useMutation<
    PaymentResponse,
    Error,
    { amount: number; currency: "USDT" | "BNB" }
  >({
    mutationFn: processPayment,
    onSuccess: (data: PaymentResponse) => {
      setPaymentData(data);
      setIsPaymentSuccess(true);
      resetCartAfterPayment();
      console.log(data);
    },
    onError: () => {
      setShowUtilityCardModal(true);
      setUtilityHoverCardProps(
        "Error!",
        "Payment processing failed. Please try again."
      );
    },
  });

  // Handler to trigger QR code generation
  const handleGenerateQRCode = () => {
    generateQrCodeHelperFun();
  };

  // Handler to update QR code when currency changes
  const handleCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!qrCodeData) return;
    const selectedCurrency = e.target.value as "USDT" | "BNB";

    if (!isValid) {
      setShowUtilityCardModal(true);
      setUtilityHoverCardProps(
        "Invalid Form Inputs!",
        "Please fill out the payment information form correctly."
      );
      return;
    }

    const walletAddresses = {
      USDT: "0x1234567890abcdef1234567890abcdef12345678",
      BNB: "bnb1xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    };

    setQrCodeData(
      `crypto:${walletAddresses[selectedCurrency]}?amount=${formData.amount}`
    );
  };

  // Handler to update payment success state
  const handlePaymentSuccess = (state: boolean) => {
    setIsPaymentSuccess(state);
  };

  // Handler for form submission to process payment
  const onSubmit = (data: CheckoutFormData) => {
    if (!qrCodeData) {
      setShowUtilityCardModal(true);
      setUtilityHoverCardProps(
        "Action Needed!",
        "Please generate the QR code before proceeding with payment."
      );
      return;
    }
    mutate({ amount: data.amount, currency: data.currency });
  };

  // Handler to control closing of pending payment modal
  const handleOnClosePendingPaymentModal = (state: boolean) => {
    setClosePendingPaymentModal(state);
  };

  return (
    <>
      {/* Render checkout modal unless payment is successful */}
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
              {/* Cart details section */}
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

                {/* Payment summary section */}
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

                {/* QR code display section */}
                <div className="w-full max-w-[400px] md:mt-4">
                  {qrCodeData && (
                    <div className="qr-code w-full mt-4 flex flex-col gap-4 items-center justify-center">
                      <QRCodeSVG value={qrCodeData} size={128} />
                      <p className="text-center font-inter font-bold text-xs md:text-sm antialiased">
                        Scan the QR code to complete the payment of ${amount} in{" "}
                        {formData.currency}.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment information form */}
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

                  {/* Shipping address and payment method section */}
                  <div className="flex flex-col gap-2 antialiased">
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

                    {/* Payment currency selection */}
                    <div className="flex gap-1 flex-col">
                      <h3 className="font-poppins antialiased mb-1 font-bold text-base text-[#191C1F]"></h3>
                      <div className="flex items-center w-full gap-4">
                        <div className="w-full flex flex-col gap-1">
                          <div className="w-full rounded flex items-center bg-[#ffffff] cursor-pointer border border-solid border-[#E6E9EC]">
                            <select
                              className={`${
                                !formData.firstName ||
                                !formData.lastName ||
                                !formData.email ||
                                !formData.address
                                  ? "opacity-60 pointer-events-none"
                                  : "cursor-pointer"
                              } w-full max-lg:text-base max-md:text-sm max-sm:text-xs bg-background-primary text-foreground-secondary border border-solid border-blue-500/50 rounded-lg outline-0 font-bai_jamjuree font-normal text-lg px-4 py-2`}
                              {...register("currency", {
                                onChange: (e) => {
                                  handleCurrencyChange(e);
                                },
                              })}
                            >
                              <option value="Select Currency" hidden>
                                Select Currency
                              </option>
                              <option value="BNB">BNB</option>
                              <option value="USDT">USDT</option>
                            </select>
                          </div>
                          {errors.currency && (
                            <p className="text-red-500 text-xs">
                              {errors.currency.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Pay now or generate QR code button */}
                    {!!qrCodeData && (
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
                    )}
                    {!qrCodeData && (
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
                    )}

                    {/* Policy and assurance links */}
                    {qrCodeData && (
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
                    )}
                  </div>
                </div>
              </form>
            </div>

            {/* Empty cart state */}
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
                  Shop Now
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Render pending payment modal */}
      {isPending && !closePendingPaymentModal && (
        <PaymentPendingModal
          onClose={handleOnClosePendingPaymentModal}
          qrCodeData={qrCodeData as string}
          amount={amount}
          currency={formData.currency}
        />
      )}

      {/* Render payment success modal */}
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

export default CartCheckoutModal;
