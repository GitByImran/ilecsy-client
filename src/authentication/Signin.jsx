import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./Provider";

const Signin = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    signIn(email, password)
      .then((result) => {
        const loggedUser = result.user;
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <Container maxWidth="sm" sx={{ my: 10 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Get back to your account
      </Typography>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email?.message}
            margin="normal"
            sx={{
              width: "100%",
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
            }}
          />
          <TextField
            label="Password"
            type="password"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
            margin="normal"
            sx={{
              width: "100%",
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
            }}
          />
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
            <Typography fontWeight="bold">Sign In</Typography>{" "}
            <LoginIcon sx={{ ml: 1 }} />
          </Button>
        </form>
        <Typography my={2} fontWeight="bold">
          New to Ilecsy ,
          <Link
            to="/signup"
            style={{ textDecoration: "none", color: "red", margin: "0 5px" }}
          >
            Create an account
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Signin;
