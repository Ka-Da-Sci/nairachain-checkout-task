"use client";

import { motion, useInView } from "framer-motion"; // Updated to correct import
import { useRef } from "react";
import SectionAnimatedWrapper from "../section-animated-wrapper";
import Product from "./product";
import amazonAlexaSpeaker from "../../../public/images/Amazon Alexa Speakers.png";
import jblBluetoothSpeaker from "../../../public/images/JBL Bluetooth Speaker.png";
import airpodPro from "../../../public/images/Airpod Pro.png";
import headPhone from "../../../public/images/Headphone.png";
import wirelessMic from "../../../public/images/Wireless Karaoke Microphone.png";
import portablePowerbank from "../../../public/images/Portable Powerbank.png";
import canonOpticCamera from "../../../public/images/Canon Optic Camera.png";
import typeCCharger from "../../../public/images/Type C Charger.png";

const Products = () => {
  const productsData = [
    {
      id: "1",
      description:
        "High-quality smart speaker with voice assistant capabilities for seamless integration and control.",
      title: "Amazon Alexa Speakers",
      price: 100,
      imgSrc: amazonAlexaSpeaker,
      altText: "amazon-alexa-speakers",
    },
    {
      id: "2",
      description:
        "Portable speaker with powerful sound and Bluetooth connectivity for an enhanced audio experience.",
      title: "JBL Bluetooth Speaker",
      price: 120,
      imgSrc: jblBluetoothSpeaker,
      altText: "jbl-bluetooth-speaker",
    },
    {
      id: "3",
      description:
        "Premium wireless earbuds with noise cancellation and superior sound quality for immersive listening.",
      title: "Airpod Pro",
      price: 80,
      imgSrc: airpodPro,
      altText: "airpod-pro",
    },
    {
      id: "4",
      description:
        "High-performance headphones delivering exceptional audio clarity and comfort for extended use.",
      title: "Headphone",
      price: 1050,
      imgSrc: headPhone,
      altText: "headphone",
    },
    {
      id: "5",
      description:
        "Versatile microphone with wireless connectivity, perfect for karaoke and professional audio recording.",
      title: "Wireless Karaoke Microphone",
      price: 40,
      imgSrc: wirelessMic,
      altText: "wireless-karaoke-microphone",
    },
    {
      id: "6",
      description:
        "Compact and reliable power source for charging devices on the go with high capacity.",
      title: "Portable Powerbank",
      price: 70,
      imgSrc: portablePowerbank,
      altText: "portable-powerbank",
    },
    {
      id: "7",
      description:
        "Advanced camera with superior optics for capturing high-quality images and videos.",
      title: "Canon Optic Camera",
      price: 160,
      imgSrc: canonOpticCamera,
      altText: "canon-optic-camera",
    },
    {
      id: "8",
      description:
        "Fast and efficient charger compatible with USB Type-C devices for quick power-ups.",
      title: "Type C Charger",
      price: 20,
      imgSrc: typeCCharger,
      altText: "type-c-charger",
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.05 });

  return (
    <SectionAnimatedWrapper
      sectionId="products"
      sectionClassName={"w-full bg-background-primary"}
      classNamePlus="flex-col gap-4"
    >
      <div className="flex max-sm:items-center flex-col items-start max-md:justify-center max-md:items-center">
        <div className="flex gap-2 flex-col w-full max-w-[800px] items-center antialiased uppercase text-center text-[#1E1E1E] font-['Montserrat']">
          <h1 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            Top Picks for You
          </h1>
          <div className="flex flex-col items-center gap-4">
            <h2 className="font-normal text-xs sm:text-sm">
              Find Your Perfect Gadget Among Our Favorites
            </h2>
            <div className="overflow-hidden relative z-0 dynamic-hr w-[95%] h-1 rounded-l-full rounded-r-full bg-transparent before:z-20 before:absolute before:top-0 before:left-0 before:content-[''] before:rounded-l-full before:rounded-r-full before:bg-[#ff4500] before:w-full before:h-full after:z-10 after:absolute after:top-0 after:left-0 after:content-[''] after:rounded-l-full after:rounded-r-full after:bg-[#ffa17f] after:w-full after:h-full"></div>
          </div>
        </div>
      </div>
      <motion.ul
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.3 } },
        }}
        className="self-start max-sm:self-center grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] max-lg:grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))] max-sm:grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] w-full gap-8 justify-between items-start"
      >
        {productsData.map((product, idx) => (
          <Product
            key={`product_${idx}`}
            {...product}
            imgSrc={product.imgSrc.src}
            index={idx} 
          />
        ))}
      </motion.ul>
    </SectionAnimatedWrapper>
  );
};

export default Products;
