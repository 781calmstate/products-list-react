import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

type TSortMenuProps = {
  setSortBy: React.Dispatch<React.SetStateAction<{ sort: string }>>;
};

export const SortMenu = ({ setSortBy }: TSortMenuProps): JSX.Element => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    return setSortBy({ sort: event.currentTarget.value });
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={name}
          id="demo-simple-select"
          label="sort"
          onChange={() => handleChange}
        >
          <MenuItem>A-Z</MenuItem>
          <MenuItem>Count</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
