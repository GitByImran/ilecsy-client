import React from "react";
import Unbuild from "../../../public/Unbuild";
import { Box, Button, Icon, Typography } from "@mui/material";
import { GoHome } from "react-icons/go";
import { Link } from "react-router-dom";

const MakePayment = () => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Unbuild />
      <Button component={Link} to="/" sx={{ color: "#333" }}>
        <GoHome fontSize={20} />
        <Typography my={3} mx={1} p={0}>
          Go Back
        </Typography>
      </Button>
    </Box>
  );
};

export default MakePayment;
