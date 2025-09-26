import { FC } from "react";
import Image from "next/image";

const ImageWrapper: FC<{
  sourceUrl: string;
  alternativeText: string;
  className?: string;
}> = (props) => {
  return (
    <Image
      width={700}
      height={700}
      priority
      className={`max-w-full max-h-full ${props.className ?? ""}`}
      src={props.sourceUrl}
      alt={props.alternativeText}
    />
  );
};

export default ImageWrapper;
