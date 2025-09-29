import { forwardRef, AnchorHTMLAttributes } from "react";
import { motion } from "motion/react";
import Link, { LinkProps } from "next/link";


// Props type for the AnimationLink component
type AnimationLinkProps = LinkProps & {
  classNamePlus: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;


// Link component with ref forwarding for animation support
const AnimationLinkComponent = forwardRef<
  HTMLAnchorElement,
  AnimationLinkProps
>(({ href, classNamePlus, ...props }, ref) => (
    // Render Next.js Link with dynamic classes and passed props
  <Link
    className={`${
      classNamePlus ?? ""
    } nav-link group font-4 rounded-lg max-sm:ml-auto`}
    ref={ref}
    href={href}
    {...props}
  />
));


// Set display name for better debugging
AnimationLinkComponent.displayName = "AnimationLinkComponent";


// Create motion-enhanced version of the link component
const MotionLink = motion.create(AnimationLinkComponent);

export default MotionLink;
