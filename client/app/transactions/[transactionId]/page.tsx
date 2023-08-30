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
  const [buyerAppealClicked, setBuyerAppealClicked] =
    useState(false);
    const [sellerAppealClicked, setSellerAppealClicked] =
    useState(false);

  const [comment, setComment] = useState("");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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
      const userResponse = await response.json();
      const userData = userResponse.user;

      // Update user state with fetched data
      setUser(userData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTransaction = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/transactions/get-transaction/${transactionId}`,
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

  const handleCustomerConfirmation = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/transactions/update-transaction-status/${transactionId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${cookie}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ customerStatus: "completed" }),
        }
      );
      if (!response.ok) {
        throw new Error("error fetching Transaction");
      }
      const data = await response.json();

      setTransaction(data.transaction);

    } catch (error) {
      console.error(error);
    }
  };

  const handleSellerConfirmation = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/transactions/update-transaction-status/${transactionId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${cookie}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "completed" }),
        }
      );
      if (!response.ok) {
        throw new Error("error fetching Transaction");
      }
      const data = await response.json();

      setTransaction(data.transaction);

    } catch (error) {
      console.error(error);
    }
  };

  const handleAppeal = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/transactions/appeal-transaction/${transactionId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${cookie}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ appeal: "true" }),
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

  const handleCustomerAppeal = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/transactions/appeal-transaction/${transactionId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${cookie}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ customerAppeal: "true" }),
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

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/transactions/update-transaction/${transactionId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${cookie}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment }),
        }
      );
      if (!response.ok) {
        throw new Error("error fetching Transaction");
      }
      const data = await response.json();
      const updatedTransaction = data.transaction;

      //update Transactions
      setTransaction(updatedTransaction);
      setComment("");
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
                    transaction?.customerStatus === "completed"
                      ? "bg-blue-800 p-2 rounded-lg"
                      : transaction?.customerStatus === "pending"
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

        {user.account_type === "Seller" &&
          transaction?.status !== "completed" && (
            <div>
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
                    onClick={handleSellerConfirmation}
                    className="bg-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg"
                  >
                    I, the Seller Confirm Delivery!
                  </button>
                </div>
              </div>
              <div className="border rounded-md shadow-md p-6 m-4">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col space-y-4"
                >
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
            </div>
          )}

        {user.account_type === "Buyer" &&
          transaction?.customerStatus !== "completed" && (
            <div>
              <div className="p-2 m-4 md:flex md:justify-center">
                <div className="p-2">
                  <button
                    onClick={handleCustomerAppeal}
                    className="bg-red-600 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-lg"
                  >
                    Appeal!
                  </button>
                </div>
                <div className="p-2">
                  <button
                    onClick={handleCustomerConfirmation}
                    className="bg-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg"
                  >
                    I, the Buyer confirm Delivery!
                  </button>
                </div>
              </div>
              <div className="border rounded-md shadow-md p-6 m-4">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col space-y-4"
                >
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
            </div>
          )}
      </div>
    </main>
  );
};

export default transactionDetail;
