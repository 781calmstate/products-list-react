import React from 'react';

import { Button } from '@mui/material';

type TEditButtonProps = {
  setIsEditingOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EditButton = ({
  setIsEditingOpen,
}: TEditButtonProps): JSX.Element => {
  const handleClick = () => {
    setIsEditingOpen(true);
  };
  return (
    <Button variant="outlined" color="secondary" onClick={handleClick}>
      Edit
    </Button>
  );
};
