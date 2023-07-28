import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { FiUser } from "react-icons/fi";

const ManageUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleMakeAdminUser = (user) => {
    const updatedUser = { ...user, role: "admin" };

    axios
      .patch(`http://localhost:5000/users/${user._id}`, updatedUser)
      .then((response) => {
        setUsers((prevUsers) =>
          prevUsers.map((u) => (u._id === user._id ? response.data : u))
        );
        window.location.reload(); // Refresh the page after successful update
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  const handleMakeUserAdmin = (user) => {
    const updatedUser = { ...user, role: "user" };

    axios
      .patch(`http://localhost:5000/users/${user._id}`, updatedUser)
      .then((response) => {
        setUsers((prevUsers) =>
          prevUsers.map((u) => (u._id === user._id ? response.data : u))
        );
        window.location.reload(); // Refresh the page after successful update
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  const handleDeleteUser = async (user) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/users/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setUsers((prevUsers) => prevUsers.filter((u) => u._id !== user._id));
        window.location.reload(); // Refresh the page after successful delete
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Profile</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>
                {user.url ? (
                  <img
                    src={user.url}
                    alt={user.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      overflow: "hidden",
                      boxShadow: "0 0 5px rgb(0,0,0, 20%)",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      boxShadow: "0 0 5px rgb(0,0,0, 20%)",
                    }}
                  >
                    <FiUser
                      style={{ height: "100%", width: "100%", color: "#333" }}
                    />
                  </div>
                )}
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {user.role === "user" ? (
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => handleMakeAdminUser(user)}
                    >
                      Make Admin
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      onClick={() => handleMakeUserAdmin(user)}
                    >
                      Make User
                    </Button>
                  )}
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={() => handleDeleteUser(user)}
                  >
                    Ban Account
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ManageUser;
