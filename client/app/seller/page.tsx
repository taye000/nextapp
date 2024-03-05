"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "../utils/tokenUtils";
import { IUser } from "../utils/types";
import toast from "react-hot-toast";
import { ImPlus } from "react-icons/im";
import Image from "next/image";

// TODO'S
// 1. Add a form to create a product with photo, item name, price, and description.
// 2. create link to the product detail page.


const seller = () => {
  // initialize useRouter
  const router = useRouter();

  // get the stored cookie from local storage
  const cookie = getCookie();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/users/currentuser`,
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

      // Update user state with fetched data
      setUser(userData.user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTxPhotoUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const selectedFile = e.target.files && e.target.files[0];

    if (!selectedFile) {
      console.log("No file selected");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("photo", selectedFile);

      const res = await fetch(
        `${apiUrl}/transactions/uploadTxPhoto`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
          body: formData,
        }
      );
      const json = await res.json();
      if (!res.ok) throw Error(json.message);
      setTxPhoto(json.photo);

      toast.success("Transaction photo updated successfully");
      console.log("Transaction photo updated successfully", json.photo);

    } catch (error) {
      toast.error("Error updating transaction photo, please try again.");
      console.error("error updating transaction photo", error);
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

  const [amount, setAmount] = useState("");
  const [item, setItem] = useState("");
  const [description, setDescription] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [txPhoto, setTxPhoto] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Wrap the fetch operation in toast.promise
    toast.promise(
      // The fetch operation as a promise
      fetch(`${apiUrl}/transactions/create-transaction`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cookie}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          item,
          description,
          txPhoto,
        }),
      })
        .then(async (res) => {
          const json = await res.json();
          if (!res.ok) {
            throw new Error(json.message || "Failed to create transaction");
          }
          // Set the transaction id
          setTransactionId(json.transaction._id);

          // Clear the form fields
          setAmount("");
          setItem("");
          setDescription("");
          setTxPhoto(null);
          return json; // Return json for the success handler
        }),
      {
        loading: 'Creating transaction...',
        success: 'Transaction created successfully!',
        error: (err) => `${err.toString() || "Error creating transaction"}`, // Customize based on the error response
      }
    );
  };

  const [user, setUser] = useState<IUser>({
    id: "",
    name: "",
    email: "",
    phoneNumber: "",
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between mt-5">
      <div className="border rounded-md shadow-md p-6">
        <div className="flex justify-center">
          <h1 className="font-bold text-2xl">Seller Form</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              required
              type="text"
              name="item"
              id="item"
              placeholder="Item Name"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              className="w-full p-4 border rounded-md resize-y focus:outline-none focus:border-blue-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 focus:invalid:text-red-600"
            />
            <input
              required
              type="text"
              name="Description"
              id="Description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-4 border rounded-md resize-y focus:outline-none focus:border-blue-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 focus:invalid:text-red-600"
            />
            <input
              required
              type="text"
              name="amount"
              id="amount"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-4 border rounded-md resize-y focus:outline-none focus:border-blue-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 focus:invalid:text-red-600"
            />
            <div>
              <label htmlFor="txphoto" className="text-2xl font-semibold cursor-pointer">Upload Photo
                <div className="border rounded-md shadow-md p-9 m-6">
                  <div className="flex items-center justify-center">
                    <ImPlus />
                    <input
                      type="file"
                      accept="image/*"
                      id="txphoto"
                      name="txphoto"
                      className="hidden"
                      onChange={
                        handleTxPhotoUpload
                      }
                    ></input>
                  </div>
                </div>
              </label>
              {txPhoto && (
                <div className="mt-4">
                  <Image
                    src={txPhoto}
                    width={200}
                    height={200}
                    alt="Transaction Photo Preview"
                    className="mt-2 border rounded-md shadow-md"
                    style={{ maxWidth: "100%", maxHeight: "200px" }}
                  />
                </div>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-700 rounded-full text-white p-3 md:p3 md:rounded-full md:bg-blue-700 hover:bg-blue-400 active:bg-blue-900"
            >
              Submit
            </button>
          </form>
        </div>
      </div >
    </main >
  );
};

export default seller;
