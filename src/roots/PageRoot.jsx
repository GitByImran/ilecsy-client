import React from "react";
import { Outlet } from "react-router-dom";

import Footer from "../shared-contents/Footer";
import { Container } from "@mui/material";
import Navbar from "../shared-contents/Navbar";

const PageRoot = () => {
  return (
    <div>
      <Navbar />
      <Container maxWidth="lg">
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
};

export default PageRoot;
