"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { RiMoonFill, RiSunLine } from "react-icons/ri";

interface NavItem {
  label: string;
  page: string;
}

const navItems: Array<NavItem> = [
  { label: "Home", page: "/" },
  { label: "Account", page: "/account" },
  { label: "About", page: "about" },
  { label: "Contact", page: "contact" },
  { label: "FAQ's", page: "faq" },
];
const Navbar = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [navbar, setNavbar] = useState(false);

  return (
    <header className="w-full mx-auto px-4 shadow fixed sticky top-0 z-50 sm:px-20">
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
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <div className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              {navItems.map((item, index) => {
                return (
                  <Link
                    key={index}
                    href={item.page}
                    className={
                      "block lg:inline-block text-blue-900  hover:text-blue-500"
                    }
                    onClick={() => setNavbar(!navbar)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              {currentTheme === "dark" ? (
                <button
                  onClick={() => setTheme("light")}
                  className="bg-slate-100 p2 rounded-xl"
                >
                  <RiSunLine size={25} color="black"/>
                </button>
              ) : (
                <button
                  onClick={() => setTheme("dark")}
                  className="bg-slate-100 p2 rounded-xl"
                >
                  <RiMoonFill size={25} />
                </button>
              )}
            </div>
          </div>
        </div>
        <Link
          href="/signup"
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
