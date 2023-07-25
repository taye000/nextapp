import React from "react";

const account = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between mt-5">
      <div className="flex flex-col ">
        <h1 className="font-bold text-2xl">Your Account</h1>
        <ul>
          <li>UserID: ISS455yh</li>
          <li>Username: TaylorMade</li>
          <li>Email: TaylorMade@service.com</li>
          <li>Phone: +254712000000</li>
          <li>Payment Mode: M-PESA</li>
        </ul>
        <button type="submit" className="bg-blue-700 rounded-full text-white p-3 mt-4 md:p3 md:rounded-full md:bg-blue-700 hover:bg-blue-500">
          Update
        </button>
      </div>
    </main>
  );
};

export default account;
