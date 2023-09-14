"use client"
import React, {useState} from "react";
import {ImEye, ImEyeBlocked} from "react-icons/im";

const otp = () => {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`${apiUrl}/users/passwordreset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw Error(json.message);
      // Clear the form fields
      setCode("");
      setPassword("");
      setConfirmPassword("");
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between mt-5">
      <div className="border rounded-md shadow-md p-6">
        <div className="flex justify-center">
          <h1 className="font-bold text-2xl">Recover your Account</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit}
          className="flex flex-col space-y-4">
            <input
            required
              type="Code"
              name="Code"
              id="Code"
              placeholder="Enter your Recovery Code"
              value={code} onChange={(e) => setCode(e.target.value)}
              className="w-full p-4 border rounded-md resize-y focus:outline-none focus:border-blue-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 focus:invalid:text-red-600"
            />

<div className="relative">
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 pr-12 border rounded-md resize-y focus:outline-none focus:border-blue-500  invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 focus:invalid:text-red-600"
            />
            {showPassword ? (
              <ImEyeBlocked
                className="absolute right-4 top-5 cursor-pointer"
                style={{width:"1.5rem", height:"1.5rem"}}
                onClick={handleShowPassword}
              />
            ) : (
              <ImEye
                className="absolute right-4 top-5 cursor-pointer"
                style={{width:"1.5rem", height:"1.5rem"}}
                onClick={handleShowPassword}
              />
            )}
            </div>

            <div className="relative">
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-4 border rounded-md resize-y focus:outline-none focus:border-blue-500  invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 focus:invalid:text-red-600"
            />
            {showConfirmPassword ? (
              <ImEyeBlocked
                className="absolute right-4 top-5 cursor-pointer"
                style={{width:"1.5rem", height:"1.5rem"}}
                onClick={handleShowConfirmPassword}
              />
            ) : (
              <ImEye
                className="absolute right-4 top-5 cursor-pointer"
                style={{width:"1.5rem", height:"1.5rem"}}
                onClick={handleShowConfirmPassword}
              />
            )}
            </div>

            <button type="submit" className="bg-blue-700 rounded-lg text-white p-3 md:p3 md:rounded-lg md:bg-blue-700 hover:bg-blue-400 active:bg-blue-900">
              Continue
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default otp;
