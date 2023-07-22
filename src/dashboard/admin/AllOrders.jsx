import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Select,
  MenuItem,
  FormControl,
  Modal,
  Grid,
  TextField,
} from "@mui/material";

const Allorders = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, []);

  return (
    <Box>
      {products.length === 0 ? (
        <Typography variant="body1">Wait a while please...</Typography>
      ) : (
        <Table>
          <TableHead>
            {/* <TableCell>Product ID</TableCell> */}
            <TableCell>Product Image</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>tax</TableCell>
            <TableCell>Available</TableCell>
            <TableCell>Status</TableCell>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index}>
                {/* <TableCell>{index + 1}</TableCell> */}
                <TableCell>
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    style={{ width: "75px", height: "75px" }}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    maxWidth: "300px",
                    overflow: "hidden",
                    whiteSpace: "wrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {product.productName}
                </TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>${product.tax}</TableCell>
                <TableCell>{product.availableQuantity}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                    }}
                  >
                    <Button variant="contained" size="small">
                      pending
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
};

export default Allorders;
