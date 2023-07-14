import Link from "next/link";
import React from "react";

const forgotpassword = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <div>
          <header>Forgot Password</header>
        </div>
        <div>
          <p className={`m-0 max-w-[30ch] text-4xl`}>Forgot Password</p>
          <form className="flex flex-col space-y-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
            />
            <button type="submit" className="button">
              Submit
            </button>
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
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
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default forgotpassword;
