"use client";

import { FC, useEffect, useRef } from "react";
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

const Hero: FC = () => {
  const h1Ref = useRef(null);
  const isH1InView = useInView(h1Ref, { amount: 0 });
  const bottomRef = useRef(null);
  const isBottomInView = useInView(bottomRef, { amount: 0 });
  const controls = useAnimation();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    controls.start("visible").then(() => {
      interval = setInterval(() => {
        controls.set("hidden"); // reset instantly
        controls.start("visible"); // replay
      }, 10000);
    });

    return () => clearInterval(interval);
  }, [controls]);

  return (
    <SectionAnimatedWrapper
      sectionId="hero"
      sectionClassName={"w-full pt-16 bg-hero-section-background-primary"}
      classNamePlus="relative overflow-hidden max-md:flex-col-reverse max-md:mt-8"
    >
      <div className="z-10 flex max-md:items-center flex-col justify-between gap-4 max-w-[700px] flex-1/2 overflow-clip">
        <div ref={h1Ref}>
          {isH1InView && (
            <motion.h1
              className="max-lg:text-4xl max-md:text-3xl font-space_grotesk font-bold text-left max-md:text-center text-5xl text-foreground-secondary"
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
                className="max-lg:text-base font-bai_jamjuree font-xl font-semibold text-left max-md:text-center text-foreground-tertiary"
              >
                {splitChars(
                  "Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
                )}
              </motion.p>
            </motion.div>
          )}
        </div>
      </div>

      <div className="transition-all duration-500 z-0 max-lg:opacity-40 opacity-100 absolute right-0 top-0 max-[350px]:hidden flex self-start justify-center max-w-[350px] p-0">
        <ImageWrapper
          className="relative"
          sourceUrl={photo.src}
          alternativeText={"electrocis gadget"}
        />

        {/* <motion.div
          variants={{
            hidden: { backgroundColor: "#D9D9D9" },
            visible: {
              backgroundColor: [
                "#D9D9D9",
                "#CFCFCF",
                "#EAEAEA",
                "#D9D9D9",
                "#CFCFCF",
                "#CFCFCF",
                "#D9D9D9",
                "#EAEAEA",
                "#D9D9D9",
                "#D9D9D9",
              ],
              transition: {
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              },
            },
          }}
          className="absolute top-[18%] left-0 h-[82%] w-full rounded-tl-lg rounded-tr-lg rounded-br-[50px] rounded-bl-[50px] max-lg:rounded-[30px] max-sm:rounded-2xl z-0"
        /> */}
      </div>
    </SectionAnimatedWrapper>
  );
};

export default Hero;
