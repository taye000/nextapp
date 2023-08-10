"use client";
import React, { useState, useEffect } from "react";
import { IUser } from "../utils/types";
import { getCookie } from "../utils/tokenUtils";

const buyer = () => {
  // get the stored cookie from local storage
  const cookie = getCookie();

  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState("");
  const [item, setItem] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "http://localhost:5000/api/transactions/create-transaction",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${cookie}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            amount,
            item,
            mode,
          }),
        }
      );
      const json = await res.json();
      if (!res.ok) throw Error(json.message);
      // Clear the form fields
      setUserId("");
      setAmount("");
      setMode("");
      setItem("");
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };

  const [user, setUser] = useState<IUser>({
    id: "",
    name: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/users/currentuser",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${cookie}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error fetching user data");
        }
        const userData = await response.json();
        console.log("Fetched user data:", userData.user);

        // Update user state with fetched data
        setUser(userData.user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between mt-5">
      <div className="border rounded-md shadow-md p-6">
        <div className="flex justify-center">
          <h1 className="font-bold text-2xl">Buyer Form</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="userId"
              name="userId"
              id="userId"
              placeholder="Seller's ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit md:static md:w-auto rounded-xl md:border md:bg-gray-200 md:p-4 md:dark:bg-zinc-800/30"
            />
            <input
              type="amount"
              name="amount"
              id="amount"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit md:static md:w-auto rounded-xl md:border md:bg-gray-200 md:p-4 md:dark:bg-zinc-800/30"
            />
            <input
              type="mode"
              name="mode"
              id="mode"
              placeholder="Mode of Payment"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit md:static md:w-auto rounded-xl md:border md:bg-gray-200 md:p-4 md:dark:bg-zinc-800/30"
            />
            <input
              type="item"
              name="item"
              id="item"
              placeholder="Item Description"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              className="left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit md:static md:w-auto rounded-xl md:border md:bg-gray-200 md:p-4 md:dark:bg-zinc-800/30"
            />
            <button
              type="submit"
              className="bg-blue-700 rounded-full text-white p-3 md:p3 md:rounded-full md:bg-blue-700 hover:bg-blue-500"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default buyer;
