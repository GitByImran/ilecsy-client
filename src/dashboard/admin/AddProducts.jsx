import {
  Box,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Grid,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { IoMdAdd } from "react-icons/io";
import { ThreeDots } from "react-loader-spinner";
import Swal from "sweetalert2";

const AddProducts = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const fileInputRef = useRef(null);
  const apiKey = "f6b7ed31eea5a21e9e00f71286c18481";

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const addProductMutation = useMutation(
    async (formData) => {
      try {
        const response = await fetch("https://ilecsy-server.vercel.app/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        return response.json();
      } catch (error) {
        throw new Error(`Error in addProductMutation: ${error.message}`);
      }
    },
    {
      onError: (error) => {
        console.error("Error in addProductMutation:", error);
      },
    }, {
    onError: (error) => {
      console.error("Error in addProductMutation:", error.message);
    },
  }
  );

  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
      const productData = {
        ...data,
        productImage: imageUrl || "",
      };

      await addProductMutation.mutateAsync(productData);

      // console.log("Product added successfully!");

      // Show the success alert
      Swal.fire({
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 3000
      });

      // Reset the form after successful submission
      reset();

      setSelectedImage(null);
      setUploadComplete(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleUpload = async () => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("image", selectedImage);

      const response = await axios.post("https://api.imgbb.com/1/upload", formData, {
        params: {
          key: apiKey
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setImageUrl(response.data.data.url);
      setSelectedImage(null);
      setUploading(false);
      setUploadComplete(true);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <Box>
      <Typography
        mb={5}
        fontSize={25}
        fontWeight={600}
        color="#546e7a"
        display="flex"
        alignItems="center"
        gap={1}
      >
        <IoMdAdd /> Add New Product
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* Product Name */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="productName"
              control={control}
              defaultValue=""
              rules={{ required: "Product Name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Product Name"
                  fullWidth
                  error={!!errors.productName}
                  helperText={errors.productName?.message}
                />
              )}
            />
          </Grid>


          {/* Price */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="price"
              control={control}
              defaultValue=""
              rules={{ required: "Price is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Price"
                  fullWidth
                  error={!!errors.price}
                  helperText={errors.price?.message}
                />
              )}
            />
          </Grid>

          {/* Tax */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="tax"
              control={control}
              defaultValue=""
              rules={{ required: "Tax is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Tax"
                  fullWidth
                  error={!!errors.tax}
                  helperText={errors.tax?.message}
                />
              )}
            />
          </Grid>

          {/* Category */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="category"
              control={control}
              defaultValue=""
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.category}>
                  <Select {...field} displayEmpty>
                    <MenuItem value="">Select Category</MenuItem>
                    <MenuItem value="watches">Watches</MenuItem>
                    <MenuItem value="cameras">Cameras</MenuItem>
                    <MenuItem value="electronics">Electronics</MenuItem>
                    <MenuItem value="computers">Computers</MenuItem>
                    <MenuItem value="smartphones">Smartphones</MenuItem>
                    <MenuItem value="books">Books</MenuItem>
                    <MenuItem value="outdoors">Outdoors</MenuItem>
                    <MenuItem value="toys">Toys</MenuItem>
                    <MenuItem value="crafts">Crafts</MenuItem>
                  </Select>
                  {errors.category && (
                    <Box component="span" sx={{ color: "red" }}>
                      {errors.category.message}
                    </Box>
                  )}
                </FormControl>
              )}
            />
          </Grid>
          {/* Product Image */}
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <input type="file" onChange={handleImageChange} ref={fileInputRef} />
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
                sx={{ width: "50%" }}
              >
                {uploading ? <ThreeDots
                  height="40"
                  width="40"
                  radius="9"
                  color="#fff"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                /> : "Upload Image"}
              </Button>
            </Box>
          </Grid>

          {/* availablity */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="availablity"
              control={control}
              defaultValue=""
              rules={{ required: "availablity is required" }}
              render={({ field }) => (
                <FormControl fullWidth>
                  <Select {...field} displayEmpty>
                    <MenuItem value="">Select availablity</MenuItem>
                    <MenuItem value="inStock">In Stock</MenuItem>
                    <MenuItem value="outOfStock">Out of Stock</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
        </Grid>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          disabled={!uploadComplete}
        >
          Add Product
        </Button>
      </form>
    </Box>
  );
};

export default AddProducts;
