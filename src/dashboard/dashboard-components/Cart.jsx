import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { AuthContext } from "../../authentication/Provider";
import { Toaster, toast } from "react-hot-toast";


const Cart = () => {
  const [quantities, setQuantities] = useState({});
  const [selectedCart, setSelectedCart] = useState({});
  const { user } = useContext(AuthContext)

  const handleIncreaseQuantity = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 0) + 1,
    }));
  };

  const handleDecreaseQuantity = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max((prevQuantities[id] || 0) - 1, 0),
    }));
  };

  const calculateTotalPrice = (item) => {
    const quantity = quantities[item._id] || 0;
    return item.price * quantity;
  };

  const calculateTotalTax = (item) => {
    const quantity = quantities[item._id] || 0;
    return item.tax * quantity;
  };

  const calculateOverallTotalPrice = () => {
    let totalPrice = 0;
    let totalTax = 0;

    Object.values(selectedCart).forEach((item) => {
      const quantity = quantities[item._id] || 0;
      totalPrice += item.price * quantity;
      totalTax += item.tax * quantity;
    });

    return (totalPrice + totalTax);
  };


  const overallTotalPrice = Math.round(calculateOverallTotalPrice()) - 1;

  const handleMakePayment = (data) => {
    const hasZeroPrice = Object.values(data).some((item) => calculateTotalPrice(item) === 0);

    if (hasZeroPrice) {
      toast.error('Please select at least one quantity for \n each item or delete the unnecessary item.')
      return
    }
    else {
      const url = `/dashboard/make-payment?countOn=${overallTotalPrice}`;
      window.location.href = url;
    }

  };

  useEffect(() => {
    const getItemFromcart = JSON.parse(localStorage.getItem("userData"));
    // console.log(getItemFromcart)
    if (getItemFromcart) {
      const productArray = getItemFromcart[user?.email];
      setSelectedCart(productArray || []);
    }
  }, [user]);


  const updateCartData = (updatedSelectedCart) => {
    setSelectedCart(updatedSelectedCart);

    const getItemFromcart = JSON.parse(localStorage.getItem("userData"));
    if (getItemFromcart) {
      getItemFromcart[user?.email] = updatedSelectedCart;
      localStorage.setItem("userData", JSON.stringify(getItemFromcart));
    }
  };

  const handleDelete = (id) => {
    const updatedSelectedCart = selectedCart.filter((item) => item._id !== id);
    updateCartData(updatedSelectedCart);

    const updatedQuantities = { ...quantities };
    delete updatedQuantities[id];
    localStorage.setItem("cartQuantities", JSON.stringify(updatedQuantities));
  };

  useEffect(() => {
    localStorage.setItem("cartQuantities", JSON.stringify(quantities));
  }, [quantities]);

  useEffect(() => {
    const storedQuantities = JSON.parse(localStorage.getItem("cartQuantities"));
    if (storedQuantities) {
      setQuantities(storedQuantities);
    }
  }, []);

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Tax</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          {Object.keys(selectedCart).length === 0 && (
            <Typography m={3} display="block" width="max-content">
              no product selected
            </Typography>
          )}
          <TableBody>
            {Array.isArray(selectedCart) && selectedCart.map((item) => (
              <TableRow key={item._id}>

                <TableCell>
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    style={{ width: "75px", height: "75px" }}
                  />
                </TableCell>
                <TableCell>{item.productName}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Button
                      onClick={() => handleDecreaseQuantity(item._id)}
                    >
                      <AiOutlineMinus color="#333" />
                    </Button>
                    {quantities[item._id] || 0}
                    <Button
                      onClick={() => handleIncreaseQuantity(item._id)}
                    >
                      <AiOutlinePlus color="#333" />
                    </Button>
                  </Box>
                </TableCell>
                <TableCell>${calculateTotalPrice(item)}</TableCell>
                <TableCell>${calculateTotalTax(item)}</TableCell>
                <TableCell>
                  ${(calculateTotalPrice(item) + calculateTotalTax(item)).toFixed(2)}
                </TableCell>
                <TableCell>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleDelete(item._id)} // Pass the item id to handleDelete
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ width: "100%", textAlign: "right" }}>
        <Typography mt={2}>
          Total Price: ${calculateOverallTotalPrice().toFixed(2)}
        </Typography>
        <Button
          onClick={() => handleMakePayment(selectedCart)}
          type="submit"
          variant="contained"
          color="primary"
          sx={{ my: 2 }}
        >
          Make Payment
        </Button>
      </Box>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </Box>
  );
};

export default Cart;
