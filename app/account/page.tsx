import React from "react";
import { data } from "../data/data";

const account = () => {
  return (
    <main className="min-h-screen justify-between mt-5">
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
          <h2 className="text-2xl font-bold text-center">Orders</h2>
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
            <ul>
              {data.map((order, id) => (
                <li
                  key={id}
                  className="hover:bg-gray-200 rounded-md my-3 p-2 grid md:grid-cols-6 sm:grid-cols-4 grid:cols-3 items-center justify-between cursor-pointer"
                >
                  <div className="flex">
                    <div className="pl-4">
                      <p>Order No. {order.id}</p>
                    </div>
                  </div>
                  <p className="font-bold">{order.description}</p>
                  <p>{order.sellerID}</p>
                  <p className="font-bold">${order.amount.toLocaleString()}</p>
                  <p>{order.mode}</p>
                  <p className="sm:text-left text-right">
                    <span
                      className={
                        order.status === "Completed"
                          ? "bg-blue-400 p-2 rounded-lg"
                          : order.status === "Processing"
                          ? "bg-green-400 p-2 rounded-lg"
                          : "bg-red-400 p-2 rounded-lg"
                      }
                    >
                      {order.status}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default account;
