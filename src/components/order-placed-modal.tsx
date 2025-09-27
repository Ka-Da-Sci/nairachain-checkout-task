import useCartStore from "./store/cart-store";
import ImageWrapper from "./image-wrapper";
import { X } from "lucide-react";

const OrderPlacedModal: React.FC = () => {
  const {
    setOrderPlacedModalOpen,
    setViewReceiptModalOpen,
  } = useCartStore();

  return (
    <>
      <section id="orderPlacedSection">
        <div className="orderPlacedModal fixed z-50 left-0 top-0 w-full h-full overflow-hidden bg-[rgba(0,0,0,0.4)] flex">
          <div className="modal-content2 container bg-[#fefefe] m-auto p-4 sm:p-10 border border-solid border-[#888] rounded-2xl text-center relative w-[70%] md:w-[60%] max-w-[500px] h-auto">
            <button
              onClick={() => setOrderPlacedModalOpen(false)}
              className="z-10 hover:scale-110 absolute right-0 transform -translate-x-[12.5%] -translate-y-[170%] rotate-90 cursor-pointer transition-all duration-1000 ease-in-out hover:-translate-x-[12.5%] hover:rotate-[45deg] top-4 shadow-xl rounded-full p-1 bg-black group"
            >
              <X className="group-hover:scale-125 transition-all duration-500 h-5 w-5 text-white" />
            </button>

            <br />
            <div className="inner w-full mx-auto flex flex-col items-center">
              <ImageWrapper
                className="confetti w-[40%] mx-auto mb-4 md:mb-12"
                sourceUrl="/images/payment-successful.png"
                alternativeText="miscellaneous"
              />
              <h2 className="font-space_grotesk text-sm md:text-lg mb-2 antialiased">
                Your Order has been placed Successfully
              </h2>
              <button
                className="alt font-space_grotesk w-full sm:w-[70%] h-12 rounded antialiased text-sm md:text-base text-[#408bfc] bg-white hover:text-[#ffffff] hover:bg-[#408bfc] border border-solid border-[#408bfc] cursor-pointer mb-2 transition-all duration-300 ease-in-out"
                onClick={() => {
                  setOrderPlacedModalOpen(false);
                  setViewReceiptModalOpen(true);
                }}
              >
                View Receipt
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderPlacedModal;
