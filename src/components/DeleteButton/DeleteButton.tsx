import React from 'react';

import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

type TDeleteButtonProps = {
  setId: React.Dispatch<React.SetStateAction<number>>;
  setIsDeletingOpen: React.Dispatch<React.SetStateAction<boolean>>;
  productId: number;
};

export const DeleteButton = ({
  setIsDeletingOpen,
  setId,
  productId,
}: TDeleteButtonProps): JSX.Element => {
  const handleClick = (id: number) => {
    setId(id);
    setIsDeletingOpen(true);
  };

  return (
    <IconButton aria-label="delete" onClick={() => handleClick(productId)}>
      <DeleteIcon />
    </IconButton>
  );
};
