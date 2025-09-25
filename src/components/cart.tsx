import Image from "next/image";

const Cart = () => {
  return (
    <div className="search-cart flex gap-6 items-center">
      <button
        className="cart relative flex justify-center w-auto h-auto max-w-[40px] max-h-[40px]"
        id="cart-trolley"
      >

        <div className="w-10 h-10 flex items-center justify-center">
          <Image
            width={500}
            height={500}
            className="w-full h-full object-cover"
            src={"/images/cat-trolley.svg"}
            alt="cart icon"
          />
        </div>
        <div className="counter absolute top-1/4 right-0 bg-[#FF4500] rounded-full w-max max-w-[22px] max-h-[22px] aspect-square flex items-center justify-center">
          <p
            id="num-of-items"
            className="rounded-full p-2 m-0 text-left text-[#FFFFFF] font-['poppins'] text-xs"
          >
            0
          </p>
        </div>
      </button>
    </div>
  );
};

export default Cart;
