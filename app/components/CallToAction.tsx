import Link from "next/link";
import React from "react";

const CallToAction = () => {
  return (
    <section id="cta" className="bg-blue-500 mt-4">
      <div className="container flex flex-col items-center justify-between px-6 py-24 mx-auto space-y-12 md:py-12 md:flex-row md:space-y-0">
        <h2 className="text-5xl font-bold leading-tight text-center text-white md:max-w-xl md:text-4xl md:text-left">
          Secure your online purchases with our Escrow services today.
        </h2>
        <div>
          <Link
            href="#"
            className="p-3 px-6 pt-2 text-blue-700 bg-white shadow-2xl rounded-full baseline hover:bg-gray-900 md:block"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
