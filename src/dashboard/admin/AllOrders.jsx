import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
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


const AllOrders = () => {
  const { user } = useContext(AuthContext);
  const [deliveredStatus, setDeliveredStatus] = useState({});
  const [sortingCriteria, setSortingCriteria] = useState("latest");
  const [showStatus, setShowStatus] = useState("all");

  // Fetch payment data
  const { isLoading: paymentLoading, isError: paymentError, data: paymentData = [], refetch } = useQuery(
    ["payments", user?.email],
    async () => {
      if (user?.email) {
        const response = await fetch(
          `http://localhost:5000/payments`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      }
      refetch()
    },
    {
      initialData: [],
    }
  );

  // Fetch products data
  const { isLoading: productsLoading, isError: productsError, data: productsData = [] } = useQuery(
    ["products", 10000],
    async () => {
      const response = await fetch("http://localhost:5000/products");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    {
      initialData: [],
    }
  );
  // console.log(productsData)
  if (!paymentData) {
    return <Box>Loading...</Box>;
  }

  if (paymentLoading || productsLoading) {
    return <Box>Loading...</Box>;
  }

  if (paymentError || productsError) {
    return <Box>Wait a while please: {paymentError?.message || productsError?.message}</Box>;
  }

  const getProductDetails = (productId) => {
    const findProduct = productsData.find((product) => product._id === productId);
    // console.log(findProduct)
    return findProduct
  };

  const handleDelivered = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/payments/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "delivered" }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setDeliveredStatus((prevStatus) => ({ ...prevStatus, [id]: true }));
      refetch();

    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

  // sorting the orders based on the date and time

  const sortedOrders = () => {
    const orders = paymentData.slice();

    if (sortingCriteria === "latest") {
      orders.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortingCriteria === "oldest") {
      orders.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    return orders;
  };

  // filter the orders based on the showDelivered and showPending criteria
  const filteredOrders = () => {
    let orders = sortedOrders();

    if (showStatus === "delivered") {
      orders = orders.filter((order) => order.status === "delivered");
    } else if (showStatus === "pending") {
      orders = orders.filter((order) => order.status !== "delivered");
    }

    return orders;
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>

        {/* Sorting Dropdown */}
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="sorting-label" sx={{ background: '#fff', color: "#000", px: 1 }}>Sort By</InputLabel>
          <Select
            labelId="sorting-label"
            id="sorting"
            value={sortingCriteria}
            onChange={(e) => setSortingCriteria(e.target.value)}
          >
            <MenuItem value="latest">Latest</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
          </Select>
        </FormControl>

        {/* Show Delivered Checkbox */}
        <RadioGroup
          row
          name="showStatus"
          value={showStatus}
          onChange={(e) => setShowStatus(e.target.value)}
        >
          <FormControlLabel value="all" control={<Radio />} label="All" />
          <FormControlLabel value="delivered" control={<Radio />} label="Delivered" />
          <FormControlLabel value="pending" control={<Radio />} label="Pending" />
        </RadioGroup>

      </Box>

      {/* render component */}
      {filteredOrders().map((payment) => (
        <Box key={payment._id} sx={{ border: "1px solid #ddd" }}>
          <Accordion key={payment._id} >
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ ml: 2 }} />}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}><Typography>Payment information : (click to see)</Typography>
                <div onClick={(e) => { e.stopPropagation() }}>
                  <Button
                    variant="contained"
                    sx={{ p: 0, m: 0, px: 2 }}
                    onClick={() => handleDelivered(payment._id)}
                    disabled={payment.status === 'delivered'}
                  >
                    {payment.status === 'delivered' ? "Delivered" : "Delivery Complete ?"}
                  </Button>
                </div>
              </Box>
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
                          src={productDetails?.productImage}
                          alt={productDetails?.productName}
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

export default AllOrders;
