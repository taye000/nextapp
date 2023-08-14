"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "../utils/tokenUtils";

const signup = () => {
  // initialize useRouter
  const router = useRouter();

  // get the stored cookie from local storage
  const cookie = getCookie();

  // check if user is logged in
  if (cookie) {
    router.push("/account");
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [account_type, setAccount_type] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phoneNumber,
          password,
          confirmPassword,
          account_type
        }),
      });
      const json = await res.json();
      if (!res.ok) throw Error(json.message);

      // Clear the form fields
      setName("");
      setEmail("");
      setPhoneNumber("");
      setPassword("");
      setConfirmPassword("");
      console.log(json);

      // Redirect to the account page
      window.location.href = "/signin";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between mt-5">
      <div className="border rounded-md shadow-md p-6">
        <div className="flex justify-center">
          <h1 className="font-bold text-2xl">Sign Up</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="name"
              name="name"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit md:static md:w-auto rounded-xl md:border md:bg-gray-200 md:p-4 md:dark:bg-zinc-800/30"
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit md:static md:w-auto rounded-xl md:border md:bg-gray-200 md:p-4 md:dark:bg-zinc-800/30"
            />
            <input
              type="phoneNumber"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Enter your phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit md:static md:w-auto rounded-xl md:border md:bg-gray-200 md:p-4 md:dark:bg-zinc-800/30"
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit md:static md:w-auto rounded-xl md:border md:bg-gray-200 md:p-4 md:dark:bg-zinc-800/30"
            />
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit md:static md:w-auto rounded-xl md:border md:bg-gray-200 md:p-4 md:dark:bg-zinc-800/30"
            />
            <label className=" text-gray-600 font-bold py-2 px-4 rounded-lg">
            <input
              type="radio"
              name="account_type"
              id="account_type"
              value="Buyer"
              onChange={(e) => setAccount_type(e.target.value)}
              className="left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit md:static md:w-auto rounded-xl md:border md:bg-gray-200 md:p-4 md:dark:bg-zinc-800/30"
            /> Buyer
            <input
              type="radio"
              name="account_type"
              id="account_type"
              value="Seller"
              onChange={(e) => setAccount_type(e.target.value)}
              className="left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit md:static md:w-auto rounded-xl md:border md:bg-gray-200 md:p-4 md:dark:bg-zinc-800/30"
            /> Seller
            </label>
            <button
              type="submit"
              className="bg-blue-700 rounded-full text-white p-3 md:p3 md:rounded-full md:bg-blue-700 hover:bg-blue-500"
            >
              Sign Up
            </button>
            <p className={`m-0 max-w-[30ch] text-sm`}>
              Already have an account,
              <Link href={"/signin"} className="text-blue-700">
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
