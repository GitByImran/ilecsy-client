import React, { useContext, useEffect, useState } from "react";
import Unbuild from "../../../public/Unbuild";
import { Box, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../../authentication/Provider";

const PaymentHistory = () => {
  const { user, loading } = useContext(AuthContext);
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    // Fetch payment history from the server using axios.get with user's email as a query parameter
    if (user?.email) {
      axios
        .get("https://ilecsy-server.vercel.app/payments", {
          params: {
            email: user.email,
          },
        })
        .then((response) => {
          setPaymentHistory(response.data);
        })
        .catch((error) => {
          console.error("Error fetching payment history:", error);
        });
    }
  }, [user?.email]);

  if (loading) {
    return <Box>Loading...</Box>
  }

  if (paymentHistory.length === 0) {
    return <Box>You have not made any payment yet.</Box>;
  }

  return (
    <>
      {paymentHistory.map((payment) => (
        <Card key={payment._id} sx={{ my: 2 }}>
          <CardContent>
            <Typography variant="h6">Payment Details</Typography>
            <Typography variant="body1">date: {payment.date}</Typography>
            <Typography variant="body1">ID: {payment.id}</Typography>
            <Typography variant="body1">Name: {payment.name}</Typography>
            <Typography variant="body1">Email: {payment.email}</Typography>
            <Typography variant="body1">Phone: {payment.phone}</Typography>
            <Typography variant="body1">
              Address: {payment.address.line1}, {payment.address.city},{" "}
              {payment.address.state}, {payment.address.country},{" "}
              {payment.address.postal_code}
            </Typography>
            <Typography variant="body1">
              Card Brand: {payment.card.brand}
            </Typography>
            <Typography variant="body1">
              Card Last4: {payment.card.last4}
            </Typography>
            <Typography variant="body1">
              Card Expiry: {payment.card.exp_month}/{payment.card.exp_year}
            </Typography>
            <Typography variant="body1">
              Amount: {payment.amount} {payment.currency}
            </Typography>
            <Typography variant="body1">Status: {payment.status}</Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default PaymentHistory;
