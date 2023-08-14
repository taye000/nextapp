"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import { RiEditBoxLine } from "react-icons/ri";
import { getCookie } from "../../utils/tokenUtils";
import { IUser } from "../../utils/types";

const editprofile = () => {
  // get the stored cookie from local storage
  const cookie = getCookie();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/users/updateprofile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cookie}`,
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
  const handlePhotoUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/users/updateprofilephoto", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
        body: new FormData,
      });
      const json = await res.json();
      if (!res.ok) throw Error(json.message);

      // Clear the form fields
      setPhoto("");
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };

  const [user, setUser] = useState<IUser>({
    id: "",
    name: "",
    email: "",
    photo: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/users/currentuser",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${cookie}`,
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
          <div className="relative">
            {user.photo !== undefined ? (
              <Image
                src={user.photo}
                width={150}
                height={150}
                alt="profile"
                className="rounded-full object-cover object-center w-[60px] h-[60px] z-30 lg:w-36 lg:h-36 lg:border-4"
              />
            ) : (
              <Image
                src="/avatar.jpg"
                width={150}
                height={150}
                alt="profile"
                className="rounded-full object-cover object-center w-[60px] h-[60px] z-30 lg:w-36 lg:h-36 lg:border-4"
              />
            )}
            <input
            type="file"
            accept="photo/*"
            className="absolute inset-0 z-20 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => handlePhotoUpload(e)}
            ></input>
            <a
                href="#"
                rel="noreferrer"
                target="_blank"
              >
                <RiEditBoxLine
                  className="hover:-translate-y-1 transition-transform cursor-pointer text-neutral-500 dark:text-neutral-100"
                  size={30}
                />
              </a>
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
              <p className="ext-lg p-2 font-bold">
                Enter to update your email*
              </p>
              <input
                type="email"
                name="email"
                id="email"
                placeholder={user.email ? user.email : "Enter your email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit md:static md:w-auto rounded-xl md:border md:bg-gray-200 md:p-4 md:dark:bg-zinc-800/30"
              />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="ext-lg p-2 font-bold">
                Enter to update your phonenumber*
              </p>
              <input
                type="phonenumber"
                name="phonenumber"
                id="phonenumber"
                placeholder={
                  user.phoneNumber ? user.phoneNumber : "Enter your phonenumber"
                }
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit md:static md:w-auto rounded-xl md:border md:bg-gray-200 md:p-4 md:dark:bg-zinc-800/30"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-gray-800 rounded-lg text-white m-2 py-2 px-8 md:p3 md:rounded-lg font-bold hover:bg-gray-500"
              >
                Discard
              </button>
              <button
                type="submit"
                className="bg-blue-800 rounded-lg text-white m-2 py-2 px-8 md:p3 md:rounded-lg font-bold hover:bg-blue-500"
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
