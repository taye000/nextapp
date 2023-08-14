"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie, removeCookie } from "../utils/tokenUtils";
import Link from "next/link";
import { useTheme } from "next-themes";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { RiMoonFill, RiSunLine } from "react-icons/ri";

interface NavItem {
  label: string;
  page: string;
}

const navItems: Array<NavItem> = [
  { label: "About", page: "about" },
  { label: "Contact", page: "contact" },
  { label: "Account", page: "account" },
  { label: "FAQ's", page: "faq" },
];
const Navbar = () => {
  // initialize useRouter
  const router = useRouter();

  // get the stored cookie from local storage
  const cookie = getCookie();

  // check if user is logged in
  useEffect(() => {
    if (!cookie) {
      router.push("/signin");
    }
    // Fetch user data
    fetchUserData();
  }, []);

  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [navbar, setNavbar] = useState(false);

  const [user, setUser] = useState({
    id: "",
    name: "",
  });

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/users/currentuser",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${cookie}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error fetching user data");
      }
      const userData = await response.json();

      // Update user state with fetched data
      setUser(userData.user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/signout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cookie}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Error signing out");
      }
      // Remove cookie from local storage
      removeCookie();
      // Redirect to signin page
      router.push("/signin");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="w-full mx-auto px-4 shadow top-0 z-50 sm:px-20">
      <div className="md:flex md:items-center justify-between">
        <div className="flex flex-row justify-between">
          <Link href="/">
            <div className="md:block md:py-5">
              <h1 className="text-2xl font-bold">Imani Escrow Services</h1>
            </div>
          </Link>
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
                  <RiSunLine size={25} color="black" />
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
        {cookie ? (
          <>
          <div className="flex flex-row justify-between">
            <Link href={"/account"}>
              <div className="p-2 md:block md:items-center md:p-2">
                <p className="font-bold text-blue-900">Welcome, {user.name}</p>
              </div>
            </Link>
            <button
              onClick={handleSignout}
              className="p-3 px-6 pt-2 text-red-400 rounded-full baseline hover:bg-gray-300 md:block"
            >
              Sign Out
            </button>
          </div>
          </>
        ) : (
          <Link
            href="/signin"
            className="p-3 px-6 pt-2 text-white bg-blue-800 rounded-full baseline font-bold hover:bg-blue-500 md:block"
          >
            Get Started
          </Link>
        )}
        <button
          id="menu-btn"
          className="block hamburger md:hidden focus:outline-none"
        ></button>
      </div>
    </header>
  );
};

export default Navbar;
