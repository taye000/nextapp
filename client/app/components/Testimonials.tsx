import React from "react";

const Testimonials = () => {
  return (
    <section id="testimonials">
      <div className="max-w-6xl px-5 mx-auto mt-32 text-center">
        <h2 className="text-4xl font-bold text-center">
          What's Special About Imani Escrow Services?
        </h2>
        <div className="flex flex-col mt-24 md:flex-row md:space-x-6">
          <div className="flex flex-col items-center p-6 space-y-6 rounded-lg bg-gray-300 md:w-1/3 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110">
            <img
              src="/Milky_Way_at_Bear_Lake_4_nxqjo2.jpg"
              className="w-16 -mt-14"
              alt=""
            />
            <h5 className="text-lg font-bold">Michael Wu</h5>
            <p className="text-sm text-gray-500">
              "This is a great service. I was able to buy a laptop from a seller in
              another province and have it shipped to me. I was able to inspect
              the laptop and make sure it was what I wanted before the seller got
              paid."
            </p>
          </div>
          <div className="hidden flex-col items-center p-6 space-y-6 rounded-lg bg-gray-300 md:flex md:w-1/3 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110">
            <img
              src="/Milky_Way_at_Bear_Lake_4_nxqjo2.jpg"
              className="w-16 -mt-14"
              alt=""
            />
            <h5 className="text-lg font-bold">George Washington</h5>
            <p className="text-sm text-gray-500">
              "They made me feel safe and secure when I was buying my first car"
            </p>
          </div>
          <div className="hidden flex-col items-center p-6 space-y-6 rounded-lg bg-gray-300 md:flex md:w-1/3 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110">
            <img
              src="/Milky_Way_at_Bear_Lake_4_nxqjo2.jpg"
              className="w-16 -mt-14"
              alt=""
            />
            <h5 className="text-lg font-bold">Lissete Isimbi</h5>
            <p className="text-sm text-gray-500">
              "The service and support was great. I was able to get my money back when I was nearly scammed."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
