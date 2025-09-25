import Image from "next/image";
import { memo } from "react";

const Logo = () => {
  return (
    <div className="flex justify-center w-full max-md:w-[30px] max-md:h-[30px] max-w-10 max-h-10 will-change-[filter] transition-[filter] duration-300 hover:brightness-110">
      <Image width={40} height={40}
      className='max-w-full max-h-full' src={"/images/logo-trans.svg"} alt='logo' />
    </div>
  );
};

export default memo(Logo);
