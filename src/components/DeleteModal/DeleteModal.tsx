import { Box, Modal, Typography, Button } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import * as productsActions from '../../redux/slices/productsSlice';

type TDeleteModalProps = {
  isDeletingOpen: boolean;
  setIsDeletingOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
};

export const DeleteModal = ({
  isDeletingOpen,
  setIsDeletingOpen,
  id,
}: TDeleteModalProps): JSX.Element => {
  const { products } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  const product = products.find((product) => id === product.id);

  if (!product) {
    return <p>NO PRODUCT</p>;
  }

  const handleDeleteClick = async () => {
    await fetch(`http://localhost:8080/products/${id}`, {
      method: 'DELETE',
    });

    dispatch(productsActions.toggle(product));
    setIsDeletingOpen(false);
  };

  const handleClose = () => {
    setIsDeletingOpen(false);
  };
  return (
    <Modal
      open={isDeletingOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styledModalBox}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Delete {product.name}?
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          This action cannot be reverted
        </Typography>
        <div style={styledButtonsContainer}>
          <Button variant="outlined" color="error" onClick={handleDeleteClick}>
            Delete
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

const styledModalBox = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const styledButtonsContainer = {
  display: 'flex',
  justifyContent: 'center',
  gap: 20,
  padding: '10px 0 ',
};
