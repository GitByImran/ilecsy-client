import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../shared-contents/Navbar";
import Footer from "../shared-contents/Footer";
import { Container } from "@mui/material";

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
