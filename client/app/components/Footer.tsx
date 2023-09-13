"use client";
import React, { useState } from "react";
import {
  AiOutlineTwitter,
  AiOutlineLinkedin,
  AiOutlineInstagram,
  AiOutlineFacebook,
} from "react-icons/ai";

const Footer = () => {
  const [email, setEmail] = useState("");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`${apiUrl}/subscribers/subscribe`, {
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
    <footer
      id="main-footer"
      className="mx-auto bg-blue-900 max-w p-2 items-center"
    >
      <div className="container flex flex-col-reverse justify-between px-6 py-10 mx-auto space-y-8 md:flex-col md:space-y-0">
        <div className="flex flex-col-reverse items-venter justify-between space-y-8 md:flex-col md:space-y-0">
          <div className="mx-auto my-4 text-center text-white md:hidden">
            Copyright &copy; 2023 Imani Escrow Services
          </div>
          <div className="flex flex-col justify-between md:flex md:space-x-4 md:flex-row">
            <div className="flex justify-between space-x-4">
              <a
                href="https://twitter.com/taye000"
                rel="noreferrer"
                target="_blank"
              >
                <AiOutlineTwitter
                  className="hover:-translate-y-1 transition cursor-pointer text-neutral-500 dark:text-neutral-100"
                  size={30}
                />
              </a>
              <a
                href="https://www.linkedin.com/in/taylor-gitari-15b290133/"
                rel="noreferrer"
                target="_blank"
              >
                <AiOutlineLinkedin
                  className="hover:-translate-y-1 transition cursor-pointer text-neutral-500 dark:text-neutral-100"
                  size={30}
                />
              </a>
              <a
                href="https://instagram.com/taylor.gitari?igshid=OGQ5ZDc2ODk2ZA=="
                rel="noreferrer"
                target="_blank"
              >
                <AiOutlineInstagram
                  className="hover:-translate-y-1 transition cursor-pointer text-neutral-500 dark:text-neutral-100"
                  size={30}
                />
              </a>
              <a
                href="https://www.facebook.com/taylor.abbruzzi/"
                rel="noreferrer"
                target="_blank"
              >
                <AiOutlineFacebook
                  className="hover:-translate-y-1 transition cursor-pointer text-neutral-500 dark:text-neutral-100"
                  size={30}
                />
              </a>
            </div>
            <div className="flex flex-col justify-between mt-4">
              <form onSubmit={handleSubmit}>
                <div className="flex space-x-3">
                  <input
                    required
                    type="email"
                    name="email"
                    className="flex-1 px-4 rounded-full focus:outline-none invalid:text-red-600 focus:invalid:text-red-600 focus:invalid:border-red-500 focus:border-blue-500"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                  <button className="bg-blue-700 rounded-full font-bold text-white p-3 md:p3 md:rounded-full md:bg-blue-700 hover:bg-blue-600 active:bg-blue-900 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110">
                    Go
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="hidden text-white  md:block">
            Copyright &copy; 2023 Imani Escrow Services
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
