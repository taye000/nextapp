"use client"
import Link from "next/link";
import React, { useState } from "react";
import { storeCookie } from "../utils/tokenUtils";

const signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw Error(json.message);

      //save the token in the browser
      storeCookie(json.cookie);
      console.log("cookie", json.cookie);
      

      // Clear the form fields
      setEmail("");
      setPassword("");

      console.log(json);

      // Redirect to the home page
      window.location.href = "/account";

    } catch (error) {
      console.error(error);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between mt-5">
      <div className="border rounded-md shadow-md p-6">
        <div className="flex justify-center">
          <h1 className="font-bold text-2xl">Sign in</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit}
          className="flex flex-col space-y-4">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit md:static md:w-auto rounded-xl md:border md:bg-gray-200 md:p-4 md:dark:bg-zinc-800/30"
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit md:static md:w-auto rounded-xl md:border md:bg-gray-200 md:p-4 md:dark:bg-zinc-800/30"
            />
            <Link
              href={"/signin/forgotpassword"}
              className="text-blue-700 text-right"
            >
              Forgot Password
            </Link>
            <button
              type="submit"
              className="bg-blue-700 rounded-full text-white p-3 md:p3 md:rounded-full md:bg-blue-700 hover:bg-blue-500"
            >
              Sign in
            </button>
            <p className={`m-0 max-w-[30ch] text-sm`}>
              Don't have an account,
              <Link href={"/signup"} className="text-blue-700">
                {" "}
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default signin;
