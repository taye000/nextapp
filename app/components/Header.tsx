import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <Link href={"/"} className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">Imani Escrow Services</Link>
        </div>
        <div className="links">
            <Link href={"/about"}>About</Link>
            <Link href={"/faq"}>FAQ</Link>
            <Link href={"/contact"}>Contact</Link>
            </div>
      </div>
    </header>
  );
};

export default Header;
