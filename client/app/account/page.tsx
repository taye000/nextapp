"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ImMail2, ImPhone, ImLocation2 } from "react-icons/im";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCookie } from "../utils/tokenUtils";
import { ITransaction, IUser } from "../utils/types";

const account = () => {
  // initialize useRouter
  const router = useRouter();

  // get the stored cookie from local storage
  const cookie = getCookie();

  //access api url
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [loading, setLoading] = useState(false);

  const [transactions, setTransactions] = useState<Array<ITransaction>>([]);

  const [user, setUser] = useState<IUser>({
    id: "",
    name: "",
    email: "",
    photo: "",
    coverPhoto: "",
    location: "",
    phoneNumber: "",
  });

  const [sortOrder, setSortOrder] = useState("asc");

  const [sortAlphabeticalOrder, setSortAlphabeticalOrder] = useState("asc");

  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;

  // Get current transactions
  const getCurrentTransactions = () => {
    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction =
      indexOfLastTransaction - transactionsPerPage;
    return transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  };

  // Change page
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

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
    if (sortOrder === "asc") {
      setTransactions(
        transactions.sort((a, b) => {
          return a.amount - b.amount;
        })
      );
      setSortOrder("desc");
    } else {
      setTransactions(
        transactions.sort((a, b) => {
          return b.amount - a.amount;
        })
      );
      setSortOrder("asc");
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${apiUrl}/users/currentuser`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookie}`,
          "Content-Type": "application/json",
        },
      });
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
      //set loading to true before loading
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

  // check if user is logged in
  useEffect(() => {
    if (!cookie) {
      router.push("/signin");
    }
    // Fetch user data and transactions
    fetchUserData();
    fetchTransactions();
  }, [cookie]);

  const totalSales = transactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  return (
    <main className="min-h-screen justify-between mt-5">
      <div className="p-2">
        <div className="w-full m-auto p-2 border rounded-md">
          <div className="relative p-[5%]">
            <Image
              src={user.coverPhoto || "/Milky_Way_at_Bear_Lake_4_nxqjo2.jpg"}
              alt="cover image"
              fill
              priority={false}
              style={{ objectFit: "cover" }}
              className="rounded-md"
            />
            <div className="absolute">
              <div className="rounded-full object-cover object-center w-[60px] h-[60px] z-30 lg:w-36 lg:h-36 lg:border-4">
                <img
                  src={user.photo || "/avatar.jpg"}
                  alt="profile"
                  className="rounded-full object-cover object-center w-full h-full"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col p-2 justify-center items-center">
            <div className="pl-2 flex items-center">
              <p className="text-2xl px-2 font-bold">{user.name}</p>
            </div>

            <div className="pl-2 flex items-center">
              <ImMail2 />
              <p className="text-lg px-2 font-bold">{user.email}</p>
            </div>

            {user.phoneNumber && (
              <div className="pl-2 flex items-center">
                <ImPhone />
                <p className="text-lg px-2 font-bold">{user.phoneNumber}</p>
              </div>
            )}

            {user.location && (
              <div className="pl-2 flex items-center">
                <ImLocation2 />
                <p className="text-lg px-2 font-bold">{user.location}</p>
              </div>
            )}
          </div>
          <div className="flex flex-row p-2 md:flex md:flex-row md:justify-between">
            <div className="p-2 md:flex md:justify-center">
              <Link
                href={"/account/editprofile"}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"
              >
                Edit Profile
              </Link>
            </div>
            {user.account_type === "Buyer" && (
              <div className="p-2 md:flex md:justify-center">
                <Link
                  href={"/buyer"}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"
                >
                  Buy Safely
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="grid gap-4 p-4 lg:grid-cols-3">
        <div className="flex justify-between w-1/2 border rounded-md shadow-md p-6 col-span-1 lg:col:span-2">
          <div className="flex flex-col w-full pb-4">
            <p className="text-gray-500">YTD Revenue</p>
          </div>
          <p className="bg-green-200 flex justify-center items-center p-2 rounded-md">
            <span className="text-green-700 text-lg">+{totalSales}</span>
          </p>
        </div>
        <div className="flex justify-between w-1/2 border rounded-md shadow-md p-6 col-span-1 lg:col:span-2">
          <div className="flex flex-col w-full pb-4">
            <p className="text-gray-500">Number of orders</p>
          </div>
          <p className="bg-green-200 flex justify-center items-center p-2 rounded-md">
            <span className="text-green-700 text-lg">
              +{transactions.length}
            </span>
          </p>
        </div>
        <div className="flex justify-between w-1/2 border rounded-md shadow-md p-6 col-span-1 lg:col:span-2">
          <div className="flex flex-col w-full pb-4">
            <p className="text-gray-500">Daily Sales</p>
          </div>
          <p className="bg-green-200 flex justify-center items-center p-2 rounded-md">
            <span className="text-green-700 text-lg">
              +{transactions.length}
            </span>
          </p>
        </div>
      </div>
      <div className="border rounded-md shadow-md p-1 py-4 m-4">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-left">Orders</h2>
          <Link
            href={"/transactions"}
            className="text-right hover:underline font-bold p-2 rounded-lg transition ease-in-outdelay-100 hover:-translate-y-1 hover:scale-100"
          >
            See more
          </Link>
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
                    getCurrentTransactions().map((transaction, id) => (
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
                  {/* pagination */}
                  <div className="mt-4 flex justify-center">
                    <ul className="flex">
                      {Array.from({
                        length: Math.ceil(
                          transactions.length / transactionsPerPage
                        ),
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
                </tbody>
              </table>
            </div>

            {/* Mobile view */}
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
          </div>
        </div>
      </div>
    </main>
  );
};

export default account;
