"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineCheckCircle,
} from "react-icons/ai";
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

  // check if user is logged in
  useEffect(() => {
    if (!cookie) {
      router.push("/signin");
    }
    // Fetch user data and transactions
    fetchUserData();
    fetchTransactions();
  }, []);

  const [loading, setLoading] = useState(false);

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

  const totalSales = transactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  return (
    <main className="min-h-screen justify-between mt-5">
      <div>
        <h2 className="text-2xl p-4 font-bold text-left">Profile</h2>
      </div>
      <div className="p-2">
        <div className="w-full m-auto p-2 border rounded-md overflow-y-auto">
          <div className="relative p-[5%]">
            {user.coverPhoto ? (
              <Image
                src={user.coverPhoto}
                width={150}
                height={150}
                alt="profile"
                className="rounded-full object-cover object-center w-[60px] h-[60px] z-30 lg:w-36 lg:h-36 lg:border-4"
              />
            ) : (
              <Image
                src="/Milky_Way_at_Bear_Lake_4_nxqjo2.jpg"
                alt="cover image"
                fill
                priority={false}
                style={{ objectFit: "cover" }}
              />
            )}
          </div>
          <div>
            {user.photo ? (
              <Image
                src={user.photo}
                width={150}
                height={150}
                alt="profile"
                className="rounded-full object-cover object-center w-[60px] h-[60px] z-30 lg:w-36 lg:h-36 lg:border-4"
              />
            ) : (
              <Image
                src="/avatar.jpg"
                width={150}
                height={150}
                alt="profile"
                className="rounded-full object-cover object-center w-[60px] h-[60px] z-30 lg:w-36 lg:h-36 lg:border-4"
              />
            )}
          </div>
          <div className="flex flex-col p-2 justify-between md:flex-row">
            <div className="border rounded-md shadow-md pl-2 flex items-center">
              <AiOutlineCheckCircle />
              <p className="text-2xl px-2 font-bold">{user.name}</p>
            </div>
            <div className="border rounded-md shadow-md pl-2 flex items-center">
              <AiOutlineMail />
              <p className="text-lg px-2 font-bold">{user.email}</p>
            </div>
            <div className="border rounded-md shadow-md pl-2 flex items-center">
              <AiOutlinePhone />
              <p className="text-lg px-2 font-bold">{user.phoneNumber}</p>
            </div>
          </div>
          <div className="p-2 md:flex md:flex-row md:justify-between">
            <div className="p-2 md:flex md:justify-center">
              <Link
                href={"/account/editprofile"}
                className="bg-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg"
              >
                Edit Profile
              </Link>
            </div>
            {user.account_type === "Buyer" && (
              <div className="p-2 md:flex md:justify-center">
                <Link
                  href={"/buyer"}
                  className="bg-green-800 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg"
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
      <div className="border rounded-md shadow-md p-6 m-4">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-left">Orders</h2>
          <Link
            href={"/transactions"}
            className="text-right hover:underline text-white font-bold p-2 rounded-lg"
          >
            See more
          </Link>
        </div>
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
                <span className="sm:text-left font-bold text-right">
                  Amount
                </span>
                <span className="hidden font-bold md:grid">Mode</span>
                <span className="sm:text-left font-bold text-right">
                  Buyer
                </span>

                <span className="hidden font-bold md:grid">Seller</span>
              </div>

              {transactions.length > 0 ? (
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
                      </li>
                    </Link>
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
      </div>
    </main>
  );
};

export default account;
