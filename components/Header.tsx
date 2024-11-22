"use client";
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header: React.FC = () => {
  const [anchorElCategories, setAnchorElCategories] = React.useState<null | HTMLElement>(null);
  const [anchorElAccount, setAnchorElAccount] = React.useState<null | HTMLElement>(null);

  const handleCategoriesMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElCategories(event.currentTarget);
  };

  const handleAccountMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElAccount(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorElCategories(null);
    setAnchorElAccount(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* icon and title */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <RestaurantMenuIcon
            sx={{ marginRight: 1, fontSize: 30 }}
          />
          <Typography variant="h6" component="div">
            RecipeHub
          </Typography>
        </Box>

        {/* recipe categories menu */}
        <Box>
          <Button color="inherit" onClick={handleCategoriesMenuOpen}>
            Categories
          </Button>
          <Menu
            anchorEl={anchorElCategories}
            open={Boolean(anchorElCategories)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Category 1</MenuItem>
            <MenuItem onClick={handleMenuClose}>Category 2</MenuItem>
            <MenuItem onClick={handleMenuClose}>Category 3</MenuItem>
          </Menu>
        </Box>
          |
        {/* account menu */}
        <Box>
          <Button color="inherit" onClick={handleAccountMenuOpen}>
            <AccountCircleIcon
              sx={{ marginRight: 1, fontSize: 30 }}
            />
          </Button>
          <Menu
            anchorEl={anchorElAccount}
            open={Boolean(anchorElAccount)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Your Recipes</MenuItem>
            <MenuItem onClick={handleMenuClose}>Favorites</MenuItem>
            <MenuItem
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/auth/login";
              }}
            >
              Logout
            </MenuItem>

          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
