"use client";

import { useEffect, useRef } from "react";
import photo from "../../../public/images/hero-bg.png";
import ImageWrapper from "../image-wrapper";
import SectionAnimatedWrapper from "../section-animated-wrapper";
import { motion, useAnimation, useInView } from "motion/react";

const splitChars = (text: string) =>
  text.split("").map((char, i) => (
    <motion.span key={i} variants={charMotion}>
      {char}
    </motion.span>
  ));

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.025, // typing speed
    },
  },
};

const charMotion = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const Hero = () => {
  const h1Ref = useRef(null);
  const isH1InView = useInView(h1Ref, { amount: 0 });
  const bottomRef = useRef(null);
  const isBottomInView = useInView(bottomRef, { amount: 0 });
  const controls = useAnimation();

  useEffect(() => {
    const replay = async () => {
      await controls.start("hidden");
      await controls.start("visible");
    };

    replay(); // run once
    const interval = setInterval(replay, 10000);

    return () => clearInterval(interval);
  }, [controls]);

  return (
    <SectionAnimatedWrapper
      sectionId="hero"
      sectionClassName={
        "w-full pt-6 md:pt-10 bg-hero-section-background-primary"
      }
      classNamePlus="relative overflow-hidden max-md:flex-col-reverse max-md:mt-8 pb-4"
    >
      <div className="z-10 pt-10 sm:pt-20 flex max-md:items-center flex-col justify-between gap-4 max-w-[700px] flex-1/2 overflow-clip">
        <div ref={h1Ref}>
          {isH1InView && (
            <motion.h1
              className="max-lg:text-4xl max-md:text-3xl font-space_grotesk font-bold text-left max-md:text-center text-5xl text-foreground"
              variants={container}
            >
              {splitChars("Your Electronics And Gadgets Accessories Hub")}
            </motion.h1>
          )}
        </div>
        <div ref={bottomRef}>
          {isBottomInView && (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 300 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1.5 },
                },
              }}
              className="flex flex-col max-md:items-center gap-4"
            >
              <motion.p
                variants={container}
                initial="false"
                whileInView="visible"
                animate={controls}
                viewport={{ once: false, amount: 0.5 }}
                className="max-lg:text-base font-bai_jamjuree font-xl font-semibold text-left max-md:text-center text-foreground-secondary"
              >
                {splitChars(
                  "Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
                )}
              </motion.p>
            </motion.div>
          )}
        </div>
      </div>

      <div className="transition-all duration-500 z-0 max-lg:opacity-40 opacity-100 absolute right-0 top-0 max-[375px]:hidden flex self-start justify-center max-w-[3500px] sm:max-w-[500px] p-0">
        <ImageWrapper
          className="relative"
          sourceUrl={photo.src}
          alternativeText={"electrocis gadget"}
        />
      </div>
    </SectionAnimatedWrapper>
  );
};

export default Hero;
