import { X } from "lucide-react";
import { MouseEvent } from "react";


const CloseBtn = ({ onClose }: { onClose: (event: MouseEvent) => void }) => {
  return (
    <button
      onClick={onClose}
      className="hover:scale-110 transition-all duration-500 absolute cursor-pointer right-4 top-4 shadow-xl rounded-full p-1 bg-black group"
    >
      <X className="group-hover:scale-125 transition-all duration-500 h-5 w-5 text-white" />
    </button>
  );
};

export default CloseBtn;

