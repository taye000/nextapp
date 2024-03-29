"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IUser } from "../utils/types";
import { getCookie } from "../utils/tokenUtils";
import { BiSolidCopy } from "react-icons/bi";
import toast, { Toaster } from "react-hot-toast";

const buyer = () => {
  // initialize useRouter
  const router = useRouter();

  // get the stored cookie from local storage
  const cookie = getCookie();

  //methods of payment
  const paymentMethods = ["Mobile Money", "Bank Transfer", "Crypto"];

  //supported mobile networks
  const mobileNetworks = ["Safaricom", "MTN-Uganda", "MTN-Rwanda", "Airtel-Kenya"];

  type CryptoCurrency = "Bitcoin" | "Ethereum" | "Litecoin" | "Ripple";

  //supported crypto currencies
  const cryptoCurrencies = ["Bitcoin", "Ethereum", "Litecoin", "Ripple"];

  // supported crypto currencies addresses
  const cryptoCurrenciesAddresses = {
    Bitcoin: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    Ethereum: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    Litecoin: "LbTjM6Kg7JM9tYwYF4zv1Gf5F6JfJb9w7z",
    Ripple: "rEb8TK3zTz6FpvBc3FX1k9i7yZGASLpE"
  };

  // Function to copy text to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success('Copied!', {
          iconTheme:{
            primary: "blue",
            secondary: "white"
          }
        });
      },
      (err) => {
        console.error('Could not copy:', err);
        toast.error('Failed to copy');
      }
    );
  };


  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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

  const [clientId, setclientId] = useState("");
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState("");
  const [item, setItem] = useState("");
  const [mobileNetwork, setMobileNetwork] = useState("");
  const [supportedCrypto, setSupportedCrypto] = useState<CryptoCurrency | "">("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [copySuccess, setCopySuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    toast.promise(
      // Promise to wait for
      fetch(`${apiUrl}/transactions/create-transaction`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cookie}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientId,
          amount,
          item,
          mode,
        }),
      }).then((res) => {
        if (!res.ok) {
          // Convert non-2xx HTTP responses into errors
          return res.json().then((json) => Promise.reject(json));
        }
        return res.json();
      }),
      {
        // Object with three states: loading, success, and error
        loading: 'Creating transaction...',
        success: 'Transaction created successfully!',
        error: 'Error creating transaction',
      }
    ).then((json) => {
      // Handle the success state
      console.log(json);
      // Clear the form fields
      setclientId("");
      setAmount("");
      setMode("");
      setItem("");
    }).catch((error) => {
      // The error state is handled by toast.promise, but you can still catch and log or do additional handling
      console.error(error);
    }).finally(() => {
      setLoading(false);
    });
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
          <h1 className="font-bold text-2xl">Buyer Form</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              required
              type="clientId"
              name="clientId"
              id="clientId"
              placeholder="Seller's ID"
              value={clientId}
              onChange={(e) => setclientId(e.target.value)}
              className="w-full p-4 border rounded-md resize-y focus:outline-none focus:border-blue-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 focus:invalid:text-red-600"
            />
            <input
              required
              type="amount"
              name="amount"
              id="amount"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-4 border rounded-md resize-y focus:outline-none focus:border-blue-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 focus:invalid:text-red-600"
            />
            <input
              required
              type="item"
              name="item"
              id="item"
              placeholder="Item Description"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              className="w-full p-4 border rounded-md resize-y focus:outline-none focus:border-blue-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 focus:invalid:text-red-600"
            />
            <div className="w-full border rounded-md resize-y focus:outline-none focus:border-blue-500">
              <select
                required
                name="mode"
                id="mode"
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="w-full border rounded-md resize-y p-4 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Payment Method</option>
                {paymentMethods.map((method, index) => (
                  <option key={index} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </div>

            {mode === "Mobile Money" && (
              <>
                <div className="w-full border rounded-md resize-y focus:outline-none focus:border-blue-500">
                  <select
                    required
                    name="mobileNetwork"
                    id="mobileNetwork"
                    value={mobileNetwork}
                    onChange={(e) => setMobileNetwork(e.target.value)}
                    className="w-full p-4 border rounded-md resize-y focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select Mobile Network</option>
                    {mobileNetworks.map((network, index) => (
                      <option key={index} value={network}>
                        {network}
                      </option>
                    ))}
                  </select>
                </div>
                {mobileNetwork && (
                  <input
                    required
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full p-4 border rounded-md resize-y focus:outline-none focus:border-blue-500"
                  />
                )}
              </>
            )}

            {mode === "Crypto" && (
              <>
                <div className="w-full border rounded-md resize-y focus:outline-none focus:border-blue-500">
                  <select
                    required
                    name="supportedCrypto"
                    id="supportedCrypto"
                    value={supportedCrypto}
                    onChange={(e) => setSupportedCrypto(e.target.value as CryptoCurrency)}
                    className="w-full p-4 border rounded-md resize-y focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select Cryptocurrency</option>
                    {cryptoCurrencies.map((currency, index) => (
                      <option key={index} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </div>

                {supportedCrypto && (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      readOnly
                      value={`${supportedCrypto} Address: ${cryptoCurrenciesAddresses[supportedCrypto] || ""}`}
                      className="w-full p-4 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-200 text-gray-700 flex-grow"
                    />
                    <button
                      type="button"
                      onClick={() => supportedCrypto && copyToClipboard(cryptoCurrenciesAddresses[supportedCrypto])}
                      className="p-2 bg-blue-500 text-white rounded-md flex-shrink-0"
                      title="Copy Address"
                    >
                      <BiSolidCopy size={24} />
                    </button>
                    {copySuccess && <span className="text-sm text-green-500 ml-2">{copySuccess}</span>}
                  </div>
                )}

              </>
            )}


            <button
              type="submit"
              className={`bg-blue-700 rounded-full text-white p-3 md:p3 md:rounded-full md:bg-blue-700 hover:bg-blue-400 active:bg-blue-900 ${loading ? "flex items-center justify-center" : ""
                }`}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Toaster />
    </main>
  );
};

export default buyer;
