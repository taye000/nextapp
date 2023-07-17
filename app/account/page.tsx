import Link from "next/link";
import React from "react";

const account = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div>
        <header>Your Account</header>
        <ul>
          <li>UserID: ISS455yh</li>
          <li>Username: TaylorMade</li>
          <li>Email: TaylorMade@service.com</li>
          <li>Phone: +254712000000</li>
          <li>Payment Mode: M-PESA</li>
        </ul>
        <button type="submit" className="button">
          Update
        </button>
      </div>
    </main>
  );
};

export default account;
