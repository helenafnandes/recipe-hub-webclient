"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  CircularProgress,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import RecipeCard from "../../components/RecipeCard";
import { ROUTES } from "../../utils/constants";
import { withAuth } from "../../middlewares/withAuth";

const RecipesPage: React.FC = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<number | "">(1);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchRecipes = async () => {
      console.log("entrou na pag de receitas");

      setLoading(true);
      setError(null);
  
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("Unauthorized");
  
        const queryParams = new URLSearchParams({
          page: String(page),
          category: category !== "" ? String(category) : "",
          search: search || "",
        }).toString();
  
        const response = await fetch(`${ROUTES.recipes}?${queryParams}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response);

        console.log(token);
  
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized: Invalid token or not provided.");
          } else {
            throw new Error("Failed to fetch recipes");
          }
        }
  
        const data = await response.json();
        setRecipes((prev) => [...prev, ...data]);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchRecipes();
  }, [page, category, search]);
  

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Recipes
      </Typography>
      {error && <Typography color="error">{error}</Typography>}

      <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value as number | "")}
          label="Category"
        >
          <MenuItem value={1}>Meals</MenuItem>
          <MenuItem value={2}>Snacks</MenuItem>
          <MenuItem value={3}>Desserts</MenuItem>
          <MenuItem value={4}>Drinks</MenuItem>
          <MenuItem value={5}>Other</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ marginBottom: "1rem" }}
      />

      <Grid container spacing={4}>
        {recipes.map((recipe, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <RecipeCard title={recipe.name} description={recipe.description} />
          </Grid>
        ))}
      </Grid>

      {loading ? (
        <CircularProgress sx={{ margin: "2rem auto", display: "block" }} />
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={loadMore}
          sx={{ marginTop: "2rem" }}
        >
          Load More
        </Button>
      )}
    </Box>
  );
};

export default withAuth(RecipesPage);
