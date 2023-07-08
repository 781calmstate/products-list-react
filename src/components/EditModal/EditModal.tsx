import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { IProduct } from '../../types/model';
import { useAppDispatch } from '../../hooks/redux';
import * as productsActions from '../../redux/slices/productsSlice';

type TEditModalProps = {
  isEditingOpen: boolean;
  setIsEditingOpen: React.Dispatch<React.SetStateAction<boolean>>;
  productId: number;
};

const INITIAL_PRODUCT = {
  id: 0,
  imageUrl: 'some url',
  name: '',
  count: 0,
  size: {
    width: 0,
    height: 0,
  },
  weight: '',
  comments: ['lorem suiewqnweqqweaxdzd'],
};

export const EditModal = ({
  productId,
  isEditingOpen,
  setIsEditingOpen,
}: TEditModalProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const [editedProduct, setEditedProduct] = useState<IProduct>(INITIAL_PRODUCT);

  const { name, count, weight, size } = editedProduct;
  const { width, height } = size;

  const editProduct = () => {
    if (
      name.trim().length === 0 ||
      count < 0 ||
      weight.trim().length === 0 ||
      width <= 0 ||
      height <= 0
    ) {
      return;
    }
    dispatch(productsActions.edit({ ...editedProduct, id: productId }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === '') {
      return;
    }

    if (
      e.target.name === 'name' ||
      e.target.name === 'count' ||
      e.target.name === 'weight'
    ) {
      setEditedProduct((prev) => ({
        ...prev,
        [e.target.name]: value,
      }));
    } else if (e.target.name === 'width' || e.target.name === 'height') {
      setEditedProduct((prev) => ({
        ...prev,
        size: { ...size, [e.target.name]: value },
      }));
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    console.log(editedProduct);

    editProduct();
    setIsEditingOpen(false);
  };

  const handleClose = () => {
    setIsEditingOpen(false);
  };

  const isSaveDisabled = name.trim().length === 0 || weight.trim().length === 0;

  return (
    <Modal
      open={isEditingOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add product
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '100%' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Name"
              name="name"
              variant="outlined"
              type="text"
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Count"
              name="count"
              variant="outlined"
              type="number"
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Width"
              variant="outlined"
              name="width"
              type="number"
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Height"
              variant="outlined"
              name="height"
              type="number"
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Weight (g)"
              name="weight"
              variant="outlined"
              type="text"
              onChange={handleChange}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 20,
                padding: '10px 0 ',
              }}
            >
              <Button
                variant="outlined"
                disabled={isSaveDisabled}
                onClick={handleSubmit}
              >
                Save
              </Button>
              <Button variant="outlined" color="error" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </Box>
        </Typography>
      </Box>
    </Modal>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
};
