import React from "react";

const buyer = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div>
        <div>
          <h1>Buyer Form</h1>
        </div>
        <div>
          <form className="flex flex-col space-y-4">
            <label htmlFor="userId">Seller's ID</label>
            <input
              type="userId"
              name="userId"
              id="userId"
              className="left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit md:static md:w-auto rounded-xl md:border md:bg-gray-200 md:p-4 md:dark:bg-zinc-800/30"
            />
            <label htmlFor="item">Item Description</label>
            <input
              type="item"
              name="item"
              id="item"
              className="left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit md:static md:w-auto rounded-xl md:border md:bg-gray-200 md:p-4 md:dark:bg-zinc-800/30"
            />
            <label htmlFor="amount">Amount</label>
            <input
              type="amount"
              name="amount"
              id="amount"
              className="left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit md:static md:w-auto rounded-xl md:border md:bg-gray-200 md:p-4 md:dark:bg-zinc-800/30"
            />
            <label htmlFor="paymentMode">Mode of Payment</label>
            <input
              type="paymentMode"
              name="paymentMode"
              id="paymentMode"
              className="left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit md:static md:w-auto rounded-xl md:border md:bg-gray-200 md:p-4 md:dark:bg-zinc-800/30"
            />
            <button type="submit" className="bg-blue-700 rounded-full text-white p-3 md:p3 md:rounded-full md:bg-blue-700 hover:bg-blue-500">
              Submit
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default buyer;
