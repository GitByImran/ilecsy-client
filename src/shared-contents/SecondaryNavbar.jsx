import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Products from "../guest-pages/home/contents/Products";

const categories = [
  { label: "watches" },
  { label: "cameras" },
  { label: "electronics" },
  { label: "computers" },
  { label: "smartphones" },
  { label: "books" },
  { label: "outdoors" },
  { label: "toys" },
  { label: "crafts" },
];
const SecondaryNavbar = () => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [prodCat, setProdCat] = useState("");

  const handleCategory = (item) => {
    setProdCat(item);
  };
  console.log(prodCat);
  return (
    <Box>
      <nav>
        <Box
          sx={{
            display: "flex",
            justifyContent: isTablet ? "start" : "space-between",
            gap: "20px",
            overflowX: "auto",
          }}
        >
          {categories.map((category, index) => (
            <Link
              key={index}
              style={{
                textDecoration: "none",
                padding: "20px 0",
                textTransform: "capitalize",
                color: category.label === prodCat ? "#000" : "inherit",
                fontWeight: category.label === prodCat ? "bold" : "normal",
              }}
              onClick={() => handleCategory(category.label)}
            >
              {category.label}
            </Link>
          ))}
        </Box>
      </nav>
      <Products prodCat={prodCat} />
    </Box>
  );
};

export default SecondaryNavbar;
