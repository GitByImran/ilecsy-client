import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../authentication/Provider";
import { Box, Typography } from "@mui/material";

const Profile = () => {
  const { isAdmin, userData } = useContext(AuthContext);

  console.log(userData);

  return (
    <div>
      {userData ? (
        <Box>
          <Typography variant="h5">{userData.name}</Typography>
          <Typography variant="body1">{userData.email}</Typography>
          {isAdmin && <Typography variant="body1">Admin</Typography>}
        </Box>
      ) : (
        <Typography variant="body1">Loading...</Typography>
      )}
    </div>
  );
};

export default Profile;
