import Link from "next/link";
import React from "react";

const faq = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between mt-5">
      <div>
      <h1 className="font-bold text-2xl">FAQ's</h1>
          <p className={`m-0 max-w-[60ch] text-sm`}>Some of the Frequently asked questions about this service are answered below.</p>
      </div>
    </main>
  );
};

export default faq;
