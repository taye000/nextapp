import Link from "next/link";
import React from "react";

const signup = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between mt-5">
      <div>
        <div>
          <h1 className="font-bold text-2xl">Sign Up</h1>
        </div>
        <div>
          <form className="flex flex-col space-y-4">
            <label htmlFor="email">Enter your Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit md:static md:w-auto rounded-xl md:border md:bg-gray-200 md:p-4 md:dark:bg-zinc-800/30"
            />
            <label htmlFor="password">Enter your Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit md:static md:w-auto rounded-xl md:border md:bg-gray-200 md:p-4 md:dark:bg-zinc-800/30"
            />
            <label htmlFor="password">Confirm your Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit md:static md:w-auto rounded-xl md:border md:bg-gray-200 md:p-4 md:dark:bg-zinc-800/30"
            />
            <button type="submit" className="bg-blue-700 rounded-full text-white p-3 md:p3 md:rounded-full md:bg-blue-700 hover:bg-blue-500">
              Sign Up
            </button>
            <p className={`m-0 max-w-[30ch] text-sm`}>
              Already have an account, 
            <Link
              href={"/signin"}
              className="text-blue-700"
            >
              {" "}
              Sign in
            </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default signup;
