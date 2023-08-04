import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { AuthContext } from "../../authentication/Provider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ThreeDots } from "react-loader-spinner";

const CheckoutForm = ({ price }) => {
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(false)



  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();

  const countryCodes = {
    Bangladesh: "BD",
  };

  const [userAddress, setUserAddress] = useState({
    city: "",
    country: "",
    line1: "",
    line2: "",
    postal_code: "",
    state: "",
  });

  const [name, setName] = useState(user?.displayName || "");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const getItemFromcart = JSON.parse(localStorage.getItem("cartQuantities"));
    if (getItemFromcart) {
      setProducts(getItemFromcart)
    }
    axios
      .post("http://localhost:5000/create-payment-intent", { price })
      .then((res) => {
        // console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
  }, [price]);


  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true)

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const billingDetails = {
      address: {
        city: userAddress.city,
        country: countryCodes[userAddress.country],
        line1: userAddress.line1,
        line2: userAddress.line2,
        postal_code: userAddress.postal_code,
        state: userAddress.state,
      },
      email: user.email,
      name: name,
      phone: phone,
    };

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
      billing_details: billingDetails,
    });

    if (error) {
      // console.log("[error]", error);
    } else {
      // console.log("[PaymentMethod]", paymentMethod);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    const currentDate = new Date();
    const bangladeshOffset = 6 * 60;
    const bangladeshTime = new Date(
      currentDate.getTime() + bangladeshOffset * 60000
    );

    const formattedDateTime = bangladeshTime.toLocaleString("en-GB", {
      timeZone: "UTC",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    if (confirmError) {
      // console.log(confirmError);
    } else if (paymentIntent.status === "succeeded") {
      // console.log(paymentIntent);
      const trxId = paymentIntent.id;
      setTransactionId(trxId);

      const postData = {
        products: products,
        address: billingDetails.address,
        email: billingDetails.email,
        name: billingDetails.name,
        phone: billingDetails.phone,
        card: {
          brand: paymentMethod.card.brand,
          country: paymentMethod.card.country,
          exp_month: paymentMethod.card.exp_month,
          exp_year: paymentMethod.card.exp_year,
          funding: paymentMethod.card.funding,
          last4: paymentMethod.card.last4,
        },
        payment_method_types: paymentIntent.payment_method_types,
        id: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
        date: formattedDateTime,
        status: 'pending'
      };

      axios
        .post("http://localhost:5000/payments", postData)
        .then((response) => {
          // console.log(response);
          const orderIds = postData.products;
          setLoading(false)
        })
        .catch((error) => {
          console.error(error);
        });

      Swal.fire({
        icon: "success",
        title: "Payment Successful!",
        text: `trxId : ${trxId}`,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/dashboard/payment-history");
          localStorage.removeItem('userData');
          localStorage.removeItem('cartQuantities');
        }
      });
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ p: 2, boxShadow: "0 0 10px rgba(0,0,0,20%)" }}
    >
      <form onSubmit={handleSubmit} style={{ margin: "20px 0" }}>
        <Box
          display="grid"
          gridTemplateColumns={!isMobile && "1fr 1fr"}
          sx={{ gap: "20px" }}
        >
          {/* Input fields for email, name, and phone */}
          <TextField
            fullWidth
            value={user?.email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            required
          />
          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            required
          />
          <TextField
            label="Phone"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            variant="outlined"
            required
          />
          {/* Input fields for address */}
          <TextField
            label="City"
            name="city"
            fullWidth
            value={userAddress.city}
            onChange={(e) =>
              setUserAddress({ ...userAddress, city: e.target.value })
            }
            variant="outlined"
            required
          />
          <TextField
            label="Country"
            name="country"
            fullWidth
            value={userAddress.country}
            onChange={(e) =>
              setUserAddress({ ...userAddress, country: e.target.value })
            }
            variant="outlined"
            required
          />
          <TextField
            label="Line 1"
            fullWidth
            value={userAddress.line1}
            onChange={(e) =>
              setUserAddress({ ...userAddress, line1: e.target.value })
            }
            variant="outlined"
            required
          />
          <TextField
            label="Line 2"
            fullWidth
            value={userAddress.line2}
            onChange={(e) =>
              setUserAddress({ ...userAddress, line2: e.target.value })
            }
            variant="outlined"
            required
          />
          <TextField
            label="Postal Code"
            fullWidth
            value={userAddress.postal_code}
            onChange={(e) =>
              setUserAddress({ ...userAddress, postal_code: e.target.value })
            }
            variant="outlined"
            required
          />
          <TextField
            label="State"
            fullWidth
            value={userAddress.state}
            onChange={(e) =>
              setUserAddress({ ...userAddress, state: e.target.value })
            }
            variant="outlined"
            required
          />
        </Box>

        {/*  */}
        <Box sx={{ my: 4 }}>
          <Typography mb={3}>
            Please provide your card information here :{" "}
          </Typography>
          <Box sx={{ p: 2, border: "1px solid #aaa", borderRadius: "5px" }}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </Box>
          <Button
            type="submit"
            disabled={!stripe}
            variant="contained"
            sx={{ py: 1, px: 4, mt: 4 }}
          >
            {loading ? <ThreeDots
              height="40"
              width="40"
              radius="9"
              color="#fff"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            /> : "Pay"}
          </Button>

        </Box>
        {/* <Typography>{transactionId}</Typography> */}
      </form>
    </Container>
  );
};

export default CheckoutForm;


