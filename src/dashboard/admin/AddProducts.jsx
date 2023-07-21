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
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { IoMdAdd } from "react-icons/io";

const AddProducts = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Handle form submission here
    console.log(data);
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

          {/* Product Image */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="productImage"
              control={control}
              defaultValue=""
              rules={{ required: "Product Image is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Product Image Link"
                  fullWidth
                  error={!!errors.productImage}
                  helperText={errors.productImage?.message}
                />
              )}
            />
          </Grid>

          {/* Available Quantity */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="availableQuantity"
              control={control}
              defaultValue=""
              rules={{ required: "Available Quantity is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Available Quantity"
                  fullWidth
                  error={!!errors.availableQuantity}
                  helperText={errors.availableQuantity?.message}
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
                    <MenuItem value="Watches">Watches</MenuItem>
                    <MenuItem value="Cameras">Cameras</MenuItem>
                    <MenuItem value="Electronics">Electronics</MenuItem>
                    <MenuItem value="Computers">Computers</MenuItem>
                    <MenuItem value="Smartphones">Smartphones</MenuItem>
                    <MenuItem value="Books">Books</MenuItem>
                    <MenuItem value="Outdoors">Outdoors</MenuItem>
                    <MenuItem value="Toys">Toys</MenuItem>
                    <MenuItem value="Crafts">Crafts</MenuItem>
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
        </Grid>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Add Product
        </Button>
      </form>
    </Box>
  );
};

export default AddProducts;
