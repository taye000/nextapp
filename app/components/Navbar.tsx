import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="w-full mx-auto px-4 bg-white shadow fixed top-0 z-50 sm:px-20">
      <div className="md:flex md:items-center justify-between">
        <div className="md:block md:py-5">
        <h1 className="text-2xl font-bold">Imani Escrow Services</h1>
        </div>
        <div className="md:flex md:flex-row items-center justify-between py-2">
        <ul className="md:flex md:flex-row justify-between">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/about"}>About</Link>
          </li>
          <li>
            <Link href={"/contact"}>Contact</Link>
          </li>
          <li>
            <Link href={"/faq"}>FAQ's</Link>
          </li>
          <li>
            <Link href={"/account"}>Account</Link>
          </li>
          <li>
            <Link href={"/signin"}>Signin</Link>
          </li>
        </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
