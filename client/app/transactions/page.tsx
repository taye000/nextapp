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

  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  // Get current transactions
  const getCurrentTransactions = () => {
    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction =
      indexOfLastTransaction - transactionsPerPage;
    return transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  };

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
  };

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
  };

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
        <div>
          <div className="py-2">
            <div className="w-full m-auto p-4 border rounded-md overflow-auto hidden md:block">
              <table className="table-auto">
                <thead className="border-b-2 border-gray-200">
                  <tr className="grid grid-cols-7 sm:grid-cols-7 md:grid-cols-7 items-center justify-between">
                    <th
                      className="font-semibold w-30 p-3 tracking-wide text-left cursor-pointer active:opacity-50"
                      onClick={handleSortAlphabeticalOrder}
                    >
                      Order ID
                    </th>
                    <th
                      className="font-semibold w-30 p-3 tracking-wide text-left cursor-pointer active:opacity-50"
                      onClick={handleSortAlphabeticalOrder}
                    >
                      Item Desc
                    </th>
                    <th
                      className="font-semibold w-30 p-3 tracking-wide text-left cursor-pointer active:opacity-50"
                      onClick={handleSortAlphabeticalOrder}
                    >
                      Seller ID
                    </th>
                    <th
                      className="font-semibold w-30 p-3 tracking-wide text-left cursor-pointer active:opacity-50"
                      onClick={handleSortAmount}
                    >
                      Amount
                    </th>
                    <th
                      className="font-semibold w-30 p-3 tracking-wide text-left cursor-pointer active:opacity-50"
                      onClick={handleSortAlphabeticalOrder}
                    >
                      Mode
                    </th>
                    <th
                      className="font-semibold w-30 p-3 tracking-wide text-left cursor-pointer active:opacity-50"
                      onClick={handleSortAlphabeticalOrder}
                    >
                      Buyer
                    </th>
                    <th
                      className="font-semibold w-30 p-3 tracking-wide text-left cursor-pointer active:opacity-50"
                      onClick={handleSortAlphabeticalOrder}
                    >
                      Seller
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-800"></div>
                      </td>
                    </tr>
                  ) : (
                    transactions.map((transaction, id) => (
                      <Link
                        href={`/transactions/get-transaction?transactionId=${transaction.id}`}
                      >
                        <tr
                          key={id}
                          className="hover:bg-gray-200 rounded-md  justify-between cursor-pointer grid grid-cols-7 md:grid-cols-7 transition ease-in-outdelay-100 hover:-translate-y-1 hover:scale-100"
                        >
                          <td className="truncate w-full p-3 text-sm">
                            {transaction.id}
                          </td>
                          <td className="font-bold whitespace-nowrap w-full p-3 text-sm">
                            {transaction.item}
                          </td>
                          <td className="truncate w-full p-3 text-sm">
                            {transaction.userId}
                          </td>
                          <td className="font-bold whitespace-nowrap w-full p-3 text-sm">
                            ${transaction.amount}
                          </td>
                          <td className="whitespace-nowrap w-full p-3 text-sm">
                            {transaction.mode}
                          </td>
                          <td className="sm:text-left w-full p-3 text-sm font-bold text-right">
                            <span
                              className={
                                transaction.customerStatus === "completed"
                                  ? "bg-blue-800 p-1.5 text-xs font-medium uppercase tracking-wider bg-opacity-50 rounded-lg"
                                  : transaction.customerStatus === "pending"
                                  ? "bg-yellow-400 p-1.5 text-xs font-medium uppercase tracking-wider bg-opacity-50 rounded-lg"
                                  : "bg-red-600 p-1.5 text-xs font-medium uppercase tracking-wider bg-opacity-50 rounded-lg"
                              }
                            >
                              {transaction.customerStatus}
                            </span>
                          </td>
                          <td className="sm:text-left w-full p-3 text-sm font-bold text-right">
                            <span
                              className={
                                transaction.status === "completed"
                                  ? "bg-blue-800 p-1.5 text-xs font-medium uppercase tracking-wider bg-opacity-50 rounded-lg"
                                  : transaction.status === "pending"
                                  ? "bg-yellow-400 p-1.5 text-xs font-medium uppercase tracking-wider bg-opacity-50 rounded-lg"
                                  : "bg-red-600 p-1.5 text-xs font-medium uppercase tracking-wider bg-opacity-50 rounded-lg"
                              }
                            >
                              {transaction.status}
                            </span>
                          </td>
                        </tr>
                      </Link>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile view */}
            {loading ? (
              <tr>
                <td className="flex justify-center items-center md:hidden">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-800"></div>
                </td>
              </tr>
            ) : (
              transactions.map((transaction, id) => (
                <Link
                  href={`/transactions/get-transaction?transactionId=${transaction.id}`}
                >
                  <div className="grid grid-cols-1 gap-4 md:hidden">
                    <div
                      key={id}
                      className="hover:bg-gray-200 border shadow space-y-3 p-4 rounded-md cursor-pointer transition ease-in-outdelay-100 hover:-translate-y-1 hover:scale-100"
                    >
                      <div className="flex flex-col space-x-2 text-sm">
                        <div className="flex flex-row">
                          <div className="font-bold p-3">Order ID:</div>
                          <div className="whitespace-nowrap p-3 text-sm">
                            {transaction.id}
                          </div>
                        </div>

                        <div className="flex flex-row">
                          <div className="font-bold p-3">Item Desc:</div>
                          <div className="font-bold whitespace-nowrap p-3 text-sm">
                            {transaction.item}
                          </div>
                        </div>

                        <div className="flex flex-row">
                          <div className="font-bold p-3">Amount:</div>
                          <div className="font-bold whitespace-nowrap p-3 text-sm">
                            ${transaction.amount}
                          </div>
                        </div>

                        <div className="flex flex-row">
                          <div className="font-bold p-3">Customer Status:</div>
                          <div className="sm:text-left p-3 text-sm font-bold text-right">
                            <span
                              className={
                                transaction.customerStatus === "completed"
                                  ? "bg-blue-800 p-1.5 text-xs font-medium uppercase tracking-wider bg-opacity-50 rounded-lg"
                                  : transaction.customerStatus === "pending"
                                  ? "bg-yellow-400 p-1.5 text-xs font-medium uppercase tracking-wider bg-opacity-50 rounded-lg"
                                  : "bg-red-600 p-1.5 text-xs font-medium uppercase tracking-wider bg-opacity-50 rounded-lg"
                              }
                            >
                              {transaction.customerStatus}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-row">
                          <div className="font-bold p-3">Seller Status:</div>
                          <div className="sm:text-left p-3 text-sm font-bold text-right">
                            <span
                              className={
                                transaction.status === "completed"
                                  ? "bg-blue-800 p-1.5 text-xs font-medium uppercase tracking-wider bg-opacity-50 rounded-lg"
                                  : transaction.status === "pending"
                                  ? "bg-yellow-400 p-1.5 text-xs font-medium uppercase tracking-wider bg-opacity-50 rounded-lg"
                                  : "bg-red-600 p-1.5 text-xs font-medium uppercase tracking-wider bg-opacity-50 rounded-lg"
                              }
                            >
                              {transaction.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
            {/* pagination */}
            <div className="mt-4 flex justify-center">
              <ul className="flex">
                {Array.from({
                  length: Math.ceil(transactions.length / transactionsPerPage),
                }).map((_, index) => (
                  <li
                    key={index}
                    className="cursor-pointer px-2 py-1 hover:bg-gray-300 rounded-lg"
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default transactionsList;
