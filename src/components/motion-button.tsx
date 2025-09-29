import { forwardRef, ButtonHTMLAttributes } from "react";
import { motion } from "motion/react";

// Props type for the AnimationButton component
type AnimationButtonProps = {
  classNamePlus?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

// Button component with ref forwarding for animation support
const AnimationButtonComponent = forwardRef<
  HTMLButtonElement,
  AnimationButtonProps
>(({ classNamePlus, ...props }, ref) => (
  // Render button with dynamic classes and passed props
  <button
    ref={ref}
    className={`${
      classNamePlus ?? ""
    } nav-link group font-4 rounded-lg max-sm:ml-auto`}
    {...props}
  />
));

// Set display name for better debugging
AnimationButtonComponent.displayName = "AnimationButtonComponent";

// Create motion-enhanced version of the button component
const MotionButton = motion.create(AnimationButtonComponent);

export default MotionButton;
