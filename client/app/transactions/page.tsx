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

  const [transactions, setTransactions] = useState<Array<ITransaction>>([]);

  const [loading, setLoading] = useState(false);

  const [sortAmountOrder, setSortAmountOrder] = useState("asc");
  
  const [sortAlphabeticalOrder, setSortAlphabeticalOrder] = useState("asc");

  const handleSortAlphabeticalOrder = () => {
    if (sortAlphabeticalOrder === "asc") {
      setTransactions(
        transactions.sort((a, b) => {
          return a.item.localeCompare(b.item);
        })
      );
      setSortAlphabeticalOrder("desc");
    } else {
      setTransactions(
        transactions.sort((a, b) => {
          return b.item.localeCompare(a.item);
        })
      );
      setSortAlphabeticalOrder("asc");
    }
  }

  const handleSortAmount = () => {
    if (sortAmountOrder === "asc") {
      setTransactions(
        transactions.sort((a, b) => {
          return a.amount - b.amount;
        })
      );
      setSortAmountOrder("desc");
    } else {
      setTransactions(
        transactions.sort((a, b) => {
          return b.amount - a.amount;
        })
      );
      setSortAmountOrder("asc");
    }
  }

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
      setLoading(false);
    }
  };

  // check if user is logged in
  useEffect(() => {
    if (!cookie) {
      router.push("/signin");
    } else {
      // Fetch user data and transactions
      fetchTransactions();
    }
  }, [cookie]);

  return (
    <main className="min-h-screen justify-between mt-5">
      <div className="border rounded-md shadow-md p-1 py-4 m-4">
        <div className="flex justify-center">
          <h2 className="text-2xl font-bold text-left">Orders</h2>
        </div>
        <div className="py-2">
          <div className="w-full m-auto p-4 border rounded-md overflow-y-auto overflow-x-auto">
            <div className="my-3 p-2 flex flex-wrap items-center justify-between">
              <span className="font-bold w-1/7 px-2 cursor-pointer" onClick={handleSortAlphabeticalOrder}>Order ID</span>
              <span className="font-bold w-1/7 px-2 cursor-pointer" onClick={handleSortAlphabeticalOrder}>
                Item Desc
              </span>
              <span className="font-bold w-1/7 px-2 cursor-pointer" onClick={handleSortAlphabeticalOrder}>Seller ID</span>
              <span className="font-bold w-1/7 px-2 cursor-pointer" onClick={handleSortAmount}>Amount</span>
              <span className="font-bold w-1/7 px-2 cursor-pointer" onClick={handleSortAlphabeticalOrder}>Mode</span>
              <span className="font-bold w-1/7 px-2">Buyer</span>
              <span className="font-bold w-1/7 px-2">Seller</span>
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
                      className="flex-shrink-0 hover:bg-gray-200 rounded-md my-3 mx-2 p-2 items-center justify-between cursor-pointer grid grid-cols-7 sm:grid-cols-7 md:grid-cols-7"
                    >
                      <p className="truncate w-full">{transaction.id}</p>
                      <p className="font-bold truncate w-full">{transaction.item}</p>
                      <p className="truncate w-full">{transaction.userId}</p>
                      <p className="font-bold truncate w-full">
                        ${transaction.amount}
                      </p>
                      <p className="truncate w-full">{transaction.mode}</p>

                      <p className="sm:text-left font-bold text-right w-full">
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
                      <p className="sm:text-left font-bold text-right w-full">
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
