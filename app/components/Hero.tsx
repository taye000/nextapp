import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section id="hero">
      <div className="container flex flex-col-reverse items-center px-6 mx-auto mt-10 space-y-0 sm:mt-50 md:flex-row md:space-y-0">
        <div className="flex flex-col mb-32 space-y-12 md:w-1/2">
          <h1 className="max-w-md text-4xl font-bold text-center md:text-5xl md:text-left">
            Welcome to imani escrow services.
          </h1>
          <p className="max-w-sm text-center text-gray-700 md:text-left">
            Helping small businesses and individuals to transact safely and
            securely, by leveraging our superior escrow services.
          </p>
          <div className="flex flex-col gap-4 md:gap-12 md:flex-row ">
            <Link
              href="/buyer"
              className="p-3 px-6 pt-2 text-center text-white bg-blue-800 rounded-full baseline hover:bg-blue-500 md:block"
            >
              Buyer
            </Link>
            <Link
              href="/seller"
              className="p-3 px-6 pt-2 text-center text-white bg-blue-800 rounded-full baseline hover:bg-blue-500 md:block"
            >
              Seller
            </Link>
          </div>
        </div>
        <div className="md:w-1/2">
          <img src="/imanilogo.png" className="rounded-lg md:rounded-lg"></img>
        </div>
      </div>
    </section>
  );
};

export default Hero;
