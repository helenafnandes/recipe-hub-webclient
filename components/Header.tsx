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
import AddRecipeButton from "../components/AddRecipeButton";
import { useRouter } from "next/navigation"; // Importar o useRouter

interface HeaderProps {
  onRecipeAdded: () => void; // Função de callback para ser passada para AddRecipeButton
}

const Header: React.FC<HeaderProps> = ({ onRecipeAdded }) => {
  const [anchorElCategories, setAnchorElCategories] = React.useState<null | HTMLElement>(null);
  const [anchorElAccount, setAnchorElAccount] = React.useState<null | HTMLElement>(null);
  const router = useRouter(); // Inicializar o useRouter

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

  const handleYourRecipesClick = () => {
    handleMenuClose();
    router.push("/recipes/my-recipes"); // Navegar para a página de receitas do usuário
  };

  const handleHomeClick = () => {
    router.push("/recipes");
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
            cursor: "pointer", 
          }}
          onClick={handleHomeClick}
        >
          <RestaurantMenuIcon
            sx={{ marginRight: 1, fontSize: 30 }}
          />
          <Typography variant="h6" component="div">
            RecipeHub
          </Typography>
        </Box>

        <Box sx={{ marginRight: "1rem" }}>
          <AddRecipeButton onRecipeAdded={onRecipeAdded} />
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
            <MenuItem onClick={handleYourRecipesClick}>Your Recipes</MenuItem>
            <MenuItem onClick={handleMenuClose}>Favorites</MenuItem>
            <MenuItem
              onClick={() => {
                localStorage.removeItem("accessToken");
                localStorage.clear();
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
