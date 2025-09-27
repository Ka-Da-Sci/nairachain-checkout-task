"use client";

import CartButton from "./cart-btn";
import Logo from "./logo";
// import { motion } from "motion/react";
import Link from "next/link";


const Header = () => {

  return (
    <div
      id="header"
      className="fixed inset-x-0 z-50 px-2 sm:px-4 py-2 bg-background-primary shadow-[0px_5.33px_80px_0px_#0000001A]"
    >
      <header className="flex gap-8 max-sm:gap-2 justify-between items-center w-full antialiased container mx-auto overflow-x-hidden">
        <Link className="" href="/">
          <Logo />
        </Link>

        <CartButton />
      </header>
    </div>
  );
};

export default Header;
