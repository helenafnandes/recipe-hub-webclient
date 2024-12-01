import React from "react";
import { TextField } from "@mui/material";

interface SearchBarProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch }) => {
  return (
    <TextField
      label="Search Recipes"
      variant="outlined"
      fullWidth
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      sx={{ marginBottom: "1rem" }}
    />
  );
};

export default SearchBar;
