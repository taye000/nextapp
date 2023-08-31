"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "../utils/tokenUtils";
import { IUser } from "../utils/types";

const seller = () => {
  // initialize useRouter
  const router = useRouter();

  // get the stored cookie from local storage
  const cookie = getCookie();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // check if user is logged in
  useEffect(() => {
    if (!cookie) {
      router.push("/signin");
    }
    // Fetch user data
    fetchUserData();
  }, []);

  const [clientId, setclientId] = useState("");
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState("");
  const [item, setItem] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${apiUrl}/transactions/create-transaction`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${cookie}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clientId,
            amount,
            mode,
            item,
          }),
        }
      );
      const json = await res.json();
      if (!res.ok) throw Error(json.message);
      // Clear the form fields
      setclientId("");
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

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/users/currentuser`,
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

      // Update user state with fetched data
      setUser(userData.user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between mt-5">
      <div className="border rounded-md shadow-md p-6">
        <div className="flex justify-center">
          <h1 className="font-bold text-2xl">Seller Form</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
            required
              type="clientId"
              name="clientId"
              id="clientId"
              placeholder="Buyer's ID"
              value={clientId}
              onChange={(e) => setclientId(e.target.value)}
              className="w-full p-4 border rounded-md resize-y focus:outline-none focus:border-blue-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 focus:invalid:text-red-600"
            />
            <input
            required
              type="amount"
              name="amount"
              id="amount"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-4 border rounded-md resize-y focus:outline-none focus:border-blue-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 focus:invalid:text-red-600"
            />
            <input
            required
              type="mode"
              name="mode"
              id="mode"
              placeholder="Mode of Payment"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full p-4 border rounded-md resize-y focus:outline-none focus:border-blue-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 focus:invalid:text-red-600"
            />
            <input
            required
              type="item"
              name="item"
              id="item"
              placeholder="Item Description"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              className="w-full p-4 border rounded-md resize-y focus:outline-none focus:border-blue-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 focus:invalid:text-red-600"
            />
            <button
              type="submit"
              className="bg-blue-700 rounded-full text-white p-3 md:p3 md:rounded-full md:bg-blue-700 hover:bg-blue-400 active:bg-blue-900"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default seller;
