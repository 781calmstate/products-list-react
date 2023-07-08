import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React from 'react';

type TSortMenuProps = {
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
};

export const SortMenu = ({
  setSortBy,
  sortBy,
}: TSortMenuProps): JSX.Element => {
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setSortBy(event.target.value as string);
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={sortBy}
          id="demo-simple-select"
          label="sort"
          onChange={(event) => handleChange(event)}
        >
          <MenuItem value={'name'}>A-Z</MenuItem>
          <MenuItem value={'count'}>Count</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
