import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AuthContext } from "../../authentication/Provider";

const MyOrders = () => {
  const { user } = useContext(AuthContext);

  // Fetch payment data
  const { isLoading: paymentLoading, isError: paymentError, data: paymentData, refetch } = useQuery(
    ["payments", user?.email],
    async () => {
      if (user?.email) {
        const response = await fetch(
          `http://localhost:5000/payments?email=${user?.email}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      }
      refetch()
    }
  );
  // console.log(paymentData)


  // Fetch products data
  const { isLoading: productsLoading, isError: productsError, data: productsData } = useQuery(
    ["products", 10000],
    async () => {
      const response = await fetch("http://localhost:5000/products");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    }
  );
  // console.log(productsData)

  if (paymentLoading || productsLoading) {
    return <Box>Loading...</Box>;
  }

  if (paymentError || productsError) {
    return <Box>Error: {paymentError?.message || productsError?.message}</Box>;
  }

  if (!paymentData || paymentData.length === 0) {
    return <Box>You have not made any order yet.</Box>;
  }

  const getProductDetails = (productId) => {
    const findProduct = productsData.find((product) => product._id === productId);
    // console.log(findProduct)
    return findProduct
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {paymentData.map((payment) => (
        <Box sx={{ border: "1px solid #ddd" }}>
          <Accordion key={payment._id} >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Payment information : (click to see)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="h6">Payment ID: {payment._id}</Typography>
              <Typography variant="body1">Delivery Status: {payment.status}</Typography>
              <Typography variant="body1">Total Amount: ${payment.amount / 100}</Typography>
              <Typography variant="body1">Payment Date: {payment.date}</Typography>
            </AccordionDetails>
          </Accordion>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Tax</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Delivery</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(payment.products).map((productId) => {
                  const productDetails = getProductDetails(productId);
                  const quantity = payment.products[productId];

                  return (
                    <TableRow key={productId}>
                      <TableCell>
                        <img
                          src={productDetails.productImage}
                          alt={productDetails.productName}
                          style={{ width: "75px", height: "75px" }}
                        />
                      </TableCell>
                      <TableCell>{productDetails.productName}</TableCell>
                      <TableCell>{productDetails.category}</TableCell>
                      <TableCell>{productDetails.price}</TableCell>
                      <TableCell>{productDetails.tax}</TableCell>
                      <TableCell>{quantity}</TableCell>
                      <TableCell>{payment.status}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ))}
    </Box>

  );
};

export default MyOrders;
