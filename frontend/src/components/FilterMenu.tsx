import React from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { Species } from '../types';

interface FilterMenuProps {
  onFilterChange: (species: Species | '') => void;
}

const FilterMenu: React.FC<FilterMenuProps> = ({ onFilterChange }) => (
  <FormControl sx={{ minWidth: 120 }}>
    <InputLabel id="species-filter-label">Species</InputLabel>
    <Select
      labelId="species-filter-label"
      defaultValue=""
      label="Species"
      onChange={(e: SelectChangeEvent<Species | ''>) => onFilterChange(e.target.value as Species | '')}
    >
      <MenuItem value="">All</MenuItem>
      <MenuItem value={Species.DOG}>Dogs</MenuItem>
      <MenuItem value={Species.CAT}>Cats</MenuItem>
      <MenuItem value={Species.BIRD}>Birds</MenuItem>
      <MenuItem value={Species.FISH}>Fish</MenuItem>
    </Select>
  </FormControl>
);

export default FilterMenu;
