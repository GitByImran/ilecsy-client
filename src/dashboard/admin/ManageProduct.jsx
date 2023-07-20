import React, { useEffect, useState } from "react";
import Unbuild from "../../../public/Unbuild";
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
} from "@mui/material";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedOption, setSelectedOption] = useState("All");

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
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const filteredProducts =
    selectedOption === "All"
      ? products
      : products.filter((product) => product.category === selectedOption);

  return (
    <Box>
      <FormControl>
        <Select
          value={selectedOption}
          onChange={handleOptionChange}
          sx={{ minWidth: "150px", marginBottom: "10px" }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="watches">Watches</MenuItem>
          <MenuItem value="cameras">Cameras</MenuItem>
          <MenuItem value="electronics">Electronics</MenuItem>
          <MenuItem value="computers">Computers</MenuItem>
          <MenuItem value="smartphones">Smartphones</MenuItem>
          <MenuItem value="books">Books</MenuItem>
          <MenuItem value="outdoors">Outdoors</MenuItem>
          <MenuItem value="toys">Toys</MenuItem>
          <MenuItem value="crafts">Crafts</MenuItem>
        </Select>
      </FormControl>

      {filteredProducts.length === 0 ? (
        <Typography variant="body1">
          Sorry, no products available in this category.
        </Typography>
      ) : (
        <Table>
          <TableHead>
            {/* <TableCell>Product ID</TableCell> */}
            <TableCell>Product Image</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>tax</TableCell>
            <TableCell>Available</TableCell>
            <TableCell>Action</TableCell>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product, index) => (
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
                      Update
                    </Button>
                    <Button variant="contained" size="small">
                      delete
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

export default ManageProduct;
