import Link from "next/link";
import React from "react";

const contacts = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between mt-5">
      <div className="border rounded-md shadow-md p-6">
        <div className="flex justify-center">
          <h1 className="font-bold text-2xl">Contact Us</h1>
        </div>
        <p className={`m-0 max-w-[60ch] text-sm`}>Phone -{">"} +254712000000</p>
        <p className={`m-0 max-w-[60ch] text-sm`}>
          Email -{">"} imaniescrow@service.com
        </p>
      </div>
    </main>
  );
};

export default contacts;
