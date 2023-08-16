"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getCookie } from "../../utils/tokenUtils";
import { ITransaction } from "../../utils/types";
import Link from "next/link";

const transactionDetail = () => {
  // initialize useRouter
  const router = useRouter();

  const searchParams = useSearchParams();
  const transactionId = searchParams.get("transactionId");
  console.log("transactionId", transactionId);

  // get the stored cookie from local storage
  const cookie = getCookie();

  // check if user is logged in
  useEffect(() => {
    if (!cookie) {
      router.push("/signin");
    }

    //fetch transaction
    if (transactionId) {
      fetchTransaction();
    }
  }, [transactionId]);

  const [transaction, setTransaction] = useState<ITransaction | null>(null);

  const fetchTransaction = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/transactions/get-transaction/${transactionId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${cookie}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("error fetching Transaction");
      }
      const data = await response.json();

      //update Transactions
      setTransaction(data.transaction);

    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmation = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/transactions/update-transaction/${transactionId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${cookie}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("error fetching Transaction");
      }
      const data = await response.json();

      //update Transactions
      setTransaction(data.transaction);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen justify-between mt-5">
      <div>
        <h2 className="text-2xl p-4 font-bold text-left">Order Detail</h2>
      </div>
      <div className="border rounded-md shadow-md p-6 m-4">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-left">
            Order Id : {transaction?.id}
          </h2>
          <h2 className="text-2xl font-bold text-left">
            Buyer Id : {transaction?.clientId}
          </h2>
        </div>
        <div className="p-4">
          <div className="grid gap-4 p-4 lg:grid-cols-3">
            <div className="flex justify-between w-1/2 border rounded-md shadow-md p-6 col-span-1 lg:col:span-2">
              <p className="bg-green-200 flex justify-center items-center p-2 rounded-md">
                <span className="text-green-700 text-lg">Item</span>
              </p>
              <div className="flex flex-col w-full p-4 pb-4 md:flex md:justify-center">
                <p className="text-2xl font-bold">{transaction?.item}</p>
              </div>
            </div>
            <div className="flex justify-between w-1/2 border rounded-md shadow-md p-6 col-span-1 lg:col:span-2">
              <p className="bg-green-200 flex justify-center items-center p-2 rounded-md">
                <span className="text-green-700 text-lg">Mode</span>
              </p>
              <div className="flex flex-col w-full p-4 pb-4 md:flex md:justify-center">
                <p className="text-2xl font-bold">{transaction?.mode}</p>
              </div>
            </div>
            <div className="flex justify-between w-1/2 border rounded-md shadow-md p-6 col-span-1 lg:col:span-2">
              <p className="bg-green-200 flex justify-center items-center p-2 rounded-md">
                <span className="text-green-700 text-lg">Amount</span>
              </p>
              <div className="flex flex-col w-full p-4 pb-4 md:flex md:justify-center">
                <p className="text-2xl font-bold">{transaction?.amount}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-2 md:flex md:justify-center">
          <button
            onClick={handleConfirmation}
            className="bg-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg"
          >
            I Confirm this item has been delivered!
          </button>
        </div>
      </div>
    </main>
  );
};

export default transactionDetail;
