"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Box, Typography, CircularProgress, Grid, Paper } from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";
import { ROUTES } from "../../../utils/constants";

const RecipeDetailPage: React.FC = () => {
  const { id } = useParams(); // Pega o ID da receita da URL
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("Unauthorized");

        const response = await fetch(`${ROUTES.recipes}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch recipe");
        }

        const data = await response.json();
        setRecipe(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
      <Paper elevation={3} sx={{ padding: "2rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <img
              src="/placeholder.jpg"
              alt="Recipe"
              style={{ width: "100%", height: "auto", display: "block", margin: "auto" }}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h4" gutterBottom>
                {recipe.name}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {[...Array(5)].map((_, index) => (
                  index < recipe.rating ? <Star key={index} color="primary" /> : <StarBorder key={index} color="primary" />
                ))}
                <Typography variant="body2" color="text.secondary" sx={{ marginLeft: 1 }}>
                  ({recipe.numberOfRatings} avaliações)
                </Typography>
              </Box>
            </Box>
            <Typography variant="body1" gutterBottom>
              <strong>Preparation Method:</strong> {recipe.preparationMethod}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ingredients: {recipe.ingredients.join(", ")}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default RecipeDetailPage;
