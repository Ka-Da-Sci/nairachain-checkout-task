import React from "react";
import { motion } from "framer-motion";

export type SpinnerProps = {
  size?: number;
  strokeWidth?: number;
  color?: string;
  speed?: number;
  className?: string;
  ariaLabel?: string;
};

// Loading spinner component
const Spinner = ({
  size = 48,
  strokeWidth = 4,
  color = "#408BFC",
  speed = 1.2,
  className = "",
  ariaLabel = "Loading",
}: SpinnerProps) => {
  const half = size / 2;
  const radius = half - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center ${className}`}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: "linear", duration: speed }}
      >
        <circle
          cx={half}
          cy={half}
          r={radius}
          fill="none"
          stroke="rgba(0,0,0,0.06)"
          strokeWidth={strokeWidth}
        />

        <motion.circle
          cx={half}
          cy={half}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{
            strokeDashoffset: circumference * 0.75,
            strokeDasharray: `${circumference * 0.25} ${circumference}`,
          }}
          animate={{
            strokeDashoffset: [circumference * 0.75, -circumference * 0.25],
          }}
          transition={{
            repeat: Infinity,
            ease: "easeInOut",
            duration: speed * 1.1,
          }}
        />
      </motion.svg>
    </div>
  );
};

export default Spinner;
