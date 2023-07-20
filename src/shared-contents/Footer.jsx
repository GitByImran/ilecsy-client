import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const quickLinks = [
  { label: "All Categories", goto: "/" },
  { label: "Location", goto: "/" },
  { label: "Careers", goto: "/" },
  { label: "Our Company", goto: "/" },
  { label: "Sell on Ilecsy", goto: "/" },
  { label: "Help", goto: "/" },
  { label: "Product Recalls", goto: "/" },
  { label: "Accessibility", goto: "/" },
  { label: "Sign-up for Email", goto: "/" },
  { label: "Terms of Use", goto: "/" },
  { label: "Privacy & Security", goto: "/" },
  { label: "Privacy Choices", goto: "/" },
  { label: "Your Privacy Choices", goto: "/" },
  { label: "Notice at Collection", goto: "/" },
  { label: "Request Personal Information", goto: "/" },
  { label: "Contact us", goto: "/" },
];

const Footer = () => {
  return (
    <Box sx={{ background: "#377a83", py: 3 }}>
      <Container>
        <Typography
          fontSize={20}
          fontWeight={700}
          color="#ddd"
          textAlign="center"
        >
          Quick Links{" "}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "",
            gap: 1,
            py: 3,
          }}
        >
          {quickLinks.map((link, index) => (
            <Button
              key={index}
              component={Link}
              to={link.goto}
              size="small"
              sx={{ color: "#fff", fontWeight: 400 }}
            >
              {link.label}
            </Button>
          ))}
        </Box>
        <Box>
          <Typography textAlign="center" fontSize={14} color="#aaa">
            &copy; 2023 Ilecsy. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
