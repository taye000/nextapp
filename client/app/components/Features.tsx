import React from "react";

const Features = () => {
  return (
    <section id="features">
      <div className="flex flex-col justify-center py-4">
        <div>
          <h2 className="text-4xl font-bold text-center">
            What Imani Escrow offers.
          </h2>
        </div>
        <div>
          <p className="flex justify-center text-center text-gray-700">
            Experience peace of mind in the digital realm with our Escrow
            services, safeguarding your online purchases and ensuring secure
            transactions.
          </p>
        </div>
      </div>
      <div className="container shadow flex flex-col p-4 mx-auto mt-10 space-y-12 md:space-y-10 md:flex-row">
        <div className="flex flex-col space-y-8">
          <div className="md:grid md:grid-cols-2">
              <div className="flex flex-col space-y-3 md-space-y-0 md:space-x-6 md:flex-row">
                <div className="rounded-l-full bg-blue-200 md:bg-transparent">
                  <div className="flex items-center space-x-2">
                    <div className="px-4 py-2 text-white rounded-full my-3 md:py-1 bg-blue-800">
                      01
                    </div>
                    <h3 className="text-base font-bold md:mb-4 md:hidden">
                      Agreement on Terms:
                    </h3>
                  </div>
                </div>
                <div>
                  <h3 className="hidden mb-4 text-lg font-bold md:block">
                    Agreement on Terms:
                  </h3>
                  <p className="text-gray-700">
                    Buyer and Seller reach a mutual agreement on the terms of
                    the transaction. This encompasses a detailed item
                    description, the sale price, the specified inspection period
                    for the Buyer, and any pertinent shipping information.
                  </p>
                </div>
              </div>
              <div className="flex flex-col space-y-3 md-space-y-0 md:space-x-6 md:flex-row">
                <div className="rounded-l-full bg-blue-200 md:bg-transparent">
                  <div className="flex items-center space-x-2">
                    <div className="px-4 py-2 text-white rounded-full my-3 md:py-1 bg-blue-800">
                      02
                    </div>
                    <h3 className="text-base font-bold md:mb-4 md:hidden">
                      Secure Fund Deposit:
                    </h3>
                  </div>
                </div>
                <div>
                  <h3 className="hidden mb-4 text-lg font-bold md:block">
                    Secure Fund Deposit:
                  </h3>
                  <p className="text-gray-700">
                    The Buyer securely deposits funds into Imani Escrow Services
                    while associating the transaction with the item and the
                    Seller's unique identification.
                  </p>
                </div>
              </div>
              <div className="flex flex-col space-y-3 md-space-y-0 md:space-x-6 md:flex-row">
                <div className="rounded-l-full bg-blue-200 md:bg-transparent">
                  <div className="flex items-center space-x-2">
                    <div className="px-4 py-2 text-white rounded-full my-3 md:py-1 bg-blue-800">
                      03
                    </div>
                    <h3 className="text-base font-bold md:mb-4 md:hidden">
                      Hassle-Free Shipping:{" "}
                    </h3>
                  </div>
                </div>
                <div>
                  <h3 className="hidden mb-4 text-lg font-bold md:block">
                    Hassle-Free Shipping:
                  </h3>
                  <p className="text-gray-700">
                    With the assurance of deposited funds, the Seller proceeds
                    to ship the item, knowing their transaction is safeguarded.
                  </p>
                </div>
              </div>
              <div className="flex flex-col space-y-3 md-space-y-0 md:space-x-6 md:flex-row">
                <div className="rounded-l-full bg-blue-200 md:bg-transparent">
                  <div className="flex items-center space-x-2">
                    <div className="px-4 py-2 text-white rounded-full my-3 md:py-1 bg-blue-800">
                      04
                    </div>
                    <h3 className="text-base font-bold md:mb-4 md:hidden">
                      Verification and Release:{" "}
                    </h3>
                  </div>
                </div>
                <div>
                  <h3 className="hidden mb-4 text-lg font-bold md:block">
                    Verification and Release:
                  </h3>
                  <p className="text-gray-700">
                    Upon receiving the item as expected, the Buyer verifies its
                    condition and marks the order as complete. At this point,
                    the funds are released to the Seller, ensuring a smooth and
                    secure transaction process.
                  </p>
                </div>
            </div>
              <div className="flex flex-col space-y-3 md-space-y-0 md:space-x-6 md:flex-row">
                <div className="rounded-l-full bg-blue-200 md:bg-transparent">
                  <div className="flex items-center space-x-2">
                    <div className="px-4 py-2 text-white rounded-full my-3 md:py-1 bg-blue-800">
                      05
                    </div>
                    <h3 className="text-base font-bold md:mb-4 md:hidden">
                      Dispute Resolution:{" "}
                    </h3>
                  </div>
                </div>
                <div>
                  <h3 className="hidden mb-4 text-lg font-bold md:block">
                    Dispute Resolution:
                  </h3>
                  <p className="text-gray-700">
                    In the event of a dispute between the Buyer and Seller
                    regarding the item's condition or other transaction-related
                    issues, our escrow service provides a platform for mediation
                    and conflict resolution.
                  </p>
                </div>
              </div>
              <div className="flex flex-col space-y-3 md-space-y-0 md:space-x-6 md:flex-row">
                <div className="rounded-l-full bg-blue-200 md:bg-transparent">
                  <div className="flex items-center space-x-2">
                    <div className="px-4 py-2 text-white rounded-full my-3 md:py-1 bg-blue-800">
                      06
                    </div>
                    <h3 className="text-base font-bold md:mb-4 md:hidden">
                      Return or Refund Process:{" "}
                    </h3>
                  </div>
                </div>
                <div>
                  <h3 className="hidden mb-4 text-lg font-bold md:block">
                    Return or Refund Process:
                  </h3>
                  <p className="text-gray-700">
                    If the Buyer is not completely satisfied with the received
                    item and wishes to initiate a return, we have a well-defined
                    return and refund process in place. Buyers can request a
                    return within a specified timeframe and provide reasons for
                    the return. Once the item is returned and inspected, we
                    facilitate a prompt refund or replacement, as per the agreed
                    terms.
                  </p>
                </div>
              </div>
              <div className="flex flex-col space-y-3 md-space-y-0 md:space-x-6 md:flex-row">
                <div className="rounded-l-full bg-blue-200 md:bg-transparent">
                  <div className="flex items-center space-x-2">
                    <div className="px-4 py-2 text-white rounded-full my-3 md:py-1 bg-blue-800">
                      07
                    </div>
                    <h3 className="text-base font-bold md:mb-4 md:hidden">
                      Escrow Fee Information:{" "}
                    </h3>
                  </div>
                </div>
                <div>
                  <h3 className="hidden mb-4 text-lg font-bold md:block">
                    Escrow Fee Information:
                  </h3>
                  <p className="text-gray-700">
                    We believe in transparency when it comes to fees. Our escrow
                    fee structure is straightforward. We charge a nominal fee,
                    which is typically a percentage of the transaction amount.
                    This fee is clearly outlined at the beginning of the
                    transaction, ensuring that both Buyers and Sellers are aware
                    of the associated costs. Rest assured, there are no hidden
                    charges.
                  </p>
                </div>
              </div>
              <div className="flex flex-col space-y-3 md-space-y-0 md:space-x-6 md:flex-row">
                <div className="rounded-l-full bg-blue-200 md:bg-transparent">
                  <div className="flex items-center space-x-2">
                    <div className="px-4 py-2 text-white rounded-full my-3 md:py-1 bg-blue-800">
                      08
                    </div>
                    <h3 className="text-base font-bold md:mb-4 md:hidden">
                      Communication Protocol:{" "}
                    </h3>
                  </div>
                </div>
                <div>
                  <h3 className="hidden mb-4 text-lg font-bold md:block">
                    Communication Protocol:
                  </h3>
                  <p className="text-gray-700">
                    Throughout the process, our platform facilitates seamless
                    communication between Buyers, Sellers, and our escrow
                    service. You'll receive timely email notifications, and you
                    can also log in to our platform to track the progress of
                    your transaction, exchange messages, and receive updates,
                    ensuring that you're always in the know.
                  </p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
