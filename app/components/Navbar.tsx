import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="w-full mx-auto px-4 bg-white shadow fixed top-0 z-50 sm:px-20">
      <div className="md:flex md:items-center justify-between">
        <div className="md:block md:py-5">
        <h1 className="text-2xl font-bold">Imani Escrow Services</h1>
        </div>
        <div className="hidden md:flex md:flex-row items-center justify-between py-2">
        <ul className="md:flex md:flex-row justify-between space-x-4">
          <li>
            <Link href={"/"} className="hover:text-gray-500">Home</Link>
          </li>
          <li>
            <Link href={"/about"} className="hover:text-gray-500">About Us</Link>
          </li>
          <li>
            <Link href={"/contact"} className="hover:text-gray-500">Contact</Link>
          </li>
          <li>
            <Link href={"/faq"} className="hover:text-gray-500">FAQ's</Link>
          </li>
          <li>
            <Link href={"/account"} className="hover:text-gray-500">Account</Link>
          </li>
          <li>
            <Link href={"/signin"} className="hover:text-gray-500">Signin</Link>
          </li>
        </ul>
        </div>
        <Link href='#' className="hidden p-3 px-6 pt-2 text-white bg-blue-800 rounded-full baseline hover:bg-blue-500 md:block">Get Started</Link>
      </div>
    </header>
  );
};

export default Navbar;
