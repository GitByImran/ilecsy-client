import React from "react";
import { Box } from "@mui/material";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT);

const MakePayment = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const overallTotalPrice = searchParams.get("countOn");
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm price={overallTotalPrice} />
    </Elements>
  );
};

export default MakePayment;
