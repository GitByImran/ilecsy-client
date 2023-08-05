import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./Provider";
import axios from "axios";

const Style = styled("div")(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#000",
      border: "2px solid #000",
    },
    "&:hover fieldset": {
      borderColor: "#000",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#000",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#000",
  },
  "& .MuiFormHelperText-root": {
    color: "#000",
  },
}));

const Signup = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const { email, password, name } = data;
    createUser(email, password)
      .then((userCredential) => {
        const cuerrentUser = userCredential.user;
        updateUserProfile(name)
          .then((user) => {
            // console.log("User name updated successfully");
            // console.log(cuerrentUser);
            alert()

            axios
              .post("https://ilecsy-server.vercel.app/users", {
                name: cuerrentUser.displayName,
                email: cuerrentUser.email,
                role: "user",
              })
              .then((response) => {
                console.log(response.data);
              })
              .catch((error) => {
                // console.log("Error sending POST request:", error);
              });

            reset();
            navigate("/signin");
          })
          .catch((error) => {
            // console.log("Error updating user name:", error);
          });
      })
      .catch((error) => {
        // console.log("Error creating user:", error);
      });
  };

  return (
    <Container maxWidth="sm" sx={{ my: 5 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Let's create an account
      </Typography>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Style>
            <TextField
              label="Name"
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
              margin="normal"
              fullWidth
            />

            <TextField
              label="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              margin="normal"
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern: /(?=.*[A-Z])(?=.*\W)/,
              })}
              error={errors.password}
              helperText={
                errors.password &&
                "Password must be at least 6 characters long and contain a capital letter and a special character"
              }
              margin="normal"
              fullWidth
            />
          </Style>
          <Button
            variant="outlined"
            type="submit"
            sx={{
              marginTop: 2,
              display: "flex",
              alignItems: "center",
              color: "#000",
              border: "none",
              padding: "0px !important",
              "&:hover": {
                border: "none",
                color: "#555",
              },
            }}
          >
            <Typography fontWeight="bold">Submit</Typography>{" "}
            <LoginIcon sx={{ ml: 1 }} />
          </Button>
        </form>
        <Typography my={2} fontWeight="bold">
          Already have an account,{" "}
          <Link
            to="/signin"
            style={{ textDecoration: "none", color: "red", margin: "0 5px" }}
          >
            Login now
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Signup;
