import React, { useContext, useEffect, useState } from "react";
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

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedOption, setSelectedOption] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("Watches");
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({});

  useEffect(() => {
    axios
      .get("https://ilecsy-server.vercel.app/products")
      .then((response) => {
        setProducts(response.data);
        // console.log(response.data);
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

  const handleUpdateButtonClick = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleUpdateDetails = (data) => {
    // console.log("Updated Details:", data);
    setOpenModal(false);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.patch(
        `https://ilecsy-server.vercel.app/products/${selectedProduct._id}`,
        updatedProduct
      );
      console.log(response);
      console.log(updatedProduct);
      if (response.status === 200) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === selectedProduct._id ? response.data : product
          )
        );
        // window.location.reload();

        setOpenModal(false);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axios.delete(
        `https://ilecsy-server.vercel.app/products/${productId}`
      );

      if (response.status === 200) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  console.log(updatedProduct)

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

      <Table>
        <TableHead>
          {/* <TableCell>Product ID</TableCell> */}
          <TableCell>Product Image</TableCell>
          <TableCell>Product Name</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>tax</TableCell>
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
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                  }}
                >
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleUpdateButtonClick(product)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    delete
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* modal box */}
      <Modal open={openModal} onClose={handleModalClose}>
        <Box
          sx={{
            background: "#fff",
            padding: "30px",
            borderRadius: "8px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <form onSubmit={handleUpdateDetails}>
            <Grid container spacing={2}>
              {/* Product Name */}
              <Grid item xs={12}>
                <TextField
                  label="Product Name"
                  fullWidth
                  placeholder={selectedProduct?.productName}
                  value={updatedProduct.productName || ""}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      productName: e.target.value,
                    })
                  }
                />
              </Grid>

              {/* Product Image */}
              {/* <Grid item xs={12}>
                <TextField
                  label="Product Image"
                  fullWidth
                  placeholder="Enter Product Image URL"
                />
              </Grid> */}

              {/* Available Quantity */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Select
                    label="availablity"
                    value={updatedProduct.availablity || selectedProduct?.availablity}
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        availablity: e.target.value,
                      })
                    }
                    displayEmpty
                  >
                    <MenuItem value="">Select availablity</MenuItem>
                    <MenuItem value="inStock">In Stock</MenuItem>
                    <MenuItem value="outOfStock">Out of Stock</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Price */}
              <Grid item xs={12}>
                <TextField
                  label="Product Price"
                  fullWidth
                  placeholder={selectedProduct?.price}
                  value={updatedProduct.price || ""}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      price: e.target.value,
                    })
                  }
                />
              </Grid>

              {/* Tax */}
              <Grid item xs={12}>
                <TextField
                  label="Tax"
                  fullWidth
                  placeholder={selectedProduct?.tax}
                  value={updatedProduct.tax || ""}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      tax: e.target.value,
                    })
                  }
                />
              </Grid>

              {/* Category */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Select onChange={(e) => setSelectedCategory(e.target.value)}>
                    <MenuItem value="select" disabled>
                      {selectedProduct?.category}
                    </MenuItem>
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
              </Grid>

              {/* Update Details Button */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleFormSubmit}
                >
                  Update Details
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default ManageProduct;
