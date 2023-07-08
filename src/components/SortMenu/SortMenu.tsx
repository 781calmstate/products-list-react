import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

export const SortMenu = (): JSX.Element => {
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
        >
          <MenuItem></MenuItem>
          <MenuItem></MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
