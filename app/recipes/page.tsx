"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { ROUTES } from "../../utils/constants";
import { withAuth } from "../../middlewares/withAuth";
import SearchBar from "../../components/SearchBar";
import RecipeGrid from "../../components/RecipeGrid";
import LoadMoreButton from "../../components/LoadMoreButton";

const RecipesPage: React.FC = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<number | "">(1);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchRecipes = async () => {
      console.log("Fetching recipes...");

      setLoading(true);
      setError(null);
  
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("Unauthorized");
  
        const queryParams = new URLSearchParams({
          page: String(page),
          category: category !== "" ? String(category) : "",
          search: search || "",  // Filtro de busca
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
        setRecipes((prev) => (page === 1 ? data : [...prev, ...data])); // Adiciona novas receitas quando necessário
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // A busca acontece apenas quando o valor de search for debounced
    fetchRecipes();
  }, [page, category, search]); // Reagindo ao debounced search

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Recipes
      </Typography>
      {error && <Typography color="error">{error}</Typography>}

      <SearchBar category={category} search={search} setCategory={setCategory} setSearch={setSearch} />

      <RecipeGrid recipes={recipes} />

      <LoadMoreButton loading={loading} loadMore={loadMore} />
    </Box>
  );
};

export default withAuth(RecipesPage);
