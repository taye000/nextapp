"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getCookie } from "../../utils/tokenUtils";
import { ITransaction, IUser } from "../../utils/types";

const transactionDetail = () => {
  // initialize useRouter
  const router = useRouter();

  const searchParams = useSearchParams();
  const transactionId = searchParams.get("transactionId");

  // get the stored cookie from local storage
  const cookie = getCookie();

  const [transaction, setTransaction] = useState<ITransaction | null>(null);
  const [comment, setComment] = useState("");

  // check if user is logged in
  useEffect(() => {
    if (!cookie) {
      router.push("/signin");
    }

    fetchUserData();

    //fetch transaction
    if (transactionId) {
      fetchTransaction();
    }
  }, [transactionId]);

  const [user, setUser] = useState<IUser>({
    id: "",
    name: "",
    email: "",
    account_type: "",
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

  const handleDeliveryConfirmation = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/transactions/update-transaction-status/${transactionId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${cookie}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({status:"completed"})
        }
      );
      if (!response.ok) {
        throw new Error("error fetching Transaction");
      }
      const data = await response.json();

      //update Transaction
      let transaction = data.transaction;
      
      console.log("transaction", transaction);
      
    } catch (error) {
      console.error(error);
    }
  };

  // TODO: fix this
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/transactions/appeal-transaction/${transactionId}`,
        {
          method: "POST",
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

    // TODO: fix this
    const handleAppeal = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/transactions/update-transaction/${transactionId}`,
          {
            method: "POST",
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
        <div className="flex flex-col p-2 md:flex-row justify-between">
          <h2 className="text-2xl font-bold text-left">
            Order Id : {transaction?.id}
          </h2>
          <div className="flex flex-col md:flex md:flex-col sm:flex sm:flex-col">
          <div className="p-4">
          <p className="sm:text-left font-bold text-right">
            <span
              className={
                transaction?.status === "completed"
                  ? "bg-blue-800 p-2 rounded-lg"
                  : transaction?.status === "pending"
                  ? "bg-yellow-400 p-2 rounded-lg"
                  : "bg-red-600 p-2 rounded-lg"
              }
            >
              Seller Confirmation: {transaction?.status}
            </span>
          </p>
          </div>
          <div className="p-4">
          <p className="sm:text-left font-bold text-right">
            <span
              className={
                transaction?.status === "completed"
                  ? "bg-blue-800 p-2 rounded-lg"
                  : transaction?.status === "pending"
                  ? "bg-yellow-400 p-2 rounded-lg"
                  : "bg-red-600 p-2 rounded-lg"
              }
            >
              Buyer Confirmation: {transaction?.customerStatus}
            </span>
          </p>
          </div>
          </div>
          <h2 className="text-2xl font-bold text-left">
            {user.account_type === "Seller" ? "Buyer Id" : "Seller Id"} :{" "}
            {transaction?.clientId}
          </h2>
        </div>
        <div className="p-4">
          <div className="grid gap-4 p-4 lg:grid-cols-3">
            <div className="flex justify-between w-1/2 border rounded-md shadow-md p-6 col-span-1 lg:col:span-2">
              <p className="bg-green-200 flex justify-center items-center p-2 rounded-md">
                <span className="text-green-700 text-lg font-bold">Item</span>
              </p>
              <div className="flex flex-col w-full p-4 pb-4 md:flex md:justify-center">
                <p className="text-2xl font-bold">{transaction?.item}</p>
              </div>
            </div>
            <div className="flex justify-between w-1/2 border rounded-md shadow-md p-6 col-span-1 lg:col:span-2">
              <p className="bg-green-200 flex justify-center items-center p-2 rounded-md">
                <span className="text-green-700 text-lg font-bold">Mode</span>
              </p>
              <div className="flex flex-col w-full p-4 pb-4 md:flex md:justify-center">
                <p className="text-2xl font-bold">{transaction?.mode}</p>
              </div>
            </div>
            <div className="flex justify-between w-1/2 border rounded-md shadow-md p-6 col-span-1 lg:col:span-2">
              <p className="bg-green-200 flex justify-center items-center p-2 rounded-md">
                <span className="text-green-700 text-lg font-bold">Amount</span>
              </p>
              <div className="flex flex-col w-full p-4 pb-4 md:flex md:justify-center">
                <p className="text-2xl font-bold">{transaction?.amount}</p>
              </div>
            </div>
          </div>
        </div>
        {transaction?.status !== "completed" && (

        <div className="p-2 m-4 md:flex md:justify-center">
          <div className="p-2">
            <button
              onClick={handleAppeal}
              className="bg-red-600 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-lg"
            >
              Appeal!
            </button>
          </div>
          <div className="p-2">
            <button
              onClick={handleDeliveryConfirmation}
              className="bg-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg"
            >
              I Confirm this item has been delivered!
            </button>
          </div>
        </div>
          )}
      </div>
      <div className="border rounded-md shadow-md p-6 m-4">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <textarea
            name="comment"
            id="comment"
            placeholder="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-4 border rounded-md resize-y focus:outline-none focus:border-blue-500"
            />
            <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-800 flex rounded-lg text-white font-bold p-2 px-6 md:p3 md:rounded-lg  hover:bg-blue-600"
            >
              Submit
            </button>
            </div>
          </form>
      </div>
    </main>
  );
};

export default transactionDetail;
