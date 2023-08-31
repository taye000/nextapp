"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getCookie } from "../utils/tokenUtils";
import { ITransaction } from "../utils/types";

const transactionsList = () => {
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
    // Fetch user data and transactions
    fetchTransactions();
  }, []);

  const [transactions, setTransactions] = useState<Array<ITransaction>>([]);

  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    try {
      //set loading to true beore fetching the data
      setLoading(true);

      const response = await fetch(
        `${apiUrl}/transactions/get-user-transactions`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${cookie}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("error fetching Transactions");
      }
      const data = await response.json();

      //update Transactions & clear loading
      setTransactions(data.transactions);
      setLoading(false);
    } catch (error) {
      console.error(error);
    } 
  };

  return (
    <main className="min-h-screen justify-between mt-5">
      <div className="border rounded-md shadow-md p-6 m-4">
        <div>
          <h2 className="text-2xl font-bold text-left">Orders</h2>
        </div>
        <div className="p-4">
          <div className="w-full m-auto p-4 border rounded-md overflow-y-auto">
            <div className="my-3 p-2 grid md:grid-cols-7 sm:grid-cols-4 grid-cols-3 items-center justify-between cursor-pointer">
              <span className=" font-bold">Order ID</span>
              <span className="sm:text-left font-bold text-right">
                Item Desc
              </span>
              <span className="hidden font-bold md:grid">Seller ID</span>
              <span className="sm:text-left font-bold text-right">Amount</span>
              <span className="hidden font-bold md:grid">Mode</span>
              <span className="sm:text-left font-bold text-right">Buyer</span>
              <span className="hidden font-bold md:grid">Seller</span>
            </div>
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-800"></div>
              </div>
            ) : (
              <ul>
                {transactions.map((transaction, id) => (
                  <Link
                    href={`/transactions/get-transaction?transactionId=${transaction.id}`}
                  >
                    <li
                      key={id}
                      className="hover:bg-gray-200 rounded-md my-3 p-2 grid md:grid-cols-7 sm:grid-cols-4 grid:cols-3 items-center justify-between cursor-pointer"
                    >
                      <p className="truncate">{transaction.id}</p>
                      <p className="font-bold truncate">{transaction.item}</p>
                      <p className="truncate">{transaction.userId}</p>
                      <p className="font-bold truncate">
                        ${transaction.amount}
                      </p>
                      <p className="truncate">{transaction.mode}</p>

                      <p className="sm:text-left font-bold text-right">
                        <span
                          className={
                            transaction.customerStatus === "completed"
                              ? "bg-blue-800 p-2 rounded-lg"
                              : transaction.customerStatus === "pending"
                              ? "bg-yellow-400 p-2 rounded-lg"
                              : "bg-red-600 p-2 rounded-lg"
                          }
                        >
                          {transaction.customerStatus}
                        </span>
                      </p>
                      <p className="sm:text-left font-bold text-right">
                        <span
                          className={
                            transaction.status === "completed"
                              ? "bg-blue-800 p-2 rounded-lg"
                              : transaction.status === "pending"
                              ? "bg-yellow-400 p-2 rounded-lg"
                              : "bg-red-600 p-2 rounded-lg"
                          }
                        >
                          {transaction.status}
                        </span>
                      </p>
                      <div className="p-2 md:flex md:justify-start"></div>
                    </li>
                  </Link>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default transactionsList;
