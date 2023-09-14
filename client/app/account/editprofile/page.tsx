"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ImMail2, ImPhone, ImLocation2, ImCamera } from "react-icons/im";
import { getCookie } from "../../utils/tokenUtils";
import { IUser } from "../../utils/types";

const editprofile = () => {
  // initialize useRouter
  const router = useRouter();

  // get the stored cookie from local storage
  const cookie = getCookie();

  // function to fetch user data from DB
  const fetchUserData = async () => {
    try {
      const response = await fetch(`${apiUrl}/users/currentuser`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookie}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Error fetching user data");
      }
      const userData = await response.json();

      // Update user state with fetched data
      setUser(userData.user);
    } catch (error) {
      console.error(error);
    }
  };

  // check if user is logged in
  useEffect(() => {
    if (!cookie) {
      router.push("/signin");
    }
    // Fetch user data
    fetchUserData();
  }, [cookie]);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/users/updateprofile`, {
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

      // Fetch user data to update the user state after photo update
      fetchUserData();
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePhotoUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const selectedFile = e.target.files && e.target.files[0];
    if (!selectedFile) return;

    try {
      const formData = new FormData();
      formData.append("photo", selectedFile);

      const res = await fetch(`${apiUrl}/users/updateprofilephoto`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
        body: formData,
      });
      const json = await res.json();
      if (!res.ok) throw Error(json.message);

      // Clear the form fields
      setPhoto("");
      console.log(json);

      // Fetch user data to update the user state after photo update
      fetchUserData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCoverPhotoUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const selectedFile = e.target.files && e.target.files[0];
    if (!selectedFile) return;

    try {
      const formData = new FormData();
      formData.append("photo", selectedFile);

      const res = await fetch(`${apiUrl}/users/updatecoverphoto`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
        body: formData,
      });
      const json = await res.json();
      if (!res.ok) throw Error(json.message);

      // Clear the form fields
      setPhoto("");
      console.log(json);

      // Fetch user data to update the user state after cover photo update
      fetchUserData();
    } catch (error) {
      console.error(error);
    }
  };

  const [user, setUser] = useState<IUser>({
    id: "",
    name: "",
    email: "",
    photo: "",
    location: "",
    coverPhoto: "",
    phoneNumber: "",
  });

  return (
    <main className="min-h-screen justify-between mt-5">
      <div className="p-2">
        <div className="w-full m-auto p-2 border rounded-md">
          <div className="relative p-[5%]">
            {user.coverPhoto ? (
              <Image
                src={user.coverPhoto}
                width={150}
                height={150}
                alt="profile"
                className="rounded-md object-cover object-center"
              />
            ) : (
              <Image
                src="/Milky_Way_at_Bear_Lake_4_nxqjo2.jpg"
                alt="cover image"
                fill
                priority={false}
                style={{ objectFit: "cover" }}
                className="rounded-md"
              />
            )}
            <div className="p-2 absolute bottom-5 right-5">
              <label htmlFor="coverPhoto" className="absolute cursor-pointer">
                <ImCamera style={{ color: "gray" }} className="w-5 h-5" />
                <input
                  type="file"
                  id="coverPhoto"
                  accept="image/*"
                  name="coverPhoto"
                  className="hidden"
                  onChange={handleCoverPhotoUpload}
                ></input>
              </label>
            </div>

            <div className="absolute">
              <div className="rounded-full object-cover object-center w-[60px] h-[60px] z-30 lg:w-36 lg:h-36 lg:border-4">
                <img
                  src={user.photo || "/avatar.jpg"}
                  alt="profile"
                  className="rounded-full object-cover object-center w-full h-full"
                />
              </div>
              <div className="p-2 absolute bottom-20 right-20">
                <label htmlFor="photo" className="absolute cursor-pointer">
                  <ImCamera style={{ color: "gray" }} className="w-5 h-5" />
                  <input
                    type="file"
                    accept="image/*"
                    id="photo"
                    name="photo"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  ></input>
                </label>
              </div>
            </div>
          </div>

          <div className="flex flex-col p-2 justify-center items-center">
            <div className="pl-2 flex items-center">
              <p className="text-2xl px-2 font-bold">{user.name}</p>
            </div>

            <div className="pl-2 flex items-center">
              <ImMail2 />
              <p className="text-lg px-2 font-bold">{user.email}</p>
            </div>

            {user.phoneNumber && (
              <div className="pl-2 flex items-center">
                <ImPhone />
                <p className="text-lg px-2 font-bold">{user.phoneNumber}</p>
              </div>
            )}

            {user.location && (
              <div className="pl-2 flex items-center">
                <ImLocation2 />
                <p className="text-lg px-2 font-bold">{user.location}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="p-2">
        <div className="m-auto p-2 border rounded-md">
          <form onSubmit={handleSubmit}>
            <div className="md:grid md:grid-cols-2 p-2">
              <div className="flex flex-col py-4 md:flex-row items-center justify-between">
                <p className="ext-lg p-2 font-bold">
                  Enter to update your name*
                </p>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder={user.name ? user.name : "Enter your name"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="p-4 border rounded-md resize-y focus:outline-none focus:border-blue-500"
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
                  className="p-4 border rounded-md resize-y focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col md:flex-row items-center justify-between">
                <p className="ext-lg p-2 font-bold">
                  Enter to update your location*
                </p>
                <input
                  type="text"
                  name="location"
                  id="location"
                  placeholder={
                    user.location ? user.location : "Enter your location"
                  }
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="p-4 border rounded-md resize-y focus:outline-none focus:border-blue-500"
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
                    user.phoneNumber
                      ? user.phoneNumber
                      : "Enter your phonenumber"
                  }
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="p-4 border rounded-md resize-y focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-center">
                <div>
                  <button
                    type="button"
                    onClick={fetchUserData}
                    className="bg-gray-800 rounded-lg text-white m-2 py-2 px-8 md:p3 md:rounded-lg font-bold hover:bg-gray-500 active:bg-gray-800"
                  >
                    Discard
                  </button>
                </div>
                <div>
                  <button
                    disabled={loading}
                    type="submit"
                    className="bg-blue-800 rounded-lg text-white m-2 py-2 px-8 md:p3 md:rounded-lg font-bold hover:bg-blue-500 active:bg-blue-900"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default editprofile;
