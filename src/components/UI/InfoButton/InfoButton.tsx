import React from 'react';

import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

type TInfoButtonProps = {
  productId: number;
};

export const InfoButton = ({ productId }: TInfoButtonProps): JSX.Element => {
  return (
    <Link to={`/product/${productId}`}>
      <Button variant="outlined">Info</Button>
    </Link>
  );
};
