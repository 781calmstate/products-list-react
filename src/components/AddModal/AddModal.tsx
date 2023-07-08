import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { IProduct } from '../../types/model';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import * as productsActions from '../../redux/slices/productsSlice';

type TAddModalProps = {
  isAddingOpen: boolean;
  setIsAddingOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const INITIAL_PRODUCT = {
  id: 0,
  imageUrl: 'some url',
  name: '',
  count: 0,
  size: {
    width: 213,
    height: 321,
  },
  weight: '',
  comments: [''],
};

export const AddModal = ({
  isAddingOpen,
  setIsAddingOpen,
}: TAddModalProps): JSX.Element => {
  const { products } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  const [newProduct, setNewProduct] = useState<IProduct>(INITIAL_PRODUCT);

  const { name, count, weight } = newProduct;

  const maxId = [...products].sort((a, b) => b.id - a.id)[0].id;

  const addProduct = (e: React.FormEvent, newProduct: IProduct) => {
    e.preventDefault();

    dispatch(productsActions.toggle(newProduct));

    setNewProduct(INITIAL_PRODUCT);
  };

  const handleSave = (e: React.MouseEvent<HTMLElement>) => {
    addProduct(e, newProduct);
    setIsAddingOpen(false);
  };

  const handleClose = () => {
    setIsAddingOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewProduct((prev) => ({
      ...prev,
      [e.target.name]: typeof value === 'string' ? value : +value,
      id: maxId + 1,
    }));
  };

  const isSaveDisabled =
    name.trim().length === 0 || count === 0 || weight.trim().length === 0;
  return (
    <Modal
      open={isAddingOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styledModalBox}>
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
              label="Weight (g)"
              name="weight"
              variant="outlined"
              type="text"
              onChange={handleChange}
            />
            <div style={styledButtonsContainer}>
              <Button
                variant="outlined"
                disabled={isSaveDisabled}
                onClick={handleSave}
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
  textAlign: 'center',
};

const styledButtonsContainer = {
  display: 'flex',
  justifyContent: 'center',
  gap: 20,
  padding: '10px 0 ',
};
