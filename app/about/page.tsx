import Link from "next/link";
import React from "react";

const about = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between mt-10 md:mt-20">
      <div>
        <h1 className="font-bold text-2xl">About Us</h1>
        <p className={`m-0 max-w-[60ch] text-sm`}>
          We are a company aiming to provide a safe platform for small
          enterprises to secure their e-commerce businesses by securing the
          payment process, through offering an escrow service.
        </p>
      </div>
    </main>
  );
};

export default about;
