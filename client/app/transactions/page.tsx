"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getCookie } from "../utils/tokenUtils";
import { ITransaction, IUser } from "../utils/types";

const transactions = () => {
  // initialize useRouter
  const router = useRouter();

  // get the stored cookie from local storage
  const cookie = getCookie();

  // check if user is logged in
  useEffect(() => {
    if (!cookie) {
      router.push("/signin");
    }
    // Fetch user data and transactions
    fetchUserData();
    fetchTransactions();
  }, []);

  const [transactions, setTransactions] = useState<Array<ITransaction>>([]);

  const [user, setUser] = useState<IUser>({
    id: "",
    name: "",
    email: "",
    photo: "",
    coverPhoto: "",
    phoneNumber: "",
  });

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

      // Update user state with fetched data
      setUser(userData.user);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchTransactions = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/transactions/get-user-transactions",
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

      //update Transactions
      setTransactions(data.transactions);
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
              <span className="sm:text-left font-bold text-right">Status</span>

              {user.account_type === "Seller" && (
                <span className="hidden font-bold md:grid">Action</span>
              )}
            </div>

            {transactions.length > 0 ? (
              <ul>
                {transactions.map((transaction, id) => (
                  <li
                    key={id}
                    className="hover:bg-gray-200 rounded-md my-3 p-2 grid md:grid-cols-7 sm:grid-cols-4 grid:cols-3 items-center justify-between cursor-pointer"
                  >
                    <div className="flex">
                      <div className="pl-4">
                        <p>Order No. {transaction.id}</p>
                      </div>
                    </div>
                    <p className="font-bold">{transaction.item}</p>
                    <p>{transaction.userId}</p>
                    <p className="font-bold">${transaction.amount}</p>
                    <p>{transaction.mode}</p>

                    <p className="sm:text-left font-bold text-right">
                      <span
                        className={
                          transaction.status === "completed"
                            ? "bg-blue-400 p-2 rounded-lg"
                            : transaction.status === "pending"
                            ? "bg-yellow-400 p-2 rounded-lg"
                            : "bg-red-400 p-2 rounded-lg"
                        }
                      >
                        {transaction.status}
                      </span>
                    </p>
                    {user.account_type === "Seller" && (
                      <div className="p-2 md:flex md:justify-start">
                        <Link
                          href={`/transactions/get-transaction?transactionId=${transaction.id}`}
                          className="bg-green-800 hover:bg-green-500 text-white font-bold p-2 rounded-lg"
                        >
                          Process
                        </Link>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex justify-center items-center">
                <p className="text-2xl">No transactions yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default transactions;
