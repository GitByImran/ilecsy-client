import React, { useContext, useEffect, useState } from "react";
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
import { Toaster, toast } from "react-hot-toast";
import { AuthContext } from "../../authentication/Provider";

import Swal from "sweetalert2";

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

  const handleMakeUserAdmin = (user, userName) => {
    const updatedUser = { ...user, role: "admin" };
    console.log(user)
    axios
      .patch(`http://localhost:5000/users/${user._id}`, updatedUser)
      .then((response) => {
        setUsers((prevUsers) =>
          prevUsers.map((u) => (u._id === user._id ? response.data : u))
        );
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        toast.success(`${userName} is now an admin`)
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  const handleMakeAdminUser = (user, userName) => {
    const updatedUser = { ...user, role: "user" };

    axios
      .patch(`http://localhost:5000/users/${user._id}`, updatedUser)
      .then((response) => {
        setUsers((prevUsers) =>
          prevUsers.map((u) => (u._id === user._id ? response.data : u))
        );
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        toast.success(`${userName} is now an user`)
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  const handleDeleteUser = async (user) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure to delete this account?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (result.isConfirmed) {

        const response = await axios.delete(
          `http://localhost:5000/users/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        if (response.status === 200) {
          setUsers((prevUsers) => prevUsers.filter((u) => u._id !== user._id));
          Swal.fire('Deleted!', `${user.name}'s account has been deleted.`, 'success');
        }
      }
    } catch (error) {
      console.error('Error deleting user:', error);
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
                      onClick={() => handleMakeUserAdmin(user, user.name)}
                    >
                      Make Admin
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                        onClick={() => handleMakeAdminUser(user, user.name)}
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
      <Toaster />
    </Box>
  );
};

export default ManageUser;
