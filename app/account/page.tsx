import Link from "next/link";
import React from "react";

const account = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div>
        <header>Your Account</header>
        <ul>
          <li>Username: TaylorMade</li>
          <li>Email: TaylorMade@service.com</li>
          <li>Phone: TaylorMade@service.com</li>
        </ul>
        <button type="submit" className="button">
          Update
        </button>
      </div>
    </main>
  );
};

export default account;
