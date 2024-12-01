"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Box, Typography, CircularProgress } from "@mui/material";
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
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        {recipe.name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {recipe.preparationMethod}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Ingredients: {recipe.ingredients.join(", ")}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Rating: {recipe.rating} ({recipe.numberOfRatings} avaliações)
      </Typography>
    </Box>
  );
};

export default RecipeDetailPage;
