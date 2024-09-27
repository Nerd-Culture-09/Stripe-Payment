
"use client";

import React, { useState, useEffect } from "react";
import CheckoutPage from "@/components/CheckOut";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Home() {
  const [amount, setAmount] = useState<number | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    if (amount !== null) {
      // Fetch the client secret from your server
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
      })
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret);
        })
        .catch((error) => {
          console.error("Error fetching client secret:", error);
        });
    }
  }, [amount]);

  const options = clientSecret
    ? {
        clientSecret, // Only pass clientSecret when it's defined (non-null)
        appearance: {
          theme: "stripe" as "stripe", // Explicitly set the type to match allowed values
        },
      }
    : undefined;

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setAmount(isNaN(value) ? null : value);
  };

  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Enter Amount to Pay</h1>
        <input
          type="number"
          placeholder="Enter amount"
          className="text-black p-2 rounded-md mb-5 w-full"
          onChange={handleAmountChange}
        />
      </div>

      {/* Only render the Elements component if the clientSecret is available */}
      {clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutPage amount={amount!} />
        </Elements>
      ) : (
        amount !== null && <div>Loading payment options...</div>
      )}
    </main>
  );
}
