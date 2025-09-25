import { forwardRef, AnchorHTMLAttributes } from "react";
import { motion } from "motion/react";
import Link, { LinkProps } from "next/link";

type AnimationLinkProps = LinkProps & {
  classNamePlus: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const AnimationLinkComponent = forwardRef<
  HTMLAnchorElement,
  AnimationLinkProps
>(({ href, classNamePlus, ...props }, ref) => (
  <Link
    className={`${
      classNamePlus ?? ""
    } nav-link group font-4 rounded-lg max-sm:ml-auto`}
    ref={ref}
    href={href}
    {...props}
  />
));

AnimationLinkComponent.displayName = "AnimationLinkComponent";

const MotionLink = motion.create(AnimationLinkComponent);

export default MotionLink;
