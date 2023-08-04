import React, { useContext, useEffect, useState } from "react";
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
import { AuthContext } from "../../../authentication/Provider";
import { Toaster, toast } from "react-hot-toast";

const Products = ({ prodCat }) => {
  const { addToCart, isAdmin, user, setCart, loading } = useContext(AuthContext);
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [productData, setProductData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const userEmail = user ? user.email : null;

  const [userData, setUserData] = useState(() => {
    const userDataFromStorage = localStorage.getItem("userData");
    return userDataFromStorage ? JSON.parse(userDataFromStorage) : {};
  });

  const handleAddToCart = (product) => {
    if (!user) {
      toast.error(
        "You have to SignIn first to select product",
        {
          duration: 6000,
        }
      );
      return
    }
    const isProductAlreadyAdded = userData[userEmail]?.some(
      (item) => item._id === product._id
    );

    if (!isProductAlreadyAdded) {
      setUserData((prevUserData) => ({
        ...prevUserData,
        [userEmail]: [...(prevUserData[userEmail] || []), product],
      }));
      toast.success('product added')
    }
    else {
      toast.error('already added')
    }
  };

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        setProductData(response.data);
      } catch (error) {
        // console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!prodCat && productData.length > 0) {
      const defaultCategory = "watches"; // You can change this to any desired default category
      const filtered = productData.filter((product) => product.category === defaultCategory);
      setFilteredData(filtered);
    } else if (prodCat) {
      const filtered = productData.filter((product) => product.category === prodCat);
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  }, [prodCat, productData]);

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
          {loading ? "loading..." : filteredData[0] ? filteredData[0].category : "Sorry, no product here"}
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
        {filteredData.map((product) => (
          <Card key={product._id}>
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
                  onClick={() => handleAddToCart(product)}
                  disabled={isAdmin}
                >
                  Add to cart
                </Button>
                <Button variant="outlined">details</Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Toaster />
    </Box>
  );
};

export default Products;
