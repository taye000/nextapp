import React from "react";

const Features = () => {
  return (
    <section id="features">
      <div className="container flex flex-col px-4 mx-auto mt-10 space-y-12 md:space-y-10 md:flex-row">
        <div className="flex flex-col space-y-12 md:w-1/2">
          <h2 className="max-w-md text-4xl font-bold text-center md:text-left">
            What Imani Escrow offers.
          </h2>
          <p className="max-w-sm text-center text-gray-700 md:text-left">
            Secure your online purchases with our Escrow services, and have ease
            of mind as you transact in the digital world.
          </p>
        </div>
        <div className="flex flex-col space-y-8 md:w-1/2">
          <div className="flex flex-col space-y-3 md-space-y-0 md:space-x-6 md:flex-row">
            <div className="rounded-l-full bg-blue-200 md:bg-transparent">
              <div className="flex items-center space-x-2">
                <div className="px-4 py-2 text-white rounded-full md:py-1 bg-blue-800">
                  01
                </div>
                <h3 className="text-base font-bold md:mb-4 md:hidden">
                  Buyer and Seller agree to terms.
                </h3>
              </div>
            </div>
            <div>
              <h3 className="hidden mb-4 text-lg font-bold md:block">
                Buyer and Seller agree to terms.
              </h3>
              <p className="text-gray-700">
                Buyer and Seller agree to terms, which includes a description of
                the item, sale price, number of days for the Buyer's inspection,
                and any shipping information.
              </p>
            </div>
          </div>
          <div className="flex flex-col space-y-3 md-space-y-0 md:space-x-6 md:flex-row">
            <div className="rounded-l-full bg-blue-200 md:bg-transparent">
              <div className="flex items-center space-x-2">
                <div className="px-4 py-2 text-white rounded-full md:py-1 bg-blue-800">
                  02
                </div>
                <h3 className="text-base font-bold md:mb-4 md:hidden">
                  Buyer deposits funds.
                </h3>
              </div>
            </div>
            <div>
              <h3 className="hidden mb-4 text-lg font-bold md:block">
                Buyer deposits funds.
              </h3>
              <p className="text-gray-700">
                Buyer deposits funds into Imani Escrow Services' and links the
                transaction to the item and the seller's id.
              </p>
            </div>
          </div>
          <div className="flex flex-col space-y-3 md-space-y-0 md:space-x-6 md:flex-row">
            <div className="rounded-l-full bg-blue-200 md:bg-transparent">
              <div className="flex items-center space-x-2">
                <div className="px-4 py-2 text-white rounded-full md:py-1 bg-blue-800">
                  03
                </div>
                <h3 className="text-base font-bold md:mb-4 md:hidden">
                  Seller ships the item.{" "}
                </h3>
              </div>
            </div>
            <div>
              <h3 className="hidden mb-4 text-lg font-bold md:block">
                Seller ships the item.
              </h3>
              <p className="text-gray-700">
                Seller will see the funds have been deposited and will ship the
                item with peace of mind.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
