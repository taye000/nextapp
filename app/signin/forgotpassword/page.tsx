import Link from "next/link";
import React from "react";

const forgotpassword = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between mt-5">
      <div className="border rounded-md shadow-md p-6">
        <div className="flex justify-center">
          <h1 className="font-bold text-2xl">Forgot Password</h1>
        </div>
        <div>
          <form className="flex flex-col space-y-4">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="lleft-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit md:static md:w-auto rounded-xl md:border md:bg-gray-200 md:p-4 md:dark:bg-zinc-800/30"
            />
            <button type="submit" className="bg-blue-700 rounded-full text-white p-3 md:p3 md:rounded-full md:bg-blue-700 hover:bg-blue-500">
              Continue
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default forgotpassword;
