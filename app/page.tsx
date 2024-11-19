"use client";
import React, { useState, useEffect } from "react";
import { Box, Grid, Button, TextField } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RecipeCard from "../components/RecipeCard";
import { ROUTES } from "../utils/constants";

const HomePage: React.FC = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`${ROUTES.recipes}?page=${page}`)
      .then((response) => response.json())
      .then((data) => setRecipes((prev) => [...prev, ...data]));
  }, [page]);

  const loadMore = () => {
    setPage(page + 1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",  // Ensures full viewport height
      }}
    >
      <Header />
      <Box sx={{ padding: "2rem", textAlign: "center", flex: 1 }}>
        <TextField fullWidth placeholder="Search Recipes..." sx={{ marginBottom: "2rem" }} />
        <Grid container spacing={4}>
          {recipes.map((recipe, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <RecipeCard title={recipe.title} description={recipe.description} />
            </Grid>
          ))}
        </Grid>
        <Button variant="contained" color="primary" onClick={loadMore} sx={{ marginTop: "2rem" }}>
          Load More
        </Button>
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePage;
