import React from 'react';

import { Button } from '@mui/material';

type TAddButtonProps = {
  setIsAddingOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddButton = ({
  setIsAddingOpen,
}: TAddButtonProps): JSX.Element => {
  const handleClick = () => {
    setIsAddingOpen(true);
  };
  return (
    <Button variant="outlined" sx={{ marginBottom: 2 }} onClick={handleClick}>
      Add product
    </Button>
  );
};
