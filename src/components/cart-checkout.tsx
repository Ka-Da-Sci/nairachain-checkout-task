// const CartCheckout = () => {
//   return (
//     <div>
//       <section
//         id="checkout-modal"
//         className="checkout-modal hidden fixed z-40 left-0 top-0 w-full h-full overflow-hidden bg-[rgba(0,_0,_0,_0.4)]"
//       >
//         <div className="modal-content-wrapper container m-auto bg-[#fefefe] p-4 relative w-[90%] md:w-full max-w-[700px] flex justify-between rounded-2xl h-[70vh] will-change-[transform]">
//           <img
//             src="./assets/images/close-circle-svgrepo-com (1).png"
//             alt=""
//             className="close-modal absolute w-6 top-0 right-0 transform -translate-x-[12.5%] -translate-y-[120%] rotate-90 cursor-pointer transition-all duration-500 ease-in-out hover:-translate-x-[12.5%] hover:-translate-y-full hover:-rotate-[270deg]"
//             id="close-modal"
//           />
//           <form className="modal-content container bg-[#fefefe] m-auto pt-4 pb-4 rounded-2xl fixed inset-0 top-[2.5%] left-0  w-[95%] grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center md:items-start overflow-x-hidden overflow-y-auto h-[95%] [scrollbar-width:thin] scrollbar-thumb-[#888] scrollbar-track-[#ffffff]">
//             <div className="product-details relative h-full flex flex-col gap-6">
//               <div className="cart flex w-full flex-col gap-4">
//                 <div className="heading flex gap-4 w-full justify-between mb-4">
//                   <h2 className="font-['Kumbh_Sans',_sans-serif] text-sm text-left antialiased">
//                     Cart Details
//                   </h2>
//                   <span
//                     className="empty-cart font-['Kumbh_Sans',_sans-serif] flex items-center cursor-pointer text-end"
//                     id="empty-cart"
//                   >
//                     <img
//                       className="w-[0.8rem]"
//                       src="./assets/images/ci_trash-empty.png"
//                       alt="empty-cart-icon"
//                     />
//                     <p className="font-['Kumbh_Sans',_sans-serif] text-xs text-[#FE7171] font-semibold antialiased">
//                       Empty Cart
//                     </p>
//                   </span>
//                 </div>
//                 <ul
//                   className="cart-items list-none flex flex-col justify-normal gap-1 w-full h-full max-h-40 overflow-auto mr-2 [scrollbar-width:thin]"
//                   id="cart-items"
//                 ></ul>
//               </div>
//               <div className="details flex flex-col gap-1 text-left">
//                 <h6 className="font-['Inter',_sans-serif] text-xs font-semibold mb-2 pb-1 border-b border-[#696969]">
//                   Payment details
//                 </h6>
//                 <div className="subtotal flex justify-between mb-1">
//                   <p className="font-['Inter',_sans-serif] font-normal text-sm text-[#696969]">
//                     Order
//                   </p>
//                   <p
//                     className="font-['Inter',_sans-serif] font-normal text-sm text-[#696969]"
//                     id="subtotal-price"
//                   ></p>
//                 </div>
//                 <div className="delivery flex justify-between mb-1 pb-2 border-b border-[#696969]">
//                   <p className="font-['Inter',_sans-serif] font-normal text-sm text-[#696969] antialiased">
//                     Delivery Fee
//                   </p>
//                   <p
//                     className="font-['Inter',_sans-serif] font-normal text-sm text-[#696969] antialiased bold"
//                     id="delivery-fee"
//                   >
//                     $5
//                   </p>
//                 </div>
//                 <div className="total flex justify-between mb-1">
//                   <p className="font-['Inter',_sans-serif] font-bold text-sm text-[#696969] antialiased">
//                     Total
//                   </p>
//                   <p
//                     className="font-['Inter',_sans-serif] font-bold text-sm text-[#696969] antialiased bold"
//                     id="total-price"
//                   ></p>
//                 </div>
//               </div>
//               <div className="coupon flex gap-2 flex-col max-w-[250px]">
//                 <p className="font-['Kumbh_Sans',_sans-serif] text-[#F80505] font-normal text-xs antialiased">
//                   Do you have a coupon code?
//                 </p>
//                 <div className="add-code flex flex-wrap flex-row gap-1 w-full max-w-[235px]">
//                   <input
//                     type="text"
//                     id="coupon-code"
//                     className="coupon-code w-[162px] font-['Nunito_Sans',_sans-serif] rounded-sm px-2 border border-solid border-[#E6E9EC] text-[#333333] text-xs bg-none outline-none antialiased"
//                     placeholder="Discount code"
//                   />
//                   <span
//                     className="apply-discount font-['Inter',_sans-serif] bg-[#408BFC] text-[#ffffff] rounded-lg px-4 flex items-center justify-center py-1 w-16 border border-solid border-transparent text-xs text-center transition-all duration-300 ease-in-out font-semibold antialiased"
//                     id="apply-discount"
//                   >
//                     Apply
//                   </span>
//                 </div>
//               </div>

//               <a
//                 href="./shop.html"
//                 className="back antialiased font-['Nunito_Sans',_sans-serif] w-full max-w-[235px] no-underline md:absolute bottom-2 left-0 bg-[#408bfc] text-[#ffffff] font-normal text-xs md:text-sm cursor-pointer p-1 rounded-md text-center transition-all duration-300 ease-in-out"
//                 id="back"
//               >
//                 Continue Shopping
//               </a>
//             </div>

//             <div className="payment-info bg-[#EDF2F2] p-1 md:p-2 flex flex-col rounded-lg w-full h-max gap-6 placeholder:text-xs placeholder:opacity-50">
//               <div className="name-email w-full flex gap-1 flex-col">
//                 <h3 className="font-['Kumbh_Sans',_sans-serif] w-full text-base font-bold mb-1 antialiased">
//                   Payment Information
//                 </h3>
//                 <div className="name-inputs w-full grid grid-cols-2 gap-1 justify-between mb-1">
//                   <input
//                     type="text"
//                     className="antialiased placeholder:text-xs placeholder:opacity-50 firstname font-['Nunito_Sans',_sans-serif] border border-solid border-[#E6E9EC] h-6 p-1 rounded text-xs bg-[#FFFFFF] outline-none appearance-none"
//                     placeholder="First name"
//                     required
//                   />
//                   <input
//                     type="text"
//                     className="antialiased placeholder:text-xs placeholder:opacity-50 lastname font-['Nunito_Sans',_sans-serif] border border-solid border-[#E6E9EC] h-6 p-1 rounded text-xs bg-[#FFFFFF] outline-none appearance-none"
//                     placeholder="Last name"
//                     required
//                   />
//                 </div>
//                 <input
//                   className="antialiased placeholder:text-xs placeholder:opacity-50 font-['Nunito_Sans',_sans-serif] w-full border border-solid border-[#E6E9EC] h-6 p-1 rounded text-xs bg-[#FFFFFF] outline-none appearance-none"
//                   type="email"
//                   name="email"
//                   placeholder="Enter your email address"
//                   required
//                 />
//               </div>
//               <div className="payment-method flex gap-1 flex-col">
//                 <h3 className="font-['Nunito_Sans',_sans-serif] mb-1 font-bold text-base tetxt-[#191C1F] antialiased">
//                   Payment Method
//                 </h3>
//                 <div className="select-processor font-['Kumbh_Sans',_sans-serif] grid gap-4 grid-cols-2">
//                   <div className="select flex items-center cursor-pointer gap-1 rounded p-1 w-full bg-[#ffffff]">
//                     <label
//                       className="flex gap-1 cursor-pointer"
//                       htmlFor="paypal"
//                     >
//                       <input
//                         className="placeholder:text-xs placeholder:opacity-50 cursor-pointer block font-['Kumbh_Sans',_sans-serif]"
//                         type="radio"
//                         name="payment-processor"
//                         id="paypal"
//                         required
//                       />
//                       <img src="./assets/images/paypal.png" alt="PayPal" />
//                     </label>
//                   </div>
//                   <div className="select flex items-center cursor-pointer gap-1 rounded p-1 w-full bg-[#ffffff]">
//                     <label
//                       className="flex gap-1 cursor-pointer"
//                       htmlFor="stripe"
//                     >
//                       <input
//                         className="placeholder:text-xs placeholder:opacity-50 cursor-pointer block font-['Kumbh_Sans',_sans-serif]"
//                         type="radio"
//                         name="payment-processor"
//                         id="stripe"
//                         required
//                       />
//                       <img src="./assets/images/stripe.png" alt="Stripe" />
//                     </label>
//                   </div>
//                   <div className="select flex items-center cursor-pointer gap-1 rounded p-1 w-full bg-[#ffffff]">
//                     <label
//                       className="flex gap-1 cursor-pointer"
//                       htmlFor="paystack"
//                     >
//                       <input
//                         className="placeholder:text-xs placeholder:opacity-50 cursor-pointer block font-['Kumbh_Sans',_sans-serif]"
//                         type="radio"
//                         name="payment-processor"
//                         id="paystack"
//                         required
//                       />
//                       <img src="./assets/images/paystack.png" alt="Paystack" />
//                     </label>
//                   </div>
//                   <div className="select flex items-center cursor-pointer gap-1 rounded p-1 w-full bg-[#ffffff]">
//                     <label
//                       className="flex gap-1 cursor-pointer"
//                       htmlFor="flutterwave"
//                     >
//                       <input
//                         className="placeholder:text-xs placeholder:opacity-50 cursor-pointer block font-['Kumbh_Sans',_sans-serif]"
//                         type="radio"
//                         name="payment-processor"
//                         id="flutterwave"
//                         required
//                       />
//                       <img
//                         src="./assets/images/flutterwave.png"
//                         alt="Flutterwave"
//                       />
//                     </label>
//                   </div>
//                   <div className="select flex items-center cursor-pointer gap-1 rounded p-1 w-full bg-[#ffffff]">
//                     <label
//                       className="flex gap-1 cursor-pointer"
//                       htmlFor="razorpay"
//                     >
//                       <input
//                         className="placeholder:text-xs placeholder:opacity-50 cursor-pointer block font-['Kumbh_Sans',_sans-serif]"
//                         type="radio"
//                         name="payment-processor"
//                         id="razorpay"
//                         required
//                       />
//                       <img src="./assets/images/razorpay.png" alt="Razorpay" />
//                     </label>
//                   </div>
//                 </div>
//               </div>
//               <div className="shipping-info flex flex-col gap-2 antialiased">
//                 <h3 className="font-['Nunito_Sans',_sans-serif] mb-1 font-bold text-base tetxt-[#191C1F] antialiased">
//                   Shipping Information
//                 </h3>
//                 <textarea
//                   name="address"
//                   id="address"
//                   rows={4}
//                   className="addy antialiased placeholder:text-xs placeholder:opacity-50 font-['Nunito_Sans',_sans-serif] border border-solid border-[#E6E9EC] p-1 rounded text-xs bg-[#FFFFFF] outline-none appearance-none"
//                   placeholder="Address"
//                   required
//                 ></textarea>
//                 <div className="container flex items-center justify-between mb-1">
//                   <div className="select w-full rounded p-1 h-6 flex items-center bg-[#ffffff] cursor-pointer border border-solid border-[#E6E9EC]">
//                     <select
//                       className="w-[98%] antialiased border-none outline-none text-xs font-light text-[##989898] cursor-pointer font-['Nunito_Sans']"
//                       name=""
//                       id="country"
//                       required
//                     >
//                       <option value="" selected disabled>
//                         Country
//                       </option>
//                     </select>
//                   </div>
//                   <div className="select w-full rounded p-1 h-6 flex items-center bg-[#ffffff] cursor-pointer border border-solid border-[#E6E9EC]">
//                     <select
//                       className="w-[98%] antialiased border-none outline-none text-xs font-light text-[##989898] cursor-pointer font-['Nunito_Sans']"
//                       name=""
//                       id="region"
//                       required
//                     >
//                       <option value="" selected disabled>
//                         Region / State
//                       </option>
//                     </select>
//                   </div>
//                   <div className="select w-full rounded p-1 h-6 flex items-center bg-[#ffffff] cursor-pointer border border-solid border-[#E6E9EC]">
//                     <select
//                       className="w-[98%] antialiased border-none outline-none text-xs font-light text-[##989898] cursor-pointer font-['Nunito_Sans']"
//                       name=""
//                       id="city"
//                       required
//                     >
//                       <option value="" selected disabled>
//                         City
//                       </option>
//                     </select>
//                   </div>
//                 </div>
//                 <button
//                   className="font-['Inter',_sans-serif] text-sm md:text-base bg-[#408BFC] text-[#ffffff] rounded-lg px-4 flex items-center justify-center h-6 border border-solid border-transparent text-center transition-all duration-300 ease-in-out font-semibold antialiased"
//                   id="pay-now"
//                 >
//                   Pay Now
//                 </button>
//                 <div className="policy flex flex-col items-center gap-3">
//                   <p className="font-['Nunito_Sans',_sans-serif] font-normal antialiased mb-1 text-center text-xs text-[#1E1E1EBA] text">
//                     By checking out you agree with our{" "}
//                     <a
//                       className="font-['Kumbh_Sans',_sans-serif] underline text-[#408BFC]"
//                       href="./error404.html"
//                     >
//                       Terms of Service
//                     </a>
//                     and confirm that you have read our
//                     <a
//                       className="font-['Kumbh_Sans',_sans-serif] antialiased underline text-[#408BFC]"
//                       href="./error404.html"
//                     >
//                       Privacy Policy
//                     </a>
//                     . You can cancel recurring payment at any time
//                   </p>
//                   <div className="assurances antialiased flex flex-col md:flex-row justify-center gap-2">
//                     <span className="antialiased flex flex-col items-center gap-1 font-['Nunito_Sans',_sans-serif]">
//                       <img
//                         className="antialiased w-[0.7rem] aspect-square"
//                         src="./assets/images/moneyback.png"
//                         alt=""
//                       />
//                       <p className="antialiased font-['Nunito_Sans',_sans-serif] font-semibold mb-1 text-center text-xs text-[#1E1E1EBA]">
//                         30-Days Money Back Guarantee
//                       </p>
//                     </span>
//                     <span className="antialiased flex flex-col items-center gap-1 font-['Nunito_Sans',_sans-serif]">
//                       <img
//                         className="antialiased w-[0.7rem] aspect-square"
//                         src="./assets/images/encrypted.png"
//                         alt=""
//                       />
//                       <p className="antialiased font-['Nunito_Sans',_sans-serif] font-semibold mb-1 text-center text-xs text-[#1E1E1EBA]">
//                         Encrypted And Secured Payment
//                       </p>
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="cart-empty-state absolute w-full h-full top-0 left-0 rounded-2xl bg-[#ffffff] hidden flex-col items-center justify-center">
//               <img
//                 className="w-[7%] mb-[0.2rem]"
//                 src="./assets/images/emptycart.png"
//                 alt="empty-cart-icon"
//               />
//               <p className="font-['Kumbh_Sans',_sans-serif] text-xs mb-4 antialiased">
//                 Your cart is empty
//               </p>
//               <a
//                 className="font-['Kumbh_Sans',_sans-serif] antialiased no-underline flex items-center justify-center text-xs w-40 h-8 bg-[#408bfc] outline-none text-white rounded cursor-pointer text-center transition-all duration-300 ease-in-out empty-cart-continue-shopping"
//                 href="./shop.html"
//               >
//                 Continue shopping
//               </a>
//             </div>
//           </form>
//         </div>
//       </section>

//       <section id="orderPlacedSection">
//         <div
//           id="orderPlacedModal"
//           className="orderPlacedModal hidden fixed z-30 left-0 top-0 w-full h-full overflow-hidden bg-[rgba(0,_0,_0,_0.4)]"
//         >
//           <div className="modal-content2 container bg-[#fefefe] m-auto p-4 border border-solid border-[#888] rounded-2xl text-center relative w-[70%] md:w-[60%] max-w-[500px] h-auto">
//             <img
//               src="./assets/images/close-svgrepo-com.png"
//               className="close absolute right-8 opacity-70 w-4 md:w-6 cursor-pointer"
//               id="closeOrderPlaced"
//               alt="close-icon"
//             />
//             <br />
//             <div className="inner w-full mx-auto flex flex-col items-center">
//               <img
//                 className="confetti w-[40%] mx-auto mb-4 md:mb-12"
//                 src="./assets/images/confetti.png"
//                 alt=""
//               />
//               <h2 className="font-['Space_Grotesk',_sans-serif] text-sm md:text-lg mb-2 antialiased">
//                 Your Order has been placed Successfully
//               </h2>
//               <p className="font-['Kumbh_Sans',_sans-serif] text-xs md:text-sm mb-2 md:mb-4 antialiased">
//                 Contact Vendor to negotiate delivery options.
//               </p>
//               <button
//                 className="font-['Kumbh_Sans',_sans-serif] w-full sm:w-[70%] h-12 rounded antialiased text-sm md:text-base text-white bg-[#408bfc] hover:text-[#408bfc] hover:bg-white border border-solid border-[#408bfc] cursor-pointer mb-2 transition-all duration-300 ease-in-out"
//                 id="contactVendorBtn"
//               >
//                 Contact Vendor
//               </button>
//               <button
//                 className="alt font-['Kumbh_Sans',_sans-serif] w-full sm:w-[70%] h-12 rounded antialiased text-sm md:text-base text-[#408bfc] bg-white hover:text-[#ffffff] hover:bg-[#408bfc] border border-solid border-[#408bfc] cursor-pointer mb-2 transition-all duration-300 ease-in-out"
//                 id="viewReceiptBtn"
//               >
//                 View Receipt
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section id="contactVendorSection">
//         <div
//           id="contactVendorModal"
//           className="contactVendorModal hidden fixed z-30 left-0 top-0 w-full h-full overflow-hidden bg-[rgba(0,_0,_0,_0.4)]"
//         >
//           <div className="modal-content2 bg-[#fefefe] m-auto p-2 sm:p-4 border border-solid border-[#888] rounded-2xl text-center relative w-[70%] md:w-[60%] max-w-[500px] h-auto">
//             <div className="modal-header flex justify-between items-center mb-8">
//               <h2 className="font-['Space_Grotesk',_sans-serif] text-sm md:text-base font-semibold text-[#333333] antialiased">
//                 Vendor Contact Information
//               </h2>
//               <img
//                 className="close absolute right-8 opacity-70 w-4 md:w-6 cursor-pointer"
//                 id="closeContactVendor"
//                 src="./assets/images/close-svgrepo-com.png"
//                 alt=""
//               />
//             </div>
//             <div className="contact-vendor-modal-body h-full max-h-[70vh] overflow-auto [scrollbar-width:thin]">
//               <ul className="list-none flex flex-col gap-4 items-center">
//                 <li className="antialiased font-['Kumbh_Sans',_sans-serif] mb-4">
//                   <a
//                     className="antialiased font-['Kumbh_Sans',_sans-serif] text-sm md:text-base no-underline flex flex-col sm:flex-row gap-1 sm:gap-4 items-center text-[#408bfc]"
//                     target="_blank"
//                     href="tel:+4470733491"
//                   >
//                     <img
//                       className="w-8"
//                       src="./assets/images/phone-svgrepo-com.png"
//                       alt=""
//                     />
//                     <span className="font-['Kumbh_Sans',_sans-serif]">
//                       +44-707-334-91
//                     </span>
//                   </a>
//                 </li>
//                 <li className="font-['Kumbh_Sans',_sans-serif] mb-4">
//                   <a
//                     className="antialiased font-['Kumbh_Sans',_sans-serif] text-sm md:text-base no-underline flex flex-col sm:flex-row gap-1 sm:gap-4 items-center text-[#408bfc]"
//                     target="_blank"
//                     href="mailto:theluxe@gmail.com"
//                   >
//                     <img
//                       className="w-8"
//                       src="./assets/images/gmail-svgrepo-com.png"
//                       alt=""
//                     />
//                     <span className="font-['Kumbh_Sans',_sans-serif]">
//                       theluxe@gmail.com
//                     </span>
//                   </a>
//                 </li>
//                 <li className="antialiased font-['Kumbh_Sans',_sans-serif] mb-4">
//                   <a
//                     className="antialiased font-['Kumbh_Sans',_sans-serif] text-sm md:text-base no-underline flex flex-col sm:flex-row gap-1 sm:gap-4 items-center text-[#408bfc]"
//                     target="_blank"
//                     href="https://www.google.com/maps?q=Block+8/9+White+Heart+Lane,+London+Uk"
//                   >
//                     <img
//                       className="w-8"
//                       src="./assets/images/location-pin-svgrepo-com.png"
//                       alt=""
//                     />
//                     <span className="font-['Kumbh_Sans',_sans-serif]">
//                       Block 8/9 White Heart Lane, London Uk
//                     </span>
//                   </a>
//                 </li>
//                 <li className="antialiased font-['Kumbh_Sans',_sans-serif] mb-4">
//                   <a
//                     className="antialiased font-['Kumbh_Sans',_sans-serif] text-sm md:text-base no-underline flex flex-col sm:flex-row gap-1 sm:gap-4 items-center text-[#408bfc]"
//                     target="_blank"
//                     href="https://wa.me/4470733491"
//                   >
//                     <img
//                       className="w-8"
//                       src="./assets/images/whatsapp-color-svgrepo-com.png"
//                       alt=""
//                     />
//                     <span className="font-['Kumbh_Sans',_sans-serif]">
//                       Whatsapp
//                     </span>
//                   </a>
//                 </li>
//                 <li className="antialiased font-['Kumbh_Sans',_sans-serif] mb-4">
//                   <a
//                     className="antialiased font-['Kumbh_Sans',_sans-serif] text-sm md:text-base no-underline flex flex-col sm:flex-row gap-1 sm:gap-4 items-center text-[#408bfc]"
//                     target="_blank"
//                     href="https://www.instagram.com/"
//                   >
//                     <img
//                       className="w-8"
//                       src="./assets/images/instagram-1-svgrepo-com.png"
//                       alt=""
//                     />
//                     <span className="font-['Kumbh_Sans',_sans-serif]">
//                       Instagram
//                     </span>
//                   </a>
//                 </li>
//                 <li className="antialiased font-['Kumbh_Sans',_sans-serif] mb-4">
//                   <a
//                     className="antialiased font-['Kumbh_Sans',_sans-serif] text-sm md:text-base no-underline flex flex-col sm:flex-row gap-1 sm:gap-4 items-center text-[#408bfc]"
//                     target="_blank"
//                     href="https://www.x.com"
//                   >
//                     <img
//                       className="w-8"
//                       src="./assets/images/ri--twitter-x-fill (1).png"
//                       alt=""
//                     />
//                     <span className="font-['Kumbh_Sans',_sans-serif]">
//                       Twitter
//                     </span>
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section id="viewReceiptSection">
//         <div
//           id="viewReceiptModal"
//           className="viewReceiptModal hidden fixed z-30 left-0 top-0 w-full h-full overflow-auto  [scrollbar-width:thin] scrollbar-thumb-[#888] scrollbar-track-[#ffffff] bg-[rgba(0,_0,_0,_0.4)]"
//         >
//           <div className="modal-content2 bg-[#fefefe] m-auto p-4 border border-solid border-[#888] rounded-2xl w-[80%] md:w-[30%] max-w-[500px] text-center relative h-auto">
//             <img
//               className="close absolute right-8 opacity-70 w-4 md:w-6 cursor-pointer"
//               id="closeViewReceipt"
//               src="./assets/images/close-svgrepo-com.png"
//               alt=""
//             />
//             <div className="header flex flex-col items-center mb-2">
//               <svg
//                 className="w-[10%] mb-2"
//                 viewBox="0 0 50 49"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M25.2727 2.31152L31.3604 6.53486L38.8956 6.52122L41.2105 13.3411L47.315 17.5424L44.9729 24.3538L47.315 31.1652L41.2105 35.3664L38.8956 42.1863L31.3604 42.1727L25.2727 46.396L19.1851 42.1727L11.6499 42.1863L9.33499 35.3664L3.23047 31.1652L5.57262 24.3538L3.23047 17.5424L9.33499 13.3411L11.6499 6.52122L19.1851 6.53486L25.2727 2.31152Z"
//                   fill="#4EBA6F"
//                   stroke="white"
//                   stroke-width="4.63532"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 />
//                 <path
//                   d="M17.1602 24.3533L22.9543 29.8639L34.5426 18.8428"
//                   stroke="white"
//                   stroke-width="4.63532"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 />
//               </svg>
//               <h2 className="antialiased font-['Space_Grotesk',_sans-serif] text-sm md:text-lg text-[#333333]">
//                 Payment Successful!
//               </h2>
//             </div>
//             <hr />
//             <div className="details">
//               <div className="container mx-auto mb-4 w-full">
//                 <p className="antialiased key font-['Kumbh_Sans',_sans-serif] text-sm md:text-base text-[#333333]">
//                   Reference Number
//                 </p>
//                 <p className="value antialiased font-semibold font-['Kumbh_Sans',_sans-serif] text-xs text-[#333333]">
//                   004561984411
//                 </p>
//               </div>
//               <div className="container mx-auto flex flex-wrap items-center justify-center gap-2 mb-4 w-full">
//                 <p className="key antialiased font-['Kumbh_Sans',_sans-serif] text-sm md:text-base text-[#333333]">
//                   Date
//                 </p>
//                 <p className="value antialiased font-semibold font-['Kumbh_Sans',_sans-serif] text-xs text-[#333333]">
//                   April 24, 2024
//                 </p>
//               </div>
//               <div className="container mx-auto flex flex-wrap items-center justify-center gap-2 mb-4 w-full">
//                 <p className="key antialiased font-['Kumbh_Sans',_sans-serif] text-sm md:text-base text-[#333333]">
//                   Time
//                 </p>
//                 <p className="value antialiased font-semibold font-['Kumbh_Sans',_sans-serif] text-xs text-[#333333]">
//                   09:32 PM
//                 </p>
//               </div>
//               <div className="container mx-auto flex flex-wrap items-center justify-center gap-2 mb-4 w-full">
//                 <p className="key antialiased font-['Kumbh_Sans',_sans-serif] text-sm md:text-base text-[#333333]">
//                   Payment Method
//                 </p>
//                 <p className="value antialiased font-semibold font-['Kumbh_Sans',_sans-serif] text-xs text-[#333333]">
//                   Debit Card
//                 </p>
//               </div>
//               <div className="container mx-auto flex flex-wrap items-center justify-center gap-2 mb-4 w-full">
//                 <p className="key antialiased font-['Kumbh_Sans',_sans-serif] text-sm md:text-base text-[#333333]">
//                   Amount
//                 </p>
//                 <p
//                   id="receiptTotalPrice"
//                   className="value antialiased font-['Kumbh_Sans',_sans-serif] text-sm md:text-base text-[#333333]"
//                 ></p>
//               </div>
//             </div>
//             <hr className="border border-dashed border-[#333333]" />
//             <div className="last bg-[#ffffff] mt-2 flex items-center justify-center gap-2">
//               <button className="alt font-['Kumbh_Sans',_sans-serif] text-sm md:text-base flex items-center justify-center gap-4 p-4 w-[70%] h-12 rounded bg-[#408bfc] text-white hover:bg-[#3d557a] border border-solid border-[#408bfc] cursor-pointer mb-2 transition-all duration-300 ease-in-out">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="1em"
//                   height="1em"
//                   viewBox="0 0 16 16"
//                 >
//                   <path
//                     fill="currentColor"
//                     d="M2.75 14A1.75 1.75 0 0 1 1 12.25v-2.5a.75.75 0 0 1 1.5 0v2.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25v-2.5a.75.75 0 0 1 1.5 0v2.5A1.75 1.75 0 0 1 13.25 14Z"
//                   />
//                   <path
//                     fill="currentColor"
//                     d="M7.25 7.689V2a.75.75 0 0 1 1.5 0v5.689l1.97-1.969a.749.749 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 6.78a.749.749 0 1 1 1.06-1.06z"
//                   />
//                 </svg>
//                 <span className="font-['Kumbh_Sans',_sans-serif] antialiased">
//                   Download as PDF
//                 </span>
//               </button>
//               <button className="alt font-['Kumbh_Sans',_sans-serif] text-sm md:text-base w-[70%] h-12 rounded bg-[#408bfc] text-white hover:bg-[#ffffff] hover:text-[#408bfc] border border-solid border-[#408bfc] cursor-pointer mb-2 transition-all duration-300 ease-in-out">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="1em"
//                   height="1em"
//                   viewBox="0 0 16 16"
//                 >
//                   <path
//                     fill="currentColor"
//                     d="M2.75 14A1.75 1.75 0 0 1 1 12.25v-2.5a.75.75 0 0 1 1.5 0v2.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25v-2.5a.75.75 0 0 1 1.5 0v2.5A1.75 1.75 0 0 1 13.25 14Z"
//                   />
//                   <path
//                     fill="currentColor"
//                     d="M7.25 7.689V2a.75.75 0 0 1 1.5 0v5.689l1.97-1.969a.749.749 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 6.78a.749.749 0 1 1 1.06-1.06z"
//                   />
//                 </svg>
//                 <span className="font-['Kumbh_Sans',_sans-serif] antialiased">
//                   Download as Image
//                 </span>
//               </button>
//               <img src="./assets/images/pngtree-barcode-vector.png" alt="" />
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default CartCheckout;
