import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const FilterMenu = ({ onFilterChange }) => (
  <FormControl sx={{ minWidth: 120 }}>
    <InputLabel id="species-filter-label">Species</InputLabel>
    <Select
      labelId="species-filter-label"
      defaultValue=""
      label="Species"
      onChange={(e) => onFilterChange(e.target.value)}
    >
      <MenuItem value="">All</MenuItem>
      <MenuItem value="DOG">Dogs</MenuItem>
      <MenuItem value="CAT">Cats</MenuItem>
      <MenuItem value="BIRD">Birds</MenuItem>
      <MenuItem value="FISH">Fish</MenuItem>
    </Select>
  </FormControl>
);

export default FilterMenu;
