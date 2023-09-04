"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "../utils/tokenUtils";

const signup = () => {
  // initialize useRouter
  const router = useRouter();

  // get the stored cookie from local storage
  const cookie = getCookie();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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
      const res = await fetch(`${apiUrl}/users/signup`, {
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
          account_type,
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
              required
              type="name"
              name="name"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 border rounded-md resize-y focus:outline-none focus:border-blue-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 focus:invalid:text-red-600"
            />
            <input
              required
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 border rounded-md resize-y focus:outline-none focus:border-blue-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 focus:invalid:text-red-600"
            />
            <input
              required
              type="phoneNumber"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Enter your phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-4 border rounded-md resize-y focus:outline-none focus:border-blue-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 focus:invalid:text-red-600"
            />
            <input
              required
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border rounded-md resize-y focus:outline-none focus:border-blue-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 focus:invalid:text-red-600"
            />
            <input
              required
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-4 border rounded-md resize-y focus:outline-none focus:border-blue-500  invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 focus:invalid:text-red-600"
            />
            <div className="container">
              Select Account Type
              <div className="p-2">
                <input
                  type="radio"
                  name="account_type"
                  id="Buyer"
                  value="Buyer"
                  onChange={(e) => setAccount_type(e.target.value)}
                  className="p-4 border rounded-md resize-y focus:outline-none focus:border-blue-500"
                  style={{ marginRight: "10px", width: "20px", height: "20px" }}
                />
                <label htmlFor="Buyer" className=" text-lg">Buyer</label>
              </div>
              <div className="p-2">
                <input
                  type="radio"
                  name="account_type"
                  id="Seller"
                  value="Seller"
                  onChange={(e) => setAccount_type(e.target.value)}
                  className="p-4 border rounded-md resize-y focus:outline-none focus:border-blue-500"
                  style={{ marginRight: "10px", width: "20px", height: "20px" }}
                />
                <label htmlFor="Seller" className="text-lg">Seller</label>
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-700 rounded-full text-white p-3 md:p3 md:rounded-full md:bg-blue-700 hover:bg-blue-400 active:bg-blue-900"
            >
              Sign Up
            </button>
            <p className={`m-0 max-w-[30ch] text-sm`}>
              Already have an account,
              <Link href={"/signin"} className="text-blue-700 hover:underline">
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
