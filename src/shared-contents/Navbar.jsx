import React, { useContext, useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
  InputBase,
  Box,
  Container,
  Badge,
  Menu,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { AuthContext } from "../authentication/Provider";

const navMenus = [
  { label: "home", goto: "/", icon: <HomeOutlinedIcon /> },
  {
    label: "+88 01234567890",
    goto: "tel:+88 01234567890",
    icon: <AddIcCallIcon />,
  },
];
const authMenus = [
  { label: "Sign In", goto: "/signin", icon: <LoginIcon /> },
  {
    label: "Create Account",
    goto: "/signup",
    icon: <PersonAddAltOutlinedIcon />,
  },
];
const userMenus = [
  {
    label: "Dashboard",
    goto: "/dashboard/profile",
    icon: <DashboardCustomizeOutlinedIcon />,
  },
  { label: "Sign out", goto: "/", icon: <LogoutIcon />, action: true },
];

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    left: 10,
    top: 0,
    padding: "0 4px",
  },
}));

const Navbar = () => {
  const { userFound, user, logOut, cart } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(null);
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  console.log(cart);

  const handleLogout = () => {
    logOut();
  };

  const handleMenuOpen = (event) => {
    setShowMenu(event.currentTarget);
  };

  const handleMenuClose = () => {
    setShowMenu(null);
  };

  return (
    <AppBar
      position="static"
      sx={{ background: "#377a83", boxShadow: "none", paddingY: 2 }}
    >
      <Container>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "0px !important",
            padding: "0px !important",
          }}
        >
          {/* Menu Links */}
          {isMobile && (
            <Box>
              <IconButton
                edge="start"
                color="#fff"
                aria-label="menu"
                onClick={handleMenuOpen}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={showMenu}
                open={Boolean(showMenu)}
                onClose={handleMenuClose}
              >
                {navMenus.map((menu, index) => (
                  <MenuItem
                    key={index}
                    component={Link}
                    to={menu.goto}
                    onClick={handleMenuClose}
                  >
                    {menu.icon}
                    <Typography ml={isMobile && 1}>{menu.label}</Typography>
                  </MenuItem>
                ))}
                {user
                  ? userMenus.map((menu, index) => (
                      <MenuItem
                        key={index}
                        component={Link}
                        to={menu.goto}
                        onClick={handleMenuClose}
                      >
                        {menu.icon}
                        <Typography ml={isMobile && 1}>{menu.label}</Typography>
                      </MenuItem>
                    ))
                  : authMenus.map((menu, index) => (
                      <MenuItem
                        key={index}
                        component={Link}
                        to={menu.goto}
                        onClick={handleMenuClose}
                      >
                        {menu.icon}
                        <Typography ml={isMobile && 1}>{menu.label}</Typography>
                      </MenuItem>
                    ))}
              </Menu>
            </Box>
          )}

          {/* Logo */}
          <Typography variant="" color="#fff" fontSize={30} fontWeight={700}>
            ILECSY
          </Typography>

          {!isMobile && (
            <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
              {navMenus.map((menu, index) => (
                <Button
                  key={index}
                  component={Link}
                  to={menu.goto}
                  fontFamily="Exo 2 !important"
                  sx={{
                    color: "#fff",
                    fontSize: "16px !important",
                    padding: "0px",
                    margin: "0px",
                    minWidth: "0px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {menu.icon}
                  <Typography fontSize="13px !important" fontWeight="bold">
                    {menu.label}
                  </Typography>
                </Button>
              ))}
              <Button
                component={Link}
                to="/dashboard/cart"
                fontFamily="Exo 2 !important"
                sx={{
                  color: "#fff",
                  fontSize: "20px !important",
                  padding: "0px",
                  margin: "0px",
                  minWidth: "0px",
                }}
              >
                <IconButton aria-label="cart">
                  <StyledBadge
                    badgeContent={cart?.length ? cart.length : "0"}
                    color="secondary"
                  >
                    <AddShoppingCartIcon sx={{ color: "#fff" }} />
                  </StyledBadge>
                </IconButton>
              </Button>
            </Box>
          )}

          {!isMobile && (
            <Box sx={{ display: "flex", gap: 3 }}>
              {!user
                ? authMenus.map((menu, index) => (
                    <Button
                      key={index}
                      component={Link}
                      to={menu.goto}
                      fontFamily="Exo 2 !important"
                      sx={{
                        color: "#fff",
                        fontSize: "20px !important",
                        padding: "0px",
                        margin: "0px",
                        minWidth: "0px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {menu.icon}
                      <Typography fontSize="13px !important" fontWeight="bold">
                        {menu.label}
                      </Typography>
                    </Button>
                  ))
                : userMenus.map((menu, index) => (
                    <Button
                      key={index}
                      component={Link}
                      to={menu.goto}
                      onClick={menu.action && handleLogout}
                      fontFamily="Exo 2 !important"
                      sx={{
                        color: "#fff",
                        fontSize: "20px !important",
                        padding: "0px",
                        margin: "0px",
                        minWidth: "0px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {menu.icon}
                      <Typography fontSize="13px !important" fontWeight="bold">
                        {menu.label}
                      </Typography>
                    </Button>
                  ))}
            </Box>
          )}

          {/* Search Button */}
          {/*{!isMobile && (
          <Box
            sx={{
              display: "flex",
              gap: 1,
              px: 1,
              border: "2px solid #aaa",
              borderRadius: "8px",
            }}
          >
           <IconButton
              edge="end"
              color="dark"
              aria-label="search"
              sx={{ p: 0, m: 0 }}
            >
              <SearchIcon />
            </IconButton>
             <InputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              sx={{ color: "dark" }}
            />
          </Box>
        )} */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
