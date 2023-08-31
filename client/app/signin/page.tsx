"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie, storeCookie } from "../utils/tokenUtils";

const signin = () => {
  // initialize useRouter
  const router = useRouter();

  // get the stored cookie from local storage
  const cookie = getCookie();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // check if user is logged in
  if (cookie) {
    router.push("/account");
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`${apiUrl}/users/signin`, {
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

      // Redirect to the account page
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
        <div className="w-full max-w-xs">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 border rounded-md resize-y focus:outline-none focus:border-blue-500 invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 focus:invalid:text-red-600"
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border rounded-md resize-y focus:outline-none focus:border-blue-500"
            />
            <Link
              href={"/signin/forgotpassword"}
              className="text-blue-700 text-right hover:underline"
            >
              Forgot Password
            </Link>
            <button
              type="submit"
              className="bg-blue-700 rounded-lg text-white p-3 md:p3 md:rounded-lg md:bg-blue-700 hover:bg-blue-400 active:bg-blue-900"
            >
              Sign in
            </button>
            <p className={`m-0 max-w-[30ch] text-sm`}>
              Don't have an account,
              <Link href={"/signup"} className="text-blue-700 hover:underline">
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
