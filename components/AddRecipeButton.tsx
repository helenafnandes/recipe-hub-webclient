"use client";

import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Typography } from "@mui/material";
import { ROUTES } from "../utils/constants";

const AddRecipeButton: React.FC = () => {
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

      const response = await fetch(ROUTES.recipes, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          ingredients: ingredients.split(",").map((i) => i.trim()),
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
    } catch (err: any) {
      setError(err.message);
      setSuccessMessage(null);  // Clear success message if there's an error
    }
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add Recipe
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Recipe</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Ingredients (separated by commas)"
            fullWidth
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Preparation Method"
            fullWidth
            value={preparationMethod}
            onChange={(e) => setPreparationMethod(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Category"
            type="number"
            fullWidth
            value={category}
            onChange={(e) => setCategory(Number(e.target.value))}
            margin="normal"
          />
          {error && <Typography color="error">{error}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {successMessage && <Typography color="success">{successMessage}</Typography>}
    </>
  );
};

export default AddRecipeButton;
