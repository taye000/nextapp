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
            Elevating trust and security for small businesses and individuals by
            harnessing the power of blockchain technology to enhance our
            exceptional escrow services. Your safe transactions, our priority.
          </p>
        </div>
        <div className="md:w-1/2">
          <img
            src="/imanilogo.png"
            className="rounded-lg shadow-xl"
          ></img>
        </div>
      </div>
    </section>
  );
};

export default Hero;
