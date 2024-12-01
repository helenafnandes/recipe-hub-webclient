import React from "react";
import { TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface SearchBarProps {
  category: number | "";
  search: string;
  setCategory: React.Dispatch<React.SetStateAction<number | "">>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ category, search, setCategory, setSearch }) => {
  return (
    <div>
      <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value as number | "")}
          label="Category"
        >
          <MenuItem value={1}>Meals</MenuItem>
          <MenuItem value={2}>Snacks</MenuItem>
          <MenuItem value={3}>Desserts</MenuItem>
          <MenuItem value={4}>Drinks</MenuItem>
          <MenuItem value={5}>Other</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ marginBottom: "1rem" }}
      />
    </div>
  );
};

export default SearchBar;
