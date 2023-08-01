import React from "react";

const account = () => {
  return (
    <main className="min-h-screen justify-between mt-5">
      <div className="grid gap-4 p-4 lg:grid-cols-5">
        <div className="flex justify-between w-1/2 border rounded-md shadow-md p-6 col-span-1 bg-white lg:col:span-2">
          <div className="flex flex-col w-full pb-4">
            <p className="text-2xl font-bold">$4,000</p>
            <p className="text-gray-500">Monthly Revenue</p>
          </div>
          <p className="bg-green-200 flex justify-center items-center p-2 rounded-md">
            <span className="text-green-700 text-lg">+10%</span>
          </p>
        </div>
        <div className="flex justify-between w-1/2 border rounded-md shadow-md p-6 col-span-1 bg-white lg:col:span-2">
          <div className="flex flex-col w-full pb-4">
            <p className="text-2xl font-bold">100</p>
            <p className="text-gray-500">Number of orders</p>
          </div>
          <p className="bg-green-200 flex justify-center items-center p-2 rounded-md">
            <span className="text-green-700 text-lg">+5%</span>
          </p>
        </div>
      </div>
    </main>
  );
};

export default account;
