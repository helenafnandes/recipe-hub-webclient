"use client";

import React from "react";
import { Grid, Typography } from "@mui/material";
import RecipeCard from "./RecipeCard";

interface RecipeGridProps {
  recipes: {
    id: string;
    name: string;
    preparationMethod?: string;
    rating: number;
    numberOfRatings: number;
  }[];
}

const RecipeGrid: React.FC<RecipeGridProps> = ({ recipes }) => {
  return (
    <div>
      {/* Verifica se o array de receitas está vazio */}
      {recipes.length === 0 ? (
        <Typography variant="h6" color="textSecondary" align="center">
          No recipes found matching your search criteria.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {recipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <RecipeCard
                id={recipe.id}
                title={recipe.name}
                preparationMethod={recipe.preparationMethod || "No description available"}
                rating={recipe.rating}
                numberOfRatings={recipe.numberOfRatings}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default RecipeGrid;
