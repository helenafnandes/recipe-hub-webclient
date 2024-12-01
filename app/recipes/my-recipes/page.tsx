"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Box, Typography, Grid, Divider } from "@mui/material";
import { ROUTES } from "../../../utils/constants";
import { withAuth } from "../../../middlewares/withAuth";
import RecipeGrid from "../../../components/RecipeGrid";
import LoadMoreButton from "../../../components/LoadMoreButton";

const MyRecipesPage: React.FC = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMyRecipes = useCallback(async () => {
    console.log("Fetching my recipes...");

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("accessToken");
      const userId = localStorage.getItem("userId");
      if (!token || !userId) throw new Error("Unauthorized");

      const queryParams = new URLSearchParams({
        page: String(page),
      }).toString();

      const response = await fetch(`${ROUTES.recipes}/user/${userId}?${queryParams}`, {
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
  }, [page]);

  useEffect(() => {
    fetchMyRecipes();
  }, [page, fetchMyRecipes]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <Box sx={{ padding: "3rem" }}>
      <Box sx={{ padding: "0 20%" }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h2" gutterBottom align="center">
              My Recipes
            </Typography>
          </Grid>
        </Grid>
      </Box>
      {error && <Typography color="error">{error}</Typography>}

      <Divider sx={{ margin: "2rem" }} />

      <RecipeGrid recipes={recipes} />

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <LoadMoreButton loading={loading} loadMore={loadMore} />
      </Box>
    </Box>
  );
};

export default withAuth(MyRecipesPage);
