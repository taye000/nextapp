"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getCookie } from "../../utils/tokenUtils";
import {
  IAppealStatus,
  IChat,
  IMessage,
  ITransaction,
  IUser,
} from "../../utils/types";
import socket from "../../utils/socket";
import { dateFormat } from "../../utils/dateFormat";

const transactionDetail = () => {
  // initialize useRouter
  const router = useRouter();

  const searchParams = useSearchParams();
  const transactionId = searchParams.get("transactionId");

  // get the stored cookie from local storage
  const cookie = getCookie();

  const [transaction, setTransaction] = useState<ITransaction | null>(null);
  const [buyerAppealClicked, setBuyerAppealClicked] = useState(false);
  const [sellerAppealClicked, setSellerAppealClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  const [socketConnected, setSocketConnected] = useState(false);

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [message, setMessage] = useState("");

  const [chats, setChats] = useState<IChat[]>([]);

  const [comment, setComment] = useState("");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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

      // emit user data to server
      socket.emit("userData", userData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTXMessages = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/messages/get-tx-user-messages/${transactionId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${cookie}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("error fetching messages");
      }
      const data = await response.json();
      console.log("msg data", data);

      //update Messages
      setMessages(data.messages);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTXChats = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/chats/get-tx-user-chats/${transactionId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${cookie}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("error fetching chats");
      }
      const data = await response.json();
      console.log("chat data", data);

      //update chats
      setChats(data.chats);
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

      // Join room
      socket.emit("joinRoom", transactionId);
    } catch (error) {
      console.error(error);
    }
  };

  // check if user is logged in
  useEffect(() => {
    if (!cookie) {
      router.push("/signin");
    }

    fetchUserData();

    //fetch transaction
    if (transactionId) {
      fetchTransaction();
      fetchTXMessages();
      fetchTXChats();
    }
  }, [cookie, transactionId]);

  // listen to messages
  useEffect(() => {
    // Listen to socket connection
    socket.on("connect", () => setSocketConnected(true));
    // Listen to incoming messages
    socket.on("chatMessage", (message: any) => {
      console.log("message", message);
      // update messages state with the new message
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup event listener when component unmounts
    return () => {
      socket.off("chatMessage");
    };
  }, []);

  useEffect(() => {
    socket.on("messageReceived", (msg) => {
      setMessages([...messages, msg]);
      console.log("message received", msg);
    });
  });

  // send message
  const handleMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!transaction) return;

    const msgData: IMessage = {
      clientId: transaction.clientId,
      userId: transaction.userId,
      transactionId: transaction.id,
      chatName: user.name,
      senderId: user.id,
      content: message,
    };
    try {
      if (message) {
        // send chat to server
        socket.emit("chatMessage", msgData);
        // update messages state with the new message
        // setMessages([...messages, msgData]);
      }
      setMessage("");
    } catch (error) {
      console.log("socket error", error);
    }
  };

  const handleCustomerConfirmation = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/transactions/update-customer-transaction-status/${transactionId}`,
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

      fetchTransaction();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSellerConfirmation = async () => {
    setLoading(true);
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

      fetchTransaction();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAppeal = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${apiUrl}/transactions/appeal-transaction/${transactionId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${cookie}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ appeal: IAppealStatus.PENDING }),
        }
      );
      if (!response.ok) {
        throw new Error("error fetching Transaction");
      }
      const data = await response.json();

      //update Transactions
      setTransaction(data.transaction);
      setSellerAppealClicked(true);

      fetchTransaction();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
          body: JSON.stringify({ customerAppeal: IAppealStatus.PENDING }),
        }
      );
      if (!response.ok) {
        throw new Error("error fetching Transaction");
      }
      const data = await response.json();

      //update Transactions
      setTransaction(data.transaction);
      setBuyerAppealClicked(true);

      fetchTransaction();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${apiUrl}/transactions/update-comment/${transactionId}`,
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen justify-between mt-5">
      <div>
        <h2 className="text-2xl p-4 font-bold text-left">Order Detail</h2>
      </div>
      <div className="border rounded-md shadow-md p-6 m-4">
        <div className="flex flex-col p-2 md:flex-row justify-between">
          <h2 className="text-2xl font-bold text-left overflow-auto">
            Transaction Id : {transaction?.id}
          </h2>
          <div className="flex flex-col md:flex md:flex-col sm:flex sm:flex-col">
            <div className="p-4">
              <p className="sm:text-left font-bold text-right">
                <span
                  className={
                    transaction?.status === "completed"
                      ? "bg-blue-800 p-1.5 text-xs font-medium uppercase tracking-wider bg-opacity-50 rounded-lg"
                      : transaction?.status === "pending"
                      ? "bg-yellow-400 p-1.5 text-xs font-medium uppercase tracking-wider bg-opacity-50 rounded-lg"
                      : "bg-red-600 p-1.5 text-xs font-medium uppercase tracking-wider bg-opacity-50 rounded-lg"
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
                      ? "bg-blue-800 p-1.5 text-xs font-medium uppercase tracking-wider bg-opacity-50 rounded-lg"
                      : transaction?.customerStatus === "pending"
                      ? "bg-yellow-400 p-1.5 text-xs font-medium uppercase tracking-wider bg-opacity-50 rounded-lg"
                      : "bg-red-600 p-1.5 text-xs font-medium uppercase tracking-wider bg-opacity-50 rounded-lg"
                  }
                >
                  Buyer Confirmation: {transaction?.customerStatus}
                </span>
              </p>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-left overflow-auto">
            {user.account_type === "Seller" ? "Buyer Id" : "Seller Id"} :{" "}
            {transaction?.clientId}
          </h2>
        </div>
        <div className="p-4">
          <div className="grid gap-4 p-4 lg:grid-cols-3">
            <div className="flex justify-between border rounded-md shadow-md p-6 col-span-1 lg:col:span-2">
              <p className="bg-green-200 flex justify-center items-center p-2 rounded-md">
                <span className="text-green-700 text-lg font-bold">Item</span>
              </p>
              <div className="flex flex-col w-full p-4 pb-4 md:flex md:justify-center">
                <p className="text-2xl font-bold">{transaction?.item}</p>
              </div>
            </div>
            <div className="flex justify-between border rounded-md shadow-md p-6 col-span-1 lg:col:span-2">
              <p className="bg-green-200 flex justify-center items-center p-2 rounded-md">
                <span className="text-green-700 text-lg font-bold">Mode</span>
              </p>
              <div className="flex flex-col w-full p-4 pb-4 md:flex md:justify-center">
                <p className="text-2xl font-bold">{transaction?.mode}</p>
              </div>
            </div>
            <div className="flex justify-between border rounded-md shadow-md p-6 col-span-1 lg:col:span-2">
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
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition ease-in-outdelay-100 hover:-translate-y-1 hover:scale-100"
                  >
                    Appeal!
                  </button>
                </div>
                <div className="p-2">
                  <button
                    onClick={handleSellerConfirmation}
                    className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition ease-in-outdelay-100 hover:-translate-y-1 hover:scale-100 ${
                      loading ? "flex items-center justify-center" : ""
                    }`}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 mr-3"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.794A7.962 7.962 0 014 12H0c0 3.042 1.135 5.86 3.184 8.016l2.472-2.472zM12 20a8 8 0 008-8h4a12 12 0 01-12 12v-4zm5.795-2.472A7.962 7.962 0 0120 12h4c0 3.042-1.135 5.86-3.184 8.016l-2.472-2.472z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "I, the Seller Confirm Delivery!"
                    )}
                  </button>
                </div>
              </div>
              {sellerAppealClicked && (
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
                        className="bg-blue-800 flex rounded-lg text-white font-bold p-2 px-6 md:p3 md:rounded-lg hover:bg-blue-600 transition ease-in-outdelay-100 hover:-translate-y-1 hover:scale-100"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

        {user.account_type === "Buyer" &&
          transaction?.customerStatus !== "completed" &&
          transaction?.status === "completed" && (
            <div>
              <div className="p-2 m-4 md:flex md:justify-center">
                <div className="p-2">
                  <button
                    onClick={handleCustomerAppeal}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition ease-in-outdelay-100 hover:-translate-y-1 hover:scale-100"
                  >
                    Appeal!
                  </button>
                </div>
                <div className="p-2">
                  <button
                    onClick={handleCustomerConfirmation}
                    className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition ease-in-outdelay-100 hover:-translate-y-1 hover:scale-100 ${
                      loading ? "flex items-center justify-center" : ""
                    }`}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 mr-3"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.794A7.962 7.962 0 014 12H0c0 3.042 1.135 5.86 3.184 8.016l2.472-2.472zM12 20a8 8 0 008-8h4a12 12 0 01-12 12v-4zm5.795-2.472A7.962 7.962 0 0120 12h4c0 3.042-1.135 5.86-3.184 8.016l-2.472-2.472z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "I, the Buyer confirm Delivery!"
                    )}
                  </button>
                </div>
              </div>
              {buyerAppealClicked && (
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
                        className="bg-blue-800 flex rounded-lg text-white font-bold p-2 px-6 md:p3 md:rounded-lg hover:bg-blue-600 transition ease-in-outdelay-100 hover:-translate-y-1 hover:scale-100"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
      </div>
      <div className="md:flex md:justify-center p-4">
        <div className="border rounded-md shadow-md p-6 m-4">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold text-left">Chat</h2>
          </div>
          <div className="py-2">
            <div className="w-full m-auto p-4 border rounded-md overflow-y-auto max-h-[400px]">
              <div className="flex flex-col">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={
                      message.senderId === user.id
                        ? "flex justify-end m-2"
                        : "flex justify-start m-2"
                    }
                  >
                    <div
                      className={
                        message.senderId === user.id
                          ? "border rounded-lg p-1.5 m-2 bg-blue-800 bg-opacity-50 text-xs"
                          : "border rounded-lg p-1.5 m-2 bg-green-800 bg-opacity-50 text-xs"
                      }
                    >
                      {message.senderId === user.id
                        ? "You"
                        : message.receiverName}
                      <div className="text-lg">
                        {message.content}
                        <div>
                          <p className="text-xs">
                            {dateFormat(message.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <form
            id="form"
            onSubmit={handleMessageSubmit}
            className="flex flex-col space-y-4"
          >
            <input
              id="input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message"
              className="w-full p-4 border rounded-md resize-y focus:outline-none focus:border-blue-500"
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-800 flex rounded-lg text-white font-bold p-2 px-6 md:p3 md:rounded-lg hover:bg-blue-600 transition ease-in-outdelay-100 hover:-translate-y-1 hover:scale-100"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default transactionDetail;
