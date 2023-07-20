import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import React from "react";
import "../index.css";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import {
  MdOutlinePayments,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { RiHistoryFill } from "react-icons/ri";
import { PiUsersThreeBold } from "react-icons/pi";
import { MdPendingActions } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { GoNote } from "react-icons/go";
import { IoMdAddCircleOutline } from "react-icons/io";

const DashMenu = () => {
  return (
    <Box>
      <Toolbar />
      {/* <Divider /> */}
      <List>
        <ListItem
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <ListItemButton component={Link} to="/dashboard/profile">
            <ListItemIcon>
              <CgProfile fontSize={30} />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
          <ListItemButton component={Link} to="/dashboard/cart">
            <ListItemIcon>
              <AiOutlineShoppingCart fontSize={30} />
            </ListItemIcon>
            <ListItemText primary="My cart" />
          </ListItemButton>
          <ListItemButton component={Link} to="/dashboard/make-payment">
            <ListItemIcon>
              <MdOutlinePayments fontSize={30} />
            </ListItemIcon>
            <ListItemText primary="Make payment" />
          </ListItemButton>
          <ListItemButton component={Link} to="/dashboard/payment-history">
            <ListItemIcon>
              <RiHistoryFill fontSize={30} />
            </ListItemIcon>
            <ListItemText primary="Payment history" />
          </ListItemButton>
          <ListItemButton component={Link} to="/dashboard/my-orders">
            <ListItemIcon>
              <MdOutlineProductionQuantityLimits fontSize={30} />
            </ListItemIcon>
            <ListItemText primary="My orders" />
          </ListItemButton>
          <ListItemButton component={Link} to="/dashboard/manage-users">
            <ListItemIcon>
              <PiUsersThreeBold fontSize={30} />
            </ListItemIcon>
            <ListItemText primary="Manage users" />
          </ListItemButton>
          <ListItemButton component={Link} to="/dashboard/manage-products">
            <ListItemIcon>
              <BiCategory fontSize={30} />
            </ListItemIcon>
            <ListItemText primary="Manage products" />
          </ListItemButton>
          <ListItemButton component={Link} to="/dashboard/add-products">
            <ListItemIcon>
              <IoMdAddCircleOutline fontSize={30} />
            </ListItemIcon>
            <ListItemText primary="Add products" />
          </ListItemButton>
          <ListItemButton component={Link} to="/dashboard/all-orders">
            <ListItemIcon>
              <GoNote fontSize={30} />
            </ListItemIcon>
            <ListItemText primary="All Orders" />
          </ListItemButton>
          <ListItemButton component={Link} to="/dashboard/pending-orders">
            <ListItemIcon>
              <MdPendingActions fontSize={30} />
            </ListItemIcon>
            <ListItemText primary="Pending orders" />
          </ListItemButton>
          <ListItemButton component={Link} to="/dashboard/complete-orders">
            <ListItemIcon>
              <TbTruckDelivery fontSize={30} />
            </ListItemIcon>
            <ListItemText primary="Complete orders" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default DashMenu;
