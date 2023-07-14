import Link from "next/link";
import React from "react";

const otp = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <div>
          <header>Enter Recovery Code</header>
        </div>
        <div>
          <p className={`m-50 max-w-[30ch] text-4xl`}>One-Time-Pass</p>
          <form className="flex flex-col space-y-4">
            <input
              type="Code"
              name="Code"
              id="Code"
              className="left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
            />
            <button type="submit" className="button">
              Continue
            </button>
            <Link
              href={"/signup"}
              className="left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
            >
              Sign up
            </Link>
            <Link
              href={"/signin"}
              className="left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
            >
              sign in
            </Link>
          </form>
        </div>
      </div>
    </main>
  );
};

export default otp;
