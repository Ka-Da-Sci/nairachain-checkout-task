import { forwardRef, ButtonHTMLAttributes } from "react";
import { motion } from "motion/react";

type AnimationButtonProps = {
  classNamePlus?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const AnimationButtonComponent = forwardRef<
  HTMLButtonElement,
  AnimationButtonProps
>(({ classNamePlus, ...props }, ref) => (
  <button
    ref={ref}
    className={`${
      classNamePlus ?? ""
    } nav-link group font-4 rounded-lg max-sm:ml-auto`}
    {...props}
  />
));

AnimationButtonComponent.displayName = "AnimationButtonComponent";

const MotionButton = motion.create(AnimationButtonComponent);

export default MotionButton;
