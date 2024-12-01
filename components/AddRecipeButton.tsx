"use client";

import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Typography, Box, Select, MenuItem } from "@mui/material";
import { ROUTES } from "../utils/constants";

interface AddRecipeButtonProps {
  onRecipeAdded: () => void; // Função de callback para ser chamada quando uma receita for adicionada
}

const AddRecipeButton: React.FC<AddRecipeButtonProps> = ({ onRecipeAdded }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [preparationMethod, setPreparationMethod] = useState("");
  const [category, setCategory] = useState<number | "">(1);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Unauthorized");

      const ingredientsArray = ingredients.split(",").map((i) => i.trim()).filter((i) => i);

      const response = await fetch(ROUTES.recipes, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          ingredients: ingredientsArray,
          preparationMethod,
          category,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message.join(", "));
      }

      setSuccessMessage("Recipe added successfully!");
      setError(null);
      setOpen(false);
      onRecipeAdded(); // Chama a função de callback para atualizar a lista de receitas
    } catch (err: any) {
      setError(err.message);
      setSuccessMessage(null);  // limpar a mensagem de sucesso se tiver erro
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {successMessage && (
          <Typography sx={{ color: 'white', marginRight: '1rem' }}>
            {successMessage}
          </Typography>
        )}
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          Add Recipe
        </Button>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Recipe</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="dense"
          />
          <TextField
            label="Ingredients (separated by commas)"
            fullWidth
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            margin="dense"
          />
          <TextField
            label="Preparation Method"
            fullWidth
            value={preparationMethod}
            onChange={(e) => setPreparationMethod(e.target.value)}
            margin="dense"
          />
          <Select
            label="Category"
            fullWidth
            value={category}
            onChange={(e) => setCategory(Number(e.target.value))}
            margin="dense"
          >
            <MenuItem value={0}>Outros</MenuItem>
            <MenuItem value={1}>Meals</MenuItem>
            <MenuItem value={2}>Snacks</MenuItem>
            <MenuItem value={3}>Desserts</MenuItem>
            <MenuItem value={4}>Drinks</MenuItem>
          </Select>
          {error && <Typography color="error">{error}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddRecipeButton;
