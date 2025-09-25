"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView } from "motion/react";

const SectionAnimatedWrapper = ({
  children,
  sectionClassName,
  sectionId,
  classNamePlus,
}: {
  children: ReactNode;
  sectionClassName: string;
  sectionId: string;
  classNamePlus?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.05 });

  return (
    <motion.section 
      key={`${sectionId} section`}
      variants={{
        hidden: { opacity: 0.3, y: 40 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: 0.5 }}
      id={sectionId} className={sectionClassName} ref={ref}>
      <motion.div
        className={`flex gap-8 items-center font-space_grotesk container mx-auto px-4 py-12 w-full ${
          classNamePlus ?? ""
        }`}
      >
        {children}
      </motion.div>
    </motion.section>
  );
};

export default SectionAnimatedWrapper;
