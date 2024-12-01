import React from "react";
import { Grid, Typography } from "@mui/material";
import RecipeCard from "./RecipeCard";

interface RecipeGridProps {
  recipes: any[];
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
          {recipes.map((recipe, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <RecipeCard title={recipe.name} description={recipe.description} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default RecipeGrid;
