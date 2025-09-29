import useCartStore from "./store/cart-store";


// Utility modal to display pop up messages
const UtilityHoverCard = () => {
  const { utilityHoverCardProps, setShowUtilityCardModal } = useCartStore();

  return (
    <>
    <div className="fixed inset-0 bg-black opacity-80 z-50">
    </div>
      <div
        className={`fixed inset-0 flex items-center justify-center z-60`}
      >
        <div className="bg-white rounded-lg mx-4 p-4 w-full max-w-xl max-sm:text-center flex flex-col items-center gap-8">
          <div className="w-full flex flex-col gap-2 items-center font-poppins">
            <h2 className="text-lg font-poppins font-bold text-[#1E1E1E]">
              {utilityHoverCardProps.headerText}
            </h2>
            <p className="text-sm sm:text-base font-poppins font-normal text-[#1E1E1E]">
              {utilityHoverCardProps.bodyText}
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowUtilityCardModal(false)}
              className="cursor-pointer px-8 py-2 bg-[#0053FA] text-white font-poppins font-normal rounded-lg"
            >
              Okay
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UtilityHoverCard;
