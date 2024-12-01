"use client";

import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import RecipeCard from "./RecipeCard";

interface RecipeGridProps {
  recipes: {
    id: string;
    name: string;
    preparationMethod?: string;
    rating: number;
    numberOfRatings: number;
  }[];
  onDelete?: (id: string) => void; 
}

const RecipeGrid: React.FC<RecipeGridProps> = ({ recipes, onDelete }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      {recipes.length === 0 ? (
        <Typography variant="h6" color="textSecondary" align="center">
          No recipes found matching your search criteria.
        </Typography>
      ) : (
        <Grid container spacing={4} justifyContent="center" maxWidth="lg">
          {recipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <RecipeCard
                id={recipe.id}
                title={recipe.name}
                preparationMethod={recipe.preparationMethod || "No description available"}
                rating={recipe.rating}
                numberOfRatings={recipe.numberOfRatings}
                onDelete={onDelete} // Passa a função de exclusão
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default RecipeGrid;
