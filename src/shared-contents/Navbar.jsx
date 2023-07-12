import React from "react";
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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

const navMenus = [{ label: "home", goto: "/", icon: <HomeOutlinedIcon /> }];
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
    goto: "/dashboard",
    icon: <DashboardCustomizeOutlinedIcon />,
  },
  { label: "Sign out", goto: "/signout", icon: <LogoutIcon /> },
];

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    left: 10,
    top: 0,
    padding: "0 4px",
  },
}));

const Navbar = () => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar
      position="static"
      sx={{ background: "none", boxShadow: "none", paddingY: 2 }}
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
          {isTablet && (
            <IconButton
              edge="start"
              color="#00"
              aria-label="menu"
              sx={{ border: "3px solid #aaa" }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <Typography variant="" color="#000" fontSize={30} fontWeight={700}>
            ILECSY
          </Typography>

          {!isTablet && (
            <Box sx={{ display: "flex", gap: 3 }}>
              {navMenus.map((menu, index) => (
                <Button
                  key={index}
                  component={Link}
                  to={menu.goto}
                  fontFamily="Exo 2 !important"
                  sx={{
                    color: "#000",
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
                to="/cart"
                fontFamily="Exo 2 !important"
                sx={{
                  color: "#000",
                  fontSize: "20px !important",
                  padding: "0px",
                  margin: "0px",
                  minWidth: "0px",
                }}
              >
                <IconButton aria-label="cart">
                  <StyledBadge badgeContent={4} color="secondary">
                    <AddShoppingCartIcon sx={{ color: "#000" }} />
                  </StyledBadge>
                </IconButton>
              </Button>
            </Box>
          )}

          {!isMobile && (
            <Box sx={{ display: "flex", gap: 3 }}>
              {authMenus.map((menu, index) => (
                <Button
                  key={index}
                  component={Link}
                  to={menu.goto}
                  fontFamily="Exo 2 !important"
                  sx={{
                    color: "#000",
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
