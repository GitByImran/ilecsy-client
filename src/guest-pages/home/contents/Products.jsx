import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../authentication/Provider";

const Products = ({ prodCat }) => {
  const { cart, updateCart } = useContext(AuthContext);
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [productData, setProductData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/products", //https://ilecsy-server.vercel.app/products
          {
            headers: {
              authorization: `bearer ${token}`,
            },
          }
        );
        setProductData(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (prodCat && productData.length > 0) {
      const filtered = productData.filter(
        (product) => product.category === prodCat
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(productData);
    }
  }, [prodCat, productData]);

  const HandleAddToCart = (id) => {
    const selectedProduct = filteredData.find((product) => product._id === id);
    if (!selectedProduct || cart.some((item) => item._id === id)) {
      return;
    }
    const updatedCart = [...cart, selectedProduct];
    updateCart(updatedCart);
  };

  return (
    <Box>
      <Typography width="100%" textAlign="center" py={2}>
        You are viewing categories of :
        <b
          style={{
            color: "red",
            padding: "0 5px",
            textTransform: "capitalize",
          }}
        >
          {filteredData[0]
            ? filteredData[0].category
            : "sorry, no product here"}
        </b>
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "repeat(1, 1fr)"
            : isTablet
            ? "repeat(2, 1fr)"
            : "repeat(3, 1fr)",
          gap: "30px",
          marginY: 5,
        }}
      >
        {filteredData.slice(0, 6).map((product, index) => (
          <Card key={index}>
            <CardContent>
              <CardMedia sx={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={product.productImage}
                  alt={product.productName}
                  style={{
                    maxHeight: "300px",
                    maxWidth: "300px",
                    objectFit: "cover",
                  }}
                />
              </CardMedia>
              <Box mt={5} mb={2}>
                <Typography
                  maxWidth="300px"
                  overflow="hidden"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                >
                  {product.productName}
                </Typography>
                <Typography>
                  Available quantity : {product.availableQuantity}
                </Typography>
                <Typography>Price : {product.price}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => HandleAddToCart(product._id)}
                >
                  Add to cart
                </Button>
                <Button variant="outlined">details</Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Products;
