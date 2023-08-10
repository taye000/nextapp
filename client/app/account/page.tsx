"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import Link from "next/link";
import { getCookie } from "../utils/tokenUtils";
import { ITransaction, IUser } from "../utils/types";

const account = () => {
  // get the stored cookie from local storage
  const cookie = getCookie();

  const [transactions, setTransactions] = useState<Array<ITransaction>>([]);
  
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/transactions/get-user-transactions",
          {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${cookie}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("error fetching Transactions");
        }
        const data = await response.json();
        console.log("fetched data", data.transactions);

        //update Transactions
        setTransactions(data.transactions);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTransactions();
  }, []);

  const [user, setUser] = useState<IUser>({
    id: "",
    name: "",
    email: "",
    phoneNumber: "",});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/users/currentuser",
          {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${cookie}`,
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
    <main className="min-h-screen justify-between mt-5">
      <div>
        <h2 className="text-2xl p-4 font-bold text-left">Profile</h2>
      </div>
      <div className="p-2">
        <div className="w-full m-auto p-2 border rounded-md overflow-y-auto">
          <div className="relative p-[5%]">
            <Image
              src="/Milky_Way_at_Bear_Lake_4_nxqjo2.jpg"
              alt="profile image"
              fill
              priority={false}
              style={{ objectFit: "cover" }}
            />
            <div className="p-2">
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-600 absolute font-bold py-2 px-4 rounded-lg">
                Change Image <i className="fas fa-edit"></i>
              </button>
            </div>
          </div>
          <div>
            <Image
              src="/imanilogo.png"
              width={150}
              height={150}
              alt="profile"
              className="rounded-full object-cover object-center w-[60px] h-[60px] z-30 lg:w-36 lg:h-36 lg:border-4"
            />
          </div>
          <div className="flex flex-col p-2 justify-between md:flex-row">
            <div className="border rounded-md shadow-md p-2">
              <AiOutlineCheckCircle />
              <p className="text-2xl p-2 font-bold">{user.name}</p>
            </div>
            <div className="border rounded-md shadow-md p-2">
              <AiOutlineMail />
              <p className="text-lg p-2 font-bold">{user.email}</p>
            </div>
            <div className="border rounded-md shadow-md p-2">
              <AiOutlinePhone />
              <p className="text-lg p-2 font-bold">{user.phoneNumber}</p>
            </div>
          </div>
          <div className="p-2">
            <Link href={"/account/editprofile"}  className="bg-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg">
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
      <div className="grid gap-4 p-4 lg:grid-cols-3">
        <div className="flex justify-between w-1/2 border rounded-md shadow-md p-6 col-span-1 lg:col:span-2">
          <div className="flex flex-col w-full pb-4">
            <p className="text-2xl font-bold">$4,000</p>
            <p className="text-gray-500">YTD Revenue</p>
          </div>
          <p className="bg-green-200 flex justify-center items-center p-2 rounded-md">
            <span className="text-green-700 text-lg">+10%</span>
          </p>
        </div>
        <div className="flex justify-between w-1/2 border rounded-md shadow-md p-6 col-span-1 lg:col:span-2">
          <div className="flex flex-col w-full pb-4">
            <p className="text-2xl font-bold">100</p>
            <p className="text-gray-500">Number of orders</p>
          </div>
          <p className="bg-green-200 flex justify-center items-center p-2 rounded-md">
            <span className="text-green-700 text-lg">+5%</span>
          </p>
        </div>
        <div className="flex justify-between w-1/2 border rounded-md shadow-md p-6 col-span-1 lg:col:span-2">
          <div className="flex flex-col w-full pb-4">
            <p className="text-2xl font-bold">10</p>
            <p className="text-gray-500">Daily Sales</p>
          </div>
          <p className="bg-green-200 flex justify-center items-center p-2 rounded-md">
            <span className="text-green-700 text-lg">+2%</span>
          </p>
        </div>
      </div>
      <div className="border rounded-md shadow-md p-6 m-4">
        <div>
          <h2 className="text-2xl font-bold text-left">Orders</h2>
        </div>
        <div className="p-4">
          <div className="w-full m-auto p-4 border rounded-md overflow-y-auto">
            <div className="my-3 p-2 grid md:grid-cols-6 sm:grid-cols-4 grid-cols-3 items-center justify-between cursor-pointer">
              <span className=" font-bold">Order ID</span>
              <span className="sm:text-left font-bold text-right">
                Item Desc
              </span>
              <span className="hidden font-bold md:grid">Seller ID</span>
              <span className="sm:text-left font-bold text-right">Amount</span>
              <span className="hidden font-bold md:grid">Mode</span>
              <span className="sm:text-left font-bold text-right">Status</span>
            </div>
            
            {transactions.length > 0 ? (
              <ul>
                {transactions.map((transaction, id) => (
                  <li
                    key={id}
                    className="hover:bg-gray-200 rounded-md my-3 p-2 grid md:grid-cols-6 sm:grid-cols-4 grid:cols-3 items-center justify-between cursor-pointer"
                  >
                    <div className="flex">
                      <div className="pl-4">
                        <p>Order No. {transaction.id}</p>
                      </div>
                    </div>
                    <p className="font-bold">{transaction.item}</p>
                    <p>{transaction.userId}</p>
                    <p className="font-bold">
                      ${transaction.amount}
                    </p>
                    <p>{transaction.mode}</p>
                    <p className="sm:text-left text-right">
                      <span
                        className={
                          transaction.status === "completed"
                            ? "bg-blue-400 p-2 rounded-lg"
                            : transaction.status === "pending"
                            ? "bg-green-400 p-2 rounded-lg"
                            : "bg-red-400 p-2 rounded-lg"
                        }
                      >
                        {transaction.status}
                      </span>
                    </p>
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

export default account;
