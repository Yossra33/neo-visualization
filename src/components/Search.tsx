import React from "react";
import { TextField } from "@mui/material";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <TextField 
      label="🔍 Search"
      variant="outlined"
      sx={{ width: "250px", mb: 2 }}
      value={value}
      onChange={(e) => onChange(e.target.value)} // Ajout de l'onChange pour contrôler la saisie
    />
  );
};

export default SearchInput;
