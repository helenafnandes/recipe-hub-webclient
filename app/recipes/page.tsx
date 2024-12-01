"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Box, Typography, Grid, Button, Divider } from "@mui/material";
import { ROUTES } from "../../utils/constants";
import { withAuth } from "../../middlewares/withAuth";
import SearchBar from "../../components/SearchBar";
import RecipeGrid from "../../components/RecipeGrid";
import LoadMoreButton from "../../components/LoadMoreButton";
import AddRecipeButton from "../../components/AddRecipeButton";
import useDebounce from "../../components/hooks/useDebounce";

const RecipesPage: React.FC = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<number | "">(1);
  const [search, setSearch] = useState<string>("");

  const debouncedSearch = useDebounce(search, 500);

  const fetchRecipes = useCallback(async () => {
    console.log("Fetching recipes...");

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Unauthorized");

      const queryParams = new URLSearchParams({
        page: String(page),
        category: category !== "" ? String(category) : "",
        search: debouncedSearch || "", // Filtro de busca
      }).toString();

      const response = await fetch(`${ROUTES.recipes}?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized: Invalid token or not provided.");
        } else {
          throw new Error("Failed to fetch recipes");
        }
      }

      const data = await response.json();
      setRecipes(data); 
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, category, debouncedSearch]);

  useEffect(() => {
    fetchRecipes();
  }, [page, category, debouncedSearch, fetchRecipes]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <Box sx={{ padding: "3rem" }}>
      <Box sx={{ padding: "0 20%" }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h2" gutterBottom align="center">
              Recipes
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <SearchBar category={category} search={search} setCategory={setCategory} setSearch={setSearch} />
          </Grid>
        </Grid>
      </Box>
      {error && <Typography color="error">{error}</Typography>}

      <Divider sx={{ margin: "2rem"}} />

      <RecipeGrid recipes={recipes} />

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <LoadMoreButton loading={loading} loadMore={loadMore} />
      </Box>
    </Box>
  );
};

export default withAuth(RecipesPage);
