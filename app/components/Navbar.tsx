"use client";
import Link from "next/link";
import React, { useState } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";

interface NavItem {
  label: string;
  page: string;
}

const navItems: Array<NavItem> = [
  { label: "Home", page: "home" },
  { label: "About", page: "about" },
  { label: "Contact", page: "contact" },
  { label: "FAQ's", page: "faq" },
];
const Navbar = () => {
  const [navbar, setNavbar] = useState(false);

  return (
    <header className="w-full mx-auto px-4 bg-white shadow fixed sticky top-0 z-50 sm:px-20">
      <div className="md:flex md:items-center justify-between">
        <div className="flex flex-row justify-between">
          <div className="md:block md:py-5">
            <h1 className="text-2xl font-bold">Imani Escrow Services</h1>
          </div>
          <div className="md:hidden">
            <button onClick={() => setNavbar(!navbar)}>
              {navbar ? <IoMdClose size={30} /> : <IoMdMenu size={30} />}
            </button>
          </div>
        </div>
        <div className="hidden md:flex md:flex-row items-center justify-between py-2">
          <ul className="md:flex md:flex-row justify-between space-x-4">
            <li>
              <Link href={"/"} className="hover:text-gray-500">
                Home
              </Link>
            </li>
            <li>
              <Link href={"/about"} className="hover:text-gray-500">
                About Us
              </Link>
            </li>
            <li>
              <Link href={"/contact"} className="hover:text-gray-500">
                Contact
              </Link>
            </li>
            <li>
              <Link href={"/faq"} className="hover:text-gray-500">
                FAQ's
              </Link>
            </li>
          </ul>
        </div>
        <Link
          href="#"
          className="hidden p-3 px-6 pt-2 text-white bg-blue-800 rounded-full baseline hover:bg-blue-500 md:block"
        >
          Get Started
        </Link>
        <button
          id="menu-btn"
          className="block hamburger md:hidden focus:outline-none"
        ></button>
      </div>
    </header>
  );
};

export default Navbar;
