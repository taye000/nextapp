"use client"
import React, {useState} from "react";

const forgotpassword = () => {
  const [email, setEmail] = useState("");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`${apiUrl}/users/requestpasswordreset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw Error(json.message);
      // Clear the form fields
      setEmail("");
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between mt-5">
      <div className="border rounded-md shadow-md p-6">
        <div className="flex justify-center">
          <h1 className="font-bold text-2xl">Forgot Password</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit}
          className="flex flex-col space-y-4">
            <input
            required
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 border rounded-md resize-y focus:outline-none focus:border-blue-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 focus:invalid:text-red-600"
            />
            <button type="submit" className="bg-blue-700 rounded-lg text-white p-3 md:p3 md:rounded-lg md:bg-blue-700 hover:bg-blue-400 active:bg-blue-900">
              Continue
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default forgotpassword;
