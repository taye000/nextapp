import Link from "next/link";
import React from "react";

const signup = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className={`mb-3 text-4xl font-bold`}>
          Welcome to Imani Escrow Services
        </h1>
        <p className={`m-0 max-w-[30ch] text-sm`}>
        Create your account
          </p>
      </div>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      <p className={`m-0 max-w-[30ch] text-sm`}>
        Already have an account,
          </p>
        <Link
          href={"/signin"}
          className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
        >
          Sign in
        </Link>
      </div>
    </main>
  );
};

export default signup;
