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
import React, { useContext, useState } from "react";
import { AuthContext } from "../../authentication/Provider";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, updateCart } = useContext(AuthContext);

  const [quantities, setQuantities] = useState({});

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

  const handleDelete = (id) => {
    const updatedCart = cart.filter((product) => product._id !== id);
    updateCart(updatedCart);
  };

  const calculateTotalPrice = (product) => {
    const quantity = quantities[product._id] || 0;
    const totalPrice = quantity * product.price;
    return Number(totalPrice.toFixed(2));
  };

  const calculateTotalTax = (product) => {
    const quantity = quantities[product._id] || 0;
    const totalTax = quantity * product.tax;
    return Number(totalTax.toFixed(2));
  };

  const calculateOverallTotalPrice = () => {
    return cart.reduce((total, product) => {
      const totalPrice = calculateTotalPrice(product);
      const alloverPrice = total + totalPrice;
      return Number(alloverPrice.toFixed(2));
    }, 0);
  };

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
          <TableBody>
            {cart.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    style={{ width: "75px", height: "75px" }}
                  />
                </TableCell>
                <TableCell>{product.productName}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Button onClick={() => handleDecreaseQuantity(product._id)}>
                      <AiOutlineMinus color="#333" />
                    </Button>
                    {quantities[product._id] || 0}
                    <Button onClick={() => handleIncreaseQuantity(product._id)}>
                      <AiOutlinePlus color="#333" />
                    </Button>
                  </Box>
                </TableCell>
                <TableCell>${calculateTotalPrice(product)}</TableCell>
                <TableCell>${calculateTotalTax(product)}</TableCell>
                <TableCell>
                  $
                  {(
                    calculateTotalPrice(product) + calculateTotalTax(product)
                  ).toFixed(2)}
                </TableCell>
                <TableCell>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleDelete(product._id)}
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
          Total Price: ${calculateOverallTotalPrice()}
        </Typography>
        <Button
          component={Link}
          to="/dashboard/make-payment"
          type="submit"
          variant="contained"
          color="primary"
          sx={{ my: 2 }}
        >
          Make Payment
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
