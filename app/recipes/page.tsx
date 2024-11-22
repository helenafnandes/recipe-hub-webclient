"use client";

import React, { useEffect, useState } from "react";
import { Box, Grid, Button, Typography, CircularProgress } from "@mui/material";
import RecipeCard from "../../components/RecipeCard";
import { ROUTES } from "../../utils/constants";
import { withAuth } from "../../middlewares/withAuth";

const RecipesPage: React.FC = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${ROUTES.recipes}?page=${page}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Inclui o token JWT na requisição
          },
        });
        if (!response.ok) throw new Error("Failed to fetch recipes");
        const data = await response.json();
        setRecipes((prev) => [...prev, ...data]);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Recipes
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={4}>
        {recipes.map((recipe, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <RecipeCard title={recipe.title} description={recipe.description} />
          </Grid>
        ))}
      </Grid>
      {loading ? (
        <CircularProgress sx={{ margin: "2rem auto", display: "block" }} />
      ) : (
        <Button variant="contained" color="primary" onClick={loadMore} sx={{ marginTop: "2rem" }}>
          Load More
        </Button>
      )}
    </Box>
  );
};

export default withAuth(RecipesPage);
