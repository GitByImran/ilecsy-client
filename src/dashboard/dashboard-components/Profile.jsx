import React, { useContext, useState } from "react";
import { AuthContext } from "../../authentication/Provider";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Modal,
  TextField,
} from "@mui/material";
import { AiOutlineUser } from "react-icons/ai";
import { BsShieldFillCheck } from "react-icons/bs";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { FiUserCheck } from "react-icons/fi";
import axios from "axios";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { ThreeDots } from "react-loader-spinner";
import { Toaster } from "react-hot-toast";

const Profile = () => {
  const { isAdmin, user, userData } = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [name, setName] = useState(userData?.name || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [open, setOpen] = useState(false);
  const apiKey = "f6b7ed31eea5a21e9e00f71286c18481";

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleUpload = async () => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("image", selectedImage);

      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData
      );

      setImageUrl(response.data.data.url);
      setSelectedImage(null);
      setUploading(false);
      setUploadComplete(true);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const updatedUserData = {
        name,
        email,
        url: imageUrl,
      };

      await axios.put(
        `http://localhost:5000/users/${userData._id}`,
        updatedUserData
      );

      setOpen(false);
      window.location.reload();
      toast.success('Successfully updated !')
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div>
      {userData ? (
        <Box>
          <Card sx={{ background: "none", boxShadow: "none" }}>
            <CardContent>
              <CardMedia>
                {userData.url ? (
                  <img
                    src={userData?.url}
                    alt="userData.name"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      objectPosition: "top",
                    }}
                  />
                ) : (
                  <AiOutlineUser
                    fontSize={50}
                    color="#aaa"
                    style={{ borderRadius: "100%", border: "1px solid #aaa" }}
                  />
                )}
              </CardMedia>
              <Box sx={{ mt: 2, mb: 4 }}>
                <Typography
                  variant="h6"
                  textTransform="capitalize"
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <FiUserCheck />
                  {userData.name}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <MdOutlineMarkEmailRead />
                  {userData.email}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  {isAdmin ? <BsShieldFillCheck /> : <HiOutlineBadgeCheck />}
                  {userData.role}
                </Typography>
              </Box>

              {/* Update Profile Button */}
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpen(true)}
              >
                Update Profile
              </Button>

              {/* Update Profile Modal */}
              <Modal open={open} onClose={() => setOpen(false)}>
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    minWidth: 400,
                  }}
                >
                  <Typography variant="h6" mb={3}>
                    Update Profile
                  </Typography>

                  {/* Image uploading */}
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <input type="file" onChange={handleImageChange} />
                  <Button
                      sx={{ width: "37%" }}
                      variant="contained"
                      color="primary"
                      onClick={handleUpload}
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
                  {/* <Typography>{uploading && "uploading..."}</Typography> */}
                  {/* Name Field */}
                  <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                  {/* Email Field */}
                  <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                  {/* Submit Button */}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdateProfile}
                  >
                    Submit
                  </Button>
                </Box>
              </Modal>
            </CardContent>
          </Card>
        </Box>
      ) : (
        <Typography variant="body1">Loading...</Typography>
      )}
      <Toaster />
    </div>
  );
};

export default Profile;
