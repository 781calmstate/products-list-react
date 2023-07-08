import { Box, CircularProgress } from '@mui/material';
import React from 'react';

export const Loader = (): JSX.Element => {
  return (
    <Box sx={styledLoaderBox}>
      <CircularProgress />
    </Box>
  );
};

const styledLoaderBox = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
