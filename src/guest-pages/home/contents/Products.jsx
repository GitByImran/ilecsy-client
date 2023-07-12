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
import React, { useEffect, useState } from "react";

const Products = ({ prodCat }) => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [productData, setProductData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/products.json");
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
        {filteredData.slice(0, 12).map((product, index) => (
          <Card key={index}>
            <CardContent>
              <CardMedia sx={{ display: "flex", justifyContent: "center" }}>
                <img src={product.productImage} alt={product.productName} />
              </CardMedia>
              <Box mt={5} mb={2}>
                <Typography>{product.productName}</Typography>
                <Typography>
                  Available quantity : {product.availableQuantity}
                </Typography>
                <Typography>Price : {product.price}</Typography>
              </Box>
              <Button variant="outlined">details</Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Products;
