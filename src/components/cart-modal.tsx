"use client";
import useCartStore from "./store/cart-store";
import CartItem from "./cart-item";
import { X } from "lucide-react";
import Link from "next/link";
import ImageWrapper from "./image-wrapper";

const CartModal: React.FC = () => {
  const {
    cartItems,
    setCartModalOpen,
    clearCart,
    setOrderPlacedModalOpen,
    subtotal,
    total,
    deliveryFee,
  } = useCartStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCartModalOpen(false);
    setOrderPlacedModalOpen(true);
  };

  return (
    <section
      id="checkout-modal"
      className={`checkout-modal fixed z-50 left-0 top-0 flex w-full h-full overflow-hidden bg-[rgba(0,0,0,0.4)]`}
    >
      <div className="modal-content-wrapper container m-auto bg-[#fefefe] p-4 relative max-[400px]:w-[95%] w-[90%] md:w-full max-w-[700px] flex justify-between rounded-lg h-[60vh] sm:h-[70vh] will-change-[transform]">
        <button
          onClick={() => setCartModalOpen(false)}
          className="z-10 hover:scale-110 absolute right-0 transform -translate-x-[12.5%] -translate-y-[170%] rotate-90 cursor-pointer transition-all duration-1000 ease-in-out hover:-translate-x-[12.5%] hover:rotate-[45deg] top-4 shadow-xl rounded-full p-1 bg-black group"
        >
          <X className="group-hover:scale-125 transition-all duration-500 h-5 w-5 text-white" />
        </button>
        <div
          className="modal-content container bg-[#fefefe] m-auto pt-4 pb-4 rounded-lg fixed inset-0 top-[2.5%] left-0 w-[95%] grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center md:items-start overflow-x-hidden overflow-y-auto h-[95%] [scrollbar-width:thin] scrollbar-thumb-[#888] scrollbar-track-[#ffffff]"
          onSubmit={handleSubmit}
        >
          <div className="product-details relative h-full flex flex-col gap-6">
            <div className="cart flex w-full flex-col gap-4">
              <div className="heading flex gap-4 w-full justify-between mb-4">
                <h2 className="font-inter text-sm text-left antialiased">
                  Cart Details
                </h2>
                <span
                  className="empty-cart font-inter antialiased flex items-center cursor-pointer text-end"
                  onClick={clearCart}
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
                    item.quantity > 0 && <CartItem key={item.id} item={item} />
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
                    parseFloat(subtotal(Object.values(cartItems)).toFixed(2)),
                    deliveryFee
                  ).toFixed(2)}
                </p>
              </div>
            </div>
            <div className="w-full max-w-[400px] md:mt-auto md:mb-37">
              <button className="w-full cursor-pointer font-inter text-sm md:text-base bg-[#408BFC] text-[#ffffff] rounded-lg flex items-center justify-center p-2 px-4 border border-solid border-transparent text-center transition-all duration-300 ease-in-out font-semibold antialiased">
                Generate Payment QR Code
              </button>
            </div>
            <Link
              href="/#products"
              className="max-md:hidden text-sm md:text-base antialiased font-poppins w-full max-w-[400px] no-underline md:absolute bottom-2 left-0 bg-[#408bfc] text-[#ffffff] font-normal cursor-pointer p-2 rounded-lg text-center transition-all duration-300 ease-in-out"
              onClick={() => setCartModalOpen(false)}
            >
              Continue Shopping
            </Link>
          </div>
          <form className="payment-info bg-[#EDF2F2] p-1 md:p-2 flex flex-col rounded-lg w-full h-max gap-6 placeholder:text-xs placeholder:opacity-50">
            <div className="name-email w-full flex gap-1 flex-col">
              <h3 className="font-inter w-full text-base font-bold mb-1 antialiased">
                Payment Information
              </h3>
              <div className="name-inputs w-full grid grid-cols-2 gap-1 justify-between mb-1">
                <input
                  type="text"
                  className="placeholder:text-xs placeholder:opacity-50 firstname font-poppins antialiased border border-solid border-[#E6E9EC] p-3 rounded-lg text-xs bg-[#FFFFFF] outline-none appearance-none"
                  placeholder="First name"
                  required
                />
                <input
                  type="text"
                  className="antialiased placeholder:text-xs placeholder:opacity-50 lastname font-poppins border border-solid border-[#E6E9EC] p-3 rounded-lg text-xs bg-[#FFFFFF] outline-none appearance-none"
                  placeholder="Last name"
                  required
                />
              </div>
              <input
                className="antialiased placeholder:text-xs placeholder:opacity-50 font-poppins w-full border border-solid border-[#E6E9EC] p-3 rounded-lg text-xs bg-[#FFFFFF] outline-none appearance-none"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
            </div>
            <div className="payment-method flex gap-1 flex-col">
              <h3 className="font-poppins antialiased mb-1 font-bold text-base text-[#191C1F]">
                Payment Method
              </h3>
              {/* <div className="select-processor font-inter antialiased grid gap-4 grid-cols-2">
                  {[
                    "paypal",
                    "stripe",
                    "paystack",
                    "flutterwave",
                    "razorpay",
                  ].map((method) => (
                    <div
                      key={method}
                      className="select flex items-center cursor-pointer gap-1 rounded-lg p-1 w-full bg-[#ffffff]"
                    >
                      <label
                        className="flex gap-1 cursor-pointer"
                        htmlFor={method}
                      >
                        <input
                          className="placeholder:text-xs placeholder:opacity-50 cursor-pointer block font-['Kumbh_Sans',_sans-serif]"
                          type="radio"
                          name="payment-processor"
                          id={method}
                          required
                        />
                        <img
                          src={`/images/${method}.png`}
                          alt={method}
                        />
                      </label>
                    </div>
                  ))}
                </div> */}
            </div>
            <div className="shipping-info flex flex-col gap-2 antialiased">
              <h3 className="font-poppins antialiased mb-1 font-bold text-base text-[#191C1F]">
                Shipping Information
              </h3>
              <textarea
                name="address"
                rows={4}
                className="addy antialiased placeholder:text-xs placeholder:opacity-50 font-poppins border border-solid border-[#E6E9EC] p-1 rounded-lg text-xs bg-[#FFFFFF] outline-none appearance-none"
                placeholder="Address"
                required
              />
              <button
                className="cursor-pointer font-inter text-sm md:text-base bg-[#408BFC] text-[#ffffff] rounded-lg px-4 py-2 flex items-center justify-center border border-solid border-transparent text-center transition-all duration-300 ease-in-out font-semibold antialiased"
                type="submit"
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
    </section>
  );
};

export default CartModal;
