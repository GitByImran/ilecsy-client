import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import React, { useContext } from "react";
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
import { GoHome, GoNote } from "react-icons/go";
import { IoMdAddCircleOutline } from "react-icons/io";
import { AuthContext } from "../authentication/Provider";
import { ProgressBar } from "react-loader-spinner";

const Style = styled(List)(({ theme }) => ({
  "& .MuiListItemIcon-root.css-cveggr-MuiListItemIcon-root": {
    // minWidth: '0px',
    // marginRight: '10px !important',
  },
}));

const DashMenu = () => {
  const { loading, isAdmin } = useContext(AuthContext);
  return (
    <Box> <Style>
      <Toolbar>
        {loading ? (
          <ProgressBar
            height="80"
            width="80"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor="#ddd"
            barColor="#aaa"
          />
        ) : (
          <Typography
            color="#000"
            fontFamily="Exo 2 !important"
            fontSize={30}
            fontWeight={700}
            marginLeft={2}
          >
            ILECSY
          </Typography>
        )}
      </Toolbar>
      {/* <Divider /> */}
      <List>
        {isAdmin ? (
          <ListItem
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <ListItemButton component={Link} to="/dashboard/manage-users">
              <ListItemIcon sx={{ minWidth: 0 }}>
                <PiUsersThreeBold fontSize={20} />
              </ListItemIcon>
              <ListItemText sx={{ ml: 2 }} primary="Manage users" />
            </ListItemButton>
            <ListItemButton component={Link} to="/dashboard/manage-products">
              <ListItemIcon sx={{ minWidth: 0 }}>
                <BiCategory fontSize={20} />
              </ListItemIcon>
              <ListItemText sx={{ ml: 2 }} primary="Manage products" />
            </ListItemButton>
            <ListItemButton component={Link} to="/dashboard/add-products">
              <ListItemIcon sx={{ minWidth: 0 }}>
                <IoMdAddCircleOutline fontSize={20} />
              </ListItemIcon>
              <ListItemText sx={{ ml: 2 }} primary="Add products" />
            </ListItemButton>
            <ListItemButton component={Link} to="/dashboard/all-orders">
              <ListItemIcon sx={{ minWidth: 0 }}>
                <GoNote fontSize={20} />
              </ListItemIcon>
              <ListItemText sx={{ ml: 2 }} primary="All Orders" />
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <ListItemButton component={Link} to="/dashboard/cart">
                <ListItemIcon sx={{ minWidth: 0 }}>
                <AiOutlineShoppingCart fontSize={20} />
              </ListItemIcon>
                <ListItemText sx={{ ml: 2 }} primary="My cart" />
            </ListItemButton>
            {/* <ListItemButton component={Link} to="/dashboard/make-payment">
              <ListItemIcon  sx={{ minWidth: 0 }}>
                <MdOutlinePayments fontSize={20} />
              </ListItemIcon>
              <ListItemText sx={{2}} primary="Make payment" />
            </ListItemButton> */}
            <ListItemButton component={Link} to="/dashboard/payment-history">
                <ListItemIcon sx={{ minWidth: 0 }}>
                <RiHistoryFill fontSize={20} />
              </ListItemIcon>
                <ListItemText sx={{ ml: 2 }} primary="Payment history" />
            </ListItemButton>
            <ListItemButton component={Link} to="/dashboard/my-orders">
                <ListItemIcon sx={{ minWidth: 0 }}>
                <MdOutlineProductionQuantityLimits fontSize={20} />
              </ListItemIcon>
                <ListItemText sx={{ ml: 2 }} primary="My orders" />
            </ListItemButton>
          </ListItem>
        )}

        <ListItem
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            position: "fixed",
            bottom: 0,
            width: "27%",
          }}
        >
          <ListItemButton component={Link} to="/dashboard/profile">
            <ListItemIcon sx={{ minWidth: 0 }}>
              <CgProfile fontSize={20} />
            </ListItemIcon>
            <ListItemText sx={{ ml: 2 }} primary="Profile" />
          </ListItemButton>
          <ListItemButton component={Link} to="/">
            <ListItemIcon sx={{ minWidth: 0 }}>
              <GoHome fontSize={20} />
            </ListItemIcon>
            <ListItemText sx={{ ml: 2 }} primary="Back to home" />
          </ListItemButton>
        </ListItem>
      </List></Style>
    </Box>
  );
};

export default DashMenu;
