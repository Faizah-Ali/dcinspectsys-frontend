import { Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import type { ChangeEvent } from "react";

import { searchStyles } from "./style";

interface SearchProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  size?: "small" | "medium";
}

const Search = ({
  value,
  onChange,
  placeholder = "Search...",
  size = "small",
}: SearchProps) => {
  return (
    <Box sx={searchStyles.container}>
      <TextField
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        size={size}
        sx={searchStyles.field}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default Search;
