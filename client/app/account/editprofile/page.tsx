"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import { getCookie } from "../../utils/tokenUtils";
import { IUser } from "../../utils/types";

const editprofile = () => {
    // get the stored cookie from local storage
    const cookie = getCookie();
    
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/users/updateprofile", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${cookie}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phoneNumber,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw Error(json.message);
      // Clear the form fields
      setName("");
      setEmail("");
      setPhoneNumber("");
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };

  const [user, setUser] = useState<IUser>({
    id: "",
    name: "",
    email: "",
    phoneNumber: "",});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/users/currentuser",
          {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${cookie}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error fetching user data");
        }
        const userData = await response.json();
        console.log("Fetched user data:", userData.user);
  
        // Update user state with fetched data
        setUser(userData.user);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchUserData();
  }, []);

  return (
    <main className="min-h-screen justify-between mt-5">
      <div>
        <h2 className="text-2xl p-4 font-bold text-left">Profile</h2>
      </div>
      <div className="p-2">
        <div className="w-full m-auto p-2 border rounded-md overflow-y-auto">
          <div className="relative p-[5%]">
            <Image
              src="/Milky_Way_at_Bear_Lake_4_nxqjo2.jpg"
              alt="profile image"
              fill
              priority={false}
              style={{ objectFit: "cover" }}
            />
            <div className="p-2">
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-600 absolute font-bold py-2 px-4 rounded-lg">
                Change Image <i className="fas fa-edit"></i>
              </button>
            </div>
          </div>
          <div>
            <Image
              src="/imanilogo.png"
              width={150}
              height={150}
              alt="profile"
              className="rounded-full object-cover object-center w-[60px] h-[60px] z-30 lg:w-36 lg:h-36 lg:border-4"
            />
          </div>
          <div className="flex flex-col p-2 justify-between md:flex-row">
            <div className="border rounded-md shadow-md p-2">
              <AiOutlineCheckCircle />
              <p className="text-2xl p-2 font-bold">{user.name}</p>
            </div>
            <div className="border rounded-md shadow-md p-2">
              <AiOutlineMail />
              <p className="text-lg p-2 font-bold">{user.email}</p>
            </div>
            <div className="border rounded-md shadow-md p-2">
              <AiOutlinePhone />
              <p className="text-lg p-2 font-bold">{user.phoneNumber}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-4 p-4 lg:grid-cols-3">
        <div className="flex justify-between w-1/2 border rounded-md shadow-md p-6 col-span-1 lg:col:span-2">
          <div className="flex flex-col w-full pb-4">
            <p className="text-2xl font-bold">$4,000</p>
            <p className="text-gray-500">YTD Revenue</p>
          </div>
          <p className="bg-green-200 flex justify-center items-center p-2 rounded-md">
            <span className="text-green-700 text-lg">+10%</span>
          </p>
        </div>
        <div className="flex justify-between w-1/2 border rounded-md shadow-md p-6 col-span-1 lg:col:span-2">
          <div className="flex flex-col w-full pb-4">
            <p className="text-2xl font-bold">100</p>
            <p className="text-gray-500">Number of orders</p>
          </div>
          <p className="bg-green-200 flex justify-center items-center p-2 rounded-md">
            <span className="text-green-700 text-lg">+5%</span>
          </p>
        </div>
        <div className="flex justify-between w-1/2 border rounded-md shadow-md p-6 col-span-1 lg:col:span-2">
          <div className="flex flex-col w-full pb-4">
            <p className="text-2xl font-bold">10</p>
            <p className="text-gray-500">Daily Sales</p>
          </div>
          <p className="bg-green-200 flex justify-center items-center p-2 rounded-md">
            <span className="text-green-700 text-lg">+2%</span>
          </p>
        </div>
      </div>
      <div className="p-2">
        <div className="w-full m-auto p-2 border rounded-md overflow-y-auto">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="ext-lg p-2 font-bold">Enter to update your name*</p>
              <input
                type="name"
                name="name"
                id="name"
                placeholder={user.name ? user.name : "Enter your name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit md:static md:w-auto rounded-xl md:border md:bg-gray-200 md:p-4 md:dark:bg-zinc-800/30"
              />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="ext-lg p-2 font-bold">Enter to update your email*</p>
            <input
              type="email"
              name="email"
              id="email"
              placeholder= {user.email ? user.email : "Enter your email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit md:static md:w-auto rounded-xl md:border md:bg-gray-200 md:p-4 md:dark:bg-zinc-800/30"
            />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="ext-lg p-2 font-bold">Enter to update your phonenumber*</p>
            <input
              type="phonenumber"
              name="phonenumber"
              id="phonenumber"
              placeholder= {user.phoneNumber ? user.phoneNumber : "Enter your phonenumber"}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit md:static md:w-auto rounded-xl md:border md:bg-gray-200 md:p-4 md:dark:bg-zinc-800/30"
            />
            </div>
            <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-800 rounded-lg text-white py-2 px-8 md:p3 md:rounded-lg font-bold hover:bg-blue-500"
            >
              Update
            </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default editprofile;
