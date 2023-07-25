import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section id="hero">
      <div className="container flex flex-col md:flex-row items-center px-6 mx-auto mt-20 space-y-0 md:space-y-0">
      <div className="flex flex-col mb-32 space-y-12 md:w-1/2">
        <h1 className="max-w-md text-4xl font-bold text-center md:text-5xl md:text-left">Welcome to imani escrow services.</h1>
        <p className="max-w-sm text-center text-gray-700 md:text-left">
          Helping small businesses and individuals to transact safely and
          securely.
        </p>
        <div className="flex justify-center md:justify-start">
          <Link href='#' className="p-3 px-6 pt-2 text-white bg-blue-500 rounded-full baseline hover:bg-blue-300 md:block">Get Started</Link>
        </div>
      </div>
      <div>

      </div>
      </div>
    </section>
  );
};

export default Hero;
